import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export interface JourneyStep {
  id: string;
  order: string;
  title: string;
  kicker: string;
  actor: string;
  action: string;
  deliverable: string;
  duration: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'decouverte',
    order: '01',
    title: 'Découverte',
    kicker: 'Territoire & Sourcing',
    actor: 'Le Candidat / Les Hubs Universitaires',
    action: 'Veille proactive et identification décentralisée dans les lycées, universités et fablabs africains.',
    deliverable: 'Sensibilisation aux standards d’excellence et inscription ouverte sans frais de dossier.',
    duration: 'Campagnes continues'
  },
  {
    id: 'detection',
    order: '02',
    title: 'Détection',
    kicker: 'Évaluation Scientifique',
    actor: 'Comité Scientifique TSF',
    action: 'Passation anonymisée de tests psychométriques standardisés, défis logiques et résolution de cas complexes.',
    deliverable: 'Index de Potentiel Individuel (IPI) objectif, indépendant de toute origine sociale.',
    duration: 'Session de 48 heures'
  },
  {
    id: 'incubation',
    order: '03',
    title: 'Incubation',
    kicker: 'Haute Académie',
    actor: 'Dirigeants Mondiaux & Chercheurs Référents',
    action: 'Immersion intensive hybride (bootcamp et séminaires), mentorat 1:1, cas industriels réels et éthique de responsabilité.',
    deliverable: 'Portfolio de réalisations stratégiques et renforcement de l’intelligence situationnelle.',
    duration: '6 à 18 mois'
  },
  {
    id: 'certification',
    order: '04',
    title: 'Certification',
    kicker: 'Grand Oral & Homologation',
    actor: 'Jury Paritaire International',
    action: 'Soutenance devant les pairs, vérification déontologique approfondie et validation des compétences critiques.',
    deliverable: 'Passeport de Compétences TSF à empreinte cryptographique infalsifiable.',
    duration: 'Session officielle annuelle'
  },
  {
    id: 'connexion',
    order: '05',
    title: 'Connexion',
    kicker: 'Alliances Stratégiques',
    actor: 'Écosystème Entreprises & Institutions',
    action: 'Mise en relation directe avec les conseils d’administration, ministères réformateurs et fonds d’investissement.',
    deliverable: 'Accès exclusif à la plateforme Espace TSF et aux réseaux d’anciens lauréats dans 35 pays.',
    duration: 'Sous 30 jours'
  },
  {
    id: 'opportunite',
    order: '06',
    title: 'Opportunité',
    kicker: 'Insertion & Bourses',
    actor: 'Multinationales & SourceFund Africa',
    action: 'Fast-track recrutement sur postes de direction, missions de souveraineté publique ou capital patient d’amorçage.',
    deliverable: 'Contrat de haute gouvernance ou ticket d’amorçage financier (15k$ à 150k$).',
    duration: 'Sous 90 jours post-titre'
  },
  {
    id: 'impact',
    order: '07',
    title: 'Impact',
    kicker: 'Transformation Continentale',
    actor: 'Le Lauréat dans la Cité Africaine',
    action: 'Conduite de projets industriels, scientifiques et civiques majeurs avec réinvestissement de compétences en Afrique.',
    deliverable: 'Effet multiplicateur social vérifié (12,4x SROI) et souveraineté intellectuelle concrète.',
    duration: 'Engagement viager'
  }
];

export const TalentJourneyMap: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [selectedStepId, setSelectedStepId] = useState<string>('decouverte');

  const selectedStep = JOURNEY_STEPS.find((s) => s.id === selectedStepId) || JOURNEY_STEPS[0];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Horizontal Step Progression Bar */}
      <div className="relative">
        <div className="flex items-center overflow-x-auto no-scrollbar pb-3 pt-1 gap-2 sm:gap-1.5 border-b border-slate-200">
          {JOURNEY_STEPS.map((step, idx) => {
            const isSelected = selectedStepId === step.id;

            return (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => setSelectedStepId(step.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#0070C0] text-white shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      isSelected ? 'bg-[#FF6600] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {step.order}
                  </span>
                  <span className="text-xs font-bold tracking-tight">
                    {step.title}
                  </span>
                </button>

                {idx < JOURNEY_STEPS.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0 hidden md:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Deep Detail Card for Active Step */}
      <Card padding="lg" className="border-t-4 border-t-[#0070C0] bg-white shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#0070C0] text-white flex items-center justify-center font-mono text-xs font-bold">
                {selectedStep.order}
              </span>
              <div>
                <span className="text-xs font-mono text-[#FF6600] font-bold uppercase tracking-widest block">
                  {selectedStep.kicker}
                </span>
                <h4 className="text-2xl font-bold text-[#262626] tracking-tight">
                  Étape {selectedStep.order} : {selectedStep.title}
                </h4>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-1">
              {selectedStep.action}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-sans">Livrable Institutionnel :</strong>
                <span>{selectedStep.deliverable}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 p-5 rounded-lg border border-slate-200 space-y-3 text-xs">
            <div>
              <span className="text-slate-400 font-mono uppercase tracking-wider block text-[11px]">
                Acteurs Impliqués :
              </span>
              <strong className="text-slate-900 block mt-0.5 font-medium leading-snug">
                {selectedStep.actor}
              </strong>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <span className="text-slate-400 font-mono uppercase tracking-wider block text-[11px]">
                Temporalité du Palier :
              </span>
              <span className="text-[#0B1B3D] font-mono font-bold block mt-0.5">
                {selectedStep.duration}
              </span>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  const currentIdx = JOURNEY_STEPS.findIndex((s) => s.id === selectedStepId);
                  const nextIdx = (currentIdx + 1) % JOURNEY_STEPS.length;
                  setSelectedStepId(JOURNEY_STEPS[nextIdx].id);
                }}
                className="w-full py-2 px-3 bg-white hover:bg-slate-100 text-[#0B1B3D] border border-slate-300 rounded font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Étape suivante</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
