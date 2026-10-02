export const revalidate = 86400; // 24h ISR cache
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { slugify } from "@/lib/slugify";
import { getHubConfig } from "@/lib/sites-config";
import { NATIONAL_TARGETS } from "@/config/national-targets";
import { Zap, Award, ArrowRight, Home, CheckCircle, ShieldCheck, Cpu, SlidersHorizontal, Scale, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import { Footer } from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstallationSteps from "@/components/InstallationSteps";
import PricingTable from "@/components/PricingTable";
import FAQSection from "@/components/FAQSection";
import RealizationsGrid from "@/components/RealizationsGrid";
import { ogImageUrl } from "@/lib/seo-meta";

export const metadata = {
    title: "Thermostat collectif : devis et régulation copropriété",
    description: "Thermostats connectés et régulation de chauffage collectif en copropriété : conformité décret BACS, audit et devis gratuits sous 24h.",
    openGraph: {
        title: "Thermostat collectif : devis et régulation copropriété",
        description: "Thermostats connectés et régulation de chauffage collectif en copropriété : conformité décret BACS, audit et devis gratuits sous 24h.",
        images: [
            {
                url: ogImageUrl({
                    q: "Thermostats & Régulation Copropriété",
                    sub: "Conformité Décret BACS 2027 & Décret n° 2023-444 • 12 Opérateurs Certifiés",
                    badge: "Audit Copropriété 2026",
                }),
                width: 1200,
                height: 630,
            },
        ],
    },
};

export default function HomePage() {
    const hub = getHubConfig();
    const cities = NATIONAL_TARGETS.map(t => ({ name: t.name, slug: slugify(t.name), available: true, department: t.zip.substring(0,2) }));

    return (
        <div className="min-h-screen font-sans text-slate-900 bg-white">
            <Header isHub={true} variant="default" themeColor="rose" />
            <main>
            <section className="relative pt-20 pb-12 lg:pt-24 lg:pb-32 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 -z-10 bg-slate-100 opacity-30" />
                <div className="container mx-auto px-4 relative z-20">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8">
                        <div className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left">
                            <div>
                                <div className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 mb-6">
                                    <CheckCircle size={16} className="mr-2" />
                                    Audit gratuit sous 48h & Assurance décennale
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: `Réduisez la facture de chauffage de votre copropriété avec des <span class="text-slate-600">thermostats connectés</span>` }} />
                                <p className="text-xl text-slate-600 mb-4 max-w-xl mx-auto lg:mx-0">
                                    Conformité au décret BACS, têtes thermostatiques connectées et pilotage de chaufferie : estimez votre budget par logement sous 24h.
                                </p>
                            </div>

                            <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-30 text-left">
                                <div id="simulateur" className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                                    <div className="p-1 bg-gradient-to-r from-rose-600 to-red-600"></div>
                                    <div className="p-6 md:p-8">
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-slate-900">Audit Technique Gratuit<span className="sr-only">.</span></h3>
                                            <p className="text-sm text-slate-500">Gratuit • Sans engagement • 2 min</p>
                                        </div>
                                        <LeadForm
                                            city="France"
                                            domain="thermostatcopropriete.fr"
                                            targetType="MIXED"
                                            themeColor="rose"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 flex flex-col justify-center">
                            <div className="relative h-[300px] lg:h-[450px] w-full rounded-2xl overflow-hidden border bg-white">
                                <Image
                                    src="/images/generated/thermostat-hero.png"
                                    alt="Thermostat connecté sur radiateur de chauffage collectif"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <InstallationSteps />
            <PricingTable />
            <TestimonialsSection />
            <RealizationsGrid />

            {/* Knowledge Base & Cluster Hubs Section */}
            <section className="py-16 bg-slate-900 text-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-3">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Observatoire Réglementaire & Technique 2026
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            Guide & Décision Thermostats en Copropriété
                        </h2>
                        <p className="mt-3 text-slate-400 text-sm md:text-base">
                            Anticipez l&apos;obligation du Décret n° 2023-444 (1er janvier 2027) et le Décret BACS : comparez les installateurs certifiés RGE, les équipements agréés et optimisez vos subventions CEE.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        <Link
                            href="/operateurs"
                            className="group p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-rose-500/50 transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold group-hover:text-rose-400 transition-colors">
                                12 Opérateurs RGE & BACS
                            </h3>
                            <p className="text-sm text-slate-400 mt-2">
                                Dalkia, ENGIE Solutions, Idex, Proxiserve, Ista : benchmark des contrats d&apos;exploitation et GTB.
                            </p>
                            <div className="mt-4 flex items-center text-xs font-bold text-rose-400 gap-1">
                                Consulter le comparatif opérateurs <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link
                            href="/marques"
                            className="group p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-rose-500/50 transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">
                                Fabricants & Matériel Agréé
                            </h3>
                            <p className="text-sm text-slate-400 mt-2">
                                Netatmo Pro, Tado°, Somfy, Delta Dore, Legrand : têtes thermostatiques connectées Zigbee & LoRaWAN.
                            </p>
                            <div className="mt-4 flex items-center text-xs font-bold text-blue-400 gap-1">
                                Explorer les marques <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link
                            href="/comparatifs"
                            className="group p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-rose-500/50 transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Scale className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold group-hover:text-amber-400 transition-colors">
                                Duels & Arbitrages BACS
                            </h3>
                            <p className="text-sm text-slate-400 mt-2">
                                Têtes connectées vs robinets manuels, LoRaWAN vs Zigbee, Dalkia vs Idex, rentabilité CEE BAR-TH-173.
                            </p>
                            <div className="mt-4 flex items-center text-xs font-bold text-amber-400 gap-1">
                                Voir tous les duels <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link
                            href="/guides"
                            className="group p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-rose-500/50 transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold group-hover:text-emerald-400 transition-colors">
                                Guides & Réglementation
                            </h3>
                            <p className="text-sm text-slate-400 mt-2">
                                Modalités de vote en Assemblée Générale (loi de 1965), DPE collectif et fiches CEE pour syndics et conseils syndicaux.
                            </p>
                            <div className="mt-4 flex items-center text-xs font-bold text-emerald-400 gap-1">
                                Lire les guides <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
            
            {/* Local Cities Section */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Artisans chauffagistes RGE dans votre ville<span className="sr-only">.</span></h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {cities.map((city, idx) => (
                            <Link href={`/ville/${city.slug}`} key={idx} className="p-4 bg-white border rounded-xl hover:border-rose-500 shadow-sm text-center font-semibold text-slate-800">
                                {city.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <FAQSection />
            </main>
            <Footer config={hub} />
            <MobileStickyCTA themeColor="rose" />
        </div>
    );
}
