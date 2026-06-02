"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

export default function IdeaValidator() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to validate");
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', textDecoration: 'none', marginBottom: '2rem', fontWeight: 500 }}>
        <ArrowLeft size={18} /> Back to Home
      </Link>
      
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Idea <span className="text-gradient">Validator</span></h1>
      <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>
        Enter your raw startup idea below. Our AI will analyze the market, competitors, and potential pitfalls to give you instant validation.
      </p>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <form onSubmit={handleValidate}>
          <div className="input-group">
            <label className="input-label" htmlFor="idea">Your Startup Idea</label>
            <textarea 
              id="idea"
              className="input-field" 
              placeholder="e.g. An AI tool that automatically generates UI code from hand-drawn wireframes..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading || !idea.trim()}>
              {loading ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 2s linear infinite' }} /> 
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Validate Idea
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1rem', borderRadius: '12px', color: '#f87171', marginBottom: '2rem' }}>
          {error}
        </div>
      )}

      {result && (
        <div className="glass-panel animate-in" style={{ padding: '2rem', border: '1px solid var(--primary-glow)' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
            <Sparkles size={20} /> Analysis Result
          </h3>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
            {/* If we had react-markdown installed, we'd use it here. For now, we render plain text or simple markdown formatting manually */}
            {result.split('\n').map((line, i) => {
              if (line.startsWith('###')) return <h4 key={i} style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>{line.replace('###', '').trim()}</h4>;
              if (line.startsWith('-')) return <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>{line.substring(1).trim()}</li>;
              if (line.trim() === '') return <br key={i} />;
              // Bold text parsing naively
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

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
