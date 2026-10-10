import React from 'react';
import { Card } from '../ui/Card';
import { Building2, Landmark, Globe, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export interface PartnerCardProps {
  name: string;
  category: 'entreprises' | 'bailleurs' | 'osc' | 'institutions';
  tier?: string;
  scope: string;
  commitment: string;
  activeProjectsCount?: number;
  logoPlaceholder?: string;
  onClick?: () => void;
  className?: string;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  name,
  category,
  tier = 'Alliance Stratégique',
  scope,
  commitment,
  activeProjectsCount = 1,
  logoPlaceholder,
  onClick,
  className = ''
}) => {
  const categoryLabels = {
    entreprises: 'Entreprise & Industrie',
    bailleurs: 'Bailleur & Financeur d’Impact',
    osc: 'Société Civile & Éducation',
    institutions: 'Institution Publique / État'
  };

  const categoryIcons = {
    entreprises: Building2,
    bailleurs: Landmark,
    osc: Globe,
    institutions: ShieldCheck
  };

  const Icon = categoryIcons[category];

  return (
    <Card
      padding="lg"
      hoverEffect={!!onClick}
      onClick={onClick}
      className={`flex flex-col justify-between h-full bg-white border border-[#E8E8E8] hover:border-[#0070C0]/40 rounded-xl transition-all duration-200 ${className}`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-3 text-xs font-mono text-[#7D7D7D]">
          <span className="text-[#FF6600] font-semibold uppercase tracking-wider">
            {tier}
          </span>
          <span className="text-[#7D7D7D]">
            {categoryLabels[category]}
          </span>
        </div>

        {/* Icon & Name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#EBF5FC] text-[#0070C0] flex items-center justify-center font-bold text-sm shrink-0 border border-[#A3D1F1]">
            <Icon className="w-5 h-5 text-[#0070C0]" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#262626] font-sans">
              {name}
            </h4>
            <span className="text-xs text-[#7D7D7D] font-mono">
              Rayonnement : {scope}
            </span>
          </div>
        </div>

        {/* Commitment Statement */}
        <p className="text-xs sm:text-sm text-[#595959] leading-relaxed font-sans">
          {commitment}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-[#E8E8E8] flex items-center justify-between text-xs font-sans">
        <span className="font-mono text-[11px] text-[#7D7D7D]">
          {activeProjectsCount} convention(s) active(s)
        </span>

        {onClick && (
          <button
            type="button"
            className="text-xs font-semibold text-[#0070C0] hover:text-[#005FA3] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Détails de l'alliance</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </Card>
  );
};
