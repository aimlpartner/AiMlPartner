import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';
import { PORT, HOST } from './config/env.js';
import { startBlogScheduler } from './services/blogScheduler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

export async function startServer() {
  const app = express();

  // Resiliently locate dist/ directory
  const candidateDirs = [
    path.join(rootDir, 'dist'),
    path.join(process.cwd(), 'dist'),
    path.resolve('dist'),
    path.join(rootDir, 'public_html'),
    path.join(process.cwd(), 'public_html')
  ];

  let distPath = candidateDirs[0];
  let distIndexPath = path.join(distPath, 'index.html');

  for (const dir of candidateDirs) {
    const candidateFile = path.join(dir, 'index.html');
    if (fs.existsSync(candidateFile)) {
      distPath = dir;
      distIndexPath = candidateFile;
      break;
    }
  }

  // Health-check endpoint for uptime monitors
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  if (fs.existsSync(distIndexPath)) {
    console.log(`[Server] Serving production build from: ${distPath}`);

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

    // SPA fallback with safe file streaming & error trapping
    app.get('*', (_req, res, next) => {
      res.sendFile(distIndexPath, (err) => {
        if (err) {
          if (!res.headersSent) {
            console.error('[Server] sendFile error:', err.message);
            try {
              const html = fs.readFileSync(distIndexPath, 'utf8');
              res.status(200).set('Content-Type', 'text/html').send(html);
            } catch (readErr) {
              next(err);
            }
          }
        }
      });
    });
  } else {
    console.warn('[Server] Notice: dist/index.html not found in candidates:', candidateDirs);
    // Never send 500 here: LiteSpeed translates 500 into 503 "The server is temporarily busy"
    app.get('*', (_req, res) => {
      res.status(200).set('Content-Type', 'text/html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AiMlPartner - Initializing Deployment</title>
  <style>
    body { background: #07090e; color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .box { text-align: center; max-width: 480px; padding: 2.5rem; background: #0f1422; border: 1px solid #1e293b; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
    h1 { font-size: 1.4rem; margin: 0 0 0.75rem; color: #38bdf8; font-weight: 600; }
    p { color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin: 0 0 1.5rem; }
    .spin { display: inline-block; width: 36px; height: 36px; border: 3px solid rgba(56,189,248,0.2); border-top-color: #38bdf8; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 1.25rem; }
    .btn { display: inline-block; padding: 0.6rem 1.25rem; background: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-size: 0.9rem; font-weight: 500; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="box">
    <div class="spin"></div>
    <h1>AIMLpartner is Updating</h1>
    <p>The latest build is synchronizing. Please refresh in a few moments.</p>
    <a href="/" class="btn" onclick="window.location.reload(); return false;">Refresh Now</a>
  </div>
</body>
</html>`);
    });
  }

  // Global safety error middleware to prevent unhandled 5xx dropping to LiteSpeed
  app.use((err, _req, res, _next) => {
    console.error('[Server Unhandled Error]', err);
    if (!res.headersSent) {
      res.status(200).set('Content-Type', 'text/html').send(`<!DOCTYPE html><html><body style="background:#07090e;color:#fff;font-family:sans-serif;text-align:center;padding-top:20vh;"><h2>AiMlPartner Service Initializing</h2><p>Please refresh the page in 5 seconds.</p></body></html>`);
    }
  });

  app.listen(PORT, HOST, () => {
    console.log(`[Server] Production server running on http://${HOST}:${PORT}`);
    console.log(`[Server] NODE_ENV=${process.env.NODE_ENV || 'production'}`);
    startBlogScheduler();
  });
}
