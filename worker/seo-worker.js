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

    // ------------------------------------------------------------------------
    // 3. NRI & MULTI-CURRENCY DETECTION MATRIX
    // ------------------------------------------------------------------------
    let currencyCode = "INR";
    let currencySymbol = "₹";

    if (["US", "CA"].includes(country)) {
      currencyCode = "USD";
      currencySymbol = "$";
    } else if (["AE", "SA", "QA", "KW", "OM"].includes(country)) {
      currencyCode = "AED";
      currencySymbol = "AED ";
    } else if (["GB"].includes(country)) {
      currencyCode = "GBP";
      currencySymbol = "£";
    } else if (["SG", "AU", "NZ"].includes(country)) {
      currencyCode = "SGD";
      currencySymbol = "S$";
    } else if (["DE", "FR", "IT", "ES", "NL", "IE"].includes(country)) {
      currencyCode = "EUR";
      currencySymbol = "€";
    }

    // ------------------------------------------------------------------------
    // 4. SPECIAL EDGE SEO ENDPOINTS
    // ------------------------------------------------------------------------

    // A. Health Check
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

    // B. Real-Time IndexNow Broadcast Endpoint
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
