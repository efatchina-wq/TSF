import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import {
  UserPlus,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  MapPin,
  HelpCircle,
  Award,
  ArrowRight
} from 'lucide-react';

export const TsfDetecteExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'signaler' | 'candidater'>('signaler');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dossierNumber, setDossierNumber] = useState('');

  // Form states for "Signaler un talent"
  const [signalForm, setSignalForm] = useState({
    talentName: '',
    talentAge: '18-22',
    talentLocation: '',
    talentDomain: 'STEM & Mathématiques',
    talentDescription: '',
    talentProofUrl: '',
    sponsorName: '',
    sponsorRole: 'Enseignant / Professeur',
    sponsorContact: ''
  });

  // Form states for "Je suis un talent"
  const [selfForm, setSelfForm] = useState({
    fullName: '',
    age: '',
    location: '',
    domain: 'Informatique & Algorithmique',
    portfolioUrl: '',
    achievement: '',
    motivation: '',
    logicAnswer: 'C'
  });

  const handleSignalerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TSF-DET-SIG-${Math.floor(100000 + Math.random() * 900000)}`;
    setDossierNumber(ref);
    setIsSubmitted(true);
  };

  const handleSelfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TSF-DET-CAN-${Math.floor(100000 + Math.random() * 900000)}`;
    setDossierNumber(ref);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setDossierNumber('');
  };

  return (
    <div id="detection-experience" className="space-y-8 scroll-mt-24">
      {/* Editorial Header */}
      <div className="bg-[#262626] text-white p-6 sm:p-10 rounded-2xl border border-[#404040]/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#0070C0]/20 text-[#38BDF8] font-mono text-xs font-bold uppercase tracking-wider border border-[#0070C0]/30">
              Dispositif Citoyen & Scientifique
            </span>
            <span className="text-slate-400 font-mono text-xs">
              Guichet Ouvert Permanent
            </span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Plateforme Opérationnelle de Détection
          </h3>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Le talent n’a pas de prérequis de diplôme, d’adresse postale ou de rang social. Participez à l’effort continental en signalant une pépite méconnue de votre entourage, ou candidatez directement pour soumettre votre génie à notre banc d’essai.
          </p>
        </div>

        {/* Tab Toggle Switch */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => { setActiveTab('signaler'); setIsSubmitted(false); }}
            className={`flex-1 py-3.5 px-5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'signaler'
                ? 'bg-[#FF6600] text-white shadow-lg ring-2 ring-[#FF6600]/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>SIGNALER UN TALENT (Recommandation)</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('candidater'); setIsSubmitted(false); }}
            className={`flex-1 py-3.5 px-5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'candidater'
                ? 'bg-[#FF6600] text-white shadow-lg ring-2 ring-[#FF6600]/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>JE SUIS UN TALENT (Auto-Candidature)</span>
          </button>
        </div>
      </div>

      {/* Main Experience Body */}
      {isSubmitted ? (
        /* Confirmation State */
        <Card padding="lg" className="border-2 border-emerald-500 bg-emerald-50/40 p-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
              Dossier Transmis avec Succès
            </span>
            <h4 className="text-2xl font-bold text-[#262626]">
              Référence d'Enregistrement : <span className="font-mono text-[#0070C0]">{dossierNumber}</span>
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Le dossier a été horodaté et assigné au <strong>Comité Territorial de Détection TSF</strong>. Un accusé de réception a été généré dans le registre public sécurisé.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 max-w-lg mx-auto text-left text-xs space-y-2 font-mono text-slate-600">
            <div className="flex justify-between border-b pb-1.5">
              <span>Type de soumission :</span>
              <strong className="text-slate-900">{activeTab === 'signaler' ? 'Signalement par un Tiers' : 'Auto-Candidature Directe'}</strong>
            </div>
            <div className="flex justify-between border-b pb-1.5">
              <span>Délai d'instruction moyen :</span>
              <strong className="text-slate-900">14 jours ouvrés</strong>
            </div>
            <div className="flex justify-between">
              <span>Phase suivante :</span>
              <strong className="text-emerald-700">Audit documentaire & convocation test</strong>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={resetForm}>
            Soumettre un nouveau dossier
          </Button>
        </Card>
      ) : activeTab === 'signaler' ? (
        /* TAB 1: SIGNALER UN TALENT */
        <Card padding="lg" className="border-slate-200">
          <form onSubmit={handleSignalerSubmit} className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0] block mb-1">
                Protocole de Signalement Partagé
              </span>
              <h4 className="text-xl font-bold text-[#262626]">
                Révéler un talent brut de votre communauté
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Vous connaissez un lycéen brillant, un artisan ingénieux, un développeur autodidacte ou un inventeur méconnu ? Transmettez ses coordonnées pour qu'un éclaireur TSF aille à sa rencontre.
              </p>
            </div>

            {/* Talent Information */}
            <div className="space-y-4">
              <h5 className="text-xs font-mono font-bold uppercase text-slate-400">
                1. Identité du Talent Détecté
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Nom & Prénom(s) du talent *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Kodjo Mensah"
                    value={signalForm.talentName}
                    onChange={(e) => setSignalForm({ ...signalForm, talentName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Tranche d'âge approximative *
                  </label>
                  <select
                    value={signalForm.talentAge}
                    onChange={(e) => setSignalForm({ ...signalForm, talentAge: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                  >
                    <option value="Moins de 18 ans">Moins de 18 ans (Graines de Champions)</option>
                    <option value="18-22 ans">18 à 22 ans (Enseignement supérieur / Autodidacte)</option>
                    <option value="23-28 ans">23 à 28 ans (Jeune diplômé / Cadre émergent)</option>
                    <option value="29 ans et plus">29 ans et plus (Expert / Professionnel)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Ville, Région & Pays de résidence *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Parakou, Borgou, Bénin"
                    value={signalForm.talentLocation}
                    onChange={(e) => setSignalForm({ ...signalForm, talentLocation: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Domaine d'excellence principal *
                  </label>
                  <select
                    value={signalForm.talentDomain}
                    onChange={(e) => setSignalForm({ ...signalForm, talentDomain: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                  >
                    <option value="STEM & Mathématiques">Mathématiques, Physique & Modélisation</option>
                    <option value="Informatique & IA">Développement Logiciel, Algorithmique, IA</option>
                    <option value="Électronique & Robotique">Électronique, Mécanique, Énergie Solaire</option>
                    <option value="Biologie & Agronomie">Biotechnologies & Agronomie Tropicale</option>
                    <option value="Éloquence & Droit">Débat d'idées, Éloquence & Droit Public</option>
                    <option value="Autre">Autre aptitude remarquable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  En quoi ce profil est-il exceptionnel ? (Faits observables, réalisations, inventions) *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Décrivez concrètement ce que cette personne a réalisé ou pourquoi vous estimez qu'elle dispose d'un potentiel hors norme..."
                  value={signalForm.talentDescription}
                  onChange={(e) => setSignalForm({ ...signalForm, talentDescription: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Lien ou document justificatif (optionnel : vidéo, article, GitHub, dossier Drive)
                </label>
                <input
                  type="url"
                  placeholder="https://"
                  value={signalForm.talentProofUrl}
                  onChange={(e) => setSignalForm({ ...signalForm, talentProofUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                />
              </div>
            </div>

            {/* Sponsor Identification */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h5 className="text-xs font-mono font-bold uppercase text-slate-400">
                2. Vos Coordonnées (Parrain / Rapporteur)
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Votre Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Dr. Aïssatou Diallo"
                    value={signalForm.sponsorName}
                    onChange={(e) => setSignalForm({ ...signalForm, sponsorName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Votre qualité / lien avec le talent *
                  </label>
                  <select
                    value={signalForm.sponsorRole}
                    onChange={(e) => setSignalForm({ ...signalForm, sponsorRole: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                  >
                    <option value="Enseignant / Professeur">Enseignant / Professeur / Doyen</option>
                    <option value="Mentor / Employeur">Employeur / Chef d'atelier / Maître</option>
                    <option value="Élu / Autorité Locale">Élu local / Chef de quartier / Responsable OSC</option>
                    <option value="Parent / Citoyen">Parent / Proche / Citoyen observateur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Votre Téléphone ou Email *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: +229 97 00 00 00 / email@..."
                    value={signalForm.sponsorContact}
                    onChange={(e) => setSignalForm({ ...signalForm, sponsorContact: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="md" icon={<Send className="w-4 h-4" />}>
                Transmettre officiellement ce signalement
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        /* TAB 2: JE SUIS UN TALENT */
        <Card padding="lg" className="border-slate-200">
          <form onSubmit={handleSelfSubmit} className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0] block mb-1">
                Auto-Candidature Directe
              </span>
              <h4 className="text-xl font-bold text-[#262626]">
                Soumettre vos aptitudes au banc d'essai scientifique TSF
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Aucun titre honorifique n'est exigé. Seule compte la puissance de votre raisonnement, votre détermination et vos preuves de travail.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Nom complet *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Fatouma Ndiaye"
                  value={selfForm.fullName}
                  onChange={(e) => setSelfForm({ ...selfForm, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Âge révolu *
                </label>
                <input
                  type="number"
                  required
                  min={14}
                  max={35}
                  placeholder="Ex: 21"
                  value={selfForm.age}
                  onChange={(e) => setSelfForm({ ...selfForm, age: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Ville & Pays actuel *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Dakar, Sénégal"
                  value={selfForm.location}
                  onChange={(e) => setSelfForm({ ...selfForm, location: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Votre pôle de spécialité revendiqué *
                </label>
                <select
                  value={selfForm.domain}
                  onChange={(e) => setSelfForm({ ...selfForm, domain: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                >
                  <option value="Informatique & Algorithmique">Informatique & Algorithmique</option>
                  <option value="Ingénierie & Systèmes Électriques">Ingénierie & Systèmes Électriques</option>
                  <option value="Mathématiques & Sciences Dures">Mathématiques & Sciences Dures</option>
                  <option value="Biologie, Chimie & Santé">Biologie, Chimie & Santé</option>
                  <option value="Macroéconomie & Stratégie">Macroéconomie & Stratégie</option>
                  <option value="Invention Mécanique / Terrain">Invention Mécanique / Terrain</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Lien Portfolio / Dépôt de code / Dossier PDF
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/... ou drive"
                  value={selfForm.portfolioUrl}
                  onChange={(e) => setSelfForm({ ...selfForm, portfolioUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Votre plus grande réalisation concrète à ce jour (preuve de travail) *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Décrivez un prototype conçu, un problème théorique résolu, un projet mené à bien ou un concours remporté..."
                value={selfForm.achievement}
                onChange={(e) => setSelfForm({ ...selfForm, achievement: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
              />
            </div>

            {/* Quick Logic Assessment */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-[#0070C0] block">
                Épreuve Éclair de Logique (Question d'Acculturation TSF)
              </span>
              <p className="text-xs text-slate-700">
                Dans une suite logique : 2, 6, 12, 20, 30... quel est le terme suivant ?
              </p>
              <div className="flex gap-4">
                {['38', '40', '42', '44'].map((val) => (
                  <label key={val} className="flex items-center gap-2 text-xs font-mono cursor-pointer">
                    <input
                      type="radio"
                      name="logicAnswer"
                      value={val}
                      checked={selfForm.logicAnswer === val}
                      onChange={(e) => setSelfForm({ ...selfForm, logicAnswer: e.target.value })}
                    />
                    <span>{val}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="md" icon={<Send className="w-4 h-4" />}>
                Déposer ma candidature officielle
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};
