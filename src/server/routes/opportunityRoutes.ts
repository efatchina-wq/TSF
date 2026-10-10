import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest, requireAuth } from '../middleware/auth';
import { recordAuditLog } from '../middleware/auditLogger';

const router = Router();

// List opportunities with filters
router.get('/', (req: Request, res: Response) => {
  const { category, sector, city, search } = req.query;
  let opps = db.find('opportunities');

  if (category) opps = opps.filter(o => o.category === category);
  if (sector) opps = opps.filter(o => o.sector.toLowerCase().includes((sector as string).toLowerCase()));
  if (city) opps = opps.filter(o => o.city.toLowerCase().includes((city as string).toLowerCase()));
  if (search) {
    const q = (search as string).toLowerCase();
    opps = opps.filter(o => o.title.toLowerCase().includes(q) || o.description.toLowerCase().includes(q) || o.organization_name.toLowerCase().includes(q));
  }

  res.json(opps);
});

// Single opportunity detail
router.get('/:id', (req: Request, res: Response) => {
  const opp = db.findById('opportunities', req.params.id) || db.find('opportunities', o => o.slug === req.params.id)[0];
  if (!opp) return res.status(404).json({ error: 'NOT_FOUND', message: 'Opportunité introuvable.' });
  res.json(opp);
});

// Apply to opportunity
router.post('/:id/apply', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const oppId = req.params.id;
  const opp = db.findById('opportunities', oppId);
  if (!opp) return res.status(404).json({ error: 'NOT_FOUND', message: 'Opportunité introuvable.' });

  const existing = db.find('opportunity_applications', a => a.opportunity_id === opp.id && a.user_id === user.id)[0];
  if (existing) {
    return res.status(400).json({ error: 'ALREADY_APPLIED', message: 'Candidature déjà transmise pour cet avis.' });
  }

  const app = db.insert('opportunity_applications', {
    id: `oapp-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    opportunity_id: opp.id,
    user_id: user.id,
    cv_document_id: req.body.cv_document_id || 'doc-default',
    cover_letter: req.body.cover_letter || null,
    status: 'SUBMITTED',
    applied_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  recordAuditLog('OPPORTUNITY_APPLIED', 'OPPORTUNITY_APPLICATION', app.id, { oppId: opp.id }, req);
  res.status(201).json(app);
});

export default router;
