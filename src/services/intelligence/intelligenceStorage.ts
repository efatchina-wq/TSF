import { 
  WikiJobUserProfile, 
  WikiJobAlert, 
  WikiJobDigest 
} from '../../types/intelligence';
import { NormalizedOpportunity } from '../../types/aggregation';
import { aggregationStorage } from '../aggregation/storage';
import { calculateOpportunityMatch } from './matchingEngine';

const PROFILE_KEY = 'wikijob_user_profile_v1';
const ALERTS_KEY = 'wikijob_alerts_v1';

export class IntelligenceStorage {
  private profile: WikiJobUserProfile | null = null;
  private alerts: WikiJobAlert[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') {
      this.seedDefaults();
      return;
    }

    try {
      const storedProfile = localStorage.getItem(PROFILE_KEY);
      const storedAlerts = localStorage.getItem(ALERTS_KEY);

      if (storedProfile) {
        this.profile = JSON.parse(storedProfile);
      } else {
        this.seedDefaults();
      }

      if (storedAlerts) {
        this.alerts = JSON.parse(storedAlerts);
      }
    } catch (e) {
      console.warn('Failed to parse intelligence storage', e);
      this.seedDefaults();
    }
  }

  private persist() {
    if (typeof window !== 'undefined') {
      try {
        if (this.profile) {
          localStorage.setItem(PROFILE_KEY, JSON.stringify(this.profile));
        }
        localStorage.setItem(ALERTS_KEY, JSON.stringify(this.alerts));
      } catch (e) {
        console.error('Failed to persist intelligence storage', e);
      }
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach(cb => {
      try { cb(); } catch (e) { console.error(e); }
    });
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(c => c !== cb);
    };
  }

  private seedDefaults() {
    this.profile = {
      id: 'prof-demo-bj',
      fullName: 'Aïchatou SOULEYMANE',
      email: 'aichatou.souleymane@tsf.africa',
      secteurs: [
        'Insertion Professionnelle & BTP',
        'Numérique & Technologies',
        'Microfinance & Agriculture',
        'Gestion de Projets & Économie'
      ],
      compétences: [
        'Gestion de projet',
        'Analyse de données',
        'Conseil en insertion',
        'Audit interne',
        'Suivi-évaluation'
      ],
      niveau: 'Junior (1-3 ans)',
      formation: 'BAC+5 (Master/Ingénieur)',
      localisation: 'Cotonou',
      opportunites_recherchees: ['EMPLOI', 'STAGE', 'FORMATION', 'BOURSE', 'FINANCEMENT'],
      mobilité: 'Nationale (Tout le Bénin)',
      remote: 'HYBRID',
      préférences: {
        salaire_min: 150000,
        disponibilite_immediate: true,
        interet_public_uniquement: false,
        mots_cles_favoris: ['Conseiller', 'Auditeur', 'Chef de projet', 'Azoli', 'PSIE']
      },
      updated_at: new Date().toISOString()
    };

    this.alerts = [
      {
        id: 'alt-1',
        title: 'Postes Conseillers & Auditeurs Cotonou',
        alert_type: 'Alerte emploi',
        keywords: ['Conseiller', 'Auditeur', 'Gestionnaire'],
        categories: ['EMPLOI'],
        locations: ['Cotonou', 'Calavi'],
        frequency: 'QUOTIDIEN',
        active: true,
        created_at: '2026-09-25T10:00:00Z',
        last_matched_at: '2026-09-28T09:00:00Z',
        match_count: 5
      },
      {
        id: 'alt-2',
        title: 'Stages Pré-Emploi & Immersion Azoli',
        alert_type: 'Alerte stage',
        keywords: ['Immersion', 'Azoli', 'Stage pro'],
        categories: ['STAGE'],
        locations: ['Tout le Bénin'],
        frequency: 'QUOTIDIEN',
        active: true,
        created_at: '2026-09-24T14:00:00Z',
        last_matched_at: '2026-09-28T09:00:00Z',
        match_count: 3
      },
      {
        id: 'alt-3',
        title: 'Bourses d’Excellence Master International',
        alert_type: 'Alerte bourse',
        keywords: ['Excellence', 'Eiffel', 'Chevening', 'DBS'],
        categories: ['BOURSE'],
        locations: ['International'],
        frequency: 'HEBDOMADAIRE',
        active: true,
        created_at: '2026-09-22T08:00:00Z',
        last_matched_at: '2026-09-27T08:00:00Z',
        match_count: 2
      },
      {
        id: 'alt-4',
        title: 'Guichets FNDA & Microcrédits Alafia',
        alert_type: 'Alerte financement',
        keywords: ['Subvention', 'Crédit bonifié', 'FNM', 'FNDA'],
        categories: ['FINANCEMENT', 'ENTREPRENEURIAT'],
        locations: ['Tout le Bénin'],
        frequency: 'HEBDOMADAIRE',
        active: true,
        created_at: '2026-09-20T11:00:00Z',
        last_matched_at: '2026-09-28T09:00:00Z',
        match_count: 4
      }
    ];

    this.persist();
  }

  // Profile Methods
  public getProfile(): WikiJobUserProfile | null {
    return this.profile ? { ...this.profile } : null;
  }

  public saveProfile(profile: WikiJobUserProfile): WikiJobUserProfile {
    this.profile = {
      ...profile,
      updated_at: new Date().toISOString()
    };
    this.persist();
    return this.profile;
  }

  // Alerts Methods
  public getAlerts(): WikiJobAlert[] {
    return [...this.alerts];
  }

  public addAlert(alert: Omit<WikiJobAlert, 'id' | 'created_at' | 'last_matched_at' | 'match_count'>): WikiJobAlert {
    const newAlert: WikiJobAlert = {
      ...alert,
      id: `alt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      created_at: new Date().toISOString(),
      last_matched_at: null,
      match_count: 0
    };
    this.alerts.unshift(newAlert);
    this.persist();
    return newAlert;
  }

  public updateAlert(id: string, updates: Partial<WikiJobAlert>): WikiJobAlert {
    const idx = this.alerts.findIndex(a => a.id === id);
    if (idx === -1) throw new Error('Alerte introuvable');
    this.alerts[idx] = { ...this.alerts[idx], ...updates };
    this.persist();
    return this.alerts[idx];
  }

  public deleteAlert(id: string): void {
    this.alerts = this.alerts.filter(a => a.id !== id);
    this.persist();
  }

  public toggleAlert(id: string): WikiJobAlert {
    const idx = this.alerts.findIndex(a => a.id === id);
    if (idx === -1) throw new Error('Alerte introuvable');
    this.alerts[idx].active = !this.alerts[idx].active;
    this.persist();
    return this.alerts[idx];
  }

  // Digest Generators
  public generateDailyDigest(): WikiJobDigest {
    const allOpps = aggregationStorage.getOpportunities().filter(o => o.status !== 'EXPIRED');
    const profile = this.getProfile();

    // Score all opportunities
    const scored = allOpps.map(opp => ({
      opportunity: opp,
      match_score: calculateOpportunityMatch(opp, profile).score
    }));

    // Sort by match score descending
    scored.sort((a, b) => b.match_score - a.match_score);
    const topMatched = scored.slice(0, 7);

    // Urgent deadlines (<7 days)
    const urgent = allOpps.filter(o => o.status === 'EXPIRING_SOON').slice(0, 3);

    return {
      type: 'WIKIJOB_DAILY',
      headline: 'WIKIJOB DAILY',
      subtitle: `${topMatched.length} opportunités prioritaires correspondent à vos critères aujourd'hui.`,
      period_label: 'Édition Quotidienne du 29 Septembre 2026',
      generated_at: new Date().toISOString(),
      matched_count: topMatched.length,
      opportunities: topMatched,
      urgent_deadlines: urgent,
      sector_insights: [
        'Recrutements massifs confirmés à la GDIZ Glo-Djigbé (secteur textile & logistique).',
        'Ouverture prochaine de la nouvelle cohorte PSIE pour les titulaires de Master.'
      ]
    };
  }

  public generateWeeklyDigest(): WikiJobDigest {
    const allOpps = aggregationStorage.getOpportunities();
    const profile = this.getProfile();

    const scored = allOpps.map(opp => ({
      opportunity: opp,
      match_score: calculateOpportunityMatch(opp, profile).score
    }));

    scored.sort((a, b) => b.match_score - a.match_score);
    const topWeek = scored.slice(0, 10);
    const urgentWeek = allOpps.filter(o => o.status === 'EXPIRING_SOON');

    return {
      type: 'WIKIJOB_WEEKLY',
      headline: 'WIKIJOB WEEKLY',
      subtitle: 'Le condensé stratégique des appels à candidatures de la semaine au Bénin.',
      period_label: 'Semaine 39 • Du 22 au 29 Septembre 2026',
      generated_at: new Date().toISOString(),
      matched_count: topWeek.length,
      opportunities: topWeek,
      urgent_deadlines: urgentWeek,
      sector_insights: [
        'Le FNDA a clôturé son guichet 3 et bascule en phase d’instruction technique.',
        'La DBS Bénin rappelle que les bourses de coopération exigent la légalisation des relevés de notes.',
        'Les PME labellisées ADPME proposent 34 nouveaux postes via les guichets régionaux.'
      ]
    };
  }

  public resetToDefaults(): void {
    this.seedDefaults();
  }
}

export const intelligenceStorage = new IntelligenceStorage();
