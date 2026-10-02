import { ImageResponse } from "next/og";

export const runtime = "nodejs";

const BRAND = {
    name: "Thermostat Copropriété",
    domain: "www.thermostatcopropriete.fr",
    color: "#0284c7",
    baseline: "Régulation du chauffage collectif & Décret BACS 2027",
    cta: "Prise en charge CEE BAR-TH-173 jusqu'à 100%",
};

function pretty(raw: string): string {
    return raw
        .split("-")
        .map((w) => (w.length > 1 ? w.charAt(0).toUpperCase() + w.slice(1) : w.toUpperCase()))
        .join(" ");
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").slice(0, 70);
    const sub = (searchParams.get("sub") || BRAND.baseline).slice(0, 110);
    const badge = (searchParams.get("badge") || "").slice(0, 36);
    const title = q ? pretty(q) : BRAND.name;

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#0f172a",
                    backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                    padding: "56px 64px",
                    justifyContent: "space-between",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                        <div style={{ display: "flex", width: 14, height: 56, backgroundColor: BRAND.color, borderRadius: 4 }} />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", color: "#f8fafc", fontSize: 32, fontWeight: 700 }}>{BRAND.name}</div>
                            <div style={{ display: "flex", color: "#94a3b8", fontSize: 20, marginTop: 2 }}>{BRAND.domain}</div>
                        </div>
                    </div>
                    {badge ? (
                        <div
                            style={{
                                display: "flex",
                                backgroundColor: "rgba(2, 132, 199, 0.15)",
                                border: "1px solid rgba(2, 132, 199, 0.4)",
                                color: "#38bdf8",
                                padding: "8px 18px",
                                borderRadius: "9999px",
                                fontSize: 18,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                            }}
                        >
                            {badge}
                        </div>
                    ) : null}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            display: "flex",
                            color: "#f8fafc",
                            fontSize: title.length > 35 ? 54 : 68,
                            fontWeight: 800,
                            lineHeight: 1.1,
                            maxWidth: 1050,
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            color: "#cbd5e1",
                            fontSize: 26,
                            fontWeight: 500,
                            marginTop: 16,
                            maxWidth: 1000,
                        }}
                    >
                        {sub}
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20 }}>
                    <div style={{ display: "flex", color: "#e2e8f0", fontSize: 22, fontWeight: 600 }}>{BRAND.cta}</div>
                    <div style={{ display: "flex", color: "#94a3b8", fontSize: 18 }}>Décret Thermostat 2027 • Syndics & Conseils Syndicaux</div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            headers: { "cache-control": "public, max-age=86400, s-maxage=604800" },
        },
    );
}
