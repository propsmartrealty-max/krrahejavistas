This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses modern web fonts optimized for Cloudflare Edge CDN delivery.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Cloudflare Pages & Workers

This project is hardened for Cloudflare Edge Infrastructure using Vite, vinext, and Rust-backed Streaming HTMLRewriter.

### Build & Deploy Commands:
- `npm run build:vinext` — Compiles Next.js 16 App Router, builds Cloudflare Worker bundles, and synchronizes static assets.
- `npx wrangler deploy --config worker/wrangler.toml` — Deploys the standalone Custom Domain Edge SEO Worker.
