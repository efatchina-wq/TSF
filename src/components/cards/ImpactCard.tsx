import React from 'react';
import { Card } from '../ui/Card';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

export interface ImpactCardProps {
  metric: string;
  unit?: string;
  title: string;
  context: string;
  period: string;
  source?: string;
  highlight?: boolean;
  territorialScope?: string;
  className?: string;
}

export const ImpactCard: React.FC<ImpactCardProps> = ({
  metric,
  unit,
  title,
  context,
  period,
  source = 'Audit Annuel TSF',
  highlight = false,
  territorialScope = '18 pays couverts',
  className = ''
}) => {
  return (
    <Card
      padding="lg"
      className={`flex flex-col justify-between h-full bg-white border border-[#E8E8E8] rounded-xl transition-all duration-200 ${
        highlight ? 'border-l-4 border-l-[#FF6600]' : 'border-l-4 border-l-[#0070C0]'
      } ${className}`}
    >
      <div>
        {/* Top Scope and Period */}
        <div className="flex items-center justify-between text-xs font-mono text-[#7D7D7D] mb-3">
          <span className="text-[#FF6600] font-semibold uppercase tracking-wider">
            {territorialScope}
          </span>
          <span>{period}</span>
        </div>

        {/* Big Metric Display */}
        <div className="flex items-baseline gap-1.5 mb-2">
          <span
            className={`text-4xl sm:text-5xl font-bold font-sans tabular-nums tracking-tight ${
              highlight ? 'text-[#FF6600]' : 'text-[#0070C0]'
            }`}
          >
            {metric}
          </span>
          {unit && (
            <span className="text-xl font-bold text-[#7D7D7D] font-sans">
              {unit}
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-[#262626] leading-snug font-sans">
          {title}
        </h4>

        {/* Narrative Context */}
        <p className="mt-2 text-xs sm:text-sm text-[#595959] leading-relaxed font-sans">
          {context}
        </p>
      </div>

      {/* Audit verification stamp */}
      <div className="mt-6 pt-4 border-t border-[#E8E8E8] flex items-center justify-between text-[11px] text-[#7D7D7D] font-mono">
        <div className="flex items-center gap-1.5 text-[#0E8A5E]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0E8A5E]" />
          <span className="font-medium">{source}</span>
        </div>
        <span className="uppercase tracking-wider font-semibold">Certifié</span>
      </div>
    </Card>
  );
};
