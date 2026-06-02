"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, Presentation } from "lucide-react";
import Link from "next/link";

export default function PitchGenerator() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    
    setLoading(true);
    // Mocking the generation time
    await new Promise(r => setTimeout(r, 1500));
    setResult("### ⏱️ The 30-Second Elevator Pitch\n\n\"Have you ever noticed how hard it is to manually test every edge case in your software? We are building a platform that uses AI to automatically generate and run UI tests from your Figma designs. This means engineering teams ship 3x faster with zero bugs. We are looking for $500k to scale our initial beta waitlist of 200 companies.\"\n\n### 🏢 YC-Style Application Summary\n\n- **What is your company going to make?**\nAn AI-powered testing suite that bridges the gap between design and QA.\n- **Why did you pick this idea to work on?**\nBecause QA is the biggest bottleneck in continuous deployment.\n- **Who are your competitors?**\nLegacy selenium wrappers, but they require manual coding.");
    setLoading(false);
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', textDecoration: 'none', marginBottom: '2rem', fontWeight: 500 }}>
        <ArrowLeft size={18} /> Back to Home
      </Link>
      
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Pitch <span className="text-gradient">Generator</span></h1>
      <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>
        Turn your messy idea into a compelling elevator pitch or a structured YC application answer in seconds.
      </p>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <form onSubmit={handleGenerate}>
          <div className="input-group">
            <label className="input-label" htmlFor="idea">What does your startup do?</label>
            <textarea 
              id="idea"
              className="input-field" 
              placeholder="e.g. We help local bakeries manage their inventory using computer vision..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--accent), var(--primary))' }} disabled={loading || !idea.trim()}>
              {loading ? (
                <><Loader2 size={18} style={{ animation: 'spin 2s linear infinite' }} /> Generating...</>
              ) : (
                <><Presentation size={18} /> Generate Pitch</>
              )}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className="glass-panel animate-in" style={{ padding: '2rem', border: '1px solid var(--accent-glow)' }}>
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
