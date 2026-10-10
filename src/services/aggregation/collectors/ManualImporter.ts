import { BaseCollector } from './Collector';
import { RawFetchResult, ParsedItem } from '../../../types/aggregation';
import { SourceRecord } from '../../../types/wikijob';

export class ManualImporter extends BaseCollector {
  name = 'Manual Importer & Session Validator';
  sourceType = 'MANUAL_IMPORT';

  async fetch(source: SourceRecord): Promise<RawFetchResult[]> {
    const results: RawFetchResult[] = [];

    if (source.opportunities && source.opportunities.length > 0) {
      source.opportunities.forEach((opp, idx) => {
        results.push({
          external_id: opp.id || `manual-${source.slug}-${idx + 1}`,
          url: opp.url || source.website,
          raw_title: opp.title,
          raw_content: `${opp.title}. ${opp.description}. Bénéficiaires : ${opp.beneficiaries || ''}. Référence : ${opp.reference || ''}. Date limite : ${opp.deadline}.`,
          raw_html: `<section class="manual-entry" data-operator="${source.operator_name || ''}"><h2>${opp.title}</h2><p>${opp.description}</p></section>`,
          published_at: opp.published_at || new Date().toISOString()
        });
      });
    } else {
      results.push({
        external_id: `manual-${source.slug}-${Date.now()}`,
        url: source.website,
        raw_title: `Session d'Appel à Dossiers — ${source.name}`,
        raw_content: `Session manuelle de dépôt de dossiers collectée auprès du secrétariat technique de ${source.name}.`,
        raw_html: `<div class="session-record">${source.description}</div>`,
        published_at: new Date().toISOString()
      });
    }

    return results;
  }
}
