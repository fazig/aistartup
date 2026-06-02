import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  title: "Startup AI Tech | The Founder's AI Toolkit",
  description: "Accelerate your startup with our suite of AI-powered tools. Validate ideas, generate pitches, and refine your business model in seconds.",
  verification: {
    google: "PLACEHOLDER_SEARCH_CONSOLE_TAG", // To be replaced by the user
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {/* Navigation Bar */}
        <nav style={{
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid var(--surface-border)',
          background: 'rgba(8, 8, 12, 0.8)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.03em' }}>
              Startup<span className="text-gradient">AI</span>.tech
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <a href="#" style={{ color: 'var(--foreground)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Tools</a>
              <a href="#" style={{ color: 'var(--foreground)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>About</a>
              <a href="#" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>Get Started</a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main style={{ minHeight: 'calc(100vh - var(--nav-height) - 100px)' }}>
          {children}
        </main>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid var(--surface-border)',
          padding: '3rem 0',
          marginTop: '4rem',
          background: 'rgba(0,0,0,0.2)'
        }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontWeight: 700 }}>Startup AI Tech</div>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem' }} className="text-muted">
              <a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
              <a href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact Us</a>
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: '1rem' }} className="text-muted">
              &copy; {new Date().getFullYear()} Startup AI Tech. All rights reserved.
            </div>
          </div>
        </footer>

      </body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  );
}
