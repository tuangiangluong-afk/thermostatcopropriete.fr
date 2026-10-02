import { MetadataRoute } from 'next';
import { NATIONAL_TARGETS } from '@/config/national-targets';
import { slugify } from '@/lib/slugify';
import { getAllGuides } from '@/lib/mdx';
import { OPERATORS } from '@/data/operators';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.thermostatcopropriete.fr';

    // 1. CORE STATIC PAGES & HUBS
    const coreRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/operateurs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/marques`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/comparatifs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/dpe-collectif`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/guides`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/mentions-legales`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/cgv`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ];

    // 2. OPERATOR ROUTES
    const operatorRoutes: MetadataRoute.Sitemap = OPERATORS.map((op) => ({
        url: `${baseUrl}/operateurs/${op.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // 3. PARTNER CITIES
    const cityRoutes: MetadataRoute.Sitemap = NATIONAL_TARGETS.map((target) => ({
        url: `${baseUrl}/ville/${slugify(target.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 4. BLOG GUIDES (Dynamic)
    const guides = getAllGuides();
    const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: new Date(guide.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        ...coreRoutes,
        ...operatorRoutes,
        ...cityRoutes,
        ...guideRoutes,
    ].map(item => ({
        ...item,
        url: item.url.toLowerCase()
    }));
}
