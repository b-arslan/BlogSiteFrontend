import type { Metadata } from "next";

import PostCard from "../components/PostCard";
import PageHeader from "../components/PageHeader";
import { getPosts } from "../lib/posts";
import { site } from "../lib/content";
import styles from "../styles/home.module.scss";
import pageStyles from "./posts.module.scss";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Yazılar",
    description:
        "Kaygı, sınav kaygısı, ergenlik, ilişkiler ve duygudurum üzerine Psikolog Mehmet Aker tarafından yazılan bilgilendirici içerikler.",
    alternates: { canonical: "/yazilar" },
};

export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <>
            <PageHeader
                eyebrow="Yazılar"
                title="Ruh sağlığı üzerine yazılar"
                lede="Danışanlarımdan en sık gelen soruları ve alanla ilgili merak edilen konuları burada derliyorum."
            />

            <section className="section">
                <div className="container">
                    {posts.length === 0 ? (
                        <p className="lede">Henüz yayımlanmış bir yazı yok.</p>
                    ) : (
                        <div className={styles.postGrid}>
                            {posts.map((post, index) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    priority={index < 3}
                                />
                            ))}
                        </div>
                    )}

                    <aside className={pageStyles.press}>
                        <div>
                            <p className="eyebrow">Basında</p>
                            <h2 className={pageStyles.pressTitle}>
                                {site.press.name} gazetesindeki köşe yazıları
                            </h2>
                            <p className={pageStyles.pressText}>
                                Ruh sağlığı üzerine düzenli olarak kaleme
                                aldığım yazılara gazetenin sitesinden
                                ulaşabilirsiniz.
                            </p>
                        </div>
                        <a
                            href={site.press.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            Köşe yazılarına gidin ↗
                        </a>
                    </aside>
                </div>
            </section>
        </>
    );
}
