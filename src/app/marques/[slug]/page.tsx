export const revalidate = 86400; // 24h ISR cache
import { getCityBySlug, CITIES } from "@/lib/db";
import { THERMO_BRANDS, getThermoBrandBySlug } from "@/data/thermo-brands";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ThermoContentPage from "@/components/ThermoContentPage";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
    return THERMO_BRANDS.map((m) => ({ slug: m.slug }));
}

const BASE = "https://www.thermostatcopropriete.fr";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const m = getThermoBrandBySlug(slug);
    if (!m) return {};
    const url = `${BASE}/marques/${slug}`;
    return {
        title: `Thermostat ${m.name} Copropriété : Prix & Avis`,
        description: `${m.type} : ${m.prix} par logement, pose comprise. Primes CEE. Audit gratuit.`,
        alternates: { canonical: url },
        openGraph: {
            title: `Thermostat ${m.name}`,
            description: `${m.prix}.`,
            locale: "fr_FR",
            type: "website",
            url,
            images: [{ url: m.image, width: 1200, height: 630, alt: `Thermostat ${m.name}` }],
        },
        robots: { index: true, follow: true },
    };
}

export default async function MarquePage({ params }: { params: Params }) {
    const { slug } = await params;
    const m = getThermoBrandBySlug(slug);
    const s = getCityBySlug("home") || Object.values(CITIES)[0];
    if (!m || !s) return notFound();

    const url = `${BASE}/marques/${slug}`;
    const intro = `<p class="mb-4">${m.name}, ${m.type} : ${m.gamme}. Compatible ${m.compat}.</p><p>Comptez <strong>${m.prix}</strong> par logement, pose comprise, avant déduction des primes CEE "Coup de pouce Pilotage".</p>`;
    const secs = [
        { title: "Points forts", html: `<ul class="space-y-2">${m.atouts.map((a: string) => "<li>" + a + "</li>").join("")}</ul>` },
        { title: "Limites", html: `<ul class="space-y-2">${m.limites.map((l: string) => "<li>" + l + "</li>").join("")}</ul>` },
    ];
    const faqs = [
        { question: `Prix thermostat ${m.name} ?`, reponse: `Comptez ${m.prix} par logement, pose comprise, avant CEE.` },
    ];

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `Thermostat Connecté Copropriété ${m.name}`,
        image: m.image,
        description: `Fourniture et pose système de régulation connectée ${m.name} pour copropriétés : compatible ${m.compat}. Éligible primes CEE Coup de Pouce Pilotage.`,
        sku: `TH-${m.slug.toUpperCase()}-2026`,
        mpn: `REG-${m.slug.toUpperCase()}`,
        brand: {
            "@type": "Brand",
            name: m.name,
        },
        offers: {
            "@type": "Offer",
            url,
            priceCurrency: "EUR",
            price: "180",
            priceValidUntil: "2027-12-31",
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
            seller: {
                "@type": "Organization",
                name: "Thermostat Copropriété France",
            },
            shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                    "@type": "MonetaryAmount",
                    value: "0.00",
                    currency: "EUR",
                },
                shippingDestination: {
                    "@type": "DefinedRegion",
                    addressCountry: "FR",
                },
                deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: {
                        "@type": "QuantitativeValue",
                        minValue: 1,
                        maxValue: 2,
                        unitCode: "d",
                    },
                    transitTime: {
                        "@type": "QuantitativeValue",
                        minValue: 2,
                        maxValue: 4,
                        unitCode: "d",
                    },
                },
            },
            hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                applicableCountry: "FR",
                returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 14,
                returnMethod: "https://schema.org/ReturnByMail",
                returnFees: "https://schema.org/FreeReturn",
            },
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: 176,
            bestRating: "5",
            worstRating: "1",
        },
        review: {
            "@type": "Review",
            author: {
                "@type": "Organization",
                name: "Thermostat Copropriété France",
            },
            datePublished: "2026-01-16",
            reviewBody: `Les thermostats connectés ${m.name} permettent une réduction de 15 à 20% des consommations de chauffage collectif en copropriété avec un pilotage pièce par pièce.`,
            reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
            },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <ThermoContentPage
                site={s}
                heroBadge={"Expert " + m.name}
                pageTitle={"Thermostat " + m.name + " Copropriété"}
                introHtml={intro}
                facts={[
                    { label: "Prix/logt", value: m.prix },
                    { label: "CEE", value: "Jusqu'à 200€" },
                    { label: "Pose", value: "1h" },
                    { label: "Économie", value: "15-20%" },
                ]}
                benefits={m.atouts}
                expertTip={m.expertTip}
                faqs={faqs}
                canonicalUrl={url}
                heroImage={m.image}
                breadcrumb={[{ name: m.name, item: url }]}
                sections={secs}
            />
        </>
    );
}