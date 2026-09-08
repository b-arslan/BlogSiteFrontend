import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./styles/globals.scss";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import VisitorTracker from "./components/VisitorTracker";
import { site } from "./lib/content";

// latin-ext carries ğ, ş, ı, İ — without it Turkish text falls back mid-word.
const inter = Inter({
    subsets: ["latin", "latin-ext"],
    display: "swap",
    variable: "--font-sans",
});

const lora = Lora({
    subsets: ["latin", "latin-ext"],
    display: "swap",
    weight: ["400", "500", "600"],
    variable: "--font-serif",
});

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: `${site.name} | Ergen ve Yetişkin Terapisi`,
        template: `%s | ${site.name}`,
    },
    description:
        "Psikolog Mehmet Aker — Konya Meram'da ergen ve yetişkinlere yönelik bilişsel davranışçı terapi temelli bireysel psikolojik danışmanlık.",
    keywords: [
        "psikolog",
        "Mehmet Aker",
        "Konya psikolog",
        "ergen danışmanlığı",
        "yetişkin terapisi",
        "bilişsel davranışçı terapi",
        "kaygı",
        "sınav kaygısı",
    ],
    openGraph: {
        type: "website",
        locale: "tr_TR",
        siteName: site.name,
        url: site.url,
    },
    robots: { index: true, follow: true },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="tr" className={`${inter.variable} ${lora.variable}`}>
            <body>
                <a className="skip-link" href="#main">
                    İçeriğe geç
                </a>
                <SiteHeader />
                <main id="main">{children}</main>
                <SiteFooter />
                <VisitorTracker />
                <Analytics />
            </body>
        </html>
    );
}
