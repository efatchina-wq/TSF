import React, { useState } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { useWikiResources } from '../../hooks/useWikiResources';
import { Container } from '../../components/ui/Container';
import { getCategoryColor, getContentTypeIcon } from '../../components/wikijob/WikiResourceCard';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Share2, 
  Check, 
  CheckSquare, 
  Square, 
  ChevronRight, 
  BookOpen, 
  Layers, 
  Globe, 
  AlertCircle,
  Sparkles,
  Tag
} from 'lucide-react';

interface WikiResourceDetailPageProps {
  slug?: string;
}

export const WikiResourceDetailPage: React.FC<WikiResourceDetailPageProps> = ({ slug: propSlug }) => {
  const { currentPath, navigate } = useRouter();
  const { getResourceBySlug, publishedResources } = useWikiResources();

  // Extract slug from URL if not passed as prop
  // e.g. /wikijob/wiki/comment-preparer-un-cv-ats
  const activeSlug = propSlug || currentPath.split('/wikijob/wiki/')[1]?.split('?')[0] || '';
  const resource = getResourceBySlug(activeSlug);

  // Local interactive checklist state
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  if (!resource) {
    return (
      <div className="py-24">
        <Container>
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Ressource introuvable dans la base de connaissances
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Le guide demandé (slug : <code className="font-mono text-[#0070C0]">{activeSlug}</code>) n'existe pas ou a été archivé.
            </p>
            <button
              type="button"
              onClick={() => navigate('/wikijob')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-bold cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retourner au WikiJob Hub</span>
            </button>
          </div>
        </Container>
      </div>
    );
  }

  const catStyle = getCategoryColor(resource.category);

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return isoStr;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleCheck = (id: string) => {
    setCheckedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Related resources in the same category
  const relatedResources = publishedResources
    .filter(r => r.category === resource.category && r.id !== resource.id)
    .slice(0, 3);

  return (
    <div className="pb-24 space-y-8">
      {/* Top Breadcrumb Nav */}
      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <Container>
          <div className="flex items-center justify-between text-xs font-mono">
            <button
              type="button"
              onClick={() => navigate('/wikijob')}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#0070C0] font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour à l'encyclopédie WikiJob</span>
            </button>

            <div className="flex items-center gap-2 text-slate-400 hidden sm:flex">
              <span>WikiJob</span>
              <ChevronRight className="w-3 h-3" />
              <span>{resource.category}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-800 font-bold truncate max-w-xs">{resource.title}</span>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Main Article Header */}
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
                {resource.category}
              </span>

              <span className="px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-slate-100 border border-slate-200 text-slate-700 inline-flex items-center gap-1.5">
                {getContentTypeIcon(resource.content_type)}
                <span>{resource.content_type}</span>
              </span>

              {resource.read_time_minutes && (
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Temps de lecture : ~{resource.read_time_minutes} min</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#262626] tracking-tight leading-tight font-sans">
              {resource.title}
            </h1>

            {/* Summary Highlight Box */}
            <div className="p-5 sm:p-6 bg-slate-50 border-l-4 border-[#FF6600] rounded-r-2xl text-slate-700 text-sm sm:text-base font-sans leading-relaxed">
              {resource.summary}
            </div>

            {/* Metadata Bar (Author, Source, Dates, Share) */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 text-xs font-mono text-slate-600">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">SOURCE ÉDITORIALE</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 pt-0.5">
                    {resource.source.is_tsf_original ? (
                      <span className="inline-flex items-center gap-1 text-[#0070C0]">
                        <ShieldCheck className="w-4 h-4 text-[#0070C0] shrink-0" />
                        <span>{resource.source.name} (Édition Certifiée)</span>
                      </span>
                    ) : (
                      <a 
                        href={resource.source.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1 text-slate-800 hover:text-blue-600 underline"
                      >
                        <span>{resource.source.name}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {resource.source.author && (
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">RÉDACTION</span>
                    <span className="text-slate-800 font-medium pt-0.5 block">{resource.source.author}</span>
                  </div>
                )}

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">PUBLIÉ LE</span>
                  <span className="text-slate-800 font-medium pt-0.5 block">{formatDate(resource.published_at)}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">DERNIÈRE MISE À JOUR</span>
                  <span className="text-slate-800 font-medium pt-0.5 block">{formatDate(resource.updated_at)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Partager cet article"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Lien copié !' : 'Partager'}</span>
              </button>
            </div>
          </header>

          {/* ========================================================================= */}
          {/* SPECIAL SECTION: CURATED SITES DIRECTORY (IF PRESENT)                     */}
          {/* ========================================================================= */}
          {resource.curated_sites && resource.curated_sites.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">
                    Répertoire & Liens Utiles Vérifiés ({resource.curated_sites.length} adresses)
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Accès direct</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {resource.curated_sites.map((site, i) => (
                  <a
                    key={i}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-2xl transition-all group flex flex-col justify-between space-y-2 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {site.name}
                        </strong>
                        {site.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white border border-slate-200 text-slate-600">
                            {site.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">
                        {site.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-blue-600 pt-1">
                      <span className="truncate max-w-[200px]">{site.url.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SPECIAL SECTION: INTERACTIVE CHECKLIST (IF PRESENT)                       */}
          {/* ========================================================================= */}
          {resource.checklist_items && resource.checklist_items.length > 0 && (
            <div className="bg-emerald-50/50 rounded-3xl border border-emerald-200 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-emerald-700" />
                  <h3 className="text-lg font-bold text-emerald-950">
                    Checklist Interactive d’Auto-Évaluation
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-800">
                  {Object.values(checkedIds).filter(Boolean).length} / {resource.checklist_items.length} validés
                </span>
              </div>

              <p className="text-xs text-emerald-800">
                Cochez chaque point vérifié avant de soumettre votre dossier ou candidature :
              </p>

              <div className="space-y-2 pt-1">
                {resource.checklist_items.map((item) => {
                  const isChecked = !!checkedIds[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked 
                          ? 'bg-white border-emerald-300 text-emerald-950 font-medium' 
                          : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 text-emerald-700 shrink-0"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      <span className={`text-xs sm:text-sm font-sans ${isChecked ? 'line-through text-slate-400' : ''}`}>
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ARTICLE BODY CONTENT                                                      */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="prose max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 font-sans">
              {resource.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-lg sm:text-xl font-bold text-[#262626] pt-4 pb-1 border-b border-slate-100 font-sans">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={idx} className="list-disc pl-5 space-y-1.5">
                      {items.map((it, i) => (
                        <li key={i}>{it.replace(/^- /, '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith('1. ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ol key={idx} className="list-decimal pl-5 space-y-1.5">
                      {items.map((it, i) => (
                        <li key={i}>{it.replace(/^[0-9]+\. /, '')}</li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={idx} className="text-slate-700 leading-relaxed font-sans">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Tags Section */}
            {resource.tags && resource.tags.length > 0 && (
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase font-bold flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#0070C0]" />
                  <span>MOTS-CLÉS :</span>
                </span>
                {resource.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* RELATED RESOURCES IN SAME CATEGORY                                        */}
          {/* ========================================================================= */}
          {relatedResources.length > 0 && (
            <div className="space-y-4 pt-6">
              <h3 className="text-base font-bold text-[#262626] font-mono uppercase tracking-wider">
                D'AUTRES GUIDES DANS LA CATÉGORIE « {resource.category} »
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedResources.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => navigate(`/wikijob/wiki/${rel.slug}`)}
                    className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#0070C0] transition-all cursor-pointer space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 font-bold block">{rel.content_type}</span>
                      <h4 className="font-bold text-slate-900 text-sm hover:text-[#0070C0] transition-colors line-clamp-2 font-sans">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-[#0070C0] font-bold flex items-center gap-1 pt-2">
                      <span>Consulter</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
