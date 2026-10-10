import React, { useState, useEffect } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { PageHeader } from '../../components/layout/PageHeader';
import { Container } from '../../components/ui/Container';
import { SubNav, SubNavItem } from '../../components/navigation/SubNav';
import { Card } from '../../components/ui/Card';
import { ExcellenceTiersView } from '../../components/certification/ExcellenceTiersView';
import { VerifyCertificateForm } from '../../components/certification/VerifyCertificateForm';
import { CertificateVerificationCard } from '../../components/certification/CertificateVerificationCard';
import { QrCodeGeneratorShowcase } from '../../components/certification/QrCodeGeneratorShowcase';
import { CertificateQrCode } from '../../components/certification/CertificateQrCode';
import { DEMO_CERTIFICATIONS_REGISTRY, EXCELLENCE_TIERS, verifyCertificateCode } from '../../data/certificationData';
import { CertificationVerificationResult, ExcellenceTier } from '../../types/certification';
import { 
  ShieldCheck, 
  Search, 
  Award, 
  CheckCircle2, 
  QrCode, 
  Sparkles, 
  FileCheck, 
  Layers, 
  Lock, 
  Users, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const CertificationPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  // Determine active view based on path or tab state
  const isVerifyUrl = currentPath === '/certification/verify' || currentPath.startsWith('/certification/verify');
  
  const [activeTab, setActiveTab] = useState<'tiers' | 'verify' | 'qrcode' | 'method'>(() => {
    return isVerifyUrl ? 'verify' : 'tiers';
  });

  const [verificationResult, setVerificationResult] = useState<CertificationVerificationResult | null>(() => {
    // Check if URL has a code parameter or if we can pre-load a default verified certificate when landing directly on verify
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const codeParam = urlParams.get('code');
      if (codeParam) {
        return verifyCertificateCode(codeParam);
      }
    }
    return null;
  });

  // Sync state if user navigates to /certification/verify
  useEffect(() => {
    if (currentPath === '/certification/verify') {
      setActiveTab('verify');
    } else if (currentPath === '/certification') {
      if (activeTab === 'verify' && !verificationResult) {
        setActiveTab('tiers');
      }
    }
  }, [currentPath]);

  const subNavItems: SubNavItem[] = [
    {
      id: 'tiers',
      label: 'EXCELLENCE TSF (Bronze, Argent, Or)',
      path: '/certification',
      active: activeTab === 'tiers'
    },
    {
      id: 'verify',
      label: 'Vérifier une Certification (/verify)',
      path: '/certification/verify',
      active: activeTab === 'verify'
    },
    {
      id: 'qrcode',
      label: 'Composant Visuel QR Code',
      path: '/certification',
      active: activeTab === 'qrcode'
    },
    {
      id: 'method',
      label: 'Référentiel & Déontologie',
      path: '/certification',
      active: activeTab === 'method'
    }
  ];

  const handleSubNavClick = (item: SubNavItem) => {
    if (item.id === 'verify') {
      setActiveTab('verify');
      navigate('/certification/verify');
    } else {
      setActiveTab(item.id as any);
      navigate('/certification');
    }
  };

  const handleVerified = (result: CertificationVerificationResult) => {
    setVerificationResult(result);
    setActiveTab('verify');
  };

  const handleResetVerification = () => {
    setVerificationResult(null);
  };

  return (
    <div className="pb-24 space-y-10">
      <PageHeader
        kicker="STANDARDS PANAFRICAINS DE QUALIFICATION & HOMOLOGUATION"
        title="TSF CERTIFICATION — L'Excellence Reconnue & Infalsifiable"
        description="Le label souverain attestant de la rigueur cognitive, de l'intégrité déontologique et du leadership d'impact des cadres et dirigeants d'Afrique."
      />

      <Container>
        <div className="space-y-10">
          {/* Sub-navigation bar */}
          <SubNav
            items={subNavItems}
            activeId={activeTab}
            onItemClick={handleSubNavClick}
          />

          {/* ========================================================================= */}
          {/* TAB 1: EXCELLENCE TSF (BRONZE, ARGENT, OR)                                */}
          {/* ========================================================================= */}
          {activeTab === 'tiers' && (
            <div className="space-y-12">
              <ExcellenceTiersView
                onSelectTier={() => {}}
                onVerifyClick={() => {
                  setActiveTab('verify');
                  navigate('/certification/verify');
                }}
              />

              {/* Fast-track Verify Callout Banner */}
              <div className="bg-[#121212] text-white rounded-2xl p-8 sm:p-10 border border-[#2B2B2B] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-[#FF6600] text-xs font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>REGISTRE NUMÉRIQUE CENTRAL</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans">
                    Vous recrutez ou financez un lauréat TSF ?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-sans">
                    Vérifiez immédiatement la validité légale de son diplôme, son palier d'excellence et l'identité des membres du jury d'évaluation sur la page dédiée <code>/certification/verify</code>.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('verify');
                    navigate('/certification/verify');
                  }}
                  className="px-6 py-3.5 bg-[#FF6600] hover:bg-[#E65500] text-white font-bold rounded-xl text-xs font-mono flex items-center gap-2 shrink-0 transition-all shadow-md cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Accéder à /certification/verify</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: PAGE /certification/verify (CHAMP + 7 CHAMPS RÉSULTAT + QR CODE)    */}
          {/* ========================================================================= */}
          {activeTab === 'verify' && (
            <div className="space-y-10">
              {/* If no result verified yet, show search input form */}
              {!verificationResult ? (
                <VerifyCertificateForm onVerified={handleVerified} />
              ) : (
                <div className="space-y-6">
                  {/* Result Card with all 7 requested fields + QR code */}
                  <CertificateVerificationCard 
                    result={verificationResult} 
                    onResetSearch={handleResetVerification}
                  />

                  {/* Secondary Search Bar below result for quick subsequent lookup */}
                  <div className="pt-6">
                    <VerifyCertificateForm onVerified={handleVerified} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: QR CODE SHOWCASE & COMPONENT DEMO                                 */}
          {/* ========================================================================= */}
          {activeTab === 'qrcode' && (
            <div className="space-y-10">
              <QrCodeGeneratorShowcase />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: LES 3 PILIERS DU RÉFÉRENTIEL D'ÉVALUATION                         */}
          {/* ========================================================================= */}
          {activeTab === 'method' && (
            <div className="space-y-10">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF6600] font-bold block">
                  ÉTHIQUE & DÉONTOLOGIE CIVIQUE
                </span>
                <h3 className="text-3xl font-extrabold text-[#262626] font-sans">
                  Les Trois Piliers Fondateurs du Référentiel TSF
                </h3>
                <p className="text-sm text-[#595959] font-sans">
                  L'homologation TSF ne sanctionne pas seulement un savoir théorique, mais une posture éprouvée d'intégrité, de patriotisme économique et d'indépendance intellectuelle.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card padding="lg" className="border-t-4 border-t-[#0070C0] space-y-4 shadow-xs bg-white">
                  <div className="w-12 h-12 rounded-xl bg-[#EBF5FC] text-[#0070C0] border border-[#A3D1F1] flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[#262626] text-lg font-sans">
                    1. Rigueur Technique & Méthodologique
                  </h4>
                  <p className="text-xs text-[#595959] leading-relaxed font-sans">
                    Maîtrise éprouvée des outils fondamentaux, pensée analytique sans faille, manipulation rigoureuse des données complexes et capacité à concevoir des architectures robustes et frugales adaptées aux réalités africaines.
                  </p>
                  <ul className="text-[11px] font-mono text-[#7D7D7D] space-y-1 pt-2 border-t border-[#E8E8E8]">
                    <li>• Épreuves psychométriques chronométrées</li>
                    <li>• Études de cas sous haute contrainte</li>
                    <li>• Soutenance devant pairs sectoriels</li>
                  </ul>
                </Card>

                <Card padding="lg" className="border-t-4 border-t-[#FF6600] space-y-4 shadow-xs bg-white">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF3EB] text-[#FF6600] border border-[#FFC49E] flex items-center justify-center">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[#262626] text-lg font-sans">
                    2. Intelligence Situationnelle & Leadership
                  </h4>
                  <p className="text-xs text-[#595959] leading-relaxed font-sans">
                    Gestion de la complexité sous pression, éloquence stratégique, diplomatie multipartite et résilience managériale face à l'imprévu. Capacité à rallier des collectifs autour d'une vision panafricaine ambitieuse.
                  </p>
                  <ul className="text-[11px] font-mono text-[#7D7D7D] space-y-1 pt-2 border-t border-[#E8E8E8]">
                    <li>• Mises en situation de crise simulée</li>
                    <li>• Négociation multilatérale à forts enjeux</li>
                    <li>• Évaluation 360° du tempérament éthique</li>
                  </ul>
                </Card>

                <Card padding="lg" className="border-t-4 border-t-[#0E8A5E] space-y-4 shadow-xs bg-white">
                  <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#0E8A5E] border border-[#A7F3D0] flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[#262626] text-lg font-sans">
                    3. Déontologie & Servitude Civique
                  </h4>
                  <p className="text-xs text-[#595959] leading-relaxed font-sans">
                    Intégrité financière absolue, refus systématique de la corruption et des passe-droits, respect strict du secret professionnel et engagement solennel envers le bien commun des peuples africains.
                  </p>
                  <ul className="text-[11px] font-mono text-[#7D7D7D] space-y-1 pt-2 border-t border-[#E8E8E8]">
                    <li>• Enquête de moralité et casier judiciaire</li>
                    <li>• Signature solennelle de la Charte TSF</li>
                    <li>• Réserve et déontologie vérifiées à vie</li>
                  </ul>
                </Card>
              </div>

              {/* Bottom CTA to verify */}
              <div className="p-6 bg-[#F5F5F7] rounded-2xl border border-[#E8E8E8] text-center space-y-3">
                <span className="text-xs font-mono text-[#7D7D7D] block">
                  Tous les récipiendaires reçoivent un certificat officiel scellé avec QR Code matriciel unique.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('verify');
                    navigate('/certification/verify');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0070C0] text-white text-xs font-mono font-semibold hover:bg-[#005FA3] cursor-pointer shadow-xs"
                >
                  <Search className="w-4 h-4 text-white" />
                  <span>Vérifier un code de certification dès maintenant</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
