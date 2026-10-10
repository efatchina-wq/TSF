import { useState, useEffect, useCallback } from 'react';
import { syncJobsStorage } from '../services/scheduler/syncJobsStorage';
import { wikijobScheduler } from '../services/scheduler/wikijobScheduler';
import { 
  SyncJobRecord, 
  SourceHealthReport, 
  NotificationDigest, 
  SchedulerConfig,
  SchedulerJobType
} from '../types/scheduler';

export function useWikiJobScheduler() {
  const [jobs, setJobs] = useState<SyncJobRecord[]>(() => syncJobsStorage.getJobs());
  const [healthReports, setHealthReports] = useState<SourceHealthReport[]>(() => syncJobsStorage.getHealthReports());
  const [digests, setDigests] = useState<NotificationDigest[]>(() => syncJobsStorage.getDigests());
  const [config, setConfig] = useState<SchedulerConfig>(() => syncJobsStorage.getConfig());
  const [isJobRunning, setIsJobRunning] = useState<boolean>(() => wikijobScheduler.getIsRunning());
  const [currentStepName, setCurrentStepName] = useState<string>('');
  const [currentStepNum, setCurrentStepNum] = useState<number>(0);

  useEffect(() => {
    const unsub = syncJobsStorage.subscribe(() => {
      setJobs(syncJobsStorage.getJobs());
      setHealthReports(syncJobsStorage.getHealthReports());
      setDigests(syncJobsStorage.getDigests());
      setConfig(syncJobsStorage.getConfig());
    });
    return unsub;
  }, []);

  const triggerDailySync = useCallback(async () => {
    setIsJobRunning(true);
    setCurrentStepNum(1);
    setCurrentStepName('Initialisation...');
    try {
      const res = await wikijobScheduler.runDailySync((num, name) => {
        setCurrentStepNum(num);
        setCurrentStepName(`${num}/12 : ${name}`);
      });
      return res;
    } finally {
      setIsJobRunning(false);
      setCurrentStepName('Terminé');
      setCurrentStepNum(0);
    }
  }, []);

  const triggerSourceSync = useCallback(async (sourceId: string) => {
    setIsJobRunning(true);
    try {
      return await wikijobScheduler.runSourceSync(sourceId);
    } finally {
      setIsJobRunning(false);
    }
  }, []);

  const triggerCleanupExpired = useCallback(async () => {
    setIsJobRunning(true);
    try {
      return await wikijobScheduler.runCleanupExpired();
    } finally {
      setIsJobRunning(false);
    }
  }, []);

  const triggerDeadlineCheck = useCallback(async () => {
    setIsJobRunning(true);
    try {
      return await wikijobScheduler.runDeadlineCheck();
    } finally {
      setIsJobRunning(false);
    }
  }, []);

  const triggerNotificationDigest = useCallback(async () => {
    setIsJobRunning(true);
    try {
      return await wikijobScheduler.runNotificationDigest();
    } finally {
      setIsJobRunning(false);
    }
  }, []);

  const triggerHealthCheck = useCallback(async () => {
    setIsJobRunning(true);
    try {
      return await wikijobScheduler.runHealthCheck();
    } finally {
      setIsJobRunning(false);
    }
  }, []);

  const toggleScheduler = useCallback((enabled: boolean) => {
    return syncJobsStorage.updateConfig({ enabled });
  }, []);

  const resetAll = useCallback(() => {
    syncJobsStorage.resetToDefaults();
  }, []);

  return {
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
    toggleScheduler,
    resetAll
  };
}
