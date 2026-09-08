import Link from "next/link";
import Image from "next/image";

import { postPath, type PostSummary } from "../lib/posts";
import styles from "./PostCard.module.scss";

export default function PostCard({
    post,
    priority = false,
}: {
    post: PostSummary;
    priority?: boolean;
}) {
    return (
        <article className={styles.card}>
            <Link href={postPath(post)} className={styles.link}>
                <div className={styles.media}>
                    {post.cover_image_url ? (
                        <Image
                            src={post.cover_image_url}
                            alt=""
                            fill
                            className={styles.image}
                            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 360px"
                            priority={priority}
                        />
                    ) : (
                        <div className={styles.mediaFallback} aria-hidden />
                    )}
                </div>

                <div className={styles.body}>
                    <time
                        className={styles.date}
                        dateTime={post.created_at}
                    >
                        {new Date(post.created_at).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </time>
                    <h3 className={styles.title}>{post.title}</h3>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                    <span className={styles.more}>Yazıyı oku →</span>
                </div>
            </Link>
        </article>
    );
}
