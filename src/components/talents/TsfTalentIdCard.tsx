import React, { useState } from 'react';
import { TsfTalentIdCard as ITsfTalentIdCard } from '../../types/talent';
import { 
  ShieldCheck, 
  QrCode, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Award, 
  Fingerprint, 
  Lock 
} from 'lucide-react';

interface TsfTalentIdCardProps {
  card: ITsfTalentIdCard;
  talentName: string;
  photoUrl?: string;
  country: string;
  domain: string;
  showInteractiveDetails?: boolean;
}

export const TsfTalentIdCard: React.FC<TsfTalentIdCardProps> = ({
  card,
  talentName,
  photoUrl,
  country,
  domain,
  showInteractiveDetails = true
}) => {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(card.uniqueId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'propulse':
        return 'bg-amber-400/20 text-amber-200 border-amber-400/40';
      case 'certifie':
        return 'bg-emerald-400/20 text-emerald-200 border-emerald-400/40';
      case 'en_incubation':
        return 'bg-blue-400/20 text-blue-200 border-blue-400/40';
      case 'en_evaluation':
        return 'bg-purple-400/20 text-purple-200 border-purple-400/40';
      default:
        return 'bg-slate-400/20 text-slate-200 border-slate-400/40';
    }
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#262626] via-[#1E293B] to-[#0F172A] text-white shadow-2xl border border-[#0070C0]/30 p-6 sm:p-8 backdrop-blur-md">
        {/* Holographic Guilloche Ambient Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#0070c0_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#0070C0]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#FF6600]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Security Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#0070C0]/20 border border-[#0070C0]/40 flex items-center justify-center text-[#38BDF8] shadow-inner">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono tracking-widest text-[#FF6600] uppercase font-bold">
                  TSF-ID DIGITAL PASSPORT
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white/80 border border-white/20">
                  OFFICIEL
                </span>
              </div>
              <h4 className="text-xs text-slate-300 font-mono">
                RÉPUBLIQUE DES TALENTS • ACCRÉDITATION PANAFRICAINE
              </h4>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium border flex items-center gap-1.5 ${getStatusColor(card.status)}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              {card.statusLabel}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
          {/* Photo & Biometric Hash */}
          <div className="md:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-3">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-[#0070C0]/50 shadow-lg relative bg-slate-800">
                {photoUrl ? (
                  <img 
                    src={photoUrl} 
                    alt={talentName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/40">
                    <Fingerprint className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-1 right-1 bg-[#FF6600] text-white p-1 rounded">
                  <Fingerprint className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="absolute -bottom-2 -left-2 bg-[#262626] border border-[#0070C0]/40 text-[10px] font-mono text-[#38BDF8] px-2 py-0.5 rounded shadow">
                {card.nationalCode}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 block">DÉTENTEUR ACCRÉDITÉ</span>
              <div className="text-lg font-bold text-white tracking-tight">{talentName}</div>
              <div className="text-xs text-slate-300 font-mono mt-0.5">{country} • {domain}</div>
            </div>
          </div>

          {/* Central Biometrics & Level */}
          <div className="md:col-span-8 space-y-4">
            {/* Unique ID with Copy */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  IDENTIFIANT UNIQUE INFALSIFIABLE (TSF-ID)
                </span>
                <span className="text-base sm:text-lg font-mono font-bold text-amber-300 tracking-wider">
                  {card.uniqueId}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyId}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-1.5 transition-colors border border-white/10"
                  title="Copier l'identifiant"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowQrModal(true)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white transition-colors border border-white/10"
                  title="Afficher le QR code officiel"
                >
                  <QrCode className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>

            {/* Level & Certifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Award className="w-3 h-3" /> NIVEAU D'ÉLÉVATION TSF
                </span>
                <span className="font-semibold text-white block">
                  {card.level}
                </span>
                <span className="text-[11px] text-slate-300 font-mono mt-0.5 block">
                  Délivré le : {card.issuingDate}
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Lock className="w-3 h-3" /> CERTIFICATIONS CLÉS
                </span>
                <div className="space-y-1">
                  {card.certifications.slice(0, 2).map((cert, idx) => (
                    <div key={idx} className="truncate text-white font-medium text-[11px] flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Radar / Pills */}
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                COMPÉTENCES AUDITÉES & HOMOLOGUÉES PAR LE JURY :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {card.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-200 border border-amber-500/30"
                  >
                    <Sparkles className="w-2.5 h-2.5 mr-1 text-amber-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security Footer Bar */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Registre immuable : <strong className="text-white">{card.blockchainRecordId}</strong></span>
          </div>
          <div className="truncate max-w-xs text-slate-400" title={card.cryptographicSignature}>
            Hash : <span className="text-slate-300 font-mono">{card.cryptographicSignature.slice(0, 20)}...</span>
          </div>
        </div>
      </div>

      {/* QR Code Verification Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#262626] border border-[#0070C0]/40 rounded-2xl p-5 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl relative text-white my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-[#FF6600] uppercase tracking-widest">
                CERTIFICAT DE VÉRIFICATION
              </span>
              <button 
                onClick={() => setShowQrModal(false)}
                className="text-white/60 hover:text-white text-sm font-mono cursor-pointer"
              >
                ✕ Fermer
              </button>
            </div>

            <div className="bg-white p-4 rounded-xl inline-block mx-auto shadow-md">
              {/* Simulated QR Code SVG */}
              <div className="w-48 h-48 bg-slate-900 rounded p-2 flex flex-col items-center justify-center relative">
                <div className="grid grid-cols-6 gap-1 w-full h-full p-2">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded-xs ${
                        (i % 2 === 0 || i % 7 === 0 || i < 6 || i > 29) 
                          ? 'bg-[#0070C0]' 
                          : 'bg-white/90'
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-2 bg-[#262626] rounded border border-[#0070C0]">
                    <ShieldCheck className="w-6 h-6 text-[#38BDF8]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-sm text-white">{talentName}</div>
              <div className="text-xs font-mono text-[#38BDF8]">{card.uniqueId}</div>
              <p className="text-[11px] text-slate-300 pt-2">
                Scannez pour vérifier l'authenticité de l'accréditation auprès du greffe académique TSF.
              </p>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white font-bold text-xs rounded-lg transition-colors uppercase tracking-wider cursor-pointer font-mono"
            >
              Fermer la fenêtre
            </button>
          </div>
        </div>
      )}
    </>
  );
};
