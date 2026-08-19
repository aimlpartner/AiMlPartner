import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { analyzeHandler } from '../controllers/analyzeController.js';
import { emailReportHandler } from '../controllers/emailController.js';
import { buildRequestHandler } from '../controllers/buildController.js';
import { bookCallHandler } from '../controllers/bookCallController.js';
import { GEMINI_API_KEY } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Core API endpoints
router.post('/analyze', analyzeHandler);
router.post('/email-report', emailReportHandler);
router.post('/build-request', buildRequestHandler);
router.post('/book-call', bookCallHandler);

// Debug & Health status
router.get('/debug-status', (_req, res) => {
  const envPath = path.join(__dirname, '..', '..', '.env');
  res.status(200).json({
    hasApiKey: !!GEMINI_API_KEY,
    apiKeyLength: GEMINI_API_KEY ? GEMINI_API_KEY.length : 0,
    apiKeyPrefix: GEMINI_API_KEY ? GEMINI_API_KEY.substring(0, 5) + '...' : 'none',
    cwd: process.cwd(),
    envFilePath: envPath,
    envFileExists: fs.existsSync(envPath),
    nodeVersion: process.version,
  });
});

export default router;
