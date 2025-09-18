
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
    // Configure for Replit environment
    experimental: {
        workerThreads: false,
        cpus: 1,
    },
    // Add build-time configuration to prevent API route issues
    generateBuildId: async () => {
        return 'build-' + Date.now().toString();
    },
    // Reduce build memory usage and optimize for Netlify
    webpack: (config, { isServer, dev }) => {
        // Only apply optimizations in production builds
        if (!dev) {
            // Optimize for memory usage
            if (config.optimization.splitChunks) {
                config.optimization.splitChunks = {
                    chunks: 'all',
                    cacheGroups: {
                        default: {
                            minChunks: 1,
                            priority: -20,
                            reuseExistingChunk: true,
                            maxSize: 244000,
                        },
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendors',
                            priority: -10,
                            chunks: 'all',
                            maxSize: 244000,
                        }
                    }
                };
            }
            
            // Reduce memory usage during build
            config.optimization.minimizer = config.optimization.minimizer || [];
            
            // Limit parallel processing to reduce memory usage
            config.parallelism = 1;
        }
        
        return config;
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'ALLOWALL',
                    },
                ],
            },
        ];
    },
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
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    },
};

export default nextConfig;
