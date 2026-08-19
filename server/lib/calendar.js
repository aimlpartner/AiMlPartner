import { TO_EMAIL } from '../config/env.js';

/**
 * Parses a human-friendly date string (e.g. "Wed, Jun 10, 2026") and time
 * string (e.g. "2:30 PM") into a JavaScript Date object.
 */
export function parseDateTime(dateStr, timeStr) {
  try {
    const parts = dateStr.split(',');
    if (parts.length < 3) return new Date();

    const monthDay = parts[1].trim();
    const year = parts[2].trim();

    const timeParts = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    if (!timeParts) return new Date();

    let hour = parseInt(timeParts[1], 10);
    const minute = parseInt(timeParts[2], 10);
    const ampm = timeParts[3].toUpperCase();

    if (ampm === 'PM' && hour < 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;

    const months = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
      january: 0, february: 1, march: 2, april: 3,
      june: 5, july: 6, august: 7,
      september: 8, october: 9, november: 10, december: 11
    };

    const monthParts = monthDay.split(' ');
    const monthName = monthParts[0].substring(0, 3).toLowerCase();
    const day = parseInt(monthParts[1], 10);
    const monthIndex = months[monthName] !== undefined ? months[monthName] : 5;

    return new Date(parseInt(year, 10), monthIndex, day, hour, minute, 0);
  } catch (err) {
    console.error('[Calendar] Error parsing date/time:', err);
    return new Date();
  }
}

/**
 * Formats a Date into ICS DTSTART/DTEND format (YYYYMMDDTHHmmss).
 */
export function formatIcsDateTime(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${y}${m}${d}T${h}${min}${s}`;
}

/**
 * Generates a complete ICS calendar invite for a consultation or demo.
 *
 * @param {string}  name         - Attendee name
 * @param {string}  email        - Attendee email
 * @param {string}  selectedDate - Human-readable date string
 * @param {string}  selectedTime - Human-readable time string
 * @param {boolean} isDemo       - true = 90-min demo, false = 30-min consultation
 * @param {string}  smtpUser     - Organizer email
 * @param {string}  meetLink     - Google Meet link
 * @returns {string} ICS file content
 */
export function generateIcsContent(name, email, selectedDate, selectedTime, isDemo, smtpUser, meetLink) {
  const startDate = parseDateTime(selectedDate, selectedTime);
  const durationMinutes = isDemo ? 90 : 30;
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

  const dtStart = formatIcsDateTime(startDate);
  const dtEnd = formatIcsDateTime(endDate);
  const dtStamp = formatIcsDateTime(new Date()) + 'Z';
  const meetingTitle = isDemo ? 'Custom AI Agent Demo - AIMLpartner' : '1-on-1 AI Strategy Session - AIMLpartner';
  const meetingDesc = isDemo
    ? `Your 90-minute Custom AI Agent Prototype Walkthrough with AIMLpartner.\\nJoin via Google Meet: ${meetLink}`
    : `Your 30-minute AI Strategy Consultation with AIMLpartner.\\nJoin via Google Meet: ${meetLink}`;

  const rawAdminEmails = (TO_EMAIL)
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);
  const primaryOrganizer = 'info@aimlpartner.com';

  const adminAttendees = rawAdminEmails.map((adminEmail) =>
    `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;RSVP=FALSE;CN="AIMLpartner Team":MAILTO:${adminEmail}`
  );

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AIMLpartner//NONSGML Consultation Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${Date.now()}-${isDemo ? 'demo' : 'consult'}@aimlpartner.com`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${meetingTitle}`,
    `DESCRIPTION:${meetingDesc}`,
    `LOCATION:${meetLink}`,
    `ORGANIZER;CN="AIMLpartner":MAILTO:${primaryOrganizer}`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN="${name || 'Visitor'}":MAILTO:${email}`,
    ...adminAttendees,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}
