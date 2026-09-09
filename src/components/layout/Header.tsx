'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ContactModal from '@/components/ui/ContactModal';

const navItems = [
  { label: 'Location', path: '/project/location', title: 'Location of Luxury Apartments in Pune' },
  { label: 'Neighborhood', path: '/neighborhood', title: 'Mahalunge Neighborhood & Connectivity' },
  { label: 'Master Plan', path: '/project/masterplan', title: 'K Raheja Vistas Master Plan' },
  { label: 'Floor Plans', path: '/project/floorplans', title: '2, 3 & 4 BHK Luxury Floor Plans in Pune' },
  { label: 'Amenities', path: '/project/amenities', title: 'World-Class Amenities at K Raheja Vistas' },
  { label: 'Gallery', path: '/project/gallery', title: 'Project Gallery & Show Flat' },
  { label: 'Updates', path: '/updates', title: 'Latest Construction Updates & News' }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none transition-all duration-300">
      {/* Floating Pill Container */}
      <div 
        className={`max-w-7xl mx-auto pointer-events-auto rounded-full transition-all duration-300 flex items-center justify-between border shadow-2xl ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-2xl border-white/15 px-4 sm:px-6 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.7)]' 
            : 'bg-black/75 backdrop-blur-xl border-white/10 px-4 sm:px-6 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Single Liner Brand Logo & Text */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
          <Image 
            src="/assets/logo.png" 
            alt="K Raheja Corp Logo" 
            width={34} 
            height={34} 
            className="h-8 w-8 sm:h-9 sm:w-9 object-contain drop-shadow-md group-hover:scale-105 transition-transform" 
            priority 
          />
          <div className="flex items-center gap-2">
            <span className="font-serif tracking-[0.14em] text-white text-sm sm:text-base font-bold uppercase whitespace-nowrap group-hover:text-[var(--color-luxury-gold)] transition-colors">
              K Raheja Vistas
            </span>
            <span className="hidden sm:inline-flex items-center text-[9px] tracking-[0.22em] text-[var(--color-luxury-gold)] uppercase font-semibold px-2 py-0.5 rounded-full bg-[var(--color-luxury-gold)]/10 border border-[var(--color-luxury-gold)]/30 whitespace-nowrap">
              Mahalunge
            </span>
          </div>
        </Link>
        
        {/* Desktop Nav - Pill Tabs */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.path}
              title={item.title}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setContactModalOpen(true)}
            className="px-4 sm:px-5 py-2 rounded-full bg-[var(--color-luxury-gold)] text-black font-bold text-[11px] sm:text-xs uppercase tracking-wider hover:bg-white hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            Enquire Now
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mt-2 max-w-md mx-auto rounded-3xl bg-[#111]/95 backdrop-blur-2xl border border-white/15 p-6 shadow-2xl lg:hidden overflow-hidden"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  title={item.title}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-white/90 uppercase tracking-wider hover:bg-white/10 hover:text-[var(--color-luxury-gold)] transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setContactModalOpen(true);
                }}
                className="w-full mt-3 py-3.5 rounded-full bg-[var(--color-luxury-gold)] text-black text-center font-bold text-xs uppercase tracking-wider shadow-md hover:bg-white transition-colors"
              >
                Enquire Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
      </Suspense>
    </header>
  );
}
