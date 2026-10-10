/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TALENTS SANS FRONTIÈRES (TSF) — SOVEREIGN DESIGN TOKENS
 * Official brand identity system based strictly on the TSF seal:
 * - PRIMARY BLUE: #0070C0
 * - ACCENT ORANGE: #FF6600
 * - CHARCOAL: #404040
 * - WHITE: #FFFFFF
 */

export const tsfColors = {
  // 1. PRIMARY BLUE (#0070C0) — Institutional anchor, navigation, links, brand elements
  primary: {
    50: '#EBF5FC',
    100: '#D1E8F8',
    200: '#A3D1F1',
    300: '#6AB4E8',
    400: '#3397DE',
    500: '#0070C0', // OFFICIAL TSF PRIMARY BLUE
    600: '#005FA3',
    700: '#004D85',
    800: '#003B66',
    900: '#002947',
    950: '#001A30',
  },

  // 2. ACCENT ORANGE (#FF6600) — Strategic actions, key CTAs, highlights, opportunities
  accent: {
    50: '#FFF3EB',
    100: '#FFE4D1',
    200: '#FFC49E',
    300: '#FFA066',
    400: '#FF8033',
    500: '#FF6600', // OFFICIAL TSF ACCENT ORANGE
    600: '#E65500',
    700: '#BF4400',
    800: '#993300',
    900: '#732400',
    950: '#4D1600',
  },

  // 3. CHARCOAL (#404040) — Body prose, institutional typography, secondary headings
  charcoal: {
    25: '#FAFAFA',
    50: '#F5F5F7',
    100: '#EBEBEB',
    200: '#D6D6D6',
    300: '#B8B8B8',
    400: '#7D7D7D',
    500: '#404040', // OFFICIAL TSF CHARCOAL
    600: '#333333',
    700: '#262626',
    800: '#1A1A1A',
    900: '#121212',
    950: '#0A0A0A',
  },

  // 4. PURE WHITE & SURFACE CANVAS
  white: '#FFFFFF',

  surface: {
    canvas: '#FAFAFA',
    card: '#FFFFFF',
    subtle: '#F5F5F7',
    elevated: '#FFFFFF',
    overlay: 'rgba(18, 18, 18, 0.65)',
    border: '#E8E8E8',
    borderHairline: 'rgba(64, 64, 64, 0.12)',
  },

  // 5. SEMANTIC FEEDBACK (Controlled & disciplined)
  semantic: {
    success: {
      light: '#ECFDF5',
      base: '#0E8A5E',
      dark: '#065F3E',
      border: '#A7F3D0',
    },
    warning: {
      light: '#FFFBEB',
      base: '#D97706',
      dark: '#92400E',
      border: '#FDE68A',
    },
    danger: {
      light: '#FEF2F2',
      base: '#DC2626',
      dark: '#991B1B',
      border: '#FECACA',
    },
    info: {
      light: '#EBF5FC',
      base: '#0070C0',
      dark: '#004D85',
      border: '#D1E8F8',
    },
  },
} as const;

export const tsfTypography = {
  fontFamilies: {
    sans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    display: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    serif: "'Playfair Display', Georgia, serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
  },

  fontSize: {
    xs: { size: '0.75rem', lineHeight: '1rem', tracking: '0.01em' },     // 12px
    sm: { size: '0.875rem', lineHeight: '1.25rem', tracking: '0' },     // 14px
    base: { size: '1rem', lineHeight: '1.625rem', tracking: '0' },       // 16px (Editorial standard measure 65-75ch)
    lg: { size: '1.125rem', lineHeight: '1.75rem', tracking: '-0.01em' },// 18px
    xl: { size: '1.25rem', lineHeight: '1.875rem', tracking: '-0.015em' },// 20px
    '2xl': { size: '1.5rem', lineHeight: '2rem', tracking: '-0.02em' },  // 24px
    '3xl': { size: '1.875rem', lineHeight: '2.25rem', tracking: '-0.025em' }, // 30px
    '4xl': { size: '2.25rem', lineHeight: '2.625rem', tracking: '-0.03em' },  // 36px
    '5xl': { size: '3rem', lineHeight: '3.375rem', tracking: '-0.035em' },     // 48px
    '6xl': { size: '3.75rem', lineHeight: '4.125rem', tracking: '-0.04em' },   // 60px
  },

  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const;

export const tsfSpacing = {
  0: '0px',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
} as const;

export const tsfRadii = {
  none: '0px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px', // Reserved strictly for avatars & toggles, never static pill cards
} as const;

export const tsfShadows = {
  none: 'none',
  hairline: '0 1px 2px 0 rgba(64, 64, 64, 0.04)',
  sm: '0 1px 3px 0 rgba(64, 64, 64, 0.06), 0 1px 2px -1px rgba(64, 64, 64, 0.04)',
  md: '0 4px 6px -1px rgba(64, 64, 64, 0.07), 0 2px 4px -2px rgba(64, 64, 64, 0.05)',
  lg: '0 10px 15px -3px rgba(64, 64, 64, 0.07), 0 4px 6px -4px rgba(64, 64, 64, 0.03)',
  xl: '0 20px 25px -5px rgba(64, 64, 64, 0.06), 0 8px 10px -6px rgba(64, 64, 64, 0.02)',
  focus: '0 0 0 3px rgba(0, 112, 192, 0.25)',
  focusAccent: '0 0 0 3px rgba(255, 102, 0, 0.25)',
} as const;

export const tsfBorders = {
  subtle: '1px solid #EBEBEB',
  hairline: '1px solid rgba(64, 64, 64, 0.12)',
  strong: '1px solid #404040',
  primary: '1px solid #0070C0',
  accent: '1px solid #FF6600',
  focusRing: '2px solid #0070C0',
} as const;

export const tsfBreakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
} as const;

export const tsfZIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  header: 40,
  drawer: 50,
  modalBackdrop: 60,
  modal: 70,
  popover: 80,
  toast: 90,
  tooltip: 100,
} as const;

export const tsfTransitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const tsfTokens = {
  colors: tsfColors,
  typography: tsfTypography,
  spacing: tsfSpacing,
  radii: tsfRadii,
  shadows: tsfShadows,
  borders: tsfBorders,
  breakpoints: tsfBreakpoints,
  zIndex: tsfZIndex,
  transitions: tsfTransitions,
} as const;

export type TsfTokens = typeof tsfTokens;
