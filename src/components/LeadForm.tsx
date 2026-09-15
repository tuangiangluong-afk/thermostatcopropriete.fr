"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Home, Shield, Phone, Mail, CheckCircle, Zap, Cpu, Gauge, Sliders } from "lucide-react";
import Link from "next/link";

interface LeadFormProps {
    city: string;
    domain: string;
    targetType?: string;
    themeColor?: string;
    initialProjectType?: string;
}

interface FormData {
    projectType: "copro_chauffage_collectif" | "copro_chauffage_individuel" | "tertiaire_bacs" | "autre" | null;
    monthlyBill: "plus_50" | "20_50" | "moins_20" | null;
    roofType: "chaudiere_collective" | "reseau_chaleur" | "pac_hybride" | "autre" | null;
    solarLocation: "regulation_bacs" | "vannes_connectees" | "audit_devis" | "autre" | null;
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
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const totalSteps = 5;
    const progress = (step / totalSteps) * 100;

    const handleOptionSelect = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (status === "error") {
            setStatus("idle");
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
                    PHONE_REGEX.test(formData.phone.replace(/\s/g, "")) && formData.phoneConsent === true
                );
            default: return false;
        }
    };

    const nextStep = () => { if (canProceed() && step < totalSteps) setStep(step + 1); };
    const prevStep = () => { if (step > 1) setStep(step - 1); };

    const handleSubmit = async () => {
        if (!canProceed()) {
            setStatus("error");
            setErrorMessage("Veuillez renseigner tous les champs requis.");
            return;
        }

        setStatus("loading");
        try {
            const payload = {
                ...formData,
                city,
                postalCode: formData.zipCode,
                domain: domain || "thermostatcopropriete.fr",
                niche: "thermostat",
                country: "FR",
                leadScore: formData.monthlyBill === "plus_50" ? 85 : 65,
                timestamp: new Date().toISOString()
            };

            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                let errText = "Erreur lors de l envoi de la demande";
                try {
                    const errJson = await res.json();
                    if (errJson.error) errText = errJson.error;
                } catch {
                    // ignore
                }
                throw new Error(errText);
            }
            
            const data = await res.json();
            if (data?.vud?.devis_id) {
                router.push(`/success?devis_id=${data.vud.devis_id}&devis_hash=${data.vud.devis_hash || ""}`);
                return;
            }
            setStatus("success");
        } catch (error: any) {
            setStatus("error");
            setErrorMessage(error.message || "Une erreur est survenue");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-8 text-center">
                <CheckCircle className="text-emerald-600 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Votre demande d&apos;étude est enregistrée !</h3>
                <p className="text-neutral-700 mb-6">
                    Votre dossier a été transmis à nos spécialistes partenaires certifiés en régulation thermique de copropriété & Décret BACS. Un ingénieur thermicien étudiera votre configuration pour votre immeuble {(!city || city.toLowerCase() === "france" || city.toLowerCase() === "national") ? "en France" : <>à <strong>{city}</strong></>} sous <strong>24h</strong>.
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-emerald-800 font-semibold bg-emerald-100/70 px-4 py-2 rounded-full">
                    <Shield size={16} /> Éligibilité CEE & BACS vérifiée gratuitement
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden font-sans">
            <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">Étude Thermique & CEE</span>
                        <h3 className="font-bold text-lg mt-0.5">{`Simulateur Thermostats Connectés Copropriété ${city ? `· ${city}` : ""}`}</h3>
                    </div>
                    <Cpu className="text-emerald-400" size={28} />
                </div>
                <div className="h-2 bg-white/20 rounded-full mt-4">
                    <div className="h-full bg-emerald-400 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className="p-6">
                {step === 1 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-2">Quel est le profil de votre immeuble ?</h4>
                        <p className="text-sm text-neutral-500 mb-4">Sélectionnez la configuration du bâtiment pour orienter l&apos;étude de régulation.</p>
                        <button onClick={() => { handleOptionSelect("projectType", "copro_chauffage_collectif"); setStep(2); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 hover:border-slate-400 transition flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                <Building2 size={22} />
                            </div>
                            <div>
                                <div className="font-bold text-neutral-900">Copropriété avec chauffage collectif</div>
                                <div className="text-sm text-neutral-500">Chaudière collective gaz, fioul ou réseau urbain</div>
                            </div>
                        </button>
                        <button onClick={() => { handleOptionSelect("projectType", "copro_chauffage_individuel"); setStep(2); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 hover:border-slate-400 transition flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                                <Home size={22} />
                            </div>
                            <div>
                                <div className="font-bold text-neutral-900">Copropriété avec chauffage individuel</div>
                                <div className="text-sm text-neutral-500">Chaque lot dispose de sa propre chaudière ou radiateurs</div>
                            </div>
                        </button>
                        <button onClick={() => { handleOptionSelect("projectType", "tertiaire_bacs"); setStep(2); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 hover:border-slate-400 transition flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <Gauge size={22} />
                            </div>
                            <div>
                                <div className="font-bold text-neutral-900">Bâtiment tertiaire / Immeuble de bureaux</div>
                                <div className="text-sm text-neutral-500">Mise en conformité BACS obligatoire & optimisation GTB</div>
                            </div>
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-2">Combien de lots comporte l&apos;ensemble ?</h4>
                        <p className="text-sm text-neutral-500 mb-4">Le dimensionnement et les primes CEE dépendent du volume de logements.</p>
                        <button onClick={() => { handleOptionSelect("monthlyBill", "plus_50"); setStep(3); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 hover:border-slate-400 transition flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                <Building2 size={22} />
                            </div>
                            <div>
                                <div className="font-bold text-neutral-900">Plus de 50 lots (Grand ensemble)</div>
                                <div className="text-sm text-neutral-500">Obligation Décret BACS prioritaire · Primes CEE maximales</div>
                            </div>
                        </button>
                        <button onClick={() => { handleOptionSelect("monthlyBill", "20_50"); setStep(3); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 hover:border-slate-400 transition flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                                <Building2 size={22} />
                            </div>
                            <div>
                                <div className="font-bold text-neutral-900">Entre 20 et 50 lots (Copropriété intermédiaire)</div>
                                <div className="text-sm text-neutral-500">Régulation par zone et vannes connectées</div>
                            </div>
                        </button>
                        <button onClick={() => { handleOptionSelect("monthlyBill", "moins_20"); setStep(3); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 hover:border-slate-400 transition flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                                <Building2 size={22} />
                            </div>
                            <div>
                                <div className="font-bold text-neutral-900">Moins de 20 lots (Petite copropriété)</div>
                                <div className="text-sm text-neutral-500">Solution compacte et télégestion simplifiée</div>
                            </div>
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-2">Quel est le mode de production thermique actuel ?</h4>
                        <p className="text-sm text-neutral-500 mb-4">Pour raccorder les sondes, automates et servomoteurs adéquats.</p>
                        <button onClick={() => { handleOptionSelect("roofType", "chaudiere_collective"); setStep(4); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 hover:border-slate-400 transition flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                <Zap size={22} />
                            </div>
                            <div>
                                <div className="font-bold text-neutral-900">Chaudière collective gaz naturel ou fioul</div>
                                <div className="text-sm text-neutral-500">Régulation par courbe de chauffe et vanne mélangeuse</div>
                            </div>
                        </button>
                        <button onClick={() => { handleOptionSelect("roofType", "reseau_chaleur"); setStep(4); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 hover:border-slate-400 transition flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                <Gauge size={22} />
                            </div>
                            <div>
                                <div className="font-bold text-neutral-900">Réseau de chaleur urbain (Chauffage urbain)</div>
                                <div className="text-sm text-neutral-500">Sous-station d&apos;échange thermique & comptage énergétique</div>
                            </div>
                        </button>
                        <button onClick={() => { handleOptionSelect("roofType", "pac_hybride"); setStep(4); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 hover:border-slate-400 transition flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <Cpu size={22} />
                            </div>
                            <div>
                                <div className="font-bold text-neutral-900">Pompe à chaleur collective ou système hybride</div>
                                <div className="text-sm text-neutral-500">Pilotage optimisé des températures de départ et relève</div>
                            </div>
                        </button>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-2">Quel est l&apos;objectif prioritaire du projet ?</h4>
                        <p className="text-sm text-neutral-500 mb-4">Pour préparer le chiffrage et les fiches d&apos;opérations standardisées CEE.</p>
                        <button onClick={() => { handleOptionSelect("solarLocation", "regulation_bacs"); setStep(5); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 hover:border-slate-400 transition flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                <Shield size={22} />
                            </div>
                            <div>
                                <div className="font-bold text-neutral-900">Conformité Décret BACS (Obligation 2027)</div>
                                <div className="text-sm text-neutral-500">Système GTB de classe B ou A avec télégestion</div>
                            </div>
                        </button>
                        <button onClick={() => { handleOptionSelect("solarLocation", "vannes_connectees"); setStep(5); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 hover:border-slate-400 transition flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                <Sliders size={22} />
                            </div>
                            <div>
                                <div className="font-bold text-neutral-900">Vannes thermostatiques connectées & Équilibrage</div>
                                <div className="text-sm text-neutral-500">Régulation terminale pièce par pièce (jusqu&apos;à -25% de charges)</div>
                            </div>
                        </button>
                        <button onClick={() => { handleOptionSelect("solarLocation", "audit_devis"); setStep(5); }} className="w-full p-4 border rounded-xl text-left hover:bg-neutral-50 hover:border-slate-400 transition flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                                <Cpu size={22} />
                            </div>
                            <div>
                                <div className="font-bold text-neutral-900">Audit chaufferie & Devis comparatif syndic</div>
                                <div className="text-sm text-neutral-500">Dossier complet prêt pour l&apos;Assemblée Générale (AG)</div>
                            </div>
                        </button>
                    </div>
                )}

                {step === 5 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-1">Recevez votre étude & devis sous 24h</h4>
                        <p className="text-sm text-neutral-500 mb-4">Ces informations permettent à l&apos;ingénieur thermicien d&apos;éditer votre dossier technique.</p>
                        
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">Nom du contact (Syndic / Conseil syndical / Copropriétaire)</label>
                            <input type="text" name="name" placeholder="Ex : Liliane Vilay" value={formData.name} onChange={handleInputChange} className="w-full p-3 border rounded-xl outline-none focus:border-slate-800 transition" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">Code Postal de l&apos;immeuble</label>
                            <input type="text" name="zipCode" placeholder="Ex : 92110" value={formData.zipCode} onChange={handleInputChange} maxLength={5} className="w-full p-3 border rounded-xl outline-none focus:border-slate-800 transition" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">Adresse email professionnelle ou personnelle</label>
                            <input type="email" name="email" placeholder="Ex : contact@residence-exemple.fr" value={formData.email} onChange={handleInputChange} className="w-full p-3 border rounded-xl outline-none focus:border-slate-800 transition" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">Téléphone de contact</label>
                            <input type="tel" name="phone" placeholder="Ex : 01 86 04 66 83" value={formData.phone} onChange={handleInputChange} className="w-full p-3 border rounded-xl outline-none focus:border-slate-800 transition" />
                        </div>
                        
                        {/* Phone Consent Checkbox (RGPD / Loi 2025-594) */}
                        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-left my-3">
                            <label className="flex items-start gap-3 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    name="phoneConsent"
                                    checked={formData.phoneConsent || false}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phoneConsent: e.target.checked }))}
                                    className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-slate-800 accent-slate-800 shrink-0"
                                />
                                <span className="text-xs text-slate-600 leading-snug">
                                    J&apos;accepte d&apos;être contacté(e) par téléphone par les ingénieurs thermiciens et partenaires certifiés pour l&apos;étude technique de notre copropriété et la réalisation du devis gratuit sans engagement.
                                </span>
                            </label>
                        </div>

                        {errorMessage && <p className="text-red-600 font-medium text-sm bg-red-50 p-2.5 rounded-lg border border-red-200">{errorMessage}</p>}
                        
                        <button onClick={handleSubmit} disabled={status === "loading"} className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold text-lg hover:bg-slate-900 transition flex items-center justify-center gap-2">
                            {status === "loading" ? (
                                <span>Traitement en cours...</span>
                            ) : (
                                <span>Obtenir mon étude Thermostats Copropriété</span>
                            )}
                        </button>
                    </div>
                )}

                <div className="flex gap-3 mt-6">
                    {step > 1 && (
                        <button onClick={prevStep} className="px-6 py-2 border rounded-xl hover:bg-neutral-50 text-sm font-medium">
                            Retour
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
