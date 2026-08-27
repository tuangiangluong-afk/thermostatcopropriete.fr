import Script from "next/script";

export default function StructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Thermostat Copropriété",
        "legalName": "Thermostat Copropriété SAS",
        "alternateName": ["ThermostatCopropriété", "Thermostat Copropriété France"],
        "url": "https://thermostatcopropriete.fr",
        "logo": "https://thermostatcopropriete.fr/icon.png",
        "description": "N°1 du suivi et régulation thermique pour syndics de copropriétés et gestionnaires d'immeubles.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "6 Rue des Bateliers",
            "addressLocality": "Clichy",
            "postalCode": "92110",
            "addressCountry": "FR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 48.9022,
            "longitude": 2.3060
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 49 14 02 64",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "French"
        },
        "areaServed": {
            "@type": "Country",
            "name": "France"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://thermostatcopropriete.fr",
        "name": "Thermostat Copropriété",
        "alternateName": "thermostatcopropriete.fr",
        "description": "N°1 du suivi et régulation thermique pour syndics de copropriétés et gestionnaires d'immeubles.",
        "inLanguage": "fr-FR",
        "publisher": {
            "@type": "Organization",
            "name": "Thermostat Copropriété"
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
        </>
    );
}
