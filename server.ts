import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { analyzeHandler, emailReportHandler } from './src/api/analyze/route';

// Resolve and load .env using the absolute working directory path
dotenv.config({ path: path.join(process.cwd(), '.env') });

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || '0.0.0.0';
  const distPath = path.join(process.cwd(), 'dist');
  const distIndexPath = path.join(distPath, 'index.html');

  // Support JSON and urlencoded request bodies
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Register AI Auditing Engine route
  app.post('/api/analyze', analyzeHandler);
  app.post('/api/email-report', emailReportHandler);

  // Health-check endpoint for hosting platforms
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Always prefer serving the built output when available.
  // Hostinger sometimes doesn't set NODE_ENV=production, which would otherwise
  // cause Vite middleware to start and potentially crash.
  if (fs.existsSync(distIndexPath)) {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    try {
      // `vite` may not be installed in some production environments (it can be a devDependency).
      // Dynamic import prevents the server from crashing at startup when we're only serving `dist`.
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch (err) {
      console.error('[Server] Failed to start Vite middleware:', err);
      app.get('*', (_req, res) => {
        res
          .status(500)
          .send(
            'Server misconfiguration: missing build output. Please run `npm run build` before starting.'
          );
      });
    }
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal error during startup:', err);
  process.exit(1);
});
