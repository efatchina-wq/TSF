import React from 'react';
import { useRouter } from '../../hooks/useRouter';
import { RoutePath } from '../../types';

export interface SubNavItem {
  id: string;
  label: string;
  path: RoutePath;
  active?: boolean;
}

interface SubNavProps {
  items: SubNavItem[];
  activeId?: string;
  onItemClick?: (item: SubNavItem) => void;
  className?: string;
}

export const SubNav: React.FC<SubNavProps> = ({ items, activeId, onItemClick, className = '' }) => {
  const { currentPath, navigate } = useRouter();

  return (
    <nav className={`flex items-center gap-1 overflow-x-auto border-b border-[#E8E8E8] no-scrollbar ${className}`}>
      {items.map((item) => {
        const isCurrent = activeId !== undefined
          ? item.id === activeId
          : item.active !== undefined
            ? item.active
            : currentPath === item.path;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (onItemClick) {
                onItemClick(item);
              } else {
                navigate(item.path);
              }
            }}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap border-b-2 cursor-pointer -mb-[1px] select-none ${
              isCurrent
                ? 'border-[#0070C0] text-[#0070C0] font-bold'
                : 'border-transparent text-[#7D7D7D] hover:text-[#262626] hover:border-[#B8B8B8]'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};
