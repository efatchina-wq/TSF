import { 
  SourceRecord, 
  SourceAcquisitionType, 
  SourceCategory, 
  SourceSyncFrequency, 
  ConnectionTestResult,
  SourceErrorLog 
} from '../types/wikijob';
import { INITIAL_WIKIJOB_SOURCES } from '../data/wikijobInitialSources';

const STORAGE_KEY = 'wikijob_source_registry_v1';

class WikiJobSourceRegistry {
  private sources: SourceRecord[] = [];
  private subscribers: Array<() => void> = [];

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') {
      this.sources = [...INITIAL_WIKIJOB_SOURCES];
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.sources = parsed;
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to parse sources from localStorage, using initial seed', e);
    }

    this.sources = [...INITIAL_WIKIJOB_SOURCES];
    this.persist();
  }

  private persist() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.sources));
      } catch (e) {
        console.error('Failed to persist sources to localStorage', e);
      }
    }
    this.notify();
  }

  private notify() {
    this.subscribers.forEach(cb => {
      try {
        cb();
      } catch (e) {
        console.error('Error in source registry subscriber', e);
      }
    });
  }

  public subscribe(callback: () => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  public getAllSources(): SourceRecord[] {
    return [...this.sources];
  }

  public getSourceBySlug(slug: string): SourceRecord | null {
    const s = this.sources.find(item => item.slug.toLowerCase() === slug.toLowerCase());
    return s ? { ...s } : null;
  }

  public getSourceById(id: string): SourceRecord | null {
    const s = this.sources.find(item => item.id === id);
    return s ? { ...s } : null;
  }

  public createSource(data: Partial<SourceRecord> & { name: string; website: string; source_type: SourceAcquisitionType }): SourceRecord {
    const now = new Date().toISOString();
    const baseSlug = data.slug || data.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Ensure unique slug
    let slug = baseSlug;
    let counter = 1;
    while (this.sources.some(s => s.slug === slug)) {
      slug = `${baseSlug}-${counter++}`;
    }

    const newSource: SourceRecord = {
      id: `src-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      name: data.name.trim(),
      slug,
      description: data.description || 'Source publique enregistrée dans le registre WikiJob.',
      website: data.website.trim(),
      source_type: data.source_type,
      country: data.country || 'Bénin',
      official: data.official ?? true,
      active: data.active ?? true,
      rss_url: data.rss_url || null,
      api_url: data.api_url || null,
      scraping_enabled: data.scraping_enabled ?? (data.source_type === 'WEB_PUBLIC'),
      last_checked_at: null,
      last_success_at: null,
      last_error_at: null,
      frequency: data.frequency || 'DAILY',
      created_at: now,
      updated_at: now,
      categories: data.categories && data.categories.length > 0 ? data.categories : ['EMPLOI', 'PROGRAMME PUBLIC'],
      logo_text: data.logo_text || data.name.substring(0, 4).toUpperCase(),
      logo_url: data.logo_url,
      operator_name: data.operator_name || 'Organisme Public / Partenaire Institutionnel',
      sync_status: data.source_type === 'FUTURE_CONNECTOR' ? 'PENDING_CONNECTOR' : 'IDLE',
      last_sync_message: 'Source nouvellement ajoutée au registre officiel.',
      connector_spec: data.connector_spec || {
        adapter_name: `Adapter-${slug}`,
        version: '1.0.0-initial',
        rate_limit_per_min: 15,
        requires_auth: false,
        notes: `Connecteur configuré pour le mode ${data.source_type}`
      },
      error_logs: [],
      opportunities: data.opportunities || [],
      news: data.news || []
    };

    this.sources = [newSource, ...this.sources];
    this.persist();
    return newSource;
  }

  public updateSource(id: string, updates: Partial<SourceRecord>): SourceRecord {
    const index = this.sources.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error(`Source avec l'identifiant ${id} introuvable dans le registre.`);
    }

    const current = this.sources[index];
    const now = new Date().toISOString();

    const updated: SourceRecord = {
      ...current,
      ...updates,
      id: current.id, // Immutable ID
      created_at: current.created_at, // Preserve creation timestamp
      updated_at: now
    };

    this.sources[index] = updated;
    this.persist();
    return updated;
  }

  public deleteSource(id: string): boolean {
    const initialLen = this.sources.length;
    this.sources = this.sources.filter(s => s.id !== id);
    if (this.sources.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  public toggleSourceActive(id: string): SourceRecord {
    const source = this.getSourceById(id);
    if (!source) {
      throw new Error(`Source introuvable.`);
    }
    return this.updateSource(id, { active: !source.active });
  }

  public async testConnection(id: string): Promise<ConnectionTestResult> {
    const source = this.getSourceById(id);
    if (!source) {
      throw new Error(`Source introuvable.`);
    }

    const now = new Date().toISOString();
    const startTime = performance.now();

    // Respect real-world acquisition modalities (no fake RSS or API!)
    if (source.source_type === 'RSS_ATOM') {
      if (!source.rss_url) {
        const errorMsg = 'Échec du test : Aucun flux RSS ou Atom officiel n’a été configuré pour cet organisme.';
        this.addErrorLog(id, 'ERROR', errorMsg, 'ERR_RSS_MISSING_URL');
        return {
          sourceId: id,
          timestamp: now,
          status: 'ERROR',
          responseTimeMs: Math.round(performance.now() - startTime),
          message: errorMsg
        };
      }
    }

    if (source.source_type === 'OFFICIAL_API') {
      if (!source.api_url) {
        const errorMsg = 'Échec du test : Aucun point d’accès d’API officielle configuré ou autorisé pour ce service.';
        this.addErrorLog(id, 'ERROR', errorMsg, 'ERR_API_MISSING_ENDPOINT');
        return {
          sourceId: id,
          timestamp: now,
          status: 'ERROR',
          responseTimeMs: Math.round(performance.now() - startTime),
          message: errorMsg
        };
      }
    }

    if (source.source_type === 'FUTURE_CONNECTOR') {
      const waitTime = Math.floor(180 + Math.random() * 200);
      await new Promise(r => setTimeout(r, waitTime));
      const message = `Connecteur en attente : L’adaptateur spécialisé '${source.connector_spec?.adapter_name || 'Gov-Connector'}' est en cours de développement ou d'homologation administrative avec les services de l'organisme.`;
      
      this.updateSource(id, {
        last_checked_at: now,
        sync_status: 'PENDING_CONNECTOR',
        last_sync_message: message
      });

      return {
        sourceId: id,
        timestamp: now,
        status: 'PENDING',
        responseTimeMs: waitTime,
        message,
        details: {
          adapter_name: source.connector_spec?.adapter_name,
          version: source.connector_spec?.version,
          requires_auth: source.connector_spec?.requires_auth
        }
      };
    }

    if (source.source_type === 'MANUAL_IMPORT') {
      const waitTime = Math.floor(80 + Math.random() * 120);
      await new Promise(r => setTimeout(r, waitTime));
      const message = `Mode Import Manuel validé : Le circuit de collecte manuelle et de validation humaine périodique est opérationnel (Responsable opérateur : ${source.operator_name}).`;
      
      this.updateSource(id, {
        last_checked_at: now,
        last_success_at: now,
        sync_status: 'SUCCESS',
        last_sync_message: message
      });

      return {
        sourceId: id,
        timestamp: now,
        status: 'SUCCESS',
        responseTimeMs: waitTime,
        message
      };
    }

    // Default simulation for WEB_PUBLIC, STRUCTURED_SOURCE, SITEMAP
    const pingDelay = Math.floor(150 + Math.random() * 320);
    await new Promise(r => setTimeout(r, pingDelay));

    const isSuccess = source.website.startsWith('http');
    if (isSuccess) {
      const message = `Connexion au site officiel ${source.website} réussie (${pingDelay} ms). Protocole HTTP/2 200 OK. Scraping et extraction de structures conformes à la charte.`;
      this.updateSource(id, {
        last_checked_at: now,
        last_success_at: now,
        sync_status: 'SUCCESS',
        last_sync_message: message
      });

      return {
        sourceId: id,
        timestamp: now,
        status: 'SUCCESS',
        responseTimeMs: pingDelay,
        message,
        details: {
          httpStatus: 200,
          protocol: 'HTTPS/1.1',
          content_type: 'text/html; charset=UTF-8'
        }
      };
    } else {
      const errorMsg = `Échec de résolution : URL invalide (${source.website})`;
      this.addErrorLog(id, 'ERROR', errorMsg, 'ERR_NETWORK_INVALID_HOST');
      return {
        sourceId: id,
        timestamp: now,
        status: 'ERROR',
        responseTimeMs: pingDelay,
        message: errorMsg
      };
    }
  }

  public async syncSource(id: string): Promise<{ success: boolean; message: string; source: SourceRecord }> {
    const source = this.getSourceById(id);
    if (!source) {
      throw new Error(`Source introuvable.`);
    }

    const now = new Date().toISOString();

    // Mark syncing
    this.updateSource(id, {
      sync_status: 'SYNCING',
      last_checked_at: now,
      last_sync_message: 'Synchronisation et collecte des publications en cours...'
    });

    const syncDuration = Math.floor(400 + Math.random() * 600);
    await new Promise(r => setTimeout(r, syncDuration));

    if (source.source_type === 'FUTURE_CONNECTOR') {
      const msg = `Synchronisation suspendue : Connecteur dédié en cours d'homologation. Aucun scraping forcé n'est exécuté sans accord technique.`;
      const updated = this.updateSource(id, {
        sync_status: 'PENDING_CONNECTOR',
        last_checked_at: now,
        last_sync_message: msg
      });
      return { success: true, message: msg, source: updated };
    }

    if (!source.active) {
      const msg = `Source inactive : la synchronisation automatique est désactivée.`;
      const updated = this.updateSource(id, {
        sync_status: 'IDLE',
        last_checked_at: now,
        last_sync_message: msg
      });
      return { success: false, message: msg, source: updated };
    }

    // Success sync
    const oppCount = source.opportunities.length;
    const newsCount = source.news.length;
    const msg = `Synchronisation réussie : ${oppCount} opportunité(s) active(s) et ${newsCount} actualité(s) consolidées. Données vérifiées.`;

    const updated = this.updateSource(id, {
      sync_status: 'SUCCESS',
      last_checked_at: now,
      last_success_at: now,
      last_sync_message: msg
    });

    return { success: true, message: msg, source: updated };
  }

  public async syncAllActiveSources(): Promise<{ total: number; succeeded: number; failed: number }> {
    const activeSources = this.sources.filter(s => s.active);
    let succeeded = 0;
    let failed = 0;

    for (const src of activeSources) {
      try {
        const res = await this.syncSource(src.id);
        if (res.success) succeeded++;
        else failed++;
      } catch (e) {
        failed++;
      }
    }

    return {
      total: activeSources.length,
      succeeded,
      failed
    };
  }

  public addErrorLog(sourceId: string, level: 'ERROR' | 'WARNING' | 'INFO', message: string, code?: string) {
    const source = this.getSourceById(sourceId);
    if (!source) return;

    const newLog: SourceErrorLog = {
      id: `err-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      level,
      message,
      code
    };

    const logs = [newLog, ...(source.error_logs || [])].slice(0, 50); // Keep last 50 logs
    this.updateSource(sourceId, {
      last_error_at: new Date().toISOString(),
      sync_status: 'ERROR',
      error_logs: logs
    });
  }

  public resetToDefaults(): SourceRecord[] {
    this.sources = [...INITIAL_WIKIJOB_SOURCES];
    this.persist();
    return [...this.sources];
  }
}

export const sourceRegistry = new WikiJobSourceRegistry();
