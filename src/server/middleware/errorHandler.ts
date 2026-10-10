import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.status || err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';

  console.error(`[API Error] ${req.method} ${req.url}:`, err);

  res.status(statusCode).json({
    error: err.name || 'INTERNAL_SERVER_ERROR',
    message: err.message || 'Une erreur inattendue est survenue.',
    ...(isProd ? {} : { stack: err.stack })
  });
}
