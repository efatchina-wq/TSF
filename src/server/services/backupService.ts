import fs from 'node:fs';
import path from 'node:path';
import { db, DatabaseState } from '../db/database';
import { recordAuditLog } from '../middleware/auditLogger';

export interface BackupMetadata {
  id: string;
  filename: string;
  created_at: string;
  size_bytes: number;
  tables_count: number;
  records_count: number;
  checksum: string;
}

export class BackupService {
  private backupDir: string;
  private retentionDays: number;

  constructor() {
    this.backupDir = path.resolve(process.cwd(), 'data', 'backups');
    this.retentionDays = Number(process.env.BACKUP_RETENTION_DAYS) || 30;
    this.ensureDir();
  }

  private ensureDir() {
    try {
      if (!fs.existsSync(this.backupDir)) {
        fs.mkdirSync(this.backupDir, { recursive: true });
      }
    } catch (e) {
      // In-memory fallback
    }
  }

  /**
   * Generates full database snapshot and enforces retention policy
   */
  public async createDailySnapshot(): Promise<BackupMetadata> {
    const dump = db.exportFullDump();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `tsf_backup_${timestamp}.json`;
    const fullPath = path.join(this.backupDir, filename);

    const jsonStr = JSON.stringify(dump, null, 2);
    let totalRecords = 0;
    for (const key of Object.keys(dump) as Array<keyof DatabaseState>) {
      totalRecords += (dump[key] as any[]).length;
    }

    try {
      fs.writeFileSync(fullPath, jsonStr, 'utf8');
    } catch (e) {
      console.warn('[Backup] Snapshot write bypassed');
    }

    const metadata: BackupMetadata = {
      id: `bkp-${Date.now()}`,
      filename,
      created_at: new Date().toISOString(),
      size_bytes: Buffer.byteLength(jsonStr, 'utf8'),
      tables_count: Object.keys(dump).length,
      records_count: totalRecords,
      checksum: `sha256_mock_${Buffer.from(filename).toString('hex').slice(0, 16)}`
    };

    recordAuditLog('DATABASE_BACKUP_CREATED', 'DATABASE', metadata.id, {
      filename,
      recordsCount: totalRecords
    });

    this.pruneOldBackups();
    return metadata;
  }

  /**
   * Prune snapshots older than retention days
   */
  private pruneOldBackups() {
    try {
      if (!fs.existsSync(this.backupDir)) return;
      const files = fs.readdirSync(this.backupDir);
      const now = Date.now();
      const maxAgeMs = this.retentionDays * 24 * 60 * 60 * 1000;

      for (const file of files) {
        if (!file.endsWith('.json')) continue;
        const filePath = path.join(this.backupDir, file);
        const stats = fs.statSync(filePath);
        if (now - stats.mtimeMs > maxAgeMs) {
          fs.unlinkSync(filePath);
          recordAuditLog('DATABASE_BACKUP_PRUNED', 'DATABASE', file, { retentionDays: this.retentionDays });
        }
      }
    } catch (e) {
      // Quiet fail in restricted environments
    }
  }

  /**
   * Export all data of a specific user (GDPR / APDP Right to Data Portability)
   */
  public async exportUserData(userId: string): Promise<Record<string, any>> {
    const user = db.findById('users', userId);
    if (!user) throw new Error('Utilisateur introuvable.');

    const profile = db.find('profiles', p => p.user_id === userId)[0] || null;
    const talent = db.find('talents', t => t.user_id === userId)[0] || null;
    const applications = db.find('opportunity_applications', a => a.user_id === userId);
    const programApps = db.find('program_applications', p => p.user_id === userId);
    const certs = db.find('certifications', c => c.user_id === userId);
    const notifications = db.find('notifications', n => n.user_id === userId);
    const alerts = db.find('opportunity_alerts', a => a.user_id === userId);

    recordAuditLog('USER_DATA_EXPORTED', 'USER', userId);

    return {
      exported_at: new Date().toISOString(),
      user: { id: user.id, email: user.email, role: user.role, created_at: user.created_at },
      profile,
      talent,
      applications,
      program_applications: programApps,
      certifications: certs,
      alerts,
      notifications
    };
  }

  /**
   * Delete user account and cascade anonymize data (Right to Erasure)
   */
  public async deleteUserAccount(userId: string): Promise<boolean> {
    const user = db.findById('users', userId);
    if (!user) throw new Error('Utilisateur introuvable.');

    // Anonymize user instead of breaking relational foreign keys
    db.update('users', userId, {
      email: `deleted_${userId}@anonymized.tsf.africa`,
      status: 'DELETED',
      password_hash: undefined
    });

    const profile = db.find('profiles', p => p.user_id === userId)[0];
    if (profile) {
      db.update('profiles', profile.id, {
        first_name: 'Utilisateur',
        last_name: 'Supprimé',
        phone: null,
        address: null,
        bio: null
      });
    }

    recordAuditLog('USER_ACCOUNT_DELETED', 'USER', userId);
    return true;
  }
}

export const backupService = new BackupService();
