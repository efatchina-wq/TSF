import React, { useState } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { PageHeader } from '../../components/layout/PageHeader';
import { SubNav, SubNavItem } from '../../components/navigation/SubNav';
import { Container } from '../../components/ui/Container';
import { 
  Users, 
  BookOpen, 
  ShieldCheck, 
  Briefcase, 
  Handshake, 
  FileText, 
  LayoutDashboard, 
  Plus, 
  Settings,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  Filter,
  Eye,
  Download,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Cpu,
  Radio
} from 'lucide-react';

const ADMIN_SUB_NAV: SubNavItem[] = [
  { id: 'dashboard', label: 'Console Centrale', path: '/admin/dashboard' },
  { id: 'talents', label: 'Talents & Vivier', path: '/admin/talents' },
  { id: 'programmes', label: 'Programmes & Cohortes', path: '/admin/programmes' },
  { id: 'certifications', label: 'Greffe & Certifications', path: '/admin/certifications' },
  { id: 'opportunites', label: 'Opportunités & Bourses', path: '/admin/opportunites' },
  { id: 'partenaires', label: 'Alliances & Partenaires', path: '/admin/partenaires' },
  { id: 'wikijob-sources', label: 'Sources WikiJob (Bénin)', path: '/admin/wikijob/sources' },
  { id: 'wikijob-engine', label: 'Moteur d’Agrégation', path: '/admin/wikijob/engine' },
  { id: 'wikijob-jobs', label: 'Synchro 24h & Jobs', path: '/admin/wikijob/jobs' },
  { id: 'wikijob-wiki', label: 'Wiki CMS (Guides)', path: '/admin/wikijob/wiki' },
  { id: 'contenus', label: 'Publications & Rapports', path: '/admin/contenus' }
];

export const AdminPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  const isTalents = currentPath === '/admin/talents';
  const isProgrammes = currentPath === '/admin/programmes';
  const isCertifications = currentPath === '/admin/certifications';
  const isOpportunites = currentPath === '/admin/opportunites';
  const isPartenaires = currentPath === '/admin/partenaires';
  const isContenus = currentPath === '/admin/contenus';
  const isDashboard = !isTalents && !isProgrammes && !isCertifications && !isOpportunites && !isPartenaires && !isContenus;

  // Search & filter state for tables
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  return (
    <div className="pb-24 space-y-10">
      <PageHeader
        kicker="CONSOLE DE SUPERVISION & CONTRÔLE DES SYSTÈMES"
        title="Administration & Gouvernance TSF"
        description="Cockpit centralisé de gestion opérationnelle, supervision des cohortes, audit du greffe de certification et flux d'agrégation institutionnelle."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/admin/wikijob/engine')}
              className="px-3.5 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Moteur WikiJob
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-mono text-xs rounded-xl transition-colors cursor-pointer"
            >
              Portail Public
            </button>
          </div>
        }
      >
        <SubNav items={ADMIN_SUB_NAV} />
      </PageHeader>

      <Container>
        {/* ========================================================================= */}
        {/* 1. DASHBOARD PRINCIPAL : HIERARCHIE EN 5 NIVEAUX                          */}
        {/* ========================================================================= */}
        {isDashboard && (
          <div className="space-y-10">
            {/* NIVEAU 1 : INFORMATIONS PRIORITAIRES & ALERTES CRITIQUES */}
            <section className="bg-[#121212] text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 border border-[#2B2B2B]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0E8A5E] animate-pulse" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF6600] font-bold">
                      SUPERVISION OPÉRATIONNELLE CONTINUE
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-sans">
                    Systèmes Actifs & Conformité Réglementaire
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-3 py-1 bg-white/10 rounded-lg text-slate-300">
                    Registre : <strong className="text-white">v3.4.2</strong>
                  </span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg font-bold">
                    SLA : 99.98%
                  </span>
                </div>
              </div>

              {/* Priority alert strips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FF6600]/20 text-[#FF6600] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    !
                  </div>
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-mono text-[#FF6600] font-bold uppercase block">
                      ACTION REQUISE • DÉTECTION
                    </span>
                    <strong className="text-white block font-sans">
                      18 dossiers d'évaluation en attente de délibération de jury
                    </strong>
                    <p className="text-slate-300 leading-snug">
                      Clôture de la commission Horizon 2026 prévue dans 48h.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-[#0070C0] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-mono text-sky-300 font-bold uppercase block">
                      SYNCHRONISATION WIKIJOB
                    </span>
                    <strong className="text-white block font-sans">
                      8 sources nationales actualisées cette nuit avec succès
                    </strong>
                    <p className="text-slate-300 leading-snug">
                      68 avis et concours intégrés sans anomalie de structure.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* NIVEAU 2 : INDICATEURS STRUCTURÉS (PAS DE CARTES RÉPÉTITIVES SANS VALEUR) */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
                  02. INDICATEURS DE GOUVERNANCE GLOBALE
                </span>
                <span className="text-xs font-mono text-slate-500">Mise à jour en temps réel</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2 border-t-4 border-t-[#0070C0]">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                    CANDIDATURES ACTIVES
                  </span>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#262626] font-mono tabular-nums">184</div>
                    <span className="text-[10px] font-mono font-bold text-[#0E8A5E] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      +12 aujourd'hui
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-sans">
                    Réparties sur 6 pays et 4 programmes prioritaires.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2 border-t-4 border-t-[#FF6600]">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                    COHORTES EN COURS
                  </span>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#262626] font-mono tabular-nums">6</div>
                    <span className="text-[10px] font-mono font-bold text-[#0070C0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      100% actives
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-sans">
                    Horizon, Graines d'Avenir, Cadres & Fellow Bâtisseur.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2 border-t-4 border-t-[#0E8A5E]">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                    TITRES HOMOLOGUÉS
                  </span>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#262626] font-mono tabular-nums">1 420</div>
                    <span className="text-[10px] font-mono font-bold text-[#0E8A5E] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Scellés SHA-256
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-sans">
                    100% vérifiables en ligne par employeurs et bailleurs.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2 border-t-4 border-t-slate-700">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                    TAUX D'INSERTION CADRES
                  </span>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#262626] font-mono tabular-nums">75%</div>
                    <span className="text-[10px] font-mono font-bold text-[#0070C0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Sous 6 mois
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-sans">
                    Mesure consolidée auprès de 120+ recruteurs partenaires.
                  </p>
                </div>
              </div>
            </section>

            {/* NIVEAU 3 & 4 : ACTIVITÉ RÉCENTE & DONNÉES DÉTAILLÉES */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Activité récente (4 cols) */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
                    03. JOURNAL D'ACTIVITÉ
                  </span>
                  <Activity className="w-4 h-4 text-slate-400" />
                </div>

                <div className="space-y-4 text-xs font-sans divide-y divide-slate-100">
                  <div className="pt-3 first:pt-0 space-y-1">
                    <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                      <span>Il y a 14 min</span>
                      <span className="text-[#0E8A5E] font-bold">● Succès</span>
                    </div>
                    <strong className="text-[#262626] block font-semibold">
                      Homologation Titre TSF-CERT-2025-BEN-0092
                    </strong>
                    <p className="text-slate-500">
                      Signature électronique validée par la présidence du jury.
                    </p>
                  </div>

                  <div className="pt-3 space-y-1">
                    <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                      <span>Il y a 1 heure</span>
                      <span className="text-[#0070C0] font-bold">● Inscription</span>
                    </div>
                    <strong className="text-[#262626] block font-semibold">
                      Nouveau profil candidat enrôlé : TSF-ID-2026-BEN-0842
                    </strong>
                    <p className="text-slate-500">
                      Dossier transmis au comité de présélection régionale.
                    </p>
                  </div>

                  <div className="pt-3 space-y-1">
                    <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                      <span>Il y a 3 heures</span>
                      <span className="text-[#FF6600] font-bold">● Collecte</span>
                    </div>
                    <strong className="text-[#262626] block font-semibold">
                      Pipeline WikiJob automatique exécuté
                    </strong>
                    <p className="text-slate-500">
                      12 nouveaux avis collectés sur ANPE Bénin & PSIE.
                    </p>
                  </div>
                </div>
              </div>

              {/* Données détaillées : Supervision des Cohortes et Processus (8 cols) */}
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
                      04. TABLEAU OPÉRATIONNEL DES COHORTES
                    </span>
                    <h3 className="text-lg font-bold text-[#262626] font-sans mt-0.5">
                      Suivi d'Instruction et Déploiement Actuel
                    </h3>
                  </div>

                  {/* Responsive controls */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">Filtrer statut :</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 outline-none focus:ring-1 focus:ring-[#0070C0]"
                    >
                      <option value="ALL">Tous statuts</option>
                      <option value="ACTIVE">En cours</option>
                      <option value="JURY">Jury en session</option>
                      <option value="CLOTURE">Clôturé</option>
                    </select>
                  </div>
                </div>

                {/* Desktop Data Grid */}
                <div className="hidden sm:block overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Programme</th>
                        <th className="px-4 py-3">Cohorte</th>
                        <th className="px-4 py-3 text-center">Effectif</th>
                        <th className="px-4 py-3">Phase en cours</th>
                        <th className="px-4 py-3 text-right">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3.5 font-bold text-slate-900">TSF Horizon</td>
                        <td className="px-4 py-3.5 font-mono text-slate-600">Promotion 2026-A</td>
                        <td className="px-4 py-3.5 text-center font-mono font-bold text-[#0070C0]">45</td>
                        <td className="px-4 py-3.5 text-slate-600">Incubation & Cas pratiques</td>
                        <td className="px-4 py-3.5 text-right font-mono">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Actif
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3.5 font-bold text-slate-900">Graines d'Avenir</td>
                        <td className="px-4 py-3.5 font-mono text-slate-600">Promotion 2026-B</td>
                        <td className="px-4 py-3.5 text-center font-mono font-bold text-[#0070C0]">60</td>
                        <td className="px-4 py-3.5 text-slate-600">Tests cognitifs & logique</td>
                        <td className="px-4 py-3.5 text-right font-mono">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            Jury en session
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3.5 font-bold text-slate-900">Cadres Stratégiques</td>
                        <td className="px-4 py-3.5 font-mono text-slate-600">Session 2025-Q4</td>
                        <td className="px-4 py-3.5 text-center font-mono font-bold text-[#0070C0]">30</td>
                        <td className="px-4 py-3.5 text-slate-600">Placement & Propulsion</td>
                        <td className="px-4 py-3.5 text-right font-mono">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0070C0] border border-blue-200">
                            Placement 75%
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Mobile Adapted Card List (Avoid crammed horizontal desktop tables on 375px screens) */}
                <div className="sm:hidden space-y-3">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-bold text-slate-900">TSF Horizon</strong>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                        Actif
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">Promotion 2026-A • 45 candidats</div>
                    <div className="text-xs text-slate-700">Phase : Incubation & Cas pratiques</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-bold text-slate-900">Graines d'Avenir</strong>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800">
                        Jury en session
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">Promotion 2026-B • 60 candidats</div>
                    <div className="text-xs text-slate-700">Phase : Tests cognitifs & logique</div>
                  </div>
                </div>
              </div>
            </div>

            {/* NIVEAU 5 : ACTIONS RAPIDES & PILOTAGE DIRECT */}
            <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF6600] font-bold block">
                05. ACTIONS RAPIDES DE PILOTAGE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/wikijob/engine')}
                  className="p-4 bg-white border border-slate-200 hover:border-[#0070C0]/50 rounded-2xl shadow-xs transition-all text-left group cursor-pointer"
                >
                  <Cpu className="w-5 h-5 text-[#0070C0] mb-2 group-hover:scale-110 transition-transform" />
                  <strong className="text-sm font-bold text-slate-900 block font-sans">
                    Lancer l'agrégation
                  </strong>
                  <span className="text-xs text-slate-500 font-sans mt-0.5 block">
                    Déclencher le pipeline de parsing & normalisation
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/admin/wikijob/sources')}
                  className="p-4 bg-white border border-slate-200 hover:border-[#0070C0]/50 rounded-2xl shadow-xs transition-all text-left group cursor-pointer"
                >
                  <Radio className="w-5 h-5 text-[#0E8A5E] mb-2 group-hover:scale-110 transition-transform" />
                  <strong className="text-sm font-bold text-slate-900 block font-sans">
                    Gérer les 8 sources
                  </strong>
                  <span className="text-xs text-slate-500 font-sans mt-0.5 block">
                    Tester la connectivité des organismes publics
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/certification/verify')}
                  className="p-4 bg-white border border-slate-200 hover:border-[#0070C0]/50 rounded-2xl shadow-xs transition-all text-left group cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5 text-[#FF6600] mb-2 group-hover:scale-110 transition-transform" />
                  <strong className="text-sm font-bold text-slate-900 block font-sans">
                    Contrôler un certificat
                  </strong>
                  <span className="text-xs text-slate-500 font-sans mt-0.5 block">
                    Vérifier l'empreinte SHA-256 au greffe
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/admin/wikijob/wiki')}
                  className="p-4 bg-white border border-slate-200 hover:border-[#0070C0]/50 rounded-2xl shadow-xs transition-all text-left group cursor-pointer"
                >
                  <BookOpen className="w-5 h-5 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
                  <strong className="text-sm font-bold text-slate-900 block font-sans">
                    Édition WikiJob CMS
                  </strong>
                  <span className="text-xs text-slate-500 font-sans mt-0.5 block">
                    Rédiger ou réviser un guide d'insertion
                  </span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* SUB-SECTIONS WITH STRUCTURED PROFESSIONAL BACK-OFFICE PRESENTATION */}
        {isTalents && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
                  REGISTRE DES CANDIDATS & LAURÉATS
                </span>
                <h3 className="text-xl font-bold text-[#262626] font-sans">Supervision du Vivier des Talents</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/talents/inscription')}
                className="px-4 py-2.5 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau profil candidat</span>
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Contrôlez l'authenticité des accréditations, attribuez les identifiants TSF-ID et pilotez les évaluations par les collèges scientifiques.
            </p>
          </div>
        )}

        {isProgrammes && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
                  GOUVERNANCE ACADÉMIQUE
                </span>
                <h3 className="text-xl font-bold text-[#262626] font-sans">Gestion des Programmes & Cohortes</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/programs')}
                className="px-4 py-2.5 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ouvrir une nouvelle cohorte</span>
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Supervision des curricula d'impact (Horizon, Graines d'Avenir, Cadres Stratégiques), nomination des présidents de jury et calendrier des soutenances.
            </p>
          </div>
        )}

        {isCertifications && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
                  GREFFE CENTRAL SOUVERAIN
                </span>
                <h3 className="text-xl font-bold text-[#262626] font-sans">Registre des Certifications & Sceaux</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/certification/verify')}
                className="px-4 py-2.5 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Vérification au greffe</span>
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Archivage cryptographique, génération des empreintes SHA-256 et délivrance des attestations officielles Palier I, II et III.
            </p>
          </div>
        )}

        {isOpportunites && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
                  MATCHING & PROPULSION
                </span>
                <h3 className="text-xl font-bold text-[#262626] font-sans">Gestion des Opportunités & Bourses</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/opportunities')}
                className="px-4 py-2.5 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publier un appel d'offres</span>
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Validation des offres de cadres exécutifs, bourses d'excellence SourceFund Africa et détachements institutionnels.
            </p>
          </div>
        )}

        {isPartenaires && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
                  ALLIANCES CONTINENTALES
                </span>
                <h3 className="text-xl font-bold text-[#262626] font-sans">Conventions & Accords Partenaires</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/partners')}
                className="px-4 py-2.5 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Handshake className="w-4 h-4" />
                <span>Consulter les accords</span>
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Suivi des conventions avec les ministères, universités, industriels et institutions multilatérales.
            </p>
          </div>
        )}

        {isContenus && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
                  ÉDITIONS INSTITUTIONNELLES
                </span>
                <h3 className="text-xl font-bold text-[#262626] font-sans">Publications, Rapports & Médias</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/admin/wikijob/wiki')}
                className="px-4 py-2.5 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Rédiger un article</span>
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Édition des livres blancs, rapports annuels d'impact et synthèses méthodologiques TSF.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};
