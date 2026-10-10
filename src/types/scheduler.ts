import { SourceRecord } from './wikijob';

export type SchedulerJobType =
  | 'daily_sync'
  | 'source_sync'
  | 'cleanup_expired'
  | 'deadline_check'
  | 'notification_digest'
  | 'health_check';

export type JobStatus =
  | 'PENDING'
  | 'RUNNING'
  | 'SUCCESS'
  | 'FAILED'
  | 'PARTIAL';

export type HealthStatus =
  | 'HEALTHY'
  | 'WARNING'
  | 'ERROR'
  | 'DISABLED';

/**
 * JOB LOG
 * Table: sync_jobs
 */
export interface SyncJobRecord {
  id: string;
  source_id: string; // 'ALL' or specific source ID
  source_name?: string;
  job_type: SchedulerJobType;
  started_at: string;
  completed_at: string | null;
  status: JobStatus;
  items_found: number;
  items_created: number;
  items_updated: number;
  items_duplicates: number;
  items_rejected: number;
  error_message: string | null;
  retry_count: number;
  duration_ms?: number;
  step_details?: Array<{ step: string; timestamp: string; message: string; ok: boolean }>;
}

export interface SourceHealthReport {
  source_id: string;
  source_name: string;
  source_slug: string;
  status: HealthStatus;
  last_success_at: string | null; // CRITICAL: Only updated on true success
  last_checked_at: string | null;
  last_error_at: string | null;
  consecutive_failures: number;
  response_time_ms: number;
  message: string;
  error_detail?: string;
}

export interface NotificationDigestItem {
  id: string;
  title: string;
  organization: string;
  category: string;
  deadline: string | null;
  url: string;
  published_at: string;
}

export interface NotificationDigest {
  id: string;
  generated_at: string;
  period_start: string;
  period_end: string;
  total_new_opportunities: number;
  expiring_soon_count: number;
  items: NotificationDigestItem[];
  recipients: string[];
}

export interface SchedulerConfig {
  enabled: boolean;
  interval_hours: number; // default: 24
  next_run_at: string;
  last_run_at: string | null;
  last_success_run_at: string | null;
  max_retries: number;
  backoff_initial_ms: number;
  backoff_multiplier: number;
}
