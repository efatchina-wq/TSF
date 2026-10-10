import { 
  TalentProfile, 
  TalentStatus, 
  TalentLevel, 
  JourneyStepId, 
  TsfTalentIdCard 
} from '../types/talent';

export const SAMPLE_TALENTS_PROFILES: TalentProfile[] = [
  {
    id: 'talent-aminata-traore',
    nom: 'Traoré',
    prenom: 'Dr. Aminata',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    titreProfessionnel: 'Docteure en Biostatistique & Spécialiste IA Épidémiologique',
    localisation: {
      ville: 'Dakar',
      pays: 'Sénégal',
      region: 'Afrique de l’Ouest',
      mobilitePanafricaine: true
    },
    domaine: 'Intelligence Artificielle & Santé Publique',
    domaineSlug: 'ia-sante',
    tsfId: {
      id: 'tsf-id-01',
      uniqueId: 'TSF-ID-2025-SEN-0842',
      nationalCode: 'SEN',
      level: 'Niveau IV — Fellow Panafricain & Bâtisseur',
      status: 'propulse',
      statusLabel: 'Propulsée & Fellow Active',
      skills: ['Modélisation Épidémiologique', 'Deep Learning & NLP', 'Gouvernance des Données de Santé', 'Conduite de Politiques Publiques'],
      certifications: ['Horizon Excellence — Grade A+', 'Label Cryptographique TSF VeriTrust v2'],
      issuingDate: '14 Octobre 2025',
      cryptographicSignature: '0x9E7F4C82A1B6D0F55328B71C0A92E83F91A7B2C4D6E8F0123456789ABCDEF012',
      blockchainRecordId: 'TSF-ETH-BLK-882194-L4',
      qrPayload: 'https://tsf.africa/verify/TSF-ID-2025-SEN-0842?sig=0x9E7F4C'
    },
    bio: 'Pionnière de l’application des réseaux neuronaux profonds à la prédiction des zoonoses en zones tropicales. Lauréate émérite de la promotion Horizon Excellence 2025, elle dirige aujourd’hui des initiatives continentales de souveraineté sanitaire en collaboration avec les agences de santé publique africaines.',
    manifestePersonnel: '« L’Afrique ne doit plus être un simple champ de collecte de données brutes, mais le centre mondial de conception des algorithmes qui sauvent ses populations et anticipent les crises sanitaires de demain. »',
    disponibilite: {
      statut: 'Missions d’Expertise',
      tempsDispo: 'Consultance',
      preferencesMobilite: ['Kigali (Rwanda)', 'Dakar (Sénégal)', 'Addis-Abeba (Éthiopie)', 'Genève (Suisse)'],
      rechercheActuelle: 'Direction scientifique de programmes multilatéraux de surveillance épidémiologique et mentorat des jeunes chercheuses STEM.'
    },
    competences: [
      { id: 'sk-1', name: 'Apprentissage Statistique & PyTorch', category: 'technique', level: 98, endorsedByTsf: true, auditedDate: 'Août 2025' },
      { id: 'sk-2', name: 'Épidémiologie Mathématique', category: 'recherche', level: 95, endorsedByTsf: true, auditedDate: 'Septembre 2025' },
      { id: 'sk-3', name: 'Négociation & Plaidoyer Multilatéral', category: 'leadership', level: 90, endorsedByTsf: true, auditedDate: 'Octobre 2025' },
      { id: 'sk-4', name: 'Bioéthique & Souveraineté Numérique', category: 'strategie', level: 92, endorsedByTsf: true, auditedDate: 'Juillet 2025' },
      { id: 'sk-5', name: 'Anglais & Français Professionnel Intégral', category: 'langue', level: 100, endorsedByTsf: true, auditedDate: 'Mai 2025' }
    ],
    portfolio: [
      {
        id: 'port-1',
        title: 'Plateforme Panafricaine d’Alerte Zoonotique Précoce (Episcan-Sahel)',
        clientOrContext: 'Consortium Sanitaire Sous-Régional & Hub TSF Kigali',
        year: '2025',
        description: 'Conception et déploiement d’un algorithme prédictif analysant les signaux faibles climatiques et sanitaires dans 7 pays sahéliens.',
        impactMetrics: 'Réduction de 43% du temps de détection des foyers de fièvre de la vallée du Rift ; 3,4M de personnes couvertes.',
        techStackOrDomain: ['Python / FastAI', 'Systèmes d’Information Géographique (SIG)', 'Edge Computing'],
        externalUrl: 'https://tsf.africa/projects/episcan-sahel'
      },
      {
        id: 'port-2',
        title: 'Protocole de Fédérations de Données Hospitalières Inter-États',
        clientOrContext: 'Union Africaine & Instituts Pasteur Associés',
        year: '2024',
        description: 'Mise en œuvre d’un modèle d’apprentissage fédéré (Federated Learning) préservant la souveraineté et la confidentialité absolue des dossiers patients.',
        impactMetrics: '14 centres hospitaliers universitaires fédérés sans transfert transfrontalier de données brutes.',
        techStackOrDomain: ['Federated Learning', 'Differential Privacy', 'HL7/FHIR'],
        externalUrl: 'https://tsf.africa/projects/fedhealth-africa'
      }
    ],
    realisations: [
      {
        id: 'ach-1',
        title: 'Prix Continental de l’Excellence Scientifique Féminine — TSF 2025',
        year: '2025',
        organization: 'Conseil d’Orientation Stratégique TSF',
        description: 'Distinction décernée à l’unanimité du jury international pour ses travaux sur la modélisation mathématique autonome.',
        significance: 'Plus haute distinction académique du réseau TSF, dotée d’une bourse de recherche de 50 000 $.'
      },
      {
        id: 'ach-2',
        title: 'Publication dans The Lancet Planetary Health',
        year: '2024',
        organization: 'The Lancet Publishing Group',
        description: 'Article de référence : « Predictive dynamics of vector-borne pathogens under changing climate regimes in Western Sahel ».',
        significance: 'Cité plus de 180 fois au niveau international au cours de sa première année.'
      }
    ],
    experiences: [
      {
        id: 'exp-1',
        role: 'Directrice de Recherche Associée & Fellow Résidente',
        organization: 'Institut Pasteur de Dakar & Hub TSF Sahel',
        location: 'Dakar, Sénégal',
        startDate: '2024',
        isCurrent: true,
        description: 'Direction d’une équipe de 14 chercheurs et ingénieurs de données travaillant sur les modèles mathématiques d’urgence pandémique.',
        achievements: [
          'Création du premier laboratoire africain d’IA appliquée aux zoonoses tropicales.',
          'Supervision de 6 mémoires de master pour de futurs lauréats TSF.'
        ]
      },
      {
        id: 'exp-2',
        role: 'Conseillère Technique Épidémiologique',
        organization: 'Ministère de la Santé et de l’Action Sociale',
        location: 'Dakar, Sénégal',
        startDate: '2022',
        endDate: '2024',
        isCurrent: false,
        description: 'Coordination technique du plan national de riposte vaccinale et surveillance intégrée des épidémies récurrentes.',
        achievements: [
          'Automatisation des bulletins épidémiologiques hebdomadaires.',
          'Formation de 120 médecins chefs de district aux tableaux de bord analytiques.'
        ]
      }
    ],
    formations: [
      {
        id: 'edu-1',
        degree: 'Doctorat (Ph.D.) en Biostatistique & Modélisation Mathématique',
        fieldOfStudy: 'Biomathématiques & Épidémiologie Quantitative',
        institution: 'Université Cheikh Anta Diop (UCAD) en co-tutelle internationale',
        location: 'Dakar, Sénégal / Paris',
        graduationYear: '2022',
        honors: 'Félicitations unanimes du jury international'
      },
      {
        id: 'edu-2',
        degree: 'Certificat Supérieur de Leadership Panafricain & Éthique Publique',
        fieldOfStudy: 'Gouvernance Stratégique & Diplomatie Scientifique',
        institution: 'Académie des Cadres TSF — Promotion Horizon Excellence',
        location: 'Kigali, Rwanda',
        graduationYear: '2025',
        honors: 'Major de Promotion — Grade A'
      }
    ],
    certification: {
      id: 'cert-01',
      tsfCertificateNumber: 'TSF-CERT-2025-HE-0042',
      programName: 'Horizon Excellence — Haute Direction & Leadership Scientifique',
      cohort: 'Promotion Nelson Mandela (2025)',
      grade: 'Grade A — Félicitations Spéciales du COS',
      issuingDate: '15 Octobre 2025',
      juryPresident: 'Pr. Ibrahima Fall (Ancien Recteur & Membre du Comité Scientifique TSF)',
      cryptographicHash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      verificationUrl: 'https://tsf.africa/certificat/TSF-CERT-2025-HE-0042',
      officialPillarsAudited: [
        'Excellence Cognitive & Résolution de Problèmes Complexes',
        'Intégrité Éthique & Déontologie de l’Action Publique',
        'Impact Systémique & Maîtrise des Politiques Souveraines'
      ]
    },
    badges: [
      {
        id: 'bdg-1',
        name: 'Top 1% Détection Panafricaine',
        category: 'merite',
        description: 'Obtenu lors du concours d’entrée Horizon Excellence avec un score psychométrique supérieur au 99e percentile.',
        iconName: 'Award',
        obtainedDate: 'Janvier 2025',
        issuingAuthority: 'Secrétariat Académique TSF'
      },
      {
        id: 'bdg-2',
        name: 'Leadership Éthique & Gouvernance',
        category: 'ethique',
        description: 'Validation avec distinction du séminaire Croissance & Métanoïa sur la gestion des conflits d’intérêts.',
        iconName: 'ShieldCheck',
        obtainedDate: 'Juin 2025',
        issuingAuthority: 'Comité d’Éthique TSF'
      },
      {
        id: 'bdg-3',
        name: 'Fellow Panafricain Propulsé',
        category: 'impact',
        description: 'Attribué aux lauréats dont les réalisations sur le terrain génèrent des retombées directes mesurables.',
        iconName: 'Zap',
        obtainedDate: 'Octobre 2025',
        issuingAuthority: 'Directoire Exécutif TSF'
      },
      {
        id: 'bdg-4',
        name: 'Ambassadrice Mentor TSF',
        category: 'reseau',
        description: 'Engagement solennel à parrainer au moins deux jeunes lauréats issus de zones rurales ou défavorisées.',
        iconName: 'Users',
        obtainedDate: 'Novembre 2025',
        issuingAuthority: 'Réseau Alumni TSF'
      }
    ],
    opportunites: [
      {
        id: 'opp-match-1',
        title: 'Haut Commissariat à la Sécurité Sanitaire Africaine — Directeur de Veille',
        organization: 'Centre Africain pour la Surveillance et la Prévention des Maladies (Africa CDC)',
        location: 'Addis-Abeba / Hybride',
        type: 'Détachement Public',
        deadline: '15 Décembre 2026',
        matchScore: 97,
        compensationOrBudget: 'Grille Cadre Dirigeant International',
        status: 'candidature_envoyee'
      },
      {
        id: 'opp-match-2',
        title: 'Bourse de Recherche Avancée en IA Souveraine — Horizon 2027',
        organization: 'Fonds Multilatéral Africain pour la Science & la Technologie',
        location: 'Kigali / Dakar',
        type: 'Bourse d’Excellence',
        deadline: '30 Janvier 2027',
        matchScore: 94,
        compensationOrBudget: 'Dotation 120 000 $ sur 24 mois',
        status: 'eligible'
      }
    ],
    journey: [
      {
        stepId: 'profil_cree',
        order: 1,
        label: 'Profil créé',
        tagline: 'Création du compte et vérification des données académiques',
        dateCompleted: '12 Novembre 2024',
        status: 'completed',
        summary: 'Enregistrement initial dans l’annuaire sécurisé TSF et transmission des pièces justificatives.',
        details: [
          'Dossier biographique et relevés de notes validés',
          'Vérification d’identité numérique TSF-ID générée',
          'Signature de la charte de confidentialité'
        ],
        scoreOrKpi: 'Dossier 100% conforme'
      },
      {
        stepId: 'talent_detecte',
        order: 2,
        label: 'Talent détecté',
        tagline: 'Scouting académique et recommandation par les pairs',
        dateCompleted: '20 Décembre 2024',
        status: 'completed',
        summary: 'Repérage par la commission de scouting universitaire TSF lors du symposium de Dakar.',
        details: [
          'Recommandation officielle émise par le Recteur de l’UCAD',
          'Revue préliminaire du potentiel de recherche par le hub TSF Afrique de l’Ouest',
          'Invitation formelle à l’évaluation Horizon Excellence'
        ],
        scoreOrKpi: 'Rang 1/140 pré-sélectionnés'
      },
      {
        stepId: 'evaluation',
        order: 3,
        label: 'Évaluation',
        tagline: 'Tests psychométriques, auditions à l’aveugle et grand jury',
        dateCompleted: '18 Février 2025',
        status: 'completed',
        summary: 'Passage des trois épreuves éliminatoires sous anonymisation stricte.',
        details: [
          'Test d’aptitude cognitive et raisonnement abstrait (Score : 99,4e percentile)',
          'Grand oral d’analyse systémique devant un collège d’experts anonymes',
          'Examen déontologique approfondi par le Comité d’Éthique'
        ],
        scoreOrKpi: '98.5 / 100 — Major du Collège Sciences'
      },
      {
        stepId: 'incubation',
        order: 4,
        label: 'Incubation',
        tagline: 'Bootcamp immersif, mentorat de haut vol et séminaires de posture',
        dateCompleted: '15 Juillet 2025',
        status: 'completed',
        summary: 'Cursus de 6 mois mêlant leadership stratégique, intelligence collective et négociation multilatérale.',
        details: [
          'Immersion résidentielle de 3 semaines à Kigali',
          'Mentorat par un ancien Premier Ministre et un Directeur Technique d’envergure mondiale',
          'Validation du module Croissance & Métanoïa sur la résistance aux pressions exogènes'
        ],
        deliverables: ['Plan Stratégique Décennal pour la Souveraineté Sanitaire de l’Afrique de l’Ouest'],
        scoreOrKpi: 'Validation avec Mention Très Honorable'
      },
      {
        stepId: 'certification',
        order: 5,
        label: 'Certification',
        tagline: 'Audition finale et remise solennelle du Passeport TSF',
        dateCompleted: '15 Octobre 2025',
        status: 'completed',
        summary: 'Soutenance de grand jury présidée par le Conseil d’Orientation Stratégique.',
        details: [
          'Attribution du Grade A avec félicitations du COS',
          'Ancrage de l’empreinte cryptographique sur le registre immuable TSF',
          'Délivrance de l’accréditation Fellow Panafricain'
        ],
        scoreOrKpi: 'TSF-CERT-2025-HE-0042'
      },
      {
        stepId: 'opportunites',
        order: 6,
        label: 'Opportunités',
        tagline: 'Mise en relation avec les instances de décision et financements',
        dateCompleted: 'Janvier 2026',
        status: 'completed',
        summary: 'Connexion à des postes de direction stratégique et financements de recherche souveraine.',
        details: [
          'Fast-track auprès de l’Africa CDC et des bailleurs multilatéraux',
          'Allocation d’une bourse de propulsion TSF de 50 000 $',
          'Offres de co-direction de chaires académiques'
        ],
        scoreOrKpi: '3 offres stratégiques reçues'
      },
      {
        stepId: 'impact',
        order: 7,
        label: 'Impact',
        tagline: 'Déploiement à grande échelle et retour de valeur vers l’Afrique',
        dateCompleted: 'En cours',
        status: 'current',
        summary: 'Direction active de projets sauvant des vies et transfert de compétences vers la relève.',
        details: [
          '3,4 millions d’habitants couverts par le réseau prédictif Episcan-Sahel',
          'Parrainage actif de 4 lycéennes lauréates Graines de Champions',
          'Représentation de l’Afrique dans les comités de normalisation de l’OMS'
        ],
        scoreOrKpi: '3.4M Bénéficiaires indirects'
      }
    ],
    applications: [
      {
        id: 'app-1',
        programOrOpportunityTitle: 'Détachement Stratégique — Africa CDC Épidémiologie',
        category: 'Mission Internationale',
        submittedAt: '02 Novembre 2026',
        status: 'en_revue_jury',
        statusLabel: 'Instruction au Comité de Détachement',
        nextStep: 'Entretien final le 12 Décembre 2026',
        trackingNumber: 'APP-2026-CDC-091'
      },
      {
        id: 'app-2',
        programOrOpportunityTitle: 'Programme Horizon Excellence — Promotion 2025',
        category: 'Fellowship Élite',
        submittedAt: '15 Novembre 2024',
        status: 'admis',
        statusLabel: 'Lauréate Diplômée — Major',
        nextStep: 'Cursus achevé avec Félicitations',
        trackingNumber: 'APP-2025-HE-042'
      }
    ],
    formationsEnCours: [
      {
        id: 'mod-1',
        code: 'TSF-GOV-501',
        title: 'Haute Diplomatie Économique & Négociation de Traités Multilatéraux',
        track: 'Filière Souveraineté & Institutions',
        instructor: 'Dr. Cheikh Tidiane Gadio (Ancien Ministre des Affaires Étrangères)',
        progressPercent: 85,
        durationHours: 40,
        completedHours: 34,
        status: 'en_cours',
        nextSessionDate: '30 Octobre 2026 à 18h00 GMT'
      },
      {
        id: 'mod-2',
        code: 'TSF-ETH-402',
        title: 'Éthique des Algorithmes Souverains & Protection du Patrimoine Génétique Africain',
        track: 'Filière Sciences & Éthique',
        instructor: 'Pr. Aminata Sall Diallo',
        progressPercent: 100,
        durationHours: 30,
        completedHours: 30,
        status: 'valide'
      }
    ],
    messages: [
      {
        id: 'msg-1',
        senderName: 'Secrétariat du Conseil d’Orientation Stratégique',
        senderRole: 'Instance Haute de Gouvernance TSF',
        subject: 'Invitation d’honneur au Sommet Annuel des Bâtisseurs 2027',
        preview: 'Chère Dr. Traoré, le Président du COS vous invite formellement à intervenir lors de la plénière...',
        body: 'Chère Dr. Traoré,\n\nLe Conseil d’Orientation Stratégique a l’honneur de solliciter votre participation en tant qu’oratrice principale lors de la session plénière inaugurale du Sommet Annuel TSF 2027 qui se tiendra à Kigali.\n\nVotre retour d’expérience sur l’impact du modèle Episcan-Sahel illustre parfaitement la transformation concrète que notre institution entend promouvoir à travers le continent.\n\nVeuillez agréer l’expression de notre haute considération,\n\nLe Secrétaire Général de TSF',
        sentAt: 'Hier à 14:30',
        unread: true,
        category: 'jury'
      },
      {
        id: 'msg-2',
        senderName: 'Cabinet du Directeur — Africa CDC',
        senderRole: 'Recruteur Institutionnel Partenaire',
        subject: 'Confirmation de conformité de votre dossier de détachement',
        preview: 'Votre candidature pour la direction de l’unité de modélisation mathématique a reçu un avis préliminaire très favorable...',
        body: 'Madame la Directrice,\n\nNous vous confirmons la bonne réception de l’ensemble des pièces certifiées transmises via votre passeport TSF-ID. L’authenticité cryptographique de votre diplôme a été validée par nos services juridiques sans aucune réserve.\n\nUn calendrier d’échange avec le Directeur Général Adjoint vous sera communiqué sous 48 heures.\n\nBien cordialement,\nDivision des Ressources Humaines Spécialisées',
        sentAt: 'Il y a 3 jours',
        unread: false,
        category: 'recruteur'
      },
      {
        id: 'msg-3',
        senderName: 'Pr. Ibrahima Fall',
        senderRole: 'Votre Mentor Référent TSF',
        subject: 'Revue de votre projet d’extension au Bassin du Congo',
        preview: 'J’ai attentivement relu la note stratégique. Tes hypothèses de calibrage sont solides...',
        body: 'Chère Aminata,\n\nFélicitations pour la rigueur méthodologique. J’ai annoté le document de travail concernant l’intégration des données climatiques satellitaires. Nous pouvons en discuter lors de notre point mensuel de jeudi.\n\nContinue sur cette trajectoire d’intransigeance intellectuelle.\n\nPr. Ibrahima Fall',
        sentAt: 'Il y a 6 jours',
        unread: false,
        category: 'mentor'
      }
    ]
  },
  {
    id: 'talent-kwame-mensah',
    nom: 'Mensah',
    prenom: 'Ing. Kwame',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    titreProfessionnel: 'Ingénieur Polytechnicien & Fondateur de VoltaicGrid Labs',
    localisation: {
      ville: 'Accra',
      pays: 'Ghana',
      region: 'Afrique de l’Ouest',
      mobilitePanafricaine: true
    },
    domaine: 'Énergie Décentralisée, Réseaux Intelligents & Greentech',
    domaineSlug: 'energie-greentech',
    tsfId: {
      id: 'tsf-id-02',
      uniqueId: 'TSF-ID-2024-GHA-0319',
      nationalCode: 'GHA',
      level: 'Niveau IV — Fellow Panafricain & Bâtisseur',
      status: 'propulse',
      statusLabel: 'Bâtisseur & Entrepreneur Certifié',
      skills: ['Micro-réseaux Solaires Hybrides', 'Systèmes de Stockage LFP', 'Gestion Électronique de Puissance', 'Financement de Projets Énergétiques'],
      certifications: ['SourceFund Africa — Grade A+', 'Accréditation TSF Cleantech Standard'],
      issuingDate: '28 Novembre 2024',
      cryptographicSignature: '0x4A1E8D9C0B3F7A25684C198E7B6A5D4C3E2F1A0B9C8D7E6F5A4B3C2D1E0F9A8B',
      blockchainRecordId: 'TSF-ETH-BLK-749102-L4',
      qrPayload: 'https://tsf.africa/verify/TSF-ID-2024-GHA-0319?sig=0x4A1E8D'
    },
    bio: 'Bâtisseur pragmatique diplômé de KNUST et certifié par TSF. Son entreprise, VoltaicGrid Labs, fabrique en Afrique des onduleurs et systèmes de stockage conteneurisés permettant d’électrifier les dispensaires, écoles et coopératives agricoles isolées sans dépendre des réseaux fossiles.',
    manifestePersonnel: '« L’énergie n’est pas une marchandise spéculative en Afrique : c’est le socle absolu de la réindustrialisation, de l’autonomie alimentaire et de la dignité humaine. »',
    disponibilite: {
      statut: 'Bâtisseur Indépendant',
      tempsDispo: 'Temps plein',
      preferencesMobilite: ['Accra', 'Abidjan', 'Lomé', 'Kigali'],
      rechercheActuelle: 'Alliances avec les gouvernements pour l’électrification rurale à grande échelle et déploiement d’usines d’assemblage locales.'
    },
    competences: [
      { id: 'sk-21', name: 'Électronique de Puissance & Onduleurs Haut Rendement', category: 'technique', level: 96, endorsedByTsf: true, auditedDate: 'Juin 2024' },
      { id: 'sk-22', name: 'Micro-Grid Management System (SCADA / IoT)', category: 'technique', level: 94, endorsedByTsf: true, auditedDate: 'Juillet 2024' },
      { id: 'sk-23', name: 'Structuration Financière & Quasi-Fonds Propres', category: 'strategie', level: 88, endorsedByTsf: true, auditedDate: 'Août 2024' },
      { id: 'sk-24', name: 'Management Industriel & Chaîne d’Approvisionnement', category: 'leadership', level: 91, endorsedByTsf: true, auditedDate: 'Octobre 2024' }
    ],
    portfolio: [
      {
        id: 'port-21',
        title: 'Micro-Réseaux Hybrides Décentralisés — 140 Villages Électrifiés',
        clientOrContext: 'Ministère de l’Énergie du Ghana & Bailleurs Associés',
        year: '2024-2026',
        description: 'Conception d’unités modulaires de 50 à 250 kWc intégrant batteries LFP recyclables et comptage prépayé par mobile money.',
        impactMetrics: '140 villages raccordés ; 42 000 habitants alimentés ; 65 emplois industriels directs créés.',
        techStackOrDomain: ['Firmware embarqué C++', 'Batteries LiFePO4', 'Télémétrie GSM/LoRa']
      }
    ],
    realisations: [
      {
        id: 'ach-21',
        title: 'Trophée Panafricain de l’Innovation Industrielle TSF 2024',
        year: '2024',
        organization: 'Jury SourceFund Africa TSF',
        description: 'Récompense décernée pour la conception d’un onduleur résistant aux variations climatiques extrêmes.',
        significance: 'Octroi d’un ticket d’amorçage de 150 000 $ en quasi-fonds propres sans dilution agressive.'
      }
    ],
    experiences: [
      {
        id: 'exp-21',
        role: 'Fondateur & Président Directeur Général',
        organization: 'VoltaicGrid Labs Ltd',
        location: 'Accra, Ghana',
        startDate: '2023',
        isCurrent: true,
        description: 'Direction stratégique, industrielle et commerciale de la scale-up greentech ghanéenne.',
        achievements: [
          'Création d’une ligne d’assemblage locale certifiée ISO 9001.',
          'Rentabilité opérationnelle atteinte en 18 mois.'
        ]
      }
    ],
    formations: [
      {
        id: 'edu-21',
        degree: 'Diplôme d’Ingénieur en Génie Électrique & Électronique',
        fieldOfStudy: 'Systèmes Énergétiques Hautes Tensions',
        institution: 'Kwame Nkrumah University of Science and Technology (KNUST)',
        location: 'Kumasi, Ghana',
        graduationYear: '2021',
        honors: 'First Class Honours'
      }
    ],
    certification: {
      id: 'cert-02',
      tsfCertificateNumber: 'TSF-CERT-2024-SF-0019',
      programName: 'SourceFund Africa — Accréditation Dirigeant d’Impact Industriel',
      cohort: 'Promotion Thomas Sankara (2024)',
      grade: 'Grade A — Innovation Industrielle',
      issuingDate: '28 Novembre 2024',
      juryPresident: 'M. Tidjane Thiam & Collège des Directeurs d’Usines Partenaires',
      cryptographicHash: 'SHA256:3a91b48f6c5e2d1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a',
      verificationUrl: 'https://tsf.africa/certificat/TSF-CERT-2024-SF-0019',
      officialPillarsAudited: [
        'Solidité Économique & Viabilité des Modèles Locaux',
        'Création d’Emplois Qualifiés non Délocalisables',
        'Souveraineté Technologique & Électrification Propre'
      ]
    },
    badges: [
      {
        id: 'bdg-21',
        name: 'Bâtisseur Souverain',
        category: 'impact',
        description: 'Décerné pour la création d’usines d’assemblage sur le sol africain.',
        iconName: 'Factory',
        obtainedDate: 'Novembre 2024',
        issuingAuthority: 'Direction SourceFund Africa'
      },
      {
        id: 'bdg-22',
        name: 'Label Cleantech Excellence',
        category: 'merite',
        description: 'Audit technique indépendant validant un taux de conversion énergétique supérieur à 98%.',
        iconName: 'Sun',
        obtainedDate: 'Décembre 2024',
        issuingAuthority: 'Comité Scientifique TSF'
      }
    ],
    opportunites: [
      {
        id: 'opp-match-21',
        title: 'Appel d’Offres Panafricain — Électrification de 500 Dispensaires Ruraux',
        organization: 'Banque Ouest Africaine de Développement (BOAD)',
        location: 'UEMOA (Multi-pays)',
        type: 'Financement Amorçage',
        deadline: '28 Février 2027',
        matchScore: 99,
        compensationOrBudget: 'Marché réservé aux lauréats TSF — 2 500 000 $',
        status: 'eligible'
      }
    ],
    journey: [
      {
        stepId: 'profil_cree',
        order: 1,
        label: 'Profil créé',
        tagline: 'Enregistrement initial',
        dateCompleted: 'Janvier 2024',
        status: 'completed',
        summary: 'Création du profil suite au dépôt de prototype à KNUST.',
        details: ['Prototype testé en laboratoire', 'Dossier de brevets transmis'],
        scoreOrKpi: 'Dossier Conforme'
      },
      {
        stepId: 'talent_detecte',
        order: 2,
        label: 'Talent détecté',
        tagline: 'Scouting technologique',
        dateCompleted: 'Mars 2024',
        status: 'completed',
        summary: 'Sélectionné parmi 400 candidats pour le guichet SourceFund Africa.',
        details: ['Audit de l’atelier pilote par les évaluateurs TSF'],
        scoreOrKpi: 'Top 3 Climat/Tech'
      },
      {
        stepId: 'evaluation',
        order: 3,
        label: 'Évaluation',
        tagline: 'Due diligence technique et économique',
        dateCompleted: 'Mai 2024',
        status: 'completed',
        summary: 'Évaluation rigoureuse des schémas électroniques et de la solvabilité du modèle.',
        details: ['Test de stress thermique des composants', 'Audit financier des coûts unitaires'],
        scoreOrKpi: 'Score Technique : 96/100'
      },
      {
        stepId: 'incubation',
        order: 4,
        label: 'Incubation',
        tagline: 'Immersion industrielle et accélération',
        dateCompleted: 'Septembre 2024',
        status: 'completed',
        summary: 'Accompagnement par des directeurs d’usines automobiles et électroniques.',
        details: ['Mise en place de la supply chain locale', 'Formation à la gouvernance d’entreprise'],
        scoreOrKpi: 'Unité pilote industrialisée'
      },
      {
        stepId: 'certification',
        order: 5,
        label: 'Certification',
        tagline: 'Accréditation TSF Cleantech',
        dateCompleted: 'Novembre 2024',
        status: 'completed',
        summary: 'Passage devant le jury SourceFund Africa et remise du Passeport TSF.',
        details: ['Attribution du Grade A Innovation Industrielle'],
        scoreOrKpi: 'TSF-CERT-2024-SF-0019'
      },
      {
        stepId: 'opportunites',
        order: 6,
        label: 'Opportunités',
        tagline: 'Amorçage financier et marchés réservés',
        dateCompleted: 'Janvier 2025',
        status: 'completed',
        summary: 'Déblocage du capital patient et accès aux centrales d’achat des bailleurs.',
        details: ['150 000 $ de quasi-fonds propres injectés', 'Contrat cadre d’électrification signé'],
        scoreOrKpi: '100% financement bouclé'
      },
      {
        stepId: 'impact',
        order: 7,
        label: 'Impact',
        tagline: 'Production industrielle et emplois créés',
        dateCompleted: 'En cours',
        status: 'current',
        summary: '65 emplois directs créés à Accra et 140 villages raccordés en continu.',
        details: ['Autonomie énergétique de 42 000 citoyens', 'Réduction de 8 000 tonnes de CO2/an'],
        scoreOrKpi: '65 emplois qualifiés'
      }
    ],
    applications: [
      {
        id: 'app-kwame-1',
        programOrOpportunityTitle: 'Guichet SourceFund Africa — Promotion 2024',
        category: 'Capital Patient & Amorçage',
        submittedAt: '12 Mars 2024',
        status: 'admis',
        statusLabel: 'Financement Accordé & Décaissé',
        nextStep: 'Reporting trimestriel d’impact',
        trackingNumber: 'SF-2024-ACC-019'
      }
    ],
    formationsEnCours: [
      {
        id: 'kwame-mod-1',
        code: 'TSF-IND-601',
        title: 'Mise à l’Échelle Industrielle & Normes de Sécurité CEI / ISO',
        track: 'Filière Industrie & Greentech',
        instructor: 'Dr. Amadou Ba (Directeur Qualité)',
        progressPercent: 90,
        durationHours: 25,
        completedHours: 22,
        status: 'en_cours',
        nextSessionDate: '05 Novembre 2026'
      }
    ],
    messages: [
      {
        id: 'kwame-msg-1',
        senderName: 'Équipe d’Investissement SourceFund',
        senderRole: 'Comité de Suivi Financier TSF',
        subject: 'Validation du rapport de déploiement Semestre 2',
        preview: 'Félicitations pour le respect des indicateurs d’impact sur les 140 micro-réseaux...',
        body: 'Cher Kwame,\n\nLe comité d’investissement a validé sans réserve les états certifiés de votre dernier semestre. La tenue des coûts de fabrication en deçà des prévisions initiales démontre l’excellence de votre chaîne d’approvisionnement locale.\n\nNous préparons l’instruction pour le tour de syndication série A.\n\nFraternellement,\nLa Direction des Investissements TSF',
        sentAt: 'Il y a 2 jours',
        unread: true,
        category: 'administration'
      }
    ]
  },
  {
    id: 'talent-sarah-benali',
    nom: 'Benali',
    prenom: 'Sarah',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    titreProfessionnel: 'Analyste Haute Finance & Architecte de Dettes Souveraines Vertes',
    localisation: {
      ville: 'Casablanca / Kigali',
      pays: 'Maroc / Rwanda',
      region: 'Afrique du Nord / Afrique Centrale',
      mobilitePanafricaine: true
    },
    domaine: 'Haute Finance Stratégique, Dette Souveraine & Green Bonds',
    domaineSlug: 'finance-strategique',
    tsfId: {
      id: 'tsf-id-03',
      uniqueId: 'TSF-ID-2026-MAR-0994',
      nationalCode: 'MAR',
      level: 'Niveau III — Leader Stratégique',
      status: 'certifie',
      statusLabel: 'Certifiée & En Déploiement',
      skills: ['Titrisation des Actifs Naturels', 'Modélisation des Risques Pays', 'Obligations Vertes & Bleues', 'Droit Financier Panafricain'],
      certifications: ['Horizon Excellence — Grade A Major Finance'],
      issuingDate: '10 Janvier 2026',
      cryptographicSignature: '0x8B7C6D5E4F3A2B1C0D9E8F7A6B5C4D3E2F1A0B9C8D7E6F5A4B3C2D1E0F9A8B7C',
      blockchainRecordId: 'TSF-ETH-BLK-994112-L3',
      qrPayload: 'https://tsf.africa/verify/TSF-ID-2026-MAR-0994?sig=0x8B7C6D'
    },
    bio: 'Ancienne lauréate de Polytechnique et de l’Université Al Akhawayn, certifiée TSF dans la filière Haute Finance. Spécialiste de la valorisation monétaire des puits de carbone forestiers du Bassin du Congo et de la restructuration obligataire souveraine.',
    manifestePersonnel: '« La souveraineté de l’Afrique passe inévitablement par la maîtrise de son crédit, le refus des clauses asymétriques et la monétisation juste de son capital écologique inestimable. »',
    disponibilite: {
      statut: 'Immédiate',
      tempsDispo: 'Temps plein',
      preferencesMobilite: ['Kigali', 'Abidjan', 'Nairobi', 'Casablanca'],
      rechercheActuelle: 'Direction de trésorerie stratégique ou conseil direct auprès d’un Ministère des Finances africain.'
    },
    competences: [
      { id: 'sk-31', name: 'Structuration d’Obligations Climat (Green & Blue Bonds)', category: 'technique', level: 97, endorsedByTsf: true, auditedDate: 'Décembre 2025' },
      { id: 'sk-32', name: 'Négociation auprès du Club de Paris & FMI', category: 'leadership', level: 93, endorsedByTsf: true, auditedDate: 'Janvier 2026' },
      { id: 'sk-33', name: 'Évaluation des Actifs Naturels & Crédits Carbone de Haute Intégrité', category: 'strategie', level: 95, endorsedByTsf: true, auditedDate: 'Janvier 2026' }
    ],
    portfolio: [
      {
        id: 'port-31',
        title: 'Obligation Souveraine Verte Bassin du Congo (1,2 Md $)',
        clientOrContext: 'Commission Climat du Bassin du Congo & BAD',
        year: '2025',
        description: 'Montage de la première émission obligataire garantie par la préservation forestière avec sursouscription de 240%.',
        impactMetrics: '1,2 milliard de dollars levés au taux le plus compétitif du continent pour des infrastructures d’eau et santé.',
        techStackOrDomain: ['Financial Engineering', 'MRV Carbone', 'Cadre ICMA Green Bond']
      }
    ],
    realisations: [
      {
        id: 'ach-31',
        title: 'Prix de la Meilleure Thèse Financière Panafricaine 2025',
        year: '2025',
        organization: 'Association des Banques Centrales Africaines',
        description: 'Étude sur le désendettement par la conversion de dettes en réserves de biodiversité.',
        significance: 'Adopté en guide pratique par 8 banques centrales membres.'
      }
    ],
    experiences: [
      {
        id: 'exp-31',
        role: 'Analyste Principale Dette Souveraine',
        organization: 'Banque Africaine de Développement (BAD)',
        location: 'Abidjan / Kigali',
        startDate: '2023',
        isCurrent: true,
        description: 'Modélisation des trajectoires d’endettement et audit des garanties accordées aux États membres.',
        achievements: [
          'Réduction moyenne de 120 points de base sur 3 émissions souveraines majeures.'
        ]
      }
    ],
    formations: [
      {
        id: 'edu-31',
        degree: 'Master of Science en Finance de Marché & Économétrie',
        fieldOfStudy: 'Mathématiques Financières',
        institution: 'Université Al Akhawayn & HEC Paris',
        location: 'Ifrane, Maroc',
        graduationYear: '2022',
        honors: 'Summa Cum Laude'
      }
    ],
    certification: {
      id: 'cert-03',
      tsfCertificateNumber: 'TSF-CERT-2026-HE-0081',
      programName: 'Horizon Excellence — Haute Gouvernance Financière',
      cohort: 'Promotion Nelson Mandela (2026)',
      grade: 'Grade A — Major de Filière',
      issuingDate: '10 Janvier 2026',
      juryPresident: 'Dr. Donald Kaberuka & Gouverneurs de Banques Centrales',
      cryptographicHash: 'SHA256:8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c',
      verificationUrl: 'https://tsf.africa/certificat/TSF-CERT-2026-HE-0081',
      officialPillarsAudited: [
        'Éthique Financière & Refus des Dérives Spéculatives',
        'Expertise Technique de Niveau Mondial',
        'Posture Républicaine & Intérêt Général Continental'
      ]
    },
    badges: [
      {
        id: 'bdg-31',
        name: 'Major Haute Finance TSF',
        category: 'merite',
        description: 'Classée première lors de l’examen final d’ingénierie financière.',
        iconName: 'TrendingUp',
        obtainedDate: 'Janvier 2026',
        issuingAuthority: 'Comité Scientifique TSF'
      },
      {
        id: 'bdg-32',
        name: 'Intégrité Déontologique',
        category: 'ethique',
        description: 'Engagement solennel d’intégrité financière et audit de non-conflit d’intérêts.',
        iconName: 'Shield',
        obtainedDate: 'Décembre 2025',
        issuingAuthority: 'Comité d’Éthique TSF'
      }
    ],
    opportunites: [
      {
        id: 'opp-match-31',
        title: 'Directeur Général de l’Agence de Gestion de la Dette',
        organization: 'Ministère des Finances — République Fédérale',
        location: 'Abidjan',
        type: 'CDI / Cadre Exécutif',
        deadline: '15 Janvier 2027',
        matchScore: 98,
        compensationOrBudget: 'Poste Régalien de Premier Rang',
        status: 'eligible'
      }
    ],
    journey: [
      {
        stepId: 'profil_cree',
        order: 1,
        label: 'Profil créé',
        tagline: 'Enregistrement',
        dateCompleted: 'Juin 2025',
        status: 'completed',
        summary: 'Création du profil suite à la publication de sa note sur les green bonds.',
        scoreOrKpi: 'Dossier Validé'
      },
      {
        stepId: 'talent_detecte',
        order: 2,
        label: 'Talent détecté',
        tagline: 'Scouting académique',
        dateCompleted: 'Juillet 2025',
        status: 'completed',
        summary: 'Repérée par le hub TSF Afrique du Nord.',
        scoreOrKpi: 'Admissibilité Directe'
      },
      {
        stepId: 'evaluation',
        order: 3,
        label: 'Évaluation',
        tagline: 'Auditions techniques',
        dateCompleted: 'Septembre 2025',
        status: 'completed',
        summary: 'Épreuve d’ingénierie de crise obligataire devant anciens gouverneurs.',
        scoreOrKpi: 'Score 99/100'
      },
      {
        stepId: 'incubation',
        order: 4,
        label: 'Incubation',
        tagline: 'Formation d’élite',
        dateCompleted: 'Décembre 2025',
        status: 'completed',
        summary: 'Cursus accéléré Croissance & Métanoïa et immersion à Kigali.',
        scoreOrKpi: 'Major de Promotion'
      },
      {
        stepId: 'certification',
        order: 5,
        label: 'Certification',
        tagline: 'Délivrance TSF-ID',
        dateCompleted: 'Janvier 2026',
        status: 'completed',
        summary: 'Validation solennelle et signature du serment TSF de loyauté au continent.',
        scoreOrKpi: 'TSF-CERT-2026-HE-0081'
      },
      {
        stepId: 'opportunites',
        order: 6,
        label: 'Opportunités',
        tagline: 'Matching de haut niveau',
        dateCompleted: 'En cours',
        status: 'current',
        summary: 'Instruction en cours pour des mandats de direction de trésorerie d’État.',
        scoreOrKpi: '2 postes régaliens ciblés'
      },
      {
        stepId: 'impact',
        order: 7,
        label: 'Impact',
        tagline: 'Restructuration souveraine',
        status: 'upcoming',
        summary: 'Objectif : économiser 500 millions $ d’intérêts de dette au profit de l’éducation publique.',
        scoreOrKpi: 'Projet d’État en cours'
      }
    ],
    applications: [
      {
        id: 'app-sarah-1',
        programOrOpportunityTitle: 'Horizon Excellence — Cohorte 2026 Haute Gouvernance',
        category: 'Fellowship Élite',
        submittedAt: '10 Août 2025',
        status: 'admis',
        statusLabel: 'Diplômée Major',
        nextStep: 'Parcours certifié',
        trackingNumber: 'APP-2026-HE-081'
      }
    ],
    formationsEnCours: [],
    messages: []
  },
  {
    id: 'talent-marc-aurele',
    nom: 'Dossou',
    prenom: 'Marc-Aurèle',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
    titreProfessionnel: 'Cryptographe Mathématicien & Ingénieur en Systèmes Embarqués Souverains',
    localisation: {
      ville: 'Cotonou',
      pays: 'Bénin',
      region: 'Afrique de l’Ouest',
      mobilitePanafricaine: true
    },
    domaine: 'Algorithmique Avancée, Cybersécurité & Souveraineté Cryptographique',
    domaineSlug: 'crypto-cybersecurite',
    tsfId: {
      id: 'tsf-id-04',
      uniqueId: 'TSF-ID-2023-BEN-0145',
      nationalCode: 'BEN',
      level: 'Niveau II — Praticien Certifié',
      status: 'en_incubation',
      statusLabel: 'En Incubation de Haut Vol',
      skills: ['Cryptographie Post-Quantique', 'Architecture Zero-Knowledge (ZKP)', 'Sécurité des Systèmes Industriels', 'Langages Rust & Assembly'],
      certifications: ['Graines de Champions — Major Olympiades STEM 2023'],
      issuingDate: '18 Décembre 2023',
      cryptographicSignature: '0x1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D',
      blockchainRecordId: 'TSF-ETH-BLK-145021-L2',
      qrPayload: 'https://tsf.africa/verify/TSF-ID-2023-BEN-0145?sig=0x1C2D3E'
    },
    bio: 'Détecté dès l’âge de 17 ans lors des Olympiades Panafricaines Graines de Champions au Bénin. À 21 ans, Marc-Aurèle a conçu une bibliothèque cryptographique post-quantique résistante aux attaques d’ordinateurs quantiques adaptée aux contraintes des microcontrôleurs en Afrique.',
    manifestePersonnel: '« La véritable indépendance politique au XXIe siècle est indissociable de la souveraineté mathématique. Aucun État n’est libre si le chiffrement de ses communications stratégiques dépend de clés étrangères. »',
    disponibilite: {
      statut: 'Préavis 1-3 mois',
      tempsDispo: 'Temps plein',
      preferencesMobilite: ['Cotonou', 'Kigali', 'Nairobi'],
      rechercheActuelle: 'Laboratoire de R&D en souveraineté numérique et sécurité des infrastructures critiques.'
    },
    competences: [
      { id: 'sk-41', name: 'Cryptographie sur Réseaux Euclidiens (Lattice-based Crypto)', category: 'technique', level: 99, endorsedByTsf: true, auditedDate: 'Mai 2025' },
      { id: 'sk-42', name: 'Développement Système Bas Niveau (Rust / C)', category: 'technique', level: 95, endorsedByTsf: true, auditedDate: 'Août 2025' },
      { id: 'sk-43', name: 'Audit de Vulnérabilités & Reverse Engineering', category: 'technique', level: 91, endorsedByTsf: true, auditedDate: 'Octobre 2025' }
    ],
    portfolio: [
      {
        id: 'port-41',
        title: 'OpenLattice-AFR : Protocole de Chiffrement Post-Quantique Ultra-Léger',
        clientOrContext: 'Projet de Recherche Hub TSF Cotonou',
        year: '2025',
        description: 'Implémentation open-source vérifiée formellement d’un algorithme de chiffrement post-quantique consommant 60% moins de mémoire vive que les standards occidentaux.',
        impactMetrics: 'Adopté par 4 agences gouvernementales régionales pour la sécurisation des échanges interministériels.',
        techStackOrDomain: ['Rust', 'Mathematical Formal Verification', 'ARM Cortex-M']
      }
    ],
    realisations: [
      {
        id: 'ach-41',
        title: 'Médaille d’Or — Olympiades Panafricaines Graines de Champions 2023',
        year: '2023',
        organization: 'Secrétariat Général TSF',
        description: 'Vainqueur continental parmi 12 000 lycéens participants dans 18 pays.',
        significance: 'Bourse intégrale d’excellence et tutorat personnalisé par le Comité Scientifique TSF.'
      }
    ],
    experiences: [
      {
        id: 'exp-41',
        role: 'Chercheur Associé en Cryptologie',
        organization: 'Hub d’Excellence TSF Afrique de l’Ouest',
        location: 'Cotonou, Bénin',
        startDate: '2024',
        isCurrent: true,
        description: 'Recherche appliquée sur les protocoles de consensus et chiffrement robuste.',
        achievements: ['Publication de 2 preprints scientifiques de référence.']
      }
    ],
    formations: [
      {
        id: 'edu-41',
        degree: 'Licence Mathématiques Fondamentales & Informatique Théorique',
        fieldOfStudy: 'Algèbre Avancée & Théorie des Nombres',
        institution: 'Institut de Mathématiques et de Sciences Physiques (IMSP)',
        location: 'Dangbo, Bénin',
        graduationYear: '2024',
        honors: 'Félicitations du Jury'
      }
    ],
    certification: {
      id: 'cert-04',
      tsfCertificateNumber: 'TSF-CERT-2023-GC-0012',
      programName: 'Graines de Champions — Excellence Précoce STEM',
      cohort: 'Promotion Cheikh Anta Diop (2023)',
      grade: 'Major Continental — Médaille d’Or',
      issuingDate: '18 Décembre 2023',
      juryPresident: 'Pr. Mary Teuw Niane & Jury International d’Olympiades',
      cryptographicHash: 'SHA256:1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
      verificationUrl: 'https://tsf.africa/certificat/TSF-CERT-2023-GC-0012',
      officialPillarsAudited: [
        'Brillance Cognitive Pure & Rigueur Démonstrative',
        'Créativité Algorithmique Face à des Problèmes Inédits',
        'Humilité Intellectuelle & Esprit de Camaraderie'
      ]
    },
    badges: [
      {
        id: 'bdg-41',
        name: 'Graine d’Or Panafricaine',
        category: 'merite',
        description: 'Plus haut score historique obtenu aux épreuves théoriques d’algorithmique.',
        iconName: 'Medal',
        obtainedDate: 'Décembre 2023',
        issuingAuthority: 'Direction Graines de Champions'
      },
      {
        id: 'bdg-42',
        name: 'Génie Algorithmique 2024',
        category: 'competence',
        description: 'Validation de l’épreuve de cryptanalyse en temps record.',
        iconName: 'Code',
        obtainedDate: 'Juin 2024',
        issuingAuthority: 'Hub Technologique TSF'
      }
    ],
    opportunites: [
      {
        id: 'opp-match-41',
        title: 'Bourse Doctorale Internationale en Cryptologie Souveraine',
        organization: 'Consortium TSF / Universités d’Excellence Partenaires',
        location: 'Kigali / Cotonou',
        type: 'Bourse d’Excellence',
        deadline: '15 Février 2027',
        matchScore: 99,
        compensationOrBudget: 'Prise en charge intégrale à 100% sur 3 ans',
        status: 'eligible'
      }
    ],
    journey: [
      {
        stepId: 'profil_cree',
        order: 1,
        label: 'Profil créé',
        tagline: 'Inscription aux Olympiades',
        dateCompleted: 'Septembre 2023',
        status: 'completed',
        summary: 'Enregistrement via son lycée public de Cotonou.',
        scoreOrKpi: 'Dossier Enregistré'
      },
      {
        stepId: 'talent_detecte',
        order: 2,
        label: 'Talent détecté',
        tagline: 'Épreuves nationales',
        dateCompleted: 'Octobre 2023',
        status: 'completed',
        summary: 'Score parfait de 100/100 lors des éliminatoires nationales du Bénin.',
        scoreOrKpi: '1er National'
      },
      {
        stepId: 'evaluation',
        order: 3,
        label: 'Évaluation',
        tagline: 'Finale continentale',
        dateCompleted: 'Décembre 2023',
        status: 'completed',
        summary: 'Médaille d’or continentale aux Olympiades Graines de Champions.',
        scoreOrKpi: 'Major Continental'
      },
      {
        stepId: 'incubation',
        order: 4,
        label: 'Incubation',
        tagline: 'Accompagnement intensif',
        dateCompleted: 'En cours',
        status: 'current',
        summary: 'Suivi par un tuteur scientifique international et accès aux supercalculateurs TSF.',
        scoreOrKpi: 'Progression 80%'
      },
      {
        stepId: 'certification',
        order: 5,
        label: 'Certification',
        tagline: 'Passage vers Horizon Excellence',
        status: 'upcoming',
        summary: 'Prévu à l’obtention de son Master 2 pour l’intégration au collège de direction.',
        scoreOrKpi: 'Objectif 2027'
      },
      {
        stepId: 'opportunites',
        order: 6,
        label: 'Opportunités',
        tagline: 'Connexion aux labos d’État',
        status: 'upcoming',
        summary: 'Mise en relation avec les agences de sécurité nationale africaines.',
        scoreOrKpi: 'En préparation'
      },
      {
        stepId: 'impact',
        order: 7,
        label: 'Impact',
        tagline: 'Protection des infrastructures critiques',
        status: 'upcoming',
        summary: 'Déploiement continental des protocoles post-quantiques.',
        scoreOrKpi: 'Horizon 2028'
      }
    ],
    applications: [
      {
        id: 'app-marc-1',
        programOrOpportunityTitle: 'Graines de Champions — Olympiades Panafricaines',
        category: 'Compétition & Bourse d’Internat',
        submittedAt: '05 Septembre 2023',
        status: 'admis',
        statusLabel: 'Lauréat Médaille d’Or',
        nextStep: 'Cursus d’immersion en cours',
        trackingNumber: 'GC-2023-BEN-012'
      }
    ],
    formationsEnCours: [
      {
        id: 'marc-mod-1',
        code: 'TSF-CYBER-301',
        title: 'Théorie de l’Information & Résistance aux Cyber-Attaques Étatiques',
        track: 'Filière Souveraineté Numérique',
        instructor: 'Dr. Ousmane Dieng',
        progressPercent: 65,
        durationHours: 35,
        completedHours: 23,
        status: 'en_cours',
        nextSessionDate: '12 Novembre 2026'
      }
    ],
    messages: []
  }
];

// Helper functions for mock data querying and mutations
export function getAllTalents(): TalentProfile[] {
  return SAMPLE_TALENTS_PROFILES;
}

export function getTalentById(id: string): TalentProfile | undefined {
  return SAMPLE_TALENTS_PROFILES.find(t => t.id === id || t.tsfId.uniqueId === id);
}

export function getDefaultTalentProfile(): TalentProfile {
  return SAMPLE_TALENTS_PROFILES[0]; // Dr. Aminata Traoré as standard default
}

export const TALENT_DOMAINS = [
  'Tous les domaines',
  'Intelligence Artificielle & Santé Publique',
  'Énergie Décentralisée, Réseaux Intelligents & Greentech',
  'Haute Finance Stratégique, Dette Souveraine & Green Bonds',
  'Algorithmique Avancée, Cybersécurité & Souveraineté Cryptographique',
  'Gouvernance Publique & Politiques Souveraines',
  'Agro-industrie & Sécurité Alimentaire'
];

export const TALENT_REGIONS = [
  'Toutes les régions',
  'Afrique de l’Ouest',
  'Afrique Centrale',
  'Afrique de l’Est',
  'Afrique du Nord',
  'Afrique Australe',
  'Diaspora Panafricaine'
];
