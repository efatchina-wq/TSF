import React, { useState } from 'react';
import { Container } from '../../components/ui/Container';
import { PageHeader } from '../../components/layout/PageHeader';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Input,
  Select,
  Checkbox,
  Radio,
  SearchBar,
  Alert,
  Tabs,
  Modal,
  Drawer,
  Tooltip,
  Dropdown,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Pagination,
  Avatar,
  Display,
  H1,
  H2,
  H3,
  H4,
  BodyLarge,
  Body,
  BodySmall,
  Small,
  Caption,
  Label,
  DataText,
  AnimatedCounter,
  TSFLogo,
  ProgressBar
} from '../../components/ui';
import { Metric } from '../../components/data/Metric';
import { MetricCard } from '../../components/data/MetricCard';
import { Progress } from '../../components/data/Progress';
import { Timeline } from '../../components/data/Timeline';
import { Stat } from '../../components/data/Stat';
import { ChartContainer } from '../../components/data/ChartContainer';
import { DataBadge } from '../../components/data/DataBadge';

// The 9 Card Families
import { InstitutionCard } from '../../components/cards/InstitutionCard';
import { ProgramCard } from '../../components/cards/ProgramCard';
import { TalentCard } from '../../components/cards/TalentCard';
import { PartnerCard } from '../../components/cards/PartnerCard';
import { OpportunityCard } from '../../components/cards/OpportunityCard';
import { ImpactCard } from '../../components/cards/ImpactCard';
import { StoryCard } from '../../components/cards/StoryCard';
import { MediaCard } from '../../components/cards/MediaCard';
import { ReportCard } from '../../components/cards/ReportCard';

import {
  PROGRAMS_CATALOG,
  OPPORTUNITIES_LIST,
  SAMPLE_TALENTS,
  SAMPLE_STORIES,
  SAMPLE_PARTNERS,
  SAMPLE_MEDIA_ITEMS,
  CHART_DATA_SECTORS,
  CHART_DATA_REGIONS
} from '../../data/institutionData';

import {
  Palette,
  Type,
  LayoutGrid,
  BarChart2,
  Sliders,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight,
  FileText,
  AlertTriangle,
  CheckCircle,
  MoreVertical,
  ExternalLink,
  Download,
  Filter,
  Eye
} from 'lucide-react';
import { TSF_INTERFACE_AUDIT_REPORT, tsfColors } from '../../design-system';

export const DesignSystemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audit' | 'tokens' | 'typography' | 'components' | 'cards' | 'data' | 'interactions' | 'responsive'>('audit');
  const [testProgress, setTestProgress] = useState<number>(68);
  const [searchVal, setSearchVal] = useState<string>('Ingénieur Système d’Insertion');
  const [inputVal, setInputVal] = useState<string>('aichatou.souleymane@tsf.africa');
  const [selectVal, setSelectVal] = useState<string>('cotonou');
  const [checkVal, setCheckVal] = useState<boolean>(true);
  const [radioVal, setRadioVal] = useState<string>('opt1');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [demoTab, setDemoTab] = useState<string>('tab1');
  const [demoTablePage, setDemoTablePage] = useState<number>(1);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  return (
    <div className="pb-24 space-y-12">
      <PageHeader
        kicker="Système de Design Officiel TSF"
        title="TSF Sovereign Design System & Audit"
        description="L'infrastructure visuelle, typographique et quantitative régissant l'ensemble des interfaces de Talents Sans Frontières — Couleurs officielles #0070C0, #FF6600, #404040, #FFFFFF."
      >
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-2 border-b border-slate-200">
          {[
            { id: 'audit', label: '0. Diagnostic & Audit UI', icon: FileText },
            { id: 'tokens', label: '1. Identité & Couleurs TSF', icon: Palette },
            { id: 'typography', label: '2. Hiérarchie Typographique', icon: Type },
            { id: 'components', label: '3. Composants Socles UI', icon: Layers },
            { id: 'cards', label: '4. Les 9 Familles de Cartes', icon: LayoutGrid },
            { id: 'data', label: '5. Système Data & Métriques', icon: BarChart2 },
            { id: 'interactions', label: '6. Micro-Interactions', icon: Sliders },
            { id: 'responsive', label: '7. Spécifications Mobile-First', icon: Smartphone }
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 cursor-pointer -mb-[1px] ${
                  isCurrent
                    ? 'border-[#0070C0] text-[#0070C0]'
                    : 'border-transparent text-[#7D7D7D] hover:text-[#404040]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#FF6600]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </PageHeader>

      <Container>
        {actionNotice && (
          <div className="mb-6">
            <Alert variant="info" onDismiss={() => setActionNotice(null)}>
              {actionNotice}
            </Alert>
          </div>
        )}

        {/* TAB 0: INTERFACE AUDIT & DIAGNOSTIC */}
        {activeTab === 'audit' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6600]">
                Audit Systémique Préalable
              </span>
              <H2>Diagnostic de l'interface existante & Plan de refonte</H2>
              <Body size="lead">
                Analyse rigoureuse de toutes les pages du produit. Identification des incohérences chromatiques, de l'overdose de capsules (pills) et des dérives "AI-generated" avant d'appliquer la nouvelle grammaire visuelle souveraine.
              </Body>
            </div>

            {/* Audit Metrics Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border border-[#E8E8E8] rounded-xl shadow-xs">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#7D7D7D] uppercase font-bold">Pages analysées</span>
                <strong className="text-2xl font-bold text-[#404040] block">{TSF_INTERFACE_AUDIT_REPORT.summary.examinedPagesCount}</strong>
                <span className="text-[11px] text-[#7D7D7D]">100% de la surface applicative</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#7D7D7D] uppercase font-bold">Points diagnostiqués</span>
                <strong className="text-2xl font-bold text-[#0070C0] block">{TSF_INTERFACE_AUDIT_REPORT.summary.totalFindings}</strong>
                <span className="text-[11px] text-[#7D7D7D]">10 catégories architecturales</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#DC2626] uppercase font-bold">Anomalies Critiques</span>
                <strong className="text-2xl font-bold text-[#DC2626] block">{TSF_INTERFACE_AUDIT_REPORT.summary.criticalCount}</strong>
                <span className="text-[11px] text-[#7D7D7D]">Palette navy/marron & gradients</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#FF6600] uppercase font-bold">Impact Fonctionnel</span>
                <strong className="text-2xl font-bold text-[#FF6600] block">0 CASSURE</strong>
                <span className="text-[11px] text-[#7D7D7D]">Règle absolue : aucune perte métier</span>
              </div>
            </div>

            {/* Findings List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <H3>Registre exhaustif des constats ergonomiques & graphiques</H3>
                <span className="text-xs font-mono text-[#7D7D7D]">10 constats clés documentés</span>
              </div>

              <div className="space-y-3">
                {TSF_INTERFACE_AUDIT_REPORT.findings.map((finding) => {
                  const isCrit = finding.severity === 'CRITIQUE';
                  const isMaj = finding.severity === 'MAJEURE';

                  return (
                    <div
                      key={finding.id}
                      className="p-5 bg-white border border-[#E8E8E8] rounded-xl hover:border-[#0070C0]/40 transition-colors shadow-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#0070C0]">{finding.id}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs font-semibold text-[#404040]">{finding.category}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs text-[#7D7D7D] font-mono">{finding.componentOrPage}</span>
                        </div>

                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            isCrit
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : isMaj
                              ? 'bg-orange-50 text-[#FF6600] border border-orange-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {finding.severity}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="space-y-1">
                          <span className="font-mono text-[#7D7D7D] text-[11px] block uppercase font-bold">Problème observé :</span>
                          <p className="text-[#404040] leading-relaxed">{finding.observedIssue}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono text-[#0070C0] text-[11px] block uppercase font-bold">Règle de design TSF :</span>
                          <p className="text-[#404040] leading-relaxed">{finding.tsfDesignRule}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono text-[#0E8A5E] text-[11px] block uppercase font-bold">Action de remédiation :</span>
                          <p className="text-[#404040] leading-relaxed">{finding.remediationPath}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5-Phase Migration Strategy */}
            <div className="p-6 bg-slate-50 border border-[#E8E8E8] rounded-xl space-y-4">
              <H3>Feuille de route de la refonte (Sans régression)</H3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {TSF_INTERFACE_AUDIT_REPORT.migrationStrategy.map((step, idx) => (
                  <div key={idx} className="p-4 bg-white border border-[#E8E8E8] rounded-lg space-y-2">
                    <span className="text-xs font-mono font-bold text-[#FF6600] block">{step.phase}</span>
                    <p className="text-xs text-[#404040] font-medium leading-snug">{step.focus}</p>
                    <p className="text-[11px] text-[#7D7D7D] pt-1 border-t border-slate-100 leading-normal">{step.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: TOKENS & COLOR SYSTEM */}
        {activeTab === 'tokens' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6600]">
                Charte Chromatique Officielle TSF
              </span>
              <H2>Bleu TSF (#0070C0) · Orange TSF (#FF6600) · Anthracite (#404040)</H2>
              <Body size="lead">
                Fidèle au logo institutionnel de Talents Sans Frontières. Les couleurs sont appliquées avec discipline : le bleu comme ancrage souverain, l'orange comme accent d'action chirurgical, l'anthracite pour la lisibilité et de vastes espaces blancs pour faire respirer la plateforme.
              </Body>
            </div>

            {/* Official Logo Display */}
            <div className="p-6 sm:p-8 bg-white border border-[#E8E8E8] rounded-xl space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#0070C0]">RÉFÉRENCE OFFICIELLE DE MARQUE</span>
                  <h4 className="text-lg font-bold text-[#404040] mt-0.5">Emblème & Logotype Talents Sans Frontières</h4>
                </div>
                <span className="text-xs font-mono text-[#7D7D7D] bg-slate-50 px-3 py-1 rounded border border-slate-200">
                  Vector SVG · Scalable · Accessible
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="p-6 bg-slate-50/70 border border-slate-200 rounded-lg flex flex-col items-center justify-center space-y-3 text-center">
                  <TSFLogo variant="horizontal" size="md" />
                  <span className="text-xs font-mono text-[#7D7D7D]">Variante Standard (En-tête & Documents)</span>
                </div>

                <div className="p-6 bg-slate-50/70 border border-slate-200 rounded-lg flex flex-col items-center justify-center space-y-3 text-center">
                  <TSFLogo variant="mark" size="lg" />
                  <span className="text-xs font-mono text-[#7D7D7D]">Emblème Isolé (Favicon, Badges, Sceau)</span>
                </div>

                <div className="p-6 bg-[#121212] border border-[#262626] rounded-lg flex flex-col items-center justify-center space-y-3 text-center">
                  <TSFLogo variant="monochrome-white" size="md" />
                  <span className="text-xs font-mono text-slate-400">Variante Inverse (Pied de page & Écrans sombres)</span>
                </div>
              </div>
            </div>

            {/* 60 - 30 - 10 Rule Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 60% Canvas */}
              <div className="p-6 bg-white border border-[#E8E8E8] rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#7D7D7D] font-bold">60% · Surfaces Neutres & Blanc</span>
                  <span className="w-4 h-4 rounded-full bg-[#FAFAFA] border border-slate-300" />
                </div>
                <div className="h-20 bg-[#FAFAFA] border border-[#E8E8E8] rounded-md flex items-center justify-center font-mono text-xs text-[#7D7D7D]">
                  #FAFAFA / #FFFFFF · Respiration
                </div>
                <p className="text-xs text-[#404040] leading-relaxed">
                  Surfaces blanches et blanc cassé dominantes pour éviter la saturation visuelle. Le design doit respirer avec de larges marges et une typographie aérée.
                </p>
              </div>

              {/* 30% Structural Blue */}
              <div className="p-6 bg-white border border-[#E8E8E8] rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#0070C0] font-bold">30% · Bleu TSF (#0070C0)</span>
                  <span className="w-4 h-4 rounded-full bg-[#0070C0]" />
                </div>
                <div className="h-20 bg-[#0070C0] text-white rounded-md flex items-center justify-center font-mono text-xs font-bold">
                  #0070C0 · Primary Brand Blue
                </div>
                <p className="text-xs text-[#404040] leading-relaxed">
                  Couleur institutionnelle principale : navigation, identité de marque, liens, titres secondaires, éléments sélectionnés et repères d'orientation.
                </p>
              </div>

              {/* 10% Accent Orange */}
              <div className="p-6 bg-white border border-[#E8E8E8] rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#FF6600] font-bold">10% · Orange TSF (#FF6600)</span>
                  <span className="w-4 h-4 rounded-full bg-[#FF6600]" />
                </div>
                <div className="h-20 bg-[#FF6600] text-white rounded-md flex items-center justify-center font-mono text-xs font-bold">
                  #FF6600 · Accent Propulsion Orange
                </div>
                <p className="text-xs text-[#404040] leading-relaxed">
                  Couleur d'accent réservée avec discipline : boutons d'action clés (CTAs), alertes prioritaires, opportunités à la une. Interdit de l'utiliser partout.
                </p>
              </div>
            </div>

            {/* Extended Token Swatches */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <H3>Nuancier Systémique Officiel & Tonalités Dérivées</H3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { name: 'Bleu TSF 500 (Base)', hex: '#0070C0', text: 'text-white', bg: 'bg-[#0070C0]' },
                  { name: 'Bleu TSF 600 (Hover)', hex: '#005FA3', text: 'text-white', bg: 'bg-[#005FA3]' },
                  { name: 'Bleu TSF 50 (Surface)', hex: '#EBF5FC', text: 'text-[#0070C0]', bg: 'bg-[#EBF5FC]', border: 'border-[#A3D1F1]' },
                  { name: 'Orange TSF 500 (Base)', hex: '#FF6600', text: 'text-white', bg: 'bg-[#FF6600]' },
                  { name: 'Orange TSF 600 (Hover)', hex: '#E65500', text: 'text-white', bg: 'bg-[#E65500]' },
                  { name: 'Orange TSF 50 (Light)', hex: '#FFF3EB', text: 'text-[#FF6600]', bg: 'bg-[#FFF3EB]', border: 'border-[#FFC49E]' },
                  { name: 'Charcoal 500 (Texte)', hex: '#404040', text: 'text-white', bg: 'bg-[#404040]' },
                  { name: 'Charcoal 700 (Titre)', hex: '#262626', text: 'text-white', bg: 'bg-[#262626]' },
                  { name: 'Charcoal 400 (Secondaire)', hex: '#7D7D7D', text: 'text-white', bg: 'bg-[#7D7D7D]' },
                  { name: 'Charcoal 100 (Bordure)', hex: '#EBEBEB', text: 'text-[#404040]', bg: 'bg-[#EBEBEB]', border: 'border-slate-300' },
                  { name: 'Canvas (#FAFAFA)', hex: '#FAFAFA', text: 'text-[#404040]', bg: 'bg-[#FAFAFA]', border: 'border-slate-300' },
                  { name: 'Success Vert TSF', hex: '#0E8A5E', text: 'text-white', bg: 'bg-[#0E8A5E]' }
                ].map((c, i) => (
                  <div key={i} className="p-3 bg-white border border-[#E8E8E8] rounded-lg space-y-2">
                    <div className={`h-12 rounded ${c.bg} ${c.border || ''}`} />
                    <div>
                      <span className="text-xs font-bold text-[#404040] block truncate">{c.name}</span>
                      <span className="text-[11px] font-mono text-[#7D7D7D]">{c.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Anti-Slop Discipline Banner */}
            <div className="p-6 bg-slate-50 border border-[#E8E8E8] rounded-xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-[#404040] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0070C0]" />
                <span>Interdictions Formelles "Anti AI-Slop"</span>
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-red-50/60 border border-red-200 rounded-lg space-y-1 text-red-900">
                  <span className="font-bold block">❌ Ce qui est strictement proscrit :</span>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Gradients violets / néons futuristes</li>
                    <li>Capsules pill (rounded-full) sur les métadonnées statiques</li>
                    <li>Orbes floues (blur-3xl) flottant derrière le texte</li>
                    <li>Succession de cartes clones sans hiérarchie</li>
                  </ul>
                </div>
                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg space-y-1 text-emerald-950">
                  <span className="font-bold block">✅ Les standards TSF appliqués :</span>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Surfaces blanches / grises sobres (#FAFAFA) avec hairlines #E8E8E8</li>
                    <li>Métadonnées en texte nu séparées par « · »</li>
                    <li>Boutons solides aux couleurs officielles (#0070C0 et #FF6600)</li>
                    <li>Autorité éditoriale et institutionnelle panafricaine</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TYPOGRAPHY SYSTEM */}
        {activeTab === 'typography' && (
          <div className="space-y-12">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
                Architecture Typographique
              </span>
              <H2>Une présence institutionnelle claire et rythmée</H2>
              <Body size="lead">
                L'alliance de Plus Jakarta Sans pour la netteté contemporaine et de Playfair Display pour les tirages de tête confère une autorité comparable aux grands livres blancs internationaux.
              </Body>
            </div>

            {/* Specimen table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              {/* Display */}
              <div className="p-6 sm:p-8 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Display · 60px / Bold</span>
                  <span>font-sans leading-[1.08] tracking-tight</span>
                </div>
                <Display>Souveraineté des Talents</Display>
              </div>

              {/* H1 */}
              <div className="p-6 sm:p-8 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>H1 · 48px / Bold</span>
                  <span>font-sans leading-tight</span>
                </div>
                <H1>L'Infrastructure Panafricaine de Référence</H1>
              </div>

              {/* H2 */}
              <div className="p-6 sm:p-8 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>H2 · 32px / Bold</span>
                  <span>font-sans leading-snug</span>
                </div>
                <H2>Détecter · Incuber · Certifier · Propulser</H2>
              </div>

              {/* H3 */}
              <div className="p-6 sm:p-8 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>H3 · 20px / SemiBold</span>
                  <span>font-sans leading-snug</span>
                </div>
                <H3>Horizon Excellence : Promotion Panafricaine 2026</H3>
              </div>

              {/* H4 */}
              <div className="p-6 sm:p-8 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>H4 · 16px / SemiBold</span>
                  <span>font-sans text-slate-900</span>
                </div>
                <H4>Directoire Exécutif & Secrétariat Général aux Opérations</H4>
              </div>

              {/* Body Lead & Normal */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Body Lead (18px) & Body Normal (15px)</span>
                  <span>measure 65-75ch max-w-prose</span>
                </div>
                <Body size="lead">
                  Talents Sans Frontières structure une réponse rigoureuse à l'expatriation des intelligences africaines en offrant un ancrage continental aux plus hauts standards.
                </Body>
                <Body>
                  Chaque candidat admis au sein de l'infrastructure bénéficie d'un bilan psychométrique multidimensionnel, d'une immersion au contact de dirigeants d'État et d'un passeport de compétences cryptographiquement vérifiable.
                </Body>
              </div>

              {/* Small & Caption */}
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Small & Caption</span>
                  <span>Metadata, fil d'Ariane, micro-labels</span>
                </div>
                <div className="flex items-center gap-4">
                  <Small>Dossier TSF-2026-0842 instruit le 15 Septembre 2026</Small>
                  <Caption className="text-[#FF6600]">· PHASE 01 EN COURS</Caption>
                </div>
              </div>

              {/* Data Text Tabular */}
              <div className="p-6 sm:p-8 space-y-2 bg-slate-50/50">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>DataText (Tabular Numerals)</span>
                  <span>font-mono font-bold tabular-nums</span>
                </div>
                <div className="flex items-baseline gap-8">
                  <DataText size="display">24 800+</DataText>
                  <DataText size="lg" accent>98.2%</DataText>
                  <DataText size="md" highlight>8.4 M$</DataText>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CORE UI COMPONENT LIBRARY */}
        {activeTab === 'components' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6600]">
                Bibliothèque de Composants Fondamentaux
              </span>
              <H2>Primitives UI Unifiées, Accessibles & Non Génériques</H2>
              <Body size="lead">
                Boutons à hiérarchie stricte, formulaires précis, alertes mesurées, tableaux tabulaires et conteneurs sans pill-overload. Chaque élément est taillé sur mesure pour la plateforme TSF.
              </Body>
            </div>

            {/* Section 1: Buttons Hierarchy */}
            <div className="p-6 sm:p-8 bg-white border border-[#E8E8E8] rounded-xl space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-bold uppercase text-[#0070C0]">01. HIÉRARCHIE DES BOUTONS</span>
                  <H4>Actions Primaires, Accents, Secondaires, Tertiaires & États</H4>
                </div>
                <span className="text-xs font-mono text-[#7D7D7D]">6 Variantes · 3 Tailles</span>
              </div>

              <div className="space-y-4">
                <span className="text-xs font-mono uppercase text-[#7D7D7D] font-bold block">Variantes de Boutons :</span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">
                    Primary (Bleu TSF #0070C0)
                  </Button>
                  <Button variant="accent">
                    Accent (Orange TSF #FF6600)
                  </Button>
                  <Button variant="secondary">
                    Secondary (Neutre #F5F5F7)
                  </Button>
                  <Button variant="tertiary">
                    Tertiary (Contour)
                  </Button>
                  <Button variant="danger">
                    Danger (#DC2626)
                  </Button>
                  <Button variant="ghost">
                    Ghost Action
                  </Button>
                  <Button variant="text">
                    Lien En Ligne
                  </Button>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-mono uppercase text-[#7D7D7D] font-bold block">Tailles & États :</span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm" variant="primary">Petit (sm)</Button>
                  <Button size="md" variant="primary">Moyen (md)</Button>
                  <Button size="lg" variant="primary">Grand (lg)</Button>
                  <Button variant="accent" loading>En cours...</Button>
                  <Button variant="primary" icon={<ExternalLink className="w-4 h-4" />}>Avec Icône</Button>
                  <Button variant="secondary" disabled>Désactivé</Button>
                </div>
              </div>
            </div>

            {/* Section 2: Form Controls */}
            <div className="p-6 sm:p-8 bg-white border border-[#E8E8E8] rounded-xl space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-bold uppercase text-[#0070C0]">02. CONTRÔLES DE FORMULAIRE</span>
                  <H4>Champs de Saisie, Sélecteurs, Cases à Cocher & Recherche</H4>
                </div>
                <span className="text-xs font-mono text-[#7D7D7D]">Focus Accessible (#0070C0)</span>
              </div>

              {/* Search Bar Demo */}
              <div className="space-y-2">
                <Label>Barre de Recherche Panafricaine (SearchBar)</Label>
                <SearchBar
                  value={searchVal}
                  onChangeValue={setSearchVal}
                  placeholder="Rechercher par profil, programme, pays ou compétence..."
                />
                <p className="text-xs font-mono text-[#7D7D7D]">Valeur active : « {searchVal || 'Vide'} »</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <Input
                  label="Adresse Email Institutionnelle"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="nom@organisation.org"
                  helperText="Utilisée pour l'envoi des convocations et certificats officiels."
                  required
                />

                <Input
                  label="Numéro de Dossier Candidat"
                  defaultValue="TSF-BJ-2026-0042"
                  error="Vérification requise par l’auditeur référent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Pôle Régional de Rattachement"
                  value={selectVal}
                  onChange={(e) => setSelectVal(e.target.value)}
                  options={[
                    { value: 'cotonou', label: 'Hub Cotonou (Bénin & Afrique de l’Ouest)' },
                    { value: 'kigali', label: 'Hub Kigali (Rwanda & Afrique de l’Est)' },
                    { value: 'dakar', label: 'Antenne Dakar (Sénégal)' },
                    { value: 'abidjan', label: 'Antenne Abidjan (Côte d’Ivoire)' }
                  ]}
                />

                <div className="space-y-3 pt-2">
                  <Label>Préférences & Consentements Déontologiques</Label>
                  <Checkbox
                    label="Recevoir le digest quotidien WIKIJOB DAILY"
                    description="Sélection personnalisée des nouvelles opportunités du marché béninois."
                    checked={checkVal}
                    onChange={(e) => setCheckVal(e.target.checked)}
                  />
                  <div className="flex items-center gap-4 pt-1">
                    <Radio
                      label="Disponibilité immédiate"
                      checked={radioVal === 'opt1'}
                      onChange={() => setRadioVal('opt1')}
                    />
                    <Radio
                      label="En préavis (3 mois)"
                      checked={radioVal === 'opt2'}
                      onChange={() => setRadioVal('opt2')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Badges, Alerts & Feedback */}
            <div className="p-6 sm:p-8 bg-white border border-[#E8E8E8] rounded-xl space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-bold uppercase text-[#0070C0]">03. BADGES & NOTIFICATIONS</span>
                  <H4>Statuts, Alertes & Bannières Sans Surcharge Visuelle</H4>
                </div>
                <span className="text-xs font-mono text-[#7D7D7D]">Zero-Pill Discipline</span>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono uppercase text-[#7D7D7D] font-bold block">Système de Badges Rectangulaires (rounded-md) :</span>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="primary" dot>Bleu TSF (Souverain)</Badge>
                  <Badge variant="accent" dot>Orange TSF (Action)</Badge>
                  <Badge variant="success" dot>Certifié / Validé</Badge>
                  <Badge variant="warning" dot>En Attente</Badge>
                  <Badge variant="danger" dot>Clôturé</Badge>
                  <Badge variant="neutral">Neutre Charcoal</Badge>
                  <Badge variant="outline">Contour Sobre</Badge>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <span className="text-xs font-mono uppercase text-[#7D7D7D] font-bold block">Bannières d'Alerte Systémique (Alert) :</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Alert variant="info" title="Information Institutionnelle">
                    L’audit des bourses d’excellence 2026 est actuellement ouvert aux candidats BAC+3 et BAC+5.
                  </Alert>
                  <Alert variant="success" title="Certification Délivrée">
                    Votre certificat TSF a été authentifié et scellé cryptographiquement par le jury.
                  </Alert>
                  <Alert variant="warning" title="Clôture Imminente">
                    Il ne reste que 48 heures pour valider votre candidature au programme Propulsion.
                  </Alert>
                  <Alert variant="danger" title="Alerte de Sécurité">
                    Tentative de connexion non reconnue. Veuillez réinitialiser votre mot de passe d’accès.
                  </Alert>
                </div>
              </div>
            </div>

            {/* Section 4: Tabs, Modals & Drawers */}
            <div className="p-6 sm:p-8 bg-white border border-[#E8E8E8] rounded-xl space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-bold uppercase text-[#0070C0]">04. NAVIGATION INTERNE & SURFACES FLOTTANTES</span>
                  <H4>Système d'Onglets, Boîtes Modales & Tiroirs Latéraux</H4>
                </div>
                <span className="text-xs font-mono text-[#7D7D7D]">Contrôles Flottants</span>
              </div>

              {/* Tabs Demo */}
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase text-[#7D7D7D] font-bold block">Variante Soulignée (Underline) :</span>
                <Tabs
                  activeTab={demoTab}
                  onChange={setDemoTab}
                  items={[
                    { id: 'tab1', label: 'Profil Talent', count: 1 },
                    { id: 'tab2', label: 'Candidatures Actives', count: 3 },
                    { id: 'tab3', label: 'Certifications TSF', count: 2 },
                    { id: 'tab4', label: 'Archives' }
                  ]}
                />

                <span className="text-xs font-mono uppercase text-[#7D7D7D] font-bold block pt-3">Variante Segmentée (Segmented) :</span>
                <Tabs
                  variant="segmented"
                  activeTab={demoTab}
                  onChange={setDemoTab}
                  items={[
                    { id: 'tab1', label: 'Vue Synthèse' },
                    { id: 'tab2', label: 'Avis Clôturés' },
                    { id: 'tab3', label: 'Bourses' }
                  ]}
                />
              </div>

              {/* Dialog triggers */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                  Ouvrir la Modale Démo
                </Button>
                <Button variant="tertiary" onClick={() => setIsDrawerOpen(true)}>
                  Ouvrir le Tiroir Latéral (Drawer)
                </Button>

                <Tooltip content="Tooltip d'assistance conforme WCAG AA">
                  <Button variant="ghost" icon={<Eye className="w-4 h-4" />}>
                    Survoler pour Tooltip
                  </Button>
                </Tooltip>

                <Dropdown
                  trigger={
                    <Button variant="secondary" icon={<MoreVertical className="w-4 h-4" />}>
                      Menu Déroulant
                    </Button>
                  }
                  items={[
                    { id: '1', label: 'Exporter le dossier (JSON)', onClick: () => setActionNotice('Dossier JSON exporté avec succès'), icon: <Download className="w-4 h-4" /> },
                    { id: '2', label: 'Vérifier l’empreinte cryptographique', onClick: () => setActionNotice('Empreinte SHA-256 certifiée'), icon: <ShieldCheck className="w-4 h-4" /> },
                    { id: '3', label: 'Révoquer l’accréditation', onClick: () => setActionNotice('Demande de révocation enregistrée'), danger: true }
                  ]}
                />
              </div>

              {actionNotice && (
                <div className="mt-3">
                  <Alert variant="info" onDismiss={() => setActionNotice(null)}>
                    {actionNotice}
                  </Alert>
                </div>
              )}
            </div>

            {/* Section 5: Progress Bars & Timelines */}
            <div className="p-6 sm:p-8 bg-white border border-[#E8E8E8] rounded-xl space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-bold uppercase text-[#0070C0]">05. BARRES DE PROGRESSION & TIMELINE</span>
                  <H4>Indicateurs d'Avancement & Lignes du Temps Institutionnelles</H4>
                </div>
                <span className="text-xs font-mono text-[#7D7D7D]">ProgressBar · Timeline TSF</span>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase text-[#7D7D7D] font-bold block">Variantes de Progression :</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#F5F5F7] rounded-xl border border-[#E8E8E8] space-y-3">
                    <ProgressBar value={85} label="Progression de Certification" variant="primary" size="md" />
                    <ProgressBar value={62} label="Quota Bourses Décaissées" variant="accent" size="md" />
                    <ProgressBar value={100} label="Audit de Conformité" variant="success" size="md" />
                  </div>
                  <div className="p-4 bg-[#F5F5F7] rounded-xl border border-[#E8E8E8] space-y-3">
                    <ProgressBar value={40} label="Taille Fine (sm)" variant="primary" size="sm" />
                    <ProgressBar value={75} label="Taille Large (lg)" variant="accent" size="lg" />
                    <ProgressBar value={30} label="Traitement d'Indice Sémantique (Indéterminé)" variant="primary" indeterminate size="sm" />
                  </div>
                </div>
              </div>

              {/* Timeline Demo */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <span className="text-xs font-mono uppercase text-[#7D7D7D] font-bold block">Parcours & Jalons Opérationnels (Timeline) :</span>
                <div className="p-6 bg-white border border-[#E8E8E8] rounded-xl">
                  <Timeline
                    items={[
                      {
                        id: 'step-1',
                        title: '1. Identification & Dépôt du Dossier',
                        date: '15 Juillet 2026',
                        status: 'completed',
                        description: 'Dépôt des titres universitaires, portfolios et recommandations panafricaines.',
                        tags: ['Audit Initial', 'Conformité Greffe']
                      },
                      {
                        id: 'step-2',
                        title: '2. Évaluation Collégiale par le Jury TSF',
                        date: '28 Août 2026',
                        status: 'completed',
                        description: 'Soutenance technique et examen des compétences pratiques devant le collège sectoriel.',
                        tags: ['Grand Jury', 'Score 94.2/100']
                      },
                      {
                        id: 'step-3',
                        title: '3. Homologation au Palier Argent (Niveau II)',
                        date: '12 Septembre 2026',
                        status: 'current',
                        description: 'Attribution du label cryptographique officiel et génération du QR Code certifié.',
                        tags: ['Sceau Panafricain', 'En cours']
                      },
                      {
                        id: 'step-4',
                        title: '4. Propulsion & Détachement Institutionnel',
                        date: 'Octobre 2026',
                        status: 'upcoming',
                        description: 'Placement stratégique au sein d’une institution publique ou multinationale partenaire.'
                      }
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Section 6: Data Tables & Avatars */}
            <div className="p-6 sm:p-8 bg-white border border-[#E8E8E8] rounded-xl space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-bold uppercase text-[#0070C0]">06. TABLEAUX & IDENTITÉS NUMÉRIQUES</span>
                  <H4>Tableaux à Chiffres Tabulaires & Galerie d’Avatars</H4>
                </div>
                <span className="text-xs font-mono text-[#7D7D7D]">tabular-nums · Avatars TSF</span>
              </div>

              {/* Table Demo */}
              <div className="space-y-3">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Bénéficiaire / Talent</TableHeaderCell>
                      <TableHeaderCell>Programme / Pôle</TableHeaderCell>
                      <TableHeaderCell>Date d'Homologation</TableHeaderCell>
                      <TableHeaderCell align="right">Score d'Évaluation</TableHeaderCell>
                      <TableHeaderCell align="center">Label TSF</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { name: 'Dr. Aminata Traoré', program: 'Propulsion Afrique', date: '2026-09-15', score: '98.5 / 100', level: 'OR', avatar: '/assets/avatars/talent-1.jpg' },
                      { name: 'Ing. Kwame Mensah', program: 'Robotics & AI Alliance', date: '2026-08-20', score: '94.2 / 100', level: 'ARGENT', avatar: null },
                      { name: 'Aïchatou Souleymane', program: 'Conseil & Audit PSIE', date: '2026-06-12', score: '88.0 / 100', level: 'ARGENT', avatar: null }
                    ].map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar name={row.name} size="sm" status="certified" />
                            <span className="font-semibold text-[#262626]">{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{row.program}</TableCell>
                        <TableCell isNumeric>{row.date}</TableCell>
                        <TableCell isNumeric align="right" className="font-bold text-[#0070C0]">{row.score}</TableCell>
                        <TableCell align="center">
                          <Badge variant={row.level === 'OR' ? 'accent' : 'primary'} dot>
                            {row.level}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Pagination
                  currentPage={demoTablePage}
                  totalPages={4}
                  onPageChange={setDemoTablePage}
                />
              </div>

              {/* Avatars Palette */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <span className="text-xs font-mono uppercase text-[#7D7D7D] font-bold block">Échelle des Tailles d’Avatar :</span>
                <div className="flex items-center gap-4">
                  <Avatar name="Aminata Traoré" size="xs" status="online" />
                  <Avatar name="Kwame Mensah" size="sm" status="certified" />
                  <Avatar name="Aïchatou Souleymane" size="md" status="certified" />
                  <Avatar name="Koffi Agbossou" size="lg" status="offline" />
                  <Avatar name="Direction TSF" size="xl" status="certified" />
                </div>
              </div>
            </div>

            {/* Interactive Modal Component */}
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Homologation de Candidature TSF"
              description="Dossier N° TSF-BJ-2026-0042 instruit selon le protocole souverain d’évaluation."
              footer={
                <>
                  <Button variant="tertiary" onClick={() => setIsModalOpen(false)}>
                    Annuler
                  </Button>
                  <Button variant="accent" onClick={() => { setIsModalOpen(false); setActionNotice('Action confirmée avec succès dans le registre central !'); }}>
                    Confirmer l'Action
                  </Button>
                </>
              }
            >
              <div className="space-y-3 text-xs text-[#595959] leading-relaxed">
                <p>
                  Ce composant modal respecte l’ensemble des standards ergonomiques TSF : focus piégé, écoute de la touche Échap, backdrop avec flou maîtrisé et boutons alignés sur la charte officielle.
                </p>
                <div className="p-3 bg-[#EBF5FC] border border-[#A3D1F1] rounded-lg text-[#004D85]">
                  <strong className="block font-bold">Garantie d’Intégrité :</strong>
                  Aucun artifice graphique ni glassmorphism excessif. Surface blanche pure, bordure subtile.
                </div>
              </div>
            </Modal>

            {/* Interactive Drawer Component */}
            <Drawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              title="Filtres Avancés & Paramètres"
              description="Configurez vos critères de matching et de veille stratégique."
              footer={
                <Button fullWidth variant="primary" onClick={() => setIsDrawerOpen(false)}>
                  Appliquer les critères
                </Button>
              }
            >
              <div className="space-y-4">
                <Select
                  label="Filière Prioritaire"
                  options={[
                    { value: 'all', label: 'Toutes les filières' },
                    { value: 'tech', label: 'Technologies & IA' },
                    { value: 'finance', label: 'Banque & Finance' }
                  ]}
                />
                <Checkbox label="Afficher uniquement les opportunités certifiées" defaultChecked />
                <Checkbox label="Mode télétravail / remote accepté" />
              </div>
            </Drawer>
          </div>
        )}

        {/* TAB 4: THE 9 CARD FAMILIES */}
        {activeTab === 'cards' && (
          <div className="space-y-12">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6600]">
                Composants Structurels
              </span>
              <H2>Les 9 Familles de Cartes TSF</H2>
              <Body size="lead">
                Chaque famille de carte répond à un cas d'usage précis avec sa propre grammaire visuelle : institutionnelle, programmatique, talent, partenaire, opportunité, impact, narrative, médiatique ou documentaire.
              </Body>
            </div>

            {/* 1. InstitutionCard */}
            <div className="space-y-3">
              <Caption className="text-[#0070C0] font-bold">01. Famille InstitutionCard (Gouvernance & Hubs)</Caption>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InstitutionCard
                  title="Conseil d’Orientation Stratégique (COS)"
                  role="Instance Suprême de Décision"
                  mandate="Définit les orientations décennales, valide les audits éthiques et approuve les conventions avec les gouvernements."
                  composition={[
                    'Anciens présidents d’académies scientifiques africaines',
                    'Figures majeures du secteur industriel et des infrastructures',
                    'Économistes de référence engagés pour la souveraineté'
                  ]}
                  headquartersOrHub="Siège de la Marina, Cotonou & Hub Kigali"
                />
                <InstitutionCard
                  title="Comité Scientifique & Pédagogique"
                  role="Régulateur Académique"
                  mandate="Homologue les jurys de certification, supervise les protocoles psychométriques et audite les curricula."
                  composition={[
                    'Chaires universitaires en sciences dures et IA',
                    'Directeurs techniques d’entreprises d’ingénierie',
                    'Experts internationaux en psychométrie'
                  ]}
                  headquartersOrHub="Pôle Recherche & Enseignement Supérieur, Dakar"
                />
              </div>
            </div>

            {/* 2. ProgramCard */}
            <div className="space-y-3 pt-6 border-t border-slate-200">
              <Caption className="text-[#0070C0] font-bold">02. Famille ProgramCard (Ingénierie Pédagogique)</Caption>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProgramCard program={PROGRAMS_CATALOG[0]} variant="featured" />
                <ProgramCard program={PROGRAMS_CATALOG[1]} />
              </div>
            </div>

            {/* 3. TalentCard */}
            <div className="space-y-3 pt-6 border-t border-slate-200">
              <Caption className="text-[#0070C0] font-bold">03. Famille TalentCard (Vivier & Lauréats)</Caption>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TalentCard {...SAMPLE_TALENTS[0]} onClick={() => setActionNotice('Consultation fiche talent : Dr. Aminata Traoré')} />
                <TalentCard {...SAMPLE_TALENTS[1]} onClick={() => setActionNotice('Consultation fiche talent : Ing. Kwame Mensah')} />
              </div>
            </div>

            {/* 4. PartnerCard */}
            <div className="space-y-3 pt-6 border-t border-slate-200">
              <Caption className="text-[#0070C0] font-bold">04. Famille PartnerCard (Alliances Stratégiques)</Caption>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PartnerCard {...SAMPLE_PARTNERS[0]} onClick={() => setActionNotice('Détails convention : Alliance Industrielle')} />
                <PartnerCard {...SAMPLE_PARTNERS[1]} onClick={() => setActionNotice('Détails convention : Bailleur & Partenaire')} />
              </div>
            </div>

            {/* 5. OpportunityCard */}
            <div className="space-y-3 pt-6 border-t border-slate-200">
              <Caption className="text-[#0070C0] font-bold">05. Famille OpportunityCard (Bourses & Fellowships)</Caption>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <OpportunityCard item={OPPORTUNITIES_LIST[0]} onSelect={() => setActionNotice('Consultation opportunité')} />
                <OpportunityCard item={OPPORTUNITIES_LIST[1]} onSelect={() => setActionNotice('Consultation opportunité')} />
              </div>
            </div>

            {/* 6. ImpactCard */}
            <div className="space-y-3 pt-6 border-t border-slate-200">
              <Caption className="text-[#0070C0] font-bold">06. Famille ImpactCard (Preuve & Riguer Audités)</Caption>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <ImpactCard
                  metric="98.2%"
                  title="Insertion Stratégique à 90 Jours"
                  context="Lauréats accédant à des responsabilités directes ou créant des structures industrielles en Afrique."
                  period="Promotion 2024-2025"
                  highlight
                />
                <ImpactCard
                  metric="8.4 M$"
                  title="Capital Patient Alloué"
                  context="Fonds d'amorçage sans garantie et bourses d'honneur octroyées sans charge pour les boursiers."
                  period="Cumul 2026"
                />
                <ImpactCard
                  metric="18"
                  unit="Pays"
                  title="Maillage Territorial Permanent"
                  context="Dispositifs de détection et scouting ouverts sur l'ensemble des 4 sous-régions continentales."
                  period="Réseau Actif"
                />
              </div>
            </div>

            {/* 7. StoryCard */}
            <div className="space-y-3 pt-6 border-t border-slate-200">
              <Caption className="text-[#0070C0] font-bold">07. Famille StoryCard (Trajectoires & Paroles d'Alumni)</Caption>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StoryCard {...SAMPLE_STORIES[0]} />
                <StoryCard {...SAMPLE_STORIES[1]} />
              </div>
            </div>

            {/* 8. MediaCard */}
            <div className="space-y-3 pt-6 border-t border-slate-200">
              <Caption className="text-[#0070C0] font-bold">08. Famille MediaCard (Articles, Podcasts & Vidéos)</Caption>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MediaCard {...SAMPLE_MEDIA_ITEMS[0]} onClick={() => setActionNotice('Lecture Revue TSF N° 08')} />
                <MediaCard {...SAMPLE_MEDIA_ITEMS[1]} onClick={() => setActionNotice('Écoute Podcast TSF')} />
              </div>
            </div>

            {/* 9. ReportCard */}
            <div className="space-y-3 pt-6 border-t border-slate-200">
              <Caption className="text-[#0070C0] font-bold">09. Famille ReportCard (Publications & Livres Blancs)</Caption>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ReportCard
                  title="Rapport Annuel sur l’État des Talents et la Souveraineté Intellectuelle"
                  referenceCode="REP-TSF-2026-01"
                  category="Rapport Annuel"
                  date="Septembre 2026"
                  fileSize="14.2 Mo"
                  summary="Audit exhaustif des dynamiques de mobilité scientifique africaine et recommandations aux chefs d’État."
                />
                <ReportCard
                  title="Référentiel Méthodologique Officiel : De la Détection à la Propulsion"
                  referenceCode="REF-MET-TSF-04"
                  category="Référentiel Méthodologique"
                  date="Juillet 2026"
                  fileSize="4.8 Mo"
                  summary="Grilles psychométriques et protocoles d'homologation conformes aux standards internationaux."
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DATA SYSTEM & METRICS */}
        {activeTab === 'data' && (
          <div className="space-y-12">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6600]">
                Quantitative Rigor
              </span>
              <H2>Système Data & Indicateurs Institutionnels</H2>
              <Body size="lead">
                Présenter la donnée avec le sérieux d'un rapport de la Banque Africaine de Développement ou de la Banque Mondiale. Chiffres tabulaires, horodatage audité, absence de baromètres cosmétiques.
              </Body>
            </div>

            {/* Metrics & Badges Showcase */}
            <div className="space-y-4">
              <H3>Primitives Métriques & Badges Systémiques</H3>
              <div className="flex flex-wrap items-center gap-3 p-4 bg-white border border-slate-200 rounded-lg">
                <DataBadge label="AUDIT INDÉPENDANT 2026" variant="verified" icon={<ShieldCheck className="w-3.5 h-3.5" />} />
                <DataBadge label="SÉLECTION FINALE : 12%" variant="accent" />
                <DataBadge label="COHORTE OUVERTE" variant="outline" />
                <DataBadge label="STATUT DÉLÉGUÉ : ACTIF" variant="neutral" />
                <DataBadge label="PARITÉ 50/50 RESPECTÉE" variant="verified" />
              </div>
            </div>

            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                value="24 800"
                label="Candidatures Évaluées"
                auditedBy="Cabinet Agréé"
                period="Année 2025-2026"
                delta={{ value: '+24%', isPositive: true, label: 'vs 2024' }}
                benchmark="Moyenne continentale : +8%"
              />

              <MetricCard
                value="1 420"
                label="Lauréats Certifiés"
                auditedBy="Comité Scientifique"
                period="Promotion Cumulée"
                delta={{ value: '+140', isPositive: true }}
                benchmark="Taux d'admission : 12%"
                highlight
              />

              <MetricCard
                value="98.2"
                unit="%"
                label="Insertion Haute Décision"
                auditedBy="Baromètre RH"
                period="À 90 jours"
                delta={{ value: '+1.4%', isPositive: true }}
                benchmark="Norme OIT : 72%"
              />

              <MetricCard
                value="8.4"
                unit="M$"
                label="Dotations SourceFund"
                auditedBy="Contrôle Financier"
                period="Exercice en cours"
                delta={{ value: '+2.1 M$', isPositive: true }}
                benchmark="100% fonds d'impact"
              />
            </div>

            {/* Progress Bars */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-6">
              <H3>Indicateurs Linéaires de Progression (Progress)</H3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Progress
                    label="Avancement Cohorte Horizon Excellence"
                    sublabel="Semestre 2 / 2"
                    value={75}
                    variant="primary"
                    steps={[
                      { label: 'Sélection', at: 0 },
                      { label: 'Bootcamp', at: 35 },
                      { label: 'Mission d’État', at: 70 },
                      { label: 'Grand Oral', at: 100 }
                    ]}
                  />

                  <Progress
                    label="Objectif de Mobilisation SourceFund Africa"
                    sublabel="6.8 M$ / 10.0 M$"
                    value={68}
                    variant="accent"
                  />
                </div>

                <div className="space-y-4">
                  <Progress
                    label="Taux de Rétention & Réinvestissement en Afrique"
                    value={85}
                    variant="success"
                  />

                  <div className="pt-2">
                    <span className="text-xs font-mono text-slate-500 block mb-2">Simulateur interactif de jauge :</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={testProgress}
                      onChange={(e) => setTestProgress(Number(e.target.value))}
                      className="w-full accent-[#0070C0] cursor-pointer"
                    />
                    <Progress value={testProgress} label="Jauge Dynamique de Déploiement" variant="accent" />
                  </div>
                </div>
              </div>
            </div>

            {/* Institutional Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChartContainer
                title="Répartition par Filière Stratégique"
                subtitle="Concentration des lauréats certifiés selon les priorités du dividende démographique africain."
                data={CHART_DATA_SECTORS}
                unit="%"
              />

              <ChartContainer
                title="Empreinte Territoriale par Sous-Région"
                subtitle="Distribution des cohortes au sein des 18 hubs et représentations permanentes TSF."
                data={CHART_DATA_REGIONS}
                unit="%"
              />
            </div>

            {/* Timeline */}
            <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-xl space-y-6">
              <H3>Jalons Chronologiques & Méthodologiques (Timeline)</H3>
              <Timeline
                items={[
                  {
                    id: '1',
                    order: '01',
                    title: 'Campagnes Panafricaines de Scouting & Dépôt',
                    tagline: 'Étape 01 · Détecter',
                    dateOrDuration: 'Juin - Octobre 2026',
                    description: 'Passation anonyme des tests psychométriques et cognitifs sur les 18 hubs territoriaux.',
                    status: 'completed',
                    meta: ['24 000+ dossiers', 'Audition à l’aveugle']
                  },
                  {
                    id: '2',
                    order: '02',
                    title: 'Immersion & Académie de Haute Stratégie',
                    tagline: 'Étape 02 · Incuber',
                    dateOrDuration: 'Novembre 2026 - Mai 2027',
                    description: 'Cursus hybride intensif, études de cas industriels et mentorat 1:1 par des directeurs généraux.',
                    status: 'current',
                    meta: ['120 lauréats admis', '180h de mentorat']
                  },
                  {
                    id: '3',
                    order: '03',
                    title: 'Grand Oral & Homologation du Passeport TSF',
                    tagline: 'Étape 03 · Certifier',
                    dateOrDuration: 'Juin 2027',
                    description: 'Évaluation collégiale devant jury paritaire international et délivrance du certificat infalsifiable.',
                    status: 'upcoming',
                    meta: ['Audit ISO / UNESCO', 'Accréditation mondiale']
                  },
                  {
                    id: '4',
                    order: '04',
                    title: 'Fast-Track Placement & Bourses d’Amorçage',
                    tagline: 'Étape 04 · Propulser',
                    dateOrDuration: 'Juillet 2027 & Continu',
                    description: 'Recrutement prioritaire en postes de direction et financement des projets souverains via SourceFund.',
                    status: 'upcoming',
                    meta: ['Placement garanti', 'Accompagnement 36 mois']
                  }
                ]}
              />
            </div>
          </div>
        )}

        {/* TAB 6: MICRO-INTERACTIONS */}
        {activeTab === 'interactions' && (
          <div className="space-y-12">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6600]">
                Ressenti Utilisateur & Fluidité
              </span>
              <H2>Micro-Interactions & Transitions Sobres</H2>
              <Body size="lead">
                Les animations répondent scrupuleusement au budget de latence &le; 200ms. Elles servent la compréhension et la confirmation de l'action, sans fioritures superflues.
              </Body>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Counter demo */}
              <Card padding="lg" className="space-y-4">
                <span className="text-xs font-mono uppercase text-[#7D7D7D] font-bold block">
                  Compteur Numérique Tabulaire
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0070C0]">
                  <AnimatedCounter value={24800} suffix="+" />
                </div>
                <p className="text-xs text-[#7D7D7D]">
                  Animation de progression fluide activée à l'apparition dans la zone de lecture avec easing cubique.
                </p>
              </Card>

              {/* Hover States */}
              <Card padding="lg" hoverEffect className="space-y-4">
                <span className="text-xs font-mono uppercase text-[#FF6600] font-bold block">
                  Élévation Contrôlée (-2px)
                </span>
                <H4>Survol Institué & Réactif</H4>
                <p className="text-xs text-[#7D7D7D]">
                  Transition d'opacité et léger déplacement vertical (`-translate-y-0.5`) avec ombre fine (`shadow-xs`).
                </p>
              </Card>

              {/* Focus Ring WCAG AA */}
              <Card padding="lg" className="space-y-4">
                <span className="text-xs font-mono uppercase text-[#0070C0] font-bold block">
                  Accessibilité & Focus Visible
                </span>
                <Button variant="tertiary" size="sm" fullWidth>
                  Testez la touche Tabulation
                </Button>
                <p className="text-xs text-[#7D7D7D]">
                  Anneau de focus haute lisibilité (`focus-visible:outline-[#0070C0]`) conforme aux normes WCAG AA.
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 7: MOBILE-FIRST SPECIFICATIONS */}
        {activeTab === 'responsive' && (
          <div className="space-y-12">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6600]">
                Mobile-First Architecture
              </span>
              <H2>Adaptabilité Strictement Calibrée</H2>
              <Body size="lead">
                Chaque écran TSF est conçu à partir de l'expérience tactile mobile (375px) jusqu'aux écrans de salle de conseil (1920px).
              </Body>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 bg-white border border-[#E8E8E8] rounded-xl space-y-2">
                <strong className="text-[#262626] block text-sm font-sans">375px — 430px</strong>
                <span className="text-[#FF6600] block">Mobile Compact & Pro</span>
                <ul className="space-y-1 text-[#7D7D7D]">
                  <li>· Cible tactile &ge; 44px</li>
                  <li>· Navigation tiroir instantanée</li>
                  <li>· Sticky nav capée à &lt;15% VH</li>
                  <li>· Cartes sur colonne unique</li>
                </ul>
              </div>

              <div className="p-4 bg-white border border-[#E8E8E8] rounded-xl space-y-2">
                <strong className="text-[#262626] block text-sm font-sans">768px</strong>
                <span className="text-[#0070C0] block">Tablettes & Pliables</span>
                <ul className="space-y-1 text-[#7D7D7D]">
                  <li>· Grilles 2 colonnes</li>
                  <li>· Métriques en 2x2</li>
                  <li>· Onglets horizontaux défilants</li>
                  <li>· Typographie H1 à 36px</li>
                </ul>
              </div>

              <div className="p-4 bg-white border border-[#E8E8E8] rounded-xl space-y-2">
                <strong className="text-[#262626] block text-sm font-sans">1024px — 1440px</strong>
                <span className="text-[#0E8A5E] block">Desktop Baseline</span>
                <ul className="space-y-1 text-[#7D7D7D]">
                  <li>· Top Bar Contract 3 zones</li>
                  <li>· Grilles 3 et 4 colonnes</li>
                  <li>· Visual anchors asymétriques</li>
                  <li>· Measure éditoriale 70ch</li>
                </ul>
              </div>

              <div className="p-4 bg-white border border-[#E8E8E8] rounded-xl space-y-2">
                <strong className="text-[#262626] block text-sm font-sans">1920px</strong>
                <span className="text-[#404040] block">Grand Format Institutional</span>
                <ul className="space-y-1 text-[#7D7D7D]">
                  <li>· Container max 1440px centré</li>
                  <li>· Aucun étirement incontrôlé</li>
                  <li>· Typographie contrastée stable</li>
                  <li>· Présence équilibrée en salle</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
