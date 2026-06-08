import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve and load .env using the absolute directory path of the server.js script
dotenv.config({ path: path.join(__dirname, '.env') });

// Helper to initialize GoogleGenAI lazily and fetch key dynamically at request time
function getGoogleGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[Analyzer API Production] Error: GEMINI_API_KEY environment variable is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * Strips HTML and retrieves pure text
 */
async function scrapeUrlText(url) {
  let targetUrl = url.trim();
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Failed: ${response.status}`);
    }

    const html = await response.text();
    let text = html.replace(/<(script|style|head|noscript)\b[^>]*>([\s\S]*?)<\/\1>/gi, '');
    text = text.replace(/<[^>]+>/g, ' ');
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    text = text.replace(/\s+/g, ' ').trim();
    return text.substring(0, 40000);
  } catch (error) {
    console.error(`[Scraper Error] Failed to scrape ${url}:`, error.message || error);
    throw new Error(`Could not read website: ${error.message}`);
  }
}

/**
 * Helper to determine if input string is a domain/URL or a plain name.
 */
function isDomainOrUrl(str) {
  const cleaned = str.trim().replace(/^https?:\/\//i, '');
  return /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d+)?(\/.*)?$/.test(cleaned);
}

function createFallbackResult() {
  return {
    _source: 'fallback',
    businessName: "Your Business",
    sector: "Technology & Professional Services",
    executiveDiagnosis: "An initial diagnostic indicates strong potential for low-code and agentic AI integrations. By automating manual back-office tasks like document parsing, CRM updates, and lead routing, the business can significantly reduce manual operational overhead.",
    readinessScore: 45,
    readinessTier: "Exploring",
    annualReclaimedROI: 65000,
    internalDragHours: 35,
    reclaimedTimeHours: 25,
    departments: [
      {
        name: "Operations & Admin",
        icon: "FileText",
        weeklyTimeLeak: 15,
        friction: "Manual handling of invoices, copying data between spreadsheets, and updating client project records.",
        resolution: "Automate ingestion with OCR and Make.com pipelines syncing directly with databases and CRMs.",
        playbook: {
          workflow: "Invoice triggers automation -> PDF parser extracts data -> Google Sheets/CRM logs entries -> Slack reports success.",
          integrationPath: "Low-impact integration connecting existing e-mail inboxes directly to Make.com workflows.",
          toolStack: ["Make.com", "OpenAI API", "Google Workspace"],
          complexity: "Low",
          timeline: "2 weeks",
          successMetrics: "Reduce invoice ingestion time by 90%, eliminating data entry errors.",
          roi: 24000
        }
      },
      {
        name: "Marketing & Lead Management",
        icon: "Megaphone",
        weeklyTimeLeak: 12,
        friction: "Slow response times for inbound website leads and manual vetting of customer inquiries.",
        resolution: "Deploy an intelligent lead router and custom auto-responder script using Gemini API.",
        playbook: {
          workflow: "Lead submits form -> AI analyzes company profile -> Auto-sends personalized intro sheet -> Books calendar.",
          integrationPath: "Embeds seamlessly behind standard forms without modifying frontend architecture.",
          toolStack: ["Make.com", "HubSpot", "Gemini API"],
          complexity: "Medium",
          timeline: "3 weeks",
          successMetrics: "Shorten response times from 12 hours to 5 minutes, boosting conversion rates by 25%.",
          roi: 31000
        }
      }
    ],
    roadmap: {
      dataReadinessAssessment: "Operational records exist in unstructured formats (PDFs, local documents). High viability for transition using secure vector search (RAG) databases.",
      phases: [
        {
          phaseNumber: 1,
          title: "Foundation & CRM Ingestion",
          duration: "2 Weeks",
          focus: "Connecting basic text/file processing pipelines directly into existing admin dashboards.",
          milestones: ["API connections configured", "No-code workflow blueprints mapped", "Initial testing of lead filters"]
        },
        {
          phaseNumber: 2,
          title: "Agentic Assistant Rollout",
          duration: "3-4 Weeks",
          focus: "Deploying conversational models to handle administrative document routing and customer triage.",
          milestones: ["Customer service agent sandbox validated", "Human-in-the-loop review overrides built"]
        }
      ]
    },
    criticalRevenueLeak: {
      gapAnalysis: "Most companies lose 10-15% of inbound leads due to follow-up times exceeding 1 hour.",
      lostCapitalScale: "$40,000 - $120,000 annually per mid-sized business",
      agenticSolution: "Install a 'Missed Call Text-Back' and instant lead triage system to keep prospects engaged 24/7."
    }
  };
}

function parseGeminiJson(rawText) {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
  }
  try {
    return JSON.parse(cleaned);
  } catch (error) {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (subError) {
        console.error("[JSON Regex Parse Error] Failed:", subError);
      }
    }
    throw new Error("Could not parse JSON");
  }
}

async function startServer() {
  const app = express();

  // Hostinger assigns the port via the PORT env variable.
  // Passenger (Hostinger's Node.js app server) communicates through this port.
  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || '0.0.0.0';

  const distPath = path.join(__dirname, 'dist');
  const distIndexPath = path.join(distPath, 'index.html');

  // Support JSON and urlencoded request bodies
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Register API endpoint
  app.post('/api/analyze', async (req, res) => {
    const { url, description, fileContent } = req.body;

    const ai = getGoogleGenAI();
    if (!ai) {
      console.error("[Analyzer API Production] Gemini API Client is not configured (missing GEMINI_API_KEY).");
      return res.status(503).json({ error: "AI analysis engine is not configured on the server. Please check your environment variables." });
    }

    let finalContext = "";
    let sourceChannel = "";

    try {
      if (url) {
        const isUrl = isDomainOrUrl(url);
        if (isUrl) {
          console.log(`[Analyzer API Production] Scraping website: ${url}`);
          try {
            const scraped = await scrapeUrlText(url);
            finalContext = `Website scrape of domain (${url}):\n\n${scraped}`;
            sourceChannel = `website URL (${url})`;
          } catch (scrapeErr) {
            console.warn(`[Analyzer API Production] Scraping failed for ${url}, continuing with search grounding.`, scrapeErr.message || scrapeErr);
            finalContext = `Website URL: ${url} (Scraping failed, please search the web for details about this company/domain)`;
            sourceChannel = `website URL (${url}) with search fallback`;
          }
        } else {
          console.log(`[Analyzer API Production] Treating input as company name: ${url}`);
          finalContext = `Company Name: ${url} (Please search the web for details about this company)`;
          sourceChannel = `company name (${url})`;
        }
      } else if (fileContent) {
        finalContext = `Uploaded brief contents:\n\n${fileContent}`;
        sourceChannel = "uploaded document";
      } else if (description) {
        finalContext = `Description:\n\n${description}`;
        sourceChannel = "direct description text";
      } else {
        return res.status(400).json({ error: "Missing context" });
      }

      const prompt = `You are a high-fidelity Enterprise AI Strategy Auditor. Analyze the following unstructured context about a business:
Source channel: ${sourceChannel}

Context:
${finalContext}

---
CRITICAL AUDITING & BEHAVIOR CONSTRAINTS:
1. OPERATIONALLY CONSTRAINED AUDITING: Do NOT propose disruptive organizational downsizing, structural re-designs, firing of staff, or major core software re-architectures.
2. Focus exclusively on non-core, administrative, and "shadow" back-office bottlenecks where friction can be automated away cleanly with zero operational friction (e.g. missed-call text-backs, automated invoice ingestion, email lead routing, data syncing, custom CRM updates).
3. Be highly realistic, precise, and practical. Research sector-specific workflows live if necessary.
4. Calculate actual annual ROI projection, manual hours saved, and department weekly drag. Be realistic.

You MUST respond strictly with a valid JSON object matching the exact structure below. Do not output any conversational prose before or after the JSON.

JSON SCHEMA STRUCTURE:
{
  "businessName": "Name of the business (or fallback to 'Your Business')",
  "sector": "Primary industry sector",
  "executiveDiagnosis": "A compelling 3-4 sentence qualitative diagnosis of their digital gaps and automatable bottlenecks.",
  "readinessScore": 0-100 integer,
  "readinessTier": "Novice" | "Exploring" | "Operational" | "Advanced" (based on score: 0-30=Novice, 31-60=Exploring, 61-85=Operational, 86-100=Advanced),
  "annualReclaimedROI": integer,
  "internalDragHours": integer,
  "reclaimedTimeHours": integer,
  "departments": [
    {
      "name": "Department Name",
      "icon": "Lucide Icon name from: Truck | Megaphone | FileText | Shield | Users | DollarSign | ShieldCheck | Inbox | Layers | Headphones",
      "weeklyTimeLeak": integer,
      "friction": "1-2 sentence description of manual friction",
      "resolution": "1-2 sentence description of proposed automation",
      "playbook": {
        "workflow": "Short workflow explanation",
        "integrationPath": "1-2 sentence explanation of integration path",
        "toolStack": ["Make.com", "OpenAI API", "HubSpot"],
        "complexity": "Low" | "Medium" | "High",
        "timeline": "Timeline duration",
        "successMetrics": "Goal-oriented success metric",
        "roi": integer,
        "aimlPartnerServiceSuggestion": "A highly encouraging 2-sentence suggestion of how AIMLpartner can implement this exact playbook workflow for them (e.g. proposing AIMLpartner's low-code pod or expert agents, emphasizing quick rollout with no staff disruption)."
      }
    }
  ],
  "roadmap": {
    "dataReadinessAssessment": "A brief 2-sentence summary of data readiness",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Phase 1 Title",
        "duration": "Duration in weeks",
        "focus": "Brief focus description",
        "milestones": ["Milestone 1", "Milestone 2"]
      },
      {
        "phaseNumber": 2,
        "title": "Phase 2 Title",
        "duration": "Duration in weeks",
        "focus": "Brief focus description",
        "milestones": ["Milestone 1", "Milestone 2"]
      }
    ]
  },
  "criticalRevenueLeak": {
    "gapAnalysis": "Why they continue leaking capital",
    "lostCapitalScale": "Wasted capital statistics in wider industry",
    "agenticSolution": "Describe a customized agentic AI automation"
  }
}`;

      let aiResponse;
      try {
        aiResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
            responseMimeType: 'application/json',
          }
        });
      } catch (err) {
        console.warn(`[Grounding Failed] Falling back to normal`, err.message);
        aiResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          }
        });
      }

      const rawText = aiResponse.text;
      if (!rawText) throw new Error("Empty text");

      const parsedData = parseGeminiJson(rawText);

      // Calculate token usage and cost for Gemini 2.5 Flash
      const promptTokens = aiResponse.usageMetadata?.promptTokenCount || 0;
      const completionTokens = (aiResponse.usageMetadata?.candidatesTokenCount || 0) + (aiResponse.usageMetadata?.thoughtsTokenCount || 0);
      const totalTokens = aiResponse.usageMetadata?.totalTokenCount || (promptTokens + completionTokens);

      const hasGrounding = !!aiResponse.candidates?.[0]?.groundingMetadata?.webSearchQueries?.length;
      const groundingQueries = hasGrounding ? 1 : 0;

      // Input: $0.30/1M tokens ($0.00000030/token)
      // Output: $2.50/1M tokens ($0.00000250/token)
      // Search Grounding: $0.035/query ($35/1K prompts)
      const costUsd = (promptTokens * 0.00000030) +
        (completionTokens * 0.00000250) +
        (hasGrounding ? 0.035 : 0);

      console.log(`[Analyzer API Production] Cost computed: $${costUsd.toFixed(6)} (In: ${promptTokens}, Out: ${completionTokens}, Grounding: ${hasGrounding ? 'Yes' : 'No'})`);

      const validatedData = {
        tokenUsage: {
          promptTokens,
          completionTokens,
          totalTokens,
          groundingQueries,
          costUsd
        },
        businessName: parsedData.businessName || "Your Business",
        sector: parsedData.sector || "Services",
        executiveDiagnosis: parsedData.executiveDiagnosis || "Diagnostic audit indicates multiple opportunities to streamline non-core operations through secure, low-impact integrations.",
        readinessScore: Number.isInteger(parsedData.readinessScore) ? parsedData.readinessScore : 50,
        readinessTier: ['Novice', 'Exploring', 'Operational', 'Advanced'].includes(parsedData.readinessTier) ? parsedData.readinessTier : 'Exploring',
        annualReclaimedROI: Number.isInteger(parsedData.annualReclaimedROI) ? parsedData.annualReclaimedROI : 75000,
        internalDragHours: Number.isInteger(parsedData.internalDragHours) ? parsedData.internalDragHours : 40,
        reclaimedTimeHours: Number.isInteger(parsedData.reclaimedTimeHours) ? parsedData.reclaimedTimeHours : 30,
        departments: Array.isArray(parsedData.departments) ? parsedData.departments.map(dept => ({
          name: dept.name || "Operations",
          icon: dept.icon || "FileText",
          weeklyTimeLeak: Number.isInteger(dept.weeklyTimeLeak) ? dept.weeklyTimeLeak : 10,
          friction: dept.friction || "Manual tasks slowing processing times.",
          resolution: dept.resolution || "Automate pipeline data flow.",
          playbook: {
            workflow: dept.playbook?.workflow || "Standard trigger to action flow.",
            integrationPath: dept.playbook?.integrationPath || "API connection mapping.",
            toolStack: Array.isArray(dept.playbook?.toolStack) ? dept.playbook.toolStack : ["Make.com", "OpenAI"],
            complexity: ['Low', 'Medium', 'High'].includes(dept.playbook?.complexity) ? dept.playbook.complexity : 'Low',
            timeline: dept.playbook?.timeline || "2 weeks",
            successMetrics: dept.playbook?.successMetrics || "Boost processing time.",
            roi: Number.isInteger(dept.playbook?.roi) ? dept.playbook.roi : 25000,
            aimlPartnerServiceSuggestion: dept.playbook?.aimlPartnerServiceSuggestion || "AIMLpartner can configure and deploy this complete pipeline in 14 days under a fixed-price Low-Code Pod."
          }
        })) : createFallbackResult().departments,
        roadmap: {
          dataReadinessAssessment: parsedData.roadmap?.dataReadinessAssessment || "Viable data format alignment available.",
          phases: Array.isArray(parsedData.roadmap?.phases) ? parsedData.roadmap.phases.map(phase => ({
            phaseNumber: Number.isInteger(phase.phaseNumber) ? phase.phaseNumber : 1,
            title: phase.title || "Foundation Rollout",
            duration: phase.duration || "2 weeks",
            focus: phase.focus || "System architecture config",
            milestones: Array.isArray(phase.milestones) ? phase.milestones : ["System setup"]
          })) : createFallbackResult().roadmap.phases,
        },
        criticalRevenueLeak: {
          gapAnalysis: parsedData.criticalRevenueLeak?.gapAnalysis || "Operational drag from manual handoffs.",
          lostCapitalScale: parsedData.criticalRevenueLeak?.lostCapitalScale || "$50,000 annually",
          agenticSolution: parsedData.criticalRevenueLeak?.agenticSolution || "Deploy CRM-synced automated webhook monitors."
        },
        _source: 'gemini'
      };

      res.status(200).json(validatedData);
    } catch (err) {
      console.error(`[Analyzer API Exception]:`, err);
      res.status(502).json({ error: `AI analysis failed: ${err.message || 'Unknown Gemini error'}` });
    }
  });

  // Compiler helper for in-memory PDF
  async function generatePdfReport(data, leadEmail, leadName, leadCompany) {
    const PDFDocument = (await import('pdfkit')).default;
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const chunks = [];

        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', (err) => reject(err));

        doc.fillColor('#0f172a').fontSize(24).font('Helvetica-Bold').text('AIMLpartner', { align: 'left' });
        doc.fillColor('#64748b').fontSize(10).font('Helvetica').text('ENTERPRISE AI OPERATIONAL DIAGNOSTIC REPORT', { align: 'left' });
        doc.moveDown(1.5);

        doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(1.5);

        doc.fillColor('#0f172a').fontSize(12).font('Helvetica-Bold').text('Client Profile:');
        doc.fillColor('#334155').fontSize(10).font('Helvetica')
          .text(`Name: ${leadName}`)
          .text(`Work Email: ${leadEmail}`)
          .text(`Company Name: ${leadCompany}`)
          .text(`Assessed Sector: ${data.sector}`);
        doc.moveDown(1.5);

        doc.fillColor('#0f172a').fontSize(14).font('Helvetica-Bold').text(`Executive AI Diagnostic Assessment for ${data.businessName}`);
        doc.moveDown(0.5);
        doc.fillColor('#334155').fontSize(10).font('Helvetica-Oblique').text(`"${data.executiveDiagnosis}"`, { lineGap: 4 });
        doc.moveDown(1.5);

        doc.fillColor('#0f172a').fontSize(12).font('Helvetica-Bold').text('Key Operational Diagnostics & ROI Potential');
        doc.moveDown(0.5);
        doc.fillColor('#334155').fontSize(10).font('Helvetica')
          .text(`- AI Readiness Score: ${data.readinessScore} / 100 (${data.readinessTier} Tier)`)
          .text(`- Weekly Manual Overhead Drag: ${data.internalDragHours} Hours`)
          .text(`- AI Reclaimable Efficiency Time: ${data.reclaimedTimeHours} Hours per Week`)
          .text(`- Projected Annual Reclaimed Capital ROI: $${data.annualReclaimedROI.toLocaleString()}`);
        doc.moveDown(1.5);

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
            .text(`- Projected ROI: $${dept.playbook.roi.toLocaleString()}`);
          doc.moveDown(0.4);

          doc.fillColor('#1d4ed8').fontSize(10).font('Helvetica-Bold').text('AIMLpartner Proposed Service Offering:');
          doc.fillColor('#1e40af').fontSize(10).font('Helvetica-Oblique').text(dept.playbook.aimlPartnerServiceSuggestion || "Contact AIMLpartner for deployment details.");
          doc.moveDown(1.5);
        });

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

  // Register email POST route
  app.post('/api/email-report', async (req, res) => {
    const nodemailer = (await import('nodemailer')).default;
    const { email, name, company, analysisResult } = req.body;

    if (!email || !analysisResult) {
      return res.status(400).json({ error: "Missing metadata" });
    }

    try {
      console.log(`[Email API Prod] Compiling PDF Buffer...`);
      const pdfBuffer = await generatePdfReport(analysisResult, email, name || "Visitor", company || "N/A");

      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
      const smtpPort = Number(process.env.SMTP_PORT) || 587;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const toEmail = process.env.TO_EMAIL || 'manusingh72002@gmail.com';

      if (!smtpUser || !smtpPass) {
        console.warn('[Email API Prod] SMTP credentials missing.');
        return res.status(200).json({ status: "mocked" });
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      const mailOptions = {
        from: `"AIMLpartner Diagnostics" <${smtpUser}>`,
        to: toEmail,
        subject: `[AI Lead Generated] Operational Audit Report for ${analysisResult.businessName} (${name})`,
        html: `
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
                <td style="padding: 8px; border: 1px solid #e2e8f0; color: #16a34a; font-weight: bold;">$${analysisResult.annualReclaimedROI.toLocaleString()}</td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Weekly Hours Drag</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${analysisResult.internalDragHours} Hours</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #b91c1c;">API Analysis Cost</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; color: #b91c1c; font-weight: bold;">
                $${analysisResult.tokenUsage?.costUsd?.toFixed(5) || '0.00000'} (₹${((analysisResult.tokenUsage?.costUsd || 0) * 83.5).toFixed(3)})
                <span style="font-size: 11px; font-weight: normal; color: #64748b; margin-left: 8px;">
                  (In: ${analysisResult.tokenUsage?.promptTokens || 0} tokens, Out: ${analysisResult.tokenUsage?.completionTokens || 0} tokens, Grounding: ${analysisResult.tokenUsage?.groundingQueries ? 'Yes' : 'No'})
                </span>
                </td>
              </tr>
            </table>
            
            <h3 style="color: #991b1b;">Confidential Sector Leak Assessment</h3>
            <p><strong>Gap Analysis:</strong> ${analysisResult.criticalRevenueLeak.gapAnalysis}</p>
            <p><strong>Lost Capital Scale:</strong> ${analysisResult.criticalRevenueLeak.lostCapitalScale}</p>
            <p><strong>Agentic Tactic:</strong> ${analysisResult.criticalRevenueLeak.agenticSolution}</p>
            
            <br/>
            <p style="font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px;">
              Please review the attached formal PDF for a comprehensive breakdown of the tactical department playbooks, roadmaps, and custom AIMLpartner service pitches.
            </p>
          </div>
        `,
        attachments: [
          {
            filename: `operational-audit-${analysisResult.businessName.replace(/\s+/g, '-').toLowerCase()}.pdf`,
            content: pdfBuffer,
          }
        ]
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ status: "sent" });
    } catch (err) {
      console.error(`[Email API Exception]:`, err);
      res.status(500).json({ error: err.message });
    }
  });

  // Register "Let's Build It" build request endpoint
  app.post('/api/build-request', async (req, res) => {
    const { email, name, company, departmentName, answers, playbookDetails, analysisResult } = req.body;

    if (!email || !departmentName || !answers || !playbookDetails) {
      return res.status(400).json({ error: "Missing required client customization parameters." });
    }

    const ai = getGoogleGenAI();
    if (!ai) {
      return res.status(500).json({ error: "Gemini client not initialized. Please ensure GEMINI_API_KEY is configured on your server." });
    }

    try {
      const answersText = answers.map((a, i) => `Q${i + 1}: ${a.question}\nA${i + 1}: ${a.answer}`).join('\n\n');

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

      console.log(`[Build Request API Prod] Calling Gemini to generate AI Studio System Prompt...`);
      const aiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: systemPromptDraftInstruction
      });

      const systemPromptText = aiResponse.text;
      if (!systemPromptText) {
        throw new Error("Gemini returned empty text");
      }

      // Transmit the details to the administrator inbox support@brandtopost.com
      const nodemailer = (await import('nodemailer')).default;
      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
      const smtpPort = Number(process.env.SMTP_PORT) || 587;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const toEmail = process.env.TO_EMAIL || 'support@brandtopost.com';

      if (!smtpUser || !smtpPass) {
        console.warn('[Build Request API Prod] SMTP credentials missing.');
        return res.status(200).json({ status: "mocked", prompt: systemPromptText });
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      const mailOptions = {
        from: `"AIMLpartner Customizer" <${smtpUser}>`,
        to: toEmail,
        subject: `[Let's Build It Request] Custom ${departmentName} Agent for ${company}`,
        html: `
          <div style="font-family: sans-serif; color: #334155; line-height: 1.6; max-width: 650px; margin: auto; border: 1px solid #e2e8f0; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);">
            <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-top: 0;">Let's Build It! Custom Agent Request</h2>
            <p>A client has completed the Playbook Questionnaire on your site for a customized AI Agent in their <strong>${departmentName}</strong> department.</p>
            
            <h3 style="color: #0284c7; border-bottom: 1px solid #f1f5f9; padding-bottom: 5px;">Client Profile</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 30%;">Lead Name:</td>
                <td style="padding: 6px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Work Email:</td>
                <td style="padding: 6px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Company Name:</td>
                <td style="padding: 6px 0;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Business Sector:</td>
                <td style="padding: 6px 0;">${analysisResult?.sector || 'Services'}</td>
              </tr>
            </table>

            <h3 style="color: #0284c7; border-bottom: 1px solid #f1f5f9; padding-bottom: 5px;">Custom Requirements Clarified</h3>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 20px; font-size: 14px;">
              ${answers.map((a, i) => `
                <p style="margin: 0 0 8px 0;"><strong>Q${i + 1}: ${a.question}</strong></p>
                <p style="margin: 0 0 16px 0; color: #475569; font-style: italic;">A${i + 1}: ${a.answer}</p>
              `).join('')}
            </div>

            <h3 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px; margin-top: 30px;">Google AI Studio System Prompt Blueprint</h3>
            <p style="font-size: 13px; color: #64748b; margin-top: 5px; margin-bottom: 15px;">
              Copy and paste the generated system prompt block below directly into Google AI Studio system instructions to spin up this agent immediately!
            </p>
            <div style="background-color: #0f172a; color: #e2e8f0; font-family: monospace; font-size: 12px; padding: 15px; border-radius: 8px; overflow-x: auto; white-space: pre-wrap; border: 1px solid #1e293b; max-height: 500px;">
${systemPromptText}
            </div>
            
            <br/>
            <p style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-bottom: 0;">
              This email was automatically generated by the AIMLpartner Custom Analyzer Engine. Follow up with the lead at ${email} within 72 hours with their prototype demo.
            </p>
          </div>
        `
      };

      console.log(`[Build Request API Prod] Sending email blueprint to ${toEmail}...`);
      await transporter.sendMail(mailOptions);
      res.status(200).json({ status: "sent" });
    } catch (err) {
      console.error(`[Build Request API Exception]:`, err);
      res.status(500).json({ error: err.message });
    }
  });

  // Health-check endpoint — useful for uptime monitors & Hostinger diagnostics
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Secure operational diagnostics debugging route
  app.get('/api/debug-status', (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    res.status(200).json({
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey ? apiKey.length : 0,
      apiKeyPrefix: apiKey ? apiKey.substring(0, 5) + '...' : 'none',
      cwd: process.cwd(),
      envFilePath: path.join(__dirname, '.env'),
      envFileExists: fs.existsSync(path.join(__dirname, '.env')),
      nodeVersion: process.version
    });
  });

  if (fs.existsSync(distIndexPath)) {
    console.log('[Server] Serving production build from dist/');

    // Serve static assets with aggressive caching (hashed filenames = safe to cache)
    app.use(
      '/assets',
      express.static(path.join(distPath, 'assets'), {
        maxAge: '1y',
        immutable: true,
      })
    );

    // Serve remaining static files (index.html, .htaccess, etc.) with no-cache
    app.use(express.static(distPath, { maxAge: 0 }));

    // SPA fallback: any route that doesn't match a static file returns index.html
    app.get('*', (_req, res) => {
      res.sendFile(distIndexPath);
    });
  } else {
    // No build output found — return a helpful error instead of crashing
    console.error('[Server] ERROR: dist/index.html not found!');
    console.error('[Server] Run `npm run build` first, or check that postinstall ran successfully.');
    app.get('*', (_req, res) => {
      res
        .status(500)
        .send(
          'Server misconfiguration: missing build output. Please run `npm run build` before starting.'
        );
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[Server] Running on http://${HOST}:${PORT}`);
    console.log(`[Server] NODE_ENV=${process.env.NODE_ENV || 'not set'}`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal error during startup:', err);
  process.exit(1);
});
