import React, { useState } from 'react';
import { GOVERNANCE_BODIES, GOVERNANCE_PRINCIPLES } from '../../data/institutionData';
import { Card } from '../../components/ui/Card';
import { useRouter } from '../../hooks/useRouter';
import {
  Shield,
  Eye,
  CheckCircle2,
  Lock,
  FileCheck2,
  Scale,
  Clock,
  AlertCircle
} from 'lucide-react';

export const GovernanceView: React.FC = () => {
  const { navigate } = useRouter();
  const [filterCategory, setFilterCategory] = useState<'all' | 'direction' | 'comites' | 'terrain'>('all');

  const filteredBodies = GOVERNANCE_BODIES.filter((body) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'direction') return body.id === 'assemblee-generale' || body.id === 'bureau-executif' || body.id === 'cos';
    if (filterCategory === 'comites') return body.id.startsWith('comite-');
    if (filterCategory === 'terrain') return body.id === 'delegues-territoriaux';
    return true;
  });

  return (
    <div className="space-y-16">
      {/* Editorial Header */}
      <div className="space-y-3 pb-6 border-b border-[#E8E8E8]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
            Architecture Institutionnelle & Déontologie
          </span>
          <span className="text-xs font-mono text-[#7D7D7D]">
            Statuts Internationaux TSF
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#262626] tracking-tight">
          Gouvernance, Éthique & Indépendance
        </h2>
        <p className="text-sm sm:text-base text-[#595959] max-w-3xl leading-relaxed">
          Pour préserver la crédibilité de ses certifications à l'échelle mondiale, Talents Sans Frontières a instauré une séparation statutaire absolue entre le financement de ses activités et la sélection souveraine de ses talents.
        </p>
      </div>

      {/* The 4 Governance Mechanisms (Transparence, Redevabilité, Indépendance, Collégialité) */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
            Garanties Statutaires
          </span>
          <h3 className="text-2xl font-bold text-[#262626]">
            Les 4 Mécanismes Cardinaux de Bonne Gouvernance
          </h3>
          <p className="text-xs sm:text-sm text-[#595959]">
            Ces principes fondateurs encadrent chaque décision administrative, financière et pédagogique de TSF.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GOVERNANCE_PRINCIPLES.map((principle) => (
            <div
              key={principle.id}
              className="bg-white border border-[#E8E8E8] rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#0070C0]/50 transition-all shadow-2xs space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
                    Principe de Contrôle
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F7] flex items-center justify-center text-[#0070C0]">
                    {principle.id === 'transparence' && <Eye className="w-4 h-4" />}
                    {principle.id === 'redevabilite' && <FileCheck2 className="w-4 h-4" />}
                    {principle.id === 'independance' && <Lock className="w-4 h-4" />}
                    {principle.id === 'collegialite' && <Scale className="w-4 h-4" />}
                  </div>
                </div>

                <h4 className="text-lg font-bold text-[#262626] leading-snug">
                  {principle.title}
                </h4>

                <p className="text-xs text-[#7D7D7D] italic">
                  « {principle.subtitle} »
                </p>

                <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                  {principle.description}
                </p>

                <div className="pt-3 border-t border-[#E8E8E8] space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#262626] block">
                    Dispositifs d'application :
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#595959]">
                    {principle.mechanisms.map((mech, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8A5E] shrink-0 mt-0.5" />
                        <span className="leading-snug">{mech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Governance Bodies - Directory */}
      <div className="space-y-6 pt-6 border-t border-[#E8E8E8]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
              Instances Délibératives
            </span>
            <h3 className="text-2xl font-bold text-[#262626]">
              Les Organes Dirigeants & Comités de Contrôle
            </h3>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#F5F5F7] p-1 rounded-lg text-xs font-mono border border-[#E8E8E8]">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-white text-[#262626] font-bold shadow-2xs'
                  : 'text-[#595959] hover:text-[#262626]'
              }`}
            >
              Tous ({GOVERNANCE_BODIES.length})
            </button>
            <button
              onClick={() => setFilterCategory('direction')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                filterCategory === 'direction'
                  ? 'bg-white text-[#262626] font-bold shadow-2xs'
                  : 'text-[#595959] hover:text-[#262626]'
              }`}
            >
              Direction
            </button>
            <button
              onClick={() => setFilterCategory('comites')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                filterCategory === 'comites'
                  ? 'bg-white text-[#262626] font-bold shadow-2xs'
                  : 'text-[#595959] hover:text-[#262626]'
              }`}
            >
              Comités Spécialisés
            </button>
            <button
              onClick={() => setFilterCategory('terrain')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                filterCategory === 'terrain'
                  ? 'bg-white text-[#262626] font-bold shadow-2xs'
                  : 'text-[#595959] hover:text-[#262626]'
              }`}
            >
              Terrain
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBodies.map((body) => (
            <div
              key={body.id}
              className="bg-white border border-[#E8E8E8] rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#0070C0]/50 transition-all shadow-2xs space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#0070C0] font-bold block mb-1">
                      {body.role}
                    </span>
                    <h4 className="text-xl font-bold text-[#262626] tracking-tight">
                      {body.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                  {body.mandate}
                </p>

                {/* Composition */}
                <div className="pt-3 border-t border-[#E8E8E8] space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#262626] block">
                    Composition représentative :
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#595959]">
                    {body.composition.map((comp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0070C0] mt-1.5 shrink-0" />
                        <span className="leading-snug text-[#262626]">{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Attributes if present */}
                {body.attributes && (
                  <div className="pt-3 border-t border-[#E8E8E8] space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-[#262626] block">
                      Attributions statutaires majeures :
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#595959]">
                      {body.attributes.map((attr, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6600] shrink-0 mt-0.5" />
                          <span className="leading-snug font-medium text-[#262626]">{attr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {body.periodicity && (
                <div className="pt-3 mt-4 border-t border-[#E8E8E8] flex items-center justify-between text-[11px] font-mono text-[#7D7D7D]">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#7D7D7D]" />
                    <span>Périodicité des travaux</span>
                  </span>
                  <span className="font-semibold text-[#262626]">{body.periodicity}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* The Sanitization Firewall Guarantee Card */}
      <div className="bg-[#F5F5F7] border border-[#E8E8E8] p-8 rounded-2xl space-y-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-[#FF6600]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#262626]">
            Clause de Sauvegarde Déontologique (Statuts TSF — Art. 14)
          </span>
        </div>
        <h4 className="text-lg font-bold text-[#262626]">
          Principe d'Étanchéité Inaliénable entre Mécénat et Délibération Académique
        </h4>
        <p className="text-xs sm:text-sm text-[#595959] leading-relaxed max-w-4xl">
          « Aucun don, subvention publique, contrat commercial ou accord de partenariat, quel qu’en soit le montant, ne peut accorder à son émetteur un droit de siéger au sein des jurys de sélection, d’influencer la notation d’un candidat, ou de déroger aux critères académiques définis par le Comité Scientifique. Toute tentative d’ingérence entraîne la nullité immédiate de la convention et la restitution sans délai des fonds engagés. »
        </p>
        <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#7D7D7D]">
          <span>Décret d'application N° 2017-04</span>
          <span>·</span>
          <span>Supervisé par le Comité d'Éthique</span>
        </div>
      </div>
    </div>
  );
};
