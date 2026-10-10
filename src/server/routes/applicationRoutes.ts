import { Router, Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest, requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/rbac';
import { notificationService } from '../services/notificationService';
import { recordAuditLog } from '../middleware/auditLogger';

const router = Router();

// My applications (Opportunity and Program)
router.get('/my', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const oppApps = db.find('opportunity_applications', a => a.user_id === userId);
  const progApps = db.find('program_applications', a => a.user_id === userId);
  res.json({ opportunity_applications: oppApps, program_applications: progApps });
});

// Admin review application
router.put('/opportunities/:id/status', requireAuth, requireRole('SUPER_ADMIN', 'ADMIN', 'TALENT_MANAGER'), async (req: AuthenticatedRequest, res: Response) => {
  const { status } = req.body;
  const app = db.update('opportunity_applications', req.params.id, { status });
  if (!app) return res.status(404).json({ error: 'NOT_FOUND', message: 'Candidature introuvable.' });

  const opp = db.findById('opportunities', app.opportunity_id);
  await notificationService.notifyApplicationUpdate(app.user_id, opp?.title || 'Opportunité', status);
  recordAuditLog('OPPORTUNITY_APPLICATION_UPDATED', 'OPPORTUNITY_APPLICATION', app.id, { status }, req);

  res.json(app);
});

export default router;
