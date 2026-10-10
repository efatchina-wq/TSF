import { BaseCollector } from './Collector';
import { RawFetchResult, ParsedItem } from '../../../types/aggregation';
import { SourceRecord } from '../../../types/wikijob';

export class SitemapCollector extends BaseCollector {
  name = 'Sitemap XML Collector';
  sourceType = 'SITEMAP';

  async fetch(source: SourceRecord): Promise<RawFetchResult[]> {
    const sitemapUrl = `${source.website.replace(/\/+$/, '')}/sitemap.xml`;
    const now = new Date().toISOString();

    return [
      {
        external_id: `sitemap-${source.slug}-${Date.now()}`,
        url: sitemapUrl,
        raw_title: `Indexation Sitemap — ${source.name}`,
        raw_content: `Indexation sélective des URLs du sitemap ${sitemapUrl} sous le préfixe /offres ou /recrutements.`,
        raw_html: `<urlset><url><loc>${source.website}</loc><lastmod>${now}</lastmod></url></urlset>`,
        published_at: now
      }
    ];
  }
}
