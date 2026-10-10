import React from 'react';

export interface ProgressProps {
  value: number; // 0 to 100
  label?: string;
  sublabel?: string;
  variant?: 'primary' | 'accent' | 'success';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  steps?: { label: string; at: number }[];
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  label,
  sublabel,
  variant = 'primary',
  size = 'md',
  showPercentage = true,
  steps,
  className = ''
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const barColors = {
    primary: 'bg-[#0070C0]',
    accent: 'bg-[#FF6600]',
    success: 'bg-[#0E8A5E]'
  };

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs">
          {label && (
            <span className="font-semibold text-slate-800 tracking-tight">
              {label}
            </span>
          )}
          {sublabel && (
            <span className="text-[11px] font-mono text-slate-400">
              {sublabel}
            </span>
          )}
          {showPercentage && (
            <span className="font-mono font-bold text-slate-900 tabular-nums">
              {clampedValue.toFixed(0)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Track */}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightStyles[size]} relative border border-slate-200/50`}>
        <div
          className={`${barColors[variant]} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Step Indicators if provided */}
      {steps && steps.length > 0 && (
        <div className="flex justify-between pt-1 text-[11px] font-mono text-slate-400">
          {steps.map((step, idx) => (
            <span
              key={idx}
              className={`${clampedValue >= step.at ? 'text-[#0B1B3D] font-bold' : ''}`}
            >
              {step.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
