import React from 'react';
import { Check } from 'lucide-react';

export interface TimelineItem {
  id: string;
  order?: number | string;
  title: string;
  tagline?: string;
  dateOrDuration?: string;
  date?: string;
  description: string;
  status?: 'completed' | 'current' | 'upcoming';
  meta?: string[];
  tags?: string[];
}

export interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  orientation = 'vertical',
  className = ''
}) => {
  if (orientation === 'horizontal') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${className}`}>
        {items.map((item, idx) => {
          const isCompleted = item.status === 'completed';
          const isCurrent = item.status === 'current';

          return (
            <div key={item.id} className="relative flex flex-col p-4 bg-white border border-slate-200/90 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                    isCompleted
                      ? 'bg-[#0E8A5E] text-white'
                      : isCurrent
                      ? 'bg-[#0070C0] text-white ring-2 ring-[#0070C0]/30'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : item.order || idx + 1}
                </span>

                {item.dateOrDuration && (
                  <span className="text-[11px] font-mono text-slate-400 uppercase">
                    {item.dateOrDuration}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-[#262626]">{item.title}</h4>
              {item.tagline && (
                <span className="text-xs font-mono text-[#FF6600] mt-0.5">{item.tagline}</span>
              )}
              <p className="text-xs text-slate-600 mt-2 leading-relaxed flex-1">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  // Vertical orientation
  return (
    <div className={`relative border-l-2 border-slate-200 ml-4 space-y-8 pl-6 py-2 ${className}`}>
      {items.map((item, idx) => {
        const isCompleted = item.status === 'completed';
        const isCurrent = item.status === 'current';

        return (
          <div key={item.id} className="relative group">
            {/* Marker Circle */}
            <div
              className={`absolute -left-[35px] top-0.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-transform ${
                isCompleted
                  ? 'bg-[#0E8A5E] text-white'
                  : isCurrent
                  ? 'bg-[#0070C0] text-white ring-4 ring-[#0070C0]/25'
                  : 'bg-white border-2 border-slate-300 text-slate-600'
              }`}
            >
              {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : item.order || idx + 1}
            </div>

            {/* Content Box */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono text-[#FF6600] font-bold uppercase tracking-wider">
                  {item.tagline || `Phase 0${idx + 1}`}
                </span>
                {item.dateOrDuration && (
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    {item.dateOrDuration}
                  </span>
                )}
              </div>

              <h4 className="text-base sm:text-lg font-bold text-[#262626]">
                {item.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {item.description}
              </p>

              {item.meta && item.meta.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-mono">
                  {item.meta.map((m, mIdx) => (
                    <span key={mIdx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-slate-400" />
                      <span>{m}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
