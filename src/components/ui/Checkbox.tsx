import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  description,
  error,
  className = '',
  disabled,
  checked,
  id,
  ...props
}, ref) => {
  const checkboxId = id || (typeof label === 'string' ? `cb-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : undefined);

  return (
    <div className={`flex items-start gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          checked={checked}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div className="w-4.5 h-4.5 rounded border border-[#E8E8E8] bg-white transition-all peer-checked:bg-[#0070C0] peer-checked:border-[#0070C0] peer-focus-visible:ring-2 peer-focus-visible:ring-[#0070C0]/25 peer-disabled:bg-[#F5F5F7] peer-disabled:border-[#E8E8E8] peer-disabled:cursor-not-allowed cursor-pointer flex items-center justify-center">
          <Check className="w-3 h-3 text-white stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
      </div>

      {(label || description) && (
        <div className="select-none">
          {label && (
            <label
              htmlFor={checkboxId}
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
          {error && <p className="text-xs text-[#DC2626] font-medium mt-1">{error}</p>}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
