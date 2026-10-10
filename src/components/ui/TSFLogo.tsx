import React from 'react';

export interface TSFLogoProps {
  variant?: 'full' | 'mark' | 'horizontal' | 'monochrome-white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
}

export const TSFLogo: React.FC<TSFLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showSubtitle = true,
}) => {
  // Dimension tokens
  const markDimensions = {
    sm: { w: 32, h: 32 },
    md: { w: 40, h: 40 },
    lg: { w: 48, h: 48 },
    xl: { w: 64, h: 64 },
  }[size];

  const textSizes = {
    sm: { title: 'text-xs', subtitle: 'text-[9px]' },
    md: { title: 'text-sm sm:text-base', subtitle: 'text-[10px]' },
    lg: { title: 'text-base sm:text-lg', subtitle: 'text-xs' },
    xl: { title: 'text-lg sm:text-xl', subtitle: 'text-xs' },
  }[size];

  const isMonochromeWhite = variant === 'monochrome-white';

  // Authentic Brand Mark SVG
  // Colors strictly:
  // Primary Blue: #0070C0
  // Accent Orange: #FF6600
  // Charcoal: #404040
  const BrandEmblem = (
    <svg
      width={markDimensions.w}
      height={markDimensions.h}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200 group-hover:scale-[1.02]"
      aria-hidden="true"
    >
      {/* Outer Shield / Horizon Container */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="8"
        fill={isMonochromeWhite ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF'}
        stroke={isMonochromeWhite ? 'rgba(255, 255, 255, 0.25)' : '#E8E8E8'}
        strokeWidth="1.5"
      />

      {/* Primary Blue (#0070C0) Solid Foundation Arch / T Pillar */}
      <path
        d="M10 14H38V20H27V38H21V20H10V14Z"
        fill={isMonochromeWhite ? '#FFFFFF' : '#0070C0'}
      />

      {/* Accent Orange (#FF6600) Dynamic Propulsion Arc (Bridging Frontiers) */}
      <path
        d="M14 26C14 21.5817 17.5817 18 22 18H36C37.1046 18 38 18.8954 38 20C38 21.1046 37.1046 22 36 22H22C19.7909 22 18 23.7909 18 26C18 28.2091 19.7909 30 22 30H34V34H22C17.5817 34 14 30.4183 14 26Z"
        fill={isMonochromeWhite ? '#FF6600' : '#FF6600'}
      />

      {/* North-East Forward Arrow Vertex (#0070C0 or #FF6600) */}
      <path
        d="M32 26L38 20L32 14V18H28V22H32V26Z"
        fill={isMonochromeWhite ? '#FFFFFF' : '#FF6600'}
      />
    </svg>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{BrandEmblem}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 text-left ${className}`}>
      {BrandEmblem}

      <div className="flex flex-col select-none leading-none min-w-0">
        <span
          className={`font-bold tracking-tight font-sans uppercase leading-tight whitespace-nowrap ${textSizes.title} ${
            isMonochromeWhite ? 'text-white' : 'text-[#404040]'
          }`}
        >
          <span className={isMonochromeWhite ? 'text-white' : 'text-[#0070C0]'}>TALENTS</span>{' '}
          <span className={isMonochromeWhite ? 'text-[#FF6600]' : 'text-[#FF6600]'}>SANS</span>{' '}
          <span className="hidden min-[380px]:inline">FRONTIÈRES</span>
          <span className="inline min-[380px]:hidden">F.</span>
        </span>

        {showSubtitle && (
          <span
            className={`font-mono uppercase tracking-widest mt-1 hidden sm:block ${textSizes.subtitle} ${
              isMonochromeWhite ? 'text-slate-300' : 'text-[#7D7D7D]'
            }`}
          >
            Infrastructure Panafricaine
          </span>
        )}
      </div>
    </div>
  );
};
