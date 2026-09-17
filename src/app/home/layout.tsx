import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <GoogleAnalytics GA_MEASUREMENT_ID="G-HFC1VPLDPL" />
            {children}
            <CookieBanner slug="home" cityName="Expert Thermostat Copropriété" />
        </>
    );
}
