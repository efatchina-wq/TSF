import { NormalizedOpportunity, WikiJobOpportunityCategory } from './aggregation';

export type ExperienceLevel =
  | 'Tous profils'
  | 'Débutant / Étudiant'
  | 'Junior (1-3 ans)'
  | 'Intermédiaire (3-5 ans)'
  | 'Senior (5-10 ans)'
  | 'Direction / Expert (>10 ans)';

export type EducationLevel =
  | 'Tous niveaux'
  | 'BEPC / CAP'
  | 'BAC'
  | 'BAC+2 (BTS/DUT)'
  | 'BAC+3 (Licence)'
  | 'BAC+5 (Master/Ingénieur)'
  | 'Doctorat'
  | 'CQP / CQM';

export type MobilityScope =
  | 'Locale (Commune)'
  | 'Départementale'
  | 'Nationale (Tout le Bénin)'
  | 'Sous-régionale (UEMOA)'
  | 'Internationale';

export type WorkMode = 'ALL' | 'ON_SITE' | 'HYBRID' | 'REMOTE';

export interface UserPreferences {
  salaire_min?: number;
  disponibilite_immediate: boolean;
  interet_public_uniquement: boolean;
  mots_cles_favoris: string[];
}

export interface WikiJobUserProfile {
  id: string;
  fullName: string;
  email: string;
  secteurs: string[];
  compétences: string[];
  niveau: ExperienceLevel;
  formation: EducationLevel;
  localisation: string;
  opportunites_recherchees: WikiJobOpportunityCategory[];
  mobilité: MobilityScope;
  remote: WorkMode;
  préférences: UserPreferences;
  updated_at: string;
}

export interface OpportunityMatchBreakdown {
  category_score: number; // 0 - 25
  sector_score: number;   // 0 - 20
  location_score: number; // 0 - 15
  education_score: number;// 0 - 15
  skills_score: number;   // 0 - 15
  deadline_score: number; // 0 - 10
  matched_skills: string[];
  is_deadline_active: boolean;
}

export interface OpportunityMatchResult {
  opportunity_id: string;
  score: number; // 0 - 100
  score_label: string; // e.g., 'MATCH 87%'
  disclaimer: string; // « Indice de correspondance indicatif »
  breakdown: OpportunityMatchBreakdown;
  strengths: string[];
  notes?: string;
}

export type AlertType =
  | 'Alerte emploi'
  | 'Alerte stage'
  | 'Alerte financement'
  | 'Alerte bourse'
  | 'Alerte concours';

export type AlertFrequency = 'QUOTIDIEN' | 'HEBDOMADAIRE' | 'INSTANTANÉ';

export interface WikiJobAlert {
  id: string;
  title: string;
  alert_type: AlertType;
  keywords: string[];
  categories: WikiJobOpportunityCategory[];
  locations: string[];
  frequency: AlertFrequency;
  active: boolean;
  created_at: string;
  last_matched_at: string | null;
  match_count: number;
}

export interface WikiJobDigest {
  type: 'WIKIJOB_DAILY' | 'WIKIJOB_WEEKLY';
  headline: string;
  subtitle: string;
  period_label: string;
  generated_at: string;
  matched_count: number;
  opportunities: Array<{
    opportunity: NormalizedOpportunity;
    match_score: number;
  }>;
  urgent_deadlines: NormalizedOpportunity[];
  sector_insights: string[];
}

export interface AiOpportunityAnalysis {
  source_unaltered: boolean; // Must always remain true
  original_fingerprint: string;
  summary: string;
  detected_category: WikiJobOpportunityCategory;
  confidence: number;
  identified_dates: {
    deadline: string | null;
    published_at: string | null;
  };
  extracted_skills: string[];
  extracted_education: string;
  extracted_experience: string;
  probable_duplicate_of: string | null;
  suggested_tags: string[];
  provenance_note: string;
}
