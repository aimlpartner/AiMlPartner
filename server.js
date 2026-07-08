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

function getGoogleGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[Analyzer API Production] Error: GEMINI_API_KEY environment variable is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

function parseDateTime(dateStr, timeStr) {
  try {
    const parts = dateStr.split(',');
    if (parts.length < 3) return new Date();
    
    const monthDay = parts[1].trim(); // e.g. "Jun 10"
    const year = parts[2].trim(); // e.g. "2026"
    
    const timeParts = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    if (!timeParts) return new Date();
    
    let hour = parseInt(timeParts[1], 10);
    const minute = parseInt(timeParts[2], 10);
    const ampm = timeParts[3].toUpperCase();
    
    if (ampm === 'PM' && hour < 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    
    const months = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };
    months["january"] = 0; months["february"] = 1; months["march"] = 2; months["april"] = 3;
    months["may"] = 4; months["june"] = 5; months["july"] = 6; months["august"] = 7;
    months["september"] = 8; months["october"] = 9; months["november"] = 10; months["december"] = 11;
    
    const monthParts = monthDay.split(' ');
    const monthName = monthParts[0].substring(0, 3).toLowerCase();
    const day = parseInt(monthParts[1], 10);
    const monthIndex = months[monthName] !== undefined ? months[monthName] : 5;
    
    return new Date(parseInt(year, 10), monthIndex, day, hour, minute, 0);
  } catch (err) {
    console.error("Error parsing date/time:", err);
    return new Date();
  }
}

function formatIcsDateTime(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${y}${m}${d}T${h}${min}${s}`;
}

function generateIcsContent(name, email, selectedDate, selectedTime, isDemo, smtpUser, meetLink) {
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

  const counselorEmail = process.env.TO_EMAIL || 'garvitbansal2303@gmail.com';

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
    `ORGANIZER;CN="AIMLpartner Counselor":MAILTO:${counselorEmail}`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN="${name || 'Visitor'}":MAILTO:${email}`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;RSVP=FALSE;CN="AIMLpartner Counselor":MAILTO:${counselorEmail}`,
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

const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, locale: 'en-US' },
  INR: { code: 'INR', symbol: '₹', rate: 83.5, locale: 'en-IN' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, locale: 'en-GB' },
  JPY: { code: 'JPY', symbol: '¥', rate: 158.0, locale: 'ja-JP' },
  CNY: { code: 'CNY', symbol: '¥', rate: 7.25, locale: 'zh-CN' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.50, locale: 'en-AU' },
  CAD: { code: 'CAD', symbol: 'C$', rate: 1.37, locale: 'en-CA' },
};

function formatCurrencyValue(valInUsd, currencyCode) {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = valInUsd * config.rate;
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(converted);
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
  async function generatePdfReport(data, leadEmail, leadName, leadCompany, currencyCode = 'USD') {
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
          .text(`- Projected Annual Reclaimed Capital ROI: ${formatCurrencyValue(data.annualReclaimedROI, currencyCode)}`);
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
            .text(`- Projected ROI: ${formatCurrencyValue(dept.playbook.roi, currencyCode)}`);
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
    const { email, name, company, analysisResult, currencyCode = 'USD' } = req.body;

    if (!email || !analysisResult) {
      return res.status(400).json({ error: "Missing metadata" });
    }

    try {
      console.log(`[Email API Prod] Compiling PDF Buffer for ${analysisResult.businessName} in ${currencyCode}...`);
      const pdfBuffer = await generatePdfReport(analysisResult, email, name || "Visitor", company || "N/A", currencyCode);

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

      const websiteUrl = req.headers.origin || 'https://aimlpartner.com';

      // 1. Client-Facing Diagnostic Report Email
      const clientMailOptions = {
        from: `"AIMLpartner Diagnostics" <${smtpUser}>`,
        to: email,
        subject: `Your AI Operational Diagnostic Audit Report - ${analysisResult.businessName}`,
        html: `
          <div style="font-family: 'Outfit', 'Inter', sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #1e293b; margin: 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; background: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);">
              <!-- Header banner -->
              <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px; text-align: center; border-bottom: 3px solid #0284c7;">
                <img src="https://darkgray-finch-838850.hostingersite.com/wp-content/uploads/2026/04/WhatsApp_Image_2026-04-28_at_12.18.40_AM-removebg-preview.png" alt="AIMLpartner Logo" style="height: 45px; width: auto; display: block; margin: 0 auto;" />
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

                <!-- Quick Summary -->
                <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Executive Diagnosis</h3>
                <p style="font-size: 13.5px; line-height: 1.6; color: #475569; font-style: italic; margin-bottom: 30px; background-color: #f8fafc; border-left: 3px solid #64748b; padding: 12px 15px; border-radius: 0 8px 8px 0;">"${analysisResult.executiveDiagnosis}"</p>

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
                <p style="font-size: 11px; color: #94a3b8; margin-top: 0; margin-bottom: 0;">&copy; 2026 AIMLpartner. All rights reserved.</p>
              </div>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: `operational-audit-${analysisResult.businessName.replace(/\s+/g, '-').toLowerCase()}.pdf`,
            content: pdfBuffer,
          }
        ]
      };

      // 2. Admin Lead Notification Email
      const adminMailOptions = {
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
                <td style="padding: 8px; border: 1px solid #e2e8f0; color: #16a34a; font-weight: bold;">${formatCurrencyValue(analysisResult.annualReclaimedROI, currencyCode)}</td>
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

      console.log(`[Email API Prod] Sending report email to client: ${email}...`);
      await transporter.sendMail(clientMailOptions);

      console.log(`[Email API Prod] Sending report email to admin: ${toEmail}...`);
      const info = await transporter.sendMail(adminMailOptions);
      console.log(`[Email API Prod] Transmitted report successfully to both: ${info.messageId}`);

      res.status(200).json({ status: "sent" });
    } catch (err) {
      console.error(`[Email API Exception]:`, err);
      res.status(500).json({ error: err.message });
    }
  });

  // Register "Let's Build It" build request endpoint
  app.post('/api/build-request', async (req, res) => {
    const { email, name, company, departmentName, answers, playbookDetails, analysisResult, selectedDate, selectedTime } = req.body;

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



      // Transmit the details to the administrator inbox garvitbansal2303@gmail.com
      const nodemailer = (await import('nodemailer')).default;
      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
      const smtpPort = Number(process.env.SMTP_PORT) || 587;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const toEmail = process.env.TO_EMAIL || 'garvitbansal2303@gmail.com';
      const meetLink = process.env.MEETING_LINK || 'https://meet.google.com/qeh-diqr-pek';

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

      // 1. Client-Facing Confirmation Email
      const clientMailOptions = {
        from: `"AIMLpartner Customizer" <${smtpUser}>`,
        to: email,
        subject: `Confirmed: Your Custom AI Agent Demo - AIMLpartner`,
        html: `
          <div style="font-family: 'Outfit', 'Inter', sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #1e293b; margin: 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; background: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);">
              <!-- Header banner -->
              <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px; text-align: center; border-bottom: 3px solid #6366f1;">
                <img src="https://darkgray-finch-838850.hostingersite.com/wp-content/uploads/2026/04/WhatsApp_Image_2026-04-28_at_12.18.40_AM-removebg-preview.png" alt="AIMLpartner Logo" style="height: 45px; width: auto; display: block; margin: 0 auto;" />
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

                <!-- Questionnaire Summary -->
                <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Your custom requirements:</h3>
                <div style="background-color: #f8fafc; border-left: 3px solid #6366f1; padding: 15px; border-radius: 0 12px 12px 0; margin-bottom: 30px;">
                  ${answers.map((a) => `
                    <p style="margin: 0 0 5px 0; font-size: 13px; font-weight: bold; color: #0f172a;">Q: ${a.question}</p>
                    <p style="margin: 0 0 15px 0; font-size: 13px; color: #475569; font-style: italic;">A: ${a.answer}</p>
                  `).join('')}
                </div>

                <!-- Google AI Studio System Prompt Blueprint -->
                <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 0; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Google AI Studio System Prompt</h3>
                <p style="font-size: 13px; color: #64748b; margin-bottom: 15px; line-height: 1.5;">You can copy and paste the prompt blueprint below directly into Google AI Studio system instructions to test the agent sandbox immediately:</p>
                <div style="background-color: #0f172a; color: #e2e8f0; font-family: monospace; font-size: 12px; padding: 20px; border-radius: 12px; overflow-x: auto; white-space: pre-wrap; border: 1px solid #1e293b; max-height: 350px; line-height: 1.5; margin-bottom: 30px;">
${systemPromptText}
                </div>

                <!-- Quick Message -->
                <p style="font-size: 13.5px; line-height: 1.6; color: #475569; text-align: center;">Our engineering team has already started constructing a prototype sandboxed AI agent matching these instructions. We look forward to meeting you on the scheduled call!</p>
              </div>

              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 0 30px;" />

              <!-- Footer -->
              <div style="padding: 30px; text-align: center; background-color: #f8fafc;">
                <p style="font-size: 11px; color: #94a3b8; margin-top: 0; margin-bottom: 0;">&copy; 2026 AIMLpartner. All rights reserved.</p>
              </div>
            </div>
          </div>
        `
      };

      // 2. Admin-Facing Notification Email
      const adminMailOptions = {
        from: `"AIMLpartner Customizer" <${smtpUser}>`,
        to: toEmail,
        subject: `[Agent Build + Demo Booked] Custom ${departmentName} Agent for ${company}`,
        html: `
          <div style="font-family: sans-serif; color: #334155; line-height: 1.6; max-width: 650px; margin: auto; border: 1px solid #e2e8f0; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);">
            <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-top: 0;">Let's Build It! Custom Agent Request & Demo Booked</h2>
            <p>A client has completed the Playbook Questionnaire and scheduled a live prototype walk-through for a custom AI Agent in their <strong>${departmentName}</strong> department.</p>
            
            <h3 style="color: #0284c7; border-bottom: 1px solid #f1f5f9; padding-bottom: 5px;">🗓️ Live Demo Schedule</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 30%;">Date/Day:</td>
                <td style="padding: 6px 0; color: #4338ca; font-weight: bold;">${selectedDate || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Time slot:</td>
                <td style="padding: 6px 0; color: #4338ca; font-weight: bold;">${selectedTime || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 30%;">Meet Link:</td>
                <td style="padding: 6px 0;"><a href="${meetLink}">${meetLink}</a></td>
              </tr>
            </table>

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
              This email was automatically generated by the AIMLpartner Custom Analyzer Engine. Confirm the Google Meet demo and follow up with the lead at ${email}.
            </p>
          </div>
        `
      };

      let inviteAttachments = [];
      if (selectedDate && selectedTime) {
        try {
          const icsContent = generateIcsContent(name || 'Visitor', email, selectedDate, selectedTime, true, smtpUser, meetLink);
          inviteAttachments.push({
            filename: 'invite.ics',
            content: Buffer.from(icsContent, 'utf-8'),
            contentType: 'text/calendar; charset=utf-8; method=REQUEST'
          });
        } catch (icsErr) {
          console.error('[Build Request API Prod] Failed to generate ICS calendar invite:', icsErr);
        }
      }

      console.log(`[Build Request API Prod] Sending email confirmation to client: ${email}...`);
      await transporter.sendMail({
        ...clientMailOptions,
        attachments: inviteAttachments
      });

      console.log(`[Build Request API Prod] Sending email blueprint to admin: ${toEmail}...`);
      const info = await transporter.sendMail({
        ...adminMailOptions,
        attachments: inviteAttachments
      });
      console.log(`[Build Request API Prod] Transmitted successfully to both: ${info.messageId}`);

      res.status(200).json({ status: "sent", meetLink });
    } catch (err) {
      console.error(`[Build Request API Exception]:`, err);
      res.status(500).json({ error: err.message });
    }
  });

  // Register consultation booking call endpoint
  app.post('/api/book-call', async (req, res) => {
    const { name, email, company, selectedDate, selectedTime, source } = req.body;

    if (!email || !selectedDate || !selectedTime) {
      return res.status(400).json({ error: "Missing required booking details (email, date, or time)." });
    }

    try {

      const nodemailer = (await import('nodemailer')).default;
      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
      const smtpPort = Number(process.env.SMTP_PORT) || 587;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const toEmail = process.env.TO_EMAIL || 'garvitbansal2303@gmail.com';
      const meetLink = process.env.MEETING_LINK || 'https://meet.google.com/qeh-diqr-pek';

      if (!smtpUser || !smtpPass) {
        console.warn('[Book Call API Prod] SMTP credentials missing in .env. Logging details.');
        return res.status(200).json({ status: "mocked", message: "SMTP credentials not configured." });
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // 1. Client-Facing Confirmation Email
      const clientMailOptions = {
        from: `"AIMLpartner Consultation" <${smtpUser}>`,
        to: email,
        subject: `Confirmed: 1-on-1 AI Strategy Session - AIMLpartner`,
        html: `
          <div style="font-family: 'Outfit', 'Inter', sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #1e293b; margin: 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; background: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);">
              <!-- Header banner -->
              <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px; text-align: center; border-bottom: 3px solid #6366f1;">
                <img src="https://darkgray-finch-838850.hostingersite.com/wp-content/uploads/2026/04/WhatsApp_Image_2026-04-28_at_12.18.40_AM-removebg-preview.png" alt="AIMLpartner Logo" style="height: 45px; width: auto; display: block; margin: 0 auto;" />
                <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin-top: 20px; margin-bottom: 0; letter-spacing: -0.5px;">1-on-1 Session Confirmed</h1>
                <p style="color: #a5b4fc; font-size: 12px; margin-top: 5px; margin-bottom: 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">AI Operational Strategy</p>
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
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold; width: 30%;">Google Meet:</td>
                      <td style="padding: 6px 0;"><a href="${meetLink}" style="color: #6366f1; text-decoration: none; font-weight: 600;">Join Live GMeet Session</a></td>
                    </tr>
                  </table>
                  <p style="font-size: 11px; color: #64748b; margin-top: 15px; margin-bottom: 0; font-style: italic;">A Google Calendar invitation has been sent to your email.</p>
                </div>

                <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">What we'll accomplish on the call:</h3>
                <ul style="font-size: 13.5px; color: #475569; line-height: 1.6; padding-left: 20px;">
                  <li>Map your business's manual data pipelines and software silos</li>
                  <li>Evaluate specific low-code integrations and custom AI agent candidates</li>
                  <li>Structure a clear ROI and timeline roadmap with zero team disruption</li>
                </ul>

                <p style="font-size: 13.5px; line-height: 1.6; color: #475569; text-align: center; margin-top: 30px;">If you have any documents or workflow walkthroughs to share before the call, feel free to reply directly to this email!</p>
              </div>

              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 0 30px;" />

              <!-- Footer -->
              <div style="padding: 30px; text-align: center; background-color: #f8fafc;">
                <p style="font-size: 11px; color: #94a3b8; margin-top: 0; margin-bottom: 0;">&copy; 2026 AIMLpartner. All rights reserved.</p>
              </div>
            </div>
          </div>
        `
      };

      // 2. Admin-Facing Notification Email
      const adminMailOptions = {
        from: `"AIMLpartner Consultation" <${smtpUser}>`,
        to: toEmail,
        subject: `[Consultation Booked] Strategy Call scheduled by ${company || 'Visitor'} (${name})`,
        html: `
          <div style="font-family: sans-serif; color: #334155; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; padding: 25px; border-radius: 12px;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-top: 0;">New Consultation Call Booked!</h2>
            <p>A client has scheduled a 1-on-1 AI Strategy Session from the <strong>${source || 'Website'}</strong>.</p>
            
            <h3 style="color: #0284c7; border-bottom: 1px solid #f1f5f9; padding-bottom: 5px;">🗓️ Meeting Schedule</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 30%;">Date/Day:</td>
                <td style="padding: 6px 0; color: #4338ca; font-weight: bold;">${selectedDate}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Time slot:</td>
                <td style="padding: 6px 0; color: #4338ca; font-weight: bold;">${selectedTime}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 30%;">Meet Link:</td>
                <td style="padding: 6px 0;"><a href="${meetLink}">${meetLink}</a></td>
              </tr>
            </table>

            <h3 style="color: #0284c7; border-bottom: 1px solid #f1f5f9; padding-bottom: 5px;">Client Profile</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 30%;">Lead Name:</td>
                <td style="padding: 6px 0;">${name || 'Anonymous'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Work Email:</td>
                <td style="padding: 6px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Company Name:</td>
                <td style="padding: 6px 0;">${company || 'N/A'}</td>
              </tr>
            </table>
            
            <br/>
            <p style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-bottom: 0;">
              This email was automatically generated by the AIMLpartner Call Booking Engine.
            </p>
          </div>
        `
      };

      let inviteAttachments = [];
      if (selectedDate && selectedTime) {
        try {
          const icsContent = generateIcsContent(name || 'Visitor', email, selectedDate, selectedTime, false, smtpUser, meetLink);
          inviteAttachments.push({
            filename: 'invite.ics',
            content: Buffer.from(icsContent, 'utf-8'),
            contentType: 'text/calendar; charset=utf-8; method=REQUEST'
          });
        } catch (icsErr) {
          console.error('[Book Call API Prod] Failed to generate ICS calendar invite:', icsErr);
        }
      }

      console.log(`[Book Call API Prod] Sending email confirmation to client: ${email}...`);
      await transporter.sendMail({
        ...clientMailOptions,
        attachments: inviteAttachments
      });

      console.log(`[Book Call API Prod] Sending email notification to admin: ${toEmail}...`);
      const info = await transporter.sendMail({
        ...adminMailOptions,
        attachments: inviteAttachments
      });
      console.log(`[Book Call API Prod] Booked successfully: ${info.messageId}`);

      res.status(200).json({ status: "sent", messageId: info.messageId, meetLink });
    } catch (err) {
      console.error(`[Book Call API Prod Exception]:`, err);
      res.status(500).json({ error: "Failed to book call: " + err.message });
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
