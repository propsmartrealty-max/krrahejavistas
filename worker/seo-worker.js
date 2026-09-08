/**
 * ============================================================================
 * CLOUDFLARE ENTERPRISE SEO WORKER - K RAHEJA VISTAS MAHALUNGE
 * ============================================================================
 * 
 * Standalone Edge Worker for High-Performance SEO, Crawler Acceleration,
 * HTMLRewriter Stream Optimization, Canonicalization, and Structured Data.
 * 
 * Target Canonical Domain: https://www.krahejacorpvistas.com
 * Upstream Pages Origin: https://krahejacorpvistas.pages.dev
 * Developer: K Raheja Corp Homes & Propsmart Realty
 * MahaRERA: PR1260002501530
 * Verified Sales Desk: +91-7744009295
 * ============================================================================
 */

const CANONICAL_HOST = "www.krahejacorpvistas.com";
const APEX_HOST = "krahejacorpvistas.com";
const DEFAULT_ORIGIN = "https://krahejacorpvistas.pages.dev";
const INDEXNOW_KEY = "default-indexnow-key";
const GSC_TOKEN = "U4zCae0__dM1wPXQMTDzwTTofHld4Y0kkiJqZ0uOC1c";
const MAHARERA_NUMBER = "PR1260002501530";
const SALES_PHONE = "+91-7744009295";

const CORE_URLS = [
  "https://www.krahejacorpvistas.com/",
  "https://www.krahejacorpvistas.com/project/masterplan",
  "https://www.krahejacorpvistas.com/project/floorplans",
  "https://www.krahejacorpvistas.com/project/amenities",
  "https://www.krahejacorpvistas.com/project/location",
  "https://www.krahejacorpvistas.com/project/gallery",
  "https://www.krahejacorpvistas.com/neighborhood",
  "https://www.krahejacorpvistas.com/directory",
  "https://www.krahejacorpvistas.com/insights",
  "https://www.krahejacorpvistas.com/stories",
  "https://www.krahejacorpvistas.com/updates",
  "https://www.krahejacorpvistas.com/nri/invest-in-pune-real-estate-from-dubai",
  "https://www.krahejacorpvistas.com/nri/luxury-homes-pune-for-nri-uk",
  "https://www.krahejacorpvistas.com/nri/best-nri-investment-pune-singapore",
  "https://www.krahejacorpvistas.com/nri/pune-real-estate-investment-for-nri-usa"
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent") || "";
    const acceptHeader = request.headers.get("accept") || "";
    const country = request.headers.get("cf-ipcountry") || "IN";
    const city = request.cf?.city || "Pune";
    const colo = request.cf?.colo || "BOM";
    const region = request.cf?.region || "Maharashtra";
    const startTime = Date.now();

    // ------------------------------------------------------------------------
    // 1. ATOMIC 1-HOP CANONICALIZATION & APEX ENFORCEMENT (301 Permanent)
    // ------------------------------------------------------------------------
    const isApex = url.hostname === APEX_HOST;
    const isHttp = url.protocol === "http:";
    const hasTrailingSlash = url.pathname.length > 1 && url.pathname.endsWith("/");

    if (isApex || isHttp || hasTrailingSlash) {
      const cleanPath = hasTrailingSlash ? url.pathname.replace(/\/+$/, "") : url.pathname;
      const targetUrl = `https://${CANONICAL_HOST}${cleanPath}${url.search}`;
      return Response.redirect(targetUrl, 301);
    }

    // ------------------------------------------------------------------------
    // 2. EDGE CRAWLER & BOT DETECTION MATRIX
    // ------------------------------------------------------------------------
    const isGooglebot = /googlebot|googlebot-image|googlebot-video|googlebot-news|google-inspectiontool|adsbot-google/i.test(userAgent);
    const isBingbot = /bingbot|bingpreview|msnbot/i.test(userAgent);
    const isSearchSpider = isGooglebot || isBingbot || /yandex|baiduspider|applebot|duckduckbot|sogou/i.test(userAgent);
    const isAiCrawler = /gptbot|chatgpt-user|perplexitybot|claudebot|anthropic-ai|bytespider|cohere-ai|amazonbot|diffbot|google-extended/i.test(userAgent);
    const wantsMarkdown = acceptHeader.includes("text/markdown") || url.searchParams.get("format") === "markdown";

    // ------------------------------------------------------------------------
    // 3. NRI & MULTI-CURRENCY DETECTION MATRIX
    // ------------------------------------------------------------------------
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

    // ------------------------------------------------------------------------
    // 4. SPECIAL EDGE SEO ENDPOINTS
    // ------------------------------------------------------------------------

    // A. Dynamic Robots.txt
    if (url.pathname === "/robots.txt") {
      const robotsTxt = `# K Raheja Vistas Mahalunge - Cloudflare SEO Worker
User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /portal/
Disallow: /api/
Disallow: /campaign/

User-agent: Googlebot-Image
Allow: /
Allow: /assets/
Allow: /_next/image

User-agent: Googlebot-Video
Allow: /

User-agent: Googlebot-News
Allow: /insights
Allow: /stories
Allow: /updates

User-agent: AdsBot-Google
Allow: /

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Applebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /portal/
Disallow: /api/
Disallow: /campaign/
Disallow: /*?utm_*
Disallow: /*?fbclid=*
Disallow: /*?gclid=*

Sitemap: https://${CANONICAL_HOST}/sitemap.xml
Sitemap: https://${CANONICAL_HOST}/sitemap-index.xml
`;
      return new Response(robotsTxt, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
          "X-Robots-Tag": "noindex"
        }
      });
    }

    // B. IndexNow Verification Key Route
    if (url.pathname === `/${INDEXNOW_KEY}.txt` || url.pathname === "/default-indexnow-key.txt") {
      return new Response(INDEXNOW_KEY, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // C. Health Check Endpoint
    if (url.pathname === "/api/health") {
      return new Response(JSON.stringify({
        status: "healthy",
        project: "K Raheja Vistas Mahalunge",
        canonicalDomain: CANONICAL_HOST,
        colo,
        country,
        city,
        region,
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    // D. Real-Time IndexNow Broadcast Endpoint
    if (url.pathname === "/api/indexnow" && request.method === "POST") {
      try {
        const indexNowPayload = {
          host: CANONICAL_HOST,
          key: env.INDEXNOW_KEY || INDEXNOW_KEY,
          keyLocation: `https://${CANONICAL_HOST}/${INDEXNOW_KEY}.txt`,
          urlList: CORE_URLS
        };
        const indexRes = await fetch("https://api.indexnow.org/indexnow", {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(indexNowPayload)
        });
        return new Response(JSON.stringify({
          success: true,
          message: `All ${CORE_URLS.length} core SEO URLs pushed to search engines in real-time.`,
          submittedUrls: CORE_URLS.length,
          status: indexRes.status
        }), {
          status: 200,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
      }
    }

    if (url.pathname === "/api/indexnow" && request.method === "GET") {
      return new Response(JSON.stringify({
        service: "K Raheja Vistas Real-Time IndexNow Edge Worker",
        totalTrackedUrls: CORE_URLS.length,
        protocol: "https://www.indexnow.org/documentation",
        monitoredUrls: CORE_URLS
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    // E. Generative Engine Optimization (GEO): Markdown Streaming for AI Agents
    if (wantsMarkdown && !url.pathname.startsWith("/api") && !url.pathname.includes(".")) {
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
- **Official Web Portal:** https://${CANONICAL_HOST}${url.pathname}
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

    // ------------------------------------------------------------------------
    // 5. FORWARD REQUEST TO UPSTREAM CLOUDFLARE PAGES ORIGIN
    // ------------------------------------------------------------------------
    const originHost = env.ORIGIN_HOST || "krahejacorpvistas.pages.dev";
    let originUrl = new URL(request.url);
    originUrl.hostname = originHost;

    const modifiedRequest = new Request(originUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
      redirect: "follow"
    });

    let originResponse;
    try {
      originResponse = await fetch(modifiedRequest);
    } catch (err) {
      originResponse = await fetch(request);
    }

    if (originResponse.status === 204 || originResponse.status === 304) {
      return originResponse;
    }

    const duration = Date.now() - startTime;
    const responseHeaders = new Headers(originResponse.headers);

    // Inject Ultra-Advanced Edge Headers
    responseHeaders.set("X-Edge-Datacenter", colo);
    responseHeaders.set("X-Edge-Geo-Country", country);
    responseHeaders.set("X-Edge-Geo-City", city);
    responseHeaders.set("X-Edge-Currency", currencyCode);
    responseHeaders.set("X-Edge-Currency-Symbol", currencySymbol);
    responseHeaders.set("X-Crawler-Type", isAiCrawler ? "AI-Search" : isGooglebot ? "Googlebot" : isSearchSpider ? "Search-Spider" : "Visitor");
    responseHeaders.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    responseHeaders.set("Server-Timing", `edge;desc="Cloudflare Anycast ${colo}", proc;dur=${duration}, cdn;desc="HIT"`);
    responseHeaders.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    responseHeaders.set("X-Content-Type-Options", "nosniff");
    responseHeaders.set("X-Frame-Options", "SAMEORIGIN");
    responseHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // ------------------------------------------------------------------------
    // 6. HTMLREWRITER STREAM MUTATION ENGINE
    // ------------------------------------------------------------------------
    const contentType = originResponse.headers.get("content-type") || "";

    if (contentType.includes("text/html")) {
      responseHeaders.set("Link", "<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin, <https://www.krahejacorpvistas.com/sitemap.xml>; rel=sitemap");

      if (typeof HTMLRewriter !== "undefined") {
        const rewriter = new HTMLRewriter()
          // A. Head Injection
          .on("head", {
            element(el) {
              el.append(`    <meta name="google-site-verification" content="${GSC_TOKEN}" />\n`, { html: true });
              el.append(`\n    <!-- Cloudflare Edge SEO Worker Telemetry & Real-Time Geo Routing -->\n`, { html: true });
              el.append(`    <meta name="cf-edge-pop" content="${colo}" />\n`, { html: true });
              el.append(`    <meta name="cf-edge-geo" content="${country}, ${city}, ${region}" />\n`, { html: true });
              el.append(`    <meta name="cf-edge-currency" content="${currencyCode}" />\n`, { html: true });
              el.append(`    <meta name="cf-crawler" content="${isSearchSpider || isAiCrawler ? "true" : "false"}" />\n`, { html: true });
              el.append(`    <meta name="maharera-registration" content="${MAHARERA_NUMBER}" />\n`, { html: true });

              if (isSearchSpider || isAiCrawler) {
                el.append(`    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n`, { html: true });
                el.append(`    <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n`, { html: true });
                el.append(`    <meta name="ai-search-indexable" content="true" />\n`, { html: true });
              }

              // High-Priority Hero Preload for LCP
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

          // B. HTML Tag Decoration
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

          // C. Image Prioritization & Microdata
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

          // D. Section Microdata
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
          new Response(originResponse.body, {
            status: originResponse.status,
            statusText: originResponse.statusText,
            headers: responseHeaders
          })
        );
      }
    }

    return new Response(originResponse.body, {
      status: originResponse.status,
      statusText: originResponse.statusText,
      headers: responseHeaders
    });
  }
};
