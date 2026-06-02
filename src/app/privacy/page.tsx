export default function PrivacyPage() {
  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Privacy <span className="text-gradient">Policy</span></h1>
      <div className="glass-panel" style={{ padding: '3rem' }}>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h3>
        <p style={{ marginBottom: '1rem' }}>We use Google Analytics to collect basic, anonymized usage data to improve our services. When you use our tools, the ideas you submit are processed by our AI partners (e.g., Groq, OpenAI) to generate your results.</p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Information</h3>
        <p style={{ marginBottom: '1rem' }}>We use the information collected solely to provide and improve the tools on Startup AI Tech. We do not sell your personal data.</p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Google AdSense & Cookies</h3>
        <p style={{ marginBottom: '1rem' }}>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.</p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. Contact Us</h3>
        <p>If you have questions about this privacy policy, please contact us at privacy@startupai.tech.</p>
      </div>
    </div>
  );
}
