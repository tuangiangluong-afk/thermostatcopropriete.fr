"use client";
export default function InstallationSteps() {
    const steps = [
        { title: "1. Audit Énergétique & Technique", desc: "Nos ingénieurs visitent la chaufferie de votre copropriété pour analyser l'existant et dimensionner la solution de régulation thermique." },
        { title: "2. Validation en AG", desc: "Nous vous fournissons un dossier complet (devis, calcul ROI, subventions CEE) pour présentation au conseil syndical et vote en Assemblée Générale." },
        { title: "3. Installation & Déploiement", desc: "Nos techniciens certifiés installent les thermostats connectés dans les parties communes et privatives avec un minimum de nuisance pour les résidents." }
    ];
    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-extrabold text-center mb-12">Méthodologie d'intervention pour les Copropriétés</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((s, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-lg text-blue-600 mb-2">{s.title}</h3>
                            <p className="text-slate-600 text-sm" dangerouslySetInnerHTML={{ __html: s.desc }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
