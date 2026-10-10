/**
 * TALENTS SANS FRONTIÈRES (TSF) — Backend Data Models & RBAC Definitions
 * Complete relational schema for production backend architecture.
 */

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'PROGRAM_MANAGER'
  | 'TALENT_MANAGER'
  | 'COMMUNICATION_MANAGER'
  | 'EDITOR'
  | 'VERIFIER'
  | 'EVALUATOR'
  | 'PARTNER'
  | 'TALENT'
  | 'OSC'
  | 'PUBLIC_USER';

export interface User {
  id: string;
  email: string;
  password_hash?: string;
  role: UserRole;
  auth_provider: 'LOCAL' | 'GOOGLE' | 'MAGIC_LINK';
  email_verified: boolean;
  email_verified_at: string | null;
  two_factor_enabled: boolean;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION' | 'DELETED';
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  avatar_url: string | null;
  bio: string | null;
  country: string;
  city: string;
  address: string | null;
  locale: string;
  created_at: string;
  updated_at: string;
}

export interface Talent {
  id: string;
  user_id: string;
  code_unique: string; // e.g. TSF-BJ-2026-0042
  headline: string;
  experience_level: string;
  highest_degree: string;
  current_organization: string | null;
  years_of_experience: number;
  open_to_relocation: boolean;
  open_to_remote: boolean;
  preferred_work_modes: string[];
  certification_status: 'NONE' | 'CANDIDATE' | 'BRONZE' | 'ARGENT' | 'OR';
  certification_id: string | null;
  visibility: 'PUBLIC' | 'PARTNERS_ONLY' | 'PRIVATE';
  created_at: string;
  updated_at: string;
}

export interface TalentSkill {
  id: string;
  talent_id: string;
  skill_name: string;
  category: 'HARD' | 'SOFT' | 'TOOL' | 'LANGUAGE';
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  verified_by_tsf: boolean;
}

export interface TalentProject {
  id: string;
  talent_id: string;
  title: string;
  description: string;
  role: string;
  project_url: string | null;
  media_url: string | null;
  start_date: string;
  end_date: string | null;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  description: string;
  pillar: 'FORMATION' | 'PROPULSION' | 'INNOVATION' | 'ALLIANCE';
  target_audience: string;
  duration_weeks: number;
  capacity: number;
  status: 'DRAFT' | 'OPEN_FOR_APPLICATIONS' | 'IN_SELECTION' | 'ONGOING' | 'COMPLETED';
  start_date: string;
  end_date: string;
  application_deadline: string;
  manager_id: string;
  created_at: string;
  updated_at: string;
}

export interface ProgramApplication {
  id: string;
  program_id: string;
  user_id: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'PRESELECTED' | 'INTERVIEW_SCHEDULED' | 'ACCEPTED' | 'REJECTED' | 'WAITLIST';
  submitted_at: string;
  motivation_statement: string;
  reviewer_id: string | null;
  review_notes: string | null;
  score: number | null;
  selection_decision_at: string | null;
  progress_percentage: number;
  completion_status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'DROPPED_OUT';
  certificate_issued: boolean;
}

export interface Certification {
  id: string;
  serial_number: string; // e.g. TSF-CERT-2026-B819
  user_id: string;
  talent_id: string;
  level: 'BRONZE' | 'ARGENT' | 'OR';
  domain: string;
  evaluator_id: string;
  evaluation_score: number;
  status: 'VALID' | 'REVOKED' | 'EXPIRED';
  issued_at: string;
  expires_at: string;
  revocation_reason: string | null;
  digital_signature: string;
  qr_code_url: string;
}

export interface CertificationVerification {
  id: string;
  certification_id: string;
  verifier_user_id: string | null;
  verifier_organization: string | null;
  verifier_ip: string | null;
  verified_at: string;
  is_valid: boolean;
}

export interface Organization {
  id: string;
  name: string;
  legal_type: 'PUBLIC' | 'PRIVATE' | 'ONG' | 'BILATERAL' | 'MULTILATERAL';
  country: string;
  website: string | null;
  logo_url: string | null;
  description: string;
  verified: boolean;
  created_at: string;
}

export interface Partner {
  id: string;
  organization_id: string;
  contact_user_id: string;
  tier: 'STRATEGIC' | 'OPERATIONAL' | 'FINANCIAL' | 'ACADEMIC';
  mou_signed_at: string | null;
  mou_expires_at: string | null;
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE';
  assigned_programs: string[];
}

export interface Opportunity {
  id: string;
  source_id: string | null;
  source_item_id: string | null;
  organization_id: string | null;
  title: string;
  slug: string;
  category: 'EMPLOI' | 'STAGE' | 'VOLONTARIAT' | 'BOURSE' | 'FORMATION' | 'FINANCEMENT' | 'CONCOURS' | 'APPEL À PROJETS' | 'ENTREPRENEURIAT' | 'AUTRE';
  description: string;
  organization_name: string;
  sector: string;
  country: string;
  city: string;
  remote: 'ON_SITE' | 'HYBRID' | 'REMOTE';
  experience_level: string;
  education_level: string;
  contract_type: string;
  salary: string | null;
  application_url: string;
  source_url: string;
  published_at: string;
  deadline: string | null;
  status: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'ARCHIVED';
  verification_status: 'VERIFIED' | 'PENDING' | 'REJECTED';
  created_at: string;
  updated_at: string;
}

export interface OpportunityApplication {
  id: string;
  opportunity_id: string;
  user_id: string;
  cv_document_id: string;
  cover_letter: string | null;
  status: 'SUBMITTED' | 'TRANSMITTED_TO_ORGANIZATION' | 'SHORTLISTED' | 'INTERVIEW' | 'HIRED' | 'REJECTED';
  applied_at: string;
  updated_at: string;
}

export interface OpportunityAlert {
  id: string;
  user_id: string;
  title: string;
  alert_type: string;
  keywords: string[];
  categories: string[];
  locations: string[];
  frequency: 'QUOTIDIEN' | 'HEBDOMADAIRE' | 'INSTANTANÉ';
  active: boolean;
  created_at: string;
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  category: string;
  content_type: string;
  summary: string;
  source_name: string;
  source_url: string | null;
  is_tsf_original: boolean;
  author: string | null;
  published_at: string;
  updated_at: string;
  tags: string[];
  content: string;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  author_id: string;
  published_at: string | null;
  status: 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'ARCHIVED';
  cover_image_url: string | null;
  views_count: number;
}

export interface Media {
  id: string;
  uploader_id: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
  storage_driver: string;
  storage_key: string;
  public_url: string;
  access_level: 'PUBLIC' | 'AUTHENTICATED' | 'RESTRICTED';
  created_at: string;
}

export interface Document {
  id: string;
  owner_id: string;
  document_type: 'CV' | 'PORTFOLIO' | 'CERTIFICATE' | 'DIPLOMA' | 'REPORT' | 'CONTRACT' | 'OTHER';
  title: string;
  file_media_id: string;
  status: 'ACTIVE' | 'ARCHIVED';
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  event_type: 'WEBINAR' | 'HACKATHON' | 'JOB_FAIR' | 'CONFERENCE' | 'CEREMONY';
  start_time: string;
  end_time: string;
  location: string;
  is_virtual: boolean;
  virtual_url: string | null;
  max_attendees: number;
  status: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'NEW_OPPORTUNITY' | 'DEADLINE_WARNING' | 'APPLICATION_UPDATE' | 'CERTIFICATION_ISSUED' | 'MESSAGE_RECEIVED' | 'PROGRAM_ALERT' | 'SYNC_STATUS';
  title: string;
  message: string;
  data: Record<string, any>;
  read: boolean;
  read_at: string | null;
  channel: 'IN_APP' | 'EMAIL' | 'BOTH';
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  subject: string;
  content: string;
  read: boolean;
  sent_at: string;
}

export interface ImpactMetric {
  id: string;
  metric_key: string;
  label: string;
  value: number;
  unit: string;
  period: string; // e.g. 2026-Q3
  recorded_at: string;
}

export interface Source {
  id: string;
  slug: string;
  name: string;
  operator_name: string;
  country: string;
  website: string;
  source_type: string;
  active: boolean;
  sync_frequency_hours: number;
  last_checked_at: string | null;
  last_success_at: string | null;
  last_error_at: string | null;
  sync_status: 'IDLE' | 'SYNCING' | 'SUCCESS' | 'ERROR';
}

export interface SourceItem {
  id: string;
  source_id: string;
  external_id: string | null;
  url: string;
  raw_title: string;
  raw_content: string;
  raw_html: string | null;
  published_at: string | null;
  collected_at: string;
  content_hash: string;
  status: 'COLLECTED' | 'PARSED' | 'NORMALIZED' | 'REJECTED';
}

export interface SyncJob {
  id: string;
  source_id: string;
  job_type: string;
  started_at: string;
  completed_at: string | null;
  status: 'SUCCESS' | 'PARTIAL' | 'FAILED' | 'RUNNING';
  items_found: number;
  items_created: number;
  items_updated: number;
  items_duplicates: number;
  items_rejected: number;
  error_message: string | null;
  retry_count: number;
  duration_ms: number;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  resource: string;
  resource_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  timestamp: string;
  metadata: Record<string, any>;
}
