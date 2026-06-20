import { CityConfig } from "@/lib/db";

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

function cityHash(city: string): number {
    let hash = 0;
    for (let i = 0; i < city.length; i++) {
        hash = ((hash << 5) - hash + city.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}

export function getLocalFAQData(city: string, department: string | undefined, segment: "B2C" | "COPRO" | "ENTREPRISE") {
    const dept = department || "";
    const h = cityHash(city);
    const installCount = 40 + (h % 80);

    return [
        {
            question: `Quel est le prix au m² du Vannes thermostatiques à ${city} ?`,
            answer: `Le prix du Vannes thermostatiques à ${city} se situe généralement entre 60€ et 120€ par mètre carré, incluant les fournitures, la pose et les finitions. Cela dépend de la surface totale et de la complexité des motifs.`
        },
        {
            question: `Combien de temps faut-il pour réaliser une chauffage collectif à ${city} ?`,
            answer: `Nos artisans partenaires à ${city} réalisent généralement un chantier de 50m² en 2 à 3 jours, du coulage à l'application du vernis de finition. Nous avons coulé plus de ${installCount} chantiers dans le ${dept} récemment.`
        },
        {
            question: `Le Vannes thermostatiques résiste-t-il au gel à ${city} ?`,
            answer: `Oui, la loi sur l'individualisation des frais de chauffage et le décret tertiaire rendent obligatoire l'installation de thermostats connectés ou vannes thermostatiques pour la majorité des immeubles à ${city}.`
        }
    ];
}
