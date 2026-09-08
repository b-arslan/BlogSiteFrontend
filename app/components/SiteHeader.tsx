import Link from "next/link";
import Image from "next/image";

import PsiLogo from "../../public/psi.ico";
import { site } from "../lib/content";
import SiteNav from "./SiteNav";
import styles from "./SiteHeader.module.scss";

/** Server-rendered shell; only the nav itself needs client JS for the mobile menu. */
export default function SiteHeader() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.inner}`}>
                <Link href="/" className={styles.brand}>
                    <Image
                        src={PsiLogo}
                        alt=""
                        aria-hidden
                        className={styles.mark}
                        sizes="34px"
                    />
                    <span className={styles.brandText}>
                        <span className={styles.brandName}>{site.name}</span>
                        <span className={styles.brandRole}>
                            {/* Ergen ve Yetişkin Terapisi */}
                        </span>
                    </span>
                </Link>

                <SiteNav />
            </div>
        </header>
    );
}
