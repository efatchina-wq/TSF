import React, { useState } from 'react';
import { Search, Loader2, KeyRound, Sparkles, Check, AlertCircle } from 'lucide-react';
import { DEMO_CERTIFICATIONS_REGISTRY, verifyCertificateOnline } from '../../data/certificationData';
import { CertificationVerificationResult } from '../../types/certification';

interface VerifyCertificateFormProps {
  onVerified: (result: CertificationVerificationResult) => void;
  initialCode?: string;
}

export const VerifyCertificateForm: React.FC<VerifyCertificateFormProps> = ({
  onVerified,
  initialCode = ''
}) => {
  const [certCode, setCertCode] = useState(initialCode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sampleCodes = [
    { code: 'TSF-CERT-2025-HE-0042', label: 'Dr. Aminata Traoré · Palier OR (Santé/IA)' },
    { code: 'TSF-CERT-2024-SF-0019', label: 'Ing. Kwame Mensah · Palier OR (Énergie/Solaire)' },
    { code: 'TSF-CERT-2026-MAR-0994', label: 'Sarah Benali · Palier ARGENT (Haute Finance)' },
    { code: 'TSF-CERT-2023-GC-0012', label: 'Marc-Aurèle Dossou · Palier BRONZE (STEM/Algorithmes)' }
  ];

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = certCode.trim();
    if (!cleanCode) {
      setError('Veuillez entrer un code de certification valide.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Async call preparing for future real backend verification
      const result = await verifyCertificateOnline(cleanCode);
      setIsLoading(false);
      onVerified(result);
    } catch (err) {
      setIsLoading(false);
      setError('Erreur lors de la vérification. Veuillez vérifier le code saisi.');
    }
  };

  const handleSelectSample = (code: string) => {
    setCertCode(code);
    setError(null);
  };

  return (
    <div className="bg-[#1A1A1A] text-white rounded-2xl p-6 sm:p-10 border border-[#333333] shadow-sm relative overflow-hidden space-y-8 font-sans">
      <div className="relative z-10 max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-[#FF6600] text-xs font-mono">
          <KeyRound className="w-3.5 h-3.5" />
          <span>GUICHET CENTRAL D'AUTHENTIFICATION OFFICIELLE</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight text-white font-sans">
          Vérification d'une Certification TSF
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-sans">
          Employeurs, bailleurs, universités et institutions publiques : authentifiez en temps réel la validité d'une attestation, le palier d'excellence (Bronze, Argent, Or) et le collège d'évaluateurs qui a homologué le récipiendaire.
        </p>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="pt-2 space-y-4">
          <div>
            <label 
              htmlFor="cert-code-input"
              className="block text-xs font-mono uppercase font-bold text-[#FF6600] mb-2"
            >
              ENTRER LE CODE DE CERTIFICATION
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  id="cert-code-input"
                  type="text"
                  value={certCode}
                  onChange={(e) => {
                    setCertCode(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Ex : TSF-CERT-2025-HE-0042 ou TSF-OR-2026-..."
                  className="w-full px-4 py-3 text-sm bg-[#121212] border border-[#333333] rounded-lg text-white placeholder:text-[#7D7D7D] focus:outline-none focus:border-[#0070C0] focus:ring-2 focus:ring-[#0070C0]/25 font-mono tracking-wider"
                />
                {certCode && (
                  <button
                    type="button"
                    onClick={() => setCertCode('')}
                    className="absolute right-3 top-3 text-[#7D7D7D] hover:text-white text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-[#FF6600] hover:bg-[#E65500] text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2 transition-all shadow-xs shrink-0 cursor-pointer disabled:opacity-75 active:scale-[0.99]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Audit du registre...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Vérifier l'authenticité</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-950/80 border border-red-800 rounded-lg text-xs text-red-200 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}
        </form>

        {/* 1-Click Demo Codes for instant testing */}
        <div className="pt-4 border-t border-white/10 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B8B8B8]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6600]" />
            <span>Codes d'évaluation de démonstration (cliquez pour tester instantanément) :</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleCodes.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => handleSelectSample(item.code)}
                className={`p-3 text-left rounded-lg border text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                  certCode === item.code
                    ? 'bg-[#0070C0]/25 border-[#0070C0] text-white'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="truncate min-w-0 flex-1">
                  <strong className="block text-white text-[11px] font-mono truncate">{item.code}</strong>
                  <span className="text-[10px] text-[#7D7D7D] block truncate">{item.label}</span>
                </div>
                <span className="text-[10px] text-[#FF6600] ml-2 shrink-0 font-sans font-semibold">Choisir →</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
