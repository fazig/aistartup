"use client";

import { useState } from "react";
import { Loader2, Zap } from "lucide-react";

export default function MarketScalePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module: "marketscale", input })
      });
      const data = await res.json();
      setResult(data.result);
    } catch (e) {
      setResult("Error generating content.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <div style={{ padding: '0.5rem', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          <Zap size={20} color="var(--accent-purple)" />
        </div>
        <h1 style={{ fontSize: '2rem' }}>MarketScale</h1>
      </div>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>
        Generate SEO-optimized content outlines at an enterprise scale.
      </p>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Target Keyword or Topic</label>
        <input 
          type="text"
          className="input-field" 
          style={{ marginBottom: '1rem', background: 'var(--bg-base)' }}
          placeholder="e.g. Enterprise Cloud Security Protocols"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={handleProcess} disabled={loading || !input.trim()}>
            {loading ? <><Loader2 size={16} style={{ animation: 'spin 2s linear infinite' }} /> Generating...</> : "Generate Strategy"}
          </button>
        </div>
      </div>

      {result && (
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Generated Strategy</h3>
          <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            {result.split('\n').map((line, i) => {
              if (line.startsWith('###')) return <strong key={i} style={{ color: 'var(--text-primary)', display: 'block', marginTop: '1rem', marginBottom: '0.5rem' }}>{line.replace('###', '').trim()}</strong>;
              const parts = line.split(/(\*\*.*?\*\*)/g);
              return (
                <div key={i}>
                  {parts.map((part, j) => 
                    part.startsWith('**') && part.endsWith('**') 
                      ? <strong key={j} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong> 
                      : part
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
