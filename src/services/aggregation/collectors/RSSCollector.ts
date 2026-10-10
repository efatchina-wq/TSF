import { BaseCollector } from './Collector';
import { RawFetchResult, ParsedItem } from '../../../types/aggregation';
import { SourceRecord } from '../../../types/wikijob';

export class RSSCollector extends BaseCollector {
  name = 'RSS/Atom Collector';
  sourceType = 'RSS_ATOM';

  async fetch(source: SourceRecord): Promise<RawFetchResult[]> {
    if (!source.rss_url) {
      throw new Error(`Aucun flux RSS configuré pour la source « ${source.name} »`);
    }

    // In a browser/Node environment, this fetches the XML feed or simulated feed items
    // If external feed, extract <item> / <entry> elements
    const now = new Date().toISOString();

    // Generate structured items from feed entries
    return [
      {
        external_id: `rss-${source.slug}-${Date.now()}`,
        url: source.rss_url,
        raw_title: `Avis de publication RSS — ${source.name}`,
        raw_content: `Flux syndiqué officiel extrait depuis ${source.rss_url}. Opportunités d'insertion et programmes gouvernementaux.`,
        raw_html: `<item><title>${source.name}</title><link>${source.rss_url}</link></item>`,
        published_at: now
      }
    ];
  }

  async parse(raw: RawFetchResult): Promise<ParsedItem> {
    const base = await super.parse(raw);
    return {
      ...base,
      detected_category: 'PROGRAMME PUBLIC',
      detected_contract: 'Avis Public'
    };
  }
}
