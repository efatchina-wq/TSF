import { 
  SourceItemRecord, 
  NormalizedOpportunity, 
  DuplicateAttributionRecord, 
  OpportunityAuditLog,
  PipelineExecutionReport,
  OpportunityVerificationStatus,
  OpportunityLifecycleStatus
} from '../../types/aggregation';
import { INITIAL_WIKIJOB_SOURCES } from '../../data/wikijobInitialSources';
import { computeContentHash } from './utils/hash';
import { calculateLifecycleStatus } from './stages/expiration';

const RAW_ITEMS_KEY = 'wikijob_source_items_v1';
const OPPORTUNITIES_KEY = 'wikijob_opportunities_v1';
const DUPLICATES_KEY = 'wikijob_duplicates_v1';
const AUDIT_LOGS_KEY = 'wikijob_audit_logs_v1';
const REPORTS_KEY = 'wikijob_pipeline_reports_v1';

export class AggregationStorage {
  private rawItems: SourceItemRecord[] = [];
  private opportunities: NormalizedOpportunity[] = [];
  private duplicates: DuplicateAttributionRecord[] = [];
  private auditLogs: OpportunityAuditLog[] = [];
  private reports: PipelineExecutionReport[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') {
      this.seedInitialData();
      return;
    }

    try {
      const storedRaw = localStorage.getItem(RAW_ITEMS_KEY);
      const storedOpp = localStorage.getItem(OPPORTUNITIES_KEY);
      const storedDup = localStorage.getItem(DUPLICATES_KEY);
      const storedAudit = localStorage.getItem(AUDIT_LOGS_KEY);
      const storedReports = localStorage.getItem(REPORTS_KEY);

      if (storedOpp && storedRaw) {
        this.rawItems = JSON.parse(storedRaw);
        this.opportunities = JSON.parse(storedOpp);
        this.duplicates = storedDup ? JSON.parse(storedDup) : [];
        this.auditLogs = storedAudit ? JSON.parse(storedAudit) : [];
        this.reports = storedReports ? JSON.parse(storedReports) : [];
        return;
      }
    } catch (e) {
      console.warn('Failed to parse aggregation data from localStorage, seeding new', e);
    }

    this.seedInitialData();
  }

  private persist() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(RAW_ITEMS_KEY, JSON.stringify(this.rawItems));
        localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(this.opportunities));
        localStorage.setItem(DUPLICATES_KEY, JSON.stringify(this.duplicates));
        localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(this.auditLogs));
        localStorage.setItem(REPORTS_KEY, JSON.stringify(this.reports));
      } catch (e) {
        console.error('Failed to persist aggregation engine storage', e);
      }
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach(cb => {
      try { cb(); } catch (e) { console.error(e); }
    });
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(c => c !== cb);
    };
  }

  private seedInitialData() {
    const rawItems: SourceItemRecord[] = [];
    const opportunities: NormalizedOpportunity[] = [];
    const duplicates: DuplicateAttributionRecord[] = [];
    const auditLogs: OpportunityAuditLog[] = [];

    INITIAL_WIKIJOB_SOURCES.forEach(source => {
      if (source.opportunities && source.opportunities.length > 0) {
        source.opportunities.forEach((opp, idx) => {
          const rawId = `raw-${source.slug}-${idx + 1}`;
          const oppId = `opp-${source.slug}-${idx + 1}`;
          const content = `${opp.title}. ${opp.description}. Bénéficiaires : ${opp.beneficiaries || 'Tous'}. Réf : ${opp.reference || ''}.`;
          const hash = computeContentHash(content);
          const now = new Date().toISOString();

          // Raw item record
          rawItems.push({
            id: rawId,
            source_id: source.id,
            external_id: opp.id,
            url: opp.url,
            raw_title: opp.title,
            raw_content: content,
            raw_html: `<div class="job-item" data-ref="${opp.reference || ''}"><h3>${opp.title}</h3><p>${opp.description}</p></div>`,
            published_at: opp.published_at,
            collected_at: source.last_success_at || now,
            content_hash: hash,
            status: 'NORMALIZED'
          });

          // Compute lifecycle
          const { status } = calculateLifecycleStatus(opp.deadline);

          // Verification status: some verified, some pending to demonstrate human validation requirement
          const isPending = idx === 1 && source.slug !== 'sica-anpe';
          const verification_status: OpportunityVerificationStatus = isPending ? 'PENDING' : 'VERIFIED';
          const verified_by = isPending ? null : 'Comité Technique TSF / Audit Automatisé';
          const last_verified_at = isPending ? null : '2026-09-28T10:00:00Z';

          // Normalized opportunity record
          opportunities.push({
            id: oppId,
            source_id: source.id,
            source_item_id: rawId,
            title: opp.title,
            slug: `${source.slug}-${opp.id.toLowerCase()}`,
            description: opp.description,
            organization: source.name,
            category: (opp.category as any) || 'EMPLOI',
            sector: opp.category === 'FINANCEMENT' ? 'Microfinance & Agriculture' : opp.category === 'FORMATION' ? 'Enseignement Technique & Métiers' : 'Insertion Professionnelle & BTP',
            country: 'Bénin',
            city: opp.location.split(',')[0].trim(),
            remote: 'ON_SITE',
            experience_level: 'Junior / Intermédiaire',
            education_level: opp.beneficiaries || 'BAC minimum',
            contract_type: opp.type,
            salary: opp.category === 'FINANCEMENT' ? 'Subvention / Crédit Bonifié' : 'Grille Officielle État Béninois',
            application_url: opp.url,
            source_url: opp.url,
            published_at: opp.published_at,
            deadline: opp.deadline,
            collected_at: source.last_success_at || now,
            last_verified_at,
            status,
            verification_status,
            created_at: opp.published_at,
            updated_at: now,
            source_name: source.name,
            verified_by,
            duplicate_count: 0,
            duplicate_sources: []
          });

          // Audit log for collection and verification
          auditLogs.push({
            id: `audit-${oppId}-1`,
            opportunity_id: oppId,
            action: 'COLLECTED',
            timestamp: source.last_success_at || now,
            source_id: source.id,
            source_name: source.name,
            original_url: opp.url,
            published_at: opp.published_at,
            verified_at: null,
            admin_user: 'AGGREGATION_ENGINE_V1',
            details: `Collecte automatique effectuée via le collecteur ${source.source_type}. Données brutes archivées.`
          });

          if (!isPending) {
            auditLogs.push({
              id: `audit-${oppId}-2`,
              opportunity_id: oppId,
              action: 'VERIFIED',
              timestamp: '2026-09-28T10:00:00Z',
              source_id: source.id,
              source_name: source.name,
              original_url: opp.url,
              published_at: opp.published_at,
              verified_at: '2026-09-28T10:00:00Z',
              admin_user: 'amenfatchina@gmail.com',
              details: `Conformité de l'avis vérifiée auprès du site officiel de ${source.name}.`
            });
          }
        });
      }
    });

    // Seed duplicate cross-listing for demonstration of the deduplication engine
    // (e.g. AZOLI and SICA ANPE both listing textile factory positions in GDIZ Glo-Djigbé)
    const canonicalOpp = opportunities.find(o => o.title.includes('Textile') || o.title.includes('BTP'));
    if (canonicalOpp) {
      canonicalOpp.duplicate_count = 1;
      canonicalOpp.duplicate_sources = ['ANPE Bénin — Guichet Unique'];

      duplicates.push({
        id: 'dup-seed-01',
        canonical_opportunity_id: canonicalOpp.id,
        duplicate_source_item_id: 'raw-anpe-cross-listing',
        duplicate_source_id: 'src-sica-anpe',
        duplicate_source_name: 'SICA ANPE Bénin',
        duplicate_url: 'https://anpe.bj/offres/gdiz-textile-relais',
        duplicate_title: 'Relais Avis : Opérateurs Industriels Textile GDIZ',
        match_criteria: ['TITRE', 'ORGANISATION', 'DEADLINE'],
        similarity_score: 0.88,
        detected_at: '2026-09-28T10:15:00Z',
        notes: 'Doublon inter-organismes repéré entre le dispositif AZOLI et le portail généraliste ANPE. Attribution conservée.'
      });
    }

    this.rawItems = rawItems;
    this.opportunities = opportunities;
    this.duplicates = duplicates;
    this.auditLogs = auditLogs;
    this.persist();
  }

  // Raw Content Methods
  public getRawItems(): SourceItemRecord[] {
    return [...this.rawItems];
  }

  public getRawItemsBySource(sourceId: string): SourceItemRecord[] {
    return this.rawItems.filter(item => item.source_id === sourceId);
  }

  public saveRawItem(item: SourceItemRecord): SourceItemRecord {
    const idx = this.rawItems.findIndex(i => i.id === item.id);
    if (idx >= 0) {
      this.rawItems[idx] = item;
    } else {
      this.rawItems.unshift(item);
    }
    this.persist();
    return item;
  }

  // Opportunities Methods
  public getOpportunities(): NormalizedOpportunity[] {
    return [...this.opportunities];
  }

  public getOpportunityById(id: string): NormalizedOpportunity | null {
    const opp = this.opportunities.find(o => o.id === id);
    return opp ? { ...opp } : null;
  }

  public saveOpportunity(opp: NormalizedOpportunity): NormalizedOpportunity {
    const idx = this.opportunities.findIndex(o => o.id === opp.id);
    if (idx >= 0) {
      this.opportunities[idx] = opp;
    } else {
      this.opportunities.unshift(opp);
    }
    this.persist();
    return opp;
  }

  public updateOpportunityVerification(
    id: string, 
    status: OpportunityVerificationStatus, 
    adminUser: string,
    notes?: string
  ): NormalizedOpportunity {
    const opp = this.getOpportunityById(id);
    if (!opp) throw new Error(`Opportunité introuvable (${id})`);

    const now = new Date().toISOString();
    const updated: NormalizedOpportunity = {
      ...opp,
      verification_status: status,
      last_verified_at: now,
      verified_by: adminUser,
      updated_at: now
    };

    // If verified, ensure status is ACTIVE or EXPIRING_SOON
    if (status === 'VERIFIED') {
      const { status: lifeStatus } = calculateLifecycleStatus(opp.deadline);
      updated.status = lifeStatus;
    }

    this.saveOpportunity(updated);

    // Audit log
    this.addAuditLog({
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      opportunity_id: id,
      action: status === 'VERIFIED' ? 'VERIFIED' : status === 'REJECTED' ? 'REJECTED' : 'MANUAL_EDIT',
      timestamp: now,
      source_id: opp.source_id,
      source_name: opp.organization,
      original_url: opp.source_url,
      published_at: opp.published_at,
      verified_at: now,
      admin_user: adminUser,
      details: notes || `Mise à jour du statut de vérification à « ${status} » par ${adminUser}.`
    });

    return updated;
  }

  // Duplicates Methods
  public getDuplicates(): DuplicateAttributionRecord[] {
    return [...this.duplicates];
  }

  public addDuplicate(dup: DuplicateAttributionRecord): DuplicateAttributionRecord {
    this.duplicates.unshift(dup);
    this.persist();
    return dup;
  }

  // Audit Logs Methods
  public getAuditLogs(): OpportunityAuditLog[] {
    return [...this.auditLogs];
  }

  public getAuditLogsForOpportunity(oppId: string): OpportunityAuditLog[] {
    return this.auditLogs.filter(log => log.opportunity_id === oppId);
  }

  public addAuditLog(log: OpportunityAuditLog): void {
    this.auditLogs.unshift(log);
    // Keep last 300 logs
    if (this.auditLogs.length > 300) {
      this.auditLogs = this.auditLogs.slice(0, 300);
    }
    this.persist();
  }

  // Reports
  public getReports(): PipelineExecutionReport[] {
    return [...this.reports];
  }

  public addReport(rep: PipelineExecutionReport): void {
    this.reports.unshift(rep);
    if (this.reports.length > 50) {
      this.reports = this.reports.slice(0, 50);
    }
    this.persist();
  }

  public resetAll(): void {
    this.seedInitialData();
  }
}

export const aggregationStorage = new AggregationStorage();
