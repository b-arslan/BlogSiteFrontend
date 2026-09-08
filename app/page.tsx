import Link from "next/link";

import PostCard from "./components/PostCard";
import Faq from "./components/Faq";
import { getPosts } from "./lib/posts";
import { faqs, site, workAreas } from "./lib/content";
import styles from "./styles/home.module.scss";

// Statically rendered, refreshed in the background every 5 minutes.
export const revalidate = 300;

export default async function HomePage() {
    const posts = (await getPosts()).slice(0, 3);

    return (
        <>
            {/* ---------------- Hero ---------------- */}
            <section className={styles.hero}>
                <div className={`container-narrow ${styles.heroInner}`}>
                    <p className="eyebrow">Konya / Meram</p>
                    <h1 className={styles.heroTitle}>
                        Zorlandığınız yerde durup{" "}
                        <em className={styles.heroEm}>bakmaya</em> değer.
                    </h1>
                    <p className={`lede ${styles.heroLede}`}>
                        Ergen ve yetişkinlere yönelik, bilişsel davranışçı terapi
                        temelli bireysel psikolojik danışmanlık. Süreç baştan
                        belirsiz bırakılmaz; nereye, neden gittiğimizi birlikte
                        belirleriz.
                    </p>
                    <div className={styles.heroActions}>
                        <Link href="/iletisim" className="btn btn-primary">
                            İletişime geçin
                        </Link>
                        <Link
                            href="/calisma-alanlari"
                            className="btn btn-secondary"
                        >
                            Çalışma alanları
                        </Link>
                    </div>
                </div>
            </section>

            {/* ---------------- Intro ---------------- */}
            <section className={`section ${styles.introSection}`}>
                <div className={`container ${styles.intro}`}>
                    <div>
                        <p className="eyebrow">Hakkımda</p>
                        <h2>Merhaba, ben Psikolog Mehmet Aker</h2>
                    </div>
                    <div className={styles.introBody}>
                        <p>
                            KTO Karatay Üniversitesi Psikoloji bölümünden mezun
                            oldum. Terapötik yaklaşımımı, ağırlıklı olarak
                            bilişsel davranışçı terapi çerçevesinde ve her
                            danışanın kendine özgü ihtiyacına göre
                            şekillendiriyorum.
                        </p>
                        <p>
                            Danışanla kurulan güven temelli ilişkiyi sürecin en
                            belirleyici unsuru olarak görüyorum. Terapi benim
                            için, birlikte çıkılan ve yönünü birlikte
                            belirlediğimiz bir yolculuk.
                        </p>
                        <Link href="/hakkimda" className={styles.textLink}>
                            Devamını okuyun →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ---------------- Work areas ---------------- */}
            <section className={`section section-sunken`}>
                <div className="container">
                    <div className={styles.sectionHead}>
                        <p className="eyebrow">Çalışma Alanları</p>
                        <h2>Hangi konularda destek alabilirsiniz?</h2>
                    </div>

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
                                    <h3 className={styles.areaTitle}>
                                        {area.title}
                                    </h3>
                                    <p className={styles.areaSummary}>
                                        {area.summary}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ---------------- Latest posts ---------------- */}
            {posts.length > 0 && (
                <section className="section">
                    <div className="container">
                        <div className={styles.sectionHeadRow}>
                            <div>
                                <p className="eyebrow">Yazılar</p>
                                <h2>Son yazılar</h2>
                            </div>
                            <Link href="/yazilar" className={styles.textLink}>
                                Tümünü görün →
                            </Link>
                        </div>

                        <div className={styles.postGrid}>
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------------- FAQ ---------------- */}
            <section className="section">
                <div className="container-narrow">
                    <div className={styles.sectionHead}>
                        <p className="eyebrow">Sıkça Sorulan Sorular</p>
                        <h2>Merak edilenler</h2>
                    </div>
                    <Faq items={faqs.slice(0, 4)} />
                    <p className={styles.faqMore}>
                        <Link
                            href="/sikca-sorulan-sorular"
                            className={styles.textLink}
                        >
                            Tüm soruları görün →
                        </Link>
                    </p>
                </div>
            </section>

            {/* ---------------- Contact CTA ---------------- */}
            <section className={styles.cta}>
                <div className={`container-narrow ${styles.ctaInner}`}>
                    <h2 className={styles.ctaTitle}>
                        Başlamak için hazırsanız
                    </h2>
                    <p className={styles.ctaText}>
                        İlk görüşme, birlikte çalışıp çalışmayacağımıza karar
                        verdiğimiz bir tanışmadır. Soru sormak için de
                        yazabilirsiniz.
                    </p>
                    <div className={styles.heroActions}>
                        <Link href="/iletisim" className="btn btn-primary">
                            İletişim formu
                        </Link>
                        <a
                            href={`mailto:${site.email}`}
                            className="btn btn-secondary"
                        >
                            {site.email}
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
