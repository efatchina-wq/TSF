import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest, requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/rbac';
import { recordAuditLog } from '../middleware/auditLogger';

const router = Router();

// List public wiki resources and guides
router.get('/', (req, res) => {
  const { category, type } = req.query;
  let resources = db.find('resources', r => r.status === 'PUBLISHED');

  if (category) resources = resources.filter(r => r.category === category);
  if (type) resources = resources.filter(r => r.content_type === type);

  res.json(resources);
});

// Single resource detail
router.get('/:slug', (req, res) => {
  const resource = db.find('resources', r => r.slug === req.params.slug)[0] || db.findById('resources', req.params.slug);
  if (!resource) return res.status(404).json({ error: 'NOT_FOUND', message: 'Ressource introuvable.' });
  res.json(resource);
});

// Editorial creation (CMS Admin/Editor only)
router.post('/', requireAuth, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR'), (req: AuthenticatedRequest, res: Response) => {
  const now = new Date().toISOString();
  const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const resource = db.insert('resources', {
    id: `res-${Date.now()}`,
    slug,
    title: req.body.title,
    category: req.body.category || 'EMPLOI',
    content_type: req.body.content_type || 'GUIDE',
    summary: req.body.summary || '',
    source_name: req.body.source_name || 'TSF Éditions',
    source_url: req.body.source_url || null,
    is_tsf_original: !!req.body.is_tsf_original,
    author: req.body.author || 'Équipe TSF',
    published_at: now,
    updated_at: now,
    tags: req.body.tags || [],
    content: req.body.content || '',
    status: req.body.status || 'PUBLISHED'
  });

  recordAuditLog('RESOURCE_CREATED', 'RESOURCE', resource.id, { slug }, req);
  res.status(201).json(resource);
});

export default router;
