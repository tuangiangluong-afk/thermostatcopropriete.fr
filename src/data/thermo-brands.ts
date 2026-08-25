// ========================================
// THERMOSTAT BRANDS - 6 fabricants de régulation connectée
// Prix cohérents avec le site : thermostat 190€, robinet 89€
// ========================================

export interface ThermoBrand {
    slug: string; name: string; type: string; gamme: string; compat: string;
    prix: string; modeles: string[]; atouts: string[]; limites: string[]; expertTip: string; image: string;
}

const IMG = {
    netatmo: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2670&auto=format&fit=crop",
    tado: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=2670&auto=format&fit=crop",
    somfy: "https://images.unsplash.com/photo-1585478259715-4b7e4e1b9b3c?q=80&w=2670&auto=format&fit=crop",
    deltadore: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2670&auto=format&fit=crop",
    qivivo: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2670&auto=format&fit=crop",
    legrand: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2670&auto=format&fit=crop",
};

export const THERMO_BRANDS: ThermoBrand[] = [
    {
        slug: "netatmo", name: "Netatmo", type: "Thermostat intelligent", gamme: "Thermostat, robinets, capteurs",
        compat: "Chaudières collectives et individuelles (bus OpenTherm + relais)", prix: "190 € à 250 € / logement",
        modeles: ["Netatmo Thermostat", "Netatmo Valve", "Netatmo Énergie"],
        atouts: [
            "La référence française de la régulation connectée",
            "Compatible avec les chaufferies collectives via relais",
            "App et pilotage vocal (Alexa, Google, HomeKit)",
            "Détection d'ouverture de fenêtre : coupe le chauffage"
        ],
        limites: ["Nécessite un relais pour chaudières collectives", "Écosystème moins intégré aux GTC que Somfy/Delta Dore"],
        expertTip: "Netatmo est le choix des copropriétés qui veulent du plug-and-play : chaque logement s'équipe de façon indépendante, sans toucher à la chaufferie centrale.",
        image: IMG.netatmo,
    },
    {
        slug: "tado", name: "Tado", type: "Régulation par pièce", gamme: "Thermostats, vannes, capteurs",
        compat: "Chaudières, pompes à chaleur, planchers chauffants", prix: "199 € à 280 € / logement",
        modeles: ["Tado Smart Thermostat", "Tado V3+", "Tado Kit Extension"],
        atouts: [
            "L'expert européen de la régulation par pièce",
            "Géorepérage : coupe le chauffage quand le logement est vide",
            "Détection des fenêtres ouvertes sur chaque vanne",
            "Optimisation chaudière : jusqu'à 25% d'économies"
        ],
        limites: ["Abonnement payant pour certaines fonctions (Climates React)", "Installation plus technique sur chaudière collective"],
        expertTip: "Le géorepérage Tado est le plus performant du marché : dans une copropriété où 40% des logements sont vides la journée, l'économie est immédiate et mesurable.",
        image: IMG.tado,
    },
    {
        slug: "somfy", name: "Somfy", type: "Régulation connectée", gamme: "Thermostats, robinets, domotique",
        compat: "Chaufferies collectives, Tado/Netatmo compatibles, TaHoma", prix: "180 € à 240 € / logement",
        modeles: ["Somfy Thermostat", "Somfy Zigbee", "Somfy TaHoma"],
        atouts: [
            "Le géant français de la maison connectée",
            "Intégration domotique TaHoma : volets + chauffage + alarme",
            "Pilotage par pièce avec robinets connectés",
            "Compatibilité avec les GTC de chaufferie"
        ],
        limites: ["Écosystème propriétaire (TaHoma)", "Prix des accessoires"],
        expertTip: "Si la copropriété veut coupler la régulation du chauffage aux volets roulants (scénario été/hiver), l'écosystème Somfy TaHoma est le plus complet.",
        image: IMG.somfy,
    },
    {
        slug: "delta-dore", name: "Delta Dore", type: "Régulation bâtiment", gamme: "Thermostats, vannes, GTC",
        compat: "Chaufferies collectives, télégestion, GTB", prix: "170 € à 220 € / logement",
        modeles: ["Delta Dore Tydom", "Delta Dore Miway", "Delta Dore GTC"],
        atouts: [
            "Le spécialiste français de la régulation du bâtiment",
            "Solution GTC complète pour les chaufferies collectives",
            "Très répandu dans le parc de copropriétés français",
            "Pilotage centralisé par le syndic ou l'exploitant"
        ],
        limites: ["Interface moins grand public que Netatmo", "Nécessite souvent un installateur agréé"],
        expertTip: "Pour les copropriétés équipées de vannes Delta Dore, l'extension connectée est l'option la moins chère : on conserve l'existant et on ajoute le pilotage à distance.",
        image: IMG.deltadore,
    },
    {
        slug: "qivivo", name: "Qivivo", type: "Régulation connectée", gamme: "Thermostats, sondes, programmation",
        compat: "Chaufferies, chauffe-eau, clim réversible", prix: "180 € à 230 € / logement",
        modeles: ["Qivivo Thermostat", "Qivivo Sonde", "Qivivo App"],
        atouts: [
            "La pépite française de la régulation intelligente",
            "Algorithmes d'auto-apprentissage des habitudes",
            "Mesure d'occupation par sonde sans contact",
            "Conforme CEE 'Coup de pouce Pilotage'"
        ],
        limites: ["Moins connu du grand public", "Gamme d'accessoires restreinte"],
        expertTip: "Qivivo est conçu pour le CEE 'Coup de pouce Pilotage du chauffage' : sa conformité native simplifie le dossier de prime énergie du syndic.",
        image: IMG.qivivo,
    },
    {
        slug: "legrand", name: "Legrand", type: "Régulation et électrique", gamme: "Thermostats, robinets, écosystème",
        compat: "Chaufferies, programmeurs, Home + Control", prix: "175 € à 225 € / logement",
        modeles: ["Legrand Thermostat", "Legrand Home + Control", "Legrand Valise"],
        atouts: [
            "Le n°1 de l'appareillage électrique français",
            "Écosystème Home + Control complet",
            "Installation par les électriciens du bâtiment",
            "Compatible avec la plupart des chaufferies"
        ],
        limites: ["Moins orienté chauffage collectif que Delta Dore", "App moins aboutie que Netatmo/Tado"],
        expertTip: "Si la copropriété rénove l'électricité des parties communes en même temps, Legrand s'intègre naturellement au projet : un seul intervenant pour l'élec et la régulation.",
        image: IMG.legrand,
    },
];

export function getThermoBrandBySlug(slug: string): ThermoBrand | undefined {
    return THERMO_BRANDS.find((b) => b.slug === slug);
}