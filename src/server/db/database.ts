import fs from 'node:fs';
import path from 'node:path';
import {
  User, Profile, Talent, TalentSkill, TalentProject, Program, ProgramApplication,
  Certification, CertificationVerification, Organization, Partner, Opportunity,
  OpportunityApplication, OpportunityAlert, Resource, Article, Media, Document,
  Event, Notification, Message, ImpactMetric, Source, SourceItem, SyncJob, AuditLog
} from '../types/models';

export interface DatabaseState {
  users: User[];
  profiles: Profile[];
  talents: Talent[];
  talent_skills: TalentSkill[];
  talent_projects: TalentProject[];
  programs: Program[];
  program_applications: ProgramApplication[];
  certifications: Certification[];
  certification_verifications: CertificationVerification[];
  organizations: Organization[];
  partners: Partner[];
  opportunities: Opportunity[];
  opportunity_applications: OpportunityApplication[];
  opportunity_alerts: OpportunityAlert[];
  resources: Resource[];
  articles: Article[];
  media: Media[];
  documents: Document[];
  events: Event[];
  notifications: Notification[];
  messages: Message[];
  impact_metrics: ImpactMetric[];
  sources: Source[];
  source_items: SourceItem[];
  sync_jobs: SyncJob[];
  audit_logs: AuditLog[];
}

export class Database {
  private state: DatabaseState;
  private persistenceFile: string;

  constructor() {
    this.persistenceFile = path.resolve(process.cwd(), 'data', 'tsf_database.json');
    this.state = this.getInitialState();
    this.init();
  }

  private getInitialState(): DatabaseState {
    const now = new Date().toISOString();

    const users: User[] = [
      {
        id: 'usr-super-admin',
        email: 'direction@tsf.africa',
        password_hash: '$2b$10$hashed_super_admin_tsf_pass_2026',
        role: 'SUPER_ADMIN',
        auth_provider: 'LOCAL',
        email_verified: true,
        email_verified_at: '2026-01-01T00:00:00Z',
        two_factor_enabled: true,
        status: 'ACTIVE',
        last_login_at: now,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: now
      },
      {
        id: 'usr-admin-ops',
        email: 'admin.ops@tsf.africa',
        password_hash: '$2b$10$hashed_admin_ops_pass_2026',
        role: 'ADMIN',
        auth_provider: 'LOCAL',
        email_verified: true,
        email_verified_at: '2026-01-15T00:00:00Z',
        two_factor_enabled: false,
        status: 'ACTIVE',
        last_login_at: now,
        created_at: '2026-01-15T00:00:00Z',
        updated_at: now
      },
      {
        id: 'usr-prog-manager',
        email: 'programmes@tsf.africa',
        password_hash: '$2b$10$hashed_prog_mgr_pass_2026',
        role: 'PROGRAM_MANAGER',
        auth_provider: 'LOCAL',
        email_verified: true,
        email_verified_at: '2026-02-01T00:00:00Z',
        two_factor_enabled: false,
        status: 'ACTIVE',
        last_login_at: now,
        created_at: '2026-02-01T00:00:00Z',
        updated_at: now
      },
      {
        id: 'usr-talent-01',
        email: 'aichatou.souleymane@tsf.africa',
        password_hash: '$2b$10$hashed_talent_pass_2026',
        role: 'TALENT',
        auth_provider: 'LOCAL',
        email_verified: true,
        email_verified_at: '2026-03-01T00:00:00Z',
        two_factor_enabled: false,
        status: 'ACTIVE',
        last_login_at: now,
        created_at: '2026-03-01T00:00:00Z',
        updated_at: now
      }
    ];

    const profiles: Profile[] = [
      {
        id: 'prf-super-admin',
        user_id: 'usr-super-admin',
        first_name: 'Direction',
        last_name: 'Générale TSF',
        phone: '+229 21 30 00 01',
        avatar_url: '/assets/avatars/admin.jpg',
        bio: 'Direction exécutive de Talents Sans Frontières.',
        country: 'Bénin',
        city: 'Cotonou',
        address: 'Boulevard Saint-Michel, Immeuble TSF Hub',
        locale: 'fr_FR',
        created_at: '2026-01-01T00:00:00Z',
        updated_at: now
      },
      {
        id: 'prf-talent-01',
        user_id: 'usr-talent-01',
        first_name: 'Aïchatou',
        last_name: 'SOULEYMANE',
        phone: '+229 97 00 12 34',
        avatar_url: '/assets/avatars/talent-1.jpg',
        bio: 'Ingénieure en systèmes financiers et audit des projets de développement.',
        country: 'Bénin',
        city: 'Cotonou',
        address: 'Quartier Haie Vive',
        locale: 'fr_FR',
        created_at: '2026-03-01T00:00:00Z',
        updated_at: now
      }
    ];

    const talents: Talent[] = [
      {
        id: 'tal-01',
        user_id: 'usr-talent-01',
        code_unique: 'TSF-BJ-2026-0042',
        headline: 'Consultante Audit & Gestion de Projets d’Insertion',
        experience_level: 'Junior (1-3 ans)',
        highest_degree: 'BAC+5 (Master / Ingénieur)',
        current_organization: 'SICA ANPE Bénin (Programme PSIE)',
        years_of_experience: 2,
        open_to_relocation: true,
        open_to_remote: true,
        preferred_work_modes: ['HYBRID', 'REMOTE'],
        certification_status: 'ARGENT',
        certification_id: 'cert-2026-001',
        visibility: 'PUBLIC',
        created_at: '2026-03-01T00:00:00Z',
        updated_at: now
      }
    ];

    const talent_skills: TalentSkill[] = [
      { id: 'tsk-1', talent_id: 'tal-01', skill_name: 'Audit interne', category: 'HARD', level: 'ADVANCED', verified_by_tsf: true },
      { id: 'tsk-2', talent_id: 'tal-01', skill_name: 'Gestion de projet', category: 'HARD', level: 'EXPERT', verified_by_tsf: true },
      { id: 'tsk-3', talent_id: 'tal-01', skill_name: 'Analyse de données', category: 'TOOL', level: 'INTERMEDIATE', verified_by_tsf: true }
    ];

    const talent_projects: TalentProject[] = [
      {
        id: 'tp-1',
        talent_id: 'tal-01',
        title: 'Mise en place du tableau de bord d’insertion AZOLI',
        description: 'Conception d’un pipeline de suivi des jeunes bénéficiaires en immersion professionnelle.',
        role: 'Cheffe de projet junior',
        project_url: 'https://tsf.africa/projets/azoli-dashboard',
        media_url: null,
        start_date: '2026-01-10',
        end_date: '2026-06-30'
      }
    ];

    const programs: Program[] = [
      {
        id: 'prg-propulsion-2026',
        slug: 'propulsion-afrique-2026',
        title: 'Programme Propulsion Afrique — Cohorte Élite 2026',
        description: 'Accélération intensive de 16 semaines pour 100 jeunes bâtisseurs panafricains.',
        pillar: 'PROPULSION',
        target_audience: 'Jeunes diplômés BAC+3 à BAC+5 et porteurs de solutions',
        duration_weeks: 16,
        capacity: 100,
        status: 'OPEN_FOR_APPLICATIONS',
        start_date: '2026-10-15',
        end_date: '2027-02-15',
        application_deadline: '2026-10-05',
        manager_id: 'usr-prog-manager',
        created_at: '2026-08-01T00:00:00Z',
        updated_at: now
      }
    ];

    const program_applications: ProgramApplication[] = [
      {
        id: 'papp-01',
        program_id: 'prg-propulsion-2026',
        user_id: 'usr-talent-01',
        status: 'UNDER_REVIEW',
        submitted_at: '2026-09-15T12:00:00Z',
        motivation_statement: 'Désireuse d’approfondir mon leadership dans l’audit des politiques publiques béninoises.',
        reviewer_id: 'usr-prog-manager',
        review_notes: 'Dossier académique remarquable. En attente de l’entretien final.',
        score: 88,
        selection_decision_at: null,
        progress_percentage: 15,
        completion_status: 'IN_PROGRESS',
        certificate_issued: false
      }
    ];

    const certifications: Certification[] = [
      {
        id: 'cert-2026-001',
        serial_number: 'TSF-CERT-2026-B819',
        user_id: 'usr-talent-01',
        talent_id: 'tal-01',
        level: 'ARGENT',
        domain: 'Audit & Gestion de Projets Numériques',
        evaluator_id: 'usr-prog-manager',
        evaluation_score: 88.5,
        status: 'VALID',
        issued_at: '2026-06-15T00:00:00Z',
        expires_at: '2028-06-15T00:00:00Z',
        revocation_reason: null,
        digital_signature: 'sig_ed25519_tsf_valid_8891024_bj',
        qr_code_url: 'https://tsf.africa/certification/verify?serial=TSF-CERT-2026-B819'
      }
    ];

    const certification_verifications: CertificationVerification[] = [
      {
        id: 'verif-01',
        certification_id: 'cert-2026-001',
        verifier_user_id: null,
        verifier_organization: 'Banque Ouest Africaine de Développement (BOAD)',
        verifier_ip: '41.85.160.12',
        verified_at: '2026-08-20T10:15:00Z',
        is_valid: true
      }
    ];

    const organizations: Organization[] = [
      {
        id: 'org-anpe',
        name: 'Agence Nationale Pour l’Emploi (ANPE Bénin)',
        legal_type: 'PUBLIC',
        country: 'Bénin',
        website: 'https://anpe.bj',
        logo_url: '/assets/logos/anpe.png',
        description: 'Organisme public autonome de régulation et promotion de l’emploi.',
        verified: true,
        created_at: '2026-01-01T00:00:00Z'
      },
      {
        id: 'org-adpme',
        name: 'Agence de Développement des PME (ADPME)',
        legal_type: 'PUBLIC',
        country: 'Bénin',
        website: 'https://adpme.bj',
        logo_url: '/assets/logos/adpme.png',
        description: 'Guichet unique étatique pour la promotion et l’accompagnement des PME.',
        verified: true,
        created_at: '2026-01-01T00:00:00Z'
      }
    ];

    const partners: Partner[] = [
      {
        id: 'part-01',
        organization_id: 'org-anpe',
        contact_user_id: 'usr-admin-ops',
        tier: 'STRATEGIC',
        mou_signed_at: '2026-01-10T00:00:00Z',
        mou_expires_at: '2029-01-10T00:00:00Z',
        status: 'ACTIVE',
        assigned_programs: ['prg-propulsion-2026']
      }
    ];

    const opportunities: Opportunity[] = [
      {
        id: 'opp-anpe-01',
        source_id: 'src-anpe-sica',
        source_item_id: 'item-anpe-01',
        organization_id: 'org-anpe',
        title: 'Conseillers en Insertion Professionnelle et Bilan de Compétences',
        slug: 'conseillers-insertion-professionnelle-anpe-2026',
        category: 'EMPLOI',
        description: 'Recrutement national pour les antennes communales de l’ANPE dans les 12 départements du Bénin.',
        organization_name: 'SICA ANPE Bénin',
        sector: 'Insertion Professionnelle & BTP',
        country: 'Bénin',
        city: 'Cotonou',
        remote: 'ON_SITE',
        experience_level: 'Junior (1-3 ans)',
        education_level: 'BAC+3 (Licence)',
        contract_type: 'CDI / Convention État',
        salary: '250.000 - 350.000 FCFA',
        application_url: 'https://anpe.bj/offres/detail/CIP-2026-09',
        source_url: 'https://anpe.bj/offres/detail/CIP-2026-09',
        published_at: '2026-09-25T10:00:00Z',
        deadline: '2026-10-25',
        status: 'ACTIVE',
        verification_status: 'VERIFIED',
        created_at: '2026-09-25T10:00:00Z',
        updated_at: now
      },
      {
        id: 'opp-psie-01',
        source_id: 'src-psie-benin',
        source_item_id: 'item-psie-01',
        organization_id: null,
        title: 'Auditeurs Internes Juniors & Contrôleurs de Gestion',
        slug: 'auditeurs-internes-juniors-psie-2026',
        category: 'EMPLOI',
        description: 'Prise en charge salariale 100% par l’État pour déploiement dans le réseau bancaire béninois.',
        organization_name: 'PSIE Bénin',
        sector: 'Banque, Assurance & Finance',
        country: 'Bénin',
        city: 'Cotonou',
        remote: 'HYBRID',
        experience_level: 'Tous profils',
        education_level: 'BAC+5 (Master/Ingénieur)',
        contract_type: 'Convention PSIE 24 mois',
        salary: 'Grille d’État PSIE (BAC+5)',
        application_url: 'https://psie.bj/postuler/fin-2026-419',
        source_url: 'https://psie.bj/postuler/fin-2026-419',
        published_at: '2026-09-26T08:00:00Z',
        deadline: '2026-10-30',
        status: 'ACTIVE',
        verification_status: 'VERIFIED',
        created_at: '2026-09-26T08:00:00Z',
        updated_at: now
      }
    ];

    const opportunity_applications: OpportunityApplication[] = [
      {
        id: 'oapp-01',
        opportunity_id: 'opp-anpe-01',
        user_id: 'usr-talent-01',
        cv_document_id: 'doc-cv-01',
        cover_letter: 'Candidature spontanée pour le poste de conseillère en insertion.',
        status: 'SUBMITTED',
        applied_at: '2026-09-26T14:30:00Z',
        updated_at: now
      }
    ];

    const opportunity_alerts: OpportunityAlert[] = [
      {
        id: 'oalt-01',
        user_id: 'usr-talent-01',
        title: 'Veille Audit & Conseil Cotonou',
        alert_type: 'Alerte emploi',
        keywords: ['Conseiller', 'Audit', 'PSIE'],
        categories: ['EMPLOI'],
        locations: ['Cotonou'],
        frequency: 'QUOTIDIEN',
        active: true,
        created_at: '2026-09-20T00:00:00Z'
      }
    ];

    const resources: Resource[] = [
      {
        id: 'res-50-sites',
        slug: '50-sites-pour-trouver-un-emploi-au-benin',
        title: '50 sites pour trouver un emploi au Bénin',
        category: 'EMPLOI',
        content_type: 'DOSSIER',
        summary: 'Panorama complet des plateformes publiques et cabinets de recrutement.',
        source_name: 'Observatoire TSF',
        source_url: 'https://tsf.africa/observatoire',
        is_tsf_original: true,
        author: 'Comité Éditorial TSF',
        published_at: '2026-09-20T08:00:00Z',
        updated_at: now,
        tags: ['Emploi', 'Bénin', 'Recrutement'],
        content: 'Contenu complet du guide...',
        status: 'PUBLISHED'
      }
    ];

    const articles: Article[] = [
      {
        id: 'art-01',
        slug: 'metanoia-renaissance-jeunesse-africaine',
        title: 'La Métanoïa : Transformer le potentiel en excellence concrète',
        category: 'GOUVERNANCE',
        summary: 'Manifeste de Talents Sans Frontières pour une formation alignée sur les besoins réels.',
        content: 'Article de fond sur la vision africaine...',
        author_id: 'usr-super-admin',
        published_at: '2026-09-01T00:00:00Z',
        status: 'PUBLISHED',
        cover_image_url: '/assets/media/article-cover.jpg',
        views_count: 1420
      }
    ];

    const media: Media[] = [
      {
        id: 'med-cv-01',
        uploader_id: 'usr-talent-01',
        filename: 'CV_Aichatou_Souleymane_2026.pdf',
        mime_type: 'application/pdf',
        size_bytes: 420500,
        storage_driver: 'local',
        storage_key: 'vault/cv/usr-talent-01-cv-2026.pdf',
        public_url: '/api/media/med-cv-01/download',
        access_level: 'RESTRICTED',
        created_at: '2026-09-15T00:00:00Z'
      }
    ];

    const documents: Document[] = [
      {
        id: 'doc-cv-01',
        owner_id: 'usr-talent-01',
        document_type: 'CV',
        title: 'CV Certifié ATS — Aïchatou SOULEYMANE',
        file_media_id: 'med-cv-01',
        status: 'ACTIVE',
        created_at: '2026-09-15T00:00:00Z'
      }
    ];

    const events: Event[] = [
      {
        id: 'evt-01',
        title: 'Masterclass TSF : Réussir son Entretien d’Embauche dans les Grands Groupes',
        slug: 'masterclass-entretien-embauche-2026',
        event_type: 'WEBINAR',
        start_time: '2026-10-10T15:00:00Z',
        end_time: '2026-10-10T17:00:00Z',
        location: 'En ligne (Google Meet)',
        is_virtual: true,
        virtual_url: 'https://meet.google.com/tsf-masterclass',
        max_attendees: 500,
        status: 'SCHEDULED'
      }
    ];

    const notifications: Notification[] = [
      {
        id: 'notif-01',
        user_id: 'usr-talent-01',
        type: 'NEW_OPPORTUNITY',
        title: 'Nouvelle opportunité correspondante (Match 92%)',
        message: 'L’ANPE vient de publier un poste de Conseillère en insertion à Cotonou.',
        data: { opportunity_id: 'opp-anpe-01' },
        read: false,
        read_at: null,
        channel: 'BOTH',
        created_at: '2026-09-28T09:00:00Z'
      }
    ];

    const messages: Message[] = [
      {
        id: 'msg-01',
        sender_id: 'usr-prog-manager',
        receiver_id: 'usr-talent-01',
        subject: 'Confirmation de candidature Propulsion Afrique',
        content: 'Votre dossier a passé le premier filtre avec succès. Votre entretien aura lieu le 5 octobre.',
        read: true,
        sent_at: '2026-09-27T16:00:00Z'
      }
    ];

    const impact_metrics: ImpactMetric[] = [
      { id: 'imp-1', metric_key: 'talents_certified', label: 'Talents Certifiés TSF', value: 4850, unit: 'personnes', period: '2026-Q3', recorded_at: now },
      { id: 'imp-2', metric_key: 'opportunities_aggregated', label: 'Opportunités agrégées', value: 1240, unit: 'offres', period: '2026-Q3', recorded_at: now },
      { id: 'imp-3', metric_key: 'placement_rate', label: 'Taux d’insertion à 6 mois', value: 89.4, unit: '%', period: '2026-Q3', recorded_at: now }
    ];

    const sources: Source[] = [
      {
        id: 'src-anpe-sica',
        slug: 'sica-anpe-benin',
        name: 'SICA ANPE Bénin',
        operator_name: 'Agence Nationale Pour l’Emploi',
        country: 'Bénin',
        website: 'https://anpe.bj',
        source_type: 'OFFICIAL_PORTAL',
        active: true,
        sync_frequency_hours: 24,
        last_checked_at: '2026-09-28T09:30:00Z',
        last_success_at: '2026-09-28T09:30:00Z',
        last_error_at: null,
        sync_status: 'SUCCESS'
      },
      {
        id: 'src-psie-benin',
        slug: 'psie-benin',
        name: 'PSIE Bénin',
        operator_name: 'Présidence de la République du Bénin',
        country: 'Bénin',
        website: 'https://psie.bj',
        source_type: 'OFFICIAL_PORTAL',
        active: true,
        sync_frequency_hours: 24,
        last_checked_at: '2026-09-28T09:30:00Z',
        last_success_at: '2026-09-28T09:30:00Z',
        last_error_at: null,
        sync_status: 'SUCCESS'
      }
    ];

    const source_items: SourceItem[] = [
      {
        id: 'item-anpe-01',
        source_id: 'src-anpe-sica',
        external_id: 'CIP-2026-09',
        url: 'https://anpe.bj/offres/detail/CIP-2026-09',
        raw_title: 'Conseillers en Insertion Professionnelle et Bilan de Compétences',
        raw_content: 'Avis officiel ANPE...',
        raw_html: '<p>Avis officiel</p>',
        published_at: '2026-09-25T10:00:00Z',
        collected_at: '2026-09-28T09:00:00Z',
        content_hash: 'hash-cip-2026-09',
        status: 'NORMALIZED'
      }
    ];

    const sync_jobs: SyncJob[] = [
      {
        id: 'job-daily-20260928',
        source_id: 'ALL',
        job_type: 'daily_sync',
        started_at: '2026-09-28T09:00:00Z',
        completed_at: '2026-09-28T09:04:12Z',
        status: 'SUCCESS',
        items_found: 18,
        items_created: 4,
        items_updated: 12,
        items_duplicates: 2,
        items_rejected: 0,
        error_message: null,
        retry_count: 0,
        duration_ms: 252000
      }
    ];

    const audit_logs: AuditLog[] = [
      {
        id: 'aud-01',
        user_id: 'usr-super-admin',
        action: 'SYSTEM_BOOT',
        resource: 'SERVER',
        resource_id: 'srv-01',
        ip_address: '127.0.0.1',
        user_agent: 'TSF Engine Service',
        timestamp: '2026-01-01T00:00:00Z',
        metadata: { status: 'INITIALIZED', models_count: 24 }
      }
    ];

    return {
      users,
      profiles,
      talents,
      talent_skills,
      talent_projects,
      programs,
      program_applications,
      certifications,
      certification_verifications,
      organizations,
      partners,
      opportunities,
      opportunity_applications,
      opportunity_alerts,
      resources,
      articles,
      media,
      documents,
      events,
      notifications,
      messages,
      impact_metrics,
      sources,
      source_items,
      sync_jobs,
      audit_logs
    };
  }

  private init() {
    try {
      if (fs.existsSync(this.persistenceFile)) {
        const raw = fs.readFileSync(this.persistenceFile, 'utf8');
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          this.state = { ...this.getInitialState(), ...parsed };
        }
      } else {
        this.saveToDisk();
      }
    } catch (e) {
      // In-memory fallback if filesystem restricted
      console.warn('[Database] Using memory store fallback:', (e as Error).message);
    }
  }

  public saveToDisk() {
    try {
      const dir = path.dirname(this.persistenceFile);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.persistenceFile, JSON.stringify(this.state, null, 2), 'utf8');
    } catch (e) {
      // Quiet fail if sandbox restricts filesystem
    }
  }

  // Generic Repository Access
  public getTable<K extends keyof DatabaseState>(table: K): DatabaseState[K] {
    return this.state[table];
  }

  public find<K extends keyof DatabaseState>(
    table: K,
    predicate?: (item: DatabaseState[K][number]) => boolean
  ): DatabaseState[K] {
    const list = this.state[table] as any[];
    if (!predicate) return [...list] as any;
    return list.filter(predicate) as any;
  }

  public findById<K extends keyof DatabaseState>(
    table: K,
    id: string
  ): DatabaseState[K][number] | null {
    const list = this.state[table] as any[];
    const item = list.find(x => x.id === id);
    return item ? { ...item } : null;
  }

  public insert<K extends keyof DatabaseState>(
    table: K,
    record: DatabaseState[K][number]
  ): DatabaseState[K][number] {
    const list = this.state[table] as any[];
    list.unshift(record);
    this.saveToDisk();
    return record;
  }

  public update<K extends keyof DatabaseState>(
    table: K,
    id: string,
    updates: Partial<DatabaseState[K][number]>
  ): DatabaseState[K][number] | null {
    const list = this.state[table] as any[];
    const idx = list.findIndex(x => x.id === id);
    if (idx === -1) return null;

    const updated = {
      ...list[idx],
      ...updates,
      ...(updates.hasOwnProperty('updated_at') ? {} : { updated_at: new Date().toISOString() })
    };
    list[idx] = updated;
    this.saveToDisk();
    return updated;
  }

  public delete<K extends keyof DatabaseState>(table: K, id: string): boolean {
    const list = this.state[table] as any[];
    const initialLen = list.length;
    this.state[table] = list.filter(x => x.id !== id) as any;
    const removed = (this.state[table] as any[]).length < initialLen;
    if (removed) this.saveToDisk();
    return removed;
  }

  public count<K extends keyof DatabaseState>(table: K): number {
    return (this.state[table] as any[]).length;
  }

  public exportFullDump(): DatabaseState {
    return JSON.parse(JSON.stringify(this.state));
  }

  public importDump(dump: Partial<DatabaseState>): void {
    this.state = { ...this.getInitialState(), ...dump };
    this.saveToDisk();
  }

  public getTelemetry() {
    const counts: Record<string, number> = {};
    for (const key of Object.keys(this.state) as Array<keyof DatabaseState>) {
      counts[key] = (this.state[key] as any[]).length;
    }
    return {
      total_tables: Object.keys(this.state).length,
      counts,
      persisted_file: this.persistenceFile,
      last_check: new Date().toISOString()
    };
  }
}

export const db = new Database();
