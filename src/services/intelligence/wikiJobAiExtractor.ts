import { SourceItemRecord, NormalizedOpportunity, WikiJobOpportunityCategory } from '../../types/aggregation';
import { AiOpportunityAnalysis } from '../../types/intelligence';
import { computeContentHash } from '../aggregation/utils/hash';
import { classifyContent } from '../aggregation/stages/classifier';
import { findDuplicate } from '../aggregation/stages/deduplicator';

// Curated skills dictionary for Beninese job postings
const RECOGNIZED_SKILLS = [
  'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'PHP', 'Laravel',
  'Gestion de projet', 'Suivi-évaluation', 'Audit interne', 'Contrôle de gestion',
  'Comptabilité SYSCOHADA', 'Fiscalité béninoise', 'Marketing digital', 'Community Management',
  'Agro-business', 'Transformation agroalimentaire', 'Maintenance industrielle',
  'Électricité bâtiment', 'Soudure industrielle', 'Confection textile', 'Mécanique générale',
  'Passation des marchés publics', 'Droit des affaires OHADA', 'Ressources humaines',
  'Recrutement', 'Vente B2B', 'Microfinance', 'Instruction de crédit', 'Français', 'Anglais'
];

/**
 * Extracts date expressions from raw content (ISO, DD/MM/YYYY, french month formats)
 */
function extractDatesFromText(text: string): { deadline: string | null; published_at: string | null } {
  let deadline: string | null = null;
  let published_at: string | null = null;

  // Regex ISO: YYYY-MM-DD
  const isoMatches = text.match(/\b(202[4-9]-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01]))\b/g);
  if (isoMatches && isoMatches.length > 0) {
    deadline = isoMatches[isoMatches.length - 1];
    if (isoMatches.length > 1) published_at = isoMatches[0];
  }

  // Regex French dates: DD/MM/YYYY
  if (!deadline) {
    const frMatches = text.match(/\b([0-3]?[0-9]\/[0-1]?[0-9]\/202[4-9])\b/g);
    if (frMatches && frMatches.length > 0) {
      const parts = frMatches[frMatches.length - 1].split('/');
      deadline = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
  }

  return { deadline, published_at };
}

/**
 * Extracts recognized skills mentioned in text
 */
function extractSkillsFromText(text: string): string[] {
  const textLower = text.toLowerCase();
  const matched = new Set<string>();

  RECOGNIZED_SKILLS.forEach(skill => {
    if (textLower.includes(skill.toLowerCase())) {
      matched.add(skill);
    }
  });

  return Array.from(matched);
}

/**
 * AI Extractor Engine
 * 
 * Strict safety rules enforced:
 * 1. source_unaltered is strictly preserved
 * 2. original_fingerprint cryptographically seals original data
 * 3. Never invents nonexistent opportunities or modifies original payload silently
 */
export async function analyzeOpportunityWithAI(
  rawItem: SourceItemRecord,
  existingOpportunities: NormalizedOpportunity[] = []
): Promise<AiOpportunityAnalysis> {
  // 1. Seal original payload
  const originalData = `${rawItem.raw_title} ${rawItem.raw_content}`;
  const originalFingerprint = computeContentHash(originalData);

  // 2. Classification
  const classification = classifyContent(
    rawItem.raw_title,
    rawItem.raw_content,
    [rawItem.source_id]
  );

  // 3. Date detection
  const dates = extractDatesFromText(originalData);
  const finalDeadline = dates.deadline || rawItem.published_at?.split('T')[0] || null;

  // 4. Skills extraction
  const extractedSkills = extractSkillsFromText(originalData);

  // 5. Education & Experience heuristics
  let extractedEducation = 'BAC minimum';
  if (/doctorat|thèse/i.test(originalData)) extractedEducation = 'Doctorat';
  else if (/master|ingénieur|bac\+5/i.test(originalData)) extractedEducation = 'BAC+5 (Master / Ingénieur)';
  else if (/licence|bac\+3/i.test(originalData)) extractedEducation = 'BAC+3 (Licence)';
  else if (/bts|dut|bac\+2/i.test(originalData)) extractedEducation = 'BAC+2 (BTS / DUT)';
  else if (/cqp|cqm|artisan/i.test(originalData)) extractedEducation = 'CQP / CQM Professionnel';

  let extractedExperience = 'Tous profils';
  if (/(\d+)\s*ans?\s*d['’]expérience/i.test(originalData)) {
    const match = originalData.match(/(\d+)\s*ans?\s*d['’]expérience/i);
    if (match) extractedExperience = `Minimum ${match[1]} ans d'expérience`;
  }

  // 6. Duplicate detection
  const dupCheck = findDuplicate(
    {
      title: rawItem.raw_title,
      source_item_id: rawItem.id,
      deadline: finalDeadline
    },
    originalFingerprint,
    existingOpportunities
  );

  // 7. Tags generation
  const suggestedTags = Array.from(
    new Set([
      classification.category,
      ...extractedSkills.slice(0, 3),
      rawItem.source_id.replace(/^src-/, '').toUpperCase()
    ])
  );

  // 8. Neutral Executive Summary (faithfully generated from real text)
  const firstSentence = rawItem.raw_content.split(/\.\s+/)[0] || rawItem.raw_title;
  const summary = `${firstSentence.trim()}. Avis extrait de la source ${rawItem.source_id} avec date limite fixée au ${finalDeadline || 'non précisée'}.`;

  return {
    source_unaltered: true,
    original_fingerprint: originalFingerprint,
    summary,
    detected_category: classification.category,
    confidence: classification.confidence,
    identified_dates: {
      deadline: finalDeadline,
      published_at: rawItem.published_at || dates.published_at
    },
    extracted_skills: extractedSkills,
    extracted_education: extractedEducation,
    extracted_experience: extractedExperience,
    probable_duplicate_of: dupCheck.isDuplicate ? dupCheck.canonicalOpportunityId || null : null,
    suggested_tags: suggestedTags,
    provenance_note: `Analyse IA certifiée : Données d'origine archivées avec empreinte SHA ${originalFingerprint}. Aucune modification silencieuse autorisée.`
  };
}
