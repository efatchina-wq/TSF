import { RoutePath } from './index';

export type PartnerPathwayType = 'entreprise' | 'bailleur' | 'osc' | 'institutions';

// ENTREPRISE TYPES
export type EnterpriseModalityId = 
  | 'sponsoriser'
  | 'recruter'
  | 'mentorer'
  | 'financer'
  | 'creer_challenge'
  | 'developper_programme';

export interface EnterpriseModality {
  id: EnterpriseModalityId;
  title: string;
  tagline: string;
  description: string;
  keyBenefits: string[];
  deliverables: string[];
  startingBudgetOrFormat: string;
  badgeLabel: string;
  iconName: string;
}

// BAILLEUR / PTF TYPES
export interface BailleurProjectItem {
  id: string;
  code: string;
  title: string;
  pillar: string;
  territories: string[];
  durationMonths: number;
  totalBudgetUsd: number;
  coFinancingTargetUsd: number;
  status: 'en_deploiement' | 'recherche_co_financeurs' | 'revue_mi_parcours';
  summary: string;
  targetBeneficiaries: string;
  impactMetrics: { label: string; target: string; current: string }[];
}

export interface TheoryOfChangeNode {
  step: 'inputs' | 'activities' | 'outputs' | 'outcomes' | 'systemic_impact';
  label: string;
  title: string;
  description: string;
  items: string[];
  indicators: string[];
}

export interface BailleurReportItem {
  id: string;
  title: string;
  period: string;
  type: 'Rapport Fiduciaire IFRS' | 'Revue à Mi-Parcours' | 'Audit ESG Indépendant' | 'Cadre de Mesure de Rendement';
  fileSize: string;
  verificationHash: string;
  verifiedBy: string;
}

export interface BailleurBudgetAllocation {
  category: string;
  percentage: number;
  description: string;
  ringFenced: boolean;
}

// OSC DIAGNOSTIC TYPES
export type OscDiagnosticDimension = 
  | 'gouvernance'
  | 'financement'
  | 'digitalisation'
  | 'rh'
  | 'communication'
  | 'suivi_evaluation'
  | 'mobilisation_ressources';

export interface OscDiagnosticQuestion {
  id: string;
  dimension: OscDiagnosticDimension;
  dimensionLabel: string;
  text: string;
  explanation: string;
  options: {
    label: string;
    points: number; // 1 to 4
    description: string;
  }[];
}

export type MaturityLevelId = 'emergence' | 'structuration' | 'consolidation' | 'rayonnement';

export interface OscMaturityResult {
  overallScorePercent: number; // 0 - 100
  maturityLevel: {
    id: MaturityLevelId;
    label: string;
    description: string;
    color: string;
  };
  dimensionScores: Record<OscDiagnosticDimension, {
    label: string;
    scorePercent: number;
    pointsObtained: number;
    maxPoints: number;
    analysis: string;
  }>;
  priorityRecommendations: {
    dimension: string;
    title: string;
    actionPlan: string;
    recommendedTsfProgram: string;
    timeframe: string;
  }[];
  evaluatedAt: string;
  disclaimerNote: string;
}

// PARTNER DASHBOARD TYPES
export interface PartnerSupportedProgram {
  id: string;
  programSlug: string;
  title: string;
  pathway: PartnerPathwayType;
  contributionType: string;
  financialOrInKindCommitment: string;
  activeCohorts: number;
  laureatesBenefiting: number;
  renewalDate: string;
  status: 'actif' | 'en_renouvellement' | 'en_conventionnement';
}

export interface PartnerApplicationRecord {
  id: string;
  title: string;
  category: 'Convention de Partenariat' | 'Appel à Projets Conjoint' | 'Chaire d’Entreprise' | 'Bourse Nommée';
  submittedDate: string;
  stage: 'Instruction Juridique' | 'Comité d’Alliance' | 'Signature Protocole' | 'Validé';
  trackingNumber: string;
  assignedAdvisor: string;
}

export interface PartnerDocumentRecord {
  id: string;
  title: string;
  type: 'Protocole d’Accord (MoU)' | 'Convention Cadre Pluriannuelle' | 'Charte Éthique & Déontologie' | 'Accord de Consortium';
  signedDate: string;
  validUntil: string;
  status: 'SIGNE_CONFORME' | 'EN_RELECTURE_JURIDIQUE';
  fileSize: string;
  downloadUrl?: string;
}

export interface PartnerIndicatorRecord {
  id: string;
  label: string;
  baseline: string;
  currentValue: string;
  targetValue: string;
  unit: string;
  lastUpdated: string;
  verifiedByAudit: boolean;
}

export interface PartnerOpportunityRecord {
  id: string;
  title: string;
  domain: string;
  deadline: string;
  spotsOffered: number;
  applicantsCount: number;
  status: 'ouvert' | 'en_selection' | 'cloture';
}

export interface PartnerMessageRecord {
  id: string;
  senderName: string;
  senderRole: string;
  subject: string;
  preview: string;
  body: string;
  sentAt: string;
  unread: boolean;
}

export interface PartnerReportRecord {
  id: string;
  title: string;
  frequency: 'Trimestriel' | 'Semestriel' | 'Annuel';
  date: string;
  category: 'Rapport d’Exécution & Impact' | 'Relevé Fiduciaire' | 'Audit Indépendant';
  status: 'Certifié IFRS' | 'Approuvé COS';
}

export interface PartnerDashboardState {
  partnerName: string;
  partnerType: PartnerPathwayType;
  partnerLogo?: string;
  country: string;
  partnershipSince: string;
  programs: PartnerSupportedProgram[];
  applications: PartnerApplicationRecord[];
  documents: PartnerDocumentRecord[];
  indicators: PartnerIndicatorRecord[];
  opportunities: PartnerOpportunityRecord[];
  messages: PartnerMessageRecord[];
  reports: PartnerReportRecord[];
}
