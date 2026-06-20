"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQProps {
    city?: string;
    type?: string;
    themeColor?: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose' | 'slate';
    items?: { question: string; answer: string; }[];
}

export default function FAQ({ city, type, themeColor = 'slate', items }: FAQProps) {
    const defaultQuestions = [
        {
            question: "L'installation de thermostats est-elle obligatoire en copropriété ?",
            answer: "Oui, la réglementation impose l'individualisation des frais de chauffage (RFC) et l'installation d'équipements permettant la régulation de la température pièce par pièce pour les bâtiments équipés d'un chauffage collectif."
        },
        {
            question: "Qu'est-ce que le plan 'Coup de pouce Thermostat' ?",
            answer: "Il s'agit d'une aide de l'État dans le cadre des CEE qui finance une grande partie de l'installation de thermostats programmables connectés. Cette prime s'applique directement sur la facture pour les copropriétés."
        },
        {
            question: "Comment gérer l'installation dans les appartements privés ?",
            answer: "Nos équipes se chargent de planifier les interventions avec chaque résident. La pose d'une tête thermostatique connectée sur un radiateur existant prend en moyenne moins de 15 minutes par radiateur, sans vidange du circuit."
        },
        {
            question: "Quel est le gain espéré sur la facture d'énergie ?",
            answer: "L'ADEME estime que l'installation d'une régulation performante permet de réaliser en moyenne 15% à 25% d'économies d'énergie sur le chauffage."
        }
    ];

    const questions = items || defaultQuestions;

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const themeStyles: Record<string, string> = {
        blue: "bg-blue-100 text-blue-700",
        emerald: "bg-emerald-100 text-emerald-700",
        amber: "bg-amber-100 text-amber-800",
        purple: "bg-purple-100 text-purple-700",
        rose: "bg-slate-100 text-slate-800",
        slate: "bg-slate-100 text-slate-800"
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": questions.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };
    const badgeClass = themeStyles[themeColor] || themeStyles.slate;

    return (
        <section className="py-20 bg-slate-50 border-t border-slate-200">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${badgeClass}`}>
                        Questions Fréquentes
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                        Des questions sur les thermostats en copropriété ?
                    </h2>
                    <p className="text-xl text-slate-600 mt-4">
                        Nous avons réuni les réponses pour vous guider dans votre projet de régulation thermique.
                    </p>
                </div>

                <div className="space-y-4">
                    {questions.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-bold text-lg text-slate-900 pr-8">{item.question}</span>
                                <ChevronDown
                                    className={`text-slate-400 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                                />
                            </button>

                            <div
                                className={`
                                    overflow-hidden transition-all duration-300 ease-in-out
                                    ${openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                                `}
                            >
                                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
