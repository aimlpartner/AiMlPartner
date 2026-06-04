import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, LayoutTemplate, Copy, Rocket, Settings, Code, Lock, RefreshCw, Star, Zap, ArrowRight } from 'lucide-react';

export function AgentShop() {
  const featuredShop = [
    {
      icon: <ShoppingCart className="text-accent" size={24} />,
      title: "E-commerce Recommender",
      desc: "Pre-built agent for dynamic product suggestions, cart recovery, and user-grounded personalization. Installs into Shopify or WooCommerce in minutes.",
      colSpan: "md:col-span-8",
      badge: "Deploy Ready",
      price: "$49/mo"
    },
    {
      icon: <LayoutTemplate className="text-success" size={24} />,
      title: "Blog Generator",
      desc: "Autonomously drafts SEO-optimized blog posts, selects keywords, formats markup headers, and updates WordPress pages directly.",
      colSpan: "md:col-span-4",
      badge: "Free Trial",
      price: "$29/mo",
      bgImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <Copy className="text-alert" size={24} />,
      title: "Copywriting Assistant",
      desc: "Generates high-converting marketing copywriting parameters, Facebook/Google ad variations, and social media captions based on prompt constraints.",
      colSpan: "md:col-span-12",
      badge: "Popular Choice",
      price: "$19/mo"
    }
  ];

  const directoryShop = [
    { num: "04/", icon: <Rocket size={18} />, title: "Launch Coordinator", desc: "Manage complicated marketing schedules, notify channels on Slack, and sync project statuses." },
    { num: "05/", icon: <Settings size={18} />, title: "IT Helpdesk", desc: "Instantly respond to tier-1 tickets, guide reset credentials, and audit security permissions." },
    { num: "06/", icon: <Code size={18} />, title: "Code Reviewer", desc: "Auto-scan pull requests for common performance leaks, formatting rules, and code coverage metrics." },
    { num: "07/", icon: <Lock size={18} />, title: "Security Scanner", desc: "Audit server configuration schemas, detect vulnerabilities, and ping compliance dashboards." },
    { num: "08/", icon: <RefreshCw size={18} />, title: "Inventory Sync", desc: "Bridge CRM triggers directly with SQL inventory databases, monitoring warehouse levels." },
    { num: "09/", icon: <Star size={18} />, title: "Review Manager", desc: "Listen for incoming app store or Google reviews, drafting context-aware replies automatically." },
    { num: "10/", icon: <Zap size={18} />, title: "Lead Scraper", desc: "Safely scrape local directory listings, extracting emails and phone numbers based on sector keyword prompts." }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-surface text-ink">
      {/* Texture Overlays */}
      <div className="grain-overlay"></div>

      {/* SECTION 1: IMMERSIVE SPACE HERO */}
      <section className="relative pt-40 pb-24 text-white overflow-hidden">
        {/* Deep Space Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 animate-[float-slow_30s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-90 transform scale-[1.15] origin-center"></div>
          </div>
          <div className="absolute inset-0 bg-space-gradient"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
        </div>

        <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none z-0"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono text-accent font-bold mb-8 tracking-wider uppercase rounded-md shadow-glow">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Agent Shop
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              Deploy Pre-Built <br />
              AI Workflows.
            </h1>
            <p className="text-lg text-white/70 font-medium leading-relaxed max-w-xl">
              Browse our marketplace of specialized, pre-trained AI agents. Pick your blueprint, plug in your API keys, and launch in minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FEATURED SHOP CARDS (Light Alabaster Theme) */}
      <section className="bg-surface rounded-t-[3rem] -mt-10 py-24 relative z-10 text-ink border-t border-black/5 px-6">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <div className="text-left">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">Top Downloads</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink tracking-tight">Best Sellers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {featuredShop.map((agent, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`${agent.colSpan} bg-white border border-black/5 rounded-3xl p-8 md:p-10 flex flex-col justify-between tangible-card shadow-editorial hover:shadow-editorial-hover relative overflow-hidden text-left`}
              >
                {agent.bgImage && (
                  <>
                    <img src={agent.bgImage} className="absolute inset-0 w-full h-full object-cover opacity-5 mix-blend-multiply pointer-events-none" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                  </>
                )}

                <div className="relative z-10 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-surface-alt border border-black/5 flex items-center justify-center shadow-sm">
                        {agent.icon}
                      </div>
                      <span className="bg-accent/10 border border-accent/20 text-accent font-mono text-[8px] font-bold uppercase px-2.5 py-1 rounded">
                        {agent.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-ink mb-3 tracking-tight">{agent.title}</h3>
                    <p className="text-ink-light text-sm leading-relaxed mb-8">{agent.desc}</p>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-black/5 mt-auto">
                    <span className="text-ink font-mono font-bold text-lg">{agent.price}</span>
                    <button className="bg-ink hover:bg-accent text-white hover:text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer">
                      Install Agent
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: DIRECTORY (Flowing Gradient Theme) */}
      <section className="flowing-gradient py-24 px-6 relative z-10 border-y border-black/5 text-ink">
        <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none z-0"></div>

        <div className="max-w-[1000px] mx-auto relative z-10 space-y-8">
          <div className="text-left max-w-xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">Complete Collection</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink tracking-tight">Marketplace listings</h2>
            <p className="text-ink-light text-sm mt-2 leading-relaxed font-medium">Choose pre-configured scripts for specific administrative integrations.</p>
          </div>

          <div className="space-y-4">
            {directoryShop.map((agent, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="offering-row block border border-black/10 bg-white/60 backdrop-blur-md rounded-2xl py-6 px-6 md:px-10 group cursor-pointer shadow-sm hover:shadow-md text-left"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-1 font-mono text-sm text-ink-lighter font-bold">{agent.num}</div>
                  <div className="md:col-span-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-black/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      {agent.icon}
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink group-hover:text-accent transition-colors duration-300 tracking-tight">
                      {agent.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-ink-light text-sm leading-relaxed group-hover:text-ink transition-colors duration-300 font-medium">
                      {agent.desc}
                    </p>
                  </div>
                  <div className="md:col-span-1 flex justify-start md:justify-end">
                    <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all shadow-sm bg-white/50">
                      <ArrowRight size={14} className="arrow-icon" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
