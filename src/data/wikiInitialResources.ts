import { WikiResource } from '../types/wiki';

export const INITIAL_WIKI_RESOURCES: WikiResource[] = [
  {
    id: 'wiki-50-sites-emploi-benin',
    slug: '50-sites-pour-trouver-un-emploi-au-benin',
    title: '50 sites pour trouver un emploi au Bénin',
    category: 'EMPLOI',
    content_type: 'DOSSIER',
    summary: 'Panorama complet des plateformes publiques, cabinets de recrutement, portails généralistes et canaux d’intermédiation professionnelle actifs au Bénin.',
    source: {
      name: 'Observatoire de l’Emploi TSF',
      url: 'https://tsf.africa/observatoire',
      is_tsf_original: true,
      author: 'Comité Éditorial & Orientation Professionnelle TSF'
    },
    published_at: '2026-09-20T08:00:00Z',
    updated_at: '2026-09-28T14:30:00Z',
    url: '/wikijob/wiki/50-sites-pour-trouver-un-emploi-au-benin',
    tags: ['Emploi Bénin', 'Recrutement', 'Portails Web', 'SICA ANPE', 'PSIE', 'GDIZ', 'Offres d’emploi'],
    status: 'PUBLISHED',
    featured: true,
    read_time_minutes: 8,
    views_count: 3420,
    curated_sites: [
      { name: 'SICA ANPE Bénin', url: 'https://anpe.bj', description: 'Portail officiel du service public d’emploi béninois.', badge: 'Service Public' },
      { name: 'PSIE Bénin', url: 'https://psie.bj', description: 'Programme Spécial d’Insertion dans l’Emploi (prise en charge 100% État).', badge: 'Public' },
      { name: 'GDIZ Recrutement', url: 'https://gdiz-benin.com/carrieres', description: 'Zone industrielle de Glo-Djigbé : industrie, logistique, textile.', badge: 'Zone Économique' },
      { name: 'RMO Bénin', url: 'https://rmo-jobcenter.com', description: 'Cabinet de recrutement et travail temporaire de référence à Cotonou.', badge: 'Cabinet Privé' },
      { name: 'AfricSearch Bénin', url: 'https://africsearch.com', description: 'Chasse de têtes et cadres dirigeants pour l’Afrique de l’Ouest.', badge: 'Cadres' },
      { name: 'Novojob Bénin', url: 'https://novojob.com/benin', description: 'Plateforme moderne d’offres d’emploi et candidatures en ligne.', badge: 'Portail' },
      { name: 'Talent Bénin', url: 'https://talent.bj', description: 'Plateforme d’intermédiation et profils tech/numériques.', badge: 'Digital' },
      { name: 'Emploi Bénin', url: 'https://emploibenin.com', description: 'Agrégateur d’annonces pour tous niveaux de qualification.', badge: 'Agrégateur' },
      { name: 'CotonouJobs', url: 'https://cotonoujobs.com', description: 'Offres locales pour le grand Cotonou, Calavi et Porto-Novo.', badge: 'Local' },
      { name: 'Fedis Recrutement', url: 'https://fedis-rh.com', description: 'Conseil en ressources humaines et sourcing spécialisé.', badge: 'Cabinet' }
    ],
    content: `Trouver un emploi au Bénin exige de combiner les canaux institutionnels étatiques, les cabinets privés de recrutement, les plateformes numériques et les réseaux professionnels. Ce dossier recense et classe les 50 canaux prioritaires pour optimiser votre veille.

### 1. Les Canaux Publics d’État (Incontournables)
1. **SICA ANPE (anpe.bj)** : L’Agence Nationale Pour l’Emploi gère les offres certifiées par les inspecteurs du travail.
2. **PSIE (psie.bj)** : Programme présidentiel plaçant les jeunes diplômés dans des entreprises privées avec salaire financé par l'État pendant 12 à 24 mois.
3. **Plateforme Guichet Unique GDIZ** : Recrutements massifs dans la confection textile, la transformation d'anacarde, et la maintenance industrielle.

### 2. Cabinets Spécialisés et Chasseurs de Têtes
Les grands groupes bancaires, télécoms et miniers passent quasi-exclusivement par des cabinets intermédiaires pour leurs postes à responsabilités :
- RMO Bénin (Zone commerciale Ganhi)
- AfricSearch Cotonou (Haie Vive)
- Talent & Talents Afrique

### 3. Stratégie de Veille Quotidienne Recommandée
Ne vous contentez pas de postuler aux offres publiées : 60% du marché béninois reste invisible. Activez les alertes par notification et ciblez des candidatures spontanées auprès des PME labellisées par l'ADPME.`
  },
  {
    id: 'wiki-comment-trouver-stage-benin',
    slug: 'comment-trouver-un-stage-au-benin',
    title: 'Comment trouver un stage au Bénin',
    category: 'STAGE',
    content_type: 'GUIDE',
    summary: 'Méthodologie pas-à-pas pour décrocher un stage académique ou professionnel à Cotonou, Parakou et Porto-Novo : cadre légal, conventions, calendrier et ciblage.',
    source: {
      name: 'Pôle Insertion & Mentorat TSF',
      is_tsf_original: true,
      author: 'Équipe Conseil Carrière TSF Bénin'
    },
    published_at: '2026-09-18T10:00:00Z',
    updated_at: '2026-09-27T09:00:00Z',
    url: '/wikijob/wiki/comment-trouver-stage-au-benin',
    tags: ['Stage', 'Premier Emploi', 'Convention', 'Étudiants', 'Azoli', 'Cotonou', 'Insertion'],
    status: 'PUBLISHED',
    featured: true,
    read_time_minutes: 6,
    views_count: 2890,
    checklist_items: [
      { id: 'stg-1', text: 'Obtenir une lettre de recommandation officielle de votre université (UAC, UP, etc.).' },
      { id: 'stg-2', text: 'Rédiger une convention de stage conforme au code du travail béninois.' },
      { id: 'stg-3', text: 'Identifier 15 entreprises cibles dans votre domaine d’études.' },
      { id: 'stg-4', text: 'Personnaliser votre lettre de motivation en mentionnant un projet précis de l’entreprise.' },
      { id: 'stg-5', text: 'S’inscrire sur le dispositif AZOLI pour les immersions professionnelles rémunérées.' }
    ],
    content: `Décrocher un stage pertinent au Bénin nécessite d'anticiper d'au moins 2 à 3 mois la période d'immersion et de respecter les règles académiques et légales locales.

### Distinction Cruciale : Stage Académique vs Stage Professionnel
- **Stage académique** : Obligatoire pour valider une Licence ou un Master (mémoire ou rapport de stage). Il n'est pas obligatoirement rémunéré, mais une indemnité de transport est usuelle.
- **Stage professionnel (pré-emploi)** : Destiné aux diplômés en recherche d'expérience pratique. Au Bénin, il est encadré pour éviter les abus de stages successifs non payés.

### Le Dispositif AZOLI : Une Voie Royale pour l'Immersion
Si vous avez entre 18 et 30 ans, le dispositif national AZOLI propose des immersions en entreprise avec allocation mensuelle garantie et tutorat personnalisé. Renseignez-vous dans l'antenne ANPE la plus proche de votre commune.

### Les 4 Périodes Clés au Bénin
- **Mai - Juin** : Période idéale pour déposer pour les stages de vacances (Juillet - Septembre).
- **Octobre - Novembre** : Dépôts pour les stages de fin d'études du premier semestre.`
  },
  {
    id: 'wiki-preparer-cv-ats',
    slug: 'comment-preparer-un-cv-ats',
    title: 'Comment préparer un CV ATS',
    category: 'CV',
    content_type: 'TUTORIEL',
    summary: 'Guide technique pour structurer un curriculum vitae compatible avec les Applicant Tracking Systems utilisés par les multinationales et bailleurs au Bénin.',
    source: {
      name: 'Académie des Compétences TSF',
      is_tsf_original: true,
      author: 'Consultants Recrutement International'
    },
    published_at: '2026-09-15T11:00:00Z',
    updated_at: '2026-09-29T08:00:00Z',
    url: '/wikijob/wiki/comment-preparer-un-cv-ats',
    tags: ['CV ATS', 'Recrutement Tech', 'Algorithmes RH', 'Mots-clés', 'Candidature', 'Format Word PDF'],
    status: 'PUBLISHED',
    featured: true,
    read_time_minutes: 7,
    views_count: 4120,
    checklist_items: [
      { id: 'cv-1', text: 'Adopter une mise en page simple à une seule colonne (zéro tableau complexe).' },
      { id: 'cv-2', text: 'Intégrer les mots-clés exacts de l’offre d’emploi dans le résumé et l’expérience.' },
      { id: 'cv-3', text: 'Utiliser des polices standards : Calibri, Arial, Helvetica ou Roboto.' },
      { id: 'cv-4', text: 'Nommer les sections clairement : « Expérience professionnelle », « Formation », « Compétences ».' },
      { id: 'cv-5', text: 'Bannir les graphiques et barres de progression de compétences illisibles par l’ATS.' },
      { id: 'cv-6', text: 'Exporter en format PDF avec texte sélectionnable (Ctrl+A / Cmd+A pour tester).' }
    ],
    content: `Les grandes institutions basées à Cotonou (banques, agences onusiennes, bailleurs internationaux, filiales de multinationales) utilisent des logiciels de tri automatique (ATS comme Taleo, Workday, BambooHR, Recruitee). Plus de 70% des CV sont rejetés avant même d'atteindre le regard d'un recruteur humain en raison d'erreurs de formatage.

### Les 5 Règles d’Or d’un CV Compatible ATS
1. **Structure Mono-colonne** : Les scanners parcourent le texte de gauche à droite et de haut en bas. Les modèles Canva avec deux colonnes asymétriques mélangent les dates et les intitulés de postes.
2. **Titres de sections standardisés** : N'inventez pas de formules poétiques comme *« Mon périple »*. Restez sur :
   - Expérience professionnelle
   - Formation & Diplômes
   - Compétences techniques
   - Langues & Certifications
3. **Densité de mots-clés sémantiques** : Si l'annonce mentionne *« Contrôle budgétaire »*, n'écrivez pas seulement *« Gestion de caisse »*. Reproduisez la terminologie exacte.
4. **Dates au format mois/année** : Ex: *03/2023 - 11/2024* ou *Mars 2023 - Novembre 2024*.
5. **Résultats chiffrés** : Remplacez *« Animation des ventes »* par *« Hausse de 22% du chiffre d'affaires sur 10 mois »*.`
  },
  {
    id: 'wiki-financements-ong',
    slug: 'ou-trouver-des-financements-pour-une-ong',
    title: 'Où trouver des financements pour une ONG ?',
    category: 'FINANCEMENT',
    content_type: 'GUIDE',
    summary: 'Cartographie des bailleurs de fonds, subventions publiques et fondations privées finançant la société civile et les associations au Bénin.',
    source: {
      name: 'Programme SourceFund Africa / TSF Alliances',
      is_tsf_original: true,
      author: 'Département Financements & Partenariats Internationaux'
    },
    published_at: '2026-09-12T09:00:00Z',
    updated_at: '2026-09-26T16:00:00Z',
    url: '/wikijob/wiki/ou-trouver-des-financements-pour-une-ong',
    tags: ['ONG', 'Subventions', 'Bailleurs de fonds', 'Société Civile', 'FNDA', 'Union Européenne', 'AFD', 'Bénin'],
    status: 'PUBLISHED',
    featured: false,
    read_time_minutes: 10,
    views_count: 1950,
    curated_sites: [
      { name: 'Délégation de l’Union Européenne au Bénin', url: 'https://www.eeas.europa.eu/delegations/benin_fr', description: 'Appels à propositions pour la société civile et les droits humains.', badge: 'Multilatéral' },
      { name: 'Agence Française de Développement (AFD Bénin)', url: 'https://www.afd.fr/fr/page-region-pays/benin', description: 'Financements d’initiatives des OSC et formation.', badge: 'Bilatéral' },
      { name: 'FNDA Bénin', url: 'https://fnda.bj', description: 'Guichets de subventions pour les coopératives et groupements agricoles.', badge: 'Public Bénin' },
      { name: 'Fondation Roi Baudouin (KBF Africa)', url: 'https://kbfafrica.org', description: 'Appui aux projets d’impact social, éducation et entrepreneuriat.', badge: 'Fondation' },
      { name: 'Fonds d’Appui aux Initiatives Locales (PISA)', url: 'https://bj.ambafrance.org', description: 'Micro-projets communautaires de l’Ambassade de France.', badge: 'Ambassade' }
    ],
    content: `Financer une Organisation Non Gouvernementale au Bénin requiert une diversification de ses ressources au-delà des cotisations des membres. Voici la cartographie des 4 familles de guichets accessibles.

### 1. Les Bailleurs Bilatéraux et Ambassades
La plupart des représentations diplomatiques à Cotonou disposent de fonds dédiés aux micro-projets locaux :
- **PISA / SCAC (France)** : Projets de 5 à 20 millions FCFA dans l'éducation et l'autonomie des femmes.
- **Ambassade des Pays-Bas** : Programmes d'appui à l'eau, l'assainissement et la nutrition.
- **Ambassade des États-Unis (Fonds de l'Ambassadeur)** : Petites subventions de développement communautaire.

### 2. Les Agences Multilatérales
- **Délégation de l'Union Européenne** : Appels d'offres annuels publiés sur le portail Funding & Tenders.
- **Agences du Système des Nations Unies (PNUD, UNICEF, UNFPA)** : Recours fréquent aux ONG locales comme partenaires d'exécution (Implementing Partners).

### 3. Les Conditions Préalables d'Éligibilité
Aucun bailleur sérieux ne verse de fonds sans :
- Publication au Journal Officiel de la République du Bénin (JORB)
- Existence d'un compte bancaire au nom strict de l'ONG (jamais au nom d'un individu)
- Rapports d'activités et états financiers certifiés des deux dernières années.`
  },
  {
    id: 'wiki-plateformes-bourses',
    slug: 'les-plateformes-de-bourses',
    title: 'Les plateformes de bourses',
    category: 'BOURSES',
    content_type: 'DOSSIER',
    summary: 'Répertoire vérifié des bourses d’excellence internationales et nationales accessibles aux étudiants et chercheurs béninois.',
    source: {
      name: 'Pôle Académique & Bourses TSF',
      is_tsf_original: true,
      author: 'Comité Bourses Internationales'
    },
    published_at: '2026-09-10T14:00:00Z',
    updated_at: '2026-09-28T11:00:00Z',
    url: '/wikijob/wiki/les-plateformes-de-bourses',
    tags: ['Bourses', 'Études à l’étranger', 'Excellence', 'Master', 'Doctorat', 'DBS Bénin', 'Campus France'],
    status: 'PUBLISHED',
    featured: true,
    read_time_minutes: 9,
    views_count: 5120,
    curated_sites: [
      { name: 'Direction des Bourses et Secours (DBS Bénin)', url: 'https://enseignementsup.gouv.bj', description: 'Attribution des bourses nationales et bourses de coopération.', badge: 'Officiel Bénin' },
      { name: 'Bourses France Excellence Eiffel', url: 'https://campusfrance.org/fr/le-programme-de-bourses-france-excellence-eiffel', description: 'Financement complet pour Master et Doctorat en France.', badge: 'France' },
      { name: 'Chevening Scholarships (Royaume-Uni)', url: 'https://chevening.org', description: 'Bourse prestigieuse couvrant 100% des frais de Master au UK.', badge: 'UK' },
      { name: 'DAAD Bénin (Allemagne)', url: 'https://daad.de', description: 'Programmes de master et bourses de recherche post-universitaire.', badge: 'Allemagne' },
      { name: 'MasterCard Foundation Scholars', url: 'https://mastercardfdn.org', description: 'Formation des leaders africains dans les universités partenaires.', badge: 'Fondation' },
      { name: 'AMCI Maroc', url: 'https://amci.ma', description: 'Bourses de coopération du Royaume du Maroc pour les étudiants béninois.', badge: 'Maroc' }
    ],
    content: `Obtenir une bourse d'études nécessite entre 9 et 12 mois de préparation rigoureuse avant la rentrée universitaire ciblée. Ce dossier synthétise les opportunités fiables et vérifiées.

### 1. Les Bourses Officielles du Gouvernement Béninois
Gérées par la **Direction des Bourses et Secours Universitaires (DBS)** du Ministère de l'Enseignement Supérieur et de la Recherche Scientifique (MESRS) :
- Bourses de filières d'excellence pour les meilleurs bacheliers.
- Allocations de coopération bilatérale (Maroc, Algérie, Russie, Chine, Cuba, Tunisie).

### 2. Les Grandes Bourses Gouvernementales Internationales
- **France Excellence Eiffel** : Clôture en janvier de chaque année. Dossier porté par l'université d'accueil française.
- **Chevening (UK Government)** : Clôture début novembre. Requiert au moins 2 années d'expérience professionnelle préalable.
- **Fulbright (USA)** : Bourse américaine d'excellence pour les diplômés béninois.

### 3. Les Pièges et Arnaques à Éviter
Une véritable bourse ne vous demandera **JAMAIS** de payer des frais d'enregistrement par Mobile Money ou Western Union. Toutes les candidatures officielles s'effectuent sur les portails institutionnels des ambassades ou des fondations reconnues.`
  },
  {
    id: 'wiki-programmes-publics-insertion',
    slug: 'les-programmes-publics-d-insertion',
    title: 'Les programmes publics d’insertion',
    category: 'ORGANISATIONS',
    content_type: 'GUIDE',
    summary: 'Comparatif détaillé des dispositifs d’État béninois : PSIE, AZOLI, PRODIJ, ADPME, FNDA et microfinance Alafia.',
    source: {
      name: 'Observatoire des Politiques Publiques TSF',
      is_tsf_original: true,
      author: 'Analystes Marché du Travail'
    },
    published_at: '2026-09-08T08:00:00Z',
    updated_at: '2026-09-29T07:30:00Z',
    url: '/wikijob/wiki/les-programmes-publics-d-insertion',
    tags: ['Programmes Publics', 'Insertion Professionnelle', 'PSIE', 'Azoli', 'PRODIJ', 'Gouvernement Bénin', 'Jeunesse'],
    status: 'PUBLISHED',
    featured: true,
    read_time_minutes: 8,
    views_count: 3670,
    curated_sites: [
      { name: 'PSIE Bénin', url: 'https://psie.bj', description: 'Prise en charge des salaires de jeunes diplômés par l’État.', badge: 'Diplômés' },
      { name: 'ANPE Bénin / Dispositif AZOLI', url: 'https://anpe.bj', description: 'Emploi et formation pour jeunes peu ou pas qualifiés.', badge: 'Tous profils' },
      { name: 'PRODIJ', url: 'https://prodij.bj', description: 'Projet de développement des compétences et kits d’installation.', badge: 'Métiers' },
      { name: 'ADPME', url: 'https://adpme.bj', description: 'Guichet unique d’appui financier et technique aux PME.', badge: 'Entreprises' },
      { name: 'FNM Alafia', url: 'https://fnm.bj', description: 'Microcrédits mobiles pour activités génératrices de revenus.', badge: 'Microfinance' }
    ],
    content: `L'État béninois a profondément restructuré son écosystème d'insertion des jeunes à travers des programmes complémentaires selon le niveau de qualification et le projet professionnel.

### Matrice Comparée des Dispositifs

| Dispositif | Cible | Nature de l'Aide | Durée |
| :--- | :--- | :--- | :--- |
| **PSIE** | Diplômés (BAC+2 à BAC+5) | Prise en charge 100% salaire | 12 à 24 mois |
| **AZOLI** | Jeunes peu/non qualifiés (18-30 ans) | Immersion tutorée + prime mensuelle | 6 mois |
| **PRODIJ** | Artisans & métiers techniques | Formation certifiante + Trousseau outillage | Variable |
| **ADPME** | Entrepreneurs et PME | Prise en charge d'études, labellisation | Annuel |
| **FNM Alafia** | Petits commerçants et ruraux | Microcrédit 100% mobile (30.000 à 100.000 F) | 6 à 12 mois |

### Comment Maximiser vos Chances ?
Créez votre dossier sur le guichet unique de l'ANPE et tenez vos justificatifs (diplômes légalisés, CIP, certificat de résidence) toujours à jour au format numérique PDF.`
  },
  {
    id: 'wiki-concours-ouverts',
    slug: 'les-concours-ouverts-actuellement',
    title: 'Les concours ouverts actuellement',
    category: 'CONCOURS',
    content_type: 'ACTUALITÉ',
    summary: 'Veille périodique des concours de la fonction publique béninoise, concours administratifs et entrées aux grandes écoles nationales.',
    source: {
      name: 'Ministère du Travail et de la Fonction Publique (Relais Officiel)',
      url: 'https://travail.gouv.bj',
      is_tsf_original: false,
      author: 'Veille Institutionnelle TSF'
    },
    published_at: '2026-09-22T10:00:00Z',
    updated_at: '2026-09-29T06:00:00Z',
    url: '/wikijob/wiki/les-concours-ouverts-actuellement',
    tags: ['Concours', 'Fonction Publique Bénin', 'MTFP', 'Grandes Écoles', 'Recrutement Militaire', 'ENAM', 'ENA'],
    status: 'PUBLISHED',
    featured: false,
    read_time_minutes: 5,
    views_count: 4890,
    content: `Cette rubrique assure la veille continue des arrêtés et communiqués interministériels annonçant l'ouverture de concours directs au Bénin.

### Concours de la Fonction Publique Béninoise
Le Ministère du Travail et de la Fonction Publique centralise les inscriptions exclusivement sur le portail dématérialisé officiel **concours.fonctionpublique.gouv.bj**.
- **Important** : Aucun intermédiaire physique ne délivre de formulaire. Toutes les pièces (certificat médical, casier judiciaire, acte de naissance sécurisé ANIP) sont téléversées en ligne.
- **Paiement des droits** : Effectué via le portail national e-services du Trésor Public.

### Concours d’Entrée aux Grandes Écoles (UAC & UP)
- **ENAM Cotonou** : Concours d'entrée en cycle I et II (administration générale, diplomatie, gestion financière).
- **ENEAM** : Économie appliquée, statistique et planification.
- **INMES & Faculté des Sciences de la Santé (FSS)** : Formations médicales et paramédicales.`
  },
  {
    id: 'wiki-opportunites-jeunes-entrepreneurs',
    slug: 'les-opportunites-pour-les-jeunes-entrepreneurs',
    title: 'Les opportunités pour les jeunes entrepreneurs',
    category: 'ENTREPRENEURIAT',
    content_type: 'DOSSIER',
    summary: 'Accélérateurs, concours d’amorçage, subventions de prototypage et incubateurs pour lancer et financer sa startup au Bénin.',
    source: {
      name: 'Pôle Innovation & Entrepreneuriat TSF',
      is_tsf_original: true,
      author: 'Mentors Croissance & Métanoïa TSF'
    },
    published_at: '2026-09-14T08:30:00Z',
    updated_at: '2026-09-28T16:00:00Z',
    url: '/wikijob/wiki/les-opportunites-pour-les-jeunes-entrepreneurs',
    tags: ['Entrepreneuriat', 'Startup Bénin', 'Incubateur', 'Amorçage', 'Sèmè City', 'UAC Startup Valley', 'Financement PME'],
    status: 'PUBLISHED',
    featured: true,
    read_time_minutes: 8,
    views_count: 2740,
    curated_sites: [
      { name: 'Sèmè City Open Innovation', url: 'https://semecity.bj', description: 'Cité internationale de l’innovation et du savoir à Ouidah/Cotonou.', badge: 'Hub Public' },
      { name: 'UAC Startup Valley', url: 'https://uacstartupvalley.bj', description: 'Incubateur universitaire de l’Université d’Abomey-Calavi.', badge: 'Incubateur' },
      { name: 'ADPME Guichet Unique', url: 'https://adpme.bj', description: 'Fonds d’études de marché et d’assistance technique aux startups.', badge: 'Financement' },
      { name: 'FNPEEJ Bénin', url: 'https://fnpeej.bj', description: 'Fonds National de Promotion de l’Entreprise et de l’Emploi des Jeunes.', badge: 'Fonds Public' },
      { name: 'Blablablab / Epitech Bénin Hub', url: 'https://epitech.bj', description: 'Écosystème tech et prototypage pour entrepreneurs digitaux.', badge: 'Tech Hub' }
    ],
    content: `L'écosystème entrepreneurial béninois s'est densifié ces trois dernières années avec l'émergence de guichets de subvention et de programmes d'accélération structurés.

### 1. Les Lieux d'Incubation et d'Accélération
- **Sèmè City** : Programmes d'incubation thématiques (EdTech, AgriTech, Santé, Design) offrant mentorat international et accès à des investisseurs d'Afrique de l'Ouest.
- **UAC Startup Valley** : Programme pionnier certifié pour les diplômés de l'Université d'Abomey-Calavi désireux de créer leur propre entreprise plutôt que de postuler à un emploi salarié.
- **Centres Songhaï (Porto-Novo)** : Référence absolue pour l'agrobusiness écologique et la transformation locale.

### 2. Les Instruments Financiers de Démarrage
- **Fonds de Garantie et de Bonification (FNDA)** : Réduit le taux d'intérêt bancaire pour les projets agricoles innovants.
- **Fonds FNPEEJ** : Crédits d'amorçage pour les plans d'affaires validés par un comité d'experts.
- **SourceFund Africa (TSF)** : Accompagnement à la levée de fonds et mise en relation avec des business angels panafricains.`
  }
];
