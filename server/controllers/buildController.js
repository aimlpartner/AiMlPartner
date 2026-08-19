import { getGoogleGenAI } from '../lib/gemini.js';
import { sendEmails, FROM_EMAIL, TO_EMAIL } from '../lib/mailer.js';
import { generateIcsContent } from '../lib/calendar.js';
import { MEETING_LINK, SMTP_USER } from '../config/env.js';
import { clientBuildEmail } from '../templates/clientBuildEmail.js';
import { adminBuildEmail } from '../templates/adminBuildEmail.js';

/**
 * POST /api/build-request
 *
 * Generates a custom AI Studio system prompt via Gemini based on the client's
 * playbook questionnaire answers, sends confirmation emails with ICS calendar invites.
 */
export async function buildRequestHandler(req, res) {
  const { email, name, company, departmentName, answers, playbookDetails, analysisResult, selectedDate, selectedTime } = req.body;

  if (!email || !departmentName || !answers || !playbookDetails) {
    return res.status(400).json({ error: 'Missing required client customization parameters.' });
  }

  const ai = getGoogleGenAI();
  if (!ai) {
    return res.status(500).json({ error: 'Gemini client not initialized. Please ensure GEMINI_API_KEY is configured on your server.' });
  }

  try {
    const answersText = answers.map((a, i) => `Q${i + 1}: ${a.question}\nA${i + 1}: ${a.answer}`).join('\n\n');
    const meetLink = MEETING_LINK;

    const systemPromptDraftInstruction = `You are a Principal AI Prompt Architect & Senior Systems Engineer.
The client (${name} from ${company}) wants to build a customized AI Agent for their "${departmentName}" department.

Here are the details of the audited Playbook workflow:
- Friction: ${playbookDetails.friction}
- Resolution Strategy: ${playbookDetails.resolution}
- Recommended Pipeline: ${playbookDetails.workflow}
- Target SaaS Stack: ${playbookDetails.toolStack ? playbookDetails.toolStack.join(', ') : 'Make.com, OpenAI'}
- Playbook Complexity: ${playbookDetails.complexity}
- Timeline: ${playbookDetails.timeline}

Here are the custom requirements clarified by the client's answers:
${answersText}

---
TASK:
Draft a highly detailed, professional-grade, copy-pasteable System Prompt to be used in Google AI Studio to build and configure this custom AI Agent.
The system prompt must be extremely comprehensive, precise, and professional. It must instruct the agent in every detail.

The system prompt must include the following sections inside a clean, pre-formatted markdown code block:
1. ROLE & FOCUS: Detailed persona, operational context, and overall target goal.
2. INPUT PROCESSING & PARSING: Explicit instructions on how to receive, validate, and parse raw input data structures (e.g. email texts, document files, webhook payloads).
3. SYSTEM CONSTRAINTS & BOUNDARIES: Explicit "do-not-do" operational rules, strict validation filters, and safety boundaries to prevent hallucinations or unauthorized data modification.
4. DETAILED EXECUTION STEPS: A step-by-step workflow of how the agent operates, processes data, extracts key values, and reasons.
5. SAAS INTEGRATION WEBHOOKS: Instructions on how to format outputs to trigger downstream integrations (like Make.com webhooks, HubSpot CRM logging, Slack alerts).
6. CRITICAL FALLBACK & ERROR HANDLERS: Detailed guidelines for human-in-the-loop escalation, handling corrupted files, edge cases, or invalid signatures.
7. TARGET OUTPUT SCHEMA: Precise JSON schema structure or text formats the agent must return, guaranteeing zero downstream pipeline integration failures.

Write a brief 1-sentence introduction, then output the complete Google AI Studio System Prompt inside a markdown code block so it can be easily copy-pasted.`;

    console.log('[Build Request] Calling Gemini to generate AI Studio System Prompt...');
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: systemPromptDraftInstruction
    });

    const systemPromptText = aiResponse.text;
    if (!systemPromptText) {
      throw new Error('Gemini returned empty text');
    }

    // Build email options
    const clientMailOptions = {
      from: `"AIMLpartner Customizer" <${FROM_EMAIL}>`,
      replyTo: 'info@aimlpartner.com',
      to: email,
      subject: 'Confirmed: Your Custom AI Agent Demo - AIMLpartner',
      html: clientBuildEmail({ name, departmentName, selectedDate, selectedTime, meetLink, systemPromptText }),
    };

    const adminMailOptions = {
      from: `"AIMLpartner Customizer" <${FROM_EMAIL}>`,
      replyTo: email,
      to: TO_EMAIL,
      subject: `[Agent Build + Demo Booked] Custom ${departmentName} Agent for ${company}`,
      html: adminBuildEmail({ name, email, company, departmentName, answers, analysisResult, selectedDate, selectedTime, meetLink, systemPromptText }),
    };

    // Generate ICS calendar invite
    let inviteAttachments = [];
    if (selectedDate && selectedTime) {
      try {
        const icsContent = generateIcsContent(name || 'Visitor', email, selectedDate, selectedTime, true, SMTP_USER, meetLink);
        inviteAttachments.push({
          filename: 'invite.ics',
          content: Buffer.from(icsContent, 'utf-8'),
          contentType: 'text/calendar; charset=utf-8; method=REQUEST'
        });
      } catch (icsErr) {
        console.error('[Build Request] Failed to generate ICS calendar invite:', icsErr);
      }
    }

    clientMailOptions.attachments = inviteAttachments;
    adminMailOptions.attachments = inviteAttachments;

    const result = await sendEmails(clientMailOptions, adminMailOptions, '[Build Request]');
    res.status(200).json({ ...result, meetLink, prompt: systemPromptText });
  } catch (err) {
    console.error('[Build Request] Exception:', err);
    res.status(500).json({ error: err.message });
  }
}
