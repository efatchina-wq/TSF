import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'tertiary' | 'outline' | 'danger' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  icon,
  iconPosition = 'right',
  loading = false,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0070C0] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer select-none active:scale-[0.99] max-w-full';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-md',
    md: 'text-sm px-4.5 py-2.5 gap-2 rounded-lg',
    lg: 'text-base px-6 py-3 gap-2.5 rounded-lg'
  };

  const variantStyles = {
    // Primary: Institutional Blue (#0070C0)
    primary: 'bg-[#0070C0] text-white hover:bg-[#005FA3] active:bg-[#004D85] shadow-xs border border-[#0070C0]',
    // Accent: Propulsion Orange (#FF6600) — reserved for key conversion CTAs
    accent: 'bg-[#FF6600] text-white hover:bg-[#E65500] active:bg-[#BF4400] shadow-xs border border-[#FF6600]',
    // Secondary: Light grey surface (#F5F5F7)
    secondary: 'bg-[#F5F5F7] text-[#404040] hover:bg-[#EBEBEB] hover:text-[#262626] border border-[#E8E8E8]',
    // Tertiary: Outline with subtle hairline
    tertiary: 'border border-[#404040]/30 text-[#404040] hover:bg-[#F5F5F7] hover:border-[#404040] active:bg-[#EBEBEB]',
    // Outline: Architectural hairline
    outline: 'border border-[#404040]/30 text-[#404040] hover:bg-[#F5F5F7] hover:border-[#404040] active:bg-[#EBEBEB]',
    // Danger: Controlled red
    danger: 'bg-[#DC2626] text-white hover:bg-[#B91C1C] active:bg-[#991B1B] shadow-xs border border-[#DC2626]',
    // Ghost: Clean transparent text
    ghost: 'text-[#404040] hover:text-[#0070C0] hover:bg-[#F5F5F7]',
    // Text: Inline link-like button
    text: 'text-[#0070C0] hover:text-[#004D85] underline-offset-4 hover:underline p-0 font-medium'
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span className="truncate">{children}</span>
      {!loading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
