import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest, requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/rbac';
import { notificationService } from '../services/notificationService';
import { recordAuditLog } from '../middleware/auditLogger';

const router = Router();

// Public online verification of certificate authenticity by serial number
router.get('/verify', (req: Request, res: Response) => {
  const serial = req.query.serial as string;
  if (!serial) {
    return res.status(400).json({ error: 'SERIAL_REQUIRED', message: 'Numéro de série requis.' });
  }

  const cert = db.find('certifications', c => c.serial_number.toLowerCase() === serial.toLowerCase().trim())[0];
  const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';

  if (!cert) {
    db.insert('certification_verifications', {
      id: `verif-${Date.now()}`,
      certification_id: 'UNKNOWN',
      verifier_user_id: null,
      verifier_organization: null,
      verifier_ip: ip,
      verified_at: new Date().toISOString(),
      is_valid: false
    });
    return res.status(404).json({
      valid: false,
      message: `Aucun certificat ne correspond au numéro « ${serial} ».`
    });
  }

  const talent = db.findById('talents', cert.talent_id);
  const profile = talent ? db.find('profiles', p => p.user_id === talent.user_id)[0] : null;

  db.insert('certification_verifications', {
    id: `verif-${Date.now()}`,
    certification_id: cert.id,
    verifier_user_id: null,
    verifier_organization: (req.query.org as string) || null,
    verifier_ip: ip,
    verified_at: new Date().toISOString(),
    is_valid: cert.status === 'VALID'
  });

  res.json({
    valid: cert.status === 'VALID',
    status: cert.status,
    serial_number: cert.serial_number,
    level: cert.level,
    domain: cert.domain,
    issued_at: cert.issued_at,
    expires_at: cert.expires_at,
    recipient_name: profile ? `${profile.first_name} ${profile.last_name}` : 'Talent Certifié TSF',
    digital_signature: cert.digital_signature
  });
});

// Issue certificate (Evaluator / Verifier / Admin only)
router.post('/issue', requireAuth, requireRole('SUPER_ADMIN', 'ADMIN', 'VERIFIER', 'EVALUATOR'), async (req: AuthenticatedRequest, res: Response) => {
  const { talent_id, level, domain, evaluation_score } = req.body;
  const talent = db.findById('talents', talent_id);
  if (!talent) return res.status(404).json({ error: 'TALENT_NOT_FOUND', message: 'Talent introuvable.' });

  const serial = `TSF-CERT-2026-${level[0]}${Math.floor(100 + Math.random() * 900)}`;
  const now = new Date();
  const expires = new Date(now.getTime() + 2 * 365 * 24 * 3600 * 1000); // 2 years

  const cert = db.insert('certifications', {
    id: `cert-${Date.now()}`,
    serial_number: serial,
    user_id: talent.user_id,
    talent_id: talent.id,
    level,
    domain: domain || 'Excellence Professionnelle',
    evaluator_id: req.user!.id,
    evaluation_score: Number(evaluation_score) || 85,
    status: 'VALID',
    issued_at: now.toISOString(),
    expires_at: expires.toISOString(),
    revocation_reason: null,
    digital_signature: `sig_ed25519_tsf_${Date.now()}`,
    qr_code_url: `/certification/verify?serial=${serial}`
  });

  db.update('talents', talent.id, {
    certification_status: level,
    certification_id: cert.id
  });

  await notificationService.notifyCertificationIssued(talent.user_id, level, serial);
  recordAuditLog('CERTIFICATE_ISSUED', 'CERTIFICATION', cert.id, { serial, level }, req);

  res.status(201).json(cert);
});

// Revoke certificate
router.post('/:id/revoke', requireAuth, requireRole('SUPER_ADMIN', 'ADMIN'), (req: AuthenticatedRequest, res: Response) => {
  const { reason } = req.body;
  const cert = db.update('certifications', req.params.id, {
    status: 'REVOKED',
    revocation_reason: reason || 'Non-conformité déontologique constatée.'
  });

  if (!cert) return res.status(404).json({ error: 'NOT_FOUND', message: 'Certificat introuvable.' });
  recordAuditLog('CERTIFICATE_REVOKED', 'CERTIFICATION', cert.id, { reason }, req);

  res.json(cert);
});

export default router;
