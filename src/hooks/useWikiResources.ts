import { useState, useEffect, useCallback } from 'react';
import { wikiStorage } from '../services/wiki/wikiStorage';
import { WikiResource, WikiCategory, WikiContentType } from '../types/wiki';

export function useWikiResources() {
  const [resources, setResources] = useState<WikiResource[]>(() => wikiStorage.getAllResources());

  useEffect(() => {
    const unsub = wikiStorage.subscribe(() => {
      setResources(wikiStorage.getAllResources());
    });
    return unsub;
  }, []);

  const publishedResources = resources.filter(r => r.status === 'PUBLISHED');

  const getResourceBySlug = useCallback((slug: string) => {
    return wikiStorage.getResourceBySlug(slug);
  }, []);

  const createResource = useCallback((data: Omit<WikiResource, 'id' | 'views_count'>) => {
    return wikiStorage.createResource(data);
  }, []);

  const updateResource = useCallback((id: string, updates: Partial<WikiResource>) => {
    return wikiStorage.updateResource(id, updates);
  }, []);

  const deleteResource = useCallback((id: string) => {
    return wikiStorage.deleteResource(id);
  }, []);

  const incrementViews = useCallback((id: string) => {
    wikiStorage.incrementViews(id);
  }, []);

  const resetDefaults = useCallback(() => {
    wikiStorage.resetToDefaults();
  }, []);

  return {
    resources,
    publishedResources,
    getResourceBySlug,
    createResource,
    updateResource,
    deleteResource,
    incrementViews,
    resetDefaults
  };
}
