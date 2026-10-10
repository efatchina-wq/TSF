import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Container } from '../../components/ui/Container';
import { useWikiResources } from '../../hooks/useWikiResources';
import { WikiResourceCard } from '../../components/wikijob/WikiResourceCard';
import { WikiCategory, WikiContentType } from '../../types/wiki';
import { useRouter } from '../../hooks/useRouter';
import { 
  Search, 
  BookOpen, 
  Layers, 
  ExternalLink, 
  Compass, 
  CheckSquare, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  Filter, 
  ArrowRight,
  Lightbulb,
  Building2,
  Briefcase
} from 'lucide-react';

const ALL_CATEGORIES: Array<{ id: 'ALL' | WikiCategory; label: string }> = [
  { id: 'ALL', label: 'Toutes les catégories' },
  { id: 'EMPLOI', label: 'Emploi' },
  { id: 'STAGE', label: 'Stage' },
  { id: 'VOLONTARIAT', label: 'Volontariat' },
  { id: 'FORMATION', label: 'Formation' },
  { id: 'ENTREPRENEURIAT', label: 'Entrepreneuriat' },
  { id: 'FINANCEMENT', label: 'Financement' },
  { id: 'BOURSES', label: 'Bourses' },
  { id: 'CONCOURS', label: 'Concours' },
  { id: 'CARRIÈRE', label: 'Carrière' },
  { id: 'CV', label: 'CV & ATS' },
  { id: 'ENTRETIEN', label: 'Entretien' },
  { id: 'LINKEDIN', label: 'LinkedIn' },
  { id: 'DIGITAL', label: 'Digital' },
  { id: 'ADMINISTRATION', label: 'Administration' },
  { id: 'MOBILITÉ', label: 'Mobilité' },
  { id: 'ÉTUDES', label: 'Études' },
  { id: 'ORGANISATIONS', label: 'Organisations' }
];

const ALL_CONTENT_TYPES: Array<{ id: 'ALL' | WikiContentType; label: string }> = [
  { id: 'ALL', label: 'Tous formats' },
  { id: 'GUIDE', label: 'Guides' },
  { id: 'ASTUCE', label: 'Astuces' },
  { id: 'TUTORIEL', label: 'Tutoriels' },
  { id: 'CHECKLIST', label: 'Checklists' },
  { id: 'RESSOURCE', label: 'Ressources' },
  { id: 'SITE UTILE', label: 'Sites Utiles' },
  { id: 'ACTUALITÉ', label: 'Actualités' },
  { id: 'DOSSIER', label: 'Dossiers' },
  { id: 'FAQ', label: 'FAQ' }
];

export const WikiKnowledgeHubPage: React.FC = () => {
  const { publishedResources } = useWikiResources();
  const { navigate } = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<'ALL' | WikiCategory>('ALL');
  const [selectedType, setSelectedType] = useState<'ALL' | WikiContentType>('ALL');
  const [originFilter, setOriginFilter] = useState<'ALL' | 'TSF_ONLY' | 'EXTERNAL_ONLY'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered resources
  const filteredResources = useMemo(() => {
    return publishedResources.filter(res => {
      if (selectedCategory !== 'ALL' && res.category !== selectedCategory) return false;
      if (selectedType !== 'ALL' && res.content_type !== selectedType) return false;
      if (originFilter === 'TSF_ONLY' && !res.source.is_tsf_original) return false;
      if (originFilter === 'EXTERNAL_ONLY' && res.source.is_tsf_original) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = res.title.toLowerCase().includes(q);
        const matchesSummary = res.summary.toLowerCase().includes(q);
        const matchesTags = (res.tags || []).some(t => t.toLowerCase().includes(q));
        const matchesSource = res.source.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesTags && !matchesSource) return false;
      }
      return true;
    });
  }, [publishedResources, selectedCategory, selectedType, originFilter, searchQuery]);

  return (
    <div className="pb-24 space-y-12">
      <PageHeader
        kicker="PORTAIL WIKIJOB • OPPORTUNITÉS + INFORMATION + ACTION"
        title="WikiJob — Guides de Référence, Dispositifs Publics & Insertion"
        description="L’encyclopédie pratique et opérationnelle pour maîtriser les programmes publics d'Afrique (ANPE, PSIE, ADPME, bourses), décrypter les marchés de recrutement et accélérer votre trajectoire."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/wikijob/intelligence')}
              className="px-4 py-2 bg-[#FF6600] hover:bg-[#E55C00] text-white font-mono font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>WikiJob Intelligence & Matching</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/wikijob/sources')}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-[#0070C0]" />
              <span>Registre des 8 Organismes</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/wikijob/wiki')}
              className="px-4 py-2 bg-[#262626] hover:bg-[#333333] text-white text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF6600]" />
              <span>Espace Éditeur CMS</span>
            </button>
          </div>
        }
      />

      <Container>
        <div className="space-y-10">
          {/* Hero Search Box: OPPORTUNITÉS + INFORMATION + ACTION */}
          <div className="bg-[#121212] p-6 sm:p-10 rounded-3xl text-white shadow-xl relative overflow-hidden space-y-6 border border-[#2B2B2B]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0070C0]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#FF6600]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl space-y-3 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-white text-xs font-mono border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#FF6600] animate-pulse" />
                <span className="font-bold text-[#FF6600]">OPPORTUNITÉS</span>
                <span>+</span>
                <span className="font-bold text-[#0070C0]">INFORMATION</span>
                <span>+</span>
                <span className="font-bold text-white">ACTION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Que recherchez-vous pour votre parcours professionnel ?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl">
                Explorez des dossiers concrets rédigés et vérifiés par les experts TSF : plateformes de recrutement, compatibilité ATS, bourses d'excellence et financements opérationnels.
              </p>
            </div>

            <div className="relative max-w-3xl z-10">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ex : CV ATS, bourses France Excellence, stage Azoli, sites emploi Cotonou..."
                className="w-full pl-12 pr-24 py-3.5 bg-white text-slate-900 placeholder:text-slate-400 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0070C0] shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-mono cursor-pointer"
                >
                  Effacer ✕
                </button>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-slate-300 z-10 relative">
              <span className="text-slate-400">Recherches fréquentes :</span>
              {['50 sites emploi', 'Stage Bénin', 'CV ATS', 'Financement ONG', 'Bourses', 'PSIE', 'Jeunes entrepreneurs'].map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => setSearchQuery(kw)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-[11px]"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CATEGORIES BAR                                                            */}
          {/* ========================================================================= */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                FILTRER PAR DOMAINE D'EXPERTISE ({ALL_CATEGORIES.length - 1} CATÉGORIES) :
              </span>
              <span className="text-xs font-mono text-slate-500">
                {filteredResources.length} ressource{filteredResources.length > 1 ? 's' : ''} disponible{filteredResources.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 pb-1">
              {ALL_CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0070C0] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTENT TYPES + ORIGIN TOGGLE                                             */}
          {/* ========================================================================= */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            {/* Formats */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline">Format :</span>
              {ALL_CONTENT_TYPES.map(type => {
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FF6600] text-white font-bold'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>

            {/* Editorial Origin Filter (TSF Original vs External Attributed) */}
            <div className="flex items-center gap-1 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
              <button
                type="button"
                onClick={() => setOriginFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono cursor-pointer ${
                  originFilter === 'ALL' ? 'bg-[#262626] text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Toutes sources
              </button>
              <button
                type="button"
                onClick={() => setOriginFilter('TSF_ONLY')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono cursor-pointer flex items-center gap-1 ${
                  originFilter === 'TSF_ONLY' ? 'bg-[#0070C0] text-white font-bold' : 'text-slate-600 hover:text-[#0070C0]'
                }`}
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Éditions TSF</span>
              </button>
              <button
                type="button"
                onClick={() => setOriginFilter('EXTERNAL_ONLY')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono cursor-pointer flex items-center gap-1 ${
                  originFilter === 'EXTERNAL_ONLY' ? 'bg-[#404040] text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ExternalLink className="w-3 h-3" />
                <span>Sources Externes</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RESOURCES GRID                                                            */}
          {/* ========================================================================= */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(res => (
                <WikiResourceCard key={res.id} resource={res} />
              ))}
            </div>
          ) : (
            <div className="p-16 bg-white rounded-3xl border border-dashed border-slate-300 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Aucune ressource trouvée pour ces critères
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Modifiez vos mots-clés ou réinitialisez les filtres pour explorer l'ensemble de la base de connaissances.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedType('ALL');
                  setOriginFilter('ALL');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono text-xs rounded-xl cursor-pointer transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* Bottom Banner: Transition to Sources & Opportunités */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[10px] font-mono uppercase text-[#0070C0] font-bold block tracking-wider">
                ÉCOSYSTÈME COMPLET WIKIJOB
              </span>
              <h4 className="text-lg font-bold text-[#262626]">
                Consultez également les flux en direct et les opportunités indexées
              </h4>
              <p className="text-xs text-slate-600 max-w-xl font-sans">
                WikiJob réunit les guides d'orientation, la surveillance automatisée des 8 organismes d'État béninois et le tableau de bord d'appels à candidatures vérifiés.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => navigate('/wikijob/sources')}
                className="px-4 py-2.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-mono font-bold rounded-xl transition-colors cursor-pointer"
              >
                Sources & Dispositifs Bénin
              </button>
              <button
                type="button"
                onClick={() => navigate('/opportunites')}
                className="px-4 py-2.5 bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Place de marché des Opportunités
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
