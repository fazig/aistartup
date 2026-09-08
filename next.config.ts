import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
    optimizePackageImports: [
      'lucide-react',
      'crypto-js',
      'exifr',
      'qrcode.react',
      '@next/third-parties',
      '@imgly/background-removal',
    ],
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
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
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
      { source: "/blog/qr-code-generator-small-size", destination: "/blog/micro-qr-codes-guide", permanent: true },
      { source: "/tools/remove-background", destination: "/remove-background", permanent: true },
      { source: "/tools/remove-background/", destination: "/remove-background", permanent: true },
      { source: "/chatgpt-grok-claude", destination: "/blog/chatgpt-grok-claude", permanent: true },
      { source: "/china-ai-tools-top-100", destination: "/blog/china-ai-tools-top-100", permanent: true },
      { source: "/china-free-tool-kimi", destination: "/blog/china-free-tool-kimi", permanent: true },
      { source: "/claude-fable-5-is-the-most-expensive-tool-yet", destination: "/blog/claude-fable-5-is-the-most-expensive-tool-yet", permanent: true },
      { source: "/how-to-vibe-code-using-codex", destination: "/blog/how-to-vibe-code-using-codex", permanent: true },
      { source: "/how-samsung-phones-are-better-in-ai", destination: "/blog", permanent: true },
      { source: "/samsung-s27-ultra", destination: "/blog", permanent: true },
      { source: "/blog/ai-tools-from-china-100-of-them-list", destination: "/blog/china-ai-tools-top-100", permanent: true },
      { source: "/blog/why-google-adsense-rejects-websites", destination: "/blog/how-to-get-adsense-approval", permanent: true },
      { source: "/blog/best-ai-podcast-show-notes", destination: "/blog/best-ai-for-writing-podcast-show-notes", permanent: true },
      { source: "/blog/faizan-ki-awaz-voice-enhancer", destination: "/blog/build-ai-voice-enhancer-tool-faizankiawaz", permanent: true },
      { source: "/blog/china-makes-the-tool-cheaper-how", destination: "/blog/china-ai-tools-top-100", permanent: true },
      { source: "/blog/best-website-to-download-free-games", destination: "/blog", permanent: true },
      { source: "/blog/ai-free-kissing-video-generator", destination: "/blog", permanent: true },
      { source: "/blog/iphone-18-pro-max-new-features", destination: "/blog", permanent: true },
      { source: "/blog/samsung-s27-ultra-upcoming-mobile", destination: "/blog", permanent: true },
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
