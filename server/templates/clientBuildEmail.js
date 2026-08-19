/**
 * Client-facing "Custom Agent Demo Booked" confirmation email.
 */
export function clientBuildEmail({ name, departmentName, selectedDate, selectedTime, meetLink, systemPromptText }) {
  return `
    <div style="font-family: 'Outfit', 'Inter', sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #1e293b; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; background: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);">
        <!-- Header banner -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px; text-align: center; border-bottom: 3px solid #6366f1;">
          <img src="https://aimlpartner.com/aimlpartner_logo.png" alt="AIMLpartner Logo" style="height: 45px; width: auto; display: block; margin: 0 auto;" />
          <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin-top: 20px; margin-bottom: 0; letter-spacing: -0.5px;">Custom Agent Demo Booked</h1>
          <p style="color: #a5b4fc; font-size: 12px; margin-top: 5px; margin-bottom: 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Customized AI Blueprint Locked In</p>
        </div>

        <!-- Body -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; line-height: 1.6; margin-top: 0; color: #0f172a;">Hello <strong>${name || 'Visitor'}</strong>,</p>
          <p style="font-size: 14px; line-height: 1.6; color: #475569;">Thank you for requesting a custom AI Agent build for your <strong>${departmentName}</strong> department. We are excited to build and present your tailored workflow solution.</p>
          
          <!-- Meeting Details Card -->
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 25px; margin: 30px 0; border: 1px solid #e2e8f0;">
            <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px;">🗓️ Live Demo Schedule Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 30%;">Date:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${selectedDate || 'To be scheduled'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Time:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${selectedTime || 'To be scheduled'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 30%;">Google Meet:</td>
                <td style="padding: 6px 0;"><a href="${meetLink}" style="color: #6366f1; text-decoration: none; font-weight: 600;">Join Live GMeet Session</a></td>
              </tr>
            </table>
            <p style="font-size: 11px; color: #64748b; margin-top: 15px; margin-bottom: 0; font-style: italic;">A separate Google Calendar invitation with details has been sent to your email.</p>
          </div>

          <!-- Google AI Studio System Prompt Blueprint -->
          <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 0; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Google AI Studio System Prompt</h3>
          <p style="font-size: 13px; color: #64748b; margin-bottom: 15px; line-height: 1.5;">You can copy and paste the prompt blueprint below directly into Google AI Studio system instructions to test the agent sandbox immediately:</p>
          <div style="background-color: #0f172a; color: #e2e8f0; font-family: monospace; font-size: 12px; padding: 20px; border-radius: 12px; overflow-x: auto; white-space: pre-wrap; border: 1px solid #1e293b; max-height: 350px; line-height: 1.5; margin-bottom: 30px;">
${systemPromptText}
          </div>

          <p style="font-size: 13.5px; line-height: 1.6; color: #475569; text-align: center;">Our engineering team has already started constructing a prototype sandboxed AI agent matching these instructions. We look forward to meeting you on the scheduled call!</p>
        </div>

        <!-- Footer -->
        <div style="padding: 30px; text-align: center; background-color: #f8fafc; border-top: 1px solid #f1f5f9;">
          <p style="font-size: 11px; color: #94a3b8; margin-top: 0; margin-bottom: 0;">&copy; 2026 AIMLpartner. All rights reserved. Contact: info@aimlpartner.com</p>
        </div>
      </div>
    </div>
  `;
}
