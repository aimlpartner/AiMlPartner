import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve .env from project root (two levels up from server/config/)
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

/**
 * Centralized environment configuration.
 * All env-derived constants live here — no process.env scattered across files.
 */
export const PORT = Number(process.env.PORT) || 3000;
export const HOST = process.env.HOST || '0.0.0.0';

// Gemini AI
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// SMTP / Email
export const SMTP_HOST = process.env.SMTP_HOST || 'smtp.hostinger.com';
export const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
export const SMTP_USER = process.env.SMTP_USER || 'info@aimlpartner.com';
export const SMTP_PASS = process.env.SMTP_PASS;
export const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER;
export const TO_EMAIL = process.env.TO_EMAIL || 'info@aimlpartner.com, porwaldeepak22@gmail.com';

// Meeting
export const MEETING_LINK = process.env.MEETING_LINK || 'https://meet.google.com/qeh-diqr-pek';
