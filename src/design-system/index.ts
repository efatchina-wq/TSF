/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TALENTS SANS FRONTIÈRES (TSF) — DESIGN SYSTEM HUB
 * Centralized design system exports: tokens, colors, typography, audit, and brand assets.
 */

export * from './tokens';
export * from './auditReport';
export { TSFLogo } from '../components/ui/TSFLogo';

/**
 * Utility helper for standard TSF class composition
 */
export const tsfClassNames = {
  // Brand colors
  bgPrimary: 'bg-[#0070C0]',
  textPrimary: 'text-[#0070C0]',
  borderPrimary: 'border-[#0070C0]',
  bgAccent: 'bg-[#FF6600]',
  textAccent: 'text-[#FF6600]',
  borderAccent: 'border-[#FF6600]',
  textCharcoal: 'text-[#404040]',
  borderHairline: 'border-slate-200/80',
  
  // Clean surface styles
  surfaceCanvas: 'bg-[#FAFAFA]',
  surfaceCard: 'bg-white border border-[#E8E8E8] shadow-xs',
  surfaceElevated: 'bg-white border border-[#E8E8E8] shadow-sm',

  // Buttons
  btnPrimaryOrange: 'bg-[#FF6600] hover:bg-[#E65500] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs active:scale-[0.99]',
  btnSecondaryBlue: 'bg-[#0070C0] hover:bg-[#005FA3] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs active:scale-[0.99]',
  btnOutlineCharcoal: 'border border-[#404040]/30 hover:border-[#404040] text-[#404040] hover:bg-slate-50 font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer',
  btnGhost: 'text-[#404040] hover:text-[#0070C0] hover:bg-slate-100 font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer',

  // Typographic metadata (Zero-Pill discipline)
  metadataItem: 'text-xs text-[#7D7D7D] font-medium inline-flex items-center gap-1.5',
  metadataSeparator: 'text-[#B8B8B8] select-none',
} as const;
