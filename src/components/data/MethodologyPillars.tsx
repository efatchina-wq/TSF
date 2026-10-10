import React, { useState } from 'react';
import { METHODOLOGY_STEPS } from '../../data/institutionData';
import { MethodologyStepId } from '../../types';
import { Check, ArrowRight, ShieldCheck, Cpu, Award, Rocket } from 'lucide-react';
import { useRouter } from '../../hooks/useRouter';

export const MethodologyPillars: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<MethodologyStepId>('detecter');
  const { navigate } = useRouter();

  const activeStep = METHODOLOGY_STEPS.find((s) => s.id === activeStepId) || METHODOLOGY_STEPS[0];

  const stepIcons = {
    detecter: Cpu,
    incuber: Award,
    certifier: ShieldCheck,
    propulser: Rocket
  };

  return (
    <div className="w-full">
      {/* 4 Steps Interactive Selector Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 p-1.5 bg-slate-100 rounded-lg">
        {METHODOLOGY_STEPS.map((step) => {
          const isSelected = step.id === activeStepId;
          const Icon = stepIcons[step.id];

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStepId(step.id)}
              className={`p-3 sm:p-4 rounded-md text-left transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
                isSelected
                  ? 'bg-white shadow-xs border-l-4 border-l-[#0070C0] text-[#0070C0]'
                  : 'hover:bg-slate-200/60 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Étape 0{step.order}
                </span>
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#FF6600]' : 'text-slate-400'}`} />
              </div>
              <span className="text-sm sm:text-base font-bold tracking-tight">
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Deep Detail Panel */}
      <div className="mt-6 bg-white border border-slate-200/90 rounded-lg p-6 sm:p-8 lg:p-10 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF6600] uppercase tracking-widest font-semibold mb-1">
                <span>Phase Méthodologique 0{activeStep.order}</span>
                <span>·</span>
                <span>Standard TSF</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#262626] tracking-tight">
                {activeStep.label} : {activeStep.tagline}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {activeStep.description}
            </p>

            {/* Operational Mechanisms */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono mb-3">
                Protocoles et mécanismes d'exécution :
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeStep.operationalMechanisms.map((mech, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-100">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{mech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50/80 border border-slate-200/80 rounded-lg p-6 space-y-6">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                Livrables Audités
              </span>
              <ul className="space-y-1.5">
                {activeStep.deliverables.map((deliv, idx) => (
                  <li key={idx} className="text-xs font-semibold text-[#262626] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600]" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
                Indicateurs de Performance (KPIs)
              </span>
              <div className="space-y-2">
                {activeStep.kpis.map((kpi, idx) => (
                  <div key={idx} className="text-xs text-slate-600 bg-white p-2 rounded border border-slate-200/60 font-mono">
                    {kpi}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/organisation/methode')}
                className="w-full py-2.5 px-4 bg-[#0B1B3D] hover:bg-[#132B50] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Détail complet du protocole {activeStep.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
