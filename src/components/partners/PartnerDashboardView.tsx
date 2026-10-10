import React, { useState } from 'react';
import { SAMPLE_PARTNER_DASHBOARDS } from '../../data/partnersData';
import { PartnerDashboardState, PartnerPathwayType } from '../../types/partner';
import { 
  Building2, 
  Landmark, 
  Globe, 
  Layers, 
  FileText, 
  FolderCheck, 
  Activity, 
  Briefcase, 
  Mail, 
  BarChart3, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Send, 
  AlertCircle, 
  Clock, 
  ShieldCheck,
  Check
} from 'lucide-react';

export type PartnerTab = 
  | 'mes_programmes'
  | 'mes_candidatures'
  | 'mes_documents'
  | 'mes_indicateurs'
  | 'mes_opportunites'
  | 'mes_echanges'
  | 'mes_rapports';

export const PartnerDashboardView: React.FC = () => {
  const [partnerType, setPartnerType] = useState<PartnerPathwayType>('entreprise');
  const [activeTab, setActiveTab] = useState<PartnerTab>('mes_programmes');
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const currentDashboard: PartnerDashboardState = SAMPLE_PARTNER_DASHBOARDS[partnerType] || SAMPLE_PARTNER_DASHBOARDS.entreprise;
  const [selectedMessage, setSelectedMessage] = useState(currentDashboard.messages[0] || null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setReplySent(true);
    setTimeout(() => {
      setReplySent(false);
      setReplyText('');
      showNotification('Réponse transmise avec succès au secrétariat des alliances TSF');
    }, 1200);
  };

  const NAV_ITEMS: { id: PartnerTab; label: string; icon: React.ReactNode; badgeCount?: number }[] = [
    { id: 'mes_programmes', label: 'Mes programmes', icon: <Layers className="w-4 h-4" />, badgeCount: currentDashboard.programs.length },
    { id: 'mes_candidatures', label: 'Mes candidatures', icon: <FileText className="w-4 h-4" />, badgeCount: currentDashboard.applications.length },
    { id: 'mes_documents', label: 'Mes documents', icon: <FolderCheck className="w-4 h-4" />, badgeCount: currentDashboard.documents.length },
    { id: 'mes_indicateurs', label: 'Mes indicateurs', icon: <Activity className="w-4 h-4" /> },
    { id: 'mes_opportunites', label: 'Mes opportunités', icon: <Briefcase className="w-4 h-4" />, badgeCount: currentDashboard.opportunities.length },
    { id: 'mes_echanges', label: 'Mes échanges', icon: <Mail className="w-4 h-4" />, badgeCount: currentDashboard.messages.filter(m => m.unread).length },
    { id: 'mes_rapports', label: 'Mes rapports', icon: <BarChart3 className="w-4 h-4" />, badgeCount: currentDashboard.reports.length }
  ];

  return (
    <div className="space-y-6">
      {/* Simulation Notice & Partner Switcher */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#0070C0] shrink-0" />
          <span>
            <strong>Espace Partenaire TSF :</strong> Cockpit institutionnel connecté au registre des conventions TSF.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-slate-500">Profil partenaire test :</span>
          <select
            value={partnerType}
            onChange={(e) => {
              const newType = e.target.value as PartnerPathwayType;
              setPartnerType(newType);
              setSelectedMessage(SAMPLE_PARTNER_DASHBOARDS[newType]?.messages[0] || null);
            }}
            className="text-xs font-mono bg-white border border-slate-300 rounded-xl px-2.5 py-1 text-slate-800 outline-none focus:ring-1 focus:ring-[#0070C0]"
          >
            <option value="entreprise">Entreprise — Sonatel / Orange Africa</option>
            <option value="bailleur">Bailleur / PTF — Fonds Panafricain FPDD</option>
            <option value="osc">Société Civile (OSC) — Collectif COPESC</option>
          </select>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-mono text-emerald-800 flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Partner Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Partner Identity & Nav (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#0070C0] uppercase tracking-wider block font-bold">
                PARTENAIRE HOMOLOGUÉ
              </span>
              <h3 className="font-bold text-sm text-[#262626] font-sans leading-tight">
                {currentDashboard.partnerName}
              </h3>
              <p className="text-[11px] font-mono text-slate-500">
                {currentDashboard.country}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono flex items-center justify-between text-slate-500">
              <span>Alliance depuis :</span>
              <strong className="text-slate-900">{currentDashboard.partnershipSince}</strong>
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

        {/* Dashboard Main Content (9 cols) */}
        <div className="lg:col-span-9">
          {/* 1. MES PROGRAMMES */}
          {activeTab === 'mes_programmes' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#262626] font-sans">Mes Programmes Soutenus & Co-Développés</h2>
                <p className="text-xs font-mono text-slate-500">
                  Filières et chaires actives au sein de l'infrastructure académique TSF
                </p>
              </div>

              <div className="space-y-4">
                {currentDashboard.programs.map((prog) => (
                  <div key={prog.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-[#0070C0] font-bold uppercase block">
                          {prog.contributionType}
                        </span>
                        <h4 className="text-lg font-bold text-[#262626] font-sans">{prog.title}</h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                        {prog.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono">
                      <div>
                        <span className="text-slate-500 block">Engagement :</span>
                        <strong className="text-slate-800">{prog.financialOrInKindCommitment}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Bénéficiaires directs :</span>
                        <strong className="text-emerald-700">{prog.laureatesBenefiting} Lauréats</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Date d'échéance :</span>
                        <strong className="text-slate-800">{prog.renewalDate}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. MES CANDIDATURES */}
          {activeTab === 'mes_candidatures' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#262626] font-sans">Mes Conventions & Candidatures Déposées</h2>
                <p className="text-xs font-mono text-slate-500">
                  Suivi des protocoles en cours d'instruction juridique et de signature
                </p>
              </div>

              <div className="space-y-4">
                {currentDashboard.applications.map((app) => (
                  <div key={app.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">
                          RÉF. {app.trackingNumber} • {app.category}
                        </span>
                        <h4 className="text-base font-bold text-[#262626] font-sans">{app.title}</h4>
                      </div>
                      <span className="px-3 py-1 rounded-md text-xs font-mono bg-[#FFF3EB] text-[#FF6600] border border-[#FFC49E] font-bold">
                        {app.stage}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-3 border-t border-slate-100 text-slate-600">
                      <div>Date de soumission : <strong className="text-slate-900">{app.submittedDate}</strong></div>
                      <div>Chargé d'affaires TSF : <strong className="text-[#0070C0] font-bold">{app.assignedAdvisor}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. MES DOCUMENTS */}
          {activeTab === 'mes_documents' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#262626] font-sans">Mes Documents Contractuels & Chartes</h2>
                <p className="text-xs font-mono text-slate-500">
                  Protocoles signés, conventions cadres et accords d'alliance opposables
                </p>
              </div>

              <div className="space-y-4">
                {currentDashboard.documents.map((doc) => (
                  <div key={doc.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                        {doc.type}
                      </span>
                      <h4 className="font-bold text-sm text-[#262626] font-sans">{doc.title}</h4>
                      <div className="text-[11px] font-mono text-slate-500">
                        Signé le {doc.signedDate} • Valide jusqu'au {doc.validUntil} • Taille : {doc.fileSize}
                      </div>
                    </div>

                    <button
                      onClick={() => showNotification(`Document téléchargé : ${doc.title}`)}
                      className="px-4 py-2 bg-slate-50 hover:bg-[#0070C0] text-[#0070C0] hover:text-white border border-slate-200 text-xs font-mono font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Télécharger l'acte scellé</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. MES INDICATEURS */}
          {activeTab === 'mes_indicateurs' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#262626] font-sans">Mes Indicateurs d'Impact en Temps Réel</h2>
                <p className="text-xs font-mono text-slate-500">
                  Cadre de suivi bilatéral vérifié par audit indépendant
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentDashboard.indicators.map((ind) => (
                  <div key={ind.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
                    <span className="text-xs font-bold text-slate-900 block font-sans">{ind.label}</span>

                    <div className="flex items-end justify-between font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block font-bold">VALEUR ATTEINTE</span>
                        <div className="text-2xl font-bold text-[#0070C0]">{ind.currentValue}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase block font-bold">CIBLE CONVENTIONNÉE</span>
                        <div className="text-lg font-bold text-[#FF6600]">{ind.targetValue}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                      <span>Dernière mise à jour : {ind.lastUpdated}</span>
                      {ind.verifiedByAudit && (
                        <span className="text-[#0E8A5E] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Audit vérifié
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. MES OPPORTUNITÉS */}
          {activeTab === 'mes_opportunites' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#262626] font-sans">Mes Opportunités & Recrutements Fast-Track</h2>
                <p className="text-xs font-mono text-slate-500">
                  Offres réservées déposées pour le vivier certifié TSF
                </p>
              </div>

              {currentDashboard.opportunities.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-xs font-mono text-slate-500">
                  Aucun appel à candidatures actif pour cette session. Cliquez sur « Déposer une offre » pour solliciter le vivier TSF.
                </div>
              ) : (
                <div className="space-y-4">
                  {currentDashboard.opportunities.map((opp) => (
                    <div key={opp.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-[#0070C0] font-bold">{opp.domain}</span>
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-[#FFF3EB] text-[#FF6600] border border-[#FFC49E]">
                          {opp.status.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#262626] font-sans">{opp.title}</h4>
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-600 pt-2 border-t border-slate-100">
                        <div>Postes ouverts : <strong className="text-slate-900">{opp.spotsOffered}</strong></div>
                        <div>Candidatures qualifiées reçues : <strong className="text-[#0070C0]">{opp.applicantsCount}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 6. MES ÉCHANGES */}
          {activeTab === 'mes_echanges' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#262626] font-sans">Mes Échanges Sécurisés & Secrétariat d'Alliance</h2>
                <p className="text-xs font-mono text-slate-500">
                  Canal direct chiffré avec le directoire et les auditeurs TSF
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="md:col-span-5 border-r border-slate-200 divide-y divide-slate-100">
                  {currentDashboard.messages.map((msg) => (
                    <button
                      key={msg.id}
                      type="button"
                      onClick={() => setSelectedMessage(msg)}
                      className={`w-full text-left p-4 transition-colors cursor-pointer ${
                        selectedMessage?.id === msg.id ? 'bg-slate-100' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs font-mono mb-1">
                        <span className="font-bold text-[#0070C0] truncate">{msg.senderName}</span>
                        <span className="text-[10px] text-slate-400">{msg.sentAt}</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 truncate mb-1">{msg.subject}</h5>
                      <p className="text-[11px] text-slate-500 truncate">{msg.preview}</p>
                    </button>
                  ))}
                </div>

                <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-6">
                  {selectedMessage && (
                    <>
                      <div className="space-y-3">
                        <div className="border-b border-slate-100 pb-3">
                          <h4 className="font-bold text-sm text-[#262626] font-sans">{selectedMessage.subject}</h4>
                          <span className="text-xs font-mono text-[#0070C0]">
                            {selectedMessage.senderName} • {selectedMessage.senderRole}
                          </span>
                        </div>
                        <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                          {selectedMessage.body}
                        </div>
                      </div>

                      <form onSubmit={handleSendReply} className="space-y-2 pt-2 border-t border-slate-100">
                        <textarea
                          required
                          rows={3}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Répondre par canal sécurisé..."
                          className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0070C0]"
                        />
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={replySent}
                            className="px-4 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-bold rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{replySent ? 'Envoi...' : 'Envoyer'}</span>
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 7. MES RAPPORTS */}
          {activeTab === 'mes_rapports' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#262626] font-sans">Mes Rapports d'Exécution & Bilans d'Audit</h2>
                <p className="text-xs font-mono text-slate-500">
                  Rapports financiers, revues fiduciaires et bilans périodiques
                </p>
              </div>

              <div className="space-y-4">
                {currentDashboard.reports.map((rep) => (
                  <div key={rep.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase bg-[#EBF5FC] text-[#0070C0] px-2 py-0.5 rounded font-bold border border-[#A3D1F1]">
                          {rep.frequency}
                        </span>
                        <span className="text-xs font-mono text-slate-500">{rep.date}</span>
                      </div>
                      <h4 className="font-bold text-sm text-[#262626] font-sans">{rep.title}</h4>
                      <span className="text-[11px] font-mono text-[#0E8A5E] font-semibold block">
                        Statut de conformité : {rep.status}
                      </span>
                    </div>

                    <button
                      onClick={() => showNotification(`Rapport téléchargé : ${rep.title}`)}
                      className="px-4 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
