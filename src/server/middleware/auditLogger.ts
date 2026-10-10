import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';
import { db } from '../db/database';

export function recordAuditLog(
  action: string,
  resource: string,
  resourceId?: string | null,
  metadata: Record<string, any> = {},
  req?: AuthenticatedRequest
) {
  const ip = req ? (req.ip || req.socket.remoteAddress || '127.0.0.1') : '127.0.0.1';
  const ua = req ? req.headers['user-agent'] || 'API Client' : 'System Engine';
  const userId = req?.user?.id || null;

  db.insert('audit_logs', {
    id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    user_id: userId,
    action,
    resource,
    resource_id: resourceId || null,
    ip_address: ip,
    user_agent: ua,
    timestamp: new Date().toISOString(),
    metadata
  });
}

/**
 * Express middleware to audit sensitive endpoints automatically
 */
export function auditMiddleware(action: string, resource: string) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Audit after completion of request
    res.on('finish', () => {
      if (res.statusCode < 400) {
        recordAuditLog(action, resource, req.params.id || null, {
          method: req.method,
          path: req.originalUrl,
          statusCode: res.statusCode
        }, req);
      }
    });
    next();
  };
}
