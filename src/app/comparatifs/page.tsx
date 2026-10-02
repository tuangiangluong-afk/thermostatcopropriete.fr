import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ogImageUrl } from "@/lib/seo-meta";
import { THERMO_COMPARATIFS } from "@/data/thermo-comparatifs";
import {
  Scale,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Cpu,
} from "lucide-react";

export const revalidate = 86400;

const ogImage = ogImageUrl({
  q: "Comparatifs Thermostats & Régulation Copropriété 2026",
  sub: "Netatmo vs Tado, Thermostat vs Robinets, CEE vs Tiers-Investissement : les duels",
  badge: "COMPARATIFS 2026",
});

export const metadata: Metadata = {
  title: "Comparatifs Thermostats Copropriété 2026 : Prix, Matériel & Verdicts",
  description:
    "Guide comparatif régulation chauffage collectif 2026 : Netatmo vs Tado, thermostat central ou robinets connectés, CEE ou tiers-investissement, Delta Dore vs Somfy. Avis d'experts thermiciens pour syndics.",
  alternates: {
    canonical: "https://www.thermostatcopropriete.fr/comparatifs",
  },
  openGraph: {
    title: "Comparatifs Thermostats Copropriété 2026 - Guide Décisionnel & Tarifs",
    description:
      "Tableaux comparatifs et verdicts neutres pour les conseils syndicaux : comparez les solutions de régulation par pièce et le pilotage de chaufferie.",
    url: "https://www.thermostatcopropriete.fr/comparatifs",
    siteName: "Thermostat Copropriété",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Comparatifs Thermostats Copropriété 2026" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comparatifs Régulation Copropriété 2026 : Prix & Décisions",
    description: "Comparatifs solutions de pilotage thermique pour syndics et conseils syndicaux.",
    images: [ogImage],
  },
};

export default function ComparatifsHubPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Comparatifs Décisionnels Thermostats & Régulation Copropriété 2026",
    description: "Comparaisons objectives des équipements de régulation et modes de gestion en copropriété.",
    itemListElement: THERMO_COMPARATIFS.map((comp, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: comp.title,
      url: `https://www.thermostatcopropriete.fr/comparatif/${comp.slug}`,
      description: comp.intro,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Vaut-il mieux voter un thermostat central ou des robinets thermostatiques connectés en AG ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dans un immeuble avec chauffage collectif par colonnes montantes, les robinets thermostatiques connectés sur chaque radiateur sont la seule solution technique permettant une vraie régulation pièce par pièce conforme au décret 2027. Le thermostat central ne régule qu'une seule pièce témoin et ne compense pas les déséquilibres entre appartements.",
        },
      },
      {
        "@type": "Question",
        name: "Comment financer les travaux : prime CEE ou tiers-investissement ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pour un projet de régulation par lot (< 10 000 € à 15 000 € au total), la prime CEE directe (fiche BAR-TH-173) est la plus rapide et simple à mobiliser. Pour les projets lourds incluant GTB en chaufferie et télégestion pluriannuelle (> 20 000 €), le tiers-investissement ou le contrat de performance énergétique (CPE) évite l'avance de trésorerie et garantit le résultat.",
        },
      },
      {
        "@type": "Question",
        name: "Faut-il commencer par réguler la chaufferie ou équiper les logements ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'optimisation de la chaufferie centrale (sonde extérieure, courbe de chauffe, circulateurs à vitesse variable) est le préalable indispensable : elle génère immédiatement 15% à 20% d'économies collectives pour tous les copropriétaires. L'équipement des logements en vannes connectées vient ensuite parfaire le confort pièce par pièce (+10% à 15% supplémentaires).",
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
              { label: "Comparatifs", href: "/comparatifs" },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 pt-6 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold tracking-wide uppercase mb-4">
            <Scale className="w-3.5 h-3.5" />
            Guide Décisionnel Copropriété 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Comparatifs Régulation Chauffage : <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800">
              Matériels, Financement &amp; Verdicts
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            Hésitez-vous entre deux technologies ou entre deux modes de financement pour votre assemblée générale ?
            Consultez nos comparatifs techniques et économiques rédigés pour éclairer les décisions des syndics
            et conseils syndicaux.
          </p>
        </section>

        {/* Comparatifs Grid */}
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {THERMO_COMPARATIFS.map((comp) => (
              <article
                key={comp.slug}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 border border-sky-200/60">
                      Budget : {comp.prix}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Audit 2026</span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-3 hover:text-sky-700 transition">
                    <Link href={`/comparatif/${comp.slug}`}>{comp.title}</Link>
                  </h2>

                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {comp.intro}
                  </p>

                  {/* Duel Box */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 mb-6">
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        Option A
                      </div>
                      <div className="font-bold text-slate-900 text-sm">{comp.a}</div>
                    </div>
                    <div className="border-l border-slate-200 pl-3">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        Option B
                      </div>
                      <div className="font-bold text-slate-900 text-sm">{comp.b}</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700 bg-sky-50/50 p-3 rounded-lg border border-sky-100">
                    <strong className="text-sky-900">Verdict synthèse :</strong> {comp.verdict}
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {comp.rows.length} critères analysés
                  </span>
                  <Link
                    href={`/comparatif/${comp.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-900 transition"
                  >
                    Voir le comparatif complet <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Methodology Section */}
        <section className="bg-white border-y border-slate-200 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                La méthode d'évaluation de nos experts thermiciens
              </h2>
              <p className="text-slate-600">
                Nos comparatifs sont établis en totale indépendance des exploitants et distributeurs d'énergie,
                en appliquant les règles de l'art thermique et les critères d'éligibilité aux fiches CEE.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-4">
                  1
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Conformité Décret BACS 2027</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Vérification du niveau d'automatisation requis (Classe A, B ou C selon la norme NF EN ISO 52120-1)
                  pour éviter tout rejet de conformité lors des contrôles obligatoires.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-4">
                  2
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Optimisation du Reste à Charge</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Calcul des volumes de kWh cumac générés par les fiches CEE BAR-TH-173 et BAT-TH-116
                  pour maximiser le montant de prime déduit directement du devis de travaux.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-4">
                  3
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Adhésion des Copropriétaires</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Évaluation de la simplicité d'utilisation pour les résidents (applications mobiles,
                  ergonomie des têtes thermostatiques, absence de maintenance complexe).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form CTA */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
            <div className="max-w-2xl mb-8">
              <span className="text-sky-400 text-xs font-bold uppercase tracking-wider">
                Devis Comparatif Syndic Gratuit
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-4">
                Préparez la prochaine assemblée générale en toute sérénité
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Recevez une synthèse comparative prête pour l'AG avec estimation des économies annuelles
                et chiffrage du reste à charge par lot.
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
