import React from 'react';
import { SourceSyncStatus } from '../../types/wikijob';
import { CheckCircle2, AlertTriangle, Clock, RefreshCw, Radio } from 'lucide-react';

interface SourceStatusBadgeProps {
  status: SourceSyncStatus;
  active: boolean;
  size?: 'sm' | 'md';
}

export const SourceStatusBadge: React.FC<SourceStatusBadgeProps> = ({ 
  status, 
  active,
  size = 'md' 
}) => {
  if (!active) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-100 text-slate-500 border border-slate-200">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        <span>Désactivé</span>
      </span>
    );
  }

  const pad = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs';

  switch (status) {
    case 'SUCCESS':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 ${pad}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Opérationnel</span>
        </span>
      );
    case 'SYNCING':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200 ${pad}`}>
          <RefreshCw className="w-3 h-3 animate-spin" />
          <span>Synchronisation...</span>
        </span>
      );
    case 'PENDING_CONNECTOR':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-mono font-medium bg-amber-50 text-amber-800 border border-amber-300 ${pad}`}>
          <Clock className="w-3 h-3 text-amber-600" />
          <span>Connecteur en attente</span>
        </span>
      );
    case 'ERROR':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-mono font-medium bg-rose-50 text-rose-700 border border-rose-200 ${pad}`}>
          <AlertTriangle className="w-3 h-3 text-rose-500" />
          <span>Anomalie signalée</span>
        </span>
      );
    case 'IDLE':
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200 ${pad}`}>
          <Radio className="w-3 h-3 text-slate-400" />
          <span>En veille</span>
        </span>
      );
  }
};
