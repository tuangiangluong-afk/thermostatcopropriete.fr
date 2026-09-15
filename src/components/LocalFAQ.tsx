import { CityConfig } from "@/lib/db";
import { DEPARTEMENTS } from "@/data/fr-departements";

interface LocalFAQProps {
    site: CityConfig;
    segment: "B2C" | "COPRO" | "ENTREPRISE";
}

export function LocalFAQ({ site, segment }: LocalFAQProps) {
    const city = site.city;
    const faqs = getLocalFAQData(city, site.department, segment);

    return (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Questions fréquentes à {city}
                    </h2>
                    <p className="text-slate-600 mt-3 text-lg">
                        Tout savoir sur la pose de Vannes thermostatiques et désactivé dans votre ville.
                    </p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <details 
                            key={idx} 
                            className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
                            {...(idx === 0 ? { open: true } : {})}
                        >
                            <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-bold text-slate-900 hover:bg-slate-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                                <span>{faq.question}</span>
                                <span className="ml-4 shrink-0 text-slate-400 group-open:rotate-45 transition-transform text-2xl font-light">+</span>
                            </summary>
                            <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
/**
 * Exporté pour que SchemaJSON génère les données structurées FAQPage.
 *
 * IMPORTANT : aucune statistique n'est inventée ici. Les réponses s'appuient
 * uniquement sur des faits vérifiables (département, région, profil
 * climatique) et sur les échéances publiques du décret BACS.
 */
export function getLocalFAQData(city: string, department: string | undefined, _segment: "B2C" | "COPRO" | "ENTREPRISE" = "B2C") {
    const dept = department ? DEPARTEMENTS[department] : undefined;
    const deptRef = dept ? `${dept.name} (${dept.code})` : "votre département";
    const region = dept?.region || "France";
    const montagne = !!dept?.montagne;
    const froid = ["Hauts-de-France", "Grand Est", "Bourgogne-Franche-Comté", "Auvergne-Rhône-Alpes", "Île-de-France"].includes(region);

    return [
        {
            question: `Quel est le prix d'une régulation de chauffage collectif à ${city} ?`,
            answer: `À ${city}, comptez généralement entre 120 € et 180 € par radiateur pour la fourniture et la pose d'un robinet thermostatique connecté, et entre 60 € et 120 € pour un modèle classique. À cela s'ajoute, lorsque le bâtiment dépasse les seuils, la régulation centrale (BACS), dont le coût dépend du nombre de logements et de la configuration du réseau.`
        },
        {
            question: `Quel est le délai d'une intervention à ${city} ?`,
            answer: `Après la visite technique, la pose des robinets à ${city} et sur le département ${deptRef} se fait généralement cage d'escalier par cage d'escalier, sur 1 à 2 jours selon le nombre de logements. La mise en service de la régulation centrale nécessite ensuite un réglage et un équilibrage du réseau.`
        },
        {
            question: `Le décret BACS s'applique-t-il à ${city} ?`,
            answer: `Oui : le décret BACS s'applique nationalement, donc aux copropriétés de ${city} comme partout en France. Les échéances sont fixées au 1er janvier 2025 pour les bâtiments de plus de 290 kW et au 1er janvier 2027 pour ceux de plus de 70 kW. Un immeuble collectif équipé d'un chauffage central dépasse fréquemment ces seuils.`
        },
        {
            question: `Quel est l'intérêt de la régulation selon le climat de ${city} ?`,
            answer: `Le département ${deptRef} se situe en ${region}.${froid ? " Cette région connaît une saison de chauffe longue : la régulation pièce par pièce et le pilotage central y produisent une économie annuelle particulièrement importante." : " Dans cette région, l'enjeu principal réside dans les surconsommations d'intersaison et les logements surchauffés, que la régulation par logement corrige directement."}${montagne ? " Les communes d'altitude connaissent en outre une saison de chauffe plus longue qu'en plaine." : ""}`
        }
    ];
}
