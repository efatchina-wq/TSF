import React from 'react';
import { SourceRecord } from '../../types/wikijob';
import { SourceTypeBadge } from './SourceTypeBadge';
import { SourceStatusBadge } from './SourceStatusBadge';
import { SourceCategoryBadge } from './SourceCategoryBadge';
import { useRouter } from '../../hooks/useRouter';
import { 
  Building2, 
  ExternalLink, 
  Clock, 
  Briefcase, 
  ArrowRight, 
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';

interface SourceCardProps {
  source: SourceRecord;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source }) => {
  const { navigate } = useRouter();

  const oppCount = source.opportunities?.length || 0;
  const newsCount = source.news?.length || 0;

  const formatDate = (isoStr: string | null) => {
    if (!isoStr) return 'Jamais synchronisé';
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

  const handleCardClick = () => {
    navigate(`/wikijob/sources/${source.slug}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-[#0070C0]/40 hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between cursor-pointer relative overflow-hidden"
    >
      {/* Top accent bar if official */}
      {source.official && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0070C0] via-[#FF6600] to-emerald-600" />
      )}

      <div className="space-y-4">
        {/* Header: Logo + Name + Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Logo / Badge */}
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#262626] to-[#0070C0] text-white flex items-center justify-center font-mono font-bold text-sm tracking-wider shadow-xs shrink-0 border border-slate-700/20">
              {source.logo_text || source.name.substring(0, 4).toUpperCase()}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0070C0] transition-colors leading-tight font-sans">
                  {source.name}
                </h3>
                {source.official && (
                  <span 
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#0070C0] border border-blue-200"
                    title="Organisme public ou mandaté par l'État"
                  >
                    <ShieldCheck className="w-3 h-3 text-[#0070C0]" />
                    <span>Officiel</span>
                  </span>
                )}
              </div>
              
              <div className="text-xs text-slate-500 font-mono mt-0.5 flex items-center gap-2">
                <span>{source.country}</span>
                <span>•</span>
                <span className="truncate max-w-[200px]" title={source.operator_name || ''}>
                  {source.operator_name || 'Organisme public'}
                </span>
              </div>
            </div>
          </div>

          <SourceStatusBadge status={source.sync_status} active={source.active} size="sm" />
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
          {source.description}
        </p>

        {/* Categories tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {source.categories.slice(0, 3).map((cat) => (
            <SourceCategoryBadge key={cat} category={cat} size="sm" />
          ))}
          {source.categories.length > 3 && (
            <span className="text-[10px] font-mono text-slate-400 self-center">
              +{source.categories.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer Info: Type, Last Sync, Count & Action */}
      <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Acquisition Type */}
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              MÉTHODE D'ACQUISITION
            </span>
            <SourceTypeBadge type={source.source_type} size="sm" />
          </div>

          {/* Opportunities Count */}
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              OPPORTUNITÉS
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0070C0]">
              <Briefcase className="w-3.5 h-3.5 text-[#FF6600]" />
              <span>{oppCount} active{oppCount > 1 ? 's' : ''}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1">
          <div className="flex items-center gap-1 text-[11px] text-slate-400" title="Dernière vérification ou synchronisation du registre">
            <Clock className="w-3 h-3 text-slate-400" />
            <span className="truncate max-w-[190px]">
              Dernière synchro : {formatDate(source.last_checked_at || source.last_success_at)}
            </span>
          </div>

          <div className="inline-flex items-center gap-1 text-xs font-bold text-[#0070C0] group-hover:text-[#FF6600] transition-colors">
            <span>Consulter la fiche</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
