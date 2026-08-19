import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';
import { PORT, HOST } from './config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

export async function startServer() {
  const app = express();

  const distPath = path.join(rootDir, 'dist');
  const distIndexPath = path.join(distPath, 'index.html');

  // Support JSON and urlencoded request bodies
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Mount API router
  app.use('/api', apiRouter);

  // Health-check endpoint for uptime monitors
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  if (fs.existsSync(distIndexPath)) {
    console.log('[Server] Serving production build from dist/');

    // Cache static assets aggressively
    app.use(
      '/assets',
      express.static(path.join(distPath, 'assets'), {
        maxAge: '1y',
        immutable: true,
      })
    );

    // Serve remaining static files
    app.use(express.static(distPath, { maxAge: 0 }));

    // SPA fallback
    app.get('*', (_req, res) => {
      res.sendFile(distIndexPath);
    });
  } else {
    console.error('[Server] Notice: dist/index.html not found (run `npm run build` for production).');
    app.get('*', (_req, res) => {
      res.status(500).send('Missing production build output. Please run `npm run build` before starting production server.');
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[Server] Production server running on http://${HOST}:${PORT}`);
    console.log(`[Server] NODE_ENV=${process.env.NODE_ENV || 'production'}`);
  });
}
