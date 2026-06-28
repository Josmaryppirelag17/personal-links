import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  generateEtags: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
    webpackBuildWorker: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  headers: async () => [
    {
      source: '/(.*).(svg|png|jpg|jpeg|webp|avif|ico)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
  ],
};

export default nextConfig;
