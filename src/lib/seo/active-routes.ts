import seoDatabase from '@/data/seo-database.json';

export interface SeoPageData {
  title: string;
  description: string;
  h1: string;
  category: string;
  slug: string;
  content?: string | null;
}

const db = seoDatabase as Record<string, SeoPageData>;
const allKeys = Object.keys(db);

// High-intent clusters: brand, comparison, blog, configuration, luxury, Pune_Real_Estate
const priorityKeys = allKeys.filter((k) => {
  const cat = db[k]?.category;
  return (
    cat === 'brand' ||
    cat === 'comparison' ||
    cat === 'blog' ||
    cat === 'luxury' ||
    cat === 'configuration' ||
    cat === 'Pune_Real_Estate'
  );
});

// Top location & investment clusters
const otherKeys = allKeys.filter((k) => !priorityKeys.includes(k)).slice(0, 100);

export const activeProgrammaticKeys: string[] = Array.from(
  new Set([...priorityKeys, ...otherKeys])
);

export const activeProgrammaticKeySet: Set<string> = new Set(activeProgrammaticKeys);

export function getActivePageData(slugKey: string): SeoPageData | undefined {
  return db[slugKey];
}
