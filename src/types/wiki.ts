export type WikiCategory =
  | 'EMPLOI'
  | 'STAGE'
  | 'VOLONTARIAT'
  | 'FORMATION'
  | 'ENTREPRENEURIAT'
  | 'FINANCEMENT'
  | 'BOURSES'
  | 'CONCOURS'
  | 'CARRIÈRE'
  | 'CV'
  | 'ENTRETIEN'
  | 'LINKEDIN'
  | 'DIGITAL'
  | 'ADMINISTRATION'
  | 'MOBILITÉ'
  | 'ÉTUDES'
  | 'ORGANISATIONS';

export type WikiContentType =
  | 'GUIDE'
  | 'ASTUCE'
  | 'TUTORIEL'
  | 'CHECKLIST'
  | 'RESSOURCE'
  | 'SITE UTILE'
  | 'ACTUALITÉ'
  | 'DOSSIER'
  | 'FAQ';

export interface WikiChecklistItem {
  id: string;
  text: string;
  details?: string;
  done?: boolean;
}

export interface WikiCuratedSite {
  name: string;
  url: string;
  description: string;
  badge?: string;
}

export interface WikiSourceAttribution {
  name: string;
  url?: string;
  is_tsf_original: boolean; // TSF Original editorial vs External attributed
  author?: string;
}

export interface WikiResource {
  id: string;
  slug: string;
  title: string;
  category: WikiCategory;
  content_type: WikiContentType;
  summary: string;
  source: WikiSourceAttribution;
  published_at: string;
  updated_at: string;
  url: string;
  tags: string[];
  content: string;
  checklist_items?: WikiChecklistItem[];
  curated_sites?: WikiCuratedSite[];
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  featured?: boolean;
  read_time_minutes?: number;
  views_count?: number;
}
