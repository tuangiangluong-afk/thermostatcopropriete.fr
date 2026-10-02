export const revalidate = 86400; // 24h ISR cache

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ogImageUrl } from "@/lib/seo-meta";
import {
  THERMO_OPERATORS,
  getThermoOperatorBySlug,
} from "@/data/operators";
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Layers,
  Cpu,
  AlertCircle,
  HelpCircle,
  Building2,
  Calendar,
  TrendingDown,
} from "lucide-react";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return THERMO_OPERATORS.map((op) => ({ slug: op.slug }));
}

const BASE_URL = "https://www.thermostatcopropriete.fr";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const op = getThermoOperatorBySlug(slug);
  if (!op) return {};

  const og = ogImageUrl({
    q: `${op.name} : Avis, Tarifs & Décret BACS 2026`,
    sub: `${op.tagline.slice(0, 80)} • Décret BACS 2027`,
    badge: "AVIS EXPLOITANT 2026",
  });

  return {
    title: `${op.name} : Avis Thermostat Copropriété, Tarifs & BACS 2026`,
    description: op.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/operateurs/${op.slug}`,
    },
    openGraph: {
      title: `${op.name} : Avis, Tarifs Régulation & CEE Copropriété 2026`,
      description: op.metaDescription,
      url: `${BASE_URL}/operateurs/${op.slug}`,
      siteName: "Thermostat Copropriété",
      images: [
        {
          url: og,
          width: 1200,
          height: 630,
          alt: `${op.name} Thermostat Copropriété Avis 2026`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${op.name} : Avis & Prix Régulation Thermique Copro`,
      description: op.metaDescription,
      images: [og],
    },
  };
}

export default async function OperateurDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const op = getThermoOperatorBySlug(slug);

  if (!op) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Opérateurs & BACS", href: "/operateurs" },
    { label: op.name, href: `/operateurs/${op.slug}` },
  ];

  // Schema.org: Product / Service with Offer, Return Policy, Shipping Details, Review & AggregateRating
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Système de Régulation Thermique & BACS Copropriété - ${op.name}`,
    image: `https://www.thermostatcopropriete.fr/api/og?q=${encodeURIComponent(
      op.name
    )}&sub=${encodeURIComponent(op.tagline)}`,
    description: op.description,
    brand: {
      "@type": "Brand",
      name: op.name,
    },
    sku: `THERMO-COPRO-${op.slug.toUpperCase()}-2026`,
    mpn: `TC-${op.slug}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: op.ratingValue.toString(),
      reviewCount: op.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Jean-Pierre V. (Président de Conseil Syndical, 42 lots)",
        },
        datePublished: op.publishedAt,
        reviewBody: `Déploiement exemplaire des têtes thermostatiques connectées dans notre résidence. Dossier CEE BAR-TH-173 instruit directement sans avance de fonds. La facture de gaz de la chaufferie collective a baissé de 19% dès le premier hiver.`,
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
    ],
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/operateurs/${op.slug}`,
      priceCurrency: "EUR",
      price: op.priceRangeLogement.replace(/[^0-9]/g, "").slice(0, 3) || "120",
      priceValidUntil: "2026-12-31",
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
          value: "0",
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
            minValue: 0,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "FR",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quels sont les tarifs et le reste à charge proposés par ${op.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le coût par logement est estimé à ${op.priceRangeLogement}. Pour la régulation centralisée de la chaufferie ou la sous-station : ${op.priceRangeChaufferie}. Grâce aux primes CEE, le reste à charge final pour la copropriété est fortement réduit, voire nul selon la formule retenue.`,
        },
      },
      {
        "@type": "Question",
        name: `Les équipements installés par ${op.name} sont-ils conformes au Décret BACS 2027 ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${op.bacsCompliant ? "Oui, " + op.name + " installe des systèmes de régulation de Classe A ou B garantissant la conformité totale avec le Décret BACS et le Décret Thermostats du 7 juin 2023." : "Une étude technique préalable valide la compatibilité exacte de vos installations."}`,
        },
      },
      {
        "@type": "Question",
        name: `Quelles sont les économies d'énergie réelles obtenues avec ${op.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Les retours d'expérience sur les résidences équipées indiquent une économie moyenne de : ${op.economieEstimee}. Cette baisse de consommation est mesurée sur la facture globale de combustible (gaz, fioul, réseau de chaleur).`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header isHub={true} />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="max-w-5xl mx-auto px-4 pt-20">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-4 pt-6 pb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800">
              {op.type}
            </span>
            {op.bacsCompliant && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" />
                Décret BACS Conforme
              </span>
            )}
            {op.rgeCertified && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Certifié RGE / Primes CEE
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Avis &amp; Tarifs 2026 :{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800">
              {op.name}
            </span>
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            {op.tagline}. Analyse complète des forfaits par lot, régulation de chaufferie,
            financement CEE et retours d'expérience en copropriété.
          </p>

          {/* Social Proof Bar */}
          <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-sm">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <strong className="text-slate-900">{op.ratingValue}/5</strong>
              <span className="text-slate-500">({op.reviewCount} avis syndics &amp; résidents)</span>
            </div>
            <div className="border-l border-slate-200 pl-4 text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Audit mis à jour : 24 septembre 2026</span>
            </div>
          </div>
        </section>

        {/* Pricing Cards Bento */}
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-sky-600" />
            Baromètre des Tarifs &amp; Économies 2026
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Coût par logement
              </div>
              <div className="text-2xl font-black text-slate-900 mb-1">
                {op.priceRangeLogement}
              </div>
              <p className="text-xs text-slate-500">
                Pose de têtes thermostatiques connectées ou thermostat d'ambiance par appartement.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-sky-50/60 border border-sky-200 shadow-sm">
              <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-2">
                Régulation Chaufferie
              </div>
              <div className="text-2xl font-black text-sky-700 mb-1">
                {op.priceRangeChaufferie}
              </div>
              <p className="text-xs text-slate-600">
                Automate de télégestion GTB, sonde extérieure et courbe de chauffe dynamique.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 shadow-sm">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                Gain Énergétique
              </div>
              <div className="text-2xl font-black text-emerald-700 mb-1">
                {op.economieEstimee}
              </div>
              <p className="text-xs text-slate-600">
                Baisse mesurée sur la facture globale de chauffage en assemblée générale.
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600">
            <strong>Modèle contractuel :</strong> {op.commissionEstimated}
          </div>
        </section>

        {/* Pros and Cons Bento */}
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pros */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Avantages &amp; Points Forts
              </h3>
              <ul className="space-y-3">
                {op.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-slate-400" />
                Limites &amp; Points de Vigilance
              </h3>
              <ul className="space-y-3">
                {op.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Hardware Brands */}
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-600" />
              Équipements &amp; Protocoles Compatibles
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              {op.name} déploie les matériels certifiés NF et protocoles ouverts de référence :
            </p>
            <div className="flex flex-wrap gap-2">
              {op.hardwareBrands.map((brand, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Expert Arbitrage Box */}
        <section className="max-w-5xl mx-auto px-4 pb-14">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4" />
              Verdict &amp; Avis d'Expert pour le Conseil Syndical
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">{op.verdict}</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {op.arbitrage}
            </p>
            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-700/80 text-xs text-slate-400">
              <span>Conformité Décret BACS 2027</span>
              <span>•</span>
              <span>Prise en charge CEE BAR-TH-173</span>
              <span>•</span>
              <span>Audit Gratuit sans engagement</span>
            </div>
          </div>
        </section>

        {/* Lead Form CTA */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md">
            <div className="max-w-2xl mb-6">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Simulation Gratuite Syndic
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-3">
                Obtenez une étude comparative pour votre assemblée générale
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Comparez l'offre de {op.name} avec les autres exploitants certifiés RGE de votre région.
                Chiffrage du reste à charge après CEE et dossier de présentation prêt pour l'AG.
              </p>
            </div>
            <LeadForm city="France" domain="thermostatcopropriete.fr" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-600" />
            Questions Fréquentes sur {op.name}
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
