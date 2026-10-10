import { NavItem } from '../types';

export const PRIMARY_NAVIGATION: NavItem[] = [
  {
    id: 'organisation',
    label: 'ORGANISATION',
    path: '/organisation',
    description: 'Identité, mission, vision, gouvernance et méthode fondatrice de TSF.',
    subItems: [
      {
        id: 'mission',
        label: 'Mission & Vision',
        path: '/organisation/mission',
        description: 'Notre mandat panafricain d’intérêt général et nos valeurs cardinales.'
      },
      {
        id: 'methode',
        label: 'Méthode Fondatrice',
        path: '/organisation/methode',
        description: 'La chaîne de valeur : Détecter, Incuber, Certifier, Propulser.'
      },
      {
        id: 'gouvernance',
        label: 'Gouvernance & COS',
        path: '/organisation/gouvernance',
        description: 'Conseil d’Orientation Stratégique, directoire exécutif et comités.'
      },
      {
        id: 'histoire',
        label: 'Histoire & Jalons',
        path: '/organisation/histoire',
        description: 'Trajectoire historique de 2015 à 2026 et vision prospective.'
      }
    ]
  },
  {
    id: 'programmes',
    label: 'PROGRAMMES',
    path: '/programmes',
    description: 'Nos programmes spécialisés couvrant l’ensemble du cycle d’élévation des talents.',
    subItems: [
      {
        id: 'horizon-excellence',
        label: 'Horizon Excellence',
        path: '/programmes/horizon-excellence',
        description: 'Programme élite d’immersion stratégique et leadership pour hauts potentiels.'
      },
      {
        id: 'tsf-detecte',
        label: 'TSF Détecte',
        path: '/programmes/tsf-detecte',
        description: 'Dispositif de scouting continu dans les universités et territoires.'
      },
      {
        id: 'graines-de-champions',
        label: 'Graines de Champions',
        path: '/programmes/graines-de-champions',
        description: 'Éveil précoce et bourses dès l’enseignement secondaire (STEM & humanités).'
      },
      {
        id: 'croissance-metanoia',
        label: 'Croissance & Métanoïa',
        path: '/programmes/croissance-metanoia',
        description: 'Formation à l’éthique managériale, posture d’impact et résilience.'
      },
      {
        id: 'sourcefund-africa',
        label: 'SourceFund Africa',
        path: '/programmes/sourcefund-africa',
        description: 'Guichet d’amorçage financier, bourses de propulsion et capital patient.'
      },
      {
        id: 'media',
        label: 'TSF Média',
        path: '/programmes/media',
        description: 'Revue prospective, baromètres et récits des bâtisseurs d’Afrique.'
      }
    ]
  },
  {
    id: 'talents',
    label: 'TALENTS',
    path: '/talents',
    description: 'Espace d’évaluation, candidatures, orientation et parcours de certification.',
    subItems: [
      {
        id: 'overview',
        label: 'Portail des Talents',
        path: '/talents',
        description: 'Guichet Je Suis un Talent, annuaire officiel et opportunités.'
      },
      {
        id: 'dashboard',
        label: 'Tableau de Bord Personnel',
        path: '/talents/dashboard',
        description: 'Gestion de vos candidatures, formations, certifications et messages.'
      },
      {
        id: 'profil',
        label: 'Profil & Passeport TSF',
        path: '/talents/profil',
        description: 'Structure complète en 14 points et carte d’accréditation TSF-ID.'
      },
      {
        id: 'inscription',
        label: 'Candidature & Inscription',
        path: '/talents/inscription',
        description: 'Formulaire officiel d’enregistrement dans le vivier d’évaluation TSF.'
      },
      {
        id: 'detection',
        label: 'Protocole de Détection',
        path: '/talents/detection',
        description: 'Critères psychométriques, tests cognitifs et sélectivité.'
      },
      {
        id: 'opportunites-talents',
        label: 'Opportunités dédiées',
        path: '/talents/opportunites',
        description: 'Bourses d’études d’élite, appels à projets et recrutements fast-track.'
      },
      {
        id: 'certification-talents',
        label: 'Passeport & Certification',
        path: '/talents/certification',
        description: 'Standard d’accréditation et vérification cryptographique des diplômes.'
      }
    ]
  },
  {
    id: 'partenaires',
    label: 'PARTENAIRES',
    path: '/partenaires',
    description: 'Modalités d’alliance pour les entreprises, bailleurs, OSC et institutions publiques.',
    subItems: [
      {
        id: 'overview',
        label: 'Portail Alliances',
        path: '/partenaires',
        description: 'Les trois parcours fondateurs : Entreprise, Bailleur/PTF et Société Civile.'
      },
      {
        id: 'dashboard',
        label: 'Tableau de Bord Partenaire',
        path: '/partenaires/dashboard',
        description: 'Espace de suivi bilatéral : programmes, conventions, indicateurs et rapports.'
      },
      {
        id: 'entreprises',
        label: 'Entreprises & Industrie',
        path: '/partenaires/entreprises',
        description: 'Sponsoriser, Recruter, Mentorer, Financer, Challenges et Programmes.'
      },
      {
        id: 'bailleurs',
        label: 'Bailleurs & PTF',
        path: '/partenaires/bailleurs',
        description: 'Portefeuille projets, Theory of Change, Rapports, Budget et Transparence.'
      },
      {
        id: 'osc',
        label: 'Société Civile & Diagnostic',
        path: '/partenaires/osc',
        description: 'TSF OSC Diagnostic : Maturité organisationnelle en 7 dimensions et appuis.'
      },
      {
        id: 'institutions',
        label: 'Institutions Publiques',
        path: '/partenaires/institutions',
        description: 'Partenariats d’État, accords de siège et appui aux politiques de formation.'
      }
    ]
  },
  {
    id: 'opportunites',
    label: 'OPPORTUNITÉS',
    path: '/opportunites',
    description: 'Place de marché panafricaine des postes de direction, bourses, concours et financements.'
  },
  {
    id: 'wikijob',
    label: 'WIKIJOB',
    path: '/wikijob',
    description: 'Base de connaissances professionnelle et système d’agrégation des opportunités au Bénin.',
    subItems: [
      {
        id: 'wikijob-wiki',
        label: 'Base de Connaissances & Guides',
        path: '/wikijob',
        description: 'Guides d’insertion, CV ATS, bourses d’études, recherche de stages et financements.'
      },
      {
        id: 'wikijob-intelligence',
        label: 'WikiJob Intelligence & Matching',
        path: '/wikijob/intelligence',
        description: 'Scoring indicatif de correspondance, recommandations pour vous, alertes et digests quotidiens.'
      },
      {
        id: 'wikijob-sources',
        label: 'Registre des Sources & Organismes',
        path: '/wikijob/sources',
        description: 'Surveillance des 8 dispositifs publics béninois (ANPE, PSIE, ADPME, PRODIJ, FNDA, FNM, FNPEEJ, Azoli).'
      }
    ]
  },
  {
    id: 'certification',
    label: 'CERTIFICATION',
    path: '/certification',
    description: 'Label d’Excellence TSF (Bronze, Argent, Or) et vérification d’authenticité en ligne.',
    subItems: [
      {
        id: 'excellence',
        label: 'Excellence TSF (Bronze, Argent, Or)',
        path: '/certification',
        description: 'Le standard panafricain décliné en trois paliers de reconnaissance.'
      },
      {
        id: 'verify',
        label: 'Vérifier une Certification (/verify)',
        path: '/certification/verify',
        description: 'Authentification immédiate d’un titre par code unique et QR Code scellé.'
      }
    ]
  },
  {
    id: 'impact',
    label: 'IMPACT',
    path: '/impact',
    description: 'Chiffres clés audités, indicateurs territoriaux et rapports d’impact social.'
  },
  {
    id: 'media-nav',
    label: 'MÉDIA',
    path: '/media',
    description: 'Publications scientifiques, communiqués officiels et baromètres.'
  }
];

export const FOOTER_SECTIONS = [
  {
    title: 'Organisation & Cadre',
    links: [
      { label: 'Identité & Mandat', path: '/organisation' },
      { label: 'Mission & Vision', path: '/organisation/mission' },
      { label: 'Méthode Fondatrice', path: '/organisation/methode' },
      { label: 'Conseil d’Orientation (COS)', path: '/organisation/gouvernance' },
      { label: 'Histoire & Jalons', path: '/organisation/histoire' },
      { label: 'Charte Déontologique', path: '/ressources' }
    ]
  },
  {
    title: 'Programmes d’Excellence',
    links: [
      { label: 'Horizon Excellence', path: '/programmes/horizon-excellence' },
      { label: 'TSF Détecte (Scouting)', path: '/programmes/tsf-detecte' },
      { label: 'Graines de Champions', path: '/programmes/graines-de-champions' },
      { label: 'Croissance & Métanoïa', path: '/programmes/croissance-metanoia' },
      { label: 'SourceFund Africa', path: '/programmes/sourcefund-africa' },
      { label: 'TSF Média & Édition', path: '/programmes/media' }
    ]
  },
  {
    title: 'Plateforme Talents',
    links: [
      { label: 'Soumettre sa Candidature', path: '/talents/inscription' },
      { label: 'Critères de Détection', path: '/talents/detection' },
      { label: 'Référentiel de Certification', path: '/certification' },
      { label: 'Bourses & Appels Actifs', path: '/opportunites' },
      { label: 'Sources WikiJob (Bénin)', path: '/wikijob/sources' },
      { label: 'Portail Espace TSF', path: '/espace-tsf' }
    ]
  },
  {
    title: 'Alliances & Réseau',
    links: [
      { label: 'Entreprises & Recruteurs', path: '/partenaires/entreprises' },
      { label: 'Bailleurs & Institutions', path: '/partenaires/bailleurs' },
      { label: 'Société Civile & Universités', path: '/partenaires/osc' },
      { label: 'Gouvernements & États', path: '/partenaires/institutions' },
      { label: 'Admin Sources WikiJob', path: '/admin/wikijob/sources' },
      { label: 'Jobs & Synchro 24h', path: '/admin/wikijob/jobs' },
      { label: 'Hubs & Coordonnées', path: '/contact' }
    ]
  }
];
