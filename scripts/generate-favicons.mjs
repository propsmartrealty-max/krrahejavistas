import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const svgSourcePath = path.join(rootDir, 'public/assets/k-raheja-corp-logo.svg');
const svgContent = fs.readFileSync(svgSourcePath, 'utf8');

// Extract K Raheja Corp architectural monogram emblem vector path
const match = svgContent.match(/<path d=\"(M 2470\.622[^\"]+)\"/);
if (!match) {
  throw new Error('K Raheja Corp emblem path not found in ' + svgSourcePath);
}
const pathD = match[1];

// Emblem bounding box: width = 1403.188, height = 1351.0
// Scale factor 0.308 gives ideal padding (~40px) inside 512x512 rounded squircle
const scale = 0.308;
const targetW = 1403.188 * scale;
const targetH = 1351.0 * scale;
const tx = ((512 - targetW) / 2).toFixed(2);
const ty = ((512 - targetH) / 2).toFixed(2);

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Luxury Midnight Sapphire & Obsidian Radial Base -->
    <radialGradient id="bgGrad" cx="50%" cy="30%" r="72%">
      <stop offset="0%" stop-color="#182338"/>
      <stop offset="45%" stop-color="#0a101d"/>
      <stop offset="100%" stop-color="#04060c"/>
    </radialGradient>

    <!-- Warm Ambient Center Glow -->
    <radialGradient id="centerAura" cx="50%" cy="52%" r="42%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
    </radialGradient>

    <!-- Champagne to Burnished Gold Hairline Bezel -->
    <linearGradient id="goldBezel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF2D6" stop-opacity="0.95"/>
      <stop offset="30%" stop-color="#F5DC9C" stop-opacity="0.8"/>
      <stop offset="70%" stop-color="#C5A880" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#7D5E21" stop-opacity="0.35"/>
    </linearGradient>

    <!-- Masterpiece Metallic Gold Emblem Gradient -->
    <linearGradient id="emblemGold" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="12%" stop-color="#FFF4D4"/>
      <stop offset="32%" stop-color="#F7DE9E"/>
      <stop offset="62%" stop-color="#D4AF37"/>
      <stop offset="85%" stop-color="#B58A28"/>
      <stop offset="100%" stop-color="#7A5812"/>
    </linearGradient>

    <!-- Sub-pixel Drop Shadow for High-DPI Depth -->
    <filter id="emblemShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#000000" flood-opacity="0.7"/>
      <feDropShadow dx="0" dy="1" stdDeviation="2.5" flood-color="#FFE5A3" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Luxury App Squircle Container with Precision Gold Bezel -->
  <rect x="6" y="6" width="500" height="500" rx="112" ry="112" fill="url(#bgGrad)" stroke="url(#goldBezel)" stroke-width="8"/>

  <!-- Subtle Center Illumination -->
  <circle cx="256" cy="266" r="200" fill="url(#centerAura)"/>

  <!-- K Raheja Corp Soaring Architectural Emblem -->
  <g transform="translate(${tx}, ${ty}) scale(${scale}) translate(-1778.851, -837.0)" filter="url(#emblemShadow)">
    <path d="${pathD}" fill="url(#emblemGold)" fill-rule="evenodd" />
  </g>
</svg>`;

const publicDir = path.join(rootDir, 'public');

// 1. Write favicon.svg
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);
console.log('✅ Created public/favicon.svg');

// 2. Generate PNG sizes using Sharp
const svgBuf = Buffer.from(faviconSvg);

await sharp(svgBuf).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));
console.log('✅ Created public/icon-512.png');

await sharp(svgBuf).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192.png'));
console.log('✅ Created public/icon-192.png');

await sharp(svgBuf).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
console.log('✅ Created public/apple-touch-icon.png');

await sharp(svgBuf).resize(48, 48).png().toFile(path.join(publicDir, 'icon.png'));
console.log('✅ Created public/icon.png (48x48)');

await sharp(svgBuf).resize(32, 32).png().toFile(path.join(publicDir, 'icon-32.png'));
console.log('✅ Created public/icon-32.png (32x32)');

await sharp(svgBuf).resize(16, 16).png().toFile(path.join(publicDir, 'icon-16.png'));
console.log('✅ Created public/icon-16.png (16x16)');

// 3. Generate multi-resolution favicon.ico via Python Pillow
execSync(`python3 -c "
from PIL import Image
import os

public_dir = '${publicDir}'
im16 = Image.open(os.path.join(public_dir, 'icon-16.png'))
im32 = Image.open(os.path.join(public_dir, 'icon-32.png'))
im48 = Image.open(os.path.join(public_dir, 'icon.png'))
im48.save(os.path.join(public_dir, 'favicon.ico'), format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
print('✅ Created public/favicon.ico (multi-res 16, 32, 48)')
"`);
