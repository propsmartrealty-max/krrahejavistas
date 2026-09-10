'use client';

import React, { useState } from 'react';
import Image from '@/components/compat/NextImage';
import Link from '@/components/compat/NextLink';
import { Layers, ShieldCheck, Download, ChevronRight, CheckCircle2, Trees, Building2, Waves } from 'lucide-react';
import ContactModal from '@/components/ui/ContactModal';

const PILLARS = [
  {
    icon: Building2,
    title: '7 Sovereign Towers',
    desc: 'Low-density 7.5-acre architectural masterpiece rising up to 32 storeys with hill-facing alignments.'
  },
  {
    icon: Trees,
    title: '75% Open Green Realm',
    desc: 'Dense botanical groves, reflexology pathways, sensory gardens, and zero-vehicle pedestrian promenades.'
  },
  {
    icon: Waves,
    title: 'Twin 35,000 sq.ft Clubhouses',
    desc: 'Club Grandeur & Club Elysium featuring temperature-regulated infinity pool, squash court, and spa.'
  }
];

export default function MasterLayoutPreview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="master-layout" className="w-full bg-[#080d16] py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-luxury-gold)]/10 border border-[var(--color-luxury-gold)]/30 text-[var(--color-luxury-gold)] text-xs font-semibold uppercase tracking-widest mb-4">
            <Layers size={14} />
            <span>Integrated Masterplan Architecture</span>
          </div>
          <h2 className="font-google-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            7.5 Acres of Low-Density Grandeur
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
            Thoughtfully planned by international landscape architects to preserve natural hill contours, sunlight exposure, and unhindered green vistas.
          </p>
        </div>

        {/* 3 Pillars Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-[#0f1624] rounded-2xl border border-white/10 p-6 flex items-start gap-4 hover:border-[var(--color-luxury-gold)]/40 transition-colors"
              >
                <div className="p-3 rounded-xl bg-[var(--color-luxury-gold)]/10 text-[var(--color-luxury-gold)] shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-google-sans text-base font-bold text-white mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Masterplan Visual Canvas */}
        <div className="bg-[#0d1320] rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Image */}
            <div className="lg:col-span-8 bg-[#05080f] rounded-2xl border border-white/5 p-4 relative group overflow-hidden flex items-center justify-center min-h-[320px] sm:min-h-[440px]">
              <div className="relative w-full h-[300px] sm:h-[420px]">
                <Image
                  src="/assets/masterplan-layout.webp"
                  alt="7.5-Acre Masterplan Layout at K Raheja Vistas Mahalunge Pune"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>

              {/* Verified Badge */}
              <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/40 flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                <ShieldCheck size={14} />
                <span>Sanctioned Layout • MahaRERA PR1260002501530</span>
              </div>
            </div>

            {/* Content & CTAs */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-[var(--color-luxury-gold)] uppercase tracking-widest font-bold block mb-2">
                  Sanctioned Masterplan
                </span>
                <h3 className="font-google-sans text-2xl font-bold text-white mb-4">
                  Township Layout & Tower Stacking
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                  Experience a vehicular-free podium level where children and seniors can wander freely amidst botanical gardens, cycling tracks, and open-air amphitheaters.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2.5 text-xs text-gray-300">
                    <CheckCircle2 size={15} className="text-[var(--color-luxury-gold)] shrink-0" />
                    <span>3-Level Dedicated Basement Car Parking</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-300">
                    <CheckCircle2 size={15} className="text-[var(--color-luxury-gold)] shrink-0" />
                    <span>Grand Triple-Height Entrance Lobby in Every Tower</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-300">
                    <CheckCircle2 size={15} className="text-[var(--color-luxury-gold)] shrink-0" />
                    <span>Dedicated EV Charging Stations at Every Tower</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-300">
                    <CheckCircle2 size={15} className="text-[var(--color-luxury-gold)] shrink-0" />
                    <span>High-Speed Mitsubishi / Otis Smart Elevators</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3.5 px-6 rounded-full bg-[var(--color-luxury-gold)] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all text-center shadow-lg cursor-pointer"
                >
                  Request Masterplan PDF
                </button>
                <Link
                  href="/project/masterplan"
                  className="w-full py-3 px-5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wider border border-white/15 transition-all text-center"
                >
                  Full 3D Masterplan Dossier →
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
