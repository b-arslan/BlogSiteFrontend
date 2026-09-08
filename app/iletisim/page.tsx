import type { Metadata } from "next";

import ContactForm from "../components/ContactForm";
import PageHeader from "../components/PageHeader";
import { site } from "../lib/content";
import styles from "./contact.module.scss";

export const metadata: Metadata = {
    title: "İletişim",
    description: `Psikolog Mehmet Aker ile iletişime geçin. ${site.address}`,
    alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
    return (
        <>
            <PageHeader
                eyebrow="İletişim"
                title="Bize ulaşın"
                lede="Formu doldurabilir ya da doğrudan e-posta gönderebilirsiniz. Mesajlar genellikle aynı gün içinde yanıtlanır."
            />

            <section className="section">
                <div className={`container ${styles.grid}`}>
                    <div>
                        <h2 className={styles.heading}>Mesaj gönderin</h2>
                        <ContactForm />
                    </div>

                    <aside className={styles.aside}>
                        <h2 className={styles.heading}>Ofis</h2>
                        <address className={styles.address}>
                            {site.address}
                        </address>

                        <dl className={styles.details}>
                            <div>
                                <dt>Kurum</dt>
                                <dd>
                                    <a
                                        href={site.clinic.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {site.clinic.name}
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt>E-posta</dt>
                                <dd>
                                    <a href={`mailto:${site.email}`}>
                                        {site.email}
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt>Sosyal</dt>
                                <dd className={styles.social}>
                                    <a
                                        href={site.social.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Instagram
                                    </a>
                                    <a
                                        href={site.social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        LinkedIn
                                    </a>
                                </dd>
                            </div>
                        </dl>

                        <div className={styles.map}>
                            <iframe
                                src={site.mapEmbedUrl}
                                title="Ofis konumu haritası"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                            />
                        </div>
                    </aside>
                </div>
            </section>
        </>
    );
}
