import React, { useState } from 'react';
import { Program } from '../../../types';
import { useRouter } from '../../../hooks/useRouter';
import { Container } from '../../../components/ui/Container';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Target,
  Users,
  MapPin,
  Building,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
  Award,
  Sparkles,
  BarChart3,
  Layers,
  Image as ImageIcon,
  ShieldCheck,
  Share2,
  ExternalLink
} from 'lucide-react';
import { HorizonExcellenceVisualizer } from './HorizonExcellenceVisualizer';
import { TsfDetecteExperience } from './TsfDetecteExperience';
import { GrainesDeChampionsExperience } from './GrainesDeChampionsExperience';
import { SourceFundAfricaExperience } from './SourceFundAfricaExperience';

export interface ProgramDetailViewProps {
  program: Program;
}

export const ProgramDetailView: React.FC<ProgramDetailViewProps> = ({ program }) => {
  const { navigate } = useRouter();
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const isCohortOpen = program.status === 'cohort_open' || program.status === 'cohorte_ouverte';

  const handleDownload = (docTitle: string) => {
    setDownloadNotice(`Téléchargement initié : ${docTitle}`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="pb-24 space-y-16">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="bg-[#262626] text-white border-b border-[#404040]/40 relative overflow-hidden">
        <Container className="py-12 sm:py-16">
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-mono">
            <button
              type="button"
              onClick={() => navigate('/programmes')}
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer select-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l’ensemble des programmes</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Réf. Statutaire :</span>
              <span className="px-2 py-0.5 rounded bg-black/40 text-[#FF6600] font-bold border border-white/10">
                TSF-PRG-{program.slug.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              {/* Badges strip */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded bg-[#0070C0]/20 text-[#38BDF8] font-mono text-xs font-bold uppercase tracking-wider border border-[#0070C0]/30">
                  {program.kicker}
                </span>

                {program.acronym && (
                  <span className="px-2.5 py-1 rounded bg-black/30 text-slate-300 font-mono text-xs font-bold border border-white/10">
                    [{program.acronym}]
                  </span>
                )}

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider ${
                    isCohortOpen
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isCohortOpen ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
                    }`}
                  />
                  {program.statusLabel || (isCohortOpen ? 'COHORTE OUVERTE' : 'PROGRAMME ACTIF')}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {program.title}
              </h1>

              {/* Lead Summary */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-3xl">
                {program.summary}
              </p>

              {/* Quick Specs Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/80">
                  <span className="text-slate-400 block text-[10px] uppercase">Domaine</span>
                  <span className="text-slate-100 font-bold block mt-0.5 line-clamp-1">
                    {program.domain || program.kicker}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/80">
                  <span className="text-slate-400 block text-[10px] uppercase">Territoire</span>
                  <span className="text-slate-100 font-bold block mt-0.5 line-clamp-1">
                    {program.territory || 'Panafricain'}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/80">
                  <span className="text-slate-400 block text-[10px] uppercase">Phase Méthode</span>
                  <span className="text-amber-400 font-bold block mt-0.5 uppercase">
                    {program.pillar.join(' → ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Action & Highlights */}
            <div className="lg:col-span-4 bg-slate-800/90 border border-slate-700 p-6 rounded-2xl shadow-xl space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block">
                Modalités Rapides
              </span>

              <div className="space-y-3 text-xs divide-y divide-slate-700/80">
                <div className="pt-2">
                  <span className="text-slate-400 font-mono block">Cible :</span>
                  <span className="font-semibold text-white block mt-0.5">
                    {program.targetAudience}
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 font-mono block">Durée :</span>
                  <span className="font-medium text-slate-200 block mt-0.5">
                    {program.duration}
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 font-mono block">Sélection :</span>
                  <span className="font-medium text-slate-200 block mt-0.5">
                    {program.selectionProcess}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 space-y-2.5">
                <Button
                  fullWidth
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/talents/inscription')}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Postuler à ce cursus
                </Button>

                <Button
                  fullWidth
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/partenaires')}
                  className="text-white border-slate-600 hover:bg-slate-700"
                >
                  Devenir partenaire de ce programme
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Floating Download Notification */}
      {downloadNotice && (
        <div className="fixed bottom-6 right-6 z-[90] p-4 bg-[#262626] text-white rounded-xl shadow-2xl border border-[#0070C0]/50 flex items-center gap-3 animate-fade-in text-xs font-mono">
          <Download className="w-4 h-4 text-[#FF6600] animate-bounce" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Main Content Area */}
      <Container className="space-y-16">
        {/* ========================================================================= */}
        {/* SPECIAL EXPERIENCES PLUGGED CONTEXTUALLY */}
        {/* ========================================================================= */}
        {program.slug === 'horizon-excellence' && (
          <section id="visualisation-objectifs">
            <HorizonExcellenceVisualizer />
          </section>
        )}

        {program.slug === 'tsf-detecte' && (
          <section id="detection-experience-slot">
            <TsfDetecteExperience />
          </section>
        )}

        {program.slug === 'graines-de-champions' && (
          <section id="graines-experience-slot">
            <GrainesDeChampionsExperience />
          </section>
        )}

        {program.slug === 'sourcefund-africa' && (
          <section id="sourcefund-experience-slot">
            <SourceFundAfricaExperience />
          </section>
        )}

        {/* ========================================================================= */}
        {/* 2. PRÉSENTATION & 3. PROBLÉMATIQUE */}
        {/* ========================================================================= */}
        <section id="presentation" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
              02. Présentation du Dispositif
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#262626]">
              Une doctrine d’intervention au service de la transformation africaine
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-normal">
              <p>{program.fullDescription}</p>
            </div>

            {/* Curriculum Highlights */}
            {program.curriculumHighlights && program.curriculumHighlights.length > 0 && (
              <div className="pt-6 border-t border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-[#262626] uppercase font-mono tracking-wider">
                  Composantes & Piliers d'Enseignement Clés
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {program.curriculumHighlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-2 text-xs text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium leading-snug">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-4">
            <Card padding="lg" className="border-t-4 border-t-[#0070C0] bg-blue-50/20 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
                03. Problématique Ciblée
              </span>
              <h3 className="text-lg font-bold text-[#262626]">
                Le dysfonctionnement structurel auquel répond ce programme
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {program.problematic || 'Fragmentation de l’offre de formation d’excellence et manque de débouchés structurés pour les hauts potentiels africains.'}
              </p>
            </Card>

            <div className="p-5 border border-slate-200 rounded-xl bg-white space-y-2 text-xs">
              <span className="font-bold text-[#262626] font-mono block">
                Standard Déontologique TSF
              </span>
              <p className="text-slate-600 leading-relaxed">
                Tous les boursiers et formateurs de ce cursus sont astreints à la Charte d’Éthique et d’Intégrité TSF, avec contrôle systématique du Comité de Déontologie.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. OBJECTIFS STRATÉGIQUES */}
        {/* ========================================================================= */}
        <section id="objectifs" className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
              04. Objectifs Opérationnels
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#262626]">
              Des engagements d’impact mesurables et opposables
            </h2>
            <p className="text-sm text-slate-600">
              Chaque programme TSF est assujetti à des indicateurs de performance prédéfinis avec les bailleurs institutionnels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(program.strategicObjectives || [
              'Former une masse critique de lauréats de standard mondial.',
              'Garantir l’insertion dans les postes de transformation souverains.',
              'Irriguer les territoires et créer des emplois indirects qualifiés.'
            ]).map((obj, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-md bg-[#0070C0] text-white flex items-center justify-center font-mono font-bold text-xs">
                  0{idx + 1}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  {obj}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. MÉTHODOLOGIE & ÉTAPES */}
        {/* ========================================================================= */}
        <section id="methodologie" className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
              05. Méthodologie & Cycle de Vie
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#262626]">
              Une ingénierie pédagogique par paliers d’exigence
            </h2>
            <p className="text-sm text-slate-600">
              Découpage modulaire du cursus, associant théorie fondamentale, simulations en situation réelle et audit par les pairs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(program.methodologySteps || [
              { number: '01', title: 'Sélection & Diagnostic', description: 'Tests cognitifs et évaluation individuelle.' },
              { number: '02', title: 'Immersion & Séminaires', description: 'Modules théoriques et résidences régionales.' },
              { number: '03', title: 'Mission Réelle de Terrain', description: 'Résolution de cas d’utilité publique.' },
              { number: '04', title: 'Homologation & Propulsion', description: 'Certification statutaire et mise en relation.' }
            ]).map((step, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-50 border border-slate-200/90 rounded-xl space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-2xl font-mono font-extrabold text-[#0070C0]">
                    {step.number}
                  </span>
                  <h3 className="text-base font-bold text-[#262626]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {step.details && step.details.length > 0 && (
                  <div className="pt-3 border-t border-slate-200 space-y-1.5 text-[11px] text-slate-500">
                    {step.details.slice(0, 2).map((d, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-1.5">
                        <span className="text-[#0070C0] font-bold">›</span>
                        <span className="line-clamp-2">{d}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. PUBLIC CIBLE & 7. TERRITOIRE */}
        {/* ========================================================================= */}
        <section id="public-territoire" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card padding="lg" className="border-slate-200 space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#0070C0]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                06. Public Cible & Prérequis
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#262626]">
              Profils Recherchés & Critères d'Éligibilité
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {program.targetAudience}
            </p>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 space-y-1.5">
              <span className="font-semibold text-slate-900 block font-mono">Processus de Sélection :</span>
              <p>{program.selectionProcess}</p>
            </div>
          </Card>

          <Card padding="lg" className="border-slate-200 space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#0070C0]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                07. Territoire & Rayonnement
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#262626]">
              Couverture Géographique & Hubs Régionaux
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {program.territory || 'Panafricain — Déploiement dans 18 pays sous conventions de siège et accords ministériels.'}
            </p>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 space-y-1.5">
              <span className="font-semibold text-slate-900 block font-mono">Pôles Opérationnels :</span>
              <p>Abidjan · Cotonou · Dakar · Kigali · Nairobi · Représentations de la diaspora européenne & nord-américaine.</p>
            </div>
          </Card>
        </section>

        {/* ========================================================================= */}
        {/* 8. CALENDRIER DU PROGRAMME */}
        {/* ========================================================================= */}
        <section id="calendrier" className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
              08. Calendrier & Jalons Opérationnels
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#262626]">
              Chronogramme de la session officielle 2026
            </h2>
            <p className="text-sm text-slate-600">
              Dates des échéances de candidatures, oraux d’admission et rentrées solennelles.
            </p>
          </div>

          <div className="space-y-3">
            {(program.schedule || [
              { date: 'Janvier 2026', title: 'Appel à candidatures', description: 'Ouverture du registre numérique.', status: 'termine' },
              { date: 'Mars 2026', title: 'Clôture & Jury de sélection', description: 'Examen des dossiers.', status: 'en_cours' },
              { date: 'Juin 2026', title: 'Rentrée de cohorte', description: 'Lancement solennel du programme.', status: 'a_venir' }
            ]).map((step, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-slate-100 text-[#0070C0] mt-0.5">
                    <Calendar className="w-4 h-4 text-[#0070C0]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#0070C0]">{step.date}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-bold text-[#262626]">{step.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{step.description}</p>
                  </div>
                </div>

                <span
                  className={`self-start sm:self-center text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded ${
                    step.status === 'termine'
                      ? 'bg-slate-100 text-slate-600'
                      : step.status === 'en_cours'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {step.status === 'termine' ? 'Terminé' : step.status === 'en_cours' ? 'En cours' : 'À venir'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. INDICATEURS CLÉS */}
        {/* ========================================================================= */}
        <section id="indicateurs" className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
              09. Indicateurs Clés de Suivi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#262626]">
              Tableau de bord statistique audité
            </h2>
            <p className="text-sm text-slate-600">
              Métriques certifiées par les commissaires aux comptes et auditeurs indépendants TSF.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {program.indicators && program.indicators.length > 0 ? (
              program.indicators.map((ind, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-slate-200 rounded-xl space-y-1.5 text-center"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0070C0] block">
                    {ind.value}
                  </span>
                  <span className="text-xs font-bold text-slate-800 block">
                    {ind.label}
                  </span>
                  {ind.description && (
                    <span className="text-[11px] text-slate-500 block leading-tight">
                      {ind.description}
                    </span>
                  )}
                  {ind.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 font-semibold">
                      <ShieldCheck className="w-3 h-3" /> Chiffre certifié
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full p-4 text-xs text-slate-500 font-mono">
                Indicateurs en cours de consolidation statutaire.
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. PARTENAIRES DU PROGRAMME */}
        {/* ========================================================================= */}
        <section id="partenaires" className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
              10. Écosystème Partenarial
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#262626]">
              Partenaires institutionnels & scientifiques
            </h2>
            <p className="text-sm text-slate-600">
              Universités, ministères de tutelle, banques de développement et multinationales associées à ce cursus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(program.partners || [
              { name: 'Banque Ouest-Africaine de Développement', role: 'Parrainage & Financement' },
              { name: 'Universités Publiques Régionales', role: 'Homologation académique' },
              { name: 'Entreprises Panafricaines Partenaires', role: 'Débouchés & Projets réels' },
              { name: 'Fondations Internationales Mécènes', role: 'Bourses d’études intégrales' }
            ]).map((part, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
              >
                <div className="text-[10px] font-mono uppercase text-[#0070C0] font-bold">
                  Partenaire Accrédité
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {part.name}
                </h4>
                <p className="text-xs text-slate-500">{part.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 11. DOCUMENTS & RESSOURCES À TÉLÉCHARGER */}
        {/* ========================================================================= */}
        <section id="documents" className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
              11. Documents & Référentiels
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#262626]">
              Documentation officielle à destination des candidats et bailleurs
            </h2>
            <p className="text-sm text-slate-600">
              Plaquettes, syllabus académiques, termes de référence et rapports d’évaluation disponibles en libre accès.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(program.documents || [
              { id: 'doc-1', title: 'Plaquette de Présentation Officielle', type: 'pdf', fileSize: '2.5 Mo', category: 'Brochure' },
              { id: 'doc-2', title: 'Référentiel Pédagogique & Compétences', type: 'syllabus', fileSize: '1.2 Mo', category: 'Syllabus' }
            ]).map((doc) => (
              <div
                key={doc.id}
                className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-[#0070C0] shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                      {doc.category} · {doc.fileSize}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mt-0.5">
                      {doc.title}
                    </h4>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(doc.title)}
                  icon={<Download className="w-3.5 h-3.5" />}
                >
                  Télécharger
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 12. GALERIE DE TERRAIN */}
        {/* ========================================================================= */}
        <section id="galerie" className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
              12. Galerie & Témoignages de Terrain
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#262626]">
              Immersions documentaires & promotions passées
            </h2>
            <p className="text-sm text-slate-600">
              Photographies et comptes-rendus visuels des résidences, jurys et cérémonies de certification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(program.gallery || [
              { id: 'gal-1', title: 'Résidence Régionale', caption: 'Séminaire stratégique des lauréats.', category: 'Immersion' },
              { id: 'gal-2', title: 'Grand Oral Statutaire', caption: 'Soutenance devant les pairs.', category: 'Évaluation' },
              { id: 'gal-3', title: 'Atelier de Simulation', caption: 'Résolution de crise d’État.', category: 'Cas pratique' },
              { id: 'gal-4', title: 'Prestation de Serment', caption: 'Engagement déontologique solennel.', category: 'Certification' }
            ]).map((item) => (
              <div
                key={item.id}
                className="group rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all"
              >
                {/* Visual placeholder with institutional gradient and badge */}
                <div className="h-40 bg-gradient-to-br from-[#262626] to-slate-800 p-4 flex flex-col justify-between text-white relative">
                  <span className="self-start text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-[#FF6600] font-bold border border-white/10 uppercase">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
                    <ImageIcon className="w-3.5 h-3.5 text-[#0070C0]" />
                    <span>Archive TSF Officielle</span>
                  </div>
                </div>

                <div className="p-3.5 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0070C0] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 13. RÉSULTATS & IMPACT MESURÉ */}
        {/* ========================================================================= */}
        <section id="resultats" className="p-6 sm:p-10 rounded-2xl bg-[#262626] text-white border border-[#404040]/40 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6600]">
              13. Résultats Consolidés
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Bilan des accomplissements & retours d’expérience
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {program.results?.impactStatement || 'Mesure indépendante de la création de valeur pour les lauréats, leurs employeurs et leurs communautés d’origine.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {(program.results?.achievements || [
              'Taux de fidélisation continental supérieur à 90% parmi les certifiés.',
              'Création vérifiée de micro-entreprises viables dans 150 localités.',
              'Reconnaissance unanime de l’intégrité et de la rigueur par les employeurs.'
            ]).map((ach, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[#0070C0]">
                  <Award className="w-4 h-4 text-[#FF6600]" />
                  <span>Résultat Validé #{idx + 1}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {ach}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 14. CALL TO ACTION FINAL */}
        {/* ========================================================================= */}
        <section id="cta" className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-blue-50/60 via-white to-orange-50/40 border border-slate-200 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
              14. Engagement & Candidature
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#262626] tracking-tight">
              Prendre part à la prochaine promotion de {program.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Que vous soyez un candidat à la recherche d’un accélérateur de destin, ou une institution désireuse de parrainer des bourses d’excellence, contactez dès aujourd’hui le secrétariat officiel TSF.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/talents/inscription')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Postuler au programme
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/partenaires')}
              className="bg-white"
            >
              Devenir partenaire ou mécène
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/contact')}
            >
              Contacter le secrétariat
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
};
