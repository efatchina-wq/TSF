import { MarketplaceOpportunity } from '../types/opportunity';

export const OPPORTUNITY_DOMAINS = [
  'Tous les domaines',
  'Intelligence Artificielle & Data',
  'Greentech & Énergie Décentralisée',
  'Haute Finance & Fintech',
  'Santé Publique & Biotechnologies',
  'Algorithmique & Cybersécurité Souveraine',
  'Politiques Publiques & Gouvernance',
  'Agro-industrie & Chaînes de Valeur',
  'Infrastructures & Industrie 4.0'
];

export const OPPORTUNITY_LOCATIONS = [
  'Toutes les localisations',
  'Panafricain / Hybride',
  'Dakar, Sénégal',
  'Kigali, Rwanda',
  'Cotonou, Bénin',
  'Accra, Ghana',
  'Abidjan, Côte d’Ivoire',
  'Nairobi, Kenya',
  'Casablanca, Maroc',
  'Addis-Abeba, Éthiopie'
];

export const OPPORTUNITY_TYPES = [
  'Tous les types',
  'Emploi',
  'Stage',
  'Formation',
  'Bourse',
  'Concours',
  'Financement',
  'Appel à projets',
  'Mentorat',
  'Partenariat'
];

export const OPPORTUNITY_LEVELS = [
  'Tous niveaux',
  'Étudiant / Premier cycle',
  'Junior / Émergent',
  'Praticien / Intermédiaire',
  'Cadre Dirigeant / Senior',
  'Fellow / Haut Potentiel'
];

export const OPPORTUNITY_DEADLINES = [
  'Toutes les dates',
  'Urgent (< 15 jours)',
  'Moins de 30 jours',
  'Moins de 60 jours',
  'Au-delà de 60 jours / En continu'
];

export const MARKETPLACE_OPPORTUNITIES: MarketplaceOpportunity[] = [
  {
    id: 'opp-emploi-01',
    title: 'Directeur de la Modélisation Épidémiologique & Veille Sanitaire',
    type: 'Emploi',
    domain: 'Santé Publique & Biotechnologies',
    location: 'Addis-Abeba / Dakar (Hybride)',
    country: 'Éthiopie / Sénégal',
    level: 'Cadre Dirigeant / Senior',
    deadline: '15 Novembre 2026',
    deadlineDate: '2026-11-15',
    organization: 'Africa CDC en partenariat avec TSF',
    organizationType: 'Banque Multilatérale',
    description: 'Poste régalien de premier plan pour coordonner la stratégie de surveillance autonome des pandémies en Afrique subsaharienne.',
    fullDescription: 'Sous la tutelle conjointe de l’Africa CDC et du Secrétariat Scientifique TSF, le titulaire dirigera une unité de 18 data scientists et biostatisticiens. Il aura la responsabilité d’intégrer les flux satellitaires et cliniques des 55 États membres afin de bâtir un système d’alerte précoce indépendant des agences occidentales.',
    eligibility: [
      'Titulaire d’un doctorat (Ph.D.) en biostatistique, IA ou santé publique quantitative',
      'Minimum 7 années d’expérience dans la direction de programmes multilatéraux',
      'Certification TSF Niveau III ou IV appréciée'
    ],
    benefits: [
      'Statut diplomatique international et rémunération de cadre dirigeant',
      'Budget de recherche alloué de 2,4 millions $ sur 3 ans',
      'Accès prioritaire aux supercalculateurs des Hubs TSF'
    ],
    requirements: [
      'Maîtrise approfondie des modèles probabilistes et deep learning sous PyTorch/JAX',
      'Bilinguisme parfait Français / Anglais'
    ],
    compensationOrBudget: '85 000 $ - 110 000 $ / an (Net d’impôt international)',
    spots: 2,
    status: 'ouvert',
    featured: true,
    postedDate: '01 Octobre 2026'
  },
  {
    id: 'opp-bourse-01',
    title: 'Bourse d’Élite Horizon Excellence — Promotion Nelson Mandela 2027',
    type: 'Bourse',
    domain: 'Politiques Publiques & Gouvernance',
    location: 'Kigali, Rwanda (Immersion)',
    country: 'Rwanda',
    level: 'Fellow / Haut Potentiel',
    deadline: '30 Novembre 2026',
    deadlineDate: '2026-11-30',
    organization: 'Académie des Cadres TSF',
    organizationType: 'Institution TSF',
    description: 'Bourse complète d’immersion stratégique couvrant 100% des frais de scolarité, de résidence et de recherche pour les 60 futurs bâtisseurs d’Afrique.',
    fullDescription: 'Le programme élite Horizon Excellence accueille chaque année les 60 esprits les plus brillants du continent pour un cursus résidentiel de 12 mois combinant géopolitique africaine, haute diplomatie économique, éthique républicaine et immersion industrielle de pointe.',
    eligibility: [
      'Nationalité de l’un des 54 pays africains',
      'Âge maximal de 32 ans au 31 décembre 2026',
      'Master 2, diplôme d’ingénieur d’État ou doctorat en cours'
    ],
    benefits: [
      'Prise en charge intégrale (billets, hébergement sur campus TSF Kigali, per diem)',
      'Attribution d’un mentor personnel de rang ministériel ou dirigeant de multinationale',
      'Délivrance du Passeport d’Excellence TSF-ID après soutenance'
    ],
    requirements: [
      'Réussite aux tests psychométriques standardisés de la Phase 1',
      'Engagement formel de retour et d’activité professionnelle de 5 ans en Afrique'
    ],
    compensationOrBudget: 'Prise en charge intégrale estimée à 45 000 $ / boursier',
    spots: 60,
    status: 'ouvert',
    featured: true,
    postedDate: '15 Septembre 2026'
  },
  {
    id: 'opp-financement-01',
    title: 'Guichet d’Amorçage SourceFund Africa — Technologies Souveraines & Greentech',
    type: 'Financement',
    domain: 'Greentech & Énergie Décentralisée',
    location: 'Panafricain / Hybride',
    country: 'Panafricain',
    level: 'Praticien / Intermédiaire',
    deadline: '20 Décembre 2026',
    deadlineDate: '2026-12-20',
    organization: 'SourceFund Africa (Guichet TSF)',
    organizationType: 'Institution TSF',
    description: 'Ticket d’amorçage en quasi-fonds propres de 50 000 $ à 150 000 $ sans dilution agressive pour scale-ups industrielles et micro-grids.',
    fullDescription: 'SourceFund Africa injecte du capital patient dans les entreprises fondées par des lauréats TSF ou ingénieurs africains apportant des solutions concrètes à l’autonomie énergétique, au stockage solaire hybride et à la mécanisation agricole décentralisée.',
    eligibility: [
      'Entreprise immatriculée dans un État africain avec au moins 1 fondateur lauréat ou certifié TSF',
      'Prototype fonctionnel ou preuve de concept validée sur le terrain',
      'Impact mesurable : emplois locaux créés et transition écologique'
    ],
    benefits: [
      'Quasi-fonds propres à taux concessionnel avec franchise de remboursement de 24 mois',
      'Garantie morale TSF ouvrant l’accès aux centrales d’achat des bailleurs',
      'Accompagnement juridique et IFRS par nos commissaires aux comptes'
    ],
    requirements: [
      'Dossier technique de modélisation financière et audit environnemental préliminaire'
    ],
    compensationOrBudget: '50 000 $ à 150 000 $ par projet lauréat',
    spots: 15,
    status: 'ouvert',
    featured: true,
    postedDate: '20 Septembre 2026'
  },
  {
    id: 'opp-stage-01',
    title: 'Stage d’Immersion R&D — Cryptographie Post-Quantique & Systèmes Résilients',
    type: 'Stage',
    domain: 'Algorithmique & Cybersécurité Souveraine',
    location: 'Cotonou, Bénin (Hub TSF Afrique de l’Ouest)',
    country: 'Bénin',
    level: 'Étudiant / Premier cycle',
    deadline: '10 Décembre 2026',
    deadlineDate: '2026-12-10',
    organization: 'Laboratoire d’Algorithmique Souveraine TSF',
    organizationType: 'Institution TSF',
    description: 'Stage de recherche appliquée de 6 mois pour jeunes mathématiciens et développeurs Rust travaillant sur des bibliothèques cryptographiques souveraines.',
    fullDescription: 'Ce stage offre une opportunité rare de contribuer au développement de bibliothèques cryptographiques post-quantiques adaptées aux microcontrôleurs embarqués et téléphones d’entrée de gamme africains sous la tutelle de chercheurs de renommée mondiale.',
    eligibility: [
      'Étudiants en fin de cycle de Licence ou Master en mathématiques ou informatique',
      'Excellente maîtrise du langage Rust ou C bas-niveau',
      'Passion démontrée pour la cryptologie théorique et les courbes elliptiques'
    ],
    benefits: [
      'Indemnité mensuelle de stage de 850 $ + hébergement au Hub Cotonou',
      'Possibilité de co-publication scientifique internationale',
      'Accès direct aux jurys de bourses doctorales TSF'
    ],
    requirements: [
      'Soumission d’un code source personnel ou repo GitHub public'
    ],
    compensationOrBudget: '850 $ / mois + Hébergement pris en charge',
    spots: 6,
    status: 'ouvert',
    postedDate: '28 Septembre 2026'
  },
  {
    id: 'opp-formation-01',
    title: 'Programme Exécutif Croissance & Métanoïa — Éthique Managériale & Résilience',
    type: 'Formation',
    domain: 'Politiques Publiques & Gouvernance',
    location: 'Dakar & Hybride',
    country: 'Sénégal',
    level: 'Cadre Dirigeant / Senior',
    deadline: '05 Janvier 2027',
    deadlineDate: '2027-01-05',
    organization: 'Académie de Gouvernance TSF',
    organizationType: 'Institution TSF',
    description: 'Séminaire intensif de haute posture républicaine, négociation multipartite et gestion des dilemmes d’intégrité pour hauts fonctionnaires.',
    fullDescription: 'Conçu en réponse aux pressions multiformes pesant sur les décideurs africains, le cursus Croissance & Métanoïa forge le bouclier moral et technique nécessaire pour résister à la corruption, négocier des contrats d’État équilibrés et préserver l’intérêt public.',
    eligibility: [
      'Directeurs généraux, secrétaires généraux d’agences publiques, magistrats ou directeurs de banques',
      'Recommandation institutionnelle obligatoire'
    ],
    benefits: [
      'Certificat d’Excellence TSF en Éthique Publique & Haute Gouvernance',
      'Réseau d’entraide entre pairs et veille déontologique permanente'
    ],
    requirements: [
      'Étude de cas en conditions réelles et serment d’intégrité TSF'
    ],
    compensationOrBudget: 'Frais pris en charge par le fonds de dotation TSF pour les cadres publics',
    spots: 25,
    status: 'ouvert',
    postedDate: '02 Octobre 2026'
  },
  {
    id: 'opp-concours-01',
    title: 'Olympiades Panafricaines STEM — Graines de Champions 2027',
    type: 'Concours',
    domain: 'Intelligence Artificielle & Data',
    location: 'Épreuves dans 18 Capitales Régionales',
    country: 'Panafricain',
    level: 'Étudiant / Premier cycle',
    deadline: '15 Janvier 2027',
    deadlineDate: '2027-01-15',
    organization: 'Comité Graines de Champions TSF',
    organizationType: 'Institution TSF',
    description: 'Grande compétition scientifique continentale ouverte aux lycéens et lycéennes pour l’octroi de 120 bourses intégrales d’internat.',
    fullDescription: 'Les Olympiades Graines de Champions mettent en compétition plus de 20 000 jeunes esprits dans les domaines des mathématiques pures, de l’algorithmique, de la physique fondamentale et de la robotique. Les lauréats reçoivent des médailles d’or, d’argent et de bronze ainsi que des bourses complètes.',
    eligibility: [
      'Élèves scolarisés en classe de Première ou Terminale scientifique (C, D, E, S ou équivalent international)',
      'Parité stricte encouragée (50% de candidates féminines)'
    ],
    benefits: [
      '120 Bourses d’internat d’excellence TSF',
      'Tablettes tactiles et dotations en supercalculateurs pour les lycées vainqueurs',
      'Parrainage nominatif par un chercheur de renommée mondiale'
    ],
    requirements: [
      'Inscription via l’établissement scolaire ou candidature individuelle en ligne'
    ],
    compensationOrBudget: '150 000 $ de dotations totales distribuées',
    spots: 120,
    status: 'ouvert',
    postedDate: '05 Octobre 2026'
  },
  {
    id: 'opp-appel-01',
    title: 'Appel à Projets Conjoint — Solutions Agricoles Résilientes au Sahel',
    type: 'Appel à projets',
    domain: 'Agro-industrie & Chaînes de Valeur',
    location: 'Bassin du Sahel (Sénégal, Mali, Niger, Burkina, Tchad)',
    country: 'Multi-pays',
    level: 'Praticien / Intermédiaire',
    deadline: '28 Février 2027',
    deadlineDate: '2027-02-28',
    organization: 'Consortium OSC TSF & Bailleurs Partenaires',
    organizationType: 'OSC',
    description: 'Subventions de 30 000 $ à 80 000 $ pour coopératives et collectifs intégrant l’énergie solaire et les semences améliorées.',
    fullDescription: 'Cet appel à projets soutient les innovations portées par des organisations de la société civile locale visant à stabiliser la sécurité alimentaire des zones rurales sèches par le couplage entre pompage photovoltaïque, sélection variétale endogène et transformation locale.',
    eligibility: [
      'Organisations de la Société Civile (OSC) ayant réalisé le TSF OSC Diagnostic',
      'Au moins 2 années d’existence juridique attestée',
      'Comptabilité transparente certifiée'
    ],
    benefits: [
      'Subvention non remboursable décaissée en 3 tranches jalonnées',
      'Assistance technique directe des ingénieurs agronomes TSF',
      'Mise en réseau avec les centrales d’achat sous-régionales'
    ],
    requirements: [
      'Cadre logique consolidé avec indicateurs d’impact désagrégés'
    ],
    compensationOrBudget: 'Enveloppe globale de 800 000 $ (Tickets de 30k$ à 80k$)',
    spots: 18,
    status: 'ouvert',
    postedDate: '10 Octobre 2026'
  },
  {
    id: 'opp-mentorat-01',
    title: 'Mentorat Exécutif — Accompagnement par d’Anciens Dirigeants Multilatéraux',
    type: 'Mentorat',
    domain: 'Haute Finance & Fintech',
    location: 'Distanciel & Séminaire Annuel Kigali',
    country: 'Panafricain',
    level: 'Junior / Émergent',
    deadline: '25 Novembre 2026',
    deadlineDate: '2026-11-25',
    organization: 'Réseau des Dirigeants Émérites TSF',
    organizationType: 'Institution TSF',
    description: 'Parrainage personnalisé de 12 mois pour 30 jeunes fondateurs et analystes par des anciens vice-présidents de banques et CEO.',
    fullDescription: 'Le programme de mentorat exécutif TSF associe individuellement chaque jeune talent sélectionné à un leader d’envergure internationale. Chaque mentor consacre 4 heures mensuelles d’échanges stratégiques, d’ouverture de carnet d’adresses et de conseil en négociation financière.',
    eligibility: [
      'Jeunes diplômés ou entrepreneurs de moins de 30 ans avec projet en cours',
      'Titulaire d’un identifiant unique TSF-ID (Niveau I ou II)'
    ],
    benefits: [
      'Séances de mentorat bilatérales confidentielles',
      'Accès direct aux réseaux d’investisseurs et décideurs publics',
      'Invitation exclusive au Dîner des Bâtisseurs lors du Sommet TSF'
    ],
    requirements: [
      'Régularité stricte et signature de la charte de confidentialité réciproque'
    ],
    compensationOrBudget: 'Programme 100% gracieux offert par le réseau TSF',
    spots: 30,
    status: 'ouvert',
    postedDate: '01 Octobre 2026'
  },
  {
    id: 'opp-partenariat-01',
    title: 'Appel à Manifestation d’Intérêt — Partenariats d’Industrialisation Locale',
    type: 'Partenariat',
    domain: 'Infrastructures & Industrie 4.0',
    location: 'Hubs Régionaux TSF (Dakar, Accra, Kigali, Cotonou)',
    country: 'Multi-pays',
    level: 'Tous niveaux',
    deadline: '31 Janvier 2027',
    deadlineDate: '2027-01-31',
    organization: 'Pôle Alliances Industrielles TSF',
    organizationType: 'Entreprise Partenaire',
    description: 'Recherche de partenaires industriels pour installer des lignes de montage locales et usines pilotes dans nos fablabs.',
    fullDescription: 'TSF invite les équipementiers industriels et industriels régionaux à co-investir dans les infrastructures d’assemblage de nos hubs pour fabriquer localement du matériel électronique, des transformateurs et des kits d’irrigation intelligents.',
    eligibility: [
      'Entreprises industrielles privées disposant d’au moins 3 ans d’exercice',
      'Capacité à transférer des compétences technologiques vers nos ingénieurs certifiés'
    ],
    benefits: [
      'Exonérations douanières et fiscales dans le cadre des accords de franchise TSF',
      'Mise à disposition de locaux équipés dans les hubs régionaux',
      'Pipeline garanti de techniciens et ingénieurs supérieurs certifiés TSF-ID'
    ],
    requirements: [
      'Plan d’investissement industriel sur 3 ans minimum'
    ],
    compensationOrBudget: 'Co-investissement sous convention bilatérale sur mesure',
    spots: 8,
    status: 'ouvert',
    postedDate: '04 Octobre 2026'
  }
];
