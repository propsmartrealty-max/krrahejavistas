import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ─── TIER 1: Googlebot & Official Google Ecosystem Crawlers — 100% Unrestricted Access ───
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/portal/',
          '/api/',
          '/campaign/',
          '/*?preview=*',
        ],
      },
      {
        userAgent: 'Google-InspectionTool', // Google Search Console Live URL Testing & Rendering
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/',
          '/assets/',
          '/public/',
          '/_next/image',
        ],
        disallow: ['/admin/', '/portal/'],
      },
      {
        userAgent: 'Googlebot-Video',
        allow: ['/', '/assets/video.mp4', '/assets/video-thumb.jpg'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: ['/', '/insights', '/stories', '/updates'],
        disallow: ['/admin/', '/portal/'],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: ['/campaign/', '/'],
        disallow: ['/admin/', '/portal/', '/api/'],
      },
      {
        userAgent: 'AdsBot-Google-Mobile',
        allow: ['/campaign/', '/'],
        disallow: ['/admin/', '/portal/', '/api/'],
      },
      {
        userAgent: 'Storebot-Google',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/'],
      },
      {
        userAgent: 'FeedFetcher-Google',
        allow: '/',
      },
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
      {
        userAgent: 'GoogleOther',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/'],
      },
      {
        userAgent: 'Google-Extended', // Google Gemini & Vertex AI Grounding
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/portal/',
          '/api/',
          '/campaign/',
          '/*?utm_*',
          '/*?fbclid=*',
          '/*?gclid=*',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/'],
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/', '/campaign/'],
        crawlDelay: 2,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/', '/campaign/'],
      },
      {
        userAgent: 'Slurp', // Yahoo
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/', '/campaign/'],
        crawlDelay: 3,
      },

      // ─── TIER 2: AI & LLM Search Engine Optimization (GEO Discovery) ───
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'cohere-ai', 'Amazonbot'],
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/', '/campaign/'],
      },

      // ─── TIER 3: High-Volume Unapproved Data Scrapers — Disallow ───
      { userAgent: 'AhrefsBot',  disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'MJ12bot',    disallow: '/' },
      { userAgent: 'DotBot',     disallow: '/' },
      { userAgent: 'PetalBot',   disallow: '/' },
      { userAgent: 'BLEXBot',    disallow: '/' },
      { userAgent: 'RogerBot',   disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'CCBot',      disallow: '/' },

      // ─── TIER 4: Default Wildcard Crawler Rules (Crawl-Budget Optimization) ───
      {
        userAgent: '*',
        allow: [
          '/',
          '/manifest.json',
          '/sitemap.xml',
          '/sitemap-index.xml',
          '/sitemaps/*',
          '/robots.txt',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          // Admin & Private internal surfaces
          '/admin/',
          '/portal/',
          '/api/',
          '/campaign/',
          '/private/',

          // Next.js internals
          '/_next/webpack-hmr',

          // Query parameters causing duplicate content
          '/*?utm_*',
          '/*?fbclid=*',
          '/*?gclid=*',
          '/*?msclkid=*',
          '/*?ref=*',
          '/*?sort=*',
          '/*?filter=*',
          '/*?search=*',
          '/*?q=*',
          '/*&*',

          // Raw internal source maps
          '/*.map',

          // Security paths (defense in depth)
          '/.env',
          '/.git/',
          '/wp-admin/',
          '/wp-login.php',
          '/xmlrpc.php',
          '/phpmyadmin/',
        ],
      },
    ],

    sitemap: [
      'https://www.krahejacorpvistas.com/sitemap.xml',
      'https://www.krahejacorpvistas.com/sitemap-index.xml',
    ],
  };
}
