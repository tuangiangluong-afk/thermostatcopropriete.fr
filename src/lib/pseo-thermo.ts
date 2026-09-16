import type { CityConfig } from "@/lib/db";
import type { ThermoBrand } from "@/data/thermo-brands";
import { composeLocalIntro } from "@/lib/pseo-local";

const REGIONAL: Record<string, { conseil: string; prix: string }> = {
    "75": { conseil: "À Paris, la densité de copropriétés est la plus forte de France : les CEE 'Coup de pouce Pilotage' sont cumulables avec les aides de la Ville de Paris pour la rénovation énergétique.", prix: "190 € – 250 € / logement" },
    "69": { conseil: "Lyon Métropole encourage la régulation du chauffage collectif via son Plan Climat : les copropriétés peuvent bénéficier d'aides cumulables avec les CEE.", prix: "190 € – 240 € / logement" },
    "13": { conseil: "Dans les Bouches-du-Rhône, le chauffage collectif est très répandu : la régulation connectée est le premier geste d'économie, avant l'isolation.", prix: "190 € – 240 € / logement" },
    "06": { conseil: "La Côte d'Azur concentre des copropriétés de standing : les solutions de pilotage connecté (Somfy/Delta Dore) sont privilégiées pour leur intégration domotique.", prix: "200 € – 250 € / logement" },
    "33": { conseil: "Bordeaux Métropole aide les copropriétés à rénover leur chauffage : cumul CEE + aides locales, jusqu'à 40% du reste à charge couvert.", prix: "190 € – 240 € / logement" },
    "59": { conseil: "Dans le Nord, le chauffage collectif au gaz est la norme dans les copropriétés anciennes : la régulation connectée réduit la facture de 15 à 20% dès la première année.", prix: "185 € – 230 € / logement" },
};

const DEFAULT = { conseil: "Notre réseau de professionnels agréés CEE déploie la régulation connectée dans les copropriétés de votre ville, avec un audit gratuit et le montage du dossier de prime énergie.", prix: "190 € – 250 € / logement" };

export interface PseoThermoContent {
    meta_title: string; meta_description: string; hero_title: string; intro_html: string;
    prix: string; local_conseil: string; conseil_html: string;
    faqs: { question: string; reponse: string }[]; expert_tip: string; atouts: string[];
}

function hash(s: string): number { return s.split("").reduce((a, c) => a + c.charCodeAt(0), 0); }

export function getPseoThermoContent(city: CityConfig, marque: ThermoBrand): PseoThermoContent {
    const dept = (city.department || "").substring(0, 2);
    const r = REGIONAL[dept] || DEFAULT;
    const h = hash(city.city + marque.slug);

    // Intro : six emplacements factuels assemblés par pseo-local.ts, comme sur la
    // page ville. L'ancienne version piochait un texte parmi deux par hash, donc
    // toutes les copropriétés de France recevaient la même introduction à un mot
    // près : le motif « doorway ».
    const intro_html = composeLocalIntro(
        {
            city: city.city,
            postal: city.postalCode,
            deptCode: dept,
            region: city.region,
            quartiers: city.neighborhoods,
            authority: "le conseil syndical et le gestionnaire de l'immeuble",
        },
        {
            audience: "Les conseils syndicaux et les copropriétés",
            service: "l'audit du chauffage collectif et la mise en place d'un pilotage connecté",
            norms: "le décret BACS et la norme NF EN 15232",
            document: "le carnet d'entretien de l'immeuble",
            authorityLabel: "l'instance décisionnaire",
            project: "votre projet de rénovation énergétique",
        },
        {
            openers: [
                (f) => `À ${f.city}, le chauffage collectif se pilote logement par logement avec un thermostat ${marque.name}.`,
                (f) => `Votre copropriété à ${f.city}${f.postal ? ` (${f.postal})` : ""} peut être équipée de la gamme ${marque.name} (${marque.modeles[0]}) sans travaux dans la chaufferie.`,
                (f) => `À ${f.city}, la pose d'un thermostat ${marque.name} prend une heure par logement.`,
                (f) => `Réguler le chauffage collectif à ${f.city} avec ${marque.name} : chaque logement maîtrise sa consommation, la copropriété réduit sa facture de 15 à 20 %.`,
                (f) => `Le budget par logement à ${f.city} part de ${marque.prix}, avant déduction des primes CEE « Coup de pouce Pilotage ».`,
                (f) => `Un conseil syndical à ${f.city} peut équiper l'immeuble en ${marque.name} logement par logement, au rythme des volontaires.`,
            ],
            middles: [
                () => `L'audit du chauffage collectif précède le devis : il identifie les points de régulation à reprendre dans l'immeuble.`,
                () => `La pose dure une heure par logement et ne nécessite aucune intervention sur la chaufferie.`,
                () => `Les primes CEE « Coup de pouce Pilotage » couvrent jusqu'à 200 € par lot, et le montage du dossier est pris en charge.`,
                () => `Chaque copropriétaire garde la main sur sa température : la régulation par logement remplace le réglage collectif unique.`,
                () => `Le pilotage installé respecte le décret BACS et la norme NF EN 15232.`,
                () => `Le carnet d'entretien de l'immeuble est mis à jour après l'installation, pour les contrôles ultérieurs.`,
            ],
        },
        h,
    );

    return {
        meta_title: `Thermostat ${marque.name} copropriété à ${city.city}${city.department ? ` (${city.department})` : ""} | CEE & Devis`,
        meta_description: `Installation de thermostat connecté ${marque.name} en copropriété à ${city.city}. ${marque.prix} avant CEE. Audit gratuit, primes CEE 'Coup de pouce'.`,
        hero_title: `<span class="text-rose-600">Thermostat ${marque.name}</span> pour copropriété à ${city.city}`,
        intro_html,
        prix: marque.prix,
        local_conseil: r.conseil,
        conseil_html: `<div class="bg-rose-50 border border-rose-100 rounded-xl p-4 mb-6"><p class="text-sm text-slate-700"><strong>À ${city.city} :</strong> ${r.conseil}</p></div>`,
        faqs: [
            { question: `Quel est le prix d'un thermostat ${marque.name} en copropriété à ${city.city} ?`, reponse: `Comptez ${marque.prix} par logement, pose comprise, avant CEE. L'audit est gratuit.` },
            { question: `Quelles primes CEE pour un thermostat ${marque.name} à ${city.city} ?`, reponse: `Le CEE 'Coup de pouce Pilotage du chauffage' finance jusqu'à 200€ par logement. Cumulable avec les aides locales.` },
            { question: `Combien de temps pour équiper une copropriété en ${marque.name} ?`, reponse: `La pose prend 1h par logement. Pour une copropriété de 30 lots, le déploiement prend 2 à 3 semaines, au rythme des logements volontaires.` },
        ],
        expert_tip: marque.expertTip,
        atouts: marque.atouts,
    };
}