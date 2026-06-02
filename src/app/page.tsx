import { ArrowRight, Lightbulb, Presentation, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="container section">
      {/* Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 6rem auto' }} className="animate-in">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid var(--surface-border)', marginBottom: '2rem', fontSize: '0.85rem', fontWeight: 600 }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></span>
          100% Free AI Founder Tools
        </div>
        <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Build your startup <br/>
          <span className="text-gradient">at the speed of thought.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
          Stop brainstorming in circles. Use our suite of advanced AI tools to instantly validate ideas, generate pitch decks, and find your target audience.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="#tools" className="btn btn-primary">
            Explore Tools <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Tools Grid */}
      <div id="tools" className="grid-3 animate-in delay-200">
        
        <a href="/tools/idea-validator" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="glass-panel" style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.5rem', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
              <Lightbulb size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem' }}>Idea Validator</h3>
            <p className="text-muted" style={{ marginBottom: '2rem', flexGrow: 1, fontSize: '1.05rem' }}>
              Describe your startup idea and our AI will analyze market fit, competitors, and potential pitfalls instantly.
            </p>
            <div style={{ fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
              Launch Tool <ArrowRight size={16} />
            </div>
          </div>
        </a>

        <a href="/tools/pitch-generator" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="glass-panel" style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(217, 70, 239, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '1.5rem', border: '1px solid rgba(217, 70, 239, 0.2)' }}>
              <Presentation size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem' }}>Pitch Generator</h3>
            <p className="text-muted" style={{ marginBottom: '2rem', flexGrow: 1, fontSize: '1.05rem' }}>
              Generate a compelling 30-second elevator pitch or a full Y-Combinator style deck outline from your core concept.
            </p>
            <div style={{ fontWeight: 600, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
              Launch Tool <ArrowRight size={16} />
            </div>
          </div>
        </a>

        <a href="/tools/lean-canvas" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="glass-panel" style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(20, 184, 166, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14b8a6', marginBottom: '1.5rem', border: '1px solid rgba(20, 184, 166, 0.2)' }}>
              <Target size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem' }}>Lean Canvas AI</h3>
            <p className="text-muted" style={{ marginBottom: '2rem', flexGrow: 1, fontSize: '1.05rem' }}>
              Automatically fill out a Lean Canvas framework. Identify unfair advantages, revenue streams, and key metrics.
            </p>
            <div style={{ fontWeight: 600, color: '#14b8a6', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
              Launch Tool <ArrowRight size={16} />
            </div>
          </div>
        </a>

      </div>
    </div>
  );
}
