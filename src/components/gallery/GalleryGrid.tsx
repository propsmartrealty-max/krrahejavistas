'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import Image from 'next/image';

const categories = ['All', 'Exteriors', 'Interiors', 'Amenities'];

interface GalleryItem {
  id: number;
  category: 'Exteriors' | 'Interiors' | 'Amenities';
  src: string;
  title: string;
  alt: string;
}

const galleryData: GalleryItem[] = [
  { 
    id: 1, 
    category: 'Exteriors', 
    src: '/assets/gallery-elevation.webp', 
    title: 'Iconic Tower Elevation',
    alt: 'Iconic 25-storey high-rise tower elevation at K Raheja Vistas Mahalunge' 
  },
  { 
    id: 2, 
    category: 'Amenities', 
    src: '/assets/gallery-clubhouse.webp', 
    title: 'Twin Grand Clubhouses (28,000 sq.ft)',
    alt: '28,000 sq.ft twin luxury clubhouses at K Raheja Vistas Mahalunge' 
  },
  { 
    id: 3, 
    category: 'Interiors', 
    src: '/assets/gallery-living-room.webp', 
    title: 'Expansive Living & Dining with Deck',
    alt: 'Ultra-luxury living room and dining area opening to panoramic balcony deck' 
  },
  { 
    id: 4, 
    category: 'Amenities', 
    src: '/assets/gallery-swimming-pool.webp', 
    title: 'Temperature-Controlled Infinity Pool',
    alt: 'Resort-style temperature controlled infinity swimming pool and sun deck' 
  },
  { 
    id: 5, 
    category: 'Interiors', 
    src: '/assets/gallery-master-bedroom.webp', 
    title: 'Lavish Master Bedroom Suite',
    alt: 'Master bedroom suite with wooden texture flooring and corner glass windows' 
  },
  { 
    id: 6, 
    category: 'Interiors', 
    src: '/assets/gallery-deck-balcony.webp', 
    title: 'Private Panoramic Sky Deck',
    alt: 'Expansive private balcony deck offering serene views of Baner hills' 
  },
  { 
    id: 7, 
    category: 'Exteriors', 
    src: '/assets/gallery-entrance-lobby.webp', 
    title: 'Grand Drop-Off & Arrival Lobby',
    alt: 'Double-height grand entrance lobby and covered drop-off porch' 
  },
  { 
    id: 8, 
    category: 'Amenities', 
    src: '/assets/gallery-gardens.webp', 
    title: 'Landscaped Podium Greens & Zen Park',
    alt: 'Lush 75% open landscaped gardens and quiet meditation gazebos' 
  },
  { 
    id: 9, 
    category: 'Amenities', 
    src: '/assets/gallery-promenade.webp', 
    title: 'Riverside Promenade & Jogging Track',
    alt: 'Paved scenic riverside promenade and morning fitness jogging track' 
  },
  { 
    id: 10, 
    category: 'Amenities', 
    src: '/assets/gallery-sports-court.webp', 
    title: 'Multi-Purpose Sports Court',
    alt: 'Championship tennis and multi-sport court facilities' 
  },
  { 
    id: 11, 
    category: 'Exteriors', 
    src: '/assets/hero-aerial-panoramic.webp', 
    title: '7.5-Acre Panoramic Aerial Masterpiece',
    alt: 'Aerial panoramic render of 7.5-acre K Raheja Vistas estate in Mahalunge Pune' 
  },
  { 
    id: 12, 
    category: 'Exteriors', 
    src: '/assets/masterplan-layout.webp', 
    title: 'Architectural Master Layout Plan',
    alt: '2D Architectural master site plan with tower placement and open green corridors' 
  },
];

export default function GalleryGrid() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredImages = filter === 'All' 
    ? galleryData 
    : galleryData.filter(img => img.category === filter);

  return (
    <>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-14">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
              filter === cat 
                ? 'bg-[var(--color-luxury-gold)] text-black shadow-lg' 
                : 'bg-white/80 border border-gray-300 text-[var(--color-luxury-charcoal)] hover:border-[var(--color-luxury-gold)] hover:text-[var(--color-luxury-gold)]'
            }`}
          >
            {cat} {cat === 'All' ? `(${galleryData.length})` : `(${galleryData.filter(i => i.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Editorial Responsive Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 md:px-6">
        <AnimatePresence>
          {filteredImages.map((img) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 border border-gray-200/50 shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Permanent elegant gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[var(--color-luxury-gold)] text-[11px] font-bold tracking-widest uppercase mb-1">
                  {img.category}
                </span>
                <h3 className="text-white font-serif text-lg font-medium leading-snug drop-shadow-md">
                  {img.title}
                </h3>
                <div className="mt-3 flex items-center gap-1.5 text-white/80 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-3.5 h-3.5 text-[var(--color-luxury-gold)]" />
                  <span>Click to view full resolution</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <div 
              className="relative max-w-6xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[65vh] md:h-[75vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="text-center mt-4 text-white">
                <span className="text-[var(--color-luxury-gold)] text-xs font-bold tracking-widest uppercase block mb-1">
                  {selectedImage.category} &bull; K Raheja Vistas Mahalunge
                </span>
                <h4 className="text-xl md:text-2xl font-serif font-medium">
                  {selectedImage.title}
                </h4>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
