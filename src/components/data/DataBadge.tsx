import React from 'react';

export interface DataBadgeProps {
  label: string;
  variant?: 'verified' | 'neutral' | 'accent' | 'warning' | 'outline';
  icon?: React.ReactNode;
  className?: string;
}

export const DataBadge: React.FC<DataBadgeProps> = ({
  label,
  variant = 'neutral',
  icon,
  className = ''
}) => {
  const variantStyles = {
    verified: 'text-[#0E8A5E] bg-[#ECFDF5] border border-[#A7F3D0]',
    neutral: 'text-[#404040] bg-[#F5F5F7] border border-[#E8E8E8]',
    accent: 'text-[#FF6600] bg-[#FFF3EB] border border-[#FFC49E]',
    warning: 'text-[#D97706] bg-[#FFFBEB] border border-[#FDE68A]',
    outline: 'text-[#404040] bg-white border border-[#E8E8E8]'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono uppercase font-semibold tracking-wider rounded ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{label}</span>
    </span>
  );
};
