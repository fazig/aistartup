"use client";

import { useState, useMemo } from "react";
import { FileCode, ArrowLeft, Copy, Check, RotateCcw, Download, Sparkles } from "lucide-react";
import Link from "next/link";

const SAMPLE_HTML = `<!DOCTYPE html><html><head><title>Sample HTML Beautifier</title><style>body{font-family:sans-serif;background:#fff;}h1{color:var(--primary);}</style></head><body><div id="main" class="card"><h1>Beautify HTML!</h1><p>This is a raw, unformatted HTML string. Click beautify to format it.</p><ul><li>Easy to read</li><li>Maintains nesting</li><li>No server requests</li></ul></div><script>const app=document.getElementById("main");console.log("App initialized",app);</script></body></html>`;

export default function HtmlBeautifier() {
  const [rawHtml, setRawHtml] = useState(SAMPLE_HTML);
  const [indentSize, setIndentSize] = useState(2);
  const [indentType, setIndentType] = useState("space"); // "space" or "tab"
  const [copied, setCopied] = useState(false);

  // Beautification engine
  const beautifiedHtml = useMemo(() => {
    if (!rawHtml.trim()) return "";

    const indentChar = indentType === "tab" ? "\t" : " ";
    const indentStr = indentChar.repeat(indentSize);
    let result = "";
    let indent = "";

    // Void / self-closing HTML elements
    const voidElements = [
      "area", "base", "br", "col", "embed", "hr", "img", "input",
      "link", "meta", "param", "source", "track", "wbr"
    ];

    // Split HTML by tags, keeping tags intact in the tokens array
    const tokens = rawHtml
      .replace(/(<[^>]+>)/g, "\n$1\n")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    let inPre = false;
    let inScript = false;
    let inStyle = false;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      // Handle block scopes
      if (token.match(/<\/pre>/i)) {
        inPre = false;
      }
      if (token.match(/<\/script>/i)) {
        inScript = false;
      }
      if (token.match(/<\/style>/i)) {
        inStyle = false;
      }

      if (inPre) {
        result += token + "\n";
        continue;
      }

      if (token.match(/<pre[^>]*>/i)) {
        inPre = true;
        result += indent + token + "\n";
        continue;
      }

      if (token.match(/<script[^>]*>/i)) {
        inScript = true;
        result += indent + token + "\n";
        indent += indentStr;
        continue;
      }

      if (token.match(/<style[^>]*>/i)) {
        inStyle = true;
        result += indent + token + "\n";
        indent += indentStr;
        continue;
      }

      if (token.startsWith("</")) {
        // Closing tag - reduce indent level before writing tag
        indent = indent.substring(indentStr.length);
        result += indent + token + "\n";
      } else if (token.startsWith("<!--")) {
        // Comment
        result += indent + token + "\n";
      } else if (token.startsWith("<") && !token.startsWith("<!")) {
        // Opening tag
        const tagNameMatch = token.match(/<([a-zA-Z0-9:-]+)/);
        const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : "";
        const isSelfClosing = token.endsWith("/>") || voidElements.includes(tagName);

        result += indent + token + "\n";
        if (!isSelfClosing) {
          indent += indentStr;
        }
      } else {
        // Standard text node
        result += indent + token + "\n";
      }
    }

    return result.trim();
  }, [rawHtml, indentSize, indentType]);

  const handleCopy = () => {
    if (!beautifiedHtml) return;
    navigator.clipboard.writeText(beautifiedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClear = () => {
    setRawHtml("");
  };

  const handleLoadSample = () => {
    setRawHtml(SAMPLE_HTML);
  };

  const handleDownload = () => {
    if (!beautifiedHtml) return;
    const blob = new Blob([beautifiedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "index.beautified.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
          <FileCode color="var(--primary)" /> HTML Beautifier
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Transform messy, nested, or compressed HTML code into clean, well-spaced, and perfectly indented code instantly.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Input Panel */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Raw HTML</h3>
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
            value={rawHtml}
            onChange={(e) => setRawHtml(e.target.value)}
            placeholder="Paste your messy HTML markup here..."
            style={{
              height: "360px",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              lineHeight: "1.5",
              resize: "vertical",
            }}
          />
        </div>

        {/* Configurations Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Beautifier Settings</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Indent Type */}
              <div>
                <label className="input-label" style={{ display: "block", marginBottom: "0.5rem" }}>Indent Type</label>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.9rem", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="indentType"
                      value="space"
                      checked={indentType === "space"}
                      onChange={() => setIndentType("space")}
                    />
                    Spaces
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.9rem", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="indentType"
                      value="tab"
                      checked={indentType === "tab"}
                      onChange={() => setIndentType("tab")}
                    />
                    Tabs
                  </label>
                </div>
              </div>

              {/* Indent Size */}
              {indentType === "space" && (
                <div>
                  <label className="input-label" style={{ display: "block", marginBottom: "0.5rem" }}>Indent Size</label>
                  <select
                    className="input-field"
                    value={indentSize}
                    onChange={(e) => setIndentSize(parseInt(e.target.value))}
                    style={{ width: "100%", padding: "0.5rem" }}
                  >
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                    <option value={8}>8 spaces</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="card" style={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}>
            <h4 style={{ fontSize: "0.95rem", margin: "0 0 0.5rem 0", color: "var(--text-main)" }}>💡 Pro Tip</h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.4" }}>
              Our tool handles nested scripts, custom CSS embedded inside <code>&lt;style&gt;</code> blocks, and avoids breaking pre-formatted blocks (like <code>&lt;pre&gt;</code> text tags).
            </p>
          </div>
        </div>
      </div>

      {/* Output Panel */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Sparkles size={18} color="var(--primary)" /> Beautiful Output HTML
          </h3>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleDownload}
              disabled={!beautifiedHtml}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Download size={14} /> Download File
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCopy}
              disabled={!beautifiedHtml}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy Clean Code"}
            </button>
          </div>
        </div>

        <textarea
          className="input-field"
          value={beautifiedHtml}
          readOnly
          placeholder="Beautifully formatted HTML output will appear here..."
          style={{
            height: "300px",
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
        <h2>What is HTML beautification and why is it useful?</h2>
        <p>
          Let&apos;s be real—working with messy, compressed, or machine-generated HTML code is a developer&apos;s nightmare. 
          When you retrieve source code from a web scraper, inspect a bundled website, or inherit code from templates, it often comes as one giant, 
          unreadable block. An HTML beautifier solves this by reintroducing tabs, spaces, and line breaks to construct a clean, 
          hierarchical layout. By visualizing tag relationships clearly, you can spot unclosed brackets, trace container widths, 
          and navigate complex page templates without straining your eyes.
        </p>

        <h2>How our HTML formatter helps you build better websites</h2>
        <p>
          A well-formatted HTML structure is the foundation of a clean website codebase. When you work in teams, sharing code that is structured 
          haphazardly leads to confusion, merge conflicts, and longer debugging cycles. By utilizing our client-side formatter, you can 
          standardize your nesting guidelines using either 2-space, 4-space, or tab-based structures. This layout discipline makes writing CSS selectors 
          much simpler, as you can instantly identify parent-child relationships and see where elements sit in the Document Object Model (DOM).
        </p>

        <h2>Completely secure, client-side processing</h2>
        <p>
          We know that data privacy is critical, especially when formatting code containing proprietary layouts, form architectures, or sensitive URLs. 
          That is why our HTML beautifier processes all operations 100% on your local machine. Nothing is ever sent to an external server or saved databases. 
          The formatting algorithm splits the tags and text strings directly in your browser, maintaining full security. It also avoids 
          messing up inline CSS in <code>&lt;style&gt;</code> tags or JavaScript configurations inside <code>&lt;script&gt;</code> tags, 
          giving you a reliable, safe output code file.
        </p>
      </div>
    </div>
  );
}
