import { Router, Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';
import { storageService } from '../services/storageService';

const router = Router();

// Download / stream file with access control check
router.get('/:id/download', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const media = db.findById('media', req.params.id);
  if (!media) return res.status(404).json({ error: 'NOT_FOUND', message: 'Fichier introuvable.' });

  const allowed = storageService.canUserAccessMedia(req.user, media);
  if (!allowed) {
    return res.status(403).json({ error: 'ACCESS_DENIED', message: 'Accès non autorisé à ce document protégé.' });
  }

  res.setHeader('Content-Type', media.mime_type);
  res.setHeader('Content-Disposition', `attachment; filename="${media.filename}"`);
  res.send(Buffer.from(`TSF VAULT SECURE STREAM: ${media.filename} (Size: ${media.size_bytes} bytes)`));
});

// Mock/test upload endpoint
router.post('/upload', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'UNAUTHENTICATED', message: 'Connexion requise pour téléverser.' });
  }

  const { filename, category, mimeType, base64Content } = req.body;
  if (!filename || !category) {
    return res.status(400).json({ error: 'VALIDATION_ERROR', message: 'Fichier et catégorie requis.' });
  }

  const buffer = base64Content ? Buffer.from(base64Content, 'base64') : Buffer.from('Contenu de test');
  const result = await storageService.upload({
    uploaderId: req.user.id,
    category,
    filename,
    mimeType: mimeType || 'application/pdf',
    buffer
  });

  res.status(201).json(result);
});

export default router;
