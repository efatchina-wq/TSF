import React, { useState, useEffect } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { PRIMARY_NAVIGATION } from '../../data/navigation';
import { RoutePath } from '../../types';
import {
  X,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Search,
  BookOpen,
  Sparkles,
  Award,
  Layers,
  ExternalLink
} from 'lucide-react';
import { TSFLogo } from '../ui/TSFLogo';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { currentPath, navigate } = useRouter();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleNavigate = (path: RoutePath) => {
    navigate(path);
    onClose();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/wikijob');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] xl:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#121212]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200 border-l border-[#E8E8E8]">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E8E8] bg-white">
          <button
            type="button"
            onClick={() => handleNavigate('/')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <TSFLogo variant="horizontal" size="sm" />
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le menu"
            className="p-2 rounded-lg text-[#7D7D7D] hover:text-[#262626] hover:bg-[#F5F5F7] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search in Mobile Nav */}
        <div className="p-4 border-b border-[#E8E8E8] bg-[#F5F5F7]">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-[#7D7D7D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              placeholder="Rechercher opportunité, guide..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-xs text-[#262626] placeholder-[#7D7D7D] pl-9 pr-3 py-2.5 rounded-lg border border-[#E8E8E8] focus:border-[#0070C0] outline-none"
            />
          </form>
        </div>

        {/* Primary CTA: ESPACE TSF */}
        <div className="p-4 border-b border-[#E8E8E8]">
          <button
            type="button"
            onClick={() => handleNavigate('/espace-tsf')}
            className="w-full py-3 px-4 bg-[#FF6600] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-[#E65500] transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <span>ACCÉDER À L’ESPACE TSF</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 divide-y divide-[#E8E8E8]">
          {PRIMARY_NAVIGATION.map((item) => {
            const hasSub = item.subItems && item.subItems.length > 0;
            const isExpanded = !!expandedSections[item.id];
            const isCurrent = currentPath === item.path;

            return (
              <div key={item.id} className="py-2.5">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (hasSub) {
                        toggleSection(item.id);
                      } else {
                        handleNavigate(item.path);
                      }
                    }}
                    className={`flex-1 text-left py-1 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      isCurrent
                        ? 'text-[#0070C0]'
                        : 'text-[#404040] hover:text-[#0070C0]'
                    }`}
                  >
                    {item.label}
                  </button>

                  {hasSub ? (
                    <button
                      type="button"
                      onClick={() => toggleSection(item.id)}
                      className="p-1.5 text-[#7D7D7D] hover:text-[#0070C0] cursor-pointer rounded"
                      aria-label={`Développer ${item.label}`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#0070C0]' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleNavigate(item.path)}
                      className="p-1 text-[#7D7D7D] hover:text-[#0070C0]"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Subitems in mobile drawer */}
                {hasSub && isExpanded && (
                  <div className="mt-2 ml-2 pl-3 border-l-2 border-[#A3D1F1] space-y-1 animate-in fade-in duration-150">
                    {/* Parent page link */}
                    <button
                      type="button"
                      onClick={() => handleNavigate(item.path)}
                      className="w-full text-left py-1.5 text-[11px] font-mono font-bold text-[#0070C0] hover:underline flex items-center justify-between"
                    >
                      <span>Tous les {item.label.toLowerCase()} →</span>
                    </button>

                    {item.subItems?.map((sub) => {
                      const isSubActive = currentPath === sub.path;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => handleNavigate(sub.path)}
                          className={`w-full text-left py-2 px-2.5 rounded-md text-xs font-medium transition-colors cursor-pointer block ${
                            isSubActive
                              ? 'bg-[#EBF5FC] text-[#0070C0] font-bold'
                              : 'text-[#595959] hover:text-[#262626] hover:bg-[#F5F5F7]'
                          }`}
                        >
                          <div className="font-semibold">{sub.label}</div>
                          {sub.description && (
                            <p className="text-[10px] text-[#7D7D7D] truncate mt-0.5">
                              {sub.description}
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Drawer Footer Utilities */}
        <div className="p-4 border-t border-[#E8E8E8] bg-[#F5F5F7] space-y-2">
          <button
            type="button"
            onClick={() => handleNavigate('/certification/verify')}
            className="w-full py-2 px-3 text-xs font-semibold text-[#0070C0] bg-white border border-[#A3D1F1] rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs hover:bg-[#EBF5FC]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#0070C0]" />
            <span>Vérifier un Titre (/verify)</span>
          </button>

          <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-[#7D7D7D]">
            <button
              type="button"
              onClick={() => handleNavigate('/admin')}
              className="hover:text-[#0070C0] cursor-pointer"
            >
              Portail Admin
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleNavigate('/design-system')}
              className="text-[#FF6600] font-bold hover:underline cursor-pointer"
            >
              Design System
            </button>
            <span>·</span>
            <span>18 Pays TSF</span>
          </div>
        </div>
      </div>
    </div>
  );
};
