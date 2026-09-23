export const revalidate = 86400; // 24h ISR cache
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteConfig } from "@/lib/sites-config";
import LeadForm from "@/components/LeadForm";
import { FileSearch, ClipboardList, ReceiptEuro, ArrowRight } from "lucide-react";

const BASE_URL = "https://www.thermostatcopropriete.fr";

export const metadata: Metadata = {
    title: "DPE Collectif en copropriété : obligations, prix et PPT (2026)",
    description:
        "Guide pilier du DPE collectif en copropriété : calendrier légal par taille, prix réel par lot, et Plan Pluriannuel de Travaux (Cas 1/2/3). Audit gratuit.",
    alternates: { canonical: `${BASE_URL}/dpe-collectif` },
    openGraph: {
        title: "DPE Collectif en copropriété : le guide pilier 2026",
        description:
            "Obligations légales, prix par lot, PPT et lien vers la sortie de passoire énergétique. Tout ce qu'un conseil syndical doit savoir.",
        url: `${BASE_URL}/dpe-collectif`,
        locale: "fr_FR",
        type: "website",
    },
};

const CLUSTER = [
    {
        href: "/guides/obligation-dpe-collectif-copropriete-calendrier-par-taille",
        icon: FileSearch,
        title: "Calendrier & obligations légales",
        excerpt:
            "Depuis 2025 (>200 lots) jusqu'en 2028 (<20 lots) : qui est concerné, à quelle échéance, et quelles sanctions en cas de carence.",
        kicker: "Réglementation",
    },
    {
        href: "/guides/prix-dpe-collectif-copropriete-cout-par-lot-2026",
        icon: ReceiptEuro,
        title: "Prix réel & coût par lot",
        excerpt:
            "Grille de tarifs constatée en 2026 pour un DPE collectif, en fonction de la taille, de la complexité du bâti et des options (thermographie, infiltrométrie).",
        kicker: "Budget",
    },
    {
        href: "/guides/plan-pluriannuel-travaux-ppt-copropriete-cas-1-cas-2-cas-3",
        icon: ClipboardList,
        title: "PPT : Cas 1, Cas 2, Cas 3",
        excerpt:
            "Que se passe-t-il après le DPE ? Les trois configurations de Plan Pluriannuel de Travaux, leurs obligations de vote en AG et leurs délais.",
        kicker: "Travaux",
    },
];

export default function DPECollectifPillarPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "DPE Collectif", item: `${BASE_URL}/dpe-collectif` },
        ],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Le DPE collectif est-il obligatoire pour toutes les copropriétés ?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        "Oui, pour toute copropriété de 50 lots ou plus dont le permis de construire a été déposé avant le 1er juin 2001. Le calendrier s'étale de 2025 (>200 lots) à 2028 (20 à 49 lots). Les copropriétés de moins de 20 lots sont exclues du dispositif DPE collectif mais restent concernées par l'audit énergétique si elles sont classées E, F ou G.",
                },
            },
            {
                "@type": "Question",
                name: "Combien coûte un DPE collectif en 2026 ?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        "Le marché 2026 se situe entre 250 € et 450 € HT par lot, avec un effet dégressif marqué au-delà de 100 lots. Pour une copropriété de 50 lots, comptez environ 12 000 à 18 000 € HT ; pour 200 lots, 30 000 à 55 000 € HT. Les options (thermographie, infiltrométrie, relevé partiel) peuvent ajouter 10 à 25 % au devis.",
                },
            },
            {
                "@type": "Question",
                name: "Un mauvais DPE oblige-t-il à faire des travaux ?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        "Le DPE collectif seul n'oblige pas à voter des travaux. En revanche, s'il classe l'immeuble en E, F ou G, un audit énergétique « sort de passoire » est exigé, et le Plan Pluriannuel de Travaux (PPT) devient obligatoire avec un échancier décennal. Les classes F et G au niveau immeuble sont interdites de mise en location depuis le 1er janvier 2025.",
                },
            },
            {
                "@type": "Question",
                name: "Le DPE collectif peut-il ouvrir droit à MaPrimeRénov' Copro ?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        "Oui, à condition que les travaux votés en AG atteignent au moins un saut de 2 classes énergétiques (par exemple E→C) et soient réalisés par un professionnel RGE. Les plafonds MaPrimeRénov' Copro vont jusqu'à 3 000 € par lot pour un saut de 2 classes et 3 750 € pour un passage en B ou A, cumulables avec les CEE (barème BAR-TH).",
                },
            },
        ],
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header isHub={true} variant="default" themeColor="rose" />

            <main className="flex-grow pt-32 pb-16">
                {/* Hero */}
                <section className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                            <span className="w-2 h-2 bg-rose-600 rounded-full animate-pulse" />
                            Guide pilier · Mise à jour 2026
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            DPE Collectif en copropriété :
                            <span className="text-rose-600"> tout ce qu'il faut savoir en 2026</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Obligations légales, calendrier par taille de copropriété, prix réel par lot, Plan Pluriannuel
                            de Travaux (Cas 1, 2, 3) et articulation avec MaPrimeRénov' Copro et les CEE.
                            Une synthèse à jour, sourcée, pensée pour les conseils syndicaux.
                        </p>
                    </div>

                    {/* Cluster cards */}
                    <section className="grid md:grid-cols-3 gap-6 mb-16">
                        {CLUSTER.map((c) => {
                            const Icon = c.icon;
                            return (
                                <Link
                                    key={c.href}
                                    href={c.href}
                                    className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-slate-100 transition-all hover:-translate-y-1"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
                                        <Icon size={22} />
                                    </div>
                                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
                                        {c.kicker}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-rose-700 transition">
                                        {c.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{c.excerpt}</p>
                                    <div className="inline-flex items-center gap-1 text-rose-700 font-semibold text-sm group-hover:gap-2 transition-all">
                                        Lire le guide <ArrowRight size={16} />
                                    </div>
                                </Link>
                            );
                        })}
                    </section>

                    {/* Réponse directe / TL;DR */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Réponse directe</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Le <strong>DPE collectif</strong> est obligatoire depuis le <strong>1er janvier 2025</strong> pour
                            les copropriétés de <strong>plus de 200 lots</strong>, et s'étend progressivement jusqu'en{" "}
                            <strong>2028</strong> pour celles de <strong>50 à 200 lots</strong> (Loi Climat &amp; Résilience,
                            art. 260). Il conditionne l'accès à <strong>MaPrimeRénov' Copro</strong> et déclenche, en cas de
                            classe E/F/G, un <strong>audit énergétique</strong> et un <strong>Plan Pluriannuel de Travaux</strong>
                            sur 10 ans.
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                            Prix constaté 2026 : entre <strong>250 € et 450 € HT par lot</strong>, dégressif au-delà de 100 lots.
                            Un diagnostic de performance collective bien mené se rentabilise par les aides mobilisables —
                            jusqu'à 9 000 € par lot en MaPrimeRénov' Copro + CEE pour un saut de 3 classes.
                        </p>
                    </section>

                    {/* CTA conversion */}
                    <section id="simulateur" className="scroll-mt-32 bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 mb-3">
                                Estimer le budget DPE collectif de votre copropriété
                            </h2>
                            <p className="text-slate-600">
                                Audit gratuit, sans engagement. Recevez jusqu'à 3 devis de diagnostiqueurs certifiés.
                            </p>
                        </div>
                        <LeadForm city="France" domain="thermostatcopropriete.fr" targetType="COPRO" themeColor="rose" />
                    </section>
                </section>
            </main>

            <Footer config={getSiteConfig("home")!} />
        </div>
    );
}
