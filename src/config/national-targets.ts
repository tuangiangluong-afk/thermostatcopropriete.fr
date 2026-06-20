// ========================================
// NATIONAL TARGETS - LOCALIZED ZONES
// ========================================

export interface NationalTarget {
    slug: string;
    name: string;
    heroTitle: string;
    geo: { lat: number; lng: number };
    price_start: number;
    top_places: string[];
    zip: string;
    tier: 'BIG5' | 'GOLDEN' | 'HUB' | 'STRATEGIC';
    heroImage?: string;
}

export const NATIONAL_TARGETS: NationalTarget[] = [
    {
        "slug": "paris",
        "name": "Paris",
        "heroTitle": "Béton Décoratif",
        "geo": {
            "lat": 48.856,
            "lng": 2.352
        },
        "price_start": 75,
        "top_places": ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        "zip": "75000",
        "tier": "BIG5",
        "heroImage": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2672&auto=format&fit=crop"
    },
    {
        "slug": "lyon",
        "name": "Lyon",
        "heroTitle": "Béton Décoratif",
        "geo": {
            "lat": 45.764,
            "lng": 4.835
        },
        "price_start": 75,
        "top_places": ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        "zip": "69000",
        "tier": "BIG5",
        "heroImage": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2672&auto=format&fit=crop"
    },
    {
        "slug": "marseille",
        "name": "Marseille",
        "heroTitle": "Béton Décoratif",
        "geo": {
            "lat": 43.296,
            "lng": 5.369
        },
        "price_start": 75,
        "top_places": ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        "zip": "13000",
        "tier": "BIG5",
        "heroImage": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2672&auto=format&fit=crop"
    },
    {
        "slug": "nice",
        "name": "Nice",
        "heroTitle": "Béton Décoratif",
        "geo": {
            "lat": 43.71,
            "lng": 7.262
        },
        "price_start": 75,
        "top_places": ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        "zip": "06000",
        "tier": "GOLDEN",
        "heroImage": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2672&auto=format&fit=crop"
    },
    {
        "slug": "bordeaux",
        "name": "Bordeaux",
        "heroTitle": "Béton Décoratif",
        "geo": {
            "lat": 44.837,
            "lng": -0.579
        },
        "price_start": 75,
        "top_places": ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        "zip": "33000",
        "tier": "GOLDEN",
        "heroImage": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2672&auto=format&fit=crop"
    },
    {
        "slug": "toulouse",
        "name": "Toulouse",
        "heroTitle": "Béton Décoratif",
        "geo": {
            "lat": 43.604,
            "lng": 1.444
        },
        "price_start": 75,
        "top_places": ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        "zip": "31000",
        "tier": "GOLDEN",
        "heroImage": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2672&auto=format&fit=crop"
    },
    {
        "slug": "lille",
        "name": "Lille",
        "heroTitle": "Béton Décoratif",
        "geo": {
            "lat": 50.629,
            "lng": 3.057
        },
        "price_start": 75,
        "top_places": ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        "zip": "59000",
        "tier": "STRATEGIC",
        "heroImage": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2672&auto=format&fit=crop"
    },
    {
        "slug": "nantes",
        "name": "Nantes",
        "heroTitle": "Béton Décoratif",
        "geo": {
            "lat": 47.218,
            "lng": -1.553
        },
        "price_start": 75,
        "top_places": ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        "zip": "44000",
        "tier": "STRATEGIC",
        "heroImage": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2672&auto=format&fit=crop"
    },
    {
        "slug": "strasbourg",
        "name": "Strasbourg",
        "heroTitle": "Béton Décoratif",
        "geo": {
            "lat": 48.573,
            "lng": 7.752
        },
        "price_start": 75,
        "top_places": ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        "zip": "67000",
        "tier": "STRATEGIC",
        "heroImage": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2672&auto=format&fit=crop"
    },
    {
        "slug": "montpellier",
        "name": "Montpellier",
        "heroTitle": "Béton Décoratif",
        "geo": {
            "lat": 43.61,
            "lng": 3.876
        },
        "price_start": 75,
        "top_places": ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        "zip": "34000",
        "tier": "STRATEGIC",
        "heroImage": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2672&auto=format&fit=crop"
    }
];

export function getTargetBySlug(slug: string): NationalTarget | undefined {
    return NATIONAL_TARGETS.find(t => t.slug === slug);
}

import { CityConfig } from "@/lib/db";

export function getTargetAsCityConfig(slug: string): CityConfig | undefined {
    const target = NATIONAL_TARGETS.find(t => t.slug === slug);
    if (!target) return undefined;

    const priceDisplay = "€" + target.price_start + (target.price_start < 500 ? "/m²" : "");
    const priceDesc = "Devis et Déplacement gratuits";

    return {
        slug: target.slug,
        city: target.name,
        name: `${target.heroTitle} ${target.name}`,
        domain: `${target.slug}.localhost`, // rewrite target
        heroImage: target.heroImage || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2672&auto=format&fit=crop",
        postalCode: target.zip,
        department: target.zip.substring(0, 2),
        region: "France",
        description: `${target.heroTitle} ${target.name} (${target.zip}).`,
        geo: target.geo,
        features: [
            "Devis Gratuit",
            "Résistance Garantie",
            "Artisans Qualifiés",
            "Garantie Décennale",
            "Intervention Rapide"
        ],
        stations: [],
        hospitals: [],
        neighborhoods: target.top_places,
        points_of_interest: {
            hotels: [],
            nightlife: [],
            monuments: target.top_places,
            parking_difficulty: "Variable"
        },
        pricing: {
            base: priceDisplay,
            description: priceDesc,
            km: 0
        },
        phoneNumber: "01 84 80 00 00",
        email: "contact@expertbetondecoratif.com",
        type: "PARTNER",
        targetType: "MIXED",
        meta: {
            title: `${target.heroTitle} ${target.name} | ${priceDisplay}`,
            description: `${target.heroTitle} ${target.name} ${target.zip}.`
        }
    };
}
