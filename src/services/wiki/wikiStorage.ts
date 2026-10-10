import { WikiResource, WikiCategory, WikiContentType } from '../../types/wiki';
import { INITIAL_WIKI_RESOURCES } from '../../data/wikiInitialResources';

const WIKI_STORAGE_KEY = 'wikijob_wiki_resources_v1';

export class WikiStorage {
  private resources: WikiResource[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') {
      this.resources = [...INITIAL_WIKI_RESOURCES];
      return;
    }

    try {
      const stored = localStorage.getItem(WIKI_STORAGE_KEY);
      if (stored) {
        this.resources = JSON.parse(stored);
        return;
      }
    } catch (e) {
      console.warn('Failed to parse wiki resources from localStorage, reseeding', e);
    }

    this.resources = [...INITIAL_WIKI_RESOURCES];
    this.persist();
  }

  private persist() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(WIKI_STORAGE_KEY, JSON.stringify(this.resources));
      } catch (e) {
        console.error('Failed to persist wiki resources', e);
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

  public getAllResources(): WikiResource[] {
    return [...this.resources];
  }

  public getPublishedResources(): WikiResource[] {
    return this.resources.filter(r => r.status === 'PUBLISHED');
  }

  public getResourceById(id: string): WikiResource | null {
    const res = this.resources.find(r => r.id === id);
    return res ? { ...res } : null;
  }

  public getResourceBySlug(slug: string): WikiResource | null {
    const res = this.resources.find(r => r.slug === slug);
    return res ? { ...res } : null;
  }

  public createResource(data: Omit<WikiResource, 'id' | 'views_count'>): WikiResource {
    const now = new Date().toISOString();
    const id = `wiki-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newRes: WikiResource = {
      ...data,
      id,
      published_at: data.published_at || now,
      updated_at: now,
      views_count: 0
    };

    this.resources.unshift(newRes);
    this.persist();
    return newRes;
  }

  public updateResource(id: string, updates: Partial<WikiResource>): WikiResource {
    const idx = this.resources.findIndex(r => r.id === id);
    if (idx === -1) {
      throw new Error(`Ressource Wiki #${id} introuvable.`);
    }

    const updated: WikiResource = {
      ...this.resources[idx],
      ...updates,
      updated_at: new Date().toISOString()
    };

    this.resources[idx] = updated;
    this.persist();
    return updated;
  }

  public deleteResource(id: string): void {
    this.resources = this.resources.filter(r => r.id !== id);
    this.persist();
  }

  public incrementViews(id: string): void {
    const idx = this.resources.findIndex(r => r.id === id);
    if (idx !== -1) {
      this.resources[idx].views_count = (this.resources[idx].views_count || 0) + 1;
      this.persist();
    }
  }

  public resetToDefaults(): void {
    this.resources = [...INITIAL_WIKI_RESOURCES];
    this.persist();
  }
}

export const wikiStorage = new WikiStorage();
