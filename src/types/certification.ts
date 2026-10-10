export type ExcellenceTier = 'BRONZE' | 'ARGENT' | 'OR';

export interface ExcellenceTierDetails {
  tier: ExcellenceTier;
  title: string;
  subtitle: string;
  tagline: string;
  levelBadge: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    gradient: string;
  };
  criteria: string[];
  prerequisites: string[];
  deliverables: string[];
  accreditedRoles: string[];
  recognitionStatement: string;
}

export interface CertifiedHolder {
  nom: string;
  prenom: string;
  photoUrl?: string;
  nationalite: string;
  paysResidence: string;
  idUnique: string;
  promotion: string;
}

export interface CertificationVerificationResult {
  code: string;
  certification: string;
  titulaire: CertifiedHolder;
  domaine: string;
  niveau: ExcellenceTier | string;
  date: string;
  dateExpiration?: string;
  statut: 'VALIDE & HOMOLOGUÉ' | 'EN COURS DE VALIDATION' | 'EN RENOUVELLEMENT' | 'ARCHIVÉ' | 'NON CONFORME';
  evaluateur: string;
  juryComposition: string[];
  auditPillars: {
    label: string;
    score: string;
    verdict: string;
  }[];
  cryptographicHash: string;
  blockchainRecordId: string;
  qrPayload: string;
  officialSeal: string;
  verifiedAt: string;
}
