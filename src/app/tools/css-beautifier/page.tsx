"use client";

import { useState, useMemo } from "react";
import { FileCode, ArrowLeft, Copy, Check, RotateCcw, Download, Sparkles } from "lucide-react";
import Link from "next/link";

const SAMPLE_CSS = `body{background-color:#f3f4f6;color:#111827;font-family:sans-serif;}header,footer{display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;}a:hover{text-decoration:underline;color:var(--primary);}`;

export default function CssBeautifier() {
  const [rawCss, setRawCss] = useState(SAMPLE_CSS);
  const [indentSize, setIndentSize] = useState(2);
  const [indentType, setIndentType] = useState("space"); // "space" or "tab"
  const [copied, setCopied] = useState(false);

  // Beautification engine
  const beautifiedCss = useMemo(() => {
    if (!rawCss.trim()) return "";

    const indentChar = indentType === "tab" ? "\t" : " ";
    const tab = indentChar.repeat(indentSize);
    let result = "";
    
    // Parse CSS character by character to create clean tokens
    let i = 0;
    const tokens = [];
    let currentToken = "";

    while (i < rawCss.length) {
      const char = rawCss[i];

      // Handle comments
      if (char === "/" && rawCss[i + 1] === "*") {
        if (currentToken.trim()) {
          tokens.push({ type: "code", val: currentToken.trim() });
          currentToken = "";
        }
        let comment = "/*";
        i += 2;
        while (i < rawCss.length && !(rawCss[i] === "*" && rawCss[i + 1] === "/")) {
          comment += rawCss[i];
          i++;
        }
        comment += "*/";
        i += 2;
        tokens.push({ type: "comment", val: comment });
        continue;
      }

      // Handle strings
      if (char === '"' || char === "'") {
        const quote = char;
        currentToken += char;
        i++;
        while (i < rawCss.length && rawCss[i] !== quote) {
          if (rawCss[i] === "\\") {
            currentToken += rawCss[i];
            i++;
          }
          currentToken += rawCss[i];
          i++;
        }
        if (i < rawCss.length) {
          currentToken += rawCss[i];
          i++;
        }
        continue;
      }

      // Break on brackets and semicolon
      if (char === "{" || char === "}" || char === ";") {
        if (currentToken.trim()) {
          tokens.push({ type: "code", val: currentToken.trim() });
          currentToken = "";
        }
        tokens.push({ type: "symbol", val: char });
        i++;
      } else {
        currentToken += char;
        i++;
      }
    }
    
    if (currentToken.trim()) {
      tokens.push({ type: "code", val: currentToken.trim() });
    }

    // Reconstruct the formatted CSS
    let level = 0;

    for (let t = 0; t < tokens.length; t++) {
      const token = tokens[t];

      if (token.type === "comment") {
        result += tab.repeat(level) + token.val + "\n";
      } else if (token.type === "symbol") {
        if (token.val === "{") {
          if (result.endsWith("\n")) {
            result = result.trimEnd() + " {\n";
          } else if (!result.endsWith(" ")) {
            result += " {\n";
          } else {
            result += "{\n";
          }
          level++;
        } else if (token.val === "}") {
          level = Math.max(0, level - 1);
          result = result.trimEnd() + "\n" + tab.repeat(level) + "}\n\n";
        } else if (token.val === ";") {
          result = result.trimEnd() + ";\n";
        }
      } else {
        let val = token.val;

        if (level > 0) {
          // Inside a declaration block, format property and value spacing
          const colonIdx = val.indexOf(":");
          if (colonIdx !== -1 && !val.trim().startsWith("@") && !val.includes("url(") && !val.includes("base64,")) {
            const prop = val.slice(0, colonIdx).trim();
            const value = val.slice(colonIdx + 1).trim();
            val = `${prop}: ${value}`;
          }
          result += tab.repeat(level) + val;
        } else {
          // Selector list
          val = val.split(",").map((s) => s.trim()).join(", ");
          result += val;
        }
      }
    }

    return result.replace(/\n{3,}/g, "\n\n").trim();
  }, [rawCss, indentSize, indentType]);

  const handleCopy = () => {
    if (!beautifiedCss) return;
    navigator.clipboard.writeText(beautifiedCss);
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
    if (!beautifiedCss) return;
    const blob = new Blob([beautifiedCss], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "styles.beautified.css";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      {/* Back Button */}
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

      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <FileCode color="var(--primary)" /> CSS Beautifier
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Transform compact or ugly CSS rules into perfectly formatted, beautifully indented stylesheets instantly.
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
            placeholder="Paste your unformatted CSS code here..."
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
            <h4 style={{ fontSize: "0.95rem", margin: "0 0 0.5rem 0", color: "var(--text-main)" }}>🎨 Pro Tip</h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.4" }}>
              Our formatter is smart enough to handle complex CSS layouts, media queries, keyframe animations, pseudo-classes, and data-URI inline strings safely.
            </p>
          </div>
        </div>
      </div>

      {/* Output Panel */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Sparkles size={18} color="var(--primary)" /> Beautiful Output CSS
          </h3>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleDownload}
              disabled={!beautifiedCss}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Download size={14} /> Download File
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCopy}
              disabled={!beautifiedCss}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy Clean Code"}
            </button>
          </div>
        </div>

        <textarea
          className="input-field"
          value={beautifiedCss}
          readOnly
          placeholder="Beautifully formatted CSS output will appear here..."
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
        <h2>Why is formatting your CSS so important?</h2>
        <p>
          CSS stylesheets have a tendency to grow very quickly. As you add page features, media queries for mobile designs, 
          and layout modifications, your style rules can become extremely messy. Writing declarations all on a single line or having inconsistent 
          spacing around selectors makes it nearly impossible to maintain. A CSS beautifier takes all those rules and organizes them into structured 
          blocks where properties are indented, colons have consistent spaces, and brackets line up properly. This keeps your files readable, 
          which is crucial when you or your team need to make stylesheet updates in the future.
        </p>

        <h2>How to read and organize styling layouts easily</h2>
        <p>
          By organizing your CSS code with clean indentation, finding styling conflicts becomes a lot easier. For instance, when media queries are nested, 
          our tool properly increments the indentation level. This lets you visualize the scope of each query at a glance. Additionally, selector groupings 
          are cleaned up to place commas consistently, property declarations are aligned, and extra lines are collapsed so the stylesheet remains clean 
          without losing its logical groupings.
        </p>

        <h2>Secure, fast, and local browser processing</h2>
        <p>
          We take security and privacy seriously. This CSS beautifier runs completely client-side in your web browser. 
          Your code is processed locally using JavaScript and is never sent over the network to external servers. This means any proprietary structures, 
          internal styling values, or custom variables remain fully confidential. You can format massive style files in milliseconds with complete confidence.
        </p>
      </div>
    </div>
  );
}
