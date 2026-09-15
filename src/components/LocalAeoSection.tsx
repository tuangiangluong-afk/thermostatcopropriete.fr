import Link from "next/link";
import { CheckCircle, ShieldCheck, Clock, Award, Euro, ArrowRight, ChevronRight, FileText, Landmark, Building2 } from "lucide-react";
import type { CityConfig } from "@/lib/db";
import type { PseoPageContent } from "@/lib/pseo";

interface LocalAeoSectionProps {
    site: CityConfig;
    /** Contenu pSEO local (faits vérifiables, contraintes, délais) */
    pseo?: PseoPageContent;
}

const pricingMatrix = [{"name": "Pack Thermostats Connectés (Par Logement)", "usage": "Têtes électroniques intelligentes par radiateur", "price": "350€ - 650€ / lot", "aid": "Prime CEE Coup de Pouce 100%", "net": "0€ reste à charge"}, {"name": "Régulation Centrale & Sonde d'ambiance", "usage": "Pilotage chaufferie & équilibrage colonnes", "price": "1 200€ - 2 800€", "aid": "Financement CEE éligible", "net": "0€ reste à charge"}, {"name": "Gestion Technique Bâtiment (GTB) Copro", "usage": "Suivi conso en temps réel pour le syndic", "price": "Sur devis", "aid": "Primes CEE Bonifiées", "net": "Sur mesure"}, {"name": "Maintenance & Accompagnement résidents", "usage": "Remplacement piles & hotline dédiée", "price": "Inclus contrat CEE", "aid": "Garantie matériel 5 ans", "net": "Inclus"}];
const steps = [{"title": "Audit technique de la copropriété & Comptage", "desc": "Visite de la chaufferie, inventaire des radiateurs et vérification d'éligibilité CEE à 100%."}, {"title": "Préparation de la résolution d'AG", "desc": "Rédaction clé en main de la résolution pour le syndic avec vote à la majorité simple (art. 24)."}, {"title": "Planning de pose appartement par appartement", "desc": "Information des résidents, créneaux de 30 min par logement et remplacement des têtes thermostatiques."}, {"title": "Clôture du dossier CEE & Économies immédiates", "desc": "Signature des attestations sur l'honneur, versement de la prime CEE et baisse immédiate des charges."}];

export default function LocalAeoSection({ site, pseo }: LocalAeoSectionProps) {
    const city = site.city;
    const dept = site.department ? ` (${site.department})` : "";
    const neighborhoods = site.neighborhoods || [];
    const facts = pseo?.local_facts || [];
    const priceLine = pseo?.pricing_estimated && !pseo.pricing_estimated.includes("partir")
        ? pseo.pricing_estimated
        : site.pricing?.base || "Sur devis";
    const f0 = facts.find(f => f.label === "Département")?.value;
    const f1 = facts.find(f => f.label === "Région")?.value;
    const f2 = facts.find(f => f.label === "Profil climatique")?.value;
    const f3 = facts.find(f => f.label === "Préfecture")?.value;
    const neighborhoodsText = neighborhoods.length > 0 
        ? `, notamment dans les quartiers ${neighborhoods.slice(0, 4).join(', ')}` 
        : "";

    return (
        <section className="py-12 bg-slate-50/50 border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Fil d'Ariane Visuel */}
                <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-slate-500">
                    <Link href="/" className="hover:text-slate-900 transition flex items-center gap-1">
                        Accueil
                    </Link>
                    <ChevronRight size={14} />
                    <span className="text-slate-400">Villes</span>
                    <ChevronRight size={14} />
                    <span className="font-semibold text-slate-900">{city}</span>
                </nav>

                {/* Bloc AEO Direct Answer */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm mb-12">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-slate-900 text-white">
                            <FileText size={13} />
                            Thermostat Copropriété à {city} (2026)
                        </span>
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                            <Clock size={13} /> Données & Tarifs certifiés 2026
                        </span>
                    </div>

                    <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-6">
                        <strong>En résumé : </strong>À {city}{dept}, le coût moyen d'une prestation de thermostat copropriété réalisée par nos artisans qualifiés s'établit entre 0€ de reste à charge (CEE) avant déduction des éventuelles aides financières. Nos techniciens certifiés interviennent sous 24h à 48h avec garantie décennale.
                    </p>

                                        {facts.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-2 mb-6">
                            {facts.slice(0, 8).map((f) => (
                                <div key={f.label} className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4">
                                    <div className="text-xs text-slate-500 font-medium">{f.label}</div>
                                    <div className="text-sm font-bold text-slate-900 mt-1 leading-snug">{f.value}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {f0 && (
                        <p className="text-sm text-slate-600 leading-relaxed mb-6 pt-1 border-t border-slate-100">
                            <strong>Contexte local : </strong>{city} se situe dans le département {f0}, en {f1} ({f2}). {" "}Ce contexte détermine la longueur de la saison de chauffe, donc l'intérêt économique d'une régulation fine dans votre immeuble.
                        </p>
                    )}

                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-2">
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Prix estimé</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">0€ de reste à charge (CEE)</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Aides & Primes</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">Coup de Pouce Pilotage Connecté CEE</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Délai d'intervention</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">Devis 24h, pose rapide</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Garantie & Norme</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">Garantie Décennale & RGE</div>
                        </div>
                    </div>
                </div>

                {/* Tableau Comparatif de Prix HTML */}
                <div className="mb-14">
                    <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Grille tarifaire et prestations à {city}
                        </h2>
                        <p className="text-slate-600 mt-1 text-sm md:text-base">
                            Coûts indicatifs moyens constatés pour une pose réalisée dans les règles de l'art.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-600 border-b border-slate-200">
                                <tr>
                                    <th className="px-5 py-4">Équipement / Prestation</th>
                                    <th className="px-5 py-4 hidden md:table-cell">Usage conseillé</th>
                                    <th className="px-5 py-4">Coût indicatif</th>
                                    <th className="px-5 py-4">Avantage & Aides</th>
                                    <th className="px-5 py-4 font-bold text-slate-900">Reste à charge</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {pricingMatrix.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                                        <td className="px-5 py-4 font-semibold text-slate-900">{row.name}</td>
                                        <td className="px-5 py-4 text-slate-500 hidden md:table-cell">{row.usage}</td>
                                        <td className="px-5 py-4 text-slate-700 font-medium">{row.price}</td>
                                        <td className="px-5 py-4 text-emerald-700 font-semibold">{row.aid}</td>
                                        <td className="px-5 py-4 font-bold text-slate-900">{row.net}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Guide & Spécificités d'installation à {city} */}
                <div className="mb-14">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Obligation 2027 & Déploiement en copropriété à {city}
                        </h2>
                        <p className="text-slate-600 mt-1 text-sm md:text-base">
                            Réglementation nationale, démarches de syndic et financement sans reste à charge dans votre commune.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1: Urbanisme & Mairie */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                                    <Landmark size={20} />
                                </span>
                                <h3 className="font-bold text-slate-900 text-base">Obligation légale 2027 & Démarches à {city}</h3>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Le décret n° 2023-444 impose l'installation d'un dispositif de régulation automatique de la température par pièce pour tous les logements chauffés à {city}{dept} avant le 1er janvier 2027. Pour les copropriétés, notre bureau d'études rédige l'ensemble du dossier technique et le projet de résolution clé en main à inscrire à l'ordre du jour de votre prochaine Assemblée Générale, voté à la majorité simple de l'article 24.
                            </p>
                        </div>

                        {/* Card 2: Typologie du bâti & Quartiers */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <Building2 size={20} />
                                </span>
                                <h3 className="font-bold text-slate-900 text-base">Résidences collectives & Quartiers à {city}</h3>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Nos installateurs se déplacent dans toutes les résidences et grands ensembles de {city}{neighborhoodsText}. Nous intervenons directement sur chaque radiateur sans purge de circuit et sans arrêt de la chaudière collective, assurant un chantier silencieux et propre avec des créneaux de pose de 30 minutes convenus avec chaque copropriétaire ou locataire.
                            </p>
                        </div>

                        {/* Card 3: Climat, Performance & Aides */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
                                    <ShieldCheck size={20} />
                                </span>
                                <h3 className="font-bold text-slate-900 text-base">Financement CEE 100% pris en charge à {city}</h3>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Dans le cadre de la fiche d'opération standardisée BAR-TH-173 (Coup de Pouce Pilotage Connecté du Chauffage), l'ensemble de la fourniture du matériel certifié et la main-d'œuvre de nos techniciens RGE sont intégralement financés par les certificats d'économies d'énergie (CEE). Les copropriétaires de {city} bénéficient ainsi d'une mise en conformité immédiate avec un reste à charge garanti de 0€.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Déroulement du chantier en 4 étapes */}
                <div className="mb-14">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Votre projet à {city} en 4 étapes
                        </h2>
                        <p className="text-slate-600 mt-1 text-sm md:text-base">
                            Un accompagnement transparent de l'étude préliminaire jusqu'à la garantie de parfait achèvement.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, idx) => (
                            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white font-black text-sm mb-4">
                                    0{idx + 1}
                                </span>
                                <h3 className="font-bold text-slate-900 text-base mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bannière de Réassurance locale */}
                <div className="rounded-3xl bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                    <div>
                        <h3 className="text-xl font-bold mb-1">Un projet à {city} ?</h3>
                        <p className="text-slate-300 text-sm">
                            Garantie décennale & devis gratuit sous 24h sans aucun engagement.
                        </p>
                    </div>
                    <a
                        href="#simulateur"
                        className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-6 py-3.5 font-bold hover:bg-slate-100 transition shadow"
                    >
                        <span>Estimer mon projet</span>
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
}
