import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import apiRouter from './server/routes/api.js';

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

  // Mount unified API router
  app.use('/api', apiRouter);

  // Health-check endpoint for hosting platforms
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  const isDev = process.env.NODE_ENV !== 'production';
  if (!isDev && fs.existsSync(distIndexPath)) {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    try {
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
    console.log(`Development server running on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal error during startup:', err);
  process.exit(1);
});
