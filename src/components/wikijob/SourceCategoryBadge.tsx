import React from 'react';
import { SourceCategory } from '../../types/wikijob';

interface SourceCategoryBadgeProps {
  category: SourceCategory;
  size?: 'sm' | 'md';
}

const CATEGORY_STYLES: Record<SourceCategory, { bg: string; text: string; border: string }> = {
  EMPLOI: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
  STAGE: { bg: 'bg-cyan-50', text: 'text-cyan-800', border: 'border-cyan-200' },
  VOLONTARIAT: { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-200' },
  FORMATION: { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-200' },
  FINANCEMENT: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
  BOURSE: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  CONCOURS: { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200' },
  ENTREPRENEURIAT: { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
  ACTUALITÉ: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
  'PROGRAMME PUBLIC': { bg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-300' },
  AUTRE: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' }
};

export const SourceCategoryBadge: React.FC<SourceCategoryBadgeProps> = ({ 
  category, 
  size = 'md' 
}) => {
  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.AUTRE;
  const pad = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-[11px]';

  return (
    <span className={`inline-flex items-center font-mono font-semibold rounded-md border ${style.bg} ${style.text} ${style.border} ${pad}`}>
      {category}
    </span>
  );
};
