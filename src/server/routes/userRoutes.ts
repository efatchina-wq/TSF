import { Router, Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest, requireAuth } from '../middleware/auth';
import { backupService } from '../services/backupService';

const router = Router();

// Get profile of current user
router.get('/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const profile = db.find('profiles', p => p.user_id === user.id)[0] || null;
  res.json({ user, profile });
});

// Update profile of current user
router.put('/me/profile', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const existing = db.find('profiles', p => p.user_id === user.id)[0];
  if (!existing) {
    return res.status(404).json({ error: 'PROFILE_NOT_FOUND', message: 'Profil introuvable.' });
  }

  const updated = db.update('profiles', existing.id, req.body);
  res.json(updated);
});

// Data portability: export my data (GDPR / APDP)
router.get('/me/export', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const data = await backupService.exportUserData(req.user!.id);
  res.setHeader('Content-Disposition', `attachment; filename="tsf_data_export_${req.user!.id}.json"`);
  res.setHeader('Content-Type', 'application/json');
  res.json(data);
});

// Right to erasure: delete my account
router.delete('/me/account', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  await backupService.deleteUserAccount(req.user!.id);
  res.json({ success: true, message: 'Votre compte a été supprimé et vos données personnelles ont été anonymisées.' });
});

export default router;
