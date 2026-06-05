import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Support & Feedback | StartupAI Tools",
  description: "Reach out to the StartupAI Tools team for support, feature suggestions, partnership requests, or feedback.",
};

export default function ContactPage() {
  return (
    <div className="container section" style={{ maxWidth: '800px', padding: '4rem 1.5rem' }}>
      <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '2rem', fontWeight: 900, letterSpacing: '-0.03em' }}>
        Contact <span className="text-gradient">Us</span>
      </h1>
      
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-card)', marginBottom: '3rem' }}>
        <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
          We would love to hear from you. Reach out to us with any questions, technical feedback, bug reports, or partnership inquiries. Our team reads every message.
        </p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="input-group">
            <label className="input-label" style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>Name</label>
            <input type="text" className="input-field" placeholder="Jane Doe" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
          </div>
          <div className="input-group">
            <label className="input-label" style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>Email</label>
            <input type="email" className="input-field" placeholder="jane@example.com" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
          </div>
          <div className="input-group">
            <label className="input-label" style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>Message</label>
            <textarea className="input-field" placeholder="How can we help you?" rows={5} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', resize: 'vertical' }}></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', fontWeight: 700, fontSize: '1rem', borderRadius: '8px' }}>
            Send Message
          </button>
        </form>

        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          Prefer direct email? You can also email us directly at <strong style={{ color: 'var(--primary)' }}>contact@startupai.tech</strong>
        </p>
      </div>

      {/* Helpful FAQs (Low Word Count Fix & Rich SEO Context) */}
      <div style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 800, textAlign: 'center' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Do you store the text or files I submit to your tools?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              No, we do not store any user-submitted data. Over 95% of our tools (such as the JSON Formatter, Case Converter, and Word Counter) run entirely client-side inside your web browser using HTML5 and JavaScript. Your inputs never reach our servers, keeping your data secure and private.
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>How can I request a new tool?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              We love user suggestions! If there is a helper utility, mathematical calculator, or designer tool you reach for daily and would like to see added, write us via the contact form or direct email. Our engineering team reviews all requests and often builds them within a week.
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Is there a usage limit for the utilities?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Absolutely not. All tools on StartupAI Tools are 100% free and have zero daily limits. You can check as many files, generate as many QR codes, and validate as much code as your projects require.
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>How quickly will you reply to my message?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              We monitor our inbox daily. While response times vary, we make it a priority to respond to support inquiries, bug reports, and commercial proposals within 24 to 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
