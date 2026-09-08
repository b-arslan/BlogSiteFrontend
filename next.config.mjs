/** @type {import('next').NextConfig} */

// Public pages fetch from the backend directly on the server, so the rewrite is
// only a fallback for the client-side admin panel. Skip it entirely when
// API_URL is unset, otherwise Next rejects the "undefined/api/..." destination
// and refuses to boot.
const apiUrl = process.env.API_URL?.replace(/\/$/, "");

const nextConfig = {
    env: {
        EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
        EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
        EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    },
    images: {
        remotePatterns: [{ protocol: "https", hostname: "**" }],
    },
    async rewrites() {
        if (!apiUrl) return [];
        return [
            {
                source: "/api/:path*",
                destination: `${apiUrl}/api/:path*`,
            },
        ];
    },
    async redirects() {
        return [
            { source: "/about", destination: "/hakkimda", permanent: true },
            // /blogs is handled by a route handler instead of a redirect here,
            // so that old ?id=N links can resolve to the right slug.
        ];
    },
};

export default nextConfig;
