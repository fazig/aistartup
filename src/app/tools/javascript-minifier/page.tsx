"use client";

import { useState, useMemo } from "react";
import { FileCode, ArrowLeft, Copy, Check, RotateCcw, Download, Sparkles } from "lucide-react";
import Link from "next/link";

const SAMPLE_JS = `// Application utility module
const appConfig = {
  version: "1.2.0",
  environment: "production",
  debug: false
};

/*
 * Calculates the total cost including tax.
 * Handles float precision up to 2 decimals.
 */
function calculateTotalCost(price, taxRate) {
  const tax = price * taxRate;
  const grandTotal = price + tax;
  
  console.log("Calculated tax: " + tax);
  return parseFloat(grandTotal.toFixed(2));
}

// Execute calculation
const finalCost = calculateTotalCost(129.99, 0.08);
console.log("Final cost is: " + finalCost);
`;

export default function JavascriptMinifier() {
  const [rawJs, setRawJs] = useState(SAMPLE_JS);
  const [copied, setCopied] = useState(false);

  // Minification engine
  const minifiedJs = useMemo(() => {
    if (!rawJs.trim()) return "";

    const placeholders: { type: string; val: string }[] = [];
    let tempJs = rawJs;

    // 1. Protect strings (single, double quotes and backticks)
    const stringRegex = /(["'])(?:(?=(\\?))\2[\s\S])*?\1|`[\s\S]*?`/g;
    tempJs = tempJs.replace(stringRegex, (match) => {
      placeholders.push({ type: "STRING", val: match });
      return `___JS_PLACEHOLDER_${placeholders.length - 1}___`;
    });

    // 2. Protect regex literals
    const regexRegex = /\/(?![*\/])(?:\\\\|\\\/|\[(?:\\\\|\\\]|[^\]])*\]|[^\/\n])+\/[gimuy]*/g;
    tempJs = tempJs.replace(regexRegex, (match) => {
      placeholders.push({ type: "REGEX", val: match });
      return `___JS_PLACEHOLDER_${placeholders.length - 1}___`;
    });

    // 3. Remove block comments /* ... */
    tempJs = tempJs.replace(/\/\*[\s\S]*?\*\//g, "");

    // 4. Remove line comments // ...
    tempJs = tempJs.replace(/\/\/.*/g, "");

    // 5. Compress spacing
    tempJs = tempJs.replace(/\s+/g, " ");

    // 6. Remove spaces around mathematical / logical operators and symbols
    // { } ( ) [ ] ; , = + - * / < > ! & | ? : %
    tempJs = tempJs.replace(/\s*([\{\}\(\)\[\];,=\+\-\*\/<>!&\|\?:%])\s*/g, "$1");

    // 7. Restore preserved strings and regexes
    placeholders.forEach((placeholder, idx) => {
      tempJs = tempJs.replace(`___JS_PLACEHOLDER_${idx}___`, placeholder.val);
    });

    return tempJs.trim();
  }, [rawJs]);

  // Byte calculations
  const stats = useMemo(() => {
    const originalBytes = new Blob([rawJs]).size;
    const minifiedBytes = new Blob([minifiedJs]).size;
    const difference = originalBytes - minifiedBytes;
    const savings = originalBytes > 0 ? (difference / originalBytes) * 100 : 0;

    return {
      originalBytes,
      minifiedBytes,
      difference: difference > 0 ? difference : 0,
      savings: savings > 0 ? parseFloat(savings.toFixed(1)) : 0,
    };
  }, [rawJs, minifiedJs]);

  const handleCopy = () => {
    if (!minifiedJs) return;
    navigator.clipboard.writeText(minifiedJs);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClear = () => {
    setRawJs("");
  };

  const handleLoadSample = () => {
    setRawJs(SAMPLE_JS);
  };

  const handleDownload = () => {
    if (!minifiedJs) return;
    const blob = new Blob([minifiedJs], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "script.min.js";
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
          <FileCode color="var(--primary)" /> JavaScript Minifier
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Compress your scripts in real time. Remove comments, spaces, and line breaks to minimize asset files and load pages instantly.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Input Panel */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Raw JavaScript</h3>
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
            value={rawJs}
            onChange={(e) => setRawJs(e.target.value)}
            placeholder="Paste your uncompressed JavaScript code here..."
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
            <h4 style={{ fontSize: "0.95rem", margin: "0 0 0.5rem 0", color: "var(--text-main)" }}>⚡ Why Minify JS?</h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.4" }}>
              Smaller JavaScript files mean less cellular data consumption for mobile users, quicker code evaluation for browser engines, and a faster Time to Interactive (TTI) for your website.
            </p>
          </div>
        </div>
      </div>

      {/* Output Panel */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Sparkles size={18} color="var(--primary)" /> Minified Output JS
          </h3>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleDownload}
              disabled={!minifiedJs}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Download size={14} /> Download File
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCopy}
              disabled={!minifiedJs}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy Minified"}
            </button>
          </div>
        </div>

        <textarea
          className="input-field"
          value={minifiedJs}
          readOnly
          placeholder="Minified JavaScript output will appear here once you paste your raw code..."
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
        <h2>What does it mean to minify JavaScript?</h2>
        <p>
          JavaScript minification is the process of stripping away redundant characters from your web scripts without affecting how the logic compiles. 
          When building apps, we write comments, spacing, and long descriptive variable declarations to make files readable. 
          However, these features are ignored by browser engines. Minifying compresses the source code by removing spaces, brackets margins, 
          and comments, outputting a compact, single-line file that transfers much faster over HTTP networks.
        </p>

        <h2>How minified JS files speed up your web apps and improve SEO</h2>
        <p>
          Along with HTML and stylesheets, JavaScript is a core asset that directly affects how fast a webpage becomes interactive. 
          If a browser has to download megabytes of unminified script files, users will experience laggy scroll rendering, delayed form submissions, 
          and unresponsive click events. Search engines evaluate site responsiveness via Core Web Vitals, particularly Interaction to Next Paint (INP). 
          Minifying your JS payload reduces network latency, helps browser compilers parse assets faster, and elevates your search ranking profile.
        </p>

        <h2>Secure, zero-latency local browser minification</h2>
        <p>
          We know security is critical when compiling scripts that handle database handlers, user credentials, or API configs. 
          That is why our JavaScript minifier runs 100% locally in your web browser. Nothing is ever sent to external databases. 
          The script uses browser regex logic to isolate and preserve template strings, regular expression literals, and string values, 
          while collapsing all other code structures. This allows you to minify files safely in milliseconds.
        </p>
      </div>
    </div>
  );
}
