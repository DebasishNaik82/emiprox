import { MetadataRoute } from 'next';
import { CALCULATOR_DATA, GUIDE_DATA } from '@/lib/seo-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://emiprox.vercel.app';
  
  const calculatorSlugs = Object.keys(CALCULATOR_DATA);
  const guideSlugs = Object.keys(GUIDE_DATA);
  const trustPages = ['about', 'contact', 'privacy', 'terms', 'disclaimer', 'methodology', 'sitemap'];

  const calcEntries = calculatorSlugs.map((slug) => ({
    url: `${baseUrl}/calculators/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const guideEntries = guideSlugs.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const trustEntries = trustPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...calcEntries,
    ...guideEntries,
    ...trustEntries,
  ];
}
