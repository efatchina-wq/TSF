import React, { useState } from 'react';
import { TalentJourneyMilestone, JourneyStepId } from '../../types/talent';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  ChevronRight, 
  ChevronDown, 
  Award, 
  FileCheck, 
  Target, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Briefcase, 
  Globe 
} from 'lucide-react';

interface TalentJourneyTimelineProps {
  milestones: TalentJourneyMilestone[];
  talentName?: string;
  allowToggleComplete?: boolean;
}

const STEP_ICONS: Record<JourneyStepId, React.ReactNode> = {
  profil_cree: <FileCheck className="w-5 h-5" />,
  talent_detecte: <Compass className="w-5 h-5" />,
  evaluation: <ShieldCheck className="w-5 h-5" />,
  incubation: <Sparkles className="w-5 h-5" />,
  certification: <Award className="w-5 h-5" />,
  opportunites: <Briefcase className="w-5 h-5" />,
  impact: <Globe className="w-5 h-5" />
};

export const TalentJourneyTimeline: React.FC<TalentJourneyTimelineProps> = ({
  milestones,
  talentName,
  allowToggleComplete = false
}) => {
  const [expandedStep, setExpandedStep] = useState<JourneyStepId | null>(null);

  const toggleExpand = (stepId: JourneyStepId) => {
    setExpandedStep(prev => prev === stepId ? null : stepId);
  };

  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="space-y-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
      {/* Header with Progress Bar */}
      <div className="space-y-4 border-b border-slate-100 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6600]">
                TIMELINE PERSONNELLE & DEVISE D'ÉLÉVATION
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-100 text-slate-700">
                7 PALIERS FONDAMENTAUX
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#262626] tracking-tight mt-1">
              Le Parcours du Talent TSF (Talent Journey)
            </h3>
            {talentName && (
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Historique de progression académique, éthique et professionnelle de {talentName}
              </p>
            )}
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold font-mono text-[#0070C0]">
              {progressPercent}%
            </div>
            <span className="text-xs font-mono text-slate-500">
              {completedCount} sur {milestones.length} étapes validées
            </span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#0070C0] via-[#FF6600] to-emerald-600 transition-all duration-700 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Breadcrumb Steps Indicators */}
        <div className="hidden md:flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
          {milestones.map((m) => (
            <span 
              key={m.stepId} 
              className={`flex items-center gap-1 ${
                m.status === 'completed' 
                  ? 'text-emerald-700 font-bold' 
                  : m.status === 'current' 
                  ? 'text-[#FF6600] font-bold' 
                  : 'text-slate-400'
              }`}
            >
              {m.status === 'completed' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              ) : m.status === 'current' ? (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              ) : (
                <Circle className="w-2.5 h-2.5 text-slate-300" />
              )}
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* Vertical Interactive Stepper */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {milestones.map((milestone, idx) => {
          const isCompleted = milestone.status === 'completed';
          const isCurrent = milestone.status === 'current';
          const isExpanded = expandedStep === milestone.stepId || isCurrent;

          return (
            <div 
              key={milestone.stepId} 
              className={`relative transition-all duration-200 ${
                isCurrent ? 'scale-[1.01]' : ''
              }`}
            >
              {/* Bullet Node */}
              <div 
                className={`absolute -left-[31px] sm:-left-[35px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isCompleted 
                    ? 'bg-emerald-600 text-white border-white shadow-xs' 
                    : isCurrent 
                    ? 'bg-amber-500 text-white border-white shadow-md ring-4 ring-amber-100 animate-pulse' 
                    : 'bg-white text-slate-400 border-slate-300'
                }`}
              >
                {STEP_ICONS[milestone.stepId] || <Target className="w-4 h-4" />}
              </div>

              {/* Step Card Container */}
              <div 
                className={`rounded-xl border transition-all ${
                  isCurrent 
                    ? 'bg-amber-50/40 border-amber-300 shadow-sm' 
                    : isCompleted 
                    ? 'bg-white border-slate-200 hover:border-slate-300' 
                    : 'bg-slate-50/70 border-dashed border-slate-200 opacity-80'
                }`}
              >
                {/* Step Header Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleExpand(milestone.stepId)}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        ÉTAPE {milestone.order} / 7
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-[#262626] tracking-tight">
                        {milestone.label}
                      </h4>
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-100 text-emerald-800 font-semibold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Validé
                        </span>
                      )}
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-100 text-amber-900 font-semibold inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-700 animate-spin" /> En cours d’instruction
                        </span>
                      )}
                      {milestone.status === 'upcoming' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-500">
                          À venir
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      {milestone.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {milestone.dateCompleted && (
                      <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
                        {milestone.dateCompleted}
                      </span>
                    )}
                    <div className="p-1 rounded text-slate-400 hover:text-slate-700 bg-slate-100">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Collapsible Details Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-slate-100 space-y-4 text-xs">
                    <p className="text-slate-700 leading-relaxed">
                      {milestone.summary}
                    </p>

                    {milestone.details && milestone.details.length > 0 && (
                      <div className="bg-white/80 border border-slate-200/80 rounded-lg p-3 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                          Actes & Jalons Opérationnels :
                        </span>
                        <ul className="space-y-1">
                          {milestone.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2 text-slate-600">
                              <span className="text-[#FF6600] font-bold font-mono">▸</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Deliverables / Score Indicator */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-[11px]">
                      {milestone.deliverables && milestone.deliverables.length > 0 && (
                        <div className="text-slate-600">
                          Livrable vérifié : <strong className="text-slate-900">{milestone.deliverables.join(', ')}</strong>
                        </div>
                      )}
                      {milestone.scoreOrKpi && (
                        <div className="ml-auto inline-flex items-center gap-1.5 bg-[#EBF5FC] px-2.5 py-1 rounded text-[#0070C0] font-bold border border-[#A3D1F1]">
                          <Award className="w-3.5 h-3.5 text-[#FF6600]" />
                          <span>{milestone.scoreOrKpi}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Formal Commitment Footer */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Chaque palier est consigné dans le registre immuable TSF et audité par le Comité Scientifique.</span>
        </div>
        <div className="font-mono text-[11px] text-slate-500">
          Protocole de Sécurisation : <strong className="text-slate-800">ISO-TSF-9001-PANAFRICA</strong>
        </div>
      </div>
    </div>
  );
};
