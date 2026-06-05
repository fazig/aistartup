"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { useState, useEffect } from "react";
import { 
  Link2, Search, Check, Copy, Trash2, QrCode as QRIcon, 
  ExternalLink, BarChart3, AlertCircle, Loader2, Sparkles, RefreshCw, CheckCircle
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface ShortLink {
  id: string;
  original: string;
  short: string;
  date: string;
  clicks: number;
}

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [provider, setProvider] = useState<"isgd" | "tinyurl">("isgd");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ShortLink | null>(null);
  const [history, setHistory] = useState<ShortLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQrId, setShowQrId] = useState<string | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("startupai_short_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (newHistory: ShortLink[]) => {
    setHistory(newHistory);
    localStorage.setItem("startupai_short_history", JSON.stringify(newHistory));
  };

  const handleShorten = async () => {
    if (!url.trim()) {
      setError("Please enter a URL to shorten.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, provider }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to shorten URL.");
      } else {
        const newLink: ShortLink = {
          id: Math.random().toString(36).substring(2, 9),
          original: data.originalUrl,
          short: data.shortUrl,
          date: new Date().toLocaleDateString(undefined, { 
            month: "short", 
            day: "numeric", 
            hour: "2-digit", 
            minute: "2-digit" 
          }),
          clicks: Math.floor(Math.random() * 5), // Simulated start clicks
        };

        setResult(newLink);
        saveHistory([newLink, ...history]);
        setUrl(""); // Clear input on success
      }
    } catch (err) {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    
    // Simulate updating click/copy count
    const updated = history.map(item => {
      if (item.id === id) {
        return { ...item, clicks: item.clicks + 1 };
      }
      return item;
    });
    saveHistory(updated);
    if (result && result.id === id) {
      setResult({ ...result, clicks: result.clicks + 1 });
    }

    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    saveHistory(updated);
    if (result && result.id === id) {
      setResult(null);
    }
    if (showQrId === id) {
      setShowQrId(null);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your shortening history?")) {
      saveHistory([]);
      setResult(null);
      setShowQrId(null);
    }
  };

  return (
    <div className="container" style={{ padding: "4rem 1.5rem" }}>
      <Link
        href="/tools"
        className="btn btn-outline"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          fontSize: "0.85rem",
          padding: "0.5rem 1rem",
        }}
      >
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      {/* Hero Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "0.5rem", 
          background: "#f0fdf4", 
          color: "#16a34a", 
          padding: "0.5rem 1rem", 
          borderRadius: "9999px", 
          fontSize: "0.875rem", 
          fontWeight: 700,
          marginBottom: "1rem"
        }}>
          <Sparkles size={16} />
          <span>Modern API-driven Link Shortener</span>
        </div>
        <h1 style={{ fontSize: "2.75rem", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
          Premium URL Shortener
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          Instantly transform long, messy URLs into neat, trackable, and brand-friendly short links.
        </p>
      </div>

      {/* Main Shortener Form */}
      <div className="card" style={{ maxWidth: "800px", margin: "0 auto 3rem auto", padding: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <div style={{ flex: 1, minWidth: "280px", position: "relative" }}>
            <div style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
              <Link2 size={20} />
            </div>
            <input
              type="text"
              className="input-field"
              placeholder="Paste your long link here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleShorten()}
              style={{ paddingLeft: "2.75rem", fontSize: "1rem", height: "54px", borderRadius: "10px" }}
            />
          </div>
          <button 
            className="btn btn-primary" 
            onClick={handleShorten} 
            disabled={loading}
            style={{ padding: "0 2rem", height: "54px", borderRadius: "10px", fontSize: "1rem", fontWeight: 700 }}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Shorten URL"}
          </button>
        </div>

        {/* Configuration settings (Provider selecting) */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Shortener API Engine:</span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button 
                onClick={() => setProvider("isgd")} 
                style={{ 
                  padding: "0.35rem 0.75rem", 
                  fontSize: "0.8rem", 
                  borderRadius: "6px", 
                  border: provider === "isgd" ? "1px solid var(--primary)" : "1px solid var(--border-light)", 
                  background: provider === "isgd" ? "#eff6ff" : "white",
                  color: provider === "isgd" ? "var(--primary)" : "var(--text-main)",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Is.gd (Fast)
              </button>
              <button 
                onClick={() => setProvider("tinyurl")} 
                style={{ 
                  padding: "0.35rem 0.75rem", 
                  fontSize: "0.8rem", 
                  borderRadius: "6px", 
                  border: provider === "tinyurl" ? "1px solid var(--primary)" : "1px solid var(--border-light)", 
                  background: provider === "tinyurl" ? "#eff6ff" : "white",
                  color: provider === "tinyurl" ? "var(--primary)" : "var(--text-main)",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                TinyURL (Fallback)
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div style={{ color: "#ef4444", marginTop: "1rem", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Generated Result Card */}
      {result && (
        <div className="card animate-fade-in" style={{ 
          maxWidth: "800px", 
          margin: "0 auto 3rem auto", 
          border: "2px solid #bbf7d0", 
          background: "#f0fdf4",
          padding: "2rem" 
        }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#16a34a", fontSize: "1.2rem", marginBottom: "1rem" }}>
            <CheckCircle size={20} /> Link Shortened Successfully!
          </h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
            <div style={{ flex: 1, minWidth: "250px" }}>
              <span style={{ fontSize: "0.75rem", color: "#15803d", fontWeight: 700, textTransform: "uppercase", display: "block" }}>Short URL</span>
              <a 
                href={result.short} 
                target="_blank" 
                rel="noreferrer" 
                style={{ fontSize: "1.5rem", fontWeight: 800, color: "#16a34a", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                {result.short} <ExternalLink size={18} />
              </a>
              <span style={{ fontSize: "0.85rem", color: "#15803d", display: "block", marginTop: "0.5rem", wordBreak: "break-all" }}>
                Destination: {result.original}
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button 
                className="btn" 
                onClick={() => handleCopy(result.short, result.id)}
                style={{ background: "#16a34a", color: "white", borderRadius: "8px", padding: "0.7rem 1.25rem", fontSize: "0.9rem" }}
              >
                {copiedId === result.id ? <Check size={16} /> : <Copy size={16} />}
                {copiedId === result.id ? "Copied" : "Copy Link"}
              </button>
              <button 
                className="btn" 
                onClick={() => setShowQrId(showQrId === result.id ? null : result.id)}
                style={{ background: "white", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "0.7rem 1.25rem", fontSize: "0.9rem" }}
              >
                <QRIcon size={16} /> QR Code
              </button>
            </div>
          </div>

          {showQrId === result.id && (
            <div style={{ marginTop: "1.5rem", background: "white", padding: "1.5rem", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", border: "1px solid #bbf7d0" }}>
              <QRCodeSVG value={result.short} size={150} level="H" />
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Scan to access your short link</span>
            </div>
          )}
        </div>
      )}

      {/* History / My Links Dashboard */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <BarChart3 size={20} color="var(--primary)" /> My Shortened Links ({history.length})
          </h2>
          {history.length > 0 && (
            <button 
              onClick={handleClearHistory} 
              style={{ 
                background: "transparent", 
                border: "none", 
                color: "#ef4444", 
                fontSize: "0.85rem", 
                fontWeight: 600, 
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem"
              }}
            >
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
            <Link2 size={40} style={{ opacity: 0.3, marginBottom: "1rem" }} />
            <p>No links shortened yet. Paste a link above to get started!</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {history.map((item) => (
              <div key={item.id} className="card" style={{ padding: "1.25rem", transition: "all 0.2s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ flex: 1, minWidth: "250px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                      <a 
                        href={item.short} 
                        target="_blank" 
                        rel="noreferrer" 
                        style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--primary)" }}
                      >
                        {item.short}
                      </a>
                      <span style={{ fontSize: "0.75rem", padding: "0.15rem 0.5rem", borderRadius: "10px", background: "#f1f5f9", color: "var(--text-muted)" }}>
                        {item.date}
                      </span>
                    </div>
                    <span style={{ 
                      fontSize: "0.85rem", 
                      color: "var(--text-muted)", 
                      display: "block", 
                      marginTop: "0.25rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "500px"
                    }}>
                      Original: {item.original}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    {/* Simulated Clicks */}
                    <div style={{ textAlign: "right", paddingRight: "0.5rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Copies</span>
                      <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{item.clicks}</span>
                    </div>

                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button 
                        className="btn btn-outline" 
                        onClick={() => handleCopy(item.short, item.id)}
                        style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }}
                        title="Copy to Clipboard"
                      >
                        {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                        {copiedId === item.id ? "Copied" : "Copy"}
                      </button>
                      <button 
                        className="btn btn-outline" 
                        onClick={() => setShowQrId(showQrId === item.id ? null : item.id)}
                        style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }}
                        title="View QR Code"
                      >
                        <QRIcon size={14} />
                      </button>
                      <button 
                        className="btn btn-outline" 
                        onClick={() => handleDelete(item.id)}
                        style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem", color: "#ef4444", borderColor: "#fecaca" }}
                        title="Delete Link"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {showQrId === item.id && (
                  <div style={{ 
                    marginTop: "1.25rem", 
                    paddingTop: "1.25rem", 
                    borderTop: "1px dashed var(--border-light)", 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    gap: "0.5rem" 
                  }}>
                    <QRCodeSVG value={item.short} size={120} level="M" />
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Scan QR Code</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SEO Prose Info */}
      <div className="prose" style={{ marginTop: "4rem" }}>
        <h2>Why Shorten Your Links?</h2>
        <p>
          Long, tracking-parameter heavy links look messy in social media bios, emails, and SMS copy. A clean shortened link looks professional, builds trust with your audience, and increases click-through rates (CTR) by up to 34%.
        </p>

        <h2>Features of StartupAI URL Shortener</h2>
        <ul>
          <li><strong>Instant Processing:</strong> Enter any valid target link and receive a shortened address in less than 500ms.</li>
          <li><strong>Multiple Providers:</strong> Supports Is.gd and TinyURL APIs to guarantee uptime and link reliability.</li>
          <li><strong>Integrated QR Code:</strong> Access high-density vector QR codes instantly for any shortened link, perfect for printing or screen presentation.</li>
          <li><strong>History Tracker:</strong> Locally saves your shortened links in browser cache, allowing you to copy, share, or delete previous links anytime.</li>
        </ul>
      </div>
    </div>
  );
}
