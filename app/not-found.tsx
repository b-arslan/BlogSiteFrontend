import Link from "next/link";

import styles from "./styles/not-found.module.scss";

export default function NotFound() {
    return (
        <section className={`container-narrow ${styles.wrap}`}>
            <p className="eyebrow">404</p>
            <h1 className={styles.title}>Aradığınız sayfa bulunamadı</h1>
            <p className="lede">
                Bağlantı taşınmış veya kaldırılmış olabilir. Aşağıdan devam
                edebilirsiniz.
            </p>
            <div className={styles.actions}>
                <Link href="/" className="btn btn-primary">
                    Ana sayfa
                </Link>
                <Link href="/yazilar" className="btn btn-secondary">
                    Yazılar
                </Link>
            </div>
        </section>
    );
}
