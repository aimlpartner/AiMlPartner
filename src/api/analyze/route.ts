import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';

import path from 'path';

// Resolve and load .env using the absolute working directory path
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Helper to initialize GoogleGenAI lazily and fetch key dynamically at request time
function getGoogleGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[Analyzer API] Error: GEMINI_API_KEY environment variable is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

function parseDateTime(dateStr: string, timeStr: string): Date {
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
    
    const months: Record<string, number> = {
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

function formatIcsDateTime(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${y}${m}${d}T${h}${min}${s}`;
}

function generateIcsContent(name: string, email: string, selectedDate: string, selectedTime: string, isDemo: boolean, smtpUser: string, meetLink: string): string {
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
 * Strips all HTML tags, scripts, styles, and extracts pure visible web texts up to 40,000 characters.
 */
async function scrapeUrlText(url: string): Promise<string> {
  let targetUrl = url.trim();
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch website HTML: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();

    // Strip style tags and scripts along with their contents
    let text = html.replace(/<(script|style|head|noscript)\b[^>]*>([\s\S]*?)<\/\1>/gi, '');

    // Strip other HTML tags
    text = text.replace(/<[^>]+>/g, ' ');

    // Decode HTML entities
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    // Clean whitespace
    text = text.replace(/\s+/g, ' ').trim();

    // Slice up to 40k chars
    return text.substring(0, 40000);
  } catch (error: any) {
    console.error(`[Scraper Error] Failed to scrape ${url}:`, error.message || error);
    throw new Error(`Could not read website contents: ${error.message || 'Network error'}`);
  }
}

/**
 * Helper to determine if input string is a domain/URL or a plain name.
 */
function isDomainOrUrl(str: string): boolean {
  const cleaned = str.trim().replace(/^https?:\/\//i, '');
  return /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d+)?(\/.*)?$/.test(cleaned);
}

/**
 * Standard interface for the parsed AI response payload.
 */
interface AnalysisResult {
  _source?: 'gemini' | 'fallback';
  businessName: string;
  sector: string;
  executiveDiagnosis: string;
  readinessScore: number;
  readinessTier: 'Novice' | 'Exploring' | 'Operational' | 'Advanced';
  annualReclaimedROI: number;
  internalDragHours: number;
  reclaimedTimeHours: number;
  departments: Array<{
    name: string;
    icon: string; // Truck, Megaphone, FileText, Shield, Users, DollarSign, etc.
    weeklyTimeLeak: number;
    friction: string;
    resolution: string;
    playbook: {
      workflow: string;
      integrationPath: string;
      toolStack: string[];
      complexity: 'Low' | 'Medium' | 'High';
      timeline: string;
      successMetrics: string;
      roi: number;
      aimlPartnerServiceSuggestion: string;
    };
  }>;
  roadmap: {
    dataReadinessAssessment: string;
    phases: Array<{
      phaseNumber: number;
      title: string;
      duration: string;
      focus: string;
      milestones: string[];
    }>;
  };
  criticalRevenueLeak: {
    gapAnalysis: string;
    lostCapitalScale: string;
    agenticSolution: string;
  };
  tokenUsage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    groundingQueries: number;
    costUsd: number;
  };
}

/**
 * Helper to ensure a reliable fallback JSON in case of absolute API parse failure.
 */
function createFallbackResult(inputDesc: string): AnalysisResult {
  return {
    _source: 'fallback',
    tokenUsage: {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      groundingQueries: 0,
      costUsd: 0
    },
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
          roi: 24000,
          aimlPartnerServiceSuggestion: "AIMLpartner can configure and deploy this complete invoice pipeline in 14 days under a fixed-price Low-Code Pod, freeing your admin team from manual data logging."
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
          roi: 31000,
          aimlPartnerServiceSuggestion: "AIMLpartner's expert engineers can deploy this smart lead responder script behind your forms, guaranteeing immediate engagement with inbound prospects 24/7."
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

/**
 * Custom parsing wrapper to sanitize and extract JSON cleanly.
 */
function parseGeminiJson(rawText: string): any {
  // Strip markdown formatting fences if they exist
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    // Attempt regex-based extraction if there's garbage before/after the JSON
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (subError) {
        console.error("[JSON Regex Parse Error] Failed to parse matched segment:", subError);
      }
    }
    throw new Error("Could not parse JSON response from Gemini");
  }
}

/**
 * Controller function that handles the full AI diagnostics audit.
 */
export async function analyzeHandler(req: Request, res: Response): Promise<void> {
  const { url, description, fileContent } = req.body;

  const ai = getGoogleGenAI();
  if (!ai) {
    console.error("[Analyzer API] Gemini API Client is not configured (missing GEMINI_API_KEY).");
    res.status(503).json({ error: "AI analysis engine is not configured on the server. Please check your environment variables." });
    return;
  }

  let finalContext = "";
  let sourceChannel = "";

  try {
    // 1. Gather context from selected channel
    if (url) {
      const isUrl = isDomainOrUrl(url);
      if (isUrl) {
        console.log(`[Analyzer API] Scraping website: ${url}`);
        try {
          const scrapedText = await scrapeUrlText(url);
          finalContext = `Website scrape of business domain (${url}):\n\n${scrapedText}`;
          sourceChannel = `website URL (${url})`;
        } catch (scrapeErr: any) {
          console.warn(`[Analyzer API] Scraping failed for ${url}, continuing with search grounding.`, scrapeErr.message || scrapeErr);
          finalContext = `Website URL: ${url} (Scraping failed, please search the web for details about this company/domain)`;
          sourceChannel = `website URL (${url}) with search fallback`;
        }
      } else {
        console.log(`[Analyzer API] Treating input as company name: ${url}`);
        finalContext = `Company Name: ${url} (Please search the web for details about this company)`;
        sourceChannel = `company name (${url})`;
      }
    } else if (fileContent) {
      console.log(`[Analyzer API] Reading file attachment content`);
      finalContext = `Uploaded business operational brief content:\n\n${fileContent}`;
      sourceChannel = "uploaded document";
    } else if (description) {
      console.log(`[Analyzer API] Reading direct manual description`);
      finalContext = `Manually-provided company structure/processes context:\n\n${description}`;
      sourceChannel = "direct description text";
    } else {
      res.status(400).json({ error: "Missing diagnostic input context. Please provide a URL, description, or file content." });
      return;
    }

    // 2. Draft strict prompt detailing auditing constraints and schema rules
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
  "readinessTier": "Novice" | "Exploring" | "Operational" | "Advanced" (based on their score: 0-30=Novice, 31-60=Exploring, 61-85=Operational, 86-100=Advanced),
  "annualReclaimedROI": integer (Estimated annual dollar savings. Keep realistic e.g. between 30000 and 200000 depending on size/leakages),
  "internalDragHours": integer (Wasted manual hours weekly across all back-office administrative tasks),
  "reclaimedTimeHours": integer (Realistic hours per week that automations will reclaim. Must be less than internalDragHours),
  "departments": [
    {
      "name": "Department Name (e.g., Administration, Sales, Customer Support, Logistics)",
      "icon": "Lucide Icon name from: Truck | Megaphone | FileText | Shield | Users | DollarSign | ShieldCheck | Inbox | Layers | Headphones",
      "weeklyTimeLeak": integer (Hours leak per week in this department),
      "friction": "1-2 sentence description of manual friction (e.g., manually copying customer leads from sheets to CRM)",
      "resolution": "1-2 sentence description of the proposed automation solution",
      "playbook": {
        "workflow": "Short workflow explanation (e.g., Inbound E-mail -> AI Router -> CRM entry)",
        "integrationPath": "1-2 sentence explanation of custom integration path to prevent staff disruption",
        "toolStack": ["Make.com", "OpenAI API", "HubSpot", "Google Workspace", etc. (list 3-4 SaaS tool stacks)],
        "complexity": "Low" | "Medium" | "High",
        "timeline": "Timeline duration, e.g. '2 weeks' or '4 weeks'",
        "successMetrics": "Goal-oriented success metric (e.g., lead triage down to 2 mins)",
        "roi": integer (ROI for this specific department automation),
        "aimlPartnerServiceSuggestion": "A highly encouraging 2-sentence suggestion of how AIMLpartner can implement this exact playbook workflow for them (e.g. proposing AIMLpartner's low-code pod or expert agents, emphasizing quick rollout with no staff disruption)."
      }
    }
  ] (Provide exactly 2 to 3 audited departments),
  "roadmap": {
    "dataReadinessAssessment": "A brief 2-sentence summary of the business's formatting readiness (e.g. structured databases vs unstructured spreadsheets/PDF briefs).",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Phase 1 Title",
        "duration": "Duration in weeks",
        "focus": "Brief phase focal summary",
        "milestones": ["Milestone 1", "Milestone 2"]
      },
      {
        "phaseNumber": 2,
        "title": "Phase 2 Title",
        "duration": "Duration in weeks",
        "focus": "Brief phase focal summary",
        "milestones": ["Milestone 1", "Milestone 2"]
      }
    ]
  },
  "criticalRevenueLeak": {
    "gapAnalysis": "Why standard industry operations continue leaking capital (e.g., delay in replying to quotes)",
    "lostCapitalScale": "Wasted capital statistics in the wider industry sector",
    "agenticSolution": "Describe a customized agentic AI automation designed to seal this leak immediately"
  }
}`;

    console.log(`[Analyzer API] Sending prompt to Gemini 2.5 Flash...`);

    let aiResponse;
    try {
      // Execute the request utilizing Google's official grounding search tool
      aiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json',
        }
      });
    } catch (groundingError: any) {
      console.warn(`[Analyzer API] Grounding model call failed. Falling back to standard Flash.`, groundingError.message || groundingError);

      // Fallback in case Google Search grounding is not available on the api key or has hit limits
      aiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });
    }

    const rawText = aiResponse.text;
    if (!rawText) {
      throw new Error("Received empty response from Gemini API");
    }

    console.log(`[Analyzer API] Raw response received. Parsing...`);
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

    console.log(`[Analyzer API] Cost computed: $${costUsd.toFixed(6)} (In: ${promptTokens}, Out: ${completionTokens}, Grounding: ${hasGrounding ? 'Yes' : 'No'})`);

    // Validate fields to ensure dashboard rendering is bulletproof
    const validatedData: AnalysisResult = {
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
      readinessTier: ['Novice', 'Exploring', 'Operational', 'Advanced'].includes(parsedData.readinessTier)
        ? parsedData.readinessTier
        : 'Exploring',
      annualReclaimedROI: Number.isInteger(parsedData.annualReclaimedROI) ? parsedData.annualReclaimedROI : 75000,
      internalDragHours: Number.isInteger(parsedData.internalDragHours) ? parsedData.internalDragHours : 40,
      reclaimedTimeHours: Number.isInteger(parsedData.reclaimedTimeHours) ? parsedData.reclaimedTimeHours : 30,
      departments: Array.isArray(parsedData.departments) ? parsedData.departments.map((dept: any) => ({
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
      })) : createFallbackResult("").departments,
      roadmap: {
        dataReadinessAssessment: parsedData.roadmap?.dataReadinessAssessment || "Viable data format alignment available.",
        phases: Array.isArray(parsedData.roadmap?.phases) ? parsedData.roadmap.phases.map((phase: any) => ({
          phaseNumber: Number.isInteger(phase.phaseNumber) ? phase.phaseNumber : 1,
          title: phase.title || "Foundation Rollout",
          duration: phase.duration || "2 weeks",
          focus: phase.focus || "System architecture config",
          milestones: Array.isArray(phase.milestones) ? phase.milestones : ["System setup"]
        })) : createFallbackResult("").roadmap.phases,
      },
      criticalRevenueLeak: {
        gapAnalysis: parsedData.criticalRevenueLeak?.gapAnalysis || "Operational drag from manual handoffs.",
        lostCapitalScale: parsedData.criticalRevenueLeak?.lostCapitalScale || "$50,000 annually",
        agenticSolution: parsedData.criticalRevenueLeak?.agenticSolution || "Deploy CRM-synced automated webhook monitors."
      },
      _source: 'gemini'
    };

    console.log(`[Analyzer API] Analysis complete! Sending response...`);
    res.status(200).json(validatedData);
  } catch (err: any) {
    console.error(`[Analyzer API Exception]:`, err);
    res.status(502).json({ error: `AI analysis failed: ${err.message || 'Unknown Gemini error'}` });
  }
}

/**
 * Compiles in-memory PDF document using pdfkit.
 */
function generatePdfReport(data: any, leadEmail: string, leadName: string, leadCompany: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: any[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      // Design styling
      doc.fillColor('#0f172a').fontSize(24).font('Helvetica-Bold').text('AIMLpartner', { align: 'left' });
      doc.fillColor('#64748b').fontSize(10).font('Helvetica').text('ENTERPRISE AI OPERATIONAL DIAGNOSTIC REPORT', { align: 'left' });
      doc.moveDown(1.5);

      // Divider line
      doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(1.5);

      // Client profile
      doc.fillColor('#0f172a').fontSize(12).font('Helvetica-Bold').text('Client Profile:');
      doc.fillColor('#334155').fontSize(10).font('Helvetica')
        .text(`Name: ${leadName}`)
        .text(`Work Email: ${leadEmail}`)
        .text(`Company Name: ${leadCompany}`)
        .text(`Assessed Sector: ${data.sector}`);
      doc.moveDown(1.5);

      // Qualitative summary
      doc.fillColor('#0f172a').fontSize(14).font('Helvetica-Bold').text(`Executive AI Diagnostic Assessment for ${data.businessName}`);
      doc.moveDown(0.5);
      doc.fillColor('#334155').fontSize(10).font('Helvetica-Oblique').text(`"${data.executiveDiagnosis}"`, { lineGap: 4 });
      doc.moveDown(1.5);

      // Core KPI Table
      doc.fillColor('#0f172a').fontSize(12).font('Helvetica-Bold').text('Key Operational Diagnostics & ROI Potential');
      doc.moveDown(0.5);
      doc.fillColor('#334155').fontSize(10).font('Helvetica')
        .text(`- AI Readiness Score: ${data.readinessScore} / 100 (${data.readinessTier} Tier)`)
        .text(`- Weekly Manual Overhead Drag: ${data.internalDragHours} Hours`)
        .text(`- AI Reclaimable Efficiency Time: ${data.reclaimedTimeHours} Hours per Week`)
        .text(`- Projected Annual Reclaimed Capital ROI: $${data.annualReclaimedROI.toLocaleString()}`);
      doc.moveDown(1.5);

      // Departments Playbooks
      doc.fillColor('#0f172a').fontSize(14).font('Helvetica-Bold').text('Tactical Departmental Playbooks');
      doc.moveDown(0.5);
      data.departments.forEach((dept: any, index: number) => {
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

      // Roadmap
      doc.fillColor('#0f172a').fontSize(14).font('Helvetica-Bold').text('Tactical Launch Roadmap');
      doc.moveDown(0.5);
      doc.fillColor('#334155').fontSize(10).font('Helvetica').text(`Corporate Data Readiness Assessment:\n${data.roadmap.dataReadinessAssessment}`);
      doc.moveDown(0.5);
      data.roadmap.phases.forEach((phase: any) => {
        doc.fillColor('#334155').fontSize(10).font('Helvetica-Bold').text(`Phase ${phase.phaseNumber}: ${phase.title} (Duration: ${phase.duration})`);
        doc.fillColor('#475569').fontSize(9).font('Helvetica').text(`Focus: ${phase.focus}`);
        doc.text('Key Engineering Milestones:');
        phase.milestones.forEach((m: string) => {
          doc.text(`  - ${m}`);
        });
        doc.moveDown(0.5);
      });
      doc.moveDown(1);

      // Confidential Industry Leak (Included in PDF!)
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

/**
 * Controller to generate proper PDF and email it directly.
 */
export async function emailReportHandler(req: Request, res: Response): Promise<void> {
  const { email, name, company, analysisResult } = req.body;

  if (!email || !analysisResult) {
    res.status(400).json({ error: "Missing required e-mail lead metadata or analysis contents." });
    return;
  }

  try {
    console.log(`[Email API] Generating PDF report buffer for ${analysisResult.businessName}...`);
    const pdfBuffer = await generatePdfReport(analysisResult, email, name || "Visitor", company || "N/A");

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.TO_EMAIL || 'manusingh72002@gmail.com';

    if (!smtpUser || !smtpPass) {
      console.warn('[Email API] SMTP credentials not configured in .env. Logging report instead.');
      res.status(200).json({
        status: "mocked",
        message: "Report logged. To receive proper emails, please supply SMTP_USER and SMTP_PASS secrets in your .env configuration."
      });
      return;
    }

    console.log(`[Email API] Initializing Nodemailer transporter...`);
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const websiteUrl = req.headers.origin || 'https://aimlpartner.com';

    // 1. Client-Facing Diagnostic Report Email Options
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
                      <span style="font-size: 28px; font-weight: 800; color: #16a34a; display: block;">$${analysisResult.annualReclaimedROI.toLocaleString()}</span>
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
                ${analysisResult.departments.map((dept: any, idx: number) => `
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
        },
      ],
    };

    // 2. Admin-Facing Notification Email Options
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
        },
      ],
    };

    console.log(`[Email API] Sending email report to client: ${email}...`);
    await transporter.sendMail(clientMailOptions);

    console.log(`[Email API] Sending email report to admin: ${toEmail}...`);
    const info = await transporter.sendMail(adminMailOptions);
    console.log(`[Email API] Transmitted successfully to both: ${info.messageId}`);

    res.status(200).json({ status: "sent", messageId: info.messageId });
  } catch (err: any) {
    console.error(`[Email API Exception]:`, err);
    res.status(500).json({ error: "Failed to compile or email the audit report: " + err.message });
  }
}

/**
 * Controller to handle "Let's Build It" dynamic agent requests.
 * Uses Gemini to generate a highly sophisticated system prompt for AI Studio,
 * then emails the details to support@brandtopost.com.
 */
export async function buildRequestHandler(req: Request, res: Response): Promise<void> {
  const { email, name, company, departmentName, answers, playbookDetails, analysisResult, selectedDate, selectedTime } = req.body;

  if (!email || !departmentName || !answers || !playbookDetails) {
    res.status(400).json({ error: "Missing required client customization parameters." });
    return;
  }

  const ai = getGoogleGenAI();
  if (!ai) {
    res.status(500).json({ error: "Gemini API Client is not configured. Please supply GEMINI_API_KEY." });
    return;
  }

  try {
    // 1. Construct prompt for Gemini to compile the absolute ultimate Google AI Studio system prompt!
    const answersText = answers.map((a: any, i: number) => `Q${i + 1}: ${a.question}\nA${i + 1}: ${a.answer}`).join('\n\n');

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

    console.log(`[Build Request API] Calling Gemini to generate AI Studio System Prompt...`);
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: systemPromptDraftInstruction
    });

    const systemPromptText = aiResponse.text;
    if (!systemPromptText) {
      throw new Error("Gemini returned empty text for AI Studio prompt generation.");
    }

    // 2. Transmit the details to the administrator and client
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.TO_EMAIL || 'garvitbansal2303@gmail.com';
    const meetLink = process.env.MEETING_LINK || 'https://meet.google.com/qeh-diqr-pek';

    if (!smtpUser || !smtpPass) {
      console.warn('[Build Request API] SMTP credentials missing in .env. Logging details.');
      console.log('--- GENERATED GOOGLE AI STUDIO SYSTEM PROMPT ---');
      console.log(systemPromptText);
      res.status(200).json({ status: "mocked", prompt: systemPromptText });
      return;
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
                ${answers.map((a: any) => `
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
            ${answers.map((a: any, i: number) => `
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

    let inviteAttachments: any[] = [];
    if (selectedDate && selectedTime) {
      try {
        const icsContent = generateIcsContent(name || 'Visitor', email, selectedDate, selectedTime, true, smtpUser, meetLink);
        inviteAttachments.push({
          filename: 'invite.ics',
          content: Buffer.from(icsContent, 'utf-8'),
          contentType: 'text/calendar; charset=utf-8; method=REQUEST'
        });
      } catch (icsErr) {
        console.error('[Build Request API] Failed to generate ICS calendar invite:', icsErr);
      }
    }

    console.log(`[Build Request API] Sending email confirmation to client: ${email}...`);
    await transporter.sendMail({
      ...clientMailOptions,
      attachments: inviteAttachments
    });

    console.log(`[Build Request API] Sending email blueprint to admin: ${toEmail}...`);
    const info = await transporter.sendMail({
      ...adminMailOptions,
      attachments: inviteAttachments
    });
    console.log(`[Build Request API] Transmitted successfully to both: ${info.messageId}`);

    res.status(200).json({ status: "sent", messageId: info.messageId, meetLink });
  } catch (err: any) {
    console.error(`[Build Request API Exception]:`, err);
    res.status(500).json({ error: "Failed to compile AI Studio blueprint or send email: " + err.message });
  }
}

/**
 * Controller to handle consultation call bookings.
 * Emails a GMeet confirmation to the client and a lead notification to support@brandtopost.com.
 */
export async function bookCallHandler(req: Request, res: Response): Promise<void> {
  const { name, email, company, selectedDate, selectedTime, source } = req.body;

  if (!email || !selectedDate || !selectedTime) {
    res.status(400).json({ error: "Missing required booking details (email, date, or time)." });
    return;
  }

  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.TO_EMAIL || 'garvitbansal2303@gmail.com';
    const meetLink = process.env.MEETING_LINK || 'https://meet.google.com/qeh-diqr-pek';

    if (!smtpUser || !smtpPass) {
      console.warn('[Book Call API] SMTP credentials missing in .env. Logging details.');
      res.status(200).json({ status: "mocked", message: "SMTP credentials not configured." });
      return;
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

    let inviteAttachments: any[] = [];
    if (selectedDate && selectedTime) {
      try {
        const icsContent = generateIcsContent(name || 'Visitor', email, selectedDate, selectedTime, false, smtpUser, meetLink);
        inviteAttachments.push({
          filename: 'invite.ics',
          content: Buffer.from(icsContent, 'utf-8'),
          contentType: 'text/calendar; charset=utf-8; method=REQUEST'
        });
      } catch (icsErr) {
        console.error('[Book Call API] Failed to generate ICS calendar invite:', icsErr);
      }
    }

    console.log(`[Book Call API] Sending email confirmation to client: ${email}...`);
    await transporter.sendMail({
      ...clientMailOptions,
      attachments: inviteAttachments
    });

    console.log(`[Book Call API] Sending email notification to admin: ${toEmail}...`);
    const info = await transporter.sendMail({
      ...adminMailOptions,
      attachments: inviteAttachments
    });
    console.log(`[Book Call API] Booked successfully: ${info.messageId}`);

    res.status(200).json({ status: "sent", messageId: info.messageId, meetLink });
  } catch (err: any) {
    console.error(`[Book Call API Exception]:`, err);
    res.status(500).json({ error: "Failed to book call: " + err.message });
  }
}
