import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { OFFICIAL_PUBLICATIONS } from '../../data/institutionData';
import {
  FileText,
  Download,
  Search,
  ShieldCheck,
  Calendar,
  ExternalLink,
  BookOpen,
  Scale,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

const LEGAL_FRAMEWORK_DOCUMENTS = [
  {
    ref: 'TSF-ACT-2015-001',
    title: 'Statuts Fondateurs & Règlement Intérieur de Talents Sans Frontières',
    category: 'Statuts',
    date: 'Adopté en AG Constitutive 2015 · Révisé 2024',
    format: 'PDF Statutaire',
    size: '1.8 Mo',
    signatories: 'Comité Fondateur des 14 Nations'
  },
  {
    ref: 'TSF-CONV-2018-04',
    title: 'Convention Diplomatique d’Établissement & Accords de Siège',
    category: 'Accords Internationaux',
    date: 'Signé avec les Républiques Hôtes · Reconnaissance Publique',
    format: 'PDF Conforme',
    size: '2.4 Mo',
    signatories: 'Ministères des Affaires Étrangères'
  },
  {
    ref: 'TSF-ETH-2026-REV',
    title: 'Charte d’Éthique, Anti-Corruption et Indépendance Statutaire',
    category: 'Déontologie',
    date: 'Mise à jour annuelle obligatoire · Session Janvier 2026',
    format: 'PDF Certifié',
    size: '950 Ko',
    signatories: 'Comité d’Éthique et de Surveillance'
  },
  {
    ref: 'TSF-AUD-2025-FIN',
    title: 'Rapport des Commissaires aux Comptes & Certification Financière 2025',
    category: 'Audit & Comptes',
    date: 'Certifié sans réserve par Cabinet d’Audit Indépendant',
    format: 'PDF Audité',
    size: '4.2 Mo',
    signatories: 'Commissariat aux Comptes Agréé'
  }
];

export const ResourcesPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Toutes les publications' },
    { id: 'Rapport Annuel', label: 'Rapports Annuels' },
    { id: 'Référentiel', label: 'Référentiels Méthodologiques' },
    { id: 'Livre Blanc', label: 'Livres Blancs' },
    { id: 'Charte', label: 'Chartes & Déontologie' }
  ];

  const filteredPublications = OFFICIAL_PUBLICATIONS.filter((doc) => {
    const matchesCategory = selectedType === 'all' || doc.type === selectedType;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (docTitle: string) => {
    setDownloadSuccess(`Document préparé pour consultation : ${docTitle}`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="pb-24 space-y-16">
      {/* Page Header */}
      <PageHeader
        kicker="REGISTRE STATUTAIRE & TRANSPARENCE PUBLIQUE"
        title="Ressources & Publications Institutionnelles"
        description="Consultez les livres blancs, rapports d'activité audités, référentiels scientifiques et cadres réglementaires de Talents Sans Frontières."
      />

      {/* Floating Download Notification */}
      {downloadSuccess && (
        <div className="fixed bottom-6 right-6 z-[90] p-4 bg-[#262626] text-white rounded-xl shadow-2xl border border-[#0070C0]/50 flex items-center gap-3 text-xs font-mono">
          <Download className="w-4 h-4 text-[#FF6600] animate-bounce" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      <Container className="space-y-16">
        {/* ========================================================================= */}
        {/* FEATURE: FLAGSHIP 2026 ANNUAL REPORT                                      */}
        {/* ========================================================================= */}
        <section className="bg-[#121212] text-white rounded-3xl p-6 sm:p-10 border border-[#2B2B2B] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0070C0]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-[#0070C0] text-xs font-mono border border-white/10">
                <BookOpen className="w-3.5 h-3.5 text-[#0070C0]" />
                <span className="text-white">RAPPORT PHARE ÉDITION OFFICIELLE 2026</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Rapport Annuel sur l’État des Talents et la Souveraineté Intellectuelle en Afrique
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
                Fruit d’un an d’enquête de terrain, de modélisation mathématique et d’audits conjoints avec 18 universités africaines, ce document de référence dresse la cartographie précise des compétences critiques et des flux de fuite et de réinvestissement des cerveaux.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Calendar className="w-4 h-4 text-[#FF6600]" />
                  <span>Publié en Septembre 2026</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <FileText className="w-4 h-4 text-[#38BDF8]" />
                  <span>14.2 Mo · 284 pages certifiées</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Données vérifiées par tiers indépendant</span>
                </span>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleDownload('Rapport Annuel sur l’État des Talents 2026')}
                  icon={<Download className="w-4 h-4" />}
                >
                  Télécharger le rapport complet (PDF)
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={() => handleDownload('Synthèse Exécutive Décideurs (12 pages)')}
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  Synthèse Décideurs (12 p.)
                </Button>
              </div>
            </div>

            {/* Quick Stats Panel */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#38BDF8] font-bold block">
                DONNÉES DU RAPPORT 2026
              </span>
              <div className="space-y-4">
                <div className="pb-3 border-b border-white/10">
                  <span className="text-xs text-slate-400 block font-mono">Échantillon Continental Analysé</span>
                  <strong className="text-xl font-bold text-white font-mono">48 000 profils STEM</strong>
                </div>
                <div className="pb-3 border-b border-white/10">
                  <span className="text-xs text-slate-400 block font-mono">Pays et Territoires Couverts</span>
                  <strong className="text-xl font-bold text-[#FF6600] font-mono">54 Nations de l'UA</strong>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Indice Moyen de Rétention TSF</span>
                  <strong className="text-xl font-bold text-emerald-400 font-mono">84.2%</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PUBLIC PUBLICATIONS DIRECTORY & SEARCH                                   */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
              Référentiels & Livres Blancs
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#262626]">
              Catalogue des Publications & Manuels d'Ingénierie
            </h2>
            <p className="text-sm text-slate-600">
              Ces documents définissent la méthodologie, les standards déontologiques et les modèles financiers mis en œuvre par TSF.
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedType(cat.id)}
                    className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      selectedType === cat.id
                        ? 'bg-[#0070C0] text-white font-bold border-[#0070C0]'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-[#F5F5F7]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Keyword Search */}
              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Rechercher par mot-clé..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#0070C0]/20 focus:border-[#0070C0] bg-slate-50 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Publications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPublications.map((pub) => (
              <Card
                key={pub.id}
                padding="lg"
                className="border-slate-200 bg-white hover:border-[#0070C0]/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#0070C0] font-bold border border-blue-100 uppercase">
                      {pub.type}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {pub.date} · {pub.fileSize}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#262626] leading-snug">
                    {pub.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {pub.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    Format : PDF Imprimable
                  </span>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(pub.title)}
                    icon={<Download className="w-3.5 h-3.5" />}
                  >
                    Télécharger
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TABLE: OFFICIAL LEGAL & STATUTORY FRAMEWORK                               */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
              Cadre Juridique & Statuts
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#262626]">
              Actes de Gouvernance & Traités Constitutifs
            </h2>
            <p className="text-sm text-slate-600">
              Documents juridiques opposables régissant le fonctionnement de l’institution, ses privilèges et immunités opérationnelles.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#F5F5F7] border-b border-slate-200 text-[#404040] font-mono text-xs uppercase">
                  <tr>
                    <th className="py-3 px-4 font-bold">Réf. Statutaire</th>
                    <th className="py-3 px-4 font-bold">Intitulé de l'Acte</th>
                    <th className="py-3 px-4 font-bold">Autorité Signataire</th>
                    <th className="py-3 px-4 font-bold">Format</th>
                    <th className="py-3 px-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {LEGAL_FRAMEWORK_DOCUMENTS.map((item) => (
                    <tr key={item.ref} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-[#0070C0] text-xs">
                        {item.ref}
                      </td>
                      <td className="py-3.5 px-4">
                        <strong className="text-slate-900 block font-semibold text-xs sm:text-sm">
                          {item.title}
                        </strong>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {item.date}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600">
                        {item.signatories}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                        {item.format} ({item.size})
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDownload(item.title)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono text-slate-800 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#0070C0]" />
                          <span>Consulter</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STATUTORY ARCHIVE REQUEST CTA                                             */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0070C0] font-bold">
              <Scale className="w-4 h-4 text-[#FF6600]" />
              <span>Accès Réservé aux Bailleurs & Missions Diplomatiques</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#262626]">
              Besoin d'un audit sur pièces ou d'un rapport certifié spécifique ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Les ambassades, banques multilatérales de développement et commissaires aux comptes peuvent solliciter l'accès au coffre-fort documentaire complet via une procédure d'habilitation sous accord de confidentialité.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => handleDownload('Protocole d’habilitation pour accès aux archives')}
            icon={<ArrowRight className="w-4 h-4" />}
            className="shrink-0"
          >
            Demander une habilitation
          </Button>
        </section>
      </Container>
    </div>
  );
};
