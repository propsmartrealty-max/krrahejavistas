const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../.next/server/app');
const nextStaticDir = path.join(__dirname, '../.next/static');
const publicDir = path.join(__dirname, '../public');
const destDir = path.join(__dirname, '../dist/client');
const destStaticDir = path.join(destDir, '_next/static');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Copy public assets into dist/client (favicon, icons, images, robots, manifest)
console.log('🔄 Syncing public directory assets into dist/client...');
copyRecursive(publicDir, destDir);
console.log('✅ Public assets (favicon, icons, images, manifest) synchronized.');

// 2. Copy Next.js static assets into dist/client/_next/static (CSS, JS chunks, fonts, media)
console.log('🔄 Syncing .next/static CSS, chunks & fonts into dist/client/_next/static...');
copyRecursive(nextStaticDir, destStaticDir);
console.log('✅ Next.js static chunks, CSS & media files synchronized.');

// 3. Copy prerendered HTML files
function copyHtmlFiles(dir, relative = '') {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relative, entry.name);

    if (entry.isDirectory()) {
      copyHtmlFiles(fullPath, relPath);
    } else if (entry.name.endsWith('.html')) {
      const targetFile = path.join(destDir, relPath);
      const targetSubDir = path.dirname(targetFile);

      if (!fs.existsSync(targetSubDir)) {
        fs.mkdirSync(targetSubDir, { recursive: true });
      }

      fs.copyFileSync(fullPath, targetFile);

      // Create clean-URL directory fallback: e.g. project/floorplans.html -> project/floorplans/index.html
      const baseName = entry.name.replace(/\.html$/, '');
      if (baseName !== 'index' && baseName !== '404' && !baseName.startsWith('_')) {
        const cleanDir = path.join(destDir, relative, baseName);
        if (!fs.existsSync(cleanDir)) {
          fs.mkdirSync(cleanDir, { recursive: true });
        }
        fs.copyFileSync(fullPath, path.join(cleanDir, 'index.html'));
      }

      // Handle 404
      if (baseName === '_not-found') {
        fs.copyFileSync(fullPath, path.join(destDir, '404.html'));
      }
    }
  }
}

console.log('🔄 Syncing Next.js prerendered HTML into Cloudflare Pages dist/client...');
copyHtmlFiles(srcDir);

// 4. Sync sitemap.xml and robots.txt
const sitemapBody = path.join(srcDir, 'sitemap.xml.body');
if (fs.existsSync(sitemapBody)) {
  fs.copyFileSync(sitemapBody, path.join(destDir, 'sitemap.xml'));
  fs.copyFileSync(sitemapBody, path.join(__dirname, '../public/sitemap.xml'));
  console.log('✅ sitemap.xml synchronized to dist/client & public.');
}

const robotsBody = path.join(srcDir, 'robots.txt.body');
if (fs.existsSync(robotsBody)) {
  fs.copyFileSync(robotsBody, path.join(destDir, 'robots.txt'));
  fs.copyFileSync(robotsBody, path.join(__dirname, '../public/robots.txt'));
  console.log('✅ robots.txt synchronized to dist/client & public.');
}

// 5. Sync sitemap-index.xml and sitemaps/ directory
const sitemapIndex = path.join(__dirname, '../public/sitemap-index.xml');
if (fs.existsSync(sitemapIndex)) {
  fs.copyFileSync(sitemapIndex, path.join(destDir, 'sitemap-index.xml'));
  console.log('✅ sitemap-index.xml synchronized to dist/client.');
}

const publicSitemapsDir = path.join(__dirname, '../public/sitemaps');
const destSitemapsDir = path.join(destDir, 'sitemaps');
if (fs.existsSync(publicSitemapsDir)) {
  if (!fs.existsSync(destSitemapsDir)) {
    fs.mkdirSync(destSitemapsDir, { recursive: true });
  }
  const sitemapFiles = fs.readdirSync(publicSitemapsDir);
  for (const file of sitemapFiles) {
    if (file.endsWith('.xml')) {
      fs.copyFileSync(path.join(publicSitemapsDir, file), path.join(destSitemapsDir, file));
    }
  }
  console.log(`✅ ${sitemapFiles.length} child sitemaps synchronized to dist/client/sitemaps.`);
}

console.log('✅ Prerendered HTML & SEO files fully synchronized.');
