import React from 'react';
import { MethodologyStep } from '../../types';
import { Card } from '../ui/Card';
import { Check, ArrowRight } from 'lucide-react';

export interface MethodologyStepCardProps {
  step: MethodologyStep;
  isActive?: boolean;
  onSelect?: () => void;
}

export const MethodologyStepCard: React.FC<MethodologyStepCardProps> = ({
  step,
  isActive = false,
  onSelect
}) => {
  return (
    <Card
      padding="lg"
      onClick={onSelect}
      className={`relative flex flex-col justify-between border-2 rounded-xl transition-all duration-200 cursor-pointer ${
        isActive
          ? 'border-[#0070C0] shadow-xs bg-white'
          : 'border-[#E8E8E8] hover:border-[#0070C0]/40 bg-white'
      }`}
    >
      <div>
        {/* Step Number & Label */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#0070C0] text-white flex items-center justify-center font-bold text-xs font-mono shadow-xs">
              0{step.order}
            </span>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#262626] font-sans">
              {step.label}
            </span>
          </div>
          <span className="text-xs font-mono text-[#7D7D7D] uppercase tracking-widest">
            Phase 0{step.order}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-xs font-semibold text-[#FF6600] uppercase tracking-wider mb-2 font-mono">
          {step.tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-[#595959] leading-relaxed font-sans">
          {step.description}
        </p>

        {/* Mechanisms */}
        <div className="mt-5 space-y-2">
          <p className="text-xs font-bold text-[#262626] uppercase tracking-wider font-mono">
            Dispositifs Opérationnels :
          </p>
          <ul className="space-y-1.5 text-xs text-[#595959] font-sans">
            {step.operationalMechanisms.map((mech, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#0E8A5E] shrink-0 mt-0.5" />
                <span>{mech}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Deliverables & KPIs */}
      <div className="mt-6 pt-4 border-t border-[#E8E8E8] flex flex-col gap-2 font-sans">
        <div className="flex items-baseline justify-between text-xs">
          <span className="text-[#7D7D7D] font-mono uppercase">Livrables majeurs :</span>
          <span className="font-semibold text-[#404040]">{step.deliverables[0]}</span>
        </div>
        <div className="flex items-baseline justify-between text-xs">
          <span className="text-[#7D7D7D] font-mono uppercase">Indicateur clé :</span>
          <span className="font-bold text-[#0070C0]">{step.kpis[0]}</span>
        </div>
      </div>
    </Card>
  );
};
