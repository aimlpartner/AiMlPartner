import React, { useState, useEffect, useRef } from 'react';

interface Scenario {
  id: string;
  name: string;
  icon: string;
  inputText: string;
  logs: string[];
  outputJson: Record<string, any>;
  actionText: string;
  actionIcon: string;
  actionColor: string;
  actionDetails: Record<string, string>;
}

export function WorkflowSimulator() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('lead');
  const [customInput, setCustomInput] = useState<string>(
    "Hey! I'm Alex from Vercel. We need to buy 30 licenses for our product engineering team. We are hoping to integrate this with Slack and get it rolling by next week. Let's discuss pricing!"
  );
  
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState<number>(1); // 1: Input, 2: Core, 3: Output
  
  const terminalRef = useRef<HTMLDivElement>(null);

  const scenarios: Scenario[] = [
    {
      id: 'lead',
      name: 'Lead Enrichment',
      icon: 'ph-user-focus',
      inputText: "Hey! I'm Sarah from Stripe. We're looking to automate our user onboarding workflows. We have about 250 customer success managers and would love to kick off in July. Let's schedule a call next Tuesday.",
      logs: [
        "[0.1s] Inbound webhook received from GMail webhook trigger.",
        "[0.4s] Running layout extraction & key entity recognition...",
        "[0.7s] Company match isolated: 'Stripe' (Fintech, 8000+ employees, stripe.com).",
        "[1.1s] Extracted parameters: Timeline='July', Seats=250, Intent='Enterprise Purchase'.",
        "[1.4s] Synthesizing context-aware enterprise sales pitch response...",
        "[1.8s] Syncing lead details with Salesforce CRM database nodes.",
        "[2.2s] Action complete: Salesforce record synced & Slack alert broadcasted."
      ],
      outputJson: {
        "lead": {
          "name": "Sarah",
          "company": "Stripe",
          "domain": "stripe.com",
          "employees": "8,000+",
          "industry": "Fintech"
        },
        "deal_info": {
          "seats_requested": 250,
          "target_launch": "July 2026",
          "lead_tier": "Enterprise (Tier 1) 🔥",
          "confidence_score": "98%"
        }
      },
      actionText: "Salesforce CRM & Slack Alert Synced",
      actionIcon: "ph-slack-logo",
      actionColor: "text-indigo-400 bg-indigo-950/40 border-indigo-800/40",
      actionDetails: {
        "Salesforce Record": "LEAD_STRIPE_99182A",
        "Routed Team": "Global Inbound Enterprise",
        "Auto-Draft Email": "Hi Sarah, saw Stripe is looking to automate onboarding for 250 CSMs. Let's show you our custom templates..."
      }
    },
    {
      id: 'support',
      name: 'Support Triage',
      icon: 'ph-ticket',
      inputText: "Error code 401: Unauthorized access on endpoint /v1/enrich. Our API token was refreshed yesterday, but the Node.js SDK keeps crashing. We checked billing and it shows active status. Urgently need help.",
      logs: [
        "[0.1s] Customer ticket logged via Intercom webhook stream.",
        "[0.4s] Scanning stack trace logs for signatures: Found '401 Unauthorized'.",
        "[0.8s] Checking backend DB: API Key exists, Active=True, Scope='Read/Write'.",
        "[1.1s] Isolating request headers: Bearer token is missing 'Bearer ' prefix.",
        "[1.5s] Root cause identified: Client-side SDK initialization omitted token prefix.",
        "[1.9s] Compiling developer remediation snippet & drafting support ticket reply...",
        "[2.2s] Action complete: Developer auto-reply queued & P1 ticket routed to team Slack."
      ],
      outputJson: {
        "ticket_id": "TKT-44021-API",
        "priority": "High (P1) 🚨",
        "system": {
          "endpoint": "/v1/enrich",
          "error_code": "401",
          "language": "Node.js SDK"
        },
        "diagnostic": {
          "root_cause": "Missing Bearer prefix in Authorization header",
          "remediation": "Prepend 'Bearer ' to your API token string in client configuration."
        }
      },
      actionText: "Dev Auto-Reply & P1 Slack Notification",
      actionIcon: "ph-paper-plane-tilt",
      actionColor: "text-[#1A7B6B] bg-[#EAF6F4]/10 border-[#BFE3DC]/30",
      actionDetails: {
        "Ticket Reference": "TKT-44021-API",
        "Assigned Escalation": "Engineering Core Tier 2",
        "Proposed Resolution": "Hello, we verified your billing is active. The 401 is due to a missing prefix. Please configure your client as: headers['Authorization'] = `Bearer ${token}`..."
      }
    },
    {
      id: 'invoice',
      name: 'Document OCR',
      icon: 'ph-file-pdf',
      inputText: "[PDF SCAN INBOUND]\nINVOICE #: INV-2026-9092\nVendor: AIMLPartner Labs Inc.\nDate: June 4, 2026\nDue Date: July 4, 2026\nLine Item 1: Hosting & Node Cluster Management: $4,500.00\nLine Item 2: Enterprise Agent Fine-Tuning: $7,950.00\nTOTAL DUE: $12,450.00\nPayment Terms: Net 30\nBank Route: US-WF-882710",
      logs: [
        "[0.1s] Inbound attachment inv_9092.pdf parsed from billing@ inbox.",
        "[0.4s] Initiating high-resolution OCR visual document layout extraction...",
        "[0.8s] Key fields parsed: Vendor='AIMLPartner Labs', Amount=$12,450.00.",
        "[1.2s] Database cross-reference: Vendor bank route verified (US-WF-882710).",
        "[1.5s] Validation: Matching corporate Purchase Order PO-2026-881.",
        "[1.9s] Auto-Approval check: Amount ($12,450.00) is below internal limit of $15,000.",
        "[2.2s] Action complete: Approved status pushed to ERP & Stripe payout queued."
      ],
      outputJson: {
        "invoice_meta": {
          "invoice_number": "INV-2026-9092",
          "vendor": "AIMLPartner Labs Inc.",
          "amount_due_usd": 12450.00,
          "due_date": "2026-07-04"
        },
        "procurement": {
          "matched_po": "PO-2026-881",
          "po_compliance": "PASSED",
          "auto_approved": true
        },
        "financials": {
          "ledger_account": "6120 - Cloud Computing Infrastructure",
          "stripe_payout_status": "QUEUED"
        }
      },
      actionText: "Approved & Stripe Payout Triggered",
      actionIcon: "ph-credit-card",
      actionColor: "text-amber-400 bg-amber-950/40 border-amber-800/40",
      actionDetails: {
        "Payout ID": "po_stripe_aiml_inv9092",
        "Ledger Code": "6120-INFRA-LLM",
        "Payout Date": "July 4, 2026 (Net 30 terms)"
      }
    }
  ];

  // Auto-scroll terminal to bottom when new logs are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [simulationLogs]);

  // Handle switching tabs
  const handleTabSwitch = (id: string) => {
    if (isSimulating) return; // Block switches during run
    setActiveScenarioId(id);
    setSimulationLogs([]);
    setSimulationStep(0);
    setActiveStep(1);
  };

  // Get active scenario data (including sandbox dynamic construction)
  const getActiveScenario = (): Scenario => {
    if (activeScenarioId === 'sandbox') {
      // Dynamic parse of Sandbox Input
      const text = customInput;
      const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
      const email = emailMatch ? emailMatch[0] : "not_found@anonymous.com";
      
      const seatsMatch = text.match(/\b\d+\s*(licenses|users|seats|people|CSMs|team members|devs|agents)?\b/i);
      const seats = seatsMatch ? parseInt(seatsMatch[0]) : 10;

      const companyMatch = text.match(/(?:from|at|represent|of)\s+([A-Z][a-zA-Z0-9]*)/);
      const company = companyMatch ? companyMatch[1] : "Acme Corp";

      const nameMatch = text.match(/(?:I'm|I am|my name is|contact)\s+([A-Z][a-zA-Z0-9]*)/i);
      const name = nameMatch ? nameMatch[1] : "Alex";

      const logs = [
        "[0.1s] Sandbox input received. Compiling sandbox runtime parameters...",
        "[0.4s] Initiating dynamic regex entity analysis & NLP matching...",
        `[0.8s] Parsed user profile: Name='${name}', Company='${company}', Contact='${email}'.`,
        `[1.2s] Identified metrics: Requested Capacity=${seats} seats.`,
        "[1.5s] Synthesizing custom response payload & webhook schema...",
        "[1.9s] Structuring JSON mapping to target database API endpoints.",
        `[2.2s] Action complete: Customer lead profile created for ${name} at ${company}.`
      ];

      const outputJson = {
        "sandbox_extraction": {
          "status": "Success",
          "nlp_certainty": "84%",
          "ingest_timestamp": new Date().toISOString()
        },
        "extracted_entity": {
          "name": name,
          "organization": company,
          "email_address": email
        },
        "order_details": {
          "estimated_volume": seats,
          "priority_tier": seats >= 50 ? "Enterprise Tier" : "Growth Tier",
          "follow_up_required": true
        }
      };

      return {
        id: 'sandbox',
        name: 'Custom Sandbox',
        icon: 'ph-terminal',
        inputText: customInput,
        logs,
        outputJson,
        actionText: "Sandbox Payload Synthesized",
        actionIcon: "ph-braces",
        actionColor: "text-blue-400 bg-blue-950/40 border-blue-800/40",
        actionDetails: {
          "Extracted Email": email,
          "Calculated Volume": `${seats} seats`,
          "Status Code": "API_INGESTION_SUCCESS (201)"
        }
      };
    }
    
    return scenarios.find(s => s.id === activeScenarioId) || scenarios[0];
  };

  const currentScenario = getActiveScenario();

  // Run the step-by-step simulator
  const runSimulation = () => {
    if (isSimulating) return;
    
    setIsSimulating(true);
    setSimulationLogs([]);
    setSimulationStep(0);
    setActiveStep(1);

    const logsList = currentScenario.logs;
    
    // Step 0: Ingest
    setSimulationLogs([logsList[0]]);
    
    // Step 1: Core Processing Start (0.5s)
    setTimeout(() => {
      setActiveStep(2);
      setSimulationLogs(prev => [...prev, logsList[1]]);
    }, 600);

    // Step 2: Intermediate Logs
    setTimeout(() => {
      setSimulationLogs(prev => [...prev, logsList[2]]);
    }, 1100);

    setTimeout(() => {
      setSimulationLogs(prev => [...prev, logsList[3]]);
    }, 1600);

    setTimeout(() => {
      setSimulationLogs(prev => [...prev, logsList[4]]);
    }, 2100);

    // Step 3: Pushing Output (2.6s)
    setTimeout(() => {
      setActiveStep(3);
      setSimulationLogs(prev => [...prev, logsList[5]]);
    }, 2600);

    // Step 4: Finished (3.2s)
    setTimeout(() => {
      setSimulationLogs(prev => [...prev, logsList[6]]);
      setIsSimulating(false);
    }, 3200);
  };

  return (
    <div className="w-full relative bg-zinc-950 text-white rounded-[2rem] border border-zinc-800 p-6 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden font-sans">
      {/* Decorative neon blur dots representing the AI energy */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[250px] h-[250px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
      
      {/* Simulation Lab Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-500 font-mono text-xs uppercase tracking-widest font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Simulation Lab Console
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white font-display">
            Evaluate LLM Orchestration in Real-Time
          </h3>
        </div>

        {/* Dynamic Scenario Select Tabs */}
        <div className="flex flex-wrap p-1 bg-zinc-900 border border-zinc-800 rounded-xl gap-1">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => handleTabSwitch(s.id)}
              disabled={isSimulating}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg uppercase tracking-wider transition-all duration-300 ${
                activeScenarioId === s.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-50'
              }`}
            >
              <i className={`ph-bold ${s.icon}`}></i>
              {s.name}
            </button>
          ))}
          <button
            onClick={() => handleTabSwitch('sandbox')}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg uppercase tracking-wider transition-all duration-300 ${
              activeScenarioId === 'sandbox'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-50'
            }`}
          >
            <i className="ph-bold ph-terminal"></i>
            Custom Sandbox
          </button>
        </div>
      </div>

      {/* Main Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-6 md:gap-4 items-stretch relative">
        
        {/* PANEL 1: DATA STREAM INPUT (Left 4 cols) */}
        <div className={`md:col-span-4 flex flex-col justify-between bg-zinc-900/60 border rounded-2xl p-5 md:p-6 backdrop-blur-md shadow-inner transition-all duration-500 ${
          activeStep === 1 ? 'border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.15)]' : 'border-zinc-800'
        }`}>
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
                <i className="ph-fill ph-file-text text-blue-500"></i>
                Unstructured Input
              </span>
              <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase tracking-wider">
                Raw Text
              </span>
            </div>

            {activeScenarioId === 'sandbox' ? (
              <div className="relative">
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  disabled={isSimulating}
                  rows={6}
                  placeholder="Type custom text (e.g. including emails, companies, name and numbers) to watch the agent parse it live..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 placeholder-zinc-600 focus:border-blue-500 focus:outline-none resize-none shadow-inner leading-relaxed transition-all"
                />
                <div className="absolute right-2 bottom-3 text-[9px] font-mono text-zinc-500">
                  Editable Sandbox
                </div>
              </div>
            ) : (
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 min-h-[140px] font-mono text-xs leading-relaxed text-zinc-300 select-all whitespace-pre-wrap select-none border-dashed">
                {currentScenario.inputText}
              </div>
            )}
            
            <p className="text-[11px] text-zinc-500 mt-4 leading-relaxed font-medium">
              In this stage, incoming logs, emails, files or manual inputs represent messy, un-structured data formats before agent parsing.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                isSimulating
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]'
              }`}
            >
              {isSimulating ? (
                <>
                  <i className="ph-bold ph-spinner animate-spin"></i>
                  Executing Logic...
                </>
              ) : (
                <>
                  <i className="ph-bold ph-play-circle text-sm"></i>
                  Trigger Agent Run
                </>
              )}
            </button>
          </div>
        </div>

        {/* CONNECTOR 1: Left -> Center (1 col) */}
        <div className="md:col-span-1 flex items-center justify-center">
          <Connector active={isSimulating && activeStep <= 2} />
        </div>

        {/* PANEL 2: AGENT REACTOR CORE (Center 3 cols) */}
        <div className={`md:col-span-3 flex flex-col items-center justify-between bg-zinc-900/40 border rounded-2xl p-5 md:p-6 backdrop-blur-md shadow-inner transition-all duration-500 ${
          activeStep === 2 ? 'border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.15)]' : 'border-zinc-800'
        }`}>
          <div className="w-full">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
                <i className="ph-fill ph-magic-wand text-blue-500"></i>
                Agent Logic Reactor
              </span>
            </div>

            {/* Rotating Core Visualization */}
            <div className="flex items-center justify-center py-4 relative">
              <div className={`relative w-28 h-28 flex items-center justify-center rounded-full transition-all duration-700 ${
                activeStep === 2 ? 'scale-105' : 'scale-100'
              }`}>
                {/* Neon Glow base */}
                <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-700 opacity-60 ${
                  activeStep === 2 ? 'bg-blue-600/30' : 'bg-zinc-800/10'
                }`}></div>

                {/* Outer concentric dashed ring */}
                <div className={`absolute inset-0 rounded-full border border-dashed border-zinc-700 animate-[spin_20s_linear_infinite] ${
                  activeStep === 2 ? 'border-blue-500/60' : ''
                }`}></div>

                {/* Middle concentric dotted ring */}
                <div className={`absolute inset-2 rounded-full border-2 border-dotted border-zinc-800 animate-[spin_10s_linear_infinite_reverse] ${
                  activeStep === 2 ? 'border-indigo-500/40' : ''
                }`}></div>

                {/* Inner glowing core boundary */}
                <div className={`absolute inset-4 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-950 transition-colors duration-500 ${
                  activeStep === 2 ? 'border-blue-400' : ''
                }`}></div>

                {/* Core Magic Wand Icon */}
                <div className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-500 ${
                  activeStep === 2 
                    ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)] animate-pulse' 
                    : 'bg-zinc-800'
                }`}>
                  <i className={`ph-fill ph-cpu text-lg ${activeStep === 2 ? 'animate-[spin_4s_linear_infinite]' : ''}`}></i>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Console Logger */}
          <div className="w-full mt-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 font-mono text-[10px] leading-relaxed text-zinc-400 h-36 overflow-y-auto shadow-inner flex flex-col gap-1.5 scroll-smooth" ref={terminalRef}>
              {simulationLogs.length === 0 ? (
                <div className="text-zinc-600 italic select-none">
                  // Terminal idle.<br/>
                  // Click 'Trigger Agent Run' to initialize.
                </div>
              ) : (
                simulationLogs.map((log, index) => {
                  let logColor = "text-zinc-300";
                  if (log.includes("[0.1s]")) logColor = "text-blue-400";
                  if (log.includes("complete:") || log.includes("Success")) logColor = "text-emerald-400";
                  return (
                    <div key={index} className={`${logColor} border-l-2 border-zinc-800 pl-2 leading-normal break-words`}>
                      {log}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* CONNECTOR 2: Center -> Right (1 col) */}
        <div className="md:col-span-1 flex items-center justify-center">
          <Connector active={isSimulating && activeStep === 3} />
        </div>

        {/* PANEL 3: STRUCTURED OUTCOME (Right 4 cols) */}
        <div className={`md:col-span-4 flex flex-col justify-between bg-zinc-900/60 border rounded-2xl p-5 md:p-6 backdrop-blur-md shadow-inner transition-all duration-500 ${
          activeStep === 3 ? 'border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.15)]' : 'border-zinc-800'
        }`}>
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
                <i className="ph-fill ph-database text-blue-500"></i>
                Structured Outcome
              </span>
              <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase tracking-wider">
                JSON Object
              </span>
            </div>

            {/* Structured Box */}
            <div className="relative">
              {simulationLogs.length < 6 ? (
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 h-48 flex flex-col items-center justify-center text-center select-none relative overflow-hidden">
                  {/* Subtle placeholder pulses */}
                  <div className={`w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-700 bg-zinc-900/40 mb-3 ${
                    isSimulating ? 'animate-bounce' : ''
                  }`}>
                    <i className="ph-bold ph-braces text-lg"></i>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-medium">
                    {isSimulating ? "Compiling payload..." : "Awaiting agent run validation..."}
                  </span>
                </div>
              ) : (
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 h-48 overflow-y-auto font-mono text-[11px] text-indigo-300 leading-relaxed scroll-smooth">
                  <pre className="text-left font-sans whitespace-pre-wrap leading-tight text-indigo-300 select-all">
                    {JSON.stringify(currentScenario.outputJson, null, 2)
                      .replace(/({|}|\[|\])/g, (m) => `<span class="text-zinc-500">${m}</span>`)
                      .replace(/"([^"]+)":/g, (m) => `<span class="text-zinc-300">${m}</span>`)
                      .replace(/: "([^"]+)"/g, (m) => `: <span class="text-emerald-400">${m.substring(2)}</span>`)
                      .split("\n")
                      .map((line, lidx) => (
                        <div key={lidx} dangerouslySetInnerHTML={{ __html: line }} />
                      ))
                    }
                  </pre>
                </div>
              )}
            </div>

            {/* Target Integration Action Card */}
            <div className="mt-4">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold block mb-2">
                Automated System Event
              </span>
              
              {simulationLogs.length < 7 ? (
                <div className="border border-dashed border-zinc-800 rounded-xl p-4 bg-zinc-950/20 text-center text-xs text-zinc-600 italic select-none">
                  // Event actions trigger automatically on completion.
                </div>
              ) : (
                <div className={`border rounded-xl p-4 flex flex-col gap-2 shadow-lg animate-[fadeIn_0.5s_ease-out] border-zinc-800`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${currentScenario.actionColor}`}>
                      <i className={`ph-bold ${currentScenario.actionIcon} text-sm`}></i>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-semibold">Webhook Success</div>
                      <div className="text-[11px] font-bold text-white leading-none mt-0.5">{currentScenario.actionText}</div>
                    </div>
                  </div>
                  <div className="bg-zinc-950 border border-zinc-850 rounded-lg p-2.5 text-[9px] font-mono text-zinc-400 space-y-1">
                    {Object.entries(currentScenario.actionDetails).map(([key, val]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:justify-between border-b border-zinc-900 pb-1 last:border-0 last:pb-0 gap-0.5">
                        <span className="text-zinc-500 font-bold uppercase shrink-0">{key}:</span>
                        <span className="text-zinc-300 font-medium break-all select-all sm:text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Sub-connector component that routes responsive svg line pathways
function Connector({ active }: { active: boolean }) {
  return (
    <div className="flex md:flex-col items-center justify-center py-4 md:py-0 md:px-2 z-10 shrink-0 select-none">
      {/* Desktop Horizontal Line */}
      <div className="hidden md:flex flex-col items-center w-8">
        <svg className="w-12 h-6 overflow-visible" fill="none">
          <path
            d="M0,12 L48,12"
            stroke={active ? "#2563EB" : "#27272A"}
            strokeWidth="2"
            strokeDasharray="6 4"
            className={active ? "animate-dash" : ""}
          />
          {active && (
            <circle r="4" fill="#2563EB">
              <animateMotion dur="1.5s" repeatCount="indefinite" path="M0,12 L48,12" />
            </circle>
          )}
        </svg>
      </div>

      {/* Mobile Vertical Line */}
      <div className="flex md:hidden flex-row items-center h-8">
        <svg className="h-12 w-6 overflow-visible" fill="none">
          <path
            d="M12,0 L12,48"
            stroke={active ? "#2563EB" : "#27272A"}
            strokeWidth="2"
            strokeDasharray="6 4"
            className={active ? "animate-dash" : ""}
          />
          {active && (
            <circle r="4" fill="#2563EB">
              <animateMotion dur="1.5s" repeatCount="indefinite" path="M12,0 L12,48" />
            </circle>
          )}
        </svg>
      </div>
    </div>
  );
}
