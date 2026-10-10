import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { ShieldCheck, Info } from 'lucide-react';

export interface ChartDataPoint {
  label: string;
  value: number;
  displayValue?: string;
  sublabel?: string;
  highlight?: boolean;
}

export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  source?: string;
  data: ChartDataPoint[];
  type?: 'bar' | 'distribution';
  unit?: string;
  periodTabs?: string[];
  className?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  source = 'Registre d’Audit Officiel TSF — 2026',
  data,
  type = 'bar',
  unit = '%',
  periodTabs = ['2024', '2025', '2026'],
  className = ''
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(periodTabs[periodTabs.length - 1] || '2026');

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <Card padding="lg" className={`bg-white border border-slate-200/90 ${className}`}>
      {/* Header with Title and Period Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6600] block mb-1">
            Indicateur Analytique
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#262626] tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}
        </div>

        {periodTabs.length > 0 && (
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md self-start">
            {periodTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedPeriod(tab)}
                className={`px-2.5 py-1 text-xs font-mono font-semibold rounded transition-colors cursor-pointer ${
                  selectedPeriod === tab
                    ? 'bg-white text-[#0070C0] font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Visual Chart Content (SVG / Bar) */}
      <div className="py-6 space-y-4">
        {data.map((item, idx) => {
          const percentage = Math.round((item.value / maxValue) * 100);

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-semibold text-slate-800">
                  {item.label}
                  {item.sublabel && (
                    <span className="text-slate-400 font-normal ml-1.5">
                      ({item.sublabel})
                    </span>
                  )}
                </span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {item.displayValue || `${item.value} ${unit}`}
                </span>
              </div>

              {/* Bar track */}
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    item.highlight ? 'bg-[#FF6600]' : 'bg-[#0070C0]'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footnote / Audit Source */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Source : {source}</span>
        </div>
        <span>Données certifiées à date</span>
      </div>
    </Card>
  );
};
