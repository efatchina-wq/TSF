import { 
  NormalizedOpportunity, 
  DuplicateAttributionRecord, 
  DeduplicationCriterion 
} from '../../../types/aggregation';
import { calculateStringSimilarity, isFuzzyDuplicate } from '../utils/similarity';

export interface DeduplicationCheckResult {
  isDuplicate: boolean;
  canonicalOpportunityId?: string;
  matchedCriteria: DeduplicationCriterion[];
  similarityScore: number;
  attributionRecord?: DuplicateAttributionRecord;
  reason?: string;
}

export function findDuplicate(
  candidate: Partial<NormalizedOpportunity>,
  candidateHash: string,
  existingOpportunities: NormalizedOpportunity[]
): DeduplicationCheckResult {
  if (!existingOpportunities || existingOpportunities.length === 0) {
    return {
      isDuplicate: false,
      matchedCriteria: [],
      similarityScore: 0
    };
  }

  for (const existing of existingOpportunities) {
    const matchedCriteria: DeduplicationCriterion[] = [];
    let similarityScore = 0;

    // 1. URL match
    const candUrl = (candidate.application_url || candidate.source_url || '').trim().toLowerCase();
    const existUrl = (existing.application_url || existing.source_url || '').trim().toLowerCase();
    if (candUrl && existUrl && (candUrl === existUrl || candUrl.replace(/\/+$/, '') === existUrl.replace(/\/+$/, ''))) {
      matchedCriteria.push('URL');
      similarityScore = Math.max(similarityScore, 0.95);
    }

    // 2. External ID match (within same or cross-source reference)
    if (candidate.source_item_id && existing.source_item_id && candidate.source_item_id === existing.source_item_id) {
      matchedCriteria.push('EXTERNAL_ID');
      similarityScore = Math.max(similarityScore, 0.99);
    }

    // 3. Hash match
    // Candidate hash vs existing calculated
    if (candidateHash && (candidateHash === existing.source_item_id || candidateHash.includes(existing.slug))) {
      matchedCriteria.push('HASH');
      similarityScore = Math.max(similarityScore, 0.95);
    }

    // 4. Fuzzy Title & Organization similarity
    const candTitle = candidate.title || '';
    const existTitle = existing.title || '';
    const candOrg = candidate.organization || '';
    const existOrg = existing.organization || '';

    const fuzzy = isFuzzyDuplicate(candTitle, existTitle, candOrg, existOrg, 0.70);
    if (fuzzy.isDuplicate) {
      matchedCriteria.push('TITRE');
      if (calculateStringSimilarity(candOrg, existOrg) > 0.6) {
        matchedCriteria.push('ORGANISATION');
      }
      similarityScore = Math.max(similarityScore, fuzzy.score);
    }

    // 5. Deadline + Organization match
    if (candidate.deadline && existing.deadline && candidate.deadline === existing.deadline) {
      if (matchedCriteria.includes('ORGANISATION') || calculateStringSimilarity(candOrg, existOrg) > 0.6) {
        matchedCriteria.push('DEADLINE');
        similarityScore = Math.max(similarityScore, 0.85);
      }
    }

    // If duplicate detected according to prompt criteria
    if (matchedCriteria.length > 0 && similarityScore >= 0.70) {
      const now = new Date().toISOString();
      const attributionRecord: DuplicateAttributionRecord = {
        id: `dup-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        canonical_opportunity_id: existing.id,
        duplicate_source_item_id: candidate.source_item_id || 'unknown',
        duplicate_source_id: candidate.source_id || 'unknown',
        duplicate_source_name: candidate.source_name || candidate.organization || 'Autre source',
        duplicate_url: candidate.source_url || candidate.application_url || '',
        duplicate_title: candTitle,
        match_criteria: matchedCriteria,
        similarity_score: similarityScore,
        detected_at: now,
        notes: `Doublon identifié sur ${matchedCriteria.join(', ')} (score: ${(similarityScore * 100).toFixed(0)}%). Donnée conservée pour attribution.`
      };

      return {
        isDuplicate: true,
        canonicalOpportunityId: existing.id,
        matchedCriteria,
        similarityScore,
        attributionRecord,
        reason: `Doublon détecté avec « ${existing.title} » (${existing.organization}) via ${matchedCriteria.join(', ')}`
      };
    }
  }

  return {
    isDuplicate: false,
    matchedCriteria: [],
    similarityScore: 0
  };
}
