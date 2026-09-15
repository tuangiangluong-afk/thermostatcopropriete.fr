"use client";

import { ArrowRight, CheckCircle, ClipboardCheck } from "lucide-react";

interface GrantsCalculatorProps {
    themeColor?: string;
    onCalculateClick?: () => void;
}

export default function GrantsCalculator({ onCalculateClick }: GrantsCalculatorProps) {
    const scrollToForm = () => {
        document.getElementById("simulateur")?.scrollIntoView({ behavior: "smooth" });
        onCalculateClick?.();
    };
    const checks = ["Nombre de logements et type de chauffage collectif", "État des vannes, sondes et régulation existantes", "Équilibrage hydraulique et programmation", "Accès aux locaux techniques et contraintes du syndic"];
    return (
        <section id="grants-calculator" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex-1 flex flex-col gap-6">
                    <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-3 py-1.5 rounded-full text-sm font-bold w-fit"><ClipboardCheck className="w-4 h-4" /> Audit de copropriété</div>
                    <h2 className="text-3xl lg:text-4xl font-black text-slate-900">Préparez un audit de régulation utile au syndic</h2>
                    <p className="text-lg text-slate-600">Le dimensionnement d’une solution de pilotage dépend du chauffage, du réseau hydraulique, des équipements en place et des décisions de la copropriété. Un professionnel doit vérifier ces points sur site.</p>
                    <div className="flex flex-col gap-4 mt-4">{checks.map((item) => <div key={item} className="flex gap-3 items-start"><CheckCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" /><span className="text-slate-700">{item}</span></div>)}</div>
                    <button onClick={scrollToForm} className="inline-flex items-center text-rose-700 font-bold hover:underline mt-4">Demander un audit <ArrowRight className="ml-2 w-4 h-4" /></button>
                </div>
                <div className="flex-1 w-full flex justify-center lg:justify-end"><div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl border border-slate-100"><h3 className="text-xl font-bold text-slate-900 mb-4">À vérifier avant décision</h3><p className="text-slate-600">Le syndic peut réunir les relevés de consommation, les contrats d’entretien, les plans du réseau et les procès-verbaux utiles. Les aides éventuelles dépendent du dispositif et de la date de la demande : elles doivent être confirmées auprès de l’organisme compétent.</p></div></div>
            </div>
        </section>
    );
}
