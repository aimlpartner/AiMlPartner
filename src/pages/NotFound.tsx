import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass, Sparkles, RefreshCw, Home, Shield } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  size: number;
}

export function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [particlesCollected, setParticlesCollected] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Create Saturn Ring Particle Array
    let particles: Particle[] = [];
    const particleCount = Math.min(width < 768 ? 60 : 140, 160);

    const initParticles = () => {
      particles = [];
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particleCount; i++) {
        // Distribute in an elliptical orbital ring around center
        const angle = Math.random() * Math.PI * 2;
        const ringRadius = 140 + Math.random() * 260;
        const x = centerX + Math.cos(angle) * ringRadius;
        const y = centerY + Math.sin(angle) * (ringRadius * 0.45); // Tilted perspective for Saturn ring look

        const colors = [
          'rgba(255, 85, 0, 0.8)',   // Blaze orange
          'rgba(255, 140, 0, 0.6)',  // Warm amber
          'rgba(245, 245, 244, 0.7)',// Starlight white
          'rgba(214, 211, 209, 0.4)' // Space dust
        ];

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          radius: Math.random() * 2.5 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1
        });
      }
    };

    initParticles();

    // Mouse Gravity Coordinates
    let mouse = { x: -1000, y: -1000, isHovering: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isHovering = true;
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isHovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle Physics Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint orbital ring guide
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, 280, 120, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 85, 0, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Natural orbital drift
        p.originX += p.vx;
        p.originY += p.vy;

        // Keep inside bounds
        if (p.originX < 0 || p.originX > width) p.vx *= -1;
        if (p.originY < 0 || p.originY > height) p.vy *= -1;

        // Gravitational reaction to cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;

        if (distance < maxDist && mouse.isHovering) {
          const force = (maxDist - distance) / maxDist;
          // Push particles slightly away like a gravitational wake
          p.x -= (dx / distance) * force * 4;
          p.y -= (dy / distance) * force * 4;
        } else {
          // Gently return to orbit
          p.x += (p.originX - p.x) * 0.04;
          p.y += (p.originY - p.y) * 0.04;
        }

        // Draw particle with soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#FF5500';
        ctx.shadowBlur = p.radius > 2 ? 8 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col items-center justify-center px-6 overflow-hidden select-none font-sans">
      
      {/* Interactive Gravity Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Saturn Radial Deep Space Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#FF5500]/10 rounded-full blur-[240px] pointer-events-none -z-10" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-2xl text-center flex flex-col items-center py-20">
        
        {/* Monumental 404 Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          <h1 className="font-display text-8xl sm:text-9xl md:text-[12rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-800 leading-none">
            404
          </h1>
          
          {/* Subtle Ring Orbit Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[30px] border-t-2 border-[#FF5500]/40 rounded-[100%] rotate-[-14deg] pointer-events-none blur-[0.5px]" />
        </motion.div>

        {/* Human, Plain-English Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4"
        >
          You drifted past Saturn's outer ring.
        </motion.h2>

        {/* Plain-English Explanation */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed mb-10"
        >
          The page or file you are looking for has moved, expired, or never existed in this cloud. Move your cursor to interact with the ring particles, or jump back to safety.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <Link
            to="/"
            className="px-8 py-3.5 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Home size={14} />
            <span>Return to Mission Control</span>
          </Link>

          <Link
            to="/about"
            className="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <span>About Us</span>
          </Link>

          <Link
            to="/pricing"
            className="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <span>Pricing</span>
          </Link>
        </motion.div>

        {/* Live Interactive Telemetry Footer */}
        <div className="pt-6 border-t border-zinc-900 w-full flex items-center justify-between text-[11px] font-mono text-zinc-600">
          <span>HQ: NEW JERSEY, USA</span>
          <span>CURSOR: [{coords.x}, {coords.y}]</span>
          <span className="text-zinc-500">100% PRIVATE VPC</span>
        </div>

      </div>

    </div>
  );
}
