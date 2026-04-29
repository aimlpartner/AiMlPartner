import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || '0.0.0.0';
  const distPath = path.join(process.cwd(), 'dist');
  const distIndexPath = path.join(distPath, 'index.html');

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

startServer();
