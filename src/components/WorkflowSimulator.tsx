import React from 'react';

export function WorkflowSimulator() {
  return (
    <div className="w-full relative bg-white border border-black/5 rounded-[2rem] p-8 md:p-14 shadow-editorial overflow-hidden font-sans select-none flex flex-col items-center justify-center min-h-[300px]">
      {/* Delicate mesh background gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/20 via-white to-emerald-50/20 opacity-90 pointer-events-none"></div>
      
      {/* Decorative architectural layout grid lines (very faint) */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIHN0cm9rZS13aWR0aD0iMScvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 pointer-events-none z-0"></div>

      {/* Main Designer Layout */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
        
        {/* NODE 1: CAPTURE */}
        <div className="flex flex-col items-center text-center group w-full md:w-[220px]">
          <div className="w-18 h-18 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-black/5 flex items-center justify-center relative hover:scale-105 transition-transform duration-300">
            <div className="w-13 h-13 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/10">
              <i className="ph-bold ph-envelope text-lg"></i>
            </div>
          </div>
          <h4 className="font-display font-bold text-ink mt-5 text-sm tracking-tight">Capture</h4>
          <p className="text-[11px] text-ink-light mt-1.5 font-medium max-w-[170px] mx-auto leading-relaxed">
            Ingest raw client emails, inquiry forms, and unstructured files.
          </p>
        </div>

        {/* CONNECTOR 1 */}
        <Connector />

        {/* NODE 2: REFINE */}
        <div className="flex flex-col items-center text-center group w-full md:w-[220px]">
          <div className="w-18 h-18 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-black/5 flex items-center justify-center relative hover:scale-105 transition-transform duration-300">
            <div className="w-13 h-13 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center shadow-md shadow-purple-500/10">
              <i className="ph-bold ph-sparkles text-lg"></i>
            </div>
          </div>
          <h4 className="font-display font-bold text-ink mt-5 text-sm tracking-tight">Refine</h4>
          <p className="text-[11px] text-ink-light mt-1.5 font-medium max-w-[170px] mx-auto leading-relaxed">
            AI agents parse context, extract intent, and clean operational data.
          </p>
        </div>

        {/* CONNECTOR 2 */}
        <Connector />

        {/* NODE 3: SYNC */}
        <div className="flex flex-col items-center text-center group w-full md:w-[220px]">
          <div className="w-18 h-18 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-black/5 flex items-center justify-center relative hover:scale-105 transition-transform duration-300">
            <div className="w-13 h-13 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/10">
              <i className="ph-bold ph-paper-plane-tilt text-lg"></i>
            </div>
          </div>
          <h4 className="font-display font-bold text-ink mt-5 text-sm tracking-tight">Sync</h4>
          <p className="text-[11px] text-ink-light mt-1.5 font-medium max-w-[170px] mx-auto leading-relaxed">
            Instantly sync structured payloads directly to your CRM and Slack channels.
          </p>
        </div>

      </div>
    </div>
  );
}

// Minimalistic line connector component with a soft color gradient
function Connector() {
  return (
    <div className="flex md:flex-col items-center justify-center shrink-0">
      {/* Desktop Horizontal Line */}
      <div className="hidden md:block w-16 h-[1.5px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-emerald-500/30 mx-2"></div>
      {/* Mobile Vertical Line */}
      <div className="block md:hidden w-[1.5px] h-10 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-emerald-500/30 my-3"></div>
    </div>
  );
}
