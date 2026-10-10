import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-between gap-4 py-3 select-none ${className}`}
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#E8E8E8] text-[#404040] hover:bg-[#F5F5F7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span>Précédent</span>
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                isActive
                  ? 'bg-[#0070C0] text-white shadow-xs'
                  : 'text-[#404040] hover:bg-[#F5F5F7]'
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#E8E8E8] text-[#404040] hover:bg-[#F5F5F7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <span>Suivant</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </nav>
  );
};
