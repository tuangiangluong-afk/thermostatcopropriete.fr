import Script from "next/script";

export default function StructuredData() {
    const baseUrl = "https://thermostatcopropriete.fr";
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Thermostat Copropriété",
        "legalName": "Thermostat Copropriété SAS",
        "alternateName": ["Thermostat Copro", "Thermostat Copropriété Official"],
        "url": baseUrl,
        "logo": `${baseUrl}/icon.png`,
        "description": "N°1 du suivi et régulation thermique pour syndics de copropriétés et gestionnaires d'immeubles.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "6 Rue des Bateliers",
            "addressLocality": "Paris",
            "postalCode": "92110",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 49 14 02 64",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "fr-FR"
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
        "alternateName": "thermostatcopropriete.fr",
        "description": "N°1 du suivi et régulation thermique pour syndics de copropriétés et gestionnaires d'immeubles.",
        "inLanguage": "fr-FR",
        "publisher": {
            "@id": `${baseUrl}/#organization`,
            "@type": "Organization",
            "name": "Thermostat Copropriété"
        }
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Thermostat Copropriété",
        "provider": {
            "@id": `${baseUrl}/#organization`,
            "@type": "Organization",
            "name": "Thermostat Copropriété"
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        },
        "description": "N°1 du suivi et régulation thermique pour syndics de copropriétés et gestionnaires d'immeubles.",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "148",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    return (
        <>
            <Script
                id="org-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
        </>
    );
}
