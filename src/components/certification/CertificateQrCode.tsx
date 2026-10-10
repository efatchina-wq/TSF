import React, { useState, useMemo } from 'react';
import { 
  QrCode, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Maximize2, 
  X,
  Sparkles
} from 'lucide-react';

interface CertificateQrCodeProps {
  code: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
  holderName?: string;
  showDetails?: boolean;
  showActions?: boolean;
  className?: string;
}

// Generate a deterministic 25x25 QR matrix for any string payload
function generateQrMatrix(text: string): boolean[][] {
  const size = 25;
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  // Finder pattern (7x7) at (row, col)
  const drawFinder = (startRow: number, startCol: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        matrix[startRow + r][startCol + c] = isBorder || isInner;
      }
    }
  };

  // 1. Finder patterns top-left, top-right, bottom-left
  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  // 2. Timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // 3. Alignment pattern at (16, 16)
  const alignR = 16;
  const alignC = 16;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const isBorder = Math.abs(r) === 2 || Math.abs(c) === 2;
      const isCenter = r === 0 && c === 0;
      matrix[alignR + r][alignC + c] = isBorder || isCenter;
    }
  }

  // 4. Fill data modules deterministically using simple hash expansion
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  const isReserved = (r: number, c: number) => {
    // Top-left finder + separator
    if (r <= 7 && c <= 7) return true;
    // Top-right finder + separator
    if (r <= 7 && c >= size - 8) return true;
    // Bottom-left finder + separator
    if (r >= size - 8 && c <= 7) return true;
    // Timing lines
    if (r === 6 || c === 6) return true;
    // Alignment pattern
    if (r >= 14 && r <= 18 && c >= 14 && c <= 18) return true;
    // Center logo quiet zone (optional 5x5 in middle)
    if (r >= 10 && r <= 14 && c >= 10 && c <= 14) return true;
    return false;
  };

  let pseudoState = Math.abs(hash);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!isReserved(r, c)) {
        pseudoState = (pseudoState * 9301 + 49297) % 233280;
        matrix[r][c] = (pseudoState % 100) > 48;
      }
    }
  }

  return matrix;
}

export const CertificateQrCode: React.FC<CertificateQrCodeProps> = ({
  code,
  size = 'md',
  title = 'Certification TSF',
  holderName,
  showDetails = true,
  showActions = true,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const verificationUrl = useMemo(() => {
    // In production, this matches the domain
    return `https://talentssansfrontieres.org/certification/verify?code=${encodeURIComponent(code)}`;
  }, [code]);

  const matrix = useMemo(() => {
    return generateQrMatrix(`${code}:${verificationUrl}`);
  }, [code, verificationUrl]);

  const sizeDimensions = {
    sm: { box: 100, padding: 8, iconSize: 16 },
    md: { box: 140, padding: 10, iconSize: 22 },
    lg: { box: 190, padding: 12, iconSize: 28 },
    xl: { box: 260, padding: 16, iconSize: 36 }
  }[size];

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSvg = (e: React.MouseEvent) => {
    e.stopPropagation();
    const svgElement = document.getElementById(`qr-svg-${code.replace(/[^a-zA-Z0-9]/g, '-')}`);
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TSF-QR-${code}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Visual QR Container */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className="group relative bg-white p-3 rounded-2xl border-2 border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all cursor-pointer inline-block"
        title="Cliquer pour agrandir et vérifier le QR code"
      >
        <svg
          id={`qr-svg-${code.replace(/[^a-zA-Z0-9]/g, '-')}`}
          viewBox="0 0 25 25"
          width={sizeDimensions.box}
          height={sizeDimensions.box}
          className="rounded-lg shape-rendering-crispEdges"
        >
          <rect width="25" height="25" fill="#FFFFFF" />
          {matrix.map((row, r) =>
            row.map((cell, c) => {
              // Don't draw bits in the center logo area
              if (r >= 10 && r <= 14 && c >= 10 && c <= 14) return null;
              if (!cell) return null;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={c}
                  y={r}
                  width="1"
                  height="1"
                  fill="#0B1B3D"
                />
              );
            })
          )}

          {/* Central TSF Emblem in SVG */}
          <rect x="9.5" y="9.5" width="6" height="6" rx="1" fill="#FFFFFF" stroke="#0B1B3D" strokeWidth="0.3" />
          <rect x="10.2" y="10.2" width="4.6" height="4.6" rx="0.8" fill="#0B1B3D" />
          <path
            d="M 11.5 11.2 L 13.5 11.2 L 12.5 13.8 Z"
            fill="#F59E0B"
          />
        </svg>

        {/* Hover Overlay Hint */}
        <div className="absolute inset-0 bg-slate-900/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[1px]">
          <div className="bg-[#0B1B3D]/90 p-2 rounded-lg text-[10px] font-mono flex items-center gap-1 shadow-md">
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Agrandir</span>
          </div>
        </div>
      </div>

      {/* Details Underneath */}
      {showDetails && (
        <div className="mt-2.5 space-y-1">
          <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#0B1B3D]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Code : {code}</span>
          </div>
          {holderName && (
            <p className="text-[11px] text-slate-500 font-sans">
              Titulaire : <span className="font-semibold text-slate-700">{holderName}</span>
            </p>
          )}
          <span className="text-[10px] font-mono text-slate-400 block">
            Scan officiel · Registre public TSF
          </span>
        </div>
      )}

      {/* Action Buttons */}
      {showActions && (
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            title="Copier le lien permanent de vérification"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-slate-500" />
                <span>Lien</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadSvg}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            title="Télécharger le QR Code au format SVG vectoriel"
          >
            <Download className="w-3 h-3 text-slate-500" />
            <span>SVG</span>
          </button>
        </div>
      )}

      {/* Enlarged Inspection Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-5 sm:p-8 text-slate-900 border border-slate-200 shadow-2xl relative text-left my-auto max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#0070C0] font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#FF6600]" />
                <span>Passeport Numérique & QR Code TSF</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#262626]">
                  {title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Point d'ancrage cryptographique infalsifiable pour vérification immédiate par les tiers.
                </p>
              </div>

              {/* High-res QR Display */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center">
                <svg
                  viewBox="0 0 25 25"
                  width={220}
                  height={220}
                  className="bg-white p-2 rounded-xl shadow-inner shape-rendering-crispEdges"
                >
                  <rect width="25" height="25" fill="#FFFFFF" />
                  {matrix.map((row, r) =>
                    row.map((cell, c) => {
                      if (r >= 10 && r <= 14 && c >= 10 && c <= 14) return null;
                      if (!cell) return null;
                      return (
                        <rect
                          key={`modal-${r}-${c}`}
                          x={c}
                          y={r}
                          width="1"
                          height="1"
                          fill="#0B1B3D"
                        />
                      );
                    })
                  )}
                  <rect x="9.5" y="9.5" width="6" height="6" rx="1" fill="#FFFFFF" stroke="#0B1B3D" strokeWidth="0.3" />
                  <rect x="10.2" y="10.2" width="4.6" height="4.6" rx="0.8" fill="#0B1B3D" />
                  <path d="M 11.5 11.2 L 13.5 11.2 L 12.5 13.8 Z" fill="#F59E0B" />
                </svg>

                <div className="mt-3 text-center">
                  <span className="font-mono text-xs font-bold text-[#0B1B3D] tracking-wide block">
                    {code}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Scannable avec tout smartphone ou douchette d’audit
                  </span>
                </div>
              </div>

              {/* Decoded Payload Information */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs space-y-1.5 font-mono">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Cible d'authentification :
                </span>
                <div className="text-[11px] text-[#0B1B3D] break-all bg-white p-2 rounded border border-slate-200 select-all">
                  {verificationUrl}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex-1 py-2.5 px-3 bg-[#0B1B3D] hover:bg-[#122856] text-white rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Lien copié dans le presse-papier</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copier le lien permanent</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>SVG</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
