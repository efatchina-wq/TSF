import { useState, useEffect, useCallback, createContext, useContext, ReactNode, createElement } from 'react';
import { RoutePath } from '../types';

interface RouterContextType {
  currentPath: RoutePath;
  navigate: (path: RoutePath | string, options?: { replace?: boolean }) => void;
  isActive: (path: string, exact?: boolean) => boolean;
  breadcrumbs: { label: string; path: string }[];
}

const RouterContext = createContext<RouterContextType | null>(null);

function normalizePath(path: string): RoutePath {
  // strip hash or query
  const clean = path.split('?')[0].split('#')[0] || '/';
  if (!clean.startsWith('/')) return ('/' + clean) as RoutePath;
  if (clean.length > 1 && clean.endsWith('/')) return clean.slice(0, -1) as RoutePath;
  return clean as RoutePath;
}

const ROUTE_LABELS: Record<string, string> = {
  '': 'Accueil',
  'organisation': 'Organisation',
  'mission': 'Mission & Vision',
  'methode': 'Méthode Fondatrice',
  'gouvernance': 'Gouvernance & COS',
  'histoire': 'Histoire & Jalons',
  'programmes': 'Programmes',
  'horizon-excellence': 'Horizon Excellence',
  'tsf-detecte': 'TSF Détecte',
  'graines-de-champions': 'Graines de Champions',
  'croissance-metanoia': 'Croissance & Métanoïa',
  'sourcefund-africa': 'SourceFund Africa',
  'media': 'TSF Média',
  'talents': 'Talents',
  'inscription': 'Candidature & Inscription',
  'detection': 'Détection & Scouting',
  'opportunites': 'Opportunités',
  'certification': 'Certification TSF',
  'partenaires': 'Partenaires',
  'entreprises': 'Entreprises & Industrie',
  'bailleurs': 'Bailleurs & Financeurs',
  'osc': 'Société Civile (OSC)',
  'institutions': 'Institutions Publiques',
  'impact': 'Impact & Données',
  'ressources': 'Ressources & Publications',
  'contact': 'Contact & Hubs',
  'espace-tsf': 'Espace TSF',
  'wikijob': 'WikiJob',
  'wiki': 'Base de Connaissances',
  'intelligence': 'WikiJob Intelligence',
  'sources': 'Registre des Sources',
  'engine': 'Aggregation Engine',
  'jobs': 'Jobs & Synchro 24h',
  'admin': 'Administration',
  'dashboard': 'Tableau de Bord',
  'design-system': 'Design System TSF'
};

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: RoutePath | string, options?: { replace?: boolean }) => {
    const normalized = normalizePath(path);
    if (typeof window !== 'undefined') {
      if (options?.replace) {
        window.history.replaceState({}, '', normalized);
      } else {
        window.history.pushState({}, '', normalized);
      }
      setCurrentPath(normalized);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const isActive = useCallback(
    (path: string, exact: boolean = false) => {
      const norm = normalizePath(path);
      if (exact || norm === '/') {
        return currentPath === norm;
      }
      return currentPath.startsWith(norm);
    },
    [currentPath]
  );

  // Compute breadcrumbs dynamically
  const segments = currentPath === '/' ? [] : currentPath.split('/').filter(Boolean);
  const breadcrumbs = [
    { label: 'Accueil', path: '/' },
    ...segments.map((segment, idx) => {
      const fullPath = '/' + segments.slice(0, idx + 1).join('/');
      const label = ROUTE_LABELS[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      return { label, path: fullPath };
    })
  ];

  return createElement(
    RouterContext.Provider,
    { value: { currentPath, navigate, isActive, breadcrumbs } },
    children
  );
}

export function useRouter(): RouterContextType {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
