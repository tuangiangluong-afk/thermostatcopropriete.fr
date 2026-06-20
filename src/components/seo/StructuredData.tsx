import Script from "next/script";

export default function StructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Expert Béton Décoratif",
        "url": "https://www.expertbetondecoratif.com",
        "logo": "https://www.expertbetondecoratif.com/logo.png",
        "description": "Réseau national d'artisans spécialisés dans la pose de béton décoratif (désactivé, imprimé, lissé) pour terrasses, allées et plages de piscine en France.",
        "sameAs": [],
        "foundingDate": "2020",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "01 84 80 00 00",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "French"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.expertbetondecoratif.com/ville/{search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://www.expertbetondecoratif.com",
        "name": "expertbetondecoratif",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.expertbetondecoratif.com/ville/{search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Pose de Béton Décoratif",
        "provider": { "@type": "Organization", "name": "expertbetondecoratif" },
        "areaServed": { "@type": "Country", "name": "France" }
    };

    
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": []
    };

    return (
        <Script
            id="org-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) + '\n' + JSON.stringify(websiteSchema) + '\n' + JSON.stringify(serviceSchema) + '\n' + JSON.stringify(faqSchema) }}
        />
    );
}
