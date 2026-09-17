import type { CityConfig } from "@/lib/db";
import { departementFromPostal, type Departement } from "@/data/fr-departements";
import { composeLocalIntro } from "@/lib/pseo-local";

export interface PseoPageContent {
    meta_title: string;
    meta_description: string;
    hero_title: string;
    hero_badge: string;
    intro_html: string;
    cta_primary: string;
    pricing_estimated: string;
    regional_subsidy: string;
    expert_tip: string;
    local_climate_info?: string;
    installation_timeline?: string;
    local_compliance_info?: string;
    /** Faits locaux vérifiables, affichés en bloc sur la page ville */
    local_facts?: { label: string; value: string }[];
    /** Contrainte locale (rigueur climatique, altitude) */
    local_risk_factor?: string;
}

const PRICE_RANGE = "120 € – 180 € / radiateur";
const BACS_PRIME = "Prime CEE (régulation et pilotage)";

// Échéances réelles du décret BACS (art. R. 131-38 du Code de la construction)
const BACS_1 = "1er janvier 2025 pour les bâtiments de plus de 290 kW";
const BACS_2 = "1er janvier 2027 pour les bâtiments de plus de 70 kW";

// Profil climatique par région : détermine la longueur de la saison de chauffe,
// donc l'intérêt économique d'une régulation fine.
const HIVER_FROID = new Set([
    "Hauts-de-France", "Grand Est", "Bourgogne-Franche-Comté",
    "Auvergne-Rhône-Alpes", "Île-de-France",
]);
const HIVER_DOUX = new Set([
    "Provence-Alpes-Côte d'Azur", "Occitanie", "Corse",
]);

// ========================================
// CONTEXTE LOCAL RÉEL
// ========================================
interface LocalContext {
    city: string;
    postal: string;
    /** Communes limitrophes réelles, et non des quartiers inventés */
    zones: string[];
    dept?: Departement;
    deptCode: string;
    deptName: string;
    region: string;
    prefecture: string;
    froid: boolean;
    doux: boolean;
    montagne: boolean;
    littoral: boolean;
}

function buildContext(c: CityConfig): LocalContext {
    const postal = c.postalCode || "";
    const dept = departementFromPostal(postal);
    const region = dept?.region || c.region || "France";
    return {
        city: c.city,
        postal,
        // Communes limitrophes réelles (et non la liste de quartiers du maillage)
        zones: (c.zones || []).map((z) => z.nom),
        dept,
        deptCode: dept?.code || c.department || "",
        deptName: dept?.name || "France",
        region,
        prefecture: dept?.prefecture || "",
        froid: HIVER_FROID.has(region),
        doux: HIVER_DOUX.has(region),
        montagne: !!dept?.montagne,
        littoral: !!dept?.littoral,
    };
}

/** Hash déterministe : deux villes voisines ne doivent pas recevoir le même texte. */
function hash(...parts: (string | number)[]): number {
    const s = parts.join("|");
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return Math.abs(h);
}

const pick = <T,>(arr: T[], h: number): T => arr[h % arr.length];

// ========================================
// PARAGRAPHES D'OUVERTURE (région / préfecture / décret)
// ========================================
const OPENERS: ((c: LocalContext) => string)[] = [
    (c) => `<p class="mb-4 leading-relaxed">Vous gérez une copropriété ou un immeuble collectif à <strong>${c.city}${c.postal ? ` (${c.postal})` : ""}</strong> ? La régulation du chauffage collectif est désormais encadrée par le <strong>décret BACS</strong>, dont les échéances s'appliquent nationalement : ${BACS_1}, puis ${BACS_2}. Votre immeuble se situe en <strong>${c.region}</strong>${c.deptCode ? `, département ${c.deptCode} (${c.deptName})` : ""}.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">À <strong>${c.city}</strong>, réduire la facture de chauffage d'un immeuble collectif passe d'abord par la régulation : robinets thermostatiques sur chaque radiateur et pilotage central de la production. Le gain dépend directement de la rigueur du climat local — et en ${c.region}, la saison de chauffe ${c.froid ? "est longue" : c.doux ? "reste courte" : "reste modérée"}.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">Recherchez-vous une <strong>entreprise de régulation thermique pour copropriété à ${c.city}${c.postal ? ` (${c.postal})` : ""}</strong> ? Nous intervenons sur le département ${c.deptCode}, en <strong>${c.region}</strong>, pour équiper les radiateurs de robinets thermostatiques connectés et installer la régulation centrale exigée par le décret BACS.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">À <strong>${c.city}</strong>, la mise en conformité au décret BACS relève de la responsabilité du propriétaire ou du syndicat des copropriétaires. Les seuils sont publics et s'appliquent à tous : ${BACS_1} et ${BACS_2}. Anticiper évite l'urgence et permet de préparer le budget en assemblée générale.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">Équiper les radiateurs d'un immeuble à <strong>${c.city}</strong> (${c.region}) est un investissement qui se lit sur deux lignes du budget : moins de kWh consommés pour un même confort, et conformité réglementaire. ${c.froid ? "Dans une région au climat froid, l'effet de la régulation fine sur la consommation annuelle est particulièrement marqué." : "La régulation permet de ne pas chauffer inutilement les logements et les parties communes."}</p>`,
    (c) => `<p class="mb-4 leading-relaxed">Projet de rénovation de la régulation à <strong>${c.city}</strong> ? Avant de chiffrer, il faut compter les radiateurs, identifier la production (collective ou individuelle) et vérifier si l'immeuble dépasse les seuils du décret BACS. Notre visite technique est gratuite et sans engagement.</p>`,
];

// ========================================
// PARAGRAPHES TECHNIQUES (communes limitrophes réelles + prestations)
// ========================================
const MIDDLES: ((c: LocalContext) => string)[] = [
    (c) => `<p class="mb-4 leading-relaxed">${c.zones.length >= 2 ? `Nos équipes interviennent dans les communes limitrophes suivantes : <strong>${c.zones.slice(0, 3).join(", ")}</strong>.` : "Nos équipes couvrent la commune et les communes voisines."} Pose de robinets thermostatiques, régulation centrale, équilibrage des colonnes et télésuivi des consommations.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">${c.zones.length >= 2 ? `Interventions régulières à <strong>${c.zones.slice(0, 3).join(", ")}</strong>.` : "Interventions régulières sur la commune."} L'équilibrage hydraulique est indispensable : sans lui, les logements les plus éloignés de la chaufferie restent froids même avec des robinets neufs.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">${c.zones.length >= 2 ? `À ${c.city} et dans les communes voisines : <strong>${c.zones.slice(0, 3).join(", ")}</strong>,` : `Sur tous les immeubles de ${c.city},`} nous adaptons la solution au type de réseau : colonnes montantes, chauffage individuel gaz ou réseau de chaleur urbain.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">Sur le département ${c.deptCode} : ${c.zones.length >= 2 ? `nous suivons en priorité les copropriétés de <strong>${c.zones.slice(0, 3).join(", ")}</strong>.` : "nous suivons les copropriétés de la commune."} Devis détaillé par logement, utile pour la présentation en assemblée générale.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">${c.zones.length >= 2 ? `Zones déjà couvertes par nos équipes : <strong>${c.zones.slice(0, 3).join(", ")}</strong>.` : "Déjà équipés sur la commune."} Robinets thermostatiques connectés avec programmation horaire et suivi à distance, ou modèles classiques selon le budget voté.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">${c.zones.length >= 2 ? `Secteurs couverts : <strong>${c.zones.slice(0, 3).join(", ")}</strong> et environs.` : "Couverture communale complète."} Après pose, nous accompagnons le syndic sur la déclaration d'achèvement et le dossier de prime CEE.</p>`,
];

// ========================================
// CONTRAINTE LOCALE
// ========================================
function localParagraph(c: LocalContext): string {
    if (c.montagne) {
        return `<p class="leading-relaxed">Contexte local : le département ${c.deptCode} (${c.deptName}) comprend des zones d'altitude, où la saison de chauffe est nettement plus longue qu'en plaine. Sur ces communes, la régulation fine et la programmation par zone produisent un gain de consommation supérieur à la moyenne nationale.</p>`;
    }
    if (c.froid) {
        return `<p class="leading-relaxed">Contexte local : les régions du nord et de l'est de la France connaissent une saison de chauffe longue, avec des températures extérieures basses plusieurs mois par an. En ${c.region}, c'est précisément dans ces conditions que la régulation pièce par pièce et le pilotage central produisent l'économie la plus importante sur la facture annuelle.</p>`;
    }
    if (c.doux) {
        return `<p class="leading-relaxed">Contexte local : en ${c.region}, la saison de chauffe reste courte mais les immeubles disposent souvent de réseaux anciens peu régulés. L'enjeu local est moins la quantité de chaleur que les <strong>surconsommations d'intersaison</strong>, quand le chauffage collectif tourne alors que les apports solaires suffisent déjà.</p>`;
    }
    return `<p class="leading-relaxed">Contexte local : sur le département ${c.deptCode} (${c.deptName}), la saison de chauffe est modérée, ce qui rend les <strong>surconsommations d'intersaison</strong> et les logements surchauffés d'autant plus visibles dans les charges. La régulation par logement corrige directement ce point.</p>`;
}

// ========================================
// CONSEILS D'EXPERT (ancrés localement, jamais inventés)
// ========================================
const TIPS: ((c: LocalContext) => string)[] = [
    (c) => `À ${c.city}, le décret BACS impose des échéances précises : ${BACS_1}, puis ${BACS_2}. Ces seuils sont nationaux et concernent les copropriétés comme le tertiaire.`,
    (c) => `La pose de robinets thermostatiques est généralement compatible avec un réseau existant : elle ne nécessite pas de remplacer les radiateurs.`,
    (c) => `Un robinet thermostatique seul ne suffit pas s'il n'est pas piloté par une régulation centrale : c'est l'ensemble qui est exigé par le décret BACS.`,
    (c) => `À ${c.city}, la prime CEE (Certificats d'Économies d'Énergie) peut couvrir une part importante du coût des travaux de régulation, à condition de respecter les exigences techniques de l'opération.`,
    (c) => `${c.zones.length ? `À ${c.city} comme dans les communes voisines : ${c.zones.slice(0, 2).join(" et ")}, ` : `À ${c.city}, `}l'équilibrage des colonnes montantes est souvent l'étape oubliée : sans lui, les logements mal desservis restent froids malgré des robinets neufs.`,
    (c) => `En ${c.region}, la programmation horaire et le passage en mode réduit la nuit comptent autant que la température de consigne, surtout en intersaison.`,
    (c) => `Chaque logement doit pouvoir agir sur sa propre consommation : c'est le principe de la régulation pièce par pièce, et c'est aussi ce qui limite les litiges entre copropriétaires.`,
    (c) => `Avant de voter les travaux en ${c.city}, faites chiffrer le nombre exact de radiateurs : c'est la base du budget, et un comptage approximatif provoque toujours un dépassement en assemblée générale.`,
    (c) => `${c.froid ? `Dans une région au climat froid comme ${c.region}, la régulation produit son effet sur une longue saison de chauffe : le temps de retour sur investissement est plus court qu'au sud.` : `En ${c.region}, où la saison de chauffe est plus courte, le gain vient surtout de la suppression des surchauffes d'intersaison.`}`,
    (c) => `Le suivi des consommations par logement (télésuivi) permet de détecter immédiatement un dysfonctionnement et d'éviter qu'il se répète sur toute une saison.`,
    (c) => `À ${c.city}, la régulation centrale se pilote aujourd'hui à distance : le syndic peut ajuster la courbe de chauffe sans attendre une intervention sur place.`,
    (c) => `Toute intervention sur le chauffage collectif doit s'accompagner d'une mise à jour du registre de sécurité et des carnets d'entretien de l'immeuble.`,
];

// ========================================
// GÉNÉRATEUR
// ========================================
export async function getPseoContent(cityConfig: CityConfig, _targetType: string = "MIXED"): Promise<PseoPageContent> {
    const c = buildContext(cityConfig);
    const h = hash(c.city, c.postal, c.deptCode);

    const realPrice = cityConfig.pricing?.base || PRICE_RANGE;
    const postalSpan = c.postal ? ` <span class="text-slate-400 text-3xl">(${c.postal})</span>` : "";
    const isFrance = c.city.toLowerCase() === "france";

    const metaTitles = [
        `Thermostat Copropriété ${c.city} (${c.postal}) | Régulation BACS`,
        `Régulation Chauffage Collectif ${c.city} | ${c.deptName}`,
        `Robinets Thermostatiques ${c.city} | Conformité Décret BACS`,
        `Thermostat Collectif ${c.city} (${c.deptCode}) | Devis Gratuit`,
        `Régulation Thermique Copropriété ${c.city} | ${c.region}`,
    ];
    const meta_title = isFrance ? "Thermostat & Régulation de Copropriété en France | Décret BACS" : pick(metaTitles, h);

    const metaDescs = [
        `Pose de robinets thermostatiques et régulation centrale pour copropriété à ${c.city} (${c.postal}). Conformité décret BACS et prime CEE. Visite technique gratuite.`,
        `Régulation du chauffage collectif à ${c.city}, en ${c.region} : robinets thermostatiques connectés, pilotage central et équilibrage des colonnes. Devis gratuit.`,
        `Mise en conformité au décret BACS à ${c.city} : régulation pièce par pièce et pilotage central. Estimatif par radiateur et accompagnement du syndic.`,
        `Thermostat collectif à ${c.city} (${c.deptName}) : réduction des charges de chauffage, prime CEE et accompagnement en assemblée générale.`,
        `Spécialiste de la régulation thermique en copropriété à ${c.city} : robinets thermostatiques, sonde extérieure et télésuivi. Devis sous 24h.`,
    ];
    const meta_description = pick(metaDescs, h >> 3);

    const hero_title = `Thermostat <span class="text-blue-600">Copropriété</span> à ${c.city}${postalSpan}`;

    const intro_html = composeLocalIntro(
        {
            city: c.city, postal: c.postal, deptCode: c.deptCode, deptName: c.deptName,
            region: c.region, prefecture: c.prefecture, zones: c.zones,
            authority: "le conseil syndical et le gestionnaire de l'immeuble",
            littoral: c.littoral, montagne: c.montagne,
        },
        {
            audience: "Les conseils syndicaux et les copropriétés",
            service: "l'audit du chauffage collectif et la mise en place d'un pilotage connecté",
            norms: "le décret BACS et la norme NF EN 15232",
            document: "le carnet d'entretien de l'immeuble",
            authorityLabel: "l'instance décisionnaire",
            project: "votre projet de rénovation énergétique",
        },
        { openers: OPENERS.map((fn) => () => fn(c)), middles: MIDDLES.map((fn) => () => fn(c)) },
        h,
    ) + localParagraph(c);
    const expert_tip = pick(TIPS, h >> 7)(c);

    const local_facts: { label: string; value: string }[] = [];
    if (c.deptCode) local_facts.push({ label: "Département", value: `${c.deptCode} — ${c.deptName}` });
    if (c.region !== "France") local_facts.push({ label: "Région", value: c.region });
    if (c.prefecture) local_facts.push({ label: "Préfecture", value: c.prefecture });
    local_facts.push({
        label: "Profil climatique",
        value: c.froid ? "Hiver froid — saison de chauffe longue" : c.doux ? "Hiver doux — saison de chauffe courte" : "Hiver tempéré",
    });
    local_facts.push({ label: "Échéance BACS", value: "1er janvier 2027 (bâtiments > 70 kW)" });
    if (c.postal) local_facts.push({ label: "Code postal", value: c.postal });
    local_facts.push({ label: "Coût indicatif", value: PRICE_RANGE });
    if (c.montagne) local_facts.push({ label: "Contrainte", value: "Zone d'altitude — chauffe prolongée" });

    const local_risk_factor = c.montagne
        ? "Altitude — saison de chauffe prolongée"
        : c.froid
            ? "Climat froid — longue saison de chauffe"
            : c.doux
                ? "Surconsommations d'intersaison"
                : "Saison de chauffe modérée";

    const timelineOptions = [
        "Visite technique sous 48h, pose en 1 à 2 jours par cage d'escalier",
        "Devis sous 24h, intervention planifiée en 2 à 4 semaines",
        "Étude gratuite, travaux réalisés hors saison de chauffe",
    ];

    return {
        meta_title,
        meta_description,
        hero_title,
        hero_badge: c.froid
            ? "Régulation optimisée pour climat froid"
            : "Conformité décret BACS & prime CEE",
        intro_html,
        cta_primary: pick(
            [
                "Demander une visite technique gratuite",
                "Obtenir mon devis copropriété",
                "Vérifier mon obligation BACS",
            ],
            h >> 11
        ),
        pricing_estimated: realPrice,
        regional_subsidy: BACS_PRIME,
        expert_tip,
        local_climate_info: expert_tip,
        installation_timeline: pick(timelineOptions, h >> 13),
        local_compliance_info: `Décret BACS (art. R. 131-38 du Code de la construction) — échéance ${BACS_2}`,
        local_facts,
        local_risk_factor,
    };
}
