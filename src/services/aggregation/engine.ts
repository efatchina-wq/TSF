import { 
  SourceRecord 
} from '../../types/wikijob';
import { 
  NormalizedOpportunity, 
  SourceItemRecord, 
  PipelineExecutionReport, 
  PipelineStepLog, 
  DuplicateAttributionRecord,
  OpportunityAuditLog,
  OpportunityVerificationStatus
} from '../../types/aggregation';
import { sourceRegistry } from '../wikijobSourceRegistry';
import { aggregationStorage } from './storage';
import { getCollectorForSource } from './collectors/factory';
import { computeContentHash } from './utils/hash';
import { classifyContent } from './stages/classifier';
import { findDuplicate } from './stages/deduplicator';
import { calculateLifecycleStatus, processAllExpirations } from './stages/expiration';

export interface PipelineProgressCallback {
  (step: PipelineStepLog['step'], message: string, progressPct: number): void;
}

export class WikiJobAggregationEngine {
  private isRunning = false;

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Main Execution: Runs the full 8-step pipeline
   * SOURCE → FETCH → RAW CONTENT → PARSER → NORMALIZER → CLASSIFIER → DEDUPLICATOR → VALIDATOR → PUBLISHER
   */
  public async executePipeline(
    targetSourceIds?: string[], 
    onProgress?: PipelineProgressCallback
  ): Promise<PipelineExecutionReport> {
    if (this.isRunning) {
      throw new Error('Une session d’agrégation est déjà en cours d’exécution.');
    }

    this.isRunning = true;
    const startTime = Date.now();
    const runId = `run-${startTime}-${Math.random().toString(36).substr(2, 5)}`;
    const stepLogs: PipelineStepLog[] = [];

    const recordStep = (
      step: PipelineStepLog['step'], 
      status: PipelineStepLog['status'], 
      message: string, 
      count?: number
    ) => {
      const log: PipelineStepLog = {
        step,
        timestamp: new Date().toISOString(),
        status,
        message,
        items_count: count
      };
      stepLogs.push(log);
      return log;
    };

    let sourcesScanned = 0;
    let rawFetched = 0;
    let itemsParsed = 0;
    let itemsNormalized = 0;
    let itemsClassified = 0;
    let duplicatesDetected = 0;
    let itemsValidated = 0;
    let opportunitiesPublished = 0;

    try {
      // -------------------------------------------------------------
      // STAGE 1: SOURCE
      // -------------------------------------------------------------
      onProgress?.('SOURCE', 'Sélection et filtrage des sources actives...', 5);
      const allSources = sourceRegistry.getAllSources();
      const sourcesToProcess = allSources.filter(s => {
        if (!s.active) return false;
        if (targetSourceIds && targetSourceIds.length > 0) {
          return targetSourceIds.includes(s.id);
        }
        return true;
      });

      sourcesScanned = sourcesToProcess.length;
      recordStep(
        'SOURCE', 
        'INFO', 
        `${sourcesScanned} source(s) active(s) sélectionnée(s) pour la collecte.`, 
        sourcesScanned
      );

      // Existing opportunities for deduplication lookup
      const existingOpportunities = aggregationStorage.getOpportunities();

      // Iterate through each source
      for (let i = 0; i < sourcesToProcess.length; i++) {
        const source = sourcesToProcess[i];
        const collector = getCollectorForSource(source);
        const sourceProgress = Math.round(10 + (i / sourcesToProcess.length) * 80);

        // -------------------------------------------------------------
        // STAGE 2: FETCH
        // -------------------------------------------------------------
        onProgress?.('FETCH', `Extraction réseau depuis ${source.name} via ${collector.name}...`, sourceProgress);
        
        let rawFetchItems;
        try {
          rawFetchItems = await collector.fetch(source);
          recordStep('FETCH', 'SUCCESS', `${rawFetchItems.length} élément(s) extrait(s) de ${source.name}.`, rawFetchItems.length);
        } catch (fetchErr: any) {
          recordStep('FETCH', 'WARNING', `Échec d'extraction pour ${source.name} : ${fetchErr.message}`);
          continue;
        }

        // -------------------------------------------------------------
        // STAGE 3: RAW CONTENT
        // -------------------------------------------------------------
        for (const raw of rawFetchItems) {
          rawFetched++;
          const contentHash = computeContentHash(`${raw.raw_title} ${raw.raw_content}`);
          const rawItemId = `raw-${source.slug}-${raw.external_id || Date.now()}`;

          const rawItemRecord: SourceItemRecord = {
            id: rawItemId,
            source_id: source.id,
            external_id: raw.external_id,
            url: raw.url,
            raw_title: raw.raw_title,
            raw_content: raw.raw_content,
            raw_html: raw.raw_html,
            published_at: raw.published_at,
            collected_at: new Date().toISOString(),
            content_hash: contentHash,
            status: 'COLLECTED'
          };
          aggregationStorage.saveRawItem(rawItemRecord);

          // -------------------------------------------------------------
          // STAGE 4: PARSER
          // -------------------------------------------------------------
          const parsed = await collector.parse(raw);
          itemsParsed++;
          rawItemRecord.status = 'PARSED';

          // -------------------------------------------------------------
          // STAGE 5: NORMALIZER
          // -------------------------------------------------------------
          const normalizedCandidate = await collector.normalize(parsed, source, rawItemRecord);
          itemsNormalized++;
          rawItemRecord.status = 'NORMALIZED';

          // -------------------------------------------------------------
          // STAGE 6: CLASSIFIER
          // -------------------------------------------------------------
          const classification = classifyContent(
            normalizedCandidate.title || '',
            normalizedCandidate.description || '',
            [source.operator_name || '', source.country || '']
          );
          normalizedCandidate.category = classification.category;
          normalizedCandidate.confidence_score = classification.confidence;
          normalizedCandidate.classification_reason = classification.reason;
          itemsClassified++;

          // -------------------------------------------------------------
          // STAGE 7: DEDUPLICATOR
          // -------------------------------------------------------------
          const dupResult = findDuplicate(
            normalizedCandidate, 
            contentHash, 
            existingOpportunities
          );

          if (dupResult.isDuplicate && dupResult.attributionRecord) {
            duplicatesDetected++;
            rawItemRecord.status = 'DUPLICATE';
            aggregationStorage.saveRawItem(rawItemRecord);

            // Retain duplicate for audit and source attribution
            aggregationStorage.addDuplicate(dupResult.attributionRecord);

            // Update canonical record attribution count
            if (dupResult.canonicalOpportunityId) {
              const canonical = aggregationStorage.getOpportunityById(dupResult.canonicalOpportunityId);
              if (canonical) {
                canonical.duplicate_count = (canonical.duplicate_count || 0) + 1;
                const srcSet = new Set(canonical.duplicate_sources || []);
                srcSet.add(source.name);
                canonical.duplicate_sources = Array.from(srcSet);
                aggregationStorage.saveOpportunity(canonical);
              }
            }

            // Do not publish duplicate as a standalone entry
            continue;
          }

          // -------------------------------------------------------------
          // STAGE 8: VALIDATOR
          // -------------------------------------------------------------
          const validation = collector.validate(normalizedCandidate);
          if (!validation.valid) {
            rawItemRecord.status = 'REJECTED';
            aggregationStorage.saveRawItem(rawItemRecord);
            recordStep('VALIDATOR', 'WARNING', `Validation échouée pour « ${normalizedCandidate.title} »: ${validation.errors.join(', ')}`);
            continue;
          }
          itemsValidated++;

          // -------------------------------------------------------------
          // STAGE 9: PUBLISHER
          // -------------------------------------------------------------
          const oppId = `opp-${source.slug}-${raw.external_id || Math.random().toString(36).substr(2, 6)}`;
          const nowStr = new Date().toISOString();

          // Compute lifecycle
          const { status: lifecycleStatus } = calculateLifecycleStatus(normalizedCandidate.deadline || null);

          // Verification policy: by default PENDING unless source is officially verified by COS
          // "Une collecte automatique ne signifie PAS qu'une opportunité est automatiquement vérifiée."
          const verification_status: OpportunityVerificationStatus = source.official ? 'PENDING' : 'PENDING';

          const finalOpportunity: NormalizedOpportunity = {
            id: oppId,
            source_id: source.id,
            source_item_id: rawItemId,
            title: normalizedCandidate.title || 'Opportunité sans titre',
            slug: normalizedCandidate.slug || `opp-${Date.now()}`,
            description: normalizedCandidate.description || '',
            organization: normalizedCandidate.organization || source.name,
            category: normalizedCandidate.category || 'AUTRE',
            sector: normalizedCandidate.sector || 'Gouvernance & Développement',
            country: normalizedCandidate.country || 'Bénin',
            city: normalizedCandidate.city || 'Cotonou',
            remote: normalizedCandidate.remote || 'ON_SITE',
            experience_level: normalizedCandidate.experience_level || 'Tous profils',
            education_level: normalizedCandidate.education_level || 'Non spécifié',
            contract_type: normalizedCandidate.contract_type || 'Avis Public',
            salary: normalizedCandidate.salary || null,
            application_url: normalizedCandidate.application_url || source.website,
            source_url: normalizedCandidate.source_url || source.website,
            published_at: normalizedCandidate.published_at || nowStr,
            deadline: normalizedCandidate.deadline || null,
            collected_at: nowStr,
            last_verified_at: null,
            status: lifecycleStatus,
            verification_status,
            created_at: nowStr,
            updated_at: nowStr,
            source_name: source.name,
            verified_by: null,
            duplicate_count: 0,
            duplicate_sources: [],
            confidence_score: normalizedCandidate.confidence_score,
            classification_reason: normalizedCandidate.classification_reason
          };

          aggregationStorage.saveOpportunity(finalOpportunity);
          existingOpportunities.unshift(finalOpportunity);
          opportunitiesPublished++;

          // Audit log
          const auditLog: OpportunityAuditLog = {
            id: `audit-${oppId}-${Date.now()}`,
            opportunity_id: oppId,
            action: 'COLLECTED',
            timestamp: nowStr,
            source_id: source.id,
            source_name: source.name,
            original_url: finalOpportunity.source_url,
            published_at: finalOpportunity.published_at,
            verified_at: null,
            admin_user: 'AGGREGATION_ENGINE',
            details: `Collecté via ${collector.name}. Classé dans ${finalOpportunity.category}. Statut initial: ${verification_status}.`
          };
          aggregationStorage.addAuditLog(auditLog);
        }
      }

      // Process global expirations
      onProgress?.('PUBLISHER', 'Calcul et mise à jour des cycles d’expiration...', 95);
      const allOpps = aggregationStorage.getOpportunities();
      const expRes = processAllExpirations(allOpps);
      if (expRes.updatedCount > 0) {
        expRes.opportunities.forEach(o => aggregationStorage.saveOpportunity(o));
      }

      const durationMs = Date.now() - startTime;
      recordStep(
        'PUBLISHER', 
        'SUCCESS', 
        `Pipeline achevé avec succès en ${(durationMs / 1000).toFixed(2)}s : ${opportunitiesPublished} nouvelle(s) opportunité(s) indexée(s), ${duplicatesDetected} doublon(s) tracés.`,
        opportunitiesPublished
      );

      const report: PipelineExecutionReport = {
        run_id: runId,
        started_at: new Date(startTime).toISOString(),
        completed_at: new Date().toISOString(),
        duration_ms: durationMs,
        sources_scanned: sourcesScanned,
        raw_items_fetched: rawFetched,
        items_parsed: itemsParsed,
        items_normalized: itemsNormalized,
        items_classified: itemsClassified,
        duplicates_detected: duplicatesDetected,
        items_validated: itemsValidated,
        opportunities_published: opportunitiesPublished,
        expirations_updated: expRes.updatedCount,
        step_logs: stepLogs
      };

      aggregationStorage.addReport(report);
      onProgress?.('PUBLISHER', 'Pipeline terminé.', 100);
      return report;
    } finally {
      this.isRunning = false;
    }
  }
}

export const aggregationEngine = new WikiJobAggregationEngine();
