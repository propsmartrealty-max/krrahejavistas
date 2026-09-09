'use client';

import Script from 'next/script';

// High-converting voice-search optimized FAQ dataset for Google SGE & Assistant
const VOICE_FAQS = [
  {
    question: "What is the price of 2 and 3 BHK at K Raheja Vistas Mahalunge Pune?",
    answer: "At K Raheja Vistas Mahalunge, luxury 2 BHK deck residences start from ₹93 Lakh* onwards, premium 2 BHK Regalia from ₹1.10 Cr*, and ultra-spacious 3 BHK signature residences start from ₹1.62 Cr*. 4 BHK duplex and royal penthouses are available on request."
  },
  {
    question: "Is K Raheja Vistas Mahalunge a good real estate investment in 2026?",
    answer: "Yes. Mahalunge is West Pune's fastest-growing luxury corridor. Backed by K Raheja Corp's execution pedigree, proximity to Hinjewadi Phase 1, and the upcoming Pune Metro Line 3, the project offers strong rental yields of 4.5–5.5% and high capital appreciation potential."
  },
  {
    question: "Where is K Raheja Vistas located in Pune?",
    answer: "K Raheja Vistas is strategically located at Baner Annexe, Mahalunge, Pune 411045. It is positioned directly opposite the Baner hills, just 5 minutes from Hinjewadi IT Park and 10 minutes from Balewadi High Street."
  },
  {
    question: "What is the MahaRERA registration number for K Raheja Vistas?",
    answer: "K Raheja Vistas Mahalunge is officially registered with Maharashtra Real Estate Regulatory Authority under MahaRERA No. PR1260002501530. Verified project details, land title, and approvals are publicly accessible on the MahaRERA portal."
  },
  {
    question: "What amenities are provided at K Raheja Vistas Mahalunge?",
    answer: "The project spans 7.5 acres with 75% landscaped open spaces and twin grand clubhouses totaling 28,000 sq.ft. Amenities include a temperature-controlled infinity swimming pool, tennis and squash courts, gymnasium, jogging promenade, yoga pavilion, and 5-tier security."
  },
  {
    question: "What configurations and carpet areas are available?",
    answer: "K Raheja Vistas offers 2 BHK residences (678 to 911 sq.ft carpet), 3 BHK signature deck residences (1,110 sq.ft carpet), 4 BHK royal deck homes (1,824 sq.ft carpet), and bespoke Jodi flat configurations with expansive double-aspect balconies."
  },
  {
    question: "Is there a Pune Metro connection near K Raheja Vistas?",
    answer: "Yes. The upcoming Pune Metro Line 3 (Hinjewadi–Shivajinagar corridor) has a station in close proximity to K Raheja Vistas Mahalunge, providing rapid congestion-free transit across Pune."
  }
];

export default function AeoFaqBlock({ keyword }: { keyword: string }) {
  const cleanKeyword = (keyword || '').trim();
  const isSelf = !cleanKeyword || /k\s*raheja\s*vistas/i.test(cleanKeyword);

  const topQuestion = isSelf
    ? "Why is K Raheja Vistas Mahalunge considered Pune's premier luxury residential address?"
    : `Why choose K Raheja Vistas Mahalunge for ${cleanKeyword}?`;

  const topAnswer = isSelf
    ? "Developed by India's premier luxury developer K Raheja Corp across 7.5 pristine acres at Baner Annexe, K Raheja Vistas features 7 high-rise towers with 75% open spaces, 28,000 sq.ft twin clubhouses, and private deck residences with full MahaRERA compliance (PR1260002501530)."
    : `Homebuyers and investors evaluating ${cleanKeyword} will find K Raheja Vistas Mahalunge to be the premier address in West Pune — combining K Raheja Corp's trusted delivery, 28,000 sq.ft twin clubhouses, private panoramic decks, and 5-minute connectivity to Hinjewadi Phase 1 and Balewadi High Street.`;

  // Prepend dynamic contextual question to standard voice FAQs
  const faqs = [
    {
      question: topQuestion,
      answer: topAnswer
    },
    ...VOICE_FAQS
  ];

  // SpeakableSpecification for Google Assistant
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".speakable-headline", ".speakable-description"]
    }
  };

  // FAQPage Schema for SERP expandable rich snippets
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.slice(0, 8).map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="w-full bg-[#0a0e17] py-20 px-4 md:px-6 border-t border-white/10 text-white relative">
      <Script id="speakable-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <Script id="faq-page-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center md:text-left mb-12">
          <span className="text-[var(--color-luxury-gold)] text-xs uppercase tracking-[0.25em] font-semibold mb-2 block">
            Official Knowledge Base
          </span>
          <h3 className="text-3xl md:text-5xl font-serif text-[var(--color-luxury-gold)] mb-3 font-semibold">
            Frequently Asked Questions
          </h3>
          <p className="text-gray-400 text-xs md:text-sm tracking-wide uppercase font-medium">
            Optimized for Google Assistant, SERP Snippets &amp; Voice Search
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details 
              key={index} 
              className="group bg-[#111827] rounded-2xl border border-white/10 hover:border-[var(--color-luxury-gold)]/60 transition-all duration-300 overflow-hidden shadow-lg"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none">
                <h4 className="text-base md:text-lg font-medium text-white group-hover:text-[var(--color-luxury-gold)] transition-colors pr-4 speakable-headline">
                  {faq.question}
                </h4>
                <span className="text-[var(--color-luxury-gold)] text-2xl font-light flex-shrink-0 group-open:rotate-45 transition-transform duration-300">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 pt-2 text-gray-300 text-sm md:text-base leading-relaxed border-t border-white/5 speakable-description">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
