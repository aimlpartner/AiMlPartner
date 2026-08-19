import { formatCurrencyValue } from './currencies.js';

/**
 * Generates a professional PDF diagnostic report using pdfkit.
 * Dynamically imports pdfkit to avoid bundling issues.
 *
 * @param {object} data         - Analysis result data
 * @param {string} leadEmail    - Client email
 * @param {string} leadName     - Client name
 * @param {string} leadCompany  - Client company
 * @param {string} currencyCode - Currency code (default: 'USD')
 * @returns {Promise<Buffer>} PDF file buffer
 */
export async function generatePdfReport(data, leadEmail, leadName, leadCompany, currencyCode = 'USD') {
  const PDFDocument = (await import('pdfkit')).default;
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      // Header
      doc.fillColor('#0f172a').fontSize(24).font('Helvetica-Bold').text('AIMLpartner', { align: 'left' });
      doc.fillColor('#64748b').fontSize(10).font('Helvetica').text('ENTERPRISE AI OPERATIONAL DIAGNOSTIC REPORT', { align: 'left' });
      doc.moveDown(1.5);

      doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(1.5);

      // Client Profile
      doc.fillColor('#0f172a').fontSize(12).font('Helvetica-Bold').text('Client Profile:');
      doc.fillColor('#334155').fontSize(10).font('Helvetica')
        .text(`Name: ${leadName}`)
        .text(`Work Email: ${leadEmail}`)
        .text(`Company Name: ${leadCompany}`)
        .text(`Assessed Sector: ${data.sector}`);
      doc.moveDown(1.5);

      // Executive Diagnosis
      doc.fillColor('#0f172a').fontSize(14).font('Helvetica-Bold').text(`Executive AI Diagnostic Assessment for ${data.businessName}`);
      doc.moveDown(0.5);
      doc.fillColor('#334155').fontSize(10).font('Helvetica-Oblique').text(`"${data.executiveDiagnosis}"`, { lineGap: 4 });
      doc.moveDown(1.5);

      // Key Metrics
      doc.fillColor('#0f172a').fontSize(12).font('Helvetica-Bold').text('Key Operational Diagnostics & ROI Potential');
      doc.moveDown(0.5);
      doc.fillColor('#334155').fontSize(10).font('Helvetica')
        .text(`- AI Readiness Score: ${data.readinessScore} / 100 (${data.readinessTier} Tier)`)
        .text(`- Weekly Manual Overhead Drag: ${data.internalDragHours} Hours`)
        .text(`- AI Reclaimable Efficiency Time: ${data.reclaimedTimeHours} Hours per Week`)
        .text(`- Projected Annual Reclaimed Capital ROI: ${formatCurrencyValue(data.annualReclaimedROI, currencyCode)}`);
      doc.moveDown(1.5);

      // Department Playbooks
      doc.fillColor('#0f172a').fontSize(14).font('Helvetica-Bold').text('Tactical Departmental Playbooks');
      doc.moveDown(0.5);
      data.departments.forEach((dept, index) => {
        doc.fillColor('#0284c7').fontSize(12).font('Helvetica-Bold').text(`${index + 1}. Department: ${dept.name} (Weekly Leak: ${dept.weeklyTimeLeak} Hours)`);
        doc.moveDown(0.25);

        doc.fillColor('#0f172a').fontSize(10).font('Helvetica-Bold').text('Current Friction Process:');
        doc.fillColor('#334155').fontSize(10).font('Helvetica').text(dept.friction);
        doc.moveDown(0.4);

        doc.fillColor('#0f172a').fontSize(10).font('Helvetica-Bold').text('Target Resolution Architecture:');
        doc.fillColor('#334155').fontSize(10).font('Helvetica').text(dept.resolution);
        doc.moveDown(0.4);

        doc.fillColor('#0f172a').fontSize(10).font('Helvetica-Bold').text('Recommended Workflow:');
        doc.fillColor('#334155').fontSize(10).font('Helvetica').text(dept.playbook.workflow);
        doc.moveDown(0.4);

        doc.fillColor('#0f172a').fontSize(10).font('Helvetica-Bold').text('SaaS Integration Tool Stack:');
        doc.fillColor('#334155').fontSize(10).font('Helvetica').text(dept.playbook.toolStack.join(', '));
        doc.moveDown(0.4);

        doc.fillColor('#0f172a').fontSize(10).font('Helvetica-Bold').text('Implementation Timelines & Metrics:');
        doc.fillColor('#334155').fontSize(10).font('Helvetica')
          .text(`- Complexity: ${dept.playbook.complexity}`)
          .text(`- Duration: ${dept.playbook.timeline}`)
          .text(`- Goal Success Metric: ${dept.playbook.successMetrics}`)
          .text(`- Projected ROI: ${formatCurrencyValue(dept.playbook.roi, currencyCode)}`);
        doc.moveDown(0.4);

        doc.fillColor('#1d4ed8').fontSize(10).font('Helvetica-Bold').text('AIMLpartner Proposed Service Offering:');
        doc.fillColor('#1e40af').fontSize(10).font('Helvetica-Oblique').text(dept.playbook.aimlPartnerServiceSuggestion || 'Contact AIMLpartner for deployment details.');
        doc.moveDown(1.5);
      });

      // Roadmap
      doc.fillColor('#0f172a').fontSize(14).font('Helvetica-Bold').text('Tactical Launch Roadmap');
      doc.moveDown(0.5);
      doc.fillColor('#334155').fontSize(10).font('Helvetica').text(`Corporate Data Readiness Assessment:\n${data.roadmap.dataReadinessAssessment}`);
      doc.moveDown(0.5);
      data.roadmap.phases.forEach((phase) => {
        doc.fillColor('#334155').fontSize(10).font('Helvetica-Bold').text(`Phase ${phase.phaseNumber}: ${phase.title} (Duration: ${phase.duration})`);
        doc.fillColor('#475569').fontSize(9).font('Helvetica').text(`Focus: ${phase.focus}`);
        doc.text('Key Engineering Milestones:');
        phase.milestones.forEach((m) => {
          doc.text(`  - ${m}`);
        });
        doc.moveDown(0.5);
      });
      doc.moveDown(1);

      // Revenue Leak
      doc.fillColor('#991b1b').fontSize(14).font('Helvetica-Bold').text('CONFIDENTIAL: Sector-Wide Critical Revenue Leak');
      doc.moveDown(0.5);
      doc.fillColor('#334155').fontSize(10).font('Helvetica')
        .text(`- Gap Analysis: ${data.criticalRevenueLeak.gapAnalysis}`)
        .text(`- Lost Capital Scale: ${data.criticalRevenueLeak.lostCapitalScale}`)
        .text(`- Proposed Agentic Solution: ${data.criticalRevenueLeak.agenticSolution}`);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
