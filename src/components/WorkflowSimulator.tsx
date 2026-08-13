import React from 'react';

export function WorkflowSimulator() {
  return (
    <div className="w-full relative bg-slate-50 border border-black/5 rounded-[2.5rem] p-8 md:p-14 shadow-inner overflow-hidden font-sans select-none flex flex-col items-center justify-center min-h-[450px]">
      
      {/* Self-contained CSS keyframe animations for floating elements and particle flows */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(99, 102, 241, 0.2); }
          50% { border-color: rgba(99, 102, 241, 0.8); box-shadow: 0 0 15px rgba(99,102,241,0.2); }
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-scan {
          animation: scanline 3s linear infinite;
        }
        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
        .animate-pop-1 { animation: pop-in 0.5s ease-out 0.5s forwards; opacity: 0; }
        .animate-pop-2 { animation: pop-in 0.5s ease-out 1.5s forwards; opacity: 0; }
        .animate-pop-3 { animation: pop-in 0.5s ease-out 2.5s forwards; opacity: 0; }
      `}</style>

      {/* Main Designer Layout */}
      <div className="w-full flex flex-col xl:flex-row items-center xl:items-stretch justify-center gap-6 xl:gap-8 relative z-10 max-w-6xl mx-auto">
        
        {/* STEP 1: INCOMING EMAIL (The Mess) */}
        <div className="flex flex-col flex-1 w-full max-w-sm">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-light font-bold mb-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center">1</span>
            Incoming Email
          </div>
          
          <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-sm h-full flex flex-col relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-4 border-b border-black/5 pb-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <i className="ph-fill ph-user text-sm"></i>
              </div>
              <div>
                <div className="text-xs font-bold text-ink">Mike Jenkins</div>
                <div className="text-[10px] text-ink-light">mike@apexroofingtx.com</div>
              </div>
            </div>
            
            <div className="text-xs font-bold text-ink mb-2">Quote Request - Urgent</div>
            
            <div className="text-[11px] text-ink-light leading-relaxed font-medium">
              Hi, <br/><br/>
              My name is Mike. I run Apex Roofing (about 15 guys). We need someone to look at our warehouse at 124 Main St, Austin TX. The roof has been leaking since last Tuesday. 
              <br/><br/>
              Can someone call me at 555-0198 to schedule?
            </div>
          </div>
        </div>

        {/* CONNECTOR 1 */}
        <div className="flex items-center justify-center shrink-0 py-4 xl:py-0">
          <i className="ph-bold ph-arrow-right text-black/20 text-2xl hidden xl:block animate-pulse"></i>
          <i className="ph-bold ph-arrow-down text-black/20 text-2xl block xl:hidden animate-pulse"></i>
        </div>

        {/* STEP 2: AI PROCESSING (The Brain) */}
        <div className="flex flex-col flex-1 w-full max-w-sm">
          <div className="font-mono text-[10px] uppercase tracking-widest text-indigo-600 font-bold mb-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">2</span>
            AI Extraction
          </div>
          
          <div className="bg-white border-2 border-indigo-100 rounded-2xl p-5 shadow-md h-full flex flex-col relative overflow-hidden animate-pulse-border">
            {/* Scanning line effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent w-full h-1/3 animate-scan pointer-events-none"></div>

            <div className="flex items-center gap-2 mb-4 text-indigo-600">
              <i className="ph-fill ph-sparkle text-lg"></i>
              <span className="text-xs font-bold">Reading & Understanding...</span>
            </div>
            
            <div className="space-y-3 relative z-10">
              <div className="animate-pop-1 flex items-center justify-between bg-slate-50 rounded-lg p-2 border border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Company</span>
                <span className="text-xs font-semibold text-ink">Apex Roofing</span>
              </div>
              <div className="animate-pop-2 flex items-center justify-between bg-slate-50 rounded-lg p-2 border border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Size</span>
                <span className="text-xs font-semibold text-ink">15 Employees</span>
              </div>
              <div className="animate-pop-3 flex items-center justify-between bg-slate-50 rounded-lg p-2 border border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Phone</span>
                <span className="text-xs font-semibold text-ink">555-0198</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONNECTOR 2 */}
        <div className="flex items-center justify-center shrink-0 py-4 xl:py-0">
          <i className="ph-bold ph-arrow-right text-black/20 text-2xl hidden xl:block animate-pulse"></i>
          <i className="ph-bold ph-arrow-down text-black/20 text-2xl block xl:hidden animate-pulse"></i>
        </div>

        {/* STEP 3: CRM RESULT (The Outcome) */}
        <div className="flex flex-col flex-1 w-full max-w-sm">
          <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-600 font-bold mb-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">3</span>
            CRM Updated
          </div>
          
          <div className="bg-white border border-emerald-200 rounded-2xl shadow-lg h-full flex flex-col relative overflow-hidden">
            {/* Fake CRM Header */}
            <div className="bg-slate-800 text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="ph-bold ph-kanban text-sm"></i>
                <span className="text-xs font-bold">Sales Pipeline</span>
              </div>
              <span className="bg-emerald-500 text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">New Deal</span>
            </div>

            <div className="p-5 flex-1 bg-gradient-to-b from-white to-emerald-50/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">Apex Roofing - Warehouse</h4>
                  <div className="text-[10px] text-ink-light flex items-center gap-1">
                    <i className="ph-fill ph-map-pin"></i> Austin, TX
                  </div>
                </div>
                <div className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <i className="ph-bold ph-check text-lg"></i>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="border border-black/5 rounded-md p-2 bg-white">
                  <div className="text-[9px] text-ink-light font-bold uppercase mb-1">Contact</div>
                  <div className="text-[10px] font-semibold text-ink">Mike Jenkins</div>
                </div>
                <div className="border border-black/5 rounded-md p-2 bg-white">
                  <div className="text-[9px] text-ink-light font-bold uppercase mb-1">Type</div>
                  <div className="text-[10px] font-semibold text-ink">Repair / Leak</div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2 text-[10px] text-ink-light bg-white border border-black/5 p-2 rounded-md">
                <i className="ph-fill ph-slack-logo text-pink-500"></i>
                <span>Sales team notified on Slack</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
