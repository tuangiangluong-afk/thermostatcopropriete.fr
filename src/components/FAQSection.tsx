"use client";
import FAQ from "./FAQ";

export default function FAQSection() {
    const faqs = [
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

    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-extrabold text-center mb-8">Questions Fréquentes (Syndics & Copros)</h2>
                <FAQ items={faqs} />
            </div>
        </section>
    );
}
