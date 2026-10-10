import React from 'react';
import { INSTITUTION_INFO } from '../../data/institutionData';
import { Card } from '../../components/ui/Card';
import { useRouter } from '../../hooks/useRouter';
import { Button } from '../../components/ui/Button';
import {
  Compass,
  Eye,
  Award,
  ShieldCheck,
  Globe,
  Coins,
  CheckCircle2,
  ArrowRight,
  ScrollText,
  Sparkles
} from 'lucide-react';

export const MissionVisionView: React.FC = () => {
  const { navigate } = useRouter();

  const valueIcons = [
    <Award className="w-5 h-5 text-[#FF6600]" />,
    <ShieldCheck className="w-5 h-5 text-[#0070C0]" />,
    <Globe className="w-5 h-5 text-[#0E8A5E]" />,
    <Coins className="w-5 h-5 text-[#0070C0]" />
  ];

  return (
    <div className="space-y-16 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="space-y-3 pb-6 border-b border-[#E8E8E8]">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
          Raison d’Être & Alignement Stratégique
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#262626] tracking-tight">
          Mission, Vision & Valeurs Cardinales
        </h2>
        <p className="text-sm sm:text-base text-[#595959] max-w-3xl leading-relaxed">
          Le mandat statutaire de Talents Sans Frontières repose sur une conviction inébranlable : le génie humain est la première ressource naturelle et inépuisable du continent africain.
        </p>
      </div>

      {/* Dual Mission & Vision Institutional Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* MISSION CARD */}
        <div className="bg-white text-[#262626] p-8 sm:p-10 rounded-2xl flex flex-col justify-between border border-[#E8E8E8] border-t-4 border-t-[#0070C0] shadow-2xs space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#0070C0]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#0070C0] font-bold">
                  Notre Mission Statutaire
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EBF5FC] text-[#0070C0] font-bold">
                MANDAT PERMANENT
              </span>
            </div>

            <blockquote className="text-xl sm:text-2xl font-serif font-bold text-[#262626] leading-relaxed">
              « {INSTITUTION_INFO.mission} »
            </blockquote>

            <div className="pt-4 border-t border-[#E8E8E8] space-y-2 text-xs text-[#595959] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0070C0]" />
                <span>Objectif : Zéro perte de potentiels stratégiques africains</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0070C0]" />
                <span>Méthode : Détection précoce, rigueur académique et placement d'impact</span>
              </div>
            </div>
          </div>
        </div>

        {/* VISION CARD */}
        <div className="bg-[#F5F5F7] text-[#262626] p-8 sm:p-10 rounded-2xl flex flex-col justify-between border border-[#E8E8E8] border-t-4 border-t-[#FF6600] shadow-2xs space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#FF6600]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF6600] font-bold">
                  Notre Vision Prospective 2035
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-50 text-[#FF6600] font-bold border border-orange-200">
                CAP CONTINENTAL
              </span>
            </div>

            <blockquote className="text-xl sm:text-2xl font-serif font-bold text-[#262626] leading-relaxed">
              « {INSTITUTION_INFO.vision} »
            </blockquote>

            <div className="pt-4 border-t border-[#E8E8E8] space-y-2 text-xs text-[#595959] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600]" />
                <span>Horizon : Souveraineté intellectuelle, technologique et financière</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600]" />
                <span>Indicateur clé : 100 000 bâtisseurs certifiés opérant dans 54 pays</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Values - Detailed with Clean Institutional Iconography */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
            Cadre Déontologique
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#262626]">
            Les Quatre Valeurs Cardinales de TSF
          </h3>
          <p className="text-sm text-[#595959]">
            Ces quatre piliers ne sont pas des déclarations d’intention : ils font l’objet de grilles d’audit strictes opposables à tous les membres, dirigeants et lauréats de l’organisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INSTITUTION_INFO.values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E8E8E8] rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#0070C0]/50 transition-all shadow-2xs space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#F5F5F7] flex items-center justify-center">
                    {valueIcons[idx] || <Award className="w-5 h-5 text-[#0070C0]" />}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0070C0] uppercase tracking-widest">
                    Valeur 0{idx + 1}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-[#262626] leading-snug">
                  {val.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                  {val.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E8E8] flex items-center gap-2 text-xs font-mono text-[#0E8A5E]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Audité et opposable selon la Charte TSF</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Sovereign Pact - Moral Contract */}
      <div className="bg-[#262626] text-white p-8 sm:p-12 rounded-2xl space-y-6 border border-[#404040]/40 shadow-sm">
        <div className="flex items-center gap-3">
          <ScrollText className="w-5 h-5 text-[#FF6600]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF6600] font-bold">
            Le Pacte Civique & Continental TSF
          </span>
        </div>

        <div className="space-y-4 text-slate-300 text-sm leading-relaxed max-w-3xl">
          <h4 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Le Serment de Restitution de Valeur à l'Afrique
          </h4>
          <p>
            Chaque talent certifié par TSF bénéficie d’investissements publics et privés substantiels : bourses intégrales, mentorat de haut niveau, accès aux cercles stratégiques mondiaux. En contrepartie, chaque lauréat souscrit solennellement au <strong className="text-white">Pacte de Restitution</strong>.
          </p>
          <p>
            Ce pacte stipule qu’en cas de carrière à l’international, le talent consacre au minimum 15% de son temps ou de ses capacités de conseil au mentorat des promotions suivantes et réinvestit une partie de sa valeur ajoutée dans des projets industriels, scientifiques ou civiques situés sur le continent.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-700 flex flex-wrap gap-4">
          <Button
            variant="accent"
            size="sm"
            onClick={() => navigate('/organisation/methode')}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Découvrir la Méthode Fondatrice
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/organisation/gouvernance')}
            className="border-slate-600 text-white hover:bg-slate-800"
          >
            Examiner les Organes de Gouvernance
          </Button>
        </div>
      </div>
    </div>
  );
};
