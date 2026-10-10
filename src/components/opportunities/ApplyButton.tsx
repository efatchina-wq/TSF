import React, { useState } from 'react';
import { Send, Check, Loader2 } from 'lucide-react';

interface ApplyButtonProps {
  opportunityId: string;
  opportunityTitle?: string;
  onApply?: (oppId: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ApplyButton: React.FC<ApplyButtonProps> = ({
  opportunityId,
  opportunityTitle,
  onApply,
  size = 'md',
  className = ''
}) => {
  const [hasApplied, setHasApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantTsfId, setApplicantTsfId] = useState('');
  const [motivationNote, setMotivationNote] = useState('');

  const handleOpenForm = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasApplied) return;
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setHasApplied(true);
      setShowConfirmModal(false);
      if (onApply) {
        onApply(opportunityId);
      }
    }, 900);
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-xs',
    lg: 'px-6 py-2.5 text-sm'
  };

  return (
    <>
      {hasApplied ? (
        <span className={`inline-flex items-center gap-1.5 font-mono font-bold bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-300 ${sizeClasses[size]} ${className}`}>
          <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[2.5]" />
          <span>Candidature envoyée</span>
        </span>
      ) : (
        <button
          type="button"
          onClick={handleOpenForm}
          className={`inline-flex items-center justify-center gap-1.5 font-mono font-bold rounded-lg bg-[#0070C0] hover:bg-[#005FA3] text-white transition-all shadow-xs cursor-pointer ${sizeClasses[size]} ${className}`}
        >
          <Send className="w-3.5 h-3.5 text-[#FF6600]" />
          <span>Postuler</span>
        </button>
      )}

      {/* Interactive Application Modal */}
      {showConfirmModal && (
        <div 
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-4 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-sm font-mono cursor-pointer"
            >
              ✕ Fermer
            </button>

            <form onSubmit={handleConfirmSubmit} className="space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#0070C0] font-bold uppercase tracking-wider block">
                  DÉPÔT DE CANDIDATURE OFFICIEL
                </span>
                <h3 className="text-xl font-bold text-[#262626] font-sans leading-tight">
                  {opportunityTitle || 'Postuler à l’opportunité'}
                </h3>
                <p className="text-xs text-slate-600 font-sans">
                  Votre dossier sera instruit directement par l’organisation émettrice avec le label d’authenticité TSF.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Adresse Courriel Institutionnelle ou Personnelle *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="candidat@alumni-tsf.africa"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#0070C0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Identifiant TSF-ID (Optionnel mais recommandé)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex. TSF-ID-2026-BEN-0842"
                    value={applicantTsfId}
                    onChange={(e) => setApplicantTsfId(e.target.value)}
                    className="w-full text-xs font-mono p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#0070C0]"
                  />
                  <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
                    Les titulaires d’un passeport TSF bénéficient d’un traitement prioritaire sans filtre de CV.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Note de Motivation / Pertinence (max. 150 mots)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Précisez votre valeur ajoutée, vos compétences techniques clés et vos disponibilités..."
                    value={motivationNote}
                    onChange={(e) => setMotivationNote(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#0070C0]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-700 font-semibold">
                  Accusé officiel délivré
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowConfirmModal(false)}
                    className="px-4 py-2 text-xs font-mono text-slate-600 hover:text-slate-800 cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Transmission...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Confirmer ma candidature</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
