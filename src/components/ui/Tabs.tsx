import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number | string;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'underline' | 'segmented';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab,
  onChange,
  variant = 'underline',
  className = ''
}) => {
  if (variant === 'segmented') {
    return (
      <div
        role="tablist"
        className={`inline-flex items-center gap-1 p-1 bg-[#F5F5F7] border border-[#E8E8E8] rounded-xl overflow-x-auto no-scrollbar ${className}`}
      >
        {items.map((item) => {
          const isActive = item.id === activeTab;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              disabled={item.disabled}
              aria-selected={isActive}
              onClick={() => onChange(item.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed ${
                isActive
                  ? 'bg-white text-[#0070C0] shadow-xs'
                  : 'text-[#595959] hover:text-[#262626] hover:bg-white/50'
              }`}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-[#EBF5FC] text-[#0070C0]' : 'bg-[#E8E8E8] text-[#595959]'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="tablist"
      className={`flex items-center gap-2 border-b border-[#E8E8E8] overflow-x-auto no-scrollbar ${className}`}
    >
      {items.map((item) => {
        const isActive = item.id === activeTab;
        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            disabled={item.disabled}
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 cursor-pointer -mb-[1px] select-none disabled:opacity-50 disabled:cursor-not-allowed ${
              isActive
                ? 'border-[#0070C0] text-[#0070C0]'
                : 'border-transparent text-[#7D7D7D] hover:text-[#262626] hover:border-slate-300'
            }`}
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            {item.count !== undefined && (
              <span
                className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-[#EBF5FC] text-[#0070C0]' : 'bg-[#F5F5F7] text-[#7D7D7D]'
                }`}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
