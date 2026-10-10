import React, { useState } from 'react';
import { TSF_HISTORY_TIMELINE } from '../../data/institutionData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useRouter } from '../../hooks/useRouter';
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  FolderArchive,
  ArrowRight,
  Sparkles,
  Milestone,
  FileQuestion,
  Layers,
  History
} from 'lucide-react';

export const HistoryView: React.FC = () => {
  const { navigate } = useRouter();
  const [activeYear, setActiveYear] = useState<string>('all');

  const milestones = TSF_HISTORY_TIMELINE.filter(
    (m) => activeYear === 'all' || m.year === activeYear
  );

  return (
    <div className="space-y-12">
      {/* Editorial Header */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6600]">
            Mémoire & Prospective Institutionnelle
          </span>
          <span className="text-xs font-mono text-slate-400">
            Registre des Archives TSF
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#262626] tracking-tight">
          La Trajectoire Historique TSF : 2015 → 2026 → Futur
        </h2>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Une démarche de long terme bâtie avec patience et rigueur d'État. Seules les données historiques vérifiées et documentées figurent dans ce registre officiel.
        </p>
      </div>

      {/* Year Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-slate-700">
          <History className="w-4 h-4 text-[#0070C0]" />
          <span>Sélectionner une époque :</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['all', '2015', '2017', '2026', 'FUTUR'].map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-all cursor-pointer ${
                activeYear === year
                  ? 'bg-[#0070C0] text-white font-bold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-[#F5F5F7]'
              }`}
            >
              {year === 'all' ? 'Toute la frise' : year}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Interactive Timeline */}
      <div className="relative pl-6 sm:pl-10 space-y-12 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-300">
        {milestones.map((milestone, idx) => {
          const isFuture = milestone.year === 'FUTUR';
          return (
            <div key={milestone.year} className="relative group">
              {/* Timeline Bullet */}
              <div
                className={`absolute -left-[30px] sm:-left-[38px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isFuture
                    ? 'bg-orange-50 border-[#FF6600] text-[#FF6600]'
                    : 'bg-white border-[#0070C0] text-[#0070C0] group-hover:bg-[#0070C0] group-hover:text-white'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isFuture ? 'bg-[#FF6600]' : 'bg-[#0070C0]'
                  }`}
                />
              </div>

              {/* Milestone Card */}
              <Card
                padding="lg"
                className={`border transition-all ${
                  isFuture
                    ? 'border-orange-200 bg-orange-50/20'
                    : 'border-slate-200 bg-white hover:border-[#0070C0]/50'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-serif font-bold text-[#262626]">
                        {milestone.year}
                      </span>
                      <span className="text-xs font-mono text-slate-500 uppercase">
                        [{milestone.period}]
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isFuture ? (
                        <span className="text-[11px] font-mono px-2 py-0.5 bg-orange-100 text-[#FF6600] font-bold border border-orange-300 uppercase">
                          Cap Stratégique 2035
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-700 font-bold border border-slate-200 uppercase">
                          Jalon Certifié
                        </span>
                      )}
                      {milestone.archiveRef && (
                        <span className="text-[10px] font-mono text-slate-400">
                          Réf. {milestone.archiveRef}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#0070C0] font-bold block mb-1">
                      {milestone.phase}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#262626]">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-slate-700 italic mt-1 font-medium">
                      « {milestone.tagline} »
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {milestone.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-slate-800 block">
                      Faits et délivrables vérifiés :
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {milestone.keyFacts.map((fact, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                              isFuture ? 'text-amber-600' : 'text-emerald-600'
                            }`}
                          />
                          <span className="leading-snug">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}

        {/* DESIGNATED CONSOLIDATION SLOTS (When information is being archived - explicit requirement) */}
        {activeYear === 'all' && (
          <div className="relative group">
            <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 w-6 h-6 rounded-full border-2 border-dashed border-slate-400 bg-slate-100 flex items-center justify-center text-slate-400">
              <Clock className="w-3 h-3" />
            </div>

            <div className="p-6 border border-dashed border-slate-300 bg-slate-50/70 rounded-lg space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FolderArchive className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-slate-700">
                    Archives en cours de consolidation statutaire
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 border border-slate-200">
                  Numérisation en cours
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                Conformément à la déontologie TSF interdisant toute invention de données, les actes intermédiaires couvrant l'extension des antennes régionales (2018-2022) et les registres d’homologation des premières universités partenaires font l'objet d'un audit de certification par le Secrétariat Général avant intégration dans le registre public.
              </p>

              <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 pt-1">
                <span>Période : 2018 — 2022</span>
                <span>·</span>
                <span>Dépôt légal : Cotonou & Kigali</span>
                <span>·</span>
                <span>Code d’archive réservé : ARCH-CONSOL-2026</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Official Archive Access Panel */}
      <div className="p-8 bg-[#262626] text-white rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-[#404040]/40">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-[#FF6600] text-xs font-mono font-bold uppercase">
            <FolderArchive className="w-4 h-4" />
            <span>Service des Archives & Traçabilité Historique</span>
          </div>
          <h4 className="text-xl font-bold font-serif">
            Besoin d’un acte statutaire certifié conforme ?
          </h4>
          <p className="text-xs sm:text-sm text-slate-300">
            Les missions diplomatiques, bailleurs accrédités et chercheurs peuvent solliciter des extraits certifiés conformes des procès-verbaux fondateurs auprès du Secrétariat Général.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          onClick={() => navigate('/contact')}
          className="shrink-0"
        >
          <span>Contacter le Secrétariat Général</span>
        </Button>
      </div>
    </div>
  );
};
