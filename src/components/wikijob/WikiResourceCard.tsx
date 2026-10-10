import React from 'react';
import { WikiResource, WikiCategory, WikiContentType } from '../../types/wiki';
import { useRouter } from '../../hooks/useRouter';
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  BookOpen, 
  CheckSquare, 
  Lightbulb, 
  FileText, 
  Globe, 
  HelpCircle, 
  Tag, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface WikiResourceCardProps {
  resource: WikiResource;
}

export const getCategoryColor = (cat: WikiCategory): { bg: string; text: string; border: string } => {
  switch (cat) {
    case 'EMPLOI':
      return { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' };
    case 'STAGE':
      return { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' };
    case 'VOLONTARIAT':
      return { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-200' };
    case 'FORMATION':
      return { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-200' };
    case 'ENTREPRENEURIAT':
      return { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300' };
    case 'FINANCEMENT':
      return { bg: 'bg-green-50', text: 'text-green-900', border: 'border-green-300' };
    case 'BOURSES':
      return { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' };
    case 'CONCOURS':
      return { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200' };
    case 'CARRIÈRE':
      return { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200' };
    case 'CV':
      return { bg: 'bg-cyan-50', text: 'text-cyan-900', border: 'border-cyan-300' };
    case 'ENTRETIEN':
      return { bg: 'bg-orange-50', text: 'text-orange-900', border: 'border-orange-300' };
    case 'LINKEDIN':
      return { bg: 'bg-blue-100', text: 'text-blue-900', border: 'border-blue-300' };
    case 'DIGITAL':
      return { bg: 'bg-violet-50', text: 'text-violet-800', border: 'border-violet-200' };
    case 'ADMINISTRATION':
      return { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-300' };
    case 'MOBILITÉ':
      return { bg: 'bg-yellow-50', text: 'text-yellow-900', border: 'border-yellow-300' };
    case 'ÉTUDES':
      return { bg: 'bg-fuchsia-50', text: 'text-fuchsia-800', border: 'border-fuchsia-200' };
    case 'ORGANISATIONS':
      return { bg: 'bg-indigo-100', text: 'text-indigo-900', border: 'border-indigo-300' };
    default:
      return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
  }
};

export const getContentTypeIcon = (type: WikiContentType) => {
  switch (type) {
    case 'GUIDE':
      return <BookOpen className="w-3.5 h-3.5 text-blue-600" />;
    case 'CHECKLIST':
      return <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />;
    case 'ASTUCE':
      return <Lightbulb className="w-3.5 h-3.5 text-amber-500" />;
    case 'TUTORIEL':
      return <Sparkles className="w-3.5 h-3.5 text-purple-600" />;
    case 'SITE UTILE':
      return <Globe className="w-3.5 h-3.5 text-sky-600" />;
    case 'DOSSIER':
      return <Layers className="w-3.5 h-3.5 text-indigo-600" />;
    case 'FAQ':
      return <HelpCircle className="w-3.5 h-3.5 text-teal-600" />;
    case 'ACTUALITÉ':
      return <Clock className="w-3.5 h-3.5 text-rose-600" />;
    case 'RESSOURCE':
    default:
      return <FileText className="w-3.5 h-3.5 text-slate-600" />;
  }
};

export const WikiResourceCard: React.FC<WikiResourceCardProps> = ({ resource }) => {
  const { navigate } = useRouter();
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

  const handleCardClick = () => {
    navigate(`/wikijob/wiki/${resource.slug}`);
  };

  return (
    <article 
      onClick={handleCardClick}
      className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-[#0070C0]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-5 cursor-pointer group relative overflow-hidden"
    >
      {/* Top accent bar if featured */}
      {resource.featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6600] via-[#0070C0] to-[#004A80]" />
      )}

      <div className="space-y-3.5">
        {/* Source Distinction + Format + Read Time */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {resource.source.is_tsf_original ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#0070C0] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0070C0]" />
                <span>Publication Officielle TSF</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                <ExternalLink className="w-3 h-3 text-slate-400" />
                <span>Source Référencée · {resource.source.name}</span>
              </span>
            )}
            <span className="text-slate-300">|</span>
            <span className="inline-flex items-center gap-1 text-slate-600 font-mono text-[11px]">
              {getContentTypeIcon(resource.content_type)}
              <span>{resource.content_type}</span>
            </span>
          </div>

          {resource.read_time_minutes && (
            <span className="text-[11px] font-mono text-slate-400">
              {resource.read_time_minutes} min de lecture
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-[#262626] group-hover:text-[#0070C0] transition-colors leading-snug font-sans">
          {resource.title}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed line-clamp-3">
          {resource.summary}
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-mono">
            {resource.tags.slice(0, 4).map((tag, i) => (
              <span 
                key={i}
                className="text-[11px] text-slate-500 hover:text-[#0070C0] transition-colors"
              >
                #{tag}
              </span>
            ))}
            {resource.tags.length > 4 && (
              <span className="text-[10px] text-slate-400 self-center">
                +{resource.tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Dates: Published & Updated */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>Publié : {formatDate(resource.published_at)}</span>
          </div>
          <div>
            <span>MàJ : {formatDate(resource.updated_at)}</span>
          </div>
        </div>

        {/* Footer Action Link */}
        <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#0070C0] font-bold group-hover:text-[#FF6600] transition-colors">
          <span>Consulter le guide complet</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </article>
  );
};
