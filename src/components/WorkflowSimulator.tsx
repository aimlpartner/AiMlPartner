import React from 'react';

export function WorkflowSimulator() {
  return (
    <div className="w-full relative bg-gradient-to-tr from-slate-50 via-white to-blue-50/30 border border-slate-100 rounded-[2.5rem] p-8 md:p-14 shadow-editorial overflow-hidden font-sans select-none flex flex-col items-center justify-center min-h-[380px]">
      
      {/* Self-contained CSS keyframe animations for floating elements and particle flows */}
      <style>{`
        @keyframes float-left-card {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes float-right-card-a {
          0%, 100% { transform: translateY(-10px) rotate(-2deg); }
          50% { transform: translateY(-18px) rotate(0deg); }
        }
        @keyframes float-right-card-b {
          0%, 100% { transform: translate(16px, 10px) rotate(2deg); }
          50% { transform: translate(16px, 2px) rotate(-1deg); }
        }
        @keyframes orbit-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 40px rgba(99, 102, 241, 0.15); }
          50% { transform: scale(1.04); box-shadow: 0 20px 50px rgba(99, 102, 241, 0.25); }
        }
        .animate-float-left {
          animation: float-left-card 6s ease-in-out infinite;
        }
        .animate-float-right-a {
          animation: float-right-card-a 7s ease-in-out infinite;
        }
        .animate-float-right-b {
          animation: float-right-card-b 8s ease-in-out infinite;
        }
        .animate-orbit-pulse {
          animation: orbit-pulse 5s ease-in-out infinite;
        }
      `}</style>

      {/* Delicate background mesh glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-blue-400/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[220px] h-[220px] bg-purple-400/10 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Main Designer Layout */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
        
        {/* NODE 1: CAPTURE GLASS CARD */}
        <div className="flex flex-col items-center">
          <div className="w-56 h-48 bg-white/80 border border-slate-200/50 rounded-3xl p-5 flex flex-col items-center justify-center shadow-[0_15px_35px_rgba(0,0,0,0.02)] backdrop-blur-md relative z-10 animate-float-left">
            {/* Gradient badge representing incoming signal */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/15 mb-4">
              <i className="ph-bold ph-envelope text-xl"></i>
            </div>
            
            {/* Mock message bubble */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-[10px] text-slate-650 font-sans shadow-sm w-full leading-normal text-left">
              <span className="font-bold text-slate-800">Inbound Request:</span>
              <div className="mt-1 italic text-slate-500 font-medium">"We'd love to automate our lead updates..."</div>
            </div>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-4">01 / Capture</span>
        </div>

        {/* CONNECTOR 1: Left -> Center */}
        <div className="flex items-center justify-center shrink-0 relative">
          <ConnectorLine id="line-1" direction="horizontal" delay="0s" color1="#3b82f6" color2="#8b5cf6" />
          <ConnectorLine id="line-1-mob" direction="vertical" delay="0s" color1="#3b82f6" color2="#8b5cf6" />
        </div>

        {/* NODE 2: ORCHESTRATOR LENS */}
        <div className="flex flex-col items-center">
          <div className="w-36 h-36 rounded-full bg-white/80 border border-slate-200/60 flex items-center justify-center relative backdrop-blur-lg z-10 animate-orbit-pulse">
            {/* Dashed outer spinning ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-slate-300 animate-[spin_25s_linear_infinite]"></div>
            
            {/* Dotted inner reverse spinning ring */}
            <div className="absolute inset-2.5 rounded-full border-2 border-dotted border-slate-200 animate-[spin_12s_linear_infinite_reverse]"></div>

            {/* Glowing gradient color background */}
            <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-[0.09] animate-pulse"></div>

            {/* Core Sparkle Lens */}
            <div className="absolute w-20 h-20 rounded-full bg-white/90 shadow-md border border-slate-100 flex items-center justify-center">
              <i className="ph-fill ph-sparkle text-3xl text-indigo-600 animate-[pulse_2s_infinite]"></i>
            </div>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-4">02 / Refine</span>
        </div>

        {/* CONNECTOR 2: Center -> Right */}
        <div className="flex items-center justify-center shrink-0 relative">
          <ConnectorLine id="line-2" direction="horizontal" delay="1.2s" color1="#8b5cf6" color2="#10b981" />
          <ConnectorLine id="line-2-mob" direction="vertical" delay="1.2s" color1="#8b5cf6" color2="#10b981" />
        </div>

        {/* NODE 3: OUTCOME GLASS CARD STACK */}
        <div className="flex flex-col items-center">
          <div className="w-56 h-48 relative flex items-center justify-center">
            {/* Slack target bubble */}
            <div className="absolute bg-white/90 border border-slate-200/50 rounded-2xl p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.03)] w-[190px] flex items-center gap-3 backdrop-blur-md z-20 animate-float-right-a text-left">
              <div className="w-7 h-7 rounded-lg bg-pink-50 text-pink-500 flex items-center justify-center shrink-0 border border-pink-100 shadow-sm">
                <i className="ph-bold ph-slack-logo text-sm"></i>
              </div>
              <div className="flex-grow">
                <div className="text-[10px] font-bold text-slate-800">Slack Dispatch</div>
                <div className="text-[8px] font-medium text-slate-400">Team notified in real-time</div>
              </div>
              <i className="ph-bold ph-circle-wavy-check text-emerald-500 text-base shrink-0"></i>
            </div>

            {/* CRM target bubble */}
            <div className="absolute bg-white/90 border border-slate-200/50 rounded-2xl p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.03)] w-[190px] flex items-center gap-3 backdrop-blur-md z-10 animate-float-right-b text-left">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                <i className="ph-bold ph-database text-sm"></i>
              </div>
              <div className="flex-grow">
                <div className="text-[10px] font-bold text-slate-800">CRM Synchronized</div>
                <div className="text-[8px] font-medium text-slate-400">Sales pipeline updated</div>
              </div>
              <i className="ph-bold ph-circle-wavy-check text-emerald-500 text-base shrink-0"></i>
            </div>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-4">03 / Sync</span>
        </div>

      </div>
    </div>
  );
}

interface ConnectorLineProps {
  id: string;
  direction: 'horizontal' | 'vertical';
  delay: string;
  color1: string;
  color2: string;
}

// Directional connecting line with animated flowing particle
function ConnectorLine({ id, direction, delay, color1, color2 }: ConnectorLineProps) {
  const gradientId = `grad-${id}`;
  
  if (direction === 'horizontal') {
    return (
      <div className="hidden md:block w-24 h-6 overflow-visible select-none pointer-events-none">
        <svg className="w-full h-full overflow-visible" fill="none">
          <path
            id={id}
            d="M0,12 L96,12"
            stroke="#e2e8f0"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />
          <circle r="4.5" fill={`url(#${gradientId})`}>
            <animateMotion dur="2.4s" repeatCount="indefinite" path="M0,12 L96,12" begin={delay} />
          </circle>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={color1} />
              <stop offset="100%" stopColor={color2} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div className="block md:hidden h-14 w-6 overflow-visible select-none pointer-events-none">
      <svg className="w-full h-full overflow-visible" fill="none">
        <path
          id={id}
          d="M12,0 L12,56"
          stroke="#e2e8f0"
          strokeWidth="1.5"
          strokeDasharray="5 3"
        />
        <circle r="4" fill={`url(#${gradientId})`}>
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M12,0 L12,56" begin={delay} />
        </circle>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
