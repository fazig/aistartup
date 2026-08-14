import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'crypto-js', 'exifr', 'qrcode.react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.espncdn.com',
      }
    ],
  },
  async redirects() {
    return [
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/privacy-policy/", destination: "/privacy", permanent: true },
      { source: "/tools/grammarly-free", destination: "/tools/grammar-checker", permanent: true },
      { source: "/tools/grammarly-free/", destination: "/tools/grammar-checker", permanent: true },
      { source: "/blog/ai-free-face-swap-video", destination: "/blog", permanent: true },
      { source: "/blog/ai-free-image-to-video-generator", destination: "/blog", permanent: true },
      { source: "/blog/ai-free-animation-video-generator", destination: "/blog", permanent: true },
      { source: "/blog/will-messi-win-world-cup", destination: "/blog", permanent: true },
      { source: "/blog/who-will-win-world-cup-ai", destination: "/blog", permanent: true },
      { source: "/blog/football-vs-soccer-the-difference", destination: "/blog", permanent: true },
      { source: "/blog/best-earphones-iphone", destination: "/blog", permanent: true },
      { source: "/blog/samsung-s27-ultra", destination: "/blog", permanent: true },
      { source: "/blog/iphone-18-pro-max", destination: "/blog", permanent: true },
      { source: "/blog/new-iphone-18-pro-max-coming", destination: "/blog", permanent: true },
      { source: "/blog/how-samsung-phones-are-better-in-ai", destination: "/blog", permanent: true },
      { source: "/blog/ai-referee-fifa-2026", destination: "/blog", permanent: true },
      { source: "/blog/ai-stadiums-fifa-2026", destination: "/blog", permanent: true },
      { source: "/blog/ai-predictions-fifa-2026", destination: "/blog", permanent: true },
      { source: "/blog/ai-vr-fans-fifa-2026", destination: "/blog", permanent: true },
      { source: "/blog/ai-training-players-fifa-2026", destination: "/blog", permanent: true },
      { source: "/blog/claude-fable-5-game-article", destination: "/blog", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      {
        source: '/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp|avif|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
