import Link from "next/link";
import { SITES } from "@/lib/sites-config";
import { CityConfig } from "@/lib/db";
import { SiteConfig } from "@/lib/sites-config";
import { getTheme } from "@/lib/theme";
import { Mail } from "lucide-react";

interface FooterProps {
    config: CityConfig | SiteConfig;
}

export function Footer({ config }: FooterProps) {
    if (!config) return null;

    const neighborhoods = (config as any).neighborhoods || (config as any).quartiers || [];
    const theme = getTheme(config.slug);

    const uniqueSites = Array.from(
        new Map(Object.values(SITES).map(site => [site.slug, site])).values()
    );

    const sitesByRegion = uniqueSites
        .filter(site => site.slug !== 'home' && site.slug !== 'expertbetondecoratif.com' && site.slug !== 'www.expertbetondecoratif.com')
        .reduce((acc, site) => {
            const region = site.region || 'Autres';
            if (!acc[region]) acc[region] = [];
            acc[region].push(site);
            return acc;
        }, {} as Record<string, SiteConfig[]>);

    const getGlobalDiverseAnchor = (cityName: string, index: number) => {
        const variations = ["Béton désactivé ${cityName}","Béton imprimé ${cityName}","Terrasse béton ${cityName}","Artisan béton ${cityName}","Devis béton décoratif ${cityName}"];
        return variations[index % variations.length].replace(/\${cityName}/g, cityName);
    };

    return (
        <footer className="bg-neutral-900 border-t border-white/10 py-12 text-neutral-400">
            <div className="container mx-auto px-4 text-center">
                <h4 className="text-white font-bold mb-4">À propos de {config.name}</h4>
                <p className="max-w-2xl mx-auto text-sm mb-8">
                    {config.name} est le comparateur n°1 pour la pose de béton décoratif et désactivé à {config.city}. Nous sélectionnons des artisans locaux hautement qualifiés et assurés en décennale.
                </p>

                <div className="inline-flex items-center gap-2 bg-slate-500/10 border-slate-500/20 text-slate-400 px-4 py-2 rounded-full mb-8">
                    <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                    <span className="font-bold text-sm">Réseau national d'artisans certifiés Décennale</span>
                </div>

                <div className="border-t border-white/10 pt-12 mt-12">
                    <div className="grid md:grid-cols-4 gap-8 text-left max-w-7xl mx-auto">
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">
                                {config.slug === 'home' ? 'Zones d&apos;Intervention' : 'Zones d&apos;Intervention'}
                            </h5>
                            <ul className="space-y-3 text-sm">
                                {config.slug === 'home' ? (
                                    <>
                                        
            <li><Link href="/ville/paris" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-slate-500 transition"></span>Paris / Île-de-France</Link></li>
            <li><Link href="/ville/lyon" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-slate-500 transition"></span>Lyon / Rhône-Alpes</Link></li>
            <li><Link href="/ville/marseille" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-slate-500 transition"></span>Marseille / PACA</Link></li>
            <li><Link href="/ville/bordeaux" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-slate-500 transition"></span>Bordeaux / Aquitaine</Link></li>
            <li><Link href="/ville/toulouse" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-slate-500 transition"></span>Toulouse / Occitanie</Link></li>
        
                                    </>
                                ) : (
                                    <>
                                        {neighborhoods.slice(0, 6).map((zone: string) => (
                                            <li key={zone}>
                                                <Link href={`#simulateur`} className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                                    <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                                    {zone}
                                                </Link>
                                            </li>
                                        ))}
                                        {neighborhoods.length === 0 && (
                                            <li className="text-neutral-500 italic">Tout {config.city}</li>
                                        )}
                                    </>
                                )}
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">
                                Notre Réseau
                            </h5>
                            <ul className="space-y-3 text-sm">
                                {(() => {
                                    let nearbySites = [];
                                    const currentSite = config as SiteConfig;

                                    if (config.slug === 'home') {
                                        const topSlugs = ["paris", "marseille", "lyon", "toulouse"];
                                        nearbySites = uniqueSites.filter(s => topSlugs.includes(s.slug));
                                    } else {
                                        const sameDept = uniqueSites.filter(s => s.slug !== 'home' && s.slug !== currentSite.slug && s.department === currentSite.department);
                                        const sameRegion = uniqueSites.filter(s => s.slug !== 'home' && s.slug !== currentSite.slug && s.region === currentSite.region && s.department !== currentSite.department);

                                        const combined = [...sameDept, ...sameRegion, ...uniqueSites.filter(s => s.slug !== 'home' && s.slug !== currentSite.slug)];
                                        const seen = new Set();
                                        for (const s of combined) {
                                            if (!seen.has(s.slug) && nearbySites.length < 5) {
                                                seen.add(s.slug);
                                                nearbySites.push(s);
                                            }
                                        }
                                    }

                                    const getVariedFooterAnchor = (cityName: string, index: number) => {
                                        const variations = ["Béton désactivé ${cityName}","Béton imprimé ${cityName}","Terrasse béton ${cityName}","Artisan béton ${cityName}","Devis béton décoratif ${cityName}"];
                                        return variations[index % variations.length].replace(/\${cityName}/g, cityName);
                                    };

                                    return nearbySites.map((site, index) => (
                                        <li key={site.slug}>
                                            <Link
                                                href={`/ville/${site.slug}`}
                                                className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"
                                            >
                                                <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                                {getVariedFooterAnchor(site.city, index)}
                                            </Link>
                                        </li>
                                    ));
                                })()}
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Nos Guides</h5>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link href="/guides/prix-beton-desactive-m2" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Prix du Béton Désactivé 2026
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides/avantages-beton-imprime" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Avantages du Béton Imprimé
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides/idees-terrasse-beton-decoratif" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Idées de terrasses en béton
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Tous nos guides
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Rejoindre le réseau
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Finitions</h5>
                            <ul className="space-y-3 text-sm mb-8">
                                {["Béton Désactivé","Béton Imprimé","Béton Lissé","Béton Balayé"].map((brand) => (
                                    <li key={brand}>
                                        <Link href={`#simulateur`} className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                            <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                            Pose {brand}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Contact</h5>
                            <ul className="space-y-6">
                                <li>
                                    <Link href="/contact" className="flex items-start gap-4 text-neutral-400 hover:text-white transition group text-left">
                                        <div className={`p-2 rounded-lg bg-white/5 group-hover:${theme.classes.bg} transition group-hover:text-neutral-900`}>
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <span className="block text-white font-bold text-lg">{(config as any).email || 'contact@expertbetondecoratif.com'}</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-12 mt-4 text-left max-w-7xl mx-auto mb-16 px-4 md:px-0">
                    <h5 className="text-white font-bold mb-8 text-xl tracking-tight text-center md:text-left">
                        Notre Réseau National d&apos;Artisans Béton Décoratif
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {Object.entries(sitesByRegion).map(([region, sites]) => (
                            <div key={region} className="space-y-4">
                                <h6 className="text-white/80 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-slate-500/50"></span>
                                    {region}
                                </h6>
                                <ul className="space-y-3 text-sm">
                                    {sites.map((site, index) => (
                                        <li key={site.slug}>
                                            <Link
                                                href={`/ville/${site.slug}`}
                                                className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"
                                            >
                                                <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                                {getGlobalDiverseAnchor(site.city, index)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-xs border-t border-white/10 pt-8">
                    &copy; {new Date().getFullYear()} {config.name} - Tous droits réservés.
                </div>
                <div className="flex justify-center gap-4 text-xs mt-4 mb-2">
                    <Link href="/mentions-legales" className="text-neutral-500 hover:text-white transition-colors">Mentions Légales</Link>
                    <span className="text-neutral-700">•</span>
                    <Link href="/cgv" className="text-neutral-500 hover:text-white transition-colors">CGV</Link>
                </div>
            </div>
        </footer>
    );
}
