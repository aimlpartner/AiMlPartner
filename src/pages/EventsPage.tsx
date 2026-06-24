import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Ticket } from 'lucide-react';

export function EventsPage() {
  const events = [
    {
      title: "AI Agent Architecture Summit",
      date: "October 15, 2026",
      location: "San Francisco, CA",
      image: "1540575467063-178a50c2df87", // Conference
      description: "Join us for a deep dive into building resilient agentic workflows using advanced orchestration frameworks."
    },
    {
      title: "Low-Code Founders Meetup",
      date: "November 02, 2026",
      location: "Austin, TX",
      image: "1515187029135-18ee286d815b", // Meetup
      description: "A hands-on workshop on turning prompts into production-ready SaaS products in under a week."
    },
    {
      title: "Enterprise Agentforce Webinar",
      date: "December 10, 2026",
      location: "Virtual",
      image: "1588196749561-c9a5895e65a3", // Virtual/Tech
      description: "Learn how to safely deploy Salesforce Agentforce within strict compliance boundaries."
    }
  ];

  return (
    <div className="relative min-h-screen bg-surface text-ink">
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
              Community
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              Events & Workshops
            </h1>
            <p className="text-lg text-white/70 font-medium leading-relaxed max-w-xl">
              Connect with our team, learn about the latest in AI architecture, and see our systems in action.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: TIMELINE TRACK (Flowing Gradient Theme) */}
      <section className="flowing-gradient py-24 px-6 relative z-10 border-t border-black/5 text-ink rounded-t-[3rem] -mt-10">
        <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none z-0"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Vertical fading track line */}
          <div className="hidden md:block absolute top-0 bottom-0 left-[23px] w-px bg-gradient-to-b from-black/10 via-black/10 to-transparent z-0"></div>

          <div className="space-y-16 relative z-0">
            {events.map((event, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 items-start group">
                {/* Timeline node badge counter */}
                <div className="w-12 h-12 bg-white border border-black/10 text-ink rounded-full font-display text-lg font-bold flex items-center justify-center shrink-0 shadow-md group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500 z-10">
                  {i + 1}
                </div>

                {/* Event ticket glass card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/60 border border-black/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-editorial hover:shadow-editorial-hover hover:bg-white transition-all duration-300 flex-grow w-full"
                >
                  {/* Event Thumbnail */}
                  <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0 relative border border-black/5 bg-surface-alt">
                    <img 
                      src={`https://images.unsplash.com/photo-${event.image}?auto=format&fit=crop&q=80&w=400&h=300`}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[30%] group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Event Details */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-ink mb-2 tracking-tight group-hover:text-accent transition-colors duration-300">
                        {event.title}
                      </h3>
                      <p className="text-ink-light text-sm leading-relaxed mb-6 font-medium">
                        {event.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/5 mt-auto">
                      <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono text-ink-lighter uppercase tracking-wider font-semibold">
                        <div className="flex items-center gap-2">
                          <Calendar size={13} className="text-accent" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={13} className="text-accent" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <button className="bg-ink hover:bg-accent text-white hover:text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer flex items-center gap-2">
                        <Ticket size={13} />
                        <span>RSVP Ticket</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
