import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Wrench } from "lucide-react";
import Header from "@/components/Header";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aitoolspro.tech"),
  title: {
    default: "StartupAI Tools | Free Developer & Web Utilities",
    template: "%s | StartupAI Tools",
  },
  description: "A comprehensive collection of 100% free, lightning-fast web tools including JSON formatters, QR code generators, and text utilities.",
  keywords: ["free web tools", "developer utilities", "JSON formatter", "QR code generator", "SEO tools", "free online tools", "AI image enhancer"],
  authors: [{ name: "Faizan Arif", url: "https://www.aitoolspro.tech" }],
  creator: "StartupAI Tools",
  publisher: "StartupAI Tools",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.aitoolspro.tech",
    siteName: "StartupAI Tools",
    title: "StartupAI Tools | Free Developer & Web Utilities",
    description: "Access 100+ free, lightning-fast web tools including AI Image Enhancer, JSON formatters, QR generators, and SEO utilities.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "StartupAI Tools - Free Developer & Web Utilities" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StartupAI Tools | Free Developer & Web Utilities",
    description: "Access 100+ free, lightning-fast web tools including AI Image Enhancer, JSON formatters, and SEO utilities.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "BN8r_18xTXqdWBekHRt95xIe5efvl8gg00Thn4qhMMI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6854025589707929" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6854025589707929"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.variable}>
        <Header />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "StartupAI Tools",
              url: "https://www.aitoolspro.tech",
              description: "100+ free, lightning-fast web tools for developers and creators.",
              publisher: {
                "@type": "Organization",
                name: "StartupAI Tools",
                url: "https://www.aitoolspro.tech",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.aitoolspro.tech/og-image.jpg",
                },
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.aitoolspro.tech/tools?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Main Page Content */}
        <main style={{ minHeight: 'calc(100vh - var(--nav-height) - 250px)' }}>
          {children}
        </main>

        {/* Global Footer */}
        <footer style={{ 
          background: '#0f172a', /* slate-900 for premium dark mode contrast */
          color: '#e2e8f0', /* slate-200 */
          borderTop: '1px solid #1e293b', 
          padding: '5rem 0 3rem 0', 
          marginTop: 'auto' 
        }}>
          <div className="container">
            {/* Top Footer Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '2.5rem', 
              marginBottom: '4rem' 
            }}>
              {/* Brand Col */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ 
                    background: 'var(--primary)', 
                    color: 'white', 
                    padding: '0.4rem', 
                    borderRadius: '8px', 
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center' 
                  }}>
                    <Wrench size={18} />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: '#ffffff' }}>StartupAI Tools</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.6' }}>
                  Your premium everyday toolkit for web development, analytics, formatting, and SEO optimization. 100% free, forever.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <a href="https://github.com/fazig" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', transition: 'color 0.2s', fontSize: '0.85rem' }}>
                    GitHub
                  </a>
                  <span style={{ color: '#334155' }}>|</span>
                  <Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.85rem' }}>
                    Support
                  </Link>
                </div>
              </div>

              {/* Popular Items Column */}
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Popular Tools
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <li><Link href="/tools/grammar-checker" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Free Grammar Checker</Link></li>
                  <li><Link href="/tools/adsense-eligibility-checker" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>AdSense Checker</Link></li>
                  <li><Link href="/free-sumo-tools" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Free Sumo Tools</Link></li>
                  <li><Link href="/tools/url-shortener" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>URL Shortener</Link></li>
                  <li><Link href="/tools/qr-generator" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>QR Code Generator</Link></li>
                </ul>
              </div>

              {/* Blog Insights Column */}
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Recent Articles
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <li>
                    <Link href="/blog/how-to-vibe-code-using-codex" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', display: 'block', lineHeight: '1.4', fontWeight: 600 }}>
                      How to Vibe Code Using Codex
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/how-to-get-adsense-approval" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', display: 'block', lineHeight: '1.4' }}>
                      How to Get AdSense Approval
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/best-qr-code-generator" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', display: 'block', lineHeight: '1.4' }}>
                      Best QR Code Generator
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.825rem' }}>
                      Browse All Articles &rarr;
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal & Company Column */}
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Legal & Support
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <li><Link href="/about" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>About Us</Link></li>
                  <li><Link href="/privacy" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy Policy</Link></li>
                  <li><Link href="/terms" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Terms of Service</Link></li>
                  <li><Link href="/cookie-policy" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Cookie Policy</Link></li>
                  <li><Link href="/disclaimer" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Legal Disclaimer</Link></li>
                  <li><Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Contact Us</Link></li>
                </ul>
              </div>
            </div>

            {/* Disclaimer & Copyright */}
            <div style={{ 
              borderTop: '1px solid #1e293b', 
              paddingTop: '2rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.25rem',
              alignItems: 'center', 
              textAlign: 'center' 
            }}>
              <p style={{ color: '#64748b', fontSize: '0.775rem', lineHeight: '1.5', maxWidth: '800px', margin: 0 }}>
                Disclaimer: StartupAI Tools is an independent provider of free web utilities. All tools are provided &quot;as is&quot; without warranty of any kind. We do not host or store any user-submitted text, files, or parameters. Use of these resources is at your own discretion.
              </p>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                &copy; {new Date().getFullYear()} StartupAI Tools. All rights reserved. Built for creators and developers.
              </div>
            </div>
          </div>
        </footer>
        
        {/* Dynamic Client-Side Components */}
        <CookieConsent />
        
        <GoogleAnalytics gaId="G-L0D1YKGN2H" />
      </body>
    </html>
  );
}
