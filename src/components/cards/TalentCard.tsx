import React from 'react';
import { Card } from '../ui/Card';
import { Award, CheckCircle2, MapPin, Briefcase } from 'lucide-react';

export interface TalentCardProps {
  name: string;
  country: string;
  program: string;
  cohort: string;
  specialty: string;
  currentRole: string;
  certificationGrade?: string;
  impactProject?: string;
  photoUrl?: string;
  onClick?: () => void;
  className?: string;
}

export const TalentCard: React.FC<TalentCardProps> = ({
  name,
  country,
  program,
  cohort,
  specialty,
  currentRole,
  certificationGrade = 'Grade A — Excellence',
  impactProject,
  onClick,
  className = ''
}) => {
  // Initials for avatar fallback
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <Card
      padding="md"
      hoverEffect={!!onClick}
      onClick={onClick}
      className={`flex flex-col justify-between h-full bg-white border border-[#E8E8E8] hover:border-[#0070C0]/40 rounded-xl transition-all duration-200 ${className}`}
    >
      <div>
        {/* Header with Monogram and Meta */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-[#EBF5FC] text-[#0070C0] flex items-center justify-center font-bold text-sm font-sans shrink-0 border border-[#A3D1F1]">
              {initials}
            </div>
            <div>
              <h4 className="text-base font-bold text-[#262626] group-hover:text-[#0070C0] transition-colors leading-snug font-sans">
                {name}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-[#7D7D7D] font-sans mt-0.5">
                <MapPin className="w-3 h-3 text-[#B8B8B8]" />
                <span>{country}</span>
                <span aria-hidden="true" className="text-[#D6D6D6]">·</span>
                <span>{cohort}</span>
              </div>
            </div>
          </div>

          <span className="text-[11px] font-mono text-[#0E8A5E] bg-[#ECFDF5] px-2 py-0.5 rounded-md border border-[#A7F3D0] font-semibold shrink-0">
            {certificationGrade}
          </span>
        </div>

        {/* Current Position & Specialty */}
        <div className="space-y-2 text-xs font-sans">
          <div className="flex items-start gap-2 text-[#404040]">
            <Briefcase className="w-3.5 h-3.5 text-[#7D7D7D] shrink-0 mt-0.5" />
            <span className="font-medium">{currentRole}</span>
          </div>
          <div className="flex items-start gap-2 text-[#595959]">
            <Award className="w-3.5 h-3.5 text-[#FF6600] shrink-0 mt-0.5" />
            <span>Spécialité : <strong className="text-[#262626] font-semibold">{specialty}</strong></span>
          </div>
        </div>

        {/* Impact Project */}
        {impactProject && (
          <div className="mt-4 pt-3 border-t border-[#E8E8E8] bg-[#F5F5F7] p-3 rounded-lg text-xs font-sans">
            <span className="font-bold text-[#262626] block uppercase tracking-wider text-[10px] mb-1">
              Projet d'Impact Continental :
            </span>
            <p className="text-[#595959] line-clamp-2 leading-relaxed">
              {impactProject}
            </p>
          </div>
        )}
      </div>

      {/* Program tag footer */}
      <div className="mt-5 pt-3 border-t border-[#E8E8E8] flex items-center justify-between text-[11px] font-mono text-[#7D7D7D]">
        <span>Programme TSF :</span>
        <span className="text-[#0070C0] font-bold">{program}</span>
      </div>
    </Card>
  );
};
