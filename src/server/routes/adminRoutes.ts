import { Router, Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest, requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/rbac';
import { backupService } from '../services/backupService';
import { externalIntegrationService } from '../services/externalIntegrationService';
import { jobRunnerService } from '../services/jobRunnerService';
import { recordAuditLog } from '../middleware/auditLogger';

const router = Router();

// Protect all admin endpoints: require SUPER_ADMIN or ADMIN
router.use(requireAuth, requireRole('SUPER_ADMIN', 'ADMIN'));

// System overview
router.get('/overview', (req: AuthenticatedRequest, res: Response) => {
  const telemetry = db.getTelemetry();
  const integrations = externalIntegrationService.getIntegrationsStatus();
  const jobs = jobRunnerService.getAllJobs();
  const recentAudits = db.find('audit_logs').slice(0, 20);

  res.json({
    telemetry,
    integrations,
    background_jobs: jobs,
    recent_audits: recentAudits
  });
});

// Audit logs
router.get('/audit-logs', (req: AuthenticatedRequest, res: Response) => {
  const logs = db.find('audit_logs').slice(0, 100);
  res.json(logs);
});

// Trigger daily backup snapshot
router.post('/backups/snapshot', async (req: AuthenticatedRequest, res: Response) => {
  const snapshot = await backupService.createDailySnapshot();
  res.status(201).json({
    success: true,
    message: 'Snapshot de sauvegarde généré avec succès.',
    snapshot
  });
});

// Execute background job manually
router.post('/jobs/:jobName/execute', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const job = await jobRunnerService.executeJob(req.params.jobName as any);
    res.json({ success: true, job });
  } catch (e: any) {
    res.status(400).json({ error: 'JOB_EXECUTION_FAILED', message: e.message });
  }
});

// Update user role (Super Admin only)
router.put('/users/:id/role', requireRole('SUPER_ADMIN'), (req: AuthenticatedRequest, res: Response) => {
  const { role } = req.body;
  const user = db.update('users', req.params.id, { role });
  if (!user) return res.status(404).json({ error: 'NOT_FOUND', message: 'Utilisateur introuvable.' });

  recordAuditLog('USER_ROLE_CHANGED', 'USER', user.id, { newRole: role }, req);
  res.json(user);
});

export default router;
