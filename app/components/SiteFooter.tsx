import Link from "next/link";

import { nav, site } from "../lib/content";
import styles from "./SiteFooter.module.scss";

export default function SiteFooter() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.brandCol}>
                    <p className={styles.brandName}>{site.name}</p>
                    {/* <p className={styles.brandNote}>
                        Ergen ve yetişkinlere yönelik bilişsel davranışçı terapi
                        temelli bireysel psikolojik danışmanlık.
                    </p> */}
                    <div className={styles.social}>
                        <a
                            href={site.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                        <a
                            href={site.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>

                <nav className={styles.linksCol} aria-label="Alt menü">
                    <h2 className={styles.colTitle}>Sayfalar</h2>
                    <ul>
                        {nav.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={styles.contactCol}>
                    <h2 className={styles.colTitle}>İletişim</h2>
                    <address className={styles.address}>
                        {site.address}
                    </address>
                    <a className={styles.mail} href={`mailto:${site.email}`}>
                        {site.email}
                    </a>

                    <h2 className={`${styles.colTitle} ${styles.colTitleGap}`}>
                        Bağlantılar
                    </h2>
                    <ul className={styles.external}>
                        <li>
                            <a
                                href={site.clinic.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {site.clinic.name} ↗
                            </a>
                        </li>
                        <li>
                            <a
                                href={site.press.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {site.press.name} köşe yazıları ↗
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={`container ${styles.bottom}`}>
                <p>
                    © {new Date().getFullYear()} {site.name}
                </p>
                {/* <p className={styles.disclaimer}>
                    Bu sitedeki içerikler bilgilendirme amaçlıdır, tıbbi tanı
                    veya tedavi yerine geçmez.
                </p> */}
            </div>
        </footer>
    );
}
