import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest, requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/rbac';
import { jobRunnerService } from '../services/jobRunnerService';
import { recordAuditLog } from '../middleware/auditLogger';

const router = Router();

// Full relational overview: sources, items, opportunities, alerts, sync jobs
router.get('/overview', (req: Request, res: Response) => {
  const sources = db.find('sources');
  const opportunities = db.find('opportunities');
  const recentJobs = db.find('sync_jobs').slice(0, 10);
  const resources = db.find('resources');

  res.json({
    sources_count: sources.length,
    opportunities_count: opportunities.length,
    resources_count: resources.length,
    recent_sync_jobs: recentJobs
  });
});

// Sources registry
router.get('/sources', (req: Request, res: Response) => {
  res.json(db.find('sources'));
});

// Single source with linked raw items and opportunities
router.get('/sources/:slug', (req: Request, res: Response) => {
  const source = db.find('sources', s => s.slug === req.params.slug)[0] || db.findById('sources', req.params.slug);
  if (!source) return res.status(404).json({ error: 'NOT_FOUND', message: 'Source introuvable.' });

  const rawItems = db.find('source_items', i => i.source_id === source.id);
  const opportunities = db.find('opportunities', o => o.source_id === source.id);

  res.json({
    source,
    raw_items_count: rawItems.length,
    opportunities_count: opportunities.length,
    opportunities
  });
});

// Trigger daily sync job manually
router.post('/sync/daily', requireAuth, requireRole('SUPER_ADMIN', 'ADMIN'), async (req: AuthenticatedRequest, res: Response) => {
  const result = await jobRunnerService.executeJob('daily_wikijob_sync');
  recordAuditLog('MANUAL_SYNC_TRIGGERED', 'WIKIJOB', 'daily_sync', {}, req);
  res.json({
    success: true,
    message: 'Synchronisation quotidienne des sources exécutée avec succès.',
    job: result
  });
});

// Alerts CRUD
router.get('/alerts', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const alerts = db.find('opportunity_alerts', a => a.user_id === req.user!.id);
  res.json(alerts);
});

router.post('/alerts', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const alert = db.insert('opportunity_alerts', {
    id: `alt-${Date.now()}`,
    user_id: user.id,
    title: req.body.title || 'Alerte Opportunités',
    alert_type: req.body.alert_type || 'Alerte emploi',
    keywords: req.body.keywords || [],
    categories: req.body.categories || [],
    locations: req.body.locations || ['Tout le Bénin'],
    frequency: req.body.frequency || 'QUOTIDIEN',
    active: true,
    created_at: new Date().toISOString()
  });

  res.status(201).json(alert);
});

export default router;
