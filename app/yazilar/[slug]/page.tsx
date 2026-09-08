import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import PostCard from "../../components/PostCard";
import { getPost, getPosts, idFromSlug, postPath } from "../../lib/posts";
import { sanitizeHtml } from "../../lib/sanitize";
import { site } from "../../lib/content";
import homeStyles from "../../styles/home.module.scss";
import styles from "./post.module.scss";

export const revalidate = 300;
// A slug that isn't in the build-time list is still rendered on demand, so
// posts published after a deploy don't 404 until the next build.
export const dynamicParams = true;

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

async function resolvePost(slug: string) {
    const id = idFromSlug(slug);
    return id === null ? null : getPost(id);
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const post = await resolvePost(params.slug);

    if (!post) return { title: "Yazı bulunamadı" };

    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: postPath(post) },
        openGraph: {
            type: "article",
            title: post.title,
            description: post.excerpt,
            publishedTime: post.created_at,
            url: postPath(post),
            images: post.cover_image_url ? [post.cover_image_url] : undefined,
        },
    };
}

export default async function PostPage({
    params,
}: {
    params: { slug: string };
}) {
    const post = await resolvePost(params.slug);

    if (!post) notFound();

    const all = await getPosts();
    const related = all.filter((p) => p.id !== post.id).slice(0, 3);

    const formattedDate = new Date(post.created_at).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.created_at,
        author: { "@type": "Person", name: post.created_by || site.name },
        publisher: { "@type": "Person", name: site.name },
        mainEntityOfPage: `${site.url}${postPath(post)}`,
        image: post.cover_image_url,
    };

    return (
        <>
            <article>
                <header className={styles.header}>
                    <div className="container-narrow">
                        <Link href="/yazilar" className={styles.back}>
                            ← Tüm yazılar
                        </Link>
                        <h1 className={styles.title}>{post.title}</h1>
                        <p className={styles.meta}>
                            <time dateTime={post.created_at}>
                                {formattedDate}
                            </time>
                            {post.created_by && <> · {post.created_by}</>}
                        </p>
                    </div>
                </header>

                {post.video_url ? (
                    <div className={`container-narrow ${styles.media}`}>
                        <video controls preload="metadata" className={styles.video}>
                            <source src={post.video_url} type="video/mp4" />
                            Tarayıcınız bu videoyu oynatamıyor.
                        </video>
                    </div>
                ) : (
                    post.cover_image_url && (
                        <div className={`container-narrow ${styles.media}`}>
                            <Image
                                src={post.cover_image_url}
                                alt=""
                                width={1200}
                                height={675}
                                priority
                                className={styles.cover}
                                sizes="(max-width: 760px) 100vw, 720px"
                            />
                        </div>
                    )
                )}

                <div className={`container-narrow ${styles.bodyWrap}`}>
                    <div
                        className="prose"
                        dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(post.content),
                        }}
                    />
                </div>
            </article>

            {related.length > 0 && (
                <section className="section section-sunken">
                    <div className="container">
                        <div className={homeStyles.sectionHead}>
                            <p className="eyebrow">Yazılar</p>
                            <h2>Diğer yazılar</h2>
                        </div>
                        <div className={homeStyles.postGrid}>
                            {related.map((item) => (
                                <PostCard key={item.id} post={item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </>
    );
}
