'use client';

import React, { useState } from 'react';
import Image from '@/components/compat/NextImage';
import Link from '@/components/compat/NextLink';
import { Sparkles, Maximize2, ShieldCheck, Download, ChevronRight, CheckCircle2 } from 'lucide-react';
import ContactModal from '@/components/ui/ContactModal';

const CONFIGURATIONS = [
  {
    id: '2bhk-elite',
    name: '2 BHK Elite',
    carpet: '780 sq.ft',
    deck: '55 sq.ft Sun Deck',
    price: '₹93 Lakhs*',
    image: '/assets/floorplan-2bhk-elite.webp',
    description: 'Intelligently planned dual-deck urban luxury residence with zero space wastage and private foyer entrance.',
    highlights: ['East-West Vastu Compliant', 'Private Sundeck in Living Room', 'L-Shaped Modular Kitchen Space', 'Panoramic Hill Views']
  },
  {
    id: '2bhk-regalia',
    name: '2 BHK Regalia',
    carpet: '845 sq.ft',
    deck: '70 sq.ft Grand Deck',
    price: '₹1.10 Cr*',
    image: '/assets/floorplan-2bhk-regalia.webp',
    description: 'Expansive grand deck residence featuring imported marble finishes and dedicated work-from-home corner.',
    highlights: ['Grand 70 sq.ft Outdoor Deck', 'Walk-in Wardrobe Niche', 'Italian Marble in Living/Dining', 'Corner Unit with 3-Side Ventilation']
  },
  {
    id: '3bhk-signature',
    name: '3 BHK Signature',
    carpet: '1,150 sq.ft',
    deck: '95 sq.ft Double Deck',
    price: '₹1.62 Cr*',
    image: '/assets/floorplan-3bhk-signature.webp',
    description: 'The crowning 3 BHK residence with expansive double private decks overlooking the central amenity boulevard.',
    highlights: ['Double Private Deck Balconies', 'Master Bedroom with Wooden Flooring', 'Servant Entry & Utility Balcony', 'Smart Home Automation Package']
  },
  {
    id: '4bhk-duplex',
    name: '4 BHK Duplex Sky Villa',
    carpet: '1,850 sq.ft',
    deck: '140 sq.ft Twin Terraces',
    price: '₹1.88 Cr*',
    image: '/assets/floorplan-4bhk-duplex.webp',
    description: 'Double-height luxury duplex living combining the privacy of an independent bungalow with high-rise security.',
    highlights: ['20-Foot Double Height Living Area', 'Twin Open-to-Sky Terraces', 'Dedicated Butler & Staff Quarters', 'Internal Architectural Staircase']
  },
  {
    id: '4bhk-royal',
    name: '4 BHK Royal Penthouse',
    carpet: '2,450 sq.ft',
    deck: '220 sq.ft Plunge Pool Deck',
    price: '₹2.74 Cr*',
    image: '/assets/floorplan-4bhk-royal.webp',
    description: 'The pinnacle of West Pune luxury living with 360-degree panoramic sky views, private elevator lobby, and rooftop deck.',
    highlights: ['Private Elevator Access', 'Provisions for Sky Plunge Pool', 'Master Suite with Jacuzzi Provision', '360° Mahalunge Baner Hill Views']
  }
];

export default function FloorPlansPreview() {
  const [activeTab, setActiveTab] = useState(CONFIGURATIONS[1].id); // default to 2 BHK Regalia
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activePlan = CONFIGURATIONS.find((c) => c.id === activeTab) || CONFIGURATIONS[1];

  return (
    <section id="floor-plans" className="w-full bg-[#070b12] py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[var(--color-luxury-gold)]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-luxury-gold)]/10 border border-[var(--color-luxury-gold)]/30 text-[var(--color-luxury-gold)] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            <span>Masterpiece Architectural Blueprints</span>
          </div>
          <h2 className="font-google-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Curated Deck Residences & Floor Plans
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
            Engineered with zero passage wastage, cross-ventilation, and expansive private sundecks overlooking the Baner hills.
          </p>
        </div>

        {/* Configuration Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CONFIGURATIONS.map((config) => (
            <button
              key={config.id}
              onClick={() => setActiveTab(config.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeTab === config.id
                  ? 'bg-[var(--color-luxury-gold)] text-black shadow-[0_4px_20px_rgba(212,175,55,0.35)] scale-105'
                  : 'bg-[#111827] text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {config.name}
            </button>
          ))}
        </div>

        {/* Active Plan Showcase Card */}
        <div className="bg-[#0e1422] rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Blueprint Visual Display */}
            <div className="lg:col-span-7 bg-[#080d16] rounded-2xl border border-white/5 p-4 sm:p-6 relative group overflow-hidden flex items-center justify-center min-h-[320px] sm:min-h-[420px]">
              <div className="relative w-full h-[300px] sm:h-[400px]">
                <Image
                  src={activePlan.image}
                  alt={`${activePlan.name} floor plan layout at K Raheja Vistas Mahalunge`}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              {/* RERA Verified Stamp */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
                <ShieldCheck size={13} />
                <span>MahaRERA PR1260002501530</span>
              </div>

              {/* Zoom Trigger */}
              <Link
                href="/project/floorplans"
                className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all"
                title="View Full Resolution Floor Plan"
              >
                <Maximize2 size={16} />
              </Link>
            </div>

            {/* Right: Plan Specs & Pricing */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                  <div>
                    <h3 className="font-google-sans text-2xl sm:text-3xl font-bold text-white">
                      {activePlan.name}
                    </h3>
                    <p className="text-xs text-[var(--color-luxury-gold)] tracking-widest uppercase font-semibold mt-1">
                      {activePlan.deck}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block uppercase tracking-wider">Starting from</span>
                    <span className="text-2xl font-bold text-white font-google-sans">
                      {activePlan.price}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  {activePlan.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-[#141c2e] p-3.5 rounded-xl border border-white/5">
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Carpet Area</span>
                    <span className="text-base font-bold text-white mt-0.5 block">{activePlan.carpet}</span>
                  </div>
                  <div className="bg-[#141c2e] p-3.5 rounded-xl border border-white/5">
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Balcony Deck</span>
                    <span className="text-base font-bold text-white mt-0.5 block">{activePlan.deck}</span>
                  </div>
                </div>

                {/* Architectural Highlights */}
                <div className="space-y-2.5 mb-8">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Key Highlights</span>
                  {activePlan.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
                      <CheckCircle2 size={15} className="text-[var(--color-luxury-gold)] shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[var(--color-luxury-gold)] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all text-center shadow-lg cursor-pointer"
                >
                  Request Cost Sheet
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wider border border-white/15 transition-all cursor-pointer"
                >
                  <Download size={15} />
                  <span>Download PDF</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* View All Floor Plans Link */}
        <div className="text-center mt-10">
          <Link
            href="/project/floorplans"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[var(--color-luxury-gold)] transition-colors font-semibold uppercase tracking-wider"
          >
            <span>Explore All 7 Configurations & Jodi Flat Blueprints</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
