import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Container } from '../../../components/ui/Container';
import { useAggregationEngine } from '../../../hooks/useAggregationEngine';
import { useRouter } from '../../../hooks/useRouter';
import { 
  NormalizedOpportunity, 
  SourceItemRecord, 
  OpportunityVerificationStatus,
  OpportunityLifecycleStatus,
  WikiJobOpportunityCategory
} from '../../../types/aggregation';
import { 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Copy, 
  FileText, 
  Database, 
  Layers, 
  Cpu, 
  History, 
  ExternalLink, 
  Search, 
  Check, 
  X, 
  Filter, 
  Eye, 
  ArrowRight,
  Flame,
  AlertCircle,
  Tag,
  Radio,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';

const PIPELINE_STAGES = [
  { id: 'SOURCE', label: '1. SOURCE', desc: 'Sélection sources actives' },
  { id: 'FETCH', label: '2. FETCH', desc: 'Extraction réseau & flux' },
  { id: 'RAW_CONTENT', label: '3. RAW CONTENT', desc: 'Table source_items & hash' },
  { id: 'PARSER', label: '4. PARSER', desc: 'Nettoyage & détection dates' },
  { id: 'NORMALIZER', label: '5. NORMALIZER', desc: 'Structure standardisée' },
  { id: 'CLASSIFIER', label: '6. CLASSIFIER', desc: 'Classification en 10 types' },
  { id: 'DEDUPLICATOR', label: '7. DEDUPLICATOR', desc: 'Détection doublons & attribution' },
  { id: 'VALIDATOR', label: '8. VALIDATOR', desc: 'Contrôles d’intégrité' },
  { id: 'PUBLISHER', label: '9. PUBLISHER', desc: 'Indexation & audit trail' }
];

export const WikiJobAggregationEnginePage: React.FC = () => {
  const { 
    opportunities, 
    rawItems, 
    duplicates, 
    auditLogs, 
    reports, 
    isRunning, 
    currentStep, 
    progressPct, 
    runPipeline, 
    verifyOpportunity, 
    resetAll 
  } = useAggregationEngine();

  const { navigate } = useRouter();

  const [activeTab, setActiveTab] = useState<'opportunities' | 'raw_items' | 'duplicates' | 'audit' | 'reports'>('opportunities');
  const [filterVerification, setFilterVerification] = useState<'ALL' | OpportunityVerificationStatus>('ALL');
  const [filterLifecycle, setFilterLifecycle] = useState<'ALL' | OpportunityLifecycleStatus>('ALL');
  const [filterCategory, setFilterCategory] = useState<'ALL' | WikiJobOpportunityCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected item modal details
  const [inspectingRawItem, setInspectingRawItem] = useState<SourceItemRecord | null>(null);
  const [inspectingOpp, setInspectingOpp] = useState<NormalizedOpportunity | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleRunPipeline = async () => {
    try {
      showFeedback('Démarrage du pipeline d’agrégation automatique...');
      const res = await runPipeline();
      showFeedback(`Pipeline terminé : ${res.opportunities_published} opportunité(s) traitée(s), ${res.duplicates_detected} doublon(s) tracés.`);
    } catch (err: any) {
      showFeedback(`Erreur d'exécution : ${err.message}`);
    }
  };

  const handleVerify = (id: string, status: OpportunityVerificationStatus) => {
    verifyOpportunity(id, status, 'amenfatchina@gmail.com');
    showFeedback(`Statut de vérification mis à jour : ${status}`);
    if (inspectingOpp && inspectingOpp.id === id) {
      setInspectingOpp(null);
    }
  };

  // Filtered opportunities
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      if (filterVerification !== 'ALL' && opp.verification_status !== filterVerification) return false;
      if (filterLifecycle !== 'ALL' && opp.status !== filterLifecycle) return false;
      if (filterCategory !== 'ALL' && opp.category !== filterCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(q);
        const matchesOrg = opp.organization.toLowerCase().includes(q);
        const matchesCity = opp.city.toLowerCase().includes(q);
        if (!matchesTitle && !matchesOrg && !matchesCity) return false;
      }
      return true;
    });
  }, [opportunities, filterVerification, filterLifecycle, filterCategory, searchQuery]);

  // Key metrics
  const totalCount = opportunities.length;
  const pendingCount = opportunities.filter(o => o.verification_status === 'PENDING').length;
  const verifiedCount = opportunities.filter(o => o.verification_status === 'VERIFIED').length;
  const duplicateCount = duplicates.length;
  const expiredCount = opportunities.filter(o => o.status === 'EXPIRED').length;
  const expiringSoonCount = opportunities.filter(o => o.status === 'EXPIRING_SOON').length;

  const formatDate = (isoStr: string | null) => {
    if (!isoStr) return '—';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="pb-24 space-y-10">
      <PageHeader
        kicker="MOTEUR D'ACQUISITION & TRAITEMENT AUTOMATISÉ"
        title="WikiJob Aggregation Engine"
        description="Pipeline complet de collecte, normalisation, classification, déduplication et expiration des opportunités béninoises (SICA ANPE, PSIE, ADPME, PRODIJ, FNDA, FNM, FNPEEJ, AZOLI)."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/admin/wikijob/sources')}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-mono rounded-xl cursor-pointer transition-colors"
            >
              Registre des Sources
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/wikijob/jobs')}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-mono rounded-xl cursor-pointer transition-colors"
            >
              Jobs & Synchro 24h
            </button>
            <button
              type="button"
              onClick={handleRunPipeline}
              disabled={isRunning}
              className="px-4 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 text-[#FF6600] ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Exécution du Pipeline...' : 'Lancer le Pipeline Complet'}</span>
            </button>
          </div>
        }
      />

      <Container>
        <div className="space-y-8">
          {/* Notification feedback banner */}
          {actionFeedback && (
            <div className="p-4 bg-slate-900 text-white rounded-2xl border border-[#0070C0]/40 flex items-center justify-between shadow-md text-xs font-mono animate-in fade-in">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#FF6600] animate-pulse" />
                <span>{actionFeedback}</span>
              </div>
              <button
                type="button"
                onClick={() => setActionFeedback(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PIPELINE LIVE STEPPER VISUALIZER                                          */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-[#0070C0] font-bold uppercase tracking-wider block">
                  ARCHITECTURE DE TRAITEMENT SÉQUENTIEL
                </span>
                <h3 className="text-lg font-extrabold text-[#262626] font-sans mt-0.5">
                  Pipeline d’Agrégation & Cycle de Vie des Données
                </h3>
              </div>

              {isRunning && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0070C0] text-xs font-mono font-semibold animate-pulse border border-blue-200">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0070C0]" />
                  <span>{currentStep} ({progressPct}%)</span>
                </div>
              )}
            </div>

            {/* Visual 9-stage flow */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
              {PIPELINE_STAGES.map((stg, i) => (
                <div 
                  key={stg.id}
                  className="p-3 rounded-2xl border bg-slate-50/70 border-slate-200 flex flex-col justify-between space-y-1 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#0070C0]">
                      {stg.label}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">#{i + 1}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight font-sans">
                    {stg.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Live Progress Bar when Running */}
            {isRunning && (
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#0070C0] via-[#FF6600] to-emerald-600 h-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* STATS OVERVIEW CARDS                                                      */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                TOTAL INDEXÉES
              </span>
              <strong className="text-2xl font-extrabold text-[#262626] font-mono block">
                {totalCount}
              </strong>
              <span className="text-[10px] font-mono text-slate-500">table opportunities</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-300 bg-amber-50/30 shadow-xs space-y-1">
              <span className="text-[10px] font-mono text-[#FF6600] uppercase font-bold block">
                À VÉRIFIER
              </span>
              <strong className="text-2xl font-extrabold text-[#FF6600] font-mono block">
                {pendingCount}
              </strong>
              <span className="text-[10px] font-mono text-amber-800">filtre PENDING</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-300 bg-emerald-50/30 shadow-xs space-y-1">
              <span className="text-[10px] font-mono text-[#0E8A5E] uppercase font-bold block">
                VÉRIFIÉES TSF
              </span>
              <strong className="text-2xl font-extrabold text-[#0E8A5E] font-mono block">
                {verifiedCount}
              </strong>
              <span className="text-[10px] font-mono text-emerald-700">certifiées conformes</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-purple-200 bg-purple-50/20 shadow-xs space-y-1">
              <span className="text-[10px] font-mono text-purple-700 uppercase font-bold block">
                DOUBLONS TRACÉS
              </span>
              <strong className="text-2xl font-extrabold text-purple-800 font-mono block">
                {duplicateCount}
              </strong>
              <span className="text-[10px] font-mono text-purple-600">multi-sources</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs space-y-1">
              <span className="text-[10px] font-mono text-amber-700 uppercase font-bold block">
                EXPIRE SOUS PEU
              </span>
              <strong className="text-2xl font-extrabold text-amber-800 font-mono block">
                {expiringSoonCount}
              </strong>
              <span className="text-[10px] font-mono text-amber-600">deadline &lt; 5j</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                ARCHIVÉES
              </span>
              <strong className="text-2xl font-extrabold text-slate-600 font-mono block">
                {expiredCount}
              </strong>
              <span className="text-[10px] font-mono text-slate-400">expirées</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TABS NAVIGATION                                                           */}
          {/* ========================================================================= */}
          <div className="flex border-b border-slate-200 overflow-x-auto gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('opportunities')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'opportunities'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Opportunités Normalisées ({opportunities.length})</span>
                {pendingCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#FF6600] text-white text-[10px]">
                    {pendingCount}
                  </span>
                )}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('raw_items')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'raw_items'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span>Contenu Brut (source_items) ({rawItems.length})</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('duplicates')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'duplicates'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                <span>Déduplication & Attribution ({duplicates.length})</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('audit')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'audit'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <History className="w-4 h-4" />
                <span>Journal d'Audit Trail ({auditLogs.length})</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reports')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'reports'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>Rapports de Run ({reports.length})</span>
              </div>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: OPPORTUNITIES NORMALIZED                                           */}
          {/* ========================================================================= */}
          {activeTab === 'opportunities' && (
            <div className="space-y-4">
              {/* Filters toolbar */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filtrer par titre, organisme, ville..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans outline-none focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Verification filter */}
                    <select
                      value={filterVerification}
                      onChange={(e) => setFilterVerification(e.target.value as any)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium outline-none focus:ring-2 focus:ring-[#0070C0]"
                    >
                      <option value="ALL">Tous statuts vérification</option>
                      <option value="PENDING">En attente (PENDING)</option>
                      <option value="VERIFIED">Vérifié (VERIFIED)</option>
                      <option value="REJECTED">Rejeté (REJECTED)</option>
                      <option value="EXPIRED">Expiré (EXPIRED)</option>
                    </select>

                    {/* Lifecycle filter */}
                    <select
                      value={filterLifecycle}
                      onChange={(e) => setFilterLifecycle(e.target.value as any)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium outline-none focus:ring-2 focus:ring-[#0070C0]"
                    >
                      <option value="ALL">Tous cycles de vie</option>
                      <option value="ACTIVE">Actif (ACTIVE)</option>
                      <option value="EXPIRING_SOON">Expire sous peu (EXPIRING_SOON)</option>
                      <option value="EXPIRED">Expiré (EXPIRED)</option>
                    </select>

                    {/* Category filter */}
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value as any)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium outline-none focus:ring-2 focus:ring-[#0070C0]"
                    >
                      <option value="ALL">Toutes catégories</option>
                      <option value="EMPLOI">Emploi</option>
                      <option value="STAGE">Stage</option>
                      <option value="VOLONTARIAT">Volontariat</option>
                      <option value="BOURSE">Bourse</option>
                      <option value="FORMATION">Formation</option>
                      <option value="FINANCEMENT">Financement</option>
                      <option value="CONCOURS">Concours</option>
                      <option value="APPEL À PROJETS">Appel à projets</option>
                      <option value="ENTREPRENEURIAT">Entrepreneuriat</option>
                      <option value="AUTRE">Autre</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table of Opportunities (Desktop) */}
              <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/90 border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-5">Titre & Organisme</th>
                        <th className="py-3.5 px-4">Catégorie</th>
                        <th className="py-3.5 px-4">Deadline & Statut</th>
                        <th className="py-3.5 px-4">Vérification</th>
                        <th className="py-3.5 px-4 text-center">Attribution</th>
                        <th className="py-3.5 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {filteredOpportunities.map(opp => {
                        const isPending = opp.verification_status === 'PENDING';
                        const isExpired = opp.status === 'EXPIRED';
                        const isExpiringSoon = opp.status === 'EXPIRING_SOON';

                        return (
                          <tr key={opp.id} className="hover:bg-slate-50/80 transition-colors">
                            {/* Title & Organization */}
                            <td className="py-3.5 px-5 max-w-xs">
                              <div className="space-y-0.5">
                                <span className="font-bold text-slate-900 block truncate" title={opp.title}>
                                  {opp.title}
                                </span>
                                <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                                  <span>{opp.organization}</span>
                                  <span>•</span>
                                  <span>{opp.city}</span>
                                </div>
                              </div>
                            </td>

                            {/* Category with classifier confidence */}
                            <td className="py-3.5 px-4">
                              <div className="space-y-0.5">
                                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#EBF5FC] text-[#0070C0] border border-[#A3D1F1] inline-block">
                                  {opp.category}
                                </span>
                                {opp.confidence_score && (
                                  <div className="text-[10px] font-mono text-slate-400">
                                    {(opp.confidence_score * 100).toFixed(0)}% certitude
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* Deadline & Expiration lifecycle */}
                            <td className="py-3.5 px-4 font-mono">
                              <div className="space-y-0.5">
                                <div className="text-slate-800">
                                  {opp.deadline ? opp.deadline : 'En continu'}
                                </div>
                                <div>
                                  {isExpired ? (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                      EXPIRED
                                    </span>
                                  ) : isExpiringSoon ? (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFF3EB] text-[#FF6600] border border-[#FFC49E]">
                                      EXPIRING SOON
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                      ACTIVE
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Verification status */}
                            <td className="py-3.5 px-4 font-mono">
                              <div className="space-y-0.5">
                                {isPending ? (
                                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFF3EB] text-[#FF6600] border border-[#FFC49E] inline-flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-[#FF6600]" />
                                    <span>PENDING</span>
                                  </span>
                                ) : opp.verification_status === 'VERIFIED' ? (
                                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 inline-flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                    <span>VERIFIED</span>
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-900 border border-rose-300 inline-flex items-center gap-1">
                                    <X className="w-3 h-3 text-rose-700" />
                                    <span>REJECTED</span>
                                  </span>
                                )}
                                {opp.verified_by && (
                                  <div className="text-[10px] text-slate-400 truncate max-w-[140px]" title={opp.verified_by}>
                                    Par : {opp.verified_by}
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* Duplicate attribution */}
                            <td className="py-3.5 px-4 text-center font-mono">
                              {opp.duplicate_count && opp.duplicate_count > 0 ? (
                                <span 
                                  className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold inline-flex items-center gap-1"
                                  title={`Détecté également sur : ${(opp.duplicate_sources || []).join(', ')}`}
                                >
                                  <Copy className="w-3 h-3" />
                                  <span>+{opp.duplicate_count}</span>
                                </span>
                              ) : (
                                <span className="text-slate-400 text-[11px]">Unique</span>
                              )}
                            </td>

                            {/* Admin actions */}
                            <td className="py-3.5 px-5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {isPending && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => handleVerify(opp.id, 'VERIFIED')}
                                      className="px-3 py-1 bg-[#0E8A5E] hover:bg-[#0B6E4A] text-white rounded-lg text-[11px] font-mono font-bold cursor-pointer transition-colors shadow-2xs"
                                      title="Approuver et publier officiellement"
                                    >
                                      Valider
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleVerify(opp.id, 'REJECTED')}
                                      className="px-2.5 py-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 rounded-lg text-[11px] font-mono cursor-pointer transition-colors"
                                      title="Rejeter"
                                    >
                                      Rejeter
                                    </button>
                                  </>
                                )}

                                <button
                                  type="button"
                                  onClick={() => setInspectingOpp(opp)}
                                  className="p-1.5 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer"
                                  title="Détail complet"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                <a
                                  href={opp.source_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600"
                                  title="Ouvrir l'URL source"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredOpportunities.length === 0 && (
                  <div className="p-8 text-center text-xs text-slate-500 font-mono">
                    Aucune opportunité ne correspond aux critères de filtre.
                  </div>
                )}
              </div>

              {/* Mobile Adapted Card List */}
              <div className="lg:hidden space-y-3">
                {filteredOpportunities.map(opp => (
                  <div key={opp.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3 font-sans">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-[#0070C0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {opp.category}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 mt-1">{opp.title}</h4>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{opp.organization} • {opp.city}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        opp.verification_status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {opp.verification_status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-2 border-t border-slate-100">
                      <span>Deadline : {opp.deadline || 'En continu'}</span>
                      <button
                        type="button"
                        onClick={() => setInspectingOpp(opp)}
                        className="text-[#0070C0] font-bold flex items-center gap-1"
                      >
                        <span>Examiner</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: RAW CONTENT (source_items)                                         */}
          {/* ========================================================================= */}
          {activeTab === 'raw_items' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    Table des Données Brutes : <code>source_items</code>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Contenu originel extrait et archivé avec empreinte cryptographique (content_hash) pour traçabilité et détection de modifications.
                  </p>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-5">ID & Hash</th>
                        <th className="py-3.5 px-4">Titre Brut</th>
                        <th className="py-3.5 px-4">Source ID</th>
                        <th className="py-3.5 px-4">Collecté le</th>
                        <th className="py-3.5 px-4">Statut</th>
                        <th className="py-3.5 px-5 text-right">Inspecter</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {rawItems.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-5">
                            <span className="font-bold text-[#0070C0] block">{item.id}</span>
                            <code className="text-[10px] text-slate-400 bg-slate-100 px-1 py-0.5 rounded">
                              {item.content_hash}
                            </code>
                          </td>
                          <td className="py-3.5 px-4 max-w-sm truncate text-slate-900 font-sans font-medium" title={item.raw_title}>
                            {item.raw_title}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">
                            {item.source_id}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">
                            {formatDate(item.collected_at)}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.status === 'NORMALIZED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              item.status === 'DUPLICATE' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                              item.status === 'PARSED' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <button
                              type="button"
                              onClick={() => setInspectingRawItem(item)}
                              className="px-3 py-1 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 text-xs font-mono font-medium cursor-pointer transition-colors"
                            >
                              Voir HTML
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards for rawItems */}
              <div className="lg:hidden space-y-3 font-sans">
                {rawItems.map(item => (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3 font-mono text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-[#0070C0] text-sm block">{item.id}</span>
                        <code className="text-[10px] text-slate-400 bg-slate-100 px-1 py-0.5 rounded inline-block mt-0.5">
                          {item.content_hash}
                        </code>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'NORMALIZED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        item.status === 'DUPLICATE' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="font-sans font-bold text-slate-900 text-sm">
                      {item.raw_title}
                    </div>

                    <div className="flex items-center justify-between text-slate-500 text-[11px] pt-2 border-t border-slate-100">
                      <span>Source : {item.source_id}</span>
                      <button
                        type="button"
                        onClick={() => setInspectingRawItem(item)}
                        className="text-[#0070C0] font-bold cursor-pointer"
                      >
                        Voir HTML
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: DEDUPLICATION & MULTI-SOURCE ATTRIBUTION                           */}
          {/* ========================================================================= */}
          {activeTab === 'duplicates' && (
            <div className="space-y-4">
              <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-1">
                <div className="flex items-center gap-2">
                  <Copy className="w-4 h-4 text-purple-700" />
                  <strong className="text-sm font-bold text-purple-900 font-mono">
                    Principe de Conservation des Doublons pour Attribution
                  </strong>
                </div>
                <p className="text-xs text-purple-800 leading-relaxed font-sans">
                  Une même opportunité (ex. recrutement d'ouvriers industriels pour la GDIZ ou stage ANPE/PRODIJ) peut être republiée sur plusieurs plateformes. WikiJob ne supprime pas ces doublons : ils sont archivés dans la table d'attribution et rattachés à l'enregistrement canonique.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {duplicates.map(dup => (
                  <div key={dup.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-purple-700 font-bold block">
                          DOUBLON IDENTIFIÉ ({dup.match_criteria.join(' • ')})
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {dup.duplicate_title}
                        </h4>
                        <div className="text-xs font-mono text-slate-500">
                          Source : <strong className="text-slate-800">{dup.duplicate_source_name}</strong>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-100 text-purple-900">
                          Score similarité : {(dup.similarity_score * 100).toFixed(0)}%
                        </span>
                        <div className="text-[10px] font-mono text-slate-400 mt-1">
                          Détecté le {formatDate(dup.detected_at)}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono space-y-1">
                      <span className="text-slate-400 uppercase text-[10px] block font-bold">Rattachement Canonique :</span>
                      <div className="text-slate-700">
                        Opportunité ID mère : <code className="text-[#0070C0] font-bold">{dup.canonical_opportunity_id}</code>
                      </div>
                      <p className="text-slate-500 text-[11px] pt-1 border-t border-slate-200 font-sans">
                        {dup.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: AUDIT TRAIL LOGS                                                   */}
          {/* ========================================================================= */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    Journal Immuable d'Audit & Traçabilité
                  </h3>
                  <p className="text-xs text-slate-500">
                    Horodatage de la collecte, de la source originale, des vérifications manuelles et des transitions de statut.
                  </p>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-5">Horodatage</th>
                        <th className="py-3.5 px-4">Action</th>
                        <th className="py-3.5 px-4">Opportunité / Source</th>
                        <th className="py-3.5 px-4">Opérateur / Admin</th>
                        <th className="py-3.5 px-5">Détails & Modifications</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {auditLogs.map(log => (
                        <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap">
                            {formatDate(log.timestamp)}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.action === 'VERIFIED' ? 'bg-emerald-100 text-emerald-900' :
                              log.action === 'REJECTED' ? 'bg-rose-100 text-rose-900' :
                              log.action === 'COLLECTED' ? 'bg-blue-100 text-blue-900' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-800">{log.opportunity_id}</div>
                            <div className="text-[10px] text-slate-400">{log.source_name}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700">
                            {log.admin_user || 'Système'}
                          </td>
                          <td className="py-3.5 px-5 text-slate-600 font-sans max-w-sm">
                            {log.details}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards for auditLogs */}
              <div className="lg:hidden space-y-3 font-sans">
                {auditLogs.map(log => (
                  <div key={log.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.action === 'VERIFIED' ? 'bg-emerald-100 text-emerald-900' :
                        log.action === 'REJECTED' ? 'bg-rose-100 text-rose-900' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {log.action}
                      </span>
                      <span className="text-slate-400 text-[11px]">{formatDate(log.timestamp)}</span>
                    </div>
                    <div>
                      <div className="font-bold text-[#0070C0]">{log.opportunity_id}</div>
                      <div className="text-[11px] text-slate-500 font-sans mt-0.5">{log.details}</div>
                    </div>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 flex justify-between">
                      <span>Source : {log.source_name}</span>
                      <span>Par : {log.admin_user || 'Système'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: REPORTS                                                            */}
          {/* ========================================================================= */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Rapports d'Exécution du Moteur d'Agrégation
              </h3>

              <div className="space-y-4">
                {reports.map(rep => (
                  <div key={rep.run_id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 font-mono text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                      <div>
                        <strong className="text-sm font-bold text-[#0070C0] block">{rep.run_id}</strong>
                        <span className="text-slate-400 text-[11px]">
                          Exécuté le {formatDate(rep.started_at)} en {(rep.duration_ms / 1000).toFixed(2)}s
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 text-[11px]">
                        <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                          +{rep.opportunities_published} publiées
                        </span>
                        <span className="px-2.5 py-1 rounded bg-purple-50 text-purple-800 border border-purple-200 font-bold">
                          {rep.duplicates_detected} doublon(s)
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-400 block">Sources traitées :</span>
                        <strong className="text-slate-900">{rep.sources_scanned}</strong>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-400 block">Éléments bruts :</span>
                        <strong className="text-slate-900">{rep.raw_items_fetched}</strong>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-400 block">Validés :</span>
                        <strong className="text-slate-900">{rep.items_validated}</strong>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-400 block">Expirations :</span>
                        <strong className="text-slate-900">{rep.expirations_updated}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* ========================================================================= */}
      {/* MODAL 1: INSPECT RAW ITEM (source_items)                                  */}
      {/* ========================================================================= */}
      {inspectingRawItem && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto overscroll-contain flex min-h-full items-center justify-center p-3 sm:p-6 text-center animate-in fade-in duration-200">
          <div
            onClick={() => setInspectingRawItem(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
          />

          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] text-left">
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#0070C0]" />
                <h3 className="font-bold text-slate-900 text-base font-sans">
                  Inspection Donnée Brute (source_items)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingRawItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain flex-1 space-y-4 font-mono text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1.5 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">ID :</span>
                  <strong className="text-slate-900">{inspectingRawItem.id}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Content Hash :</span>
                  <code>{inspectingRawItem.content_hash}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">External ID :</span>
                  <span>{inspectingRawItem.external_id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">URL :</span>
                  <a href={inspectingRawItem.url} target="_blank" rel="noopener noreferrer" className="text-[#0070C0] truncate max-w-xs underline">
                    {inspectingRawItem.url}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-bold block mb-1">Titre brut :</span>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-sans text-sm font-bold text-slate-800">
                  {inspectingRawItem.raw_title}
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-bold block mb-1">Contenu textuel brut extrait :</span>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-sans text-xs text-slate-700 leading-relaxed max-h-40 overflow-y-auto">
                  {inspectingRawItem.raw_content}
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-bold block mb-1">HTML Brut Archivé :</span>
                <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-xl text-[11px] overflow-x-auto max-h-48">
                  {inspectingRawItem.raw_html}
                </pre>
              </div>
            </div>

            <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0 rounded-b-3xl">
              <button
                type="button"
                onClick={() => setInspectingRawItem(null)}
                className="px-5 py-2.5 bg-[#0070C0] text-white rounded-xl text-xs font-mono font-bold hover:bg-[#005FA3] cursor-pointer shadow-xs"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: INSPECT NORMALIZED OPPORTUNITY                                   */}
      {/* ========================================================================= */}
      {inspectingOpp && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto overscroll-contain flex min-h-full items-center justify-center p-3 sm:p-6 text-center animate-in fade-in duration-200">
          <div
            onClick={() => setInspectingOpp(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
          />

          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] text-left">
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-white shrink-0">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  OPPORTUNITÉ NORMALISÉE ({inspectingOpp.id})
                </span>
                <h3 className="font-bold text-slate-900 text-lg font-sans">
                  {inspectingOpp.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingOpp(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain flex-1 space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase">Catégorie</span>
                  <strong className="text-[#0070C0] font-bold">{inspectingOpp.category}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase">Cycle de vie</span>
                  <strong className={inspectingOpp.status === 'ACTIVE' ? 'text-emerald-700' : 'text-rose-700'}>
                    {inspectingOpp.status}
                  </strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase">Vérification</span>
                  <strong className={inspectingOpp.verification_status === 'VERIFIED' ? 'text-emerald-700' : 'text-[#FF6600]'}>
                    {inspectingOpp.verification_status}
                  </strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase">Deadline</span>
                  <strong>{inspectingOpp.deadline || 'En continu'}</strong>
                </div>
              </div>

              {inspectingOpp.classification_reason && (
                <div className="p-3 bg-blue-50 rounded-xl text-blue-900 font-mono text-[11px] border border-blue-200">
                  <span className="font-bold uppercase tracking-wider block text-[10px] text-[#0070C0]">Audit du classifieur :</span>
                  <span>{inspectingOpp.classification_reason}</span>
                </div>
              )}

              <div>
                <span className="font-mono text-slate-500 font-bold block mb-1">Description normalisée :</span>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {inspectingOpp.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 block">Organisme :</span>
                  <strong className="text-slate-800">{inspectingOpp.organization}</strong>
                  <span className="text-slate-400 block pt-1">Localisation :</span>
                  <span>{inspectingOpp.city}, {inspectingOpp.country}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 block">URL de candidature :</span>
                  <a href={inspectingOpp.application_url} target="_blank" rel="noopener noreferrer" className="text-[#0070C0] underline truncate block">
                    {inspectingOpp.application_url}
                  </a>
                  <span className="text-slate-400 block pt-1">Date collecte :</span>
                  <span>{formatDate(inspectingOpp.collected_at)}</span>
                </div>
              </div>
            </div>

            {/* Validation actions in modal */}
            <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 font-mono text-xs shrink-0 rounded-b-3xl">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleVerify(inspectingOpp.id, 'VERIFIED')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl cursor-pointer shadow-xs"
                >
                  Approuver (VERIFIED)
                </button>
                <button
                  type="button"
                  onClick={() => handleVerify(inspectingOpp.id, 'REJECTED')}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold rounded-xl cursor-pointer"
                >
                  Rejeter (REJECTED)
                </button>
              </div>

              <button
                type="button"
                onClick={() => setInspectingOpp(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
