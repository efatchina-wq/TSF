import React, { useState } from 'react';
import { MarketplaceOpportunity } from '../../types/opportunity';
import { ApplyButton } from './ApplyButton';
import { SaveOpportunity } from './SaveOpportunity';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  Building2, 
  CheckCircle2, 
  Award, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  Share2, 
  X, 
  ArrowLeft 
} from 'lucide-react';

interface OpportunityDetailProps {
  opportunity: MarketplaceOpportunity;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onClose: () => void;
  onApplied?: (id: string) => void;
}

export const OpportunityDetail: React.FC<OpportunityDetailProps> = ({
  opportunity,
  isSaved,
  onToggleSave,
  onClose,
  onApplied
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TYPE_COLORS: Record<string, string> = {
    Emploi: 'bg-blue-100 text-blue-900 border-blue-200',
    Stage: 'bg-cyan-100 text-cyan-900 border-cyan-200',
    Formation: 'bg-indigo-100 text-indigo-900 border-indigo-200',
    Bourse: 'bg-amber-100 text-amber-900 border-amber-300',
    Concours: 'bg-rose-100 text-rose-900 border-rose-200',
    Financement: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    'Appel à projets': 'bg-purple-100 text-purple-900 border-purple-200',
    Mentorat: 'bg-orange-100 text-orange-900 border-orange-200',
    Partenariat: 'bg-slate-100 text-slate-800 border-slate-300'
  };

  return (
    <div 
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl max-w-3xl w-full p-4 sm:p-8 shadow-2xl relative my-auto text-slate-900 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden min-[400px]:inline">Retour aux opportunités</span>
            <span className="inline min-[400px]:hidden">Retour</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <SaveOpportunity 
              opportunityId={opportunity.id}
              isSaved={isSaved}
              onToggleSave={onToggleSave}
              showText
            />
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 sm:p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-xs font-mono flex items-center gap-1 cursor-pointer"
              title="Partager l'opportunité"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copied ? 'Lien copié' : 'Partager'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Container */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6">
          {/* Main Title & Badges */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${TYPE_COLORS[opportunity.type] || 'bg-slate-100 text-slate-800'}`}>
                {opportunity.type}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200">
                {opportunity.domain}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-blue-50 text-blue-900 border border-blue-200">
                Niveau : {opportunity.level}
              </span>
              {opportunity.featured && (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500 text-slate-950">
                  ★ Sélection Stratégique
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#262626] tracking-tight leading-tight font-sans">
              {opportunity.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 pt-1">
              <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                <Building2 className="w-4 h-4 text-[#0070C0]" />
                <span>{opportunity.organization} ({opportunity.organizationType})</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{opportunity.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{opportunity.spots} places offertes</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Financial Package */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] block">ÉCHÉANCE DE DÉPÔT</span>
              <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                <Calendar className="w-4 h-4 text-[#FF6600]" />
                <span>{opportunity.deadline}</span>
              </div>
              <span className="text-emerald-700 font-semibold block text-[11px]">
                Statut : {opportunity.status === 'ouvert' ? 'Candidatures Actuellement Ouvertes' : 'Session Clôturée'}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] block">DOTATION / RÉMUNÉRATION</span>
              <div className="flex items-center gap-1.5 text-[#0070C0] font-bold text-sm">
                <DollarSign className="w-4 h-4 text-[#0E8A5E]" />
                <span>{opportunity.compensationOrBudget || 'Prise en charge intégrale'}</span>
              </div>
              <span className="text-slate-500 block text-[11px]">
                Publication officielle : {opportunity.postedDate}
              </span>
            </div>
          </div>

          {/* Full Narrative Description */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-[#262626] font-mono uppercase tracking-wide">
              Présentation & Enjeux du Mandat
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {opportunity.fullDescription || opportunity.description}
            </p>
          </div>

          {/* Eligibility & Benefits Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Eligibility */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-[#262626] font-mono uppercase tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0E8A5E]" />
                <span>Critères d’Éligibilité :</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 font-sans">
                {opportunity.eligibility.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#0E8A5E] font-bold font-mono">✓</span>
                    <span className="leading-snug">{crit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-[#262626] font-mono uppercase tracking-wide flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#FF6600]" />
                <span>Avantages & Prise en Charge :</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 font-sans">
                {opportunity.benefits.map((ben, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#FF6600] font-bold font-mono">★</span>
                    <span className="leading-snug">{ben}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar (Pinned at bottom of modal) */}
        <div className="pt-4 mt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs font-mono text-slate-500 hidden sm:block">
            Instruction assurée dans le respect strict des chartes anti-biais TSF.
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-mono text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Fermer
            </button>
            <ApplyButton
              opportunityId={opportunity.id}
              opportunityTitle={opportunity.title}
              onApply={onApplied}
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
