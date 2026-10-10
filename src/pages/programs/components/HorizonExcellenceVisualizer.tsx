import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import {
  Users,
  Award,
  TrendingUp,
  Building2,
  Briefcase,
  MapPin,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PieChart,
  Info
} from 'lucide-react';

export const HorizonExcellenceVisualizer: React.FC = () => {
  const [activeFunnelStage, setActiveFunnelStage] = useState<number | null>(null);

  // Exact official numbers provided by TSF
  const TARGETS = [
    {
      id: 'detectes',
      metric: '3 000',
      label: 'talents détectés',
      baseline: 'Candidatures qualifiées examinées',
      description: 'Détection continentale par comités régionaux via des tests psychométriques et études de cas.',
      icon: Users,
      color: 'from-[#0070C0] to-[#004A80]',
      tag: '01. Sourcing'
    },
    {
      id: 'incubes_certifies',
      metric: '1 500',
      label: 'talents incubés / certifiés',
      baseline: '50% du vivier initial sélectionné',
      description: 'Cursus de 12 mois avec immersion ministérielle, simulations et soutenance du Grand Oral Grade A.',
      icon: Award,
      color: 'from-[#FF6600] to-orange-700',
      tag: '02. Cursus'
    },
    {
      id: 'insertion',
      metric: '75%',
      label: 'insertion économique',
      baseline: 'Postes de haute direction & gouvernance',
      description: 'Affectation à des postes stratégiques dans les 180 jours post-certification ou création d’entreprises.',
      icon: TrendingUp,
      color: 'from-emerald-600 to-teal-800',
      tag: '03. Propulsion'
    },
    {
      id: 'micro_entreprises',
      metric: '300',
      label: 'micro-entreprises',
      baseline: 'Initiatives productives fondées',
      description: 'Startups industrielles, technologiques ou agricoles créées et financées par les lauréats certifiés.',
      icon: Building2,
      color: 'from-indigo-600 to-indigo-950',
      tag: '04. Entrepreneuriat'
    },
    {
      id: 'emplois_indirects',
      metric: '900',
      label: 'emplois indirects',
      baseline: 'Emplois créés dans la chaîne de valeur',
      description: 'Postes qualifiés générés dans les sous-traitances, filières locales et logistiques associées.',
      icon: Briefcase,
      color: 'from-cyan-600 to-sky-900',
      tag: '05. Effet Levier'
    },
    {
      id: 'villages',
      metric: '150',
      label: 'villages',
      baseline: 'Localités et communes irriguées',
      description: 'Couverture géographique décentralisée pour rompre l’hyper-concentration dans les capitales.',
      icon: MapPin,
      color: 'from-amber-600 to-amber-900',
      tag: '06. Territoires'
    },
    {
      id: 'beneficiaires_indirects',
      metric: '30 000',
      label: 'bénéficiaires indirects',
      baseline: 'Familles et communautés soutenues',
      description: 'Populations bénéficiant directement des retombées des micro-entreprises et projets d’utilité publique.',
      icon: HeartHandshake,
      color: 'from-purple-600 to-slate-900',
      tag: '07. Impact Global'
    }
  ];

  return (
    <div className="space-y-8 bg-slate-900 text-white p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-xl">
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              Modélisation Statutaire Officielle
            </span>
            <span className="text-slate-400 font-mono text-xs">
              Horizon Excellence 2026-2030
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Visualisation des Objectifs Stratégiques
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Chaque métrique ci-dessous fait l’objet d’un engagement contractuel vis-à-vis des ministères, bailleurs multilatéraux et institutions partenaires. Les chiffres sont consolidés et auditables.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2.5 rounded-lg border border-slate-700/80 text-xs font-mono text-slate-300 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>7 KPIs Officiels Invariants</span>
        </div>
      </div>

      {/* Grid of 7 Official Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TARGETS.map((item, idx) => {
          const Icon = item.icon;
          const isSelected = activeFunnelStage === idx;

          return (
            <div
              key={item.id}
              onClick={() => setActiveFunnelStage(isSelected ? null : idx)}
              className={`p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 border-amber-400 ring-2 ring-amber-400/20 shadow-lg'
                  : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                    {item.tag}
                  </span>
                  <div className="p-2 rounded-lg bg-slate-700/60 text-amber-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white">
                    {item.metric}
                  </div>
                  <div className="text-sm font-bold text-amber-300 mt-1 uppercase tracking-wide">
                    {item.label}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-snug">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="truncate">{item.baseline}</span>
                <span className="text-amber-400 font-bold">Détails →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conversion & Cascade Flowchart */}
      <div className="p-6 bg-slate-800/40 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-200">
              Chaîne de Conversion & Effet Multiplicateur Économique
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400">Ratio multiplicateur : 1:10 direct / 1:20 indirect</span>
        </div>

        {/* Visual Cascade Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 pt-2 text-center text-xs">
          <div className="p-3 rounded bg-slate-800/90 border border-slate-700">
            <span className="text-[10px] font-mono text-slate-400 block">ENTRÉE VIVIER</span>
            <span className="text-lg font-bold font-mono text-white block mt-1">3 000</span>
            <span className="text-[10px] text-slate-300">détectés</span>
          </div>

          <div className="p-3 rounded bg-slate-800/90 border border-slate-700 flex flex-col justify-center">
            <span className="text-[10px] font-mono text-slate-400 block">SÉLECTION</span>
            <span className="text-lg font-bold font-mono text-amber-400 block mt-1">1 500</span>
            <span className="text-[10px] text-slate-300">incubés / certifiés</span>
          </div>

          <div className="p-3 rounded bg-slate-800/90 border border-slate-700 flex flex-col justify-center">
            <span className="text-[10px] font-mono text-slate-400 block">INSERTION</span>
            <span className="text-lg font-bold font-mono text-emerald-400 block mt-1">75%</span>
            <span className="text-[10px] text-slate-300">en poste / impact</span>
          </div>

          <div className="p-3 rounded bg-slate-800/90 border border-slate-700 flex flex-col justify-center">
            <span className="text-[10px] font-mono text-slate-400 block">ENTREPRISES</span>
            <span className="text-lg font-bold font-mono text-white block mt-1">300</span>
            <span className="text-[10px] text-slate-300">micro-entreprises</span>
          </div>

          <div className="p-3 rounded bg-slate-800/90 border border-slate-700 flex flex-col justify-center">
            <span className="text-[10px] font-mono text-slate-400 block">EMPLOIS LIÉS</span>
            <span className="text-lg font-bold font-mono text-cyan-400 block mt-1">900</span>
            <span className="text-[10px] text-slate-300">emplois indirects</span>
          </div>

          <div className="p-3 rounded bg-slate-800/90 border border-slate-700 flex flex-col justify-center">
            <span className="text-[10px] font-mono text-slate-400 block">MAILLAGE</span>
            <span className="text-lg font-bold font-mono text-amber-400 block mt-1">150</span>
            <span className="text-[10px] text-slate-300">villages irrigués</span>
          </div>

          <div className="p-3 rounded bg-amber-950/40 border border-amber-500/40 flex flex-col justify-center col-span-2 md:col-span-1">
            <span className="text-[10px] font-mono text-amber-300 block font-bold">IMPACT GLOBAL</span>
            <span className="text-lg font-bold font-mono text-amber-400 block mt-1">30 000</span>
            <span className="text-[10px] text-amber-200">bénéficiaires</span>
          </div>
        </div>
      </div>
    </div>
  );
};
