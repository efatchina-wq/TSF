import React from 'react';
import { InstitutionalResource } from '../../types';
import { Card } from '../ui/Card';
import { FileText, Download, Calendar } from 'lucide-react';

export interface PublicationCardProps {
  item: InstitutionalResource;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({ item }) => {
  return (
    <Card
      hoverEffect
      padding="md"
      className="flex flex-col justify-between h-full bg-white border border-[#E8E8E8] hover:border-[#0070C0]/40 rounded-xl transition-all duration-200"
    >
      <div>
        <div className="flex items-center justify-between text-xs font-mono text-[#7D7D7D] mb-2">
          <span className="text-[#FF6600] font-semibold uppercase tracking-wider">
            {item.type}
          </span>
          <span className="text-[#7D7D7D]">{item.fileSize}</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#262626] group-hover:text-[#0070C0] transition-colors leading-snug font-sans">
          {item.title}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-[#595959] leading-relaxed font-sans">
          {item.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[#E8E8E8] flex items-center justify-between text-xs font-sans">
        <div className="flex items-center gap-1.5 text-[#7D7D7D] font-mono">
          <Calendar className="w-3.5 h-3.5 text-[#B8B8B8]" />
          <span>{item.date}</span>
        </div>

        <a
          href={item.downloadUrl || '#'}
          download
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0070C0] hover:text-[#005FA3] transition-colors cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Télécharger le rapport</span>
          <Download className="w-3 h-3 ml-0.5" />
        </a>
      </div>
    </Card>
  );
};
