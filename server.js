import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Hostinger assigns the port via the PORT env variable.
  // Passenger (Hostinger's Node.js app server) communicates through this port.
  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || '0.0.0.0';

  const distPath = path.join(__dirname, 'dist');
  const distIndexPath = path.join(distPath, 'index.html');

  // Health-check endpoint — useful for uptime monitors & Hostinger diagnostics
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  if (fs.existsSync(distIndexPath)) {
    console.log('[Server] Serving production build from dist/');

    // Serve static assets with aggressive caching (hashed filenames = safe to cache)
    app.use(
      '/assets',
      express.static(path.join(distPath, 'assets'), {
        maxAge: '1y',
        immutable: true,
      })
    );

    // Serve remaining static files (index.html, .htaccess, etc.) with no-cache
    app.use(express.static(distPath, { maxAge: 0 }));

    // SPA fallback: any route that doesn't match a static file returns index.html
    app.get('*', (_req, res) => {
      res.sendFile(distIndexPath);
    });
  } else {
    // No build output found — return a helpful error instead of crashing
    console.error('[Server] ERROR: dist/index.html not found!');
    console.error('[Server] Run `npm run build` first, or check that postinstall ran successfully.');
    app.get('*', (_req, res) => {
      res
        .status(500)
        .send(
          'Server misconfiguration: missing build output. Please run `npm run build` before starting.'
        );
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[Server] Running on http://${HOST}:${PORT}`);
    console.log(`[Server] NODE_ENV=${process.env.NODE_ENV || 'not set'}`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal error during startup:', err);
  process.exit(1);
});
