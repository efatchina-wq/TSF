import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'neutral' | 'success' | 'warning' | 'danger' | 'outline';
  dot?: boolean;
  pill?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  dot = false,
  pill = false,
  size = 'md',
  className = ''
}) => {
  const variantStyles = {
    // Primary: Institutional Blue (#0070C0)
    primary: 'text-[#0070C0] bg-[#EBF5FC] border border-[#A3D1F1]',
    // Accent: Propulsion Orange (#FF6600)
    accent: 'text-[#FF6600] bg-[#FFF3EB] border border-[#FFC49E]',
    // Neutral: Charcoal / Slate
    neutral: 'text-[#404040] bg-[#F5F5F7] border border-[#E8E8E8]',
    // Success: African Growth Emerald
    success: 'text-[#0E8A5E] bg-[#ECFDF5] border border-[#A7F3D0]',
    // Warning: Amber
    warning: 'text-[#D97706] bg-[#FFFBEB] border border-[#FDE68A]',
    // Danger: Red
    danger: 'text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA]',
    // Outline: Clean architectural hairline
    outline: 'text-[#404040] border border-[#E8E8E8] bg-white'
  };

  const dotColors = {
    primary: 'bg-[#0070C0]',
    accent: 'bg-[#FF6600]',
    neutral: 'bg-[#7D7D7D]',
    success: 'bg-[#0E8A5E]',
    warning: 'bg-[#D97706]',
    danger: 'bg-[#DC2626]',
    outline: 'bg-[#404040]'
  };

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5'
  };

  const radiusStyle = pill ? 'rounded-full' : 'rounded-md';

  return (
    <span
      className={`inline-flex items-center font-medium tracking-wide uppercase font-mono ${variantStyles[variant]} ${sizeStyles[size]} ${radiusStyle} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      <span>{children}</span>
    </span>
  );
};
