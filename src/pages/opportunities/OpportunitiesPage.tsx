import React, { useState, useMemo } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { PageHeader } from '../../components/layout/PageHeader';
import { Container } from '../../components/ui/Container';
import { OpportunityCard } from '../../components/opportunities/OpportunityCard';
import { OpportunityDetail } from '../../components/opportunities/OpportunityDetail';
import { 
  MARKETPLACE_OPPORTUNITIES, 
  OPPORTUNITY_DOMAINS, 
  OPPORTUNITY_LOCATIONS, 
  OPPORTUNITY_TYPES, 
  OPPORTUNITY_LEVELS, 
  OPPORTUNITY_DEADLINES 
} from '../../data/opportunitiesData';
import { MarketplaceOpportunity, OpportunityFilterState } from '../../types/opportunity';
import { 
  Search, 
  Filter, 
  Bookmark, 
  Sparkles, 
  Briefcase, 
  CheckCircle2, 
  Calendar, 
  Layers, 
  Compass, 
  X, 
  Award, 
  RotateCcw,
  LayoutGrid,
  List,
  Table as TableIcon,
  ShieldCheck,
  Building2,
  MapPin,
  ExternalLink,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { ApplyButton } from '../../components/opportunities/ApplyButton';
import { SaveOpportunity } from '../../components/opportunities/SaveOpportunity';
import { Drawer } from '../../components/ui/Drawer';

type ViewMode = 'grid' | 'list' | 'table';

export const OpportunitiesPage: React.FC = () => {
  const { navigate } = useRouter();

  // Primary filters state
  const [filters, setFilters] = useState<OpportunityFilterState>({
    searchQuery: '',
    selectedDomain: 'Tous les domaines',
    selectedLocation: 'Toutes les localisations',
    selectedType: 'Tous les types',
    selectedLevel: 'Tous niveaux',
    selectedDeadline: 'Toutes les dates',
    onlySaved: false
  });

  // Additional fine-grain filter: Source origin
  const [sourceFilter, setSourceFilter] = useState<'ALL' | 'TSF_ONLY' | 'AGGREGATED_ONLY'>('ALL');

  // Display mode switcher
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Mobile filters drawer open state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Saved bookmark IDs & Detail modal
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<MarketplaceOpportunity | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleToggleSave = (id: string) => {
    setSavedOpportunityIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showNotification('Opportunité retirée de vos favoris');
        return prev.filter(item => item !== id);
      } else {
        showNotification('Opportunité enregistrée dans votre carnet personnel');
        return [...prev, id];
      }
    });
  };

  const handleApplied = (id: string) => {
    showNotification('Candidature enregistrée et transmise au secrétariat académique TSF !');
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedDomain: 'Tous les domaines',
      selectedLocation: 'Toutes les localisations',
      selectedType: 'Tous les types',
      selectedLevel: 'Tous niveaux',
      selectedDeadline: 'Toutes les dates',
      onlySaved: false
    });
    setSourceFilter('ALL');
  };

  // Filter logic
  const filteredOpportunities = useMemo(() => {
    return MARKETPLACE_OPPORTUNITIES.filter((opp) => {
      // Search
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchText = `${opp.title} ${opp.organization} ${opp.description} ${opp.location} ${opp.domain}`.toLowerCase();
        if (!matchText.includes(query)) return false;
      }

      // Domain
      if (filters.selectedDomain !== 'Tous les domaines' && opp.domain !== filters.selectedDomain) {
        return false;
      }

      // Location
      if (filters.selectedLocation !== 'Toutes les localisations') {
        if (filters.selectedLocation === 'Panafricain / Hybride') {
          if (!opp.location.includes('Panafricain') && !opp.location.includes('Hybride')) return false;
        } else if (!opp.location.includes(filters.selectedLocation.split(',')[0])) {
          return false;
        }
      }

      // Type
      if (filters.selectedType !== 'Tous les types' && opp.type !== filters.selectedType) {
        return false;
      }

      // Level
      if (filters.selectedLevel !== 'Tous niveaux' && opp.level !== filters.selectedLevel) {
        return false;
      }

      // Deadline urgency filter
      if (filters.selectedDeadline !== 'Toutes les dates') {
        if (filters.selectedDeadline === 'Urgent (< 15 jours)') {
          if (!opp.deadline.includes('Novembre 2026')) return false;
        } else if (filters.selectedDeadline === 'Moins de 30 jours') {
          if (!opp.deadline.includes('Novembre') && !opp.deadline.includes('Décembre')) return false;
        }
      }

      // Saved filter
      if (filters.onlySaved && !savedOpportunityIds.includes(opp.id)) {
        return false;
      }

      // Source origin filter
      const isTsf = opp.organizationType === 'Institution TSF' || opp.organization.includes('TSF');
      if (sourceFilter === 'TSF_ONLY' && !isTsf) return false;
      if (sourceFilter === 'AGGREGATED_ONLY' && isTsf) return false;

      return true;
    });
  }, [filters, savedOpportunityIds, sourceFilter]);

  const activeFiltersCount = [
    filters.selectedDomain !== 'Tous les domaines',
    filters.selectedLocation !== 'Toutes les localisations',
    filters.selectedType !== 'Tous les types',
    filters.selectedLevel !== 'Tous niveaux',
    filters.selectedDeadline !== 'Toutes les dates',
    filters.onlySaved,
    sourceFilter !== 'ALL',
    Boolean(filters.searchQuery.trim())
  ].filter(Boolean).length;

  // Identify featured flagship opportunity (if present in results)
  const featuredOpportunity = useMemo(() => {
    return filteredOpportunities.find(opp => opp.featured) || null;
  }, [filteredOpportunities]);

  return (
    <div className="pb-24 space-y-10 overflow-x-hidden">
      <PageHeader
        kicker="PLACE DES MARCHÉS & GUICHET PANAFRICAIN HOMOLOGUÉ"
        title="TSF Opportunities — Postes Dirigeants, Bourses & Financements"
        description="Le carrefour continental reliant les esprits bâtisseurs d'Afrique aux postes d'impact, bourses d'excellence doctorales, dotations d'amorçage et mandats stratégiques."
        actions={
          <button
            type="button"
            onClick={() => navigate('/wikijob/intelligence')}
            className="px-4 py-2 bg-[#FF6600] hover:bg-[#E55C00] text-white font-mono font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>WikiJob Intelligence & Matching</span>
          </button>
        }
      />

      <Container>
        <div className="space-y-10">
          {/* Notification Toast */}
          {notification && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-mono text-emerald-800 flex items-center justify-between shadow-xs animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{notification}</span>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="text-emerald-700 hover:text-emerald-950 font-bold ml-4 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* RECHERCHE & COCKPIT DE FILTRAGE PROFESSIONNEL (PIÈCE MAÎTRESSE)           */}
          {/* ========================================================================= */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Master Search Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0070C0] flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  <span>Recherche Rapide & Mots-Clés</span>
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {filteredOpportunities.length} opportunité{filteredOpportunities.length > 1 ? 's' : ''} indexée{filteredOpportunities.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher par mot-clé (ex: IA, solaire, micro-grid, bourse d'excellence, Kigali, énergie, chercheur)..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(f => ({ ...f, searchQuery: e.target.value }))}
                  className="w-full pl-12 pr-28 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white transition-all font-sans"
                />
                {filters.searchQuery && (
                  <button
                    type="button"
                    onClick={() => setFilters(f => ({ ...f, searchQuery: '' }))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    Effacer ✕
                  </button>
                )}
              </div>
            </div>

            {/* Quick Segmented Source Toggle: Toutes / TSF / Agrégées */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 uppercase font-bold">SOURCE :</span>
                <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setSourceFilter('ALL')}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                      sourceFilter === 'ALL'
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Toutes sources ({MARKETPLACE_OPPORTUNITIES.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSourceFilter('TSF_ONLY')}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                      sourceFilter === 'TSF_ONLY'
                        ? 'bg-[#0070C0] text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-[#0070C0]'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Opportunités TSF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSourceFilter('AGGREGATED_ONLY')}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                      sourceFilter === 'AGGREGATED_ONLY'
                        ? 'bg-[#262626] text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Opportunités agrégées</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons: Bookmarks & Reset */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFilters(f => ({ ...f, onlySaved: !f.onlySaved }))}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                    filters.onlySaved
                      ? 'bg-blue-50 border-blue-200 text-[#0070C0] font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${filters.onlySaved ? 'fill-[#0070C0] text-[#0070C0]' : ''}`} />
                  <span>Enregistrements ({savedOpportunityIds.length})</span>
                </button>

                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#FF6600] hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Réinitialiser ({activeFiltersCount})</span>
                  </button>
                )}

                {/* Mobile Filter Trigger Button (opens mobile Drawer) */}
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#0070C0]" />
                  <span>Filtres ({activeFiltersCount})</span>
                </button>
              </div>
            </div>

            {/* Desktop Horizontal Filters Grid */}
            <div className="hidden md:block space-y-4 pt-2 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* Filter 1: Type */}
                <div>
                  <label className="block text-[11px] font-mono uppercase font-bold text-slate-500 mb-1">
                    Type d'Opportunité
                  </label>
                  <select
                    value={filters.selectedType}
                    onChange={(e) => setFilters(f => ({ ...f, selectedType: e.target.value }))}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#0070C0] text-slate-800"
                  >
                    {OPPORTUNITY_TYPES.map((t, idx) => (
                      <option key={idx} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Filter 2: Domaine */}
                <div>
                  <label className="block text-[11px] font-mono uppercase font-bold text-slate-500 mb-1">
                    Domaine Stratégique
                  </label>
                  <select
                    value={filters.selectedDomain}
                    onChange={(e) => setFilters(f => ({ ...f, selectedDomain: e.target.value }))}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#0070C0] text-slate-800"
                  >
                    {OPPORTUNITY_DOMAINS.map((d, idx) => (
                      <option key={idx} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Filter 3: Localisation */}
                <div>
                  <label className="block text-[11px] font-mono uppercase font-bold text-slate-500 mb-1">
                    Localisation & Hub
                  </label>
                  <select
                    value={filters.selectedLocation}
                    onChange={(e) => setFilters(f => ({ ...f, selectedLocation: e.target.value }))}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#0070C0] text-slate-800"
                  >
                    {OPPORTUNITY_LOCATIONS.map((l, idx) => (
                      <option key={idx} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                {/* Filter 4: Niveau */}
                <div>
                  <label className="block text-[11px] font-mono uppercase font-bold text-slate-500 mb-1">
                    Niveau d'Expérience
                  </label>
                  <select
                    value={filters.selectedLevel}
                    onChange={(e) => setFilters(f => ({ ...f, selectedLevel: e.target.value }))}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#0070C0] text-slate-800"
                  >
                    {OPPORTUNITY_LEVELS.map((lvl, idx) => (
                      <option key={idx} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>

                {/* Filter 5: Deadline */}
                <div>
                  <label className="block text-[11px] font-mono uppercase font-bold text-slate-500 mb-1">
                    Échéance / Urgence
                  </label>
                  <select
                    value={filters.selectedDeadline}
                    onChange={(e) => setFilters(f => ({ ...f, selectedDeadline: e.target.value }))}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#0070C0] text-slate-800"
                  >
                    {OPPORTUNITY_DEADLINES.map((dl, idx) => (
                      <option key={idx} value={dl}>{dl}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filter Drawer (Native mobile experience) */}
            <Drawer
              isOpen={isMobileFiltersOpen}
              onClose={() => setIsMobileFiltersOpen(false)}
              title="Filtres de Recherche"
              description="Affinez les opportunités d'excellence"
              footer={
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-4 py-2.5 text-xs font-mono font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg"
                  >
                    Réinitialiser
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="px-5 py-2.5 text-xs font-mono font-bold text-white bg-[#0070C0] hover:bg-[#005FA3] rounded-lg shadow-xs"
                  >
                    Voir les résultats ({filteredOpportunities.length})
                  </button>
                </div>
              }
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                    Type d'Opportunité
                  </label>
                  <select
                    value={filters.selectedType}
                    onChange={(e) => setFilters(f => ({ ...f, selectedType: e.target.value }))}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0070C0] text-slate-800"
                  >
                    {OPPORTUNITY_TYPES.map((t, idx) => (
                      <option key={idx} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                    Domaine Stratégique
                  </label>
                  <select
                    value={filters.selectedDomain}
                    onChange={(e) => setFilters(f => ({ ...f, selectedDomain: e.target.value }))}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0070C0] text-slate-800"
                  >
                    {OPPORTUNITY_DOMAINS.map((d, idx) => (
                      <option key={idx} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                    Localisation & Hub
                  </label>
                  <select
                    value={filters.selectedLocation}
                    onChange={(e) => setFilters(f => ({ ...f, selectedLocation: e.target.value }))}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0070C0] text-slate-800"
                  >
                    {OPPORTUNITY_LOCATIONS.map((l, idx) => (
                      <option key={idx} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                    Niveau d'Expérience
                  </label>
                  <select
                    value={filters.selectedLevel}
                    onChange={(e) => setFilters(f => ({ ...f, selectedLevel: e.target.value }))}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0070C0] text-slate-800"
                  >
                    {OPPORTUNITY_LEVELS.map((lvl, idx) => (
                      <option key={idx} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">
                    Échéance / Urgence
                  </label>
                  <select
                    value={filters.selectedDeadline}
                    onChange={(e) => setFilters(f => ({ ...f, selectedDeadline: e.target.value }))}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0070C0] text-slate-800"
                  >
                    {OPPORTUNITY_DEADLINES.map((dl, idx) => (
                      <option key={idx} value={dl}>{dl}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Drawer>
          </div>

          {/* ========================================================================= */}
          {/* FEATURED OPPORTUNITY SPOTLIGHT (PHARE)                                    */}
          {/* ========================================================================= */}
          {featuredOpportunity && !filters.onlySaved && (
            <div className="bg-gradient-to-br from-[#262626] via-[#1E293B] to-[#0F172A] text-white rounded-3xl p-6 sm:p-8 border border-[#0070C0]/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#0070C0]/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FF6600] text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>APPEL D'EXCELLENCE PHARE</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/10 text-[#38BDF8] border border-white/15">
                      {featuredOpportunity.type} · {featuredOpportunity.domain}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {featuredOpportunity.spots} postes ouverts
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug font-sans">
                    {featuredOpportunity.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-2">
                    {featuredOpportunity.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-300 pt-1 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span className="font-semibold text-white">{featuredOpportunity.organization}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{featuredOpportunity.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#FF6600] font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Clôture : {featuredOpportunity.deadline}</span>
                    </div>
                    {featuredOpportunity.compensationOrBudget && (
                      <div className="text-emerald-400 font-bold">
                        {featuredOpportunity.compensationOrBudget}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex lg:flex-col items-center lg:items-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                  <button
                    type="button"
                    onClick={() => setSelectedOpportunity(featuredOpportunity)}
                    className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs font-mono rounded-xl transition-colors cursor-pointer shadow-sm"
                  >
                    Examiner le dossier
                  </button>
                  <ApplyButton
                    opportunityId={featuredOpportunity.id}
                    opportunityTitle={featuredOpportunity.title}
                    onApply={handleApplied}
                    size="md"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* RESULTS HEADER & VIEW SWITCHER                                            */}
          {/* ========================================================================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-[#262626] font-sans">
                Appels & Postes Homologués
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                {filteredOpportunities.length} résultat{filteredOpportunities.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* View Mode Switcher: Grid vs Horizontal List vs Table */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">Affichage :</span>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#0070C0] font-bold shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Vue Grille Éditoriale"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Grille</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                    viewMode === 'list'
                      ? 'bg-white text-[#0070C0] font-bold shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Vue Cartes Horizontales"
                >
                  <List className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Liste</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                    viewMode === 'table'
                      ? 'bg-white text-[#0070C0] font-bold shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Vue Tableau Synthétique"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Tableau</span>
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* OPPORTUNITIES PRESENTATION BASED ON SELECTED VIEW MODE                     */}
          {/* ========================================================================= */}
          {filteredOpportunities.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#262626]">
                Aucune opportunité ne correspond à ces critères
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Modifiez vos mots-clés ou réinitialisez les critères de recherche pour consulter les autres appels ouverts sur le continent.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-[#0070C0] text-white text-xs font-mono rounded-lg hover:bg-[#005A9C] cursor-pointer"
              >
                Réinitialiser tous les filtres
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* 1. EDITORIAL GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  item={opp}
                  variant="card"
                  isSaved={savedOpportunityIds.includes(opp.id)}
                  onToggleSave={handleToggleSave}
                  onSelect={(selected) => setSelectedOpportunity(selected)}
                  onApplied={handleApplied}
                />
              ))}
            </div>
          ) : viewMode === 'list' ? (
            /* 2. HORIZONTAL LIST VIEW */
            <div className="space-y-4">
              {filteredOpportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  item={opp}
                  variant="horizontal"
                  isSaved={savedOpportunityIds.includes(opp.id)}
                  onToggleSave={handleToggleSave}
                  onSelect={(selected) => setSelectedOpportunity(selected)}
                  onApplied={handleApplied}
                />
              ))}
            </div>
          ) : (
            /* 3. SYNTHETIC TABLE VIEW (DESKTOP TABLE + MOBILE STRUCTURED LIST) */
            <div className="space-y-4">
              {/* Desktop Table View */}
              <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-sans">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono uppercase text-slate-500">
                        <th className="py-3 px-4 font-bold">Opportunité & Mandat</th>
                        <th className="py-3 px-4 font-bold">Organisation</th>
                        <th className="py-3 px-4 font-bold">Type & Niveau</th>
                        <th className="py-3 px-4 font-bold">Localisation</th>
                        <th className="py-3 px-4 font-bold">Échéance</th>
                        <th className="py-3 px-4 font-bold">Source</th>
                        <th className="py-3 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredOpportunities.map((opp) => {
                        const isTsf = opp.organizationType === 'Institution TSF' || opp.organization.includes('TSF');
                        const isSaved = savedOpportunityIds.includes(opp.id);
                        return (
                          <tr 
                            key={opp.id} 
                            onClick={() => setSelectedOpportunity(opp)}
                            className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                          >
                            {/* Title */}
                            <td className="py-3.5 px-4 max-w-xs">
                              <div className="font-bold text-[#262626] group-hover:text-[#0070C0] transition-colors leading-snug">
                                {opp.title}
                              </div>
                              <span className="text-[11px] text-slate-400 font-mono">
                                MàJ : {opp.postedDate}
                              </span>
                            </td>

                            {/* Organization */}
                            <td className="py-3.5 px-4 font-medium text-slate-700">
                              <div className="truncate max-w-[180px]">{opp.organization}</div>
                            </td>

                            {/* Type */}
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 block w-max">
                                {opp.type}
                              </span>
                              <span className="text-[10px] text-slate-400 block pt-0.5 truncate max-w-[120px]">
                                {opp.level}
                              </span>
                            </td>

                            {/* Location */}
                            <td className="py-3.5 px-4 text-slate-600 truncate max-w-[140px]">
                              {opp.location}
                            </td>

                            {/* Deadline */}
                            <td className="py-3.5 px-4 font-mono font-bold text-[#FF6600] whitespace-nowrap">
                              {opp.deadline}
                            </td>

                            {/* Source */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              {isTsf ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#0070C0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                  <ShieldCheck className="w-3 h-3" />
                                  <span>TSF</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                  <span>Agrégée</span>
                                </span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-2">
                                <SaveOpportunity
                                  opportunityId={opp.id}
                                  isSaved={isSaved}
                                  onToggleSave={handleToggleSave}
                                />
                                <ApplyButton
                                  opportunityId={opp.id}
                                  opportunityTitle={opp.title}
                                  onApply={handleApplied}
                                  size="sm"
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Structured Card List */}
              <div className="lg:hidden space-y-3 font-sans">
                {filteredOpportunities.map((opp) => {
                  const isTsf = opp.organizationType === 'Institution TSF' || opp.organization.includes('TSF');
                  const isSaved = savedOpportunityIds.includes(opp.id);
                  return (
                    <div
                      key={opp.id}
                      onClick={() => setSelectedOpportunity(opp)}
                      className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 cursor-pointer hover:border-[#0070C0]/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              {opp.type}
                            </span>
                            {isTsf ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#0070C0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                <ShieldCheck className="w-3 h-3" />
                                <span>TSF</span>
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                {opp.organizationType}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-sm text-[#262626] leading-snug break-words">
                            {opp.title}
                          </h4>
                          <p className="text-xs text-slate-600 font-medium">
                            {opp.organization} · <span className="text-slate-500">{opp.level}</span>
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Lieu</span>
                          <span className="text-slate-800 font-semibold truncate block">{opp.location}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Échéance</span>
                          <span className="text-[#FF6600] font-bold block">{opp.deadline}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => setSelectedOpportunity(opp)}
                          className="text-xs font-bold text-[#0070C0] flex items-center gap-1 font-mono cursor-pointer"
                        >
                          <span>Examiner</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-2">
                          <SaveOpportunity
                            opportunityId={opp.id}
                            isSaved={isSaved}
                            onToggleSave={handleToggleSave}
                          />
                          <ApplyButton
                            opportunityId={opp.id}
                            opportunityTitle={opp.title}
                            onApply={handleApplied}
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* DETAIL MODAL */}
          {selectedOpportunity && (
            <OpportunityDetail
              opportunity={selectedOpportunity}
              isSaved={savedOpportunityIds.includes(selectedOpportunity.id)}
              onToggleSave={handleToggleSave}
              onClose={() => setSelectedOpportunity(null)}
              onApplied={handleApplied}
            />
          )}
        </div>
      </Container>
    </div>
  );
};
