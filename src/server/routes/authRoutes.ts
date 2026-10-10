import { Router, Request, Response } from 'express';
import { authService } from '../services/authService';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

router.post('/register', async (req: Request, res: Response, next) => {
  try {
    const { email, password, firstName, lastName, role, phone } = req.body;
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'VALIDATION_ERROR', message: 'Tous les champs obligatoires doivent être renseignés.' });
    }
    const result = await authService.register({ email, password, firstName, lastName, role, phone });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req: Request, res: Response, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'VALIDATION_ERROR', message: 'Email obligatoire.' });
    }
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Session fermée.' });
});

router.post('/reset-password', async (req: Request, res: Response, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'VALIDATION_ERROR', message: 'Email obligatoire.' });
    const result = await authService.resetPassword(email);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/me', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ authenticated: false, user: null });
  }
  res.json({ authenticated: true, user: req.user });
});

export default router;
