export interface SiteConfig {
    slug: string;
    domain: string;
    aliases?: string[];
    city: string;
    postalCode: string;
    department: string;
    region: string;
    name: string;
    phoneNumber: string;
    email: string;
    targetType: 'SOLAR' | 'MIXED' | 'PMP' | 'CONCRETE';
    priceRange: 'STANDARD' | 'PREMIUM' | 'LUXE';
    theme: 'premium' | 'trust';
    heroImage: string;
    description: string;
    meta: {
        title: string;
        description: string;
    };
    certifications: string[];
    aidesDisponibles: string[];
    features: string[];
    localKeywords: string[];
    quartiers: string[];
    coproprietes: string[];
    centresCommerciaux: string[];
    ga_id?: string;
    gtm_id?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

const TEMPLATE_CERTIFICATIONS = [
    "Artisans Qualifiés Décennale",
    "Matériaux Certifiés NF",
    "Respect des normes DTU"
];
const TEMPLATE_AIDES = [
    "Devis gratuits sous 48h",
    "Assurance décennale incluse"
];
const TEMPLATE_FEATURES = [
    "Grand choix de finitions",
    "Haute durabilité",
    "Accès camion toupie étudié"
];

const _hubConfig: SiteConfig = {
    slug: "home",
    domain: "expertbetondecoratif.com",
    city: "France",
    postalCode: "",
    department: "",
    region: "National",
    name: "Expert Béton Décoratif",
    phoneNumber: "01 84 80 00 00",
    email: "contact@expertbetondecoratif.com",
    targetType: "CONCRETE",
    priceRange: 'STANDARD',
    theme: 'premium',
    heroImage: "/images/generated/concrete-hero.webp",
    description: "Trouvez un artisan qualifié pour la réalisation de vos dalles, terrasses et allées de garage en béton décoratif en France.",
    meta: {
        title: "Expert Béton Décoratif | Devis Béton Désactivé & Imprimé",
        description: "Trouvez un artisan qualifié pour la réalisation de vos dalles, terrasses et allées de garage en béton décoratif en France."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: [
    "pose beton desactive",
    "beton imprime prix m2"
],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    coordinates: { lat: 46.22, lng: 2.21 }
};

export const SITES: Record<string, SiteConfig> = {
    "paris": {
        ..._hubConfig,
        slug: "paris",
        city: "Paris",
        postalCode: "75000",
        region: "Île-de-France",
        department: "75",
        coordinates: { lat: 48.8566, lng: 2.3522 }
    },
    "marseille": {
        ..._hubConfig,
        slug: "marseille",
        city: "Marseille",
        postalCode: "13000",
        region: "Provence-Alpes-Côte d'Azur",
        department: "13",
        coordinates: { lat: 43.2965, lng: 5.3698 }
    },
    "lyon": {
        ..._hubConfig,
        slug: "lyon",
        city: "Lyon",
        postalCode: "69000",
        region: "Auvergne-Rhône-Alpes",
        department: "69",
        coordinates: { lat: 45.764, lng: 4.8357 }
    },
    "toulouse": {
        ..._hubConfig,
        slug: "toulouse",
        city: "Toulouse",
        postalCode: "31000",
        region: "Occitanie",
        department: "31",
        coordinates: { lat: 43.6047, lng: 1.4442 }
    },
    "nice": {
        ..._hubConfig,
        slug: "nice",
        city: "Nice",
        postalCode: "06000",
        region: "Provence-Alpes-Côte d'Azur",
        department: "06",
        coordinates: { lat: 43.7102, lng: 7.262 }
    },
    "nantes": {
        ..._hubConfig,
        slug: "nantes",
        city: "Nantes",
        postalCode: "44000",
        region: "Pays de la Loire",
        department: "44",
        coordinates: { lat: 47.2184, lng: -1.5536 }
    },
    "montpellier": {
        ..._hubConfig,
        slug: "montpellier",
        city: "Montpellier",
        postalCode: "34000",
        region: "Occitanie",
        department: "34",
        coordinates: { lat: 43.6108, lng: 3.8767 }
    },
    "strasbourg": {
        ..._hubConfig,
        slug: "strasbourg",
        city: "Strasbourg",
        postalCode: "67000",
        region: "Grand Est",
        department: "67",
        coordinates: { lat: 48.5734, lng: 7.7521 }
    },
    "bordeaux": {
        ..._hubConfig,
        slug: "bordeaux",
        city: "Bordeaux",
        postalCode: "33000",
        region: "Nouvelle-Aquitaine",
        department: "33",
        coordinates: { lat: 44.8378, lng: -0.5792 }
    },
    "lille": {
        ..._hubConfig,
        slug: "lille",
        city: "Lille",
        postalCode: "59000",
        region: "Hauts-de-France",
        department: "59",
        coordinates: { lat: 50.6292, lng: 3.0573 }
    },
    "rennes": {
        ..._hubConfig,
        slug: "rennes",
        city: "Rennes",
        postalCode: "35000",
        region: "Bretagne",
        department: "35",
        coordinates: { lat: 48.1173, lng: -1.6778 }
    },
    "reims": {
        ..._hubConfig,
        slug: "reims",
        city: "Reims",
        postalCode: "51000",
        region: "Grand Est",
        department: "51",
        coordinates: { lat: 49.2583, lng: 4.0317 }
    },
    "toulon": {
        ..._hubConfig,
        slug: "toulon",
        city: "Toulon",
        postalCode: "83000",
        region: "Provence-Alpes-Côte d'Azur",
        department: "83",
        coordinates: { lat: 43.1242, lng: 5.928 }
    },
    "saint-tienne": {
        ..._hubConfig,
        slug: "saint-tienne",
        city: "Saint-Étienne",
        postalCode: "42000",
        region: "Auvergne-Rhône-Alpes",
        department: "42",
        coordinates: { lat: 45.4397, lng: 4.3872 }
    },
    "le-havre": {
        ..._hubConfig,
        slug: "le-havre",
        city: "Le Havre",
        postalCode: "76600",
        region: "Normandie",
        department: "76",
        coordinates: { lat: 49.4944, lng: 0.1079 }
    },
    "dijon": {
        ..._hubConfig,
        slug: "dijon",
        city: "Dijon",
        postalCode: "21000",
        region: "Bourgogne-Franche-Comté",
        department: "21",
        coordinates: { lat: 47.322, lng: 5.0415 }
    },
    "grenoble": {
        ..._hubConfig,
        slug: "grenoble",
        city: "Grenoble",
        postalCode: "38000",
        region: "Auvergne-Rhône-Alpes",
        department: "38",
        coordinates: { lat: 45.1885, lng: 5.7245 }
    },
    "angers": {
        ..._hubConfig,
        slug: "angers",
        city: "Angers",
        postalCode: "49000",
        region: "Pays de la Loire",
        department: "49",
        coordinates: { lat: 47.4784, lng: -0.5632 }
    },
    "villeurbanne": {
        ..._hubConfig,
        slug: "villeurbanne",
        city: "Villeurbanne",
        postalCode: "69100",
        region: "Auvergne-Rhône-Alpes",
        department: "69",
        coordinates: { lat: 45.7667, lng: 4.8803 }
    },
    "n-mes": {
        ..._hubConfig,
        slug: "n-mes",
        city: "Nîmes",
        postalCode: "30000",
        region: "Occitanie",
        department: "30",
        coordinates: { lat: 43.8367, lng: 4.3601 }
    },
    "expertbetondecoratif.com": _hubConfig,
    "www.expertbetondecoratif.com": _hubConfig,
    "home": _hubConfig
};

export const getSiteConfig = (hostnameOrSlug: string): SiteConfig | null => {
    let hostname = hostnameOrSlug.split(':')[0];
    hostname = hostname.replace(/^www\./, '');
    const bySlug = Object.values(SITES).find(s => s.slug === hostname);
    if (bySlug) return bySlug;
    if (SITES[hostname]) return SITES[hostname];
    return _hubConfig;
};

export const getSiteBySlug = (slug: string): SiteConfig | null => Object.values(SITES).find(s => s.slug === slug) || null;
export const getSatelliteSites = (): SiteConfig[] => [];
export const isMainHub = (hostname: string): boolean => true;
export const getHubConfig = (): SiteConfig => _hubConfig;
