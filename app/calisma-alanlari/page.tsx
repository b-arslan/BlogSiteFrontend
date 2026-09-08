import type { Metadata } from "next";
import Link from "next/link";

import PageHeader from "../components/PageHeader";
import { workAreas } from "../lib/content";
import styles from "../styles/home.module.scss";

export const metadata: Metadata = {
    title: "Çalışma Alanları",
    description:
        "Ergen danışmanlığı, kaygı ve stres, sınav kaygısı, depresyon, ilişki sorunları ve özgüven alanlarında bireysel psikolojik danışmanlık.",
    alternates: { canonical: "/calisma-alanlari" },
};

export default function WorkAreasPage() {
    return (
        <>
            <PageHeader
                eyebrow="Çalışma Alanları"
                title="Hangi konularda destek alabilirsiniz?"
                lede="Aşağıdaki başlıklar en sık çalıştığım alanlar. Listede göremediğiniz bir konu için de yazabilirsiniz."
            />

            <section className="section">
                <div className="container">
                    <ul className={styles.areaGrid}>
                        {workAreas.map((area) => (
                            <li key={area.slug}>
                                <Link
                                    href={`/calisma-alanlari/${area.slug}`}
                                    className={styles.areaCard}
                                >
                                    <span className={styles.areaTag}>
                                        {area.audience}
                                    </span>
                                    <h2 className={styles.areaTitle}>
                                        {area.title}
                                    </h2>
                                    <p className={styles.areaSummary}>
                                        {area.summary}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}
