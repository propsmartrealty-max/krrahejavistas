import Image from 'next/image';

interface DynamicGalleryProps {
  slug: string;
  title: string;
}

export default function DynamicGallery({ slug, title }: DynamicGalleryProps) {
  // Determine authentic high-resolution images based on page URL intent
  let images = [];
  const lowerSlug = slug.toLowerCase();

  if (lowerSlug.includes('bhk') || lowerSlug.includes('duplex') || lowerSlug.includes('simplex') || lowerSlug.includes('penthouse') || lowerSlug.includes('apartment') || lowerSlug.includes('configuration')) {
    images = [
      { src: '/assets/floorplan-3bhk-signature.webp', alt: `Authentic Architectural Floor Plan layout for ${title}` },
      { src: '/assets/gallery-living-room.webp', alt: `Ultra-Premium Living & Dining Area for ${title}` }
    ];
  } else if (lowerSlug.includes('clubhouse') || lowerSlug.includes('lifestyle') || lowerSlug.includes('amenities') || lowerSlug.includes('pool')) {
    images = [
      { src: '/assets/gallery-clubhouse.webp', alt: `28,000 sq.ft Twin Grand Clubhouses for ${title}` },
      { src: '/assets/gallery-swimming-pool.webp', alt: `Temperature-Controlled Infinity Pool for ${title}` }
    ];
  } else if (lowerSlug.includes('location') || lowerSlug.includes('hinjewadi') || lowerSlug.includes('baner') || lowerSlug.includes('mahalunge')) {
    images = [
      { src: '/assets/masterplan-layout.webp', alt: `Strategic 7.5-Acre Master Site Layout for ${title}` },
      { src: '/assets/hero-aerial-panoramic.webp', alt: `Panoramic Landscape & Foothill Surroundings for ${title}` }
    ];
  } else {
    // Fallback default authentic gallery
    images = [
      { src: '/assets/hero-aerial-panoramic.webp', alt: `7.5-Acre Masterpiece Estate for ${title}` },
      { src: '/assets/gallery-deck-balcony.webp', alt: `Private Panoramic Deck Residence for ${title}` }
    ];
  }

  return (
    <div className="my-16">
      <h3 className="text-2xl md:text-3xl font-serif text-[var(--color-luxury-pearl)] mb-8 text-center">
        Authentic Project Gallery &amp; Layouts
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {images.map((img, idx) => (
          <div key={idx} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden group border border-white/10 shadow-2xl bg-neutral-900">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Elegant hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
              <p className="text-[var(--color-luxury-gold)] text-xs tracking-widest uppercase font-bold drop-shadow-md mb-1">
                K Raheja Vistas Mahalunge
              </p>
              <p className="text-white text-base md:text-lg font-serif drop-shadow-md leading-tight">
                {img.alt.split(' for')[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
