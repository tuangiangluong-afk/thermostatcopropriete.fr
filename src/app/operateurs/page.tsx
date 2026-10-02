import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ogImageUrl } from "@/lib/seo-meta";
import { THERMO_OPERATORS } from "@/data/operators";
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Clock,
  Layers,
  Building2,
  Cpu,
  TrendingDown,
} from "lucide-react";

export const revalidate = 86400;

const ogImage = ogImageUrl({
  q: "Comparatif Opérateurs & BACS Copropriété 2026",
  sub: "Dalkia, ENGIE Solutions, Idex, Proxiserve, Ista : tarifs, CEE & décret BACS",
  badge: "AUDIT BACS 2026",
});

export const metadata: Metadata = {
  title: "Meilleurs Opérateurs Thermostat & BACS Copropriété 2026 : Comparatif & Avis",
  description:
    "Comparatif indépendant 2026 des exploitants et intégrateurs de régulation thermique en copropriété : Dalkia, ENGIE Solutions, Idex, Proxiserve, Ista, Techem, Voltalis. Tarifs par lot, conformité Décret BACS 2027 et primes CEE.",
  alternates: {
    canonical: "https://www.thermostatcopropriete.fr/operateurs",
  },
  openGraph: {
    title: "Meilleurs Opérateurs Thermostat & BACS Copropriété 2026 : Comparatif & Avis",
    description:
      "Quel exploitant ou installateur choisir pour équiper votre copropriété en thermostats connectés et régulation BACS ? Grille tarifaire, aides CEE et avis vérifiés.",
    url: "https://www.thermostatcopropriete.fr/operateurs",
    siteName: "Thermostat Copropriété",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Comparatif Opérateurs Copropriété 2026" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comparatif Opérateurs Chauffage & BACS Copropriété 2026",
    description: "Tarifs réels régulation connectée copropriété, primes CEE et conformité BACS 2027.",
    images: [ogImage],
  },
};

export default function OperateursPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Comparatif des Opérateurs de Régulation Thermique et BACS en Copropriété 2026",
    description:
      "Audit comparatif des principaux exploitants de chauffage collectif, spécialistes du comptage et intégrateurs GTB.",
    itemListElement: THERMO_OPERATORS.map((op, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: op.name,
      url: `https://www.thermostatcopropriete.fr/operateurs/${op.slug}`,
      description: op.description,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Qu'impose le décret thermostat / BACS aux copropriétés d'ici au 1er janvier 2027 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le décret n° 2023-444 du 7 juin 2023 impose à tous les logements chauffés collectivement ou individuellement d'être équipés d'un système de régulation automatique de la température pièce par pièce (thermostat programmable ou robinets thermostatiques connectés) au plus tard le 1er janvier 2027. Pour les chaufferies collectives de forte puissance (> 70 kW et > 290 kW), le décret BACS impose en outre une GTB (Gestion Technique du Bâtiment) assurant la télégestion et le suivi continu.",
        },
      },
      {
        "@type": "Question",
        name: "Quel est le reste à charge moyen pour équiper une copropriété en thermostats connectés ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Grâce aux Certificats d'Économies d'Énergie (fiche CEE BAR-TH-173 'Système de régulation par pièce'), l'installation de têtes thermostatiques connectées ou de thermostats programmables bénéficie d'une prise en charge pouvant atteindre 70% à 100% du montant des travaux. Le reste à charge pour le syndicat des copropriétaires varie généralement entre 0 € et 50 € par logement équipé.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle est la différence entre un exploitant de chaufferie (Dalkia, ENGIE) et un spécialiste du comptage (Proxiserve, Ista) ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'exploitant de chaufferie gère la production de chaleur primaire (chaudière gaz, fioul, réseau urbain, contrat P1/P2/P3). Les spécialistes du comptage interviennent au niveau des émetteurs secondaires dans chaque logement (pose de robinets thermostatiques connectés sur chaque radiateur et répartiteurs de frais de chauffage). Ces deux approches sont complémentaires.",
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
              { label: "Opérateurs & BACS", href: "/operateurs" },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 pt-6 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold tracking-wide uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" />
            Décret BACS &amp; Thermostats 2027
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Comparatif des 12 Opérateurs <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800">
              Régulation Thermique &amp; Chauffage Copropriété
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed mb-8">
            D'ici au 1er janvier 2027, chaque copropriété doit obligatoirement réguler sa température
            pièce par pièce et moderniser sa chaufferie. Nous avons analysé les 12 acteurs majeurs
            en France : exploitants P1/P2/P3, spécialistes du comptage radio et intégrateurs GTB.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div>
              <div className="text-2xl font-black text-slate-900">12</div>
              <div className="text-xs text-slate-500 font-medium">Opérateurs audités</div>
            </div>
            <div>
              <div className="text-2xl font-black text-sky-600">100%</div>
              <div className="text-xs text-slate-500 font-medium">Financement CEE possible</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">-25%</div>
              <div className="text-xs text-slate-500 font-medium">Sur les charges de chauffage</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600">2027</div>
              <div className="text-xs text-slate-500 font-medium">Échéance décret BACS légale</div>
            </div>
          </div>
        </section>

        {/* Operators Grid */}
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {THERMO_OPERATORS.map((op) => (
              <article
                key={op.slug}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                      {op.type}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{op.ratingValue}</span>
                      <span className="text-slate-400 font-normal">({op.reviewCount})</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-2 hover:text-sky-700 transition">
                    <Link href={`/operateurs/${op.slug}`}>{op.name}</Link>
                  </h2>

                  <p className="text-xs text-slate-500 mb-4 leading-relaxed line-clamp-2">
                    {op.tagline}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {op.bacsCompliant && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        <Cpu className="w-3 h-3" />
                        Décret BACS Conforme
                      </span>
                    )}
                    {op.rgeCertified && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" />
                        RGE / CEE
                      </span>
                    )}
                  </div>

                  {/* Tarifs & Économies */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Coût indicatif / lot :</span>
                      <strong className="text-slate-900">{op.priceRangeLogement}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Régulation chaufferie :</span>
                      <strong className="text-slate-900">{op.priceRangeChaufferie}</strong>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span className="font-medium">Économie attendue :</span>
                      <strong className="font-bold">{op.economieEstimee}</strong>
                    </div>
                  </div>

                  {/* Points forts */}
                  <div className="space-y-1.5 mb-4">
                    {op.pros.slice(0, 2).map((pro, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{pro}</span>
                      </div>
                    ))}
                    {op.cons.slice(0, 1).map((con, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-500">
                        <XCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{con}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hardware brands handled */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Layers className="w-3 h-3 shrink-0 text-slate-400" />
                    <span className="truncate">Équipements : {op.hardwareBrands.slice(0, 3).join(", ")}...</span>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Fiche détaillée</span>
                  <Link
                    href={`/operateurs/${op.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-900 transition"
                  >
                    Voir l'analyse <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Arbitrage Guide Section */}
        <section className="bg-white border-y border-slate-200 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                Comment arbitrer entre exploitant, sous-compteur et intégrateur GTB ?
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Le choix du prestataire idéal dépend de la taille de votre copropriété, de son mode
                de distribution de chaleur (boucle monotube, colonnes montantes ou pieuvre) et de sa chaufferie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">1. Exploitant P1/P2/P3 (Dalkia, ENGIE, Idex)</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Indispensable si la copropriété possède une chaufferie centrale gaz ou fioul puissante (&gt; 70 kW).
                  L'exploitant gère la courbe de chauffe primaire, l'approvisionnement en combustible et la conformité BACS globale.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">2. Spécialiste du Comptage (Proxiserve, Ista, Techem)</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Idéal pour équiper les appartements : pose de robinets thermostatiques connectés radio sur chaque
                  radiateur, individualisation des frais de chauffage et relevé à distance sans déranger les résidents.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">3. Intégrateur BACS &amp; Bureaux d'Études (SOCOTEC, Dalkia SB)</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  À mandater en tant que tiers de confiance pour auditer les chaufferies &gt; 290 kW, certifier la conformité BACS
                  auprès des autorités et s'assurer que les économies promises par l'exploitant sont contractuellement garanties.
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
                Étude Gratuite Syndic &amp; Conseil Syndical
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-4">
                Estimez le montant de vos aides CEE et mettez votre copropriété en conformité
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Précisez le nombre de lots et le type d'énergie de votre immeuble. Recevez un comparatif
                d'opérateurs certifiés RGE avec simulation du reste à charge et présentation en AG.
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
