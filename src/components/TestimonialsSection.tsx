"use client";

export default function TestimonialsSection() {
    const testimonials = [
        {
            quote: "L'installation de têtes thermostatiques connectées a permis à notre copropriété de réduire la facture de gaz de 22% dès le premier hiver. Le reste à charge était minime grâce au Coup de pouce CEE.",
            name: "Syndicat des Copropriétaires",
            location: "Lyon",
            product: "Résidence 45 lots",
            initials: "SC"
        },
        {
            quote: "Service très professionnel. Les techniciens ont géré la pose dans tous les appartements en seulement 3 jours. Les résidents sont ravis de pouvoir contrôler la température pièce par pièce.",
            name: "Foncia Gestion",
            location: "Paris",
            product: "Chauffage Collectif Urbain",
            initials: "FG"
        }
    ];

    return (
        <section className="bg-slate-900 text-white py-16 lg:py-24 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 relative z-10">
                <div className="flex-1 flex flex-col gap-8">
                    <h2 className="text-2xl md:text-3xl font-bold">Réseau d'installateurs qualifiés RGE</h2>
                    <p className="text-slate-400 text-lg">Nous accompagnons les syndics professionnels et bénévoles dans la mise en conformité de leur copropriété.</p>
                </div>
                <div className="flex-1 flex flex-col gap-6">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                            <p className="text-slate-300 italic mb-4" dangerouslySetInnerHTML={{ __html: t.quote }} />
                            <div className="font-bold">{t.name} - <span className="text-blue-400">{t.location}</span></div>
                            <div className="text-xs text-slate-500 mt-1">{t.product}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
