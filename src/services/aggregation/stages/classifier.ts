import { WikiJobOpportunityCategory } from '../../../types/aggregation';

interface ClassificationResult {
  category: WikiJobOpportunityCategory;
  confidence: number;
  reason: string;
}

const CLASSIFICATION_RULES: Array<{
  category: WikiJobOpportunityCategory;
  weight: number;
  keywords: string[];
  patterns: RegExp[];
}> = [
  {
    category: 'STAGE',
    weight: 1.2,
    keywords: [
      'stage', 'stagiaire', 'immersion', 'internship', 'alternance', 
      'pré-emploi', 'stage professionnel', 'stage académique'
    ],
    patterns: [/\bstage\b/i, /\bstagiaire/i, /\bimmersion professionnelle\b/i]
  },
  {
    category: 'VOLONTARIAT',
    weight: 1.2,
    keywords: [
      'volontariat', 'volontaire', 'vnu', 'corps de paix', 'bénévole', 
      'mission civique', 'service civique', 'volontaire national'
    ],
    patterns: [/\bvolontair/i, /\bbénévol/i, /\bservice civique\b/i]
  },
  {
    category: 'BOURSE',
    weight: 1.1,
    keywords: [
      'bourse', 'bourses', 'scholarship', 'fellowship', 'allocation d’études', 
      'bourse d’excellence', 'bourse de mobilité', 'frais de scolarité offerts'
    ],
    patterns: [/\bbourse[s]?\b/i, /\bscholarship/i, /\bfellowship/i]
  },
  {
    category: 'FORMATION',
    weight: 1.0,
    keywords: [
      'formation', 'atelier', 'certificat', 'bootcamp', 'apprentissage', 
      'renforcement de capacités', 'séminaire', 'perfectionnement', 'cohorte de formation',
      'cqp', 'cqm', 'trousseau d’outillage'
    ],
    patterns: [/\bformation[s]?\b/i, /\bapprentissage\b/i, /\bbootcamp\b/i]
  },
  {
    category: 'FINANCEMENT',
    weight: 1.1,
    keywords: [
      'crédit', 'microcrédit', 'alafia', 'prêt', 'subvention', 'garantie', 
      'financement', 'fonds d’amorçage', 'taux bonifié', 'bonification', 
      'fnda', 'fnm', 'fcfa', 'dotation financière'
    ],
    patterns: [/\bcrédit[s]?\b/i, /\bsubvention[s]?\b/i, /\bfinancement[s]?\b/i, /\bmicrocrédit\b/i]
  },
  {
    category: 'CONCOURS',
    weight: 1.1,
    keywords: [
      'concours', 'compétition', 'hackathon', 'prix', 'challenge', 
      'lauréat', 'olympiade', 'tournoi', 'trophée'
    ],
    patterns: [/\bconcours\b/i, /\bhackathon\b/i, /\bchallenge\b/i, /\bprix de l’innovation\b/i]
  },
  {
    category: 'APPEL À PROJETS',
    weight: 1.0,
    keywords: [
      'appel à projets', 'appel à propositions', 'ami', 'manifestation d’intérêt', 
      'call for proposals', 'dépôt de dossiers', 'sélection de projets'
    ],
    patterns: [/\bappel à projet[s]?\b/i, /\bmanifestation d’intérêt\b/i, /\bami\b/i]
  },
  {
    category: 'ENTREPRENEURIAT',
    weight: 1.0,
    keywords: [
      'entrepreneuriat', 'startup', 'pme', 'business plan', 'incubation', 
      'incubateur', 'créateur d’entreprise', 'agri-preneur', 'labellisation pme',
      'accélérateur'
    ],
    patterns: [/\bentrepreneur/i, /\bstartup[s]?\b/i, /\bincubat/i, /\bpme\b/i]
  },
  {
    category: 'EMPLOI',
    weight: 0.9,
    keywords: [
      'recrutement', 'poste', 'emploi', 'cdi', 'cdd', 'ingénieur', 
      'conseiller', 'responsable', 'directeur', 'chargé de', 'auditeur', 
      'développeur', 'spécialiste', 'cadre', 'technicien', 'chef de projet'
    ],
    patterns: [/\brecrutement\b/i, /\bposte[s]?\b/i, /\bcdi\b/i, /\bcdd\b/i, /\bavis de recrutement\b/i]
  }
];

export function classifyContent(title: string, description: string, hints?: string[]): ClassificationResult {
  const fullText = `${title} ${description} ${(hints || []).join(' ')}`.toLowerCase();

  let highestScore = 0;
  let bestCategory: WikiJobOpportunityCategory = 'AUTRE';
  let matchedKeyword = '';

  for (const rule of CLASSIFICATION_RULES) {
    let score = 0;

    // Check regex patterns (heavy weight)
    for (const pat of rule.patterns) {
      if (pat.test(title)) {
        score += 4 * rule.weight;
        if (!matchedKeyword) matchedKeyword = `motif titre: ${pat.source}`;
      } else if (pat.test(fullText)) {
        score += 2 * rule.weight;
        if (!matchedKeyword) matchedKeyword = `motif texte: ${pat.source}`;
      }
    }

    // Check individual keywords
    for (const kw of rule.keywords) {
      if (title.toLowerCase().includes(kw)) {
        score += 3 * rule.weight;
        matchedKeyword = kw;
      } else if (fullText.includes(kw)) {
        score += 1 * rule.weight;
        if (!matchedKeyword) matchedKeyword = kw;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestCategory = rule.category;
    }
  }

  // If low score, default to AUTRE or EMPLOI if work terms exist
  if (highestScore < 1.5) {
    return {
      category: 'AUTRE',
      confidence: 0.35,
      reason: 'Classification par défaut : aucun mot-clé décisif détecté.'
    };
  }

  const normalizedConfidence = Math.min(0.98, Math.max(0.60, 0.50 + (highestScore / 20)));

  return {
    category: bestCategory,
    confidence: Math.round(normalizedConfidence * 100) / 100,
    reason: `Règle de classification validée sur « ${matchedKeyword} » (score: ${highestScore.toFixed(1)})`
  };
}
