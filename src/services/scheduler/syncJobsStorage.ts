import { 
  SyncJobRecord, 
  SourceHealthReport, 
  NotificationDigest, 
  SchedulerConfig,
  HealthStatus,
  JobStatus
} from '../../types/scheduler';
import { INITIAL_WIKIJOB_SOURCES } from '../../data/wikijobInitialSources';

const SYNC_JOBS_KEY = 'wikijob_sync_jobs_v1';
const HEALTH_REPORTS_KEY = 'wikijob_health_reports_v1';
const NOTIFICATION_DIGESTS_KEY = 'wikijob_notification_digests_v1';
const SCHEDULER_CONFIG_KEY = 'wikijob_scheduler_config_v1';

export class SyncJobsStorage {
  private jobs: SyncJobRecord[] = [];
  private healthReports: SourceHealthReport[] = [];
  private digests: NotificationDigest[] = [];
  private config: SchedulerConfig;
  private listeners: Array<() => void> = [];

  constructor() {
    this.config = this.getDefaultConfig();
    this.init();
  }

  private getDefaultConfig(): SchedulerConfig {
    const next = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    return {
      enabled: true,
      interval_hours: 24,
      next_run_at: next,
      last_run_at: '2026-09-28T09:30:00Z',
      last_success_run_at: '2026-09-28T09:30:00Z',
      max_retries: 3,
      backoff_initial_ms: 500,
      backoff_multiplier: 2
    };
  }

  private init() {
    if (typeof window === 'undefined') {
      this.seedInitialData();
      return;
    }

    try {
      const storedJobs = localStorage.getItem(SYNC_JOBS_KEY);
      const storedHealth = localStorage.getItem(HEALTH_REPORTS_KEY);
      const storedDigests = localStorage.getItem(NOTIFICATION_DIGESTS_KEY);
      const storedConfig = localStorage.getItem(SCHEDULER_CONFIG_KEY);

      if (storedJobs && storedHealth) {
        this.jobs = JSON.parse(storedJobs);
        this.healthReports = JSON.parse(storedHealth);
        this.digests = storedDigests ? JSON.parse(storedDigests) : [];
        this.config = storedConfig ? JSON.parse(storedConfig) : this.getDefaultConfig();
        return;
      }
    } catch (e) {
      console.warn('Failed to parse sync jobs storage from localStorage, reseeding defaults', e);
    }

    this.seedInitialData();
  }

  private persist() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SYNC_JOBS_KEY, JSON.stringify(this.jobs));
        localStorage.setItem(HEALTH_REPORTS_KEY, JSON.stringify(this.healthReports));
        localStorage.setItem(NOTIFICATION_DIGESTS_KEY, JSON.stringify(this.digests));
        localStorage.setItem(SCHEDULER_CONFIG_KEY, JSON.stringify(this.config));
      } catch (e) {
        console.error('Failed to persist sync jobs storage', e);
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
    // Generate initial health reports for the 8 official sources
    const healthReports: SourceHealthReport[] = INITIAL_WIKIJOB_SOURCES.map(source => {
      let status: HealthStatus = 'HEALTHY';
      let message = 'Télémétrie opérationnelle. Réponses conformes aux seuils.';
      let consecutive_failures = 0;
      let respTime = 145;

      if (!source.active) {
        status = 'DISABLED';
        message = 'Source temporairement désactivée par un administrateur.';
      } else if (source.source_type === 'FUTURE_CONNECTOR') {
        status = 'WARNING';
        message = 'Connecteur en attente d’homologation administrative avec les services de l’organisme.';
        respTime = 280;
      }

      return {
        source_id: source.id,
        source_name: source.name,
        source_slug: source.slug,
        status,
        last_success_at: source.last_success_at,
        last_checked_at: source.last_checked_at,
        last_error_at: source.last_error_at,
        consecutive_failures,
        response_time_ms: respTime,
        message
      };
    });

    // Generate initial seed jobs in sync_jobs
    const jobs: SyncJobRecord[] = [
      {
        id: 'job-daily-20260928',
        source_id: 'ALL',
        source_name: 'Ensemble des Sources Actives (Bénin)',
        job_type: 'daily_sync',
        started_at: '2026-09-28T09:00:00Z',
        completed_at: '2026-09-28T09:04:12Z',
        status: 'SUCCESS',
        items_found: 18,
        items_created: 4,
        items_updated: 12,
        items_duplicates: 2,
        items_rejected: 0,
        error_message: null,
        retry_count: 0,
        duration_ms: 252000,
        step_details: [
          { step: '1. Charger les sources actives', timestamp: '2026-09-28T09:00:01Z', message: '8 sources chargées', ok: true },
          { step: '2. Vérifier les publications', timestamp: '2026-09-28T09:01:00Z', message: '18 avis détectés', ok: true },
          { step: '3. Récupérer les données', timestamp: '2026-09-28T09:02:10Z', message: 'Payloads archivés dans source_items', ok: true },
          { step: '4-7. Normaliser & Dédupliquer', timestamp: '2026-09-28T09:03:00Z', message: '16 opportunités uniques, 2 doublons tracés', ok: true },
          { step: '8-10. Mettre en attente & Expirations', timestamp: '2026-09-28T09:03:45Z', message: 'Nouvelles données taguées PENDING', ok: true },
          { step: '11-12. Statistiques & Job Log', timestamp: '2026-09-28T09:04:12Z', message: 'Table sync_jobs mise à jour', ok: true }
        ]
      },
      {
        id: 'job-deadline-20260928',
        source_id: 'ALL',
        source_name: 'Toutes opportunités',
        job_type: 'deadline_check',
        started_at: '2026-09-28T04:00:00Z',
        completed_at: '2026-09-28T04:00:15Z',
        status: 'SUCCESS',
        items_found: 16,
        items_created: 0,
        items_updated: 3,
        items_duplicates: 0,
        items_rejected: 0,
        error_message: null,
        retry_count: 0,
        duration_ms: 15000,
        step_details: [
          { step: 'Audit deadlines', timestamp: '2026-09-28T04:00:05Z', message: '3 opportunités flaguées EXPIRING_SOON (<7j)', ok: true }
        ]
      },
      {
        id: 'job-health-20260928',
        source_id: 'ALL',
        source_name: 'Audit Global des Connecteurs',
        job_type: 'health_check',
        started_at: '2026-09-28T00:30:00Z',
        completed_at: '2026-09-28T00:30:45Z',
        status: 'SUCCESS',
        items_found: 8,
        items_created: 0,
        items_updated: 0,
        items_duplicates: 0,
        items_rejected: 0,
        error_message: null,
        retry_count: 0,
        duration_ms: 45000
      }
    ];

    // Seed initial digest
    const digests: NotificationDigest[] = [
      {
        id: 'digest-20260928',
        generated_at: '2026-09-28T10:00:00Z',
        period_start: '2026-09-27T00:00:00Z',
        period_end: '2026-09-28T10:00:00Z',
        total_new_opportunities: 3,
        expiring_soon_count: 2,
        items: [
          {
            id: 'opp-anpe-01',
            title: 'Conseillers en Insertion Professionnelle et Bilan de Compétences',
            organization: 'SICA ANPE Bénin',
            category: 'EMPLOI',
            deadline: '2026-10-25',
            url: 'https://anpe.bj/offres/detail/CIP-2026-09',
            published_at: '2026-09-25T10:00:00Z'
          },
          {
            id: 'opp-psie-01',
            title: 'Auditeurs Internes Juniors & Contrôleurs de Gestion',
            organization: 'PSIE Bénin',
            category: 'EMPLOI',
            deadline: '2026-10-30',
            url: 'https://psie.bj/postuler/fin-2026-419',
            published_at: '2026-09-26T08:00:00Z'
          }
        ],
        recipients: ['candidats-benin@tsf.africa', 'pole-emploi@anpe.bj']
      }
    ];

    this.jobs = jobs;
    this.healthReports = healthReports;
    this.digests = digests;
    this.config = this.getDefaultConfig();
    this.persist();
  }

  // Jobs Methods
  public getJobs(): SyncJobRecord[] {
    return [...this.jobs];
  }

  public getJobById(id: string): SyncJobRecord | null {
    const j = this.jobs.find(x => x.id === id);
    return j ? { ...j } : null;
  }

  public saveJob(job: SyncJobRecord): SyncJobRecord {
    const idx = this.jobs.findIndex(x => x.id === job.id);
    if (idx >= 0) {
      this.jobs[idx] = job;
    } else {
      this.jobs.unshift(job);
    }
    // Limit to last 200 jobs
    if (this.jobs.length > 200) {
      this.jobs = this.jobs.slice(0, 200);
    }
    this.persist();
    return job;
  }

  // Health Reports Methods
  public getHealthReports(): SourceHealthReport[] {
    return [...this.healthReports];
  }

  public getHealthReport(sourceId: string): SourceHealthReport | null {
    const r = this.healthReports.find(x => x.source_id === sourceId);
    return r ? { ...r } : null;
  }

  public updateSourceHealth(
    sourceId: string, 
    sourceName: string, 
    sourceSlug: string,
    success: boolean, 
    responseTimeMs: number, 
    message: string,
    errorDetail?: string
  ): SourceHealthReport {
    const now = new Date().toISOString();
    let current = this.getHealthReport(sourceId);

    if (!current) {
      current = {
        source_id: sourceId,
        source_name: sourceName,
        source_slug: sourceSlug,
        status: success ? 'HEALTHY' : 'ERROR',
        last_success_at: success ? now : null,
        last_checked_at: now,
        last_error_at: success ? null : now,
        consecutive_failures: success ? 0 : 1,
        response_time_ms: responseTimeMs,
        message,
        error_detail: errorDetail
      };
      this.healthReports.push(current);
    } else {
      const consecutive_failures = success ? 0 : current.consecutive_failures + 1;
      let status: HealthStatus = 'HEALTHY';

      if (!success) {
        status = consecutive_failures >= 3 ? 'ERROR' : 'WARNING';
      }

      current = {
        ...current,
        status,
        // CRITICAL: NEVER overwrite last_success_at if the job failed!
        last_success_at: success ? now : current.last_success_at,
        last_checked_at: now,
        last_error_at: success ? current.last_error_at : now,
        consecutive_failures,
        response_time_ms: responseTimeMs,
        message,
        error_detail: success ? undefined : errorDetail
      };

      const idx = this.healthReports.findIndex(x => x.source_id === sourceId);
      this.healthReports[idx] = current;
    }

    this.persist();
    return current;
  }

  // Digests
  public getDigests(): NotificationDigest[] {
    return [...this.digests];
  }

  public addDigest(digest: NotificationDigest): void {
    this.digests.unshift(digest);
    if (this.digests.length > 50) {
      this.digests = this.digests.slice(0, 50);
    }
    this.persist();
  }

  // Config
  public getConfig(): SchedulerConfig {
    return { ...this.config };
  }

  public updateConfig(updates: Partial<SchedulerConfig>): SchedulerConfig {
    this.config = { ...this.config, ...updates };
    this.persist();
    return { ...this.config };
  }

  public resetToDefaults(): void {
    this.seedInitialData();
  }
}

export const syncJobsStorage = new SyncJobsStorage();
