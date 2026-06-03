import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Database, Scan, ArrowRight } from 'lucide-react';
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
      className="relative w-full h-[420px] bg-white border border-slate-200 shadow-xl overflow-hidden cursor-crosshair group rounded-2xl"
    >
      {/* Base Layer: Messy Human Data */}
      <div className="absolute inset-0 p-8 text-slate-600 font-sans text-sm leading-relaxed select-none">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 text-slate-400">
          <Mail size={16} />
          <span className="font-mono text-xs uppercase tracking-widest">Raw Inbound Lead Email</span>
        </div>
        <div className="space-y-4 max-w-md">
          <p><strong className="text-slate-900">From:</strong> alex.chen@acmecorp.com</p>
          <p><strong className="text-slate-900">Subject:</strong> Need help scaling our outbound</p>
          <p className="pt-2">Hi team,</p>
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
        className="absolute inset-0 bg-slate-950 p-8 text-slate-300 font-mono text-xs leading-relaxed pointer-events-none select-none"
        style={{
          clipPath: `circle(${isHovered ? 160 : 120}px at ${mousePos.x}px ${mousePos.y}px)`,
        }}
      >
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800 text-slate-600">
          <Database size={16} />
          <span className="uppercase tracking-widest text-[10px]">Extracted_Payload.json</span>
        </div>
        <pre className="text-slate-300 overflow-visible text-[13px] leading-loose">
{`{
  `}
  <span className="text-sky-400 font-semibold">"intent_signal"</span>{`: `}<span className="text-emerald-400">"HIGH"</span>{`,
  `}
  <span className="text-sky-400 font-semibold">"lead"</span>{`: {
    `}
    <span className="text-sky-400 font-semibold">"name"</span>{`: `}<span className="text-white">"Alex Chen"</span>{`,
    `}
    <span className="text-sky-400 font-semibold">"company"</span>{`: `}<span className="text-white">"Acme Corp"</span>{`,
    `}
    <span className="text-sky-400 font-semibold">"revenue_arr"</span>{`: `}<span className="text-amber-400">5000000</span>{`,
    `}
    <span className="text-sky-400 font-semibold">"current_stack"</span>{`: [`}<span className="text-white">"Salesforce"</span>{`, `}<span className="text-white">"Outreach"</span>{`]
  },
  `}
  <span className="text-sky-400 font-semibold">"pain_point"</span>{`: `}<span className="text-white">"Manual SDR research"</span>{`,
  `}
  <span className="text-sky-400 font-semibold">"budget_monthly"</span>{`: `}<span className="text-amber-400">10000</span>{`,
  `}
  <span className="text-sky-400 font-semibold">"recommended_action"</span>{`: `}<span className="text-emerald-400">"TRIGGER_FAST_TRACK"</span>{`
}`}
        </pre>
      </div>

      {/* Scanner Ring */}
      <div 
        className="absolute pointer-events-none border border-sky-500/30 rounded-full flex items-center justify-center transition-all duration-200 ease-out"
        style={{
          width: isHovered ? 320 : 240,
          height: isHovered ? 320 : 240,
          left: mousePos.x - (isHovered ? 160 : 120),
          top: mousePos.y - (isHovered ? 160 : 120),
        }}
      >
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-sky-400 text-[9px] px-2 py-0.5 font-mono tracking-widest border border-slate-700 rounded-full">
          AGENT_VISION
        </div>
        <Scan size={32} className="text-sky-400/20" />
      </div>
      
      {/* Instruction overlay */}
      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-slate-400 tracking-widest pointer-events-none bg-white/90 px-3.5 py-1.5 border border-slate-200 rounded-lg shadow-sm">
        HOVER MOUSE TO SCAN
      </div>
    </div>
  );
}

export function AgentShowcase() {
  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="container-max">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start space-y-6"
          >
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
              Interactive Showcase
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
              See how our AI agents extract value in real-time
            </h2>
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              AI doesn't have to be a black box. Our agents interpret unstructured business data—like messy emails, phone logs, or compliance forms—and translate them into clean, structured datasets that trigger custom API workflows.
            </p>
            <div className="pt-2">
              <Link 
                to="/analyzer"
                className="inline-flex items-center justify-center gap-2 bg-slate-950 text-white rounded-full px-6 py-3 font-semibold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-950/10"
              >
                <span>Run AI Operational Scan</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 w-full"
          >
            <AgentXRay />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
