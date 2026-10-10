import React from 'react';
import { Program } from '../../types';
import { Card } from '../ui/Card';
import { useRouter } from '../../hooks/useRouter';
import { ArrowRight, MapPin, Users, Target, BarChart3, Sparkles } from 'lucide-react';

export interface ProgramCardProps {
  program: Program;
  variant?: 'featured' | 'standard';
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  variant = 'standard'
}) => {
  const { navigate } = useRouter();
  const isFeatured = variant === 'featured';

  const isCohortOpen = program.status === 'cohort_open' || program.status === 'cohorte_ouverte';

  return (
    <Card
      hoverEffect
      padding={isFeatured ? 'lg' : 'md'}
      className={`flex flex-col justify-between h-full bg-white border border-[#E8E8E8] hover:border-[#0070C0]/40 rounded-xl transition-all duration-200 ${
        isFeatured ? 'border-t-4 border-t-[#0070C0]' : ''
      }`}
    >
      <div className="space-y-4">
        {/* 1. Header Metadata: Domaine & Statut */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Domaine */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFF3EB] text-[#FF6600] font-mono text-[11px] font-semibold uppercase tracking-wider border border-[#FFC49E]">
            <Sparkles className="w-3 h-3 text-[#FF6600]" />
            <span className="line-clamp-1">{program.domain || program.kicker}</span>
          </span>

          {/* Statut */}
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider ${
              isCohortOpen
                ? 'bg-[#ECFDF5] text-[#0E8A5E] border border-[#A7F3D0]'
                : 'bg-[#F5F5F7] text-[#404040] border border-[#E8E8E8]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isCohortOpen ? 'bg-[#0E8A5E] animate-pulse' : 'bg-[#7D7D7D]'
              }`}
            />
            {program.statusLabel || (isCohortOpen ? 'COHORTE OUVERTE' : 'PROGRAMME ACTIF')}
          </span>
        </div>

        {/* 2. Nom du Programme */}
        <div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-[#262626] tracking-tight group-hover:text-[#0070C0] transition-colors font-sans">
              {program.title}
            </h3>
            {program.acronym && (
              <span className="text-xs font-mono font-bold text-[#7D7D7D]">
                [{program.acronym}]
              </span>
            )}
          </div>
          <p className="mt-1.5 text-xs text-[#7D7D7D] font-mono font-medium line-clamp-1">
            {program.programType || program.kicker}
          </p>
        </div>

        {/* 3. Objectif Central */}
        <div className="p-3 bg-[#F5F5F7] rounded-lg border border-[#E8E8E8]">
          <div className="flex items-start gap-2">
            <Target className="w-3.5 h-3.5 text-[#0070C0] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#7D7D7D] block tracking-wider">
                Objectif Clé
              </span>
              <p className="text-xs font-medium text-[#404040] leading-snug line-clamp-2 mt-0.5 font-sans">
                {program.objective || program.summary}
              </p>
            </div>
          </div>
        </div>

        {/* 4. Population Cible & Territoire */}
        <div className="space-y-2 pt-1 border-t border-[#E8E8E8] text-xs text-[#595959] font-sans">
          <div className="flex items-start gap-2">
            <Users className="w-3.5 h-3.5 text-[#B8B8B8] shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-semibold text-[#262626]">Population cible : </span>
              <span className="text-[#595959] line-clamp-1">{program.targetAudience}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#B8B8B8] shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-semibold text-[#262626]">Territoire : </span>
              <span className="text-[#595959] line-clamp-1">{program.territory || 'Panafricain'}</span>
            </div>
          </div>
        </div>

        {/* 5. Indicateurs Officiels */}
        {program.indicators && program.indicators.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold text-[#7D7D7D] tracking-wider mb-1.5">
              <BarChart3 className="w-3 h-3 text-[#7D7D7D]" />
              <span>Indicateurs Clés</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {program.indicators.slice(0, 3).map((ind, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E8E8E8] rounded-lg p-2 text-center"
                >
                  <span className="block text-sm sm:text-base font-bold text-[#0070C0] font-sans tabular-nums">
                    {ind.value}
                  </span>
                  <span className="block text-[10px] font-medium text-[#7D7D7D] leading-tight truncate">
                    {ind.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 6. CTA Footer */}
      <div className="mt-6 pt-4 border-t border-[#E8E8E8] flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-[11px] font-mono text-[#7D7D7D]">
          <span>Phase :</span>
          <span className="font-bold text-[#404040] uppercase">
            {program.pillar.slice(0, 2).join(' / ')}
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate(program.path)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0070C0] text-white hover:bg-[#005FA3] text-xs font-semibold rounded-lg transition-colors cursor-pointer select-none shadow-xs active:scale-[0.99]"
        >
          <span>Consulter le programme</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
};
