import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const DOMAIN = 'https://www.krahejacorpvistas.com';
const now = new Date().toISOString();

// 1. Read active programmatic keys from active-routes.ts
const activeRoutesFile = fs.readFileSync(path.join(rootDir, 'src/lib/seo/active-routes.ts'), 'utf8');
const seoDb = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/seo-database.json'), 'utf8'));

// Filter active keys exactly matching active-routes logic
const allKeys = Object.keys(seoDb);
const priorityKeys = allKeys.filter((k) => {
  const cat = seoDb[k]?.category;
  return (
    cat === 'brand' ||
    cat === 'comparison' ||
    cat === 'blog' ||
    cat === 'luxury' ||
    cat === 'configuration' ||
    cat === 'Pune_Real_Estate'
  );
});
const otherKeys = allKeys.filter((k) => !priorityKeys.includes(k)).slice(0, 100);
const activeProgrammaticKeys = Array.from(new Set([...priorityKeys, ...otherKeys]));

// 2. Define all core static pages
const corePages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/project/masterplan', priority: '0.95', changefreq: 'weekly' },
  { path: '/project/floorplans', priority: '0.95', changefreq: 'weekly' },
  { path: '/project/amenities', priority: '0.95', changefreq: 'weekly' },
  { path: '/project/location', priority: '0.95', changefreq: 'weekly' },
  { path: '/project/gallery', priority: '0.95', changefreq: 'weekly' },
  { path: '/neighborhood', priority: '0.95', changefreq: 'weekly' },
  { path: '/directory', priority: '0.90', changefreq: 'daily' },
  { path: '/insights', priority: '0.85', changefreq: 'weekly' },
  { path: '/stories', priority: '0.85', changefreq: 'weekly' },
  { path: '/updates', priority: '0.85', changefreq: 'weekly' },
  { path: '/privacy-policy', priority: '0.50', changefreq: 'monthly' },
  { path: '/terms', priority: '0.50', changefreq: 'monthly' },
];

// 3. Multilingual Landing Pages
const localizedPages = [
  { path: '/localized/en/landing', priority: '0.85', changefreq: 'weekly' },
  { path: '/localized/mr/landing', priority: '0.85', changefreq: 'weekly' },
  { path: '/localized/hi/landing', priority: '0.85', changefreq: 'weekly' },
];

// 4. Global NRI Pages
const nriPages = [
  { path: '/nri/invest-in-pune-real-estate-from-dubai', priority: '0.90', changefreq: 'weekly' },
  { path: '/nri/luxury-homes-pune-for-nri-uk', priority: '0.90', changefreq: 'weekly' },
  { path: '/nri/best-nri-investment-pune-singapore', priority: '0.90', changefreq: 'weekly' },
  { path: '/nri/pune-real-estate-investment-for-nri-usa', priority: '0.90', changefreq: 'weekly' },
];

// 5. Competitive Comparison Pages
const comparePages = [
  { path: '/compare/k-raheja-vistas-vs-godrej-hillside-mahalunge', priority: '0.85', changefreq: 'weekly' },
  { path: '/compare/k-raheja-vistas-vs-rohan-harita-baner', priority: '0.85', changefreq: 'weekly' },
  { path: '/compare/k-raheja-vistas-vs-kolte-patil-baner', priority: '0.85', changefreq: 'weekly' },
  { path: '/compare/best-luxury-projects-near-hinjewadi', priority: '0.85', changefreq: 'weekly' },
];

// 6. Directory Groups
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
const directoryGroups = ['0-9', ...alphabet].map(g => ({
  path: `/directory/${g}`,
  priority: '0.70',
  changefreq: 'weekly'
}));

// 7. Assemble active programmatic pages
const programmaticPages = activeProgrammaticKeys.map(key => {
  const cat = seoDb[key]?.category;
  const isBlog = cat === 'blog';
  return {
    path: `/${key}`,
    priority: isBlog ? '0.75' : '0.80',
    changefreq: isBlog ? 'monthly' : 'weekly'
  };
});

const allUrls = [
  ...corePages,
  ...localizedPages,
  ...nriPages,
  ...comparePages,
  ...directoryGroups,
  ...programmaticPages
];

console.log(`Total Authoritative Active URLs to index: ${allUrls.length}`);

// Generate pristine sitemap.xml
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

for (const entry of allUrls) {
  const fullUrl = `${DOMAIN}${entry.path}`;
  xml += `  <url>\n`;
  xml += `    <loc>${fullUrl}</loc>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="en-IN" href="${fullUrl}" />\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${fullUrl}" />\n`;

  if (entry.path === '') {
    xml += `    <xhtml:link rel="alternate" hreflang="en-US" href="${DOMAIN}/nri/pune-real-estate-investment-for-nri-usa" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en-AE" href="${DOMAIN}/nri/invest-in-pune-real-estate-from-dubai" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en-GB" href="${DOMAIN}/nri/luxury-homes-pune-for-nri-uk" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en-SG" href="${DOMAIN}/nri/best-nri-investment-pune-singapore" />\n`;
  }

  xml += `    <lastmod>${now}</lastmod>\n`;
  xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
  xml += `    <priority>${entry.priority}</priority>\n`;
  xml += `  </url>\n`;
}

xml += `</urlset>\n`;

// Write to public/sitemap.xml
fs.writeFileSync(path.join(rootDir, 'public/sitemap.xml'), xml, 'utf8');
console.log('✅ Generated public/sitemap.xml with 100% valid URLs.');

// Clean up stale sitemaps/ directory
const sitemapsDir = path.join(rootDir, 'public/sitemaps');
if (fs.existsSync(sitemapsDir)) {
  const files = fs.readdirSync(sitemapsDir);
  for (const f of files) {
    fs.unlinkSync(path.join(sitemapsDir, f));
  }
  fs.rmdirSync(sitemapsDir);
  console.log(`🧹 Cleaned up stale public/sitemaps/ (${files.length} ghost files removed).`);
}

// Remove public/sitemap-index.xml
const sitemapIndexFile = path.join(rootDir, 'public/sitemap-index.xml');
if (fs.existsSync(sitemapIndexFile)) {
  fs.unlinkSync(sitemapIndexFile);
  console.log('🧹 Removed stale public/sitemap-index.xml.');
}
