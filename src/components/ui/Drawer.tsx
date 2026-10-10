import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  footer?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  position = 'right',
  size = 'md',
  footer
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
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
    sm: 'max-w-xs',
    md: 'max-w-md',
    lg: 'max-w-xl'
  };

  const posStyles = position === 'right' ? 'right-0' : 'left-0';

  return (
    <div className="fixed inset-0 z-[60] flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#121212]/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Surface */}
      <div
        ref={drawerRef}
        className={`fixed top-0 bottom-0 ${posStyles} w-full ${sizeStyles[size]} bg-white border-l border-[#E8E8E8] shadow-2xl flex flex-col z-10 animate-in slide-in-from-${position} duration-200`}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E8E8E8]">
          <div className="space-y-0.5">
            {title && <h3 className="font-bold text-lg text-[#262626] font-sans">{title}</h3>}
            {description && <p className="text-xs text-[#7D7D7D]">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#7D7D7D] hover:text-[#262626] hover:bg-[#F5F5F7] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {children}
        </div>

        {footer && (
          <div className="p-4 bg-[#F5F5F7] border-t border-[#E8E8E8]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
