import Script from "next/script";

export default function StructuredData() {
    const baseUrl = "https://www.thermostatcopropriete.fr";

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Thermostat Copropriété",
        "legalName": "Thermostat Copropriété SAS",
        "url": baseUrl,
        "logo": `${baseUrl}/icon.png`,
        "image": `${baseUrl}/icon.png`,
        "description": "Équipement complet des immeubles et résidences en têtes thermostatiques connectées (CEE).",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "5 Rue du Faubourg Saint-Honoré",
            "addressLocality": "Paris",
            "postalCode": "75008",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 84 80 00 00",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": ["fr-FR", "en-US"]
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Thermostat Copropriété",
        "description": "Équipement complet des immeubles et résidences en têtes thermostatiques connectées (CEE).",
        "inLanguage": "fr-FR",
        "publisher": {
            "@id": `${baseUrl}/#organization`,
            "@type": "Organization",
            "name": "Thermostat Copropriété"
        }
    };

    // Clean Service Schema: NO aggregateRating or review (Services are not eligible for Google review snippets)
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${baseUrl}/#service`,
        "name": "Installation Thermostats Connectés en Copropriété",
        "serviceType": "Installation Thermostats Connectés en Copropriété",
        "provider": {
            "@id": `${baseUrl}/#organization`,
            "@type": "Organization",
            "name": "Thermostat Copropriété"
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        },
        "description": "Équipement complet des immeubles et résidences en têtes thermostatiques connectées (CEE).",
    };

    // Eligible Product Schema: 100% compliant with Google Product & Review Snippets
    // « Service » et non « Product » : ce site ne vend pas un produit catalogue,
    // il met en relation avec des professionnels. Un Product ici est un balisage
    // inexact (stock, SKU, livraison) que Google peut ignorer ou signaler.
    const serviceOfferSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${baseUrl}/#service-offer`,
        "name": "Système de Régulation Thermostatique Connectée pour Copropriété",
        "image": [
            `${baseUrl}/icon.png`
        ],
        "description": "Pack de vannes et thermostats connectés communicants pour chauffage collectif, 100% financé CEE.",
        "brand": {
            "@type": "Brand",
            "name": "Thermostat Copropriété"
        },
    };

    return (
        <>
            <Script
                id="org-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <Script
                id="website-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <Script
                id="service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <Script
                id="service-offer-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceOfferSchema) }}
            />
        </>
    );
}
