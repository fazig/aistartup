export default function CookiePolicyPage() {
  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Cookie <span className="text-gradient">Policy</span></h1>
      <div className="glass-panel" style={{ padding: '3rem' }}>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. What Are Cookies</h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Cookies are small text files stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
        </p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Cookies</h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          We use cookies for the following purposes:
        </p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: '1.6' }}>
          <li>
            <strong>Analytics & Performance:</strong> We use Google Analytics to analyze how visitors use our site. This helps us understand which tools are popular and how we can improve user experience. This data is aggregated and anonymized.
          </li>
          <li>
            <strong>Advertising (Future Readiness):</strong> Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this or other websites. Google's use of advertising cookies enables it and its partners to serve relevant ads.
          </li>
          <li>
            <strong>Functionality:</strong> Some cookies may save your tool preferences or settings so you don't have to re-enter them on your next visit.
          </li>
        </ul>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Types of Cookies We Use</h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          We use both session cookies (which expire when you close your web browser) and persistent cookies (which stay on your device until they expire or you delete them).
        </p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. How to Manage and Control Cookies</h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          You can control and manage cookies in various ways. Most browsers allow you to refuse or accept cookies, or to delete cookies that have already been set. Please note that removing or blocking cookies may impact your user experience, and some parts of our website may no longer be fully accessible.
        </p>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
          To opt out of Google Analytics tracking across all websites, you can visit: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Google Analytics Opt-out Browser Add-on</a>.
        </p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>5. Updates to This Policy</h3>
        <p style={{ lineHeight: '1.6' }}>
          We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies.
        </p>
      </div>
    </div>
  );
}
