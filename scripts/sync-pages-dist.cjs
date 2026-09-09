const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../.next/server/app');
const destDir = path.join(__dirname, '../dist/client');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

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

// Sync sitemap.xml and robots.txt
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

// Sync sitemap-index.xml and sitemaps/ directory
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
