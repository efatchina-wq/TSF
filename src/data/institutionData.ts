import {
  MethodologyStep,
  Program,
  GovernanceBody,
  GovernancePrinciple,
  HistoryMilestone,
  PartnerCategory,
  OpportunityItem,
  ImpactMetric,
  InstitutionalResource
} from '../types';
import { PROGRAMS_EXTENDED_DATA } from './programsData';

export const INSTITUTION_INFO = {
  name: 'Talents Sans Frontières',
  acronym: 'TSF',
  devise: 'Construire les compétences. Libérer le potentiel. Élever le continent.',
  nature: 'Organisation Panafricaine d’Intérêt Général',
  natureJuridique: 'Organisation Internationale Non Gouvernementale (OING) de droit privé à vocation publique, régie par accord de siège et conventions internationales.',
  creation: '2015 (Initiative & Diagnostic) — 2017 (Fondation & Statuts Officiels)',
  reconnaissance: 'Reconnue d’utilité publique panafricaine, conventions de siège intergouvernementales, accords de coopération avec les ministères de l’Enseignement Supérieur, de l’Économie Numérique et de la Recherche de 18 pays africains.',
  siege: 'Boulevard de la Marina, Cotonou — Hub Opérationnel Afrique de l’Ouest',
  zoneIntervention: 'Continent Africain — 18 pays sous couverture opérationnelle permanente (Afrique de l’Ouest, Centrale, Orientale, Australe et Nord) et représentations de la diaspora.',
  domainesIntervention: [
    'Sciences dures, Mathématiques Appliquées & Ingénierie (STEM)',
    'Intelligence Artificielle, Souveraineté Numérique & Calcul Haute Performance',
    'Haute Gouvernance Publique, Diplomatie Stratégique & Réformes Systémiques',
    'Macro-économie, Finance de Développement & Capital Patient d’Amorçage',
    'Transition Énergétique, Écologie Appliquée & Souveraineté Sanitaire'
  ],
  headline: 'L’infrastructure panafricaine de détection, développement, certification et propulsion des talents.',
  subheadline: 'Construire une chaîne de valeur humaine d’excellence pour le dividende démographique et la souveraineté intellectuelle de l’Afrique.',
  mission: 'Identifier, structurer, certifier et propulser à l’échelle internationale les talents africains d’exception dans les sciences, les technologies, le management stratégique et l’innovation sociétale.',
  vision: 'Une Afrique où le potentiel individuel ne connaît aucune frontière géographique, économique ou institutionnelle, devenant le principal moteur de transformation et de prospérité souveraine du continent.',
  values: [
    {
      title: 'Excellence & Intransigeance Qualitaire',
      description: 'L’application des plus hauts standards internationaux d’évaluation et de performance sans aucun compromis.'
    },
    {
      title: 'Intégrité & Transparence Institutionnelle',
      description: 'Une gouvernance irréprochable et un processus de sélection rigoureusement fondé sur le mérite intrinsèque et audité.'
    },
    {
      title: 'Panafricanisme Opérationnel',
      description: 'Une démarche intégrée qui transcende les barrières linguistiques, nationales et administratives sur le continent.'
    },
    {
      title: 'Souveraineté & Impact Durable',
      description: 'La création de valeur tangible en Afrique et le retour d’expérience systématique vers les écosystèmes locaux.'
    }
  ],
  contacts: {
    siege: 'Boulevard de la Marina, Cotonou — Hub Opérationnel Afrique de l’Ouest',
    antennes: [
      'Kigali (Hub Afrique Centrale & Orientale)',
      'Nairobi (Pôle Partenariats Stratégiques & Technologies)',
      'Dakar (Pôle Recherche & Enseignement Supérieur)',
      'Abidjan (Coordination Secteur Privé & Industrie)'
    ],
    email: 'contact@talents-sans-frontieres.org',
    relationsPartenaires: 'partenariats@talents-sans-frontieres.org',
    secretariat: '+229 21 00 00 00 / +250 780 000 000',
    statutLegal: 'Organisation Internationale Non Gouvernementale (OING) à vocation publique, régie par accord de siège intergouvernemental.'
  }
};

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    id: 'detecter',
    order: 1,
    label: 'DÉTECTER',
    tagline: 'Scouting territorial et identification des potentiels bruts',
    description: 'Un protocole de détection scientifique qui ne se contente pas des réseaux d’initiés. TSF déploie des campagnes de repérage dans les universités régionales, les lycées d’excellence et les communautés technologiques décentralisées.',
    operationalMechanisms: [
      'Tests psychométriques et cognitifs standardisés',
      'Hackathons territoriaux et défis d’ingénierie appliquée',
      'Veille académique et recommandations par un réseau de professeurs référents',
      'Auditions à l’aveugle pour éliminer tout biais d’origine ou de genre'
    ],
    deliverables: [
      'Index de Potentiel Individuel (IPI)',
      'Cartographie prospective des viviers de compétences',
      'Rapport d’évaluation multidimensionnelle'
    ],
    kpis: [
      '24 000+ profils analysés par an',
      '18 pays africains couverts',
      'Parité stricte 50/50 dans les cohortes de scouting'
    ]
  },
  {
    id: 'incuber',
    order: 2,
    label: 'INCUBER',
    tagline: 'Formation intensive, rigueur méthodologique et mentorat d’élite',
    description: 'Une immersion exigeante au sein d’académies de leadership et de bootcamps technologiques. Les talents sélectionnés sont confrontés à des cas complexes réels, sous la direction de mentors issus des plus grandes institutions mondiales.',
    operationalMechanisms: [
      'Cursus immersifs de 6 à 18 mois en formats hybrides (présentiel & digital)',
      'Mentorat individuel 1:1 avec des directeurs généraux et scientifiques reconnus',
      'Modules avancés en éthique de responsabilité et gouvernance stratégique',
      'Laboratoires d’expérimentation et simulation de crise'
    ],
    deliverables: [
      'Portfolio d’exécutions stratégiques',
      'Plan individuel de développement de carrière (PIDC)',
      'Projet d’impact d’intérêt continental'
    ],
    kpis: [
      '94% de taux de rétention sur le cursus',
      '180 heures de mentorat individuel par profil',
      '100% de travaux basés sur des cas industriels réels'
    ]
  },
  {
    id: 'certifier',
    order: 3,
    label: 'CERTIFIER',
    tagline: 'Garantie institutionnelle et validation par jury indépendant',
    description: 'La certification TSF constitue un label de confiance internationale. Elle atteste du niveau technique, de la solidité éthique et de la capacité de leadership des lauréats auprès des employeurs, investisseurs et institutions.',
    operationalMechanisms: [
      'Grand Oral devant un jury paritaire d’experts internationaux',
      'Évaluation des soft skills, de l’intelligence situationnelle et de la résilience',
      'Vérification rigoureuse des antécédents et accréditation blockchain des titres',
      'Audit régulier du référentiel par des cabinets indépendants'
    ],
    deliverables: [
      'Passeport de Compétences Certifiées TSF',
      'Certificat numérique infalsifiable cryptographiquement vérifiable',
      'Fiche d’aptitude aux postes de direction'
    ],
    kpis: [
      'Référentiel aligné sur les normes ISO / UNESCO',
      'Taux de sélectivité finale de 12% des candidats admis',
      'Reconnaissance par plus de 120 multinationales et gouvernements'
    ]
  },
  {
    id: 'propulser',
    order: 4,
    label: 'PROPULSER',
    tagline: 'Insertion stratégique, financements et trajectoires continentales',
    description: 'TSF n’abandonne pas ses certifiés sur le marché : l’organisation orchestre leur placement au sein de postes clés, finance leurs initiatives entrepreneuriales via SourceFund Africa et maintient un réseau d’alumni soudé.',
    operationalMechanisms: [
      'Fast-track recrutement auprès des multinationales et institutions multilatérales',
      'Allocation de bourses d’excellence et d’amorçage en capital d’amorçage',
      'Accès prioritaire aux marchés publics et appels d’offres stratégiques',
      'Réseau Alumni TSF opérant comme une confrérie d’entraide intellectuelle'
    ],
    deliverables: [
      'Contrats de placement de haute gouvernance',
      'Dotations financières d’amorçage',
      'Affiliation viagère au Collège des Lauréats TSF'
    ],
    kpis: [
      '98% d’insertion professionnelle sous 90 jours post-certification',
      '3.8x augmentation moyenne du revenu d’impact',
      '85% des certifiés basés ou réinvestissant directement en Afrique'
    ]
  }
];

export const PROGRAMS_CATALOG: Program[] = PROGRAMS_EXTENDED_DATA;

export const GOVERNANCE_BODIES: GovernanceBody[] = [
  {
    id: 'assemblee-generale',
    title: 'Assemblée Générale (AG)',
    role: 'Organe Suprême de Souveraineté & de Contrôle Institutionnel',
    mandate: 'Composée des membres fondateurs, des personnalités qualifiées et des représentants des collèges académiques et territoriaux, l’Assemblée Générale approuve les orientations stratégiques, les rapports moraux et financiers, et statue sur l’évolution statutaire de l’organisation.',
    composition: [
      'Collège des Membres Fondateurs et Émérites',
      'Collège des Personnalités Scientifiques et Académiques',
      'Collège des Représentants Territoriaux des Hubs Régionaux',
      'Représentants évaluateurs du Collège des Lauréats Alumni TSF'
    ],
    attributes: [
      'Approbation annuelle des comptes audités et quitus financier',
      'Élection et renouvellement des membres du Bureau Exécutif et du COS',
      'Validation des modifications statutaires et des traités d’alliance multilatéraux'
    ],
    periodicity: 'Session ordinaire annuelle & sessions extraordinaires sur convocation du Président'
  },
  {
    id: 'cos',
    title: 'Conseil d’Orientation Stratégique (COS)',
    role: 'Instance Haute de Prospective & d’Alignement Panafricain',
    mandate: 'Définit les orientations décennales, veille à l’indépendance de TSF, valide les audits éthiques et approuve les conventions d’alliance avec les gouvernements et bailleurs multilatéraux.',
    composition: [
      'Anciens dirigeants d’institutions financières multilatérales africaines',
      'Présidents et recteurs d’académies scientifiques continentales',
      'Industriels de référence engagés dans la transformation technologique',
      'Figures majeures de la société civile et de l’éthique publique'
    ],
    attributes: [
      'Avis contraignant sur les partenariats stratégiques majeurs',
      'Garantie d’indépendance vis-à-vis des ingérences politiques',
      'Veille prospective sur les mutations économiques et technologiques mondiales'
    ],
    periodicity: 'Deux sessions plénières par an et consultations permanentes'
  },
  {
    id: 'bureau-executif',
    title: 'Bureau Exécutif / Directoire Opérationnel',
    role: 'Organe de Direction Opérationnelle et de Déploiement',
    mandate: 'Responsable de la mise en œuvre quotidienne des programmes, de la gestion administrative et budgétaire, de l’animation des hubs territoriaux et de la relation avec les partenaires.',
    composition: [
      'Directeur Général Exécutif (Chief Executive Officer)',
      'Secrétaire Général aux Opérations & à la Gouvernance Statutaire',
      'Directrice des Programmes Pédagogiques, de l’Incubation & du Mentorat',
      'Directeur de la Détection Scientifique & de la Certification',
      'Directeur Financier, de la Conformité & de SourceFund Africa'
    ],
    attributes: [
      'Pilotage de l’exécution opérationnelle de l’ensemble des filières',
      'Ordonnancement des dépenses dans le respect strict des budgets votés',
      'Représentation institutionnelle de TSF auprès des tiers et des États'
    ],
    periodicity: 'Comité de direction hebdomadaire et revue mensuelle de performance'
  },
  {
    id: 'comite-scientifique',
    title: 'Comité Scientifique & Pédagogique',
    role: 'Garant de la Rigueur Académique et de la Certification',
    mandate: 'Conçoit et actualise les référentiels de compétences, homologue les jurys de certification, supervise les protocoles de tests de détection et publie les baromètres d’évaluation.',
    composition: [
      'Professeurs titulaires de chaires universitaires panafricaines',
      'Chercheurs en neurosciences cognitives et sciences de l’éducation',
      'Directeurs techniques (CTO) et directeurs de recherche de groupes industriels',
      'Experts internationaux en psychométrie et audits de conformité ISO'
    ],
    attributes: [
      'Homologation des grilles d’admission et barèmes d’évaluation',
      'Garantie d’étanchéité absolue entre financements et délivrance des certifications',
      'Supervision des jurys d’attribution des diplômes et titres'
    ],
    periodicity: 'Sessions trimestrielles et comités de validation pré-cohortes'
  },
  {
    id: 'comite-ethique',
    title: 'Comité d’Éthique, de Déontologie & d’Intégrité',
    role: 'Garant de la Déontologie, de la Neutralité & Anti-Biais',
    mandate: 'Veille au respect strict de la Charte Déontologique TSF, instruit tout signalement de conflit d’intérêts ou de discrimination, et garantit l’anonymisation rigoureuse des épreuves de sélection.',
    composition: [
      'Magistrats et juristes de droit international public',
      'Éthiciens et spécialistes de la gouvernance des données',
      'Médiateurs indépendants sans lien financier avec l’organisation'
    ],
    attributes: [
      'Droit de veto moral suspensif sur tout dossier ou financement suspect',
      'Audition à l’aveugle et audits réguliers des algorithmes de sélection',
      'Protection des lanceurs d’alerte internes et externes'
    ],
    periodicity: 'Saisine permanente et rapport annuel d’intégrité'
  },
  {
    id: 'comite-audit',
    title: 'Comité d’Audit, des Risques & de Conformité',
    role: 'Supervision Financière et Transparence Indépendante',
    mandate: 'Contrôle la conformité légale, fiscale et contractuelle des opérations, supervise les missions d’audit externe diligentées par des cabinets internationaux indépendants et audite les flux de SourceFund Africa.',
    composition: [
      'Experts-comptables diplômés et commissaires aux comptes indépendants',
      'Auditeurs spécialistes de la conformité bancaire et réglementaire (GAFI/FATF)',
      'Inspecteurs des finances publiques émérites'
    ],
    attributes: [
      'Publication intégrale des rapports financiers certifiés sans réserve',
      'Contrôle inopiné de l’affectation des fonds aux bénéficiaires finaux',
      'Rapport direct et confidentiel à l’Assemblée Générale'
    ],
    periodicity: 'Revue trimestrielle et clôture annuelle des comptes'
  },
  {
    id: 'delegues-territoriaux',
    title: 'Réseau des Délégués Territoriaux & Ambassadeurs',
    role: 'Ancrage Territorial et Déploiement au Plus Près du Terrain',
    mandate: 'Assurent la liaison avec les universités régionales, les administrations locales et les associations de jeunesse pour garantir que le scouting TSF irrigue chaque recoin du continent.',
    composition: [
      'Délégués pays permanents dans 18 capitales africaines',
      'Réseau de 140 ambassadeurs de campus universitaires',
      'Correspondants de la diaspora (Europe, Amérique du Nord, Asie)'
    ],
    attributes: [
      'Déploiement des campagnes locales d’information et d’épreuves',
      'Accompagnement de proximité des lauréats et des familles',
      'Remontée des besoins de compétences des tissus économiques régionaux'
    ],
    periodicity: 'Coordination bimensuelle et conférence annuelle des délégués'
  }
];

export const GOVERNANCE_PRINCIPLES: GovernancePrinciple[] = [
  {
    id: 'transparence',
    title: 'Transparence Institutionnelle & Traçabilité Intégrale',
    subtitle: 'Rien n’est caché, chaque euro et chaque sélection sont documentés publiquement.',
    description: 'TSF applique une politique d’ouverture radicale. Les états financiers sont audités par des commissaires aux comptes indépendants de rang international et rendus publics. Les grilles de notation et critères de détection sont consultables par l’ensemble des candidats et partenaires.',
    mechanisms: [
      'Publication annuelle en libre accès des comptes certifiés sans réserve',
      'Traçabilité cryptographique des certificats et des flux de bourses',
      'Accès ouvert aux barèmes de notation et aux annales des épreuves',
      'Audits financiers et pédagogiques tiers consultables en ligne'
    ]
  },
  {
    id: 'redevabilite',
    title: 'Redevabilité Envers les Talents et la Collectivité',
    subtitle: 'Une obligation statutaire de résultat pour chaque ressource engagée.',
    description: 'TSF rend compte non seulement aux bailleurs et mécènes, mais avant tout à la jeunesse africaine et aux nations partenaires. Chaque programme fait l’objet d’une mesure d’impact sociétal (SROI) et d’un suivi pluriannuel des trajectoires professionnelles de chaque lauréat.',
    mechanisms: [
      'Indicateurs d’insertion, d’impact et de rétention suivis sur 10 ans',
      'Audition annuelle du Bureau Exécutif par l’Assemblée Générale',
      'Bilan sociétal public mesurant la valeur économique créée sur le sol africain',
      'Enquêtes anonymisées de satisfaction administrées auprès des bénéficiaires'
    ]
  },
  {
    id: 'independance',
    title: 'Indépendance Politique, Confessionnelle & Économique',
    subtitle: 'Aucun bailleur, État ou entreprise ne peut influencer le choix des lauréats.',
    description: 'Les statuts de TSF imposent une séparation hermétique entre la collecte de fonds et la décision d’admission ou de certification. Aucun apport financier, qu’il provienne d’un gouvernement ou d’une multinationale, ne confère de droit de regard sur les jurys de sélection souverains.',
    mechanisms: [
      'Sanctuarisation statutaire de la souveraineté des jurys académiques',
      'Comité d’Éthique doté d’un pouvoir de veto contraignant',
      'Plafond de concentration des contributions pour éviter toute dépendance unique',
      'Neutralité stricte vis-à-vis des affiliations politiques ou idéologiques'
    ]
  },
  {
    id: 'collegialite',
    title: 'Collégialité Délibérative & Rigueur Paritaire',
    subtitle: 'Les décisions d’élévation reposent sur un consensus d’experts certifiés.',
    description: 'Aucune décision de certification ou d’octroi de bourse ne repose sur un individu isolé. Chaque promotion est validée par un jury collégial paritaire respectant une stricte mixité géographique et sectorielle pour éliminer les biais cognitifs.',
    mechanisms: [
      'Double évaluation à l’aveugle pour toutes les épreuves écrites et cognitives',
      'Jurys de Grands Orawx composés à 50% d’académiques et 50% de praticiens',
      'Parité stricte femmes-hommes dans l’ensemble des comités délibératifs',
      'Procès-verbaux signés et archivés pour chaque décision d’homologation'
    ]
  }
];

export const TSF_HISTORY_TIMELINE: HistoryMilestone[] = [
  {
    year: '2015',
    period: '2015 — 2016',
    phase: 'GENÈSE & DIAGNOSTIC CONTINENTAL',
    title: 'Constat fondateur : le paradoxe du talent africain',
    tagline: 'L’Afrique regorge de potentiels cognitifs exceptionnels mais manque d’infrastructures souveraines pour les certifier et les propulser.',
    description: 'Réunis à l’initiative d’universitaires, de chercheurs et d’acteurs économiques panafricains, un premier collectif informel lance un diagnostic approfondi dans sept pays d’Afrique de l’Ouest et Centrale. Le constat est unanime : la fuite des cerveaux n’est pas une fatalité culturelle, mais le symptôme de l’absence d’un écosystème d’accréditation et de financement digne de confiance.',
    keyFacts: [
      'Publication du rapport d’étape « Paradoxe du Génie Africain et Désert Institutionnel »',
      'Premières consultations auprès de 1 200 étudiants et 40 dirigeants d’entreprises régionales',
      'Définition des quatre principes cardinaux de la future méthode TSF'
    ],
    status: 'valide',
    archiveRef: 'ARCH-TSF-2015-DOC01'
  },
  {
    year: '2017',
    period: '2017 — 2022',
    phase: 'FONDATION STATUTAIRE & EXPÉRIMENTATIONS PILOTES',
    title: 'Enregistrement officiel et validation des protocoles',
    tagline: 'Formalisation juridique de l’OING, adoption des statuts et premier cycle pilote « Horizon ».',
    description: 'En 2017, Talents Sans Frontières est formellement enregistrée avec adoption de sa Charte Fondatrice et mise en place de ses premiers organes de gouvernance. Les premiers protocoles de détection psychométrique sont testés sur une promotion pilote de 45 lauréats, démontrant l’efficacité d’une chaîne continue alliant rigueur scientifique et mentorat d’élite.',
    keyFacts: [
      'Adoption solennelle des statuts et constitution du Conseil d’Orientation Stratégique',
      'Promotion pilote « Renaissance » : 100% d’insertion et premiers brevets déposés',
      'Signature de la première convention de siège intergouvernementale'
    ],
    status: 'valide',
    archiveRef: 'STATUTS-TSF-2017-V1'
  },
  {
    year: '2026',
    period: '2023 — 2026',
    phase: 'DÉPLOIEMENT PANAFRICAIN & INFRASTRUCTURE INTÉGRÉE',
    title: 'Le saut d’échelle institutionnel',
    tagline: '18 pays couverts, réseau de hubs régionaux, certification internationale et déploiement de SourceFund Africa.',
    description: 'À l’horizon 2026, TSF s’affirme comme l’infrastructure digitale et humaine de référence sur le continent. Grâce à un réseau de hubs opérationnels à Cotonou, Kigali, Nairobi, Dakar et Abidjan, l’organisation dépasse les 24 000 profils analysés et fédère plus de 120 institutions, banques et entreprises mécènes.',
    keyFacts: [
      '1 420 lauréats certifiés en haute compétence et opérationnels sur des projets critiques',
      'Capitalisation de 8.4 M$ mobilisés pour financer bourses et startups souveraines',
      'Lancement de la plateforme institutionnelle unifiée et du passeport de compétences'
    ],
    status: 'valide',
    archiveRef: 'REP-ANNUEL-TSF-2026'
  },
  {
    year: 'FUTUR',
    period: 'Horizon 2030 — 2035',
    phase: 'PROJECTION STRATÉGIQUE & SOUVERAINETÉ PÉRENNE',
    title: 'Cap 2035 : 100 000 Bâtisseurs pour la Souveraineté de l’Afrique',
    tagline: 'Ancrer une masse critique de leaders scientifiques, industriels et civiques dans les 54 États du continent.',
    description: 'La trajectoire prospective de TSF vise l’autonomie stratégique complète du continent. En maillant les 54 pays africains d’ambassades des compétences et en interconnectant les filières industrielles et universitaires, TSF ambitionne de faire du capital intellectuel africain la première force de transformation économique mondiale.',
    keyFacts: [
      'Objectif : 100 000 talents certifiés d’élite irriguant les postes stratégiques du continent',
      'Dotation pérenne de 50 M$ pour le fonds souverain d’amorçage SourceFund Africa',
      'Accréditation mutuelle systématique avec l’Union Africaine et les académies mondiales'
    ],
    status: 'prospectif',
    archiveRef: 'PROSPECTIVE-TSF-VISION2035'
  }
];

export const PARTNER_CATEGORIES: PartnerCategory[] = [
  {
    id: 'entreprises',
    slug: 'entreprises',
    title: 'Entreprises & Groupes Industriels',
    path: '/partenaires/entreprises',
    description: 'Accédez à un vivier exclusif de cadres, ingénieurs et managers africains hautement qualifiés, certifiés et opérationnels pour conduire vos ambitions industrielles.',
    engagementModels: [
      'Recrutement prioritaire « Fast-Track » des lauréats Horizon Excellence',
      'Commandites de cas d’études réels et de hackathons industriels',
      'Mécénat de compétences avec détachement de mentors exécutifs',
      'Création de chaires d’apprentissage sectorielles'
    ],
    criteria: [
      'Adhésion stricte aux principes de gouvernance responsable et d’équité salariale',
      'Implantation réelle créatrice d’emplois qualifiés sur le continent africain',
      'Engagement à offrir des perspectives d’évolution managériale rapide'
    ],
    callToAction: 'Rejoindre le Cercle des Entreprises Partenaires TSF'
  },
  {
    id: 'bailleurs',
    slug: 'bailleurs',
    title: 'Bailleurs de Fonds & Institutions Financières',
    path: '/partenaires/bailleurs',
    description: 'Investissez dans l’infrastructure humaine la plus rentable du XXIe siècle avec une traçabilité rigoureuse, un audit certifié et un impact démultiplié.',
    engagementModels: [
      'Dotation de bourses d’excellence ciblées (femmes scientifiques, zones prioritaires)',
      'Co-financement des programmes d’incubation et des hubs territoriaux',
      'Investissement en capital patient dans le guichet SourceFund Africa',
      'Études d’impact et bilans de retour social sur investissement (SROI)'
    ],
    criteria: [
      'Respect de l’indépendance éditoriale et de sélection de TSF',
      'Accords pluriannuels privilégiant le temps long de la maturation des talents',
      'Transparence financière conforme aux standards GAFI / OCDE'
    ],
    callToAction: 'Proposer un accord-cadre de cofinancement'
  },
  {
    id: 'osc',
    slug: 'osc',
    title: 'Organisations de la Société Civile (OSC)',
    path: '/partenaires/osc',
    description: 'Bâtissons des passerelles pour déceler les leaders de terrain, valoriser les innovations citoyennes et porter les voix de la résilience communautaire.',
    engagementModels: [
      'Relais de détection pour repérer les intelligences brutes isolées',
      'Modules conjoints sur l’engagement civique et les droits fondamentaux',
      'Mise à disposition de ressources et méthodologies pédagogiques TSF'
    ],
    criteria: [
      'Ancrage communautaire avéré et légitimité de terrain',
      'Absence d’affiliation partisane ou confessionnelle exclusive',
      'Dévouement éprouvé à la cause de la jeunesse et de l’équité'
    ],
    callToAction: 'Conclure un protocole de coopération de terrain'
  },
  {
    id: 'institutions',
    slug: 'institutions',
    title: 'Institutions Publiques & États',
    path: '/partenaires/institutions',
    description: 'Coopérez pour retenir les cerveaux, concevoir des politiques publiques de valorisation du capital humain et doter les administrations d’élites intègres.',
    engagementModels: [
      'Appui à la réforme des cursus universitaires d’excellence',
      'Vivier pour les cabinets ministériels et grandes agences nationales de développement',
      'Accueil d’ambassades des talents et accords de siège bilatéraux'
    ],
    criteria: [
      'Volonté manifeste de fonder les nominations de cadres sur le mérite objectif',
      'Soutien aux mobilités scientifiques sans entraves bureaucratiques',
      'Partage d’objectifs stratégiques pour l’Agenda 2063 de l’Union Africaine'
    ],
    callToAction: 'Initier un dialogue institutionnel de haut niveau'
  }
];

export const KEY_IMPACT_METRICS: ImpactMetric[] = [
  {
    id: 'm1',
    value: '24 800+',
    label: 'Candidatures & profils analysés',
    context: 'Scouting rigoureux dans 18 pays africains',
    period: '2023 - 2026'
  },
  {
    id: 'm2',
    value: '1 420',
    label: 'Lauréats certifiés en haute compétence',
    context: 'Diplômés des cursus Horizon et Graines de Champions',
    period: 'Promotion cumulée'
  },
  {
    id: 'm3',
    value: '98.2%',
    label: 'Taux de rétention et placement stratégique',
    context: 'Postes d’impact en Afrique et direction de projets critiques',
    period: 'À 90 jours post-certification'
  },
  {
    id: 'm4',
    value: '8.4 M$',
    label: 'Fonds mobilisés et alloués via SourceFund Africa',
    context: 'Bourses d’honneur, amorçage de startups et dotations de recherche',
    period: 'Impact direct'
  },
  {
    id: 'm5',
    value: '18',
    label: 'Hubs opérationnels et antennes de liaison',
    context: 'Présence coordonnée en Afrique de l’Ouest, Centrale, Orientale et Australe',
    period: 'Réseau actif'
  },
  {
    id: 'm6',
    value: '124',
    label: 'Partenaires industriels et institutionnels signataires',
    context: 'Multinationales, universités d’État, agences de développement',
    period: 'Alliances actives'
  }
];

export const OPPORTUNITIES_LIST: OpportunityItem[] = [
  {
    id: 'opp-1',
    title: 'Appel à Candidatures — Cohorte Horizon Excellence 2026-2027',
    category: 'fellowship',
    location: 'Panafricain (Immersion Kigali & Cotonou + Hybride)',
    deadline: '15 Novembre 2026',
    description: 'Recrutement des 60 futurs boursiers du programme de leadership stratégique. Bourse complète incluant séminaires, mentorat exécutif et projet d’État.',
    eligibility: 'Titulaires d’un Master 2 ou doctorat, âge max 32 ans, ressortissants d’un État africain.',
    spots: 60,
    status: 'ouvert'
  },
  {
    id: 'opp-2',
    title: 'Guichet d’Amorçage SourceFund Africa — Technologies Souveraines',
    category: 'bourse',
    location: 'Afrique continentale',
    deadline: '30 Décembre 2026',
    description: 'Financement en quasi-fonds propres de projets entrepreneuriaux conduits par des lauréats TSF dans la greentech, la santé décentralisée et la fintech.',
    eligibility: 'Équipe comprenant au minimum un lauréat certifié TSF avec prototype fonctionnel.',
    spots: 12,
    status: 'ouvert'
  },
  {
    id: 'opp-3',
    title: 'Olympiades Panafricaines Graines de Champions 2026',
    category: 'appel-projets',
    location: 'Épreuves dans 18 capitales régionales',
    deadline: '10 Janvier 2027',
    description: 'Compétition ouverte aux lycéens de classes terminales pour l’attribution de bourses d’internat d’excellence et immersion préparatoire.',
    eligibility: 'Élèves de 1ère et Terminale C, D, E, F ou équivalents internationaux.',
    spots: 120,
    status: 'ouvert'
  },
  {
    id: 'opp-4',
    title: 'Programme de Détachement Stratégique — Missions d’Impact Public',
    category: 'mission',
    location: 'Dakar, Abidjan, Nairobi, Kigali',
    deadline: '28 Février 2027',
    description: 'Missions de 6 mois au sein d’agences de transformation numérique gouvernementales sous supervision conjointe TSF.',
    eligibility: 'Alumni certifiés TSF disposant de 3 ans d’expérience opérationnelle.',
    spots: 25,
    status: 'bientot'
  }
];

export const OFFICIAL_PUBLICATIONS: InstitutionalResource[] = [
  {
    id: 'pub-1',
    title: 'Rapport Annuel sur l’État des Talents et la Souveraineté Intellectuelle en Afrique',
    type: 'Rapport Annuel',
    date: 'Septembre 2026',
    fileSize: '14.2 Mo',
    description: 'Audit approfondi des dynamiques de mobilité des cerveaux, cartographie des pôles d’excellence émergents et recommandations pour les politiques publiques.'
  },
  {
    id: 'pub-2',
    title: 'Référentiel Méthodologique Officiel TSF : De la Détection à la Propulsion',
    type: 'Référentiel',
    date: 'Juillet 2026',
    fileSize: '4.8 Mo',
    description: 'Le protocole scientifique complet détaillant les grilles d’évaluation psychométriques, les critères de sélectivité et les protocoles de certification.'
  },
  {
    id: 'pub-3',
    title: 'Livre Blanc : Financer l’Excellence Humaine sans Dépendance Exogène',
    type: 'Livre Blanc',
    date: 'Mai 2026',
    fileSize: '3.1 Mo',
    description: 'Modèles financiers innovants, fonds de dotation souverains et mécanismes d’amorçage par la diaspora et le capital privé continental.'
  },
  {
    id: 'pub-4',
    title: 'Charte Éthique et Déontologique des Lauréats et Partenaires TSF',
    type: 'Charte',
    date: 'Janvier 2026',
    fileSize: '1.2 Mo',
    description: 'Engagements moraux réciproques, règles anti-corruption, exemplarité citoyenne et serment de retour de compétences au profit de l’Afrique.'
  }
];

export const SAMPLE_TALENTS = [
  {
    id: 't-1',
    name: 'Dr. Aminata Traoré',
    country: 'Sénégal',
    program: 'Horizon Excellence',
    cohort: 'Promotion 2025',
    specialty: 'Intelligence Artificielle & Modélisation Épidémiologique',
    currentRole: 'Directrice de Recherche à l’Institut Pasteur & Conseillère Technique TSF',
    certificationGrade: 'Grade A — Félicitations du COS',
    impactProject: 'Déploiement d’un système d’alerte précoce épidémique autonome pour 7 pays sahéliens.'
  },
  {
    id: 't-2',
    name: 'Ing. Kwame Mensah',
    country: 'Ghana',
    program: 'SourceFund Africa',
    cohort: 'Promotion 2024',
    specialty: 'Réseaux Électriques Intelligents & Micro-Grids Solaires',
    currentRole: 'Fondateur & CTO de VoltaicGrid Labs (Accra)',
    certificationGrade: 'Grade A — Innovation Industrielle',
    impactProject: 'Électrification décentralisée de 140 zones rurales ghanéennes par stockage hybride.'
  },
  {
    id: 't-3',
    name: 'Sarah Benali',
    country: 'Maroc / Rwanda',
    program: 'Horizon Excellence',
    cohort: 'Promotion 2026',
    specialty: 'Haute Finance Stratégique & Titrisation des Dettes Souveraines',
    currentRole: 'Analyste Principale à la Banque Africaine de Développement',
    certificationGrade: 'Grade A — Haute Gouvernance',
    impactProject: 'Structuration du premier fonds obligataire vert panafricain garanti par les actifs forestiers du Bassin du Congo.'
  },
  {
    id: 't-4',
    name: 'Marc-Aurèle Dossou',
    country: 'Bénin',
    program: 'Graines de Champions',
    cohort: 'Promotion 2023',
    specialty: 'Algorithmique Avancée & Cryptographie Quantique',
    currentRole: 'Doctorant-chercheur associé au Hub Kigali TSF',
    certificationGrade: 'Major Promotion Panafricaine',
    impactProject: 'Conception d’un protocole de consensus à faible consommation énergétique adapté aux infrastructures africaines.'
  }
];

export const SAMPLE_STORIES = [
  {
    id: 's-1',
    quote: 'TSF ne vous demande pas d’où vous venez, mais jusqu’où vous êtes prêt à porter l’Afrique. Ce mentorat d’élite a radicalement transformé ma vision de la souveraineté technologique.',
    authorName: 'Dr. Aminata Traoré',
    authorTitle: 'Chercheuse en Biostatistique & IA',
    program: 'Horizon Excellence',
    cohort: '2025',
    country: 'Sénégal',
    outcomeMetric: 'Directrice de Labo à 31 ans'
  },
  {
    id: 's-2',
    quote: 'Sans la garantie institutionnelle et le capital patient de SourceFund Africa, notre usine de micro-grids n’aurait jamais franchi la vallée de la mort financière.',
    authorName: 'Ing. Kwame Mensah',
    authorTitle: 'Fondateur de VoltaicGrid Labs',
    program: 'SourceFund Africa',
    cohort: '2024',
    country: 'Ghana',
    outcomeMetric: '65 emplois qualifiés créés'
  },
  {
    id: 's-3',
    quote: 'La rigueur déontologique inculquée dans le cursus Croissance & Métanoïa est le bouclier indispensable face aux compromissions dans les hautes sphères de décision.',
    authorName: 'Sarah Benali',
    authorTitle: 'Cadre Supérieure en Finance de Développement',
    program: 'Horizon Excellence',
    cohort: '2026',
    country: 'Rwanda / Maroc',
    outcomeMetric: 'Conseillère BAD'
  }
];

export const CHART_DATA_SECTORS = [
  { label: 'Sciences & Ingénierie (STEM)', value: 38, sublabel: '540 lauréats', highlight: true },
  { label: 'IA, Logiciel & Data Souveraine', value: 28, sublabel: '398 lauréats' },
  { label: 'Haute Finance & Macro-économie', value: 16, sublabel: '227 lauréats' },
  { label: 'Transition Énergétique & Climat', value: 10, sublabel: '142 lauréats' },
  { label: 'Santé Publique & Biotechnologies', value: 8, sublabel: '113 lauréats' }
];

export const CHART_DATA_REGIONS = [
  { label: 'Afrique de l’Ouest (Hub Cotonou)', value: 42, sublabel: '7 pays' },
  { label: 'Afrique de l’Est (Hub Kigali)', value: 31, sublabel: '5 pays', highlight: true },
  { label: 'Afrique Centrale (Hub Yaoundé)', value: 18, sublabel: '4 pays' },
  { label: 'Afrique Australe & Diaspora', value: 9, sublabel: '2 pays + Diaspora' }
];

export const SAMPLE_PARTNERS = [
  {
    id: 'p-1',
    name: 'Sovereign Infrastructure Alliance',
    category: 'entreprises' as const,
    tier: 'Partenaire Industriel Majeur',
    scope: 'Panafricain (12 pays)',
    commitment: 'Recrutement prioritaire de 40 ingénieurs TSF par an et co-financement des ateliers industriels de pointe.',
    activeProjectsCount: 3
  },
  {
    id: 'p-2',
    name: 'Fondation Panafricaine pour l’Excellence',
    category: 'bailleurs' as const,
    tier: 'Bailleur d’Impact Statutaire',
    scope: 'Afrique de l’Ouest & Centrale',
    commitment: 'Dotation pluriannuelle de 3.5 M$ allouée intégralement aux bourses d’études d’élite et à SourceFund Africa.',
    activeProjectsCount: 5
  },
  {
    id: 'p-3',
    name: 'Réseau des Universités d’État d’Excellence (RUEX)',
    category: 'institutions' as const,
    tier: 'Alliance Universitaire & Scientifique',
    scope: '18 universités nationales',
    commitment: 'Harmonisation des tests de sélection précoce TSF et accès bilatéral aux laboratoires de recherche avancée.',
    activeProjectsCount: 4
  }
];

export const SAMPLE_MEDIA_ITEMS = [
  {
    id: 'm-1',
    title: '« L’Algorithme et le Champ de Coton » : Repenser l’IA Africaine',
    type: 'article' as const,
    excerpt: 'Analyse approfondie sur la nécessité de concevoir des modèles d’apprentissage ancrés dans les réalités linguistiques et agronomiques du continent.',
    date: '24 Septembre 2026',
    readTimeOrDuration: '7 min de lecture',
    authorOrSource: 'Revue TSF N° 08'
  },
  {
    id: 'm-2',
    title: 'Bâtisseurs de l’Ombre — Épisode 14 : Le Génie Électrique de VoltaicGrid',
    type: 'podcast' as const,
    excerpt: 'Entretien exclusif de 45 minutes avec Kwame Mensah sur les défis du capital d’amorçage industriel en Afrique subsaharienne.',
    date: '18 Septembre 2026',
    readTimeOrDuration: '42 min d’écoute',
    authorOrSource: 'TSF Radio Panafricaine'
  },
  {
    id: 'm-3',
    title: 'Communiqué Conjoint : Signature de l’Accord de Siège Régional de Kigali',
    type: 'communique' as const,
    excerpt: 'Le Gouvernement de la République du Rwanda et le Directoire de TSF formalisent l’octroi des immunités diplomatiques pour la recherche panafricaine.',
    date: '10 Septembre 2026',
    readTimeOrDuration: '3 min',
    authorOrSource: 'Secrétariat Général TSF'
  }
];

