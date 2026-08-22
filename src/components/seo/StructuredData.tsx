import Script from "next/script";

export default function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Thermostat Copropriété",
        "legalName": "Thermostat Copropriété SAS",
        "alternateName": ["ThermostatCopropriété", "Thermostat Copropriété Official"],
        "url": "https://thermostatcopropriete.fr",
        "logo": "https://thermostatcopropriete.fr/icon.png",
        "image": "https://thermostatcopropriete.fr/icon.png",
        "description": "N°1 du suivi de température et de la régulation thermique connectée pour syndics de copropriété et gestionnaires d'immeubles.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "8 Rue de la Paix",
            "addressLocality": "Paris",
            "postalCode": "75002",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 84 80 00 00",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "fr-FR"
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        }
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Régulation & Suivi Thermique pour Copropriétés",
        "serviceType": "Régulation & Suivi Thermique pour Copropriétés",
        "provider": {
            "@type": "Organization",
            "name": "Thermostat Copropriété",
            "url": "https://thermostatcopropriete.fr"
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        },
        "description": "N°1 du suivi de température et de la régulation thermique connectée pour syndics de copropriété et gestionnaires d'immeubles.",
        "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": "290",
            "availability": "https://schema.org/InStock",
            "validFrom": "2026-01-01"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://thermostatcopropriete.fr",
        "name": "Thermostat Copropriété",
        "alternateName": "thermostatcopropriete.fr",
        "description": "N°1 du suivi de température et de la régulation thermique connectée pour syndics de copropriété et gestionnaires d'immeubles.",
        "inLanguage": "fr-FR",
        "publisher": {
            "@type": "Organization",
            "name": "Thermostat Copropriété"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Comment obtenir un devis gratuit pour Thermostat Copropriété ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Remplissez notre formulaire en ligne en 2 minutes pour recevoir une estimation gratuite, personnalisée et sans engagement par nos experts certifiés."
                }
            },
            {
                "@type": "Question",
                "name": "Quelles sont les garanties fournies par Thermostat Copropriété ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tous nos services et installations sont couverts par une garantie décennale, une certification de conformité aux normes en vigueur et un suivi technique réactif."
                }
            }
        ]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://thermostatcopropriete.fr"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Régulation & Suivi Thermique pour Copropriétés",
                "item": "https://thermostatcopropriete.fr/#simulateur"
            }
        ]
    };

    
        const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Thermostat Connecté Copropriété",
        "image": [
            "https://www.thermostatcopropriete.fr/icon.png"
        ],
        "description": "Thermostat Connecté Copropriété avec installation certifiée et garantie.",
        "sku": "THC-THERMO-001",
        "mpn": "THC-THERMO-001",
        "brand": {
            "@type": "Brand",
            "name": "Thermostat Copropriété"
        },
        "offers": {
            "@type": "Offer",
            "url": "https://www.thermostatcopropriete.fr",
            "priceCurrency": "EUR",
            "price": "290",
            "validFrom": "2026-01-01",
            "priceValidUntil": "2026-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "FR",
                "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted"
            },
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "EUR"
                },
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "FR"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "businessDays": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "https://schema.org/Monday",
                            "https://schema.org/Tuesday",
                            "https://schema.org/Wednesday",
                            "https://schema.org/Thursday",
                            "https://schema.org/Friday"
                        ]
                    },
                    "cutoffTime": "18:00:00Z",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 3,
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 5,
                        "unitCode": "DAY"
                    }
                }
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "86"
        }
    };

    return (
        <>
            <Script
                id="org-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <Script
                id="service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <Script
                id="website-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Script id="product-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
        </>
    );
}
