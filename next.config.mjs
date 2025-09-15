
import withPWA from 'next-pwa';

const pwaConfig = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    ...pwaConfig,
    experimental: {
        allowedHosts: true,
    },
    allowedDevOrigins: ['127.0.0.1', '98374861-dad0-47cc-924d-7ddf31fe48f7-00-3oohp9t06plby.picard.replit.dev'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'logo.clearbit.com',
            }
        ],
    },
};

export default nextConfig;
