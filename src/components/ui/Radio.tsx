import React, { forwardRef } from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  label,
  description,
  className = '',
  disabled,
  checked,
  id,
  ...props
}, ref) => {
  const radioId = id || (typeof label === 'string' ? `radio-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : undefined);

  return (
    <div className={`flex items-start gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          checked={checked}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div className="w-4.5 h-4.5 rounded-full border border-[#E8E8E8] bg-white transition-all peer-checked:border-[#0070C0] peer-focus-visible:ring-2 peer-focus-visible:ring-[#0070C0]/25 peer-disabled:bg-[#F5F5F7] peer-disabled:cursor-not-allowed cursor-pointer flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#0070C0] opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
      </div>

      {(label || description) && (
        <div className="select-none">
          {label && (
            <label
              htmlFor={radioId}
              className={`text-sm font-medium text-[#404040] cursor-pointer ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#262626]'
              }`}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-[#7D7D7D] leading-relaxed mt-0.5">{description}</p>
          )}
        </div>
      )}
    </div>
  );
});

Radio.displayName = 'Radio';
