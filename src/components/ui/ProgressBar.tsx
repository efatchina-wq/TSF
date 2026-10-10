import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValue?: boolean;
  valueSuffix?: string;
  variant?: 'primary' | 'accent' | 'neutral' | 'success';
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = true,
  valueSuffix = '%',
  variant = 'primary',
  size = 'md',
  indeterminate = false,
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const trackBgStyles = {
    primary: 'bg-[#0070C0]',
    accent: 'bg-[#FF6600]',
    neutral: 'bg-[#404040]',
    success: 'bg-[#0E8A5E]'
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-sans">
          {label && (
            <span className="font-semibold text-[#404040] uppercase tracking-wider text-[11px]">
              {label}
            </span>
          )}
          {showValue && !indeterminate && (
            <span className="font-mono text-[#7D7D7D] tabular-nums font-medium">
              {percentage}{valueSuffix}
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`w-full bg-[#EBEBEB] rounded-full overflow-hidden ${sizeStyles[size]}`}
      >
        {indeterminate ? (
          <div
            className={`h-full w-1/3 rounded-full animate-pulse transition-all ${trackBgStyles[variant]}`}
            style={{ animation: 'indeterminateProgress 1.5s infinite ease-in-out' }}
          />
        ) : (
          <div
            className={`h-full rounded-full transition-all duration-300 ease-out ${trackBgStyles[variant]}`}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
};
