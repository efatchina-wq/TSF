import { 
  EnterpriseModality, 
  BailleurProjectItem, 
  TheoryOfChangeNode, 
  BailleurReportItem, 
  BailleurBudgetAllocation, 
  OscDiagnosticQuestion, 
  PartnerDashboardState 
} from '../types/partner';

// ============================================================================
// 1. ENTREPRISE — LES 6 MODALITÉS FONDATRICES
// ============================================================================
export const ENTERPRISE_MODALITIES: EnterpriseModality[] = [
  {
    id: 'sponsoriser',
    title: 'Sponsoriser',
    tagline: 'Associer votre marque aux plus hautes distinctions et chaires de mérite',
    description: 'Parrainez des chaires thématiques d’excellence, les Olympiades Graines de Champions ou des bourses complètes pour des talents issus de milieux défavorisés.',
    keyBenefits: [
      'Visibilité panafricaine prestigieuse auprès des gouvernements et universités',
      'Naming officiel de promotions ou de laboratoires de pointe (ex. Chaire GreenTech)',
      'Déduction fiscale conforme aux cadres d’intérêt général et mécénat'
    ],
    deliverables: [
      'Rapport annuel d’impact nominatif sur les lauréats soutenus',
      'Accès prioritaire aux cérémonies solennelles de remise des diplômes TSF',
      'Mention permanente sur le registre immuable TSF'
    ],
    startingBudgetOrFormat: 'À partir de 25 000 $ / cohorte ou chaire',
    badgeLabel: 'Mécène & Sponsor Souverain',
    iconName: 'Award'
  },
  {
    id: 'recruter',
    title: 'Recruter',
    tagline: 'Accéder en avant-première au vivier de hauts potentiels certifiés TSF-ID',
    description: 'Bénéficiez d’un canal privilégié de recrutement direct, sans intermédiaires, pour vos postes de direction technique, ingénieurs d’élite et cadres stratégiques.',
    keyBenefits: [
      'Accès direct aux profils audités et détenteurs du passeport TSF-ID',
      'Garantie d’intégrité morale et déontologique (audits anti-biais TSF)',
      'Réduction de 60% du temps de sourcing pour les profils rares (IA, Greentech, Finance)'
    ],
    deliverables: [
      'Accès complet au registre d’accréditation et CVthèque cryptographique',
      'Sessions de job-dating exclusives pré-soutenance de promotion',
      'Suivi d’intégration post-embauche pendant 12 mois'
    ],
    startingBudgetOrFormat: 'Forfait annuel entreprise ou abonnement recrutement institutionnel',
    badgeLabel: 'Employeur de Référence TSF',
    iconName: 'UserCheck'
  },
  {
    id: 'mentorer',
    title: 'Mentorer',
    tagline: 'Mobiliser vos cadres dirigeants pour forger la future relève africaine',
    description: 'Engagez vos directeurs généraux, directeurs techniques et experts métiers dans des programmes de mentorat individuel de 6 à 12 mois auprès des lauréats.',
    keyBenefits: [
      'Engagement RSE concret et valorisant pour vos talents internes seniors',
      'Connexion intime avec les innovations de rupture émergeant des hubs TSF',
      'Participation aux jurys de soutenance académique et de certification'
    ],
    deliverables: [
      'Cadre méthodologique TSF de mentorat (séances mensuelles encadrées)',
      'Badge institutionnel « Entreprise Mentore TSF » pour vos collaborateurs',
      'Participation aux masterclasses exécutives inter-entreprises'
    ],
    startingBudgetOrFormat: 'Mécénat de compétences (bénévolat d’entreprise structuré)',
    badgeLabel: 'Alliance de Mentorat Exécutif',
    iconName: 'Users'
  },
  {
    id: 'financer',
    title: 'Financer',
    tagline: 'Co-investir en quasi-fonds propres ou amorçage dans les startups des lauréats',
    description: 'Rejoignez le tour de table du guichet SourceFund Africa pour apporter du capital patient aux scale-ups industrielles et technologiques nées des cohortes.',
    keyBenefits: [
      'Dealflow ultra-qualifié de projets pré-audités sur les plans technique et financier',
      'Garantie morale et d’alignement éthique TSF pour sécuriser les investissements',
      'Retours financiers couplés à des dividendes d’impact socio-économique'
    ],
    deliverables: [
      'Dossiers de due diligence approfondis rédigés par le directoire TSF',
      'Siège observateur au comité de pilotage des investissements',
      'Reporting financier et ESG trimestriel aux standards IFRS'
    ],
    startingBudgetOrFormat: 'Tickets d’amorçage de 50 000 $ à 500 000 $',
    badgeLabel: 'Co-Investisseur d’Impact',
    iconName: 'TrendingUp'
  },
  {
    id: 'creer_challenge',
    title: 'Créer un challenge',
    tagline: 'Lancer un hackathon souverain ou un défi R&D sur mesure pour résoudre vos verrous',
    description: 'Mobilisez l’intelligence collective des 3 000 talents du réseau TSF pour concevoir des solutions inédites à vos problématiques industrielles, logistiques ou énergétiques.',
    keyBenefits: [
      'Résolution agile de défis technologiques complexes en 48h à 3 mois',
      'Identification directe des meilleurs esprits créatifs du continent',
      'Co-propriété intellectuelle protégée sur les solutions conçues'
    ],
    deliverables: [
      'Organisation clé en main de la compétition (en ligne et dans les 18 hubs TSF)',
      'Plateforme de soumission sécurisée et jury d’experts conjoints',
      'Prototypes fonctionnels et code source validé remis à votre direction technique'
    ],
    startingBudgetOrFormat: 'Format sprint (30 jours) ou challenge semestriel',
    badgeLabel: 'Partenaire Open-Innovation',
    iconName: 'Zap'
  },
  {
    id: 'developper_programme',
    title: 'Développer un programme',
    tagline: 'Co-construire une filière d’excellence sur mesure alignée sur vos besoins futurs',
    description: 'Concevez avec le Comité Scientifique de TSF un cursus certifiant spécifique (ex. cybersécurité industrielle, réseaux intelligents, bioprocédés) pour sécuriser vos compétences critiques à 5 ans.',
    keyBenefits: [
      'Création d’un pipeline sur mesure de talents formés exactement à vos standards d’outils',
      'Positionnement pionnier de leader de souveraineté dans votre secteur',
      'Reconnaissance académique et institutionnelle co-signée avec TSF'
    ],
    deliverables: [
      'Ingénierie pédagogique complète et référentiel de compétences agréé',
      'Sélection rigoureuse des cohortes selon vos critères spécifiques',
      'Exclusivité temporaire de recrutement sur les diplômés de la filière'
    ],
    startingBudgetOrFormat: 'Convention pluriannuelle de 3 à 5 ans',
    badgeLabel: 'Co-Bâtisseur de Filière Stratégique',
    iconName: 'Layers'
  }
];

// ============================================================================
// 2. BAILLEUR / PTF — TRANSPARENCE, IMPACT & THEORY OF CHANGE
// ============================================================================
export const BAILLEUR_PROJECTS: BailleurProjectItem[] = [
  {
    id: 'proj-01',
    code: 'TSF-PTF-2026-HE',
    title: 'Déploiement Continental Horizon Excellence — Phase II (2026-2029)',
    pillar: 'Détecter & Incuber l’Élite Panafricaine',
    territories: ['Bénin', 'Sénégal', 'Rwanda', 'Ghana', 'Côte d’Ivoire', 'Kenya'],
    durationMonths: 36,
    totalBudgetUsd: 12500000,
    coFinancingTargetUsd: 4000000,
    status: 'en_deploiement',
    summary: 'Programme d’immersion stratégique, mentorat d’État et bourses d’excellence pour 1 500 hauts potentiels amenés à diriger des institutions publiques et industrielles.',
    targetBeneficiaries: '1 500 boursiers directs, 30 000 bénéficiaires indirects',
    impactMetrics: [
      { label: 'Talents Détectés & Audités', target: '3 000', current: '1 840' },
      { label: 'Taux d’Insertion Économique Cadre', target: '75%', current: '78%' },
      { label: 'Hubs Régionaux Équipés', target: '18', current: '12' }
    ]
  },
  {
    id: 'proj-02',
    code: 'TSF-PTF-2026-SF',
    title: 'Facilité d’Amorçage SourceFund Africa — Technologies Souveraines',
    pillar: 'Propulser l’Autonomie Industrielle & Agricole',
    territories: ['Afrique de l’Ouest & Afrique Centrale'],
    durationMonths: 48,
    totalBudgetUsd: 20000000,
    coFinancingTargetUsd: 7500000,
    status: 'recherche_co_financeurs',
    summary: 'Fonds de quasi-fonds propres et de bourses de propulsion finançant 300 micro-entreprises et scale-ups fondées par des lauréats TSF dans la greentech et l’agritech.',
    targetBeneficiaries: '300 micro-entreprises, 900 emplois indirects créés',
    impactMetrics: [
      { label: 'Startups Financées', target: '300', current: '84' },
      { label: 'Emplois Ruraux Qualifiés', target: '900', current: '312' },
      { label: 'Villages Électrifiés / Irrigués', target: '150', current: '47' }
    ]
  },
  {
    id: 'proj-03',
    code: 'TSF-PTF-2027-GC',
    title: 'Initiative Éveil & Olympiades Scientifiques Graines de Champions',
    pillar: 'Détection Précoce dans l’Enseignement Secondaire',
    territories: ['18 Pays Membres'],
    durationMonths: 24,
    totalBudgetUsd: 4800000,
    coFinancingTargetUsd: 1200000,
    status: 'revue_mi_parcours',
    summary: 'Concours annuel de détection de talents STEM chez les lycéens de 15 à 18 ans, internats d’excellence et immersion préparatoire aux grandes académies.',
    targetBeneficiaries: '50 000 lycéens évalués, 500 bourses complètes d’internat',
    impactMetrics: [
      { label: 'Lycées Partenaires', target: '450', current: '290' },
      { label: 'Parité Filles/Garçons STEM', target: '50%', current: '48%' },
      { label: 'Boursiers Médaillés', target: '500', current: '210' }
    ]
  }
];

export const THEORY_OF_CHANGE: TheoryOfChangeNode[] = [
  {
    step: 'inputs',
    label: '1. Intrants (Inputs)',
    title: 'Ressources Allouées & Mobilisation',
    description: 'Capitaux des bailleurs, dotations souveraines, chaires privées, infrastructures de nos 18 hubs et réseau de 120+ mentors chevronnés.',
    items: [
      'Subventions et quasi-fonds propres sans ingérence politique',
      'Plateforme numérique de détection et registre immuable TSF-ID',
      'Corps professoral émérite et experts industriels africains'
    ],
    indicators: ['Budget opérationnel consolidé', 'Taux de conformité fiduciaire 100%']
  },
  {
    step: 'activities',
    label: '2. Activités (Activities)',
    title: 'Actions Opérationnelles & Ingénierie',
    description: 'Campagnes de scouting ouvertes, tests psychométriques standardisés, bootcamps immersifs et séminaires d’éthique publique Croissance & Métanoïa.',
    items: [
      'Auditions à l’aveugle et évaluations anonymisées anti-biais',
      'Bootcamps de leadership stratégique et immersion territoriale',
      'Incubation de projets d’impact et prototypage industriel'
    ],
    indicators: ['Nombre d’auditions réalisées', 'Heures de formation dispensées']
  },
  {
    step: 'outputs',
    label: '3. Extrants (Outputs)',
    title: 'Produits Immédiats Livrés',
    description: 'Lauréats certifiés par le collège scientifique, passeports de compétences infalsifiables TSF-ID délivrés et prototypes validés.',
    items: [
      '1 500 cadres et ingénieurs certifiés Horizon Excellence',
      '300 micro-entreprises technologiques et agricoles créées',
      'Passeports numériques vérifiables par QR code institutionnel'
    ],
    indicators: ['Taux d’obtention du label TSF', 'Nombre de brevets et prototypes déposés']
  },
  {
    step: 'outcomes',
    label: '4. Effets Directs (Outcomes)',
    title: 'Transformations à Moyen Terme (1-3 ans)',
    description: 'Insertion des boursiers à des postes clés de décision publique et privée, viabilité économique des scale-ups et électrification de zones rurales.',
    items: [
      '75% de rétention et insertion économique des talents en Afrique',
      'Renforcement de la transparence des institutions partenaires',
      'Création d’emplois stables non délocalisables en zone rurale'
    ],
    indicators: ['Taux d’insertion professionnelle à 6 mois', 'Chiffre d’affaires des scale-ups financées']
  },
  {
    step: 'systemic_impact',
    label: '5. Impact Systémique',
    title: 'Vision Décennale à Long Terme (Horizon 2035)',
    description: 'Souveraineté humaine, scientifique et économique pérenne du continent africain, brisant définitivement la dépendance à l’assistance extérieure.',
    items: [
      'Inversion durable de la fuite des cerveaux vers une circulation positive',
      'Capacité endogène de concevoir et financer les infrastructures critiques',
      'Modèle de gouvernance méritocratique copié et standardisé à l’échelle continentale'
    ],
    indicators: ['Indice de souveraineté intellectuelle TSF', 'Contribution au PIB régional des filières souveraines']
  }
];

export const BAILLEUR_BUDGET_ALLOCATION: BailleurBudgetAllocation[] = [
  {
    category: 'Bourses directes & Prise en charge intégrale des lauréats',
    percentage: 52,
    description: 'Couverture 100% des frais de scolarité, internats, allocations de subsistance et bourses de recherche.',
    ringFenced: true
  },
  {
    category: 'Équipements des Hubs régionaux & Laboratoires de prototypage',
    percentage: 20,
    description: 'Supercalculateurs, micro-grids d’essai, fablabs et matériels scientifiques dans les 18 hubs.',
    ringFenced: true
  },
  {
    category: 'Dotation SourceFund Africa (Capital Patient & Bourses de Propulsion)',
    percentage: 15,
    description: 'Fonds d’amorçage direct pour les micro-entreprises des lauréats en phase de mise à l’échelle.',
    ringFenced: true
  },
  {
    category: 'Évaluation psychométrique, Jurys internationaux & Certification',
    percentage: 5,
    description: 'Honoraires des jurys tiers indépendants, audits anti-biais et maintenance du registre cryptographique.',
    ringFenced: false
  },
  {
    category: 'Frais de fonctionnement & Administration générale TSF',
    percentage: 8,
    description: 'Plafonnement statutaire strict à 8% garantissant que 92% des ressources vont directement sur le terrain.',
    ringFenced: false
  }
];

export const BAILLEUR_OFFICIAL_REPORTS: BailleurReportItem[] = [
  {
    id: 'rep-01',
    title: 'Rapport Annuel Consolidé d’Audit Financier & Conformité IFRS 2025-2026',
    period: 'Exercice Clôturé au 30 Juin 2026',
    type: 'Rapport Fiduciaire IFRS',
    fileSize: '8.4 Mo',
    verificationHash: 'SHA256:4b91c8e7...881f',
    verifiedBy: 'Cabinet d’Audit International Indépendant & Commission Mixte COS'
  },
  {
    id: 'rep-02',
    title: 'Revue à Mi-Parcours du Cadre Logique & Mesure des Rendements — Horizon Excellence',
    period: 'Septembre 2026',
    type: 'Revue à Mi-Parcours',
    fileSize: '5.2 Mo',
    verificationHash: 'SHA256:7c22a10d...914b',
    verifiedBy: 'Mission Conjointe d’Évaluation Multilatérale'
  },
  {
    id: 'rep-03',
    title: 'Audit Environnemental, Social & Gouvernance (ESG) des Hubs Territoriaux TSF',
    period: 'Juillet 2026',
    type: 'Audit ESG Indépendant',
    fileSize: '3.9 Mo',
    verificationHash: 'SHA256:9f44d8b2...018c',
    verifiedBy: 'Agence d’Accréditation et de Normalisation Africaine'
  }
];

// ============================================================================
// 3. OSC DIAGNOSTIC — QUESTIONNAIRE EN 7 DIMENSIONS
// ============================================================================
export const OSC_DIAGNOSTIC_QUESTIONS: OscDiagnosticQuestion[] = [
  {
    id: 'q-gouv-1',
    dimension: 'gouvernance',
    dimensionLabel: 'Gouvernance Institutionnelle',
    text: 'Quel est le mode de fonctionnement et de renouvellement de vos organes de gouvernance (Conseil d’Administration / Bureau) ?',
    explanation: 'La régularité statutaire et la séparation stricte entre gouvernance et équipe exécutive fondent la crédibilité auprès des partenaires institutionnels.',
    options: [
      { label: 'Informel / Organes non réunis régulièrement', points: 1, description: 'Aucune réunion formalisée de CA au cours des 12 derniers mois.' },
      { label: 'Réunions annuelles minimales', points: 2, description: 'Assemblée générale tenue avec procès-verbaux, mais conseil d’administration peu actif.' },
      { label: 'Gouvernance structurée & Procès-verbaux déposés', points: 3, description: 'Conseil d’administration trimestriel, renouvellement régulier et comités de travail.' },
      { label: 'Gouvernance d’élite & Parité / Diversité exemplaire', points: 4, description: 'Conseil d’administration paritaire avec administrateurs indépendants et comités spécialisés.' }
    ]
  },
  {
    id: 'q-fin-1',
    dimension: 'financement',
    dimensionLabel: 'Financement & Modèle Économique',
    text: 'Quelle est la répartition de vos sources de revenus et votre niveau de réserves opérationnelles ?',
    explanation: 'Une dépendance supérieure à 70% envers un bailleur unique fragilise la pérennité des actions sur le terrain.',
    options: [
      { label: 'Dépendant à 90%+ d’un seul bailleur ou sans réserves', points: 1, description: 'Trésorerie tendue avec moins d’un mois de visibilité financière.' },
      { label: '2 à 3 bailleurs avec 2 à 3 mois de réserves de fonctionnement', points: 2, description: 'Financements par projets courts sans socle pérenne.' },
      { label: 'Sources diversifiées (Bailleurs + Cotisations + Événements)', points: 3, description: 'Plus de 6 mois de réserves de fonctionnement et comptabilité d’engagement.' },
      { label: 'Modèle hybride souverain & Fonds de dotation pérenne', points: 4, description: '12 mois de réserves, activités génératrices de revenus et co-financements stables.' }
    ]
  },
  {
    id: 'q-dig-1',
    dimension: 'digitalisation',
    dimensionLabel: 'Digitalisation & Données',
    text: 'À quel degré vos processus de gestion, de collecte terrain et de protection des données sont-ils numérisés ?',
    explanation: 'L’utilisation d’outils modernes et la conformité aux lois de protection des données bénéficiaires garantissent la fluidité opérationnelle.',
    options: [
      { label: 'Essentiellement sur papier et messagerie personnelle', points: 1, description: 'Aucun outil partagé ni sauvegarde sécurisée.' },
      { label: 'Outils bureautiques de base (tableurs partagés simples)', points: 2, description: 'Données dispersées sans protocole formalisé de sauvegarde.' },
      { label: 'Outils collaboratifs cloud & Collecte terrain numérique (Kobo/ODK)', points: 3, description: 'Outils professionnels et charte de confidentialité des données respectée.' },
      { label: 'Système d’information intégré (ERP/CRM) & Protection certifiée', points: 4, description: 'Tableaux de bord en temps réel et politique stricte de cybersécurité.' }
    ]
  },
  {
    id: 'q-rh-1',
    dimension: 'rh',
    dimensionLabel: 'Ressources Humaines & Équité',
    text: 'Comment sont formalisés les contrats, la formation continue et la sécurité de votre personnel et des bénévoles ?',
    explanation: 'Le capital humain est le premier actif d’une organisation de la société civile.',
    options: [
      { label: 'Bénévolat exclusif sans contrat formalisé', points: 1, description: 'Pas de fiches de poste ni de couverture d’assurance.' },
      { label: 'Contrats de prestation ponctuels', points: 2, description: 'Fiches de poste sommaires avec fort taux de rotation non maîtrisé.' },
      { label: 'Équipe salariée déclarée avec fiches de poste et grille salariale', points: 3, description: 'Contrats conformes au droit du travail et entretiens annuels.' },
      { label: 'Politique RH complète (Plan de formation, Safeguarding, Égalité)', points: 4, description: 'Protection sociale complète, plan de carrière et politique tolérance zéro anti-harcèlement.' }
    ]
  },
  {
    id: 'q-com-1',
    dimension: 'communication',
    dimensionLabel: 'Communication & Plaidoyer',
    text: 'Quelle est la visibilité publique de vos actions et votre redevabilité envers les communautés bénéficiaires ?',
    explanation: 'Une communication transparente renforce la confiance citoyenne et facilite le plaidoyer auprès des décideurs.',
    options: [
      { label: 'Présence publique quasi inexistante ou épisodique', points: 1, description: 'Pas de site internet actif ni de rapports publics diffusés.' },
      { label: 'Page sur les réseaux sociaux alimentée irrégulièrement', points: 2, description: 'Communication événementielle sans stratégie éditoriale définie.' },
      { label: 'Site web actualisé, rapport d’activité annuel public et accessible', points: 3, description: 'Ligne éditoriale claire et restitution régulière aux communautés.' },
      { label: 'Capacité de plaidoyer national/international & Écho médiatique fort', points: 4, description: 'Prises de parole régulières, publications d’impact et influence politique reconnue.' }
    ]
  },
  {
    id: 'q-se-1',
    dimension: 'suivi_evaluation',
    dimensionLabel: 'Suivi-Évaluation & Impact',
    text: 'Disposez-vous d’un cadre logique, d’indicateurs désagrégés et de mécanismes d’évaluation systématique de vos projets ?',
    explanation: 'Mesurer la transformation réelle sur le terrain permet d’ajuster les méthodes et de prouver le rendement social aux bailleurs.',
    options: [
      { label: 'Pas de suivi formalisé au-delà des factures de dépenses', points: 1, description: 'Les résultats sont décrits de manière purement qualitative non mesurée.' },
      { label: 'Indicateurs d’activités basiques (ex. nombre de participants)', points: 2, description: 'Collecte ponctuelle sans théorie du changement consolidée.' },
      { label: 'Cadre logique formalisé avec cibles, baselines et revues périodiques', points: 3, description: 'Outils de suivi standardisés avec collecte rigoureuse sur le terrain.' },
      { label: 'Évaluation d’impact systématique par des tiers & Boucles de rétroaction', points: 4, description: 'Données désagrégées (genre, âge, handicap) et restitution aux bénéficiaires.' }
    ]
  },
  {
    id: 'q-mob-1',
    dimension: 'mobilisation_ressources',
    dimensionLabel: 'Mobilisation de Ressources & Alliances',
    text: 'Quelle est votre capacité à nouer des partenariats stratégiques, mobiliser des donateurs locaux et répondre à des appels à projets ?',
    explanation: 'L’enracinement territorial et la capacité de consortium démultiplient l’accès aux guichets institutionnels.',
    options: [
      { label: 'Isolement ou absence d’expérience de réponse formelle', points: 1, description: 'Aucune soumission d’appels à projets au cours des 24 derniers mois.' },
      { label: 'Candidatures isolées avec faible taux de succès', points: 2, description: 'Difficulté à monter des budgets complexes ou des narratifs conformes.' },
      { label: 'Membre actif de plateformes nationales et succès réguliers', points: 3, description: 'Capacité avérée à rédiger des propositions complètes et à gérer des consortiums.' },
      { label: 'Chef de file de consortiums sous-régionaux & Guichets directs bilatéraux', points: 4, description: 'Accréditation directe auprès des grandes institutions multilatérales et mécènes.' }
    ]
  }
];

// ============================================================================
// 4. PARTNER DASHBOARD — DONNÉES DE SIMULATION HAUTE FIDÉLITÉ
// ============================================================================
export const SAMPLE_PARTNER_DASHBOARDS: Record<string, PartnerDashboardState> = {
  entreprise: {
    partnerName: 'Sonatel / Orange Africa Strategic Innovations',
    partnerType: 'entreprise',
    country: 'Sénégal / Panafricain',
    partnershipSince: 'Janvier 2024',
    programs: [
      {
        id: 'pp-01',
        programSlug: 'horizon-excellence',
        title: 'Chaire d’Excellence Télécoms & IA Souveraine — Promotion 2026',
        pathway: 'entreprise',
        contributionType: 'Parrainage de Chaire & Bourses Complètes',
        financialOrInKindCommitment: '150 000 $ / an',
        activeCohorts: 2,
        laureatesBenefiting: 24,
        renewalDate: 'Décembre 2027',
        status: 'actif'
      },
      {
        id: 'pp-02',
        programSlug: 'graines-de-champions',
        title: 'Challenge Open-Innovation Data & Connectivité Rurale',
        pathway: 'entreprise',
        contributionType: 'Co-Organisation de Challenge R&D',
        financialOrInKindCommitment: '45 000 $ en dotations de prototypage',
        activeCohorts: 1,
        laureatesBenefiting: 60,
        renewalDate: 'Juin 2027',
        status: 'actif'
      }
    ],
    applications: [
      {
        id: 'app-ent-01',
        title: 'Extension de la Chaire d’Excellence au Hub TSF Kigali',
        category: 'Chaire d’Entreprise',
        submittedDate: '15 Août 2026',
        stage: 'Signature Protocole',
        trackingNumber: 'CONV-2026-SON-08',
        assignedAdvisor: 'M. Tidjane Ndiaye (Directeur des Alliances Privées TSF)'
      }
    ],
    documents: [
      {
        id: 'doc-ent-01',
        title: 'Convention Cadre Pluriannuelle de Coopération Stratégique TSF-Sonatel',
        type: 'Convention Cadre Pluriannuelle',
        signedDate: '12 Janvier 2024',
        validUntil: '12 Janvier 2029',
        status: 'SIGNE_CONFORME',
        fileSize: '4.2 Mo'
      },
      {
        id: 'doc-ent-02',
        title: 'Charte d’Accès Privilégié au Vivier de Recrutement Certifié TSF-ID',
        type: 'Charte Éthique & Déontologie',
        signedDate: '15 Février 2024',
        validUntil: 'Permanent',
        status: 'SIGNE_CONFORME',
        fileSize: '1.8 Mo'
      }
    ],
    indicators: [
      {
        id: 'ind-ent-01',
        label: 'Lauréats TSF recrutés en CDI cadre au sein du groupe',
        baseline: '0',
        currentValue: '18',
        targetValue: '30',
        unit: 'Ingénieurs & Directeurs',
        lastUpdated: 'Septembre 2026',
        verifiedByAudit: true
      },
      {
        id: 'ind-ent-02',
        label: 'Heures de mentorat assurées par nos cadres dirigeants',
        baseline: '0',
        currentValue: '140',
        targetValue: '200',
        unit: 'Heures homologuées',
        lastUpdated: 'Août 2026',
        verifiedByAudit: true
      },
      {
        id: 'ind-ent-03',
        label: 'Taux de rétention des talents recrutés à 18 mois',
        baseline: '70%',
        currentValue: '94%',
        targetValue: '90%',
        unit: '%',
        lastUpdated: 'Septembre 2026',
        verifiedByAudit: true
      }
    ],
    opportunities: [
      {
        id: 'opp-ent-01',
        title: 'Recrutement Fast-Track — 6 Lead Data Scientists & Architectes Cloud',
        domain: 'Intelligence Artificielle & Télécoms',
        deadline: '15 Novembre 2026',
        spotsOffered: 6,
        applicantsCount: 22,
        status: 'en_selection'
      }
    ],
    messages: [
      {
        id: 'msg-ent-01',
        senderName: 'Directoire Exécutif TSF',
        senderRole: 'Secrétariat Général aux Alliances',
        subject: 'Revue semestrielle de la Chaire Télécoms & Session de Soutenance',
        preview: 'Chers partenaires, nous vous convions à la session plénière du grand jury...',
        body: 'Monsieur le Directeur,\n\nNous avons le plaisir de vous transmettre le relevé de notes certifié de la promotion Sonatel 2026. L’ensemble des 24 boursiers a validé les épreuves techniques avec une moyenne générale de 16,8/20.\n\nNous vous attendons le 18 Novembre pour la remise solennelle des Passeports TSF-ID.\n\nHaute considération,\nLe Secrétariat Général TSF',
        sentAt: 'Il y a 1 jour',
        unread: true
      }
    ],
    reports: [
      {
        id: 'rep-ent-01',
        title: 'Bilan d’Exécution & Rétention des Talents — Semestre 1 2026',
        frequency: 'Semestriel',
        date: 'Juillet 2026',
        category: 'Rapport d’Exécution & Impact',
        status: 'Approuvé COS'
      }
    ]
  },
  bailleur: {
    partnerName: 'Fonds Panafricain de Développement Durable & d’Excellence (FPDD)',
    partnerType: 'bailleur',
    country: 'Banque Multilatérale Africaine (Siège Abidjan)',
    partnershipSince: 'Juin 2023',
    programs: [
      {
        id: 'pp-bail-01',
        programSlug: 'sourcefund-africa',
        title: 'Facilité d’Amorçage Souveraine & Garantie Morale — Tranche 1',
        pathway: 'bailleur',
        contributionType: 'Subvention d’Investissement & Quasi-Fonds Propres',
        financialOrInKindCommitment: '5 000 000 $ décaissés sur 3 ans',
        activeCohorts: 3,
        laureatesBenefiting: 140,
        renewalDate: 'Décembre 2028',
        status: 'actif'
      }
    ],
    applications: [
      {
        id: 'app-bail-01',
        title: 'Appel d’Offres Multilatéral — Électrification de 150 Villages (Tranche 2)',
        category: 'Appel à Projets Conjoint',
        submittedDate: '02 Septembre 2026',
        stage: 'Instruction Juridique',
        trackingNumber: 'PTF-2026-FPDD-09',
        assignedAdvisor: 'Mme Christine Touré (Direction Financière & Conformité TSF)'
      }
    ],
    documents: [
      {
        id: 'doc-bail-01',
        title: 'Accord de Financement Non Remboursable N° AF-2023-TSF-001',
        type: 'Convention Cadre Pluriannuelle',
        signedDate: '10 Juin 2023',
        validUntil: '10 Juin 2028',
        status: 'SIGNE_CONFORME',
        fileSize: '6.8 Mo'
      }
    ],
    indicators: [
      {
        id: 'ind-bail-01',
        label: 'Micro-entreprises créées et certifiées viables à 12 mois',
        baseline: '0',
        currentValue: '84',
        targetValue: '120',
        unit: 'Startups / PME',
        lastUpdated: 'Août 2026',
        verifiedByAudit: true
      },
      {
        id: 'ind-bail-02',
        label: 'Taux de déperdition administrative (frais de siège TSF)',
        baseline: '10%',
        currentValue: '7.8%',
        targetValue: '< 8%',
        unit: '% du budget',
        lastUpdated: 'Septembre 2026',
        verifiedByAudit: true
      }
    ],
    opportunities: [],
    messages: [
      {
        id: 'msg-bail-01',
        senderName: 'Auditeur Principal — Cabinet d’Audit Multilatéral',
        senderRole: 'Commissariat aux Comptes Tiers',
        subject: 'Clôture de la revue fiduciaire intermédiaire — Quitus sans réserve',
        preview: 'L’audit fiduciaire intermédiaire n’a révélé aucune anomalie d’éligibilité...',
        body: 'Madame la Directrice Financière,\n\nNous avons l’honneur de vous notifier le quitus complet sans aucune réserve d’éligibilité pour les dépenses imputées sur la tranche 2025-2026.\n\nLe respect du plafond de 8% de frais généraux est scrupuleusement constaté.\n\nRecevez nos salutations distinguées,\nLe Collège d’Audit IFRS',
        sentAt: 'Il y a 3 jours',
        unread: false
      }
    ],
    reports: [
      {
        id: 'rep-bail-01',
        title: 'Rapport d’Audit Fiduciaire & Relevé des Décaissements Q2 2026',
        frequency: 'Trimestriel',
        date: 'Août 2026',
        category: 'Relevé Fiduciaire',
        status: 'Certifié IFRS'
      }
    ]
  },
  osc: {
    partnerName: 'Collectif Panafricain pour l’Éducation & la Souveraineté Communautaire (COPESC)',
    partnerType: 'osc',
    country: 'Afrique de l’Ouest & Centrale (Bénin, Togo, RDC)',
    partnershipSince: 'Mars 2025',
    programs: [
      {
        id: 'pp-osc-01',
        programSlug: 'tsf-detecte',
        title: 'Dispositif Conjoint de Scouting Communautaire en Milieu Rural',
        pathway: 'osc',
        contributionType: 'Relais Territorial & Identification Décentralisée',
        financialOrInKindCommitment: 'Mise à disposition de 40 animateurs de terrain',
        activeCohorts: 2,
        laureatesBenefiting: 85,
        renewalDate: 'Mars 2027',
        status: 'actif'
      }
    ],
    applications: [
      {
        id: 'app-osc-01',
        title: 'Demande d’Appui Technique & Renforcement Institutionnel TSF',
        category: 'Convention de Partenariat',
        submittedDate: '10 Septembre 2026',
        stage: 'Comité d’Alliance',
        trackingNumber: 'OSC-2026-COPESC-12',
        assignedAdvisor: 'M. Abdoulaye Koné (Pôle Société Civile TSF)'
      }
    ],
    documents: [
      {
        id: 'doc-osc-01',
        title: 'Protocole d’Accord Territorial de Détection des Talents Isolés',
        type: 'Protocole d’Accord (MoU)',
        signedDate: '15 Mars 2025',
        validUntil: '15 Mars 2027',
        status: 'SIGNE_CONFORME',
        fileSize: '2.1 Mo'
      }
    ],
    indicators: [
      {
        id: 'ind-osc-01',
        label: 'Jeunes ruraux repérés et présentés aux tests psychométriques TSF',
        baseline: '0',
        currentValue: '142',
        targetValue: '200',
        unit: 'Candidats',
        lastUpdated: 'Septembre 2026',
        verifiedByAudit: true
      }
    ],
    opportunities: [],
    messages: [
      {
        id: 'msg-osc-01',
        senderName: 'Pôle Société Civile TSF',
        senderRole: 'Accompagnement & Renforcement',
        subject: 'Restitution de votre diagnostic de maturité organisationnelle TSF',
        preview: 'Votre diagnostic a été analysé. Votre organisation se situe au palier Consolidation...',
        body: 'Chers amis du COPESC,\n\nFélicitations pour votre engagement. Vos résultats au diagnostic TSF (76/100) confirment votre solide ancrage communautaire. Nos experts vous proposent un atelier de 2 jours sur la diversification des financements.\n\nFraternellement,\nLe Responsable Pôle OSC TSF',
        sentAt: 'Il y a 5 jours',
        unread: false
      }
    ],
    reports: [
      {
        id: 'rep-osc-01',
        title: 'Bilan d’Évaluation des Candidatures Rurales Détectées 2025-2026',
        frequency: 'Annuel',
        date: 'Juin 2026',
        category: 'Rapport d’Exécution & Impact',
        status: 'Approuvé COS'
      }
    ]
  }
};
