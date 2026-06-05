"use client";

import { useState, useMemo } from "react";
import { FileCode, ArrowLeft, Copy, Check, RotateCcw, Download, Sparkles } from "lucide-react";
import Link from "next/link";

const SAMPLE_JS = `function calculateSum(a,b){const diff=a-b;if(diff<0){return-diff;}return diff;}console.log(calculateSum(10,25));`;

export default function JavascriptBeautifier() {
  const [rawJs, setRawJs] = useState(SAMPLE_JS);
  const [indentSize, setIndentSize] = useState(2);
  const [indentType, setIndentType] = useState("space"); // "space" or "tab"
  const [copied, setCopied] = useState(false);

  // Beautification engine
  const beautifiedJs = useMemo(() => {
    if (!rawJs.trim()) return "";

    const indentChar = indentType === "tab" ? "\t" : " ";
    const indentStr = indentChar.repeat(indentSize);
    let result = "";
    let level = 0;

    let i = 0;
    const tokens = [];
    let currentToken = "";

    while (i < rawJs.length) {
      const char = rawJs[i];
      const nextChar = rawJs[i + 1];

      // Handle line comments
      if (char === "/" && nextChar === "/") {
        if (currentToken.trim()) {
          tokens.push({ type: "code", val: currentToken.trim() });
          currentToken = "";
        }
        let comment = "//";
        i += 2;
        while (i < rawJs.length && rawJs[i] !== "\n") {
          comment += rawJs[i];
          i++;
        }
        tokens.push({ type: "comment-line", val: comment });
        continue;
      }

      // Handle block comments
      if (char === "/" && nextChar === "*") {
        if (currentToken.trim()) {
          tokens.push({ type: "code", val: currentToken.trim() });
          currentToken = "";
        }
        let comment = "/*";
        i += 2;
        while (i < rawJs.length && !(rawJs[i] === "*" && rawJs[i + 1] === "/")) {
          comment += rawJs[i];
          i++;
        }
        comment += "*/";
        i += 2;
        tokens.push({ type: "comment-block", val: comment });
        continue;
      }

      // Handle strings
      if (char === '"' || char === "'" || char === "`") {
        if (currentToken.trim()) {
          tokens.push({ type: "code", val: currentToken.trim() });
          currentToken = "";
        }
        const quote = char;
        let str = char;
        i++;
        while (i < rawJs.length && rawJs[i] !== quote) {
          if (rawJs[i] === "\\") {
            str += rawJs[i];
            i++;
          }
          str += rawJs[i];
          i++;
        }
        if (i < rawJs.length) {
          str += rawJs[i];
          i++;
        }
        tokens.push({ type: "string", val: str });
        continue;
      }

      // Break on brackets, semicolons, and commas
      if ("{}()[];,".includes(char)) {
        if (currentToken.trim()) {
          tokens.push({ type: "code", val: currentToken.trim() });
          currentToken = "";
        }
        tokens.push({ type: "symbol", val: char });
        i++;
        continue;
      }

      currentToken += char;
      i++;
    }

    if (currentToken.trim()) {
      tokens.push({ type: "code", val: currentToken.trim() });
    }

    // Reconstruct JavaScript
    let output = "";
    let inForHeader = false;
    let forHeaderParenCount = 0;

    for (let t = 0; t < tokens.length; t++) {
      const token = tokens[t];

      if (token.type === "comment-line") {
        output += "\n" + indentStr.repeat(level) + token.val + "\n";
      } else if (token.type === "comment-block") {
        output += "\n" + indentStr.repeat(level) + token.val + "\n";
      } else if (token.type === "string") {
        output += token.val;
      } else if (token.type === "symbol") {
        const sym = token.val;

        if (sym === "{") {
          if (!output.endsWith(" ") && !output.endsWith("\n")) {
            output += " ";
          }
          output += "{\n";
          level++;
          output += indentStr.repeat(level);
        } else if (sym === "}") {
          level = Math.max(0, level - 1);
          output = output.trimEnd();
          output += "\n" + indentStr.repeat(level) + "}\n" + indentStr.repeat(level);
        } else if (sym === ";") {
          if (inForHeader) {
            output += "; ";
          } else {
            output += ";\n" + indentStr.repeat(level);
          }
        } else if (sym === ",") {
          output += ", ";
        } else if (sym === "(") {
          const lastWord = output.trim().split(/\s+/).pop() || "";
          if (["if", "for", "while", "switch"].includes(lastWord)) {
            output = output.trimEnd() + " (";
          } else {
            output += "(";
          }

          if (lastWord === "for") {
            inForHeader = true;
            forHeaderParenCount = 1;
          } else if (inForHeader) {
            forHeaderParenCount++;
          }
        } else if (sym === ")") {
          if (inForHeader) {
            forHeaderParenCount--;
            if (forHeaderParenCount === 0) {
              inForHeader = false;
            }
          }
          output += ")";
        } else {
          output += sym;
        }
      } else {
        let code = token.val;

        // Clean up binary and assignment operators
        code = code.replace(/\s*(=>|===|==|!==|!=|<=|>=|&&|\|\||\+=|-=|\*=|\/=|[\+\-\*\/=\?<>:])\s*/g, (match, op, offset, fullText) => {
          // Check for unary plus/minus
          if (op === "-" || op === "+") {
            const prevStr = fullText.slice(0, offset).trim();
            const lastWord = prevStr.split(/\s+/).pop();
            if ("=+(/[;,:?&|!".includes(prevStr.slice(-1)) || lastWord === "return" || lastWord === "throw" || prevStr === "") {
              return op;
            }
          }
          return ` ${op} `;
        });

        // Replace consecutive white spaces with a single space
        code = code.replace(/\s+/g, " ");

        output += code;
      }
    }

    return output
      .replace(/\n\s*\n/g, "\n\n")
      .replace(/\{\s*\}/g, "{}")
      .trim();
  }, [rawJs, indentSize, indentType]);

  const handleCopy = () => {
    if (!beautifiedJs) return;
    navigator.clipboard.writeText(beautifiedJs);
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
    if (!beautifiedJs) return;
    const blob = new Blob([beautifiedJs], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "script.beautified.js";
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
          <FileCode color="var(--primary)" /> JavaScript Beautifier
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Clean up messy, minified, or compressed JavaScript files. Format braces, indent loops, and space out operators for clean code.
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
            placeholder="Paste your unformatted JavaScript code here..."
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
            <h4 style={{ fontSize: "0.95rem", margin: "0 0 0.5rem 0", color: "var(--text-main)" }}>💡 Code Syntax</h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.4" }}>
              Our formatter parses loops (<code>for</code>, <code>while</code>), conditions (<code>if</code>, <code>switch</code>), and assignment blocks correctly, ensuring brackets and semicolons are structured cleanly.
            </p>
          </div>
        </div>
      </div>

      {/* Output Panel */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Sparkles size={18} color="var(--primary)" /> Beautiful Output JavaScript
          </h3>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleDownload}
              disabled={!beautifiedJs}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Download size={14} /> Download File
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCopy}
              disabled={!beautifiedJs}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy Clean Code"}
            </button>
          </div>
        </div>

        <textarea
          className="input-field"
          value={beautifiedJs}
          readOnly
          placeholder="Beautifully formatted JavaScript output will appear here..."
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
        <h2>What is JavaScript beautification and why does it matter?</h2>
        <p>
          JavaScript files are often compressed, aggregated, or minified to speed up internet transmission. 
          However, reading compressed files when resolving bugs, inspecting other web apps, or tracking third-party scripts is practically impossible. 
          A JavaScript beautifier decompresses your scripts, re-introducing indents, spacing out operators, and wrapping blocks in clear brackets. 
          This structural formatting turns a dense, unreadable block of scripts back into normal, human-readable logic.
        </p>

        <h2>How our JS formatter improves code readability</h2>
        <p>
          Our tool parses keywords like <code>if</code>, <code>for</code>, and <code>while</code>, placing brackets on new lines and shifting inner code 
          blocks by a designated indentation size. We also space out binary operators (like <code>===</code>, <code>&&</code>, <code>||</code>, <code>=</code>, and arrow functions <code>=&gt;</code>) 
          so you can easily scan the logic of conditional statements. Unary values (like negative numbers or prefix increments) are kept grouped 
          so the parser doesn&apos;t alter the logical meaning of your equations.
        </p>

        <h2>Secure client-side compiler in your browser</h2>
        <p>
          We know security is critical when handling sensitive code files, API handlers, or database scripts. 
          This JavaScript beautifier handles all calculations locally on your computer inside your web browser. 
          Nothing is ever sent to outer databases or external web servers. The parser runs locally, keeping your proprietary formulas, 
          token structures, and configuration files completely private.
        </p>
      </div>
    </div>
  );
}
