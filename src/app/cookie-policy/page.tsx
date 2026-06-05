import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - Cookie Usage Details | StartupAI Tools",
  description: "Read the StartupAI Tools Cookie Policy. Learn about cookie categories, advertising cookies, and how to manage your privacy settings.",
};

export default function CookiePolicyPage() {
  return (
    <div className="container section" style={{ maxWidth: '800px', padding: '4rem 1.5rem' }}>
      <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '2rem', fontWeight: 900, letterSpacing: '-0.03em' }}>
        Cookie <span className="text-gradient">Policy</span>
      </h1>
      
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-card)', lineHeight: '1.75', color: 'var(--text-muted)' }}>
        <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 600 }}>
          Last Updated: June 5, 2026
        </p>
        
        <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
          This Cookie Policy explains what cookies are, how StartupAI Tools ("we", "our") uses cookies and similar tracking technologies on our website, and your rights to manage them. By using our website, you consent to the storage and use of cookies as detailed in this policy.
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.85rem' }}>
          1. What Are Cookies?
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Cookies are small text files containing numbers and letters that are sent to and stored on your computer, smartphone, or tablet when you load a website. They act as a memory log, allowing the site to remember your actions, device configuration, or preferences (like language selection or theme toggles) over a period of time. 
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          Cookies do not execute software packages, carry viruses, or extract private files from your hard drive.
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.85rem' }}>
          2. Categories of Cookies We Use
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          We categorize our cookies based on their specific utility. Below is the list of cookie types deployed on our platform:
        </p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <li>
            <strong>Essential & Functional Cookies:</strong> These cookies are critical to render our layout and allow core features to work. For example, they may store your current theme selection (dark vs. light mode) or temporary parameters for calculators. Without these, certain sections may fail to load correctly.
          </li>
          <li>
            <strong>Performance & Analytics Cookies:</strong> We utilize Google Analytics cookies to track aggregated visitor patterns. This cookie structures help us understand which utilities are popular, calculate average session duration, and monitor error codes. All metrics are aggregated and anonymous.
          </li>
          <li>
            <strong>Advertising Cookies:</strong> Third-party ad vendors, including Google AdSense, place cookies to display advertisements that align with your interests. Google's use of advertising cookies enables it and its partners to serve ads based on your visits to our site and other pages on the internet.
          </li>
        </ul>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.85rem' }}>
          3. How to Manage and Disable Cookies
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          You have the right to accept or decline cookies. Most web browsers automatically accept cookies by default, but you can change your browser settings to refuse cookies or notify you whenever a cookie is set.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          To block cookies in your specific browser, visit the settings panel:
        </p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>**Google Chrome:** Settings &gt; Privacy and Security &gt; Third-party Cookies</li>
          <li>**Apple Safari:** Settings &gt; Safari &gt; Advanced &gt; Privacy & Security</li>
          <li>**Mozilla Firefox:** Settings &gt; Privacy & Security &gt; Enhanced Tracking Protection</li>
          <li>**Microsoft Edge:** Settings &gt; Cookies and site permissions</li>
        </ul>
        <p style={{ marginBottom: '1.5rem' }}>
          Please note that disabling cookies may affect the usability of certain tools (such as retaining inputs or saving configuration layouts).
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.85rem' }}>
          4. Updates to This Cookie Policy
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          We may update this Cookie Policy from time to time to reflect modifications in our cookie deployments, changes in partner API integrations, or regulatory updates. We encourage you to review this policy regularly to stay informed about our data handling arrays.
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.85rem' }}>
          5. Contact Information
        </h2>
        <p>
          If you have further questions or seek clarification on our Cookie Policy, please contact our privacy compliance team:
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
          cookies@startupai.tech
        </p>
      </div>
    </div>
  );
}
