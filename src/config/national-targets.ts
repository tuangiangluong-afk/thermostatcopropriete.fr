// ========================================
// NATIONAL TARGETS - 39 HIGH-VALUE ZONES
// Thermostat Copropriété - Couverture Nationale pSEO (Maximized)
// ========================================

export interface NationalTarget {
    slug: string;
    name: string;
    heroTitle: string;
    geo: { lat: number; lng: number };
    price_start: number;
    top_places: string[];
    zip: string;
    tier: 'BIG5' | 'GOLDEN' | 'HUB' | 'STRATEGIC';
    heroImage?: string;
    unique_intro?: string;
    unique_expert_tip?: string;
}

export const NATIONAL_TARGETS: NationalTarget[] = [
    {
        slug: "paris",
        name: "Paris",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 48.856, lng: 2.352 },
        price_start: 450,
        top_places: ["Paris 16","Paris 17","Le Marais","Montmartre"],
        zip: "75000",
        tier: "BIG5",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Paris en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Les besoins en chauffage étant importants à Paris, l'installation d'une GTC permet aux copropriétés d'anticiper les vagues de froid et d'optimiser le rendement de la chaufferie collective."
    },
    {
        slug: "lyon",
        name: "Lyon",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 45.764, lng: 4.835 },
        price_start: 470,
        top_places: ["Monts d'Or","Presqu'île","Part-Dieu","Confluence"],
        zip: "69000",
        tier: "BIG5",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Lyon en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Nos experts à Lyon accompagnent les syndics dans l'obtention des aides CEE pour financer l'installation des thermostats intelligents dans votre copropriété."
    },
    {
        slug: "marseille",
        name: "Marseille",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.296, lng: 5.369 },
        price_start: 470,
        top_places: ["Prado","Corniche","Vieux-Port","Euroméditerranée"],
        zip: "13000",
        tier: "BIG5",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Marseille en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Marseille, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "nice",
        name: "Nice",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.71, lng: 7.262 },
        price_start: 470,
        top_places: ["Promenade des Anglais","Cimiez","Mont Boron","Carré d'Or"],
        zip: "06000",
        tier: "BIG5",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Nice en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Nice, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "bordeaux",
        name: "Bordeaux",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 44.837, lng: -0.579 },
        price_start: 465,
        top_places: ["Chartrons","Caudéran","Le Bouscat","Talence"],
        zip: "33000",
        tier: "BIG5",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Bordeaux en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Nos experts à Bordeaux accompagnent les syndics dans l'obtention des aides CEE pour financer l'installation des thermostats intelligents dans votre copropriété."
    },
    {
        slug: "toulouse",
        name: "Toulouse",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.604, lng: 1.444 },
        price_start: 465,
        top_places: ["Capitol","Carmes","Saint-Cyprien","Balma"],
        zip: "31000",
        tier: "BIG5",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Toulouse en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Toulouse, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "cannes",
        name: "Cannes",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.552, lng: 7.017 },
        price_start: 455,
        top_places: ["La Californie","Croisette","Super Cannes","Mougins"],
        zip: "06400",
        tier: "GOLDEN",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Cannes en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Cannes, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "aix-en-provence",
        name: "Aix-en-Provence",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.529, lng: 5.447 },
        price_start: 450,
        top_places: ["Centre Historique","Puyricard","Les Milles","Tholonet"],
        zip: "13100",
        tier: "GOLDEN",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Aix-en-Provence en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Aix-en-Provence, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "antibes",
        name: "Antibes",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.58, lng: 7.125 },
        price_start: 460,
        top_places: ["Cap d'Antibes","Juan-les-Pins","Biot","Sophia-Antipolis"],
        zip: "06600",
        tier: "GOLDEN",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Antibes en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Antibes, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "neuilly-sur-seine",
        name: "Neuilly-sur-Seine",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 48.884, lng: 2.268 },
        price_start: 460,
        top_places: ["Saint-James","Sablons","Bagatelle","Ile de la Jatte"],
        zip: "92200",
        tier: "GOLDEN",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Neuilly-sur-Seine en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Les besoins en chauffage étant importants à Neuilly-sur-Seine, l'installation d'une GTC permet aux copropriétés d'anticiper les vagues de froid et d'optimiser le rendement de la chaufferie collective."
    },
    {
        slug: "lille",
        name: "Lille",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 50.629, lng: 3.057 },
        price_start: 450,
        top_places: ["Vieux-Lille","Marcq-en-Barœul","Bondues","Lambersart"],
        zip: "59000",
        tier: "GOLDEN",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Lille en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Les besoins en chauffage étant importants à Lille, l'installation d'une GTC permet aux copropriétés d'anticiper les vagues de froid et d'optimiser le rendement de la chaufferie collective."
    },
    {
        slug: "strasbourg",
        name: "Strasbourg",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 48.573, lng: 7.752 },
        price_start: 450,
        top_places: ["Orangerie","Robertsau","Contades","Neudorf"],
        zip: "67000",
        tier: "GOLDEN",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Strasbourg en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Les besoins en chauffage étant importants à Strasbourg, l'installation d'une GTC permet aux copropriétés d'anticiper les vagues de froid et d'optimiser le rendement de la chaufferie collective."
    },
    {
        slug: "nantes",
        name: "Nantes",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 47.218, lng: -1.553 },
        price_start: 455,
        top_places: ["Procé","Monselet","Saint-Félix","Carquefou"],
        zip: "44000",
        tier: "HUB",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Nantes en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Nos experts à Nantes accompagnent les syndics dans l'obtention des aides CEE pour financer l'installation des thermostats intelligents dans votre copropriété."
    },
    {
        slug: "rennes",
        name: "Rennes",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 48.117, lng: -1.677 },
        price_start: 455,
        top_places: ["Thabor","Sévigné","Saint-Grégoire","Cesson-Sévigné"],
        zip: "35000",
        tier: "HUB",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Rennes en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Les besoins en chauffage étant importants à Rennes, l'installation d'une GTC permet aux copropriétés d'anticiper les vagues de froid et d'optimiser le rendement de la chaufferie collective."
    },
    {
        slug: "montpellier",
        name: "Montpellier",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.611, lng: 3.877 },
        price_start: 455,
        top_places: ["Port Marianne","Aiguelongue","Castelnau-le-Lez","Lattes"],
        zip: "34000",
        tier: "HUB",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Montpellier en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Montpellier, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "annecy",
        name: "Annecy",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 45.899, lng: 6.129 },
        price_start: 455,
        top_places: ["Annecy-le-Vieux","Veyrier-du-Lac","Sevrier","Pringy"],
        zip: "74000",
        tier: "GOLDEN",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Annecy en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Nos experts à Annecy accompagnent les syndics dans l'obtention des aides CEE pour financer l'installation des thermostats intelligents dans votre copropriété."
    },
    {
        slug: "toulon",
        name: "Toulon",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.124, lng: 5.928 },
        price_start: 455,
        top_places: ["Mourillon","Le Mont Faron","Cap Brun","Siblas"],
        zip: "83000",
        tier: "HUB",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Toulon en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Toulon, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "avignon",
        name: "Avignon",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.949, lng: 4.805 },
        price_start: 460,
        top_places: ["Palais des Papes","Villeneuve-lès-Avignon","Le Pontet","Montfavet"],
        zip: "84000",
        tier: "HUB",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Avignon en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Avignon, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "reims",
        name: "Reims",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 49.258, lng: 4.031 },
        price_start: 450,
        top_places: ["Cathédrale","Cormontreuil","Tinqueux","Bétheny"],
        zip: "51100",
        tier: "HUB",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Reims en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Les besoins en chauffage étant importants à Reims, l'installation d'une GTC permet aux copropriétés d'anticiper les vagues de froid et d'optimiser le rendement de la chaufferie collective."
    },
    {
        slug: "dijon",
        name: "Dijon",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 47.322, lng: 5.041 },
        price_start: 450,
        top_places: ["Centre Historique","Toison d'Or","Fontaine-lès-Dijon","Talant"],
        zip: "21000",
        tier: "HUB",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Dijon en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Nos experts à Dijon accompagnent les syndics dans l'obtention des aides CEE pour financer l'installation des thermostats intelligents dans votre copropriété."
    },
    {
        slug: "rouen",
        name: "Rouen",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 49.443, lng: 1.099 },
        price_start: 450,
        top_places: ["Rive Droite","Mont-Saint-Aignan","Bois-Guillaume","Sotteville"],
        zip: "76000",
        tier: "HUB",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Rouen en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Les besoins en chauffage étant importants à Rouen, l'installation d'une GTC permet aux copropriétés d'anticiper les vagues de froid et d'optimiser le rendement de la chaufferie collective."
    },
    {
        slug: "roissy-en-france",
        name: "Roissy-en-France",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 49.009, lng: 2.547 },
        price_start: 455,
        top_places: ["Tremblay-en-France","Villepinte","Goussainville","Louvres"],
        zip: "95700",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Roissy-en-France en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Les besoins en chauffage étant importants à Roissy-en-France, l'installation d'une GTC permet aux copropriétés d'anticiper les vagues de froid et d'optimiser le rendement de la chaufferie collective."
    },
    {
        slug: "orly",
        name: "Orly",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 48.726, lng: 2.365 },
        price_start: 470,
        top_places: ["Thiais","Rungis","Choisy-le-Roi","Athis-Mons"],
        zip: "94310",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Orly en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Les besoins en chauffage étant importants à Orly, l'installation d'une GTC permet aux copropriétés d'anticiper les vagues de froid et d'optimiser le rendement de la chaufferie collective."
    },
    {
        slug: "beauvais",
        name: "Beauvais",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 49.455, lng: 2.113 },
        price_start: 465,
        top_places: ["Centre-Ville","Tillé","Allonne","Voisinlieu"],
        zip: "60000",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Beauvais en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Les besoins en chauffage étant importants à Beauvais, l'installation d'une GTC permet aux copropriétés d'anticiper les vagues de froid et d'optimiser le rendement de la chaufferie collective."
    },
    {
        slug: "saint-exupery",
        name: "Saint-Exupéry",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 45.723, lng: 5.081 },
        price_start: 465,
        top_places: ["Saint-Laurent-de-Mure","Genas","Meyzieu","Pusignan"],
        zip: "69125",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Saint-Exupéry en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Nos experts à Saint-Exupéry accompagnent les syndics dans l'obtention des aides CEE pour financer l'installation des thermostats intelligents dans votre copropriété."
    },
    {
        slug: "cagnes-sur-mer",
        name: "Cagnes-sur-Mer",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.666, lng: 7.215 },
        price_start: 470,
        top_places: ["Cros-de-Cagnes","Saint-Laurent-du-Var","Villeneuve-Loubet","La Colle-sur-Loup"],
        zip: "06800",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Cagnes-sur-Mer en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Cagnes-sur-Mer, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "pays-de-gex",
        name: "Pays de Gex",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 46.238, lng: 6.109 },
        price_start: 455,
        top_places: ["Ferney-Voltaire","Divonne-les-Bains","Saint-Genis-Pouilly","Gex"],
        zip: "01210",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Pays de Gex en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Nos experts à Pays de Gex accompagnent les syndics dans l'obtention des aides CEE pour financer l'installation des thermostats intelligents dans votre copropriété."
    },
    {
        slug: "mulhouse",
        name: "Mulhouse",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 47.59, lng: 7.529 },
        price_start: 465,
        top_places: ["Saint-Louis","Rixheim","Kingersheim","Wittenheim"],
        zip: "68100",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Mulhouse en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Nos experts à Mulhouse accompagnent les syndics dans l'obtention des aides CEE pour financer l'installation des thermostats intelligents dans votre copropriété."
    },
    {
        slug: "marne-la-vallee",
        name: "Marne-la-Vallée",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 48.876, lng: 2.779 },
        price_start: 450,
        top_places: ["Chessy","Serris","Bussy-Saint-Georges","Val d'Europe"],
        zip: "77700",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Marne-la-Vallée en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Les besoins en chauffage étant importants à Marne-la-Vallée, l'installation d'une GTC permet aux copropriétés d'anticiper les vagues de froid et d'optimiser le rendement de la chaufferie collective."
    },
    {
        slug: "pau",
        name: "Pau",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.295, lng: -0.37 },
        price_start: 465,
        top_places: ["Centre-Ville","Trespoey","Billère","Lons"],
        zip: "64000",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Pau en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Pau, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "bayonne",
        name: "Bayonne",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.492, lng: -1.474 },
        price_start: 460,
        top_places: ["Grand Bayonne","Petit Bayonne","Anglet","Saint-Esprit"],
        zip: "64100",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Bayonne en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Bayonne, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "biarritz",
        name: "Biarritz",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.483, lng: -1.558 },
        price_start: 465,
        top_places: ["Côte des Basques","Milady","Saint-Charles","La Négresse"],
        zip: "64200",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Biarritz en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Biarritz, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "tarbes",
        name: "Tarbes",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.232, lng: 0.076 },
        price_start: 455,
        top_places: ["Centre-Ville","Ormeau","Aureilhan","Laloubère"],
        zip: "65000",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Tarbes en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Tarbes, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "agen",
        name: "Agen",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 44.203, lng: 0.616 },
        price_start: 470,
        top_places: ["Centre-Ville","Ermitage","Le Passage","Boé"],
        zip: "47000",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Agen en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Nos experts à Agen accompagnent les syndics dans l'obtention des aides CEE pour financer l'installation des thermostats intelligents dans votre copropriété."
    },
    {
        slug: "montauban",
        name: "Montauban",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 44.015, lng: 1.35 },
        price_start: 470,
        top_places: ["Centre Historique","Villebourbon","Saint-Martial","Sapiac"],
        zip: "82000",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Montauban en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "Nos experts à Montauban accompagnent les syndics dans l'obtention des aides CEE pour financer l'installation des thermostats intelligents dans votre copropriété."
    },
    {
        slug: "albi",
        name: "Albi",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.928, lng: 2.148 },
        price_start: 470,
        top_places: ["Centre Historique","Leuc","Saint-Juéry","Lescure-d'Albigeois"],
        zip: "81000",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Albi en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Albi, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "castres",
        name: "Castres",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.606, lng: 2.24 },
        price_start: 460,
        top_places: ["Lameilhé","Aillot","Burlats","Lagarrigue"],
        zip: "81100",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Castres en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Castres, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "mont-de-marsan",
        name: "Mont-de-Marsan",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.89, lng: -0.5 },
        price_start: 470,
        top_places: ["Centre-Ville","Saint-Médard","Saint-Jean-d'Août","Saint-Pierre-du-Mont"],
        zip: "40000",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Mont-de-Marsan en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Mont-de-Marsan, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
    {
        slug: "dax",
        name: "Dax",
        heroTitle: "Thermostat Copropriété",
        geo: { lat: 43.71, lng: -1.05 },
        price_start: 465,
        top_places: ["Centre-Ville","Saint-Vincent-de-Paul","Narrosse","Saint-Paul-lès-Dax"],
        zip: "40100",
        tier: "STRATEGIC",
        heroImage: "/images/generated/thermostat-hero.png",
        unique_intro: "Mettez votre copropriété à Dax en conformité avec le décret BACS grâce à nos solutions de thermostats collectifs intelligents. Réduisez les charges de chauffage de votre immeuble tout en améliorant le confort de chaque résident.",
        unique_expert_tip: "À Dax, nos thermostats prennent en compte les variations importantes de température entre la nuit et le jour pour réguler le chauffage collectif sans surconsommation."
    },
];

export function getTargetBySlug(slug: string): NationalTarget | undefined {
    return NATIONAL_TARGETS.find(t => t.slug === slug);
}

import { CityConfig } from "@/lib/db";

export function getTargetAsCityConfig(slug: string): CityConfig | undefined {
    const target = NATIONAL_TARGETS.find(t => t.slug === slug);
    if (!target) return undefined;

    const isPerSquareMeter = true;
    const priceDisplay = "€" + target.price_start + (isPerSquareMeter ? "/m²" : "");
    const priceDesc = "Devis et Déplacement gratuits";

    return {
        slug: target.slug,
        city: target.name,
        name: `${target.heroTitle} ${target.name}`,
        domain: `${target.slug}.localhost`, // rewrite target
        heroImage: target.heroImage || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2672&auto=format&fit=crop",
        postalCode: target.zip,
        department: target.zip.substring(0, 2),
        region: "France",
        description: `${target.heroTitle} ${target.name} (${target.zip}).`,
        geo: target.geo,
        features: [
            "Devis Gratuit",
            "Artisans Qualifiés",
            "Intervention Rapide"
        ],
        stations: [],
        hospitals: [],
        neighborhoods: target.top_places,
        points_of_interest: {
            hotels: [],
            nightlife: [],
            monuments: target.top_places,
            parking_difficulty: "Variable"
        },
        pricing: {
            base: priceDisplay,
            description: priceDesc,
            km: 0
        },
        phoneNumber: "01 84 80 00 00",
        email: "contact@thermostatcopropriete.fr",
        type: "PARTNER",
        targetType: "MIXED",
        meta: {
            title: `${target.heroTitle} ${target.name} | ${priceDisplay}`,
            description: `${target.heroTitle} ${target.name} ${target.zip}.`
        },
        unique_intro: target.unique_intro,
        unique_expert_tip: target.unique_expert_tip
    };
}
