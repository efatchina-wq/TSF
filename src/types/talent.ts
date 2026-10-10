import { RoutePath } from './index';

export type TalentStatus = 
  | 'detecte'
  | 'en_evaluation'
  | 'en_incubation'
  | 'certifie'
  | 'propulse'
  | 'actif_reserve';

export type TalentLevel = 
  | 'Niveau I — Espoir Émergent'
  | 'Niveau II — Praticien Certifié'
  | 'Niveau III — Leader Stratégique'
  | 'Niveau IV — Fellow Panafricain & Bâtisseur';

export interface TalentBadge {
  id: string;
  name: string;
  category: 'merite' | 'competence' | 'impact' | 'ethique' | 'reseau';
  description: string;
  iconName: string;
  obtainedDate: string;
  issuingAuthority: string;
}

export interface TalentSkill {
  id: string;
  name: string;
  category: 'technique' | 'strategie' | 'leadership' | 'recherche' | 'langue';
  level: number; // 1 to 5 or percentage
  endorsedByTsf: boolean;
  auditedDate?: string;
}

export interface TalentExperience {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
}

export interface TalentEducation {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location: string;
  graduationYear: string;
  honors?: string;
}

export interface TalentPortfolioProject {
  id: string;
  title: string;
  clientOrContext: string;
  year: string;
  description: string;
  impactMetrics: string;
  techStackOrDomain: string[];
  externalUrl?: string;
  imageUrl?: string;
}

export interface TalentAchievement {
  id: string;
  title: string;
  year: string;
  organization: string;
  description: string;
  significance: string;
}

export interface TalentCertification {
  id: string;
  tsfCertificateNumber: string;
  programName: string;
  cohort: string;
  grade: string;
  issuingDate: string;
  expiryDate?: string;
  juryPresident: string;
  cryptographicHash: string;
  verificationUrl: string;
  officialPillarsAudited: string[];
}

export interface MatchedOpportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  type: 'CDI / Cadre Exécutif' | 'Bourse d’Excellence' | 'Financement Amorçage' | 'Mission de Conseil' | 'Détachement Public';
  deadline: string;
  matchScore: number; // 0 - 100%
  compensationOrBudget?: string;
  status: 'eligible' | 'candidature_envoyee' | 'selectionne';
}

export interface TsfTalentIdCard {
  id: string;
  uniqueId: string; // e.g. TSF-ID-2026-AFR-0482
  nationalCode: string; // ISO 3
  level: TalentLevel;
  status: TalentStatus;
  statusLabel: string;
  skills: string[];
  certifications: string[];
  issuingDate: string;
  cryptographicSignature: string;
  blockchainRecordId: string;
  qrPayload: string;
}

export type JourneyStepId = 
  | 'profil_cree'
  | 'talent_detecte'
  | 'evaluation'
  | 'incubation'
  | 'certification'
  | 'opportunites'
  | 'impact';

export interface TalentJourneyMilestone {
  stepId: JourneyStepId;
  order: number;
  label: string; // Profil créé, Talent détecté, Évaluation, Incubation, Certification, Opportunités, Impact
  tagline: string;
  dateCompleted?: string;
  status: 'completed' | 'current' | 'upcoming';
  summary: string;
  details?: string[];
  deliverables?: string[];
  evaluatorOrEntity?: string;
  scoreOrKpi?: string;
}

export interface TalentApplicationRecord {
  id: string;
  programOrOpportunityTitle: string;
  category: string;
  submittedAt: string;
  status: 'soumis' | 'en_revue_jury' | 'admis' | 'refuse' | 'liste_attente';
  statusLabel: string;
  nextStep: string;
  trackingNumber: string;
}

export interface TalentCourseModule {
  id: string;
  code: string;
  title: string;
  track: string;
  instructor: string;
  progressPercent: number;
  durationHours: number;
  completedHours: number;
  status: 'en_cours' | 'valide' | 'a_venir';
  nextSessionDate?: string;
}

export interface TalentMessageItem {
  id: string;
  senderName: string;
  senderRole: string;
  senderAvatar?: string;
  subject: string;
  preview: string;
  body: string;
  sentAt: string;
  unread: boolean;
  category: 'jury' | 'mentor' | 'recruteur' | 'administration';
}

export interface TalentProfile {
  id: string;
  photoUrl: string;
  nom: string;
  prenom: string;
  titreProfessionnel: string;
  localisation: {
    ville: string;
    pays: string;
    region: string;
    mobilitePanafricaine: boolean;
  };
  domaine: string;
  domaineSlug: string;
  tsfId: TsfTalentIdCard;
  bio: string;
  manifestePersonnel: string;
  competences: TalentSkill[];
  portfolio: TalentPortfolioProject[];
  realisations: TalentAchievement[];
  experiences: TalentExperience[];
  formations: TalentEducation[];
  disponibilite: {
    statut: 'Immédiate' | 'Préavis 1-3 mois' | 'Missions d’Expertise' | 'Bâtisseur Indépendant' | 'Réserviste';
    tempsDispo: 'Temps plein' | 'Temps partiel' | 'Consultance';
    preferencesMobilite: string[];
    rechercheActuelle: string;
  };
  certification: TalentCertification;
  badges: TalentBadge[];
  opportunites: MatchedOpportunity[];
  journey: TalentJourneyMilestone[];
  applications: TalentApplicationRecord[];
  formationsEnCours: TalentCourseModule[];
  messages: TalentMessageItem[];
}

export interface TalentRecommendationPayload {
  nominatorName: string;
  nominatorEmail: string;
  nominatorPhone: string;
  nominatorAffiliation: string;
  talentName: string;
  talentEmail: string;
  talentPhone: string;
  talentCountry: string;
  talentDomain: string;
  relationship: string;
  recommendationReason: string;
  proofDocumentUrl?: string;
}
