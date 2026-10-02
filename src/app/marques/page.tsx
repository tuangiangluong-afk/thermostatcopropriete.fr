import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ogImageUrl } from "@/lib/seo-meta";
import { THERMO_BRANDS } from "@/data/thermo-brands";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Layers,
  Sparkles,
  Cpu,
} from "lucide-react";

export const revalidate = 86400;

const ogImage = ogImageUrl({
  q: "Marques de Thermostats & Vannes Connectées Copropriété 2026",
  sub: "Netatmo, Tado, Somfy, Delta Dore, Qivivo, Legrand : comparatif & prix par lot",
  badge: "GUIDE MARQUES 2026",
});

export const metadata: Metadata = {
  title: "Meilleures Marques de Thermostats Copropriété 2026 : Comparatif & Prix",
  description:
    "Comparatif indépendant 2026 des fabricants de thermostats et têtes thermostatiques connectées pour copropriétés : Netatmo, Tado, Somfy, Delta Dore, Comap Qivivo, Legrand. Prix par lot, compatibilités et aides CEE.",
  alternates: {
    canonical: "https://www.thermostatcopropriete.fr/marques",
  },
  openGraph: {
    title: "Meilleures Marques de Thermostats Copropriété 2026 : Comparatif & Prix",
    description:
      "Netatmo, Tado, Delta Dore, Somfy... Quel équipement de régulation choisir pour votre immeuble ? Compatibilité chaufferie collective et aides CEE.",
    url: "https://www.thermostatcopropriete.fr/marques",
    siteName: "Thermostat Copropriété",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Marques Thermostats Copropriété 2026" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marques Thermostats Copropriété 2026 : Guide & Prix",
    description: "Comparatif des fabricants de régulation connectée pour chauffage collectif.",
    images: [ogImage],
  },
};

export default function MarquesPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Comparatif des Fabricants de Thermostats et Régulation Connectée en Copropriété 2026",
    description:
      "Guide d'achat et comparatif des marques de thermostats d'ambiance et robinets thermostatiques pour immeubles collectifs.",
    itemListElement: THERMO_BRANDS.map((m, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: m.name,
      url: `https://www.thermostatcopropriete.fr/marques/${m.slug}`,
      description: `${m.type} : ${m.gamme}. Prix moyen ${m.prix}.`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quelle est la meilleure marque de robinets thermostatiques connectés pour un immeuble ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Netatmo et Danfoss Ally sont particulièrement plébiscités en copropriété pour leur simplicité de pose et leur compatibilité universelle avec les corps de vanne existants (M30x1,5). Pour les copropriétés recherchant une gestion domotique globale ou des réseaux radio longue portée, Delta Dore et Tado offrent des fonctionnalités avancées d'auto-apprentissage.",
        },
      },
      {
        "@type": "Question",
        name: "Faut-il installer un thermostat central ou des robinets thermostatiques par radiateur ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En chauffage collectif par colonnes montantes, les robinets thermostatiques connectés sur chaque radiateur sont indispensables pour réguler pièce par pièce. En chauffage individuel ou distribution en boucle monotube/pieuvre, un thermostat d'ambiance central programmable couplé à des vannes secondaires offre le meilleur confort.",
        },
      },
      {
        "@type": "Question",
        name: "Les marques Netatmo, Tado ou Delta Dore sont-elles éligibles à la prime CEE ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. Dès lors que le matériel répond aux critères de la fiche CEE BAR-TH-173 (régulation de classe IV minimum avec programmation horaire par pièce et détection de fenêtre ouverte), l'installation ouvre droit aux primes énergie quel que soit le fabricant.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header isHub={true} />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="max-w-6xl mx-auto px-4 pt-20">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Marques & Vannes", href: "/marques" },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 pt-6 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Équipements Certifiés 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Fabricants de Thermostats &amp; Vannes Connectées : <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800">
              Le Comparatif des 6 Marques Références
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            Netatmo, Tado, Somfy, Delta Dore, Qivivo, Legrand : comparez les protocoles radio,
            la compatibilité avec les chaufferies collectives et les tarifs par lot pour équiper
            votre résidence en toute sérénité.
          </p>
        </section>

        {/* Brands Grid */}
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {THERMO_BRANDS.map((b) => (
              <article
                key={b.slug}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                      {b.type}
                    </span>
                    <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      {b.prix}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mb-2 hover:text-sky-700 transition">
                    <Link href={`/marques/${b.slug}`}>{b.name}</Link>
                  </h2>

                  <p className="text-xs text-slate-500 mb-3 font-medium">
                    Gamme : {b.gamme}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 mb-4">
                    <strong>Compatibilité :</strong> {b.compat}
                  </div>

                  {/* Points forts */}
                  <div className="space-y-1.5 mb-4">
                    {b.atouts.slice(0, 2).map((atout, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{atout}</span>
                      </div>
                    ))}
                    {b.limites.slice(0, 1).map((limite, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-500">
                        <XCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{limite}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expert tip */}
                  <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-sky-900 leading-relaxed">
                    <strong>Avis syndic :</strong> {b.expertTip.slice(0, 115)}...
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Éligible CEE BAR-TH-173</span>
                  <Link
                    href={`/marques/${b.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-900 transition"
                  >
                    Fiche marque <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Lead Form CTA */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
            <div className="max-w-2xl mb-8">
              <span className="text-sky-400 text-xs font-bold uppercase tracking-wider">
                Devis Matériel &amp; Pose en Copropriété
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-4">
                Équipez votre résidence avec les meilleures marques
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Recevez un comparatif des solutions Netatmo, Tado ou Delta Dore installées par des chauffagistes
                certifiés RGE avec valorisation directe des primes CEE.
              </p>
            </div>
            <LeadForm city="France" domain="thermostatcopropriete.fr" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
