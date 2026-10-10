import React, { useState, useMemo } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { PageHeader } from '../../components/layout/PageHeader';
import { SubNav, SubNavItem } from '../../components/navigation/SubNav';
import { Container } from '../../components/ui/Container';
import { ProgramCard } from '../../components/cards/ProgramCard';
import { PROGRAMS_EXTENDED_DATA, getAllPrograms } from '../../data/programsData';
import { ProgramDetailView } from './components/ProgramDetailView';
import {
  Search,
  Filter,
  X,
  Sparkles,
  Layers,
  Users,
  MapPin,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

export const ProgramsPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  // All registered programs
  const allPrograms = useMemo(() => getAllPrograms(), []);

  // Check if a specific program detail is being viewed
  // Matches exact path like "/programmes/horizon-excellence" or slug
  const activeProgram = useMemo(() => {
    return allPrograms.find(
      (p) =>
        p.path === currentPath ||
        currentPath === `/programmes/${p.slug}` ||
        currentPath === `/programmes/${p.id}`
    );
  }, [allPrograms, currentPath]);

  // Dynamically generate SubNav from data for total extensibility
  const programSubNav: SubNavItem[] = useMemo(() => {
    return [
      { id: 'all', label: 'Tous les Programmes', path: '/programmes' },
      ...allPrograms.map((p) => ({
        id: p.slug,
        label: p.acronym ? `${p.title} [${p.acronym}]` : p.title,
        path: p.path
      }))
    ];
  }, [allPrograms]);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedPopulation, setSelectedPopulation] = useState<string>('all');
  const [selectedTerritory, setSelectedTerritory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract unique filter options dynamically from data so new programs automatically populate filters
  const domainOptions = useMemo(() => {
    const set = new Set(allPrograms.map((p) => p.domain).filter(Boolean));
    return Array.from(set);
  }, [allPrograms]);

  const populationOptions = useMemo(() => {
    const list = [
      { id: 'all', label: 'Toutes les populations' },
      { id: 'diplomes_cadres', label: 'Diplômés de master / doctorat & Cadres' },
      { id: 'autodidactes_etudiants', label: 'Étudiants & Autodidactes' },
      { id: 'scolaires_lyceens', label: 'Collégiens & Lycéens (14-18 ans)' },
      { id: 'entrepreneurs_osc', label: 'Entrepreneurs & Organisations Citoyennes' },
      { id: 'chercheurs_decideurs', label: 'Chercheurs & Décideurs Publics' }
    ];
    return list;
  }, []);

  const territoryOptions = useMemo(() => {
    const list = [
      { id: 'all', label: 'Tous les territoires' },
      { id: 'panafricain', label: 'Panafricain — 18 pays & Hubs' },
      { id: 'zones_eloignees', label: 'Territoires Périurbains & Éloignés' },
      { id: 'milieu_scolaire', label: 'Établissements Scolaires Partenaires' },
      { id: 'international', label: 'Diffusion Internationale & Diaspora' }
    ];
    return list;
  }, []);

  const statusOptions = useMemo(() => {
    return [
      { id: 'all', label: 'Tous les statuts' },
      { id: 'cohort_open', label: 'Cohortes ouvertes (Candidatures en cours)' },
      { id: 'active', label: 'Programmes actifs permanents' }
    ];
  }, []);

  const typeOptions = useMemo(() => {
    const set = new Set(allPrograms.map((p) => p.programType).filter(Boolean));
    return Array.from(set);
  }, [allPrograms]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedDomain !== 'all') count++;
    if (selectedPopulation !== 'all') count++;
    if (selectedTerritory !== 'all') count++;
    if (selectedStatus !== 'all') count++;
    if (selectedType !== 'all') count++;
    if (searchQuery.trim().length > 0) count++;
    return count;
  }, [selectedDomain, selectedPopulation, selectedTerritory, selectedStatus, selectedType, searchQuery]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedDomain('all');
    setSelectedPopulation('all');
    setSelectedTerritory('all');
    setSelectedStatus('all');
    setSelectedType('all');
  };

  // Filtered programs algorithm
  const filteredPrograms = useMemo(() => {
    return allPrograms.filter((p) => {
      // 1. Search Query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesAcronym = p.acronym?.toLowerCase().includes(q);
        const matchesSummary = p.summary.toLowerCase().includes(q);
        const matchesDomain = p.domain?.toLowerCase().includes(q);
        const matchesTarget = p.targetAudience.toLowerCase().includes(q);
        const matchesObjective = p.objective?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAcronym && !matchesSummary && !matchesDomain && !matchesTarget && !matchesObjective) {
          return false;
        }
      }

      // 2. Domain Filter
      if (selectedDomain !== 'all') {
        if (p.domain !== selectedDomain) return false;
      }

      // 3. Population Filter
      if (selectedPopulation !== 'all') {
        if (p.targetAudienceCategory !== selectedPopulation) return false;
      }

      // 4. Territory Filter
      if (selectedTerritory !== 'all') {
        if (p.territoryCategory !== selectedTerritory) return false;
      }

      // 5. Status Filter
      if (selectedStatus !== 'all') {
        if (selectedStatus === 'cohort_open') {
          const isOpen = p.status === 'cohort_open' || p.status === 'cohorte_ouverte';
          if (!isOpen) return false;
        } else if (selectedStatus === 'active') {
          const isActive = p.status === 'active' || p.status === 'actif';
          if (!isActive) return false;
        }
      }

      // 6. Type Filter
      if (selectedType !== 'all') {
        if (p.programType !== selectedType) return false;
      }

      return true;
    });
  }, [allPrograms, searchQuery, selectedDomain, selectedPopulation, selectedTerritory, selectedStatus, selectedType]);

  // If a specific detailed program is active, render ProgramDetailView
  if (activeProgram) {
    return (
      <div className="space-y-6">
        <PageHeader
          kicker="Offre Pédagogique Officielle TSF"
          title={activeProgram.title}
          description={activeProgram.summary}
        >
          <SubNav items={programSubNav} />
        </PageHeader>

        <ProgramDetailView program={activeProgram} />
      </div>
    );
  }

  // Otherwise, render the complete Program Discovery Portal with interactive filters
  return (
    <div className="pb-24 space-y-10">
      <PageHeader
        kicker="Plateforme de Découverte des Programmes TSF"
        title="Nos Programmes d’Impact"
        description="Une architecture pédagogique et capitalistique de pointe, conçue pour détecter, incuber, certifier et propulser l’excellence continentale africaine."
      >
        <SubNav items={programSubNav} />
      </PageHeader>

      <Container className="space-y-8">
        {/* ========================================================================= */}
        {/* FILTERS TOOLBAR */}
        {/* ========================================================================= */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
          {/* Top Line: Search & Quick Counts */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par compétence, mot-clé, public, objectif..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white transition-all font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results count & Reset button */}
            <div className="flex items-center gap-3 self-end sm:self-center">
              <div className="text-xs font-mono text-slate-500">
                <span className="font-bold text-slate-900">{filteredPrograms.length}</span> / {allPrograms.length} programmes affichés
              </div>

              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFF3EB] text-[#FF6600] border border-[#FFC49E] text-xs font-mono font-bold hover:bg-[#FFE6D5] transition-colors cursor-pointer select-none"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Réinitialiser ({activeFiltersCount})</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="sm:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F5F5F7] text-[#404040] text-xs font-mono font-bold border border-[#E8E8E8]"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filtres</span>
              </button>
            </div>
          </div>

          {/* Detailed Filters Grid (All 5 requested filter dimensions) */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4 border-t border-[#E8E8E8] ${showMobileFilters ? 'block' : 'hidden sm:grid'}`}>
            {/* 1. DOMAINE */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7D7D7D] block">
                1. Domaine
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-xs font-medium text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#0070C0]/20 focus:border-[#0070C0] cursor-pointer"
              >
                <option value="all">Tous les domaines ({domainOptions.length})</option>
                {domainOptions.map((dom) => (
                  <option key={dom} value={dom}>
                    {dom}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. POPULATION */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7D7D7D] block">
                2. Population Cible
              </label>
              <select
                value={selectedPopulation}
                onChange={(e) => setSelectedPopulation(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-xs font-medium text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#0070C0]/20 focus:border-[#0070C0] cursor-pointer"
              >
                {populationOptions.map((pop) => (
                  <option key={pop.id} value={pop.id}>
                    {pop.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. TERRITOIRE */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7D7D7D] block">
                3. Territoire
              </label>
              <select
                value={selectedTerritory}
                onChange={(e) => setSelectedTerritory(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-xs font-medium text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#0070C0]/20 focus:border-[#0070C0] cursor-pointer"
              >
                {territoryOptions.map((ter) => (
                  <option key={ter.id} value={ter.id}>
                    {ter.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. STATUT */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7D7D7D] block">
                4. Statut
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-xs font-medium text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#0070C0]/20 focus:border-[#0070C0] cursor-pointer"
              >
                {statusOptions.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. TYPE DE PROGRAMME */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7D7D7D] block">
                5. Type de Programme
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E8E8E8] rounded-lg text-xs font-medium text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#0070C0]/20 focus:border-[#0070C0] cursor-pointer"
              >
                <option value="all">Tous les types ({typeOptions.length})</option>
                {typeOptions.map((typ) => (
                  <option key={typ} value={typ}>
                    {typ}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PROGRAM CARDS GRID */}
        {/* ========================================================================= */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                variant={program.slug === 'horizon-excellence' ? 'featured' : 'standard'}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center bg-[#F5F5F7] rounded-2xl border border-[#E8E8E8] space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#E8E8E8] text-[#7D7D7D] flex items-center justify-center mx-auto">
              <Filter className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#262626] font-sans">
                Aucun programme ne correspond à cette combinaison de filtres
              </h3>
              <p className="text-xs sm:text-sm text-[#595959] font-sans">
                Essayez d'élargir votre recherche ou de réinitialiser les critères sélectionnés.
              </p>
            </div>
            <button
              type="button"
              onClick={resetAllFilters}
              className="px-4 py-2 bg-[#0070C0] text-white text-xs font-mono font-bold rounded-lg hover:bg-[#005FA3] transition-colors cursor-pointer shadow-xs"
            >
              Afficher tous les programmes
            </button>
          </div>
        )}

        {/* Institutional Bottom Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121212] text-white border border-[#2B2B2B] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-mono text-[#FF6600] font-bold uppercase tracking-wider">
              Cadre Statutaire d'Homologation TSF
            </span>
            <h4 className="text-xl font-bold">
              Vous êtes une institution ou un bailleur et souhaitez financer une cohorte dédiée ?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              TSF conçoit des programmes sur-mesure d’accélération sectorielle pour le compte des États, des banques régionales de développement et des multinationales.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/partenaires')}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer shadow-md"
          >
            Consulter l’Espace Partenaires
          </button>
        </div>
      </Container>
    </div>
  );
};
