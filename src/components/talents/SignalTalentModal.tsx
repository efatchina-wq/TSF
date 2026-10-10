import React, { useState } from 'react';
import { TALENT_DOMAINS } from '../../data/talentsData';
import { Compass, Check, X, ShieldCheck } from 'lucide-react';

interface SignalTalentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignalTalentModal: React.FC<SignalTalentModalProps> = ({
  isOpen,
  onClose
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [scoutCode, setScoutCode] = useState('');
  const [formData, setFormData] = useState({
    parrainNom: '',
    parrainOrganisation: '',
    parrainEmail: '',
    talentNom: '',
    talentPays: 'Bénin',
    talentDomaine: 'Intelligence Artificielle & Santé Publique',
    talentContact: '',
    motifRecommandation: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `TSF-SCOUT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setScoutCode(code);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-4 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B1B3D]">
              Signalement Enregistré avec Succès
            </h3>
            <p className="text-xs font-mono text-slate-600 max-w-md mx-auto">
              Le Comité de Scouting TSF a bien reçu votre signalement pour <strong>{formData.talentNom}</strong>.
            </p>
            <div className="p-3 bg-slate-900 text-amber-300 font-mono font-bold text-sm rounded-xl inline-block shadow">
              Réf. Dossier : {scoutCode}
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Un inspecteur académique régional prendra contact avec les référents sous 10 jours ouvrés.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#0B1B3D] text-white text-xs font-mono rounded-lg hover:bg-[#122856]"
              >
                Fermer
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0070C0] block flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#0070C0]" /> PARRAINAGE & DÉTECTION TERRAIN
              </span>
              <h2 className="text-2xl font-bold text-[#262626]">
                Signaler un Haut Potentiel (Scouting TSF)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Vous connaissez un jeune talent hors norme, un chercheur isolé ou un autodidacte d'exception ? Portez-le à la connaissance de TSF.
              </p>
            </div>

            {/* Parrain */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                Votre Identité (Le Parrain / L'Observateur) :
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  required
                  type="text"
                  placeholder="Votre nom complet *"
                  value={formData.parrainNom}
                  onChange={e => setFormData({ ...formData, parrainNom: e.target.value })}
                  className="text-xs p-2.5 bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0070C0]"
                />
                <input
                  required
                  type="text"
                  placeholder="Organisation / Université *"
                  value={formData.parrainOrganisation}
                  onChange={e => setFormData({ ...formData, parrainOrganisation: e.target.value })}
                  className="text-xs p-2.5 bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0070C0]"
                />
              </div>
              <input
                required
                type="email"
                placeholder="Votre email de contact *"
                value={formData.parrainEmail}
                onChange={e => setFormData({ ...formData, parrainEmail: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0070C0]"
              />
            </div>

            {/* Talent Recommandé */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                Le Talent que vous Signalez :
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  required
                  type="text"
                  placeholder="Nom complet du talent *"
                  value={formData.talentNom}
                  onChange={e => setFormData({ ...formData, talentNom: e.target.value })}
                  className="text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0070C0]"
                />
                <input
                  required
                  type="text"
                  placeholder="Pays de résidence *"
                  value={formData.talentPays}
                  onChange={e => setFormData({ ...formData, talentPays: e.target.value })}
                  className="text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0070C0]"
                />
              </div>

              <select
                value={formData.talentDomaine}
                onChange={e => setFormData({ ...formData, talentDomaine: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0070C0]"
              >
                {TALENT_DOMAINS.filter(d => d !== 'Tous les domaines').map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
              </select>

              <textarea
                required
                rows={3}
                placeholder="En quoi ce profil est-il exceptionnel ? Décrivez ses réalisations, son potentiel ou ses inventions..."
                value={formData.motifRecommandation}
                onChange={e => setFormData({ ...formData, motifRecommandation: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0070C0]"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Anonymat garanti sur demande
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-mono text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-medium rounded-lg cursor-pointer transition-colors"
                >
                  Transmettre au comité
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
