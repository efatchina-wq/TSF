import React, { forwardRef } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean | string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  success,
  iconLeft,
  iconRight,
  className = '',
  disabled,
  required,
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : undefined);

  const isSuccess = Boolean(success);
  const successMessage = typeof success === 'string' ? success : undefined;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 font-sans"
        >
          {label}
          {required && <span className="text-[#FF6600] ml-1 font-bold">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {iconLeft && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
            {iconLeft}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          className={`w-full bg-white text-slate-900 placeholder:text-slate-400 text-sm rounded-xl border transition-all duration-150 py-2.5 font-sans outline-none ${
            iconLeft ? 'pl-10' : 'pl-3.5'
          } ${iconRight || error || isSuccess ? 'pr-10' : 'pr-3.5'} ${
            error
              ? 'border-rose-300 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : isSuccess
              ? 'border-emerald-300 bg-emerald-50/20 text-slate-900 focus:border-[#0E8A5E] focus:ring-2 focus:ring-[#0E8A5E]/20'
              : 'border-slate-200 hover:border-slate-300 focus:border-[#0070C0] focus:ring-2 focus:ring-[#0070C0]/20'
          } disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed ${className}`}
          {...props}
        />

        {/* Status indicator icon or custom iconRight */}
        <div className="absolute right-3.5 flex items-center pointer-events-none">
          {error ? (
            <AlertCircle className="w-4 h-4 text-rose-500" />
          ) : isSuccess ? (
            <CheckCircle2 className="w-4 h-4 text-[#0E8A5E]" />
          ) : iconRight ? (
            <span className="text-slate-400">{iconRight}</span>
          ) : null}
        </div>
      </div>

      {/* Helper or Status Message */}
      {error ? (
        <p className="text-xs text-rose-600 font-medium leading-tight mt-1 flex items-center gap-1 font-sans">
          <span>{error}</span>
        </p>
      ) : successMessage ? (
        <p className="text-xs text-[#0E8A5E] font-medium leading-tight mt-1 flex items-center gap-1 font-sans">
          <span>{successMessage}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 leading-tight mt-1 font-sans">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
