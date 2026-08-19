import { formatCurrencyValue } from '../lib/currencies.js';

/**
 * Client-facing diagnostic audit report email HTML.
 */
export function clientReportEmail({ name, company, analysisResult, currencyCode, websiteUrl }) {
  return `
    <div style="font-family: 'Outfit', 'Inter', sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #1e293b; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; background: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);">
        <!-- Header banner -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px; text-align: center; border-bottom: 3px solid #0284c7;">
          <img src="https://aimlpartner.com/aimlpartner_logo.png" alt="AIMLpartner Logo" style="height: 45px; width: auto; display: block; margin: 0 auto;" />
          <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin-top: 20px; margin-bottom: 0; letter-spacing: -0.5px;">AI Operational Audit Report</h1>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 5px; margin-bottom: 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Enterprise Diagnostic Insights</p>
        </div>

        <!-- Body -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; line-height: 1.6; margin-top: 0; color: #0f172a;">Hello <strong>${name || 'Visitor'}</strong>,</p>
          <p style="font-size: 14px; line-height: 1.6; color: #475569;">We have successfully compiled your customized <strong>Enterprise AI Operational Diagnostic Report</strong> for <strong>${company || 'your business'}</strong>. Below is a summary of the efficiency opportunities unlocked by our analyzer.</p>
          
          <!-- Score Dashboard -->
          <div style="background-color: #f1f5f9; border-radius: 16px; padding: 25px; margin: 30px 0; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="width: 50%; text-align: left; vertical-align: middle;">
                  <span style="font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 5px;">AI Readiness Score</span>
                  <span style="font-size: 28px; font-weight: 800; color: #0f172a; display: block;">${analysisResult.readinessScore}<span style="font-size: 18px; color: #94a3b8; font-weight: 500;">/100</span></span>
                  <span style="display: inline-block; font-size: 11px; font-weight: bold; background-color: #0284c7; color: #ffffff; padding: 3px 10px; border-radius: 12px; margin-top: 5px;">${analysisResult.readinessTier} Tier</span>
                </td>
                <td style="width: 50%; text-align: right; vertical-align: middle; border-left: 2px solid #e2e8f0; padding-left: 15px;">
                  <span style="font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 5px;">Projected Reclaimable ROI</span>
                  <span style="font-size: 28px; font-weight: 800; color: #16a34a; display: block;">${formatCurrencyValue(analysisResult.annualReclaimedROI, currencyCode)}</span>
                  <span style="font-size: 12px; color: #64748b; display: block; margin-top: 5px;">${analysisResult.reclaimedTimeHours} hours saved / week</span>
                </td>
              </tr>
            </table>
          </div>

          <!-- Executive Diagnosis -->
          <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Executive Diagnosis</h3>
          <p style="font-size: 13.5px; line-height: 1.6; color: #475569; font-style: italic; margin-bottom: 30px; background-color: #f8fafc; border-left: 3px solid #64748b; padding: 12px 15px; border-radius: 0 8px 8px 0;">"${analysisResult.executiveDiagnosis}"</p>

          <!-- Audited Focus Areas -->
          <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Audited Focus Areas</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13.5px; margin-bottom: 30px;">
            ${analysisResult.departments.map((dept, idx) => `
              <tr style="${idx % 2 === 0 ? 'background-color: #f8fafc;' : ''}">
                <td style="padding: 12px 10px; font-weight: bold; color: #0f172a; width: 40%; border-bottom: 1px solid #f1f5f9; vertical-align: top;">${dept.name}</td>
                <td style="padding: 12px 10px; color: #475569; width: 60%; border-bottom: 1px solid #f1f5f9; vertical-align: top;">${dept.friction}</td>
              </tr>
            `).join('')}
          </table>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 35px 0 10px 0;">
            <a href="${websiteUrl}/analyzer" style="background: linear-gradient(135deg, #0284c7 0%, #3b82f6 100%); color: #ffffff; text-decoration: none; padding: 15px 35px; font-size: 14px; font-weight: 700; border-radius: 50px; display: inline-block; box-shadow: 0 8px 20px rgba(59, 130, 246, 0.35); text-transform: uppercase; letter-spacing: 0.5px;">Access Your Live Dashboard</a>
          </div>
        </div>

        <!-- Divider -->
        <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 0 30px;" />

        <!-- Footer -->
        <div style="padding: 30px; text-align: center; background-color: #f8fafc;">
          <p style="font-size: 13px; color: #64748b; margin-top: 0; margin-bottom: 5px;">Your comprehensive operational audit report PDF is attached to this email.</p>
          <p style="font-size: 11px; color: #94a3b8; margin-top: 0; margin-bottom: 0;">&copy; 2026 AIMLpartner. All rights reserved. Contact: info@aimlpartner.com</p>
        </div>
      </div>
    </div>
  `;
}
