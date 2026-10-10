import React from 'react';
import { Card } from '../ui/Card';
import { ShieldCheck, MapPin, Users, Award } from 'lucide-react';

export interface InstitutionCardProps {
  title: string;
  role: string;
  mandate: string;
  composition: string[];
  headquartersOrHub?: string;
  statusBadge?: string;
  onClick?: () => void;
  className?: string;
}

export const InstitutionCard: React.FC<InstitutionCardProps> = ({
  title,
  role,
  mandate,
  composition,
  headquartersOrHub,
  statusBadge = 'Organe Statutaire Homologué',
  onClick,
  className = ''
}) => {
  return (
    <Card
      padding="lg"
      hoverEffect={!!onClick}
      onClick={onClick}
      className={`border-t-4 border-t-[#0070C0] flex flex-col justify-between h-full bg-white border border-[#E8E8E8] hover:border-[#0070C0]/40 rounded-xl transition-all duration-200 ${className}`}
    >
      <div>
        {/* Top Status & Role */}
        <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#7D7D7D] mb-3">
          <span className="text-[#FF6600] font-semibold uppercase tracking-wider">
            {role}
          </span>
          <span className="text-[#0E8A5E] bg-[#ECFDF5] px-2 py-0.5 rounded-md border border-[#A7F3D0] text-[11px] font-semibold">
            {statusBadge}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-[#262626] tracking-tight font-sans">
          {title}
        </h3>

        {/* Mandate */}
        <p className="mt-3 text-xs sm:text-sm text-[#595959] leading-relaxed font-sans">
          {mandate}
        </p>

        {/* Composition list */}
        {composition && composition.length > 0 && (
          <div className="mt-6 pt-4 border-t border-[#E8E8E8] space-y-2">
            <span className="text-xs font-bold text-[#262626] uppercase font-mono tracking-wider block">
              Composition représentative :
            </span>
            <ul className="space-y-1.5 text-xs text-[#595959] font-sans">
              {composition.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0070C0] shrink-0 mt-1.5" />
                  <span className="leading-snug">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer Info */}
      {headquartersOrHub && (
        <div className="mt-6 pt-4 border-t border-[#E8E8E8] flex items-center gap-1.5 text-xs text-[#7D7D7D] font-mono">
          <MapPin className="w-3.5 h-3.5 text-[#0070C0]" />
          <span>{headquartersOrHub}</span>
        </div>
      )}
    </Card>
  );
};
