import React, { useState } from 'react';
import { 
  BAILLEUR_PROJECTS, 
  THEORY_OF_CHANGE, 
  BAILLEUR_BUDGET_ALLOCATION, 
  BAILLEUR_OFFICIAL_REPORTS 
} from '../../data/partnersData';
import { 
  Landmark, 
  Target, 
  Layers, 
  FileText, 
  PieChart, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Globe, 
  Briefcase 
} from 'lucide-react';

export const BailleurPathwayView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projets' | 'theory' | 'indicateurs' | 'budget' | 'rapports' | 'transparence'>('projets');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownloadReport = (title: string) => {
    setDownloadNotice(`Téléchargement initié : ${title}`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#0B1B3D] via-[#0E2046] to-[#061226] text-white rounded-3xl p-8 sm:p-12 border border-blue-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-mono">
            <Landmark className="w-3.5 h-3.5 text-blue-300" />
            <span>PARTENAIRES TECHNIQUES & FINANCIERS (PTF) • BAILLEURS MULTILATÉRAUX</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Rigueur Fiduciaire, Redevabilité & Impact Panafricain Mesurable
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            TSF offre aux banques multilatérales de développement, agences bilatérales et fondations d’impact un cadre fiduciaire certifié IFRS, une Théorie du Changement transparente et un plafonnement statutaire des frais de fonctionnement à 8%.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
            <div>
              <span className="text-slate-400 block">PLAFOND FRAIS GÉNÉRAUX</span>
              <strong className="text-amber-400 text-base font-bold">≤ 8.0% Statutaire</strong>
            </div>
            <div>
              <span className="text-slate-400 block">STANDARD COMPTABLE</span>
              <strong className="text-white text-base font-bold">IFRS & Audit Tiers</strong>
            </div>
            <div>
              <span className="text-slate-400 block">CADRE DE RENDEMENT</span>
              <strong className="text-emerald-400 text-base font-bold">Cadre Logique Ouvert</strong>
            </div>
            <div>
              <span className="text-slate-400 block">IMPACT DIRECT TERRAIN</span>
              <strong className="text-white text-base font-bold">92% des Capitaux</strong>
            </div>
          </div>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-mono text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Pathway Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-2 sm:space-x-6 text-xs font-mono uppercase tracking-wider overflow-x-auto pb-1">
        {[
          { id: 'projets', label: 'Portefeuille Projets' },
          { id: 'indicateurs', label: 'Indicateurs & Impact' },
          { id: 'theory', label: 'Theory of Change' },
          { id: 'budget', label: 'Budget & Ventilation' },
          { id: 'rapports', label: 'Rapports & Audits' },
          { id: 'transparence', label: 'Transparence & Gouvernance' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 font-semibold transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'border-[#0B1B3D] text-[#0B1B3D]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. PORTEFEUILLE PROJETS */}
      {activeTab === 'projets' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#B45309] font-bold block">
                FACILITÉS ÉLIGIBLES AUX CO-FINANCEMENTS
              </span>
              <h3 className="text-2xl font-bold text-[#0B1B3D]">
                Portefeuille des Projets Stratégiques Ouverts
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Conformes aux Objectifs de Développement Durable (ODD 4, 8, 9, 10, 17)
            </span>
          </div>

          <div className="space-y-6">
            {BAILLEUR_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#B45309]">
                        {project.code}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                        {project.pillar}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-[#0B1B3D] mt-1">
                      {project.title}
                    </h4>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {project.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {project.summary}
                </p>

                {/* Key Metrics & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block">Territoires concernés :</span>
                    <strong className="text-slate-900">{project.territories.join(', ')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Budget Total & Cible Co-Financement :</span>
                    <strong className="text-[#0B1B3D]">
                      {project.totalBudgetUsd.toLocaleString()} $ (Recherche : {project.coFinancingTargetUsd.toLocaleString()} $)
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Bénéficiaires Cibles :</span>
                    <strong className="text-emerald-700">{project.targetBeneficiaries}</strong>
                  </div>
                </div>

                {/* Logframe KPI Trackers */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                    Cadre de Mesure du Rendement (Indicateurs Clés) :
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.impactMetrics.map((m, i) => (
                      <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1">
                        <span className="text-slate-600 font-medium block">{m.label}</span>
                        <div className="flex justify-between font-mono text-[11px]">
                          <span>Actuel : <strong className="text-[#0B1B3D]">{m.current}</strong></span>
                          <span>Cible : <strong className="text-[#B45309]">{m.target}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. INDICATEURS & IMPACT */}
      {activeTab === 'indicateurs' && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#B45309] font-bold block">
                CADRE DE RENDEMENT CONSOLIDÉ
              </span>
              <h3 className="text-2xl font-bold text-[#0B1B3D]">
                Indicateurs d'Impact Systémique TSF (2026-2030)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Données d'impact auditées semestriellement par des commissaires aux comptes indépendants.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-xs font-mono text-slate-500 uppercase">Talents Détectés</span>
                <div className="text-3xl font-bold text-[#0B1B3D] font-mono">3 000</div>
                <p className="text-[11px] text-slate-600">Évalués sous protocole anonymisé sans biais social</p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-xs font-mono text-slate-500 uppercase">Lauréats Certifiés</span>
                <div className="text-3xl font-bold text-amber-600 font-mono">1 500</div>
                <p className="text-[11px] text-slate-600">Diplômés dotés du Passeport cryptographique TSF-ID</p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-xs font-mono text-slate-500 uppercase">Taux Insertion Économique</span>
                <div className="text-3xl font-bold text-emerald-600 font-mono">75%</div>
                <p className="text-[11px] text-slate-600">Postes cadres dirigeants, direction technique ou chaires</p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-xs font-mono text-slate-500 uppercase">Micro-Entreprises</span>
                <div className="text-3xl font-bold text-blue-600 font-mono">300</div>
                <p className="text-[11px] text-slate-600">Amorcées et pérennes dans les filières stratégiques</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl text-xs font-mono space-y-1">
                <span className="text-emerald-800 font-bold block">900 Emplois Indirects Créés</span>
                <p className="text-slate-600 text-[11px]">En milieu rural et périurbain via les scale-ups agricoles</p>
              </div>
              <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl text-xs font-mono space-y-1">
                <span className="text-amber-800 font-bold block">150 Villages Électrifiés & Irrigués</span>
                <p className="text-slate-600 text-[11px]">Solutions greentech décentralisées développées par nos lauréats</p>
              </div>
              <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl text-xs font-mono space-y-1">
                <span className="text-blue-800 font-bold block">30 000 Bénéficiaires Indirects</span>
                <p className="text-slate-600 text-[11px]">Populations impactées par les politiques de souveraineté</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. THEORY OF CHANGE */}
      {activeTab === 'theory' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#B45309] font-bold block">
                ARCHITECTURE D'INTERVENTION
              </span>
              <h3 className="text-2xl font-bold text-[#0B1B3D]">
                Théorie du Changement de Talents Sans Frontières (ToC)
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                La chaîne causale explicite décrivant comment les ressources mobilisées transforment structurellement le capital humain africain.
              </p>
            </div>

            {/* Step-by-Step Flow */}
            <div className="space-y-4">
              {THEORY_OF_CHANGE.map((node, index) => (
                <div 
                  key={node.step}
                  className="p-5 border border-slate-200 rounded-xl bg-slate-50/60 space-y-3 relative overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                    <span className="text-xs font-mono font-bold text-[#B45309] uppercase">
                      {node.label}
                    </span>
                    <h4 className="text-base font-bold text-[#0B1B3D]">{node.title}</h4>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {node.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                        Composantes Clés :
                      </span>
                      <ul className="space-y-1 text-slate-600">
                        {node.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#0B1B3D] font-mono">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                        Indicateurs d'Audit :
                      </span>
                      <ul className="space-y-1 text-slate-600">
                        {node.indicators.map((ind, i) => (
                          <li key={i} className="flex items-start gap-1.5 font-mono text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{ind}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. BUDGET & VENTILATION */}
      {activeTab === 'budget' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#B45309] font-bold block">
                  RÉPARTITION BUDGÉTAIRE ET ÉTANCHÉITÉ DES FONDS
                </span>
                <h3 className="text-2xl font-bold text-[#0B1B3D]">
                  Structure des Dépenses & Plafonnement Statutaire
                </h3>
              </div>
              <div className="px-3 py-1 bg-amber-50 border border-amber-300 rounded-lg text-xs font-mono text-[#B45309] font-bold">
                Engagement Strict : ≤ 8% de frais généraux
              </div>
            </div>

            <div className="space-y-4">
              {BAILLEUR_BUDGET_ALLOCATION.map((item, index) => (
                <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900">{item.category}</span>
                    <span className="font-mono font-bold text-[#0B1B3D] text-sm">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.percentage <= 8 ? 'bg-amber-600' : 'bg-[#0B1B3D]'}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>{item.description}</span>
                    {item.ringFenced && (
                      <span className="font-mono text-emerald-700 font-semibold shrink-0 ml-2">
                        Fonds fléché étanche
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <span>
                <strong>Garantie Fiduciaire TSF :</strong> Les subventions allouées sont logées sur des comptes dédiés ségrégués. Aucun transfert de fonds n’est autorisé vers des lignes administratives sans accord préalable du bailleur.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. RAPPORTS & AUDITS */}
      {activeTab === 'rapports' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#B45309] font-bold block">
                AUDITABILITÉ PERMANENTE
              </span>
              <h3 className="text-2xl font-bold text-[#0B1B3D]">
                Rapports Financiers & Revues Indépendantes
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Téléchargez les états financiers audités IFRS, revues de cadre logique et audits ESG certifiés.
              </p>
            </div>

            <div className="space-y-4">
              {BAILLEUR_OFFICIAL_REPORTS.map((rep) => (
                <div 
                  key={rep.id}
                  className="p-5 border border-slate-200 rounded-xl bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold">
                        {rep.type}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {rep.period}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-[#0B1B3D]">{rep.title}</h4>
                    <div className="text-[11px] font-mono text-slate-500">
                      Vérifié par : <strong className="text-slate-800">{rep.verifiedBy}</strong> • Taille : {rep.fileSize}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadReport(rep.title)}
                    className="px-4 py-2 bg-[#0B1B3D] hover:bg-[#122856] text-white text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger l’audit certifié</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. TRANSPARENCE & GOUVERNANCE */}
      {activeTab === 'transparence' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#B45309] font-bold block">
              INTÉGRITÉ SANS COMPROMISSION
            </span>
            <h3 className="text-2xl font-bold text-[#0B1B3D]">
              Mécanismes de Transparence & Déontologie TSF
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="p-5 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
              <h4 className="font-bold text-sm text-[#0B1B3D] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Dispositif Anti-Fraude & Lanceurs d’Alerte
              </h4>
              <p className="leading-relaxed">
                Canal d’alerte éthique externalisé et crypté géré par un médiateur indépendant sans lien hiérarchique avec la direction exécutive. Protection juridique totale des lanceurs d’alerte.
              </p>
            </div>

            <div className="p-5 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
              <h4 className="font-bold text-sm text-[#0B1B3D] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> Évaluation par Pairs & Double Aveugle
              </h4>
              <p className="leading-relaxed">
                Les jurys d’attribution des bourses et financements n’ont aucun accès à l’origine sociale, au genre ou aux réseaux des candidats lors de l’instruction préliminaire.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
