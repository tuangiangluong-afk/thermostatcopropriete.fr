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
            `Artisan thermostat connecté ${name}`,
            `chauffage collectif ${name}`,
            `Régulation chauffage ${name}`,
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
                            {[{"title": "Thermostat Connecté Collectif", "href": "/type/thermostat-connecte"}, {"title": "Robinets Thermostatiques Connectés", "href": "/type/robinets-thermostatiques"}, {"title": "Vannes de Régulation BMS/GTB", "href": "/type/vannes-collectives"}, {"title": "Pilotage Connecté Chaufferie", "href": "/type/pilotage-chaudiere"}, {"title": "Guides & Fiches CEE Officielles", "href": "/blog"}].map((service, i) => (
                                <li key={i}>
                                    <Link href={service.href} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="bg-emerald-500 rounded-full h-1 w-1 shrink-0"></span>
                                        {service.title}
                                    </Link>
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
                            {config ? `Zones desservies autour de ${config.city}` : "Zones d'intervention"}
                        </h4>
                        <ul className="space-y-3">
                            {neighborhoods.slice(0, 8).map((quartier: string, i: number) => (
                                <li key={quartier}>
                                    <Link href="/guides" className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
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
                                { label: "Obligation Thermostat Copropriété 2027", href: "/blog/obligation-thermostat-connecte-copropriete-2027-guide-loi" },
                                { label: "Aides CEE Fiche BAR-TH-173", href: "/blog/aides-cee-thermostat-connecte-copropriete-fiche-bar-th-173" },
                                { label: "Décret BACS Seuil 70kW 2027", href: "/blog/decret-bacs-copropriete-tertiaire-seuil-70kw-2027" },
                                { label: "Tous nos guides & articles", href: "/blog" }
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
                {/* Dossiers d'Expertise & Guides Réglementaires 2026 (Maillage d'Autorité) */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <h4 className="text-white font-bold text-sm tracking-wide uppercase">
                            Dossiers d'Expertise &amp; Guides Réglementaires 2026
                        </h4>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                        
                        <Link
                            key="/blog/thermostat-connecte-obligatoire-2027-copropriete-pieges-1-euro"
                            href="/blog/thermostat-connecte-obligatoire-2027-copropriete-pieges-1-euro"
                            className="text-neutral-300 hover:text-white transition text-xs flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5"
                        >
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                            <span className="font-medium">Thermostat Connecté Obligatoire 2027 : Pièges de l'Offre à 1 €</span>
                        </Link>
                        <Link
                            key="/blog/dimensionnement-pompe-a-chaleur"
                            href="/blog/dimensionnement-pompe-a-chaleur"
                            className="text-neutral-300 hover:text-white transition text-xs flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5"
                        >
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                            <span className="font-medium">Régulation Chauffage Collectif & Dimensionnement</span>
                        </Link>
                        <Link
                            key="/blog/remplacer-chaudiere-gaz-par-pac-verite"
                            href="/blog/remplacer-chaudiere-gaz-par-pac-verite"
                            className="text-neutral-300 hover:text-white transition text-xs flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5"
                        >
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                            <span className="font-medium">Remplacement Chaudière Collective Gaz</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}