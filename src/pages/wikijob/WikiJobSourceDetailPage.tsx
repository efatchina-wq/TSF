import React, { useState } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { useWikiJobSources } from '../../hooks/useWikiJobSources';
import { Container } from '../../components/ui/Container';
import { SourceTypeBadge } from '../../components/wikijob/SourceTypeBadge';
import { SourceStatusBadge } from '../../components/wikijob/SourceStatusBadge';
import { SourceCategoryBadge } from '../../components/wikijob/SourceCategoryBadge';
import { 
  Building2, 
  ExternalLink, 
  Clock, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft, 
  RefreshCw, 
  Radio, 
  Cpu, 
  Globe, 
  FileText, 
  AlertCircle, 
  Layers, 
  Share2, 
  Check, 
  MapPin, 
  ChevronRight,
  Info,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';

interface WikiJobSourceDetailPageProps {
  slug?: string;
}

export const WikiJobSourceDetailPage: React.FC<WikiJobSourceDetailPageProps> = ({ slug: propSlug }) => {
  const { currentPath, navigate } = useRouter();
  const { getSourceBySlug, testConnection, syncSource, testingId, syncingId } = useWikiJobSources();

  // Extract slug from URL if not passed as prop
  // e.g. /wikijob/sources/sica-anpe -> sica-anpe
  const activeSlug = propSlug || currentPath.split('/wikijob/sources/')[1]?.split('?')[0] || '';
  const source = getSourceBySlug(activeSlug);

  const [activeTab, setActiveTab] = useState<'opportunities' | 'news' | 'connector'>('opportunities');
  const [copiedLink, setCopiedLink] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  if (!source) {
    return (
      <div className="py-24">
        <Container>
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Organisme introuvable dans le registre
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              La source demandée (slug : <code className="font-mono text-[#0070C0]">{activeSlug}</code>) n'existe pas ou a été retirée du répertoire WikiJob.
            </p>
            <button
              type="button"
              onClick={() => navigate('/wikijob/sources')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0070C0] text-white text-xs font-mono font-bold hover:bg-[#005FA3] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retourner au Registre des Sources</span>
            </button>
          </div>
        </Container>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleManualSync = async () => {
    setSyncFeedback('Synchronisation en cours...');
    const res = await syncSource(source.id);
    setSyncFeedback(res.message);
    setTimeout(() => setSyncFeedback(null), 4000);
  };

  const formatDate = (isoStr: string | null) => {
    if (!isoStr) return 'Non renseigné';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoStr;
    }
  };

  const oppCount = source.opportunities?.length || 0;
  const newsCount = source.news?.length || 0;

  return (
    <div className="pb-24 space-y-10">
      {/* Top Breadcrumb & Return Nav */}
      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <Container>
          <div className="flex items-center justify-between text-xs font-mono">
            <button
              type="button"
              onClick={() => navigate('/wikijob/sources')}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#0070C0] font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tous les organismes béninois</span>
            </button>

            <div className="flex items-center gap-2 text-slate-400 hidden sm:flex">
              <span>WikiJob</span>
              <ChevronRight className="w-3 h-3" />
              <span>Sources</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-800 font-bold">{source.name}</span>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="space-y-8">
          {/* Main Presentation Header Card */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-10 shadow-sm relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#0070C0]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
              <div className="flex items-start gap-4 sm:gap-5">
                {/* Logo text badge */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0070C0] to-[#004D85] text-white flex items-center justify-center font-mono font-extrabold text-xl sm:text-2xl tracking-wider shadow-md shrink-0 border border-[#0070C0]/30">
                  {source.logo_text || source.name.substring(0, 4).toUpperCase()}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-xl sm:text-3xl font-extrabold text-[#262626] tracking-tight">
                      {source.name}
                    </h1>
                    {source.official && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        <span>Source Officielle</span>
                      </span>
                    )}
                    <SourceStatusBadge status={source.sync_status} active={source.active} />
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono">
                    <span className="font-semibold text-slate-700">Pays : {source.country}</span>
                    <span>•</span>
                    <span>Tutelle : {source.operator_name || 'Organisme Public'}</span>
                    <span>•</span>
                    <span>Slug : <code className="text-slate-800 font-bold">{source.slug}</code></span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {source.categories.map((c) => (
                      <SourceCategoryBadge key={c} category={c} size="sm" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Site officiel + Share + Manual Sync */}
              <div className="flex flex-wrap items-center gap-2 sm:self-start shrink-0">
                <a
                  href={source.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono font-bold text-xs rounded-xl transition-all shadow-xs"
                >
                  <Globe className="w-4 h-4 text-white" />
                  <span>Site officiel</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={handleManualSync}
                  disabled={syncingId === source.id}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs rounded-xl transition-all cursor-pointer"
                  title="Forcer une synchronisation d'actualisation"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncingId === source.id ? 'animate-spin text-[#0070C0]' : ''}`} />
                  <span className="hidden sm:inline">Synchroniser</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs rounded-xl transition-all cursor-pointer"
                  title="Partager cette source"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copié !' : 'Partager'}</span>
                </button>
              </div>
            </div>

            {/* Sync feedback notification */}
            {syncFeedback && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs font-mono text-blue-800 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{syncFeedback}</span>
              </div>
            )}

            {/* Presentation description text */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                PRÉSENTATION DU DISPOSITIF
              </span>
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                {source.description}
              </p>
            </div>

            {/* Technical Metadata Bar (Type, Frequency, Last Sync, Endpoints) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  MÉTHODE D'ACQUISITION
                </span>
                <SourceTypeBadge type={source.source_type} size="sm" />
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  DERNIÈRE SYNCHRONISATION
                </span>
                <div className="text-xs font-mono font-bold text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{formatDate(source.last_checked_at || source.last_success_at)}</span>
                </div>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  FRÉQUENCE DE SURVEILLANCE
                </span>
                <div className="text-xs font-mono font-bold text-[#0070C0]">
                  {source.frequency === 'HOURLY' ? 'Horaire (chaque heure)' : source.frequency === 'DAILY' ? 'Quotidienne (24h)' : source.frequency === 'WEEKLY' ? 'Hebdomadaire' : 'Manuelle'}
                </div>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  OPPORTUNITÉS INDEXÉES
                </span>
                <div className="text-xs font-mono font-bold text-[#FF6600]">
                  {oppCount} active{oppCount > 1 ? 's' : ''} • {newsCount} actualité{newsCount > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs between Opportunities, News, and Connector Spec */}
          <div className="flex border-b border-slate-200 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('opportunities')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'opportunities'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Opportunités publiées ({oppCount})</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('news')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'news'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Actualités & Communiqués ({newsCount})</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('connector')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'connector'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>Spécification du Connecteur</span>
              </div>
            </button>
          </div>

          {/* TAB 1: OPPORTUNITIES */}
          {activeTab === 'opportunities' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  Dernières publications d’opportunités de {source.name}
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Indexées et auditées en continu
                </span>
              </div>

              {source.opportunities && source.opportunities.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {source.opportunities.map((opp) => (
                    <div 
                      key={opp.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-[#0070C0]/30 transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <SourceCategoryBadge category={opp.category} size="sm" />
                            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {opp.type}
                            </span>
                            {opp.reference && (
                              <span className="text-[10px] font-mono text-slate-400">
                                Réf : {opp.reference}
                              </span>
                            )}
                          </div>

                          <h4 className="text-base sm:text-lg font-bold text-slate-900 pt-1">
                            {opp.title}
                          </h4>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-500 pt-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{opp.location}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[#FF6600] font-semibold">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>Date limite : {opp.deadline}</span>
                            </div>
                          </div>
                        </div>

                        <a
                          href={opp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 shrink-0 self-start cursor-pointer transition-colors shadow-xs"
                        >
                          <span>Postuler sur le site source</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                        {opp.description}
                      </p>

                      {opp.beneficiaries && (
                        <div className="p-3 bg-slate-50 rounded-xl text-xs font-mono text-slate-600 flex items-center gap-2 border border-slate-100">
                          <span className="text-slate-400 font-bold uppercase text-[10px]">Cible d'admissibilité :</span>
                          <span className="text-slate-800 font-medium">{opp.beneficiaries}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 bg-white rounded-2xl border border-dashed border-slate-200 text-center space-y-2">
                  <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
                  <h4 className="font-bold text-slate-800 text-sm">
                    Aucune opportunité ouverte actuellement
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Le dernier scan de cet organisme n'a pas détecté de nouvel appel d'offres en cours de candidature.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: NEWS */}
          {activeTab === 'news' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  Actualités et communiqués officiels
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Publications institutionnelles
                </span>
              </div>

              {source.news && source.news.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {source.news.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-[#0070C0]/30 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                              {item.category}
                            </span>
                            <span className="text-xs font-mono text-slate-400">
                              Publié le {formatDate(item.published_at)}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-slate-900 pt-1 font-sans">
                            {item.title}
                          </h4>
                        </div>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-mono rounded-lg flex items-center gap-1.5 shrink-0 self-start transition-colors"
                        >
                          <span>Lire le communiqué</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                        {item.summary}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 bg-white rounded-2xl border border-dashed border-slate-200 text-center space-y-2">
                  <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                  <h4 className="font-bold text-slate-800 text-sm">
                    Aucun communiqué récent indexé
                  </h4>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONNECTOR ARCHITECTURE SPECIFICATION */}
          {activeTab === 'connector' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#0070C0]" />
                  <h3 className="text-lg font-bold text-slate-900 font-sans">
                    Spécification Technique du Connecteur d'Acquisition
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-sans">
                  Détail de la méthode d'interfaçage programmée dans l'architecture WikiJob pour cet organisme.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <span className="text-[11px] font-mono text-slate-500 uppercase font-bold block">
                    PARAMÈTRES DU CONNECTEUR
                  </span>
                  
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span className="text-slate-500">Nom de l'adaptateur :</span>
                      <strong className="text-[#0070C0]">{source.connector_spec?.adapter_name || 'N/A'}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span className="text-slate-500">Version du protocole :</span>
                      <strong className="text-slate-800">{source.connector_spec?.version || '1.0.0'}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span className="text-slate-500">Authentification requise :</span>
                      <strong className={source.connector_spec?.requires_auth ? 'text-amber-700' : 'text-emerald-700'}>
                        {source.connector_spec?.requires_auth ? 'Oui (Clé API / Token)' : 'Non (Public)'}
                      </strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span className="text-slate-500">Limite requêtes / minute :</span>
                      <strong className="text-slate-800">{source.connector_spec?.rate_limit_per_min || 15} req/min</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Scraping web activé :</span>
                      <strong className={source.scraping_enabled ? 'text-emerald-700' : 'text-slate-500'}>
                        {source.scraping_enabled ? 'Activé (HTML Parser)' : 'Désactivé'}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <span className="text-[11px] font-mono text-slate-500 uppercase font-bold block">
                    SÉLECTEURS & ENDPOINTS CONFIGURÉS
                  </span>

                  <div className="space-y-2 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 block mb-1">Point d'accès API officiel :</span>
                      <code className="text-slate-700 bg-white p-2 rounded-lg border border-slate-200 block truncate">
                        {source.api_url || 'Aucun point d’accès API public (conforme)'}
                      </code>
                    </div>

                    <div>
                      <span className="text-slate-500 block mb-1">Flux RSS / Atom officiel :</span>
                      <code className="text-slate-700 bg-white p-2 rounded-lg border border-slate-200 block truncate">
                        {source.rss_url || 'Aucun flux RSS/Atom identifié'}
                      </code>
                    </div>

                    <div>
                      <span className="text-slate-500 block mb-1">Sélecteurs CSS cibles :</span>
                      <div className="flex flex-wrap gap-1">
                        {source.connector_spec?.target_selectors && source.connector_spec.target_selectors.length > 0 ? (
                          source.connector_spec.target_selectors.map((sel, idx) => (
                            <span key={idx} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] text-[#0070C0]">
                              {sel}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 italic text-xs">Aucun sélecteur arbitraire (connecteur API ou import manuel)</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {source.connector_spec?.notes && (
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/60 text-xs font-mono text-amber-900 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-amber-800 block">
                    NOTES D'INGÉNIERIE & DÉONTOLOGIE :
                  </span>
                  <p>{source.connector_spec.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
