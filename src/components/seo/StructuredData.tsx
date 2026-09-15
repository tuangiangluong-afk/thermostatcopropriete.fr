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
        "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": "0",
            "availability": "https://schema.org/InStock",
            "validFrom": "2026-01-01"
        }
    };

    // Eligible Product Schema: 100% compliant with Google Product & Review Snippets
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${baseUrl}/#product`,
        "name": "Système de Régulation Thermostatique Connectée pour Copropriété",
        "image": [
            `${baseUrl}/icon.png`
        ],
        "description": "Pack de vannes et thermostats connectés communicants pour chauffage collectif, 100% financé CEE.",
        "sku": "TCP-THERMO-001",
        "mpn": "TCP-THERMO-001",
        "brand": {
            "@type": "Brand",
            "name": "Thermostat Copropriété"
        },
        "offers": {
            "@type": "Offer",
            "url": `${baseUrl}/#simulateur`,
            "priceCurrency": "EUR",
            "price": "0",
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
                id="product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
        </>
    );
}
