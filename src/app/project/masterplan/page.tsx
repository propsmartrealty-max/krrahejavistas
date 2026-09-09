'use client';
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masterplan3D from '@/components/ui/Masterplan3D';
import Image from 'next/image';
import { Maximize2, X, Compass, ShieldCheck, TreePine, Home, Award } from 'lucide-react';
import ContactModal from '@/components/ui/ContactModal';

const masterPlanHighlights = [
  {
    icon: Compass,
    title: "7.5-Acre Integrated Land Parcel",
    desc: "Meticulously master-planned by world-renowned architects to optimize cross-ventilation and natural daylight."
  },
  {
    icon: TreePine,
    title: "75% Open Greens & Landscaped Buffer",
    desc: "Sprawling podium greens, reflexology tracks, aromatic herb gardens, and vehicular-free pedestrian zones."
  },
  {
    icon: Home,
    title: "Twin Grand Clubhouses (28,000 sq.ft)",
    desc: "Exclusive dual lifestyle clubhouses featuring temperature-controlled infinity pool, wellness spa, and banquet halls."
  },
  {
    icon: ShieldCheck,
    title: "5-Tier Integrated Security",
    desc: "RFID vehicular boom barriers, 24x7 CCTV perimeter surveillance, and biometric access to tower lobbies."
  }
];

const masterPlanSchema = {
  "@context": "https://schema.org",
  "@type": "Place",
  "name": "K Raheja Vistas Mahalunge Master Layout Plan",
  "description": "7.5-acre master plan layout and tower floor cluster plan for K Raheja Vistas Mahalunge, Baner Annexe, Pune.",
  "url": "https://www.krahejacorpvistas.com/project/masterplan",
  "image": "https://www.krahejacorpvistas.com/assets/masterplan-layout.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Baner Annexe, Mahalunge",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "411045",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "18.563551",
    "longitude": "73.7339978"
  }
};

export default function MasterPlanPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Master Plan", href: "/project/masterplan" }
  ];

  const [activeModalImage, setActiveModalImage] = useState<{ src: string; title: string; desc: string } | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="bg-[var(--color-luxury-pearl)] min-h-screen">
      <script 
        id="masterplan-schema" 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(masterPlanSchema) }} 
      />

      {/* Header */}
      <section className="pt-36 pb-16 px-4 md:px-6 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[var(--color-luxury-gold)] tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-4 block"
        >
          Architectural Blueprint
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-[var(--color-luxury-charcoal)] mb-6"
        >
          The Master Layout &amp; Tower Clusters
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto text-base md:text-lg text-[var(--color-luxury-charcoal)]/80 leading-relaxed"
        >
          Sprawling across a premium 7.5-acre land parcel, K Raheja Vistas features high-rise residential towers meticulously arranged to offer 75% open space, biophilic podium parks, and unobstructed views of the Baner hills.
        </motion.p>
      </section>

      {/* 3D Interactive Model */}
      <section className="py-6 px-4 md:px-6 mb-16">
        <div className="container mx-auto max-w-6xl relative">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6">
            <Masterplan3D />
          </div>
        </div>
      </section>

      {/* 2D Authentic Architectural Drawings Section */}
      <section className="py-16 px-4 md:px-6 bg-white border-y border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-[var(--color-luxury-gold)] tracking-[0.25em] uppercase text-xs md:text-sm font-semibold mb-2 block">
              Official Blueprints
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[var(--color-luxury-charcoal)]">
              MahaRERA Registered Master &amp; Floor Plans
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3 text-sm md:text-base">
              Click on either architectural schematic below to inspect high-resolution dimensions, tower orientations, and vehicular circulation plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* 1. 2D Master Layout Plan */}
            <div className="bg-neutral-50 rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div 
                onClick={() => setActiveModalImage({
                  src: '/assets/masterplan-layout.webp',
                  title: '7.5-Acre Master Layout Plan',
                  desc: 'Comprehensive master site plan displaying tower positioning, podium amenities, central green lawn, vehicular loop, and security checkpoints.'
                })}
                className="relative h-80 bg-neutral-900/5 cursor-zoom-in group overflow-hidden border-b border-gray-200"
              >
                <Image 
                  src="/assets/masterplan-layout.webp"
                  alt="Official 7.5-Acre Master Layout Plan for K Raheja Vistas Mahalunge"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-90 group-hover:bg-[var(--color-luxury-gold)] group-hover:text-black transition-colors">
                  <Maximize2 className="w-4 h-4" />
                  <span>Enlarge Master Layout</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/95 text-[var(--color-luxury-charcoal)] text-xs font-semibold px-3 py-1 rounded shadow">
                  7.5 Acres &bull; 75% Open Space
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif text-[var(--color-luxury-charcoal)] font-semibold mb-2">
                    7.5-Acre Master Site Layout
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Meticulously planned by K Raheja Corp. Highlights include low ground coverage, dedicated entry/exit avenues, riverside recreational promenade, and pedestrian green spines.
                  </p>
                </div>
                <button
                  onClick={() => setActiveModalImage({
                    src: '/assets/masterplan-layout.webp',
                    title: '7.5-Acre Master Layout Plan',
                    desc: 'Comprehensive master site plan displaying tower positioning, podium amenities, central green lawn, vehicular loop, and security checkpoints.'
                  })}
                  className="w-full py-3 bg-[var(--color-luxury-charcoal)] text-white hover:bg-[var(--color-luxury-gold)] hover:text-black transition-colors text-xs font-bold uppercase tracking-wider rounded-lg text-center"
                >
                  View Detailed Master Plan
                </button>
              </div>
            </div>

            {/* 2. Typical Tower Floor Plan Cluster */}
            <div className="bg-neutral-50 rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div 
                onClick={() => setActiveModalImage({
                  src: '/assets/tower-floor-layout.jpg',
                  title: 'Typical Tower Floor Cluster (G+2P+25 Floors)',
                  desc: 'High-speed elevator lobby, fire exit staircases, refuse chutes, and privacy-separated apartment entryways on typical residential floors.'
                })}
                className="relative h-80 bg-neutral-900/5 cursor-zoom-in group overflow-hidden border-b border-gray-200"
              >
                <Image 
                  src="/assets/tower-floor-layout.jpg"
                  alt="Typical Tower Floor Cluster Layout Plan K Raheja Vistas Mahalunge"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-90 group-hover:bg-[var(--color-luxury-gold)] group-hover:text-black transition-colors">
                  <Maximize2 className="w-4 h-4" />
                  <span>Enlarge Cluster Layout</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/95 text-[var(--color-luxury-charcoal)] text-xs font-semibold px-3 py-1 rounded shadow">
                  G+2P+25 Floors &bull; 4 Units / Core
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif text-[var(--color-luxury-charcoal)] font-semibold mb-2">
                    Typical Tower Floor Cluster
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Designed for utmost privacy with no shared common living room walls, separate passenger &amp; stretcher service lifts, and well-ventilated natural light lobbies.
                  </p>
                </div>
                <button
                  onClick={() => setActiveModalImage({
                    src: '/assets/tower-floor-layout.jpg',
                    title: 'Typical Tower Floor Cluster (G+2P+25 Floors)',
                    desc: 'High-speed elevator lobby, fire exit staircases, refuse chutes, and privacy-separated apartment entryways on typical residential floors.'
                  })}
                  className="w-full py-3 bg-[var(--color-luxury-charcoal)] text-white hover:bg-[var(--color-luxury-gold)] hover:text-black transition-colors text-xs font-bold uppercase tracking-wider rounded-lg text-center"
                >
                  View Tower Cluster Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Features Grid */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-[var(--color-luxury-gold)] tracking-[0.25em] uppercase text-xs md:text-sm font-semibold mb-2 block">
              Design Philosophy
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[var(--color-luxury-charcoal)]">
              Engineered for Generational Living
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {masterPlanHighlights.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-luxury-gold)]/10 flex items-center justify-center text-[var(--color-luxury-gold)] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-serif text-[var(--color-luxury-charcoal)] font-semibold mb-3">
                    {feat.title}
                  </h4>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Brochure & Consultation CTA */}
          <div className="mt-16 bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111] rounded-3xl p-8 md:p-12 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 shadow-2xl">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-[var(--color-luxury-gold)] mb-3 text-xs tracking-widest uppercase font-semibold">
                <Award className="w-4 h-4" />
                Official Developer Direct
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">
                Download Complete Architectural Dossier
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Receive the complete high-resolution AutoCAD &amp; PDF site drawings, including floor-wise unit allocations, sunlight angles, and podium amenity legends.
              </p>
            </div>
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-8 py-4 bg-[var(--color-luxury-gold)] text-black font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-white transition-colors shadow-lg whitespace-nowrap cursor-pointer"
            >
              Request Master Dossier
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Blueprints */}
      <AnimatePresence>
        {activeModalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8"
            onClick={() => setActiveModalImage(null)}
          >
            <div 
              className="relative max-w-5xl w-full bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60">
                <div>
                  <h3 className="text-lg md:text-xl font-serif text-white font-semibold">
                    {activeModalImage.title}
                  </h3>
                  <p className="text-xs text-[var(--color-luxury-gold)] font-medium">
                    K Raheja Vistas Mahalunge &bull; MahaRERA: PR1260002501530
                  </p>
                </div>
                <button 
                  onClick={() => setActiveModalImage(null)}
                  className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative flex-1 min-h-[50vh] max-h-[70vh] w-full bg-neutral-950 p-4 flex items-center justify-center overflow-auto">
                <div className="relative w-full h-full min-h-[420px]">
                  <Image 
                    src={activeModalImage.src}
                    alt={activeModalImage.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="p-4 md:p-6 border-t border-white/10 bg-black/80 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-white/70 max-w-xl text-center md:text-left">
                  {activeModalImage.desc}
                </p>
                <button
                  onClick={() => {
                    setActiveModalImage(null);
                    setContactModalOpen(true);
                  }}
                  className="w-full md:w-auto px-6 py-2.5 bg-[var(--color-luxury-gold)] text-black font-semibold text-xs tracking-wider uppercase rounded-lg hover:bg-white transition-colors"
                >
                  Download PDF Master Plan
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  );
}
