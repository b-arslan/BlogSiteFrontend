import styles from "./Faq.module.scss";

export interface FaqItem {
    question: string;
    answer: string;
}

/**
 * Native <details> accordion — no client JS, and it stays usable if the page
 * is rendered before hydration. Also emits FAQPage structured data so the
 * questions can surface directly in search results.
 */
export default function Faq({ items }: { items: readonly FaqItem[] }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
    };

    return (
        <>
            <div className={styles.list}>
                {items.map((item) => (
                    <details key={item.question} className={styles.item}>
                        <summary className={styles.question}>
                            <span>{item.question}</span>
                            <span className={styles.icon} aria-hidden />
                        </summary>
                        <p className={styles.answer}>{item.answer}</p>
                    </details>
                ))}
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </>
    );
}
