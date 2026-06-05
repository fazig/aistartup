import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Data Security & Usage | StartupAI Tools",
  description: "Read the StartupAI Tools privacy policy. Learn how we handle your tool inputs, cookies, Google Analytics, and ad partners.",
};

export default function PrivacyPage() {
  return (
    <div className="container section" style={{ maxWidth: '800px', padding: '4rem 1.5rem' }}>
      <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '2rem', fontWeight: 900, letterSpacing: '-0.03em' }}>
        Privacy <span className="text-gradient">Policy</span>
      </h1>
      
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-card)', lineHeight: '1.75', color: 'var(--text-muted)' }}>
        <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 600 }}>
          Last Updated: June 5, 2026
        </p>
        
        <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
          At StartupAI Tools, we take your privacy extremely seriously. We are committed to protecting your personal information and ensuring that your interactions with our utilities are transparent, private, and secure. This Privacy Policy details what information we collect, how we handle user-submitted inputs, and our use of third-party analytics and advertising services.
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.85rem' }}>
          1. Data Processing and Input Security
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Our principal philosophy is **local-first processing**. More than 95% of the utility tools hosted on StartupAI Tools (including formatting tools, converters, encoders, decoders, and calculators) compile and process data directly within your web browser using client-side JavaScript. 
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          This means that any text you paste, code you format, or parameter values you input remain inside your browser sandbox and are **never uploaded to our servers**. Your private code, database strings, and documentation text remain secure on your own local device.
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.85rem' }}>
          2. Third-Party APIs and Services
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          A limited subset of our tools require server processing or dynamic external API calls (e.g. grammar checking via LanguageTool, dictionary inspections, or language translations). 
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          When you submit queries using these specific tools, your text is securely transmitted to reputable third-party API providers via SSL encryption. We choose providers that have strict data handling protocols. Your submitted text is processed in real-time to return your suggestions and is **not stored, retained, or used** for model training by our partners.
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.85rem' }}>
          3. Analytics & Usage Metrics
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          We use Google Analytics (a web analytics service provided by Google LLC) to collect basic, anonymous traffic metrics. This service gathers aggregated data about page visits, average read times, device categories, and general geographical locations. 
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          This metric help us analyze which tools are popular and identify technical errors. Google Analytics does not collect personal identifiers, email addresses, or name fields, and all collected IP addresses are automatically anonymized.
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.85rem' }}>
          4. Google AdSense & Cookies
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          StartupAI Tools relies on third-party ad networks, primarily Google AdSense, to serve advertisements on our platform. Google uses cookies to display relevant ads to users based on their visits to this site and other destinations across the internet.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          Users may opt out of personalized advertising by visiting Google's Ads Settings, or by managing cookies within their web browser. For more detailed information on our cookie structures, please review our dedicated Cookie Policy.
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.85rem' }}>
          5. Your CCPA & GDPR Privacy Rights
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Depending on your geographical jurisdiction (including the European Union under GDPR and California under CCPA), you are granted specific rights regarding your personal data:
        </p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>The right to request information regarding what analytics data we have collected.</li>
          <li>The right to opt-out of cookies and personalized advertising arrays.</li>
          <li>The right to request deletion of any email correspondence sent to us.</li>
        </ul>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.85rem' }}>
          6. Contacting the DPO
        </h2>
        <p>
          If you have questions regarding this Privacy Policy, your CCPA/GDPR rights, or wish to submit a data erasure request, please contact our Data Protection Officer at: 
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
          privacy@startupai.tech
        </p>
      </div>
    </div>
  );
}
