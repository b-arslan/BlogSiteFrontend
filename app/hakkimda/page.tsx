import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ProfileImg from "../../public/profile.jpg";
import aboutText from "../../public/about.json";
import { site } from "../lib/content";
import styles from "./about.module.scss";

export const metadata: Metadata = {
    title: "Hakkımda",
    description:
        "Psikolog Mehmet Aker'in eğitim geçmişi, terapi yaklaşımı ve çalışma biçimi hakkında.",
    alternates: { canonical: "/hakkimda" },
};

export default function AboutPage() {
    // First entry in about.json is the greeting line, the rest is body copy.
    const [greeting, ...paragraphs] = aboutText.aboutText;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.name,
        jobTitle: "Psikolog",
        url: `${site.url}/hakkimda`,
        email: site.email,
        sameAs: [
            site.social.instagram,
            site.social.linkedin,
            site.clinic.url,
            site.press.url,
        ],
        worksFor: {
            "@type": "Organization",
            name: site.clinic.name,
            url: site.clinic.url,
        },
        address: {
            "@type": "PostalAddress",
            streetAddress: "Musalla Bağları, Gürsesler Sk. No:7",
            postalCode: "42060",
            addressLocality: "Selçuklu",
            addressRegion: "Konya",
            addressCountry: "TR",
        },
    };

    return (
        <>
            <div className={styles.layout}>
                <div className={`container ${styles.grid}`}>
                    <aside className={styles.aside}>
                        <Image
                            src={ProfileImg}
                            alt={`${site.name} portre fotoğrafı`}
                            priority
                            placeholder="blur"
                            className={styles.photo}
                            sizes="(max-width: 900px) 100vw, 340px"
                        />
                        <dl className={styles.facts}>
                            <div>
                                <dt>Eğitim</dt>
                                <dd>KTO Karatay Üniversitesi, Psikoloji</dd>
                            </div>
                            {/* <div>
                                <dt>Yaklaşım</dt>
                                <dd>Bilişsel Davranışçı Terapi (BDT)</dd>
                            </div>
                            <div>
                                <dt>Çalışılan gruplar</dt>
                                <dd>Ergen ve yetişkin</dd>
                            </div> */}
                            <div>
                                <dt>Çalıştığı kurum</dt>
                                <dd>
                                    <a
                                        className={styles.factLink}
                                        href={site.clinic.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {site.clinic.name}
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt>Köşe yazıları</dt>
                                <dd>
                                    <a
                                        className={styles.factLink}
                                        href={site.press.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {site.press.name}
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt>Konum</dt>
                                <dd>{site.address}</dd>
                            </div>
                        </dl>
                        <Link href="/iletisim" className="btn btn-primary">
                            İletişime geçin
                        </Link>
                    </aside>

                    <div className={styles.body}>
                        <p className="eyebrow">Hakkımda</p>
                        <h1 className={styles.title}>{greeting}</h1>
                        <div className={`prose ${styles.prose}`}>
                            {paragraphs.map((paragraph) => (
                                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </>
    );
}
