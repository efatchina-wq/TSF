import React from 'react';
import { Card } from '../ui/Card';
import { FileText, Download, Calendar, ShieldCheck } from 'lucide-react';

export interface ReportCardProps {
  title: string;
  referenceCode: string;
  category: 'Rapport Annuel' | 'Livre Blanc' | 'Référentiel Méthodologique' | 'Charte Déontologique';
  date: string;
  fileSize: string;
  summary: string;
  onDownload?: () => void;
  className?: string;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  title,
  referenceCode,
  category,
  date,
  fileSize,
  summary,
  onDownload,
  className = ''
}) => {
  return (
    <Card
      padding="lg"
      className={`flex flex-col justify-between h-full bg-white border border-[#E8E8E8] hover:border-[#0070C0]/40 rounded-xl transition-all duration-200 ${className}`}
    >
      <div>
        {/* Top Reference Code & Category */}
        <div className="flex items-center justify-between text-xs font-mono text-[#7D7D7D] mb-3">
          <span className="text-[#FF6600] font-semibold uppercase tracking-wider">
            {category}
          </span>
          <span className="text-[#7D7D7D] font-bold">
            [{referenceCode}]
          </span>
        </div>

        {/* Title */}
        <h4 className="text-base sm:text-lg font-bold text-[#262626] leading-snug font-sans group-hover:text-[#0070C0] transition-colors">
          {title}
        </h4>

        {/* Summary */}
        <p className="mt-2 text-xs sm:text-sm text-[#595959] leading-relaxed font-sans">
          {summary}
        </p>

        {/* Document Specifications */}
        <div className="mt-4 pt-3 border-t border-[#E8E8E8] flex items-center gap-3 text-xs font-mono text-[#7D7D7D]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#B8B8B8]" />
            <span>{date}</span>
          </div>
          <span aria-hidden="true" className="text-[#D6D6D6]">·</span>
          <span>PDF ({fileSize})</span>
          <span aria-hidden="true" className="text-[#D6D6D6]">·</span>
          <div className="flex items-center gap-1 text-[#0E8A5E]">
            <ShieldCheck className="w-3 h-3 text-[#0E8A5E]" />
            <span>Homologué</span>
          </div>
        </div>
      </div>

      {/* Download Action */}
      <div className="mt-6 pt-4 border-t border-[#E8E8E8] flex items-center justify-between font-sans">
        <span className="text-[11px] font-mono text-[#7D7D7D]">
          Accès libre d'intérêt général
        </span>

        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0070C0] text-white text-xs font-semibold rounded-lg hover:bg-[#005FA3] transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Télécharger</span>
          <Download className="w-3 h-3 ml-0.5" />
        </button>
      </div>
    </Card>
  );
};
