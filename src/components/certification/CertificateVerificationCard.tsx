import React, { useState } from 'react';
import { CertificationVerificationResult } from '../../types/certification';
import { CertificateQrCode } from './CertificateQrCode';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Calendar, 
  User, 
  Building2, 
  Printer, 
  Share2, 
  Check, 
  Copy, 
  ExternalLink, 
  Lock, 
  FileText,
  FileCheck,
  CheckCheck
} from 'lucide-react';

interface CertificateVerificationCardProps {
  result: CertificationVerificationResult;
  onResetSearch?: () => void;
}

export const CertificateVerificationCard: React.FC<CertificateVerificationCardProps> = ({
  result,
  onResetSearch
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isOr = result.niveau === 'OR' || result.niveau.includes('OR');
  const isArgent = result.niveau === 'ARGENT' || result.niveau.includes('ARGENT');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Verification Summary Banner */}
      <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white border border-[#A7F3D0] flex items-center justify-center text-[#0E8A5E] shrink-0 shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#0E8A5E] font-bold">
                ENREGISTREMENT OFFICIEL CONFIRMÉ
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0E8A5E] text-white">
                {result.statut}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans mt-0.5">
              Titre d'Excellence Homologué au Greffe Central TSF
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-white bg-slate-50 text-slate-700 text-xs font-mono transition-colors cursor-pointer"
            title="Copier le permalien de vérification"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#0E8A5E]" />
                <span className="text-[#0E8A5E] font-bold">Lien copié</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Partager</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-bold transition-colors cursor-pointer shadow-xs"
            title="Imprimer l'attestation officielle"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer l'attestation</span>
          </button>
        </div>
      </div>

      {/* INSTITUTIONAL DIPLOMA & CREDENTIAL CARD */}
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-12 shadow-sm relative overflow-hidden space-y-8">
        {/* Subtle Guilloche / Institutional Watermark Pattern Header */}
        <div className="border-b-2 border-slate-200 pb-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4">
              {/* Official Seal Emblem */}
              <div className="relative shrink-0">
                <div className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full border-4 flex flex-col items-center justify-center text-center shadow-md ${
                  isOr
                    ? 'bg-amber-50 border-amber-600 text-amber-900 ring-4 ring-amber-100'
                    : isArgent
                    ? 'bg-slate-50 border-slate-500 text-slate-900 ring-4 ring-slate-100'
                    : 'bg-amber-900/10 border-amber-800 text-amber-950 ring-4 ring-amber-800/10'
                }`}>
                  <span className="text-[8px] font-mono tracking-widest uppercase font-black">TSF</span>
                  <span className="text-xs font-serif font-black my-0.5">SCEAU</span>
                  <span className="text-[7px] font-mono tracking-tighter uppercase font-bold">GREFFE</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0070C0] font-bold block">
                  TALENTS SANS FRONTIÈRES • GREFFE CENTRAL DES TITRES
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-black text-slate-900 tracking-tight">
                  Attestation Solennelle d'Homologation
                </h4>
                <p className="text-xs font-mono text-slate-500">
                  Délivrée sous le contrôle permanent du Conseil d'Orientation Stratégique
                </p>
              </div>
            </div>

            {/* Official Registration Number */}
            <div className="text-center sm:text-right bg-slate-50 border border-slate-200 rounded-2xl p-4 shrink-0">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                NUMÉRO D'ENREGISTREMENT OFFICIEL
              </span>
              <strong className="text-base sm:text-lg font-mono font-bold text-[#0070C0] block mt-0.5 select-all">
                {result.code}
              </strong>
              <span className="text-[10px] font-mono text-[#0E8A5E] font-semibold flex items-center justify-center sm:justify-end gap-1 mt-1">
                <CheckCheck className="w-3 h-3" /> Registre Décentralisé Validé
              </span>
            </div>
          </div>
        </div>

        {/* 6 ESSENTIAL DIPLOMA SPECIFICATIONS (Sceau, Numéro, Statut, Date, Niveau, Vérification) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* NIVEAU D'EXCELLENCE */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
              01. NIVEAU D'ACCRÉDITATION
            </span>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${
                isOr
                  ? 'bg-amber-100 text-amber-900 border-amber-400'
                  : isArgent
                  ? 'bg-slate-200 text-slate-800 border-slate-400'
                  : 'bg-amber-900/10 text-amber-900 border-amber-800/30'
              }`}>
                {result.niveau === 'OR' ? '★ PALIER OR' : result.niveau === 'ARGENT' ? '◈ PALIER ARGENT' : '● PALIER BRONZE'}
              </span>
              <span className="text-xs font-bold text-slate-800 font-sans">
                {isOr ? 'Palier III · Fellow Suprême' : isArgent ? 'Palier II · Leader Stratégique' : 'Palier I · Praticien'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
              Consécration de haute qualification reconnue par l'ensemble des institutions partenaires.
            </p>
          </div>

          {/* TITULAIRE DU TITRE */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
              02. TITULAIRE & IDENTIFIANT TSF-ID
            </span>
            <strong className="text-base font-bold text-slate-900 block font-sans">
              {result.titulaire.prenom} {result.titulaire.nom}
            </strong>
            <div className="text-xs font-mono text-slate-600 space-y-0.5">
              <div>Nationalité : <strong className="text-slate-800">{result.titulaire.nationalite}</strong></div>
              <div>TSF-ID : <strong className="text-[#FF6600]">{result.titulaire.idUnique}</strong></div>
            </div>
          </div>

          {/* DATE & VALIDITÉ */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
              03. DATE DE DÉLIBÉRATION & STATUT
            </span>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm font-mono">
              <Calendar className="w-4 h-4 text-[#0070C0]" />
              <span>{result.date}</span>
            </div>
            <div className="text-xs font-mono">
              <span className="text-slate-500">Statut : </span>
              <strong className="text-[#0E8A5E]">{result.statut}</strong>
            </div>
            {result.dateExpiration && (
              <div className="text-[11px] font-mono text-slate-500">
                Périodicité d'audit : validité {result.dateExpiration}
              </div>
            )}
          </div>
        </div>

        {/* Intitulé Officiel du Titre */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 space-y-3">
          <span className="text-[10px] font-mono text-[#FF6600] uppercase tracking-widest font-bold block">
            INTITULÉ OFFICIEL DU PROGRAMME HOMOLOGUÉ
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
            {result.certification}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-2 border-t border-white/10">
            <div>Domaine : <strong className="text-white">{result.domaine}</strong></div>
            <span className="text-slate-500">·</span>
            <div>Évaluateur responsable : <strong className="text-white">{result.evaluateur}</strong></div>
          </div>
        </div>

        {/* Audit Pillars and QR Verification */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-slate-200">
          {/* Detailed Scores */}
          <div className="lg:col-span-8 space-y-6">
            {result.auditPillars && result.auditPillars.length > 0 && (
              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase font-bold text-slate-700 tracking-wider block">
                  SCORES DÉTAILLÉS HOMOLOGUÉS PAR LE JURY COLLÉGIAL :
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {result.auditPillars.map((p, i) => (
                    <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
                      <span className="text-[10px] text-slate-500 block truncate font-medium font-sans">
                        {p.label}
                      </span>
                      <div className="flex items-baseline justify-between pt-1">
                        <strong className="text-base font-mono font-bold text-[#0070C0]">{p.score}</strong>
                        <span className="text-[10px] font-mono text-[#0E8A5E] font-bold">{p.verdict}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Jury Members */}
            {result.juryComposition && result.juryComposition.length > 0 && (
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                  COLLÈGE DES MEMBRES DU JURY AYANT STATUÉ :
                </span>
                <div className="flex flex-wrap gap-2">
                  {result.juryComposition.map((member, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-mono text-xs">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* QR Code and Cryptographic Hash Proof */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0070C0] font-bold block">
                QR CODE DE VÉRIFICATION
              </span>

              <CertificateQrCode
                code={result.code}
                size="md"
                title={result.certification}
                holderName={`${result.titulaire.prenom} ${result.titulaire.nom}`}
                showDetails={false}
                showActions={true}
              />

              <p className="text-[10px] text-slate-500 font-mono leading-tight">
                Scannable par toute autorité ou employeur pour validation instantanée au greffe TSF.
              </p>
            </div>

            {/* Cryptographic hash proof */}
            <div className="p-3 bg-slate-900 text-slate-300 rounded-xl space-y-1 text-[10px] font-mono border border-slate-800">
              <div className="flex items-center gap-1.5 text-[#0E8A5E] font-bold">
                <Lock className="w-3 h-3" />
                <span>EMPREINTE SHA-256 SCELLÉE</span>
              </div>
              <div className="truncate select-all text-slate-400">
                {result.cryptographicHash}
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Reset Option */}
        {onResetSearch && (
          <div className="pt-4 border-t border-slate-200 text-center">
            <button
              type="button"
              onClick={onResetSearch}
              className="text-xs font-mono text-[#0070C0] hover:text-[#005FA3] hover:underline cursor-pointer"
            >
              ← Effectuer une nouvelle vérification de certificat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
