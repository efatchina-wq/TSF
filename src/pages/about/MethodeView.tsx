import React, { useState } from 'react';
import { METHODOLOGY_STEPS } from '../../data/institutionData';
import { Button } from '../../components/ui/Button';
import { useRouter } from '../../hooks/useRouter';
import {
  Search,
  Cpu,
  Award,
  Rocket,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  BarChart3,
  Layers
} from 'lucide-react';

export const MethodeView: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedStepId, setSelectedStepId] = useState<string>('detecter');

  const stepIcons: Record<string, React.ReactNode> = {
    detecter: <Search className="w-5 h-5" />,
    incuber: <Cpu className="w-5 h-5" />,
    certifier: <Award className="w-5 h-5" />,
    propulser: <Rocket className="w-5 h-5" />
  };

  const selectedStep = METHODOLOGY_STEPS.find((s) => s.id === selectedStepId) || METHODOLOGY_STEPS[0];

  return (
    <div className="space-y-16">
      {/* Editorial Header */}
      <div className="space-y-3 pb-6 border-b border-[#E8E8E8]">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
          Chaîne d'Intégration Humaine
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#262626] tracking-tight">
          La Méthode TSF : De la Détection à la Propulsion
        </h2>
        <p className="text-sm sm:text-base text-[#595959] max-w-3xl leading-relaxed">
          Le modèle TSF n’est ni une addition de bourses disparates, ni un simple annuaire de CVs. Il s'agit d'une chaîne séquentielle rigoureuse en quatre temps, conçue pour transformer le potentiel brut en autorité institutionnelle et économique.
        </p>
      </div>

      {/* The 4-Step Interactive Horizontal Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METHODOLOGY_STEPS.map((step) => {
          const isSelected = step.id === selectedStepId;
          return (
            <button
              key={step.id}
              onClick={() => setSelectedStepId(step.id)}
              className={`p-6 text-left border rounded-xl transition-all flex flex-col justify-between relative cursor-pointer ${
                isSelected
                  ? 'bg-[#0070C0] text-white border-[#0070C0] shadow-md ring-2 ring-[#0070C0]/20'
                  : 'bg-white text-[#262626] border-[#E8E8E8] hover:border-slate-300 hover:bg-[#F5F5F7]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-mono font-bold tracking-widest ${
                      isSelected ? 'text-[#38BDF8]' : 'text-[#7D7D7D]'
                    }`}
                  >
                    PHASE 0{step.order}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-white/15 text-white' : 'bg-[#F5F5F7] text-[#0070C0]'
                    }`}
                  >
                    {stepIcons[step.id]}
                  </div>
                </div>

                <h3 className="text-xl font-bold tracking-tight">
                  {step.label}
                </h3>

                <p
                  className={`text-xs line-clamp-2 leading-relaxed ${
                    isSelected ? 'text-blue-100' : 'text-[#595959]'
                  }`}
                >
                  {step.tagline}
                </p>
              </div>

              <div
                className={`pt-4 mt-4 border-t text-[11px] font-mono flex items-center justify-between ${
                  isSelected ? 'border-white/20 text-white font-semibold' : 'border-[#E8E8E8] text-[#7D7D7D]'
                }`}
              >
                <span>{isSelected ? 'Phase inspectée' : 'Détails de la phase'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Deep Dive Dossier */}
      <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-10 shadow-2xs space-y-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#E8E8E8]">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#0070C0] font-bold bg-[#EBF5FC] px-2.5 py-0.5 rounded border border-[#A3D1F1]">
                Spécification Opérationnelle 0{selectedStep.order}
              </span>
              <span className="text-xs font-mono text-[#7D7D7D]">
                Référentiel Méthodologique TSF
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#262626]">
              {selectedStep.label} : {selectedStep.tagline}
            </h3>

            <p className="text-sm sm:text-base text-[#595959] leading-relaxed pt-1">
              {selectedStep.description}
            </p>
          </div>

          <div className="shrink-0 bg-[#F5F5F7] p-4 border border-[#E8E8E8] rounded-xl text-center min-w-[200px]">
            <span className="text-[11px] font-mono text-[#7D7D7D] uppercase block mb-1">
              Indicateur d’Exécution
            </span>
            <div className="text-lg font-bold text-[#0070C0] font-mono">
              {selectedStep.kpis[0]}
            </div>
          </div>
        </div>

        {/* 3 Pillars of the Selected Step: Mechanisms, Deliverables, Audited KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Operational Mechanisms */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E8E8E8]">
              <Layers className="w-4 h-4 text-[#0070C0]" />
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#262626]">
                Mécanismes Opérationnels
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-[#595959]">
              {selectedStep.operationalMechanisms.map((mech, idx) => (
                <li key={idx} className="flex items-start gap-2 p-3 bg-[#F5F5F7] rounded-lg border border-[#E8E8E8]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0070C0] mt-1.5 shrink-0" />
                  <span className="leading-snug text-[#262626]">{mech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Official Deliverables */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E8E8E8]">
              <FileCheck className="w-4 h-4 text-[#FF6600]" />
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#262626]">
                Livrables Institutionnels
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-[#595959]">
              {selectedStep.deliverables.map((deliv, idx) => (
                <li key={idx} className="flex items-start gap-2 p-3 bg-orange-50/40 rounded-lg border border-orange-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] mt-1.5 shrink-0" />
                  <span className="leading-snug font-medium text-[#262626]">{deliv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Audited KPIs */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E8E8E8]">
              <BarChart3 className="w-4 h-4 text-[#0E8A5E]" />
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#262626]">
                Indicateurs Clés (KPI)
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-[#595959]">
              {selectedStep.kpis.map((kpi, idx) => (
                <li key={idx} className="flex items-start gap-2 p-3 bg-emerald-50/40 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-[#0E8A5E] mt-0.5 shrink-0" />
                  <span className="leading-snug text-[#262626] font-medium">{kpi}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* The Transformation Logic - System Flow Diagram */}
      <div className="p-8 sm:p-10 bg-[#F5F5F7] border border-[#E8E8E8] rounded-2xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
            Théorie du Changement
          </span>
          <h3 className="text-2xl font-bold text-[#262626]">
            La Logique de Transformation Continue TSF
          </h3>
          <p className="text-xs sm:text-sm text-[#595959] max-w-3xl leading-relaxed">
            Contrairement aux approches ponctuelles qui abandonnent les boursiers après l'obtention d'un diplôme, TSF assure un continuum hermétique entre l'identification de l'intelligence brute et son ancrage au sommet des centres de décision africains.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-white border border-[#E8E8E8] rounded-xl space-y-1">
            <span className="text-[10px] font-mono text-[#7D7D7D] uppercase font-bold block">
              Étape 1 · État Initial
            </span>
            <h4 className="text-sm font-bold text-[#262626]">
              Potentiel Brut & Isolé
            </h4>
            <p className="text-xs text-[#595959] leading-relaxed">
              Talent cognitif ou technique réel, mais invisible hors des circuits d'initiés et sans réseau d'influence.
            </p>
          </div>

          <div className="p-4 bg-white border border-[#E8E8E8] rounded-xl space-y-1">
            <span className="text-[10px] font-mono text-[#7D7D7D] uppercase font-bold block">
              Étape 2 · Structuration
            </span>
            <h4 className="text-sm font-bold text-[#262626]">
              Rigueur & Posture Morale
            </h4>
            <p className="text-xs text-[#595959] leading-relaxed">
              Immersion intensive, acquisition de la méthode d'analyse complexe et ancrage déontologique.
            </p>
          </div>

          <div className="p-4 bg-white border border-[#E8E8E8] rounded-xl space-y-1">
            <span className="text-[10px] font-mono text-[#7D7D7D] uppercase font-bold block">
              Étape 3 · Validation
            </span>
            <h4 className="text-sm font-bold text-[#262626]">
              Autorité Légitime Certifiée
            </h4>
            <p className="text-xs text-[#595959] leading-relaxed">
              Grand oral devant jury indépendant, passeport infalsifiable reconnu par plus de 120 institutions.
            </p>
          </div>

          <div className="p-4 bg-white border-l-4 border-l-[#FF6600] border-t border-r border-b border-[#E8E8E8] rounded-xl space-y-1">
            <span className="text-[10px] font-mono text-[#FF6600] uppercase font-bold block">
              Étape 4 · Aboutissement
            </span>
            <h4 className="text-sm font-bold text-[#262626]">
              Impact Souverain Panafricain
            </h4>
            <p className="text-xs text-[#595959] leading-relaxed">
              Postes stratégiques d'État, fondation d'industries critiques et retour de valeur vers les nouvelles cohortes.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap gap-4 items-center">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/programmes')}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explorer les Programmes Opérationnels
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/certification')}
          >
            Détails du Label de Certification
          </Button>
        </div>
      </div>
    </div>
  );
};
