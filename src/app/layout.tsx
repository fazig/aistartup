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
        <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-light)', padding: '4rem 0 2rem 0', marginTop: 'auto' }}>
          <div className="container">
            <div className="grid-4" style={{ marginBottom: '3rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Wrench size={18} color="var(--primary)" />
                  <span style={{ fontWeight: 700 }}>StartupAI Tools</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Your everyday toolkit for web development, formatting, and SEO. 100% free to use.</p>
              </div>
              <div>
                <h4 style={{ marginBottom: '1rem' }}>Developer Tools</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <li><Link href="/blog" style={{ color: 'var(--text-muted)' }}>Blog Insights</Link></li>
                  <li><Link href="/tools/json-formatter" style={{ color: 'var(--text-muted)' }}>JSON Formatter</Link></li>
                  <li><Link href="/tools/json-formatter" style={{ color: 'var(--text-muted)' }}>JSON Validator</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ marginBottom: '1rem' }}>Web Tools</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <li><Link href="/tools/qr-generator" style={{ color: 'var(--text-muted)' }}>QR Code Generator</Link></li>
                  <li><Link href="/tools/url-shortener" style={{ color: 'var(--text-muted)' }}>URL Shortener</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ marginBottom: '1rem' }}>Legal</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <li><Link href="/privacy" style={{ color: 'var(--text-muted)' }}>Privacy Policy</Link></li>
                  <li><Link href="/terms" style={{ color: 'var(--text-muted)' }}>Terms of Service</Link></li>
                  <li><Link href="/cookie-policy" style={{ color: 'var(--text-muted)' }}>Cookie Policy</Link></li>
                  <li><Link href="/disclaimer" style={{ color: 'var(--text-muted)' }}>Disclaimer</Link></li>
                  <li><Link href="/contact" style={{ color: 'var(--text-muted)' }}>Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '2rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              &copy; {new Date().getFullYear()} StartupAI Tools. All rights reserved.
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
