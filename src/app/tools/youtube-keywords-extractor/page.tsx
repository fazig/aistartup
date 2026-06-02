"use client";

import { useState } from "react";
import { Video, AlertTriangle, Hash, Copy, Check } from "lucide-react";
import { extractYoutubeKeywords } from "./actions";

export default function YoutubeKeywordsExtractor() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleFetch = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    setCopiedIndex(null);
    
    try {
      const data = await extractYoutubeKeywords(url);
      setResult(data);
    } catch (e) {
      setResult({ error: "An unexpected network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    if (!result?.keywords) return;
    navigator.clipboard.writeText(result.keywords.join(", "));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Video color="var(--primary)" /> YouTube Keywords Extractor
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Spy on your competitors by extracting the hidden SEO tags and keywords from any YouTube video.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input 
            type="text" 
            className="input-field"
            placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
            style={{ flexGrow: 1 }}
          />
          <button className="btn btn-primary" onClick={handleFetch} disabled={!url || loading}>
            {loading ? "Extracting..." : "Extract Keywords"}
          </button>
        </div>

        {result && result.error && (
          <div style={{ padding: '1.5rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <AlertTriangle size={24} style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Error</strong>
              <span>{result.error}</span>
            </div>
          </div>
        )}

        {result && result.success && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              Video: <span style={{ color: 'var(--primary)' }}>{result.title}</span>
            </h3>

            {result.keywords && result.keywords.length > 0 ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 600 }}>Found {result.keywords.length} Keywords:</span>
                  <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopyAll}>
                    {copiedIndex === -1 ? <Check size={14} /> : <Copy size={14} />} Copy All as Comma Separated
                  </button>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {result.keywords.map((kw: string, idx: number) => (
                    <div key={idx} style={{ padding: '0.5rem 1rem', background: '#f1f5f9', border: '1px solid var(--border-strong)', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Hash size={14} color="var(--primary)" />
                      <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{kw}</span>
                      <button 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem', marginLeft: '0.5rem', color: '#64748b' }}
                        onClick={() => handleCopy(kw, idx)}
                        title="Copy this tag"
                      >
                        {copiedIndex === idx ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '8px', border: '1px dashed var(--border-strong)', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p>{result.message}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="prose">
        <h2>What are YouTube Tags?</h2>
        <p>When a content creator uploads a video to YouTube, the algorithm asks them to input a list of "Tags". These are secret, comma-separated keywords that help the algorithm understand exactly what the video is about, so it can recommend the video to the right viewers.</p>

        <h2>Why spy on your competitors?</h2>
        <p>If you are trying to grow your YouTube channel, the fastest way to get views is to rank highly in the search bar. However, knowing exactly which keywords to target is extremely difficult.</p>
        <p>If you find a competitor's video that went viral and got 5 million views, you know they did something right. Our tool allows you to reverse-engineer their success. Simply paste the URL of their viral video into the box above, and our system will extract their secret list of tags.</p>
        <p>You can then copy these exact same tags and paste them into your own video's metadata to steal a portion of their algorithmic traffic and get suggested next to their viral hits!</p>
      </div>
    </div>
  );
}
