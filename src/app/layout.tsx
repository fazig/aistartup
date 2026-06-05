import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import { Wrench } from "lucide-react";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  title: "StartupAI Tools | Free Developer & Web Utilities",
  description: "A comprehensive collection of 100% free, lightning-fast web tools including JSON formatters, QR code generators, and text utilities.",
  verification: {
    google: "BN8r_18xTXqdWBekHRt95xIe5efvl8gg00Thn4qhMMI",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L0D1YKGN2H"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L0D1YKGN2H');
          `}
        </Script>
      </head>
      <body className={inter.variable}>
        <Header />

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
                  <li><Link href="/tools/grammarly-free" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Grammarly Free</Link></li>
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
                    <Link href="/blog/vibe-coding-tools" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', display: 'block', lineHeight: '1.4', fontWeight: 600 }}>
                      The Ultimate Guide to Vibe Coding Tools
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/why-google-adsense-rejects-websites" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', display: 'block', lineHeight: '1.4' }}>
                      Why AdSense Rejects Good Sites & How to Fix
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/qr-code-generator-small-size" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', display: 'block', lineHeight: '1.4' }}>
                      Ultimate Micro QR Codes Printing Guide
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

      </body>
    </html>
  );
}
