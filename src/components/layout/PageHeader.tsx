import React from 'react';
import { Container, ContainerProps } from '../ui/Container';
import { Breadcrumbs } from '../navigation/Breadcrumbs';

export interface PageHeaderProps {
  kicker?: string;
  category?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  metadata?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'standard' | 'subtle' | 'compact' | 'accent';
  containerSize?: ContainerProps['size'];
  showBreadcrumbs?: boolean;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  kicker,
  category,
  title,
  description,
  actions,
  metadata,
  children,
  variant = 'standard',
  containerSize = 'normal',
  showBreadcrumbs = true,
  className = ''
}) => {
  const displayCategory = category || kicker;

  const variantStyles = {
    standard: 'bg-white border-b border-[#E8E8E8] pt-7 pb-9 sm:pt-9 sm:pb-11',
    subtle: 'bg-[#F5F5F7] border-b border-[#E8E8E8] pt-7 pb-9 sm:pt-9 sm:pb-11',
    compact: 'bg-white border-b border-[#E8E8E8] py-5 sm:py-6',
    accent: 'bg-white border-b border-[#E8E8E8] border-l-4 border-l-[#0070C0] pt-7 pb-9 sm:pt-9 sm:pb-11'
  };

  return (
    <header className={`${variantStyles[variant]} ${className}`}>
      <Container size={containerSize}>
        {/* Step 1: Optional Breadcrumbs */}
        {showBreadcrumbs && (
          <div className="mb-3.5 sm:mb-4">
            <Breadcrumbs />
          </div>
        )}

        {/* Step 2 → 3 → 4 → 5: Category → Title → Description → Main Actions */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            {/* Category / Kicker */}
            {displayCategory && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600]" />
                <p className="text-xs font-semibold tracking-widest text-[#FF6600] uppercase font-mono">
                  {displayCategory}
                </p>
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#262626] font-sans leading-tight text-balance break-words">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="text-sm sm:text-base text-[#595959] leading-relaxed max-w-2xl font-sans pt-1">
                {description}
              </p>
            )}

            {/* Metadata slot (tags, dates, counts) */}
            {metadata && (
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {metadata}
              </div>
            )}
          </div>

          {/* Main Action cluster */}
          {actions && (
            <div className="flex flex-wrap items-center gap-3 shrink-0 lg:pb-1">
              {actions}
            </div>
          )}
        </div>

        {/* Optional Secondary Tabular / Filter Children */}
        {children && <div className="mt-6 pt-2">{children}</div>}
      </Container>
    </header>
  );
};
