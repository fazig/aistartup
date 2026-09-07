"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  FileCode, Download, Copy, Check, Sparkles, Shield, Bot, 
  CheckCircle, AlertTriangle, ArrowRight, HelpCircle, RefreshCw, Plus, Trash2, Globe
} from "lucide-react";

interface DocLink {
  id: string;
  title: string;
  url: string;
  description: string;
}

interface AiBot {
  id: string;
  name: string;
  owner: string;
  purpose: string;
  status: "allow" | "disallow";
}

const INITIAL_BOTS: AiBot[] = [
  { id: "GPTBot", name: "GPTBot", owner: "OpenAI", purpose: "ChatGPT model training & synthetic dataset creation", status: "allow" },
  { id: "ChatGPT-User", name: "ChatGPT-User", owner: "OpenAI", purpose: "Real-time web browsing & live citation inside ChatGPT", status: "allow" },
  { id: "ClaudeBot", name: "ClaudeBot", owner: "Anthropic", purpose: "Claude model training, live search & autonomous agents", status: "allow" },
  { id: "PerplexityBot", name: "PerplexityBot", owner: "Perplexity AI", purpose: "Deep web indexing and live AI search citations", status: "allow" },
  { id: "Google-Extended", name: "Google-Extended", owner: "Google", purpose: "Gemini and Vertex AI training datasets (separate from Googlebot)", status: "allow" },
  { id: "Applebot-Extended", name: "Applebot-Extended", owner: "Apple", purpose: "Apple Intelligence training and Siri answer synthesis", status: "allow" },
  { id: "Amazonbot", name: "Amazonbot", owner: "Amazon", purpose: "Alexa, Rufus AI shopping assistant, and Bedrock models", status: "allow" },
  { id: "Bytespider", name: "Bytespider", owner: "ByteDance", purpose: "TikTok / Douyin LLM crawler (often aggressive crawl rate)", status: "disallow" },
  { id: "CCBot", name: "CCBot", owner: "Common Crawl", purpose: "Open scraper archive used by multiple AI foundation labs", status: "allow" },
];

export default function ClientLlmsTxtGenerator() {
  const [activeTab, setActiveTab] = useState<"llms" | "robots" | "validator">("llms");
  
  // Tab 1: llms.txt state
  const [projectName, setProjectName] = useState("StartupAI Tools");
  const [tagline, setTagline] = useState("A modern suite of 100+ free browser-based utilities and AI developer tools.");
  const [contextParagraph, setContextParagraph] = useState("This project provides instant, client-side developer utilities, image upscalers, and SEO analyzers that run 100% locally with zero registration.");
  const [docs, setDocs] = useState<DocLink[]>([
    { id: "1", title: "Free AI Image Enhancer", url: "https://startupai.site/tools/image-enhancer", description: "In-browser photo upscaling to HD without cloud uploads." },
    { id: "2", title: "Free Grammar Checker", url: "https://startupai.site/tools/grammar-checker", description: "Instant spelling, punctuation, and clarity without word limits." },
    { id: "3", title: "Article Rewriter & Paraphraser", url: "https://startupai.site/tools/article-rewriter", description: "Semantic paraphrasing tool to improve sentence variety." },
    { id: "4", title: "AdSense Eligibility Checker", url: "https://startupai.site/tools/adsense-eligibility-checker", description: "Interactive 12-point website audit for monetization readiness." }
  ]);
  const [optionalDocs, setOptionalDocs] = useState<DocLink[]>([
    { id: "opt1", title: "Blog & Technical Guides", url: "https://startupai.site/blog", description: "In-depth tutorials on AI tools, GEO, and developer workflows." },
    { id: "opt2", title: "Developer API & Directory", url: "https://startupai.site/tools", description: "Complete directory of all 100+ utilities." }
  ]);
  const [includeFullVersion, setIncludeFullVersion] = useState(false);
  const [copiedLlms, setCopiedLlms] = useState(false);

  // Tab 2: AI Robots state
  const [bots, setBots] = useState<AiBot[]>(INITIAL_BOTS);
  const [generalRobotsRules, setGeneralRobotsRules] = useState("User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: https://startupai.site/sitemap.xml");
  const [copiedRobots, setCopiedRobots] = useState(false);

  // Tab 3: Validator state
  const [testText, setTestText] = useState("");

  // Handler: Add Doc Link
  const handleAddDoc = (isOptional: boolean) => {
    const newDoc: DocLink = {
      id: Date.now().toString(),
      title: "New Documentation Link",
      url: "https://yourwebsite.com/page",
      description: "Brief description of what this page covers for AI agents."
    };
    if (isOptional) {
      setOptionalDocs([...optionalDocs, newDoc]);
    } else {
      setDocs([...docs, newDoc]);
    }
  };

  const handleUpdateDoc = (id: string, isOptional: boolean, field: keyof DocLink, value: string) => {
    if (isOptional) {
      setOptionalDocs(optionalDocs.map(d => d.id === id ? { ...d, [field]: value } : d));
    } else {
      setDocs(docs.map(d => d.id === id ? { ...d, [field]: value } : d));
    }
  };

  const handleDeleteDoc = (id: string, isOptional: boolean) => {
    if (isOptional) {
      setOptionalDocs(optionalDocs.filter(d => d.id !== id));
    } else {
      setDocs(docs.filter(d => d.id !== id));
    }
  };

  // Generate llms.txt string
  const generatedLlmsTxt = useMemo(() => {
    let out = `# ${projectName || "My Project"}\n\n`;
    if (tagline.trim()) {
      out += `> ${tagline.trim()}\n\n`;
    }
    if (contextParagraph.trim()) {
      out += `${contextParagraph.trim()}\n\n`;
    }
    out += `## Core Documentation\n\n`;
    docs.forEach(d => {
      out += `- [${d.title}](${d.url})${d.description ? `: ${d.description}` : ""}\n`;
    });

    if (optionalDocs.length > 0) {
      out += `\n## Optional\n\n`;
      optionalDocs.forEach(d => {
        out += `- [${d.title}](${d.url})${d.description ? `: ${d.description}` : ""}\n`;
      });
    }

    if (includeFullVersion) {
      out += `\n<!-- Complete raw ingestion file available at /llms-full.txt -->\n`;
    }

    return out;
  }, [projectName, tagline, contextParagraph, docs, optionalDocs, includeFullVersion]);

  // Token estimate
  const tokenEstimate = useMemo(() => {
    return Math.round(generatedLlmsTxt.length / 4);
  }, [generatedLlmsTxt]);

  // Generate robots.txt string with AI bots
  const generatedAiRobotsTxt = useMemo(() => {
    let out = `# AI Crawler & Search Engine Policy\n# Generated via StartupAI llms.txt & GEO Toolkit\n\n`;
    
    // Group bots
    const allowed = bots.filter(b => b.status === "allow");
    const disallowed = bots.filter(b => b.status === "disallow");

    if (allowed.length > 0) {
      out += `# Allowed AI Crawlers & Answer Engines (High GEO Visibility)\n`;
      allowed.forEach(b => {
        out += `User-agent: ${b.id} # ${b.owner} - ${b.purpose}\nAllow: /\n\n`;
      });
    }

    if (disallowed.length > 0) {
      out += `# Blocked AI Crawlers / Scrapers\n`;
      disallowed.forEach(b => {
        out += `User-agent: ${b.id} # ${b.owner}\nDisallow: /\n\n`;
      });
    }

    out += `# General Web Crawler Rules\n${generalRobotsRules}\n`;
    out += `\n# Link to llms.txt standard for AI Agents\n# Discovered automatically by agents at /llms.txt\n`;

    return out;
  }, [bots, generalRobotsRules]);

  // Quick Presets
  const applyPreset = (preset: "allow_all" | "search_only" | "block_all") => {
    if (preset === "allow_all") {
      setBots(bots.map(b => ({ ...b, status: "allow" })));
    } else if (preset === "search_only") {
      setBots(bots.map(b => {
        if (b.id === "ChatGPT-User" || b.id === "PerplexityBot") {
          return { ...b, status: "allow" };
        }
        return { ...b, status: "disallow" };
      }));
    } else if (preset === "block_all") {
      setBots(bots.map(b => ({ ...b, status: "disallow" })));
    }
  };

  // Copy handlers
  const handleCopy = (text: string, isRobots = false) => {
    navigator.clipboard.writeText(text);
    if (isRobots) {
      setCopiedRobots(true);
      setTimeout(() => setCopiedRobots(false), 2000);
    } else {
      setCopiedLlms(true);
      setTimeout(() => setCopiedLlms(false), 2000);
    }
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Validation Analysis
  const validationResult = useMemo(() => {
    const text = testText.trim() || generatedLlmsTxt;
    const hasH1 = /^#\s+[^\n]+/m.test(text);
    const hasBlockquote = /^>\s+[^\n]+/m.test(text);
    const hasLinks = /-\s+\[.+\]\(https?:\/\/[^\s)]+\)/.test(text);
    const hasCoreSection = /##\s+Core/i.test(text) || /##\s+Documentation/i.test(text) || /##\s+Guides/i.test(text);
    
    let score = 0;
    if (hasH1) score += 30;
    if (hasBlockquote) score += 25;
    if (hasLinks) score += 30;
    if (hasCoreSection) score += 15;

    return {
      score,
      hasH1,
      hasBlockquote,
      hasLinks,
      hasCoreSection
    };
  }, [testText, generatedLlmsTxt]);

  return (
    <div className="container" style={{ padding: "2.5rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Navigation Breadcrumb */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <Link
          href="/tools"
          className="btn btn-outline"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.85rem",
            padding: "0.5rem 1rem"
          }}
        >
          &larr; Back to Tools Directory
        </Link>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <Sparkles size={14} color="#10b981" /> 2026 GEO Standard
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "0.5rem", 
          padding: "0.35rem 0.9rem", 
          borderRadius: "999px", 
          background: "rgba(99, 102, 241, 0.12)", 
          color: "#6366f1", 
          fontSize: "0.85rem", 
          fontWeight: 600, 
          marginBottom: "1rem" 
        }}>
          <Bot size={16} /> Generative Engine Optimization (GEO) Suite
        </div>
        <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.7rem)", fontWeight: 800, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
          Free <span style={{ color: "#6366f1" }}>llms.txt</span> & AI Bot Generator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", maxWidth: "720px", margin: "0 auto", lineHeight: 1.6 }}>
          Generate a standardized, machine-readable <code style={{ background: "rgba(255,255,255,0.08)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>/llms.txt</code> file for ChatGPT, Perplexity, and Claude, and configure your <code style={{ background: "rgba(255,255,255,0.08)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>robots.txt</code> to win high-authority AI citations.
        </p>
      </div>

      {/* Mode Navigation Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <button
          onClick={() => setActiveTab("llms")}
          className="btn"
          style={{
            padding: "0.65rem 1.4rem",
            borderRadius: "10px",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: activeTab === "llms" ? "#6366f1" : "var(--bg-card)",
            color: activeTab === "llms" ? "#ffffff" : "var(--text-main)",
            border: "1px solid " + (activeTab === "llms" ? "#6366f1" : "var(--border-light)")
          }}
        >
          <FileCode size={18} /> 1. Generate /llms.txt
        </button>

        <button
          onClick={() => setActiveTab("robots")}
          className="btn"
          style={{
            padding: "0.65rem 1.4rem",
            borderRadius: "10px",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: activeTab === "robots" ? "#6366f1" : "var(--bg-card)",
            color: activeTab === "robots" ? "#ffffff" : "var(--text-main)",
            border: "1px solid " + (activeTab === "robots" ? "#6366f1" : "var(--border-light)")
          }}
        >
          <Shield size={18} /> 2. AI Bot robots.txt Rules
        </button>

        <button
          onClick={() => setActiveTab("validator")}
          className="btn"
          style={{
            padding: "0.65rem 1.4rem",
            borderRadius: "10px",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: activeTab === "validator" ? "#6366f1" : "var(--bg-card)",
            color: activeTab === "validator" ? "#ffffff" : "var(--text-main)",
            border: "1px solid " + (activeTab === "validator" ? "#6366f1" : "var(--border-light)")
          }}
        >
          <CheckCircle size={18} /> 3. Syntax Validator ({validationResult.score}%)
        </button>
      </div>

      {/* TAB 1: llms.txt GENERATOR */}
      {activeTab === "llms" && (
        <div className="grid-2" style={{ gap: "2rem", marginBottom: "3rem" }}>
          {/* Builder Form */}
          <div className="card" style={{ padding: "1.75rem", borderRadius: "14px" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FileCode color="#6366f1" size={20} /> Project & Site Metadata
            </h3>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, fontSize: "0.9rem" }}>
                Website or Project Name *
              </label>
              <input
                type="text"
                className="input-field"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Acme Cloud"
                style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px" }}
              />
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, fontSize: "0.9rem" }}>
                Primary Summary / Tagline (Rendered as Blockquote) *
              </label>
              <input
                type="text"
                className="input-field"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. The fastest developer platform for AI agentic workflows."
                style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px" }}
              />
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                AI models ingest this first to ground what your brand or application does.
              </span>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, fontSize: "0.9rem" }}>
                Context & Overview Paragraph (Optional)
              </label>
              <textarea
                className="input-field"
                rows={2}
                value={contextParagraph}
                onChange={(e) => setContextParagraph(e.target.value)}
                placeholder="Explain the technical context, architecture, or license."
                style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", resize: "vertical" }}
              />
            </div>

            {/* Core Documentation Links */}
            <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1.25rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>
                  Core Documentation Links ({docs.length})
                </h4>
                <button
                  type="button"
                  onClick={() => handleAddDoc(false)}
                  className="btn btn-outline"
                  style={{ padding: "0.3rem 0.65rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <Plus size={14} /> Add Link
                </button>
              </div>

              {docs.map((d) => (
                <div key={d.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-light)", borderRadius: "8px", padding: "0.75rem", marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Link Title (e.g. Getting Started Guide)"
                      value={d.title}
                      onChange={(e) => handleUpdateDoc(d.id, false, "title", e.target.value)}
                      style={{ flex: 1, padding: "0.4rem 0.6rem", fontSize: "0.85rem" }}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteDoc(d.id, false)}
                      style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", padding: "0 0.4rem" }}
                      title="Delete link"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <input
                    type="url"
                    className="input-field"
                    placeholder="Full URL (e.g. https://yoursite.com/docs)"
                    value={d.url}
                    onChange={(e) => handleUpdateDoc(d.id, false, "url", e.target.value)}
                    style={{ width: "100%", padding: "0.4rem 0.6rem", fontSize: "0.85rem", marginBottom: "0.5rem" }}
                  />
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Brief description for LLM reasoning"
                    value={d.description}
                    onChange={(e) => handleUpdateDoc(d.id, false, "description", e.target.value)}
                    style={{ width: "100%", padding: "0.4rem 0.6rem", fontSize: "0.85rem" }}
                  />
                </div>
              ))}
            </div>

            {/* Optional Links */}
            <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>
                  Optional / Secondary Links ({optionalDocs.length})
                </h4>
                <button
                  type="button"
                  onClick={() => handleAddDoc(true)}
                  className="btn btn-outline"
                  style={{ padding: "0.3rem 0.65rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <Plus size={14} /> Add Optional Link
                </button>
              </div>

              {optionalDocs.map((d) => (
                <div key={d.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-light)", borderRadius: "8px", padding: "0.75rem", marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Title"
                      value={d.title}
                      onChange={(e) => handleUpdateDoc(d.id, true, "title", e.target.value)}
                      style={{ flex: 1, padding: "0.4rem 0.6rem", fontSize: "0.85rem" }}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteDoc(d.id, true)}
                      style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", padding: "0 0.4rem" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <input
                    type="url"
                    className="input-field"
                    placeholder="URL"
                    value={d.url}
                    onChange={(e) => handleUpdateDoc(d.id, true, "url", e.target.value)}
                    style={{ width: "100%", padding: "0.4rem 0.6rem", fontSize: "0.85rem", marginBottom: "0.5rem" }}
                  />
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Description"
                    value={d.description}
                    onChange={(e) => handleUpdateDoc(d.id, true, "description", e.target.value)}
                    style={{ width: "100%", padding: "0.4rem 0.6rem", fontSize: "0.85rem" }}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                id="full-ver"
                checked={includeFullVersion}
                onChange={(e) => setIncludeFullVersion(e.target.checked)}
                style={{ cursor: "pointer" }}
              />
              <label htmlFor="full-ver" style={{ fontSize: "0.85rem", color: "var(--text-muted)", cursor: "pointer" }}>
                Add companion pointer for <code style={{ color: "#6366f1" }}>/llms-full.txt</code> (Extended context ingestion)
              </label>
            </div>
          </div>

          {/* Live Preview & Export */}
          <div className="card" style={{ padding: "1.75rem", borderRadius: "14px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>Generated /llms.txt</h3>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  ~{tokenEstimate} tokens | {generatedLlmsTxt.length} characters
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => handleCopy(generatedLlmsTxt, false)}
                  style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                >
                  {copiedLlms ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                  {copiedLlms ? "Copied!" : "Copy Text"}
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleDownload("llms.txt", generatedLlmsTxt)}
                  style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <Download size={16} /> Download llms.txt
                </button>
              </div>
            </div>

            <textarea
              className="input-field"
              readOnly
              value={generatedLlmsTxt}
              style={{
                flex: 1,
                minHeight: "420px",
                fontFamily: "monospace",
                fontSize: "0.88rem",
                lineHeight: 1.5,
                background: "#0f172a",
                color: "#38bdf8",
                border: "1px solid #1e293b",
                borderRadius: "10px",
                padding: "1rem",
                resize: "none"
              }}
            />

            <div style={{ marginTop: "1rem", padding: "0.85rem", background: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.2)", borderRadius: "8px" }}>
              <strong style={{ fontSize: "0.85rem", color: "#6366f1", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.3rem" }}>
                <HelpCircle size={15} /> Where do I place this file?
              </strong>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                Upload this file directly to the root of your public web directory so it is accessible at: 
                <strong style={{ color: "var(--text-main)" }}> https://yourdomain.com/llms.txt</strong>. AI crawlers automatically check this location.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI ROBOTS.TXT CONFIGURATOR */}
      {activeTab === "robots" && (
        <div className="grid-2" style={{ gap: "2rem", marginBottom: "3rem" }}>
          {/* Bot Toggles */}
          <div className="card" style={{ padding: "1.75rem", borderRadius: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>AI Web Crawlers & Bots</h3>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Control which AI agents can scrape or cite your website.</span>
              </div>
            </div>

            {/* Presets */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => applyPreset("allow_all")}
                style={{ fontSize: "0.78rem", padding: "0.35rem 0.65rem", borderColor: "#10b981", color: "#10b981" }}
              >
                Allow All (Best for GEO)
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => applyPreset("search_only")}
                style={{ fontSize: "0.78rem", padding: "0.35rem 0.65rem", borderColor: "#f59e0b", color: "#f59e0b" }}
              >
                Allow Search Only (Block Training)
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => applyPreset("block_all")}
                style={{ fontSize: "0.78rem", padding: "0.35rem 0.65rem", borderColor: "#ef4444", color: "#ef4444" }}
              >
                Disallow All AI
              </button>
            </div>

            <div style={{ maxHeight: "420px", overflowY: "auto", paddingRight: "0.5rem" }}>
              {bots.map((b) => (
                <div key={b.id} style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  padding: "0.75rem", 
                  borderRadius: "8px", 
                  border: "1px solid var(--border-light)", 
                  marginBottom: "0.6rem",
                  background: b.status === "allow" ? "rgba(16, 185, 129, 0.04)" : "rgba(239, 68, 68, 0.04)"
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <strong style={{ fontSize: "0.9rem" }}>{b.name}</strong>
                      <span style={{ 
                        fontSize: "0.7rem", 
                        padding: "0.15rem 0.45rem", 
                        borderRadius: "4px", 
                        background: "rgba(255,255,255,0.06)", 
                        color: "var(--text-muted)" 
                      }}>
                        {b.owner}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0.2rem 0 0 0" }}>
                      {b.purpose}
                    </p>
                  </div>

                  <select
                    className="input-field"
                    value={b.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as "allow" | "disallow";
                      setBots(bots.map(item => item.id === b.id ? { ...item, status: newStatus } : item));
                    }}
                    style={{
                      width: "105px",
                      padding: "0.35rem 0.6rem",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      borderColor: b.status === "allow" ? "#10b981" : "#ef4444",
                      color: b.status === "allow" ? "#10b981" : "#ef4444"
                    }}
                  >
                    <option value="allow">Allow</option>
                    <option value="disallow">Disallow</option>
                  </select>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, fontSize: "0.85rem" }}>
                Standard robots.txt Rules (Appended at Bottom)
              </label>
              <textarea
                className="input-field"
                rows={3}
                value={generalRobotsRules}
                onChange={(e) => setGeneralRobotsRules(e.target.value)}
                style={{ width: "100%", fontFamily: "monospace", fontSize: "0.8rem", padding: "0.5rem" }}
              />
            </div>
          </div>

          {/* Live robots.txt Output */}
          <div className="card" style={{ padding: "1.75rem", borderRadius: "14px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>AI-Ready robots.txt</h3>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Compliant with RFC 9309 & AI Crawler Directives</span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => handleCopy(generatedAiRobotsTxt, true)}
                  style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                >
                  {copiedRobots ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                  {copiedRobots ? "Copied!" : "Copy"}
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleDownload("robots.txt", generatedAiRobotsTxt)}
                  style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <Download size={16} /> Download
                </button>
              </div>
            </div>

            <textarea
              className="input-field"
              readOnly
              value={generatedAiRobotsTxt}
              style={{
                flex: 1,
                minHeight: "420px",
                fontFamily: "monospace",
                fontSize: "0.85rem",
                lineHeight: 1.45,
                background: "#0f172a",
                color: "#a7f3d0",
                border: "1px solid #1e293b",
                borderRadius: "10px",
                padding: "1rem",
                resize: "none"
              }}
            />
          </div>
        </div>
      )}

      {/* TAB 3: SYNTAX VALIDATOR */}
      {activeTab === "validator" && (
        <div style={{ maxWidth: "900px", margin: "0 auto 3rem auto" }}>
          <div className="card" style={{ padding: "2rem", borderRadius: "14px", marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              llms.txt Standard Compliance Auditor
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              Test your current file against the official <a href="https://llmstxt.org" target="_blank" rel="noopener noreferrer" style={{ color: "#6366f1", textDecoration: "underline" }}>llmstxt.org</a> specification.
            </p>

            {/* Score Display */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              padding: "1.25rem", 
              borderRadius: "10px", 
              background: validationResult.score === 100 ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
              border: "1px solid " + (validationResult.score === 100 ? "#10b981" : "#f59e0b"),
              marginBottom: "1.5rem"
            }}>
              <div>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Compliance Score
                </span>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: validationResult.score === 100 ? "#10b981" : "#f59e0b" }}>
                  {validationResult.score}% Compliant
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                {validationResult.score === 100 ? (
                  <span style={{ color: "#10b981", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <CheckCircle size={18} /> Ready for AI Ingestion
                  </span>
                ) : (
                  <span style={{ color: "#f59e0b", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <AlertTriangle size={18} /> Minor Structure Issues Detected
                  </span>
                )}
              </div>
            </div>

            {/* Checkpoints */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-light)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                {validationResult.hasH1 ? <CheckCircle size={18} color="#10b981" /> : <AlertTriangle size={18} color="#ef4444" />}
                <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>H1 Project Name Heading</span>
              </div>
              <div style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-light)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                {validationResult.hasBlockquote ? <CheckCircle size={18} color="#10b981" /> : <AlertTriangle size={18} color="#ef4444" />}
                <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>Blockquote (&gt;) Summary</span>
              </div>
              <div style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-light)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                {validationResult.hasCoreSection ? <CheckCircle size={18} color="#10b981" /> : <AlertTriangle size={18} color="#ef4444" />}
                <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>H2 Core Section Heading</span>
              </div>
              <div style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-light)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                {validationResult.hasLinks ? <CheckCircle size={18} color="#10b981" /> : <AlertTriangle size={18} color="#ef4444" />}
                <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>Markdown Link Syntax</span>
              </div>
            </div>

            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, fontSize: "0.9rem" }}>
              Paste Your Existing llms.txt Below to Audit
            </label>
            <textarea
              className="input-field"
              rows={8}
              placeholder="Paste content here or test the automatically generated preview..."
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              style={{ width: "100%", fontFamily: "monospace", fontSize: "0.85rem", padding: "0.75rem", borderRadius: "8px" }}
            />
            {testText && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setTestText("")}
                style={{ marginTop: "0.5rem", fontSize: "0.8rem", padding: "0.3rem 0.6rem" }}
              >
                Reset to Generator Preview
              </button>
            )}
          </div>
        </div>
      )}

      {/* SEO EDUCATIONAL GUIDE & FAQ */}
      <section style={{ borderTop: "1px solid var(--border-light)", paddingTop: "3rem", marginTop: "2rem" }}>
        <div className="prose" style={{ maxWidth: "860px", margin: "0 auto", color: "var(--text-muted)", lineHeight: 1.7 }}>
          <h2 style={{ color: "var(--text-main)", fontSize: "1.8rem", fontWeight: 800 }}>
            What is an <code style={{ color: "#6366f1" }}>llms.txt</code> file and Why Does Your Website Need One in 2026?
          </h2>
          <p>
            Just as the <code>robots.txt</code> file revolutionized how Googlebot and search engines crawled the web in 1994, 
            the <strong>llms.txt standard</strong> has emerged as the definitive protocol for how Large Language Models (LLMs) like 
            ChatGPT, Perplexity, Claude, and Google Gemini discover and digest website content.
          </p>
          <p>
            Traditional search engine bots crawl messy HTML pages, stripping away navigation bars, pop-up scripts, and CSS styling. 
            However, when an autonomous AI agent or an AI-powered search engine tries to answer a user's question, HTML code consumes 
            massive amounts of token context window. A <code>/llms.txt</code> file solves this problem by serving a clean, 
            lightning-fast markdown summary of your site's core resources and documentation.
          </p>

          <h3 style={{ color: "var(--text-main)" }}>What is Generative Engine Optimization (GEO)?</h3>
          <p>
            <strong>Generative Engine Optimization (GEO)</strong> is the evolution of traditional SEO. While classic SEO aims to get 
            your website ranked among Google's "10 blue links," GEO focuses on ensuring your content, product, or brand is 
            <strong> actively cited, referenced, and recommended inside AI-synthesized responses</strong> on platforms like ChatGPT Search, 
            Perplexity, and Google AI Overviews.
          </p>

          <h3 style={{ color: "var(--text-main)" }}>How to Deploy Your llms.txt File in 3 Steps:</h3>
          <ol>
            <li><strong>Generate your file</strong> using the builder above. Add your project name, a clear single-sentence summary, and direct links to your best articles or documentation.</li>
            <li><strong>Download the file</strong> as <code>llms.txt</code>.</li>
            <li><strong>Upload it to your server root directory</strong> (e.g. <code>public/llms.txt</code> in Next.js or the root folder in WordPress / Apache). Verify it by visiting <code>https://yourdomain.com/llms.txt</code> in your browser.</li>
          </ol>

          <h3 style={{ color: "var(--text-main)" }}>Should You Block or Allow AI Bots in robots.txt?</h3>
          <p>
            In 2026, the answer depends entirely on your business model:
          </p>
          <ul>
            <li><strong>Allow (Recommended for Traffic & Discovery):</strong> Permitting crawlers like <code>ChatGPT-User</code> and <code>PerplexityBot</code> ensures your content appears as a clickable source citation when millions of users ask questions daily.</li>
            <li><strong>Disallow (Recommended for Proprietary IP):</strong> If your business relies strictly on proprietary datasets or paid courses, disallowing <code>GPTBot</code> and <code>CCBot</code> prevents your original content from being ingested into foundation training weights without attribution.</li>
          </ul>

          <h3 style={{ color: "var(--text-main)" }}>Frequently Asked Questions</h3>
          <p><strong>Is llms.txt an official web standard?</strong> Yes. Spearheaded by fast.ai and adopted by thousands of modern developer tools, documentation repositories, and AI startups, <code>llms.txt</code> is supported across the open-source LLM ecosystem.</p>
          <p><strong>Does having an llms.txt file hurt traditional Google SEO?</strong> No. Search engines view <code>llms.txt</code> as a standard text asset. In fact, providing clean structured metadata can enhance your entity graph and improve citation accuracy in Google AI Overviews.</p>
          <p><strong>How often should I update my llms.txt?</strong> Update it whenever you publish major new features, launch flagship pillar articles, or deprecate old endpoints.</p>
        </div>
      </section>
    </div>
  );
}
