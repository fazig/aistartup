"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, Target } from "lucide-react";
import Link from "next/link";

export default function LeanCanvas() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setResult("### 📋 Lean Canvas Generated\n\n**1. Problem:**\n- High cost of customer acquisition.\n- Lack of actionable data insights.\n\n**2. Solution:**\n- An AI dashboard that aggregates marketing data and suggests optimizations.\n\n**3. Unique Value Proposition:**\n- The only platform that directly applies changes to ad accounts automatically.\n\n**4. Unfair Advantage:**\n- Proprietary ML model trained on $10M+ of ad spend data.\n\n**5. Customer Segments:**\n- E-commerce founders making $10k-$100k MRR.\n\n**6. Key Metrics:**\n- Weekly Active Users (WAU), Churn Rate, MRR.\n\n**7. Channels:**\n- Twitter/X build-in-public, SEO content, direct cold email.\n\n**8. Cost Structure:**\n- OpenAI API costs, Vercel hosting, marketing spend.\n\n**9. Revenue Streams:**\n- Tiered SaaS subscription ($49/mo, $199/mo).");
    setLoading(false);
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#14b8a6', textDecoration: 'none', marginBottom: '2rem', fontWeight: 500 }}>
        <ArrowLeft size={18} /> Back to Home
      </Link>
      
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Lean <span className="text-gradient" style={{ background: 'linear-gradient(135deg, #14b8a6, #3b82f6)' }}>Canvas AI</span></h1>
      <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>
        Generate a comprehensive 1-page business plan for your startup idea instantly.
      </p>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <form onSubmit={handleGenerate}>
          <div className="input-group">
            <label className="input-label" htmlFor="idea">Brief Idea Description</label>
            <textarea 
              id="idea"
              className="input-field" 
              placeholder="e.g. A marketplace for freelance drone pilots..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #14b8a6, #3b82f6)' }} disabled={loading || !idea.trim()}>
              {loading ? (
                <><Loader2 size={18} style={{ animation: 'spin 2s linear infinite' }} /> Generating Canvas...</>
              ) : (
                <><Target size={18} /> Generate</>
              )}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className="glass-panel animate-in" style={{ padding: '2rem', border: '1px solid rgba(20, 184, 166, 0.3)' }}>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
            {result.split('\n').map((line, i) => {
              if (line.startsWith('###')) return <h4 key={i} style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>{line.replace('###', '').trim()}</h4>;
              if (line.startsWith('-')) return <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>{line.substring(1).trim()}</li>;
              if (line.trim() === '') return <br key={i} />;
              const parts = line.split(/(\*\*.*?\*\*)/g);
              return (
                <p key={i} style={{ marginBottom: '0.5rem' }}>
                  {parts.map((part, j) => 
                    part.startsWith('**') && part.endsWith('**') 
                      ? <strong key={j} style={{ color: 'white' }}>{part.slice(2, -2)}</strong> 
                      : part
                  )}
                </p>
              );
            })}
          </div>
        </div>
      )}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
