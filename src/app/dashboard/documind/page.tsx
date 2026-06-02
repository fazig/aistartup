"use client";

import { useState } from "react";
import { Loader2, FileText } from "lucide-react";

export default function DocuMindPage() {
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
        body: JSON.stringify({ module: "documind", input })
      });
      const data = await res.json();
      setResult(data.result);
    } catch (e) {
      setResult("Error processing document.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <div style={{ padding: '0.5rem', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          <FileText size={20} color="var(--accent-blue)" />
        </div>
        <h1 style={{ fontSize: '2rem' }}>DocuMind AI</h1>
      </div>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>
        Automated data extraction for invoices, receipts, and contracts.
      </p>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Paste Raw Document Text</label>
        <textarea 
          className="input-field" 
          style={{ minHeight: '200px', marginBottom: '1rem', background: 'var(--bg-base)' }}
          placeholder="e.g. INVOICE #1042 Date: Oct 14, 2026 Vendor: CloudHosting Inc. Total: $4,500.00 Terms: Net 30..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={handleProcess} disabled={loading || !input.trim()}>
            {loading ? <><Loader2 size={16} style={{ animation: 'spin 2s linear infinite' }} /> Extracting...</> : "Extract Data"}
          </button>
        </div>
      </div>

      {result && (
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Extracted Entities</h3>
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
