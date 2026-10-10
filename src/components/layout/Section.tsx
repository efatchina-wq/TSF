import React from 'react';
import { Container, ContainerProps } from '../ui/Container';

export interface SectionProps {
  id?: string;
  children: React.ReactNode;
  variant?: 'white' | 'subtle' | 'highlight' | 'dark' | 'transparent';
  spacing?: 'standard' | 'compact' | 'spacious' | 'none';
  containerSize?: ContainerProps['size'];
  className?: string;
  containerClassName?: string;
  withTopBorder?: boolean;
  withBottomBorder?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  children,
  variant = 'white',
  spacing = 'standard',
  containerSize = 'normal',
  className = '',
  containerClassName = '',
  withTopBorder = false,
  withBottomBorder = false
}) => {
  const variantStyles = {
    white: 'bg-white text-[#404040]',
    subtle: 'bg-[#F5F5F7] text-[#404040]',
    highlight: 'bg-[#EBF5FC]/60 text-[#404040]',
    dark: 'bg-[#121212] text-slate-200',
    transparent: 'bg-transparent text-[#404040]'
  };

  const spacingStyles = {
    standard: 'py-16 sm:py-20 lg:py-24',
    compact: 'py-10 sm:py-12 lg:py-16',
    spacious: 'py-20 sm:py-28 lg:py-32',
    none: 'py-0'
  };

  const borderStyles = [
    withTopBorder ? 'border-t border-[#E8E8E8]' : '',
    withBottomBorder ? 'border-b border-[#E8E8E8]' : ''
  ].filter(Boolean).join(' ');

  return (
    <section
      id={id}
      className={`relative w-full ${variantStyles[variant]} ${spacingStyles[spacing]} ${borderStyles} ${className}`}
    >
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
};

export interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  align?: 'left' | 'center' | 'split';
  kickerColor?: 'orange' | 'blue' | 'muted';
  className?: string;
  titleClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  description,
  actions,
  align = 'left',
  kickerColor = 'orange',
  className = '',
  titleClassName = ''
}) => {
  const kickerColorStyles = {
    orange: 'text-[#FF6600]',
    blue: 'text-[#0070C0]',
    muted: 'text-[#7D7D7D]'
  };

  if (align === 'split') {
    return (
      <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-16 ${className}`}>
        <div className="max-w-3xl space-y-2">
          {kicker && (
            <p className={`text-xs font-mono font-bold uppercase tracking-widest ${kickerColorStyles[kickerColor]}`}>
              {kicker}
            </p>
          )}
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#262626] font-sans ${titleClassName}`}>
            {title}
          </h2>
          {description && (
            <p className="text-sm sm:text-base text-[#595959] leading-relaxed max-w-2xl font-sans mt-2">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>
    );
  }

  if (align === 'center') {
    return (
      <div className={`max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16 ${className}`}>
        {kicker && (
          <p className={`text-xs font-mono font-bold uppercase tracking-widest ${kickerColorStyles[kickerColor]}`}>
            {kicker}
          </p>
        )}
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#262626] font-sans ${titleClassName}`}>
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-base text-[#595959] leading-relaxed max-w-2xl mx-auto font-sans">
            {description}
          </p>
        )}
        {actions && (
          <div className="flex justify-center items-center gap-3 pt-4">
            {actions}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`max-w-3xl space-y-2 mb-10 sm:mb-14 ${className}`}>
      {kicker && (
        <p className={`text-xs font-mono font-bold uppercase tracking-widest ${kickerColorStyles[kickerColor]}`}>
          {kicker}
        </p>
      )}
      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#262626] font-sans ${titleClassName}`}>
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-[#595959] leading-relaxed font-sans">
          {description}
        </p>
      )}
      {actions && (
        <div className="flex items-center gap-3 pt-3">
          {actions}
        </div>
      )}
    </div>
  );
};
