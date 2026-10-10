import React from 'react';
import { useRouter } from '../../hooks/useRouter';
import { FOOTER_SECTIONS } from '../../data/navigation';
import { INSTITUTION_INFO } from '../../data/institutionData';
import { Container } from '../ui/Container';
import { RoutePath } from '../../types';
import {
  ArrowUpRight,
  ShieldCheck,
  Mail,
  MapPin,
  Phone,
  Globe,
  Award,
  ExternalLink,
  Linkedin,
  Twitter,
  Youtube,
  MessageSquare
} from 'lucide-react';
import { TSFLogo } from '../ui/TSFLogo';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer className="border-t border-[#262626] bg-[#121212] text-slate-300 pt-16 sm:pt-20 pb-12 mt-auto">
      <Container size="wide">
        {/* ========================================================= */}
        {/* 1. TOP INSTITUTIONAL RIBBON */}
        {/* ========================================================= */}
        <div className="pb-12 sm:pb-16 border-b border-[#262626] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Identity & Mission */}
          <div className="lg:col-span-6 space-y-5">
            <TSFLogo variant="monochrome-white" size="lg" />

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-sans">
              {INSTITUTION_INFO.headline}
            </p>

            {/* Sovereign 4-Pillar Value Chain (Zero-Pill Architecture) */}
            <div className="pt-2">
              <div className="text-[11px] font-mono text-[#FF6600] uppercase font-bold tracking-widest mb-2">
                CHAÎNE DE VALEUR OPÉRATIONNELLE :
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-300 font-mono">
                <span className="font-bold text-white hover:text-[#0070C0] transition-colors">
                  01. DÉTECTER
                </span>
                <span className="text-slate-600">→</span>
                <span className="font-bold text-white hover:text-[#0070C0] transition-colors">
                  02. INCUBER
                </span>
                <span className="text-slate-600">→</span>
                <span className="font-bold text-white hover:text-[#0070C0] transition-colors">
                  03. CERTIFIER
                </span>
                <span className="text-slate-600">→</span>
                <span className="font-bold text-[#FF6600] hover:text-[#FFA066] transition-colors">
                  04. PROPULSER
                </span>
              </div>
            </div>
          </div>

          {/* Guarantee & Territorial Presence */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Box 1: Sovereign Guarantee */}
            <div className="bg-[#1A1A1A] border border-[#2B2B2B] p-5 sm:p-6 rounded-xl space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
                <ShieldCheck className="w-4 h-4 text-[#0070C0]" />
                <span>Garantie Institutionnelle</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Processus d’évaluation indépendant, labellisation infalsifiable et conformité aux standards internationaux d’intégrité académique et professionnelle.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/certification/verify')}
                  className="text-xs text-[#0070C0] hover:text-[#60A5FA] font-mono font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Vérifier une certification en ligne (/verify)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Box 2: Continental Hubs */}
            <div className="bg-[#1A1A1A] border border-[#2B2B2B] p-5 sm:p-6 rounded-xl space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
                <MapPin className="w-4 h-4 text-[#FF6600]" />
                <span>Présence Continentale</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Siège opérationnel à Cotonou et Hub Afrique de l’Est à Kigali. Antennes de liaison à Dakar, Abidjan, Nairobi et représentations dans 18 pays.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="text-xs text-[#FF6600] hover:text-[#FFA066] font-mono font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Consulter le réseau des hubs →</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. FOUR-COLUMN INSTITUTIONAL DIRECTORY */}
        {/* ========================================================= */}
        <div className="py-12 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10 border-b border-[#262626]">
          {FOOTER_SECTIONS.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono border-l-2 border-[#0070C0] pl-2.5">
                {section.title}
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button
                      type="button"
                      onClick={() => navigate(link.path as RoutePath)}
                      className="hover:text-white hover:translate-x-0.5 transition-all flex items-center gap-1.5 group text-left cursor-pointer"
                    >
                      <span className="leading-snug">{link.label}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 text-[#0070C0] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* 3. CONTACT, NETWORKS & SUITE DETAILS */}
        {/* ========================================================= */}
        <div className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-[#262626]">
          <div className="md:col-span-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#0070C0]" />
              <a
                href="mailto:contact@talents-sans-frontieres.org"
                className="hover:text-white transition-colors"
              >
                contact@talents-sans-frontieres.org
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#FF6600]" />
              <span className="hover:text-white transition-colors">
                +229 01 97 00 00 00 / Hub Afrique
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Boulevard de la Marina, Cotonou, Bénin</span>
            </div>
          </div>

          <div className="md:col-span-5 flex items-center md:justify-end gap-3">
            <span className="text-xs text-slate-400 font-mono mr-2 hidden sm:inline">
              Réseaux Officiels :
            </span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Talents Sans Frontières"
              className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#2B2B2B] text-slate-400 hover:text-white hover:bg-[#0070C0] hover:border-[#0070C0] transition-colors flex items-center justify-center cursor-pointer"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) Talents Sans Frontières"
              className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#2B2B2B] text-slate-400 hover:text-white hover:bg-[#0070C0] hover:border-[#0070C0] transition-colors flex items-center justify-center cursor-pointer"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Talents Sans Frontières"
              className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#2B2B2B] text-slate-400 hover:text-white hover:bg-[#FF6600] hover:border-[#FF6600] transition-colors flex items-center justify-center cursor-pointer"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              aria-label="Messagerie & Hubs TSF"
              className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#2B2B2B] text-slate-400 hover:text-white hover:bg-[#0070C0] hover:border-[#0070C0] transition-colors flex items-center justify-center cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. BOTTOM LEGAL & ACCREDITATION NOTICE */}
        {/* ========================================================= */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-center md:text-left">
            <span>© {new Date().getFullYear()} Talents Sans Frontières (TSF).</span>
            <span>·</span>
            <span>Organisation Panafricaine d’Intérêt Général</span>
            <span>·</span>
            <span>Accord de Siège & Statut d’Observateur</span>
            <span>·</span>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Mentions Légales & Données (APDP / RGPD)
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="text-slate-400 hover:text-white transition-colors font-mono cursor-pointer"
            >
              Portail d’Administration
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => navigate('/design-system')}
              className="text-[#FF6600] hover:text-[#FFA066] transition-colors font-mono font-bold cursor-pointer"
            >
              Design System TSF
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 shrink-0">
            <Award className="w-3.5 h-3.5 text-[#0070C0]" />
            <span>Standard d’Excellence TSF-ISO/QIS</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
