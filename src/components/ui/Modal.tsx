import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  className = ''
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl'
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] overflow-y-auto overscroll-contain flex min-h-full items-center justify-center p-3 sm:p-6 text-center animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Surface with Pinned Header & Pinned Footer */}
      <div
        ref={modalRef}
        className={`relative w-full ${sizeStyles[size]} bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] text-left transform transition-all ${className}`}
      >
        {/* Pinned Header */}
        <div className="flex items-start justify-between p-5 sm:p-7 border-b border-slate-100 bg-white shrink-0">
          <div className="space-y-1 pr-6">
            {title && (
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#262626] font-sans">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la boîte de dialogue"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto overscroll-contain flex-1 space-y-5 text-slate-700 font-sans">
          {children}
        </div>

        {/* Pinned Footer Actions */}
        {footer && (
          <div className="p-4 sm:px-7 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3 shrink-0 rounded-b-3xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
