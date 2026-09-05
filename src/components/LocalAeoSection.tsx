import Link from "next/link";
import { CheckCircle, ShieldCheck, Clock, Award, Euro, ArrowRight, ChevronRight, FileText } from "lucide-react";
import type { CityConfig } from "@/lib/db";

interface LocalAeoSectionProps {
    site: CityConfig;
}

const pricingMatrix = [{"name": "Robinet Thermostatique Connecté (Radiateur)", "usage": "Régulation pièce par pièce", "price": "65€ - 95€", "aid": "Pris en charge 100% CEE", "net": "0€"}, {"name": "Sonde d'Ambiance Connectée LoRaWAN", "usage": "Relevé de température d'appartement", "price": "80€ - 120€", "aid": "Financement CEE BAR-TH-173", "net": "0€"}, {"name": "Régulateur GTB Chaufferie Collective", "usage": "Optimisation courbe de chauffe", "price": "1 500€ - 3 500€", "aid": "Financement CEE BAR-TH-118", "net": "0€"}];
const steps = [{"title": "Audit chaufferie et faisabilité CEE", "desc": "Étude thermique du réseau collectif et calcul du volume de CEE mobilisables pour l'immeuble."}, {"title": "Présentation du projet en assemblée générale", "desc": "Fourniture des documents explicatifs pour le conseil syndical et le syndic avec engagement reste à charge 0€."}, {"title": "Installation sans coupure de chauffage", "desc": "Remplacement rapide des têtes de radiateurs dans les logements par nos équipes d'électriciens/chauffagistes."}, {"title": "Plateforme de gestion pour le syndic", "desc": "Accès au tableau de bord centralisé pour piloter les températures et constater les baisses de consommation."}];

export default function LocalAeoSection({ site }: LocalAeoSectionProps) {
    const city = site.city;
    const dept = site.department ? ` (${site.department})` : "";

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
                            Régulation & Thermostats Connectés à {city} (2026)
                        </span>
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                            <Clock size={13} /> Chiffres & Aides certifiés 2026
                        </span>
                    </div>

                    <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-6">
                        <strong>En résumé : </strong>À {city}{dept}, équiper une copropriété chauffée collectivement en robinets et thermostats connectés permet de réduire les charges de chauffage de 15% à 25%. Le programme est finançable jusqu'à 100% via le dispositif des Certificats d'Économies d'Énergie (CEE), garantissant un reste à charge nul.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-2">
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Prix estimé</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">0€ de reste à charge pour la copropriété</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Aides & Primes</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">Prise en charge CEE 100% (Fiches BAR-TH-118/173)</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Délai d'intervention</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">Étude d'immeuble 48h, déploiement complet en AG</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Garantie & Norme</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">Conformité décret BACS & Fiches CEE officielles</div>
                        </div>
                    </div>
                </div>

                {/* Tableau Comparatif de Prix HTML */}
                <div className="mb-14">
                    <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Grille tarifaire et aides à {city}
                        </h2>
                        <p className="text-slate-600 mt-1 text-sm md:text-base">
                            Coûts moyens constatés pour une pose réalisée par nos artisans partenaires certifiés.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-600 border-b border-slate-200">
                                <tr>
                                    <th className="px-5 py-4">Équipement / Prestation</th>
                                    <th className="px-5 py-4 hidden md:table-cell">Usage conseillé</th>
                                    <th className="px-5 py-4">Coût indicatif</th>
                                    <th className="px-5 py-4">Aides déduites</th>
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

                {/* Déroulement du chantier en 4 étapes */}
                <div className="mb-14">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Votre installation à {city} en 4 étapes
                        </h2>
                        <p className="text-slate-600 mt-1 text-sm md:text-base">
                            Un accompagnement complet et transparent, de l'audit jusqu'à l'obtention des aides.
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
                        <h3 className="text-xl font-bold mb-1">Un projet d'installation à {city} ?</h3>
                        <p className="text-slate-300 text-sm">
                            Garantie matériel 5 ans & économies jusqu'à 25%. Devis gratuit sous 24h sans aucun engagement.
                        </p>
                    </div>
                    <a
                        href="#simulateur"
                        className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-6 py-3.5 font-bold hover:bg-slate-100 transition shadow"
                    >
                        <span>Estimer mon devis</span>
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
}
