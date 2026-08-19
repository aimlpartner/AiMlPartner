import { sendEmails, FROM_EMAIL, TO_EMAIL } from '../lib/mailer.js';
import { generateIcsContent } from '../lib/calendar.js';
import { MEETING_LINK, SMTP_USER } from '../config/env.js';
import { clientBookCallEmail } from '../templates/clientBookCallEmail.js';
import { adminBookCallEmail } from '../templates/adminBookCallEmail.js';

/**
 * POST /api/book-call
 *
 * Books a 1-on-1 strategy session or consultation call.
 * Sends confirmation emails to client & admin with attached ICS calendar invite.
 */
export async function bookCallHandler(req, res) {
  const { name, email, company, scope, details, selectedDate, selectedTime, source } = req.body;

  if (!email || !selectedDate || !selectedTime) {
    return res.status(400).json({ error: 'Missing required booking details (email, date, or time).' });
  }

  try {
    const meetLink = MEETING_LINK;

    const clientMailOptions = {
      from: `"AIMLpartner Consultation" <${FROM_EMAIL}>`,
      replyTo: 'info@aimlpartner.com',
      to: email,
      subject: 'Confirmed: 1-on-1 AI Strategy Session - AIMLpartner',
      html: clientBookCallEmail({ name, selectedDate, selectedTime, scope, meetLink }),
    };

    const adminMailOptions = {
      from: `"AIMLpartner Consultation" <${FROM_EMAIL}>`,
      replyTo: email,
      to: TO_EMAIL,
      subject: `[Consultation Booked] Strategy Call scheduled by ${company || 'Visitor'} (${name})`,
      html: adminBookCallEmail({ name, email, company, scope, details, selectedDate, selectedTime, meetLink, source }),
    };

    let inviteAttachments = [];
    if (selectedDate && selectedTime) {
      try {
        const icsContent = generateIcsContent(name || 'Visitor', email, selectedDate, selectedTime, false, SMTP_USER, meetLink);
        inviteAttachments.push({
          filename: 'invite.ics',
          content: Buffer.from(icsContent, 'utf-8'),
          contentType: 'text/calendar; charset=utf-8; method=REQUEST',
        });
      } catch (icsErr) {
        console.error('[Book Call] Failed to generate ICS calendar invite:', icsErr);
      }
    }

    clientMailOptions.attachments = inviteAttachments;
    adminMailOptions.attachments = inviteAttachments;

    const result = await sendEmails(clientMailOptions, adminMailOptions, '[Book Call]');
    return res.status(200).json({ ...result, meetLink });
  } catch (err) {
    console.error('[Book Call] Exception:', err);
    return res.status(500).json({ error: 'Failed to book call: ' + err.message });
  }
}
