import type { CityConfig } from "@/lib/db";

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
}

const DEFAULT_REGIONAL = {
    subsidyName: "Coup de Pouce Pilotage Connecté CEE",
    subsidyAmount: "Jusqu'à 100% financé par les primes CEE",
    avgPrice: "0€ de reste à charge (CEE)"
};

const TIPS = [
        "À {city}, le décret national impose à tous les logements chauffés collectivement d'être équipés d'un système de régulation thermique par pièce avant le 1er janvier 2027.",
        "Grâce au dispositif Coup de Pouce CEE, l'installation de têtes thermostatiques connectées est prise en charge jusqu'à 100% sans reste à charge pour votre copropriété à {city}.",
        "L'installation permet aux résidents de {neighborhood_0} de réaliser immédiatement de 15% à 25% d'économies d'énergie sur la facture de chauffage collectif.",
        "Le vote en Assemblée Générale à {city} s'effectue à la majorité simple de l'article 24 : notre équipe prépare la résolution clé en main pour votre syndic.",
        "Nos techniciens posent les robinets thermostatiques intelligents en 30 minutes par appartement sans vidange du circuit ni coupure de chauffage.",
        "Chaque copropriétaire à {city} pilote la température de son logement pièce par pièce depuis son smartphone ou directement sur la molette graduée.",
        "Le système de détection d'ouverture de fenêtre coupe automatiquement le radiateur pour éviter tout gaspillage d'énergie lors de l'aération quotidienne.",
        "Nos équipements sont compatibles avec tous les types de chauffage collectif à {city} : chaufferie gaz, fioul, biomasse ou réseau de chaleur urbain."
];
const INTROS = [
        "<p class=\"mb-4 leading-relaxed\">Vous êtes membre d'un conseil syndical, copropriétaire ou gestionnaire de syndic à <strong>{city}{postalMention}</strong> ? Le <strong>Plan Thermostat gouvernemental</strong> rend obligatoire l'installation d'un système de pilotage de la température pièce par pièce pour l'ensemble des logements d'ici le 1er janvier 2027. {neighborhoodMention}</p><p class=\"mb-4 leading-relaxed\">Notre entreprise spécialisée déploie des solutions de <strong>robinets thermostatiques connectés et de Gestion Technique du Bâtiment (GTB)</strong> pour les immeubles résidentiels collectifs de {city}. Grâce au programme Coup de Pouce CEE, l'intégralité du matériel et de la pose est financée par les fournisseurs d'énergie, garantissant un coût nul (0€ de reste à charge) pour la copropriété.</p><p class=\"leading-relaxed\">Réduisez immédiatement les charges de chauffage de vos copropriétaires de 15% à 25% tout en vous mettant en conformité légale. Demandez une étude d'éligibilité gratuite pour votre résidence sous 24h.</p>",
        "<p class=\"mb-4 leading-relaxed\">Modernisez le chauffage collectif de votre copropriété à <strong>{city}</strong>{deptMention} sans impacter les comptes de l'immeuble. En équipant chaque radiateur de têtes thermostatiques intelligentes communicantes, chaque résident programme la température souhaitée pièce par pièce selon son rythme de vie.</p><p class=\"mb-4 leading-relaxed\">{neighborhoodMention} Nos techniciens spécialisés interviennent sans nuisance sonore ni coupure d'eau chaude grâce à des adaptateurs sur vannes existantes. Budget constaté : <strong>100% pris en charge par le dispositif CEE</strong>.</p><p class=\"leading-relaxed\">Nous fournissons à votre syndic le projet de résolution complet et l'attestation de conformité prêts pour l'inscription à l'ordre du jour de votre prochaine Assemblée Générale. Contactez nos conseillers de proximité.</p>",
        "<p class=\"mb-4 leading-relaxed\">À <strong>{city}</strong>, faites baisser durablement les charges de copropriété grâce au pilotage thermique connecté nouvelle génération. {neighborhoodMention}</p><p class=\"mb-4 leading-relaxed\">Dans un immeuble collectif classique, les logements du bas sont souvent sous-chauffés tandis que les étages supérieurs sont en surchauffe. Nos thermostats connectés équilibrent la distribution de chaleur dans toute la colonne thermique de votre bâtiment à {city}. Reste à charge garanti : <strong>0€ pour les copropriétaires</strong>.</p><p class=\"leading-relaxed\">Nos équipes assurent la communication auprès des résidents, la prise de rendez-vous individuelle et le service après-vente pour une adhésion totale du conseil syndical.</p>",
        "<p class=\"mb-4 leading-relaxed\">Recherchez-vous un <strong>installateur certifié RGE pour équiper votre copropriété à {city}{postalMention}</strong> ? Nous disposons de techniciens qualifiés intervenant sur l'ensemble de votre département pour le déploiement à grande échelle de têtes thermostatiques connectées.</p><p class=\"mb-4 leading-relaxed\">{neighborhoodMention} Du premier audit de chaufferie jusqu'à la remise du certificat de fin de travaux RGE, nous prenons en charge la gestion administrative intégrale du dossier de prime CEE. Coût pour la copropriété : <strong>0€</strong>.</p><p class=\"leading-relaxed\">Bénéficiez d'une solution reconnue par l'ADEME et sécurisez la valorisation énergétique de votre patrimoine collectif. Recevez votre diagnostic gratuit.</p>",
        "<p class=\"mb-4 leading-relaxed\">Préparez sereinement votre copropriété à <strong>{city}</strong> aux obligations écologiques de 2027. L'installation de thermostats connectés est la mesure d'efficacité énergétique la plus rentable et la plus rapide à mettre en œuvre en habitat collectif.</p><p class=\"mb-4 leading-relaxed\">{neighborhoodMention} En quelques semaines, l'ensemble des appartements de votre résidence à {city} gagne en confort tout en réduisant l'empreinte carbone globale du bâtiment. Financement intégral CEE garanti.</p><p class=\"leading-relaxed\">Prenez contact dès maintenant avec nos experts pour programmer une présentation technique lors de votre prochaine réunion de conseil syndical.</p>"
];

function getExpertTip(city: string, dept: string, neighborhoods: string[]): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const n0 = neighborhoods.length > 0 ? neighborhoods[0] : city;
    const t = TIPS[hash % TIPS.length];
    return t
        .replace(/{city}/g, city)
        .replace(/{dept}/g, dept || "votre département")
        .replace(/{neighborhood_0}/g, n0);
}

function getIntroHtml(city: string, dept: string, neighborhoods: string[], postalCode: string, avgPrice: string): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const isFrance = city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";

    const neighborhoodMention = neighborhoods.length >= 2
        ? `Nos artisans et techniciens spécialisés interviennent dans tous les secteurs de la commune : <strong>${neighborhoods.slice(0, 3).join(', ')}</strong> ainsi que dans les localités périphériques.`
        : "Nos spécialistes qualifiés assurent une couverture totale de l'ensemble de votre secteur et de ses environs.";

    const postalMention = postalCode ? ` (${postalCode})` : "";
    const deptMention = dept ? ` (${dept})` : "";

    const t = INTROS[hash % INTROS.length];
    return t
        .replace(/{city}/g, city)
        .replace(/{prep}/g, prep)
        .replace(/{postalMention}/g, postalMention)
        .replace(/{deptMention}/g, deptMention)
        .replace(/{neighborhoodMention}/g, neighborhoodMention)
        .replace(/{avgPrice}/g, avgPrice);
}

export async function getPseoContent(cityConfig: CityConfig, targetType: string = 'MIXED'): Promise<PseoPageContent> {
    const { city, department, postalCode, neighborhoods, pricing } = cityConfig;
    const dept = department || "";
    const postal = postalCode || "";
    const quartiers = neighborhoods || [];

    const regionalInfo = DEFAULT_REGIONAL;
    const realPrice = pricing?.base || regionalInfo.avgPrice;

    const isFrance = city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";
    const postalSpan = postal ? ` <span class="text-slate-400 text-3xl">(${postal})</span>` : "";

    const meta_title = `Thermostats Connectés Copropriété {city}{postal} | CEE 0€`
        .replace("{city}", isFrance ? "en France" : city)
        .replace("{postal}", postal ? ` (${postal})` : "");

    const meta_description = `Installation de thermostats connectés et robinets thermostatiques en copropriété à {city}. Obligation légale 2027. Financement jusqu'à 100% CEE. Devis gratuit.`
        .replace("{city}", city)
        .replace("{price}", realPrice)
        .replace("{prep}", prep);

    const hero_title = `Thermostats <span class="text-blue-500">Connectés Copropriété</span> {prep} {city}{postalSpan}`
        .replace("{city}", city)
        .replace("{prep}", prep)
        .replace("{postalSpan}", postalSpan);

    const intro_html = getIntroHtml(city, dept, quartiers, postal, realPrice);
    const expert_tip = getExpertTip(city, dept, quartiers);

    return {
        meta_title,
        meta_description,
        hero_title,
        hero_badge: regionalInfo.subsidyName,
        intro_html,
        cta_primary: "Vérifier l'éligibilité de ma copropriété",
        pricing_estimated: realPrice,
        regional_subsidy: regionalInfo.subsidyAmount,
        expert_tip,
        local_climate_info: expert_tip,
        installation_timeline: "Intervention sous 24h à 48h",
        local_compliance_info: regionalInfo.subsidyAmount
    };
}
