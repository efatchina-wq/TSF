import React from 'react';

export interface StatProps {
  label: string;
  value: string | number;
  subtext?: string;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export const Stat: React.FC<StatProps> = ({
  label,
  value,
  subtext,
  orientation = 'vertical',
  className = ''
}) => {
  if (orientation === 'horizontal') {
    return (
      <div className={`flex items-baseline justify-between py-2 border-b border-slate-100 ${className}`}>
        <span className="text-xs text-slate-500 font-medium">{label}</span>
        <div className="text-right">
          <span className="text-sm font-bold text-slate-900 font-sans tabular-nums">{value}</span>
          {subtext && <span className="block text-[11px] text-slate-400 font-mono">{subtext}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-base sm:text-lg font-bold text-slate-900 font-sans tabular-nums mt-0.5">{value}</span>
      {subtext && <span className="text-xs text-slate-500 mt-0.5">{subtext}</span>}
    </div>
  );
};
