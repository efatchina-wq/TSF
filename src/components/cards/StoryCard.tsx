import React from 'react';
import { Card } from '../ui/Card';
import { Quote, ArrowUpRight } from 'lucide-react';

export interface StoryCardProps {
  quote: string;
  authorName: string;
  authorTitle: string;
  program: string;
  cohort: string;
  country: string;
  outcomeMetric?: string;
  className?: string;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  quote,
  authorName,
  authorTitle,
  program,
  cohort,
  country,
  outcomeMetric,
  className = ''
}) => {
  return (
    <Card
      padding="lg"
      className={`flex flex-col justify-between h-full bg-white border border-[#E8E8E8] hover:border-[#0070C0]/40 rounded-xl transition-all duration-200 relative ${className}`}
    >
      <div>
        <Quote className="w-8 h-8 text-[#FF6600]/30 mb-3 stroke-[1.5]" />

        {/* The Quote */}
        <p className="text-sm sm:text-base text-[#262626] leading-relaxed font-serif italic">
          « {quote} »
        </p>

        {/* Highlight metric if present */}
        {outcomeMetric && (
          <div className="mt-4 inline-block px-3 py-1 bg-[#FFF3EB] border border-[#FFC49E] rounded-md text-xs font-mono text-[#FF6600] font-semibold">
            {outcomeMetric}
          </div>
        )}
      </div>

      {/* Author Details */}
      <div className="mt-6 pt-4 border-t border-[#E8E8E8] flex items-start justify-between font-sans">
        <div>
          <h4 className="text-sm font-bold text-[#262626]">
            {authorName}
          </h4>
          <p className="text-xs text-[#7D7D7D] mt-0.5 leading-snug">
            {authorTitle}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#7D7D7D] mt-1">
            <span>{country}</span>
            <span aria-hidden="true" className="text-[#D6D6D6]">·</span>
            <span>{program} ({cohort})</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
