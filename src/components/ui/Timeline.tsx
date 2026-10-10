import React from 'react';
import { Check, Circle } from 'lucide-react';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status?: 'completed' | 'current' | 'upcoming';
  icon?: React.ReactNode;
  tags?: string[];
  content?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  return (
    <div className={`relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E8E8] ${className}`}>
      {items.map((item) => {
        const isCompleted = item.status === 'completed';
        const isCurrent = item.status === 'current';

        return (
          <div key={item.id} className="relative group">
            {/* Marker Indicator */}
            <div
              className={`absolute -left-6 sm:-left-8 top-1 flex items-center justify-center w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 transition-all ${
                isCompleted
                  ? 'bg-[#0070C0] border-[#0070C0] text-white shadow-xs'
                  : isCurrent
                  ? 'bg-white border-[#FF6600] text-[#FF6600] ring-4 ring-[#FF6600]/15'
                  : 'bg-white border-[#D6D6D6] text-[#B8B8B8]'
              }`}
            >
              {item.icon ? (
                <span className="w-3 h-3 flex items-center justify-center">{item.icon}</span>
              ) : isCompleted ? (
                <Check className="w-3 h-3 stroke-[3]" />
              ) : (
                <Circle className={`w-2 h-2 ${isCurrent ? 'fill-[#FF6600]' : 'fill-transparent'}`} />
              )}
            </div>

            {/* Content Body */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <h4 className={`text-sm sm:text-base font-bold font-sans ${isCurrent ? 'text-[#0070C0]' : 'text-[#262626]'}`}>
                  {item.title}
                </h4>
                {item.date && (
                  <span className="text-xs font-mono text-[#7D7D7D] font-normal">
                    {item.date}
                  </span>
                )}
              </div>

              {item.description && (
                <p className="text-xs sm:text-sm text-[#595959] leading-relaxed max-w-prose">
                  {item.description}
                </p>
              )}

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#7D7D7D]">
                  {item.tags.map((tag, i) => (
                    <React.Fragment key={tag}>
                      {i > 0 && <span aria-hidden="true" className="text-[#D6D6D6]">·</span>}
                      <span className="font-medium text-[#404040]">{tag}</span>
                    </React.Fragment>
                  ))}
                </div>
              )}

              {item.content && <div className="pt-2">{item.content}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
