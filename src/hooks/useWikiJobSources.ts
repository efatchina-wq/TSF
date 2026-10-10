import { useState, useEffect, useCallback } from 'react';
import { sourceRegistry } from '../services/wikijobSourceRegistry';
import { 
  SourceRecord, 
  SourceFilterState, 
  ConnectionTestResult,
  SourceAcquisitionType 
} from '../types/wikijob';

export function useWikiJobSources() {
  const [sources, setSources] = useState<SourceRecord[]>(() => sourceRegistry.getAllSources());
  const [loading, setLoading] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<ConnectionTestResult | null>(null);

  useEffect(() => {
    const unsubscribe = sourceRegistry.subscribe(() => {
      setSources(sourceRegistry.getAllSources());
    });
    return unsubscribe;
  }, []);

  const getSourceBySlug = useCallback((slug: string) => {
    return sourceRegistry.getSourceBySlug(slug);
  }, []);

  const getSourceById = useCallback((id: string) => {
    return sourceRegistry.getSourceById(id);
  }, []);

  const createSource = useCallback((data: any) => {
    return sourceRegistry.createSource(data);
  }, []);

  const updateSource = useCallback((id: string, updates: Partial<SourceRecord>) => {
    return sourceRegistry.updateSource(id, updates);
  }, []);

  const deleteSource = useCallback((id: string) => {
    return sourceRegistry.deleteSource(id);
  }, []);

  const toggleSourceActive = useCallback((id: string) => {
    return sourceRegistry.toggleSourceActive(id);
  }, []);

  const testConnection = useCallback(async (id: string) => {
    setTestingId(id);
    try {
      const res = await sourceRegistry.testConnection(id);
      setTestResult(res);
      return res;
    } finally {
      setTestingId(null);
    }
  }, []);

  const syncSource = useCallback(async (id: string) => {
    setSyncingId(id);
    try {
      return await sourceRegistry.syncSource(id);
    } finally {
      setSyncingId(null);
    }
  }, []);

  const syncAll = useCallback(async () => {
    setLoading(true);
    try {
      return await sourceRegistry.syncAllActiveSources();
    } finally {
      setLoading(false);
    }
  }, []);

  const resetDefaults = useCallback(() => {
    return sourceRegistry.resetToDefaults();
  }, []);

  return {
    sources,
    loading,
    testingId,
    syncingId,
    testResult,
    setTestResult,
    getSourceBySlug,
    getSourceById,
    createSource,
    updateSource,
    deleteSource,
    toggleSourceActive,
    testConnection,
    syncSource,
    syncAll,
    resetDefaults
  };
}
