import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import {
  Briefcase,
  Building,
  Landmark,
  Calculator,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  HandCoins,
  Send
} from 'lucide-react';

export const SourceFundAfricaExperience: React.FC = () => {
  const [targetCategory, setTargetCategory] = useState<'b2b' | 'osc'>('b2b');

  // Simulator state
  const [requestedAmount, setRequestedAmount] = useState<number>(50000);
  const [projectStage, setProjectStage] = useState<'prototype' | 'commercial' | 'scale'>('commercial');
  const [expectedJobs, setExpectedJobs] = useState<number>(12);
  const [hasTsfCertification, setHasTsfCertification] = useState<boolean>(true);

  // Modal / submission state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Calculation results
  const isEligible = hasTsfCertification && requestedAmount >= 15000 && requestedAmount <= 150000;
  const quasiEquityShare = targetCategory === 'b2b' ? 0.6 : 0.2;
  const grantShare = targetCategory === 'osc' ? 0.8 : 0.4;

  const quasiEquityAmount = Math.round(requestedAmount * quasiEquityShare);
  const grantAmount = Math.round(requestedAmount * grantShare);

  return (
    <div id="sourcefund-b2b" className="space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="bg-[#121212] text-white p-6 sm:p-10 rounded-2xl border border-[#2B2B2B] space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
            Guichet Financier Institutionnel
          </span>
          <span className="text-slate-400 font-mono text-xs">
            Capital Patient & Subventions d’Honneur
          </span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
          Espace B2B & Organisations de la Société Civile (OSC)
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-sans">
          SourceFund Africa est le véhicule d’amorçage dédié aux entreprises à fort impact et aux organisations citoyennes fondées ou dirigées par des certifiés TSF. Nous allouons de 15 000 $ à 150 000 $ sans exiger d’hypothèques personnelles, en substituant le capital de réputation certifiée au collatéral bancaire traditionnel.
        </p>

        {/* Dual Mode Switch */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => setTargetCategory('b2b')}
            className={`flex-1 py-3 px-5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              targetCategory === 'b2b'
                ? 'bg-amber-500 text-slate-950 shadow-lg ring-2 ring-amber-400/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Guichet B2B (Startups & PME à Impact)</span>
          </button>

          <button
            type="button"
            onClick={() => setTargetCategory('osc')}
            className={`flex-1 py-3 px-5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              targetCategory === 'osc'
                ? 'bg-amber-500 text-slate-950 shadow-lg ring-2 ring-amber-400/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Guichet OSC (Associations & ONG Citoyennes)</span>
          </button>
        </div>
      </div>

      {/* Simulator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Simulator Controls */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-[#E8E8E8] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#FF6600]">
              <Calculator className="w-4 h-4" />
              <span>Simulateur d’Éligibilité & de Financement</span>
            </div>
            <span className="text-[11px] font-mono text-[#7D7D7D]">Tickets 15k$ à 150k$</span>
          </div>

          {/* Amount Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold text-[#262626] font-mono">
                Montant Recherché (USD) :
              </label>
              <span className="text-xl font-extrabold font-mono text-[#0070C0]">
                {requestedAmount.toLocaleString('fr-FR')} $ USD
              </span>
            </div>
            <input
              type="range"
              min={15000}
              max={150000}
              step={5000}
              value={requestedAmount}
              onChange={(e) => setRequestedAmount(Number(e.target.value))}
              className="w-full h-2 bg-[#E8E8E8] rounded-lg appearance-none cursor-pointer accent-[#0070C0]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#7D7D7D]">
              <span>Seuil Min : 15 000 $</span>
              <span>Plafond Guichet : 150 000 $</span>
            </div>
          </div>

          {/* Maturity Stage */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#262626] font-mono block">
              Stade d’avancement de la structure :
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'prototype', label: 'Prototypage / POC' },
                { id: 'commercial', label: 'Premières Ventes' },
                { id: 'scale', label: 'Croissance / Scale' }
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setProjectStage(s.id as any)}
                  className={`p-2.5 rounded-lg border text-xs font-mono font-medium transition-all cursor-pointer ${
                    projectStage === s.id
                      ? 'bg-[#0070C0] text-white border-[#0070C0]'
                      : 'bg-[#F5F5F7] text-[#404040] border-[#E8E8E8] hover:bg-[#EBEBEB]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Certification TSF Check */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                L’équipe fondatrice compte-t-elle au moins un certifié TSF ?
              </span>
              <button
                type="button"
                onClick={() => setHasTsfCertification(!hasTsfCertification)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded cursor-pointer ${
                  hasTsfCertification ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {hasTsfCertification ? 'OUI (Certifié)' : 'NON'}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              La certification TSF constitue la garantie morale de substitution qui dispense des garanties hypothécaires physiques.
            </p>
          </div>

          {/* Jobs targeted */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold text-slate-800 font-mono">
                Emplois directs créés à 24 mois :
              </label>
              <span className="text-sm font-bold font-mono text-slate-900">
                {expectedJobs} emplois directs
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={50}
              step={1}
              value={expectedJobs}
              onChange={(e) => setExpectedJobs(Number(e.target.value))}
              className="w-full h-2 bg-[#E8E8E8] rounded-lg appearance-none cursor-pointer accent-[#FF6600]"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-[#121212] text-white p-6 sm:p-8 rounded-xl border border-[#2B2B2B] space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6600] font-bold block">
              Diagnostic d'Éligibilité SourceFund
            </span>
            <h4 className="text-xl font-bold font-sans">
              {targetCategory === 'b2b' ? 'Financement B2B Entreprise' : 'Dotation Subvention OSC'}
            </h4>
          </div>

          {/* Status Badge */}
          <div
            className={`p-4 rounded-xl border flex items-center gap-3 ${
              isEligible
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : 'bg-amber-950/40 border-amber-500/50 text-amber-300'
            }`}
          >
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <div className="text-xs leading-snug font-sans">
              {isEligible ? (
                <span>
                  <strong>Dossier Éligible à l’Instruction Prioritaire</strong> : la structure répond aux critères d’amorçage TSF.
                </span>
              ) : (
                <span>
                  <strong>Condition requise</strong> : L'équipe doit obligatoirement intégrer un lauréat certifié TSF pour lever l’exigence de collatéral.
                </span>
              )}
            </div>
          </div>

          {/* Allocation Breakdown */}
          <div className="space-y-3 pt-2 border-t border-[#2B2B2B] text-xs">
            <span className="font-mono text-slate-400 uppercase text-[10px] block font-bold">
              Structure de l'enveloppe recommandée :
            </span>

            <div className="space-y-2 font-mono">
              <div className="flex justify-between p-2.5 bg-slate-850 rounded border border-slate-800">
                <span className="text-slate-300">Quasi-Fonds Propres / Prêt d’Honneur :</span>
                <span className="font-bold text-[#FF6600]">{quasiEquityAmount.toLocaleString()} $</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-850 rounded border border-slate-800">
                <span className="text-slate-300">Subvention Non-Remboursable :</span>
                <span className="font-bold text-emerald-300">{grantAmount.toLocaleString()} $</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 leading-relaxed font-sans pt-1">
              {targetCategory === 'b2b'
                ? 'Accompagnement adossé à un reporting trimestriel avec clause de buyback optionnelle pour préserver l’indépendance des fondateurs.'
                : 'Subvention conditionnée à l’atteinte d’indicateurs sociaux certifiés par des tiers certificateurs.'}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            {isSubmitted ? (
              <div className="p-3 bg-emerald-900/60 rounded-lg text-xs text-emerald-200 text-center font-mono">
                ✓ Dossier d'amorçage enregistré dans le sas B2B
              </div>
            ) : (
              <Button
                variant="primary"
                fullWidth
                size="md"
                onClick={() => setIsSubmitted(true)}
                icon={<Send className="w-4 h-4" />}
              >
                Déposer une requête de financement
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Institutional Co-Investment Framework */}
      <div className="p-6 sm:p-8 bg-[#F5F5F7] border border-[#E8E8E8] rounded-xl space-y-4">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-[#FF6600]" />
          <h4 className="text-base font-bold text-[#262626] font-sans">
            Espace Bailleurs & Mécènes Institutionnels
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-[#595959] leading-relaxed font-sans">
          Vous représentez une institution multilatérale, une fondation d’entreprise ou un fonds à impact ? SourceFund Africa propose un mécanisme de syndication en co-garantie : pour chaque dollar injecté par votre institution, TSF assure l’audit amont, le suivi déontologique et la surveillance des flux financiers aux normes IFRS.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
          <div className="p-3 bg-white border border-[#E8E8E8] rounded">
            <span className="text-[#7D7D7D] block text-[10px]">RATIO DE LEVIER MOYEN</span>
            <span className="text-base font-bold text-[#0070C0]">4.2x co-investissement</span>
          </div>
          <div className="p-3 bg-white border border-[#E8E8E8] rounded">
            <span className="text-[#7D7D7D] block text-[10px]">CONFORMITÉ & AUDIT</span>
            <span className="text-base font-bold text-[#0070C0]">IFRS / SYSCOHADA</span>
          </div>
          <div className="p-3 bg-white border border-[#E8E8E8] rounded">
            <span className="text-[#7D7D7D] block text-[10px]">REPORTING D'IMPACT</span>
            <span className="text-base font-bold text-[#0070C0]">Trimestriel Audité</span>
          </div>
        </div>
      </div>
    </div>
  );
};
