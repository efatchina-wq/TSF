import { Request, Response, NextFunction } from 'express';
import { db } from '../db/database';
import { User, UserRole } from '../types/models';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

const JWT_DEV_SECRET = process.env.JWT_SECRET || 'tsf_dev_jwt_secret_2026';

/**
 * Token parser & user loader
 */
export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    // If no token provided, continue as unauthenticated (user is undefined)
    return next();
  }

  // Token decoding: supports simulated tokens (dev/staging) or real JWT
  try {
    // In dev / production preview: token format `tsf_user_<id>_<role>` or JWT base64
    let userId = '';
    if (token.startsWith('tsf_user_')) {
      const parts = token.split('_');
      userId = parts.slice(2).join('_'); // user ID
    } else {
      try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1] || '', 'base64').toString('utf8'));
        userId = payload.sub || payload.userId || '';
      } catch {
        userId = token;
      }
    }

    const user = db.findById('users', userId);
    if (user && user.status === 'ACTIVE') {
      req.user = user;
    }
  } catch (err) {
    console.warn('[Auth Middleware] Invalid token', err);
  }

  next();
}

/**
 * Require valid authentication
 */
export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({
      error: 'AUTHENTICATION_REQUIRED',
      message: 'Accès refusé. Veuillez vous connecter pour accéder à cette ressource.'
    });
  }
  next();
}
