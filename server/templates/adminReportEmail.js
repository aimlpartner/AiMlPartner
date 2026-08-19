import { formatCurrencyValue } from '../lib/currencies.js';

/**
 * Admin-facing notification email when a user unlocks their audit report.
 */
export function adminReportEmail({ name, email, company, analysisResult, currencyCode }) {
  return `
    <div style="font-family: sans-serif; color: #334155; line-height: 1.6;">
      <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New High-Quality Lead Unlocked via AI Analyzer</h2>
      <p>A user has just completed the Free AI Business Analyzer diagnostic on your site and submitted their details to unlock their results.</p>
      
      <h3 style="color: #0284c7;">Lead Contact Details</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; width: 30%;">Full Name</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Work Email</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Company Name</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${company}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Assessed Sector</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${analysisResult.sector}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Readiness Score</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${analysisResult.readinessScore}/100 (${analysisResult.readinessTier})</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Projected Annual ROI</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0; color: #16a34a; font-weight: bold;">${formatCurrencyValue(analysisResult.annualReclaimedROI, currencyCode)}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Weekly Hours Drag</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${analysisResult.internalDragHours} Hours</td>
        </tr>
      </table>
    </div>
  `;
}
