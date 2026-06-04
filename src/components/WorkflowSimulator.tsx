import React, { useState, useEffect } from 'react';

interface Scenario {
  id: string;
  name: string;
  icon: string;
  sourceType: string;
  inputText: string;
  processingState: string;
  outputJson: Record<string, any>;
  actionText: string;
  actionIcon: string;
  actionColor: string;
}

export function WorkflowSimulator() {
  const [scenarioIndex, setScenarioIndex] = useState<number>(0);
  const [step, setStep] = useState<'ingest' | 'process' | 'output'>('ingest');

  const scenarios: Scenario[] = [
    {
      id: 'lead',
      name: 'Lead Enrichment',
      icon: 'ph-user-focus',
      sourceType: 'Inbound Email',
      inputText: '"Hey! I\'m Sarah from Stripe. We\'re looking to automate our user onboarding. We have 250 CSMs and want to kick off in July. Let\'s talk."',
      processingState: 'Enriching Profile & Classifying Intent...',
      outputJson: {
        "company": "Stripe",
        "seats": 250,
        "timeline": "July 2026",
        "tier": "Enterprise 🔥"
      },
      actionText: "Salesforce Lead Synced & Slack Emailed",
      actionIcon: "ph-slack-logo",
      actionColor: "text-blue-400 bg-blue-950/40 border-blue-800/40"
    },
    {
      id: 'support',
      name: 'Support Triage',
      icon: 'ph-ticket',
      sourceType: 'API Stacktrace',
      inputText: '"Error code 401: Unauthorized access on endpoint /v1/enrich. Our billing is active, but client initialization keeps failing."',
      processingState: 'Isolating Header & Formatting Remediation...',
      outputJson: {
        "error": "401 Unauthorized",
        "diagnostics": "Missing Bearer token prefix",
        "priority": "P1 Escalation 🚨"
      },
      actionText: "Dev Auto-Reply & P1 Slack Routed",
      actionIcon: "ph-paper-plane-tilt",
      actionColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800/40"
    },
    {
      id: 'invoice',
      name: 'Document OCR',
      icon: 'ph-file-pdf',
      sourceType: 'Inbound Invoice PDF',
      inputText: '"[PDF Scan] INV-2026-9092 | Vendor: AIMLPartner Labs | Total Due: $12,450.00 | Compliance Match PO-2026-881 | Net 30 terms"',
      processingState: 'Validating PO Match & Checking Thresholds...',
      outputJson: {
        "vendor": "AIMLPartner Labs",
        "amount": 12450.00,
        "auto_approved": true,
        "payout": "Stripe ERP API"
      },
      actionText: "ERP Ledger Updated & Stripe Paid",
      actionIcon: "ph-credit-card",
      actionColor: "text-amber-400 bg-amber-950/40 border-amber-800/40"
    }
  ];

  const currentScenario = scenarios[scenarioIndex];

  // Auto-play steps cycle
  useEffect(() => {
    setStep('ingest');

    // Trigger core processing after 1.5s
    const processTimeout = setTimeout(() => {
      setStep('process');
    }, 1500);

    // Trigger structured output after 3.2s
    const outputTimeout = setTimeout(() => {
      setStep('output');
    }, 3200);

    return () => {
      clearTimeout(processTimeout);
      clearTimeout(outputTimeout);
    };
  }, [scenarioIndex]);

  // Cycle scenarios index every 5.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setScenarioIndex((prev) => (prev + 1) % scenarios.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full relative bg-zinc-950 text-white rounded-[2rem] border border-zinc-800 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-sans select-none">
      {/* Decorative neon blur dots representing the AI energy */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[200px] h-[200px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Main Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center relative z-10">
        
        {/* PANEL 1: DATA STREAM INPUT (Left 4 cols) */}
        <div className={`md:col-span-4 flex flex-col justify-between bg-zinc-900/40 border rounded-2xl p-5 min-h-[220px] transition-all duration-500 ${
          step === 'ingest' ? 'border-blue-500/80 shadow-[0_0_15px_rgba(37,99,235,0.15)] bg-zinc-900/80' : 'border-zinc-850'
        }`}>
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
                <i className="ph-fill ph-file-text text-blue-500"></i>
                Source Ingestion
              </span>
              <span className="text-[9px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded uppercase tracking-wider">
                {currentScenario.sourceType}
              </span>
            </div>
            
            <div className="bg-zinc-950/80 border border-zinc-850 rounded-xl p-3 min-h-[90px] font-mono text-[11px] leading-relaxed text-zinc-300 whitespace-pre-wrap transition-opacity duration-300">
              {currentScenario.inputText}
            </div>
          </div>
          <div className="text-[10px] font-mono text-zinc-500 mt-2 flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${step === 'ingest' ? 'bg-blue-500 animate-ping' : 'bg-zinc-700'}`}></span>
            Stage 1: Listening for unstructured signals
          </div>
        </div>

        {/* CONNECTOR 1: Left -> Center (1 col) */}
        <div className="md:col-span-1 flex items-center justify-center">
          <Connector active={step === 'ingest'} />
        </div>

        {/* PANEL 2: AGENT REACTOR CORE (Center 3 cols) */}
        <div className={`md:col-span-3 flex flex-col items-center justify-between bg-zinc-900/40 border rounded-2xl p-5 min-h-[220px] transition-all duration-500 ${
          step === 'process' ? 'border-blue-500/80 shadow-[0_0_15px_rgba(37,99,235,0.15)] bg-zinc-900/80' : 'border-zinc-850'
        }`}>
          <div className="w-full text-center">
            <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-3 pb-2 border-b border-zinc-800">
              Agent Reactor
            </div>

            {/* Rotating Core Visualization */}
            <div className="flex items-center justify-center py-2">
              <div className={`relative w-20 h-20 flex items-center justify-center rounded-full transition-all duration-500 ${
                step === 'process' ? 'scale-105' : 'scale-100'
              }`}>
                {/* Glow behind */}
                <div className={`absolute inset-0 rounded-full blur-md transition-all duration-500 opacity-60 ${
                  step === 'process' ? 'bg-blue-600/30' : 'bg-zinc-800/10'
                }`}></div>

                {/* Concentric rotating rings */}
                <div className={`absolute inset-0 rounded-full border border-dashed border-zinc-800 animate-[spin_18s_linear_infinite] ${
                  step === 'process' ? 'border-blue-500/40' : ''
                }`}></div>
                <div className={`absolute inset-2 rounded-full border border-dotted border-zinc-800 animate-[spin_8s_linear_infinite_reverse] ${
                  step === 'process' ? 'border-indigo-500/30' : ''
                }`}></div>

                {/* Glowing Core */}
                <div className={`absolute inset-3.5 rounded-full flex items-center justify-center transition-all duration-550 ${
                  step === 'process' 
                    ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)] text-white' 
                    : 'bg-zinc-800/80 text-zinc-500'
                }`}>
                  <i className={`ph-fill ph-cpu text-base ${step === 'process' ? 'animate-[spin_3s_linear_infinite]' : ''}`}></i>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full text-center mt-2 px-1">
            <div className={`font-mono text-[10px] min-h-[30px] flex items-center justify-center leading-normal px-2 rounded-lg border py-1.5 transition-all duration-300 ${
              step === 'process' 
                ? 'text-blue-400 bg-blue-950/20 border-blue-900/50' 
                : 'text-zinc-500 bg-zinc-950/40 border-zinc-900'
            }`}>
              {step === 'process' ? currentScenario.processingState : 'Reactor Standby'}
            </div>
          </div>
        </div>

        {/* CONNECTOR 2: Center -> Right (1 col) */}
        <div className="md:col-span-1 flex items-center justify-center">
          <Connector active={step === 'process'} />
        </div>

        {/* PANEL 3: STRUCTURED OUTCOME (Right 4 cols) */}
        <div className={`md:col-span-4 flex flex-col justify-between bg-zinc-900/40 border rounded-2xl p-5 min-h-[220px] transition-all duration-500 ${
          step === 'output' ? 'border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.15)] bg-zinc-900/80' : 'border-zinc-850'
        }`}>
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
                <i className="ph-fill ph-database text-emerald-500"></i>
                Structured Outcome
              </span>
              <span className="text-[9px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded uppercase tracking-wider">
                JSON Object
              </span>
            </div>

            {/* Structured Box */}
            <div className="relative">
              {step !== 'output' ? (
                <div className="bg-zinc-950/60 border border-zinc-850 rounded-xl p-3 min-h-[90px] flex flex-col items-center justify-center text-center select-none relative overflow-hidden">
                  <i className="ph-bold ph-braces text-zinc-700 text-sm mb-1"></i>
                  <span className="text-[9px] text-zinc-600 font-mono">
                    Awaiting core resolution...
                  </span>
                </div>
              ) : (
                <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-3 min-h-[90px] overflow-hidden font-mono text-[10px] text-indigo-300 leading-normal animate-[fadeIn_0.4s_ease-out]">
                  <pre className="text-left whitespace-pre-wrap leading-tight select-all">
                    {JSON.stringify(currentScenario.outputJson, null, 2)
                      .replace(/({|})/g, (m) => `<span class="text-zinc-600">${m}</span>`)
                      .replace(/"([^"]+)":/g, (m) => `<span class="text-zinc-400">${m}</span>`)
                      .replace(/: "([^"]+)"/g, (m) => `: <span class="text-emerald-400">${m.substring(2)}</span>`)
                    }
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Integrated Action Indicator */}
          <div className="mt-3">
            {step !== 'output' ? (
              <div className="border border-dashed border-zinc-850 rounded-xl p-2 text-center text-[9px] font-mono text-zinc-600 select-none">
                Waiting on pipeline webhook...
              </div>
            ) : (
              <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-2 flex items-center justify-between shadow-sm animate-[fadeIn_0.5s_ease-out] min-h-[38px]">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${currentScenario.actionColor}`}>
                    <i className={`ph-bold ${currentScenario.actionIcon} text-xs`}></i>
                  </div>
                  <span className="text-[9.5px] font-bold text-white tracking-tight">{currentScenario.actionText}</span>
                </div>
                <i className="ph-bold ph-circle-wavy-check text-emerald-400 text-sm shrink-0"></i>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Scenario Progress Indicator Dots at Bottom */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        {scenarios.map((s, idx) => (
          <div
            key={s.id}
            className={`h-1 rounded-full transition-all duration-500 ${
              scenarioIndex === idx 
                ? 'w-6 bg-blue-500' 
                : 'w-1.5 bg-zinc-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Sub-connector component that routes responsive svg line pathways
function Connector({ active }: { active: boolean }) {
  return (
    <div className="flex md:flex-col items-center justify-center py-1 md:py-0 md:px-2 z-10 shrink-0 select-none">
      {/* Desktop Horizontal Line */}
      <div className="hidden md:flex flex-col items-center w-8">
        <svg className="w-12 h-6 overflow-visible" fill="none">
          <path
            d="M0,12 L48,12"
            stroke={active ? "#2563EB" : "#27272A"}
            strokeWidth="1.5"
            strokeDasharray="5 3"
            className={active ? "animate-dash" : ""}
          />
          {active && (
            <circle r="3" fill="#2563EB">
              <animateMotion dur="1.2s" repeatCount="indefinite" path="M0,12 L48,12" />
            </circle>
          )}
        </svg>
      </div>

      {/* Mobile Vertical Line */}
      <div className="flex md:hidden flex-row items-center h-4">
        <svg className="h-10 w-6 overflow-visible" fill="none">
          <path
            d="M12,0 L12,40"
            stroke={active ? "#2563EB" : "#27272A"}
            strokeWidth="1.5"
            strokeDasharray="5 3"
            className={active ? "animate-dash" : ""}
          />
          {active && (
            <circle r="3" fill="#2563EB">
              <animateMotion dur="1.2s" repeatCount="indefinite" path="M12,0 L12,40" />
            </circle>
          )}
        </svg>
      </div>
    </div>
  );
}
