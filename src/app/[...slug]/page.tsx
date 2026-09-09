import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MagneticButton from '@/components/ui/MagneticButton';
import AeoFaqBlock from '@/components/seo/AeoFaqBlock';
import InternalLinkingGrid from '@/components/seo/InternalLinkingGrid';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Script from 'next/script';
import seoDatabase from '@/data/seo-database.json';
import DynamicGallery from '@/components/ui/DynamicGallery';
import { synthesizeSeoContent } from '@/lib/seo/content-synthesizer';

type Props = {
  params: Promise<{ slug: string[] }>;
};

// Next.js requires json imports to be typed properly if used dynamically, but direct indexing is fine.
const db: Record<string, { title: string; description: string; h1: string; category: string; slug: string; content?: string | null }> = seoDatabase;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const slugKey = params.slug.join('/');
  const data = db[slugKey];
  
  if (!data) return {};

  const ogUrl = `https://www.krahejacorpvistas.com/api/og?title=${encodeURIComponent(data.h1)}&category=${encodeURIComponent(data.category)}`;

  return {
    title: data.title,
    description: data.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://www.krahejacorpvistas.com/${slugKey}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      images: [{
        url: ogUrl,
        width: 1200,
        height: 630,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [ogUrl],
    }
  };
}

export function generateStaticParams() {
  const allKeys = Object.keys(db);
  // Cap at 50 for instant, lightweight build-time generation. 
  // Remaining pages render dynamically with ISR edge caching.
  const buildTimeKeys = allKeys.slice(0, 50);
  
  return buildTimeKeys.map((slugKey) => ({
    slug: slugKey.split('/'),
  }));
}

export const revalidate = 86400; // 24 hours ISR edge cache
export const dynamicParams = true;

export default async function ProgrammaticLandingPage(props: Props) {
  const params = await props.params;
  const slugKey = params.slug.join('/');
  const data = db[slugKey];

  if (!data) {
    notFound();
    return null; // TypeScript narrowing
  }
  
  const isArticle = data.category === 'blog';
  const pillarMap: Record<string, string> = {
    'location': '/location/baner-annexe-pune',
    'configurations': '/configurations/luxury-apartments-mahalunge',
    'lifestyle': '/lifestyle/ultra-luxury-living-pune',
    'investment': '/investment/real-estate-investment-baner-annexe',
    'compare': '/compare/best-projects-in-mahalunge'
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: data.category.replace('_', ' '), href: pillarMap[data.category] || '/directory' },
    { label: data.h1, href: `/${slugKey}` }
  ];

  const synthesized = synthesizeSeoContent(slugKey, data.h1, data.category);

  return (
    <div className="bg-[var(--color-luxury-charcoal)] min-h-screen">
      
      {/* Dynamic Semantic Schemas for Google E-E-A-T & Rich Snippets */}
      <Script
        id="synthesized-realestate-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(synthesized.schemas.realEstateListing) }}
      />
      <Script
        id="synthesized-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(synthesized.schemas.faqPage) }}
      />
      <Script
        id="synthesized-breadcrumbs-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(synthesized.schemas.breadcrumbs) }}
      />
      {synthesized.schemas.product && (
        <Script
          id="synthesized-product-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(synthesized.schemas.product) }}
        />
      )}
      {synthesized.schemas.article && (
        <Script
          id="synthesized-article-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(synthesized.schemas.article) }}
        />
      )}

      {/* Cinematic Hero Header */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/assets/living_room.jpg"
            className="w-full h-full object-cover opacity-40 scale-105 animate-[kenburns_20s_ease-out_infinite_alternate]"
          >
            <source src="/assets/video.mp4" type="video/mp4" />
            <Image
              src="/assets/living_room.jpg"
              alt={`Luxury Living at K Raheja Vistas — ${data.h1}`}
              fill
              priority={true}
              className="object-cover"
              sizes="100vw"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[var(--color-luxury-charcoal)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center mt-20">
          <span className="text-[var(--color-luxury-gold)] tracking-[0.4em] uppercase text-xs md:text-sm font-semibold mb-6 block drop-shadow-2xl">
            {isArticle ? 'RESEARCH & INSIGHTS' : data.category.replace('_', ' ').toUpperCase()}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[var(--color-luxury-pearl)] mb-6 leading-[1.1] drop-shadow-2xl font-light max-w-5xl mx-auto">
            {data.h1}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 -mt-20">
        
        <Breadcrumbs items={breadcrumbItems} />

        <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-md p-8 md:p-14 rounded-2xl border border-white/10 shadow-2xl">
          
          {!isArticle ? (
            <div>
              {/* Enterprise-Grade Semantic Content Weaver */}
              {data.content ? (
                <div 
                  className="mb-12 prose prose-invert max-w-none prose-p:text-lg prose-p:text-white/80 prose-headings:font-serif prose-headings:font-light text-left"
                  dangerouslySetInnerHTML={{ __html: data.content }} 
                />
              ) : (
                <div 
                  className="mb-12 text-left"
                  dangerouslySetInnerHTML={{ __html: synthesized.overviewHtml }}
                />
              )}

              {/* === ARCHITECTURAL & RESIDENTIAL SPECIFICATIONS MATRIX === */}
              <div className="my-12 text-left">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                  <div>
                    <h3 className="text-2xl font-serif text-[var(--color-luxury-pearl)]">
                      Architectural & Technical Specifications
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-[var(--color-luxury-gold)] mt-1">
                      K Raheja Vistas Mahalunge — Benchmark Quality Standards
                    </p>
                  </div>
                  <span className="hidden md:inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70">
                    MahaRERA: PR1260002501530
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {synthesized.specsTable.map((spec, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-colors">
                      <div className="text-xs uppercase tracking-wider text-white/50 mb-1">{spec.label}</div>
                      <div className="text-sm font-medium text-white/90">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* === HYPERLOCAL COMMUTE & TRANSIT RADAR === */}
              <div className="my-12 text-left">
                <div className="mb-6 pb-3 border-b border-white/10">
                  <h3 className="text-2xl font-serif text-[var(--color-luxury-pearl)]">
                    Micro-Market Commute & Connectivity Radar
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[var(--color-luxury-gold)] mt-1">
                    Signal-Free Transit from Mahalunge & Baner Annexe
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-white/80 border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-[var(--color-luxury-gold)]">
                        <th className="py-3 px-4">Key Hub / Landmark</th>
                        <th className="py-3 px-4">Distance</th>
                        <th className="py-3 px-4">Travel Time</th>
                        <th className="py-3 px-4">Strategic Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {synthesized.commuteRadar.map((commute, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-4 font-medium text-white">{commute.destination}</td>
                          <td className="py-3 px-4 text-[var(--color-luxury-gold)]">{commute.distance}</td>
                          <td className="py-3 px-4">{commute.travelTime}</td>
                          <td className="py-3 px-4 text-white/60 text-xs">{commute.highlight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* === FINANCIAL & INVESTMENT HIGHLIGHTS === */}
              <div className="my-12 text-left">
                <div className="mb-6 pb-3 border-b border-white/10">
                  <h3 className="text-2xl font-serif text-[var(--color-luxury-pearl)]">
                    Estimated Financial & Investment Framework (2026)
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[var(--color-luxury-gold)] mt-1">
                    West Pune Real Estate Capital & Rental Appreciation
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {synthesized.financialMatrix.map((fin, i) => (
                    <div key={i} className="p-5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-white/50 mb-2">{fin.item}</div>
                        <div className="text-xl font-serif text-[var(--color-luxury-gold)] font-bold">{fin.value}</div>
                      </div>
                      <div className="text-xs text-white/60 mt-3 pt-3 border-t border-white/5">{fin.note}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <DynamicGallery slug={slugKey} title={data.h1} />
              
              <div className="flex flex-wrap justify-center gap-4 my-12">
                <MagneticButton>
                  <Link
                    href="/"
                    className="px-8 py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] uppercase tracking-widest font-bold text-sm hover:brightness-110 transition-all"
                  >
                    Download Master Brochure & Floor Plans
                  </Link>
                </MagneticButton>
                <a
                  href="tel:+917744009295"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white uppercase tracking-widest font-bold text-sm rounded-none border border-white/20 transition-all flex items-center gap-2"
                >
                  <span>Connect with Sales Desk: +91-7744009295</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-[var(--color-luxury-pearl)] prose-a:text-[var(--color-luxury-gold)]">
              <div dangerouslySetInnerHTML={{ __html: data.content || '' }} />
              
              <div className="mt-16 pt-8 border-t border-white/10 flex justify-center">
                 <MagneticButton>
                  <Link
                    href="/"
                    className="px-8 py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] uppercase tracking-widest font-bold text-sm"
                  >
                    View Residences
                  </Link>
                </MagneticButton>
              </div>
            </div>
          )}
        </div>

        {/* AI Search Optimization (AEO/GEO) Block */}
        {!isArticle && <AeoFaqBlock keyword={data.h1} />}

        <InternalLinkingGrid currentSlug={slugKey} />

      </div>
    </div>
  );
}
