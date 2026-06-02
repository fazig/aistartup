export default function TermsPage() {
  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Terms of <span className="text-gradient">Service</span></h1>
      <div className="glass-panel" style={{ padding: '3rem' }}>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h3>
        <p style={{ marginBottom: '1rem' }}>By accessing and using Startup AI Tech, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our site.</p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. Use of Service</h3>
        <p style={{ marginBottom: '1rem' }}>Our AI tools are provided for educational and brainstorming purposes. The generated business plans, pitches, and validation analysis are not guaranteed to guarantee startup success. You are solely responsible for your business decisions.</p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Disclaimer of Warranties</h3>
        <p style={{ marginBottom: '1rem' }}>The service is provided "AS IS" without warranty of any kind. We do not guarantee continuous, uninterrupted access to the site.</p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. Modifications</h3>
        <p>We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of the modified terms.</p>
      </div>
    </div>
  );
}
