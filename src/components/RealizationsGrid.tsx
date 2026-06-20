import Image from "next/image";

const projects = [
    {
        "city": "Paris 15e",
        "desc": "Mise aux normes Chaufferie Collective",
        "type": "Installation de 450 têtes thermostatiques connectées",
        "img": "/images/generated/thermostat-realization-1.png"
    },
    {
        "city": "Lyon 3e",
        "desc": "Individualisation des Frais",
        "type": "Régulation par appartement (75 lots)",
        "img": "/images/generated/thermostat-realization-2.png"
    },
    {
        "city": "Strasbourg",
        "desc": "Équipement Résidence Années 70",
        "type": "Mise en place de vannes thermostatiques avec CEE",
        "img": "/images/generated/thermostat-realization-3.png"
    },
    {
        "city": "Bordeaux",
        "desc": "Système de Gestion Technique (GTB)",
        "type": "Contrôle centralisé de la chaufferie pour le Syndic",
        "img": "/images/generated/thermostat-realization-4.png"
    }
];

export default function RealizationsGrid() {
    return (
        <section className="py-20 bg-neutral-900 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: `Dernières interventions en <span class="text-blue-500">France</span>` }} />
                    <p className="text-neutral-400">
                        Accompagnement des syndics dans la transition énergétique des bâtiments collectifs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[600px]">
                    {projects.map((proj, i) => (
                        <div
                            key={i}
                            className={`relative group rounded-3xl overflow-hidden border border-white/10 ${i === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"
                                }`}
                        >
                            <Image
                                src={proj.img}
                                alt={`${proj.desc} ${proj.city}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    {proj.city}
                                </div>
                                <div className="text-2xl font-bold mb-1">{proj.desc}</div>
                                <div className="text-sm text-neutral-300 font-medium">{proj.type}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
