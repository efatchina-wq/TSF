export type RoutePath =
  | '/'
  | '/organisation'
  | '/organisation/mission'
  | '/organisation/methode'
  | '/organisation/gouvernance'
  | '/organisation/histoire'
  | '/programmes'
  | '/programmes/horizon-excellence'
  | '/programmes/tsf-detecte'
  | '/programmes/graines-de-champions'
  | '/programmes/croissance-metanoia'
  | '/programmes/sourcefund-africa'
  | '/programmes/media'
  | '/talents'
  | '/talents/inscription'
  | '/talents/signaler'
  | '/talents/detection'
  | '/talents/opportunites'
  | '/talents/certification'
  | '/talents/dashboard'
  | '/talents/profil'
  | '/partenaires'
  | '/partenaires/entreprises'
  | '/partenaires/bailleurs'
  | '/partenaires/osc'
  | '/partenaires/institutions'
  | '/partenaires/dashboard'
  | '/partenaires/diagnostic'
  | '/opportunites'
  | '/certification'
  | '/certification/verify'
  | '/wikijob'
  | '/wikijob/wiki'
  | '/wikijob/sources'
  | '/wikijob/intelligence'
  | '/impact'
  | '/media'
  | '/ressources'
  | '/contact'
  | '/espace-tsf'
  | '/admin'
  | '/admin/dashboard'
  | '/admin/talents'
  | '/admin/programmes'
  | '/admin/certifications'
  | '/admin/opportunites'
  | '/admin/partenaires'
  | '/admin/wikijob/sources'
  | '/admin/wikijob/engine'
  | '/admin/wikijob/jobs'
  | '/admin/wikijob/wiki'
  | '/admin/contenus'
  | '/design-system'
  | (string & {});

export * from './wikijob';
export * from './aggregation';
export * from './scheduler';
export * from './wiki';
export * from './intelligence';

export interface NavItem {
  id: string;
  label: string;
  path: RoutePath;
  description?: string;
  subItems?: {
    id: string;
    label: string;
    path: RoutePath;
    description: string;
  }[];
}

export type MethodologyStepId = 'detecter' | 'incuber' | 'certifier' | 'propulser';

export interface MethodologyStep {
  id: MethodologyStepId;
  order: number;
  label: string;
  tagline: string;
  description: string;
  operationalMechanisms: string[];
  deliverables: string[];
  kpis: string[];
}

export interface ProgramIndicator {
  label: string;
  value: string;
  baseline?: string;
  description?: string;
  verified?: boolean;
}

export interface ProgramScheduleMilestone {
  date: string;
  title: string;
  description: string;
  status: 'termine' | 'en_cours' | 'a_venir';
}

export interface ProgramPartner {
  name: string;
  category: 'institution' | 'universite' | 'bailleur' | 'entreprise' | 'osc';
  country?: string;
  role: string;
  logo?: string;
}

export interface ProgramDocument {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'rapport' | 'syllabus';
  fileSize: string;
  category: string;
  downloadUrl?: string;
}

export interface ProgramGalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  imageUrl?: string;
}

export interface ProgramResultSummary {
  kpis: { label: string; value: string; detail?: string }[];
  impactStatement: string;
  achievements: string[];
}

export interface Program {
  id: string;
  slug: string;
  title: string; // Nom
  acronym?: string;
  kicker: string;
  summary: string;
  fullDescription: string; // Présentation / Doctrine
  pillar: MethodologyStepId[];
  targetAudience: string; // Population cible
  targetAudienceCategory?: string;
  territory: string; // Territoire
  territoryCategory?: string;
  domain: string; // Domaine
  domainSlug?: string;
  objective: string; // Objectif central
  programType: string; // Type de programme
  programTypeCategory?: string;
  status: 'active' | 'upcoming' | 'cohort_open' | 'actif' | 'cohorte_ouverte' | 'en_deploiement' | 'cloture';
  statusLabel?: string;
  duration: string;
  selectionProcess: string;
  indicators: ProgramIndicator[]; // Indicateurs
  problematic: string; // Problématique
  strategicObjectives: string[]; // Objectifs stratégiques et opérationnels
  methodologySteps: {
    number: string;
    title: string;
    description: string;
    details?: string[];
  }[]; // Méthodologie
  curriculumHighlights: string[];
  outcomes: string[];
  schedule: ProgramScheduleMilestone[]; // Calendrier
  partners: ProgramPartner[]; // Partenaires
  documents: ProgramDocument[]; // Documents
  gallery: ProgramGalleryItem[]; // Galerie
  results: ProgramResultSummary; // Résultats
  path: RoutePath;
}

export interface GovernanceBody {
  id: string;
  title: string;
  role: string;
  mandate: string;
  composition: string[];
  attributes?: string[];
  periodicity?: string;
}

export interface GovernancePrinciple {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  mechanisms: string[];
}

export interface HistoryMilestone {
  year: string;
  period: string;
  phase: string;
  title: string;
  tagline: string;
  description: string;
  keyFacts: string[];
  status: 'valide' | 'consolidation' | 'prospectif';
  archiveRef?: string;
}

export interface PartnerCategory {
  id: string;
  slug: string;
  title: string;
  path: RoutePath;
  description: string;
  engagementModels: string[];
  criteria: string[];
  callToAction: string;
}

export interface OpportunityItem {
  id: string;
  title: string;
  category: 'fellowship' | 'mission' | 'appel-projets' | 'bourse';
  location: string;
  deadline: string;
  description: string;
  eligibility: string;
  spots: number;
  status: 'ouvert' | 'bientot' | 'cloture';
}

export interface ImpactMetric {
  id: string;
  value: string;
  label: string;
  context: string;
  period: string;
}

export interface InstitutionalResource {
  id: string;
  title: string;
  type: 'Rapport Annuel' | 'Livre Blanc' | 'Référentiel' | 'Charte' | 'Communiqué';
  date: string;
  fileSize: string;
  description: string;
  downloadUrl?: string;
}

export * from './talent';
export * from './partner';
export * from './opportunity';
export * from './certification';
