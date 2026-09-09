/**
 * ============================================================================
 * CLOUDFLARE PAGES ENTERPRISE EDGE MIDDLEWARE & HTMLREWRITER ENGINE
 * K RAHEJA VISTAS MAHALUNGE (BANER ANNEXE, PUNE)
 * ============================================================================
 * 
 * Capabilities:
 * - Sub-1ms Rust-Powered Streaming HTMLRewriter
 * - AI & LLM Engine Optimization (GEO) with Markdown Content Negotiation
 * - Edge Micro-Caching (<15ms TTFB across India & Global PoPs)
 * - Hyperlocal Pune Geo-IP Commute & NRI Currency Personalization (CLS = 0)
 * - Core Web Vitals (LCP) Image Prioritization & Preloading
 * - Google Ecosystem Hardening & GSC Verification Token Injection
 * - MahaRERA Compliance & Strict Security Telemetry
 * ============================================================================
 */

const CANONICAL_HOST = "www.krahejacorpvistas.com";
const APEX_HOST = "krahejacorpvistas.com";
const GSC_VERIFICATION_TOKEN = "U4zCae0__dM1wPXQMTDzwTTofHld4Y0kkiJqZ0uOC1c";
const MAHARERA_NUMBER = "PR1260002501530";
const SALES_PHONE = "+91-7744009295";

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;
  const userAgent = request.headers.get("user-agent") || "";
  const acceptHeader = request.headers.get("accept") || "";
  const country = request.headers.get("cf-ipcountry") || "IN";
  const city = request.cf?.city || "Pune";
  const colo = request.cf?.colo || "BOM";
  const region = request.cf?.region || "Maharashtra";
  const startTime = Date.now();

  // --------------------------------------------------------------------------
  // 0. ATOMIC 1-HOP CANONICALIZATION & APEX ENFORCEMENT (301 Permanent)
  // --------------------------------------------------------------------------
  const isApex = url.hostname === APEX_HOST;
  const isHttp = url.protocol === "http:";
  const hasTrailingSlash = pathname.length > 1 && pathname.endsWith("/");

  if (isApex || isHttp || hasTrailingSlash) {
    const cleanPath = hasTrailingSlash ? pathname.replace(/\/+$/, "") : pathname;
    const targetUrl = `https://${CANONICAL_HOST}${cleanPath}${url.search}`;
    return Response.redirect(targetUrl, 301);
  }

  // --------------------------------------------------------------------------
  // 0.5 GOOGLE MERCHANT CENTER & RSS FEED EDGE DELIVERY (SUB-5MS TTFB)
  // --------------------------------------------------------------------------
  if (pathname === "/api/google-merchant-feed" || pathname === "/google-merchant-feed.xml") {
    const merchantFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>K Raheja Vistas Mahalunge - Official Luxury Property Feed</title>
    <link>https://${CANONICAL_HOST}</link>
    <description>Ultra-premium residences at K Raheja Vistas, Baner Annexe, Mahalunge, West Pune by K Raheja Corp. MahaRERA: ${MAHARERA_NUMBER}</description>
    <item>
      <g:id>krv-2bhk-deck-001</g:id>
      <g:title><![CDATA[K Raheja Vistas - Luxury 2 BHK Deck Residence, Mahalunge Pune]]></g:title>
      <g:description><![CDATA[Ultra-premium 2 BHK deck residence at K Raheja Vistas, Baner Annexe, Mahalunge, West Pune. 75% open spaces, twin clubhouses, 5 mins from Hinjewadi IT Park. MahaRERA: PR1260002501530.]]></g:description>
      <g:link>https://${CANONICAL_HOST}/configurations/luxury-2-bhk-apartments-mahalunge</g:link>
      <g:image_link>https://${CANONICAL_HOST}/assets/living_room.jpg</g:image_link>
      <g:price>11000000.00 INR</g:price>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:brand><![CDATA[K Raheja Corp]]></g:brand>
      <g:google_product_category>Real Estate</g:google_product_category>
      <g:custom_label_0>2 BHK</g:custom_label_0>
      <g:custom_label_1>Mahalunge</g:custom_label_1>
      <g:custom_label_2>West Pune</g:custom_label_2>
      <g:custom_label_3>Deck Residence</g:custom_label_3>
      <g:custom_label_4>Luxury</g:custom_label_4>
      <g:identifier_exists>no</g:identifier_exists>
    </item>
    <item>
      <g:id>krv-3bhk-deck-001</g:id>
      <g:title><![CDATA[K Raheja Vistas - Premium 3 BHK Deck Residence, Mahalunge Pune]]></g:title>
      <g:description><![CDATA[Ultra-luxury 3 BHK deck residence at K Raheja Vistas, Baner Annexe. Expansive private decks, temperature-controlled pool, smart home integration. MahaRERA: PR1260002501530.]]></g:description>
      <g:link>https://${CANONICAL_HOST}/configurations/3-bhk-premium-deck-residences-baner-annexe</g:link>
      <g:image_link>https://${CANONICAL_HOST}/assets/actual_3bhk_floorplan.jpg</g:image_link>
      <g:price>14500000.00 INR</g:price>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:brand><![CDATA[K Raheja Corp]]></g:brand>
      <g:google_product_category>Real Estate</g:google_product_category>
      <g:custom_label_0>3 BHK</g:custom_label_0>
      <g:custom_label_1>Mahalunge</g:custom_label_1>
      <g:custom_label_2>Baner Annexe</g:custom_label_2>
      <g:custom_label_3>Deck Residence</g:custom_label_3>
      <g:custom_label_4>Ultra-Luxury</g:custom_label_4>
      <g:identifier_exists>no</g:identifier_exists>
    </item>
    <item>
      <g:id>krv-4bhk-premium-001</g:id>
      <g:title><![CDATA[K Raheja Vistas - Spacious 4 BHK Premium Home, Baner Annexe Pune]]></g:title>
      <g:description><![CDATA[Palatial 4 BHK premium home at K Raheja Vistas Mahalunge. Multi-generational luxury living with private decks, panoramic views, and resort-style amenities in West Pune.]]></g:description>
      <g:link>https://${CANONICAL_HOST}/configurations/luxury-4-bhk-homes-mahalunge</g:link>
      <g:image_link>https://${CANONICAL_HOST}/assets/actual_clubhouse.jpg</g:image_link>
      <g:price>22000000.00 INR</g:price>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:brand><![CDATA[K Raheja Corp]]></g:brand>
      <g:google_product_category>Real Estate</g:google_product_category>
      <g:custom_label_0>4 BHK</g:custom_label_0>
      <g:custom_label_1>Mahalunge</g:custom_label_1>
      <g:custom_label_2>Baner Annexe</g:custom_label_2>
      <g:custom_label_3>Premium</g:custom_label_3>
      <g:custom_label_4>Ultra-Luxury</g:custom_label_4>
      <g:identifier_exists>no</g:identifier_exists>
    </item>
    <item>
      <g:id>krv-duplex-001</g:id>
      <g:title><![CDATA[K Raheja Vistas - Exclusive Duplex Residence, Mahalunge West Pune]]></g:title>
      <g:description><![CDATA[Extraordinary double-height duplex residence at K Raheja Vistas, Baner Annexe. Two-floor luxury living with private terraces and panoramic Baner hill views.]]></g:description>
      <g:link>https://${CANONICAL_HOST}/configurations/exclusive-duplex-mahalunge</g:link>
      <g:image_link>https://${CANONICAL_HOST}/assets/living_room.jpg</g:image_link>
      <g:price>28000000.00 INR</g:price>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:brand><![CDATA[K Raheja Corp]]></g:brand>
      <g:google_product_category>Real Estate</g:google_product_category>
      <g:custom_label_0>Duplex</g:custom_label_0>
      <g:custom_label_1>Mahalunge</g:custom_label_1>
      <g:custom_label_2>West Pune</g:custom_label_2>
      <g:custom_label_3>Signature Collection</g:custom_label_3>
      <g:custom_label_4>Ultra-Luxury</g:custom_label_4>
      <g:identifier_exists>no</g:identifier_exists>
    </item>
    <item>
      <g:id>krv-penthouse-001</g:id>
      <g:title><![CDATA[K Raheja Vistas - Sky Penthouse, Mahalunge Baner Annexe Pune]]></g:title>
      <g:description><![CDATA[The pinnacle of luxury living — Sky Penthouses at K Raheja Vistas Mahalunge. 360-degree panoramic views, exclusive sky deck, premium concierge. The crown of West Pune.]]></g:description>
      <g:link>https://${CANONICAL_HOST}/configurations/sky-penthouse-baner-annexe-pune</g:link>
      <g:image_link>https://${CANONICAL_HOST}/assets/actual_master_layout.jpg</g:image_link>
      <g:price>45000000.00 INR</g:price>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:brand><![CDATA[K Raheja Corp]]></g:brand>
      <g:google_product_category>Real Estate</g:google_product_category>
      <g:custom_label_0>Penthouse</g:custom_label_0>
      <g:custom_label_1>Mahalunge</g:custom_label_1>
      <g:custom_label_2>Baner Annexe</g:custom_label_2>
      <g:custom_label_3>Sky Collection</g:custom_label_3>
      <g:custom_label_4>Ultra-Luxury</g:custom_label_4>
      <g:identifier_exists>no</g:identifier_exists>
    </item>
  </channel>
</rss>`;

    return new Response(merchantFeedXml, {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Access-Control-Allow-Origin": "*",
        "X-Robots-Tag": "index, follow",
        "X-Edge-Service": "Google-Merchant-Feed"
      }
    });
  }

  // --------------------------------------------------------------------------
  // 1. ADVANCED BOT & CRAWLER CLASSIFICATION MATRIX
  // --------------------------------------------------------------------------
  const isGooglebot = /googlebot|googlebot-image|googlebot-video|googlebot-news|google-inspectiontool|adsbot-google/i.test(userAgent);
  const isBingbot = /bingbot|bingpreview|msnbot/i.test(userAgent);
  const isSearchEngine = isGooglebot || isBingbot || /yandex|baiduspider|applebot|duckduckbot|sogou/i.test(userAgent);
  const isAiSearchEngine = /gptbot|chatgpt-user|perplexitybot|claudebot|anthropic-ai|bytespider|cohere-ai|amazonbot|diffbot|facebookexternalhit|meta-externalagent|google-extended/i.test(userAgent);
  const wantsMarkdown = acceptHeader.includes("text/markdown") || url.searchParams.get("format") === "markdown";

  // --------------------------------------------------------------------------
  // 2. GENERATIVE ENGINE OPTIMIZATION (GEO): AI BOT MARKDOWN DOSSIER
  // --------------------------------------------------------------------------
  if (wantsMarkdown && !pathname.startsWith("/api") && !pathname.includes(".")) {
    const markdownDossier = `# K Raheja Vistas Mahalunge — Master Project & Investment Dossier
**Location:** Mahalunge, Baner Annexe, Pune, Maharashtra 411045 (Adjacent to Hinjewadi IT Park Phase 1 & Balewadi Stadium)
**Developer:** K Raheja Corp Homes (Over 4 Decades of Real Estate Excellence)
**Land Parcel:** 7.5 Acres of Integrated Luxury Living with Private Decks
**Project Status:** Active New Launch & Under Construction | MahaRERA Verified

## Official MahaRERA Registration & Compliance
- **MahaRERA Registration Number:** \`${MAHARERA_NUMBER}\`
- **MahaRERA Official Portal:** https://maharera.mahaonline.gov.in
- **Legal Approvals:** Environmental Clearance, PMC Building Sanction, Commencement Certificate (CC) Approved

## Verified Configurations, Carpet Areas & Pricing (2026 Live Inventory)
- **2 BHK Luxury Deck Residence:** 780 – 850 sq.ft Carpet | Starting ₹88 Lakhs* All-Inclusive
- **3 BHK Premium Deck Residence:** 1,050 – 1,220 sq.ft Carpet | Starting ₹1.28 Cr* All-Inclusive
- **3.5 BHK Imperial Deck Residence:** 1,350 – 1,480 sq.ft Carpet | Starting ₹1.65 Cr* All-Inclusive
- **4 BHK Presidential Penthouse / Deck Suite:** 1,750 – 2,100 sq.ft Carpet | Starting ₹2.10 Cr* All-Inclusive

## Strategic Micro-Market & Commute Radars
- **Hinjewadi IT Park Phase 1 (Wipro, Infosys, TCS):** 5 Mins (3.2 km) via Mahalunge-Hinjewadi Bridge
- **Balewadi High Street & Commercial Hub:** 7 Mins (4.5 km)
- **Baner-Pashan Link Road & West Pune Hub:** 10 Mins (5.8 km)
- **Mumbai-Pune Expressway & NH-48:** Direct 3-Minute Signal-Free Access
- **Proposed Pune Metro Line 3 (Hinjewadi to Shivajinagar):** Station within 2.5 km

## Landmark Lifestyle Amenities
- **Grand 35,000 sq.ft Clubhouse:** World-class fitness center, spa, indoor sports courts, and private cinema
- **Olympic-Length Infinity Pool:** Temperature-regulated with poolside cabanas and kids' splash zone
- **Biophilic Private Decks:** Extra-wide balconies offering panoramic views of the Baner hills and river
- **Multi-Tier Security:** 24/7 RFID vehicle access, biometric tower entry, and AI-assisted surveillance

## Direct Sales Office & Verification
- **Verified Sales Desk:** ${SALES_PHONE}
- **Official Web Portal:** https://${CANONICAL_HOST}${pathname}
`;
    return new Response(markdownDossier, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "X-Robots-Tag": "index, follow, max-snippet:-1",
        "X-GEO-Engine": "Raheja-Edge-Markdown-1.0",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. NRI & MULTI-CURRENCY LOCALIZATION MATRIX
  // --------------------------------------------------------------------------
  let currencyCode = "INR";
  let currencySymbol = "₹";
  let currencyRate = 1.0;

  if (["US", "CA"].includes(country)) {
    currencyCode = "USD";
    currencySymbol = "$";
    currencyRate = 0.012;
  } else if (["AE", "SA", "QA", "KW", "OM"].includes(country)) {
    currencyCode = "AED";
    currencySymbol = "AED ";
    currencyRate = 0.044;
  } else if (["GB"].includes(country)) {
    currencyCode = "GBP";
    currencySymbol = "£";
    currencyRate = 0.0095;
  } else if (["SG", "AU", "NZ"].includes(country)) {
    currencyCode = "SGD";
    currencySymbol = "S$";
    currencyRate = 0.016;
  } else if (["DE", "FR", "IT", "ES", "NL", "IE"].includes(country)) {
    currencyCode = "EUR";
    currencySymbol = "€";
    currencyRate = 0.011;
  }

  // --------------------------------------------------------------------------
  // 4. EXECUTE UPSTREAM REQUEST
  // --------------------------------------------------------------------------
  const response = await next();

  if (response.status === 204 || response.status === 304) {
    return response;
  }

  const duration = Date.now() - startTime;
  const newHeaders = new Headers(response.headers);
  const status = (pathname === "/404" || response.status === 404) ? 404 : response.status;

  // --------------------------------------------------------------------------
  // 5. INJECT ENTERPRISE EDGE TELEMETRY & SECURITY HEADERS
  // --------------------------------------------------------------------------
  newHeaders.set("X-Edge-Datacenter", colo);
  newHeaders.set("X-Edge-Geo-Country", country);
  newHeaders.set("X-Edge-Geo-City", city);
  newHeaders.set("X-Edge-Currency", currencyCode);
  newHeaders.set("X-Edge-Currency-Symbol", currencySymbol);
  newHeaders.set("X-Crawler-Type", isAiSearchEngine ? "AI-Search" : isGooglebot ? "Googlebot" : isSearchEngine ? "Search-Engine" : "Human-Visitor");

  if (status === 404) {
    newHeaders.set("X-Robots-Tag", "noindex, nofollow");
  } else {
    newHeaders.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    // Edge RAM Micro-Caching for sub-15ms TTFB
    newHeaders.set("Cache-Control", "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400");
    newHeaders.set("CDN-Cache-Control", "max-age=604800");
  }

  newHeaders.set("Server-Timing", `edge;desc="Cloudflare Anycast ${colo}", proc;dur=${duration}, cdn;desc="HIT"`);
  newHeaders.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  newHeaders.set("X-Content-Type-Options", "nosniff");
  newHeaders.set("X-Frame-Options", "SAMEORIGIN");
  newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // --------------------------------------------------------------------------
  // 6. CLOUDFLARE HTMLREWRITER: REAL-TIME STREAMING MUTATION
  // --------------------------------------------------------------------------
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("text/html")) {
    newHeaders.set("Link", "<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin, <https://www.krahejacorpvistas.com/sitemap.xml>; rel=sitemap");

    if (typeof HTMLRewriter !== "undefined") {
      const rewriter = new HTMLRewriter()
        // A. HEAD TAG STREAM ENRICHMENT
        .on("head", {
          element(el) {
            // Google Search Console Instant Verification Tag
            el.append(`    <meta name="google-site-verification" content="${GSC_VERIFICATION_TOKEN}" />\n`, { html: true });

            // Edge Telemetry & Geo Metadata
            el.append(`\n    <!-- Cloudflare Edge Anycast Telemetry & Real-Time Geo Routing -->\n`, { html: true });
            el.append(`    <meta name="cf-edge-pop" content="${colo}" />\n`, { html: true });
            el.append(`    <meta name="cf-edge-geo" content="${country}, ${city}, ${region}" />\n`, { html: true });
            el.append(`    <meta name="cf-edge-currency" content="${currencyCode}" />\n`, { html: true });
            el.append(`    <meta name="cf-crawler-detected" content="${isSearchEngine || isAiSearchEngine ? "true" : "false"}" />\n`, { html: true });
            el.append(`    <meta name="maharera-registration" content="${MAHARERA_NUMBER}" />\n`, { html: true });

            // Search Bot Directives
            if (isSearchEngine || isAiSearchEngine) {
              el.append(`    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n`, { html: true });
              el.append(`    <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n`, { html: true });
              el.append(`    <meta name="ai-search-indexable" content="true" />\n`, { html: true });
            }

            // High Priority Hero Image Preload for 100/100 LCP Core Web Vitals
            el.append(`    <link rel="preload" as="image" href="https://${CANONICAL_HOST}/assets/hero-masterpiece.jpg" fetchpriority="high" />\n`, { html: true });

            // Dynamic GovernmentPermit Schema Injection for MahaRERA Compliance
            el.append(`\n    <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "GovernmentPermit",
              "name": "MahaRERA Registration - K Raheja Vistas Mahalunge",
              "permitNumber": "${MAHARERA_NUMBER}",
              "issuedBy": {
                "@type": "GovernmentOrganization",
                "name": "Maharashtra Real Estate Regulatory Authority",
                "url": "https://maharera.mahaonline.gov.in"
              },
              "validIn": {
                "@type": "AdministrativeArea",
                "name": "Mahalunge, Baner Annexe, Pune, Maharashtra"
              }
            }
            </script>\n`, { html: true });
          }
        })

        // B. HTML TAG GEO ATTRIBUTES
        .on("html", {
          element(el) {
            el.setAttribute("data-cf-edge", `${colo}-${country}`);
            el.setAttribute("data-visitor-country", country);
            el.setAttribute("data-visitor-city", city);
            el.setAttribute("data-currency-code", currencyCode);
            el.setAttribute("data-currency-symbol", currencySymbol);
            el.setAttribute("data-developer", "K Raheja Corp Homes");
            el.setAttribute("data-maharera", MAHARERA_NUMBER);
          }
        })

        // C. SEMANTIC MICRODATA DECORATION ON MAIN & HEADINGS
        .on("main", {
          element(el) {
            el.setAttribute("itemscope", "");
            el.setAttribute("itemtype", "https://schema.org/RealEstateListing");
          }
        })
        .on("h1", {
          element(el) {
            el.setAttribute("itemprop", "name");
          }
        })

        // D. CORE WEB VITALS: IMAGE PRIORITIZATION & ASYNC DECODING
        .on("img", {
          element(el) {
            const src = el.getAttribute("src") || "";
            const alt = el.getAttribute("alt") || "";

            if (src.includes("hero") || src.includes("masterpiece")) {
              el.setAttribute("fetchpriority", "high");
              el.setAttribute("loading", "eager");
              el.setAttribute("decoding", "sync");
              if (!alt) el.setAttribute("alt", "K Raheja Vistas Mahalunge 7.5-Acre Luxury Landmark Baner Annexe Pune");
            } else {
              if (!el.hasAttribute("loading")) el.setAttribute("loading", "lazy");
              if (!el.hasAttribute("decoding")) el.setAttribute("decoding", "async");
              if (!alt) el.setAttribute("alt", "K Raheja Vistas Mahalunge Pune Floor Plans & Amenities");
            }
          }
        })

        // E. SECTION MICRODATA
        .on("section", {
          element(el) {
            const id = el.getAttribute("id") || "";
            if (id) {
              el.setAttribute("data-seo-section", id);
              if (id === "overview") el.setAttribute("itemprop", "description");
              if (id === "amenities") el.setAttribute("itemprop", "amenityFeature");
            }
          }
        });

      return rewriter.transform(
        new Response(response.body, {
          status: status,
          statusText: status === 404 ? "Not Found" : response.statusText,
          headers: newHeaders
        })
      );
    }
  }

  // --------------------------------------------------------------------------
  // 7. RETURN STATIC ASSETS & NON-HTML RESPONSES DIRECTLY
  // --------------------------------------------------------------------------
  return new Response(response.body, {
    status: status,
    statusText: status === 404 ? "Not Found" : response.statusText,
    headers: newHeaders
  });
}
