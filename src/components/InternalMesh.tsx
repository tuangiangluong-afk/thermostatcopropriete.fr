import Link from "next/link";
import { NATIONAL_CONFIG } from "@/config/national";
import { slugify } from "@/lib/slugify";
import { SiteConfig } from "@/lib/sites-config";
import { CityConfig } from "@/lib/db";
import { getNearbyCities } from "@/lib/geo";

interface InternalMeshProps {
    city?: string;
    config?: CityConfig | SiteConfig;
}

export function InternalMesh({ city, config }: InternalMeshProps) {
    const neighborhoods = (config as any)?.neighborhoods || (config as any)?.quartiers || [];

    const rawNearby = config ? getNearbyCities(config.slug, 12) : [];
    const slugs = new Set();
    const nearbyCities = rawNearby.filter(city => {
        if (slugs.has(city.slug)) return false;
        slugs.add(city.slug);
        return true;
    });

    function getVariedAnchor(name: string, index: number) {
        const variations = [
            `Vannes thermostatiques ${name}`,
            `Artisan Thermostats connectés ${name}`,
            `chauffage collectif ${name}`,
            `Aménagement allée ${name}`,
            `Têtes thermostatiques ${name}`
        ];
        return variations[index % variations.length];
    }

    return (
        <section className="bg-neutral-900 border-t border-white/5 py-16 px-6">
            <div className="mx-auto max-w-7xl">
                <div className="grid md:grid-cols-4 gap-12 text-left">
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Nos Services</h4>
                        <ul className="space-y-3">
                            {[
                                "Pose de Vannes thermostatiques",
                                "Réalisation de Thermostats connectés",
                                "Têtes thermostatiques et Ciré",
                                "Rénovation de Terrasses",
                                "Aménagement Extérieur"
                            ].map((service, i) => (
                                <li key={i}>
                                    <a href="#simulateur" className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="bg-amber-500 rounded-full h-1 w-1 shrink-0"></span>
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Artisans à Proximité</h4>
                        <ul className="space-y-3">
                            {nearbyCities.slice(0, 6).map((city, i) => (
                                <li key={city.slug}>
                                    <Link
                                        href={`/ville/${city.slug}`}
                                        className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2"
                                    >
                                        <span className="bg-amber-500 rounded-full h-1 w-1 shrink-0"></span>
                                        {getVariedAnchor(city.city, i)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">
                            {config ? `Quartiers de ${config.city}` : "Zones d'intervention"}
                        </h4>
                        <ul className="space-y-3">
                            {neighborhoods.slice(0, 8).map((quartier: string, i: number) => (
                                <li key={quartier}>
                                    <Link href={`#simulateur`} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="bg-amber-500 rounded-full h-1 w-1 shrink-0"></span>
                                        {getVariedAnchor(quartier, i + 2)}
                                    </Link>
                                </li>
                            ))}
                            {neighborhoods.length === 0 && (
                                <li className="text-neutral-500 text-sm italic">Toute l'agglomération et environs</li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Documentation & Conseils</h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Prix du Vannes thermostatiques", href: "/guides/prix-beton-imprime-m2" },
                                { label: "Thermostats connectés vs Imprimé", href: "/guides/beton-desactive-ou-imprime" },
                                { label: "Entretien des Thermostats", href: "/guides/entretien-beton-decoratif" },
                                { label: "Tous nos guides", href: "/guides" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="bg-amber-500 rounded-full h-1 w-1 shrink-0"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}