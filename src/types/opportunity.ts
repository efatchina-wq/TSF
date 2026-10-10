export type OpportunityType = 
  | 'Emploi'
  | 'Stage'
  | 'Formation'
  | 'Bourse'
  | 'Concours'
  | 'Financement'
  | 'Appel à projets'
  | 'Mentorat'
  | 'Partenariat';

export type OpportunityLevel = 
  | 'Tous niveaux'
  | 'Étudiant / Premier cycle'
  | 'Junior / Émergent'
  | 'Praticien / Intermédiaire'
  | 'Cadre Dirigeant / Senior'
  | 'Fellow / Haut Potentiel';

export interface MarketplaceOpportunity {
  id: string;
  title: string;
  type: OpportunityType;
  domain: string;
  location: string;
  country: string;
  level: OpportunityLevel;
  deadline: string; // Display string, e.g. "15 Novembre 2026"
  deadlineDate: string; // ISO date for sorting/filtering, e.g. "2026-11-15"
  organization: string;
  organizationType: 'Institution TSF' | 'Entreprise Partenaire' | 'Banque Multilatérale' | 'Université' | 'OSC';
  description: string;
  fullDescription: string;
  eligibility: string[];
  benefits: string[];
  requirements: string[];
  compensationOrBudget?: string;
  spots: number;
  status: 'ouvert' | 'bientot' | 'cloture';
  featured?: boolean;
  postedDate: string;
  applicationUrl?: string;
}

export interface OpportunityFilterState {
  searchQuery: string;
  selectedDomain: string;
  selectedLocation: string;
  selectedType: string;
  selectedLevel: string;
  selectedDeadline: string;
  onlySaved: boolean;
}
