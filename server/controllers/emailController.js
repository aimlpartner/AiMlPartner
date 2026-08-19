import { generatePdfReport } from '../lib/pdfReport.js';
import { formatCurrencyValue } from '../lib/currencies.js';
import { sendEmails, FROM_EMAIL, TO_EMAIL } from '../lib/mailer.js';
import { clientReportEmail } from '../templates/clientReportEmail.js';
import { adminReportEmail } from '../templates/adminReportEmail.js';

/**
 * POST /api/email-report
 *
 * Compiles a PDF diagnostic report, sends it to the client and admin via email.
 */
export async function emailReportHandler(req, res) {
  const { email, name, company, analysisResult, currencyCode = 'USD' } = req.body;

  if (!email || !analysisResult) {
    return res.status(400).json({ error: 'Missing metadata' });
  }

  try {
    console.log(`[Email Report] Compiling PDF for ${analysisResult.businessName} in ${currencyCode}...`);
    const pdfBuffer = await generatePdfReport(analysisResult, email, name || 'Visitor', company || 'N/A', currencyCode);

    const websiteUrl = req.headers.origin || 'https://aimlpartner.com';
    const pdfFilename = `operational-audit-${analysisResult.businessName.replace(/\s+/g, '-').toLowerCase()}.pdf`;

    const clientMailOptions = {
      from: `"AIMLpartner Diagnostics" <${FROM_EMAIL}>`,
      replyTo: 'info@aimlpartner.com',
      to: email,
      subject: `Your AI Operational Diagnostic Audit Report - ${analysisResult.businessName}`,
      html: clientReportEmail({ name, company, analysisResult, currencyCode, websiteUrl }),
      attachments: [{ filename: pdfFilename, content: pdfBuffer }],
    };

    const adminMailOptions = {
      from: `"AIMLpartner Diagnostics" <${FROM_EMAIL}>`,
      replyTo: email,
      to: TO_EMAIL,
      subject: `[AI Lead Generated] Operational Audit Report for ${analysisResult.businessName} (${name})`,
      html: adminReportEmail({ name, email, company, analysisResult, currencyCode }),
      attachments: [{ filename: pdfFilename, content: pdfBuffer }],
    };

    const result = await sendEmails(clientMailOptions, adminMailOptions, '[Email Report]');
    res.status(200).json(result);
  } catch (err) {
    console.error('[Email Report] Exception:', err);
    res.status(500).json({ error: err.message });
  }
}
