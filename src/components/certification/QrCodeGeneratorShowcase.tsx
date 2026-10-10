import React, { useState } from 'react';
import { CertificateQrCode } from './CertificateQrCode';
import { QrCode, Sparkles, ShieldCheck, Download, Share2, Layers } from 'lucide-react';
import { ExcellenceTier } from '../../types/certification';

export const QrCodeGeneratorShowcase: React.FC = () => {
  const [testCode, setTestCode] = useState('TSF-CERT-2025-HE-0042');
  const [testHolder, setTestHolder] = useState('Dr. Aminata Traoré');
  const [testTier, setTestTier] = useState<ExcellenceTier>('OR');
  const [testDomain, setTestDomain] = useState('Intelligence Artificielle & Santé');

  const presets = [
    { code: 'TSF-CERT-2025-HE-0042', holder: 'Dr. Aminata Traoré', tier: 'OR' as ExcellenceTier, domain: 'IA & Santé Publique' },
    { code: 'TSF-CERT-2024-SF-0019', holder: 'Ing. Kwame Mensah', tier: 'OR' as ExcellenceTier, domain: 'Énergies Renouvelables' },
    { code: 'TSF-CERT-2026-MAR-0994', holder: 'Sarah Benali', tier: 'ARGENT' as ExcellenceTier, domain: 'Finance Verte & Dette' },
    { code: 'TSF-CERT-2023-GC-0012', holder: 'Marc-Aurèle Dossou', tier: 'BRONZE' as ExcellenceTier, domain: 'STEM & Algorithmes' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-mono font-bold">
            <QrCode className="w-3.5 h-3.5 text-amber-600" />
            <span>COMPOSANT VISUEL QR CODE OFFICIEL TSF</span>
          </div>
          <h3 className="text-2xl font-bold text-[#0B1B3D] mt-2">
            Association Visuelle du QR Code à chaque Certification
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Ce module visuel associe un QR code matriciel cryptographique à toute certification TSF délivrée. Il permet le scannage direct depuis un smartphone, le téléchargement vectoriel SVG pour insertion sur diplôme papier et l’authentification instantanée.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Matrice 25x25 Sécurisée</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-mono uppercase font-bold text-slate-500 block">
            PERSONNALISER LE TITRE DE CERTIFICATION À ASSOCIER :
          </span>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                Identifiant / Code de Certification :
              </label>
              <input
                type="text"
                value={testCode}
                onChange={(e) => setTestCode(e.target.value)}
                className="w-full text-xs font-mono p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0B1B3D]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                Nom & Prénom du Titulaire :
              </label>
              <input
                type="text"
                value={testHolder}
                onChange={(e) => setTestHolder(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0B1B3D]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                  Palier d'Excellence :
                </label>
                <select
                  value={testTier}
                  onChange={(e) => setTestTier(e.target.value as ExcellenceTier)}
                  className="w-full text-xs font-mono p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                >
                  <option value="BRONZE">BRONZE (Niveau I)</option>
                  <option value="ARGENT">ARGENT (Niveau II)</option>
                  <option value="OR">OR (Niveau III)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                  Domaine de Compétence :
                </label>
                <input
                  type="text"
                  value={testDomain}
                  onChange={(e) => setTestDomain(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Quick presets */}
          <div className="pt-2 space-y-1.5">
            <span className="text-[11px] font-mono text-slate-400 block">
              Titres pré-configurés :
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.code}
                  type="button"
                  onClick={() => {
                    setTestCode(p.code);
                    setTestHolder(p.holder);
                    setTestTier(p.tier);
                    setTestDomain(p.domain);
                  }}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                    testCode === p.code
                      ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {p.tier} · {p.holder.split(' ')[1] || p.holder}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual QR Code Result Card */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-50 to-slate-100/60 rounded-3xl border-2 border-dashed border-slate-300">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center text-center space-y-4 max-w-xs w-full">
            <div className="flex items-center gap-1.5">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                testTier === 'OR' 
                  ? 'bg-amber-400 text-slate-950' 
                  : testTier === 'ARGENT' 
                  ? 'bg-slate-300 text-slate-900' 
                  : 'bg-amber-800 text-white'
              }`}>
                PALIER {testTier}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                TSF ACCRÉDITATION
              </span>
            </div>

            {/* The QR Code Component */}
            <CertificateQrCode
              code={testCode}
              size="lg"
              title={`Certification ${testTier} — ${testDomain}`}
              holderName={testHolder}
              showDetails={true}
              showActions={true}
            />

            <div className="w-full pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>Empreinte scellée</span>
              <span className="text-emerald-600 font-bold">● SHA-256</span>
            </div>
          </div>

          <span className="text-xs text-slate-500 font-mono mt-4 text-center">
            Prêt pour inclusion directe dans les templates de diplômes, badges et passeports TSF-ID.
          </span>
        </div>
      </div>
    </div>
  );
};
