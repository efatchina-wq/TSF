import React from 'react';
import { KEY_IMPACT_METRICS } from '../../data/institutionData';
import { StatDisplay } from '../ui/StatDisplay';

export interface ImpactMetricsGridProps {
  limit?: number;
  className?: string;
}

export const ImpactMetricsGrid: React.FC<ImpactMetricsGridProps> = ({
  limit,
  className = ''
}) => {
  const metrics = limit ? KEY_IMPACT_METRICS.slice(0, limit) : KEY_IMPACT_METRICS;

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${className}`}>
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-white border border-slate-200/90 rounded-lg p-6 hover:border-slate-300 transition-colors"
        >
          <StatDisplay
            value={metric.value}
            label={metric.label}
            context={metric.context}
            period={metric.period}
          />
        </div>
      ))}
    </div>
  );
};
