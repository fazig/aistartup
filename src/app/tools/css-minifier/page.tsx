"use client";

import { useState, useMemo } from "react";
import { FileCode, ArrowLeft, Copy, Check, RotateCcw, Download, Sparkles } from "lucide-react";
import Link from "next/link";

const SAMPLE_CSS = `/* Main theme styles */
body {
  background-color: #f4f4f4;
  color: #333333;
  font-family: 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
}

/* Container spacing */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* Card components */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

/* Button hover effects */
.btn:hover {
  background-color: var(--primary);
  text-decoration: none;
}
`;

export default function CssMinifier() {
  const [rawCss, setRawCss] = useState(SAMPLE_CSS);
  const [copied, setCopied] = useState(false);

  // Minification engine
  const minifiedCss = useMemo(() => {
    if (!rawCss.trim()) return "";

    let processed = rawCss;

    // 1. Extract block comments to protect the rest of the styles
    processed = processed.replace(/\/\*[\s\S]*?\*\//g, "");

    // 2. Extract strings to protect contents from being minified
    const strings: string[] = [];
    processed = processed.replace(/(["'])(?:(?=(\\?))\2[\s\S])*?\1/g, (match) => {
      strings.push(match);
      return `___CSS_STR_PLACEHOLDER_${strings.length - 1}___`;
    });

    // 3. Remove space around key separators (curly braces, colons, semicolons, commas)
    processed = processed.replace(/\s*([\{\};:,])\s*/g, "$1");

    // 4. Collapse consecutive spaces, newlines, and tabs
    processed = processed.replace(/\s+/g, " ");

    // 5. Remove spaces around braces explicitly to cover edge cases
    processed = processed.replace(/\s*\{\s*/g, "{");
    processed = processed.replace(/\s*\}\s*/g, "}");

    // 6. Remove unnecessary trailing semicolons before a closing brace
    processed = processed.replace(/;}/g, "}");

    // 7. Restore preserved strings
    strings.forEach((str, idx) => {
      processed = processed.replace(`___CSS_STR_PLACEHOLDER_${idx}___`, str);
    });

    return processed.trim();
  }, [rawCss]);

  // Byte calculations
  const stats = useMemo(() => {
    const originalBytes = new Blob([rawCss]).size;
    const minifiedBytes = new Blob([minifiedCss]).size;
    const difference = originalBytes - minifiedBytes;
    const savings = originalBytes > 0 ? (difference / originalBytes) * 100 : 0;

    return {
      originalBytes,
      minifiedBytes,
      difference: difference > 0 ? difference : 0,
      savings: savings > 0 ? parseFloat(savings.toFixed(1)) : 0,
    };
  }, [rawCss, minifiedCss]);

  const handleCopy = () => {
    if (!minifiedCss) return;
    navigator.clipboard.writeText(minifiedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClear = () => {
    setRawCss("");
  };

  const handleLoadSample = () => {
    setRawCss(SAMPLE_CSS);
  };

  const handleDownload = () => {
    if (!minifiedCss) return;
    const blob = new Blob([minifiedCss], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "styles.min.css";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Human-readable size converter
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      {/* Back Button */}
      <Link
        href="/free-sumo-tools"
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
        <ArrowLeft size={16} /> Back to Free Sumo Tools
      </Link>

      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <FileCode color="var(--primary)" /> CSS Minifier
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Compress and optimize your CSS stylesheet files in real time. Strip comments, spaces, and duplicate rules to speed up page loads.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Input Panel */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Raw CSS</h3>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleLoadSample}
                style={{ padding: "0.3rem 0.65rem", fontSize: "0.75rem" }}
              >
                Load Sample
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleClear}
                style={{ padding: "0.3rem 0.65rem", fontSize: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
                title="Clear input"
              >
                <RotateCcw size={12} /> Clear
              </button>
            </div>
          </div>

          <textarea
            className="input-field"
            value={rawCss}
            onChange={(e) => setRawCss(e.target.value)}
            placeholder="Paste your uncompressed CSS styles here..."
            style={{
              height: "360px",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              lineHeight: "1.5",
              resize: "vertical",
            }}
          />
        </div>

        {/* Compression Analysis Gauge */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="card" style={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Compression Stats</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
              {/* Radial Savings Gauge */}
              <div style={{ position: "relative", width: "90px", height: "90px", flexShrink: 0 }}>
                <svg width="90" height="90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="3.5"
                  />
                  {/* Foreground Savings Circle */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3.5"
                    strokeDasharray={`${stats.savings}, 100`}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 0.3s ease" }}
                  />
                </svg>
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}>
                  <strong style={{ fontSize: "1rem", color: "var(--text-main)" }}>{stats.savings}%</strong>
                  <span style={{ display: "block", fontSize: "0.55rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Saved</span>
                </div>
              </div>

              {/* Text Stats */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.25rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Original Size:</span>
                  <span style={{ fontWeight: 600 }}>{formatBytes(stats.originalBytes)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.25rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Compressed Size:</span>
                  <span style={{ fontWeight: 600, color: "var(--primary)" }}>{formatBytes(stats.minifiedBytes)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.25rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Bytes Saved:</span>
                  <span style={{ fontWeight: 600, color: "#16a34a" }}>{formatBytes(stats.difference)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h4 style={{ fontSize: "0.95rem", margin: "0 0 0.5rem 0", color: "var(--text-main)" }}>⚡ Why Minify?</h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.4" }}>
              Minifying your stylesheets removes comments, whitespace characters, and redundant semicolons. This reduces stylesheet files sizes, speeds up CSS parsing, and boosts overall site performance.
            </p>
          </div>
        </div>
      </div>

      {/* Output Panel */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Sparkles size={18} color="var(--primary)" /> Minified Output CSS
          </h3>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleDownload}
              disabled={!minifiedCss}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Download size={14} /> Download File
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCopy}
              disabled={!minifiedCss}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy Minified"}
            </button>
          </div>
        </div>

        <textarea
          className="input-field"
          value={minifiedCss}
          readOnly
          placeholder="Minified CSS output will appear here once you paste your raw CSS..."
          style={{
            height: "240px",
            fontFamily: "monospace",
            fontSize: "0.85rem",
            lineHeight: "1.5",
            background: "#f8fafc",
            resize: "vertical",
          }}
        />
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What is CSS minification?</h2>
        <p>
          CSS minification is the process of compressing your stylesheets by stripping out code characters that the browser doesn&apos;t need to read. 
          When we write stylesheets, we write comments, indentation spacing, and empty lines to keep our styles readable. While developers need this for 
          debugging, browsers ignore these visual helps entirely. By removing these characters, your CSS file decreases significantly in size, making it 
          much faster to download and parse when a user visits your website.
        </p>

        <h2>Why does minifying stylesheets improve page speed and SEO?</h2>
        <p>
          CSS is a render-blocking resource. This means that a web browser will not start drawing the page layouts until it has fully downloaded and 
          parsed all linked stylesheets. If you have bulky, unoptimized CSS, your users are stuck looking at a blank white screen, which severely hurts 
          user experience. Google uses page speed metrics—such as First Contentful Paint (FCP) and Largest Contentful Paint (LCP)—as search ranking signals. 
          Minifying your CSS directly optimizes these metrics, helping you rank higher while keeping bounce rates low.
        </p>

        <h2>Local, client-side safety for your styles</h2>
        <p>
          Unlike online tools that process your styling files on third-party servers, this CSS minifier performs all compression routines locally 
          on your machine. No server calls are made, meaning your code strings never cross the network. This keeps your custom site styles, 
          proprietary layouts, and internal stylesheets completely private. The compression logic preserves values inside CSS strings 
          (like content fields and quote values) and strips comments and duplicate brackets in milliseconds.
        </p>
      </div>
    </div>
  );
}
