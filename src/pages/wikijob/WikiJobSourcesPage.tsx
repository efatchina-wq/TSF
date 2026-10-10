import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Container } from '../../components/ui/Container';
import { SourceCard } from '../../components/wikijob/SourceCard';
import { useWikiJobSources } from '../../hooks/useWikiJobSources';
import { useRouter } from '../../hooks/useRouter';
import { 
  SourceCategory, 
  SourceAcquisitionType 
} from '../../types/wikijob';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Radio, 
  Layers, 
  Database, 
  Briefcase, 
  ExternalLink, 
  RefreshCw, 
  Settings, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  X,
  Compass,
  Cpu
} from 'lucide-react';

const CATEGORIES_LIST: Array<{ id: 'ALL' | SourceCategory; label: string }> = [
  { id: 'ALL', label: 'Toutes les catégories' },
  { id: 'EMPLOI', label: 'Emploi' },
  { id: 'STAGE', label: 'Stage' },
  { id: 'FINANCEMENT', label: 'Financement & Crédit' },
  { id: 'FORMATION', label: 'Formation' },
  { id: 'ENTREPRENEURIAT', label: 'Entrepreneuriat' },
  { id: 'PROGRAMME PUBLIC', label: 'Programme Public' },
  { id: 'CONCOURS', label: 'Concours' }
];

const TYPES_LIST: Array<{ id: 'ALL' | SourceAcquisitionType; label: string }> = [
  { id: 'ALL', label: 'Toutes les méthodes' },
  { id: 'WEB_PUBLIC', label: 'Page web publique' },
  { id: 'MANUAL_IMPORT', label: 'Import manuel' },
  { id: 'FUTURE_CONNECTOR', label: 'Connecteur futur' },
  { id: 'STRUCTURED_SOURCE', label: 'Source structurée' },
  { id: 'RSS_ATOM', label: 'Flux RSS / Atom' },
  { id: 'OFFICIAL_API', label: 'API officielle' },
  { id: 'SITEMAP', label: 'Sitemap' }
];

export const WikiJobSourcesPage: React.FC = () => {
  const { sources, loading } = useWikiJobSources();
  const { navigate } = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | SourceCategory>('ALL');
  const [selectedType, setSelectedType] = useState<'ALL' | SourceAcquisitionType>('ALL');
  const [onlyActive, setOnlyActive] = useState(false);
  const [onlyOfficial, setOnlyOfficial] = useState(false);

  // Filtered sources
  const filteredSources = useMemo(() => {
    return sources.filter((s) => {
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(q);
        const matchesDesc = s.description.toLowerCase().includes(q);
        const matchesOperator = (s.operator_name || '').toLowerCase().includes(q);
        const matchesSlug = s.slug.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesOperator && !matchesSlug) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'ALL') {
        if (!s.categories.includes(selectedCategory)) {
          return false;
        }
      }

      // Acquisition Type
      if (selectedType !== 'ALL') {
        if (s.source_type !== selectedType) {
          return false;
        }
      }

      // Active
      if (onlyActive && !s.active) {
        return false;
      }

      // Official
      if (onlyOfficial && !s.official) {
        return false;
      }

      return true;
    });
  }, [sources, searchQuery, selectedCategory, selectedType, onlyActive, onlyOfficial]);

  // Aggregate stats
  const totalSources = sources.length;
  const activeSources = sources.filter(s => s.active).length;
  const totalOpportunities = sources.reduce((acc, s) => acc + (s.opportunities?.length || 0), 0);
  const officialSources = sources.filter(s => s.official).length;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedType('ALL');
    setOnlyActive(false);
    setOnlyOfficial(false);
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'ALL' || selectedType !== 'ALL' || onlyActive || onlyOfficial;

  return (
    <div className="pb-24 space-y-10">
      <PageHeader
        kicker="WIKIJOB — SYSTÈME DE SOURCES & VEILLE NATIONALE"
        title="Registre des Sources & Organismes Béninois"
        description="Agrégation et surveillance éthique des publications d’opportunités issues des agences étatiques, programmes présidentiels et fonds publics d’appui aux jeunes et entrepreneurs du Bénin."
      />

      <Container>
        <div className="space-y-10">
          {/* Key Metrics / Dashboard Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                ORGANISMES RÉPERTORIÉS
              </span>
              <div className="flex items-baseline gap-2">
                <strong className="text-2xl sm:text-3xl font-extrabold text-[#262626]">
                  {totalSources}
                </strong>
                <span className="text-xs text-slate-500 font-mono">sources béninoises</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                SURVEILLANCE ACTIVE
              </span>
              <div className="flex items-baseline gap-2">
                <strong className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
                  {activeSources}
                </strong>
                <span className="text-xs font-mono text-emerald-600">organismes connectés</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                OPPORTUNITÉS INDEXÉES
              </span>
              <div className="flex items-baseline gap-2">
                <strong className="text-2xl sm:text-3xl font-extrabold text-[#FF6600]">
                  {totalOpportunities}
                </strong>
                <span className="text-xs text-slate-500 font-mono">offres & bourses</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                CADRE DE CONFORMITÉ
              </span>
              <div className="flex items-baseline gap-2">
                <strong className="text-2xl sm:text-3xl font-extrabold text-[#0070C0]">
                  100%
                </strong>
                <span className="text-xs font-mono text-[#0070C0]">organismes officiels</span>
              </div>
            </div>
          </div>

          {/* Ethical Charter / Registry Principles Callout */}
          <div className="bg-[#121212] text-white rounded-3xl p-6 sm:p-8 border border-[#2B2B2B] shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-[#0070C0] text-xs font-mono border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0070C0]" />
                <span className="text-white">RÈGLES D’ACQUISITION TRANSPARENTES</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">
                Aucun flux RSS ou API fictif — Respect strict des infrastructures publiques
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                WikiJob répertorie les sources selon leur réelle maturité technologique (web public, source structurée, import manuel ou connecteur en cours). Les données sont scannées sans surcharge serveur et vérifiées auprès des autorités de tutelle.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => navigate('/admin/wikijob/engine')}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs font-mono flex items-center gap-2 transition-all cursor-pointer border border-white/20"
              >
                <Cpu className="w-4 h-4 text-[#38BDF8]" />
                <span>Moteur d'Agrégation</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/wikijob/sources')}
                className="px-4 py-2.5 bg-[#FF6600] hover:bg-[#E55C00] text-white font-bold rounded-xl text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <Settings className="w-4 h-4" />
                <span>Console Admin</span>
              </button>
            </div>
          </div>

          {/* Search & Filters Control Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            {/* Top row: search + toggles */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher par organisme (ANPE, PSIE, ADPME, PRODIJ, FNDA, FNM...), mot-clé ou tutelle..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white transition-all font-sans"
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

              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 text-xs font-mono text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyActive}
                    onChange={(e) => setOnlyActive(e.target.checked)}
                    className="rounded border-slate-300 text-[#0070C0] focus:ring-[#0070C0]"
                  />
                  <span>Actifs uniquement</span>
                </label>

                <label className="inline-flex items-center gap-2 text-xs font-mono text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyOfficial}
                    onChange={(e) => setOnlyOfficial(e.target.checked)}
                    className="rounded border-slate-300 text-[#0070C0] focus:ring-[#0070C0]"
                  />
                  <span>Officiels seulement</span>
                </label>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-mono text-[#FF6600] hover:underline flex items-center gap-1 cursor-pointer ml-auto md:ml-0"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Réinitialiser</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filter Pills: Categories */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                FILTRER PAR TYPOLOGIE DE PUBLICATION :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES_LIST.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
                      selectedCategory === cat.id
                        ? 'bg-[#0070C0] text-white border-[#0070C0] font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Pills: Acquisition Type */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                MÉTHODE D'ACQUISITION TECHNIQUE :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {TYPES_LIST.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedType(t.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
                      selectedType === t.id
                        ? 'bg-[#FF6600] text-white border-[#FF6600] font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Organismes répertoriés
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-100 text-slate-700 font-bold border border-slate-200">
                {filteredSources.length} source{filteredSources.length > 1 ? 's' : ''}
              </span>
            </div>

            <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
              Cliquez sur une source pour voir ses publications détaillées
            </span>
          </div>

          {/* Sources Grid */}
          {filteredSources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSources.map((source) => (
                <SourceCard key={source.id} source={source} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Aucun organisme ne correspond à vos critères
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Modifiez votre recherche ou réinitialisez les filtres pour afficher l'ensemble des sources béninoises répertoriées.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* Bottom Context Banner: National Ecosystem */}
          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#0070C0]" />
              <h3 className="font-bold text-slate-900 text-base">
                À propos du Registre des Sources WikiJob
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
              Le Bénin dispose d'un écosystème institutionnel dynamique dédié à la jeunesse, à l'emploi et à l'entrepreneuriat (ANPE, PSIE, ADPME, PRODIJ, FNDA, FNM, FNPEEJ, Azoli). Cependant, les canaux de diffusion sont dispersés. Le registre WikiJob opère comme un métamoteur d'orientation qui centralise et uniformise les avis officiels sans jamais dénaturer les critères d'admissibilité étatiques.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Aucune commission facturée aux candidats</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Redirection systématique vers les portails gouvernementaux officiels</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Horodatage vérifié à chaque cycle d'actualisation</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
