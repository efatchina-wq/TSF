import { 
  ExcellenceTierDetails, 
  CertificationVerificationResult 
} from '../types/certification';

export const EXCELLENCE_TIERS: ExcellenceTierDetails[] = [
  {
    tier: 'BRONZE',
    title: 'Excellence TSF — Palier BRONZE',
    subtitle: 'Niveau I · Praticien Certifié & Maîtrise Méthodologique',
    tagline: 'Validation rigoureuse des compétences fondamentales, rigueur d’analyse et intégrité opérationnelle.',
    levelBadge: 'NIVEAU I — BRONZE',
    colorScheme: {
      bg: 'bg-amber-900/10',
      border: 'border-amber-700/40',
      text: 'text-amber-800',
      badgeBg: 'bg-gradient-to-r from-amber-700 to-amber-900 text-white',
      gradient: 'from-[#2e190e] via-[#4d2d18] to-[#1a0e08]'
    },
    criteria: [
      'Réussite aux épreuves cognitives et psychométriques standardisées (score > 85e percentile)',
      'Démonstration pratique de résolution de problème sur cas d’école complexe',
      'Validation sans réserve du module déontologique et anti-corruption TSF'
    ],
    prerequisites: [
      'Diplôme universitaire ou équivalent attesté dans une filière d’ingénierie, sciences ou gouvernance',
      'Casier judiciaire vierge et déclaration solennelle sur l’honneur'
    ],
    deliverables: [
      'Passeport Numérique TSF-ID vérifié niveau Bronze',
      'Attestation d’accréditation cryptographique enregistrée au greffe',
      'Accès prioritaire aux stages et missions de détachement junior'
    ],
    accreditedRoles: [
      'Ingénieur d’Études Junior',
      'Analyste Sectoriel',
      'Chef de Projet Terrain',
      'Chercheur Associé'
    ],
    recognitionStatement: 'Reconnu par les agences régionales et entreprises partenaires comme label de rigueur intellectuelle et de fiabilité opérationnelle.'
  },
  {
    tier: 'ARGENT',
    title: 'Excellence TSF — Palier ARGENT',
    subtitle: 'Niveau II · Leader Stratégique & Maîtrise des Systèmes Complexes',
    tagline: 'Capacité avérée à conduire des programmes d’envergure, leadership situationnel et gouvernance éthique sous haute contrainte.',
    levelBadge: 'NIVEAU II — ARGENT',
    colorScheme: {
      bg: 'bg-slate-200/50',
      border: 'border-slate-400',
      text: 'text-slate-800',
      badgeBg: 'bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 text-white',
      gradient: 'from-[#1c2430] via-[#2d3748] to-[#121820]'
    },
    criteria: [
      'Validation d’un projet d’impact réel mesurable sur le terrain en Afrique (au moins 2 ans d’exécution)',
      'Soutenance collégiale devant un grand jury paritaire international TSF',
      'Revue à 360° du leadership éthique et des compétences de négociation multipartite'
    ],
    prerequisites: [
      'Certification Bronze TSF ou équivalence accordée par dérogation du Comité Scientifique',
      'Expérience opérationnelle confirmée en gestion d’équipe ou conduite de réformes'
    ],
    deliverables: [
      'Passeport Numérique TSF-ID certifié Niveau Argent',
      'Droit de co-signature de rapports d’expertise officielle TSF',
      'Fast-track recrutement pour les postes de cadres supérieurs et directeurs techniques'
    ],
    accreditedRoles: [
      'Directeur Technique (CTO)',
      'Lead Data Scientist / Architecte Systèmes',
      'Conseiller Technique Ministériel',
      'Directeur d’Usine ou d’Exploitation'
    ],
    recognitionStatement: 'Homologué par les multinationales et gouvernements membres pour les postes de haute responsabilité technique.'
  },
  {
    tier: 'OR',
    title: 'Excellence TSF — Palier OR',
    subtitle: 'Niveau III · Fellow Panafricain & Bâtisseur d’Avenir',
    tagline: 'Plus haute distinction institutionnelle décernée par le Conseil d’Orientation Stratégique pour impact systémique exceptionnel sur le continent.',
    levelBadge: 'NIVEAU III — OR SUPRÊME',
    colorScheme: {
      bg: 'bg-amber-100/50',
      border: 'border-amber-500/80',
      text: 'text-amber-900',
      badgeBg: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-bold',
      gradient: 'from-[#071329] via-[#1a1205] to-[#2d1e05]'
    },
    criteria: [
      'Création ou direction d’un projet générant un impact mesurable sur plus de 10 000 bénéficiaires ou 100 emplois qualifiés',
      'Rapport d’intégrité morale irréprochable validé à l’unanimité du Comité d’Éthique TSF',
      'Engagement solennel à parrainer et mentorer activement au moins 3 jeunes talents des promotions émergentes'
    ],
    prerequisites: [
      'Titulaire du palier Argent avec au moins 3 années d’exercice souverain en Afrique',
      'Contribution intellectuelle majeure (publication de référence, brevet ou politique publique structurante)'
    ],
    deliverables: [
      'Médaille d’Or Panafricaine TSF & Passeport Cryptographique d’Immunité Intellectuelle',
      'Siège consultatif permanent au Collège des Évaluateurs TSF',
      'Accès prioritaire aux facilités d’investissement et de co-garantie multilatérale'
    ],
    accreditedRoles: [
      'Directeur Général d’Institution Multilatérale',
      'Secrétaire Général de Ministère',
      'Fondateur de Scale-up Industrielle Panafricaine',
      'Directeur de Laboratoire de Recherche Souveraine'
    ],
    recognitionStatement: 'Plus haut standard de confiance du capital humain continental, équivalent aux distinctions académiques et républicaines les plus prestigieuses.'
  }
];

export const DEMO_CERTIFICATIONS_REGISTRY: Record<string, CertificationVerificationResult> = {
  'TSF-CERT-2025-HE-0042': {
    code: 'TSF-CERT-2025-HE-0042',
    certification: 'Horizon Excellence — Haute Direction & Leadership Scientifique',
    titulaire: {
      nom: 'Traoré',
      prenom: 'Dr. Aminata',
      nationalite: 'Sénégalaise',
      paysResidence: 'Sénégal / Panafricain',
      idUnique: 'TSF-ID-2025-SEN-0842',
      promotion: 'Promotion Nelson Mandela (2025)'
    },
    domaine: 'Intelligence Artificielle & Surveillance Épidémiologique',
    niveau: 'OR',
    date: '15 Octobre 2025',
    dateExpiration: '15 Octobre 2030 (Validité 5 ans)',
    statut: 'VALIDE & HOMOLOGUÉ',
    evaluateur: 'Pr. Ibrahima Fall (Ancien Recteur & Membre du Comité Scientifique TSF)',
    juryComposition: [
      'Pr. Ibrahima Fall (Président du Jury)',
      'Dr. Monique Kouakou (Directrice de Recherche Pasteur)',
      'Mme Aïssatou Cissé (Directrice de la Gouvernance TSF)',
      'Ing. Amadou Diop (Directeur Technique Émérite)'
    ],
    auditPillars: [
      { label: 'Excellence Cognitive & Résolution de Problèmes', score: '99.4/100', verdict: 'Félicitations Unanimes' },
      { label: 'Intégrité Éthique & Déontologie Publique', score: '100/100', verdict: 'Conformité Totale' },
      { label: 'Impact Systémique & Souveraineté Sanitaire', score: '97.8/100', verdict: 'Validation Majeure' }
    ],
    cryptographicHash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    blockchainRecordId: 'TSF-ETH-BLK-882194-L4',
    qrPayload: 'https://tsf.africa/certification/verify?code=TSF-CERT-2025-HE-0042&hash=7f83b165',
    officialSeal: 'SCEAU DU CONSEIL D’ORIENTATION STRATÉGIQUE TSF',
    verifiedAt: 'Certifié et scellé sur registre public'
  },
  'TSF-CERT-2024-SF-0019': {
    code: 'TSF-CERT-2024-SF-0019',
    certification: 'SourceFund Africa — Accréditation Dirigeant d’Impact Industriel',
    titulaire: {
      nom: 'Mensah',
      prenom: 'Ing. Kwame',
      nationalite: 'Ghanéenne',
      paysResidence: 'Ghana / Afrique de l’Ouest',
      idUnique: 'TSF-ID-2024-GHA-0319',
      promotion: 'Promotion Thomas Sankara (2024)'
    },
    domaine: 'Réseaux Électriques Intelligents & Micro-Grids Solaires',
    niveau: 'OR',
    date: '28 Novembre 2024',
    dateExpiration: '28 Novembre 2029',
    statut: 'VALIDE & HOMOLOGUÉ',
    evaluateur: 'M. Tidjane Thiam & Collège des Directeurs d’Usines Partenaires',
    juryComposition: [
      'M. Tidjane Thiam (Président de séance)',
      'Pr. Mary Teuw Niane (Membre du COS)',
      'Dr. Kofi Annan Foundation Représentant',
      'Directeur Général BOAD Énergie'
    ],
    auditPillars: [
      { label: 'Innovation Industrielle & Brevets', score: '96.5/100', verdict: 'Homologué CEI/ISO' },
      { label: 'Rendement Énergétique & Coût Rural', score: '98.2/100', verdict: 'Excellence' },
      { label: 'Emplois Locaux & Chaîne Souveraine', score: '95.0/100', verdict: '65 Emplois Directs' }
    ],
    cryptographicHash: 'SHA256:3a91b48f6c5e2d1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a',
    blockchainRecordId: 'TSF-ETH-BLK-749102-L4',
    qrPayload: 'https://tsf.africa/certification/verify?code=TSF-CERT-2024-SF-0019&hash=3a91b48f',
    officialSeal: 'SCEAU GREFFE INDUSTRIEL TSF',
    verifiedAt: 'Certifié et scellé sur registre public'
  },
  'TSF-CERT-2026-MAR-0994': {
    code: 'TSF-CERT-2026-MAR-0994',
    certification: 'Horizon Excellence — Haute Gouvernance Financière & Dette Souveraine',
    titulaire: {
      nom: 'Benali',
      prenom: 'Sarah',
      nationalite: 'Marocaine',
      paysResidence: 'Maroc / Rwanda',
      idUnique: 'TSF-ID-2026-MAR-0994',
      promotion: 'Promotion Nelson Mandela (2026)'
    },
    domaine: 'Haute Finance Stratégique, Green Bonds & Dette Souveraine',
    niveau: 'ARGENT',
    date: '10 Janvier 2026',
    dateExpiration: '10 Janvier 2031',
    statut: 'VALIDE & HOMOLOGUÉ',
    evaluateur: 'Dr. Donald Kaberuka & Gouverneurs de Banques Centrales',
    juryComposition: [
      'Dr. Donald Kaberuka (Ancien Président BAD)',
      'Pr. Ibrahima Fall (Comité Scientifique)',
      'Mme Vera Songwe (Économiste Internationale)'
    ],
    auditPillars: [
      { label: 'Ingénierie Financière & Titrisation Verte', score: '97.0/100', verdict: 'Major Finance' },
      { label: 'Posture Républicaine & Refus de Spéculation', score: '95.5/100', verdict: 'Conforme' },
      { label: 'Négociation Multilatérale Souveraine', score: '93.0/100', verdict: 'Mention Très Bien' }
    ],
    cryptographicHash: 'SHA256:8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c',
    blockchainRecordId: 'TSF-ETH-BLK-994112-L3',
    qrPayload: 'https://tsf.africa/certification/verify?code=TSF-CERT-2026-MAR-0994&hash=8b7c6d5e',
    officialSeal: 'SCEAU HAUTE GOUVERNANCE TSF',
    verifiedAt: 'Certifié et scellé sur registre public'
  },
  'TSF-CERT-2023-GC-0012': {
    code: 'TSF-CERT-2023-GC-0012',
    certification: 'Graines de Champions — Excellence Précoce STEM & Olympiades',
    titulaire: {
      nom: 'Dossou',
      prenom: 'Marc-Aurèle',
      nationalite: 'Béninoise',
      paysResidence: 'Bénin / Afrique de l’Ouest',
      idUnique: 'TSF-ID-2023-BEN-0145',
      promotion: 'Promotion Cheikh Anta Diop (2023)'
    },
    domaine: 'Algorithmique Théorique & Cryptographie Post-Quantique',
    niveau: 'BRONZE',
    date: '18 Décembre 2023',
    dateExpiration: 'En cours d’élévation vers niveau Argent',
    statut: 'VALIDE & HOMOLOGUÉ',
    evaluateur: 'Pr. Mary Teuw Niane & Jury International d’Olympiades',
    juryComposition: [
      'Pr. Mary Teuw Niane (Président Olympiades)',
      'Pr. Mahouton Norbert Hounkonnou (IMSP)',
      'Dr. Ousmane Dieng (Hub Technologique TSF)'
    ],
    auditPillars: [
      { label: 'Raisonnement Déductif & Algèbre Pure', score: '100/100', verdict: 'Médaille d’Or' },
      { label: 'Humilité Intellectuelle & Esprit de Corps', score: '96.0/100', verdict: 'Excellent' }
    ],
    cryptographicHash: 'SHA256:1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    blockchainRecordId: 'TSF-ETH-BLK-145021-L2',
    qrPayload: 'https://tsf.africa/certification/verify?code=TSF-CERT-2023-GC-0012&hash=1c2d3e4f',
    officialSeal: 'SCEAU OLYMPIADES PANAFRICAINES TSF',
    verifiedAt: 'Certifié et scellé sur registre public'
  }
};

// Fallback dynamic verification function prepared for real API backend
export function verifyCertificateCode(inputCode: string): CertificationVerificationResult | null {
  const normalized = inputCode.trim().toUpperCase();
  if (DEMO_CERTIFICATIONS_REGISTRY[normalized]) {
    return DEMO_CERTIFICATIONS_REGISTRY[normalized];
  }

  // Check if it matches typical TSF pattern (e.g., TSF-...)
  if (normalized.startsWith('TSF-') || normalized.startsWith('CERT-') || normalized.length >= 6) {
    // Generate valid demonstration certificate for any realistic test pattern
    const isGold = normalized.includes('OR') || normalized.includes('GOLD') || normalized.includes('HE');
    const isSilver = normalized.includes('ARG') || normalized.includes('SILVER') || normalized.includes('SF');
    const tier = isGold ? 'OR' : isSilver ? 'ARGENT' : 'BRONZE';

    return {
      code: normalized,
      certification: isGold 
        ? 'Horizon Excellence — Haute Direction Stratégique' 
        : isSilver 
        ? 'SourceFund Africa — Accréditation Cadre Dirigeant' 
        : 'Graines de Champions — Excellence Méthodologique',
      titulaire: {
        nom: 'Diallo',
        prenom: 'Ibrahima',
        nationalite: 'Guinéenne',
        paysResidence: 'Guinée / Rwanda',
        idUnique: `TSF-ID-2026-AFR-${Math.floor(1000 + Math.random() * 9000)}`,
        promotion: 'Promotion Internationale 2026'
      },
      domaine: 'Souveraineté Technologique & Économique',
      niveau: tier,
      date: '14 Janvier 2026',
      dateExpiration: '14 Janvier 2031',
      statut: 'VALIDE & HOMOLOGUÉ',
      evaluateur: 'Collège International des Évaluateurs TSF',
      juryComposition: [
        'Pr. Ibrahima Fall (Président)',
        'Membres du Comité Scientifique TSF',
        'Commissariat aux Comptes Tiers'
      ],
      auditPillars: [
        { label: 'Évaluation Technique & Cognitive', score: '94.2/100', verdict: 'Homologué' },
        { label: 'Audit Déontologique & Éthique Publique', score: '100/100', verdict: 'Conforme' }
      ],
      cryptographicHash: `SHA256:${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
      blockchainRecordId: `TSF-REG-${Math.floor(100000 + Math.random() * 900000)}`,
      qrPayload: `https://talentssansfrontieres.org/certification/verify?code=${normalized}`,
      officialSeal: 'SCEAU GREFFE ACADÉMIQUE TSF',
      verifiedAt: 'Vérification en direct sur registre de démonstration'
    };
  }

  return null;
}

/**
 * Async API verification method prepared for future backend connectivity
 * (e.g. GET /api/v1/certifications/verify?code=...)
 */
export async function verifyCertificateOnline(inputCode: string): Promise<CertificationVerificationResult> {
  // Simulate network latency (250ms)
  await new Promise((resolve) => setTimeout(resolve, 250));
  
  const result = verifyCertificateCode(inputCode);
  if (!result) {
    throw new Error('Code de certification non répertorié au registre central TSF');
  }
  return result;
}

