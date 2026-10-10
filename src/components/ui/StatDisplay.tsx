import React from 'react';

export interface StatDisplayProps {
  value: string;
  label: string;
  context?: string;
  period?: string;
  variant?: 'default' | 'accent' | 'primary' | 'compact';
  className?: string;
}

export const StatDisplay: React.FC<StatDisplayProps> = ({
  value,
  label,
  context,
  period,
  variant = 'default',
  className = ''
}) => {
  const valueColor =
    variant === 'accent'
      ? 'text-[#FF6600]'
      : variant === 'primary'
      ? 'text-[#0070C0]'
      : 'text-[#262626]';

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-baseline gap-2">
        <span
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-sans tabular-nums ${valueColor}`}
        >
          {value}
        </span>
        {period && (
          <span className="text-xs font-mono text-[#7D7D7D] uppercase tracking-wider">
            {period}
          </span>
        )}
      </div>
      <span className="mt-1 text-sm font-semibold text-[#404040] leading-snug">
        {label}
      </span>
      {context && (
        <span className="mt-0.5 text-xs text-[#7D7D7D] leading-relaxed">
          {context}
        </span>
      )}
    </div>
  );
};
