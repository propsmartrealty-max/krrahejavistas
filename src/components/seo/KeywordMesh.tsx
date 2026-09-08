import Link from 'next/link';

export default function KeywordMesh() {
  const keywordCategories = [
    {
      category: "Quick Links",
      keywords: [
        { text: "K Raheja Vistas Mahalunge", href: "/" },
        { text: "K Raheja Corp Pune Projects", href: "/" },
        { text: "K Raheja Vistas Baner Annexe", href: "/project/location" },
        { text: "Raheja Vistas Mahalunge Price List", href: "/project/floorplans" },
        { text: "K Raheja Vistas Brochure PDF", href: "/k-raheja-vistas-brochure" }
      ]
    },
    {
      category: "Luxury Configurations",
      keywords: [
        { text: "2 BHK Premium Deck Residences", href: "/project/floorplans?type=2bhk" },
        { text: "3 BHK Ultra-Luxury Apartments", href: "/project/floorplans?type=3bhk" },
        { text: "4 BHK Palatial Homes & Duplexes", href: "/project/floorplans?type=4bhk" },
        { text: "Signature Sky Penthouses", href: "/project/floorplans" },
        { text: "Private Deck Apartments in Pune", href: "/project/amenities" }
      ]
    }
  ];

  return (
    <div className="w-full bg-[#0a0a0a] py-12 border-t border-white/10 text-white/80">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
          <div>
            <h4 className="text-[var(--color-luxury-gold)] text-sm uppercase tracking-[0.25em] font-semibold">
              Quick Links
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl">
          {keywordCategories.map((group, gIdx) => (
            <div key={gIdx} className="space-y-3">
              <h5 className="text-[var(--color-luxury-pearl)] text-xs uppercase tracking-wider font-semibold border-b border-white/5 pb-2">
                {group.category}
              </h5>
              <ul className="space-y-2">
                {group.keywords.map((kw, kIdx) => (
                  <li key={kIdx}>
                    <Link
                      href={kw.href}
                      className="text-[11px] text-white/50 hover:text-[var(--color-luxury-gold)] transition-colors block leading-relaxed"
                      title={kw.text}
                    >
                      {kw.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p className="max-w-4xl leading-relaxed">
            <strong className="text-white/60">About K Raheja Vistas Mahalunge:</strong> Developed by India&apos;s premier luxury developer K Raheja Corp, K Raheja Vistas spans 7.5 pristine acres at Baner Annexe, Mahalunge, West Pune. Featuring 7 high-rise residential towers with 2, 3, and 4 BHK deck residences, 75% landscaped open spaces, twin grand clubhouses, and unmatched 5-minute connectivity to Hinjewadi Phase 1 and Balewadi High Street.
          </p>
        </div>
      </div>
    </div>
  );
}
