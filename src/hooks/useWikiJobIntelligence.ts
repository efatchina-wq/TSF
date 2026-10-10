import { useState, useEffect, useCallback, useMemo } from 'react';
import { intelligenceStorage } from '../services/intelligence/intelligenceStorage';
import { calculateOpportunityMatch } from '../services/intelligence/matchingEngine';
import { aggregationStorage } from '../services/aggregation/storage';
import { analyzeOpportunityWithAI } from '../services/intelligence/wikiJobAiExtractor';
import { 
  WikiJobUserProfile, 
  WikiJobAlert, 
  OpportunityMatchResult, 
  WikiJobDigest,
  AiOpportunityAnalysis
} from '../types/intelligence';
import { NormalizedOpportunity, SourceItemRecord } from '../types/aggregation';

export function useWikiJobIntelligence() {
  const [profile, setProfile] = useState<WikiJobUserProfile | null>(() => intelligenceStorage.getProfile());
  const [alerts, setAlerts] = useState<WikiJobAlert[]>(() => intelligenceStorage.getAlerts());
  const [allOpportunities, setAllOpportunities] = useState<NormalizedOpportunity[]>(() => aggregationStorage.getOpportunities());

  useEffect(() => {
    const unsubIntel = intelligenceStorage.subscribe(() => {
      setProfile(intelligenceStorage.getProfile());
      setAlerts(intelligenceStorage.getAlerts());
    });

    const unsubAgg = aggregationStorage.subscribe(() => {
      setAllOpportunities(aggregationStorage.getOpportunities());
    });

    return () => {
      unsubIntel();
      unsubAgg();
    };
  }, []);

  const saveProfile = useCallback((newProfile: WikiJobUserProfile) => {
    const saved = intelligenceStorage.saveProfile(newProfile);
    setProfile(saved);
    return saved;
  }, []);

  // Matching helper
  const getMatch = useCallback((opp: NormalizedOpportunity): OpportunityMatchResult => {
    return calculateOpportunityMatch(opp, profile);
  }, [profile]);

  // 1. RECOMMANDATIONS: « Pour vous » (Top matching based on score)
  const recommendationsForYou = useMemo(() => {
    const active = allOpportunities.filter(o => o.status !== 'EXPIRED');
    return active
      .map(opp => ({
        opportunity: opp,
        match: calculateOpportunityMatch(opp, profile)
      }))
      .sort((a, b) => b.match.score - a.match.score);
  }, [allOpportunities, profile]);

  // 2. RECOMMANDATIONS: « Nouvelles opportunités »
  const newOpportunities = useMemo(() => {
    return [...allOpportunities]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10)
      .map(opp => ({
        opportunity: opp,
        match: calculateOpportunityMatch(opp, profile)
      }));
  }, [allOpportunities, profile]);

  // 3. RECOMMANDATIONS: « Vos domaines »
  const yourDomainsOpportunities = useMemo(() => {
    if (!profile || profile.opportunites_recherchees.length === 0) {
      return recommendationsForYou.slice(0, 10);
    }
    return allOpportunities
      .filter(o => profile.opportunites_recherchees.includes(o.category))
      .map(opp => ({
        opportunity: opp,
        match: calculateOpportunityMatch(opp, profile)
      }))
      .sort((a, b) => b.match.score - a.match.score);
  }, [allOpportunities, profile, recommendationsForYou]);

  // 4. RECOMMANDATIONS: « Deadlines proches »
  const urgentDeadlineOpportunities = useMemo(() => {
    return allOpportunities
      .filter(o => o.status === 'EXPIRING_SOON')
      .map(opp => ({
        opportunity: opp,
        match: calculateOpportunityMatch(opp, profile)
      }))
      .sort((a, b) => {
        if (!a.opportunity.deadline) return 1;
        if (!b.opportunity.deadline) return -1;
        return new Date(a.opportunity.deadline).getTime() - new Date(b.opportunity.deadline).getTime();
      });
  }, [allOpportunities, profile]);

  // 5. RECOMMANDATIONS: « Opportunités similaires »
  const getSimilarOpportunities = useCallback((targetOpp: NormalizedOpportunity) => {
    return allOpportunities
      .filter(o => o.id !== targetOpp.id && (o.category === targetOpp.category || o.sector === targetOpp.sector))
      .slice(0, 4)
      .map(opp => ({
        opportunity: opp,
        match: calculateOpportunityMatch(opp, profile)
      }));
  }, [allOpportunities, profile]);

  // Alerts Methods
  const addAlert = useCallback((alert: Omit<WikiJobAlert, 'id' | 'created_at' | 'last_matched_at' | 'match_count'>) => {
    return intelligenceStorage.addAlert(alert);
  }, []);

  const updateAlert = useCallback((id: string, updates: Partial<WikiJobAlert>) => {
    return intelligenceStorage.updateAlert(id, updates);
  }, []);

  const deleteAlert = useCallback((id: string) => {
    intelligenceStorage.deleteAlert(id);
  }, []);

  const toggleAlert = useCallback((id: string) => {
    return intelligenceStorage.toggleAlert(id);
  }, []);

  // Digest Generators
  const getDailyDigest = useCallback(() => {
    return intelligenceStorage.generateDailyDigest();
  }, []);

  const getWeeklyDigest = useCallback(() => {
    return intelligenceStorage.generateWeeklyDigest();
  }, []);

  // AI Extractor
  const runAiAnalysis = useCallback(async (rawItem: SourceItemRecord) => {
    return await analyzeOpportunityWithAI(rawItem, allOpportunities);
  }, [allOpportunities]);

  const resetDefaults = useCallback(() => {
    intelligenceStorage.resetToDefaults();
  }, []);

  return {
    profile,
    saveProfile,
    getMatch,
    recommendationsForYou,
    newOpportunities,
    yourDomainsOpportunities,
    urgentDeadlineOpportunities,
    getSimilarOpportunities,
    alerts,
    addAlert,
    updateAlert,
    deleteAlert,
    toggleAlert,
    getDailyDigest,
    getWeeklyDigest,
    runAiAnalysis,
    resetDefaults
  };
}
