import React from 'react';
import { Card } from '../ui/Card';
import { Metric, MetricProps } from './Metric';
import { ShieldCheck } from 'lucide-react';

export interface MetricCardProps extends MetricProps {
  auditedBy?: string;
  contextNote?: string;
  benchmark?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  auditedBy,
  contextNote,
  benchmark,
  onClick,
  ...metricProps
}) => {
  return (
    <Card
      padding="md"
      hoverEffect={!!onClick}
      onClick={onClick}
      className="flex flex-col justify-between h-full bg-white border border-[#E8E8E8] shadow-xs"
    >
      <div>
        {auditedBy && (
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{auditedBy}</span>
          </div>
        )}

        <Metric {...metricProps} />

        {contextNote && (
          <p className="mt-3 text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
            {contextNote}
          </p>
        )}
      </div>

      {benchmark && (
        <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Benchmark :</span>
          <span className="text-slate-700 font-semibold">{benchmark}</span>
        </div>
      )}
    </Card>
  );
};
