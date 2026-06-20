"use client";
export default function PricingTable() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-extrabold text-center mb-6">Budget estimatif par lot (Appartement)</h2>
                <p className="text-center text-slate-500 mb-12">Les coûts sont largement absorbés par les primes CEE (Certificats d'Économies d'Énergie) et la prime "Coup de pouce thermostat".</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-slate-200">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className="p-4 font-bold border border-slate-200">Type de Chauffage Collectif</th>
                                <th className="p-4 font-bold border border-slate-200">Coût brut par radiateur/lot</th>
                                <th className="p-4 font-bold border border-slate-200">Reste à charge moyen (après CEE)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-4 border border-slate-200">Chauffage collectif classique (vannes simples)</td>
                                <td className="p-4 border border-slate-200">150€ - 200€</td>
                                <td className="p-4 border border-slate-200" style={{color: 'green', fontWeight: 'bold'}}>15€ - 40€</td>
                            </tr>
                            <tr>
                                <td className="p-4 border border-slate-200">Chauffage avec système connecté global (GTB)</td>
                                <td className="p-4 border border-slate-200">250€ - 350€</td>
                                <td className="p-4 border border-slate-200" style={{color: 'green', fontWeight: 'bold'}}>50€ - 90€</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
