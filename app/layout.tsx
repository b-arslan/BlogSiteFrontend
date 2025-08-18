import type { Metadata } from "next";
import "./styles/globals.scss";
import { Inter } from "next/font/google";
import HeaderComponent from "./components/HeaderComponent";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import dynamic from "next/dynamic";
const FooterComponent = dynamic(() => import("./components/FooterComponent"), {
    ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Psikolog Mehmet Aker",
    description:
        "Psikolog Mehmet Aker'in uzmanlık alanları ile ilgili bilgilendirici içerikler, bilişsel davranışçı terapi, terapi yöntemleri, ruh sağlığı ve mental gelişim üzerine blog yazıları.",
    keywords:
        "Psikolog, Mehmet Aker, uzman psikolog, terapi, ruh sağlığı, mental gelişim, danışmanlık, psikoloji blog, psikoloji, aker",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <Head>
                <link rel="preload" as="style" href="/styles/gloabls.scss" />
            </Head>
            <body className={inter.className}>
                <HeaderComponent />
                <main>{children}</main>
                <FooterComponent />
                <Analytics />
            </body>
        </html>
    );
}
