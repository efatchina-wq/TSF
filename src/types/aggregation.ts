import { SourceRecord } from './wikijob';

export type WikiJobOpportunityCategory =
  | 'EMPLOI'
  | 'STAGE'
  | 'VOLONTARIAT'
  | 'BOURSE'
  | 'FORMATION'
  | 'FINANCEMENT'
  | 'CONCOURS'
  | 'APPEL À PROJETS'
  | 'ENTREPRENEURIAT'
  | 'AUTRE';

export type OpportunityLifecycleStatus = 
  | 'ACTIVE' 
  | 'EXPIRING_SOON' 
  | 'EXPIRED';

export type OpportunityVerificationStatus = 
  | 'PENDING' 
  | 'VERIFIED' 
  | 'REJECTED' 
  | 'EXPIRED';

export type SourceItemStatus = 
  | 'COLLECTED' 
  | 'PARSED' 
  | 'NORMALIZED' 
  | 'DUPLICATE' 
  | 'REJECTED' 
  | 'ERROR';

export type DeduplicationCriterion = 
  | 'URL' 
  | 'EXTERNAL_ID' 
  | 'HASH' 
  | 'TITRE' 
  | 'ORGANISATION' 
  | 'DEADLINE';

/**
 * RAW CONTENT
 * Table: source_items
 */
export interface SourceItemRecord {
  id: string;
  source_id: string;
  external_id: string;
  url: string;
  raw_title: string;
  raw_content: string;
  raw_html: string;
  published_at: string;
  collected_at: string;
  content_hash: string;
  status: SourceItemStatus;
}

/**
 * NORMALISATION
 * Table: opportunities
 */
export interface NormalizedOpportunity {
  id: string;
  source_id: string;
  source_item_id: string;
  title: string;
  slug: string;
  description: string;
  organization: string;
  category: WikiJobOpportunityCategory;
  sector: string;
  country: string;
  city: string;
  remote: boolean | 'ON_SITE' | 'HYBRID' | 'REMOTE';
  experience_level: string;
  education_level: string;
  contract_type: string;
  salary: string | null;
  application_url: string;
  source_url: string;
  published_at: string;
  deadline: string | null;
  collected_at: string;
  last_verified_at: string | null;
  status: OpportunityLifecycleStatus;
  verification_status: OpportunityVerificationStatus;
  created_at: string;
  updated_at: string;

  // Rich metadata for attribution and audit
  source_name?: string;
  verified_by?: string | null;
  duplicate_count?: number;
  duplicate_sources?: string[];
  confidence_score?: number;
  classification_reason?: string;
}

/**
 * DÉDUPLICATION
 * Record retained for audit & cross-source attribution
 */
export interface DuplicateAttributionRecord {
  id: string;
  canonical_opportunity_id: string;
  duplicate_source_item_id: string;
  duplicate_source_id: string;
  duplicate_source_name: string;
  duplicate_url: string;
  duplicate_title: string;
  match_criteria: DeduplicationCriterion[];
  similarity_score: number;
  detected_at: string;
  notes?: string;
}

/**
 * AUDIT TRAIL
 * Full modification & verification history
 */
export interface OpportunityAuditLog {
  id: string;
  opportunity_id: string;
  action: 
    | 'COLLECTED' 
    | 'PARSED' 
    | 'NORMALIZED' 
    | 'CLASSIFIED' 
    | 'DEDUPLICATED' 
    | 'VERIFIED' 
    | 'REJECTED' 
    | 'EXPIRATION_UPDATED' 
    | 'MANUAL_EDIT';
  timestamp: string;
  source_id: string;
  source_name: string;
  original_url: string;
  published_at: string;
  verified_at: string | null;
  admin_user: string | null;
  details: string;
  diff?: Record<string, { old_val: any; new_val: any }>;
}

/**
 * GENERIC COLLECTOR INTERFACES
 */
export interface RawFetchResult {
  external_id: string;
  url: string;
  raw_title: string;
  raw_content: string;
  raw_html: string;
  published_at: string;
}

export interface ParsedItem {
  external_id: string;
  title: string;
  content: string;
  html: string;
  url: string;
  published_at: string;
  detected_category?: string;
  detected_deadline?: string;
  detected_organization?: string;
  detected_location?: string;
  detected_contract?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings?: string[];
}

export interface Collector {
  name: string;
  sourceType: string;
  fetch(source: SourceRecord): Promise<RawFetchResult[]>;
  parse(raw: RawFetchResult): Promise<ParsedItem>;
  normalize(parsed: ParsedItem, source: SourceRecord, rawItem: SourceItemRecord): Promise<Partial<NormalizedOpportunity>>;
  validate(opp: Partial<NormalizedOpportunity>): ValidationResult;
}

/**
 * PIPELINE METRICS & MONITORING
 */
export interface PipelineStepLog {
  step: 'SOURCE' | 'FETCH' | 'RAW_CONTENT' | 'PARSER' | 'NORMALIZER' | 'CLASSIFIER' | 'DEDUPLICATOR' | 'VALIDATOR' | 'PUBLISHER';
  timestamp: string;
  status: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';
  message: string;
  items_count?: number;
  duration_ms?: number;
}

export interface PipelineExecutionReport {
  run_id: string;
  started_at: string;
  completed_at: string;
  duration_ms: number;
  sources_scanned: number;
  raw_items_fetched: number;
  items_parsed: number;
  items_normalized: number;
  items_classified: number;
  duplicates_detected: number;
  items_validated: number;
  opportunities_published: number;
  expirations_updated: number;
  step_logs: PipelineStepLog[];
}
