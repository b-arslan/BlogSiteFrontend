import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageHeader from "../../components/PageHeader";
import { site, workAreas } from "../../lib/content";
import styles from "./area.module.scss";

export const dynamicParams = false;

export function generateStaticParams() {
    return workAreas.map((area) => ({ slug: area.slug }));
}

export function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Metadata {
    const area = workAreas.find((item) => item.slug === params.slug);

    if (!area) return { title: "Sayfa bulunamadı" };

    return {
        title: area.title,
        description: area.summary,
        alternates: { canonical: `/calisma-alanlari/${area.slug}` },
    };
}

export default function WorkAreaPage({
    params,
}: {
    params: { slug: string };
}) {
    const area = workAreas.find((item) => item.slug === params.slug);

    if (!area) notFound();

    const others = workAreas.filter((item) => item.slug !== area.slug);

    return (
        <>
            <PageHeader eyebrow={area.audience} title={area.title} />

            <section className={`container-narrow ${styles.body}`}>
                <p className={`lede ${styles.summary}`}>{area.summary}</p>

                <div className="prose">
                    {area.body.map((paragraph) => (
                        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                </div>

                <div className={styles.cta}>
                    <h2 className={styles.ctaTitle}>
                        Bu konuda görüşmek isterseniz
                    </h2>
                    <p className={styles.ctaText}>
                        İlk görüşme bir tanışmadır; sürecin size uygun olup
                        olmadığına birlikte karar veririz.
                    </p>
                    <div className={styles.ctaActions}>
                        <Link href="/iletisim" className="btn btn-primary">
                            İletişime geçin
                        </Link>
                        <a
                            href={`mailto:${site.email}`}
                            className="btn btn-secondary"
                        >
                            E-posta gönderin
                        </a>
                    </div>
                </div>

                <nav className={styles.others} aria-label="Diğer çalışma alanları">
                    <h2 className={styles.othersTitle}>Diğer çalışma alanları</h2>
                    <ul>
                        {others.map((item) => (
                            <li key={item.slug}>
                                <Link href={`/calisma-alanlari/${item.slug}`}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>
        </>
    );
}
