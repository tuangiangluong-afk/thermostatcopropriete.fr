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
    local_compliance_info: string;
    installation_timeline: string;
}

const DEFAULT_REGIONAL = {
    subsidyName: "Aides CEE & Coup de Pouce",
    subsidyAmount: "Jusqu'à 80% du financement",
    avgPrice: "Dès 15€ de reste à charge/lot"
};

export async function getPseoContent(cityConfig: CityConfig, targetType: string = 'MIXED'): Promise<PseoPageContent> {
    const { city, postalCode, pricing } = cityConfig;
    const postal = postalCode || "";
    
    const regionalInfo = DEFAULT_REGIONAL;
    const realPrice = pricing?.base || regionalInfo.avgPrice;

    const renderTip = (c: string) => {
      const hash = c.split('').reduce((a, x) => a + x.charCodeAt(0), 0);
      const tips = [
        `Pour votre copropriété à ${c}, l'installation de robinets thermostatiques connectés est la solution la plus rapide pour se mettre en conformité avec la réglementation thermique avant l'hiver.`,
        `À ${c}, nous recommandons d'inscrire l'installation des thermostats à l'ordre du jour de votre prochaine Assemblée Générale. Nous fournissons gratuitement un dossier de présentation complet.`,
        `Les syndics de ${c} peuvent bénéficier d'une prise en charge majorée via la prime Coup de pouce CEE, applicable directement sur le devis d'installation.`
      ];
      return tips[hash % tips.length];
    };

    const renderIntro = (c: string, p: string, avg: string) => {
      const hash = c.split('').reduce((a, x) => a + x.charCodeAt(0), 0);
      const intros = [
        `<p class="mb-4">Syndics et copropriétaires à <strong>${c}</strong>, mettez en conformité votre système de chauffage collectif avec l'installation de <strong>thermostats connectés</strong>. Nos installateurs certifiés RGE s'occupent de tout.</p><p>Le coût d'installation est estimé à <strong>${avg}</strong> grâce aux primes CEE déduites. Optimisez la température dans chaque appartement et réduisez la facture globale.</p>`,
        `<p class="mb-4">Réduisez les charges de chauffage de votre copropriété à <strong>${c}</strong>. L'obligation d'individualisation des frais de chauffage nécessite l'installation d'une régulation performante.</p><p>Budget estimé : <strong>${avg}</strong> (aides déduites). Nous coordonnons l'ensemble du projet, de l'audit technique à la pose dans les logements.</p>`
      ];
      return intros[hash % intros.length];
    };

    const renderComplianceInfo = (c: string) => {
      const hash = c.split('').reduce((a, x) => a + x.charCodeAt(0), 0);
      const compliances = [
        `Pour les copropriétés situées à ${c}, le décret tertiaire et la loi sur l'individualisation des frais de chauffage obligent les immeubles chauffés collectivement à s'équiper de vannes thermostatiques. Ne pas se mettre en conformité vous expose à des pénalités allant jusqu'à 1500€ par an et par logement.`,
        `Les bâtiments résidentiels de ${c} construits avant les années 2000 présentent souvent une déperdition thermique majeure. En installant des têtes connectées, vous répondez instantanément aux obligations légales tout en garantissant l'accès direct aux subventions étatiques.`,
        `À ${c}, le syndicat des copropriétaires doit inscrire l'installation de la régulation à l'ordre du jour. Nos équipes fournissent l'audit gratuit et la simulation CEE pour que vous puissiez voter la résolution sans avancer les frais d'installation lourds.`
      ];
      return compliances[hash % compliances.length];
    };

    const renderTimeline = (c: string) => {
      const hash = c.split('').reduce((a, x) => a + x.charCodeAt(0), 0);
      const timelines = [
        `La logistique en copropriété à ${c} est notre force. Nous posons jusqu'à 50 têtes thermostatiques par jour, en coordonnant les interventions directement avec les résidents ou les gardiens, avec moins de 15 minutes d'intervention par appartement.`,
        `Pour un immeuble moyen à ${c}, le chantier complet (du désembouage éventuel à la pose des robinets sur chaque radiateur) prend en moyenne entre 2 et 5 jours ouvrés. Aucune coupure de chauffage prolongée n'est à prévoir.`,
        `Après le vote en AG à ${c}, nos techniciens planifient une campagne d'installation. Les vannes connectées sont montées directement sur les corps de chauffe existants, sans soudure ni vidange complexe de la chaufferie.`
      ];
      return timelines[hash % timelines.length];
    };

    return {
        meta_title: `Installation Thermostats Copropriété à ${city}${postal ? ` (${postal})` : ""} | RGE`,
        meta_description: `Accompagnement des syndics à ${city} pour l'installation de thermostats collectifs. Mise aux normes, primes CEE déduites. Demandez un audit gratuit.`,
        hero_title: `Installation de <span class="text-blue-600">Thermostats en Copropriété</span> à ${city}${postal ? ` <span class="text-slate-400 text-3xl">(${postal})</span>` : ""}`,
        hero_badge: regionalInfo.subsidyName,
        intro_html: cityConfig.unique_intro || renderIntro(city, postal, realPrice),
        cta_primary: "Obtenir un audit technique et financier",
        pricing_estimated: realPrice,
        regional_subsidy: regionalInfo.subsidyAmount,
        expert_tip: cityConfig.unique_expert_tip || renderTip(city),
        local_compliance_info: renderComplianceInfo(city),
        installation_timeline: renderTimeline(city),
    };
}
