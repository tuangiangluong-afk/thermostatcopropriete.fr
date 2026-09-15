import Script from "next/script";
import { headers } from "next/headers";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import StructuredData from "@/components/seo/StructuredData";
import AttributionTracker from "@/components/AttributionTracker";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  // Canonical host is ALWAYS this site's own host.
  const canonicalDomain = "www.thermostatcopropriete.fr";
  const path = headersList.get("x-irve-path") || "";
  const baseUrl = `https://${canonicalDomain}`;

  return {
          title: {
    template: `%s | Thermostat Copropriété®`,
    default: `Thermostat Copropriété® - N°1 du suivi et régulation thermique pour syndics de copropriétés et gestionnaires d'immeubles.`,
  },
    description: "Installation de thermostats connectés et régulation thermique pour copropriétés et syndics en France. Conformité décret BACS, 100% pris en charge CEE sans reste à charge. Devis et audit gratuits.",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: "Thermostat Copropriété® - Régulation Thermique & BACS 100% CEE",
      description: "Installation de thermostats connectés et régulation de chauffage collectif pour syndics et copropriétés. Dispositif 100% financé CEE, zéro reste à charge.",
      siteName: "Thermostat Copropriété",
      locale: "fr_FR",
      type: "website",
      url: `${baseUrl}${path}`,
      images: [
        {
          url: `${baseUrl}/api/og`,
          width: 1200,
          height: 630,
          alt: "Thermostat Copropriété® - Régulation thermique et robinets thermostatiques collectifs",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Thermostat Copropriété® - Régulation Thermique & BACS 100% CEE",
      description: "Installation de thermostats connectés et régulation de chauffage collectif pour syndics et copropriétés. Dispositif 100% financé CEE, zéro reste à charge.",
      images: [`${baseUrl}/api/og`],
    },
    icons: {
      icon: "/icon.png",
      shortcut: "/favicon.png",
      apple: "/icon.png",
      other: [
        {
          rel: "icon",
          url: "/favicon.ico",
        }
      ]
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Summary" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NWXCGFP6');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${inter.variable} antialiased bg-white text-slate-900`}>
        <Script src="https://answershaper.com/api/v1/m2m/local-tag/24.js" strategy="lazyOnload" defer />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NWXCGFP6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <AttributionTracker />
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
