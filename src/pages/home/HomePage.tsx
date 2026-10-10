import React, { useState } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Section, SectionHeader } from '../../components/layout/Section';
import { TalentNetworkVisual } from '../../components/ui/TalentNetworkVisual';
import { MethodologyPillars } from '../../components/data/MethodologyPillars';
import { AnimatedCounter } from '../../components/ui/AnimatedCounter';
import {
  PROGRAMS_CATALOG,
  OPPORTUNITIES_LIST,
  SAMPLE_TALENTS,
  INSTITUTION_INFO
} from '../../data/institutionData';
import {
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Target,
  Sparkles,
  Layers,
  Award,
  Globe2,
  TrendingUp,
  Cpu,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Building2,
  Check,
  Quote,
  Users,
  Compass,
  FileText,
  Search,
  MapPin,
  ExternalLink,
  GraduationCap,
  Scale
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const [activeTalentIndex, setActiveTalentIndex] = useState(0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Enriched real human trajectories for the Talents section
  const enrichedTalents = [
    {
      id: 't-1',
      name: 'Dr. Aminata Traoré',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      territory: 'Sénégal · Dakar & Saint-Louis',
      domain: 'Intelligence Artificielle & Santé Publique',
      role: 'Directrice de Recherche Épidémiologique à l’Institut Pasteur',
      cohort: 'Horizon Excellence · Promotion 2024',
      grade: 'Grade A — Félicitations du Jury International',
      story: 'Repérée lors d’un hackathon universitaire à Saint-Louis sans réseau préexistant, Aminata a conçu un algorithme prédictif autonome capable d’anticiper les foyers épidémiques saisonniers avec 3 semaines d’avance.',
      trajectory: [
        { year: '2023', stage: 'Détection en région', detail: 'Score cognitif 99e percentile au banc d’essai TSF' },
        { year: '2024', stage: 'Incubation & Grand Oral', detail: 'Immersion de 12 mois et soutenance devant le COS' },
        { year: '2025', stage: 'Certification & Propulsion', detail: 'Affectation stratégique et dotation de recherche' },
        { year: '2026', stage: 'Impact Continental', detail: 'Déploiement opérationnel dans 7 pays sahéliens' }
      ],
      impactMetric: '7 pays protégés · 12M de citoyens sous surveillance préventive'
    },
    {
      id: 't-2',
      name: 'Ing. Kwame Mensah',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      territory: 'Ghana / Rwanda · Accra & Kigali',
      domain: 'Systèmes Électriques & Micro-Grids Solaires',
      role: 'Fondateur & Directeur Technique de VoltaicGrid Labs',
      cohort: 'SourceFund Africa · Promotion 2025',
      grade: 'Grade A — Innovation Industrielle Énergétique',
      story: 'Diplômé autodidacte ayant conçu un onduleur hybride à base de composants recyclés pour maintenir les centres de santé sous tension permanente en zone rurale non raccordée.',
      trajectory: [
        { year: '2023', stage: 'Signalement citoyen', detail: 'Dossier transmis par un enseignant rural ghanéen' },
        { year: '2024', stage: 'Prototypage certifié', detail: 'Homologation de sécurité électrique aux normes TSF' },
        { year: '2025', stage: 'Financement SourceFund', detail: 'Dotation d’amorçage en capital patient' },
        { year: '2026', stage: 'Passage à l’échelle', detail: '140 micro-réseaux ruraux déployés' }
      ],
      impactMetric: '140 dispensaires électrifiés · 45 emplois techniques pérennes'
    },
    {
      id: 't-3',
      name: 'Sarah Benali',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
      territory: 'Maroc / Côte d’Ivoire · Casablanca & Abidjan',
      domain: 'Macroéconomie & Financement d’Infrastructures',
      role: 'Analyste Sénior en Dettes Souveraines (Banque Multilatérale)',
      cohort: 'Horizon Excellence · Promotion 2025',
      grade: 'Grade A — Major de Cohorte Statutaire',
      story: 'Spécialiste de la titrisation des obligations vertes et de la renégociation de passifs publics d’États africains, Sarah a refusé plusieurs offres de banques new-yorkaises pour se consacrer aux souverainetés financières continentales.',
      trajectory: [
        { year: '2024', stage: 'Sélection nationale', detail: 'Concours d’excellence sur cas macroéconomiques réels' },
        { year: '2024', stage: 'Résidence de gouvernance', detail: 'Simulations de crises de liquidité d’État' },
        { year: '2025', stage: 'Passeport TSF délivré', detail: 'Accréditation auprès des bailleurs régionaux' },
        { year: '2026', stage: 'Gouvernance publique', detail: 'Conseillère technique sur émission obligataire verte' }
      ],
      impactMetric: '1.2 Md$ d’obligations souveraines restructurées avec impact social'
    }
  ];

  const currentTalent = enrichedTalents[activeTalentIndex];

  return (
    <div className="pb-16 sm:pb-24 overflow-x-hidden bg-white text-[#262626]">
      {/* ========================================================================= */}
      {/* 1. HERO INSTITUTIONNEL DE HAUT NIVEAU                                      */}
      {/* ========================================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 border-b border-[#E8E8E8] bg-white">
        <Container size="wide">
          {/* Top Operational Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E8E8] text-xs font-mono text-[#595959]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0070C0] animate-pulse" />
              <span className="font-bold text-[#0070C0] tracking-wider uppercase">
                ORGANISATION PANAFRICAINE D’INTÉRÊT GÉNÉRAL
              </span>
              <span className="text-[#A0A0A0] hidden sm:inline">·</span>
              <span className="hidden sm:inline">Accords de Siège Régionaux</span>
            </div>

            <div className="flex items-center gap-4 text-[#7D7D7D]">
              <span>Session Officielle 2026 Ouverte</span>
              <span>·</span>
              <span className="text-[#262626] font-semibold">18 Hubs Territoriaux</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Sovereign Brand Headline */}
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] text-[#0070C0] uppercase block">
                  TALENTS SANS FRONTIÈRES
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#262626] font-sans leading-[1.08]">
                  Libérer le potentiel.
                </h1>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0070C0] font-sans leading-[1.08]">
                  Connecter les talents.
                </h1>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FF6600] font-sans leading-[1.08]">
                  Accélérer l’impact.
                </h1>
              </div>

              {/* Mission Statement */}
              <p className="text-base sm:text-lg text-[#595959] leading-relaxed max-w-2xl font-sans">
                Talents Sans Frontières est l’infrastructure indépendante qui détecte, certifie et propulse le capital intellectuel africain vers les postes de décision et les projets souverains du continent.
              </p>

              {/* Action Buttons: Blue for Structure, Orange for Priority Conversion */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/talents/inscription')}
                  icon={<ArrowRight className="w-4 h-4 text-white" />}
                >
                  JE SUIS UN TALENT
                </Button>

                <Button
                  variant="accent"
                  size="lg"
                  onClick={() => navigate('/partenaires')}
                >
                  REJOINDRE L'ALLIANCE PARTENAIRE
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection('parcours')}
                >
                  DÉCOUVRIR L'INFRASTRUCTURE
                </Button>
              </div>

              {/* Trust Indicators bar */}
              <div className="pt-6 border-t border-[#E8E8E8] grid grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[#7D7D7D] block">Présence</span>
                  <strong className="text-[#262626] text-sm sm:text-base font-bold">18 Pays</strong>
                </div>
                <div>
                  <span className="text-[#7D7D7D] block">Vivier Évalué</span>
                  <strong className="text-[#0070C0] text-sm sm:text-base font-bold">24 800+</strong>
                </div>
                <div>
                  <span className="text-[#7D7D7D] block">Rétention Afrique</span>
                  <strong className="text-[#FF6600] text-sm sm:text-base font-bold">84.2%</strong>
                </div>
              </div>
            </div>

            {/* Right Architectural Panel: Sovereign Registry & Network */}
            <div className="lg:col-span-5">
              <div className="bg-[#F5F5F7] p-6 sm:p-8 rounded-2xl border border-[#E8E8E8] shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E8]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0070C0]" />
                    <span className="text-xs font-mono font-bold text-[#0070C0] uppercase tracking-wider">
                      CARTOGRAPHIE DU RÉSEAU CONTINENTAL
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#0E8A5E] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0] font-semibold">
                    TEMPS RÉEL
                  </span>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-white border border-[#E8E8E8] p-4">
                  <TalentNetworkVisual />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-white border border-[#E8E8E8] rounded-xl space-y-1">
                    <span className="text-[10px] text-[#7D7D7D] uppercase">Sélectivité Statutaire</span>
                    <strong className="text-[#262626] text-sm font-bold block">12% Admis</strong>
                    <span className="text-[10px] text-[#595959]">Sur épreuves anonymisées</span>
                  </div>

                  <div className="p-3 bg-white border border-[#E8E8E8] rounded-xl space-y-1">
                    <span className="text-[10px] text-[#7D7D7D] uppercase">Label Certification</span>
                    <strong className="text-[#0070C0] text-sm font-bold block">Grade A, B+, B</strong>
                    <span className="text-[10px] text-[#595959]">Vérifiable par blockchain</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-[11px] text-[#7D7D7D] font-mono">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0070C0]" />
                    <span>Agrément International & Audit Indépendant</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate('/certification/verify')}
                    className="text-[#0070C0] font-bold hover:underline"
                  >
                    Vérifier un titre →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. ACCÈS RAPIDES ÉDITORIAUX (COMPOSITION SOPHISTIQUÉE, PAS 6 CARTES CLONES) */}
      {/* ========================================================================= */}
      <section id="parcours" className="py-16 sm:py-20 border-b border-[#E8E8E8] bg-[#F5F5F7]">
        <Container size="wide">
          <div className="max-w-3xl mb-10 space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
              Architecture Opérationnelle
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#262626]">
              Portails & Parcours Utilisateurs TSF
            </h2>
            <p className="text-sm sm:text-base text-[#595959] leading-relaxed">
              Que vous soyez un haut potentiel en quête d'accélération, un recruteur d'élite ou une institution partenaire, chaque interface est taillée sur mesure.
            </p>
          </div>

          {/* Asymmetrical Editorial Gateway Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* PORTAL 1 & 2: TALENT & OPPORTUNITÉ (PRIMARY CONVERSION AXIS) */}
            <div className="lg:col-span-5 bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#EBF5FC] text-[#0070C0] font-mono text-xs font-bold uppercase">
                    Portail 01 · Candidats & Hauts Potentiels
                  </span>
                  <GraduationCap className="w-5 h-5 text-[#0070C0]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#262626] font-sans">
                  Guichet des Talents & Candidatures
                </h3>

                <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                  Passez le banc d’essai cognitif officiel, soumettez vos preuves de travail et accédez aux bourses d’excellence intégrales sans barrière sociale ni financière.
                </p>

                <div className="p-3 bg-[#F5F5F7] rounded-xl text-xs font-mono space-y-1.5 text-[#595959]">
                  <div className="flex items-center justify-between text-[#262626]">
                    <span>Cursus ouverts :</span>
                    <strong className="text-[#0070C0]">Horizon Excellence 2026</strong>
                  </div>
                  <div className="flex items-center justify-between text-[#262626]">
                    <span>Épreuve préliminaire :</span>
                    <span>Test logique en ligne (15 min)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E8E8] flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/talents/inscription')}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Déposer mon dossier de talent
                </Button>

                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => navigate('/talents')}
                >
                  Voir le vivier certifié
                </Button>
              </div>
            </div>

            {/* PORTAL 2 & 3: PROGRAMMES & OPPORTUNITÉS */}
            <div className="lg:col-span-4 bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-orange-50 text-[#FF6600] font-mono text-xs font-bold uppercase">
                    Portail 02 · Marché de l'Emploi
                  </span>
                  <Briefcase className="w-5 h-5 text-[#FF6600]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#262626] font-sans">
                  Opportunités & Bourses en Cours
                </h3>

                <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                  Postes de direction, résidences d'État, fellowships d’immersion et amorçages en capital patient homologués par TSF.
                </p>

                <div className="space-y-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-lg border border-[#E8E8E8] bg-slate-50 flex items-center justify-between font-mono">
                    <span className="text-[#262626] font-semibold">Postes Homologués</span>
                    <span className="text-[#FF6600] font-bold">280+ Places Ouvertes</span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-[#E8E8E8] bg-slate-50 flex items-center justify-between font-mono">
                    <span className="text-[#262626] font-semibold">Dotations Disponibles</span>
                    <span className="text-[#0E8A5E] font-bold">3,5 M$ en bourses</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E8E8]">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={() => navigate('/opportunites')}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explorer la Marketplace
                </Button>
              </div>
            </div>

            {/* PORTAL 4, 5, 6: THREE STRATIFIED ACCESS ROADS */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {/* Partenaire */}
              <div
                onClick={() => navigate('/partenaires')}
                className="p-5 bg-white border border-[#E8E8E8] rounded-xl hover:border-[#0070C0] hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#0070C0] font-bold uppercase">Alliances & Mécènes</span>
                  <Building2 className="w-4 h-4 text-[#0070C0]" />
                </div>
                <h4 className="text-sm font-bold text-[#262626] group-hover:text-[#0070C0] transition-colors">
                  Espace Partenaires
                </h4>
                <p className="text-[11px] text-[#595959] mt-1 leading-snug">
                  Co-financez des bourses, accréditez vos recrues et accédez au vivier avant-première.
                </p>
              </div>

              {/* Programmes */}
              <div
                onClick={() => navigate('/programmes')}
                className="p-5 bg-white border border-[#E8E8E8] rounded-xl hover:border-[#FF6600] hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#FF6600] font-bold uppercase">Cursus d'Excellence</span>
                  <BookOpen className="w-4 h-4 text-[#FF6600]" />
                </div>
                <h4 className="text-sm font-bold text-[#262626] group-hover:text-[#FF6600] transition-colors">
                  Catalogue des Programmes
                </h4>
                <p className="text-[11px] text-[#595959] mt-1 leading-snug">
                  4 programmes statutaires de la détection terrain au fellowship d'État.
                </p>
              </div>

              {/* WikiJob & Organisation */}
              <div
                onClick={() => navigate('/wikijob')}
                className="p-5 bg-white border border-[#E8E8E8] rounded-xl hover:border-[#0E8A5E] hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#0E8A5E] font-bold uppercase">Observatoire Public</span>
                  <Globe2 className="w-4 h-4 text-[#0E8A5E]" />
                </div>
                <h4 className="text-sm font-bold text-[#262626] group-hover:text-[#0E8A5E] transition-colors">
                  WikiJob & Données de l'Emploi
                </h4>
                <p className="text-[11px] text-[#595959] mt-1 leading-snug">
                  Baromètre des salaires et métiers en tension certifiés par TSF.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. VÉRITABLE SECTION IMPACT (PAS KPI CARD x 4)                             */}
      {/* ========================================================================= */}
      <section id="impact" className="py-20 border-b border-[#E8E8E8] bg-white">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative Pillar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0070C0] text-xs font-mono font-bold">
                <Scale className="w-3.5 h-3.5" />
                <span>RÉSULTATS AUDITÉS & OPPOSABLES</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#262626] leading-tight">
                Une mesure d’impact indépendante et vérifiée.
              </h2>

              <p className="text-sm sm:text-base text-[#595959] leading-relaxed">
                Talents Sans Frontières soumet l'intégralité de ses cohortes, financements et retombées économiques à un audit annuel certifié par des commissaires aux comptes indépendants. Aucun chiffre n’est estimé : chaque métrique est auditable sur pièces.
              </p>

              <div className="p-4 bg-[#F5F5F7] border border-[#E8E8E8] rounded-xl space-y-2">
                <span className="text-xs font-mono font-bold text-[#262626] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0E8A5E]" />
                  Garantie de Traçabilité des Bourses
                </span>
                <p className="text-xs text-[#595959] leading-relaxed">
                  100% des financements mobilisés sont tracés de la convention de mécénat jusqu'à la titularisation du lauréat dans son emploi d'impact.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => navigate('/impact')}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Consulter le rapport d’impact officiel 2026
                </Button>
              </div>
            </div>

            {/* Right Rich Statistics Matrix */}
            <div className="lg:col-span-7 bg-[#F5F5F7] border border-[#E8E8E8] rounded-3xl p-6 sm:p-10 space-y-8">
              {/* Highlight 1: The Sovereign Retention Benchmark */}
              <div className="p-6 bg-white border border-[#E8E8E8] rounded-2xl shadow-2xs space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#7D7D7D] font-bold">
                    Taux de Rétention & Réinvestissement Continental
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-50 text-[#0E8A5E] font-bold border border-emerald-200">
                    +52 pts vs moyenne du marché
                  </span>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-4xl sm:text-6xl font-extrabold text-[#0070C0] font-mono tracking-tight">
                    84.2%
                  </span>
                  <span className="text-xs sm:text-sm text-[#595959] max-w-sm leading-snug">
                    des boursiers TSF travaillent ou fondent des entreprises sur le sol africain 3 ans après leur certification.
                  </span>
                </div>

                {/* Comparative bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-[#0070C0] rounded-full" style={{ width: '84.2%' }} />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-[#7D7D7D]">
                    <span>Moyenne continentale non encadrée : 32%</span>
                    <strong className="text-[#0070C0]">TSF : 84.2%</strong>
                  </div>
                </div>
              </div>

              {/* 3 Secondary Strategic Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Metric 1 */}
                <div className="p-5 bg-white border border-[#E8E8E8] rounded-2xl space-y-2">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#FF6600] block">
                    12.4x
                  </span>
                  <strong className="text-xs font-bold text-[#262626] block font-sans">
                    Multiplicateur SROI
                  </strong>
                  <p className="text-[11px] text-[#595959] leading-tight font-sans">
                    1$ investi génère 12,4$ de valeur économique locale vérifiée.
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="p-5 bg-white border border-[#E8E8E8] rounded-2xl space-y-2">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0E8A5E] block">
                    50/50
                  </span>
                  <strong className="text-xs font-bold text-[#262626] block font-sans">
                    Parité Stricte STEM
                  </strong>
                  <p className="text-[11px] text-[#595959] leading-tight font-sans">
                    Égalité absolue de genre grâce à l'évaluation cognitive en aveugle.
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="p-5 bg-white border border-[#E8E8E8] rounded-2xl space-y-2">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#262626] block">
                    98.2%
                  </span>
                  <strong className="text-xs font-bold text-[#262626] block font-sans">
                    Insertion à 90 Jours
                  </strong>
                  <p className="text-[11px] text-[#595959] leading-tight font-sans">
                    Placement direct dans les ministères, banques et multinationales partenaires.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. LES PROGRAMMES TSF AVEC VRAIE HIÉRARCHIE ÉDITORIALE                     */}
      {/* ========================================================================= */}
      <section id="programmes" className="py-20 border-b border-[#E8E8E8] bg-[#F5F5F7]">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-[#E8E8E8]">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
                Dispositifs Panafricains Homologués
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#262626]">
                Les 4 Programmes Stratégiques TSF
              </h2>
              <p className="text-sm text-[#595959]">
                Une offre graduée couvrant chaque palier critique de la trajectoire humaine, de la détection populaire au leadership d’État.
              </p>
            </div>

            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/programmes')}
              icon={<ChevronRight className="w-4 h-4" />}
            >
              Consulter le catalogue complet
            </Button>
          </div>

          {/* Editorial Stacked Programs Showcase */}
          <div className="space-y-6">
            {PROGRAMS_CATALOG.slice(0, 4).map((prg, idx) => (
              <div
                key={prg.id}
                className="bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 hover:border-[#0070C0]/50 transition-all shadow-2xs"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Identification Column */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#EBF5FC] text-[#0070C0] font-mono text-[11px] font-bold uppercase">
                        {prg.kicker}
                      </span>
                      {prg.acronym && (
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-[#595959] font-mono text-[11px] font-bold">
                          [{prg.acronym}]
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#262626]">
                      {prg.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                      {prg.summary}
                    </p>
                  </div>

                  {/* Operational Details Grid */}
                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 sm:py-0 border-y sm:border-y-0 sm:border-x border-[#E8E8E8] sm:px-6 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#7D7D7D] font-bold block">
                        Bénéficiaires Ciblés
                      </span>
                      <p className="text-slate-800 font-medium leading-snug">
                        {prg.targetAudience.slice(0, 70)}...
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#7D7D7D] font-bold block">
                        Territoire & Hubs
                      </span>
                      <p className="text-slate-800 font-medium leading-snug">
                        {prg.territory || '18 pays d’Afrique subsaharienne'}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#7D7D7D] font-bold block">
                        Résultats Validés
                      </span>
                      <p className="text-[#0E8A5E] font-mono font-bold leading-snug">
                        {prg.results?.achievements?.[0] || '100% de lauréats homologués'}
                      </p>
                    </div>
                  </div>

                  {/* Action Column */}
                  <div className="lg:col-span-2 flex flex-col justify-center items-start lg:items-end gap-2 pt-2 lg:pt-0">
                    <Button
                      variant={idx === 0 ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => navigate((prg.path || `/programmes/${prg.slug}`) as any)}
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Détails du cursus
                    </Button>
                    <span className="text-[10px] font-mono text-[#7D7D7D]">
                      Réf: TSF-PRG-0{idx + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 5. TALENTS : PERSONNES & PARCOURS (PAS DE CARTES SAAS)                      */}
      {/* ========================================================================= */}
      <section id="talents-trajectoires" className="py-20 border-b border-[#E8E8E8] bg-white">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-[#E8E8E8]">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6600]">
                Preuve Humaine & Trajectoires Réelles
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#262626]">
                Des Personnes, des Parcours, des Souverainetés
              </h2>
              <p className="text-sm text-[#595959]">
                Chaque talent TSF est un destin transformé qui, en retour, transforme son territoire d'origine.
              </p>
            </div>

            {/* Switch Talent Selector */}
            <div className="flex items-center gap-2">
              {enrichedTalents.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTalentIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeTalentIndex === idx
                      ? 'bg-[#0070C0] text-white font-bold'
                      : 'bg-[#F5F5F7] text-[#595959] hover:bg-slate-200'
                  }`}
                >
                  {t.name.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Deep Talent Profile */}
          <div className="bg-[#F5F5F7] border border-[#E8E8E8] rounded-3xl p-6 sm:p-10 shadow-2xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Photo & Identity Column */}
              <div className="lg:col-span-4 space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-4/5 bg-slate-200 border border-[#E8E8E8] shadow-sm">
                  <img
                    src={currentTalent.avatarUrl}
                    alt={currentTalent.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6600] font-bold">
                      {currentTalent.cohort}
                    </span>
                    <h3 className="text-xl font-bold font-sans">
                      {currentTalent.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-mono">
                      {currentTalent.territory}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-[#E8E8E8] rounded-xl space-y-1.5 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#0070C0] font-bold">
                    <Award className="w-4 h-4" />
                    <span>{currentTalent.grade}</span>
                  </div>
                  <p className="text-[#595959] text-[11px] leading-tight">
                    Poste actuel : <strong>{currentTalent.role}</strong>
                  </p>
                </div>
              </div>

              {/* Story & Progression Column */}
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[#0070C0] font-mono text-xs font-bold uppercase">
                      {currentTalent.domain}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#262626] font-sans">
                    « {currentTalent.story} »
                  </h3>
                </div>

                {/* Progression Stepper */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#7D7D7D] font-bold block">
                    Trajectoire de Transformation Validée :
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {currentTalent.trajectory.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 bg-white border border-[#E8E8E8] rounded-xl space-y-1 relative"
                      >
                        <div className="flex items-center justify-between text-xs font-mono font-bold text-[#0070C0]">
                          <span>{step.year}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0070C0]" />
                        </div>
                        <h4 className="text-xs font-bold text-[#262626] leading-snug">
                          {step.stage}
                        </h4>
                        <p className="text-[11px] text-[#595959] leading-tight">
                          {step.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Measurable Impact Highlight */}
                <div className="p-4 bg-white border border-[#E8E8E8] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0E8A5E] flex items-center justify-center font-bold shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#7D7D7D] font-bold block">
                        Impact Réel Mesuré
                      </span>
                      <strong className="text-xs sm:text-sm text-[#262626]">
                        {currentTalent.impactMetric}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/talents')}
                      icon={<ExternalLink className="w-3.5 h-3.5" />}
                    >
                      Dossier complet
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate('/contact')}
                    >
                      Entrer en relation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 6. MÉTHODE TSF : ARCHITECTURE EN 4 TEMPS                                   */}
      {/* ========================================================================= */}
      <section id="methode" className="py-20 border-b border-[#E8E8E8] bg-[#F5F5F7]">
        <Container size="wide">
          <SectionHeader
            kicker="Ingénierie Opérationnelle"
            title="LA MÉTHODE TSF"
            description="Une chaîne de valeur fermée en quatre temps indissociables. Chaque étape est adossée à un référentiel audité pour garantir une rigueur et une égalité des chances absolues."
            actions={
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/organisation/methode')}
              >
                Détails de la méthodologie →
              </Button>
            }
            align="split"
          />

          <MethodologyPillars />
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 7. ALLIANCE PARTENARIALE SOUVERAINE                                       */}
      {/* ========================================================================= */}
      <section id="partenariats" className="py-20 border-b border-[#E8E8E8] bg-white">
        <Container size="wide">
          <div className="max-w-3xl mb-12 space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
              Cadre d’Alliance Institutionnelle
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#262626]">
              Pourquoi Coopérer avec TSF ?
            </h2>
            <p className="text-sm text-[#595959]">
              Banques de développement, ministères de tutelle, multinationales et fondations : investir dans TSF, c’est co-bâtir l’infrastructure humaine souveraine de l’Afrique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F5F5F7] border border-[#E8E8E8] rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0070C0] text-white flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#262626]">
                1. Méthode Propriétaire Audité
              </h3>
              <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                Une sélection psychométrique et scientifique éliminant le clientélisme pour n'isoler que la puissance d'analyse pure et l'éthique de terrain.
              </p>
            </div>

            <div className="p-6 bg-[#F5F5F7] border border-[#E8E8E8] rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FF6600] text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#262626]">
                2. Gouvernance Irréprochable
              </h3>
              <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                Séparation statutaire stricte entre le collège des bailleurs et la souveraineté des jurys académiques et commissaires aux comptes.
              </p>
            </div>

            <div className="p-6 bg-[#F5F5F7] border border-[#E8E8E8] rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0E8A5E] text-white flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#262626]">
                3. Retour d'Impact Opposable
              </h3>
              <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                Mesure certifiée de la valeur créée : taux d'insertion supérieur à 98% et rétention continentale vérifiée de 84.2%.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 8. GRAND CTA INSTITUTIONNEL SOBRE                                         */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <Container size="wide">
          <div className="bg-[#121212] text-white rounded-3xl p-8 sm:p-14 lg:p-18 text-center border border-[#2B2B2B] shadow-xl relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF6600] font-bold block">
                MOUVEMENT PANAFRICAIN D'INTÉRÊT GÉNÉRAL
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans leading-[1.08]">
                Et si votre prochain talent était déjà là ?
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans font-light">
                Que vous soyez un jeune prodige cherchant son tremplin ou une institution désireuse de parrainer l'excellence africaine, rejoignez dès aujourd'hui l'infrastructure TSF.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/talents/inscription')}
                  icon={<ArrowRight className="w-4 h-4 text-white" />}
                >
                  DÉPOSER UNE CANDIDATURE
                </Button>

                <Button
                  variant="accent"
                  size="lg"
                  onClick={() => navigate('/partenaires')}
                >
                  DEVENIR PARTENAIRE OFFICIEL
                </Button>
              </div>

              <div className="pt-8 border-t border-[#262626] flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-mono text-slate-400">
                <span>Siège Opérationnel Cotonou</span>
                <span>·</span>
                <span>Hub Kigali Innovation City</span>
                <span>·</span>
                <a
                  href="mailto:contact@talents-sans-frontieres.org"
                  className="text-[#FF6600] hover:underline"
                >
                  contact@talents-sans-frontieres.org
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
