"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { nav } from "../lib/content";
import styles from "./SiteHeader.module.scss";

export default function SiteNav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    // Close the drawer on navigation, otherwise it stays open over the new page.
    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open]);

    return (
        <>
            <button
                type="button"
                className={styles.toggle}
                aria-expanded={open}
                aria-controls="site-nav"
                aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
                onClick={() => setOpen((v) => !v)}
            >
                <span className={open ? styles.barTop : styles.bar} />
                <span className={open ? styles.barHidden : styles.bar} />
                <span className={open ? styles.barBottom : styles.bar} />
            </button>

            <nav
                id="site-nav"
                className={`${styles.nav} ${open ? styles.navOpen : ""}`}
            >
                <ul className={styles.list}>
                    {nav.map((item) => {
                        const active =
                            pathname === item.href ||
                            pathname.startsWith(`${item.href}/`);

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`${styles.link} ${
                                        active ? styles.linkActive : ""
                                    }`}
                                    aria-current={active ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
