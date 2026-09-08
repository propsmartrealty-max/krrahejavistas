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
console.log('✅ Prerendered HTML synchronized into dist/client.');
