import React from 'react';
import { SourceAcquisitionType } from '../../types/wikijob';
import { 
  Rss, 
  Cpu, 
  Globe, 
  FileText, 
  FolderDown, 
  Layers, 
  Waypoints,
  Network
} from 'lucide-react';

interface SourceTypeBadgeProps {
  type: SourceAcquisitionType;
  showIcon?: boolean;
  size?: 'sm' | 'md';
}

export const ACQUISITION_LABELS: Record<SourceAcquisitionType, { label: string; short: string; color: string; desc: string }> = {
  RSS_ATOM: {
    label: 'Flux RSS / Atom',
    short: 'RSS/Atom',
    color: 'bg-orange-50 text-orange-800 border-orange-200',
    desc: 'Syndication native de contenus via flux XML officiel.'
  },
  OFFICIAL_API: {
    label: 'API Officielle',
    short: 'API Directe',
    color: 'bg-blue-50 text-blue-800 border-blue-200',
    desc: 'Point d’accès API REST / JSON authentifié et homologué.'
  },
  SITEMAP: {
    label: 'Sitemap XML',
    short: 'Sitemap',
    color: 'bg-purple-50 text-purple-800 border-purple-200',
    desc: 'Indexation continue via le plan de site XML officiel.'
  },
  WEB_PUBLIC: {
    label: 'Page Web Publique',
    short: 'Web Public',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    desc: 'Collecte et parsing éthique de la page d’offres publique.'
  },
  STRUCTURED_SOURCE: {
    label: 'Source Structurée',
    short: 'Structuré',
    color: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    desc: 'Extraction de jeux de données tabulaires ou open data.'
  },
  MANUAL_IMPORT: {
    label: 'Import Manuel',
    short: 'Manuel',
    color: 'bg-amber-50 text-amber-800 border-amber-200',
    desc: 'Collecte et contrôle humain périodique par nos veilleurs.'
  },
  FUTURE_CONNECTOR: {
    label: 'Connecteur Futur',
    short: 'Connecteur en cours',
    color: 'bg-slate-100 text-slate-700 border-slate-300',
    desc: 'En attente d’homologation de l’adaptateur institutionnel.'
  }
};

export const SourceTypeBadge: React.FC<SourceTypeBadgeProps> = ({ 
  type, 
  showIcon = true,
  size = 'md' 
}) => {
  const config = ACQUISITION_LABELS[type] || {
    label: type,
    short: type,
    color: 'bg-slate-100 text-slate-700 border-slate-200',
    desc: ''
  };

  const getIcon = () => {
    switch (type) {
      case 'RSS_ATOM':
        return <Rss className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
      case 'OFFICIAL_API':
        return <Cpu className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
      case 'SITEMAP':
        return <Waypoints className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
      case 'WEB_PUBLIC':
        return <Globe className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
      case 'STRUCTURED_SOURCE':
        return <Layers className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
      case 'MANUAL_IMPORT':
        return <FolderDown className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
      case 'FUTURE_CONNECTOR':
        return <Network className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
      default:
        return <FileText className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
    }
  };

  const pad = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span 
      className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full border ${config.color} ${pad}`}
      title={config.desc}
    >
      {showIcon && getIcon()}
      <span>{size === 'sm' ? config.short : config.label}</span>
    </span>
  );
};
