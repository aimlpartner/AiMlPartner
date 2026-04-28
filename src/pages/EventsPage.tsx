import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';

export function EventsPage() {
  const events = [
    {
      title: "AI Agent Architecture Summit",
      date: "October 15, 2026",
      location: "San Francisco, CA",
      image: "1540575467063-178a50c2df87", // Conference
      description: "Join us for a deep dive into building resilient agentic workflows using n8n and LangChain."
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
    <main className="pt-32 pb-24 bg-gradient-to-br from-slate-50 to-sky-50/30 min-h-screen">
      <div className="container-max">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 text-xs font-mono text-slate-600 mb-8 tracking-tight uppercase bg-white">
            <span className="w-2 h-2 bg-slate-900" />
            Community
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Events & Workshops
          </h1>
          <p className="text-lg text-slate-600 font-light">
            Connect with our team, learn about the latest in AI architecture, and see our systems in action.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-200 overflow-hidden group hover:border-slate-300 transition-colors flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={`https://images.unsplash.com/photo-${event.image}?auto=format&fit=crop&q=80&w=800&h=400`}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-medium text-slate-900 mb-4">{event.title}</h3>
                <p className="text-slate-600 font-light text-sm mb-6 flex-grow">{event.description}</p>
                <div className="flex flex-col gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    {event.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
