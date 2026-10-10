import React from 'react';
import { useRouter } from '../../hooks/useRouter';
import { PageHeader } from '../../components/layout/PageHeader';
import { SubNav, SubNavItem } from '../../components/navigation/SubNav';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PartnerCard } from '../../components/cards/PartnerCard';
import { PARTNER_CATEGORIES, SAMPLE_PARTNERS } from '../../data/institutionData';
import { EnterprisePathwayView } from '../../components/partners/EnterprisePathwayView';
import { BailleurPathwayView } from '../../components/partners/BailleurPathwayView';
import { OscDiagnosticView } from '../../components/partners/OscDiagnosticView';
import { PartnerDashboardView } from '../../components/partners/PartnerDashboardView';
import { 
  Building2, 
  Landmark, 
  Globe, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  ClipboardCheck, 
  LayoutDashboard, 
  Layers, 
  CheckCircle2, 
  TrendingUp, 
  Users 
} from 'lucide-react';

const PARTNER_SUB_NAV: SubNavItem[] = [
  { id: 'overview', label: 'Portail Alliances', path: '/partenaires' },
  { id: 'dashboard', label: 'Tableau de Bord Partenaire', path: '/partenaires/dashboard' },
  { id: 'entreprises', label: 'Entreprise & Industrie', path: '/partenaires/entreprises' },
  { id: 'bailleurs', label: 'Bailleur / PTF', path: '/partenaires/bailleurs' },
  { id: 'osc', label: 'OSC & Diagnostic', path: '/partenaires/osc' },
  { id: 'institutions', label: 'Institutions Publiques', path: '/partenaires/institutions' }
];

export const PartnersPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  const isEntreprise = currentPath === '/partenaires/entreprises';
  const isBailleur = currentPath === '/partenaires/bailleurs';
  const isOsc = currentPath === '/partenaires/osc' || currentPath === '/partenaires/diagnostic';
  const isDashboard = currentPath === '/partenaires/dashboard';
  const isInstitutions = currentPath === '/partenaires/institutions';
  const isOverview = !isEntreprise && !isBailleur && !isOsc && !isDashboard && !isInstitutions;

  return (
    <div className="pb-24 space-y-10">
      <PageHeader
        kicker="TSF PARTNERS PORTAL • ALLIANCES STRATÉGIQUES"
        title="Plateforme Institutionnelle des Partenariats"
        description="Fédérer le secteur privé, les banques multilatérales de développement et la société civile pour bâtir une souveraineté humaine panafricaine durable."
      >
        <SubNav items={PARTNER_SUB_NAV} />
      </PageHeader>

      <Container>
        {/* ========================================================================= */}
        {/* ROUTE: /partenaires/entreprises                                           */}
        {/* ========================================================================= */}
        {isEntreprise && <EnterprisePathwayView />}

        {/* ========================================================================= */}
        {/* ROUTE: /partenaires/bailleurs                                             */}
        {/* ========================================================================= */}
        {isBailleur && <BailleurPathwayView />}

        {/* ========================================================================= */}
        {/* ROUTE: /partenaires/osc ou /partenaires/diagnostic                       */}
        {/* ========================================================================= */}
        {isOsc && <OscDiagnosticView />}

        {/* ========================================================================= */}
        {/* ROUTE: /partenaires/dashboard                                             */}
        {/* ========================================================================= */}
        {isDashboard && <PartnerDashboardView />}

        {/* ========================================================================= */}
        {/* ROUTE: /partenaires/institutions                                          */}
        {/* ========================================================================= */}
        {isInstitutions && (
          <div className="space-y-10 max-w-4xl mx-auto">
            <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF6600] font-bold">
                  Alliances Régaliennes & Traités
                </span>
                <h2 className="text-3xl font-bold text-[#262626] font-sans mt-1">
                  Coopération avec les États & Institutions Publiques
                </h2>
                <p className="text-sm text-[#595959] mt-2 leading-relaxed font-sans">
                  TSF conclut des accords de siège, des conventions de détachement d’experts et des protocoles de renforcement avec les ministères de l’Enseignement Supérieur, de l’Économie et de la Fonction Publique.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-[#F5F5F7] border border-[#E8E8E8] rounded-xl space-y-2 text-xs">
                  <h4 className="font-bold text-[#262626] text-sm font-sans">Accords de Siège & Franchises</h4>
                  <p className="text-[#595959] leading-relaxed font-sans">
                    Facilités d’implantation territoriale des 18 hubs régionaux, reconnaissance d’utilité publique et étanchéité diplomatique des jurys académiques.
                  </p>
                </div>

                <div className="p-5 bg-[#F5F5F7] border border-[#E8E8E8] rounded-xl space-y-2 text-xs">
                  <h4 className="font-bold text-[#262626] text-sm font-sans">Détachement Stratégique</h4>
                  <p className="text-[#595959] leading-relaxed font-sans">
                    Mise à disposition temporaire de lauréats certifiés TSF pour conduire des projets informatiques ou économiques prioritaires de souveraineté nationale.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#121212] text-white rounded-xl flex items-center justify-between text-xs font-mono">
                <span>Contactez le Secrétariat Général aux Traités Bilatéraux</span>
                <Button variant="primary" size="sm" onClick={() => navigate('/contact')}>
                  Prendre attache
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ROUTE: /partenaires (OVERVIEW PORTAL)                                      */}
        {/* ========================================================================= */}
        {isOverview && (
          <div className="space-y-16">
            {/* Top Gateway Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-[#121212] text-white p-8 sm:p-12 border border-[#2B2B2B] shadow-xl">
              <div className="relative z-10 max-w-4xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-[#FF6600] text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TSF PARTNERS PORTAL • CADRE UNIFIÉ DES ALLIANCES</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
                  Trois Parcours d'Alliance pour Bâtir l'Avenir Africain
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl font-sans">
                  Talents Sans Frontières structure ses collaborations autour de trois parcours dédiés dotés d'outils opérationnels : les <strong>Entreprises</strong> pour le mécénat et le recrutement, les <strong>Bailleurs & PTF</strong> pour la rigueur fiduciaire et la Théorie du Changement, et les <strong>Organisations de la Société Civile (OSC)</strong> via notre diagnostic de maturité en 7 dimensions.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Button
                    variant="accent"
                    size="md"
                    onClick={() => navigate('/partenaires/dashboard')}
                    icon={<LayoutDashboard className="w-4 h-4" />}
                  >
                    Accéder au Partner Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => navigate('/partenaires/osc')}
                    icon={<ClipboardCheck className="w-4 h-4 text-[#FF6600]" />}
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Lancer le Diagnostic OSC
                  </Button>
                </div>
              </div>
            </div>

            {/* THREE PRIMARY PATHWAYS CARDS */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E8E8] pb-3">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FF6600] font-bold block">
                    TYPOLOGIE D'ENGAGEMENT
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#262626] font-sans">
                    Choisissez Votre Parcours Partenaire
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#7D7D7D]">
                  Solutions calibrées selon votre mandat
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 1. ENTREPRISE */}
                <div className="bg-white border border-[#E8E8E8] hover:border-[#0070C0]/50 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-[#EBF5FC] text-[#0070C0] border border-[#A3D1F1] flex items-center justify-center shadow-xs">
                      <Building2 className="w-7 h-7" />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-[#0070C0] block">
                        PARCOURS SECTEUR PRIVÉ
                      </span>
                      <h3 className="text-xl font-bold text-[#262626] font-sans">ENTREPRISE</h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#595959] leading-relaxed font-sans">
                      Sponsorisez des chaires, recrutez des profils certifiés TSF-ID, mobilisez des mentors et co-investissez dans l'innovation.
                    </p>

                    <div className="p-4 bg-[#F5F5F7] rounded-xl space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#7D7D7D] block">
                        Les 6 Modalités Disponibles :
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono text-[#404040]">
                        <span className="flex items-center gap-1"><span className="text-[#FF6600] font-bold">✓</span> Sponsoriser</span>
                        <span className="flex items-center gap-1"><span className="text-[#FF6600] font-bold">✓</span> Recruter</span>
                        <span className="flex items-center gap-1"><span className="text-[#FF6600] font-bold">✓</span> Mentorer</span>
                        <span className="flex items-center gap-1"><span className="text-[#FF6600] font-bold">✓</span> Financer</span>
                        <span className="flex items-center gap-1"><span className="text-[#FF6600] font-bold">✓</span> Créer un challenge</span>
                        <span className="flex items-center gap-1"><span className="text-[#FF6600] font-bold">✓</span> Développer un prog.</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => navigate('/partenaires/entreprises')}
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="w-full"
                  >
                    Découvrir le parcours Entreprise
                  </Button>
                </div>

                {/* 2. BAILLEUR / PTF */}
                <div className="bg-white border border-[#E8E8E8] hover:border-[#0070C0]/50 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-[#EBF5FC] text-[#0070C0] border border-[#A3D1F1] flex items-center justify-center shadow-xs">
                      <Landmark className="w-7 h-7" />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-[#0070C0] block">
                        FINANCE D'IMPACT & DÉVELOPPEMENT
                      </span>
                      <h3 className="text-xl font-bold text-[#262626] font-sans">BAILLEUR / PTF</h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#595959] leading-relaxed font-sans">
                      Investissez dans des programmes structurants appuyés par une gouvernance irréprochable et un plafond de frais généraux à 8%.
                    </p>

                    <div className="p-4 bg-[#F5F5F7] rounded-xl space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#7D7D7D] block">
                        Garanties Institutionnelles :
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono text-[#404040]">
                        <span className="flex items-center gap-1"><span className="text-[#0070C0] font-bold">✓</span> Portefeuille projets</span>
                        <span className="flex items-center gap-1"><span className="text-[#0070C0] font-bold">✓</span> Indicateurs ODD</span>
                        <span className="flex items-center gap-1"><span className="text-[#0070C0] font-bold">✓</span> Theory of Change</span>
                        <span className="flex items-center gap-1"><span className="text-[#0070C0] font-bold">✓</span> Rapports IFRS</span>
                        <span className="flex items-center gap-1"><span className="text-[#0070C0] font-bold">✓</span> Budget 92% terrain</span>
                        <span className="flex items-center gap-1"><span className="text-[#0070C0] font-bold">✓</span> Transparence totale</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => navigate('/partenaires/bailleurs')}
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="w-full border-[#0070C0] text-[#0070C0] hover:bg-[#EBF5FC]"
                  >
                    Découvrir le parcours Bailleur / PTF
                  </Button>
                </div>

                {/* 3. OSC */}
                <div className="bg-white border border-[#E8E8E8] hover:border-[#0E8A5E]/50 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-[#ECFDF5] text-[#0E8A5E] border border-[#A7F3D0] flex items-center justify-center shadow-xs">
                      <Globe className="w-7 h-7" />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-[#0E8A5E] block">
                        SOCIÉTÉ CIVILE & COLLECTIFS
                      </span>
                      <h3 className="text-xl font-bold text-[#262626] font-sans">OSC & DIAGNOSTIC</h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#595959] leading-relaxed font-sans">
                      Évaluez votre maturité organisationnelle en 7 dimensions et accédez aux appuis méthodologiques TSF pour décupler votre impact.
                    </p>

                    <div className="p-4 bg-[#F5F5F7] rounded-xl space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#7D7D7D] block">
                        Les 7 Piliers Évalués :
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono text-[#404040]">
                        <span>• Gouvernance</span>
                        <span>• Financement</span>
                        <span>• Digitalisation</span>
                        <span>• RH & Équité</span>
                        <span>• Communication</span>
                        <span>• Suivi-évaluation</span>
                        <span className="col-span-2">• Mobilisation ressources</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => navigate('/partenaires/osc')}
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="w-full border-[#0E8A5E] text-[#0E8A5E] hover:bg-[#ECFDF5]"
                  >
                    Lancer le TSF OSC Diagnostic
                  </Button>
                </div>
              </div>
            </div>

            {/* DASHBOARD PREVIEW BAR */}
            <div className="p-6 bg-[#F5F5F7] border border-[#E8E8E8] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#0070C0] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#262626] font-sans">Espace Cockpit : Partner Dashboard</h4>
                  <p className="text-xs text-[#595959] font-sans">
                    Gérez vos programmes soutenus, candidatures, documents contractuels, indicateurs d'impact, opportunités et échanges sécurisés.
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/partenaires/dashboard')}
                icon={<ArrowRight className="w-4 h-4" />}
                className="shrink-0"
              >
                Ouvrir le Partner Dashboard
              </Button>
            </div>

            {/* ACTIVE SIGNED STRATEGIC PARTNERS SHOWCASE */}
            <div className="space-y-6 pt-6 border-t border-[#E8E8E8]">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#FF6600] font-bold block">
                  ALLIANCES EN COURS D'EXÉCUTION
                </span>
                <h3 className="text-2xl font-bold text-[#262626] font-sans">
                  Partenaires Référents & Accords de Siège
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SAMPLE_PARTNERS.map((partner) => (
                  <PartnerCard key={partner.id} {...partner} />
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
