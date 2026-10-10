import { BaseCollector } from './Collector';
import { RawFetchResult, ParsedItem } from '../../../types/aggregation';
import { SourceRecord } from '../../../types/wikijob';

export class WebCollector extends BaseCollector {
  name = 'Web Public Collector (HTML Parser)';
  sourceType = 'WEB_PUBLIC';

  async fetch(source: SourceRecord): Promise<RawFetchResult[]> {
    // In WikiJob, if the source already has structured opportunity objects configured in the registry,
    // they represent the target items scanned from the official portal.
    // If not, fetch/scrape simulation extracts raw items from the website.
    const results: RawFetchResult[] = [];

    if (source.opportunities && source.opportunities.length > 0) {
      source.opportunities.forEach((opp, idx) => {
        results.push({
          external_id: opp.id || `web-${source.slug}-${idx + 1}`,
          url: opp.url || source.website,
          raw_title: opp.title,
          raw_content: `${opp.title}. ${opp.description}. Bénéficiaires : ${opp.beneficiaries || 'Tous profils'}. Type : ${opp.type}. Localisation : ${opp.location}. Date limite : ${opp.deadline}.`,
          raw_html: `<div class="job-card" data-ref="${opp.reference || ''}"><h2>${opp.title}</h2><p>${opp.description}</p><span class="deadline">${opp.deadline}</span></div>`,
          published_at: opp.published_at || new Date().toISOString()
        });
      });
    } else {
      // Fallback extraction
      results.push({
        external_id: `web-${source.slug}-${Date.now()}`,
        url: source.website,
        raw_title: `Avis général d’opportunités — ${source.name}`,
        raw_content: `Surveillance continue du portail officiel ${source.website}. Dispositifs d'appui et programmes ouverts.`,
        raw_html: `<div class="source-landing"><h1>${source.name}</h1><p>${source.description}</p></div>`,
        published_at: new Date().toISOString()
      });
    }

    return results;
  }

  async parse(raw: RawFetchResult): Promise<ParsedItem> {
    const base = await super.parse(raw);

    // Extract deadline from text if present (e.g. 2026-XX-XX)
    const deadlineMatch = raw.raw_content.match(/202[6-9]-[0-1][0-9]-[0-3][0-9]/);
    const deadline = deadlineMatch ? deadlineMatch[0] : undefined;

    // Detect location
    let location = 'Cotonou, Bénin';
    if (raw.raw_content.includes('Parakou')) location = 'Parakou, Bénin';
    else if (raw.raw_content.includes('Porto-Novo')) location = 'Porto-Novo, Bénin';
    else if (raw.raw_content.includes('Abomey-Calavi')) location = 'Abomey-Calavi, Bénin';
    else if (raw.raw_content.includes('Glo-Djigbé') || raw.raw_content.includes('GDIZ')) location = 'Glo-Djigbé (GDIZ), Bénin';
    else if (raw.raw_content.includes('National')) location = 'National (Bénin)';

    return {
      ...base,
      detected_deadline: deadline,
      detected_location: location
    };
  }
}
