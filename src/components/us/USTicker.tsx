import React from 'react';
import {
  Stethoscope,
  Scale,
  Calculator,
  Wrench,
  Truck,
  Factory,
  Building2,
  Car,
  HardHat,
  HeartPulse,
  Store,
  ShieldCheck,
  UtensilsCrossed,
  Dumbbell,
  Landmark,
  ShoppingBag,
  ArrowUpRight
} from 'lucide-react';

interface SMBItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function USTicker() {
  const smbs: SMBItem[] = [
    { name: 'Medical Clinics', icon: Stethoscope },
    { name: 'Law Practices', icon: Scale },
    { name: 'Accounting & CPAs', icon: Calculator },
    { name: 'HVAC & Field Services', icon: Wrench },
    { name: 'Real Estate Brokerages', icon: Building2 },
    { name: 'Logistics & Freight', icon: Truck },
    { name: 'Auto Dealerships', icon: Car },
    { name: 'Dental Practices', icon: HeartPulse },
    { name: 'Construction & GCs', icon: HardHat },
    { name: 'Machine Shops & Mfg', icon: Factory },
    { name: 'Restaurants & Hospitality', icon: UtensilsCrossed },
    { name: 'Insurance Agencies', icon: ShieldCheck },
    { name: 'Fitness & Gym Studios', icon: Dumbbell },
    { name: 'Wealth & Advisory', icon: Landmark },
    { name: 'Retail & E-Commerce', icon: ShoppingBag }
  ];

  return (
    <div className="w-full bg-black border-y border-white/[0.07] py-4 overflow-hidden select-none relative group/ticker">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,85,0,0.035),transparent_80%)] pointer-events-none" />

      {/* Left/Right Smooth Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/90 to-transparent z-20 pointer-events-none" />

      {/* Seamless Marquee Track */}
      <div className="flex w-max animate-marquee group-hover/ticker:[animation-play-state:paused] items-center gap-3.5 relative z-10">
        {/* First Loop */}
        {smbs.map((smb, index) => {
          const Icon = smb.icon;
          return (
            <a
              href="#intake"
              key={`smb-1-${index}`}
              className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-950/80 backdrop-blur-xl border border-white/[0.08] hover:border-[#FF5500]/50 hover:bg-zinc-900/90 transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] hover:shadow-[0_0_24px_-4px_rgba(255,85,0,0.25)] hover:-translate-y-0.5 cursor-pointer shrink-0"
            >
              {/* Top subtle rim light */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-t-xl pointer-events-none" />

              {/* Icon Container with glowing glass effect */}
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] group-hover:border-[#FF5500]/40 group-hover:bg-[#FF5500]/10 transition-all duration-300 shrink-0">
                <Icon className="w-4 h-4 text-[#FF5500] group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* SMB Name */}
              <span className="text-sm font-semibold tracking-tight text-zinc-200 group-hover:text-white transition-colors duration-200 whitespace-nowrap">
                {smb.name}
              </span>

              {/* Micro Arrow */}
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#FF5500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 opacity-50 group-hover:opacity-100 shrink-0 ml-0.5" />
            </a>
          );
        })}

        {/* Second Loop (Seamless Duplicate) */}
        {smbs.map((smb, index) => {
          const Icon = smb.icon;
          return (
            <a
              href="#intake"
              key={`smb-2-${index}`}
              className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-950/80 backdrop-blur-xl border border-white/[0.08] hover:border-[#FF5500]/50 hover:bg-zinc-900/90 transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] hover:shadow-[0_0_24px_-4px_rgba(255,85,0,0.25)] hover:-translate-y-0.5 cursor-pointer shrink-0"
              aria-hidden="true"
            >
              {/* Top subtle rim light */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-t-xl pointer-events-none" />

              {/* Icon Container with glowing glass effect */}
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] group-hover:border-[#FF5500]/40 group-hover:bg-[#FF5500]/10 transition-all duration-300 shrink-0">
                <Icon className="w-4 h-4 text-[#FF5500] group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* SMB Name */}
              <span className="text-sm font-semibold tracking-tight text-zinc-200 group-hover:text-white transition-colors duration-200 whitespace-nowrap">
                {smb.name}
              </span>

              {/* Micro Arrow */}
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#FF5500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 opacity-50 group-hover:opacity-100 shrink-0 ml-0.5" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
