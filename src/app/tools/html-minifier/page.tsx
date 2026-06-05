"use client";

import { useState, useMemo } from "react";
import { FileCode, ArrowLeft, Copy, Check, RotateCcw, Download, Sparkles } from "lucide-react";
import Link from "next/link";

const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Sample Web Page</title>
    <!-- We need standard styles here -->
    <style>
      body {
        background-color: #f4f4f4;
        color: #333;
        font-family: sans-serif;
      }
      .card {
        padding: 20px;
        background: white;
      }
    </style>
  </head>
  <body>
    <!-- Main content container -->
    <div id="app" class="container" style="display: block;">
      <h1 class = "title">Welcome to the Sumo Page</h1>
      <p class="description">
        This is a sample HTML template that contains comments, 
        indented code, redundant attributes, and extra whitespace.
      </p>
      
      <button type="button" disabled="disabled" class="btn">
        Submit Form
      </button>
      
      <input type="text" readonly="readonly" required="required" value="Sample Value" />
    </div>

    <!-- Inline scripts section -->
    <script type="text/javascript">
      console.log("Hello from the console!");
      function checkStatus() {
        return true;
      }
    </script>
  </body>
</html>`;

export default function HtmlMinifier() {
  const [rawHtml, setRawHtml] = useState(SAMPLE_HTML);
  const [removeComments, setRemoveComments] = useState(true);
  const [collapseWhitespace, setCollapseWhitespace] = useState(true);
  const [stripRedundant, setStripRedundant] = useState(true);
  const [simplifyBooleans, setSimplifyBooleans] = useState(true);
  
  const [copied, setCopied] = useState(false);

  // Minification engine
  const minifiedHtml = useMemo(() => {
    if (!rawHtml.trim()) return "";

    let minified = rawHtml;
    
    // Arrays to store preformatted blocks that we shouldn't touch
    const preBlocks: string[] = [];
    const textareaBlocks: string[] = [];
    const scriptBlocks: string[] = [];
    const styleBlocks: string[] = [];

    // 1. Temporarily replace pre blocks to preserve formatting
    minified = minified.replace(/<pre[\s\S]*?<\/pre>/gi, (match) => {
      preBlocks.push(match);
      return `___PRE_PLACEHOLDER_${preBlocks.length - 1}___`;
    });

    // 2. Preserve textarea blocks
    minified = minified.replace(/<textarea[\s\S]*?<\/textarea>/gi, (match) => {
      textareaBlocks.push(match);
      return `___TEXTAREA_PLACEHOLDER_${textareaBlocks.length - 1}___`;
    });

    // 3. Preserve script blocks (we don't want to mess up JS formatting which could break semi-colon-less code)
    minified = minified.replace(/<script[\s\S]*?<\/script>/gi, (match) => {
      scriptBlocks.push(match);
      return `___SCRIPT_PLACEHOLDER_${scriptBlocks.length - 1}___`;
    });

    // 4. Preserve style blocks
    minified = minified.replace(/<style[\s\S]*?<\/style>/gi, (match) => {
      styleBlocks.push(match);
      return `___STYLE_PLACEHOLDER_${styleBlocks.length - 1}___`;
    });

    // 5. Minify HTML Comments
    if (removeComments) {
      minified = minified.replace(/<!--[\s\S]*?-->/g, "");
    }

    // 6. Strip Redundant attributes (e.g. script type="text/javascript")
    if (stripRedundant) {
      // Normalize space around = in tags
      minified = minified.replace(/\s+(\w+)\s*=\s*(["'])([\s\S]*?)\2/g, " $1=$2$3$2");
      // Remove JS script type
      minified = minified.replace(/type\s*=\s*["']text\/javascript["']/gi, "");
      // Remove CSS link type
      minified = minified.replace(/type\s*=\s*["']text\/css["']/gi, "");
    }

    // 7. Simplify booleans (disabled="disabled" -> disabled)
    if (simplifyBooleans) {
      const bools = [
        "disabled",
        "checked",
        "readonly",
        "required",
        "multiple",
        "selected",
        "autoplay",
        "controls",
        "loop",
        "muted",
        "novalidate",
      ];
      bools.forEach((bool) => {
        const regex = new RegExp(`\\s+${bool}\\s*=\\s*["']${bool}["']`, "gi");
        minified = minified.replace(regex, ` ${bool}`);
      });
    }

    // 8. Collapse whitespace
    if (collapseWhitespace) {
      // Replace all consecutive spaces/newlines/tabs with single space
      minified = minified.replace(/\s+/g, " ");
      // Collapse spaces between tags
      minified = minified.replace(/>\s+</g, "><");
    }

    // 9. Restore preserved blocks (in reverse order to handle nesting safely if any, though HTML doesn't permit nesting script/pre)
    styleBlocks.forEach((match, idx) => {
      minified = minified.replace(`___STYLE_PLACEHOLDER_${idx}___`, match);
    });
    scriptBlocks.forEach((match, idx) => {
      minified = minified.replace(`___SCRIPT_PLACEHOLDER_${idx}___`, match);
    });
    textareaBlocks.forEach((match, idx) => {
      minified = minified.replace(`___TEXTAREA_PLACEHOLDER_${idx}___`, match);
    });
    preBlocks.forEach((match, idx) => {
      minified = minified.replace(`___PRE_PLACEHOLDER_${idx}___`, match);
    });

    return minified.trim();
  }, [rawHtml, removeComments, collapseWhitespace, stripRedundant, simplifyBooleans]);

  // Byte calculations
  const stats = useMemo(() => {
    const originalBytes = new Blob([rawHtml]).size;
    const minifiedBytes = new Blob([minifiedHtml]).size;
    const difference = originalBytes - minifiedBytes;
    const savings = originalBytes > 0 ? (difference / originalBytes) * 100 : 0;

    return {
      originalBytes,
      minifiedBytes,
      difference: difference > 0 ? difference : 0,
      savings: savings > 0 ? parseFloat(savings.toFixed(1)) : 0,
    };
  }, [rawHtml, minifiedHtml]);

  const handleCopy = () => {
    if (!minifiedHtml) return;
    navigator.clipboard.writeText(minifiedHtml);
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
    if (!minifiedHtml) return;
    const blob = new Blob([minifiedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "index.min.html";
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
          <FileCode color="var(--primary)" /> HTML Minifier
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Compress and optimize your HTML source code in real time. Strip comments, collapse whitespace, and track byte savings.
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
            placeholder="Paste your uncompressed HTML code here..."
            style={{
              height: "360px",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              lineHeight: "1.5",
              resize: "vertical",
            }}
          />
        </div>

        {/* Configurations & Analysis Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Options Card */}
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Minification Options</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={removeComments}
                  onChange={(e) => setRemoveComments(e.target.checked)}
                  style={{ width: "16px", height: "16px" }}
                />
                <div>
                  <strong>Remove Comments</strong>
                  <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>Strip HTML standard comments (&lt;!-- --&gt;)</span>
                </div>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={collapseWhitespace}
                  onChange={(e) => setCollapseWhitespace(e.target.checked)}
                  style={{ width: "16px", height: "16px" }}
                />
                <div>
                  <strong>Collapse Whitespace</strong>
                  <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>Remove newlines, tabs, and duplicate spaces</span>
                </div>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={stripRedundant}
                  onChange={(e) => setStripRedundant(e.target.checked)}
                  style={{ width: "16px", height: "16px" }}
                />
                <div>
                  <strong>Strip Redundant Attributes</strong>
                  <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>Remove standard defaults like type=&quot;text/javascript&quot;</span>
                </div>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={simplifyBooleans}
                  onChange={(e) => setSimplifyBooleans(e.target.checked)}
                  style={{ width: "16px", height: "16px" }}
                />
                <div>
                  <strong>Simplify Boolean Attributes</strong>
                  <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>Convert disabled=&quot;disabled&quot; to shorthand disabled</span>
                </div>
              </label>
            </div>
          </div>

          {/* Compression Analysis Gauge */}
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
        </div>
      </div>

      {/* Output Panel */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Sparkles size={18} color="var(--primary)" /> Minified Output HTML
          </h3>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleDownload}
              disabled={!minifiedHtml}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Download size={14} /> Download File
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCopy}
              disabled={!minifiedHtml}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy Minified"}
            </button>
          </div>
        </div>

        <textarea
          className="input-field"
          value={minifiedHtml}
          readOnly
          placeholder="Minified output will appear here once you paste your raw HTML..."
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
        <h2>What is HTML minification?</h2>
        <p>
          HTML minification is the process of stripping unnecessary characters from your website&apos;s source code without altering how it 
          functions in the browser. When a web designer writes code, they use line breaks, comments, indentation, and spacious structures 
          to make the code easy for humans to read and maintain. However, web browsers do not need these visual aids to render the page. 
          Minifying compresses the HTML by removing these developer comforts, producing a tighter code block that travels over the internet much faster.
        </p>

        <h2>Why does minifying HTML matter for SEO?</h2>
        <p>
          Page speed is a primary search engine ranking factor. Google&apos;s Core Web Vitals measure indices like Largest Contentful Paint (LCP) 
          and First Input Delay (FID), which are directly impacted by the weight of your raw files. If your HTML file is bloated with 
          thousands of lines of formatting, comments, and empty whitespace, it takes longer to download and parse. By running your pages 
          through an HTML minifier, you reduce the payload size, allowing your servers to load content faster, lowering bounce rates, and 
          improving search engine visibility.
        </p>

        <h2>How does this client-side minifier work?</h2>
        <p>
          Unlike tools that process your HTML on external servers, this minifier is 100% client-side. This means your code never leaves your 
          device, keeping your sensitive proprietary markup or form structures completely private. We use a placeholder matching routine 
          to identify and temporarily swap out sensitive tags like <code>&lt;pre&gt;</code>, <code>&lt;textarea&gt;</code>, 
          <code>&lt;script&gt;</code>, and <code>&lt;style&gt;</code> before performing the compression. This prevents the minifier from 
          flattening code syntax in scripts or altering layout alignments in preformatted text blocks, giving you a clean compression ratio 
          without breaking functionality.
        </p>
      </div>
    </div>
  );
}
