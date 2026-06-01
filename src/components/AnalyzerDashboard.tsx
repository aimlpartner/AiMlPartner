import React, { useState } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Zap, 
  ArrowRight, 
  Layers, 
  Calendar, 
  Activity, 
  ShieldAlert,
  Truck, 
  Megaphone, 
  FileText, 
  Shield, 
  Users, 
  DollarSign, 
  ShieldCheck, 
  Inbox, 
  Headphones,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Map icon names from Gemini response to actual Lucide component instances
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Truck,
  Megaphone,
  FileText,
  Shield,
  Users,
  DollarSign,
  ShieldCheck,
  Inbox,
  Layers,
  Headphones
};

interface Department {
  name: string;
  icon: string;
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
}

interface AnalysisResult {
  businessName: string;
  sector: string;
  executiveDiagnosis: string;
  readinessScore: number;
  readinessTier: 'Novice' | 'Exploring' | 'Operational' | 'Advanced';
  annualReclaimedROI: number;
  internalDragHours: number;
  reclaimedTimeHours: number;
  departments: Department[];
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
}

interface AnalyzerDashboardProps {
  data: AnalysisResult;
  onReset: () => void;
}

export function AnalyzerDashboard({ data, onReset }: AnalyzerDashboardProps) {
  const [selectedDeptIndex, setSelectedDeptIndex] = useState(0);
  const activeDept = data.departments[selectedDeptIndex] || data.departments[0];

  // Helper to format values as currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Readiness Tier Styling configuration
  const getTierStyles = (tier: string) => {
    switch (tier) {
      case 'Advanced':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600',
          dot: 'bg-emerald-500',
          stroke: 'stroke-emerald-500',
          text: 'text-emerald-500'
        };
      case 'Operational':
        return {
          bg: 'bg-sky-500/10 border-sky-500/20 text-sky-600',
          dot: 'bg-sky-500',
          stroke: 'stroke-sky-500',
          text: 'text-sky-500'
        };
      case 'Exploring':
        return {
          bg: 'bg-amber-500/10 border-amber-500/20 text-amber-600',
          dot: 'bg-amber-500',
          stroke: 'stroke-amber-500',
          text: 'text-amber-500'
        };
      case 'Novice':
      default:
        return {
          bg: 'bg-rose-500/10 border-rose-500/20 text-rose-600',
          dot: 'bg-rose-500',
          stroke: 'stroke-rose-500',
          text: 'text-rose-500'
        };
    }
  };

  const tierStyles = getTierStyles(data.readinessTier);

  // SVG parameters for circular gauge
  const radius = 50;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (data.readinessScore / 100) * circumference;

  return (
    <div className="w-full space-y-12">
      {/* ----------------- SECTION 1: HEADER CONTROLS ----------------- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/50 backdrop-blur-md border border-slate-100 p-6 rounded-3xl">
        <div>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Diagnostic Report</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">{data.businessName}</h2>
          <span className="inline-flex items-center gap-1 mt-2 text-xs bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1 rounded-full">
            <Layers size={12} />
            Sector: {data.sector}
          </span>
        </div>
        <button
          onClick={onReset}
          className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg transition-colors cursor-pointer"
        >
          Run Another Analysis
        </button>
      </div>

      {/* ----------------- SECTION 2: EXECUTIVE SUMMARY & OVERVIEW GRID ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Executive summary and core qualitative diagnosis */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/30 rounded-full filter blur-[60px] pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs text-sky-600 bg-sky-50 px-3 py-1 border border-sky-100 rounded-full font-semibold">
              <Zap size={14} />
              EXECUTIVE AUDIT SUMMARY
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 tracking-tight leading-snug">
              Key Diagnostic Findings & Back-Office Friction points
            </h3>
            <p className="text-slate-600 leading-relaxed text-base font-light">
              {data.executiveDiagnosis}
            </p>
          </div>
          
          {/* Efficiency indicators comparing Drag vs Reclaimed hours */}
          <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-slate-500 mb-2">
                <span>WEEKLY MANUAL INEFFICIENCY DRAG</span>
                <span className="text-rose-500 font-semibold">{data.internalDragHours} Hours</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-rose-400 rounded-full" 
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">Hours lost per week in administrative copy-pasting & pipeline friction.</p>
            </div>
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-slate-500 mb-2">
                <span>RECLAIMED TIME VIA AUTOMATION</span>
                <span className="text-emerald-500 font-semibold">{data.reclaimedTimeHours} Hours</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(data.reclaimedTimeHours / data.internalDragHours) * 100}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-emerald-400 rounded-full" 
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">Unlocked weekly productivity. Up to {Math.round((data.reclaimedTimeHours / data.internalDragHours) * 100)}% administrative streamlining.</p>
            </div>
          </div>
        </div>

        {/* Readiness circular gauge & core ROI statistics */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* SVG Radial Progress circular tracker */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between text-white relative overflow-hidden shrink-0">
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-sky-500/10 rounded-full filter blur-[50px] pointer-events-none" />
            
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">AI READINESS TIER</span>
              <span className={`inline-flex items-center gap-1.5 border px-2.5 py-0.5 rounded-full text-xs font-semibold ${tierStyles.bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${tierStyles.dot}`} />
                {data.readinessTier}
              </span>
              <p className="text-xs text-slate-400 font-light mt-1 max-w-[160px]">
                Calculated benchmark based on available data architecture readiness.
              </p>
            </div>

            <div className="relative flex items-center justify-center">
              <svg height={radius * 2} width={radius * 2} className="transform -rotate-95">
                {/* Background Ring */}
                <circle
                  stroke="#1e293b"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                {/* Active Ring */}
                <motion.circle
                  className={tierStyles.stroke}
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset }}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
              {/* Inner score label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold leading-none">{data.readinessScore}</span>
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">SCORE</span>
              </div>
            </div>
          </div>

          {/* Financial ROI Card */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 shadow-xl flex-1 flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-400/20 rounded-full filter blur-[30px] pointer-events-none" />
            <TrendingUp size={24} className="text-sky-400 mb-6 shrink-0" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">ANNUAL RECLAIMABLE ROI</span>
              <h4 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-200">
                {formatCurrency(data.annualReclaimedROI)}
              </h4>
              <p className="text-xs text-slate-400 font-light pt-2 leading-relaxed">
                Operating capital directly lost to duplicate software layers and slow administrative response chains that AI automations can reclaim.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ----------------- SECTION 3: INTERACTIVE DEPARTMENT DEEP DIVE ----------------- */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 pb-2">
          <div>
            <span className="text-xs font-mono text-sky-600 uppercase tracking-widest">DRILL DOWN ASSESSMENT</span>
            <h3 className="text-2xl font-semibold text-slate-900 mt-1">Interactive Departmental Deep Dive</h3>
          </div>
          <p className="text-slate-500 text-sm max-w-md font-light leading-relaxed">
            Select an audited operational center to review exact workflow bottlenecks, integration playbooks, complexity, timeline steps, and SaaS integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Department side selector list */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {data.departments.map((dept, index) => {
              const IconComponent = ICON_MAP[dept.icon] || FileText;
              const isSelected = selectedDeptIndex === index;
              return (
                <button
                  key={dept.name}
                  onClick={() => setSelectedDeptIndex(index)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-slate-950 text-white shadow-xl shadow-slate-900/10'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-100 text-slate-500'}`}>
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm leading-snug">{dept.name}</h4>
                      <span className={`text-[10px] font-mono block mt-0.5 ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                        WEEKLY LEAK: {dept.weeklyTimeLeak} HOURS
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={16} className={`relative z-10 ${isSelected ? 'text-sky-400' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Dynamic Playbook Sheet Display */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDeptIndex}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200/80 rounded-3xl shadow-xl overflow-hidden"
              >
                {/* Active Department Tab Header */}
                <div className="bg-slate-900/95 text-white p-6 md:p-8 flex justify-between items-center border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest">TACTICAL INTEGRATION SPEC</span>
                    <h4 className="text-xl font-bold mt-0.5">{activeDept.name} Playbook</h4>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Playbook ROI: {formatCurrency(activeDept.playbook.roi)}
                  </span>
                </div>

                {/* Card body comparing Friction and Resolution Pipeline */}
                <div className="p-6 md:p-8 space-y-8">
                  {/* Friction vs Resolution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-rose-50/50 border border-rose-100/50 rounded-2xl p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-rose-200/10 rounded-full filter blur-xl" />
                      <span className="text-[10px] font-mono text-rose-600 uppercase tracking-widest block font-semibold mb-2">CURRENT FRICTION PROCESS</span>
                      <p className="text-slate-600 text-sm font-light leading-relaxed">{activeDept.friction}</p>
                    </div>
                    <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200/10 rounded-full filter blur-xl" />
                      <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-widest block font-semibold mb-2">TARGET RESOLUTION ARCHITECTURE</span>
                      <p className="text-slate-600 text-sm font-light leading-relaxed">{activeDept.resolution}</p>
                    </div>
                  </div>

                  {/* Playbook Documentation Spec Sheet */}
                  <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50/50 space-y-6">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block border-b border-slate-100 pb-3">PLAYBOOK DOCUMENTATION SHEET</span>
                    
                    {/* Workflow */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400 block tracking-wider font-semibold">RECOMMENDED WORKFLOW PIPELINE</span>
                      <p className="text-slate-700 text-sm leading-relaxed">{activeDept.playbook.workflow}</p>
                    </div>

                    {/* Integration Path */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400 block tracking-wider font-semibold">LOW-DISRUPTION STAFF INTEGRATION PATH</span>
                      <p className="text-slate-700 text-sm leading-relaxed font-light">{activeDept.playbook.integrationPath}</p>
                    </div>

                    {/* Tool Stack */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 block tracking-wider font-semibold">TARGET AUTOMATION SAAS TOOL STACK</span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {activeDept.playbook.toolStack.map(tool => (
                          <span key={tool} className="bg-white border border-slate-200 text-slate-600 text-xs px-3 py-1 rounded-full font-medium">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AIMLpartner Service Suggestion callout */}
                    {activeDept.playbook.aimlPartnerServiceSuggestion && (
                      <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100/80 rounded-2xl p-5 mt-4">
                        <span className="text-[10px] font-mono text-sky-700 block tracking-wider font-semibold uppercase mb-1.5">HOW AIMLpartner HELPS DEPLOY THIS</span>
                        <p className="text-slate-800 text-sm leading-relaxed font-medium">{activeDept.playbook.aimlPartnerServiceSuggestion}</p>
                      </div>
                    )}

                    {/* Timeline, Complexity, Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block">COMPLEXITY</span>
                        <span className={`inline-block text-xs font-semibold mt-1 px-3 py-0.5 rounded-full ${
                          activeDept.playbook.complexity === 'Low' 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : activeDept.playbook.complexity === 'Medium'
                            ? 'bg-amber-50 text-amber-600 border border-amber-100'
                            : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}>
                          {activeDept.playbook.complexity}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block">ESTIMATED TIMELINE</span>
                        <span className="inline-block text-slate-800 text-sm font-semibold mt-1">
                          {activeDept.playbook.timeline}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block">SUCCESS GOAL METRIC</span>
                        <span className="inline-block text-slate-800 text-sm font-semibold mt-1 leading-snug">
                          {activeDept.playbook.successMetrics}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ----------------- SECTION 4: TACTICAL IMPLEMENTATION ROADMAP ----------------- */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl space-y-8">
        <div>
          <span className="text-xs font-mono text-sky-600 uppercase tracking-widest">CHRONOLOGICAL LAUNCH SCHEDULE</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">Tactical Implementation Roadmap & Strategy</h3>
        </div>

        {/* Data Readiness Assessment Banner */}
        <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 border border-slate-800 flex items-start gap-4">
          <div className="bg-sky-500/20 text-sky-400 p-2.5 rounded-xl shrink-0 mt-0.5">
            <Activity size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block font-semibold">CORPORATE DATA READINESS AUDIT</span>
            <p className="text-sm font-light leading-relaxed mt-1">{data.roadmap.dataReadinessAssessment}</p>
          </div>
        </div>

        {/* Phase timeline steps blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {data.roadmap.phases.map((phase, idx) => (
            <div key={phase.title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2 mb-4">
                  <span className="bg-slate-900 text-white font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {phase.phaseNumber}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-sky-50 border border-sky-100 text-sky-600 text-xs px-3 py-0.5 rounded-full font-semibold">
                    <Clock size={12} />
                    {phase.duration}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 text-base mb-1">{phase.title}</h4>
                <p className="text-xs text-slate-500 font-light mb-4 leading-relaxed">{phase.focus}</p>
              </div>

              <div className="space-y-2 border-t border-slate-200/50 pt-4 mt-2">
                <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold tracking-wider">ENGINEERING MILESTONES</span>
                <ul className="space-y-1.5">
                  {phase.milestones.map((milestone, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2 text-slate-600 text-xs font-light">
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full mt-1.5 shrink-0" />
                      <span>{milestone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
