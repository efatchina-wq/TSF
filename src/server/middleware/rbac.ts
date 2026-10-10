import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';
import { UserRole } from '../types/models';

/**
 * Role-Based Access Control (RBAC) middleware
 * Ensures the authenticated user possesses at least one of the allowed roles.
 */
export function requireRole(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'UNAUTHENTICATED',
        message: 'Authentification requise.'
      });
    }

    // SUPER_ADMIN has god-mode across all administrative endpoints
    if (req.user.role === 'SUPER_ADMIN') {
      return next();
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'PERMISSION_DENIED',
        message: `Action non autorisée pour le rôle « ${req.user.role} ». Rôles requis : ${allowedRoles.join(', ')}.`
      });
    }

    next();
  };
}
