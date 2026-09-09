import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  site: 'https://www.krahejacorpvistas.com',
  output: 'static',
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  integrations: [
    react(),
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    define: {
      '__dirname': '""',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'next/image': path.resolve(__dirname, './src/components/compat/NextImage.tsx'),
        'next/link': path.resolve(__dirname, './src/components/compat/NextLink.tsx'),
        'next/navigation': path.resolve(__dirname, './src/components/compat/NextNavigation.ts'),
        '@prisma/client': path.resolve(__dirname, './src/components/compat/PrismaMock.ts'),
        '@/lib/prisma': path.resolve(__dirname, './src/components/compat/PrismaMock.ts'),
      },
    },
  },
});
