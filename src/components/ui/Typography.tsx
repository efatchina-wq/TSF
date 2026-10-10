import React from 'react';

// Sovereign Institutional Typographic Hierarchy for Talents Sans Frontières (TSF)
// Strict Palette:
// Charcoal #404040 for body prose & headings
// Primary Blue #0070C0 for structured accents / brand
// Accent Orange #FF6600 for highlighted data & CTAs

interface TextProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Display: React.FC<TextProps> = ({ children, className = '', as: Component = 'h1' }) => (
  <Component
    className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#262626] leading-[1.1] text-balance font-sans ${className}`}
  >
    {children}
  </Component>
);

export const H1: React.FC<TextProps> = ({ children, className = '', as: Component = 'h1' }) => (
  <Component
    className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#262626] leading-tight text-balance font-sans ${className}`}
  >
    {children}
  </Component>
);

export const H2: React.FC<TextProps> = ({ children, className = '', as: Component = 'h2' }) => (
  <Component
    className={`text-2xl sm:text-3xl font-bold tracking-tight text-[#333333] leading-snug font-sans ${className}`}
  >
    {children}
  </Component>
);

export const H3: React.FC<TextProps> = ({ children, className = '', as: Component = 'h3' }) => (
  <Component
    className={`text-lg sm:text-xl font-semibold tracking-tight text-[#404040] leading-snug font-sans ${className}`}
  >
    {children}
  </Component>
);

export const H4: React.FC<TextProps> = ({ children, className = '', as: Component = 'h4' }) => (
  <Component
    className={`text-base font-semibold tracking-tight text-[#404040] leading-normal font-sans ${className}`}
  >
    {children}
  </Component>
);

export const BodyLarge: React.FC<TextProps> = ({ children, className = '', as: Component = 'p' }) => (
  <Component
    className={`text-lg sm:text-xl leading-relaxed text-[#595959] font-sans max-w-prose ${className}`}
  >
    {children}
  </Component>
);

export const Body: React.FC<TextProps & { size?: 'normal' | 'lead' }> = ({
  children,
  className = '',
  size = 'normal',
  as: Component = 'p'
}) => (
  <Component
    className={`${
      size === 'lead'
        ? 'text-base sm:text-lg leading-relaxed text-[#404040]'
        : 'text-sm sm:text-base leading-relaxed text-[#595959]'
    } font-sans max-w-prose ${className}`}
  >
    {children}
  </Component>
);

export const BodySmall: React.FC<TextProps> = ({ children, className = '', as: Component = 'p' }) => (
  <Component className={`text-xs sm:text-sm text-[#7D7D7D] leading-normal font-sans ${className}`}>
    {children}
  </Component>
);

export const Small: React.FC<TextProps> = ({ children, className = '', as: Component = 'p' }) => (
  <Component className={`text-xs sm:text-sm text-[#7D7D7D] leading-normal font-sans ${className}`}>
    {children}
  </Component>
);

export const Caption: React.FC<TextProps> = ({ children, className = '', as: Component = 'span' }) => (
  <Component className={`text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#7D7D7D] ${className}`}>
    {children}
  </Component>
);

export const Label: React.FC<TextProps & { htmlFor?: string; required?: boolean }> = ({
  children,
  className = '',
  htmlFor,
  required = false,
  as: Component = 'label'
}) => (
  <Component
    htmlFor={htmlFor}
    className={`block text-xs font-semibold uppercase tracking-wider text-[#404040] font-sans mb-1.5 ${className}`}
  >
    {children}
    {required && <span className="text-[#FF6600] ml-1">*</span>}
  </Component>
);

export const DataText: React.FC<TextProps & { size?: 'sm' | 'md' | 'lg' | 'display'; highlight?: boolean; accent?: boolean }> = ({
  children,
  className = '',
  size = 'md',
  highlight = false,
  accent = false,
  as: Component = 'span'
}) => {
  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-xl sm:text-2xl',
    lg: 'text-3xl sm:text-4xl',
    display: 'text-4xl sm:text-5xl lg:text-6xl'
  };

  const colorStyle = accent
    ? 'text-[#FF6600]'
    : highlight
    ? 'text-[#0070C0]'
    : 'text-[#262626]';

  return (
    <Component
      className={`font-sans font-bold tabular-nums tracking-tight ${colorStyle} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </Component>
  );
};
