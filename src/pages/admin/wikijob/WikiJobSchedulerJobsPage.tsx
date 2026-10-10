import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Container } from '../../../components/ui/Container';
import { useWikiJobScheduler } from '../../../hooks/useWikiJobScheduler';
import { useRouter } from '../../../hooks/useRouter';
import { 
  SyncJobRecord, 
  SourceHealthReport
} from '../../../types/scheduler';
import { 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Radio, 
  RefreshCw, 
  Play, 
  ShieldCheck, 
  Activity, 
  FileText, 
  Bell, 
  RotateCcw, 
  Check, 
  X, 
  ExternalLink, 
  Search, 
  Zap, 
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

export const WikiJobSchedulerJobsPage: React.FC = () => {
  const {
    jobs,
    healthReports,
    digests,
    config,
    isJobRunning,
    currentStepName,
    currentStepNum,
    triggerDailySync,
    triggerSourceSync,
    triggerCleanupExpired,
    triggerDeadlineCheck,
    triggerNotificationDigest,
    triggerHealthCheck,
    toggleScheduler
  } = useWikiJobScheduler();

  const { navigate } = useRouter();

  // Filters state
  const [filterJobType, setFilterJobType] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'jobs' | 'health' | 'digests'>('jobs');

  // Modal inspection
  const [inspectingJob, setInspectingJob] = useState<SyncJobRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Execution triggers
  const handleTriggerDaily = async () => {
    try {
      showToast('Démarrage de la synchronisation quotidienne (12 étapes)...');
      const job = await triggerDailySync();
      showToast(`Daily Sync terminée (${job.status}) : ${job.items_created} créés, ${job.items_updated} mis à jour, ${job.items_duplicates} doublons.`);
    } catch (e: any) {
      showToast(`Erreur : ${e.message}`);
    }
  };

  const handleTriggerDeadline = async () => {
    try {
      showToast('Audit des dates limites en cours...');
      const job = await triggerDeadlineCheck();
      showToast(`Audit terminé : ${job.items_updated} opportunités actualisées.`);
    } catch (e: any) {
      showToast(`Erreur : ${e.message}`);
    }
  };

  const handleTriggerCleanup = async () => {
    try {
      showToast('Nettoyage des expirations...');
      const job = await triggerCleanupExpired();
      showToast(`Nettoyage achevé : ${job.items_updated} opportunités archivées.`);
    } catch (e: any) {
      showToast(`Erreur : ${e.message}`);
    }
  };

  const handleTriggerDigest = async () => {
    try {
      showToast('Génération de la synthèse quotidienne...');
      await triggerNotificationDigest();
      showToast(`Digest compilé avec succès pour diffusion.`);
    } catch (e: any) {
      showToast(`Erreur : ${e.message}`);
    }
  };

  const handleTriggerHealth = async () => {
    try {
      showToast('Sonde de santé des sources en cours...');
      const job = await triggerHealthCheck();
      showToast(`Audit de santé terminé : ${job.items_updated} sources opérationnelles.`);
    } catch (e: any) {
      showToast(`Erreur : ${e.message}`);
    }
  };

  const handleSourceSync = async (sourceId: string, name: string) => {
    try {
      showToast(`Synchronisation isolée de « ${name} »...`);
      const job = await triggerSourceSync(sourceId);
      if (job.status === 'SUCCESS') {
        showToast(`Succès : ${job.items_found} avis collectés pour ${name}.`);
      } else {
        showToast(`Échec pour ${name} : ${job.error_message}`);
      }
    } catch (e: any) {
      showToast(`Erreur : ${e.message}`);
    }
  };

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      if (filterJobType !== 'ALL' && j.job_type !== filterJobType) return false;
      if (filterStatus !== 'ALL' && j.status !== filterStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = j.id.toLowerCase().includes(q);
        const matchesSource = (j.source_name || j.source_id).toLowerCase().includes(q);
        const matchesType = j.job_type.toLowerCase().includes(q);
        if (!matchesId && !matchesSource && !matchesType) return false;
      }
      return true;
    });
  }, [jobs, filterJobType, filterStatus, searchQuery]);

  // Aggregate metrics
  const sourcesHealthyCount = healthReports.filter(h => h.status === 'HEALTHY').length;
  const sourcesErrorCount = healthReports.filter(h => h.status === 'ERROR' || h.status === 'WARNING').length;
  const totalItemsCreated = jobs.reduce((acc, j) => acc + (j.items_created || 0), 0);
  const totalItemsUpdated = jobs.reduce((acc, j) => acc + (j.items_updated || 0), 0);
  const totalDuplicates = jobs.reduce((acc, j) => acc + (j.items_duplicates || 0), 0);

  const formatDate = (isoStr: string | null) => {
    if (!isoStr) return 'Jamais';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="pb-24 space-y-8 font-sans">
      <PageHeader
        kicker="ARCHITECTURE DE SYNCHRONISATION & SUPERVISION 24H"
        title="WikiJob — Scheduler & Monitoring des Jobs"
        description="Planificateur autonome assurant l'actualisation périodique des sources béninoises au minimum toutes les 24 heures, avec politique de reprise (retry backoff) et isolation des pannes."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/admin/wikijob/sources')}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-[#404040] text-xs font-mono font-medium rounded-xl cursor-pointer transition-colors"
            >
              Registre des Sources
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/wikijob/engine')}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-[#404040] text-xs font-mono font-medium rounded-xl cursor-pointer transition-colors"
            >
              Pipeline d'Agrégation
            </button>
            <button
              type="button"
              onClick={handleTriggerDaily}
              disabled={isJobRunning}
              className="px-4 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 text-[#FF6600] ${isJobRunning ? 'animate-spin' : ''}`} />
              <span>{isJobRunning ? 'Exécution du Job...' : 'Lancer Daily Sync'}</span>
            </button>
          </div>
        }
      />

      <Container>
        <div className="space-y-6">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-4 bg-slate-900 text-white rounded-2xl border border-[#0070C0]/50 flex items-center justify-between shadow-lg text-xs font-mono animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <Radio className="w-4 h-4 text-[#FF6600] animate-pulse shrink-0" />
                <span>{toastMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 1. INFORMATIONS PRIORITAIRES & AUTOMATED SCHEDULER PANEL                  */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FFF3EB] text-[#FF6600] border border-[#FFC49E]">
                    CYCLE STRICT 24 HEURES
                  </span>
                  <span className="text-xs font-mono text-[#7D7D7D]">
                    Surveillance automatique en tâche de fond
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#262626]">
                  Ordonnanceur WikiJob & Reprise Automatique (Retry Backoff)
                </h3>
                <p className="text-xs sm:text-sm text-[#404040] max-w-2xl leading-relaxed">
                  Toutes les 24 heures, le système lance la séquence de collecte et de mise à jour des sources béninoises. Si une source échoue, un mécanisme de retry avec backoff exponentiel s'active sans jamais paralyser les autres organismes.
                </p>
              </div>

              {/* Status Switch & Next Run Timer */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 shrink-0 lg:w-80">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-mono font-bold text-[#262626]">Ordonnanceur actif :</span>
                  <button
                    type="button"
                    onClick={() => toggleScheduler(!config.enabled)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      config.enabled ? 'bg-[#0E8A5E]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        config.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="text-xs font-mono border-t border-slate-200 pt-2.5 space-y-1.5">
                  <div className="flex justify-between text-[#404040]">
                    <span>Intervalle :</span>
                    <strong className="text-[#262626]">Chaque {config.interval_hours}h</strong>
                  </div>
                  <div className="flex justify-between text-[#404040]">
                    <span>Prochain run :</span>
                    <strong className="text-[#FF6600] font-bold">{formatDate(config.next_run_at)}</strong>
                  </div>
                  <div className="flex justify-between text-[#404040]">
                    <span>Dernier succès certifié :</span>
                    <strong className="text-[#0E8A5E] font-bold">{formatDate(config.last_success_run_at)}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Stepper Progress Bar */}
            {isJobRunning && (
              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-2 text-[#0070C0] font-bold">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Progression du Job : {currentStepName}</span>
                  </span>
                  <span className="text-[#404040]">{currentStepNum} / 12 étapes</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0070C0] h-full transition-all duration-300"
                    style={{ width: `${(currentStepNum / 12) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Quick Action Trigger Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[#7D7D7D] mr-2">Déclencheurs manuels :</span>
              
              <button
                type="button"
                onClick={handleTriggerDaily}
                disabled={isJobRunning}
                className="px-3.5 py-1.5 rounded-xl bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-2xs"
              >
                <Play className="w-3 h-3 text-[#FF6600]" />
                <span>1. daily_sync</span>
              </button>

              <button
                type="button"
                onClick={handleTriggerDeadline}
                disabled={isJobRunning}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[#404040] text-xs font-mono flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Clock className="w-3 h-3 text-[#FF6600]" />
                <span>2. deadline_check</span>
              </button>

              <button
                type="button"
                onClick={handleTriggerCleanup}
                disabled={isJobRunning}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[#404040] text-xs font-mono flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className="w-3 h-3 text-rose-600" />
                <span>3. cleanup_expired</span>
              </button>

              <button
                type="button"
                onClick={handleTriggerDigest}
                disabled={isJobRunning}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[#404040] text-xs font-mono flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Bell className="w-3 h-3 text-[#0070C0]" />
                <span>4. notification_digest</span>
              </button>

              <button
                type="button"
                onClick={handleTriggerHealth}
                disabled={isJobRunning}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[#404040] text-xs font-mono flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Activity className="w-3 h-3 text-[#0E8A5E]" />
                <span>5. health_check</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. INDICATEURS CLÉS                                                       */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                SOURCES OK (HEALTHY)
              </span>
              <strong className="text-2xl font-extrabold text-[#0E8A5E] font-mono block">
                {sourcesHealthyCount}
              </strong>
              <span className="text-[10px] text-emerald-800">Flux nominaux</span>
            </div>

            <div className={`p-4 rounded-2xl border shadow-xs space-y-1 ${
              sourcesErrorCount > 0 ? 'bg-[#FFF3EB] border-[#FFC49E]' : 'bg-white border-slate-200'
            }`}>
              <span className={`text-[10px] font-mono uppercase font-bold block ${
                sourcesErrorCount > 0 ? 'text-[#FF6600]' : 'text-slate-400'
              }`}>
                SOURCES EN ERREUR
              </span>
              <strong className={`text-2xl font-extrabold font-mono block ${
                sourcesErrorCount > 0 ? 'text-[#FF6600]' : 'text-slate-400'
              }`}>
                {sourcesErrorCount}
              </strong>
              <span className={`text-[10px] ${sourcesErrorCount > 0 ? 'text-amber-800 font-semibold' : 'text-slate-500'}`}>
                {sourcesErrorCount > 0 ? 'À inspecter' : 'Aucune panne'}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-mono text-[#0070C0] uppercase font-bold block">
                NOUVEAUX CRÉÉS
              </span>
              <strong className="text-2xl font-extrabold text-[#0070C0] font-mono block">
                +{totalItemsCreated}
              </strong>
              <span className="text-[10px] text-[#404040]">Depuis le scheduler</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                ACTUALISÉS
              </span>
              <strong className="text-2xl font-extrabold text-[#262626] font-mono block">
                {totalItemsUpdated}
              </strong>
              <span className="text-[10px] text-[#404040]">Champs & statuts</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                DOUBLONS RATTACHÉS
              </span>
              <strong className="text-2xl font-extrabold text-purple-700 font-mono block">
                {totalDuplicates}
              </strong>
              <span className="text-[10px] text-purple-700">Multi-sources</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                TOTAL JOBS EXÉCUTÉS
              </span>
              <strong className="text-2xl font-extrabold text-[#262626] font-mono block">
                {jobs.length}
              </strong>
              <span className="text-[10px] text-[#404040]">Historique archivé</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. TABS NAVIGATION : JOBS, SANTÉ, DIGESTS                                  */}
          {/* ========================================================================= */}
          <div className="flex border-b border-slate-200 overflow-x-auto gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('jobs')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'jobs'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Historique des Jobs (sync_jobs) ({jobs.length})</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('health')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'health'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>Santé & Véritable Dernière Synchro ({healthReports.length})</span>
                {sourcesErrorCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#FF6600] text-white text-[10px]">
                    {sourcesErrorCount}
                  </span>
                )}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('digests')}
              className={`pb-3 px-4 text-xs sm:text-sm font-mono font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'digests'
                  ? 'border-[#0070C0] text-[#0070C0]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span>Synthèses Quotidiennes ({digests.length})</span>
              </div>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: JOBS TABLE & MOBILE LIST                                           */}
          {/* ========================================================================= */}
          {activeTab === 'jobs' && (
            <div className="space-y-4">
              {/* Filter bar */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filtrer par ID de job, source, mot-clé..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#262626] outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white transition-all font-sans"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={filterJobType}
                      onChange={(e) => setFilterJobType(e.target.value)}
                      className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-[#404040] outline-none focus:ring-2 focus:ring-[#0070C0]"
                    >
                      <option value="ALL">Tous les types de jobs</option>
                      <option value="daily_sync">daily_sync (Quotidien)</option>
                      <option value="source_sync">source_sync (Par source)</option>
                      <option value="deadline_check">deadline_check (Deadlines)</option>
                      <option value="cleanup_expired">cleanup_expired (Expirations)</option>
                      <option value="notification_digest">notification_digest (Synthèse)</option>
                      <option value="health_check">health_check (Santé)</option>
                    </select>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-[#404040] outline-none focus:ring-2 focus:ring-[#0070C0]"
                    >
                      <option value="ALL">Tous les statuts</option>
                      <option value="SUCCESS">Succès (SUCCESS)</option>
                      <option value="PARTIAL">Partiel avec retry (PARTIAL)</option>
                      <option value="FAILED">Échec (FAILED)</option>
                      <option value="RUNNING">En cours (RUNNING)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-4 px-5">Job ID & Type</th>
                        <th className="py-4 px-4">Source Cible</th>
                        <th className="py-4 px-4">Débuté le</th>
                        <th className="py-4 px-4">Durée</th>
                        <th className="py-4 px-4">Statut</th>
                        <th className="py-4 px-4 text-center">Trouvés / Créés / MàJ</th>
                        <th className="py-4 px-4 text-center">Doublons</th>
                        <th className="py-4 px-5 text-right">Détails</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredJobs.map(job => (
                        <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-5">
                            <span className="font-bold text-[#0070C0] block">{job.id}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-bold inline-block mt-0.5">
                              {job.job_type}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-[#262626] font-sans font-bold">{job.source_name || job.source_id}</div>
                            {job.retry_count > 0 && (
                              <span className="text-[10px] text-[#FF6600] font-bold">
                                {job.retry_count} tentative(s) retry
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                            {formatDate(job.started_at)}
                          </td>
                          <td className="py-4 px-4 text-[#404040]">
                            {job.duration_ms ? `${(job.duration_ms / 1000).toFixed(2)}s` : '—'}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              job.status === 'SUCCESS' ? 'bg-emerald-100 text-[#0E8A5E] border border-emerald-300' :
                              job.status === 'PARTIAL' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                              job.status === 'RUNNING' ? 'bg-blue-100 text-[#0070C0] animate-pulse' :
                              'bg-rose-100 text-rose-900 border border-rose-300'
                            }`}>
                              {job.status}
                            </span>
                            {job.error_message && (
                              <div className="text-[10px] text-rose-700 truncate max-w-[150px] mt-0.5" title={job.error_message}>
                                {job.error_message}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-slate-600">{job.items_found}</span>
                            <span className="text-[#0E8A5E] font-bold"> / +{job.items_created}</span>
                            <span className="text-[#0070C0]"> / {job.items_updated}</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            {job.items_duplicates > 0 ? (
                              <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold text-[10px]">
                                {job.items_duplicates}
                              </span>
                            ) : (
                              <span className="text-slate-400">0</span>
                            )}
                          </td>
                          <td className="py-4 px-5 text-right">
                            <button
                              type="button"
                              onClick={() => setInspectingJob(job)}
                              className="px-3 py-1 border border-slate-200 hover:bg-slate-100 rounded-lg text-[#404040] hover:text-[#0070C0] text-[11px] font-bold cursor-pointer transition-colors"
                            >
                              Examiner
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredJobs.length === 0 && (
                  <div className="p-10 text-center text-xs text-slate-500 font-mono">
                    Aucun job ne correspond aux critères de filtre.
                  </div>
                )}
              </div>

              {/* Mobile Card List */}
              <div className="lg:hidden space-y-3 font-sans">
                {filteredJobs.map(job => (
                  <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-[#0070C0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {job.job_type}
                        </span>
                        <h4 className="font-bold text-sm text-[#262626] mt-1">{job.source_name || job.source_id}</h4>
                        <div className="text-xs text-[#7D7D7D] font-mono mt-0.5">{job.id}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        job.status === 'SUCCESS' ? 'bg-emerald-100 text-[#0E8A5E]' :
                        job.status === 'PARTIAL' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {job.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Résultats</span>
                        <span className="font-bold text-[#0E8A5E]">+{job.items_created} créés</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Durée</span>
                        <span className="text-[#404040]">{job.duration_ms ? `${(job.duration_ms / 1000).toFixed(2)}s` : '—'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-100">
                      <span className="text-slate-400">{formatDate(job.started_at)}</span>
                      <button
                        type="button"
                        onClick={() => setInspectingJob(job)}
                        className="text-[#0070C0] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Examiner</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: HEALTH STATUS & TRUE LAST SYNC MATRIX                              */}
          {/* ========================================================================= */}
          {activeTab === 'health' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#EBF5FC] border border-[#A3D1F1] rounded-2xl space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0070C0]" />
                  <strong className="text-xs font-mono font-bold text-[#004D85]">
                    Certitude des Dates de Synchronisation & Isolation des Défaillances
                  </strong>
                </div>
                <p className="text-xs text-[#004D85] leading-relaxed font-sans">
                  Une source n'est <strong>JAMAIS</strong> marquée comme actualisée en cas d'erreur de collecte. La date affichée ci-dessous représente la véritable date du dernier succès certifié (<code className="font-bold">last_success_at</code>).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {healthReports.map(rep => {
                  const isHealthy = rep.status === 'HEALTHY';
                  const isWarning = rep.status === 'WARNING';
                  const isError = rep.status === 'ERROR';

                  const badgeClass = isHealthy
                    ? 'bg-emerald-100 text-[#0E8A5E] border-emerald-300'
                    : isWarning
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : isError
                    ? 'bg-rose-100 text-rose-900 border-rose-300'
                    : 'bg-slate-200 text-slate-800 border-slate-300';

                  return (
                    <div 
                      key={rep.source_id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4 font-mono text-xs flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-0.5">
                            <span className="text-[10px] text-slate-400 block font-bold">{rep.source_slug}</span>
                            <h4 className="font-bold text-[#262626] text-base font-sans">{rep.source_name}</h4>
                          </div>

                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                            {rep.status}
                          </span>
                        </div>

                        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Dernier succès certifié :</span>
                            <strong className="text-[#0E8A5E]">{formatDate(rep.last_success_at)}</strong>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-slate-500">Dernier contrôle de flux :</span>
                            <span className="text-[#262626]">{formatDate(rep.last_checked_at)}</span>
                          </div>

                          {rep.last_error_at && (
                            <div className="flex justify-between text-rose-700 font-bold">
                              <span>Dernière anomalie :</span>
                              <span>{formatDate(rep.last_error_at)}</span>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <span className="text-slate-500">Temps de réponse sonde :</span>
                            <span className="text-[#262626]">{rep.response_time_ms} ms</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-slate-500">Échecs consécutifs :</span>
                            <span className={rep.consecutive_failures > 0 ? 'text-[#FF6600] font-bold' : 'text-slate-500'}>
                              {rep.consecutive_failures}
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-[#404040] font-sans leading-relaxed">
                          {rep.message}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleSourceSync(rep.source_id, rep.source_name)}
                          disabled={isJobRunning}
                          className="px-3.5 py-1.5 bg-[#0070C0] hover:bg-[#005FA3] text-white text-[11px] font-bold rounded-xl flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-2xs transition-colors"
                        >
                          <RefreshCw className="w-3 h-3 text-white" />
                          <span>Synchroniser cette source</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => navigate(`/wikijob/sources/${rep.source_slug}`)}
                          className="text-[#404040] hover:text-[#0070C0] text-[11px] flex items-center gap-1 cursor-pointer font-sans"
                        >
                          <span>Fiche catalogue</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: NOTIFICATION DIGESTS                                               */}
          {/* ========================================================================= */}
          {activeTab === 'digests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#262626]">
                    Synthèses Quotidiennes d'Opportunités (notification_digest)
                  </h3>
                  <p className="text-xs text-[#7D7D7D]">
                    Générées quotidiennement pour alerter les candidats béninois sur les nouvelles publications et dates limites imminentes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleTriggerDigest}
                  disabled={isJobRunning}
                  className="px-4 py-2 bg-[#FF6600] hover:bg-[#E55C00] text-white text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Bell className="w-3.5 h-3.5 text-white" />
                  <span>Compiler un Digest</span>
                </button>
              </div>

              <div className="space-y-4">
                {digests.map(dig => (
                  <div key={dig.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                      <div className="space-y-0.5">
                        <strong className="text-sm font-bold text-[#0070C0] font-mono block">{dig.id}</strong>
                        <span className="text-xs font-mono text-slate-400">
                          Généré le {formatDate(dig.generated_at)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs font-mono">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0E8A5E] font-bold">
                          {dig.total_new_opportunities} opportunités actives
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FFF3EB] text-[#FF6600] font-bold border border-[#FFC49E]">
                          {dig.expiring_soon_count} expirent sous 7j
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                        ÉLÉMENTS MIS EN AVANT DANS CE DIGEST :
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {dig.items.map(item => (
                          <div key={item.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                            <span className="text-[10px] font-mono text-[#0070C0] font-bold block">{item.category}</span>
                            <h5 className="font-bold text-[#262626] font-sans">{item.title}</h5>
                            <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-1">
                              <span>{item.organization}</span>
                              <span className="text-[#FF6600] font-bold">{item.deadline || 'En continu'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 text-xs font-mono text-slate-500 flex flex-wrap gap-2">
                      <span className="text-slate-400">Listes de diffusion :</span>
                      {dig.recipients.map((rec, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-slate-100 rounded-lg text-slate-700">
                          {rec}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* ========================================================================= */}
      {/* MODAL: INSPECT JOB LOG DETAILS                                            */}
      {/* ========================================================================= */}
      {inspectingJob && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto overscroll-contain flex min-h-full items-center justify-center p-3 sm:p-6 text-center animate-in fade-in duration-200">
          <div
            onClick={() => setInspectingJob(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
          />

          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] text-left">
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#0070C0]" />
                <h3 className="font-bold text-[#262626] text-base font-mono">
                  Détail du Job : {inspectingJob.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingJob(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain flex-1 p-5 sm:p-6 space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] block">TYPE DE JOB</span>
                  <strong className="text-[#0070C0]">{inspectingJob.job_type}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] block">STATUT FINAL</span>
                  <strong className={inspectingJob.status === 'SUCCESS' ? 'text-[#0E8A5E]' : 'text-rose-700'}>
                    {inspectingJob.status}
                  </strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] block">DURÉE</span>
                  <strong className="text-[#262626]">
                    {inspectingJob.duration_ms ? `${(inspectingJob.duration_ms / 1000).toFixed(2)}s` : '—'}
                  </strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] block">RETRIES BACKOFF</span>
                  <strong className="text-[#262626]">{inspectingJob.retry_count}</strong>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Débuté :</span>
                  <span>{formatDate(inspectingJob.started_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Achevé :</span>
                  <span>{formatDate(inspectingJob.completed_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Source ciblée :</span>
                  <span className="font-bold text-[#262626]">{inspectingJob.source_name || inspectingJob.source_id}</span>
                </div>
              </div>

              {/* Counts */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center text-[11px]">
                <div className="p-2.5 bg-slate-100 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Trouvés</span>
                  <strong>{inspectingJob.items_found}</strong>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-800">
                  <span className="block text-[10px]">Créés</span>
                  <strong>+{inspectingJob.items_created}</strong>
                </div>
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-800">
                  <span className="block text-[10px]">MàJ</span>
                  <strong>{inspectingJob.items_updated}</strong>
                </div>
                <div className="p-2.5 bg-purple-50 rounded-xl text-purple-800">
                  <span className="block text-[10px]">Doublons</span>
                  <strong>{inspectingJob.items_duplicates}</strong>
                </div>
                <div className="p-2.5 bg-rose-50 rounded-xl text-rose-800">
                  <span className="block text-[10px]">Rejetés</span>
                  <strong>{inspectingJob.items_rejected}</strong>
                </div>
              </div>

              {inspectingJob.error_message && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 space-y-1">
                  <span className="font-bold text-[10px] block">MESSAGE D'ERREUR DU JOB :</span>
                  <p>{inspectingJob.error_message}</p>
                </div>
              )}

              {/* Step details logs if daily_sync */}
              {inspectingJob.step_details && inspectingJob.step_details.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    JOURNAL DÉTAILLÉ DES ÉTAPES D'EXÉCUTION :
                  </span>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {inspectingJob.step_details.map((st, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-800">{st.step}</span>
                        <span className="text-slate-600">{st.message}</span>
                        {st.ok ? (
                          <Check className="w-3.5 h-3.5 text-[#0E8A5E] shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-[#FF6600] shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setInspectingJob(null)}
                className="px-5 py-2.5 bg-[#0070C0] text-white rounded-xl text-xs font-mono font-bold hover:bg-[#005FA3] cursor-pointer shadow-xs transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
