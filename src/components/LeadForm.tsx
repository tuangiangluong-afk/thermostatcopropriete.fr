"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, User, Shield, Phone, Mail, User2, ArrowRight, ArrowLeft, CheckCircle, TrendingDown, Zap, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface LeadFormProps {
    city: string;
    domain: string;
    targetType?: string;
    themeColor?: string;
    initialProjectType?: string;
}

interface FormData {
    projectType: 'terrasse' | 'allee_garage' | 'tour_piscine' | 'autre' | null;
    monthlyBill: 'plus_50' | '20_50' | 'moins_20' | null;
    roofType: 'toupie_oui' | 'toupie_non' | 'toupie_nsp' | null;
    solarLocation: 'moins_de_20' | 'entre_20_et_50' | 'plus_de_50' | 'autre' | null;
    name: string;
    email: string;
    phone: string;
    zipCode: string;
    phoneConsent?: boolean;
}

const PHONE_REGEX = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const ZIP_CODE_REGEX = /^\d{5}$/;

export default function LeadForm({ city, domain, initialProjectType }: LeadFormProps) {
    const router = useRouter();
    const [step, setStep] = useState(initialProjectType ? 2 : 1);
    const [formData, setFormData] = useState<FormData>({
        projectType: (initialProjectType as any) || null,
        monthlyBill: null,
        roofType: null,
        solarLocation: null,
        name: "",
        email: "",
        phone: "",
        zipCode: "",
        phoneConsent: false
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const totalSteps = 5;
    const progress = (step / totalSteps) * 100;

    const handleOptionSelect = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (status === 'error') {
            setStatus('idle');
            setErrorMessage("");
        }
    };

    const canProceed = (): boolean => {
        switch (step) {
            case 1: return formData.projectType !== null;
            case 2: return formData.monthlyBill !== null;
            case 3: return formData.roofType !== null;
            case 4: return formData.solarLocation !== null;
            case 5:
                return (
                    formData.name.trim() !== "" &&
                    formData.email.includes("@") &&
                    ZIP_CODE_REGEX.test(formData.zipCode.trim()) &&
                    PHONE_REGEX.test(formData.phone.replace(/\s/g, '') && formData.phoneConsent === true)
                );
            default: return false;
        }
    };

    const nextStep = () => { if (canProceed() && step < totalSteps) setStep(step + 1); };
    const prevStep = () => { if (step > 1) setStep(step - 1); };

    const handleSubmit = async () => {
        if (!canProceed()) {
            setStatus('error');
            setErrorMessage("Veuillez renseigner tous les champs requis.");
            return;
        }

        setStatus('loading');
        try {
            const payload = {
                ...formData,
                city,
                postalCode: formData.zipCode,
                domain,
                niche: 'beton',
                country: 'FR',
                leadScore: formData.monthlyBill === 'plus_50' ? 80 : 50,
                timestamp: new Date().toISOString()
            };

            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error("Erreur d'envoi");
            
            const data = await res.json();
            if (data?.vud?.devis_id) {
                router.push(`/success?devis_id=${data.vud.devis_id}&devis_hash=${data.vud.devis_hash || ''}`);
                return;
            }
            setStatus('success');
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || 'Une erreur est survenue');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-gradient-to-br from-slate-50 to-slate-50 border border-slate-200 rounded-3xl p-8 text-center">
                <CheckCircle className="text-slate-500 mx-auto mb-4" size={40} />
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Votre demande de devis est validée !</h3>
                <p className="text-neutral-700 mb-6">
                    Votre demande a été transmise. Nos artisans partenaires certifiés en Thermostats Connectés vont réaliser vos devis sous **24h** pour votre projet à **{city}**.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden font-sans">
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 p-6 text-white">
                <h3 className="font-bold text-lg">{`Simulateur Thermostats Connectés ${city} 2026`}</h3>
                <div className="h-2 bg-white/20 rounded-full mt-4">
                    <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className="p-6">
                {step === 1 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-4">Quel est le type de projet ?</h4>
                        <button onClick={() => { handleOptionSelect('projectType', 'terrasse'); setStep(2); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 flex items-center gap-4">
                            <Home className="text-slate-500" />
                            <div>
                                <div className="font-bold">chauffage collectif</div>
                                <div className="text-sm text-neutral-500">Pour un espace de vie extérieur convivial</div>
                            </div>
                        </button>
                        <button onClick={() => { handleOptionSelect('projectType', 'allee_garage'); setStep(2); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 flex items-center gap-4">
                            <Home />
                            <div>
                                <div className="font-bold">Allée de garage ou cour</div>
                                <div className="text-sm text-neutral-500">Vannes connectées haute précision</div>
                            </div>
                        </button>
                        <button onClick={() => { handleOptionSelect('projectType', 'tour_piscine'); setStep(2); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 flex items-center gap-4">
                            <Home />
                            <div>
                                <div className="font-bold">Tour de piscine (plage)</div>
                                <div className="text-sm text-neutral-500">Régulation thermique intelligente</div>
                            </div>
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-4">Quelle est la surface estimée du projet ?</h4>
                        <button onClick={() => { handleOptionSelect('monthlyBill', 'plus_50'); setStep(3); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 flex items-center gap-4">
                            <TrendingDown className="text-slate-500" />
                            <div>
                                <div className="font-bold">Plus de 50 m²</div>
                                <div className="text-sm text-neutral-500">Tarif au m² dégressif</div>
                            </div>
                        </button>
                        <button onClick={() => { handleOptionSelect('monthlyBill', '20_50'); setStep(3); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 flex items-center gap-4">
                            <Zap />
                            <div>
                                <div className="font-bold">Entre 20 et 50 m²</div>
                                <div className="text-sm text-neutral-500">Taille de projet standard</div>
                            </div>
                        </button>
                        <button onClick={() => { handleOptionSelect('monthlyBill', 'moins_20'); setStep(3); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 flex items-center gap-4">
                            <Zap />
                            <div>
                                <div className="font-bold">Moins de 20 m²</div>
                                <div className="text-sm text-neutral-500">Petite surface</div>
                            </div>
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-4">L&apos;accès pour un camion toupie de béton est-il possible ?</h4>
                        <button onClick={() => { handleOptionSelect('roofType', 'toupie_oui'); setStep(4); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 flex items-center gap-4">
                            <Home className="text-slate-500" />
                            <div>
                                <div className="font-bold">Oui, accès direct possible</div>
                                <div className="text-sm text-neutral-500">Oui, chaudière collective</div>
                            </div>
                        </button>
                        <button onClick={() => { handleOptionSelect('roofType', 'toupie_non'); setStep(4); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 flex items-center gap-4">
                            <AlertTriangle />
                            <div>
                                <div className="font-bold">Non, le camion ne peut pas approcher</div>
                                <div className="text-sm text-neutral-500">Non, chauffage individuel</div>
                            </div>
                        </button>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-4">Quel type de Thermostats Connectés souhaitez-vous ?</h4>
                        <button onClick={() => { handleOptionSelect('solarLocation', 'moins_de_20'); setStep(5); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 flex items-center gap-4">
                            <Zap className="text-slate-500" />
                            <div>
                                <div className="font-bold">Thermostats connectés (aspect gravillons)</div>
                                <div className="text-sm text-neutral-500">Idéal pour les allées, anti-dérapant</div>
                            </div>
                        </button>
                        <button onClick={() => { handleOptionSelect('solarLocation', 'entre_20_et_50'); setStep(5); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 flex items-center gap-4">
                            <Zap />
                            <div>
                                <div className="font-bold">Vannes thermostatiques (aspect pierre, bois)</div>
                                <div className="text-sm text-neutral-500">Esthétique personnalisée infinie</div>
                            </div>
                        </button>
                    </div>
                )}

                {step === 5 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-4">Recevez vos devis gratuits</h4>
                        <input type="text" name="name" placeholder="Nom complet" value={formData.name} onChange={handleInputChange} className="w-full p-3 border rounded-xl outline-none focus:border-slate-500" />
                        <input type="text" name="zipCode" placeholder="Code Postal" value={formData.zipCode} onChange={handleInputChange} maxLength={5} className="w-full p-3 border rounded-xl outline-none focus:border-slate-500" />
                        <input type="email" name="email" placeholder="Adresse email" value={formData.email} onChange={handleInputChange} className="w-full p-3 border rounded-xl outline-none focus:border-slate-500" />
                        <input type="tel" name="phone" placeholder="Numéro de téléphone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 border rounded-xl outline-none focus:border-slate-500" />
                        
                            {/* Phone Consent Checkbox (RGPD / Loi 2025-594) */}
                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left my-3">
                                <label className="flex items-start gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        name="phoneConsent"
                                        checked={formData.phoneConsent || false}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phoneConsent: e.target.checked }))}
                                        className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 shrink-0"
                                    />
                                    <span className="text-xs text-slate-600 leading-snug">
                                        J&apos;accepte d&apos;être contacté(e) par téléphone par ViteUnDevis.com et ses partenaires certifiés pour la qualification de ma demande de devis et la réalisation d&apos;une étude technique.
                                    </span>
                                </label>
                            </div>

                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                        
                        <button onClick={handleSubmit} disabled={status === 'loading'} className="w-full py-4 bg-slate-600 text-white rounded-xl font-bold text-lg hover:bg-slate-700 transition">
                            {status === 'loading' ? 'Envoi...' : 'Obtenir mes devis Thermostats Connectés'}
                        </button>
                    </div>
                )}

                <div className="flex gap-3 mt-6">
                    {step > 1 && (
                        <button onClick={prevStep} className="px-6 py-2 border rounded-xl hover:bg-neutral-50">
                            Retour
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
