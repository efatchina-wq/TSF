import React from 'react';
import { MarketplaceOpportunity } from '../../types/opportunity';
import { OpportunityItem } from '../../types';
import { ApplyButton } from '../opportunities/ApplyButton';
import { SaveOpportunity } from '../opportunities/SaveOpportunity';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Building2, 
  ArrowRight, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  Sparkles 
} from 'lucide-react';

export interface OpportunityCardProps {
  item: MarketplaceOpportunity | OpportunityItem;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
  onSelect?: (opp: MarketplaceOpportunity) => void;
  onApplied?: (id: string) => void;
  variant?: 'card' | 'horizontal' | 'compact';
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  item,
  isSaved = false,
  onToggleSave,
  onSelect,
  onApplied,
  variant = 'card'
}) => {
  // Normalize item into MarketplaceOpportunity format if it's the legacy OpportunityItem
  const normalized: MarketplaceOpportunity = 'type' in item 
    ? item 
    : {
        id: item.id,
        title: item.title,
        type: item.category === 'fellowship' ? 'Bourse' : item.category === 'mission' ? 'Emploi' : item.category === 'bourse' ? 'Financement' : 'Appel à projets',
        domain: 'Gouvernance & Développement',
        location: item.location,
        country: 'Afrique',
        level: 'Praticien / Intermédiaire',
        deadline: item.deadline,
        deadlineDate: '2026-12-31',
        organization: 'Talents Sans Frontières',
        organizationType: 'Institution TSF',
        description: item.description,
        fullDescription: item.description,
        eligibility: [item.eligibility],
        benefits: ['Prise en charge intégrale ou dotation officielle'],
        requirements: ['Candidature sur dossier'],
        spots: item.spots,
        status: item.status,
        postedDate: '2026-10-15'
      };

  const isTsfDirect = normalized.organizationType === 'Institution TSF' || normalized.organization.includes('TSF') || normalized.organization.includes('Talents Sans Frontières');

  const TYPE_TAG_STYLES: Record<string, string> = {
    Emploi: 'text-[#0070C0] bg-[#EBF5FC] border-[#A3D1F1]',
    Stage: 'text-[#005FA3] bg-[#EBF5FC] border-[#A3D1F1]',
    Formation: 'text-[#404040] bg-[#F5F5F7] border-[#E8E8E8]',
    Bourse: 'text-[#FF6600] bg-[#FFF3EB] border-[#FFC49E]',
    Concours: 'text-[#D97706] bg-[#FFFBEB] border-[#FDE68A]',
    Financement: 'text-[#0E8A5E] bg-[#ECFDF5] border-[#A7F3D0]',
    'Appel à projets': 'text-[#0070C0] bg-[#EBF5FC] border-[#D1E8F8]',
    Mentorat: 'text-[#FF6600] bg-[#FFF3EB] border-[#FFC49E]',
    Partenariat: 'text-[#404040] bg-[#F5F5F7] border-[#E8E8E8]'
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(normalized);
    }
  };

  // Format posted date
  const formattedPostedDate = (() => {
    try {
      if (normalized.postedDate && normalized.postedDate.includes('-')) {
        const d = new Date(normalized.postedDate);
        return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
      }
      return normalized.postedDate || 'Octobre 2026';
    } catch {
      return normalized.postedDate || 'Octobre 2026';
    }
  })();

  // ---------------------------------------------------------------------------
  // VARIANT: HORIZONTAL CARD (LIST VIEW)
  // ---------------------------------------------------------------------------
  if (variant === 'horizontal') {
    return (
      <div
        onClick={handleCardClick}
        className="bg-white border border-[#E8E8E8] hover:border-[#0070C0]/50 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-5 group cursor-pointer relative overflow-hidden"
      >
        {normalized.featured && (
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#FF6600]" />
        )}

        <div className="space-y-2.5 flex-1 min-w-0">
          {/* Metadata Row: Source Distinction + Type + Domain + Status */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {isTsfDirect ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-mono text-[11px] font-bold bg-[#EBF5FC] text-[#0070C0] border border-[#A3D1F1]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0070C0]" />
                <span>Opportunité TSF</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-mono text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                <ExternalLink className="w-3 h-3 text-slate-400" />
                <span>Opportunité agrégée · {normalized.organizationType}</span>
              </span>
            )}

            <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold uppercase tracking-wider border ${TYPE_TAG_STYLES[normalized.type] || 'bg-[#F5F5F7] text-[#404040] border-[#E8E8E8]'}`}>
              {normalized.type}
            </span>

            <span className="text-slate-400 text-xs hidden sm:inline">·</span>

            <span className="text-xs text-slate-500 font-sans truncate">
              {normalized.domain}
            </span>

            {normalized.featured && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FFF3EB] text-[#FF6600] border border-[#FFC49E] inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Sélection Spéciale</span>
              </span>
            )}
          </div>

          {/* Title + Organization */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#262626] group-hover:text-[#0070C0] transition-colors leading-snug font-sans">
              {normalized.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1 font-sans">
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <strong className="font-semibold text-slate-800">{normalized.organization}</strong>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">{normalized.level}</span>
            </div>
          </div>

          {/* Key Facts row: Location, Spots, Compensation, Posted Date */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-sans pt-1">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{normalized.location}</span>
            </div>

            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{normalized.spots} place{normalized.spots > 1 ? 's' : ''}</span>
            </div>

            {normalized.compensationOrBudget && (
              <div className="flex items-center gap-1 text-[#0E8A5E] font-semibold">
                <DollarSign className="w-3.5 h-3.5 shrink-0" />
                <span>{normalized.compensationOrBudget}</span>
              </div>
            )}

            <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
              <Clock className="w-3 h-3" />
              <span>MàJ : {formattedPostedDate}</span>
            </div>
          </div>
        </div>

        {/* Right side: Deadline + Actions */}
        <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          <div className="space-y-1 lg:text-right">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              ÉCHÉANCE DU DOSSIER
            </span>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6600] font-sans">
              <Calendar className="w-3.5 h-3.5" />
              <span>{normalized.deadline}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onToggleSave && (
              <SaveOpportunity
                opportunityId={normalized.id}
                isSaved={isSaved}
                onToggleSave={onToggleSave}
              />
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onSelect) onSelect(normalized);
              }}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-[#0070C0] text-xs font-semibold text-slate-700 hover:text-[#0070C0] transition-colors cursor-pointer hidden sm:inline-flex items-center gap-1"
            >
              <span>Détails</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <ApplyButton
              opportunityId={normalized.id}
              opportunityTitle={normalized.title}
              onApply={onApplied}
              size="sm"
            />
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // VARIANT: STANDARD EDITORIAL CARD
  // ---------------------------------------------------------------------------
  return (
    <div 
      onClick={handleCardClick}
      className="bg-white border border-[#E8E8E8] hover:border-[#0070C0]/50 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full group cursor-pointer relative overflow-hidden"
    >
      {/* Top accent line if featured */}
      {normalized.featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6600] via-[#0070C0] to-[#005FA3]" />
      )}

      <div className="space-y-4">
        {/* Source Distinction + Type Tag + Save Button */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1.5 min-w-0">
            {/* Visual Source Distinction */}
            <div className="flex items-center gap-1.5">
              {isTsfDirect ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-[#EBF5FC] text-[#0070C0] border border-[#A3D1F1]">
                  <ShieldCheck className="w-3 h-3 text-[#0070C0]" />
                  <span>Opportunité TSF</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                  <span>Opportunité agrégée</span>
                </span>
              )}

              {normalized.featured && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-[#FFF3EB] text-[#FF6600] border border-[#FFC49E]">
                  ★ Phare
                </span>
              )}
            </div>

            {/* Type + Domain */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold uppercase tracking-wider border ${TYPE_TAG_STYLES[normalized.type] || 'bg-[#F5F5F7] text-[#404040] border-[#E8E8E8]'}`}>
                {normalized.type}
              </span>
              <span className="text-xs text-slate-500 font-sans truncate">
                · {normalized.domain}
              </span>
            </div>
          </div>

          {onToggleSave && (
            <SaveOpportunity
              opportunityId={normalized.id}
              isSaved={isSaved}
              onToggleSave={onToggleSave}
            />
          )}
        </div>

        {/* Title & Organization */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#262626] group-hover:text-[#0070C0] transition-colors leading-snug font-sans">
            {normalized.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1.5 font-sans">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate font-semibold text-slate-800">{normalized.organization}</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-sans">
          {normalized.description}
        </p>

        {/* Metadata Grid */}
        <div className="pt-3 border-t border-[#E8E8E8] grid grid-cols-2 gap-2 text-xs text-slate-600 font-sans">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{normalized.location}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{normalized.spots} place{normalized.spots > 1 ? 's' : ''}</span>
          </div>

          <div className="flex items-center gap-1.5 col-span-2 text-slate-800">
            <Calendar className="w-3.5 h-3.5 text-[#FF6600] shrink-0" />
            <span>Clôture : <strong className="text-[#262626] font-semibold">{normalized.deadline}</strong></span>
          </div>

          {normalized.compensationOrBudget && (
            <div className="flex items-center gap-1.5 col-span-2 text-[#0E8A5E] text-xs truncate">
              <DollarSign className="w-3.5 h-3.5 text-[#0E8A5E] shrink-0" />
              <span className="truncate font-semibold">{normalized.compensationOrBudget}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 col-span-2 text-slate-400 font-mono text-[11px] pt-1">
            <Clock className="w-3 h-3" />
            <span>Mis à jour : {formattedPostedDate}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-4 border-t border-[#E8E8E8] flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onSelect) onSelect(normalized);
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0070C0] hover:text-[#005FA3] transition-colors cursor-pointer"
        >
          <span>Détails & Éligibilité</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <ApplyButton
          opportunityId={normalized.id}
          opportunityTitle={normalized.title}
          onApply={onApplied}
          size="sm"
        />
      </div>
    </div>
  );
};
