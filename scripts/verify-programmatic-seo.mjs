import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('====================================================');
console.log('  Testing Programmatic SEO & Synthesizer Integrity  ');
console.log('====================================================');

// Import synthesizeSeoContent directly
const { synthesizeSeoContent } = await import('../src/lib/seo/content-synthesizer.js').catch(async () => {
  // If compiled or tsx not registered directly, test module exports
  return await import('../src/lib/seo/content-synthesizer.ts');
});

const testSlugs = [
  { slug: 'k-raheja-vistas-2-bhk-floor-plan', h1: 'K Raheja Vistas 2 BHK Luxury Deck Residence', category: 'configurations' },
  { slug: 'flats-in-mahalunge-baner-annexe', h1: 'Luxury Flats in Mahalunge Baner Annexe', category: 'location' },
  { slug: 'k-raheja-vistas-vs-godrej-hillside', h1: 'K Raheja Vistas vs Godrej Hillside Mahalunge', category: 'comparison' },
  { slug: 'mahalunge-real-estate-investment-roi', h1: 'Mahalunge Real Estate Investment & Rental ROI', category: 'investment' }
];

let passed = 0;
let failed = 0;

for (const t of testSlugs) {
  try {
    const result = synthesizeSeoContent(t.slug, t.h1, t.category);
    
    // Check 1: Specs table populated
    if (!result.specsTable || result.specsTable.length < 4) {
      throw new Error(`Specs table too short: ${result.specsTable?.length}`);
    }

    // Check 2: Commute radar populated
    if (!result.commuteRadar || result.commuteRadar.length < 5) {
      throw new Error(`Commute radar too short: ${result.commuteRadar?.length}`);
    }

    // Check 3: Financial matrix populated
    if (!result.financialMatrix || result.financialMatrix.length < 4) {
      throw new Error(`Financial matrix too short: ${result.financialMatrix?.length}`);
    }

    // Check 4: FAQs populated
    if (!result.faqs || result.faqs.length < 4) {
      throw new Error(`FAQs too short: ${result.faqs?.length}`);
    }

    // Check 5: Schemas valid
    if (!result.schemas.realEstateListing || !result.schemas.faqPage || !result.schemas.breadcrumbs) {
      throw new Error(`Missing core schemas`);
    }

    // Check 6: MahaRERA number in schema
    const schemaStr = JSON.stringify(result.schemas);
    if (!schemaStr.includes('PR1260002501530')) {
      throw new Error(`MahaRERA number PR1260002501530 missing from schemas`);
    }

    console.log(`[PASS] Slug '${t.slug}' synthesized successfully (${result.clusterType} cluster).`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] Slug '${t.slug}': ${err.message}`);
    failed++;
  }
}

console.log('----------------------------------------------------');
console.log(`Summary: ${passed} PASSED | ${failed} FAILED`);
console.log('----------------------------------------------------');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('SUCCESS: All programmatic SEO content synthesis tests PASSED!');
}
