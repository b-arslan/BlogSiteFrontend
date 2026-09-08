import type { Metadata } from "next";

import Faq from "../components/Faq";
import PageHeader from "../components/PageHeader";
import { faqs } from "../lib/content";

export const metadata: Metadata = {
    title: "Sıkça Sorulan Sorular",
    description:
        "Terapi süreci, seans süresi, gizlilik ve başvuru koşulları hakkında en sık sorulan sorular ve yanıtları.",
    alternates: { canonical: "/sikca-sorulan-sorular" },
};

export default function FaqPage() {
    return (
        <>
            <PageHeader
                eyebrow="S.S.S."
                title="Sıkça sorulan sorular"
                lede="Terapiye başlamadan önce en çok merak edilenler. Buradan yanıtını bulamadığınız bir soru varsa çekinmeden yazın."
            />

            <section className="section">
                <div className="container-narrow">
                    <Faq items={faqs} />
                </div>
            </section>
        </>
    );
}
