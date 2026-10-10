import { Collector } from '../../../types/aggregation';
import { SourceRecord } from '../../../types/wikijob';
import { RSSCollector } from './RSSCollector';
import { APICollector } from './APICollector';
import { SitemapCollector } from './SitemapCollector';
import { WebCollector } from './WebCollector';
import { ManualImporter } from './ManualImporter';

const rssCollector = new RSSCollector();
const apiCollector = new APICollector();
const sitemapCollector = new SitemapCollector();
const webCollector = new WebCollector();
const manualImporter = new ManualImporter();

export function getCollectorForSource(source: SourceRecord): Collector {
  switch (source.source_type) {
    case 'RSS_ATOM':
      return rssCollector;
    case 'OFFICIAL_API':
      return apiCollector;
    case 'SITEMAP':
      return sitemapCollector;
    case 'MANUAL_IMPORT':
      return manualImporter;
    case 'FUTURE_CONNECTOR':
    case 'STRUCTURED_SOURCE':
    case 'WEB_PUBLIC':
    default:
      return webCollector;
  }
}
