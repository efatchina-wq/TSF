import React from 'react';
import { Card } from '../ui/Card';
import { Radio, Newspaper, Video, ArrowRight, Clock, Calendar } from 'lucide-react';

export interface MediaCardProps {
  title: string;
  type: 'article' | 'podcast' | 'video' | 'communique';
  excerpt: string;
  date: string;
  readTimeOrDuration?: string;
  authorOrSource?: string;
  onClick?: () => void;
  className?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  title,
  type,
  excerpt,
  date,
  readTimeOrDuration,
  authorOrSource = 'TSF Média & Édition',
  onClick,
  className = ''
}) => {
  const typeIcons = {
    article: Newspaper,
    podcast: Radio,
    video: Video,
    communique: Newspaper
  };

  const typeLabels = {
    article: 'Revue Stratégique',
    podcast: 'Émission Audio',
    video: 'Documentaire Vidéo',
    communique: 'Communiqué Officiel'
  };

  const Icon = typeIcons[type];

  return (
    <Card
      padding="md"
      hoverEffect={!!onClick}
      onClick={onClick}
      className={`flex flex-col justify-between h-full bg-white border border-[#E8E8E8] hover:border-[#0070C0]/40 rounded-xl transition-all duration-200 ${className}`}
    >
      <div>
        {/* Type & Meta */}
        <div className="flex items-center justify-between text-xs font-mono text-[#7D7D7D] mb-3">
          <span className="flex items-center gap-1.5 text-[#0070C0] font-semibold uppercase tracking-wider">
            <Icon className="w-3.5 h-3.5" />
            <span>{typeLabels[type]}</span>
          </span>
          {readTimeOrDuration && (
            <span className="flex items-center gap-1 text-[#7D7D7D]">
              <Clock className="w-3 h-3 text-[#B8B8B8]" />
              <span>{readTimeOrDuration}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-base sm:text-lg font-bold text-[#262626] leading-snug font-sans group-hover:text-[#0070C0] transition-colors">
          {title}
        </h4>

        {/* Excerpt */}
        <p className="mt-2 text-xs sm:text-sm text-[#595959] leading-relaxed line-clamp-3 font-sans">
          {excerpt}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-[#E8E8E8] flex items-center justify-between text-xs text-[#7D7D7D] font-mono">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#B8B8B8]" />
          <span>{date}</span>
        </div>

        <button
          type="button"
          onClick={onClick}
          className="text-xs font-semibold text-[#0070C0] hover:text-[#005FA3] transition-colors flex items-center gap-1 cursor-pointer font-sans"
        >
          <span>Consulter</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
};
