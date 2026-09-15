import { CityConfig } from "@/lib/db";

export const NATIONAL_CONFIG: CityConfig = {
    slug: "home",
    domain: "thermostatcopropriete.fr",
    name: "Expert Thermostat Copropriété",
    city: "France",
    phoneNumber: "01 84 80 00 00",
    email: "contact@thermostatcopropriete.fr",
    heroImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2940&auto=format&fit=crop",
    description: "Le réseau n°1 de l'équipement et de la régulation thermique en copropriété. Thermostats connectés et systèmes BACS financés par la prime CEE. Devis gratuit.",
    meta: {
        title: "Thermostat Copropriété | Régulation Thermique & Prime CEE",
        description: "Équipement et régulation thermique en copropriété : thermostats connectés et systèmes BACS financés par la prime CEE. Devis gratuit sous 24h."
    },
    features: [
        "Régulation Connectée",
        "Devis Gratuit sous 24h",
        "Financé par la Prime CEE",
        "Techniciens Certifiés"
    ],
    pricing: {
        base: "Sur Devis",
        description: "Devis gratuit personnalisé selon la taille de la copropriété"
    },
    hospitals: [],
    stations: [],
    neighborhoods: [],
    points_of_interest: {
        hotels: [],
        nightlife: [],
        monuments: [],
        parking_difficulty: "N/A"
    }
};
