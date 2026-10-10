import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'flat' | 'elevated' | 'subtle';
  radius?: 'lg' | 'xl' | '2xl';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  padding = 'md',
  variant = 'default',
  radius = 'xl'
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7',
    lg: 'p-8 sm:p-9',
    xl: 'p-10 sm:p-12'
  };

  const radiusStyles = {
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl'
  };

  const variantStyles = {
    default: 'bg-white border border-[#E8E8E8] shadow-xs',
    flat: 'bg-white border border-[#E8E8E8] shadow-none',
    elevated: 'bg-white border border-[#E8E8E8] shadow-sm',
    subtle: 'bg-[#F5F5F7] border border-[#E8E8E8] shadow-none'
  };

  const clickableStyles = onClick ? 'cursor-pointer select-none active:scale-[0.995]' : '';
  const hoverStyles = hoverEffect
    ? 'transition-all duration-200 hover:border-[#0070C0]/40 hover:shadow-sm hover:-translate-y-0.5'
    : '';

  return (
    <div
      onClick={onClick}
      className={`${variantStyles[variant]} ${radiusStyles[radius]} ${paddingStyles[padding]} ${hoverStyles} ${clickableStyles} ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`space-y-1.5 mb-5 ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <h3 className={`text-lg sm:text-xl font-bold tracking-tight text-[#262626] font-sans ${className}`}>
    {children}
  </h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <p className={`text-xs sm:text-sm text-[#7D7D7D] leading-relaxed ${className}`}>
    {children}
  </p>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`space-y-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#7D7D7D] ${className}`}>
    {children}
  </div>
);

export const Divider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <hr className={`border-0 border-t border-[#E8E8E8] my-8 ${className}`} />
);
