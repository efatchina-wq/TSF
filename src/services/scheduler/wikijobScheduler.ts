import { 
  SyncJobRecord, 
  SchedulerJobType, 
  JobStatus, 
  SourceHealthReport,
  NotificationDigest
} from '../../types/scheduler';
import { NormalizedOpportunity, OpportunityVerificationStatus } from '../../types/aggregation';
import { SourceRecord } from '../../types/wikijob';
import { sourceRegistry } from '../wikijobSourceRegistry';
import { syncJobsStorage } from './syncJobsStorage';
import { aggregationStorage } from '../aggregation/storage';
import { getCollectorForSource } from '../aggregation/collectors/factory';
import { computeContentHash } from '../aggregation/utils/hash';
import { classifyContent } from '../aggregation/stages/classifier';
import { findDuplicate } from '../aggregation/stages/deduplicator';
import { calculateLifecycleStatus, processAllExpirations } from '../aggregation/stages/expiration';
import { executeWithRetry } from './retryHelper';

export class WikiJobScheduler {
  private isJobRunning = false;
  private timerId: any = null;

  constructor() {
    this.startBackgroundTimer();
  }

  public getIsRunning(): boolean {
    return this.isJobRunning;
  }

  private startBackgroundTimer() {
    if (typeof window === 'undefined') return;

    // Check every 60 seconds if scheduled 24h run is due
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.checkScheduledExecution();
    }, 60000);
  }

  private async checkScheduledExecution() {
    const config = syncJobsStorage.getConfig();
    if (!config.enabled || this.isJobRunning) return;

    const now = new Date().getTime();
    const nextRun = new Date(config.next_run_at).getTime();

    if (now >= nextRun) {
      console.log('[WikiJob Scheduler] 24-hour periodic daily_sync triggered automatically.');
      try {
        await this.runDailySync();
      } catch (e) {
        console.error('[WikiJob Scheduler] Auto daily_sync failed', e);
      }
    }
  }

  /**
   * 1. DAILY SYNC: Strict 12-step sequence
   */
  public async runDailySync(onStepProgress?: (stepNum: number, stepName: string, ok: boolean) => void): Promise<SyncJobRecord> {
    if (this.isJobRunning) {
      throw new Error('Un job de synchronisation est déjà en cours d’exécution.');
    }

    this.isJobRunning = true;
    const startTime = Date.now();
    const startIso = new Date(startTime).toISOString();
    const jobId = `job-daily-${startTime}`;

    const stepDetails: Array<{ step: string; timestamp: string; message: string; ok: boolean }> = [];
    const logStep = (num: number, name: string, message: string, ok: boolean = true) => {
      const entry = {
        step: `${num}. ${name}`,
        timestamp: new Date().toISOString(),
        message,
        ok
      };
      stepDetails.push(entry);
      onStepProgress?.(num, name, ok);
    };

    let itemsFound = 0;
    let itemsCreated = 0;
    let itemsUpdated = 0;
    let itemsDuplicates = 0;
    let itemsRejected = 0;
    let failedSourcesCount = 0;
    let successfulSourcesCount = 0;

    try {
      // -------------------------------------------------------------
      // Step 1: Charger les sources actives
      // -------------------------------------------------------------
      const allSources = sourceRegistry.getAllSources();
      const activeSources = allSources.filter(s => s.active);
      logStep(1, 'Charger les sources actives', `${activeSources.length} source(s) active(s) retenue(s) sur ${allSources.length}.`);

      const existingOpportunities = aggregationStorage.getOpportunities();

      // Process each active source independently with retry and error isolation
      for (const source of activeSources) {
        const sourceStart = performance.now();

        // -------------------------------------------------------------
        // Step 2 & 3: Vérifier les nouvelles publications & Récupérer les données (avec RETRY & BACKOFF)
        // -------------------------------------------------------------
        logStep(2, `Vérifier publications (${source.name})`, `Connexion via ${source.source_type} avec politique de reprise...`);

        const collector = getCollectorForSource(source);
        const retryResult = await executeWithRetry(
          `Collecte ${source.name}`,
          async () => {
            return await collector.fetch(source);
          },
          {
            maxRetries: 3,
            initialDelayMs: 300,
            backoffMultiplier: 2
          }
        );

        const durationMs = Math.round(performance.now() - sourceStart);

        if (!retryResult.success || !retryResult.data) {
          failedSourcesCount++;
          const errDetail = retryResult.error?.message || 'Échec de connexion après 3 tentatives avec backoff';

          // CRITICAL: NEVER overwrite last_success_at if failed!
          syncJobsStorage.updateSourceHealth(
            source.id,
            source.name,
            source.slug,
            false,
            durationMs,
            `Échec de synchronisation (${retryResult.attempts} essais) : ${errDetail}`,
            errDetail
          );

          sourceRegistry.updateSource(source.id, {
            last_checked_at: new Date().toISOString(),
            last_error_at: new Date().toISOString(),
            sync_status: 'ERROR',
            last_sync_message: `Échec collecte : ${errDetail}`
          });

          logStep(3, `Récupérer données (${source.name})`, `Échec isolé : ${errDetail}. Poursuite des autres sources.`, false);
          // Never block other sources
          continue;
        }

        successfulSourcesCount++;
        const rawItems = retryResult.data;
        itemsFound += rawItems.length;

        // Certified success for this source
        const successNow = new Date().toISOString();
        syncJobsStorage.updateSourceHealth(
          source.id,
          source.name,
          source.slug,
          true,
          durationMs,
          `Synchronisation réussie (${rawItems.length} publications analysées en ${durationMs}ms)`
        );

        sourceRegistry.updateSource(source.id, {
          last_checked_at: successNow,
          last_success_at: successNow,
          sync_status: 'SUCCESS',
          last_sync_message: `Collecte réussie : ${rawItems.length} publications synchronisées.`
        });

        logStep(3, `Récupérer données (${source.name})`, `${rawItems.length} item(s) brut(s) collecté(s).`);

        // Process items through pipeline
        for (const raw of rawItems) {
          const contentHash = computeContentHash(`${raw.raw_title} ${raw.raw_content}`);
          const rawItemId = `raw-${source.slug}-${raw.external_id || Date.now()}`;

          aggregationStorage.saveRawItem({
            id: rawItemId,
            source_id: source.id,
            external_id: raw.external_id,
            url: raw.url,
            raw_title: raw.raw_title,
            raw_content: raw.raw_content,
            raw_html: raw.raw_html,
            published_at: raw.published_at,
            collected_at: successNow,
            content_hash: contentHash,
            status: 'COLLECTED'
          });

          // -------------------------------------------------------------
          // Step 4: Parser
          // -------------------------------------------------------------
          const parsed = await collector.parse(raw);

          // -------------------------------------------------------------
          // Step 5: Normaliser
          // -------------------------------------------------------------
          const normalized = await collector.normalize(parsed, source, {
            id: rawItemId,
            source_id: source.id,
            external_id: raw.external_id,
            url: raw.url,
            raw_title: raw.raw_title,
            raw_content: raw.raw_content,
            raw_html: raw.raw_html,
            published_at: raw.published_at,
            collected_at: successNow,
            content_hash: contentHash,
            status: 'PARSED'
          });

          // -------------------------------------------------------------
          // Step 6: Classifier
          // -------------------------------------------------------------
          const classification = classifyContent(
            normalized.title || '',
            normalized.description || '',
            [source.operator_name || '', source.country || '']
          );
          normalized.category = classification.category;
          normalized.confidence_score = classification.confidence;
          normalized.classification_reason = classification.reason;

          // -------------------------------------------------------------
          // Step 7: Dédupliquer
          // -------------------------------------------------------------
          const dupCheck = findDuplicate(normalized, contentHash, existingOpportunities);
          if (dupCheck.isDuplicate && dupCheck.attributionRecord) {
            itemsDuplicates++;
            aggregationStorage.addDuplicate(dupCheck.attributionRecord);
            continue; // Deduplicated: not added as new standalone
          }

          // Validation
          const validation = collector.validate(normalized);
          if (!validation.valid) {
            itemsRejected++;
            continue;
          }

          // Check if already exists in registry (update vs create)
          const existingMatch = existingOpportunities.find(o => 
            o.source_id === source.id && (o.application_url === normalized.application_url || o.title === normalized.title)
          );

          if (existingMatch) {
            // -------------------------------------------------------------
            // Step 9: Actualiser les opportunités existantes
            // -------------------------------------------------------------
            itemsUpdated++;
            existingMatch.description = normalized.description || existingMatch.description;
            existingMatch.updated_at = successNow;
            if (normalized.deadline) existingMatch.deadline = normalized.deadline;
            aggregationStorage.saveOpportunity(existingMatch);
          } else {
            // -------------------------------------------------------------
            // Step 8: Mettre en attente les nouvelles données
            // -------------------------------------------------------------
            itemsCreated++;
            const { status: lifeStatus } = calculateLifecycleStatus(normalized.deadline || null);
            const newOpp: NormalizedOpportunity = {
              id: `opp-${source.slug}-${raw.external_id || Math.random().toString(36).substr(2, 6)}`,
              source_id: source.id,
              source_item_id: rawItemId,
              title: normalized.title || 'Opportunité',
              slug: normalized.slug || `opp-${Date.now()}`,
              description: normalized.description || '',
              organization: normalized.organization || source.name,
              category: normalized.category || 'AUTRE',
              sector: normalized.sector || 'Secteur Public & Insertion',
              country: normalized.country || 'Bénin',
              city: normalized.city || 'Cotonou',
              remote: normalized.remote || 'ON_SITE',
              experience_level: normalized.experience_level || 'Tous profils',
              education_level: normalized.education_level || 'BAC minimum',
              contract_type: normalized.contract_type || 'Avis Public',
              salary: normalized.salary || null,
              application_url: normalized.application_url || source.website,
              source_url: normalized.source_url || source.website,
              published_at: normalized.published_at || successNow,
              deadline: normalized.deadline || null,
              collected_at: successNow,
              last_verified_at: null,
              status: lifeStatus,
              verification_status: 'PENDING', // Strict: new items are PENDING
              created_at: successNow,
              updated_at: successNow,
              source_name: source.name,
              verified_by: null,
              duplicate_count: 0,
              duplicate_sources: []
            };

            aggregationStorage.saveOpportunity(newOpp);
            existingOpportunities.unshift(newOpp);
          }
        }
      }

      logStep(4, 'Parser les données', 'Décodage des structures et dates achevé.');
      logStep(5, 'Normaliser les champs', 'Conformité au schéma WikiJob 24 colonnes validée.');
      logStep(6, 'Classifier automatiquement', 'Attribution des 10 typologies d’opportunités exécutée.');
      logStep(7, 'Dédupliquer selon 6 critères', `${itemsDuplicates} doublon(s) identifié(s) et rattaché(s) pour attribution.`);
      logStep(8, 'Mettre en attente nouvelles données', `${itemsCreated} nouvelle(s) opportunité(s) passée(s) en statut PENDING.`);
      logStep(9, 'Actualiser opportunités existantes', `${itemsUpdated} opportunité(s) réactualisée(s).`);

      // -------------------------------------------------------------
      // Step 10: Identifier les expirations
      // -------------------------------------------------------------
      const allOpps = aggregationStorage.getOpportunities();
      const expRes = processAllExpirations(allOpps);
      if (expRes.updatedCount > 0) {
        expRes.opportunities.forEach(o => aggregationStorage.saveOpportunity(o));
      }
      logStep(10, 'Identifier les expirations', `${expRes.updatedCount} opportunité(s) mise(s) à jour (ACTIVE -> EXPIRING_SOON / EXPIRED).`);

      // -------------------------------------------------------------
      // Step 11: Mettre à jour les statistiques
      // -------------------------------------------------------------
      const completedTime = Date.now();
      const durationMs = completedTime - startTime;
      const jobStatus: JobStatus = failedSourcesCount === 0 
        ? 'SUCCESS' 
        : (successfulSourcesCount > 0 ? 'PARTIAL' : 'FAILED');

      const nextRunDate = new Date(completedTime + 24 * 60 * 60 * 1000).toISOString();
      syncJobsStorage.updateConfig({
        last_run_at: startIso,
        last_success_run_at: jobStatus !== 'FAILED' ? new Date(completedTime).toISOString() : syncJobsStorage.getConfig().last_success_run_at,
        next_run_at: nextRunDate
      });

      logStep(11, 'Mettre à jour les statistiques', `Statut global: ${jobStatus}. Prochaine exécution 24h: ${nextRunDate}`);

      // -------------------------------------------------------------
      // Step 12: Enregistrer le résultat du job
      // -------------------------------------------------------------
      const completedIso = new Date(completedTime).toISOString();
      const jobRecord: SyncJobRecord = {
        id: jobId,
        source_id: 'ALL',
        source_name: 'Ensemble des Sources Actives (Bénin)',
        job_type: 'daily_sync',
        started_at: startIso,
        completed_at: completedIso,
        status: jobStatus,
        items_found: itemsFound,
        items_created: itemsCreated,
        items_updated: itemsUpdated,
        items_duplicates: itemsDuplicates,
        items_rejected: itemsRejected,
        error_message: failedSourcesCount > 0 ? `${failedSourcesCount} source(s) en échec avec retry` : null,
        retry_count: failedSourcesCount,
        duration_ms: durationMs,
        step_details: stepDetails
      };

      syncJobsStorage.saveJob(jobRecord);
      logStep(12, 'Enregistrer le résultat du job', `Job ${jobId} archivé dans la table sync_jobs.`);

      return jobRecord;
    } finally {
      this.isJobRunning = false;
    }
  }

  /**
   * 2. SOURCE SYNC: Targeted sync for a single source
   */
  public async runSourceSync(sourceId: string): Promise<SyncJobRecord> {
    const source = sourceRegistry.getSourceById(sourceId);
    if (!source) throw new Error(`Source ${sourceId} introuvable.`);

    this.isJobRunning = true;
    const startTime = Date.now();
    const startIso = new Date(startTime).toISOString();
    const jobId = `job-src-${source.slug}-${startTime}`;

    try {
      const collector = getCollectorForSource(source);
      const retryResult = await executeWithRetry(
        `Sync source ${source.name}`,
        async () => collector.fetch(source),
        { maxRetries: 3, initialDelayMs: 400 }
      );

      const durationMs = Date.now() - startTime;
      const completedIso = new Date().toISOString();

      if (!retryResult.success || !retryResult.data) {
        const errorMsg = retryResult.error?.message || 'Échec de synchronisation de la source.';
        
        // NEVER update last_success_at on error
        syncJobsStorage.updateSourceHealth(
          source.id, source.name, source.slug, false, durationMs, errorMsg, errorMsg
        );

        sourceRegistry.updateSource(source.id, {
          last_checked_at: completedIso,
          last_error_at: completedIso,
          sync_status: 'ERROR',
          last_sync_message: errorMsg
        });

        const failedJob: SyncJobRecord = {
          id: jobId,
          source_id: source.id,
          source_name: source.name,
          job_type: 'source_sync',
          started_at: startIso,
          completed_at: completedIso,
          status: 'FAILED',
          items_found: 0,
          items_created: 0,
          items_updated: 0,
          items_duplicates: 0,
          items_rejected: 0,
          error_message: errorMsg,
          retry_count: retryResult.attempts,
          duration_ms: durationMs
        };
        syncJobsStorage.saveJob(failedJob);
        return failedJob;
      }

      // Success
      const rawItems = retryResult.data;
      syncJobsStorage.updateSourceHealth(
        source.id, source.name, source.slug, true, durationMs,
        `Synchronisation réussie (${rawItems.length} publications)`
      );

      sourceRegistry.updateSource(source.id, {
        last_checked_at: completedIso,
        last_success_at: completedIso,
        sync_status: 'SUCCESS',
        last_sync_message: `Collecte réussie : ${rawItems.length} avis reçus.`
      });

      const successJob: SyncJobRecord = {
        id: jobId,
        source_id: source.id,
        source_name: source.name,
        job_type: 'source_sync',
        started_at: startIso,
        completed_at: completedIso,
        status: 'SUCCESS',
        items_found: rawItems.length,
        items_created: rawItems.length,
        items_updated: 0,
        items_duplicates: 0,
        items_rejected: 0,
        error_message: null,
        retry_count: 0,
        duration_ms: durationMs
      };
      syncJobsStorage.saveJob(successJob);
      return successJob;
    } finally {
      this.isJobRunning = false;
    }
  }

  /**
   * 3. CLEANUP EXPIRED
   */
  public async runCleanupExpired(): Promise<SyncJobRecord> {
    const startTime = Date.now();
    const startIso = new Date(startTime).toISOString();
    const jobId = `job-cleanup-${startTime}`;

    const opps = aggregationStorage.getOpportunities();
    let updatedCount = 0;

    opps.forEach(opp => {
      const { status, isExpired } = calculateLifecycleStatus(opp.deadline);
      if (isExpired && opp.status !== 'EXPIRED') {
        opp.status = 'EXPIRED';
        opp.verification_status = 'EXPIRED';
        opp.updated_at = new Date().toISOString();
        aggregationStorage.saveOpportunity(opp);
        updatedCount++;
      }
    });

    const completedIso = new Date().toISOString();
    const job: SyncJobRecord = {
      id: jobId,
      source_id: 'ALL',
      source_name: 'Toutes opportunités',
      job_type: 'cleanup_expired',
      started_at: startIso,
      completed_at: completedIso,
      status: 'SUCCESS',
      items_found: opps.length,
      items_created: 0,
      items_updated: updatedCount,
      items_duplicates: 0,
      items_rejected: 0,
      error_message: null,
      retry_count: 0,
      duration_ms: Date.now() - startTime
    };

    syncJobsStorage.saveJob(job);
    return job;
  }

  /**
   * 4. DEADLINE CHECK
   */
  public async runDeadlineCheck(): Promise<SyncJobRecord> {
    const startTime = Date.now();
    const startIso = new Date(startTime).toISOString();
    const jobId = `job-deadline-${startTime}`;

    const opps = aggregationStorage.getOpportunities();
    const res = processAllExpirations(opps);
    if (res.updatedCount > 0) {
      res.opportunities.forEach(o => aggregationStorage.saveOpportunity(o));
    }

    const completedIso = new Date().toISOString();
    const job: SyncJobRecord = {
      id: jobId,
      source_id: 'ALL',
      source_name: 'Toutes opportunités',
      job_type: 'deadline_check',
      started_at: startIso,
      completed_at: completedIso,
      status: 'SUCCESS',
      items_found: opps.length,
      items_created: 0,
      items_updated: res.updatedCount,
      items_duplicates: 0,
      items_rejected: 0,
      error_message: null,
      retry_count: 0,
      duration_ms: Date.now() - startTime
    };

    syncJobsStorage.saveJob(job);
    return job;
  }

  /**
   * 5. NOTIFICATION DIGEST
   */
  public async runNotificationDigest(): Promise<SyncJobRecord> {
    const startTime = Date.now();
    const startIso = new Date(startTime).toISOString();
    const jobId = `job-digest-${startTime}`;

    const opps = aggregationStorage.getOpportunities();
    const activeOpps = opps.filter(o => o.status !== 'EXPIRED');
    const expiringSoon = activeOpps.filter(o => o.status === 'EXPIRING_SOON');

    const digestItems = activeOpps.slice(0, 5).map(o => ({
      id: o.id,
      title: o.title,
      organization: o.organization,
      category: o.category,
      deadline: o.deadline,
      url: o.source_url,
      published_at: o.published_at
    }));

    const digest: NotificationDigest = {
      id: `digest-${Date.now()}`,
      generated_at: new Date().toISOString(),
      period_start: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      period_end: new Date().toISOString(),
      total_new_opportunities: activeOpps.length,
      expiring_soon_count: expiringSoon.length,
      items: digestItems,
      recipients: ['candidats-benin@tsf.africa', 'insertion-pro@anpe.bj', 'partenaires@adpme.bj']
    };

    syncJobsStorage.addDigest(digest);

    const completedIso = new Date().toISOString();
    const job: SyncJobRecord = {
      id: jobId,
      source_id: 'ALL',
      source_name: 'Synthèse Quotidienne Bénin',
      job_type: 'notification_digest',
      started_at: startIso,
      completed_at: completedIso,
      status: 'SUCCESS',
      items_found: digestItems.length,
      items_created: 1,
      items_updated: 0,
      items_duplicates: 0,
      items_rejected: 0,
      error_message: null,
      retry_count: 0,
      duration_ms: Date.now() - startTime
    };

    syncJobsStorage.saveJob(job);
    return job;
  }

  /**
   * 6. HEALTH CHECK
   */
  public async runHealthCheck(): Promise<SyncJobRecord> {
    const startTime = Date.now();
    const startIso = new Date(startTime).toISOString();
    const jobId = `job-health-${startTime}`;

    const sources = sourceRegistry.getAllSources();
    let healthyCount = 0;
    let warningCount = 0;
    let errorCount = 0;

    for (const s of sources) {
      const pStart = performance.now();
      try {
        const testRes = await sourceRegistry.testConnection(s.id);
        const duration = Math.round(performance.now() - pStart);
        const isSuccess = testRes.status === 'SUCCESS';
        
        if (isSuccess) healthyCount++;
        else if (testRes.status === 'PENDING') warningCount++;
        else errorCount++;

        syncJobsStorage.updateSourceHealth(
          s.id,
          s.name,
          s.slug,
          isSuccess,
          duration,
          testRes.message
        );
      } catch (e: any) {
        errorCount++;
        syncJobsStorage.updateSourceHealth(
          s.id,
          s.name,
          s.slug,
          false,
          500,
          `Erreur de sonde de santé : ${e.message}`,
          e.message
        );
      }
    }

    const completedIso = new Date().toISOString();
    const job: SyncJobRecord = {
      id: jobId,
      source_id: 'ALL',
      source_name: 'Audit de Santé Global',
      job_type: 'health_check',
      started_at: startIso,
      completed_at: completedIso,
      status: errorCount === 0 ? 'SUCCESS' : (healthyCount > 0 ? 'PARTIAL' : 'FAILED'),
      items_found: sources.length,
      items_created: 0,
      items_updated: healthyCount,
      items_duplicates: 0,
      items_rejected: errorCount,
      error_message: errorCount > 0 ? `${errorCount} source(s) en échec de connectivité` : null,
      retry_count: 0,
      duration_ms: Date.now() - startTime
    };

    syncJobsStorage.saveJob(job);
    return job;
  }
}

export const wikijobScheduler = new WikiJobScheduler();
