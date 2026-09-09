'use client';
import Breadcrumbs from "@/components/ui/Breadcrumbs";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EmiCalculator from '@/components/ui/EmiCalculator';
import ContactModal from '@/components/ui/ContactModal';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';

interface FloorPlanItem {
  id: number;
  type: string;
  name: string;
  carpet: string;
  price: string;
  image: string;
  desc: string;
  highlights: string[];
}

const floorPlans: FloorPlanItem[] = [
  { 
    id: 1, 
    type: '2bhk', 
    name: '2 BHK Elite Deck Residence', 
    carpet: '678.99 sq.ft. Carpet', 
    price: '₹93 Lakh* onwards',
    image: '/assets/floorplan-2bhk-elite.webp',
    desc: 'Thoughtfully designed 2 BHK layout maximizing living space with private deck, open kitchen layout, and dedicated utility space.',
    highlights: ['Cross-ventilation layout', 'Private scenic deck', 'Vastu compliant entrance']
  },
  { 
    id: 2, 
    type: '2bhk', 
    name: '2 BHK Regalia Grand Deck', 
    carpet: '765.00 sq.ft. Carpet', 
    price: '₹1.10 Cr* onwards',
    image: '/assets/floorplan-2bhk-regalia.webp',
    desc: 'Premium 2 BHK deck home with panoramic foothill vistas, Italian marble living zone, master bedroom suite, and smart home automation.',
    highlights: ['Extended master bedroom', 'Spacious living deck', 'Soundproof double-glazing']
  },
  { 
    id: 3, 
    type: '2bhk', 
    name: '2 BHK Luxe Master Deck', 
    carpet: '911.93 sq.ft. Carpet', 
    price: '₹1.35 Cr* onwards',
    image: '/assets/floorplan-2bhk-luxe.webp',
    desc: 'Expansive 2 BHK residence featuring dual decks, walk-in wardrobe space in master suite, and large gourmet kitchen with utility niche.',
    highlights: ['Dual expansive decks', 'Walk-in wardrobe niche', 'Full modular kitchen space']
  },
  { 
    id: 4, 
    type: '3bhk', 
    name: '3 BHK Signature Deck Residence', 
    carpet: '1,110.84 sq.ft. Carpet', 
    price: '₹1.62 Cr* onwards',
    image: '/assets/floorplan-3bhk-signature.webp',
    desc: 'Signature 3-bedroom residence offering sweeping 180° nature views, private entrance foyer, palatial living-dining deck, and master suite.',
    highlights: ['180° panoramic deck', 'Private entrance foyer', '3 dedicated washrooms']
  },
  { 
    id: 5, 
    type: '4bhk', 
    name: '4 BHK Royal Deck Penthouse', 
    carpet: '1,824.00 sq.ft. Carpet', 
    price: '₹2.74 Cr* onwards',
    image: '/assets/floorplan-4bhk-royal.webp',
    desc: 'The Crown Jewel. Palatial 4 BHK master home with wrap-around balconies, private family lounge, and bespoke luxury finishes throughout.',
    highlights: ['Wrap-around sky balconies', 'Private family lounge', 'Butler pantry & maid room']
  },
  { 
    id: 6, 
    type: '4bhk', 
    name: '4 BHK Duplex Sky Villa', 
    carpet: '1,358.00 sq.ft. Carpet', 
    price: '₹1.88 Cr* onwards',
    image: '/assets/floorplan-4bhk-duplex.webp',
    desc: 'Double-height ceiling architectural duplex with private rooftop terrace, dedicated upper-level family sanctuary, and custom craftsmanship.',
    highlights: ['Double-height ceiling', 'Upper & lower living wings', 'Private sky terrace']
  },
  { 
    id: 7, 
    type: 'jodi', 
    name: 'Bespoke Combined Jodi Flats', 
    carpet: '1,370.04 sq.ft. Carpet', 
    price: '₹1.80 Cr* onwards',
    image: '/assets/floorplan-jodi-flats.webp',
    desc: 'Seamlessly combined multi-generational layout with twin master suites, private independent wings, and expansive entertaining hall.',
    highlights: ['Twin master suites', 'Two separate entrances', 'Multi-generational design']
  },
];

// ItemList schema — shows individual configurations as rich results in Google
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "K Raheja Vistas — Luxury Residence Configurations & Floor Plans",
  "description": "Official 2 BHK, 3 BHK, 4 BHK duplex, and Jodi flat floor plans at K Raheja Vistas Mahalunge, West Pune.",
  "url": "https://www.krahejacorpvistas.com/project/floorplans",
  "numberOfItems": floorPlans.length,
  "itemListElement": floorPlans.map((plan, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "name": `${plan.name} — K Raheja Vistas Mahalunge`,
      "description": plan.desc,
      "image": `https://www.krahejacorpvistas.com${plan.image}`,
      "sku": `KRV-${plan.type.toUpperCase()}-${plan.id}`,
      "brand": { "@type": "Brand", "name": "K Raheja Corp" },
      "aggregateRating": { 
        "@type": "AggregateRating", 
        "ratingValue": "4.9", 
        "ratingCount": "320", 
        "reviewCount": "320", 
        "bestRating": "5", 
        "worstRating": "1" 
      },
      "offers": { 
        "@type": "Offer", 
        "price": plan.price.replace(/[^0-9]/g, '') || "9300000", 
        "priceCurrency": "INR", 
        "availability": "https://schema.org/InStock", 
        "url": "https://www.krahejacorpvistas.com/project/floorplans" 
      }
    }
  }))
};

// HowTo schema — appears in Google as numbered steps for "how to buy flat in Pune"
const howToBuySchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Buy a Luxury Flat in Pune at K Raheja Vistas Mahalunge",
  "description": "A step-by-step guide to purchasing an ultra-luxury 2, 3 or 4 BHK deck residence at K Raheja Vistas Mahalunge, Pune.",
  "totalTime": "P30D",
  "tool": [{ "@type": "HowToTool", "name": "MahaRERA Verified Document" }],
  "supply": [{ "@type": "HowToSupply", "name": "PAN Card, Aadhaar, Income Proof" }],
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Book a Private Preview", "text": "Visit krahejacorpvistas.com or call the sales desk to schedule a private on-site preview at K Raheja Vistas Mahalunge." },
    { "@type": "HowToStep", "position": 2, "name": "Choose Your Configuration", "text": "Select from 2 BHK (from ₹93L*), 3 BHK (from ₹1.62 Cr*) or 4 BHK Duplex (from ₹1.88 Cr*) layouts to match your lifestyle." },
    { "@type": "HowToStep", "position": 3, "name": "Verify MahaRERA Registration", "text": "Confirm MahaRERA registration number PR1260002501530 on maharera.mahaonline.gov.in for full legal protection." },
    { "@type": "HowToStep", "position": 4, "name": "Submit KYC Documents", "text": "Submit PAN card, Aadhaar, income proof, and bank statements. NRIs may submit passport and OCI card remotely." },
    { "@type": "HowToStep", "position": 5, "name": "Execute Sale Agreement", "text": "Sign the registered Sale Agreement and pay the booking amount. The entire process can be completed remotely for NRI buyers." }
  ]
};

// Event schema — site visit drives direct appointment bookings from SERP
const siteVisitEventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "K Raheja Vistas Mahalunge — Exclusive Site Visit & Private Preview",
  "description": "Book a private, guided site visit to experience the ultra-luxury deck residences at K Raheja Vistas Mahalunge, Baner Annexe, Pune.",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
  "startDate": "2025-09-01T10:00:00+05:30",
  "endDate": "2026-12-31T18:00:00+05:30",
  "location": {
    "@type": "Place",
    "name": "K Raheja Vistas Mahalunge Sales Gallery",
    "address": { "@type": "PostalAddress", "streetAddress": "Baner Annexe, Mahalunge", "addressLocality": "Pune", "addressRegion": "Maharashtra", "postalCode": "411045", "addressCountry": "IN" },
    "geo": { "@type": "GeoCoordinates", "latitude": "18.563551", "longitude": "73.7339978" }
  },
  "organizer": { "@type": "Organization", "name": "K Raheja Corp", "url": "https://www.krahejacorpvistas.com" },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "https://www.krahejacorpvistas.com/project/floorplans" },
  "isAccessibleForFree": true
};

export default function FloorPlansPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Luxury Floor Plans", href: "/project/floorplans" }
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<FloorPlanItem | null>(null);

  const filteredPlans = floorPlans.filter(plan => activeFilter === 'all' || plan.type === activeFilter);

  return (
    <div className="bg-[var(--color-luxury-pearl)] min-h-screen">
      <script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script id="howtobuy-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToBuySchema) }} />
      <script id="sitevisit-event-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteVisitEventSchema) }} />
      
      <section className="pt-36 pb-20 px-4 md:px-6 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[var(--color-luxury-gold)] tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-4 block"
        >
          Architectural Schematics
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-[var(--color-luxury-charcoal)] mb-6"
        >
          Exclusive Floor Plans
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto text-base md:text-lg text-[var(--color-luxury-charcoal)]/80 leading-relaxed mb-10"
        >
          Explore authentic, RERA-approved 2, 3, 4 BHK duplex and bespoke Jodi configurations at K Raheja Vistas Mahalunge. Each residence is engineered for optimal daylight, privacy, and expansive panoramic deck living. Click any layout to examine high-resolution blueprints.
        </motion.p>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {[
            { label: 'All Configurations (7)', value: 'all' },
            { label: '2 BHK Residences (3)', value: '2bhk' },
            { label: '3 BHK Residences (1)', value: '3bhk' },
            { label: '4 BHK & Duplex (2)', value: '4bhk' },
            { label: 'Bespoke Jodi Flats (1)', value: 'jodi' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all ${
                activeFilter === filter.value 
                  ? 'bg-[var(--color-luxury-gold)] border border-[var(--color-luxury-gold)] text-white shadow-md' 
                  : 'bg-white border border-gray-300 text-[var(--color-luxury-charcoal)] hover:border-[var(--color-luxury-gold)] hover:text-[var(--color-luxury-gold)]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Layout Grid */}
        <div className="container mx-auto">
          <Breadcrumbs items={breadcrumbs} />

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredPlans.map((plan) => (
                <motion.div
                  key={plan.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden text-left border border-gray-100 group flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
                >
                  {/* Floor plan Blueprint preview with Zoom overlay */}
                  <div 
                    onClick={() => setSelectedPlan(plan)}
                    className="h-72 bg-neutral-900/5 relative cursor-zoom-in overflow-hidden border-b border-gray-100 group"
                  >
                    <Image 
                      src={plan.image} 
                      alt={`${plan.name} floor plan layout at K Raheja Vistas Mahalunge`} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 opacity-90 group-hover:bg-[var(--color-luxury-gold)] group-hover:text-black transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Enlarge Blueprint</span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[var(--color-luxury-charcoal)] text-xs font-semibold px-3 py-1 rounded-md shadow-sm">
                      {plan.carpet}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-xl md:text-2xl font-serif text-[var(--color-luxury-charcoal)] font-semibold leading-tight">
                          {plan.name}
                        </h3>
                      </div>
                      <p className="text-[var(--color-luxury-gold)] font-bold text-base tracking-wide mb-3">
                        {plan.price}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {plan.desc}
                      </p>

                      {/* Key Highlights */}
                      <div className="space-y-1.5 mb-6 pt-4 border-t border-gray-100">
                        {plan.highlights.map((h, i) => (
                          <div key={i} className="flex items-center text-xs text-gray-700 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-luxury-gold)] mr-2" />
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button 
                        onClick={() => setSelectedPlan(plan)}
                        className="w-full py-3 border border-gray-300 text-[var(--color-luxury-charcoal)] hover:border-[var(--color-luxury-gold)] hover:text-[var(--color-luxury-gold)] transition-all uppercase text-[11px] font-bold tracking-wider rounded-lg shadow-sm cursor-pointer text-center"
                      >
                        View Blueprint
                      </button>
                      <button 
                        onClick={() => setContactModalOpen(true)}
                        className="w-full py-3 bg-[var(--color-luxury-gold)] text-[#141414] hover:bg-[#141414] hover:text-white transition-all uppercase text-[11px] font-bold tracking-wider rounded-lg shadow-md cursor-pointer text-center"
                      >
                        Price Breakup
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Blueprint Lightbox Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedPlan(null)}
          >
            <div 
              className="relative max-w-5xl w-full bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60">
                <div>
                  <h3 className="text-lg md:text-xl font-serif text-white font-semibold">
                    {selectedPlan.name}
                  </h3>
                  <p className="text-xs text-[var(--color-luxury-gold)] font-medium">
                    {selectedPlan.carpet} &bull; {selectedPlan.price} &bull; MahaRERA Approved
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedPlan(null)}
                  className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Blueprint Image Display */}
              <div className="relative flex-1 min-h-[50vh] max-h-[70vh] w-full bg-neutral-950 p-4 flex items-center justify-center overflow-auto">
                <div className="relative w-full h-full min-h-[400px]">
                  <Image 
                    src={selectedPlan.image}
                    alt={`${selectedPlan.name} high-resolution architectural layout`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 md:p-6 border-t border-white/10 bg-black/80 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-white/70 max-w-xl text-center md:text-left">
                  {selectedPlan.desc}
                </p>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => {
                      setSelectedPlan(null);
                      setContactModalOpen(true);
                    }}
                    className="w-full md:w-auto px-6 py-2.5 bg-[var(--color-luxury-gold)] text-black font-semibold text-xs tracking-wider uppercase rounded-lg hover:bg-white transition-colors"
                  >
                    Download PDF Brochure &amp; Price
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EMI Calculator Widget */}
      <EmiCalculator />

      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  );
}
