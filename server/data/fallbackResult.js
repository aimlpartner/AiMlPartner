/**
 * Fallback analysis result used when Gemini returns invalid data.
 * Also contains the Gemini analysis prompt template.
 */

export function createFallbackResult() {
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

/**
 * Builds the Gemini analysis prompt with the given context.
 */
export function buildAnalysisPrompt(sourceChannel, finalContext) {
  return `You are a high-fidelity Enterprise AI Strategy Auditor. Analyze the following unstructured context about a business:
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
}
