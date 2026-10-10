import React, { useState } from 'react';
import { ENTERPRISE_MODALITIES } from '../../data/partnersData';
import { EnterpriseModality, EnterpriseModalityId } from '../../types/partner';
import { 
  Building2, 
  Award, 
  UserCheck, 
  Users, 
  TrendingUp, 
  Zap, 
  Layers, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  FileText 
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Award: <Award className="w-6 h-6 text-amber-500" />,
  UserCheck: <UserCheck className="w-6 h-6 text-blue-500" />,
  Users: <Users className="w-6 h-6 text-emerald-500" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-purple-500" />,
  Zap: <Zap className="w-6 h-6 text-amber-500" />,
  Layers: <Layers className="w-6 h-6 text-indigo-500" />
};

export const EnterprisePathwayView: React.FC = () => {
  const [selectedModality, setSelectedModality] = useState<EnterpriseModality | null>(null);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [simulatedDomain, setSimulatedDomain] = useState('Intelligence Artificielle & Télécoms');
  const [simulatedFormat, setSimulatedFormat] = useState('Parrainage de Chaire & Recrutement');
  const [simulatedBudget, setSimulatedBudget] = useState('50 000 $ - 100 000 $');
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  const handleOpenSimulator = (modality?: EnterpriseModality) => {
    if (modality) {
      setSelectedModality(modality);
      setSimulatedFormat(modality.title);
    }
    setSimulatorOpen(true);
    setProposalSubmitted(false);
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    setProposalSubmitted(true);
  };

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#0B1B3D] via-[#122856] to-[#071329] text-white rounded-3xl p-8 sm:p-12 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-mono">
            <Building2 className="w-3.5 h-3.5" />
            <span>PARCOURS ENTREPRISE & INDUSTRIE • SECTEUR PRIVÉ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Alliez Votre Croissance à l'Élévation des Bâtisseurs d'Afrique
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Rejoignez un réseau de multinationales, champions industriels régionaux et startups de premier plan. TSF propose six formats d'engagement à haute valeur ajoutée, garantissant un retour stratégique direct sur vos recrutements, votre R&D et votre marque employeur.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleOpenSimulator()}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono rounded-xl shadow-lg transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simuler un accord d'entreprise sur mesure</span>
            </button>
            <a
              href="#modalites"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono rounded-xl transition-colors"
            >
              Découvrir les 6 modalités
            </a>
          </div>
        </div>
      </div>

      {/* The 6 Core Modalities Grid */}
      <div id="modalites" className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#B45309] font-bold block">
              CATALOGUE OFFICIEL D'ALLIANCE PRIVÉE
            </span>
            <h3 className="text-2xl font-bold text-[#0B1B3D]">
              Les Six Modalités d'Engagement Entreprise
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Cadre contractuel bilatéral sécurisé
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENTERPRISE_MODALITIES.map((mod) => (
            <div
              key={mod.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {ICON_MAP[mod.iconName] || <Building2 className="w-6 h-6 text-[#0B1B3D]" />}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                    {mod.badgeLabel}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[#0B1B3D]">{mod.title}</h4>
                  <p className="text-xs text-slate-600 font-medium mt-1 leading-snug">
                    {mod.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {mod.description}
                </p>

                {/* Key Benefits */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                    Bénéfices Stratégiques :
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {mod.keyBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Bottom */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="text-[11px] font-mono text-slate-500">
                  Format : <strong className="text-slate-900">{mod.startingBudgetOrFormat}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenSimulator(mod)}
                  className="w-full py-2 bg-slate-50 hover:bg-[#0B1B3D] text-[#0B1B3D] hover:text-white border border-slate-200 hover:border-transparent text-xs font-mono font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Configurer cette modalité</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulator / Proposal Modal */}
      {simulatorOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-4 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setSimulatorOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-sm font-mono"
            >
              ✕ Fermer
            </button>

            {proposalSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1B3D]">
                  Mémorandum de Partenariat Généré
                </h3>
                <p className="text-xs font-mono text-slate-600 max-w-md mx-auto">
                  Votre proposition d'alliance ({simulatedFormat} — {simulatedDomain}) a été transmise au Directoire Exécutif TSF.
                </p>
                <div className="p-3 bg-slate-900 text-amber-300 font-mono text-xs rounded-xl inline-block shadow">
                  Réf. Convention Préliminaire : CONV-ENT-2026-{Math.floor(1000 + Math.random() * 9000)}
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Le Directeur des Alliances Privées prendra contact sous 48h ouvrées avec votre direction générale.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSimulatorOpen(false)}
                    className="px-6 py-2 bg-[#0B1B3D] text-white text-xs font-mono rounded-lg hover:bg-[#122856]"
                  >
                    Terminer
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B45309] block">
                    SIMULATEUR DE CONVENTION SUR MESURE
                  </span>
                  <h3 className="text-xl font-bold text-[#0B1B3D]">
                    Élaborer un Protocole d'Engagement Entreprise
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Définissez vos objectifs prioritaires pour recevoir un projet de protocole d'accord officiel (MoU).
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Modalité Principale Souhaitée
                    </label>
                    <select
                      value={simulatedFormat}
                      onChange={e => setSimulatedFormat(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0B1B3D]"
                    >
                      {ENTERPRISE_MODALITIES.map(m => (
                        <option key={m.id} value={m.title}>{m.title} — {m.tagline}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Domaine Stratégique Ciblé
                    </label>
                    <select
                      value={simulatedDomain}
                      onChange={e => setSimulatedDomain(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0B1B3D]"
                    >
                      <option value="Intelligence Artificielle & Télécoms">Intelligence Artificielle & Télécoms</option>
                      <option value="Énergie Décentralisée & Climat">Énergie Décentralisée & Climat</option>
                      <option value="Haute Finance & Fintech">Haute Finance & Fintech</option>
                      <option value="Santé & Biotechnologies">Santé & Biotechnologies</option>
                      <option value="Génie Logiciel & Cybersécurité">Génie Logiciel & Cybersécurité</option>
                      <option value="Agro-industrie & Supply Chain">Agro-industrie & Supply Chain</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nom de votre Entreprise *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ex. Global Energy West Africa"
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0B1B3D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Votre Fonction / Titre *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ex. Directeur RH / DG / VP RSE"
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0B1B3D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Courriel Professionnel de Contact *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="direction@entreprise-group.com"
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0B1B3D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Enveloppe Budgétaire Indicative
                    </label>
                    <select
                      value={simulatedBudget}
                      onChange={e => setSimulatedBudget(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0B1B3D]"
                    >
                      <option value="Mécénat de compétences (Mentorat sans apport financier)">Mécénat de compétences (Mentorat sans apport financier)</option>
                      <option value="25 000 $ - 50 000 $ (Bourses & Naming)">25 000 $ - 50 000 $ (Bourses & Naming)</option>
                      <option value="50 000 $ - 100 000 $ (Challenge R&D & Recrutement)">50 000 $ - 100 000 $ (Challenge R&D & Recrutement)</option>
                      <option value="100 000 $ - 250 000 $ (Chaire d'Excellence Complète)">100 000 $ - 250 000 $ (Chaire d'Excellence Complète)</option>
                      <option value="Plus de 250 000 $ (Filière Stratégique Pluriannuelle)">Plus de 250 000 $ (Filière Stratégique Pluriannuelle)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Accord confidentiel
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSimulatorOpen(false)}
                      className="px-4 py-2 text-xs font-mono text-slate-600 hover:text-slate-800"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#0B1B3D] hover:bg-[#122856] text-white text-xs font-mono font-medium rounded-lg"
                    >
                      Soumettre la demande d'accord
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
