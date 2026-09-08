"use client";

import { useEffect } from "react";

/**
 * Fires the admin panel's visit counter once per page load. Deliberately
 * render-free and effect-only so it never blocks or delays paint.
 */
export default function VisitorTracker() {
    useEffect(() => {
        let visitorId = localStorage.getItem("aker_visitor_id");

        if (!visitorId) {
            visitorId = crypto.randomUUID();
            localStorage.setItem("aker_visitor_id", visitorId);
        }

        const body = JSON.stringify({ visitor: visitorId });

        // Survives the page being closed mid-flight, unlike fetch/axios.
        if (navigator.sendBeacon) {
            navigator.sendBeacon(
                "/api/view",
                new Blob([body], { type: "application/json" })
            );
            return;
        }

        fetch("/api/view", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            keepalive: true,
        }).catch(() => {
            /* tracking is best-effort */
        });
    }, []);

    return null;
}
