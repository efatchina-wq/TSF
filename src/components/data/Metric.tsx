import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export interface MetricProps {
  value: string | number;
  label: string;
  unit?: string;
  period?: string;
  delta?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  size?: 'sm' | 'md' | 'lg' | 'display';
  highlight?: boolean;
  className?: string;
}

export const Metric: React.FC<MetricProps> = ({
  value,
  label,
  unit,
  period,
  delta,
  size = 'md',
  highlight = false,
  className = ''
}) => {
  const sizeStyles = {
    sm: 'text-2xl',
    md: 'text-3xl sm:text-4xl',
    lg: 'text-4xl sm:text-5xl',
    display: 'text-5xl sm:text-6xl'
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Top Value with Unit & Delta */}
      <div className="flex items-baseline gap-2 flex-wrap">
        <span
          className={`font-sans font-bold tabular-nums tracking-tight ${
            highlight ? 'text-[#FF6600]' : 'text-[#0070C0]'
          } ${sizeStyles[size]}`}
        >
          {value}
        </span>

        {unit && (
          <span className="text-base sm:text-lg font-medium text-slate-500 font-sans">
            {unit}
          </span>
        )}

        {delta && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-mono font-semibold ml-1 ${
              delta.isPositive ? 'text-emerald-700' : 'text-slate-500'
            }`}
          >
            {delta.isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2]" />
            ) : (
              <Minus className="w-3.5 h-3.5" />
            )}
            <span>{delta.value}</span>
            {delta.label && <span className="text-slate-400 font-normal">({delta.label})</span>}
          </span>
        )}
      </div>

      {/* Label */}
      <span className="mt-1 text-sm font-semibold text-slate-900 tracking-tight leading-snug">
        {label}
      </span>

      {/* Context Period */}
      {period && (
        <span className="mt-0.5 text-xs font-mono text-slate-400 uppercase tracking-wider">
          {period}
        </span>
      )}
    </div>
  );
};
