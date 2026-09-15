import type { CityConfig } from "@/lib/db";
import Image from "next/image";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import Reviews from "@/components/Reviews";
import { LocalFAQ } from "@/components/LocalFAQ";
import { InternalMesh } from "@/components/InternalMesh";
import { CheckCircle, Award } from "lucide-react";
import LocalSources from "@/components/LocalSources";
export interface ContentSection { title: string; html: string; }
interface ThermoContentPageProps {
    site: CityConfig; heroBadge: string; pageTitle: string; introHtml: string;
    facts: { label: string; value: string }[]; benefits: string[]; expertTip: string;
    faqs: { question: string; reponse: string }[]; canonicalUrl: string; heroImage: string;
    breadcrumb: { name: string; item: string }[]; sections?: ContentSection[]; localHtml?: string; themeColor?: "rose";
}
export default function ThermoContentPage({ site, heroBadge, pageTitle, introHtml, facts, benefits, expertTip, faqs, canonicalUrl, heroImage, breadcrumb, sections = [], localHtml, themeColor = "rose" }: ThermoContentPageProps) {
    const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.reponse } })) };
    const bc = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.thermostatcopropriete.fr" }, ...breadcrumb.map((b, i) => ({ "@type": "ListItem", position: i + 2, name: b.name, item: b.item }))] };
    
    // Fourchette de prix lue sur les faits affichés (Prix / Budget / Tarif)
    const priceFact = facts.find(f => {
        const l = f.label.toLowerCase();
        return l.includes('prix') || l.includes('budget') || l.includes('tarif');
    });
    const priceStr = priceFact?.value || "5000";
    const prices = priceStr.match(/\d+(?:[.,\s]\d+)?/g)?.map(p => parseInt(p.replace(/\D/g, ''), 10)) || [5000, 15000];
    const hasVisiblePrice = !!priceFact;
    const lowPrice = Math.min(...prices) || 5000;
    const highPrice = prices.length > 1 ? Math.max(...prices) : Math.floor(lowPrice * 1.2);

        // « Service » et non « Product » : ces pages mettent en relation avec des
    // professionnels, elles ne vendent pas un article de catalogue. Un balisage
    // Product (stock, SKU, livraison, offerCount) est inexact et peut être ignoré.
    const serviceOfferSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": pageTitle,
        "serviceType": pageTitle,
        "image": `https://www.thermostatcopropriete.fr${heroImage}`,
        "description": introHtml.replace(/<[^>]*>?/gm, ''),
        "provider": {
            "@type": "Organization",
            "name": "Expert Thermostat Copropriété",
            "url": "https://www.thermostatcopropriete.fr"
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        },
        // La fourchette n'est déclarée que si elle figure réellement sur la page.
        ...(hasVisiblePrice ? {
            "offers": {
                "@type": "Offer",
                "url": `https://www.thermostatcopropriete.fr/#simulateur`,
                "priceCurrency": "EUR",
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "priceCurrency": "EUR",
                    "minPrice": lowPrice.toString(),
                    "maxPrice": highPrice.toString()
                }
            }
        } : {})
    };

    return (
        <div className="min-h-screen font-sans text-slate-900 bg-white">
            <Header isHub={true} city={site.city} phoneNumber={site.phoneNumber} variant="default" themeColor={themeColor} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
            <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24"><div className="container mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-full text-sm font-bold mb-6"><CheckCircle size={16} className="text-rose-600" />{heroBadge}</div>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">{pageTitle}</h1>
                    <div className="text-lg text-slate-600 mb-8 leading-relaxed prose prose-lg" dangerouslySetInnerHTML={{ __html: introHtml }} />
                    {localHtml && <div className="mb-8" dangerouslySetInnerHTML={{ __html: localHtml }} />}
                    <div className="grid grid-cols-2 gap-4 mb-8">{facts.map((f) => (<div key={f.label} className="bg-slate-50 border border-slate-200 rounded-xl p-4"><div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">{f.label}</div><div className="text-lg font-extrabold text-slate-900">{f.value}</div></div>))}</div>
                    <div className="flex flex-col sm:flex-row gap-4"><a href="#simulateur" className="bg-rose-600 text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-rose-700 transition">Audit gratuit</a><a href={`tel:${site.phoneNumber}`} className="bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold text-center hover:bg-slate-200 transition">Parler au syndic</a></div>
                </div>
                <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"><Image src={heroImage} alt={pageTitle} fill className="object-cover" /></div>
            </div></div></section>
            {benefits.length > 0 && (<section className="py-16 bg-slate-50 border-y border-slate-200"><div className="container mx-auto px-4"><h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Pourquoi équiper votre copropriété</h2><div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">{benefits.map((b) => (<div key={b} className="flex items-start gap-3 bg-white p-5 rounded-2xl shadow-sm border border-slate-100"><CheckCircle size={20} className="text-rose-600 shrink-0 mt-0.5" /><p className="text-slate-700">{b}</p></div>))}</div><div className="max-w-4xl mx-auto mt-8 bg-rose-50 border border-rose-100 rounded-2xl p-5 flex gap-3"><Award className="text-rose-600 shrink-0 mt-1" /><p className="text-sm text-slate-700 italic"><strong>Conseil Expert :</strong> {expertTip}</p></div></div></section>)}
            {sections.map((s) => (<section key={s.title} className="py-14"><div className="container mx-auto px-4 max-w-4xl"><h2 className="text-3xl font-bold text-slate-900 mb-8">{s.title}</h2><div className="prose prose-lg max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: s.html }} /></div></section>))}
            <section className="py-16 bg-slate-50 border-y border-slate-200"><div className="container mx-auto px-4 max-w-4xl"><h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Questions fréquentes</h2><div className="space-y-4">{faqs.map((f) => (<details key={f.question} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 group"><summary className="font-bold text-slate-900 cursor-pointer flex justify-between items-center">{f.question}<span className="text-rose-600 group-open:rotate-45 transition-transform">+</span></summary><p className="mt-4 text-slate-600 leading-relaxed">{f.reponse}</p></details>))}</div></div></section>
            <section className="py-16" id="simulateur"><div className="container mx-auto px-4"><div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100"><div className="text-center mb-10"><h2 className="text-3xl font-bold text-slate-900 mb-4">Audit gratuit pour votre syndic</h2><p className="text-slate-600">Estimez les économies de votre copropriété et les primes CEE</p></div><LeadForm city={site.city} domain="thermostatcopropriete.fr" targetType="COPRO" themeColor={themeColor} /></div></div></section>
            <Reviews site={site} themeColor={themeColor} /><LocalFAQ site={site} segment="COPRO" /><InternalMesh city={site.city} config={site} /><LocalSources site={site} url={canonicalUrl} />
            <Footer config={site} />
        </div>
    );
}