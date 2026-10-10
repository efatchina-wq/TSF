import React, { useState } from 'react';
import { EXCELLENCE_TIERS } from '../../data/certificationData';
import { ExcellenceTier, ExcellenceTierDetails } from '../../types/certification';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Users, 
  FileCheck, 
  Layers, 
  ChevronRight,
  TrendingUp,
  Target
} from 'lucide-react';

interface ExcellenceTiersViewProps {
  onSelectTier?: (tier: ExcellenceTier) => void;
  onVerifyClick?: () => void;
}

export const ExcellenceTiersView: React.FC<ExcellenceTiersViewProps> = ({
  onSelectTier,
  onVerifyClick
}) => {
  const [activeTier, setActiveTier] = useState<ExcellenceTier>('OR');

  const selectedTierData = EXCELLENCE_TIERS.find(t => t.tier === activeTier) || EXCELLENCE_TIERS[2];

  const TIER_ICONS: Record<ExcellenceTier, { color: string; badgeText: string; medalColor: string }> = {
    BRONZE: {
      color: 'text-amber-800',
      badgeText: 'PALIER I · FONDAMENTAL & ÉMERGENT',
      medalColor: 'bg-amber-700/20 text-amber-800 border-amber-700/40'
    },
    ARGENT: {
      color: 'text-slate-600',
      badgeText: 'PALIER II · STRATÉGIQUE & COMPLEXITÉ',
      medalColor: 'bg-slate-200 text-slate-700 border-slate-400'
    },
    OR: {
      color: 'text-amber-500',
      badgeText: 'PALIER III · SUPRÊME & FELLOW CONTINENTAL',
      medalColor: 'bg-amber-400 text-slate-950 border-amber-500 font-bold'
    }
  };

  return (
    <div className="space-y-12">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4 font-sans">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFF3EB] text-[#FF6600] border border-[#FFC49E] text-xs font-mono font-semibold tracking-wide">
          <Award className="w-3.5 h-3.5 text-[#FF6600]" />
          <span>RÉFÉRENTIEL SOUVERAIN DE QUALIFICATION</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-[#262626] tracking-tight font-sans">
          EXCELLENCE TSF : Le Standard Panafricain des Compétences
        </h2>

        <p className="text-sm sm:text-base text-[#595959] leading-relaxed font-sans">
          Le programme de certification de Talents Sans Frontières garantit aux employeurs, bailleurs et gouvernements une évaluation impartiale et cryptographiquement certifiée à travers trois paliers progressifs.
        </p>
      </div>

      {/* Tier Selection Tabs (BRONZE / ARGENT / OR) */}
      <div className="flex flex-wrap justify-center gap-3">
        {EXCELLENCE_TIERS.map((item) => {
          const isSelected = activeTier === item.tier;
          return (
            <button
              key={item.tier}
              onClick={() => {
                setActiveTier(item.tier);
                if (onSelectTier) onSelectTier(item.tier);
              }}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all cursor-pointer text-left shadow-xs ${
                isSelected
                  ? item.tier === 'OR'
                    ? 'bg-[#0070C0] text-white border-[#0070C0] shadow-sm'
                    : item.tier === 'ARGENT'
                    ? 'bg-[#005FA3] text-white border-[#005FA3] shadow-sm'
                    : 'bg-[#404040] text-white border-[#404040] shadow-sm'
                  : 'bg-white text-[#404040] border-[#E8E8E8] hover:border-[#0070C0]/40 hover:bg-[#F5F5F7]'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs border ${TIER_ICONS[item.tier].medalColor}`}>
                {item.tier === 'OR' ? '★' : item.tier === 'ARGENT' ? '◈' : '●'}
              </div>
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-wider block font-bold ${
                  isSelected ? 'text-white/80' : 'text-[#7D7D7D]'
                }`}>
                  PALIER {item.tier}
                </span>
                <span className="text-sm font-bold block font-sans">
                  {item.tier === 'BRONZE' ? 'Bronze · Praticien' : item.tier === 'ARGENT' ? 'Argent · Leader' : 'Or · Fellow Élite'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Tier Showcase Card */}
      <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden font-sans">
        {/* Top Header of Tier Card */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#E8E8E8] pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold border ${TIER_ICONS[selectedTierData.tier].medalColor}`}>
                {TIER_ICONS[selectedTierData.tier].badgeText}
              </span>
              <span className="text-xs font-mono text-[#7D7D7D]">
                Homologué par le Collège International TSF
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#262626] font-sans">
              {selectedTierData.title}
            </h3>

            <p className="text-sm font-medium text-[#595959] max-w-2xl font-sans">
              {selectedTierData.subtitle}
            </p>
          </div>

          {onVerifyClick && (
            <button
              type="button"
              onClick={onVerifyClick}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0070C0] hover:bg-[#005FA3] text-white font-sans text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer active:scale-[0.99]"
            >
              <ShieldCheck className="w-4 h-4 text-[#FF6600]" />
              <span>Vérifier un titre {selectedTierData.tier}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tagline Banner */}
        <div className="my-6 p-4 rounded-xl bg-[#F5F5F7] border border-[#E8E8E8] text-xs sm:text-sm text-[#404040] italic flex items-center gap-3 font-serif">
          <Sparkles className="w-5 h-5 text-[#FF6600] shrink-0" />
          <span>« {selectedTierData.tagline} »</span>
        </div>

        {/* 4 Key Dimensions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* 1. Critères d'homologation */}
          <div className="space-y-3 bg-[#F5F5F7] border border-[#E8E8E8] rounded-xl p-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#262626] uppercase">
              <Target className="w-4 h-4 text-[#FF6600]" />
              <span>Critères d'évaluation</span>
            </div>
            <ul className="space-y-2 text-xs text-[#595959] font-sans">
              {selectedTierData.criteria.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8A5E] shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Prérequis exigés */}
          <div className="space-y-3 bg-[#F5F5F7] border border-[#E8E8E8] rounded-xl p-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#262626] uppercase">
              <FileCheck className="w-4 h-4 text-[#0070C0]" />
              <span>Prérequis & Éligibilité</span>
            </div>
            <ul className="space-y-2 text-xs text-[#595959] font-sans">
              {selectedTierData.prerequisites.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-[#7D7D7D] shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Livrables & Titres remis */}
          <div className="space-y-3 bg-[#F5F5F7] border border-[#E8E8E8] rounded-xl p-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#262626] uppercase">
              <Award className="w-4 h-4 text-[#0E8A5E]" />
              <span>Livrables & Droits</span>
            </div>
            <ul className="space-y-2 text-xs text-[#595959] font-sans">
              {selectedTierData.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF6600] shrink-0 mt-0.5" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Rôles & Débouchés accrédités */}
          <div className="space-y-3 bg-[#F5F5F7] border border-[#E8E8E8] rounded-xl p-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#262626] uppercase">
              <Users className="w-4 h-4 text-[#0070C0]" />
              <span>Rôles & Débouchés</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedTierData.accreditedRoles.map((r, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-white border border-[#E8E8E8] text-[#404040] shadow-xs"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Official Recognition Banner */}
        <div className="mt-8 pt-6 border-t border-[#E8E8E8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#7D7D7D]">
          <div className="flex items-center gap-2 text-[#0E8A5E]">
            <ShieldCheck className="w-4 h-4 text-[#0E8A5E]" />
            <span>{selectedTierData.recognitionStatement}</span>
          </div>

          <span className="text-[11px] text-[#7D7D7D]">
            Audit conforme à la norme ISO/IEC 17024 (Évaluation des personnes)
          </span>
        </div>
      </div>

      {/* Comparison Matrix of the 3 Tiers (BRONZE, ARGENT, OR) */}
      <div className="bg-[#F5F5F7] border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 space-y-6 font-sans">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF6600] font-bold">
            GRILLE COMPARATIVE
          </span>
          <h4 className="text-xl font-bold text-[#262626]">
            Progression au sein du Référentiel EXCELLENCE TSF
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8E8E8] text-[#7D7D7D] font-mono uppercase text-[11px]">
                <th className="py-3 px-4">Dimension</th>
                <th className="py-3 px-4 text-[#404040] font-bold bg-[#EBEBEB]">BRONZE (Niveau I)</th>
                <th className="py-3 px-4 text-[#0070C0] font-bold bg-[#EBF5FC]">ARGENT (Niveau II)</th>
                <th className="py-3 px-4 text-[#FF6600] font-bold bg-[#FFF3EB]">OR (Niveau III)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E8]">
              <tr>
                <td className="py-3 px-4 font-semibold text-[#262626]">Cœur de cible</td>
                <td className="py-3 px-4 text-[#595959]">Diplômés d'élite & juniors à haut potentiel</td>
                <td className="py-3 px-4 text-[#595959]">Chefs de projet confirmés & directeurs techniques</td>
                <td className="py-3 px-4 font-semibold text-[#0070C0]">Fellows, dirigeants et ministres potentiels</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#262626]">Expérience minimale</td>
                <td className="py-3 px-4 text-[#595959]">0 à 2 ans</td>
                <td className="py-3 px-4 text-[#595959]">3 à 6 ans</td>
                <td className="py-3 px-4 text-[#595959]">7+ ans ou impact massif démontré</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#262626]">Méthode d'évaluation</td>
                <td className="py-3 px-4 text-[#595959]">Tests standardisés & cas d'école écrits</td>
                <td className="py-3 px-4 text-[#595959]">Soutenance devant grand jury TSF</td>
                <td className="py-3 px-4 font-semibold text-[#0070C0]">Plénière du Conseil d'Orientation Stratégique</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#262626]">Sécurité & QR Code</td>
                <td className="py-3 px-4 text-[#595959]">QR Code registre & certificat numérique</td>
                <td className="py-3 px-4 text-[#595959]">QR Code avec signature asymétrique</td>
                <td className="py-3 px-4 text-[#595959] font-semibold text-[#FF6600]">QR Code holographique & ancrage registre souverain</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#262626]">Opportunités débloquées</td>
                <td className="py-3 px-4 text-[#595959]">Stages et détachements junior</td>
                <td className="py-3 px-4 text-[#595959]">Postes CTO / Lead et bourses de recherche</td>
                <td className="py-3 px-4 font-semibold text-[#0E8A5E]">Financement direct de projets et haute direction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
