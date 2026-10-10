import React, { useState } from 'react';
import { TalentProfile } from '../../types/talent';
import { TALENT_DOMAINS } from '../../data/talentsData';
import { ShieldCheck, Check, Sparkles, X } from 'lucide-react';

interface CreateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileCreated: (profile: TalentProfile) => void;
}

export const CreateProfileModal: React.FC<CreateProfileModalProps> = ({
  isOpen,
  onClose,
  onProfileCreated
}) => {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    pays: 'Sénégal',
    ville: 'Dakar',
    domaine: 'Intelligence Artificielle & Santé Publique',
    titreProfessionnel: '',
    bio: '',
    competencePrincipale: '',
    disponibilite: 'Immédiate' as const,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [createdTsfId, setCreatedTsfId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomIdNumber = Math.floor(1000 + Math.random() * 9000);
    const countryCode = formData.pays.slice(0, 3).toUpperCase();
    const generatedId = `TSF-ID-2026-${countryCode}-${randomIdNumber}`;
    setCreatedTsfId(generatedId);

    const newProfile: TalentProfile = {
      id: `talent-${Date.now()}`,
      photoUrl: formData.photoUrl,
      nom: formData.nom,
      prenom: formData.prenom,
      titreProfessionnel: formData.titreProfessionnel || `${formData.domaine} Specialist`,
      localisation: {
        ville: formData.ville,
        pays: formData.pays,
        region: 'Afrique Sub-Saharienne',
        mobilitePanafricaine: true
      },
      domaine: formData.domaine,
      domaineSlug: formData.domaine.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      tsfId: {
        id: `tsf-${Date.now()}`,
        uniqueId: generatedId,
        nationalCode: countryCode,
        level: 'Niveau I — Espoir Émergent',
        status: 'en_evaluation',
        statusLabel: 'En cours d’évaluation préliminaire',
        skills: formData.competencePrincipale ? [formData.competencePrincipale, 'Leadership de base', 'Rigueur méthodologique'] : ['Compétences en cours de revue'],
        certifications: ['Attestation d’Enregistrement au Greffe TSF'],
        issuingDate: 'Aujourd’hui',
        cryptographicSignature: `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
        blockchainRecordId: `TSF-BLK-${Date.now().toString().slice(-6)}-L1`,
        qrPayload: `https://tsf.africa/verify/${generatedId}`
      },
      bio: formData.bio || 'Profil en cours de finalisation académique et déontologique.',
      manifestePersonnel: '« Mettre mon intelligence et mon travail au service du rayonnement souverain de l’Afrique. »',
      disponibilite: {
        statut: formData.disponibilite,
        tempsDispo: 'Temps plein',
        preferencesMobilite: [formData.ville, 'Kigali', 'Dakar'],
        rechercheActuelle: 'Accès aux cohortes Horizon Excellence et mentorat d’élite.'
      },
      competences: [
        {
          id: `sk-${Date.now()}-1`,
          name: formData.competencePrincipale || 'Discipline Principale',
          category: 'technique',
          level: 85,
          endorsedByTsf: false
        }
      ],
      portfolio: [],
      realisations: [],
      experiences: [
        {
          id: `exp-${Date.now()}`,
          role: formData.titreProfessionnel || 'Chercheur / Praticien',
          organization: 'Institution d’origine',
          location: `${formData.ville}, ${formData.pays}`,
          startDate: '2024',
          isCurrent: true,
          description: 'Activités professionnelles et académiques en cours d’audit.',
          achievements: []
        }
      ],
      formations: [
        {
          id: `edu-${Date.now()}`,
          degree: 'Diplôme Supérieur en cours de vérification',
          fieldOfStudy: formData.domaine,
          institution: 'Université / Grande École Nationale',
          location: formData.pays,
          graduationYear: '2025'
        }
      ],
      certification: {
        id: `cert-${Date.now()}`,
        tsfCertificateNumber: `TSF-PROV-2026-${randomIdNumber}`,
        programName: 'Dossier d’Admissibilité Préliminaire',
        cohort: 'Session Continue 2026',
        grade: 'En cours d’instruction',
        issuingDate: 'En cours',
        juryPresident: 'Comité de Détection et de Scouting',
        cryptographicHash: `SHA256:${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
        verificationUrl: `https://tsf.africa/candidat/${generatedId}`,
        officialPillarsAudited: [
          'Examen de recevabilité des pièces d’état civil et diplômes',
          'Vérification de non-conflit d’intérêts'
        ]
      },
      badges: [
        {
          id: 'b-new-1',
          name: 'Profil Enregistré au Greffe',
          category: 'merite',
          description: 'Enregistrement complet du dossier administratif.',
          iconName: 'Shield',
          obtainedDate: '2026',
          issuingAuthority: 'Greffe Numérique TSF'
        }
      ],
      opportunites: [],
      journey: [
        {
          stepId: 'profil_cree',
          order: 1,
          label: 'Profil créé',
          tagline: 'Compte initial enregistré',
          dateCompleted: 'Aujourd’hui',
          status: 'completed',
          summary: 'Identifiant TSF-ID émis avec succès.',
          scoreOrKpi: 'Dossier Reçu'
        },
        {
          stepId: 'talent_detecte',
          order: 2,
          label: 'Talent détecté',
          tagline: 'Scouting & pré-qualification',
          status: 'current',
          summary: 'En attente de revue par le hub régional.',
          scoreOrKpi: 'En cours'
        },
        {
          stepId: 'evaluation',
          order: 3,
          label: 'Évaluation',
          tagline: 'Tests psychométriques',
          status: 'upcoming',
          summary: 'Convocations transmises après instruction du dossier.'
        },
        {
          stepId: 'incubation',
          order: 4,
          label: 'Incubation',
          tagline: 'Cursus immersif',
          status: 'upcoming',
          summary: 'Accompagnement par des maîtres de conférences et industriels.'
        },
        {
          stepId: 'certification',
          order: 5,
          label: 'Certification',
          tagline: 'Soutenance finale',
          status: 'upcoming',
          summary: 'Remise solennelle du Passeport TSF.'
        },
        {
          stepId: 'opportunites',
          order: 6,
          label: 'Opportunités',
          tagline: 'Placement et financements',
          status: 'upcoming',
          summary: 'Mise en relation avec les recruteurs partenaires.'
        },
        {
          stepId: 'impact',
          order: 7,
          label: 'Impact',
          tagline: 'Déploiement continental',
          status: 'upcoming',
          summary: 'Création d’impact tangible sur le sol africain.'
        }
      ],
      applications: [
        {
          id: `app-${Date.now()}`,
          programOrOpportunityTitle: 'Dossier de Détection Préliminaire — Guichet Ouvert',
          category: 'Candidature Spontanée',
          submittedAt: 'Aujourd’hui',
          status: 'en_revue_jury',
          statusLabel: 'En instruction préliminaire',
          nextStep: 'Vérification des relevés de notes sous 72h',
          trackingNumber: `TRK-${randomIdNumber}`
        }
      ],
      formationsEnCours: [],
      messages: [
        {
          id: `msg-welcome`,
          senderName: 'Secrétariat Général TSF',
          senderRole: 'Accueil Institutionnel',
          subject: 'Bienvenue sur la plateforme officielle des Talents TSF',
          preview: 'Votre identifiant TSF-ID a été généré avec succès...',
          body: `Félicitations pour votre enregistrement formel.\n\nVotre identifiant unique est ${generatedId}. Conservez-le précieusement pour suivre l'avancement de votre évaluation.\n\nLe Comité de Détection prendra contact avec vous dès validation de la recevabilité de votre dossier.`,
          sentAt: 'À l’instant',
          unread: true,
          category: 'administration'
        }
      ]
    };

    setIsSuccess(true);
    setTimeout(() => {
      onProfileCreated(newProfile);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-4 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0070C0]">
              Profil Créé & TSF-ID Attribué
            </h3>
            <p className="text-xs font-mono text-slate-600 max-w-md mx-auto">
              Votre passeport numérique a été généré sur le registre immuable TSF avec l'identifiant :
            </p>
            <div className="p-3 bg-slate-900 text-[#FF6600] font-mono font-bold text-lg rounded-xl inline-block shadow">
              {createdTsfId}
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Redirection automatique vers votre tableau de bord personnel...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6600] block">
                CANDIDATURE OFFICIELLE
              </span>
              <h2 className="text-2xl font-bold text-[#262626]">
                Créer Mon Profil Talent TSF
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Rejoignez le registre d'excellence et générez votre identifiant infalsifiable TSF-ID.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={formData.prenom}
                  onChange={e => setFormData({ ...formData, prenom: e.target.value })}
                  placeholder="Ex. Aïcha"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0070C0] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nom de famille <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={formData.nom}
                  onChange={e => setFormData({ ...formData, nom: e.target.value })}
                  placeholder="Ex. Koné"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0070C0] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Courriel <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nom@universite-ou-pro.org"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0070C0] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Titre professionnel actuel
                </label>
                <input
                  type="text"
                  value={formData.titreProfessionnel}
                  onChange={e => setFormData({ ...formData, titreProfessionnel: e.target.value })}
                  placeholder="Ex. Chercheur en Énergies Renouvelables"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0070C0] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pays de résidence <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={formData.pays}
                  onChange={e => setFormData({ ...formData, pays: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0070C0] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ville <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={formData.ville}
                  onChange={e => setFormData({ ...formData, ville: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0070C0] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Domaine d'excellence <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.domaine}
                  onChange={e => setFormData({ ...formData, domaine: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0070C0] outline-none"
                >
                  {TALENT_DOMAINS.filter(d => d !== 'Tous les domaines').map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Compétence clé spécifique
                </label>
                <input
                  type="text"
                  value={formData.competencePrincipale}
                  onChange={e => setFormData({ ...formData, competencePrincipale: e.target.value })}
                  placeholder="Ex. Rust, Python, Analyse Macro-économique"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0070C0] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bio synthétique / Parcours marquant
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Décrivez brièvement vos travaux d'impact, recherches ou projets actuels..."
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#0070C0] outline-none"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Gratuit & impartial
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-mono text-slate-600 hover:text-slate-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Générer mon profil & TSF-ID
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
