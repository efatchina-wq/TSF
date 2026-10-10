import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { PRIMARY_NAVIGATION } from '../../data/navigation';
import { NavItem, RoutePath } from '../../types';
import {
  ChevronDown,
  Menu,
  ArrowUpRight,
  ShieldCheck,
  Search,
  Sparkles,
  BookOpen,
  Briefcase,
  Users,
  Compass,
  Award
} from 'lucide-react';
import { MobileNav } from './MobileNav';
import { TSFLogo } from '../ui/TSFLogo';

export const Header: React.FC = () => {
  const { currentPath, navigate, isActive } = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (itemId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleNavClick = (item: NavItem) => {
    if (item.subItems && item.subItems.length > 0) {
      if (activeDropdown === item.id) {
        navigate(item.path);
        setActiveDropdown(null);
      } else {
        setActiveDropdown(item.id);
      }
    } else {
      navigate(item.path);
      setActiveDropdown(null);
    }
  };

  const handleSubItemClick = (path: RoutePath) => {
    navigate(path);
    setActiveDropdown(null);
  };

  const getItemIcon = (id: string) => {
    switch (id) {
      case 'organisation':
        return <Compass className="w-4 h-4 text-[#0070C0]" />;
      case 'programmes':
        return <Sparkles className="w-4 h-4 text-[#0070C0]" />;
      case 'talents':
        return <Users className="w-4 h-4 text-[#0070C0]" />;
      case 'partenaires':
        return <Briefcase className="w-4 h-4 text-[#0070C0]" />;
      case 'wikijob':
        return <BookOpen className="w-4 h-4 text-[#0070C0]" />;
      case 'certification':
        return <Award className="w-4 h-4 text-[#0070C0]" />;
      default:
        return null;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-[#E8E8E8] shadow-xs">
      {/* ------------------------------------------------------------- */}
      {/* ZONE 0: Institutional Sovereign Utility Bar (Desktop) */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden lg:block bg-[#F5F5F7] border-b border-[#E8E8E8] text-[11px] font-mono text-[#7D7D7D] py-1.5 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-semibold text-[#404040]">
              <span className="w-2 h-2 rounded-full bg-[#0E8A5E] animate-pulse" />
              <span>ORGANISATION PANAFRICAINE D’INTÉRÊT GÉNÉRAL</span>
            </span>
            <span className="text-[#D1D1D1]">|</span>
            <span>18 PAYS COUVERTS</span>
            <span className="text-[#D1D1D1]">|</span>
            <span className="text-[#0070C0] font-medium">HUBS : COTONOU · KIGALI · DAKAR</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/certification/verify')}
              className="hover:text-[#0070C0] transition-colors cursor-pointer flex items-center gap-1 font-medium text-[#404040]"
            >
              <ShieldCheck className="w-3 h-3 text-[#0070C0]" />
              <span>Vérifier un Titre (/verify)</span>
            </button>
            <span className="text-[#D1D1D1]">·</span>
            <button
              type="button"
              onClick={() => navigate('/wikijob/sources')}
              className="hover:text-[#0070C0] transition-colors cursor-pointer"
            >
              WikiJob Bénin
            </button>
            <span className="text-[#D1D1D1]">·</span>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="hover:text-[#0070C0] transition-colors cursor-pointer"
            >
              Espace Admin
            </button>
            <span className="text-[#D1D1D1]">·</span>
            <button
              type="button"
              onClick={() => navigate('/design-system')}
              className="text-[#FF6600] font-bold hover:text-[#E65500] transition-colors cursor-pointer"
            >
              Design System
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN NAVIGATION BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Zone 1: Official TSF Brand Logo */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => {
              navigate('/');
              setActiveDropdown(null);
            }}
            className="flex items-center gap-3 text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0070C0] rounded"
            aria-label="Talents Sans Frontières - Accueil"
          >
            <TSFLogo variant="horizontal" size="md" />
          </button>
        </div>

        {/* Zone 2: Navigation Links & Mega Dropdowns */}
        <nav
          ref={dropdownRef}
          aria-label="Navigation principale"
          className="hidden xl:flex items-center gap-0.5 2xl:gap-1 h-full"
        >
          {PRIMARY_NAVIGATION.map((item) => {
            const hasSub = item.subItems && item.subItems.length > 0;
            const isItemActive = isActive(item.path, false);
            const isOpen = activeDropdown === item.id;

            return (
              <div
                key={item.id}
                className="relative h-full flex items-center"
                onMouseEnter={() => hasSub && handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick(item)}
                  aria-expanded={isOpen}
                  className={`flex items-center gap-1 px-2.5 py-1.5 2xl:px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-150 cursor-pointer select-none whitespace-nowrap ${
                    isItemActive
                      ? 'text-[#0070C0] bg-[#EBF5FC] font-extrabold shadow-2xs'
                      : 'text-[#404040] hover:text-[#0070C0] hover:bg-[#F5F5F7]'
                  }`}
                >
                  <span>{item.label}</span>
                  {hasSub && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0070C0]' : 'text-[#7D7D7D]'
                      }`}
                    />
                  )}
                </button>

                {/* ========================================================= */}
                {/* Structured Mega-Dropdown Panel */}
                {/* ========================================================= */}
                {hasSub && isOpen && (
                  <div
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                    className={`absolute top-full -mt-1 bg-white border border-[#E8E8E8] border-t-2 border-t-[#0070C0] rounded-xl shadow-xl z-30 p-4 sm:p-5 animate-in fade-in slide-in-from-top-1 duration-150 ${
                      item.id === 'programmes' || item.id === 'talents' || item.id === 'partenaires'
                        ? 'w-[560px] 2xl:w-[620px] left-1/2 -translate-x-1/2'
                        : 'w-[360px] left-0'
                    }`}
                  >
                    {/* Header of dropdown */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E8E8]">
                      <div className="flex items-center gap-2">
                        {getItemIcon(item.id)}
                        <span className="text-xs font-mono font-bold uppercase text-[#0070C0] tracking-wider">
                          {item.label}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigate(item.path);
                          setActiveDropdown(null);
                        }}
                        className="text-[11px] font-mono font-semibold text-[#7D7D7D] hover:text-[#0070C0] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Vue d’ensemble</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Subitems Grid */}
                    <div
                      className={`grid gap-2 ${
                        item.subItems && item.subItems.length > 4
                          ? 'grid-cols-2'
                          : 'grid-cols-1'
                      }`}
                    >
                      {item.subItems?.map((sub) => {
                        const isSubActive = currentPath === sub.path;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleSubItemClick(sub.path)}
                            className={`w-full text-left p-2.5 rounded-lg transition-all duration-150 group/sub cursor-pointer border ${
                              isSubActive
                                ? 'bg-[#EBF5FC] border-[#A3D1F1] text-[#0070C0]'
                                : 'border-transparent hover:border-[#E8E8E8] hover:bg-[#F5F5F7] text-[#404040]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-bold font-sans transition-colors ${
                                  isSubActive
                                    ? 'text-[#0070C0]'
                                    : 'text-[#262626] group-hover/sub:text-[#0070C0]'
                                }`}
                              >
                                {sub.label}
                              </span>
                              <ArrowUpRight
                                className={`w-3 h-3 text-[#0070C0] transition-opacity ${
                                  isSubActive ? 'opacity-100' : 'opacity-0 group-hover/sub:opacity-100'
                                }`}
                              />
                            </div>
                            {sub.description && (
                              <p className="text-[11px] text-[#7D7D7D] line-clamp-1 mt-1 font-sans leading-relaxed">
                                {sub.description}
                              </p>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Bottom strip in mega dropdown */}
                    <div className="mt-3 pt-3 border-t border-[#E8E8E8] flex items-center justify-between text-[11px] text-[#7D7D7D] font-mono">
                      <span className="truncate max-w-[280px]">
                        {item.description || 'Portail officiel TSF'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigate(item.path);
                          setActiveDropdown(null);
                        }}
                        className="text-[#FF6600] font-bold hover:underline shrink-0 cursor-pointer"
                      >
                        Consulter la page →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search trigger */}
          <button
            type="button"
            onClick={() => navigate('/wikijob')}
            aria-label="Rechercher des opportunités et guides"
            className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-[#404040] hover:text-[#0070C0] hover:bg-[#F5F5F7] rounded-lg transition-colors cursor-pointer hidden md:flex items-center gap-1.5 border border-[#E8E8E8]"
          >
            <Search className="w-3.5 h-3.5 text-[#7D7D7D]" />
            <span className="hidden lg:inline">Recherche</span>
          </button>

          {/* Primary Action "ESPACE TSF" */}
          <button
            type="button"
            onClick={() => navigate('/espace-tsf')}
            className={`px-2.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer shadow-xs whitespace-nowrap flex items-center gap-1.5 sm:gap-2 active:scale-[0.99] ${
              currentPath === '/espace-tsf'
                ? 'bg-[#E65500] text-white ring-2 ring-[#FF6600]/40 shadow-sm'
                : 'bg-[#FF6600] text-white hover:bg-[#E65500] border border-[#FF6600]'
            }`}
          >
            <span>ESPACE TSF</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Ouvrir le menu de navigation"
            className="xl:hidden p-2 rounded-lg text-[#404040] hover:text-[#262626] hover:bg-[#F5F5F7] transition-colors cursor-pointer border border-[#E8E8E8]"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#0070C0]" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};
