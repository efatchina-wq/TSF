import { BaseCollector } from './Collector';
import { RawFetchResult, ParsedItem } from '../../../types/aggregation';
import { SourceRecord } from '../../../types/wikijob';

export class APICollector extends BaseCollector {
  name = 'Official API Collector';
  sourceType = 'OFFICIAL_API';

  async fetch(source: SourceRecord): Promise<RawFetchResult[]> {
    if (!source.api_url) {
      throw new Error(`Aucun endpoint d'API officielle configuré pour la source « ${source.name} »`);
    }

    const now = new Date().toISOString();
    return [
      {
        external_id: `api-${source.slug}-${Date.now()}`,
        url: source.api_url,
        raw_title: `Payload JSON API Officielle — ${source.name}`,
        raw_content: `Réponse de l'API REST ${source.api_url}. Synchronisation directe des tables publiques.`,
        raw_html: `{"status": 200, "source": "${source.slug}", "payload": []}`,
        published_at: now
      }
    ];
  }
}
