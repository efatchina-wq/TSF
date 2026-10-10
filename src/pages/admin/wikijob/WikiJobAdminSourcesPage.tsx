import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Container } from '../../../components/ui/Container';
import { useWikiJobSources } from '../../../hooks/useWikiJobSources';
import { SourceTypeBadge } from '../../../components/wikijob/SourceTypeBadge';
import { SourceStatusBadge } from '../../../components/wikijob/SourceStatusBadge';
import { 
  SourceRecord, 
  SourceAcquisitionType, 
  SourceCategory, 
  SourceSyncFrequency,
  ConnectionTestResult
} from '../../../types/wikijob';
import { useRouter } from '../../../hooks/useRouter';
import { 
  Plus, 
  RefreshCw, 
  Radio, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Edit3, 
  Trash2, 
  Eye, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  X, 
  RotateCcw,
  Zap,
  Globe,
  Search,
  Activity,
  ArrowRight,
  Database,
  SlidersHorizontal,
  Layers,
  Check
} from 'lucide-react';

const ALL_CATEGORIES: SourceCategory[] = [
  'EMPLOI',
  'STAGE',
  'VOLONTARIAT',
  'FORMATION',
  'FINANCEMENT',
  'BOURSE',
  'CONCOURS',
  'ENTREPRENEURIAT',
  'ACTUALITÉ',
  'PROGRAMME PUBLIC',
  'AUTRE'
];

const ALL_ACQUISITION_TYPES: Array<{ value: SourceAcquisitionType; label: string }> = [
  { value: 'WEB_PUBLIC', label: 'Page web publique (Scraping contrôlé)' },
  { value: 'MANUAL_IMPORT', label: 'Import manuel (Veilleurs & Sessions)' },
  { value: 'FUTURE_CONNECTOR', label: 'Connecteur futur (En homologation)' },
  { value: 'STRUCTURED_SOURCE', label: 'Source structurée (JSON/OpenData)' },
  { value: 'RSS_ATOM', label: 'Flux RSS / Atom officiel' },
  { value: 'OFFICIAL_API', label: 'API officielle' },
  { value: 'SITEMAP', label: 'Sitemap XML' }
];

export const WikiJobAdminSourcesPage: React.FC = () => {
  const { 
    sources, 
    loading, 
    testingId, 
    syncingId, 
    testResult, 
    setTestResult,
    createSource, 
    updateSource, 
    deleteSource, 
    toggleSourceActive, 
    testConnection, 
    syncSource, 
    syncAll, 
    resetDefaults 
  } = useWikiJobSources();

  const { navigate } = useRouter();

  // Search & filter state
  const [searchFilter, setSearchFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<SourceRecord | null>(null);
  const [viewingErrorsSource, setViewingErrorsSource] = useState<SourceRecord | null>(null);
  const [globalMessage, setGlobalMessage] = useState<string | null>(null);

  // Form State for Create/Edit
  const [formData, setFormData] = useState<{
    name: string;
    slug: string;
    description: string;
    website: string;
    source_type: SourceAcquisitionType;
    country: string;
    official: boolean;
    active: boolean;
    rss_url: string;
    api_url: string;
    scraping_enabled: boolean;
    frequency: SourceSyncFrequency;
    operator_name: string;
    logo_text: string;
    categories: SourceCategory[];
  }>({
    name: '',
    slug: '',
    description: '',
    website: '',
    source_type: 'WEB_PUBLIC',
    country: 'Bénin',
    official: true,
    active: true,
    rss_url: '',
    api_url: '',
    scraping_enabled: true,
    frequency: 'DAILY',
    operator_name: '',
    logo_text: '',
    categories: ['EMPLOI', 'PROGRAMME PUBLIC']
  });

  const showNotification = (msg: string) => {
    setGlobalMessage(msg);
    setTimeout(() => setGlobalMessage(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingSource(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      website: '',
      source_type: 'WEB_PUBLIC',
      country: 'Bénin',
      official: true,
      active: true,
      rss_url: '',
      api_url: '',
      scraping_enabled: true,
      frequency: 'DAILY',
      operator_name: '',
      logo_text: '',
      categories: ['EMPLOI', 'PROGRAMME PUBLIC']
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (source: SourceRecord) => {
    setEditingSource(source);
    setFormData({
      name: source.name,
      slug: source.slug,
      description: source.description || '',
      website: source.website,
      source_type: source.source_type,
      country: source.country,
      official: source.official,
      active: source.active,
      rss_url: source.rss_url || '',
      api_url: source.api_url || '',
      scraping_enabled: !!source.scraping_enabled,
      frequency: source.frequency || 'DAILY',
      operator_name: source.operator_name || '',
      logo_text: source.logo_text || '',
      categories: source.categories || ['EMPLOI']
    });
    setIsAddModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSource) {
        updateSource(editingSource.id, {
          name: formData.name,
          slug: formData.slug || undefined,
          description: formData.description,
          website: formData.website,
          source_type: formData.source_type,
          country: formData.country,
          official: formData.official,
          active: formData.active,
          rss_url: formData.rss_url ? formData.rss_url : null,
          api_url: formData.api_url ? formData.api_url : null,
          scraping_enabled: formData.scraping_enabled,
          frequency: formData.frequency,
          operator_name: formData.operator_name,
          logo_text: formData.logo_text,
          categories: formData.categories
        });
        showNotification(`Source « ${formData.name} » mise à jour avec succès.`);
      } else {
        createSource({
          name: formData.name,
          slug: formData.slug || undefined,
          description: formData.description,
          website: formData.website,
          source_type: formData.source_type,
          country: formData.country,
          official: formData.official,
          active: formData.active,
          rss_url: formData.rss_url ? formData.rss_url : null,
          api_url: formData.api_url ? formData.api_url : null,
          scraping_enabled: formData.scraping_enabled,
          frequency: formData.frequency,
          operator_name: formData.operator_name,
          logo_text: formData.logo_text,
          categories: formData.categories
        });
        showNotification(`Nouvelle source « ${formData.name} » enregistrée dans le registre.`);
      }
      setIsAddModalOpen(false);
    } catch (err: any) {
      showNotification(`Erreur : ${err.message}`);
    }
  };

  const handleDelete = (source: SourceRecord) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement « ${source.name} » du registre ?`)) {
      deleteSource(source.id);
      showNotification(`Source « ${source.name} » supprimée.`);
    }
  };

  const handleToggle = (source: SourceRecord) => {
    toggleSourceActive(source.id);
    showNotification(`Statut de « ${source.name} » mis à jour : ${!source.active ? 'Activée' : 'Désactivée'}`);
  };

  const handleTestConnection = async (source: SourceRecord) => {
    await testConnection(source.id);
  };

  const handleManualSyncSingle = async (source: SourceRecord) => {
    const res = await syncSource(source.id);
    showNotification(res.message);
  };

  const handleSyncAll = async () => {
    const res = await syncAll();
    showNotification(`Synchronisation globale terminée : ${res.succeeded} sur ${res.total} sources synchronisées.`);
  };

  const handleReset = () => {
    if (window.confirm('Voulez-vous réinitialiser le registre avec les 8 organismes officiels béninois de référence (SICA ANPE, PSIE, ADPME, PRODIJ, FNDA, FNM, FNPEEJ, AZOLI) ?')) {
      resetDefaults();
      showNotification('Registre réinitialisé avec les sources officielles béninoises.');
    }
  };

  const toggleCategorySelection = (cat: SourceCategory) => {
    setFormData((prev) => {
      const exists = prev.categories.includes(cat);
      if (exists) {
        return { ...prev, categories: prev.categories.filter((c) => c !== cat) };
      } else {
        return { ...prev, categories: [...prev.categories, cat] };
      }
    });
  };

  // Filter sources
  const filteredSources = sources.filter((s) => {
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchesName = s.name.toLowerCase().includes(q);
      const matchesSlug = s.slug.toLowerCase().includes(q);
      const matchesOperator = (s.operator_name || '').toLowerCase().includes(q);
      if (!matchesName && !matchesSlug && !matchesOperator) return false;
    }
    if (typeFilter !== 'ALL' && s.source_type !== typeFilter) {
      return false;
    }
    return true;
  });

  const formatDate = (isoStr: string | null) => {
    if (!isoStr) return 'Jamais';
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

  // Error count across all sources
  const totalErrorsCount = sources.reduce((acc, s) => acc + (s.error_logs?.length || 0), 0);
  const activeSourcesCount = sources.filter(s => s.active).length;
  const officialSourcesCount = sources.filter(s => s.official).length;

  return (
    <div className="pb-24 space-y-8 font-sans">
      <PageHeader
        kicker="REGISTRE WIKIJOB · ADMINISTRATION & SURVEILLANCE"
        title="Gestionnaire des Sources & Connecteurs Bénin"
        description="Configuration des organismes publics (ANPE, PSIE, ADPME, PRODIJ, FNDA...), paramétrage des fréquences de scraping contrôlé et suivi d'intégrité."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/admin/wikijob/engine')}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-[#404040] text-xs font-mono font-medium rounded-xl cursor-pointer transition-colors"
            >
              Moteur d'Agrégation
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/wikijob/jobs')}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-[#404040] text-xs font-mono font-medium rounded-xl cursor-pointer transition-colors"
            >
              Supervision Jobs 24h
            </button>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Ajouter une Source</span>
            </button>
          </div>
        }
      />

      <Container>
        <div className="space-y-6">
          {/* Global Alert Notification Banner */}
          {globalMessage && (
            <div className="p-4 bg-slate-900 text-white rounded-2xl border border-[#0070C0]/50 flex items-center justify-between shadow-lg text-xs font-mono animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <Radio className="w-4 h-4 text-[#FF6600] animate-pulse shrink-0" />
                <span>{globalMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setGlobalMessage(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 1. INFORMATIONS PRIORITAIRES & STATUS BAR                                  */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF5FC] text-[#0070C0] border border-[#A3D1F1] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#0070C0]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#0070C0] tracking-wider">
                    SANTÉ GLOBALE DU REGISTRE
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-[#0E8A5E] border border-emerald-200">
                    OPÉRATIONNEL
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#262626] font-sans mt-0.5">
                  {activeSourcesCount} / {sources.length} sources surveillées en continu
                </h3>
                <p className="text-xs text-[#404040] mt-0.5">
                  Collecte régulière synchronisée avec les protocoles légaux de la République du Bénin.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleSyncAll}
                disabled={loading}
                className="px-4 py-2.5 bg-[#FF6600] hover:bg-[#E55C00] text-white font-mono font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors disabled:opacity-50"
                title="Déclencher une collecte sur l'ensemble des sources actives"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Collecte en cours...' : 'Synchroniser Toutes les Sources'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-[#404040] rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Rétablir les 8 sources de référence par défaut"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Rétablir Défauts</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. INDICATEURS CLÉS                                                       */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                SOURCES HOMOLOGUÉES
              </span>
              <strong className="text-2xl font-extrabold text-[#0070C0] font-mono block">
                {officialSourcesCount}
              </strong>
              <span className="text-[11px] text-[#404040]">Organismes publics & ministères</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-[#0E8A5E] uppercase tracking-wider block font-bold">
                CONNECTEURS ACTIFS
              </span>
              <strong className="text-2xl font-extrabold text-[#0E8A5E] font-mono block">
                {activeSourcesCount}
              </strong>
              <span className="text-[11px] text-emerald-800">Scraping & webhooks habilités</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                OPPORTUNITÉS INDEXÉES
              </span>
              <strong className="text-2xl font-extrabold text-[#262626] font-mono block">
                {sources.reduce((acc, s) => acc + (s.opportunities?.length || 0), 0)}
              </strong>
              <span className="text-[11px] text-[#404040]">Extraites depuis les registres</span>
            </div>

            <div className={`p-5 rounded-2xl border shadow-xs space-y-1 ${
              totalErrorsCount > 0 
                ? 'bg-[#FFF3EB] border-[#FFC49E]' 
                : 'bg-white border-slate-200'
            }`}>
              <span className={`text-[11px] font-mono uppercase tracking-wider block font-bold ${
                totalErrorsCount > 0 ? 'text-[#FF6600]' : 'text-slate-400'
              }`}>
                ALERTES & ANOMALIES
              </span>
              <strong className={`text-2xl font-extrabold font-mono block ${
                totalErrorsCount > 0 ? 'text-[#FF6600]' : 'text-slate-400'
              }`}>
                {totalErrorsCount}
              </strong>
              <span className={`text-[11px] ${totalErrorsCount > 0 ? 'text-amber-800 font-semibold' : 'text-slate-500'}`}>
                {totalErrorsCount > 0 ? 'Requiert votre attention' : 'Tous connecteurs nominaux'}
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. BARRE DE RECHERCHE & FILTRES PROFESSIONNELLE                          */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher par organisme, sigle, slug, tutelle..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#262626] outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white transition-all font-sans"
                />
              </div>

              <div className="w-full sm:w-auto shrink-0">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full sm:w-64 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-[#404040] outline-none focus:ring-2 focus:ring-[#0070C0] cursor-pointer"
                >
                  <option value="ALL">Toutes les méthodes de collecte</option>
                  {ALL_ACQUISITION_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. DONNÉES DÉTAILLÉES : TABLEAU DESKTOP                                   */}
          {/* ========================================================================= */}
          <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-5">Organisme & Sigle</th>
                    <th className="py-4 px-4">Méthode Technique</th>
                    <th className="py-4 px-4">Fréquence</th>
                    <th className="py-4 px-4 text-center">Statut Actif</th>
                    <th className="py-4 px-4">Dernière Synchro</th>
                    <th className="py-4 px-4 text-center">Opportunités</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {filteredSources.map((s) => {
                    const isTesting = testingId === s.id;
                    const isSyncing = syncingId === s.id;
                    const hasErrors = (s.error_logs?.length || 0) > 0;

                    return (
                      <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Name & Slug */}
                        <td className="py-4 px-5 max-w-xs">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#0070C0] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-2xs">
                              {s.logo_text || s.name.substring(0, 3).toUpperCase()}
                            </div>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5 font-bold text-[#262626]">
                                <span>{s.name}</span>
                                {s.official && (
                                  <span title="Organisme officiel d'État">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#0070C0] shrink-0" />
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] font-mono text-[#7D7D7D] flex items-center gap-2">
                                <span>slug: <code className="text-[#0070C0]">{s.slug}</code></span>
                                {s.operator_name && (
                                  <>
                                    <span>•</span>
                                    <span className="truncate max-w-[120px]" title={s.operator_name}>{s.operator_name}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Acquisition Type */}
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <SourceTypeBadge type={s.source_type} size="sm" />
                            <div className="text-[10px] font-mono text-slate-400 truncate max-w-[180px]" title={s.website}>
                              {s.website}
                            </div>
                          </div>
                        </td>

                        {/* Frequency */}
                        <td className="py-4 px-4 font-mono font-medium text-[#404040]">
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px]">
                            {s.frequency}
                          </span>
                        </td>

                        {/* Active Toggle Switch */}
                        <td className="py-4 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggle(s)}
                            className={`w-10 h-5 inline-flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                              s.active ? 'bg-[#0E8A5E]' : 'bg-slate-300'
                            }`}
                            title={s.active ? 'Désactiver la source' : 'Activer la source'}
                          >
                            <div
                              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                                s.active ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </td>

                        {/* Last Sync */}
                        <td className="py-4 px-4">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <SourceStatusBadge status={s.sync_status} active={s.active} size="sm" />
                            </div>
                            <div className="text-[11px] font-mono text-slate-400">
                              {formatDate(s.last_checked_at || s.last_success_at)}
                            </div>
                            {s.last_sync_message && (
                              <div className="text-[10px] text-[#7D7D7D] font-sans truncate max-w-[200px]" title={s.last_sync_message}>
                                {s.last_sync_message}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Opportunities Count */}
                        <td className="py-4 px-4 text-center font-mono font-bold text-[#0070C0] text-sm">
                          {s.opportunities?.length || 0}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Test Connection Button */}
                            <button
                              type="button"
                              onClick={() => handleTestConnection(s)}
                              disabled={isTesting}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-[#404040] hover:text-[#0070C0] cursor-pointer transition-colors"
                              title="Tester la connexion et la latence"
                            >
                              <Zap className={`w-3.5 h-3.5 ${isTesting ? 'animate-pulse text-[#FF6600]' : ''}`} />
                            </button>

                            {/* Manual Sync Button */}
                            <button
                              type="button"
                              onClick={() => handleManualSyncSingle(s)}
                              disabled={isSyncing}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-[#404040] hover:text-[#0070C0] cursor-pointer transition-colors"
                              title="Lancer une collecte manuelle"
                            >
                              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#0070C0]' : ''}`} />
                            </button>

                            {/* View Errors Log */}
                            <button
                              type="button"
                              onClick={() => setViewingErrorsSource(s)}
                              className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
                                hasErrors 
                                  ? 'border-[#FFC49E] bg-[#FFF3EB] text-[#FF6600] hover:bg-rose-100' 
                                  : 'border-slate-200 text-slate-400 hover:bg-slate-50'
                              }`}
                              title={hasErrors ? `${s.error_logs.length} anomalie(s) signalée(s)` : 'Journal des erreurs'}
                            >
                              <AlertTriangle className="w-3.5 h-3.5" />
                            </button>

                            {/* Edit Button */}
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(s)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-[#404040] hover:text-[#0070C0] cursor-pointer transition-colors"
                              title="Modifier la source"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* View Public Detail */}
                            <button
                              type="button"
                              onClick={() => navigate(`/wikijob/sources/${s.slug}`)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-[#404040] hover:text-[#0070C0] cursor-pointer transition-colors"
                              title="Consulter la fiche publique"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleDelete(s)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
                              title="Supprimer la source"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredSources.length === 0 && (
              <div className="p-10 text-center text-xs text-[#7D7D7D] font-mono">
                Aucune source ne correspond aux critères de filtre.
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 4. ADAPTATION MOBILE : LISTE DE CARTES STRUCTURÉES (PAS DE SCROLL HORIZONT) */}
          {/* ========================================================================= */}
          <div className="lg:hidden space-y-3 font-sans">
            {filteredSources.map((s) => {
              const hasErrors = (s.error_logs?.length || 0) > 0;

              return (
                <div key={s.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0070C0] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        {s.logo_text || s.name.substring(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-sm text-[#262626]">
                          <span>{s.name}</span>
                          {s.official && (
                            <ShieldCheck className="w-3.5 h-3.5 text-[#0070C0] shrink-0" />
                          )}
                        </div>
                        <div className="text-xs font-mono text-[#7D7D7D]">
                          slug: <code className="text-[#0070C0]">{s.slug}</code>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggle(s)}
                      className={`w-10 h-5 inline-flex items-center rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                        s.active ? 'bg-[#0E8A5E]' : 'bg-slate-300'
                      }`}
                      title={s.active ? 'Désactiver' : 'Activer'}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          s.active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Méthode</span>
                      <SourceTypeBadge type={s.source_type} size="sm" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Fréquence</span>
                      <span className="font-bold text-[#262626]">{s.frequency}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Opportunités</span>
                      <span className="font-bold text-[#0070C0]">{s.opportunities?.length || 0} indexées</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Dernière synchro</span>
                      <span className="text-[#404040]">{formatDate(s.last_checked_at || s.last_success_at)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleTestConnection(s)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#404040] rounded-lg font-mono text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <Zap className="w-3 h-3 text-[#FF6600]" />
                        <span>Tester</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleManualSyncSingle(s)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#404040] rounded-lg font-mono text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3 text-[#0070C0]" />
                        <span>Sync</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(s)}
                        className="p-1.5 text-slate-600 hover:text-[#0070C0] border border-slate-200 rounded-lg cursor-pointer"
                        title="Modifier"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/wikijob/sources/${s.slug}`)}
                        className="p-1.5 text-slate-600 hover:text-[#0070C0] border border-slate-200 rounded-lg cursor-pointer"
                        title="Fiche publique"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(s)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 border border-slate-200 rounded-lg cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* 5. JOURNAL CONSOLIDÉ DES ANOMALIES & AUDIT                                */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Activity className="w-5 h-5 text-[#0070C0]" />
                <h3 className="font-bold text-[#262626] text-base font-sans">
                  Journal Consolidé des Alertes de Collecte
                </h3>
              </div>
              <span className="text-xs font-mono text-[#7D7D7D]">
                Surveillance en continu
              </span>
            </div>

            <p className="text-xs text-[#404040] leading-relaxed font-sans">
              Le registre conserve l'historique des statuts de scraping, les réponses HTTP des portails publics béninois et les anomalies éventuelles (temps d'arrêt serveur, modifications de balises HTML, connecteurs en attente).
            </p>

            <div className="space-y-2 pt-2">
              {sources.some(s => s.error_logs && s.error_logs.length > 0) ? (
                sources
                  .filter(s => s.error_logs && s.error_logs.length > 0)
                  .map(s => (
                    <div key={s.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="font-bold text-[#262626]">{s.name}</strong>
                        <span className="text-[10px] text-[#FF6600] font-bold bg-[#FFF3EB] px-2.5 py-0.5 rounded border border-[#FFC49E]">
                          {s.error_logs.length} entrée(s)
                        </span>
                      </div>
                      <div className="text-xs text-[#404040] font-sans">
                        Dernier incident : {s.error_logs[0]?.message} ({formatDate(s.error_logs[0]?.timestamp)})
                      </div>
                    </div>
                  ))
              ) : (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-2.5 text-xs font-mono text-[#0E8A5E]">
                  <CheckCircle2 className="w-4 h-4 text-[#0E8A5E] shrink-0" />
                  <span>Tous les connecteurs et sources sont actuellement sains. Aucune erreur de collecte répertoriée.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* ========================================================================= */}
      {/* MODAL 1: ADD / EDIT SOURCE FORM                                          */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto overscroll-contain flex min-h-full items-center justify-center p-3 sm:p-6 text-center animate-in fade-in duration-200">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
          />

          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] text-left">
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0070C0] text-white flex items-center justify-center font-bold">
                  {editingSource ? <Edit3 className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#262626]">
                    {editingSource ? `Modifier « ${editingSource.name} »` : 'Ajouter une source au registre'}
                  </h3>
                  <span className="text-xs text-[#7D7D7D] font-mono">
                    Paramétrage de la collecte et de l'indexation WikiJob
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="overflow-y-auto overscroll-contain flex-1 p-5 sm:p-6 space-y-6 text-xs font-sans">
              {/* Section 1: Identité */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0070C0] uppercase tracking-wider">
                  <Database className="w-4 h-4" />
                  <span>1. Identité de l'Organisme</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[#404040] font-bold block">
                      NOM DE L'ORGANISME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: SICA ANPE Bénin"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#262626] outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white"
                    />
                    <p className="text-[10px] text-slate-400">Intitulé officiel complet du portail ou ministère.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[#404040] font-bold block">
                      SIGLE / ACRONYME (Ex: ANPE, PSIE)
                    </label>
                    <input
                      type="text"
                      maxLength={8}
                      placeholder="ANPE"
                      value={formData.logo_text}
                      onChange={(e) => setFormData({ ...formData, logo_text: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#262626] outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white font-mono uppercase"
                    />
                    <p className="text-[10px] text-slate-400">Sert d'icône visuelle dans les listes.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[#404040] font-bold block">
                      SLUG URL IDENTIFIANT
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: sica-anpe (auto-généré si vide)"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#262626] outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[#404040] font-bold block">
                      MINISTÈRE OU TUTELLE
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Ministère du Travail / Présidence"
                      value={formData.operator_name}
                      onChange={(e) => setFormData({ ...formData, operator_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#262626] outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[#404040] font-bold block">
                    SITE WEB OFFICIEL (URL) *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://anpe.bj"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#262626] outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[#404040] font-bold block">
                    DESCRIPTION DU MANDAT & DE L'ORGANISME *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Ex: Établissement public assurant l'intermédiation pour l'emploi des jeunes..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#262626] outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white"
                  />
                </div>
              </div>

              {/* Section 2: Méthode et Paramètres */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0070C0] uppercase tracking-wider">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>2. Protocole de Collecte & Fréquence</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[#404040] font-bold block">
                      MÉTHODE D'ACQUISITION TECHNIQUE *
                    </label>
                    <select
                      value={formData.source_type}
                      onChange={(e) => setFormData({ ...formData, source_type: e.target.value as SourceAcquisitionType })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-[#0070C0]"
                    >
                      {ALL_ACQUISITION_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[#404040] font-bold block">
                      FRÉQUENCE DE SURVEILLANCE
                    </label>
                    <select
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value as SourceSyncFrequency })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-[#0070C0]"
                    >
                      <option value="HOURLY">Toutes les heures (Horaire)</option>
                      <option value="DAILY">Quotidienne (Chaque 24h)</option>
                      <option value="WEEKLY">Hebdomadaire</option>
                      <option value="MANUAL">Manuelle à la demande</option>
                    </select>
                  </div>
                </div>

                {/* Optional Endpoints */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <span className="font-mono text-[10px] text-slate-500 uppercase font-bold block">
                    Points d'accès spécifiques (Optionnels)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#404040] block">URL API Officielle</label>
                      <input
                        type="url"
                        placeholder="https://api.source.bj/v1/jobs"
                        value={formData.api_url}
                        onChange={(e) => setFormData({ ...formData, api_url: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#404040] block">URL Flux RSS / Atom</label>
                      <input
                        type="url"
                        placeholder="https://source.bj/feed"
                        value={formData.rss_url}
                        onChange={(e) => setFormData({ ...formData, rss_url: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <label className="font-mono text-[#404040] font-bold block">
                    CATÉGORIES D'OPPORTUNITÉS PUBLIÉES :
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {ALL_CATEGORIES.map(cat => {
                      const isSelected = formData.categories.includes(cat);
                      return (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => toggleCategorySelection(cat)}
                          className={`px-3 py-1 rounded-lg text-xs font-mono border cursor-pointer transition-colors ${
                            isSelected 
                              ? 'bg-[#0070C0] text-white border-[#0070C0] font-bold shadow-2xs' 
                              : 'bg-slate-50 text-[#404040] border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Checkbox Flags */}
                <div className="flex flex-wrap gap-6 pt-3 border-t border-slate-100">
                  <label className="inline-flex items-center gap-2 cursor-pointer font-mono text-[#404040]">
                    <input
                      type="checkbox"
                      checked={formData.official}
                      onChange={(e) => setFormData({ ...formData, official: e.target.checked })}
                      className="rounded text-[#0070C0] focus:ring-[#0070C0]"
                    />
                    <span>Organisme officiel d'État</span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer font-mono text-[#404040]">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="rounded text-[#0070C0] focus:ring-[#0070C0]"
                    />
                    <span>Source active (surveillance activée)</span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer font-mono text-[#404040]">
                    <input
                      type="checkbox"
                      checked={formData.scraping_enabled}
                      onChange={(e) => setFormData({ ...formData, scraping_enabled: e.target.checked })}
                      className="rounded text-[#0070C0] focus:ring-[#0070C0]"
                    />
                    <span>Extraction HTML activée</span>
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 rounded-xl font-mono text-[#404040] hover:bg-slate-50 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono font-bold rounded-xl cursor-pointer shadow-xs transition-colors"
                >
                  {editingSource ? 'Enregistrer les modifications' : 'Ajouter au registre'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CONNECTION TEST RESULT MODAL                                     */}
      {/* ========================================================================= */}
      {testResult && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto overscroll-contain flex min-h-full items-center justify-center p-3 sm:p-6 text-center animate-in fade-in duration-200">
          <div
            onClick={() => setTestResult(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
          />

          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col text-left">
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-[#FF6600]" />
                <h3 className="font-bold text-[#262626] text-base font-sans">
                  Rapport du Test de Connexion
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTestResult(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">Statut de la sonde :</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                  testResult.status === 'SUCCESS' 
                    ? 'bg-emerald-100 text-[#0E8A5E]' 
                    : testResult.status === 'PENDING'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {testResult.status === 'SUCCESS' ? 'CONNECTIVITÉ VALIDÉE' : testResult.status === 'PENDING' ? 'CONNECTEUR EN HOMOLOGATION' : 'ANOMALIE DE CONNEXION'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">Temps de latence réseau :</span>
                <span className="font-bold text-[#262626]">{testResult.responseTimeMs} ms</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Diagnostic du moteur :
                </span>
                <p className="text-[#262626] font-sans leading-relaxed text-xs">
                  {testResult.message}
                </p>
              </div>

              {testResult.details && (
                <div className="p-3.5 bg-slate-100 rounded-2xl space-y-1 text-[11px]">
                  <span className="text-slate-500 font-bold block">Détails techniques :</span>
                  <pre className="text-slate-700 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(testResult.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setTestResult(null)}
                className="px-5 py-2.5 bg-[#0070C0] text-white rounded-xl text-xs font-mono font-bold hover:bg-[#005FA3] cursor-pointer shadow-xs transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ERROR LOGS VIEWER MODAL                                          */}
      {/* ========================================================================= */}
      {viewingErrorsSource && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto overscroll-contain flex min-h-full items-center justify-center p-3 sm:p-6 text-center animate-in fade-in duration-200">
          <div
            onClick={() => setViewingErrorsSource(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
          />

          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] text-left">
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-[#FF6600]" />
                <h3 className="font-bold text-[#262626] text-base font-sans">
                  Journal d'Erreurs : {viewingErrorsSource.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingErrorsSource(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain flex-1 p-5 sm:p-6 space-y-3 font-mono text-xs">
              {viewingErrorsSource.error_logs && viewingErrorsSource.error_logs.length > 0 ? (
                viewingErrorsSource.error_logs.map(log => (
                  <div key={log.id} className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-rose-800">{log.level} {log.code ? `• ${log.code}` : ''}</span>
                      <span className="text-slate-500">{formatDate(log.timestamp)}</span>
                    </div>
                    <p className="text-rose-900 font-sans text-xs">
                      {log.message}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-[#0E8A5E] mx-auto" />
                  <p className="text-[#262626] font-bold">Aucune anomalie enregistrée pour cet organisme.</p>
                  <p className="text-slate-400 text-[11px]">Les requêtes de synchronisation se déroulent nominalement.</p>
                </div>
              )}
            </div>

            <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
              <span className="text-[11px] font-mono text-[#7D7D7D]">
                Total erreurs : {viewingErrorsSource.error_logs?.length || 0}
              </span>
              <button
                type="button"
                onClick={() => setViewingErrorsSource(null)}
                className="px-5 py-2.5 bg-[#0070C0] text-white rounded-xl text-xs font-mono font-bold hover:bg-[#005FA3] cursor-pointer shadow-xs"
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
