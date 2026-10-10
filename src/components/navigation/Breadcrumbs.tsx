import React from 'react';
import { useRouter } from '../../hooks/useRouter';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const { breadcrumbs, navigate } = useRouter();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav
      aria-label="Fil d’Ariane"
      className="flex items-center text-xs text-[#7D7D7D] font-medium overflow-x-auto no-scrollbar whitespace-nowrap py-0.5"
    >
      {breadcrumbs.map((crumb, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === breadcrumbs.length - 1;

        return (
          <div key={crumb.path} className="flex items-center gap-1.5 shrink-0">
            {idx > 0 && (
              <ChevronRight className="w-3.5 h-3.5 text-[#B8B8B8] stroke-[1.5]" />
            )}
            {isLast ? (
              <span
                className="text-[#262626] font-semibold truncate max-w-[220px]"
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => navigate(crumb.path)}
                className="hover:text-[#0070C0] transition-colors cursor-pointer flex items-center gap-1"
              >
                {isFirst && <Home className="w-3 h-3 text-[#7D7D7D]" />}
                <span>{crumb.label}</span>
              </button>
            )}
          </div>
        );
      })}
    </nav>
  );
};
