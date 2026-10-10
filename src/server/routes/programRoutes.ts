import { Router, Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest, requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/rbac';
import { notificationService } from '../services/notificationService';
import { recordAuditLog } from '../middleware/auditLogger';

const router = Router();

// List active programs
router.get('/', (req, res) => {
  const programs = db.find('programs');
  res.json(programs);
});

// Single program details
router.get('/:id', (req, res) => {
  const program = db.findById('programs', req.params.id) || db.find('programs', p => p.slug === req.params.id)[0];
  if (!program) return res.status(404).json({ error: 'NOT_FOUND', message: 'Programme introuvable.' });
  res.json(program);
});

// Apply to a program
router.post('/:id/apply', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const programId = req.params.id;
  const program = db.findById('programs', programId);
  if (!program) return res.status(404).json({ error: 'NOT_FOUND', message: 'Programme introuvable.' });

  const existing = db.find('program_applications', a => a.program_id === program.id && a.user_id === user.id)[0];
  if (existing) {
    return res.status(400).json({ error: 'ALREADY_APPLIED', message: 'Vous avez déjà postulé à ce programme.' });
  }

  const app = db.insert('program_applications', {
    id: `papp-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    program_id: program.id,
    user_id: user.id,
    status: 'SUBMITTED',
    submitted_at: new Date().toISOString(),
    motivation_statement: req.body.motivation_statement || '',
    reviewer_id: null,
    review_notes: null,
    score: null,
    selection_decision_at: null,
    progress_percentage: 0,
    completion_status: 'NOT_STARTED',
    certificate_issued: false
  });

  await notificationService.notifyApplicationUpdate(user.id, program.title, 'Dossier soumis');
  recordAuditLog('PROGRAM_APPLICATION_SUBMITTED', 'PROGRAM_APPLICATION', app.id, { programId: program.id }, req);

  res.status(201).json(app);
});

// Selection review (Program managers only)
router.post('/applications/:appId/review', requireAuth, requireRole('SUPER_ADMIN', 'ADMIN', 'PROGRAM_MANAGER'), async (req: AuthenticatedRequest, res: Response) => {
  const { status, score, review_notes } = req.body;
  const appId = req.params.appId;

  const app = db.update('program_applications', appId, {
    status,
    score: score !== undefined ? Number(score) : undefined,
    review_notes,
    reviewer_id: req.user!.id,
    selection_decision_at: new Date().toISOString()
  });

  if (!app) return res.status(404).json({ error: 'NOT_FOUND', message: 'Candidature introuvable.' });

  const prog = db.findById('programs', app.program_id);
  await notificationService.notifyApplicationUpdate(app.user_id, prog?.title || 'Programme', status);
  recordAuditLog('PROGRAM_APPLICATION_REVIEWED', 'PROGRAM_APPLICATION', appId, { status, score }, req);

  res.json(app);
});

// Participant progress update
router.put('/applications/:appId/progress', requireAuth, requireRole('SUPER_ADMIN', 'ADMIN', 'PROGRAM_MANAGER'), (req: AuthenticatedRequest, res: Response) => {
  const { progress_percentage, completion_status } = req.body;
  const appId = req.params.appId;

  const app = db.update('program_applications', appId, {
    progress_percentage: Number(progress_percentage),
    completion_status
  });

  if (!app) return res.status(404).json({ error: 'NOT_FOUND', message: 'Candidature introuvable.' });
  res.json(app);
});

export default router;
