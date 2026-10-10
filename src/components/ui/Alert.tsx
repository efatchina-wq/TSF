import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onDismiss,
  className = ''
}) => {
  const variantStyles = {
    info: {
      container: 'bg-[#EBF5FC] border-[#A3D1F1] text-[#004D85]',
      icon: <Info className="w-5 h-5 text-[#0070C0] shrink-0 mt-0.5" />
    },
    success: {
      container: 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F3E]',
      icon: <CheckCircle2 className="w-5 h-5 text-[#0E8A5E] shrink-0 mt-0.5" />
    },
    warning: {
      container: 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]',
      icon: <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
    },
    danger: {
      container: 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]',
      icon: <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
    }
  };

  const current = variantStyles[variant];

  return (
    <div
      role="alert"
      className={`p-4 rounded-xl border flex items-start gap-3 text-sm shadow-xs ${current.container} ${className}`}
    >
      {current.icon}

      <div className="flex-1 space-y-0.5">
        {title && <h5 className="font-semibold text-sm leading-tight">{title}</h5>}
        <div className="text-xs sm:text-sm leading-relaxed opacity-95">{children}</div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fermer l'alerte"
          className="p-1 hover:opacity-75 rounded transition-opacity cursor-pointer shrink-0 ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
