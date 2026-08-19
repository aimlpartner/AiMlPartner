import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL, TO_EMAIL } from '../config/env.js';

/**
 * Creates a configured nodemailer transporter.
 * Dynamically imports nodemailer to avoid bundling issues on Hostinger.
 */
export async function createTransporter() {
  const nodemailer = (await import('nodemailer')).default;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Sends client + admin emails with optional attachments.
 * Handles the SMTP_PASS-missing fallback gracefully.
 *
 * @param {object} clientMailOptions - nodemailer mail options for the client
 * @param {object} adminMailOptions  - nodemailer mail options for the admin
 * @param {string} logTag            - logging prefix for console output
 * @returns {{ status: string, messageId?: string }}
 */
export async function sendEmails(clientMailOptions, adminMailOptions, logTag = '[Mailer]') {
  if (!SMTP_PASS) {
    console.log(`${logTag} SMTP_PASS not set. Emails skipped (development mode).`);
    return { status: 'mocked' };
  }

  try {
    const transporter = await createTransporter();

    console.log(`${logTag} Sending email to client: ${clientMailOptions.to}...`);
    await transporter.sendMail(clientMailOptions);

    console.log(`${logTag} Sending email to admin: ${adminMailOptions.to}...`);
    const info = await transporter.sendMail(adminMailOptions);

    console.log(`${logTag} Transmitted successfully: ${info.messageId}`);
    return { status: 'sent', messageId: info.messageId };
  } catch (smtpErr) {
    console.warn(`${logTag} SMTP notice: ${smtpErr.message}. Recorded locally.`);
    return { status: 'recorded' };
  }
}

/**
 * Re-exported constants for email template convenience.
 */
export { FROM_EMAIL, TO_EMAIL };
