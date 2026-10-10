import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Container } from '../../components/ui/Container';
import { useWikiJobIntelligence } from '../../hooks/useWikiJobIntelligence';
import { useRouter } from '../../hooks/useRouter';
import { 
  WikiJobUserProfile, 
  ExperienceLevel, 
  EducationLevel, 
  MobilityScope, 
  WorkMode,
  AlertType,
  AlertFrequency,
  OpportunityMatchResult,
  AiOpportunityAnalysis
} from '../../types/intelligence';
import { WikiJobOpportunityCategory } from '../../types/aggregation';
import { 
  Sparkles, 
  UserCheck, 
  Bell, 
  Mail, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  ExternalLink, 
  Search, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Bookmark,
  Calendar,
  Layers,
  Award
} from 'lucide-react';

const ALL_CATEGORIES: WikiJobOpportunityCategory[] = [
  'EMPLOI',
  'STAGE',
  'VOLONTARIAT',
  'FORMATION',
  'ENTREPRENEURIAT',
  'FINANCEMENT',
  'BOURSE',
  'CONCOURS',
  'APPEL À PROJETS',
  'AUTRE'
];

const SECTORS_LIST = [
  'Insertion Professionnelle & BTP',
  'Numérique & Technologies',
  'Microfinance & Agriculture',
  'Gestion de Projets & Économie',
  'Banque, Assurance & Finance',
  'Santé & Sciences Médicales',
  'Éducation & Enseignement Supérieur',
  'Gouvernance & Droit Public',
  'Industrie & Logistique (GDIZ)'
];

export const WikiJobIntelligencePage: React.FC = () => {
  const {
    profile,
    saveProfile,
    getMatch,
    recommendationsForYou,
    newOpportunities,
    yourDomainsOpportunities,
    urgentDeadlineOpportunities,
    alerts,
    addAlert,
    deleteAlert,
    toggleAlert,
    getDailyDigest,
    getWeeklyDigest,
    runAiAnalysis,
    resetDefaults
  } = useWikiJobIntelligence();

  const { navigate } = useRouter();

  // Active top-level tab
  const [activeTab, setActiveTab] = useState<'recs' | 'profile' | 'alerts' | 'digests' | 'ai_lab'>('recs');
  // Sub-feed inside recommendations
  const [activeRecFeed, setActiveRecFeed] = useState<'for_you' | 'new' | 'domains' | 'urgent'>('for_you');

  // Feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Inspecting Match Modal
  const [inspectingMatch, setInspectingMatch] = useState<{
    oppTitle: string;
    match: OpportunityMatchResult;
  } | null>(null);

  // Profile Form state
  const [profileForm, setProfileForm] = useState<WikiJobUserProfile>(() => profile || {
    id: 'prof-user',
    fullName: 'Candidat Bénin',
    email: 'candidat@tsf.africa',
    secteurs: ['Numérique & Technologies'],
    compétences: ['Gestion de projet'],
    niveau: 'Junior (1-3 ans)',
    formation: 'BAC+5 (Master/Ingénieur)',
    localisation: 'Cotonou',
    opportunites_recherchees: ['EMPLOI', 'STAGE'],
    mobilité: 'Nationale (Tout le Bénin)',
    remote: 'HYBRID',
    préférences: {
      salaire_min: 150000,
      disponibilite_immediate: true,
      interet_public_uniquement: false,
      mots_cles_favoris: ['Conseiller', 'Chef de projet']
    },
    updated_at: new Date().toISOString()
  });

  const [newSkillInput, setNewSkillInput] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(profileForm);
    showToast('Profil d’intelligence mis à jour. Indices de correspondance recalculés !');
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !profileForm.compétences.includes(newSkillInput.trim())) {
      setProfileForm({
        ...profileForm,
        compétences: [...profileForm.compétences, newSkillInput.trim()]
      });
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setProfileForm({
      ...profileForm,
      compétences: profileForm.compétences.filter(s => s !== skill)
    });
  };

  const toggleSector = (sector: string) => {
    const exists = profileForm.secteurs.includes(sector);
    setProfileForm({
      ...profileForm,
      secteurs: exists 
        ? profileForm.secteurs.filter(s => s !== sector)
        : [...profileForm.secteurs, sector]
    });
  };

  const toggleCategory = (cat: WikiJobOpportunityCategory) => {
    const exists = profileForm.opportunites_recherchees.includes(cat);
    setProfileForm({
      ...profileForm,
      opportunites_recherchees: exists
        ? profileForm.opportunites_recherchees.filter(c => c !== cat)
        : [...profileForm.opportunites_recherchees, cat]
    });
  };

  // Alert Creation Modal
  const [isNewAlertOpen, setIsNewAlertOpen] = useState(false);
  const [newAlertData, setNewAlertData] = useState<{
    title: string;
    alert_type: AlertType;
    keywords: string;
    categories: WikiJobOpportunityCategory[];
    location: string;
    frequency: AlertFrequency;
  }>({
    title: 'Nouvelle veille ciblée',
    alert_type: 'Alerte emploi',
    keywords: 'Conseiller, Cotonou',
    categories: ['EMPLOI'],
    location: 'Cotonou',
    frequency: 'QUOTIDIEN'
  });

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    addAlert({
      title: newAlertData.title,
      alert_type: newAlertData.alert_type,
      keywords: newAlertData.keywords.split(',').map(s => s.trim()).filter(Boolean),
      categories: newAlertData.categories,
      locations: [newAlertData.location],
      frequency: newAlertData.frequency,
      active: true
    });
    setIsNewAlertOpen(false);
    showToast(`Alerte « ${newAlertData.title} » activée !`);
  };

  // AI Extraction demo state
  const [aiDemoRunning, setAiDemoRunning] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<AiOpportunityAnalysis | null>(null);

  const handleRunAiDemo = async () => {
    setAiDemoRunning(true);
    try {
      const demoItem = {
        id: 'raw-demo-anpe-azoli',
        source_id: 'src-azoli-benin',
        external_id: 'AZOLI-GDIZ-2026',
        url: 'https://anpe.bj/azoli/gdiz-operateurs',
        raw_title: 'Avis de Sélection : 250 Opérateurs en Confection Textile et Contrôle Qualité à la GDIZ',
        raw_content: 'L’Agence Nationale Pour l’Emploi (ANPE) et la SIPI-Bénin recrutent dans le cadre du projet AZOLI 250 jeunes (18 à 30 ans) pour le parc textile de la GDIZ Glo-Djigbé. Formation accélérée prise en charge, allocation de transport mensuelle de 60.000 FCFA. Profil requis : Savoir lire et écrire le français, rigueur, aptitude au travail en équipe. Dépôt des dossiers physique ou en ligne avant le 2026-10-31.',
        raw_html: '<p>Avis officiel AZOLI</p>',
        published_at: '2026-09-27T08:00:00Z',
        collected_at: '2026-09-28T10:00:00Z',
        content_hash: 'hash-azoli-demo-99',
        status: 'COLLECTED' as any
      };

      const result = await runAiAnalysis(demoItem);
      setAiAnalysisResult(result);
      showToast('Analyse IA achevée : Données originales scellées et métadonnées extraites.');
    } finally {
      setAiDemoRunning(false);
    }
  };

  // Current active recs list
  const activeRecList = 
    activeRecFeed === 'for_you' ? recommendationsForYou :
    activeRecFeed === 'new' ? newOpportunities :
    activeRecFeed === 'domains' ? yourDomainsOpportunities :
    urgentDeadlineOpportunities;

  // Digests
  const dailyDigest = getDailyDigest();
  const weeklyDigest = getWeeklyDigest();

  return (
    <div className="pb-24 space-y-10">
      <PageHeader
        kicker="COULISSE D'INTELLIGENCE & ASSISTANCE À LA DÉCISION"
        title="WikiJob Intelligence"
        description="Aider chaque utilisateur à trouver les opportunités pertinentes sans prendre la décision à sa place. Scoring indicatif, recommandations personnalisées, alertes et digests."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/opportunites')}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-mono rounded-xl cursor-pointer"
            >
              Toutes les Opportunités
            </button>
            <button
              type="button"
              onClick={() => navigate('/wikijob')}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-mono rounded-xl cursor-pointer"
            >
              Base de Connaissances
            </button>
          </div>
        }
      />

      <Container>
        <div className="space-y-8">
          {/* Notification Toast */}
          {toastMessage && (
            <div className="p-4 bg-[#0070C0] text-white rounded-2xl border border-blue-400/30 flex items-center justify-between shadow-md text-xs font-mono animate-in fade-in">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF6600] animate-pulse" />
                <span>{toastMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MANDATORY ETHICAL PRINCIPLE BANNER                                        */}
          {/* ========================================================================= */}
          <div className="bg-gradient-to-r from-[#0070C0] to-[#004D85] text-white rounded-3xl p-6 sm:p-7 border border-[#0070C0]/50 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-white" />
                <span className="font-mono text-xs text-blue-100 uppercase font-bold tracking-wider">
                  CHARTE D'INTÉGRITÉ & AIDE À LA DÉCISION
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-100 font-sans max-w-2xl leading-relaxed">
                Le score calculé ci-dessous est un <strong>« Indice de correspondance indicatif »</strong>. Il n’engage aucun organisme recruteur et ne remplace jamais l’évaluation humaine. L'IA extrait, classe et résume mais ne modifie jamais les avis d'origine.
              </p>
            </div>

            <div className="shrink-0">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-mono font-bold">
                Profil actif : {profile?.fullName || 'Visiteur'}
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TABS NAVIGATION                                                           */}
          {/* ========================================================================= */}
          <div className="flex border-b border-slate-200 overflow-x-auto gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('recs')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'recs'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF6600]" />
                <span>Recommandations Intelligentes</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                <span>Mon Profil & Critères</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('alerts')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'alerts'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span>Mes Alertes ({alerts.length})</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('digests')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'digests'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Digests Quotidien & Hebdo</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ai_lab')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'ai_lab'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#0070C0]" />
                <span>Laboratoire IA d'Extraction</span>
              </div>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: RECOMMANDATIONS (POUR VOUS, NOUVELLES, VOS DOMAINES, DEADLINES)    */}
          {/* ========================================================================= */}
          {activeTab === 'recs' && (
            <div className="space-y-6">
              {/* Sub-Feeds Pills */}
              <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-2xl border border-slate-200">
                <span className="text-xs font-mono text-slate-400 mr-2">Vues de recommandation :</span>
                
                <button
                  type="button"
                  onClick={() => setActiveRecFeed('for_you')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer font-bold ${
                    activeRecFeed === 'for_you'
                      ? 'bg-[#0070C0] text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Pour vous ({recommendationsForYou.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRecFeed('new')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer font-bold ${
                    activeRecFeed === 'new'
                      ? 'bg-[#0070C0] text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Nouvelles opportunités
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRecFeed('domains')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer font-bold ${
                    activeRecFeed === 'domains'
                      ? 'bg-[#0070C0] text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Vos domaines d’intérêt
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRecFeed('urgent')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer font-bold ${
                    activeRecFeed === 'urgent'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Deadlines proches (&lt;7 jours)
                </button>
              </div>

              {/* Feed Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {activeRecList.map(({ opportunity: opp, match }) => {
                  const isHighMatch = match.score >= 80;
                  const isMediumMatch = match.score >= 60 && match.score < 80;

                  const badgeColor = isHighMatch
                    ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                    : isMediumMatch
                    ? 'bg-blue-100 text-blue-950 border-blue-300'
                    : 'bg-amber-100 text-amber-950 border-amber-300';

                  return (
                    <div
                      key={opp.id}
                      className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-[#0070C0]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        {/* Match Score Badge with mandatory wording */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className={`px-3 py-1 rounded-full text-xs font-mono font-extrabold border inline-flex items-center gap-1.5 ${badgeColor}`}>
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>{match.score_label}</span>
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 block pt-0.5 italic">
                              « {match.disclaimer} »
                            </span>
                          </div>

                          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 text-slate-700">
                            {opp.category}
                          </span>
                        </div>

                        {/* Title & Organization */}
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-2">
                            {opp.title}
                          </h4>
                          <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                            <span className="text-[#0070C0] font-bold">{opp.organization}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{opp.city}</span>
                            </span>
                          </div>
                        </div>

                        {/* Matching Strengths Pills */}
                        {match.strengths.length > 0 && (
                          <div className="space-y-1 pt-1">
                            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                              Points de convergence détectés :
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {match.strengths.slice(0, 2).map((str, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 truncate max-w-xs"
                                >
                                  ✓ {str}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer Actions & Details */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                        <div className="text-slate-500">
                          <span>Clôture : </span>
                          <strong className="text-slate-800">{opp.deadline || 'En continu'}</strong>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setInspectingMatch({ oppTitle: opp.title, match })}
                            className="px-2.5 py-1 text-slate-600 hover:text-slate-900 underline text-[11px] cursor-pointer"
                          >
                            Détails du match
                          </button>

                          <a
                            href={opp.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-[#0070C0] hover:bg-[#005FA3] text-white rounded-xl font-bold flex items-center gap-1"
                          >
                            <span>Postuler</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: USER PROFILE & CRITERIA                                            */}
          {/* ========================================================================= */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <form onSubmit={handleSaveProfile} className="space-y-8 max-w-3xl">
                <div>
                  <h3 className="text-lg font-extrabold text-[#262626]">
                    Profil de Correspondance & Critères
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-1">
                    Ces paramètres alimentent l’algorithme de scoring technique pour calculer vos indices de correspondance (MATCH %).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-sans">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="font-mono text-slate-700 font-bold block">NOM & PRÉNOM</label>
                    <input
                      type="text"
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="font-mono text-slate-700 font-bold block">EMAIL DE NOTIFICATION</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  {/* Level / Seniority */}
                  <div className="space-y-1">
                    <label className="font-mono text-slate-700 font-bold block">NIVEAU D'EXPÉRIENCE</label>
                    <select
                      value={profileForm.niveau}
                      onChange={(e) => setProfileForm({ ...profileForm, niveau: e.target.value as ExperienceLevel })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    >
                      <option value="Tous profils">Tous profils</option>
                      <option value="Débutant / Étudiant">Débutant / Étudiant</option>
                      <option value="Junior (1-3 ans)">Junior (1-3 ans)</option>
                      <option value="Intermédiaire (3-5 ans)">Intermédiaire (3-5 ans)</option>
                      <option value="Senior (5-10 ans)">Senior (5-10 ans)</option>
                      <option value="Direction / Expert (>10 ans)">Direction / Expert (&gt;10 ans)</option>
                    </select>
                  </div>

                  {/* Education / Degree */}
                  <div className="space-y-1">
                    <label className="font-mono text-slate-700 font-bold block">DIPLÔME / FORMATION</label>
                    <select
                      value={profileForm.formation}
                      onChange={(e) => setProfileForm({ ...profileForm, formation: e.target.value as EducationLevel })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    >
                      <option value="Tous niveaux">Tous niveaux</option>
                      <option value="BEPC / CAP">BEPC / CAP</option>
                      <option value="BAC">BAC</option>
                      <option value="BAC+2 (BTS/DUT)">BAC+2 (BTS/DUT)</option>
                      <option value="BAC+3 (Licence)">BAC+3 (Licence)</option>
                      <option value="BAC+5 (Master/Ingénieur)">BAC+5 (Master/Ingénieur)</option>
                      <option value="Doctorat">Doctorat</option>
                      <option value="CQP / CQM">CQP / CQM Artisanat</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div className="space-y-1">
                    <label className="font-mono text-slate-700 font-bold block">VILLE / LOCALISATION ACTUELLE</label>
                    <input
                      type="text"
                      value={profileForm.localisation}
                      onChange={(e) => setProfileForm({ ...profileForm, localisation: e.target.value })}
                      placeholder="Cotonou, Calavi, Parakou, Porto-Novo..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  {/* Mobility */}
                  <div className="space-y-1">
                    <label className="font-mono text-slate-700 font-bold block">PÉRIMÈTRE DE MOBILITÉ</label>
                    <select
                      value={profileForm.mobilité}
                      onChange={(e) => setProfileForm({ ...profileForm, mobilité: e.target.value as MobilityScope })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    >
                      <option value="Locale (Commune)">Locale (Commune)</option>
                      <option value="Départementale">Départementale</option>
                      <option value="Nationale (Tout le Bénin)">Nationale (Tout le Bénin)</option>
                      <option value="Sous-régionale (UEMOA)">Sous-régionale (UEMOA)</option>
                      <option value="Internationale">Internationale</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Categories */}
                <div className="space-y-2">
                  <label className="font-mono text-slate-700 font-bold block text-xs">
                    TYPES D'OPPORTUNITÉS RECHERCHÉES :
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {ALL_CATEGORIES.map(cat => {
                      const isSelected = profileForm.opportunites_recherchees.includes(cat);
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => toggleCategory(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0B1B3D] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sectors */}
                <div className="space-y-2">
                  <label className="font-mono text-slate-700 font-bold block text-xs">
                    SECTEURS PROFESSIONNELS D'INTÉRÊT :
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SECTORS_LIST.map(sec => {
                      const isSelected = profileForm.secteurs.includes(sec);
                      return (
                        <div
                          key={sec}
                          onClick={() => toggleSector(sec)}
                          className={`p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{sec}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-blue-700" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <label className="font-mono text-slate-700 font-bold block text-xs">
                    COMPÉTENCES CLÉS (POUR EXTRACTION & SCORING) :
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ajouter une compétence (ex: Audit, TypeScript, Suivi-évaluation...)"
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-mono font-bold cursor-pointer"
                    >
                      Ajouter
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {profileForm.compétences.map(skill => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-rose-600 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Save CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={resetDefaults}
                    className="text-xs font-mono text-slate-500 hover:text-slate-800 underline cursor-pointer"
                  >
                    Rétablir profil modèle
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0B1B3D] hover:bg-[#152e64] text-white font-mono font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Enregistrer et Recalculer les Matchs
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: USER ALERTS (ALERTE EMPLOI, STAGE, FINANCEMENT, BOURSE, CONCOURS)  */}
          {/* ========================================================================= */}
          {activeTab === 'alerts' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Mes Alertes Intelligentes Personnalisées
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Recevez une notification dès qu'une publication officielle (ANPE, PSIE, GDIZ, ADPME, etc.) correspond à vos filtres.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsNewAlertOpen(true)}
                  className="px-4 py-2 bg-[#0B1B3D] text-white font-mono font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs self-start"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Créer une alerte</span>
                </button>
              </div>

              {/* Alerts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {alerts.map(al => (
                  <div
                    key={al.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono text-blue-700 font-bold uppercase tracking-wider block">
                            {al.alert_type}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm font-sans">{al.title}</h4>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleAlert(al.id)}
                          className={`w-9 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                            al.active ? 'bg-emerald-500' : 'bg-slate-300'
                          }`}
                        >
                          <div
                            className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform ${
                              al.active ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs font-mono">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Mots-clés :</span>
                          <strong className="text-slate-700">{al.keywords.join(', ')}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Fréquence :</span>
                          <span className="text-slate-700">{al.frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Catégories :</span>
                          <span className="text-slate-700">{al.categories.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500">
                        {al.match_count} opportunité(s) détectée(s)
                      </span>

                      <button
                        type="button"
                        onClick={() => deleteAlert(al.id)}
                        className="text-slate-400 hover:text-rose-600 cursor-pointer p-1"
                        title="Supprimer l'alerte"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: DIGESTS (WIKIJOB DAILY & WIKIJOB WEEKLY)                           */}
          {/* ========================================================================= */}
          {activeTab === 'digests' && (
            <div className="space-y-8">
              {/* WIKIJOB DAILY */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400 text-slate-950 uppercase">
                      SYNTHÈSE QUOTIDIENNE
                    </span>
                    <h3 className="text-xl font-extrabold text-[#0B1B3D]">
                      {dailyDigest.headline}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      « {dailyDigest.subtitle} » • {dailyDigest.period_label}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-800 font-mono text-xs font-bold shrink-0">
                    {dailyDigest.matched_count} opportunités ciblées
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dailyDigest.opportunities.map(({ opportunity: opp, match_score }) => (
                    <div
                      key={opp.id}
                      className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-colors space-y-2"
                    >
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 font-bold">
                          MATCH {match_score}%
                        </span>
                        <span className="text-slate-400">{opp.category}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{opp.title}</h4>
                      <div className="flex justify-between text-[11px] font-mono text-slate-500">
                        <span>{opp.organization}</span>
                        <span className="text-slate-700 font-bold">{opp.city}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WIKIJOB WEEKLY */}
              <div className="bg-gradient-to-br from-slate-900 to-[#0B1B3D] text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
                <div className="space-y-1 border-b border-white/10 pb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-400 text-slate-950 uppercase">
                    RÉCAPITULATIF HEBDOMADAIRE
                  </span>
                  <h3 className="text-xl font-extrabold">
                    {weeklyDigest.headline}
                  </h3>
                  <p className="text-xs text-slate-300 font-mono">
                    {weeklyDigest.subtitle} • {weeklyDigest.period_label}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-amber-300 uppercase font-bold block">
                    Éclairages & Tendances de la semaine au Bénin :
                  </span>
                  <ul className="space-y-2 text-xs font-sans text-slate-200">
                    {weeklyDigest.sector_insights.map((ins, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">›</span>
                        <span>{ins}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: AI LAB & EXTRACTION ENGINE                                         */}
          {/* ========================================================================= */}
          {activeTab === 'ai_lab' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Démonstrateur IA d’Extraction & de Classification
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-sans">
                  L'IA classifie, résume, extrait les compétences et détecte les doublons probables sans jamais inventer une donnée ni modifier silencieusement la source d'origine.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 font-mono text-xs">
                <span className="text-slate-400 uppercase font-bold block">
                  Exemple de texte brut collecté (Avis officiel AZOLI / GDIZ) :
                </span>
                <p className="text-slate-700 bg-white p-3 rounded-xl border border-slate-200 font-sans leading-relaxed">
                  « L’Agence Nationale Pour l’Emploi (ANPE) et la SIPI-Bénin recrutent dans le cadre du projet AZOLI 250 jeunes (18 à 30 ans) pour le parc textile de la GDIZ Glo-Djigbé. Formation accélérée prise en charge, allocation de transport mensuelle de 60.000 FCFA. Dépôt des dossiers avant le 2026-10-31. »
                </p>

                <button
                  type="button"
                  onClick={handleRunAiDemo}
                  disabled={aiDemoRunning}
                  className="px-4 py-2 bg-[#0B1B3D] text-white font-bold rounded-xl flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{aiDemoRunning ? 'Analyse en cours...' : 'Exécuter l’analyse IA certifiée'}</span>
                </button>
              </div>

              {aiAnalysisResult && (
                <div className="p-6 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-4 font-mono text-xs animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-blue-200 pb-3">
                    <span className="font-bold text-blue-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{aiAnalysisResult.provenance_note}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 font-bold">
                      Source Intègre : 100%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-white rounded-xl border border-blue-100">
                      <span className="text-slate-400 block text-[10px]">CATÉGORIE DÉTECTÉE</span>
                      <strong className="text-blue-900">{aiAnalysisResult.detected_category}</strong>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-blue-100">
                      <span className="text-slate-400 block text-[10px]">INDICE CERTITUDE</span>
                      <strong className="text-blue-900">{(aiAnalysisResult.confidence * 100).toFixed(0)}%</strong>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-blue-100">
                      <span className="text-slate-400 block text-[10px]">DEADLINE IDENTIFIÉE</span>
                      <strong className="text-blue-900">{aiAnalysisResult.identified_dates.deadline || 'N/A'}</strong>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-blue-100">
                      <span className="text-slate-400 block text-[10px]">NIVEAU FORMATION</span>
                      <strong className="text-blue-900">{aiAnalysisResult.extracted_education}</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-blue-100 space-y-1">
                    <span className="text-slate-400 block text-[10px]">RÉSUMÉ EXÉCUTIF NEUTRE GÉNÉRÉ :</span>
                    <p className="text-slate-800 font-sans">{aiAnalysisResult.summary}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-slate-400 text-[10px]">Tags générés :</span>
                    {aiAnalysisResult.suggested_tags.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded font-bold">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>

      {/* ========================================================================= */}
      {/* MODAL: MATCH BREAKDOWN INSPECTION                                         */}
      {/* ========================================================================= */}
      {inspectingMatch && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-base font-mono">
                  Détail de l'Indice de Correspondance
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingMatch(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <strong className="text-3xl font-extrabold text-[#0070C0] block">
                  {inspectingMatch.match.score_label}
                </strong>
                <span className="text-[11px] text-slate-500 font-semibold block">
                  « {inspectingMatch.match.disclaimer} »
                </span>
                <p className="text-[10px] text-slate-400 font-sans pt-1">
                  {inspectingMatch.match.notes}
                </p>
              </div>

              {/* Breakdown points */}
              <div className="space-y-2">
                <span className="text-slate-400 uppercase text-[10px] font-bold block">
                  DÉCOMPOSITION DES POINTS (SUR 100) :
                </span>
                <div className="space-y-1.5">
                  <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                    <span>Alignement Catégorie (max 25)</span>
                    <strong>{inspectingMatch.match.breakdown.category_score} pts</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                    <span>Secteur d'activité (max 20)</span>
                    <strong>{inspectingMatch.match.breakdown.sector_score} pts</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                    <span>Localisation & Mobilité (max 15)</span>
                    <strong>{inspectingMatch.match.breakdown.location_score} pts</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                    <span>Compétences détectées (max 15)</span>
                    <strong>{inspectingMatch.match.breakdown.skills_score} pts</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                    <span>Niveau d'études & Diplôme (max 15)</span>
                    <strong>{inspectingMatch.match.breakdown.education_score} pts</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                    <span>Validité de clôture / Deadline (max 10)</span>
                    <strong>{inspectingMatch.match.breakdown.deadline_score} pts</strong>
                  </div>
                </div>
              </div>

              {inspectingMatch.match.strengths.length > 0 && (
                <div className="p-3 bg-emerald-50 text-emerald-950 rounded-xl space-y-1">
                  <span className="font-bold text-[10px] block">Points forts du profil sur cet avis :</span>
                  <ul className="space-y-1 font-sans">
                    {inspectingMatch.match.strengths.map((s, i) => (
                      <li key={i}>✓ {s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setInspectingMatch(null)}
                className="px-5 py-2 bg-[#0070C0] text-white rounded-xl text-xs font-mono font-bold hover:bg-[#005FA3] cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREATE ALERT MODAL                                                 */}
      {/* ========================================================================= */}
      {isNewAlertOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-5 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base font-mono">
                  Créer une Alerte Intelligente
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNewAlertOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="font-mono text-slate-700 font-bold block">TYPE D'ALERTE</label>
                <select
                  value={newAlertData.alert_type}
                  onChange={(e) => setNewAlertData({ ...newAlertData, alert_type: e.target.value as AlertType })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                >
                  <option value="Alerte emploi">Alerte emploi</option>
                  <option value="Alerte stage">Alerte stage</option>
                  <option value="Alerte financement">Alerte financement</option>
                  <option value="Alerte bourse">Alerte bourse</option>
                  <option value="Alerte concours">Alerte concours</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-700 font-bold block">INTITULÉ DE L'ALERTE</label>
                <input
                  type="text"
                  required
                  value={newAlertData.title}
                  onChange={(e) => setNewAlertData({ ...newAlertData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-700 font-bold block">MOTS-CLÉS (séparés par virgules)</label>
                <input
                  type="text"
                  required
                  placeholder="Conseiller, Audit, Stage..."
                  value={newAlertData.keywords}
                  onChange={(e) => setNewAlertData({ ...newAlertData, keywords: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-700 font-bold block">LOCALISATION</label>
                <input
                  type="text"
                  value={newAlertData.location}
                  onChange={(e) => setNewAlertData({ ...newAlertData, location: e.target.value })}
                  placeholder="Cotonou, Calavi, Tout le Bénin..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-700 font-bold block">FRÉQUENCE DE NOTIFICATION</label>
                <select
                  value={newAlertData.frequency}
                  onChange={(e) => setNewAlertData({ ...newAlertData, frequency: e.target.value as AlertFrequency })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                >
                  <option value="QUOTIDIEN">Quotidien (chaque matin)</option>
                  <option value="HEBDOMADAIRE">Hebdomadaire (chaque lundi)</option>
                  <option value="INSTANTANÉ">Instantané (dès détection)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewAlertOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 cursor-pointer font-mono"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1B3D] text-white font-mono font-bold rounded-xl hover:bg-[#152e64] cursor-pointer"
                >
                  Activer l'alerte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
