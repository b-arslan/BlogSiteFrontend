"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

import { site } from "../lib/content";
import styles from "./ContactForm.module.scss";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
    const [status, setStatus] = useState<Status>("idle");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);

        setStatus("sending");

        try {
            await emailjs.send(
                process.env.EMAILJS_SERVICE_ID!,
                process.env.EMAILJS_TEMPLATE_ID!,
                {
                    name: data.get("name"),
                    email: data.get("email"),
                    message: data.get("message"),
                    emailTo: site.email,
                    reply_to: data.get("email"),
                },
                process.env.EMAILJS_PUBLIC_KEY!
            );

            form.reset();
            setStatus("sent");
        } catch (error) {
            console.error("Contact form failed:", error);
            setStatus("error");
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
            <div className={styles.field}>
                <label htmlFor="name">Adınız</label>
                <input id="name" name="name" type="text" required maxLength={80} />
            </div>

            <div className={styles.field}>
                <label htmlFor="email">E-posta</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={120}
                    autoComplete="email"
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="message">Mesajınız</label>
                <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    maxLength={1500}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary"
                disabled={status === "sending"}
            >
                {status === "sending" ? "Gönderiliyor…" : "Gönder"}
            </button>

            {/* aria-live so the outcome reaches screen readers too. */}
            <p className={styles.status} role="status" aria-live="polite">
                {status === "sent" &&
                    "Mesajınız iletildi. En kısa sürede dönüş yapılacaktır."}
                {status === "error" &&
                    `Mesaj gönderilemedi. Doğrudan ${site.email} adresine yazabilirsiniz.`}
            </p>
        </form>
    );
}
