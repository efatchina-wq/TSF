export type SourceAcquisitionType = 
  | 'RSS_ATOM'            // 1. RSS / Atom
  | 'OFFICIAL_API'        // 2. API officielle
  | 'SITEMAP'             // 3. Sitemap
  | 'WEB_PUBLIC'          // 4. Page web publique
  | 'STRUCTURED_SOURCE'   // 5. Source structurée (JSON/CSV open data)
  | 'MANUAL_IMPORT'       // 6. Import manuel
  | 'FUTURE_CONNECTOR';   // 7. Connecteur futur

export type SourceCategory = 
  | 'EMPLOI'
  | 'STAGE'
  | 'VOLONTARIAT'
  | 'FORMATION'
  | 'FINANCEMENT'
  | 'BOURSE'
  | 'CONCOURS'
  | 'ENTREPRENEURIAT'
  | 'ACTUALITÉ'
  | 'PROGRAMME PUBLIC'
  | 'AUTRE';

export type SourceSyncFrequency = 
  | 'HOURLY' 
  | 'DAILY' 
  | 'WEEKLY' 
  | 'MANUAL';

export type SourceSyncStatus = 
  | 'IDLE' 
  | 'SYNCING' 
  | 'SUCCESS' 
  | 'ERROR' 
  | 'PENDING_CONNECTOR';

export interface SourceOpportunity {
  id: string;
  sourceId: string;
  title: string;
  category: SourceCategory;
  type: string;
  location: string;
  deadline: string;
  published_at: string;
  url: string;
  description: string;
  reference?: string;
  beneficiaries?: string;
}

export interface SourceNewsItem {
  id: string;
  sourceId: string;
  title: string;
  published_at: string;
  summary: string;
  url: string;
  category: SourceCategory;
}

export interface SourceErrorLog {
  id: string;
  timestamp: string;
  level: 'ERROR' | 'WARNING' | 'INFO';
  message: string;
  code?: string;
  details?: string;
}

export interface ConnectorSpec {
  adapter_name?: string;
  version?: string;
  target_selectors?: string[];
  rate_limit_per_min?: number;
  requires_auth?: boolean;
  notes?: string;
}

export interface SourceRecord {
  // Required fields from prompt table schema
  id: string;
  name: string;
  slug: string;
  description: string;
  website: string;
  source_type: SourceAcquisitionType;
  country: string;
  official: boolean;
  active: boolean;
  rss_url: string | null;
  api_url: string | null;
  scraping_enabled: boolean;
  last_checked_at: string | null;
  last_success_at: string | null;
  last_error_at: string | null;
  frequency: SourceSyncFrequency;
  created_at: string;
  updated_at: string;

  // Metadata and publications
  categories: SourceCategory[];
  logo_url?: string;
  logo_text?: string;
  operator_name?: string;
  sync_status: SourceSyncStatus;
  last_sync_message?: string;
  connector_spec?: ConnectorSpec;
  error_logs: SourceErrorLog[];
  opportunities: SourceOpportunity[];
  news: SourceNewsItem[];
}

export interface SourceFilterState {
  searchQuery: string;
  category: 'ALL' | SourceCategory;
  type: 'ALL' | SourceAcquisitionType;
  country: 'ALL' | string;
  activeOnly: boolean;
  officialOnly: boolean;
}

export interface ConnectionTestResult {
  sourceId: string;
  timestamp: string;
  status: 'SUCCESS' | 'ERROR' | 'PENDING';
  responseTimeMs: number;
  message: string;
  details?: Record<string, any>;
}
