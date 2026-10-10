import React, { useState } from 'react';
import { TalentProfile, TalentMessageItem } from '../../types/talent';
import { TsfTalentIdCard } from './TsfTalentIdCard';
import { TalentJourneyTimeline } from './TalentJourneyTimeline';
import { 
  User, 
  FileText, 
  BookOpen, 
  Award, 
  Briefcase, 
  Mail, 
  Compass, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Send, 
  AlertCircle, 
  Sparkles, 
  Calendar, 
  Download, 
  ShieldCheck, 
  ChevronRight, 
  Check,
  Building2,
  FileCheck
} from 'lucide-react';

interface TalentDashboardProps {
  talent: TalentProfile;
  onUpdateTalent?: (updated: TalentProfile) => void;
  onSwitchTalent?: (talentId: string) => void;
  allTalents?: TalentProfile[];
}

export type DashboardTab = 
  | 'mon_profil'
  | 'mes_candidatures'
  | 'mes_formations'
  | 'mes_certifications'
  | 'mes_opportunites'
  | 'mes_messages'
  | 'mon_parcours';

export const TalentDashboard: React.FC<TalentDashboardProps> = ({
  talent,
  onUpdateTalent,
  onSwitchTalent,
  allTalents = []
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('mon_profil');
  const [appliedOpps, setAppliedOpps] = useState<string[]>([]);
  const [messages, setMessages] = useState<TalentMessageItem[]>(talent.messages || []);
  const [selectedMessage, setSelectedMessage] = useState<TalentMessageItem | null>(
    (talent.messages && talent.messages[0]) || null
  );
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  // Profile Edit State
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(talent.bio);
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  const handleSaveBio = () => {
    setIsEditingBio(false);
    if (onUpdateTalent) {
      onUpdateTalent({
        ...talent,
        bio: bioInput
      });
    }
    showNotification('Biographie mise à jour avec succès dans l’annuaire TSF');
  };

  const showNotification = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3500);
  };

  const handleApplyOpp = (oppId: string) => {
    setAppliedOpps(prev => [...prev, oppId]);
    showNotification('Candidature transmise avec succès au recruteur partenaire TSF');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage) return;

    setReplySent(true);
    setTimeout(() => {
      setReplySent(false);
      setReplyText('');
      showNotification('Réponse sécurisée transmise au destinataire');
    }, 1200);
  };

  const NAV_ITEMS: { id: DashboardTab; label: string; icon: React.ReactNode; badgeCount?: number }[] = [
    { id: 'mon_profil', label: 'Mon profil', icon: <User className="w-4 h-4" /> },
    { id: 'mes_candidatures', label: 'Mes candidatures', icon: <FileText className="w-4 h-4" />, badgeCount: talent.applications.length },
    { id: 'mes_formations', label: 'Mes formations', icon: <BookOpen className="w-4 h-4" />, badgeCount: talent.formationsEnCours.length },
    { id: 'mes_certifications', label: 'Mes certifications', icon: <Award className="w-4 h-4" /> },
    { id: 'mes_opportunites', label: 'Mes opportunités', icon: <Briefcase className="w-4 h-4" />, badgeCount: talent.opportunites.length },
    { id: 'mes_messages', label: 'Mes messages', icon: <Mail className="w-4 h-4" />, badgeCount: messages.filter(m => m.unread).length },
    { id: 'mon_parcours', label: 'Mon parcours', icon: <Compass className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Simulation Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#0070C0] shrink-0" />
          <span>
            <strong>Espace Candidat & Lauréat TSF :</strong> Connecté au registre central haute fidélité.
          </span>
        </div>
        {allTalents.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-mono text-[11px]">Changer de profil :</span>
            <select
              value={talent.id}
              onChange={(e) => onSwitchTalent && onSwitchTalent(e.target.value)}
              className="text-xs font-mono bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0070C0]"
            >
              {allTalents.map(t => (
                <option key={t.id} value={t.id}>
                  {t.prenom} {t.nom} ({t.localisation.pays} — {t.tsfId.uniqueId})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {statusNotification && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 text-xs text-emerald-800 font-mono flex items-center gap-2 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusNotification}</span>
        </div>
      )}

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* User ID Mini Profile Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center space-x-3">
              <img 
                src={talent.photoUrl} 
                alt={talent.nom} 
                className="w-12 h-12 rounded-xl object-cover border-2 border-[#0070C0]/20 shadow-xs"
              />
              <div className="truncate">
                <div className="font-bold text-sm text-[#262626] font-sans truncate">{talent.prenom} {talent.nom}</div>
                <div className="text-[11px] font-mono text-[#0070C0] font-bold truncate">{talent.tsfId.uniqueId}</div>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono flex items-center justify-between text-slate-500">
              <span>Statut d'accréditation :</span>
              <span className="text-[#0E8A5E] font-bold">{talent.tsfId.statusLabel}</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="bg-white border border-slate-200 rounded-2xl p-2 shadow-xs space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0070C0] text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span 
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive 
                          ? 'bg-[#FF6600] text-white' 
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area (9 cols) */}
        <div className="lg:col-span-9">
          {/* 1. MON PROFIL */}
          {activeTab === 'mon_profil' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#262626] font-sans">Mon Profil Institutionnel</h2>
                  <p className="text-xs font-mono text-slate-500">
                    Données vérifiées visibles par le jury et les partenaires recruteurs
                  </p>
                </div>
                <button
                  onClick={() => setIsEditingBio(!isEditingBio)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {isEditingBio ? 'Annuler' : 'Modifier ma présentation'}
                </button>
              </div>

              {/* TSF ID PASSPORT */}
              <TsfTalentIdCard 
                card={talent.tsfId}
                talentName={`${talent.prenom} ${talent.nom}`}
                photoUrl={talent.photoUrl}
                country={talent.localisation.pays}
                domain={talent.domaine}
              />

              {/* Bio & Professional Statement */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#262626] font-mono uppercase">
                    Déclaration & Présentation Professionnelle
                  </h3>
                </div>

                {isEditingBio ? (
                  <div className="space-y-3">
                    <textarea
                      value={bioInput}
                      onChange={(e) => setBioInput(e.target.value)}
                      rows={4}
                      className="w-full text-xs text-slate-800 p-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsEditingBio(false)}
                        className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-mono cursor-pointer"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleSaveBio}
                        className="px-4 py-1.5 bg-[#0070C0] text-white text-xs font-mono font-bold rounded-lg hover:bg-[#005FA3] cursor-pointer"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    {talent.bio}
                  </p>
                )}

                {talent.manifestePersonnel && (
                  <div className="p-4 bg-slate-50 border-l-4 border-[#FF6600] rounded-r-xl text-xs italic font-serif text-slate-800">
                    « {talent.manifestePersonnel} »
                  </div>
                )}
              </div>

              {/* Verified Competencies */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-sm text-[#262626] font-mono uppercase">
                  Compétences Certifiées par le Jury ({talent.competences.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {talent.competences.map((sk) => (
                    <div key={sk.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{sk.name}</span>
                        <span className="font-mono text-[#0070C0] font-bold">{sk.level}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#0070C0] h-full rounded-full" style={{ width: `${sk.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. MES CANDIDATURES */}
          {activeTab === 'mes_candidatures' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#262626] font-sans">Mes Candidatures & Suivi d'Instruction</h2>
                <p className="text-xs font-mono text-slate-500">
                  Instruction en temps réel par les collèges scientifiques et commissions partenaires
                </p>
              </div>

              <div className="space-y-4">
                {talent.applications.map((app) => (
                  <div key={app.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                            RÉF. {app.trackingNumber}
                          </span>
                          <span className="text-[11px] font-mono text-[#0070C0] font-semibold">
                            • {app.category}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[#262626] font-sans mt-0.5">{app.programOrOpportunityTitle}</h4>
                      </div>
                      <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#FFF3EB] text-[#FF6600] border border-[#FFC49E] shrink-0 self-start sm:self-auto">
                        {app.statusLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-3 border-t border-slate-100">
                      <div>
                        <span className="text-slate-500 block">Date de dépôt officiel :</span>
                        <strong className="text-slate-800">{app.submittedAt}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Prochaine étape programmée :</span>
                        <strong className="text-[#0070C0]">{app.nextStep}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. MES FORMATIONS */}
          {activeTab === 'mes_formations' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#262626] font-sans">Mes Formations & Séminaires</h2>
                <p className="text-xs font-mono text-slate-500">
                  Modules d’excellence suivis au sein de l’Académie des Cadres TSF
                </p>
              </div>

              {talent.formationsEnCours.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-xs font-mono">
                  Aucun module en cours actuellement. Tous les séminaires requis ont été validés avec succès.
                </div>
              ) : (
                <div className="space-y-4">
                  {talent.formationsEnCours.map((module) => (
                    <div key={module.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-[#0070C0] font-bold uppercase block">
                            {module.code} • {module.track}
                          </span>
                          <h4 className="text-base font-bold text-[#262626] font-sans mt-0.5">{module.title}</h4>
                          <span className="text-xs text-slate-600 block mt-1 font-sans">
                            Formateur référent : <strong className="text-slate-800">{module.instructor}</strong>
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-mono font-bold text-[#0070C0]">
                            {module.progressPercent}%
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 block">
                            {module.completedHours}h / {module.durationHours}h
                          </span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#0070C0] h-full rounded-full transition-all duration-500" 
                          style={{ width: `${module.progressPercent}%` }}
                        />
                      </div>

                      {module.nextSessionDate && (
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 pt-1">
                          <Calendar className="w-3.5 h-3.5 text-[#FF6600]" />
                          <span>Prochaine séance plénière : <strong>{module.nextSessionDate}</strong></span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. MES CERTIFICATIONS */}
          {activeTab === 'mes_certifications' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#262626] font-sans">Mes Certifications Officielles</h2>
                <p className="text-xs font-mono text-slate-500">
                  Titres scellés et enregistrés au registre central TSF
                </p>
              </div>

              {/* Certificate Diploma Visualizer */}
              <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-[#0070C0] text-[#0070C0] flex items-center justify-center font-bold text-xs font-mono">
                      TSF
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-[#0070C0] uppercase">
                      TALENTS SANS FRONTIÈRES • GREFFE ACADÉMIQUE
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#0E8A5E] bg-[#ECFDF5] px-3 py-1 rounded-md border border-[#A7F3D0] font-bold">
                    TITRE AUTHENTIFIÉ
                  </span>
                </div>

                <div className="text-center space-y-2 py-4">
                  <span className="text-xs font-mono uppercase text-slate-500">LE CONSEIL D'ORIENTATION STRATÉGIQUE DÉCERNE À</span>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    {talent.prenom} {talent.nom}
                  </div>
                  <div className="text-sm font-semibold text-slate-700 font-sans">
                    {talent.certification.programName}
                  </div>
                  <div className="text-sm font-bold font-mono text-[#FF6600]">
                    {talent.certification.grade}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono border-t border-b border-slate-200 py-4 text-slate-600">
                  <div>
                    <span className="block text-slate-400">N° Certificat :</span>
                    <strong className="text-slate-900">{talent.certification.tsfCertificateNumber}</strong>
                  </div>
                  <div>
                    <span className="block text-slate-400">Date de délibération :</span>
                    <strong className="text-slate-900">{talent.certification.issuingDate}</strong>
                  </div>
                  <div>
                    <span className="block text-slate-400">Président du Jury :</span>
                    <strong className="text-slate-900">{talent.certification.juryPresident}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
                  <div className="truncate max-w-sm">
                    Hash immuable : <code>{talent.certification.cryptographicHash.slice(0, 30)}...</code>
                  </div>
                  <button
                    onClick={() => showNotification('Attestation officielle PDF générée et téléchargée')}
                    className="px-4 py-2.5 rounded-xl bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger l’attestation officielle (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. MES OPPORTUNITÉS */}
          {activeTab === 'mes_opportunites' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#262626] font-sans">Mes Opportunités Dédiées</h2>
                <p className="text-xs font-mono text-slate-500">
                  Postes de direction, fellowships et financements matchés avec votre niveau TSF
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {talent.opportunites.map((opp) => {
                  const hasApplied = appliedOpps.includes(opp.id);
                  return (
                    <div key={opp.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono uppercase bg-[#EBF5FC] text-[#0070C0] border border-[#A3D1F1] px-2.5 py-0.5 rounded font-bold">
                            {opp.type}
                          </span>
                          <span className="text-xs font-mono font-bold text-[#0E8A5E] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded">
                            {opp.matchScore}% Match
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-[#262626] font-sans">{opp.title}</h4>
                        <div className="text-xs text-slate-600 font-mono">{opp.organization} • {opp.location}</div>
                        
                        {opp.compensationOrBudget && (
                          <div className="text-xs font-mono text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                            Budget / Rémunération : <strong>{opp.compensationOrBudget}</strong>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#FF6600] font-bold">
                          Date limite : {opp.deadline}
                        </span>
                        {hasApplied ? (
                          <span className="px-3.5 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded-lg flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Postulé
                          </span>
                        ) : (
                          <button
                            onClick={() => handleApplyOpp(opp.id)}
                            className="px-4 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            Postuler
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 6. MES MESSAGES */}
          {activeTab === 'mes_messages' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#262626] font-sans">Messagerie Institutionnelle & Mentorat</h2>
                <p className="text-xs font-mono text-slate-500">
                  Canal chiffré d'échanges avec vos mentors, jurys et recruteurs partenaires
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                {/* Messages List (5 cols) */}
                <div className="md:col-span-5 border-r border-slate-200 divide-y divide-slate-100">
                  {messages.map((msg) => {
                    const isSelected = selectedMessage?.id === msg.id;
                    return (
                      <button
                        key={msg.id}
                        type="button"
                        onClick={() => setSelectedMessage(msg)}
                        className={`w-full text-left p-4 transition-colors cursor-pointer ${
                          isSelected ? 'bg-slate-100' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono mb-1">
                          <span className="font-bold text-[#0070C0] truncate">{msg.senderName}</span>
                          <span className="text-[10px] text-slate-500 shrink-0">{msg.sentAt}</span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-900 truncate mb-1">{msg.subject}</h5>
                        <p className="text-[11px] text-slate-500 truncate">{msg.preview}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Message Detail & Reply (7 cols) */}
                <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-6">
                  {selectedMessage ? (
                    <>
                      <div className="space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm text-[#262626] font-sans">{selectedMessage.subject}</h4>
                            <span className="text-[10px] font-mono text-slate-400">{selectedMessage.sentAt}</span>
                          </div>
                          <div className="text-xs text-[#0070C0] font-mono font-medium">
                            {selectedMessage.senderName} • {selectedMessage.senderRole}
                          </div>
                        </div>

                        <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                          {selectedMessage.body}
                        </div>
                      </div>

                      {/* Reply Box */}
                      <form onSubmit={handleSendReply} className="space-y-2 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                          Répondre par canal sécurisé :
                        </span>
                        <textarea
                          required
                          rows={3}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Rédigez votre réponse officielle..."
                          className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none"
                        />
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={replySent}
                            className="px-4 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-bold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{replySent ? 'Envoi...' : 'Envoyer ma réponse'}</span>
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div className="text-center text-slate-400 text-xs font-mono py-12">
                      Sélectionnez un message pour l'afficher
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 7. MON PARCOURS */}
          {activeTab === 'mon_parcours' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#262626] font-sans">Mon Parcours & Jalons TSF</h2>
                <p className="text-xs font-mono text-slate-500">
                  Visualisation interactive des 7 paliers fondateurs de votre progression
                </p>
              </div>

              <TalentJourneyTimeline 
                milestones={talent.journey}
                talentName={`${talent.prenom} ${talent.nom}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
