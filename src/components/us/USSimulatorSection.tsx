import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Play, Pause } from 'lucide-react';

export function USSimulatorSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive Velocity Multiplier (1x to 10x)
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [waveMode, setWaveMode] = useState<'laminar' | 'quantum' | 'harmonic'>('laminar');
  
  // Mouse position tracker for canvas gravitational ripples
  const mouseRef = useRef<{ x: number; y: number; isHovered: boolean }>({
    x: 0,
    y: 0,
    isHovered: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Optimized High-Performance Grid (36 cols x 18 rows = fast 60fps)
    const cols = 38;
    const rows = 18;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const spacingX = width / (cols - 1);
      const spacingY = height / (rows - 1);

      const speedFactor = isPlaying ? speedMultiplier * 0.006 : 0;
      time += speedFactor;

      const points: { x: number; y: number; glow: boolean }[][] = [];

      // 1. Calculate Grid Points (Lightweight Math)
      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const baseX = c * spacingX;
          const baseY = r * spacingY;

          let wave = 0;
          if (waveMode === 'laminar') {
            wave = Math.sin(c * 0.2 + time * 2) * Math.cos(r * 0.25 + time * 1.5) * 24;
          } else if (waveMode === 'quantum') {
            wave = Math.sin(c * 0.3 + r * 0.3 + time * 2.5) * 26;
          } else {
            const dx = baseX - width / 2;
            const dy = baseY - height / 2;
            const dist = Math.sqrt(dx * dx + dy * dy);
            wave = Math.sin(dist * 0.025 - time * 2.5) * 24;
          }

          // Mouse Gravitational Ripple (Fast Distance Check)
          if (mouseRef.current.isHovered) {
            const dx = baseX - mouseRef.current.x;
            const dy = baseY - mouseRef.current.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 25000) { // 158px radius
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / 158) * 35;
              wave += force * Math.sin(time * 3);
            }
          }

          points[r][c] = {
            x: baseX,
            y: baseY + wave,
            glow: wave > 14
          };
        }
      }

      // 2. Batched Render: Horizontal Amber Filaments (Single Path Call)
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
      }
      ctx.strokeStyle = 'rgba(255, 85, 0, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. Batched Render: Vertical Subtle Filaments
      ctx.beginPath();
      for (let c = 0; c < cols; c += 2) {
        for (let r = 0; r < rows; r++) {
          const p = points[r][c];
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 4. Batched Render: Nodes (Zero expensive shadowBlur!)
      // Glowing Amber Nodes
      ctx.beginPath();
      ctx.fillStyle = '#FF5500';
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const p = points[r][c];
          if (p.glow) {
            ctx.moveTo(p.x + 2.5, p.y);
            ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          }
        }
      }
      ctx.fill();

      // Subtle White Nodes
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const p = points[r][c];
          if (!p.glow) {
            ctx.moveTo(p.x + 1.2, p.y);
            ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
          }
        }
      }
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speedMultiplier, isPlaying, waveMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.isHovered = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isHovered = false;
  };

  return (
    <section
      id="waveform"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-32 px-6 md:px-16 bg-black text-white border-b border-zinc-900 relative select-none overflow-hidden min-h-[900px] flex flex-col justify-between"
    >
      
      {/* 1. Generative 3D Canvas Mesh Background (60+ FPS Optimized) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-90">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Radial Vignette Mask */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black pointer-events-none -z-0" />

      {/* 2. Top Manifesto Header */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8 z-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-medium mb-3">
            Sovereign Neural Physics
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.02]">
            Momentum without <span className="text-[#FF5500]">friction.</span>
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/90 p-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FF5500] animate-ping" />
            <span className="font-mono text-xs text-zinc-300 font-bold uppercase tracking-wider">
              Interactive Mesh
            </span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <span className="font-sans text-xs text-zinc-400">
            Hover to warp gravitational vectors in real time
          </span>
        </div>
      </div>

      {/* 3. Center Interactive Physics Control Console */}
      <div className="relative w-full max-w-4xl mx-auto my-16 p-8 sm:p-12 rounded-3xl bg-zinc-950/85 border border-zinc-800/90 backdrop-blur-2xl z-10 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-10 pb-10 border-b border-zinc-900">
          
          {/* Metric 1: Sprint Velocity */}
          <div className="text-left">
            <span className="font-mono text-[10px] text-[#FF5500] uppercase font-bold tracking-widest block mb-1">
              01 // EXECUTION VELOCITY
            </span>
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              {speedMultiplier * 2.5}x Faster
            </div>
            <p className="font-sans text-xs text-zinc-400 mt-1">
              Compared to legacy consulting cycles
            </p>
          </div>

          {/* Metric 2: Deployment Horizon */}
          <div className="text-left">
            <span className="font-mono text-[10px] text-[#FF5500] uppercase font-bold tracking-widest block mb-1">
              02 // DEPLOYMENT HORIZON
            </span>
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              14 Days
            </div>
            <p className="font-sans text-xs text-zinc-400 mt-1">
              From audit to production pod in your VPC
            </p>
          </div>

          {/* Metric 3: IP Sovereignty */}
          <div className="text-left">
            <span className="font-mono text-[10px] text-[#FF5500] uppercase font-bold tracking-widest block mb-1">
              03 // CUSTODY
            </span>
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#FF5500]">
              100% Yours
            </div>
            <p className="font-sans text-xs text-zinc-400 mt-1">
              Zero telemetry leakage or lock-in
            </p>
          </div>

        </div>

        {/* Dynamic Velocity & Waveform Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Slider Control */}
          <div className="w-full md:w-1/2 flex flex-col gap-2.5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-zinc-400 uppercase tracking-wider">Pod Velocity Throttle:</span>
              <span className="text-[#FF5500] font-bold">{speedMultiplier}x Speed</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={speedMultiplier}
              onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
              className="w-full h-2 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-[#FF5500]"
            />
          </div>

          {/* Wave Mode Selector Pills */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            {(['laminar', 'quantum', 'harmonic'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setWaveMode(mode)}
                className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  waveMode === mode
                    ? 'bg-[#FF5500] text-black font-bold shadow-us-pop'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {mode}
              </button>
            ))}

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-[#FF5500] border border-zinc-800 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause simulation' : 'Play simulation'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>

        </div>

      </div>

      {/* 4. Bottom Anchor */}
      <div className="w-full max-w-7xl mx-auto pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6 z-10">
        <div className="flex items-center gap-6 font-mono text-xs text-zinc-500">
          <span>// REAL-TIME MATHEMATICAL HARMONICS</span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span className="hidden sm:inline text-zinc-400">Zero Third-Party Model Lock-in</span>
        </div>

        <a
          href="#intake"
          className="px-8 py-3.5 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer"
        >
          <span>Accelerate Your Architecture</span>
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

    </section>
  );
}
