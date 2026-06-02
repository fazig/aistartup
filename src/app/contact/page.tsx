export default function ContactPage() {
  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Contact <span className="text-gradient">Us</span></h1>
      <div className="glass-panel" style={{ padding: '3rem' }}>
        <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>We'd love to hear from you. Reach out to us with any questions, feedback, or partnership inquiries.</p>
        
        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
          <label className="input-label">Name</label>
          <input type="text" className="input-field" placeholder="Jane Doe" />
        </div>
        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
          <label className="input-label">Email</label>
          <input type="email" className="input-field" placeholder="jane@startup.com" />
        </div>
        <div className="input-group" style={{ marginBottom: '2rem' }}>
          <label className="input-label">Message</label>
          <textarea className="input-field" placeholder="How can we help?" rows={5}></textarea>
        </div>
        
        <button className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
      </div>
    </div>
  );
}
