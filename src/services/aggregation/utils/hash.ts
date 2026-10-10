/**
 * Deterministic hash generator for content deduplication and integrity check
 */
export function computeContentHash(content: string): string {
  let hash = 5381;
  const normalized = content.trim().toLowerCase().replace(/\s+/g, ' ');
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash * 33) ^ normalized.charCodeAt(i);
  }
  // Convert to positive hex representation
  const hex = (hash >>> 0).toString(16).padStart(8, '0');
  return `h-${hex}`;
}

export function computeEntityFingerprint(title: string, organization: string, deadline?: string | null): string {
  const normTitle = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
  const normOrg = organization.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
  const normDead = deadline ? deadline.trim() : 'no-deadline';
  return `${computeContentHash(normTitle)}_${computeContentHash(normOrg)}_${normDead}`;
}
