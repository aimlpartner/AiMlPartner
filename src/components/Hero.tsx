import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Database, Scan, Mail } from 'lucide-react';
import { motion } from 'motion/react';

function AgentXRay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 250, y: 200 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    if (isHovered) return;
    let animationFrameId: number;
    const start = Date.now();
    const animate = () => {
      const time = (Date.now() - start) / 1000;
      setMousePos({
        x: 250 + Math.sin(time * 0.8) * 120,
        y: 200 + Math.cos(time * 1.2) * 80
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[420px] bg-white border border-slate-200 shadow-xl overflow-hidden cursor-crosshair group"
    >
      {/* Base Layer: Messy Human Data */}
      <div className="absolute inset-0 p-8 text-slate-600 font-sans text-sm leading-relaxed">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 text-slate-400">
          <Mail size={16} />
          <span className="font-mono text-xs uppercase tracking-widest">Raw Inbound Lead</span>
        </div>
        <div className="space-y-4 max-w-md">
          <p><strong className="text-slate-900">From:</strong> alex.chen@acmecorp.com</p>
          <p><strong className="text-slate-900">Subject:</strong> Need help scaling our outbound</p>
          <p className="pt-4">Hi team,</p>
          <p>
            We're currently doing about $5M ARR but our SDR team is drowning in manual lead research. We use Salesforce and Outreach, but reps spend 30% of their time just looking up LinkedIn profiles and company news.
          </p>
          <p>
            Looking to automate this so they can just focus on calling. Budget is around $10k/mo if we can prove ROI. Let me know if you can help.
          </p>
          <p>- Alex</p>
        </div>
      </div>

      {/* Masked Layer: Structured AI Data */}
      <div 
        className="absolute inset-0 bg-slate-900 p-8 text-slate-300 font-mono text-xs leading-relaxed pointer-events-none"
        style={{
          clipPath: `circle(${isHovered ? 160 : 120}px at ${mousePos.x}px ${mousePos.y}px)`,
        }}
      >
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800 text-slate-600">
          <Database size={16} />
          <span className="uppercase tracking-widest">Extracted_Payload.json</span>
        </div>
        <pre className="text-slate-300 overflow-visible text-[13px] leading-loose">
{`{
  `}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700 font-semibold">"intent_signal"</span>{`: `}<span className="text-slate-100">"HIGH"</span>{`,
  `}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700 font-semibold">"lead"</span>{`: {
    `}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700 font-semibold">"name"</span>{`: `}<span className="text-slate-100">"Alex Chen"</span>{`,
    `}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700 font-semibold">"company"</span>{`: `}<span className="text-slate-100">"Acme Corp"</span>{`,
    `}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700 font-semibold">"revenue_arr"</span>{`: `}<span className="text-slate-400">5000000</span>{`,
    `}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700 font-semibold">"current_stack"</span>{`: [`}<span className="text-slate-100">"Salesforce"</span>{`, `}<span className="text-slate-100">"Outreach"</span>{`]
  },
  `}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700 font-semibold">"pain_point"</span>{`: `}<span className="text-slate-100">"Manual SDR research"</span>{`,
  `}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700 font-semibold">"budget_monthly"</span>{`: `}<span className="text-slate-400">10000</span>{`,
  `}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700 font-semibold">"recommended_action"</span>{`: `}<span className="text-slate-100">"TRIGGER_FAST_TRACK"</span>{`
}`}
        </pre>
      </div>

      {/* Scanner Ring */}
      <div 
        className="absolute pointer-events-none border border-slate-500/30 rounded-full flex items-center justify-center transition-all duration-200 ease-out"
        style={{
          width: isHovered ? 320 : 240,
          height: isHovered ? 320 : 240,
          left: mousePos.x - (isHovered ? 160 : 120),
          top: mousePos.y - (isHovered ? 160 : 120),
        }}
      >
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-slate-400 text-[10px] px-2 py-0.5 font-mono tracking-widest border border-slate-700">
          AGENT_VISION
        </div>
        <Scan size={32} className="text-slate-600/20" />
      </div>
      
      {/* Instruction overlay */}
      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-slate-400 tracking-widest pointer-events-none bg-white/80 px-2 py-1 border border-slate-200">
        HOVER TO EXTRACT
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-sky-900">
      {/* Creative Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=2000" 
          alt="Beautiful Sky" 
          className="w-full h-full object-cover transform scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/60 via-sky-800/40 to-sky-900/80" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-400 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-sky-300 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-sky-200 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-4000" />
      </div>

      <div className="container-max relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-sky-300/30 text-xs font-mono text-sky-100 mb-8 tracking-tight uppercase bg-white/10 backdrop-blur-sm shadow-xl rounded-full">
            <span className="w-2 h-2 bg-sky-300 rounded-full" />
            Built by operators. Designed for revenue.
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-semibold tracking-tight text-white leading-[1.05] mb-6 drop-shadow-sm">
            AIMLpartner
          </h1>
          
          <p className="text-lg md:text-xl text-sky-100 mb-10 max-w-2xl leading-relaxed font-light drop-shadow">
            AIMLpartner helps companies discover, validate, and implement AI solutions — matched to expert agents built for their exact business needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto drop-shadow-xl">
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('open-quiz'))}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-full px-8 py-4 font-medium hover:from-sky-300 hover:to-sky-400 transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40"
            >
              Assess Your Agent Readiness
              <ArrowRight size={18} />
            </button>
            <a 
              href="#solutions"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 font-medium hover:bg-white/20 transition-colors rounded-full"
            >
              See our systems
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative w-full max-w-2xl mx-auto lg:max-w-none"
        >
          <AgentXRay />
        </motion.div>
      </div>
    </section>
  );
}
