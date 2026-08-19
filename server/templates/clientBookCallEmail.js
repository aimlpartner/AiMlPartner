/**
 * Client-facing consultation booking confirmation email.
 */
export function clientBookCallEmail({ name, selectedDate, selectedTime, scope, meetLink }) {
  return `
    <div style="font-family: 'Outfit', 'Inter', sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #1e293b; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; background: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);">
        <!-- Header banner -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px; text-align: center; border-bottom: 3px solid #FF5500;">
          <img src="https://aimlpartner.com/aimlpartner_logo.png" alt="AIMLpartner Logo" style="height: 45px; width: auto; display: block; margin: 0 auto;" />
          <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin-top: 20px; margin-bottom: 0; letter-spacing: -0.5px;">1-on-1 Session Confirmed</h1>
          <p style="color: #FF5500; font-size: 12px; margin-top: 5px; margin-bottom: 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">AI Operational Strategy</p>
        </div>

        <!-- Body -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; line-height: 1.6; margin-top: 0; color: #0f172a;">Hello <strong>${name || 'Visitor'}</strong>,</p>
          <p style="font-size: 14px; line-height: 1.6; color: #475569;">Your free 1-on-1 AI Strategy consultation has been successfully booked! We look forward to analyzing your operational bottlenecks together.</p>
          
          <!-- Meeting Details Card -->
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 25px; margin: 30px 0; border: 1px solid #e2e8f0;">
            <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px;">🗓️ Meeting Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 30%;">Date:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${selectedDate}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Time slot:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${selectedTime} (30-Minute Session)</td>
              </tr>
              ${scope ? `<tr><td style="padding: 6px 0; font-weight: bold;">Objective:</td><td style="padding: 6px 0; color: #FF5500; font-weight: 600;">${scope}</td></tr>` : ''}
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 30%;">Google Meet:</td>
                <td style="padding: 6px 0;"><a href="${meetLink}" style="color: #FF5500; text-decoration: none; font-weight: 600;">Join Live GMeet Session</a></td>
              </tr>
            </table>
            <p style="font-size: 11px; color: #64748b; margin-top: 15px; margin-bottom: 0; font-style: italic;">A Google Calendar invitation has been attached to this email.</p>
          </div>

          <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">What we'll accomplish on the call:</h3>
          <ul style="font-size: 13.5px; color: #475569; line-height: 1.6; padding-left: 20px;">
            <li>Map your business's manual data pipelines and software silos</li>
            <li>Evaluate specific low-code integrations and custom AI agent candidates</li>
            <li>Structure a clear ROI and timeline roadmap with zero team disruption</li>
          </ul>

          <p style="font-size: 13.5px; line-height: 1.6; color: #475569; text-align: center; margin-top: 30px;">If you have any documents or workflow walkthroughs to share before the call, feel free to reply directly to this email at <a href="mailto:info@aimlpartner.com" style="color: #FF5500; font-weight: bold;">info@aimlpartner.com</a>!</p>
        </div>

        <!-- Footer -->
        <div style="padding: 30px; text-align: center; background-color: #f8fafc; border-top: 1px solid #f1f5f9;">
          <p style="font-size: 11px; color: #94a3b8; margin-top: 0; margin-bottom: 0;">&copy; 2026 AIMLpartner. All rights reserved. Contact: info@aimlpartner.com</p>
        </div>
      </div>
    </div>
  `;
}
