import { Router, Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest, requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/rbac';
import { recordAuditLog } from '../middleware/auditLogger';

const router = Router();

// Public list of organizations and verified partners
router.get('/', (req, res) => {
  const organizations = db.find('organizations');
  const partners = db.find('partners');
  res.json({ organizations, partners });
});

// Partner dashboard
router.get('/me', requireAuth, requireRole('SUPER_ADMIN', 'ADMIN', 'PARTNER'), (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const partner = db.find('partners', p => p.contact_user_id === user.id)[0];
  const org = partner ? db.findById('organizations', partner.organization_id) : null;
  const programs = partner ? db.find('programs', p => partner.assigned_programs.includes(p.id)) : [];
  const metrics = db.find('impact_metrics');

  res.json({
    partner,
    organization: org,
    assigned_programs: programs,
    impact_metrics: metrics
  });
});

// Create new partner organization (Admin only)
router.post('/organizations', requireAuth, requireRole('SUPER_ADMIN', 'ADMIN'), (req: AuthenticatedRequest, res: Response) => {
  const org = db.insert('organizations', {
    id: `org-${Date.now()}`,
    name: req.body.name,
    legal_type: req.body.legal_type || 'PRIVATE',
    country: req.body.country || 'Bénin',
    website: req.body.website || null,
    logo_url: req.body.logo_url || null,
    description: req.body.description || '',
    verified: true,
    created_at: new Date().toISOString()
  });

  recordAuditLog('ORGANIZATION_CREATED', 'ORGANIZATION', org.id, { name: org.name }, req);
  res.status(201).json(org);
});

export default router;
