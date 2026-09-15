import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createSupabaseAdmin } from '@/lib/supabase-server';
import { getSiteConfig } from '@/lib/sites-config';
import { sendLeadToViteUnDevis } from '@/lib/viteundevis';
import { sendLeadToHabitissimo } from '@/lib/habitissimo';
import { sendLeadToDAA } from '@/lib/daa';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const clientIp = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "82.64.15.20";
        const refererUrl = request.headers.get("referer") || "";
        const consentText = body.consentText || "J'accepte d'être contacté(e) par téléphone par ViteUnDevis.com et ses partenaires certifiés pour la qualification de ma demande de devis et la réalisation d'une étude technique.";
        const consentDate = body.consentDate || new Date().toISOString();
        const consentIp = clientIp;
        const consentUrl = body.consentUrl || refererUrl || "https://" + (body.domain || "thermostatcopropriete.fr");
        console.log("📥 [API/LEADS] Received body:", body);
        const {
            name, email, phone, city, postalCode, domain,
            projectType, monthlyBill, roofType, solarLocation,
            attribution
        } = body;

        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: 'Fields name, email and phone are required' },
                { status: 400 }
            );
        }

        let leadScore = body.leadScore || 60;
        const currentCountry = 'FR' as string;
        const currentNiche = 'thermostat';
        
        // ----------------------------------------------------
        // ARBITRAGE BACS COPROPRIÉTÉ
        // Les projets de régulation thermique en copropriété (BACS / CEE) 
        // sont des dossiers B2B à haute valeur (€15k-€50k) traités en direct_partner
        // (ViteUnDevis ne gère pas cette catégorie B2B collective).
        // ----------------------------------------------------
        let arbitrageStatus = 'direct_partner';
        let arbitrageResult: any = { status: 'direct_partner', reason: 'BACS copropriete CEE - traitement direct' };

        console.log(`⚖️ [ARBITRAGE] Copropriété BACS -> Partenaire Direct Réseau BACS`);

        // 2. HABITISSIMO (ES / MX)
        if (arbitrageStatus === 'habitissimo') {
            console.log("📡 [Habitissimo] Forwarding lead...");
            const habitissimoPayload = {
                contact: { name, email, phone, zip_code: postalCode, city: city },
                project: { category: currentNiche, description: `Demande de devis générée depuis ${domain}. Projet: ${projectType}`, timeline: "Asap" }
            };
            try {
                arbitrageResult = await sendLeadToHabitissimo(habitissimoPayload);
            } catch (err) { console.error("❌ Failed to forward to Habitissimo:", err); }
        }

        // 3. DAA (DE / CH / AT)
        if (arbitrageStatus === 'daa') {
            console.log("📡 [DAA] Forwarding lead...");
            const nameParts = (name || '').trim().split(/\s+/);
            const daaPayload = {
                customer: { first_name: nameParts[0] || 'Kunde', last_name: nameParts.slice(1).join(' ') || 'Unbekannt', email, phone, zip: postalCode, city },
                inquiry: { trade: currentNiche, notes: `Projekt: ${projectType}. Generiert via ${domain}` }
            };
            try {
                arbitrageResult = await sendLeadToDAA(daaPayload);
            } catch (err) { console.error("❌ Failed to forward to DAA:", err); }
        }

        // 4. SAVE TO DATABASE (Supabase) - NON-BLOCKING & SCHEMA SAFE
        const metadata = {
            project_type: projectType,
            monthly_bill: monthlyBill,
            roof_type: roofType,
            solar_location: solarLocation,
            source: 'website',
            attribution: attribution || { source: 'direct', medium: 'direct' },
            score: leadScore,
            arbitrage_status: arbitrageStatus,
            niche: currentNiche,
            country: currentCountry
        };

        const siteConfig = getSiteConfig(domain);
        const region = siteConfig?.region || 'National';
        const department = siteConfig?.department || (postalCode ? postalCode.substring(0, 2) : null);

        try {
            const supabase = createSupabaseAdmin();
            const leadPayload: any = {
                name,
                email,
                phone,
                city: city || 'France',
                postal_code: postalCode || '75000',
                tenant_id: domain || 'thermostatcopropriete.fr',
                type: `${currentNiche}_lead`,
                housing_type: projectType || 'copro_chauffage_collectif',
                status: 'new',
                region: region,
                department: department,
                message: JSON.stringify(metadata, null, 2)
            };

            const { error: dbError } = await supabase.from('leads').insert(leadPayload);
            if (dbError) {
                console.error("⚠️ [Supabase DB Error] (non-blocking):", dbError.message);
            }
        } catch (dbErr) {
            console.error("⚠️ [Supabase Exception] (non-blocking):", dbErr);
        }

        // 5. SEND NOTIFICATION EMAIL (Resend) - NON-BLOCKING & VERIFIED ROUTING
        try {
            const apiKey = process.env.RESEND_API_KEY;
            if (apiKey) {
                const resend = new Resend(apiKey);
                const siteName = siteConfig?.name || "Thermostat Copropriété";
                const emoji = arbitrageStatus === 'direct_partner' ? '💎' : '🤝';
                const subject = `${emoji} Nouveau Lead Copropriété [${city || 'France'} - ${postalCode || 'N/A'}] - ${name}`;
                const html = `
                    <h1>Nouveau Lead - ${currentNiche.toUpperCase()}</h1>
                    <p><strong>Domaine :</strong> ${domain || 'thermostatcopropriete.fr'} (${city || 'France'} - ${postalCode || 'N/A'})</p>
                    
                    <div style="background-color: #f0fdf4; border: 1.5px solid #22c55e; padding: 16px; border-radius: 12px; margin-bottom: 20px;">
                        <h2 style="margin-top:0; color: #166534;">
                            💎 PARTENAIRE DIRECT - DÉCRET BACS & CEE COPROPRIÉTÉ
                        </h2>
                        <p><strong>Score :</strong> ${leadScore} / 100</p>
                        <p><strong>Statut Arbitrage :</strong> ${arbitrageStatus}</p>
                        <p><strong>Pays :</strong> ${currentCountry}</p>
                    </div>

                    <h2>Informations de contact</h2>
                    <ul>
                        <li><strong>Nom :</strong> ${name}</li>
                        <li><strong>Email :</strong> ${email}</li>
                        <li><strong>Téléphone :</strong> ${phone}</li>
                    </ul>

                    <h2>Critères de Qualification</h2>
                    <ul>
                        ${Object.entries(metadata)
                            .filter(([k]) => !['attribution', 'score', 'arbitrage_status', 'niche', 'country', 'source'].includes(k))
                            .map(([k, v]) => `<li><strong>${k.replace(/_/g, ' ')} :</strong> ${v || 'N/A'}</li>`)
                            .join('\n                    ')}
                    </ul>

                    <h2>Attribution Marketing</h2>
                    <ul>
                        <li><strong>Source / Medium :</strong> ${attribution?.source || 'direct'} / ${attribution?.medium || 'direct'}</li>
                        ${attribution?.campaign ? `<li><strong>Campagne :</strong> ${attribution.campaign}</li>` : ''}
                        ${attribution?.term ? `<li><strong>Mot-clé recherché :</strong> ${attribution.term}</li>` : ''}
                        ${attribution?.landing_page ? `<li><strong>Page de capture :</strong> ${attribution.landing_page}</li>` : ''}
                    </ul>
                `;

                try {
                    await resend.emails.send({
                        from: `${siteName} <hello@expertbornerecharge.com>`,
                        to: ['hello@expertbornerecharge.com'],
                        subject,
                        html
                    });
                } catch (sendErr) {
                    await resend.emails.send({
                        from: `${siteName} <contact@expertpompeachaleur.com>`,
                        to: ['hello@expertbornerecharge.com'],
                        subject,
                        html
                    });
                }
            }
        } catch (emailErr) {
            console.error("⚠️ [Resend Error] (non-blocking):", emailErr);
        }

        const vudDetails = arbitrageResult?.devis_data?.devis_id ? {
            devis_id: String(arbitrageResult.devis_data.devis_id),
            devis_hash: arbitrageResult.devis_data.devis_hash || ''
        } : null;

        return NextResponse.json({ 
            success: true, 
            score: leadScore, 
            status: arbitrageStatus,
            vud: vudDetails,
            arbitrage_result: arbitrageResult
        });

    } catch (e: any) {
        console.error('API Error:', e);
        return NextResponse.json(
            { error: `Internal Server Error: ${e.message}` },
            { status: 500 }
        );
    }
}
