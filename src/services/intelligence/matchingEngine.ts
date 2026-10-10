import { NormalizedOpportunity, WikiJobOpportunityCategory } from '../../types/aggregation';
import { WikiJobUserProfile, OpportunityMatchResult, OpportunityMatchBreakdown } from '../../types/intelligence';

/**
 * Normalizes text for comparison (lower case, remove accents, trim)
 */
function normalizeStr(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Calculates technical opportunity match based on:
 * - catégorie (25%)
 * - secteur (20%)
 * - localisation (15%)
 * - niveau (10%)
 * - compétences (15%)
 * - formation (10%)
 * - deadline (5%)
 *
 * NOTE: Always output with disclaimer: « Indice de correspondance indicatif »
 * Never presents this score as an automated recruitment decision.
 */
export function calculateOpportunityMatch(
  opportunity: NormalizedOpportunity,
  profile: WikiJobUserProfile | null
): OpportunityMatchResult {
  // If no profile configured yet, return neutral baseline
  if (!profile) {
    return {
      opportunity_id: opportunity.id,
      score: 50,
      score_label: 'MATCH 50%',
      disclaimer: 'Indice de correspondance indicatif',
      breakdown: {
        category_score: 15,
        sector_score: 10,
        location_score: 10,
        education_score: 5,
        skills_score: 5,
        deadline_score: 5,
        matched_skills: [],
        is_deadline_active: opportunity.status !== 'EXPIRED'
      },
      strengths: ['Opportunité ouverte aux candidatures'],
      notes: 'Configurez votre profil pour affiner votre indice indicatif de correspondance.'
    };
  }

  let category_score = 0;
  let sector_score = 0;
  let location_score = 0;
  let education_score = 0;
  let skills_score = 0;
  let deadline_score = 0;
  const matched_skills: string[] = [];
  const strengths: string[] = [];

  const oppText = normalizeStr(`${opportunity.title} ${opportunity.description} ${opportunity.sector} ${opportunity.education_level || ''}`);

  // 1. Catégorie (max 25 pts)
  if (profile.opportunites_recherchees.length === 0 || profile.opportunites_recherchees.includes(opportunity.category)) {
    category_score = 25;
    strengths.push(`Catégorie « ${opportunity.category} » en phase directe avec vos recherches.`);
  } else {
    category_score = 5;
  }

  // 2. Secteur d'activité (max 20 pts)
  const oppSectorNorm = normalizeStr(opportunity.sector);
  const sectorMatch = profile.secteurs.some(sec => {
    const sNorm = normalizeStr(sec);
    return oppSectorNorm.includes(sNorm) || oppText.includes(sNorm);
  });

  if (sectorMatch || profile.secteurs.length === 0) {
    sector_score = 20;
    strengths.push(`Secteur « ${opportunity.sector} » correspondant à vos domaines d’intérêt.`);
  } else {
    sector_score = 5;
  }

  // 3. Localisation & Mobilité (max 15 pts)
  const oppCityNorm = normalizeStr(opportunity.city || '');
  const userLocNorm = normalizeStr(profile.localisation || '');

  if (
    !oppCityNorm || 
    oppCityNorm === 'tout le bénin' || 
    userLocNorm.includes('tout') || 
    userLocNorm.includes('benin') ||
    profile.mobilité === 'Nationale (Tout le Bénin)' || 
    profile.mobilité === 'Sous-régionale (UEMOA)'
  ) {
    location_score = 15;
    strengths.push(`Mobilité compatible avec la localisation (${opportunity.city || 'Bénin'}).`);
  } else if (oppCityNorm.includes(userLocNorm) || userLocNorm.includes(oppCityNorm)) {
    location_score = 15;
    strengths.push(`Localisation directe sur ${opportunity.city}.`);
  } else if (opportunity.remote === 'REMOTE' || profile.remote === 'REMOTE') {
    location_score = 15;
    strengths.push('Format télétravail / remote possible.');
  } else {
    location_score = 5;
  }

  // 4. Formation & Diplômes (max 10 pts)
  const oppEduNorm = normalizeStr(opportunity.education_level || '');
  const userEduNorm = normalizeStr(profile.formation || '');

  if (profile.formation === 'Tous niveaux' || !oppEduNorm) {
    education_score = 10;
  } else if (
    oppEduNorm.includes(userEduNorm) || 
    oppEduNorm.includes('bac') && userEduNorm.includes('bac') ||
    oppEduNorm.includes('licence') && (userEduNorm.includes('licence') || userEduNorm.includes('master')) ||
    oppEduNorm.includes('master') && (userEduNorm.includes('master') || userEduNorm.includes('doctorat'))
  ) {
    education_score = 10;
    strengths.push(`Niveau d'études requis (${opportunity.education_level}) validé par votre cursus.`);
  } else {
    education_score = 4;
  }

  // 5. Compétences clés (max 15 pts)
  if (profile.compétences.length > 0) {
    profile.compétences.forEach(skill => {
      const sNorm = normalizeStr(skill);
      if (sNorm && oppText.includes(sNorm)) {
        matched_skills.push(skill);
      }
    });

    if (matched_skills.length >= 3) {
      skills_score = 15;
      strengths.push(`3 compétences clés identifiées : ${matched_skills.slice(0, 3).join(', ')}.`);
    } else if (matched_skills.length > 0) {
      skills_score = 10;
      strengths.push(`Compétence(s) alignée(s) : ${matched_skills.join(', ')}.`);
    } else {
      skills_score = 5;
    }
  } else {
    skills_score = 10;
  }

  // 6. Expérience & Niveau (max 10 pts)
  const oppExpNorm = normalizeStr(opportunity.experience_level || '');
  const userExpNorm = normalizeStr(profile.niveau || '');

  if (profile.niveau === 'Tous profils' || !oppExpNorm) {
    // neutral
  } else if (oppExpNorm.includes(userExpNorm) || (oppExpNorm.includes('junior') && userExpNorm.includes('junior'))) {
    strengths.push(`Adéquation de séniorité : profil ${profile.niveau}.`);
  }

  // 7. Statut de clôture / Deadline (max 5 pts)
  const isDeadlineActive = opportunity.status !== 'EXPIRED';
  if (isDeadlineActive) {
    deadline_score = 5;
  } else {
    deadline_score = 0;
  }

  // Total Score (Clamped 15% - 98%)
  const rawScore = category_score + sector_score + location_score + education_score + skills_score + deadline_score;
  const clampedScore = Math.max(15, Math.min(96, rawScore));

  const breakdown: OpportunityMatchBreakdown = {
    category_score,
    sector_score,
    location_score,
    education_score,
    skills_score,
    deadline_score,
    matched_skills,
    is_deadline_active: isDeadlineActive
  };

  return {
    opportunity_id: opportunity.id,
    score: clampedScore,
    score_label: `MATCH ${clampedScore}%`,
    disclaimer: 'Indice de correspondance indicatif',
    breakdown,
    strengths,
    notes: 'Cet indice est calculé à titre informatif selon vos critères déclarés et ne constitue en aucun cas une décision de recrutement automatique.'
  };
}
