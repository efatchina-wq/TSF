import { useState, useEffect, useCallback } from 'react';
import { aggregationStorage } from '../services/aggregation/storage';
import { aggregationEngine } from '../services/aggregation/engine';
import { 
  NormalizedOpportunity, 
  SourceItemRecord, 
  DuplicateAttributionRecord, 
  OpportunityAuditLog, 
  PipelineExecutionReport,
  OpportunityVerificationStatus,
  OpportunityLifecycleStatus
} from '../types/aggregation';

export function useAggregationEngine() {
  const [opportunities, setOpportunities] = useState<NormalizedOpportunity[]>(() => aggregationStorage.getOpportunities());
  const [rawItems, setRawItems] = useState<SourceItemRecord[]>(() => aggregationStorage.getRawItems());
  const [duplicates, setDuplicates] = useState<DuplicateAttributionRecord[]>(() => aggregationStorage.getDuplicates());
  const [auditLogs, setAuditLogs] = useState<OpportunityAuditLog[]>(() => aggregationStorage.getAuditLogs());
  const [reports, setReports] = useState<PipelineExecutionReport[]>(() => aggregationStorage.getReports());
  const [isRunning, setIsRunning] = useState<boolean>(() => aggregationEngine.getIsRunning());
  const [currentStep, setCurrentStep] = useState<string>('En attente');
  const [progressPct, setProgressPct] = useState<number>(0);

  useEffect(() => {
    const unsub = aggregationStorage.subscribe(() => {
      setOpportunities(aggregationStorage.getOpportunities());
      setRawItems(aggregationStorage.getRawItems());
      setDuplicates(aggregationStorage.getDuplicates());
      setAuditLogs(aggregationStorage.getAuditLogs());
      setReports(aggregationStorage.getReports());
    });
    return unsub;
  }, []);

  const runPipeline = useCallback(async (targetSourceIds?: string[]) => {
    setIsRunning(true);
    setProgressPct(5);
    try {
      const report = await aggregationEngine.executePipeline(
        targetSourceIds,
        (step, msg, pct) => {
          setCurrentStep(`${step} : ${msg}`);
          setProgressPct(pct);
        }
      );
      return report;
    } finally {
      setIsRunning(false);
      setProgressPct(100);
      setTimeout(() => {
        setCurrentStep('Terminé');
        setProgressPct(0);
      }, 3000);
    }
  }, []);

  const verifyOpportunity = useCallback((id: string, status: OpportunityVerificationStatus, adminUser: string, notes?: string) => {
    return aggregationStorage.updateOpportunityVerification(id, status, adminUser, notes);
  }, []);

  const resetAll = useCallback(() => {
    aggregationStorage.resetAll();
  }, []);

  return {
    opportunities,
    rawItems,
    duplicates,
    auditLogs,
    reports,
    isRunning,
    currentStep,
    progressPct,
    runPipeline,
    verifyOpportunity,
    resetAll
  };
}
