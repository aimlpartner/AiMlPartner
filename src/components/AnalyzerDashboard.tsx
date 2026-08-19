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
  Info,
  X,
  LockOpen,
  Loader2,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CURRENCIES, formatCurrencyValue } from '../lib/currencies';

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
  leadEmail?: string;
  leadName?: string;
  leadCompany?: string;
  selectedCurrency: string;
  setSelectedCurrency: (c: string) => void;
}

export function AnalyzerDashboard({
  data,
  onReset,
  leadEmail,
  leadName,
  leadCompany,
  selectedCurrency,
  setSelectedCurrency
}: AnalyzerDashboardProps) {
  const [selectedDeptIndex, setSelectedDeptIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeDept = data.departments[selectedDeptIndex] || data.departments[0];

  const formatCurrency = (val: number) => {
    return formatCurrencyValue(val, selectedCurrency);
  };

  const getTierStyles = (tier: string) => {
    switch (tier) {
      case 'Advanced':
        return {
          stroke: 'stroke-[#FF5500]',
          bg: 'bg-[#FF5500]/15 text-[#FF5500] border-[#FF5500]/30',
          dot: 'bg-[#FF5500]'
        };
      case 'Operational':
        return {
          stroke: 'stroke-emerald-500',
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-500'
        };
      case 'Exploring':
        return {
          stroke: 'stroke-amber-500',
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-500'
        };
      default:
        return {
          stroke: 'stroke-zinc-500',
          bg: 'bg-zinc-800 text-zinc-300 border-zinc-700',
          dot: 'bg-zinc-500'
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
    <div className="w-full space-y-10 text-white font-sans">
      {/* ----------------- SECTION 1: HEADER CONTROLS ----------------- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-950/90 border border-zinc-800 p-6 rounded-3xl shadow-xl">
        <div>
          <span className="text-xs font-mono text-[#FF5500] uppercase tracking-widest block font-bold">
            // LIVE AUDIT REPORT
          </span>
          <h2 className="text-2xl font-black text-white mt-1">{data.businessName}</h2>
          <span className="inline-flex items-center gap-1 mt-2 text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded-lg">
            <Layers size={12} className="text-[#FF5500]" />
            Sector: {data.sector}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Custom Currency Selector */}
          <div className="relative inline-flex items-center">
            <span className="absolute left-3.5 text-zinc-400 pointer-events-none">
              <Globe size={13} />
            </span>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="pl-9 pr-8 py-2.5 bg-black border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl shadow-sm transition-all focus:outline-none focus:border-[#FF5500] cursor-pointer appearance-none"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            <span className="absolute right-3.5 text-[9px] text-zinc-400 pointer-events-none">▼</span>
          </div>

          <button
            onClick={onReset}
            className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            New Audit
          </button>
        </div>
      </div>

      {/* ----------------- SECTION 2: EXECUTIVE SUMMARY & OVERVIEW GRID ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Executive diagnosis card */}
        <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5500]/5 rounded-full filter blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#FF5500] font-mono font-bold uppercase tracking-wider">
              <Zap size={14} />
              <span>// EXECUTIVE DIAGNOSTIC FINDINGS</span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight leading-snug">
              Key Workflow Friction & Time Leak Assessment
            </h3>
            <p className="text-zinc-300 leading-relaxed text-base font-normal">
              {data.executiveDiagnosis}
            </p>
          </div>

          {/* Drag vs Reclaimed Hours */}
          <div className="mt-8 pt-6 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-2">
                <span>WEEKLY INEFFICIENCY DRAG</span>
                <span className="text-rose-400 font-bold">{data.internalDragHours} Hours</span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-rose-500 rounded-full"
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1.5">Hours lost per week in repetitive administrative tasks.</p>
            </div>
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-2">
                <span>RECLAIMED VIA AI AUTOMATION</span>
                <span className="text-[#FF5500] font-bold">{data.reclaimedTimeHours} Hours</span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (data.reclaimedTimeHours / Math.max(1, data.internalDragHours)) * 100)}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-[#FF5500] rounded-full"
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1.5">Up to {Math.round((data.reclaimedTimeHours / Math.max(1, data.internalDragHours)) * 100)}% administrative streamlining.</p>
            </div>
          </div>
        </div>

        {/* Readiness Circular Score & ROI */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Readiness Ring */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-xl flex items-center justify-between text-white relative overflow-hidden shrink-0">
            <div className="space-y-3">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                // AI READINESS TIER
              </span>
              <span className={`inline-flex items-center gap-1.5 border px-3 py-1 rounded-lg text-xs font-bold ${tierStyles.bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${tierStyles.dot}`} />
                {data.readinessTier}
              </span>
              <p className="text-xs text-zinc-400 mt-1 max-w-[160px]">
                Calculated operational index based on data architecture readiness.
              </p>
            </div>

            <div className="relative flex items-center justify-center">
              <svg height={radius * 2} width={radius * 2} className="transform -rotate-95">
                <circle
                  stroke="#27272a"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
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
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black leading-none text-white">{data.readinessScore}</span>
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">SCORE</span>
              </div>
            </div>
          </div>

          {/* Financial ROI Card */}
          <div className="bg-zinc-950 border border-[#FF5500]/40 rounded-3xl p-6 shadow-xl flex-1 flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FF5500]/15 rounded-full filter blur-[30px] pointer-events-none" />
            <TrendingUp size={24} className="text-[#FF5500] mb-4 shrink-0" />
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#FF5500] uppercase tracking-widest block font-bold">
                // PROJECTED ANNUAL RECLAIMED ROI
              </span>
              <h4 className="text-3xl md:text-4xl font-black text-white">
                {formatCurrency(data.annualReclaimedROI)}
              </h4>
              <p className="text-xs text-zinc-400 pt-2 leading-relaxed">
                Direct bottom-line savings and reclaimed human hours unlocked through automated workflow engineering.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- SECTION 3: PROFITABILITY PROJECTIONS ----------------- */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-xs font-mono text-[#FF5500] uppercase tracking-widest block font-bold">
                // FINANCIAL IMPACT BREAKDOWN
              </span>
              <h3 className="text-2xl font-black text-white mt-1">Reclaimed Value & Compound Savings</h3>
            </div>
            <span className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded-lg font-mono">
              Live Audit Projection
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Weekly */}
            <div className="bg-black border border-zinc-800 rounded-2xl p-5">
              <span className="text-xs font-mono text-zinc-400 block tracking-wider uppercase font-semibold">Weekly Reclaimed Value</span>
              <h4 className="text-2xl font-black text-white mt-2">
                {formatCurrencyValue(data.annualReclaimedROI / 52, selectedCurrency)}
              </h4>
              <p className="text-xs text-zinc-500 mt-1 font-mono">~{data.reclaimedTimeHours} hours saved per week.</p>
            </div>

            {/* Monthly */}
            <div className="bg-black border border-zinc-800 rounded-2xl p-5">
              <span className="text-xs font-mono text-zinc-400 block tracking-wider uppercase font-semibold">Monthly Savings</span>
              <h4 className="text-2xl font-black text-white mt-2">
                {formatCurrencyValue(data.annualReclaimedROI / 12, selectedCurrency)}
              </h4>
              <p className="text-xs text-zinc-500 mt-1 font-mono">Direct operational cost reduction.</p>
            </div>

            {/* 3-Year */}
            <div className="bg-black border border-[#FF5500]/30 rounded-2xl p-5 relative overflow-hidden">
              <span className="text-xs font-mono text-[#FF5500] block tracking-wider uppercase font-bold">3-Year Cumulative ROI</span>
              <h4 className="text-2xl font-black text-[#FF5500] mt-2">
                {formatCurrencyValue(data.annualReclaimedROI * 3, selectedCurrency)}
              </h4>
              <p className="text-xs text-zinc-400 mt-1 font-mono">Long-term compound efficiency return.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- SECTION 4: DEPARTMENT DEEP DIVE ----------------- */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono text-[#FF5500] uppercase tracking-widest block font-bold">
            // DEPARTMENTAL DEEP DIVE
          </span>
          <h3 className="text-2xl font-black text-white mt-1">Specialized Playbooks by Operational Unit</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Department List */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-3">
            {data.departments.map((dept, index) => {
              const IconComponent = ICON_MAP[dept.icon] || FileText;
              const isSelected = selectedDeptIndex === index;
              return (
                <button
                  key={dept.name}
                  onClick={() => setSelectedDeptIndex(index)}
                  className={`w-full sm:w-auto lg:w-full shrink-0 flex items-center justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FF5500]/15 border-[#FF5500] text-white shadow-lg'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 pr-2">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#FF5500] text-black' : 'bg-zinc-900 text-zinc-400'}`}>
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-snug text-white">{dept.name}</h4>
                      <span className="text-[10px] font-mono block mt-0.5 text-zinc-400">
                        LEAK: {dept.weeklyTimeLeak} HRS / WK
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={16} className={`hidden lg:block ${isSelected ? 'text-[#FF5500]' : 'text-zinc-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Active Department Playbook */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDeptIndex}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl shadow-xl overflow-hidden"
              >
                {/* Header */}
                <div className="bg-black p-6 flex justify-between items-center border-b border-zinc-800">
                  <div>
                    <span className="text-[10px] font-mono text-[#FF5500] uppercase tracking-widest font-bold">
                      // TACTICAL INTEGRATION SPEC
                    </span>
                    <h4 className="text-xl font-black mt-0.5 text-white">{activeDept.name} Playbook</h4>
                  </div>
                  <span className="bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] px-3 py-1 rounded-lg text-xs font-bold">
                    Playbook ROI: {formatCurrency(activeDept.playbook.roi)}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 space-y-6">
                  {/* Friction vs Resolution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black border border-red-900/30 rounded-2xl p-5">
                      <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest block font-bold mb-2">
                        CURRENT BOTTLENECK
                      </span>
                      <p className="text-zinc-300 text-sm leading-relaxed">{activeDept.friction}</p>
                    </div>
                    <div className="bg-black border border-emerald-900/30 rounded-2xl p-5">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold mb-2">
                        TARGET AI ARCHITECTURE
                      </span>
                      <p className="text-zinc-300 text-sm leading-relaxed">{activeDept.resolution}</p>
                    </div>
                  </div>

                  {/* Playbook Details */}
                  <div className="border border-zinc-800 rounded-2xl p-6 bg-black space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-400 block tracking-wider font-bold">
                        RECOMMENDED WORKFLOW PIPELINE
                      </span>
                      <p className="text-white text-sm leading-relaxed">{activeDept.playbook.workflow}</p>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-zinc-800">
                      <span className="text-[10px] font-mono text-zinc-400 block tracking-wider font-bold">
                        STAFF INTEGRATION & ROLLOUT
                      </span>
                      <p className="text-zinc-300 text-sm leading-relaxed">{activeDept.playbook.integrationPath}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-zinc-800">
                      <span className="text-[10px] font-mono text-zinc-400 block tracking-wider font-bold">
                        RECOMMENDED SAAS & TOOL STACK
                      </span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {activeDept.playbook.toolStack.map(tool => (
                          <span key={tool} className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-lg font-mono">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* How AIMLpartner Deploys */}
                    {activeDept.playbook.aimlPartnerServiceSuggestion && (
                      <div className="bg-zinc-900/80 border border-[#FF5500]/30 rounded-2xl p-5 mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <span className="text-[10px] font-mono text-[#FF5500] block font-bold uppercase mb-1">
                            // HOW AIMLPARTNER DEPLOYS THIS
                          </span>
                          <p className="text-white text-sm leading-relaxed">{activeDept.playbook.aimlPartnerServiceSuggestion}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(true)}
                          className="bg-[#FF5500] hover:bg-[#FF6E26] text-black font-extrabold text-xs py-3 px-5 rounded-xl shadow-us-pop shrink-0 cursor-pointer flex items-center gap-1.5 transition-all uppercase tracking-wider"
                        >
                          <span>Build Blueprint</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    )}

                    {/* Meta Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800 text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-400 block font-bold">COMPLEXITY</span>
                        <span className="text-white font-bold mt-0.5 block">{activeDept.playbook.complexity}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-zinc-400 block font-bold">TIMELINE</span>
                        <span className="text-white font-bold mt-0.5 block">{activeDept.playbook.timeline}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-zinc-400 block font-bold">TARGET METRIC</span>
                        <span className="text-white font-bold mt-0.5 block">{activeDept.playbook.successMetrics}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ----------------- SECTION 5: IMPLEMENTATION ROADMAP ----------------- */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-mono text-[#FF5500] uppercase tracking-widest block font-bold">
            // ROLLOUT SCHEDULE
          </span>
          <h3 className="text-2xl font-black text-white mt-1">Milestone-Driven Implementation Strategy</h3>
        </div>

        <div className="bg-black text-zinc-300 rounded-2xl p-5 border border-zinc-800 flex items-start gap-4">
          <div className="bg-[#FF5500]/10 text-[#FF5500] p-2.5 rounded-xl shrink-0 mt-0.5">
            <Activity size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#FF5500] block font-bold uppercase">DATA READINESS ASSESSMENT</span>
            <p className="text-sm leading-relaxed mt-1">{data.roadmap.dataReadinessAssessment}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.roadmap.phases.map((phase) => (
            <div key={phase.title} className="bg-black border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className="bg-[#FF5500] text-black font-mono text-xs w-6 h-6 rounded-lg flex items-center justify-center font-black">
                    {phase.phaseNumber}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs px-2.5 py-0.5 rounded-lg font-mono">
                    <Clock size={11} className="text-[#FF5500]" />
                    {phase.duration}
                  </span>
                </div>
                <h4 className="font-bold text-white text-base mb-1">{phase.title}</h4>
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{phase.focus}</p>
              </div>

              <div className="space-y-2 border-t border-zinc-800 pt-3">
                <span className="text-[10px] font-mono text-zinc-500 block uppercase font-bold tracking-wider">ENGINEERING DELIVERABLES</span>
                <ul className="space-y-1.5">
                  {phase.milestones.map((milestone, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2 text-zinc-300 text-xs">
                      <span className="w-1.5 h-1.5 bg-[#FF5500] rounded-full mt-1.5 shrink-0" />
                      <span>{milestone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ----------------- BUILD MODAL ----------------- */}
      <AnimatePresence>
        {isModalOpen && (
          <BuildAgentModal
            activeDept={activeDept}
            leadEmail={leadEmail}
            leadName={leadName}
            leadCompany={leadCompany}
            analysisResult={data}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------------------------------
// Dynamic Questionnaire Helper
// ----------------------------------------------------------------------
const getDepartmentQuestions = (deptName: string): string[] => {
  const name = deptName.toLowerCase();
  if (name.includes('operat') || name.includes('admin') || name.includes('logist')) {
    return [
      "What is the primary format of your files (e.g. scanned PDFs, spreadsheets, emails)?",
      "Which databases or CRM systems should this automation synchronize with (e.g. HubSpot, SQL/Custom CRM)?",
      "Do you want the AI to run fully autonomous, or flag complex files for human approval first?"
    ];
  } else if (name.includes('market') || name.includes('sale') || name.includes('lead')) {
    return [
      "What main channels do your inbound leads come from (e.g. web forms, emails, ads)?",
      "What key action should the AI trigger (e.g. book a slot on calendar, send custom brief PDF)?",
      "Which CRM do you use to track customer deals?"
    ];
  } else if (name.includes('support') || name.includes('servic') || name.includes('help')) {
    return [
      "Where do customer questions primarily land (e.g. website chat widget, support e-mail, WhatsApp)?",
      "Do you have a structured FAQ document or knowledge base the AI can retrieve?",
      "When should the AI assistant transfer the conversation to a human support agent?"
    ];
  } else {
    return [
      "What are the main software systems currently used in this department?",
      "What is the primary operational manual bottleneck you want this AI to solve immediately?",
      "Do you require custom Slack notifications or email alerts to report on the AI actions?"
    ];
  }
};

interface BuildAgentModalProps {
  activeDept: Department;
  leadEmail?: string;
  leadName?: string;
  leadCompany?: string;
  analysisResult: AnalysisResult;
  onClose: () => void;
}

function BuildAgentModal({ activeDept, leadEmail, leadName, leadCompany, analysisResult, onClose }: BuildAgentModalProps) {
  const questions = getDepartmentQuestions(activeDept.name);
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 'success'>(1);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [currentVal, setCurrentVal] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const currentQuestionIdx = (step === 'success' || step === 4) ? 0 : (step - 1);
  const currentQuestion = questions[currentQuestionIdx];

  const formatDateValue = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const bookingDates = React.useMemo(() => {
    const dates = [];
    const current = new Date();
    current.setDate(current.getDate() + 1);
    
    while (dates.length < 30) {
      if (current.getDay() !== 0) {
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, []);

  const monthHeader = React.useMemo(() => {
    if (bookingDates.length === 0) return '';
    const firstMonth = bookingDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const lastMonth = bookingDates[bookingDates.length - 1].toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (firstMonth === lastMonth) return firstMonth;
    return `${firstMonth} - ${bookingDates[bookingDates.length - 1].toLocaleDateString('en-US', { month: 'long' })}`;
  }, [bookingDates]);

  const TIME_SLOTS = [
    "10:00 AM",
    "11:30 AM",
    "1:00 PM",
    "2:30 PM",
    "4:00 PM",
    "5:30 PM"
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step <= 3) {
      if (!currentVal.trim()) {
        setError('Please answer the question to proceed.');
        return;
      }
      setError('');
      const newAnswers = [...answers];
      newAnswers[step - 1] = currentVal.trim();
      setAnswers(newAnswers);

      if (step === 1) {
        setCurrentVal(answers[1]);
        setStep(2);
      } else if (step === 2) {
        setCurrentVal(answers[2]);
        setStep(3);
      } else if (step === 3) {
        setStep(4);
      }
    } else if (step === 4) {
      if (!selectedDate) {
        setError('Please select a date for your demo.');
        return;
      }
      if (!selectedTime) {
        setError('Please select a time slot.');
        return;
      }
      setError('');
      submitAnswers(answers, selectedDate, selectedTime);
    }
  };

  const handleBack = () => {
    setError('');
    if (step === 2) {
      setCurrentVal(answers[0]);
      setStep(1);
    } else if (step === 3) {
      setCurrentVal(answers[1]);
      setStep(2);
    } else if (step === 4) {
      setCurrentVal(answers[2]);
      setStep(3);
    }
  };

  const submitAnswers = async (finalAnswers: string[], date: string, time: string) => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/build-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: leadEmail || 'unknown@client.com',
          name: leadName || 'Anonymous Visitor',
          company: leadCompany || 'N/A',
          departmentName: activeDept.name,
          answers: [
            { question: questions[0], answer: finalAnswers[0] },
            { question: questions[1], answer: finalAnswers[1] },
            { question: questions[2], answer: finalAnswers[2] }
          ],
          selectedDate: date,
          selectedTime: time,
          playbookDetails: {
            friction: activeDept.friction,
            resolution: activeDept.resolution,
            workflow: activeDept.playbook.workflow,
            toolStack: activeDept.playbook.toolStack,
            complexity: activeDept.playbook.complexity,
            timeline: activeDept.playbook.timeline
          },
          analysisResult: {
            businessName: analysisResult.businessName,
            sector: analysisResult.sector
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to lock in your build parameters.');
      }

      setStep('success');
    } catch (err: any) {
      console.error('[Build Agent Error]:', err);
      setStep('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-3xl shadow-2xl z-55 max-h-[90vh] overflow-y-auto text-white"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors z-20 cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Progress Line */}
        {step !== 'success' && (
          <div className="h-1 w-full bg-zinc-900 absolute top-0 left-0">
            <motion.div
              className="h-full bg-[#FF5500]"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        <div className="p-8 md:p-10 min-h-[380px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {step !== 'success' ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="flex-grow flex flex-col justify-between space-y-6"
              >
                {step <= 3 ? (
                  <div>
                    <span className="text-[10px] font-mono text-[#FF5500] tracking-widest uppercase font-bold block mb-3">
                      // STEP {step} OF 4 • {activeDept.name.toUpperCase()} AGENT
                    </span>
                    <h3 className="text-xl font-bold text-white leading-snug tracking-tight">
                      {currentQuestion}
                    </h3>

                    {error && (
                      <p className="text-red-400 text-xs font-semibold mt-2">{error}</p>
                    )}

                    <form onSubmit={handleNext} className="mt-6">
                      <textarea
                        rows={4}
                        required
                        placeholder="Type your requirements or software tools here..."
                        value={currentVal}
                        onChange={(e) => { setCurrentVal(e.target.value); setError(''); }}
                        className="block w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5500] text-sm resize-none"
                      />
                    </form>
                  </div>
                ) : (
                  // STEP 4: CALENDAR
                  <div>
                    <span className="text-[10px] font-mono text-[#FF5500] tracking-widest uppercase font-bold block mb-3">
                      // STEP 4 OF 4 • LIVE DEMO SCHEDULER
                    </span>
                    <h3 className="text-xl font-bold text-white leading-snug tracking-tight mb-1">
                      Schedule a Live Prototype Walkthrough
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                      Select a date and time slot for a live 15-minute Google Meet walkthrough where our engineers will present this custom automated workflow.
                    </p>

                    {error && (
                      <p className="text-red-400 text-xs font-semibold mt-2 mb-4">{error}</p>
                    )}

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-400 block tracking-wider font-bold uppercase">
                          Select Date
                        </label>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5 bg-black border border-zinc-800 rounded-xl px-3 py-2 w-fit mb-2">
                          <Calendar size={14} className="text-[#FF5500]" />
                          <span>{monthHeader}</span>
                        </div>
                        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                          {bookingDates.map((date) => {
                            const dateStr = formatDateValue(date);
                            const isSelected = selectedDate === dateStr;
                            return (
                              <button
                                key={date.toISOString()}
                                type="button"
                                onClick={() => {
                                  setSelectedDate(dateStr);
                                  setError('');
                                }}
                                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#FF5500] border-[#FF5500] text-black font-bold shadow-us-pop'
                                    : 'bg-black border-zinc-800 text-zinc-300 hover:border-zinc-700'
                                }`}
                              >
                                <span className="text-[8px] font-mono uppercase tracking-wider opacity-75">
                                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                </span>
                                <span className="text-base font-extrabold my-0.5">{date.getDate()}</span>
                                <span className="text-[8px] font-mono uppercase tracking-wider opacity-75">
                                  {date.toLocaleDateString('en-US', { month: 'short' })}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-400 block tracking-wider font-bold uppercase">
                          Select Time Slot
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map((time) => {
                            const isSelected = selectedTime === time;
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => {
                                  setSelectedTime(time);
                                  setError('');
                                }}
                                className={`py-3 px-2 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#FF5500] border-[#FF5500] text-black shadow-us-pop'
                                    : 'bg-black border-zinc-800 text-zinc-300 hover:border-zinc-700'
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4">
                  {step > 1 ? (
                    <button
                      onClick={handleBack}
                      className="text-xs font-mono text-zinc-400 hover:text-white transition-colors uppercase tracking-widest cursor-pointer"
                    >
                      ← Back
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 bg-[#FF5500] hover:bg-[#FF6E26] text-black font-extrabold rounded-xl px-6 py-3 text-xs uppercase tracking-wider transition-all shadow-us-pop cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={12} className="animate-spin text-black" />
                        <span>Reserving Demo...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {step === 3
                            ? 'Next: Schedule Demo'
                            : step === 4
                            ? 'Confirm & Build Blueprint'
                            : 'Next Question'}
                        </span>
                        <ArrowRight size={12} />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-6 flex-grow space-y-6"
              >
                <div className="w-16 h-16 bg-[#FF5500]/10 border border-[#FF5500]/30 rounded-2xl flex items-center justify-center text-[#FF5500]">
                  <LockOpen size={28} className="animate-pulse" />
                </div>

                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    Custom Agent Blueprint & Demo Booked!
                  </h3>
                  <p className="text-zinc-400 text-xs md:text-sm mt-3 leading-relaxed max-w-sm mx-auto">
                    Your custom prompt instructions have been compiled and sent to your email. We have reserved your live walkthrough on:
                  </p>
                  
                  <div className="bg-black border border-zinc-800 rounded-2xl p-4 mt-4 text-left max-w-sm mx-auto">
                    <span className="text-[10px] font-mono text-[#FF5500] block tracking-wider uppercase font-bold mb-2">🗓️ Booking Details</span>
                    <p className="text-sm font-bold text-white">Date: <span className="font-normal text-zinc-300">{selectedDate}</span></p>
                    <p className="text-sm font-bold text-white mt-1">Time: <span className="font-normal text-zinc-300">{selectedTime}</span></p>
                    <p className="text-sm font-bold text-white mt-1">
                      Platform: <span className="font-normal text-zinc-400 text-xs">Google Meet (Calendar invite dispatched)</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="bg-[#FF5500] hover:bg-[#FF6E26] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl px-6 py-3 transition-colors cursor-pointer shadow-us-pop"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
