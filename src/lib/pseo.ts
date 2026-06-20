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
}

const DEFAULT_REGIONAL = {
    subsidyName: "Garantie Décennale",
    subsidyAmount: "Artisans qualifiés avec Assurance Décennale",
    avgPrice: "60€ – 120€ / m²"
};

function getExpertTip(city: string, postalCode: string): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const tips = [
        `Pour votre terrasse ou plage de piscine à ${city}, le béton imprimé est une excellente alternative au carrelage ou au bois : il ne s'affaisse pas, ne craint pas le gel et empêche la pousse des mauvaises herbes.`,
        `À ${city}, le béton désactivé est particulièrement recommandé pour les allées carrossables et descentes de garage grâce à ses propriétés antidérapantes exceptionnelles.`,
        `L'application d'un vernis de protection (résine polyuréthane) tous les 3 à 5 ans est conseillée pour maintenir l'éclat des couleurs de votre béton imprimé à ${city}.`
    ];
    return tips[hash % tips.length];
}

function getIntroHtml(city: string, postalCode: string, avgPrice: string): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    
    // Evaluate closures replacing ${city} etc.
    const intros = [
        `<p class="mb-4">Vous souhaitez aménager vos extérieurs à <strong>${city}</strong> avec un revêtement solide, esthétique et durable ? Nos artisans spécialisés en <strong>béton décoratif</strong> (imprimé, désactivé, balayé) réalisent vos projets de terrasses, allées et cours.</p><p>Le tarif moyen pour une réalisation en béton imprimé ou désactivé à ${city} se situe entre <strong>${avgPrice}</strong>, pose et fournitures comprises. Le prix varie selon la surface, l'épaisseur nécessaire et les motifs choisis.</p>`,
        `<p class="mb-4">Sublimez les abords de votre maison à <strong>${city}</strong> avec du béton décoratif. Ce revêtement monolithique haute résistance permet d'imiter parfaitement le bois, la pierre, la brique ou le pavé sans les inconvénients d'entretien.</p><p>Budget estimé : <strong>${avgPrice}</strong>. Nos applicateurs professionnels vous accompagnent dans le choix des matrices (motifs) et des durcisseurs colorés pour un résultat 100% sur mesure.</p>`
    ];

    return intros[hash % intros.length];
}

export async function getPseoContent(cityConfig: CityConfig, targetType: string = 'MIXED'): Promise<PseoPageContent> {
    const { city, postalCode, pricing } = cityConfig;
    const postal = postalCode || "";
    
    const regionalInfo = DEFAULT_REGIONAL;
    const realPrice = pricing?.base || regionalInfo.avgPrice;

    // Use a small local function to render the strings that require dynamic interpolation 
    // at runtime (since the strings above use ${city} which we need to evaluate at runtime)
    
    const renderTip = (c: string) => {
      const hash = c.split('').reduce((a, x) => a + x.charCodeAt(0), 0);
      const tips = [
        `Pour votre terrasse ou plage de piscine à ${c}, le béton imprimé est une excellente alternative au carrelage ou au bois : il ne s'affaisse pas, ne craint pas le gel et empêche la pousse des mauvaises herbes.`,
        `À ${c}, le béton désactivé est particulièrement recommandé pour les allées carrossables et descentes de garage grâce à ses propriétés antidérapantes exceptionnelles.`,
        `L'application d'un vernis de protection (résine polyuréthane) tous les 3 à 5 ans est conseillée pour maintenir l'éclat des couleurs de votre béton imprimé à ${c}.`
      ];
      return tips[hash % tips.length];
    };

    const renderIntro = (c: string, p: string, avg: string) => {
      const hash = c.split('').reduce((a, x) => a + x.charCodeAt(0), 0);
      const intros = [
        `<p class="mb-4">Vous souhaitez aménager vos extérieurs à <strong>${c}</strong> avec un revêtement solide, esthétique et durable ? Nos artisans spécialisés en <strong>béton décoratif</strong> (imprimé, désactivé, balayé) réalisent vos projets de terrasses, allées et cours.</p><p>Le tarif moyen pour une réalisation en béton imprimé ou désactivé à ${c} se situe entre <strong>${avg}</strong>, pose et fournitures comprises. Le prix varie selon la surface, l'épaisseur nécessaire et les motifs choisis.</p>`,
        `<p class="mb-4">Sublimez les abords de votre maison à <strong>${c}</strong> avec du béton décoratif. Ce revêtement monolithique haute résistance permet d'imiter parfaitement le bois, la pierre, la brique ou le pavé sans les inconvénients d'entretien.</p><p>Budget estimé : <strong>${avg}</strong>. Nos applicateurs professionnels vous accompagnent dans le choix des matrices (motifs) et des durcisseurs colorés pour un résultat 100% sur mesure.</p>`
      ];
      return intros[hash % intros.length];
    };

    return {
        meta_title: `Entreprise Béton Imprimé et Décoratif à ${city}${postal ? ` (${postal})` : ""} | Devis`,
        meta_description: `Spécialiste du béton imprimé, désactivé, lissé et balayé à ${city}. Idéal pour terrasses, allées et plages de piscine. Demandez votre devis gratuit en 24h.`,
        hero_title: `Artisan <span class="text-slate-500">Béton Décoratif</span> à ${city}${postal ? ` <span class="text-slate-400 text-3xl">(${postal})</span>` : ""}`,
        hero_badge: regionalInfo.subsidyName,
        intro_html: renderIntro(city, postal, realPrice),
        cta_primary: "Demander un devis gratuit",
        pricing_estimated: realPrice,
        regional_subsidy: regionalInfo.subsidyAmount,
        expert_tip: renderTip(city),
    };
}
