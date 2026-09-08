import styles from "./PageHeader.module.scss";

export default function PageHeader({
    eyebrow,
    title,
    lede,
}: {
    eyebrow?: string;
    title: string;
    lede?: string;
}) {
    return (
        <section className={styles.header}>
            <div className="container">
                {eyebrow && <p className="eyebrow">{eyebrow}</p>}
                <h1 className={styles.title}>{title}</h1>
                {lede && <p className={`lede ${styles.lede}`}>{lede}</p>}
            </div>
        </section>
    );
}
