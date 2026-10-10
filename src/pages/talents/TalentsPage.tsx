import React, { useState } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { PageHeader } from '../../components/layout/PageHeader';
import { SubNav, SubNavItem } from '../../components/navigation/SubNav';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { OpportunityCard } from '../../components/cards/OpportunityCard';
import { Timeline } from '../../components/data/Timeline';
import { OPPORTUNITIES_LIST } from '../../data/institutionData';
import { 
  SAMPLE_TALENTS_PROFILES, 
  getAllTalents, 
  TALENT_DOMAINS, 
  TALENT_REGIONS 
} from '../../data/talentsData';
import { TalentProfile } from '../../types/talent';
import { TsfTalentIdCard } from '../../components/talents/TsfTalentIdCard';
import { TalentJourneyTimeline } from '../../components/talents/TalentJourneyTimeline';
import { TalentProfileView } from '../../components/talents/TalentProfileView';
import { TalentDashboard } from '../../components/talents/TalentDashboard';
import { CreateProfileModal } from '../../components/talents/CreateProfileModal';
import { SignalTalentModal } from '../../components/talents/SignalTalentModal';

import { 
  Sparkles, 
  UserCheck, 
  Shield, 
  Briefcase, 
  Award, 
  Compass, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Filter, 
  PlusCircle, 
  Eye, 
  Layers, 
  MapPin, 
  Zap, 
  ChevronRight, 
  LayoutDashboard, 
  UserPlus, 
  Check 
} from 'lucide-react';

const TALENT_SUB_NAV: SubNavItem[] = [
  { id: 'overview', label: 'Portail & Landing', path: '/talents' },
  { id: 'dashboard', label: 'Tableau de Bord (Dashboard)', path: '/talents/dashboard' },
  { id: 'profil', label: 'Profils & Showcase', path: '/talents/profil' },
  { id: 'opportunites', label: 'Opportunités dédiées', path: '/talents/opportunites' },
  { id: 'detection', label: 'Protocole de Détection', path: '/talents/detection' },
  { id: 'certification', label: 'Passeport & TSF-ID', path: '/talents/certification' },
  { id: 'inscription', label: 'Créer mon profil', path: '/talents/inscription' }
];

export const TalentsPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  // Route flags
  const isDashboard = currentPath === '/talents/dashboard';
  const isProfil = currentPath === '/talents/profil';
  const isInscription = currentPath === '/talents/inscription';
  const isSignaler = currentPath === '/talents/signaler';
  const isDetection = currentPath === '/talents/detection';
  const isOpportunites = currentPath === '/talents/opportunites';
  const isCertification = currentPath === '/talents/certification';
  const isOverview = !isDashboard && !isProfil && !isInscription && !isSignaler && !isDetection && !isOpportunites && !isCertification;

  // State management for mock database
  const [talentsList, setTalentsList] = useState<TalentProfile[]>(SAMPLE_TALENTS_PROFILES);
  const [selectedTalentId, setSelectedTalentId] = useState<string>(SAMPLE_TALENTS_PROFILES[0].id);
  const [activeDomainFilter, setActiveDomainFilter] = useState('Tous les domaines');
  const [activeRegionFilter, setActiveRegionFilter] = useState('Toutes les régions');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSignalModalOpen, setIsSignalModalOpen] = useState(false);

  // Active talent record
  const currentTalent = talentsList.find(t => t.id === selectedTalentId) || talentsList[0];

  // Callback when a new profile is created
  const handleProfileCreated = (newProfile: TalentProfile) => {
    setTalentsList(prev => [newProfile, ...prev]);
    setSelectedTalentId(newProfile.id);
    setIsCreateModalOpen(false);
    navigate('/talents/dashboard');
  };

  // Filtered public directory talents
  const filteredTalents = talentsList.filter(t => {
    const matchesDomain = activeDomainFilter === 'Tous les domaines' || t.domaine === activeDomainFilter;
    const matchesRegion = activeRegionFilter === 'Toutes les régions' || t.localisation.region === activeRegionFilter;
    const matchesSearch = searchQuery === '' || 
      `${t.prenom} ${t.nom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.titreProfessionnel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.localisation.pays.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tsfId.uniqueId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesRegion && matchesSearch;
  });

  return (
    <div className="pb-24 space-y-10">
      <PageHeader
        kicker="TSF TALENT PORTAL • PLATEFORME DE SERVICES"
        title="L'Espace des Talents & Bâtisseurs Panafricains"
        description="Une infrastructure dédiée à la découverte, la qualification, la certification cryptographique et la propulsion des hauts potentiels d'Afrique."
      >
        <SubNav items={TALENT_SUB_NAV} />
      </PageHeader>

      <Container>
        {/* ========================================================================= */}
        {/* 1. LANDING PAGE : JE SUIS UN TALENT                                        */}
        {/* ========================================================================= */}
        {isOverview && (
          <div className="space-y-16">
            {/* HERO CARD : JE SUIS UN TALENT */}
            <div className="relative overflow-hidden rounded-2xl bg-[#121212] text-white p-8 sm:p-12 lg:p-16 border border-[#2B2B2B] shadow-xl">
              <div className="relative z-10 max-w-4xl space-y-8">
                {/* Official Kicker */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-xs font-mono tracking-wider text-[#FF6600]">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF6600]" />
                  <span>TSF TALENT PORTAL • GUICHET D'ACCÈS PANAFRICAIN</span>
                </div>

                {/* Section Title */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
                  JE SUIS UN TALENT
                </h1>

                {/* MANDATORY USER MESSAGE */}
                <p className="text-lg sm:text-2xl text-slate-100 font-medium leading-relaxed max-w-3xl border-l-4 border-[#FF6600] pl-4 sm:pl-6 italic font-serif">
                  « Votre talent mérite d'être vu, développé, reconnu et connecté aux bonnes opportunités. »
                </p>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal font-sans">
                  Talents Sans Frontières ne requiert aucun capital de départ, aucune appartenance de classe, aucun frais de dossier. Notre chaîne de valeur intégrée — <strong>Détecter, Incuber, Certifier, Propulser</strong> — offre aux esprits bâtisseurs un passeport cryptographique d'excellence reconnu par les institutions et leaders industriels majeurs.
                </p>

                {/* THE 3 MANDATORY CTAS */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  {/* CTA 1: CRÉER MON PROFIL */}
                  <Button
                    variant="accent"
                    size="lg"
                    onClick={() => setIsCreateModalOpen(true)}
                    icon={<UserPlus className="w-4 h-4" />}
                  >
                    CRÉER MON PROFIL
                  </Button>

                  {/* CTA 2: SIGNALER UN TALENT */}
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsSignalModalOpen(true)}
                    icon={<Compass className="w-4 h-4 text-[#FF6600]" />}
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    SIGNALER UN TALENT
                  </Button>

                  {/* CTA 3: DÉCOUVRIR LES OPPORTUNITÉS */}
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate('/talents/opportunites')}
                    icon={<Briefcase className="w-4 h-4 text-[#0070C0]" />}
                    className="border-[#0070C0]/50 text-white hover:bg-white/10"
                  >
                    DÉCOUVRIR LES OPPORTUNITÉS
                  </Button>
                </div>

                {/* Institutional Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block">DÉTECTION MERITOKRATIK</span>
                    <strong className="text-white text-base font-bold">100% Gratuite</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">PASSEPORT INFALSIFIABLE</span>
                    <strong className="text-[#FF6600] text-base font-bold">TSF-ID VeriTrust</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">HUBS OPÉRATIONNELS</span>
                    <strong className="text-white text-base font-bold">18 Villes Clés</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">TAUX D'INSERTION CADRES</span>
                    <strong className="text-[#0E8A5E] text-base font-bold">75% à 6 Mois</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Switch to Dashboard or Spotlight */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-[#F5F5F7] border border-[#E8E8E8] rounded-2xl shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#0070C0] text-white flex items-center justify-center shadow-xs">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#262626] font-sans">Espace Personnel & Tableau de Bord</h3>
                  <p className="text-xs text-[#595959] font-sans">
                    Accédez directement à vos 7 modules de gestion : Profil, Candidatures, Formations, Certifications, Opportunités, Messages et Parcours.
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/talents/dashboard')}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Ouvrir le Tableau de Bord
              </Button>
            </div>

            {/* SHOWCASE OF TSF-ID & TALENT JOURNEY */}
            <div className="space-y-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FF6600] font-bold block">
                    COMPOSANT EMBLÉMATIQUE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#262626] font-sans tracking-tight">
                    Le Passeport Biométrique TSF-ID & Le Parcours
                  </h2>
                  <p className="text-xs text-[#595959] mt-1 max-w-xl font-sans">
                    Chaque lauréat TSF dispose d’un identifiant unique infalsifiable couplé à une timeline de progression en 7 paliers standardisés.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#7D7D7D]">Sélectionner un profil modèle :</span>
                  <select
                    value={selectedTalentId}
                    onChange={(e) => setSelectedTalentId(e.target.value)}
                    className="text-xs font-mono bg-white border border-[#E8E8E8] rounded-lg px-2.5 py-1.5 font-medium text-[#262626]"
                  >
                    {talentsList.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.prenom} {t.nom} — {t.domaine.split(',')[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* TSF TALENT ID COMPONENT SHOWCASE */}
              <TsfTalentIdCard 
                card={currentTalent.tsfId}
                talentName={`${currentTalent.prenom} ${currentTalent.nom}`}
                photoUrl={currentTalent.photoUrl}
                country={currentTalent.localisation.pays}
                domain={currentTalent.domaine}
              />

              {/* TALENT JOURNEY TIMELINE EMBED */}
              <TalentJourneyTimeline 
                milestones={currentTalent.journey}
                talentName={`${currentTalent.prenom} ${currentTalent.nom}`}
              />
            </div>

            {/* DIRECTORY OF ACTIVE CERTIFIED TALENTS */}
            <div className="space-y-6 pt-6 border-t border-[#E8E8E8]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FF6600] font-bold block">
                    ANNUAIRE PUBLIC D'EXCELLENCE
                  </span>
                  <h2 className="text-2xl font-bold text-[#262626] font-sans tracking-tight">
                    Vivier Panafricain des Lauréats & Cadres Stratégiques
                  </h2>
                  <p className="text-xs text-[#595959] mt-0.5 font-sans">
                    Consultez les profils complets audités et certifiés par Talents Sans Frontières.
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCreateModalOpen(true)}
                  icon={<PlusCircle className="w-3.5 h-3.5 text-[#0070C0]" />}
                >
                  Ajouter un profil candidat
                </Button>
              </div>

              {/* Multi-Dimensional Filter Bar */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  {/* Search input */}
                  <div className="sm:col-span-6 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Rechercher par nom, TSF-ID, compétence ou pays..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0070C0] font-sans"
                    />
                  </div>

                  {/* Domain select */}
                  <div className="sm:col-span-3">
                    <select
                      value={activeDomainFilter}
                      onChange={e => setActiveDomainFilter(e.target.value)}
                      className="w-full py-2.5 px-3 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0070C0] font-sans"
                    >
                      {TALENT_DOMAINS.map((dom, i) => (
                        <option key={i} value={dom}>{dom}</option>
                      ))}
                    </select>
                  </div>

                  {/* Region select */}
                  <div className="sm:col-span-3">
                    <select
                      value={activeRegionFilter}
                      onChange={e => setActiveRegionFilter(e.target.value)}
                      className="w-full py-2.5 px-3 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0070C0] font-sans"
                    >
                      {TALENT_REGIONS.map((reg, i) => (
                        <option key={i} value={reg}>{reg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                  <span>{filteredTalents.length} talent(s) certifié(s) dans le registre</span>
                  {(activeDomainFilter !== 'Tous les domaines' || activeRegionFilter !== 'Toutes les régions' || searchQuery) && (
                    <button
                      onClick={() => {
                        setActiveDomainFilter('Tous les domaines');
                        setActiveRegionFilter('Toutes les régions');
                        setSearchQuery('');
                      }}
                      className="text-[#FF6600] font-bold hover:underline cursor-pointer"
                    >
                      Réinitialiser les critères
                    </button>
                  )}
                </div>
              </div>

              {/* Grid of Human Talent Profiles & Journeys */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTalents.map((t) => {
                  const currentMilestone = t.journey?.find(j => j.status === 'current') || t.journey?.[t.journey.length - 1];
                  return (
                    <article 
                      key={t.id}
                      className="bg-white border border-slate-200 hover:border-[#0070C0]/50 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
                    >
                      <div className="space-y-4">
                        {/* 1. PHOTOGRAPHIE & IDENTITÉ */}
                        <div className="flex items-start gap-4">
                          <div className="relative shrink-0">
                            <img 
                              src={t.photoUrl} 
                              alt={`${t.prenom} ${t.nom}`} 
                              className="w-18 h-18 rounded-2xl object-cover border-2 border-slate-100 shadow-sm ring-1 ring-slate-200 group-hover:ring-[#0070C0]/40 transition-all" 
                            />
                            <div className="absolute -bottom-1 -right-1 bg-[#0E8A5E] text-white p-1 rounded-full border-2 border-white shadow-xs">
                              <CheckCircle2 className="w-3 h-3" />
                            </div>
                          </div>

                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] font-mono text-[#0070C0] font-bold bg-[#EBF5FC] px-2 py-0.5 rounded border border-[#A3D1F1]">
                                {t.tsfId.uniqueId}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">
                                {t.tsfId.level}
                              </span>
                            </div>

                            <h4 className="font-bold text-lg text-[#262626] font-sans truncate group-hover:text-[#0070C0] transition-colors">
                              {t.prenom} {t.nom}
                            </h4>

                            <p className="text-xs text-slate-600 line-clamp-1 font-medium font-sans">
                              {t.titreProfessionnel}
                            </p>
                          </div>
                        </div>

                        {/* 2. DOMAINE & TERRITOIRE */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-xs font-mono text-[#0070C0] bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                            {t.domaine}
                          </span>
                          <span className="text-xs font-mono text-slate-500 flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                            <MapPin className="w-3 h-3 text-[#FF6600]" />
                            <span>{t.localisation.ville}, {t.localisation.pays}</span>
                          </span>
                        </div>

                        {/* 3. HISTOIRE COURTE */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block tracking-wider">
                            PARCOURS & VISION
                          </span>
                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-sans">
                            {t.bio}
                          </p>
                        </div>

                        {/* 4. PROGRESSION TSF */}
                        {currentMilestone && (
                          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs font-mono">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-400 uppercase font-bold">JALON DE PROGRESSION :</span>
                              <span className="text-[#0E8A5E] font-bold">{currentMilestone.status === 'current' ? 'En cours' : 'Validé'}</span>
                            </div>
                            <div className="text-slate-800 font-semibold truncate font-sans text-xs">
                              {currentMilestone.label}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 5. ACTION */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                        <span className="text-xs font-mono text-[#0E8A5E] font-semibold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#0E8A5E] animate-pulse" />
                          {t.disponibilite.statut}
                        </span>

                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            setSelectedTalentId(t.id);
                            navigate('/talents/profil');
                          }}
                          className="bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-bold"
                          icon={<Eye className="w-3.5 h-3.5" />}
                        >
                          Consulter le profil
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. DASHBOARD TALENT : LES 7 MODULES OBLIGATOIRES                           */}
        {/* ========================================================================= */}
        {isDashboard && (
          <TalentDashboard 
            talent={currentTalent}
            allTalents={talentsList}
            onSwitchTalent={(id) => setSelectedTalentId(id)}
            onUpdateTalent={(updated) => {
              setTalentsList(prev => prev.map(t => t.id === updated.id ? updated : t));
            }}
          />
        )}

        {/* ========================================================================= */}
        {/* 3. PROFIL TALENT COMPLET : STRUCTURE EN 14 POINTS                           */}
        {/* ========================================================================= */}
        {isProfil && (
          <div className="space-y-6">
            {/* Quick Switch Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#F5F5F7] border border-[#E8E8E8] rounded-xl text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-[#7D7D7D]">Profil actuellement inspecté :</span>
                <strong className="text-[#262626] text-sm">{currentTalent.prenom} {currentTalent.nom}</strong>
                <span className="text-[#FF6600]">({currentTalent.tsfId.uniqueId})</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedTalentId}
                  onChange={(e) => setSelectedTalentId(e.target.value)}
                  className="bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-800"
                >
                  {talentsList.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.prenom} {t.nom} ({t.localisation.pays})
                    </option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/talents/dashboard')}
                >
                  Ouvrir dans mon Dashboard
                </Button>
              </div>
            </div>

            {/* FULL 14-FIELD PROFILE VIEW */}
            <TalentProfileView 
              talent={currentTalent}
              onApplyOpportunity={(oppId) => {
                navigate('/talents/dashboard');
              }}
              onContactTalent={(talentId) => {
                navigate('/contact');
              }}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. CANDIDATURE & INSCRIPTION                                              */}
        {/* ========================================================================= */}
        {isInscription && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6600]">
                PORTAIL D'ENRÔLEMENT OFFICIEL
              </span>
              <h2 className="text-3xl font-bold text-[#262626] font-sans">
                Création de Profil & Attribution TSF-ID
              </h2>
              <p className="text-xs sm:text-sm text-[#595959] max-w-lg mx-auto">
                Rejoignez le registre d'excellence pour soumettre votre dossier aux collèges scientifiques et bénéficier d'un passeport infalsifiable.
              </p>
            </div>

            <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-10 shadow-xs">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full bg-[#0070C0] hover:bg-[#005FA3] text-white font-bold border-none shadow-sm py-4 text-sm"
                icon={<UserPlus className="w-5 h-5" />}
              >
                Ouvrir le formulaire officiel de création de profil
              </Button>

              <div className="mt-8 pt-6 border-t border-[#E8E8E8] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs font-mono text-[#595959]">
                <div className="p-3 bg-[#F5F5F7] rounded-lg">
                  <Shield className="w-4 h-4 text-[#0E8A5E] mx-auto mb-1" />
                  <strong>100% Anonyme & Éthique</strong>
                  <p className="text-[11px] text-[#7D7D7D] mt-0.5">Audits à l'aveugle</p>
                </div>
                <div className="p-3 bg-[#F5F5F7] rounded-lg">
                  <Award className="w-4 h-4 text-[#FF6600] mx-auto mb-1" />
                  <strong>TSF-ID Généré</strong>
                  <p className="text-[11px] text-[#7D7D7D] mt-0.5">Certifié et crypté</p>
                </div>
                <div className="p-3 bg-[#F5F5F7] rounded-lg">
                  <Briefcase className="w-4 h-4 text-[#0070C0] mx-auto mb-1" />
                  <strong>Accès aux Bourses</strong>
                  <p className="text-[11px] text-[#7D7D7D] mt-0.5">Prise en charge intégrale</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. PROTOCOLE DE DÉTECTION                                                 */}
        {/* ========================================================================= */}
        {isDetection && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF6600] font-bold">
                Rigueur Méthodologique & Anti-Biais
              </span>
              <h2 className="text-3xl font-bold text-[#262626] font-sans mt-1">
                Le Protocole Panafricain de Détection TSF
              </h2>
              <p className="text-sm sm:text-base text-[#595959] mt-2 leading-relaxed">
                Une architecture d'évaluation scientifique en trois phases éliminant toute discrimination sociale, géographique ou académique.
              </p>
            </div>

            <Timeline
              items={[
                {
                  id: 'det-1',
                  order: '01',
                  title: 'Épreuves Psychométriques & Raisonnement Cognitif',
                  tagline: 'Phase 1 · Anonymisée',
                  dateOrDuration: 'Test en ligne ou en hub (4h)',
                  description: 'Batterie d’épreuves mesurant la capacité d’abstraction, la vitesse de traitement de données complexes, la pensée latérale et la résolution de problèmes non structurés.',
                  status: 'completed',
                  meta: ['Test psychométrique standardisé', 'Scoring sur 100 points', 'Audit algorithmique anti-biais']
                },
                {
                  id: 'det-2',
                  order: '02',
                  title: 'Challenge Technique & Cas Concret d’Impact',
                  tagline: 'Phase 2 · Immersion Réelle',
                  dateOrDuration: 'Épreuve chronométrée de 48h',
                  description: 'Confrontation à des cas concrets de souveraineté économique, d’architecture logicielle critique ou de crise institutionnelle sous contrainte temporelle.',
                  status: 'current',
                  meta: ['Cas d’entreprises réelles', 'Travail individuel et sous pression', 'Évaluation par pairs aveugles']
                },
                {
                  id: 'det-3',
                  order: '03',
                  title: 'Grand Oral devant le Jury Paritaire International',
                  tagline: 'Phase 3 · Soutenance Finale',
                  dateOrDuration: 'Entretien collégial (60 min)',
                  description: 'Soutenance collégiale évaluant la solidité morale, la clarté d’expression, le sens civique et l’engagement d’impact pour l’Afrique.',
                  status: 'upcoming',
                  meta: ['Jury de 5 experts internationaux', 'Délibération à huis clos', 'Homologation par le COS']
                }
              ]}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. OPPORTUNITÉS DÉDIÉES                                                   */}
        {/* ========================================================================= */}
        {isOpportunites && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#FF6600] font-bold block">
                  GUICHETS DE PROPULSION
                </span>
                <h2 className="text-2xl font-bold text-[#262626] font-sans">
                  Opportunités Réservées aux Talents & Candidats
                </h2>
                <p className="text-sm text-[#595959] mt-1 font-sans">
                  Consultez les guichets de bourses, fellowships et recrutements prioritaires actuellement ouverts.
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsCreateModalOpen(true)}
              >
                Créer un profil pour postuler
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OPPORTUNITIES_LIST.map((opp) => (
                <OpportunityCard key={opp.id} item={opp} />
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 7. PASSEPORT & TSF-ID                                                     */}
        {/* ========================================================================= */}
        {isCertification && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF6600] font-bold">
                Le Label d'Élite Cryptographique
              </span>
              <h2 className="text-3xl font-bold text-[#262626] font-sans mt-1">
                La Certification Institutionnelle & Le Composant TSF-ID
              </h2>
              <p className="text-sm sm:text-base text-[#595959] mt-2 leading-relaxed font-sans">
                Le Passeport de Compétences TSF constitue l'étalon-or d'accréditation du capital humain africain, délivré exclusivement après soutenance devant le jury international.
              </p>
            </div>

            <TsfTalentIdCard 
              card={currentTalent.tsfId}
              talentName={`${currentTalent.prenom} ${currentTalent.nom}`}
              photoUrl={currentTalent.photoUrl}
              country={currentTalent.localisation.pays}
              domain={currentTalent.domaine}
            />

            <div className="p-6 bg-[#121212] text-white rounded-2xl space-y-4 border border-[#2B2B2B]">
              <h3 className="text-lg font-bold text-[#FF6600]">
                Spécifications Techniques du Standard TSF-ID
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Identifiant unique généré par hachage SHA-256 résistant aux collisions.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Niveaux standardisés : I (Espoir), II (Praticien), III (Leader), IV (Fellow Bâtisseur).</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Accréditation directe auprès de 120+ multinationales et institutions multilatérales.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </Container>

      {/* MODALS */}
      <CreateProfileModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onProfileCreated={handleProfileCreated}
      />

      <SignalTalentModal 
        isOpen={isSignalModalOpen}
        onClose={() => setIsSignalModalOpen(false)}
      />
    </div>
  );
};
