import { Request, Response, NextFunction } from 'express';

interface ClientStats {
  requests: number[];
}

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000; // 1 min
const maxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 120; // 120 req / min

const clientHits = new Map<string, ClientStats>();

// Auto-cleanup every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, stats] of clientHits.entries()) {
    stats.requests = stats.requests.filter(t => now - t < windowMs);
    if (stats.requests.length === 0) {
      clientHits.delete(ip);
    }
  }
}, 300000);

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  let stats = clientHits.get(ip);
  if (!stats) {
    stats = { requests: [] };
    clientHits.set(ip, stats);
  }

  // Filter requests within current window
  stats.requests = stats.requests.filter(t => now - t < windowMs);

  if (stats.requests.length >= maxRequests) {
    res.setHeader('Retry-After', Math.ceil(windowMs / 1000));
    return res.status(429).json({
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Trop de requêtes effectuées. Veuillez patienter avant de réessayer.'
    });
  }

  stats.requests.push(now);
  res.setHeader('X-RateLimit-Limit', maxRequests);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - stats.requests.length));
  next();
}
