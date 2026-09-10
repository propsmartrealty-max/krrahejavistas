'use client';

import React from 'react';
import Link from '@/components/compat/NextLink';
import { Compass, MapPin, Navigation, Clock, ShieldCheck, ChevronRight, ExternalLink } from 'lucide-react';

const LANDMARKS = [
  {
    category: 'IT & Business Parks',
    items: [
      { name: 'Hinjewadi IT Park Phase 1', time: '5 Mins', dist: '3.2 km', desc: 'Infosys, Wipro, TCS, Cognizant, Tech Mahindra' },
      { name: 'Baner Commercial Hub', time: '5 Mins', dist: '3.8 km', desc: 'Siemens, Cisco, Veritas, Cummins India' },
      { name: 'Quadron Business Park', time: '8 Mins', dist: '5.1 km', desc: 'Tier-1 Global Tech Innovation Centers' }
    ]
  },
  {
    category: 'Lifestyle & Retail Hubs',
    items: [
      { name: 'Balewadi High Street', time: '3 Mins', dist: '2.4 km', desc: 'Fine dining, upscale retail, lounges, and cafes' },
      { name: 'Westend Mall Aundh', time: '12 Mins', dist: '7.5 km', desc: 'Multiplex cinemas, shopping arcades & gourmet dining' },
      { name: 'Phoenix Mall of the Millennium', time: '10 Mins', dist: '6.2 km', desc: 'Pune’s largest luxury shopping & leisure destination' }
    ]
  },
  {
    category: 'Transit & Infrastructure',
    items: [
      { name: 'Proposed Metro Line 3 Station', time: '4 Mins', dist: '1.8 km', desc: 'Direct rapid transit connecting to Shivajinagar' },
      { name: 'Mumbai-Pune Expressway', time: '6 Mins', dist: '4.5 km', desc: 'Seamless high-speed bypass via NH-48 corridor' },
      { name: 'Pune International Airport', time: '45 Mins', dist: '21 km', desc: 'Quick commute via connecting arterial express ring road' }
    ]
  }
];

export default function LocationRadar() {
  return (
    <section id="location-radar" className="w-full bg-[#0a0e17] py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[var(--color-luxury-gold)]/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Compass size={14} />
            <span>Strategic Micro-Market Geography</span>
          </div>
          <h2 className="font-google-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Prime Connectivity: Mahalunge Baner Annexe
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
            Positioned at the golden triangle between Hinjewadi’s IT corridors, Baner’s affluent lifestyle boulevards, and the Mumbai-Pune Expressway.
          </p>
        </div>

        {/* Tactical Location Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {LANDMARKS.map((cluster, idx) => (
            <div
              key={idx}
              className="bg-[#101726] rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--color-luxury-gold)]/50 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h3 className="font-google-sans text-lg font-bold text-white">
                    {cluster.category}
                  </h3>
                  <Navigation size={18} className="text-[var(--color-luxury-gold)]" />
                </div>

                <div className="space-y-5">
                  {cluster.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="group/item">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-semibold text-white text-sm group-hover/item:text-[var(--color-luxury-gold)] transition-colors">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-luxury-gold)] bg-[var(--color-luxury-gold)]/10 px-2 py-0.5 rounded-md border border-[var(--color-luxury-gold)]/20 whitespace-nowrap">
                          <Clock size={11} />
                          <span>{item.time}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                      <span className="text-[11px] text-gray-500 block mt-0.5 font-mono">
                        Distance: {item.dist}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  Direct Access Corridor
                </span>
                <span className="text-gray-500 font-mono">0 Traffic Chokepoints</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Map Bar & Link */}
        <div className="bg-[#111827] rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-luxury-gold)]/15 border border-[var(--color-luxury-gold)]/30 flex items-center justify-center text-[var(--color-luxury-gold)] shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="font-google-sans text-lg font-bold text-white">
                Site Address & GPS Navigation
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                K Raheja Vistas, Baner Annexe, Mahalunge, Pune, Maharashtra 411045
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="https://maps.app.goo.gl/Ej3VN8k7QdF2vRzw5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-luxury-gold)] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md"
            >
              <span>Open in Google Maps</span>
              <ExternalLink size={14} />
            </a>
            <Link
              href="/project/location"
              className="inline-flex items-center justify-center px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wider border border-white/15 transition-all"
            >
              <span>Full Location Dossier</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
