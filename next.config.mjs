import { env } from "process";

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
        EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
        EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${process.env.API_URL}/api/:path*`,
            },
        ];
    },
};
export default nextConfig;
