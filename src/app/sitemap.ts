import { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/mdx';
import { CITIES } from '@/lib/db';
import { slugify } from '@/lib/slugify';
import { createClient } from '@supabase/supabase-js';
import { THERMO_BRANDS } from '@/data/thermo-brands';
import { THERMO_TYPES } from '@/data/thermo-types';
import { THERMO_TAILLES } from '@/data/thermo-tailles';
import { THERMO_COMPARATIFS } from '@/data/thermo-comparatifs';

// Base URL (Hub)
const BASE_URL = 'https://www.thermostatcopropriete.fr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const guides = getAllGuides();

    // 1. Static Routes
    const routes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/llms.txt`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/openapi.json`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/guides`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        // Legal pages
        {
            url: `${BASE_URL}/mentions-legales`,
            lastModified: new Date('2026-03-01'),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/cgv`,
            lastModified: new Date('2026-03-01'),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // 2. Guide Routes (static MDX)
    const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
        url: `${BASE_URL}/guides/${guide.slug}`,
        lastModified: new Date(guide.date),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 3. Blog Routes (dynamic from Supabase)
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (supabaseUrl && supabaseKey) {
            const supabase = createClient(supabaseUrl, supabaseKey);
            const { data: blogPosts } = await supabase
                .from('blog_posts')
                .select('slug, published_at, updated_at')
                .eq('status', 'published')
                .order('published_at', { ascending: false });

            if (blogPosts) {
                blogRoutes = blogPosts.map((post) => ({
                    url: `${BASE_URL}/blog/${post.slug}`,
                    lastModified: new Date(post.updated_at || post.published_at),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                }));
            }
        }
    } catch (e) {
        console.warn('[Sitemap] Failed to fetch blog posts:', e);
    }

    // 4. City Routes (From CITIES Config)
    const uniqueSites = new Map();
    Object.values(CITIES).forEach(site => {
        if (site.slug !== 'home' && site.slug !== 'thermostatcopropriete.fr' && site.slug !== 'www.thermostatcopropriete.fr') {
            uniqueSites.set(site.slug, site);
        }
    });

    const cityRoutes: MetadataRoute.Sitemap = Array.from(uniqueSites.values()).map((site) => ({
        url: `${BASE_URL}/ville/${slugify(site.city).toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    const cityMarqueRoutes: MetadataRoute.Sitemap = Array.from(uniqueSites.values()).flatMap((site) => {
        const citySlug = slugify(site.city).toLowerCase();
        return THERMO_BRANDS.map((m) => ({ url: `${BASE_URL}/ville/${citySlug}/${m.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 }));
    });
    const marquesRoutes = THERMO_BRANDS.map((m) => ({ url: `${BASE_URL}/marques/${m.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 }));
    const typeRoutes = THERMO_TYPES.map((t) => ({ url: `${BASE_URL}/type/${t.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 }));
    const tailleRoutes = THERMO_TAILLES.map((t) => ({ url: `${BASE_URL}/taille/${t.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 }));
    const comparatifRoutes = THERMO_COMPARATIFS.map((c) => ({ url: `${BASE_URL}/comparatif/${c.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.85 }));

    return [...routes, ...guideRoutes, ...blogRoutes, ...cityRoutes, ...cityMarqueRoutes, ...marquesRoutes, ...typeRoutes, ...tailleRoutes, ...comparatifRoutes].map(item => ({
        ...item,
        url: item.url.toLowerCase()
    }));
}
