import { 
  Collector, 
  RawFetchResult, 
  ParsedItem, 
  NormalizedOpportunity, 
  ValidationResult,
  SourceItemRecord,
  WikiJobOpportunityCategory
} from '../../../types/aggregation';
import { SourceRecord } from '../../../types/wikijob';

export abstract class BaseCollector implements Collector {
  abstract name: string;
  abstract sourceType: string;

  abstract fetch(source: SourceRecord): Promise<RawFetchResult[]>;

  async parse(raw: RawFetchResult): Promise<ParsedItem> {
    // Default parsing: strip excessive whitespace and HTML tags if present
    const cleanContent = raw.raw_content
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      external_id: raw.external_id,
      title: raw.raw_title.trim(),
      content: cleanContent,
      html: raw.raw_html,
      url: raw.url,
      published_at: raw.published_at
    };
  }

  async normalize(
    parsed: ParsedItem, 
    source: SourceRecord, 
    rawItem: SourceItemRecord
  ): Promise<Partial<NormalizedOpportunity>> {
    const slug = (parsed.title || 'opportunite')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 80);

    const now = new Date().toISOString();

    return {
      source_id: source.id,
      source_item_id: rawItem.id,
      title: parsed.title,
      slug: `${slug}-${parsed.external_id.substring(0, 8)}`,
      description: parsed.content,
      organization: parsed.detected_organization || source.name,
      sector: 'Gouvernance & Développement',
      country: source.country || 'Bénin',
      city: parsed.detected_location || 'Cotonou',
      remote: 'ON_SITE',
      experience_level: 'Tous profils',
      education_level: 'BAC minimum',
      contract_type: parsed.detected_contract || 'Contrat Public / Spécifique',
      salary: null,
      application_url: parsed.url,
      source_url: parsed.url,
      published_at: parsed.published_at || now,
      deadline: parsed.detected_deadline || null,
      collected_at: rawItem.collected_at,
      last_verified_at: null,
      status: 'ACTIVE',
      verification_status: 'PENDING',
      created_at: now,
      updated_at: now,
      source_name: source.name
    };
  }

  validate(opp: Partial<NormalizedOpportunity>): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!opp.title || opp.title.trim().length < 5) {
      errors.push('Le titre est manquant ou trop court (min. 5 caractères).');
    }

    if (!opp.application_url || !opp.application_url.startsWith('http')) {
      errors.push('L’URL de candidature ou de source est invalide.');
    }

    if (!opp.description || opp.description.trim().length < 20) {
      warnings.push('La description est succincte (moins de 20 caractères).');
    }

    if (!opp.organization) {
      errors.push('L’organisme émetteur est obligatoire.');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }
}
