import { env } from 'process';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/api/:path*`,
      },
    ];
  },
};
export default nextConfig;