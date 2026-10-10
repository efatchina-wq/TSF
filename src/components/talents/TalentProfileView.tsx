import React, { useState } from 'react';
import { TalentProfile } from '../../types/talent';
import { TsfTalentIdCard } from './TsfTalentIdCard';
import { TalentJourneyTimeline } from './TalentJourneyTimeline';
import { 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  Clock, 
  Send, 
  FileText, 
  FolderGit2, 
  ChevronRight, 
  Share2, 
  Download, 
  Tag,
  Check,
  Lock,
  Layers,
  TrendingUp,
  UserCheck,
  Building2
} from 'lucide-react';
import { ApplyButton } from '../opportunities/ApplyButton';

interface TalentProfileViewProps {
  talent: TalentProfile;
  onApplyOpportunity?: (opportunityId: string) => void;
  onContactTalent?: (talentId: string) => void;
}

export const TalentProfileView: React.FC<TalentProfileViewProps> = ({
  talent,
  onApplyOpportunity,
  onContactTalent
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleContactClick = () => {
    if (onContactTalent) {
      onContactTalent(talent.id);
    }
    setContactSent(true);
    setTimeout(() => setContactSent(false), 3000);
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* ========================================================================= */}
      {/* 1. IDENTITÉ                                                               */}
      {/* ========================================================================= */}
      <section id="identite" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
            {/* Executive Portrait */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-slate-100 ring-2 ring-[#0070C0]/20">
                <img 
                  src={talent.photoUrl} 
                  alt={`${talent.prenom} ${talent.nom}`} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div 
                className="absolute -bottom-2 -right-2 bg-[#0E8A5E] text-white p-1.5 rounded-full border-2 border-white shadow-sm" 
                title="Accréditation TSF Vérifiée"
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Identity Details */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-blue-50 text-[#0070C0] border border-blue-200">
                  {talent.tsfId.uniqueId}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  {talent.tsfId.statusLabel}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-amber-50 text-amber-800 border border-amber-200">
                  {talent.tsfId.level}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#262626] tracking-tight font-sans">
                {talent.prenom} {talent.nom}
              </h1>

              <p className="text-sm sm:text-base font-semibold text-slate-700 max-w-xl font-sans">
                {talent.titreProfessionnel}
              </p>

              {/* Geographic and domain indicators */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 font-mono pt-1">
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#0070C0]" />
                  <span>{talent.localisation.ville}, {talent.localisation.pays} ({talent.localisation.region})</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Tag className="w-3.5 h-3.5 text-[#FF6600]" />
                  <span>{talent.domaine}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{talent.disponibilite.statut}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center sm:justify-start shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-mono text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{copiedLink ? 'Lien copié !' : 'Partager profil'}</span>
            </button>
            <button
              type="button"
              onClick={handleContactClick}
              className="px-5 py-2.5 rounded-xl bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              {contactSent ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Demande transmise !</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-white" />
                  <span>Entrer en contact</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Narrative Bio & Strategic Manifesto */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
              DÉMARCHE & POSITIONNEMENT STRATÉGIQUE
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {talent.bio}
            </p>
          </div>

          {talent.manifestePersonnel && (
            <div className="p-5 bg-slate-50 border-l-4 border-[#FF6600] rounded-r-2xl italic text-xs sm:text-sm text-slate-800 leading-relaxed font-serif">
              « {talent.manifestePersonnel} »
            </div>
          )}
        </div>

        {/* Digital Passport Card (Collapsible Preview) */}
        <div className="pt-2">
          <TsfTalentIdCard 
            card={talent.tsfId}
            talentName={`${talent.prenom} ${talent.nom}`}
            photoUrl={talent.photoUrl}
            country={talent.localisation.pays}
            domain={talent.domaine}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. COMPÉTENCES                                                            */}
      {/* ========================================================================= */}
      <section id="competences" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
              02. RÉFÉRENTIEL DE MAÎTRISE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] font-sans">
              Compétences & Homologations Vérifiées
            </h2>
          </div>
          <span className="text-xs font-mono text-[#0E8A5E] bg-[#ECFDF5] px-3 py-1 rounded-md border border-[#A7F3D0] font-bold inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Homologué TSF</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {talent.competences.map((skill) => (
            <div key={skill.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#262626] font-sans text-sm">{skill.name}</span>
                <span className="font-mono text-xs font-bold text-[#0070C0] tabular-nums">{skill.level}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#0070C0] h-full rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-0.5">
                <span className="capitalize">{skill.category}</span>
                {skill.auditedDate && <span>Audité : {skill.auditedDate}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. EXPÉRIENCES                                                            */}
      {/* ========================================================================= */}
      <section id="experiences" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4 space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
            03. PARCOURS OPÉRATIONNEL
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#262626] font-sans">
            Expériences & Responsabilités Exécutives
          </h2>
        </div>

        <div className="space-y-8 divide-y divide-slate-100">
          {talent.experiences.map((exp) => (
            <div key={exp.id} className="pt-6 first:pt-0 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-base sm:text-lg font-bold text-[#262626] font-sans">
                  {exp.role}
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  {exp.startDate} — {exp.isCurrent ? 'Présent' : exp.endDate}
                </span>
              </div>

              <div className="text-xs font-mono text-[#0070C0] font-semibold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>{exp.organization}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">{exp.location}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {exp.description}
              </p>

              {exp.achievements && exp.achievements.length > 0 && (
                <div className="pt-1">
                  <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block mb-1.5">
                    RÉALISATIONS MAJEURES & RÉSULTATS :
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1.5 font-sans">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#0E8A5E] font-mono font-bold">✓</span>
                        <span className="leading-snug">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PROJETS                                                                */}
      {/* ========================================================================= */}
      <section id="projets" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4 space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
            04. PROJETS & INITIATIVES
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#262626] font-sans">
            Portefeuille de Réalisations Concrètes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {talent.portfolio.map((proj) => (
            <div key={proj.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>{proj.clientOrContext}</span>
                  <span className="font-bold text-[#0070C0]">{proj.year}</span>
                </div>

                <h3 className="text-base font-bold text-[#262626] font-sans leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {proj.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200/80">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                    IMPACT MESURABLE
                  </span>
                  <strong className="text-[#0E8A5E] font-mono font-bold block mt-0.5">
                    {proj.impactMetrics}
                  </strong>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1 text-[11px] font-mono text-slate-500">
                    {proj.techStackOrDomain.map((t, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>

                  {proj.externalUrl && (
                    <a
                      href={proj.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#0070C0] hover:text-[#005FA3] font-bold"
                    >
                      <span>Lien</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CERTIFICATIONS                                                         */}
      {/* ========================================================================= */}
      <section id="certifications" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4 space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
            05. ACCRÉDITATIONS ACADÉMIQUES & TITRES
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#262626] font-sans">
            Certifications & Conformité Déontologique
          </h2>
        </div>

        {/* TSF Main Certificate Box */}
        <div className="bg-gradient-to-br from-[#262626] to-[#1E293B] text-white rounded-2xl p-6 sm:p-8 space-y-6 border border-[#0070C0]/30 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0070C0]/20 border border-[#0070C0]/40 flex items-center justify-center text-[#38BDF8]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#FF6600] uppercase tracking-widest font-bold block">
                  ATTESTATION INSTITUTIONNELLE HOMOLOGUÉE
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-sans">
                  {talent.certification.programName}
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">N° D'ENREGISTREMENT</span>
              <strong className="text-sm font-mono text-[#38BDF8]">{talent.certification.tsfCertificateNumber}</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Cohorte</span>
              <strong className="text-white">{talent.certification.cohort}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Palier & Mention</span>
              <strong className="text-[#FF6600]">{talent.certification.grade}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Délivrance</span>
              <strong className="text-white">{talent.certification.issuingDate}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Présidence du Jury</span>
              <strong className="text-white">{talent.certification.juryPresident}</strong>
            </div>
          </div>

          <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-2 text-xs font-mono">
            <span className="text-[10px] uppercase text-slate-400 block font-bold">
              PILIERS CERTIFIÉS PAR LE JURY COLLÉGIAL :
            </span>
            <div className="flex flex-wrap gap-2">
              {talent.certification.officialPillarsAudited.map((p, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-white/10 text-slate-200 text-[11px]">
                  ✓ {p}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-slate-400 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1.5 truncate max-w-md">
              <Lock className="w-3.5 h-3.5 text-[#0E8A5E]" />
              <span className="truncate">Empreinte SHA-256 : {talent.certification.cryptographicHash}</span>
            </div>
            <a
              href={`/certification/verify?code=${talent.certification.tsfCertificateNumber}`}
              className="text-[#38BDF8] hover:underline font-bold flex items-center gap-1 shrink-0"
            >
              <span>Vérifier au greffe central</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Academic Formations */}
        {talent.formations && talent.formations.length > 0 && (
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider block">
              DIPLÔMES UNIVERSITAIRES & ACADÉMIQUES :
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {talent.formations.map((f) => (
                <div key={f.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 font-bold font-sans text-sm">{f.degree}</strong>
                    <span className="font-mono text-slate-500">{f.graduationYear}</span>
                  </div>
                  <div className="text-slate-700 font-medium font-sans">{f.fieldOfStudy}</div>
                  <div className="text-slate-500 font-mono text-[11px]">{f.institution} — {f.location}</div>
                  {f.honors && (
                    <div className="text-[#FF6600] font-mono text-[11px] font-bold pt-0.5">
                      Distinction : {f.honors}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 6. RÉALISATIONS & DISTINCTIONS                                            */}
      {/* ========================================================================= */}
      <section id="realisations" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4 space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
            06. CONTRIBUTIONS NOTABLES
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#262626] font-sans">
            Réalisations, Prix & Distinctions
          </h2>
        </div>

        <div className="space-y-4">
          {talent.realisations.map((ach) => (
            <div key={ach.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-base font-bold text-[#262626] font-sans">
                  {ach.title}
                </h3>
                <span className="text-xs font-mono font-bold text-[#FF6600]">
                  {ach.year}
                </span>
              </div>

              <div className="text-xs font-mono text-slate-500">
                Organisme : <strong className="text-slate-800">{ach.organization}</strong>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {ach.description}
              </p>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-sans text-slate-700">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  PORTÉE & SIGNIFICATION CONTINENTALE
                </span>
                {ach.significance}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. OPPORTUNITÉS CIBLÉES                                                    */}
      {/* ========================================================================= */}
      <section id="opportunites" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
              07. MATCHING STRATÉGIQUE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] font-sans">
              Opportunités en Adéquation avec ce Profil
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {talent.opportunites.length} appel{talent.opportunites.length > 1 ? 's' : ''} concordant{talent.opportunites.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="space-y-4">
          {talent.opportunites.map((opp) => (
            <div key={opp.id} className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-[#0070C0]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#EBF5FC] text-[#0070C0] border border-[#A3D1F1]">
                    {opp.type}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#0E8A5E] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                    Match {opp.matchScore}%
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#262626] font-sans">
                  {opp.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-1 text-slate-700">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{opp.organization}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{opp.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#FF6600] font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Clôture : {opp.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 pt-2 md:pt-0">
                <ApplyButton
                  opportunityId={opp.id}
                  opportunityTitle={opp.title}
                  onApply={onApplyOpportunity}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. PROGRESSION & TRAJECTOIRE (TALENT JOURNEY)                             */}
      {/* ========================================================================= */}
      <section id="progression" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4 space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#0070C0] font-bold block">
            08. JALONS & PROPULSION
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#262626] font-sans">
            Progression : Du Sourcing à la Propulsion Panafricaine
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
          Chaque talent homologué TSF suit un parcours rigoureux scandé par 4 paliers cardinaux. Cette traçabilité garantit aux recruteurs, bailleurs et gouvernements une totale intégrité sur l'historique d'évaluation.
        </p>

        <div className="pt-2">
          <TalentJourneyTimeline milestones={talent.journey} />
        </div>
      </section>
    </div>
  );
};
