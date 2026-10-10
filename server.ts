import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import apiRouter from './src/server/routes';
import { rateLimiter } from './src/server/middleware/rateLimiter';
import { authenticateToken } from './src/server/middleware/auth';
import { errorHandler } from './src/server/middleware/errorHandler';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Security & parsing
  app.use(rateLimiter);
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(authenticateToken);

  // Mount API endpoints
  app.use('/api', apiRouter);

  // Vite middleware in dev or static files in production
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true }
    });
    app.use(vite.middlewares);

    // SPA fallback: transform and serve index.html
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await vite.transformIndexHtml(
          url,
          await import('node:fs').then(fs => fs.promises.readFile(path.resolve(__dirname, 'index.html'), 'utf-8'))
        );
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  // Error handling middleware
  app.use(errorHandler);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TSF Production-Ready Backend] Server running on http://0.0.0.0:${PORT} in ${isProd ? 'production' : 'development'} mode.`);
  });
}

startServer().catch(err => {
  console.error('[TSF Server Fatal Error]', err);
  process.exit(1);
});
