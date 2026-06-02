export default function StaticPage() {
  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>About <span className="text-gradient">Startup AI Tech</span></h1>
      <div className="glass-panel" style={{ padding: '3rem' }}>
        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          Startup AI Tech is dedicated to empowering the next generation of founders with cutting-edge artificial intelligence tools. Our mission is to democratize access to world-class startup advice, validation frameworks, and pitch strategies.
        </p>
        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          Built by founders, for founders, we understand the bottlenecks in starting a company. That's why we've leveraged large language models to automate the tedious parts of business planning, so you can focus on executing.
        </p>
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Contact Us</h3>
        <p>If you have any questions, partner requests, or need support, email us at: <strong>contact@startupai.tech</strong></p>
      </div>
    </div>
  );
}
