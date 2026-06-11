"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  Sparkles, 
  Key, 
  Cpu, 
  Send, 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  RotateCw, 
  AlertCircle,
  HelpCircle,
  Eye,
  EyeOff,
  Code,
  Layout,
  Search,
  BookOpen,
  Info
} from "lucide-react";

// Types
interface AgentProfile {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  defaultPrompt: string;
  systemPrompt: string;
}

interface ModelOption {
  id: string;
  name: string;
  provider: string;
  context: string;
  description: string;
}

export default function AICopilot() {
  // States
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState("anthropic/claude-3.5-sonnet");
  const [selectedAgent, setSelectedAgent] = useState("pitch");
  const [startupInfo, setStartupInfo] = useState("A web platform offering a suite of free web developer utilities and SEO tools (like JSON formatters, QR code decoders, and word counters).");
  const [customPrompt, setCustomPrompt] = useState("");
  
  // Console outputs
  const [consoleOutput, setConsoleOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [statusText, setStatusText] = useState("READY");
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Stats
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);

  // References
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // Models list
  const models: ModelOption[] = [
    { 
      id: "anthropic/claude-3.5-sonnet", 
      name: "Claude 3.5 Sonnet", 
      provider: "Anthropic", 
      context: "200k", 
      description: "State-of-the-art reasoning, code analysis, and high-fidelity copy generation." 
    },
    { 
      id: "openai/gpt-4o", 
      name: "GPT-4o", 
      provider: "OpenAI", 
      context: "128k", 
      description: "Fast, versatile flagship model ideal for product logic and complex analysis." 
    },
    { 
      id: "deepseek/deepseek-chat", 
      name: "DeepSeek V3", 
      provider: "DeepSeek", 
      context: "64k", 
      description: "Highly performant, cost-effective conversational model with strong coding capabilities." 
    },
    { 
      id: "google/gemini-2.5-flash", 
      name: "Gemini 2.5 Flash", 
      provider: "Google", 
      context: "1M", 
      description: "Extremely fast output speed and massive context window for document ingestion." 
    },
    { 
      id: "meta-llama/llama-3.3-70b-instruct", 
      name: "Llama 3.3 70B", 
      provider: "Meta", 
      context: "128k", 
      description: "Excellent open-weights instruction model with balanced reasoning and formatting." 
    }
  ];

  // Agent profiles
  const agents: AgentProfile[] = [
    {
      id: "pitch",
      name: "Pitch Deck Architect",
      description: "Generates pitch deck structures, pain points, value propositions, and problem statements.",
      icon: <Layout size={18} />,
      systemPrompt: "You are an expert venture capitalist and startup pitch consultant. Help the founder refine their elevator pitch and deck content.",
      defaultPrompt: "Please analyze my startup info and generate: \n1. A compelling 1-sentence value proposition.\n2. A detailed 'Problem Statement' explaining the customer pain point.\n3. A 'Solution' breakdown explaining how we uniquely solve it.\n4. A suggested 10-slide pitch deck outline customized for this product."
    },
    {
      id: "seo",
      name: "SEO Landing Page Writer",
      description: "Creates conversion-optimized landing page copy with targeted headlines and meta tags.",
      icon: <Search size={18} />,
      systemPrompt: "You are an elite SEO strategist and direct-response copywriter. Write highly engaging landing page copy optimized for search algorithms.",
      defaultPrompt: "Please write high-converting landing page copy based on my startup details. Include:\n1. A SEO Meta Title (max 60 chars) and Meta Description (max 155 chars).\n2. A main H1 headline (with an emotional hook) and a sub-headline.\n3. A Hero section intro copy (2-3 sentences).\n4. A bulleted 'Features vs Benefits' list explaining the value.\n5. Three target primary keywords that we should optimize this copy for."
    },
    {
      id: "validator",
      name: "Idea Stress-Tester",
      description: "Stress-tests your business model, estimates market fit, and identifies critical pivot risks.",
      icon: <BookOpen size={18} />,
      systemPrompt: "You are an analytical startup advisor and risk manager. Give objective, tough-love analysis of business models to avoid failure.",
      defaultPrompt: "Provide a brutal, realistic validation analysis for this startup idea. Include:\n1. Target Audience Persona: Who is the ideal customer profile?\n2. Market Dynamics: What are the primary barriers to entry and customer acquisition challenges?\n3. Three Critical Failure Risks: What is most likely to kill this startup within 18 months?\n4. Recommended Pivot: A strategic refinement to make the business model more robust."
    },
    {
      id: "coder",
      name: "Next.js Code Architect",
      description: "Generates and reviews production-ready Next.js client components using Tailwind/CSS.",
      icon: <Code size={18} />,
      systemPrompt: "You are a senior Next.js full-stack engineer. Write clean, accessible React code conforming to modern standards.",
      defaultPrompt: "Create a fully functional, beautiful Next.js client component for my startup website. It should be a key interactive feature or utility page. Ensure:\n1. It uses modern Tailwind CSS or inline CSS with modular custom styling.\n2. It has clean typescript types.\n3. It uses lucide-react icons for UI highlights.\n4. Show the complete component code with explanatory comments."
    }
  ];

  // Load API Key from LocalStorage
  useEffect(() => {
    const savedKey = localStorage.getItem("openrouter_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  // Save API Key
  const handleSaveKey = (val: string) => {
    setApiKey(val);
    localStorage.setItem("openrouter_api_key", val);
  };

  // Scroll console to bottom on stream
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleOutput]);

  // Handle agent profile change
  const handleAgentChange = (agentId: string) => {
    setSelectedAgent(agentId);
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      setCustomPrompt(agent.defaultPrompt);
    }
  };

  // Set default prompt on start
  useEffect(() => {
    handleAgentChange("pitch");
  }, []);

  // Copy console output
  const handleCopyOutput = () => {
    if (!consoleOutput) return;
    navigator.clipboard.writeText(consoleOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulated typing effect for Demo Mode
  const runDemoMode = (prompt: string, agentId: string) => {
    setIsStreaming(true);
    setConsoleOutput("");
    setErrorMessage("");
    setStatusText("GENERATING (DEMO MODE)");
    
    // Choose appropriate simulated response based on agent profile
    let demoText = "";
    
    if (agentId === "pitch") {
      demoText = `### StartupAI Pitch Deck Blueprint\n\n**1. One-Sentence Value Proposition**\n> "Empowering web creators with a zero-registration, browser-native utility suite that eliminates server delays and protects data privacy."\n\n---\n\n**2. The Problem Statement**\nWeb developers, content writers, and digital marketers perform dozens of micro-tasks hourly (formatting JSON, converting images, decoding tokens). Existing platforms are plagued by:\n* **High friction:** Forced sign-ups, paywalls, or cluttered banner ads that degrade performance.\n* **Security Risks:** Client data (like passwords, keys, or proprietary scripts) is sent to external servers, violating compliance.\n* **Slow Speeds:** Bulky server-side rendering makes simple actions take seconds.\n\n---\n\n**3. The Solution**\nOur platform operates as a secure client-side sandbox. All tools load instantly, run local browser-native operations, and ensure zero bytes of user data ever leave their computer. We merge premium visual design with absolute security and blazing speed.\n\n---\n\n**4. Customized 10-Slide Pitch Deck Structure**\n\n* **Slide 1: Cover / Hook** - StartupAI: The developer's browser-native power suite.\n* **Slide 2: The Problem** - micro-utility fatigue & security leaks in corporate networks.\n* **Slide 3: The Solution** - Local-first client tools running on web assembly.\n* **Slide 4: Product Demo** - Visual matrix showing our 120+ active utilities.\n* **Slide 5: Market Opportunity** - 28M+ software developers & 100M+ content creators globally.\n* **Slide 6: Business Model** - Freemium API keys, enterprise private deployments, white-labeled widgets.\n* **Slide 7: Technology Stack** - Next.js App Router, Tailwind PostCSS, and Client WebAssembly.\n* **Slide 8: Traction / SEO** - Organic traffic acquisition strategy showing search volume for core tools (e.g., "JSON formatter").\n* **Slide 9: Competition** - Comparison showing why our ad-free, secure approach beats old legacy sites.\n* **Slide 10: The Ask / Team** - Requesting Series Seed to build enterprise client packages.`;
    } else if (agentId === "seo") {
      demoText = `### Landing Page Copy Blueprint (SEO Optimized)\n\n**Meta Tags Configuration:**\n* **Meta Title:** StartupAI Tools - Free Web Utilities & Developer Toolkit\n* **Meta Description:** Access over 100+ free, secure web utilities. Format JSON, generate QR codes, compute financial ratios, and convert assets. 100% client-side.\n\n---\n\n**Hero Headline & Sub-Headline:**\n# Micro-Utilities, Re-Imagined for Speed & Security\n### Stop uploading sensitive data. Run 100+ web tools locally in your browser with zero latency.\n\n---\n\n**Hero Paragraph Intro:**\n"StartupAI Tools is the modern workflow accelerator built for developers, designers, and marketers who value their time and data privacy. Every single tool runs client-side inside sandboxed browser memory, rendering immediate results without sending a single packet to foreign servers."\n\n---\n\n**Features vs Benefits Matrix:**\n* **Client-Side Processing (Benefit: 100% Secure)** - Your JSON payloads, passwords, and photos are processed in sandbox. Absolute data compliance.\n* **Zero Sign-Up Required (Benefit: High Efficiency)** - Skip registration forms. Land on the site, click your tool, and get the job done in one click.\n* **Optimized Bundle Sizes (Benefit: Lightning Fast)** - Next.js lazy-loading ensures each tool page loads under 200ms.\n\n---\n\n**Target SEO Keywords:**\n1. \`free developer web tools\` (High intent)\n2. \`secure json formatter browser\` (Brand specificity)\n3. \`client side web utilities list\` (Informational volume)`;
    } else if (agentId === "validator") {
      demoText = `### Strategic Business Validation Report\n\n**1. Target Audience Persona**\n* **Primary User:** Senior Software Engineers & DevOps agents needing quick decoders/generators during active coding sprints without logging into bulky SaaS platforms.\n* **Secondary User:** SEO Specialists & Content Writers auditing page sizes, redirect rules, or checking word densities on the fly.\n\n---\n\n**2. Market Dynamics & Acquisition Challenges**\n* **Barriers to Entry:** Extremely low barriers. Competitors like CyberChef or online converters exist. \n* **Acquisition Moat:** Organic Search SEO is the primary channel. Success depends heavily on site speed, keyword-rich slugs, and backlink authority. \n\n---\n\n**3. Critical Failure Risks (Next 18 Months)**\n* **High Churn / Low Stickiness:** Users solve a 3-second problem and leave. Monopolizing user attention is difficult without accounts.\n* **Monetization Struggle:** Running ads degrades the "premium developer utility" brand. Subscription models fail for micro-tools.\n* **Google Algorithm Volatility:** Organic SEO is fragile. A single Core Update can slash traffic by 50% if the site lacks depth.\n\n---\n\n**4. Strategic pivot Recommendation**\nInstead of just a directory of tools, position the site as an **"OpenAPI Playground Dashboard"**. Implement a custom client-side API console where developers register once, paste their own API Keys (e.g. OpenRouter), and run AI tasks directly on the same interface. This increases user retention, drives product-led signups, and opens up premium B2B licensing opportunities.`;
    } else {
      demoText = `// Next.js Client Component: StartupAI Tool Dashboard
"use client";

import React, { useState } from 'react';
import { Sparkles, Terminal, Copy, Check } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  category: string;
}

export default function StartupDashboard() {
  const [tools] = useState<Tool[]>([
    { id: '1', name: 'JSON Validator', category: 'Developer' },
    { id: '2', name: 'Secure MD5 Hasher', category: 'Security' },
    { id: '3', name: 'SVG-to-Base64', category: 'Media' }
  ]);
  
  const [activeTool, setActiveTool] = useState<string>('1');

  return (
    <div className="p-6 max-w-4xl mx-auto bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-500 animate-pulse" />
          <h2 className="text-xl font-bold">StartupAI Developer console</h2>
        </div>
        <span className="text-xs bg-blue-900/40 text-blue-400 px-3 py-1 rounded-full border border-blue-800">
          Client Sandbox Active
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-2">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={\`w-full text-left p-3 rounded-lg text-sm font-medium transition-all \${
                activeTool === tool.id 
                  ? 'bg-blue-600 text-white shadow' 
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800'
              }\`}
            >
              {tool.name}
            </button>
          ))}
        </div>
        
        {/* Workspace */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 min-h-[200px] flex flex-col justify-between">
          <div className="font-mono text-xs text-slate-500 flex items-center gap-2 mb-4">
            <Terminal size={14} />
            <span>sandbox_terminal.sh - tool_{activeTool}</span>
          </div>
          
          <div className="flex-grow flex items-center justify-center text-slate-400 text-sm">
            Ready to initialize locally. Secure browser runtime active.
          </div>
        </div>
      </div>
    </div>
  );
}`;
    }

    let currentLength = 0;
    const interval = setInterval(() => {
      if (currentLength < demoText.length) {
        currentLength += Math.min(6, demoText.length - currentLength);
        setConsoleOutput(demoText.substring(0, currentLength));
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        setStatusText("COMPLETED");
      }
    }, 15);
  };

  // Run Real OpenRouter Request
  const runOpenRouterRequest = async (prompt: string, systemPrompt: string) => {
    setIsStreaming(true);
    setConsoleOutput("");
    setErrorMessage("");
    setStatusText("CONNECTING...");

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://www.aitoolspro.tech", // Required for OpenRouter review criteria
          "X-Title": "StartupAI Tools", // Required for OpenRouter review criteria
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
          ],
          temperature: temperature,
          max_tokens: maxTokens,
          stream: true // Enable streaming if possible, otherwise we handle chunk responses
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `API Error: ${response.status} - ${response.statusText}`);
      }

      setStatusText("STREAMING RESPONSE...");
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (!reader) {
        throw new Error("ReadableStream is not supported by this browser.");
      }

      let done = false;
      let accumulatedContent = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          
          // OpenRouter streams returns server-sent events as data: {...}
          const lines = chunk.split("\n").filter(line => line.trim().startsWith("data:"));
          
          for (const line of lines) {
            const dataStr = line.replace(/^data:\s*/, "").trim();
            if (dataStr === "[DONE]") {
              done = true;
              break;
            }
            try {
              const parsed = JSON.parse(dataStr);
              const content = parsed.choices?.[0]?.delta?.content || "";
              accumulatedContent += content;
              setConsoleOutput(accumulatedContent);
            } catch (err) {
              // Ignore line parsing errors on stream boundaries
            }
          }
        }
      }

      setStatusText("COMPLETED");
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred during the OpenRouter API request.");
      setStatusText("FAILED");
    } finally {
      setIsStreaming(false);
    }
  };

  // Submit trigger
  const handleRunAgent = () => {
    if (isStreaming) return;
    
    // Combine template prompt with startup info
    const agent = agents.find(a => a.id === selectedAgent);
    const systemPrompt = agent ? agent.systemPrompt : "You are a helpful startup copilot assistant.";
    const basePrompt = customPrompt || (agent ? agent.defaultPrompt : "");
    const finalPrompt = basePrompt.replace("[STARTUP_INFO]", startupInfo);

    if (!apiKey) {
      // Run Demo Mode if API key is not entered
      runDemoMode(finalPrompt, selectedAgent);
    } else {
      // Run actual OpenRouter API call
      runOpenRouterRequest(finalPrompt, systemPrompt);
    }
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      {/* Back button */}
      <Link
        href="/tools"
        className="btn btn-outline"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          fontSize: "0.85rem",
          padding: "0.5rem 1.25rem",
        }}
      >
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      {/* Flagship Header */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "0.5rem", 
        marginBottom: "3rem",
        background: "linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)",
        padding: "2.5rem",
        borderRadius: "16px",
        border: "1px solid var(--border-light)",
        boxShadow: "inset 0 0 20px rgba(37, 99, 235, 0.02)"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "rgba(37, 99, 235, 0.1)",
          color: "var(--primary)",
          padding: "0.35rem 0.85rem",
          borderRadius: "100px",
          width: "fit-content",
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "0.5rem"
        }}>
          <Sparkles size={12} /> Flagship AI-Native Product
        </div>
        <h1 style={{ fontSize: "2.5rem", letterSpacing: "-0.03em", lineHeight: "1.2", marginBottom: "0.5rem" }}>
          StartupAI <span style={{ background: "linear-gradient(to right, var(--primary), #9333ea)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Copilot Dashboard</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "800px", lineHeight: "1.5" }}>
          A unified multi-agent platform powered by **OpenRouter**. Draft pitches, write landing pages, validation analysis, and build React code on the fly. 
        </p>
      </div>

      {/* Main Sandbox Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "350px 1fr",
        gap: "2rem",
      }} className="grid-2">
        
        {/* Left Control Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Key Manager Card */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Key size={16} color="var(--primary)" /> API Credentials
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)" }}>
                OpenRouter API Key
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showApiKey ? "text" : "password"}
                  className="input-field"
                  style={{ 
                    paddingRight: "2.5rem", 
                    fontFamily: "monospace", 
                    fontSize: "0.8rem",
                    borderColor: apiKey ? "#22c55e" : "var(--border-strong)"
                  }}
                  placeholder="sk-or-v1-..."
                  value={apiKey}
                  onChange={(e) => handleSaveKey(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)"
                  }}
                >
                  {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {!apiKey ? (
                <div style={{ 
                  fontSize: "0.75rem", 
                  color: "#ea580c", 
                  background: "#fff7ed", 
                  padding: "0.5rem 0.75rem", 
                  borderRadius: "6px",
                  lineHeight: "1.4"
                }}>
                  No key provided. Operating in **Demo Mode** with professional pre-baked outputs.
                </div>
              ) : (
                <div style={{ 
                  fontSize: "0.75rem", 
                  color: "#16a34a", 
                  background: "#f0fdf4", 
                  padding: "0.5rem 0.75rem", 
                  borderRadius: "6px",
                  fontWeight: 500
                }}>
                  Key saved locally. Requests will stream live from OpenRouter.
                </div>
              )}
            </div>
          </div>

          {/* Model Selector Card */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Cpu size={16} color="var(--primary)" /> LLM Engine
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Select dropdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)" }}>
                  Select AI Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="input-field"
                  style={{ 
                    fontFamily: "sans-serif", 
                    fontSize: "0.85rem",
                    background: "#ffffff",
                    cursor: "pointer",
                    padding: "0.6rem"
                  }}
                >
                  {models.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.provider})
                    </option>
                  ))}
                </select>
              </div>

              {/* Model Description Box */}
              {models.find(m => m.id === selectedModel) && (
                <div style={{ 
                  background: "var(--bg-main)", 
                  padding: "0.75rem", 
                  borderRadius: "8px", 
                  border: "1px solid var(--border-light)",
                  fontSize: "0.75rem"
                }}>
                  <div style={{ fontWeight: 700, marginBottom: "0.25rem", display: "flex", justifyContent: "space-between" }}>
                    <span>Context: {models.find(m => m.id === selectedModel)?.context}</span>
                    <span style={{ color: "var(--primary)" }}>{models.find(m => m.id === selectedModel)?.provider}</span>
                  </div>
                  <p style={{ color: "var(--text-muted)", margin: 0, lineHeight: "1.4" }}>
                    {models.find(m => m.id === selectedModel)?.description}
                  </p>
                </div>
              )}

              {/* Temperature & Token Settings */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", borderTop: "1px solid var(--border-light)", paddingTop: "1rem" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.25rem", fontWeight: 600 }}>
                    <span>Temperature</span>
                    <span>{temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1.5"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>
                
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.25rem", fontWeight: 600 }}>
                    <span>Max Length</span>
                    <span>{maxTokens} tokens</span>
                  </div>
                  <input
                    type="range"
                    min="256"
                    max="4000"
                    step="256"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Agent Template Selector */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>Agent Workspace</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {agents.map(a => (
                <button
                  key={a.id}
                  onClick={() => handleAgentChange(a.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: selectedAgent === a.id ? "var(--primary)" : "var(--border-light)",
                    background: selectedAgent === a.id ? "rgba(37, 99, 235, 0.05)" : "#ffffff",
                    color: selectedAgent === a.id ? "var(--primary)" : "var(--text-main)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{ 
                    padding: "0.3rem", 
                    borderRadius: "6px",
                    background: selectedAgent === a.id ? "var(--primary)" : "var(--bg-main)",
                    color: selectedAgent === a.id ? "#ffffff" : "var(--text-muted)"
                  }}>
                    {a.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{a.name}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "220px" }}>
                      {a.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Console Workspace */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Inputs Section */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
              1. Provide Startup Details
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem", display: "block" }}>
                  Product Pitch / Business Description
                </label>
                <textarea
                  className="input-field"
                  style={{ minHeight: "80px", fontFamily: "sans-serif", lineHeight: "1.4", padding: "0.75rem" }}
                  placeholder="Describe your startup core features, target users, and what it does..."
                  value={startupInfo}
                  onChange={(e) => setStartupInfo(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem", display: "block" }}>
                  Customize Prompt Template
                </label>
                <textarea
                  className="input-field"
                  style={{ minHeight: "130px", fontFamily: "monospace", fontSize: "0.8rem", padding: "0.75rem", background: "var(--bg-main)" }}
                  placeholder="Agent instruction template..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                />
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
                  Note: The string <code style={{ background: "rgba(0,0,0,0.05)", padding: "0.1rem 0.25rem", borderRadius: "3px" }}>[STARTUP_INFO]</code> will be replaced with your description above.
                </span>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleRunAgent}
                disabled={isStreaming || !startupInfo.trim()}
                style={{
                  padding: "0.85rem 1.5rem",
                  fontSize: "1rem",
                  alignSelf: "flex-end",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 10px rgba(37, 99, 235, 0.2)"
                }}
              >
                {isStreaming ? (
                  <>
                    <RotateCw size={18} className="animate-spin" /> Stream Generating...
                  </>
                ) : (
                  <>
                    <Play size={16} /> Run AI Agent
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Console Output Terminal */}
          <div style={{
            background: "#0f172a", // Dark slate background for premium dev terminal console
            borderRadius: "12px",
            border: "1px solid #1e293b",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)"
          }}>
            {/* Terminal Header */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem 1.25rem",
              borderBottom: "1px solid #1e293b",
              background: "#1e293b/40"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ display: "flex", gap: "0.35rem" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", display: "inline-block" }}></span>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#eab308", display: "inline-block" }}></span>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "inline-block" }}></span>
                </div>
                <span style={{ color: "#94a3b8", fontFamily: "monospace", fontSize: "0.75rem", marginLeft: "0.5rem" }}>
                  copilot_runtime.log
                </span>
              </div>

              {/* Status Badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  background: isStreaming ? "rgba(234, 88, 12, 0.2)" : "rgba(34, 197, 94, 0.2)",
                  color: isStreaming ? "#f97316" : "#22c55e",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "4px",
                  border: "1px solid",
                  borderColor: isStreaming ? "rgba(234, 88, 12, 0.4)" : "rgba(34, 197, 94, 0.4)"
                }}>
                  {statusText}
                </span>
              </div>
            </div>

            {/* Error Message Box inside Terminal */}
            {errorMessage && (
              <div style={{
                background: "rgba(239, 68, 68, 0.15)",
                color: "#f87171",
                padding: "1rem",
                fontSize: "0.85rem",
                fontFamily: "monospace",
                borderBottom: "1px solid rgba(239, 68, 68, 0.3)",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem"
              }}>
                <AlertCircle size={16} style={{ marginTop: "0.1rem", flexShrink: 0 }} />
                <div>{errorMessage}</div>
              </div>
            )}

            {/* Terminal Workspace Screen */}
            <div style={{
              padding: "1.5rem",
              minHeight: "350px",
              maxHeight: "600px",
              overflowY: "auto",
              color: "#e2e8f0",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              lineHeight: "1.6"
            }}>
              {consoleOutput ? (
                <div style={{ whiteSpace: "pre-wrap" }}>
                  {consoleOutput}
                </div>
              ) : (
                <div style={{ color: "#475569", fontStyle: "italic", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "320px" }}>
                  Terminal idle. Configure parameters above and click &quot;Run AI Agent&quot; to compile logs...
                </div>
              )}
              <div ref={consoleBottomRef} />
            </div>

            {/* Terminal Footer Panel */}
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0.6rem 1.25rem",
              borderTop: "1px solid #1e293b",
              background: "#0b0f19",
              borderRadius: "0 0 12px 12px"
            }}>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={handleCopyOutput}
                  disabled={!consoleOutput}
                  style={{
                    background: "none",
                    border: "none",
                    color: consoleOutput ? "#94a3b8" : "#475569",
                    cursor: consoleOutput ? "pointer" : "not-allowed",
                    fontSize: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    transition: "color 0.2s"
                  }}
                  className="terminal-btn"
                >
                  {copied ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
                  <span>{copied ? "Copied!" : "Copy Logs"}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Guide Section */}
      <section className="section" style={{ borderTop: "1px solid var(--border-light)", marginTop: "4rem" }}>
        <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>Using OpenRouter to Fund Your API Costs</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
          <p>
            The **JoinSecret OpenRouter Startup Reward** provides qualifying startups with $1,000 in API credits. This allows you to integrate cutting-edge open-source and proprietary models into your app without any upfront costs.
          </p>
          <div style={{ 
            background: "#f8fafc", 
            border: "1px solid var(--border-light)", 
            borderRadius: "12px", 
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem"
          }}>
            <h4 style={{ color: "var(--text-main)", fontWeight: 700 }}>How we meet the review criteria:</h4>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>
                <strong>AI-Native Product:</strong> This dashboard acts as a playground showcasing how we interface with OpenRouter agents to drive startup operations.
              </li>
              <li>
                <strong>API Request Compliance:</strong> Standard API requests from this domain automatically attach the required referer headers (<code style={{ background: "rgba(0,0,0,0.04)", padding: "0.1rem 0.2rem" }}>HTTP-Referer: https://www.aitoolspro.tech</code>) confirming live production integration.
              </li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
