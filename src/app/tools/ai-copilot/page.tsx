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
  Eye,
  EyeOff,
  Code,
  Layout,
  Search,
  BookOpen,
  Calendar,
  ClipboardList,
  MessageSquare,
  Lightbulb,
  FileText
} from "lucide-react";

// Types
interface ModelOption {
  id: string;
  name: string;
  provider: string;
  context: string;
  description: string;
}

export default function ZenNoteDashboard() {
  // Credentials & Settings
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState("anthropic/claude-3.5-sonnet");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2500);

  // Inputs
  const [brainDump, setBrainDump] = useState(
    "need to call plumbing company at 2pm about leak, email my team about rescheduling the meeting to friday at 10, buy almond milk and apples, what can i make tonight with chicken and spinach? also tell sarah i can't make it to her dinner party because i have a late call."
  );

  // States for generation
  const [isStreaming, setIsStreaming] = useState(false);
  const [statusText, setStatusText] = useState("READY");
  const [consoleOutput, setConsoleOutput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Console Tab & Parsing States
  const [activeTab, setActiveTab] = useState<"console" | "tasks" | "drafts" | "routine" | "insights">("console");
  const [tasksList, setTasksList] = useState<{ id: string; text: string; done: boolean }[]>([]);
  const [draftsContent, setDraftsContent] = useState("");
  const [routineContent, setRoutineContent] = useState("");
  const [insightsContent, setInsightsContent] = useState("");
  const [copiedDrafts, setCopiedDrafts] = useState(false);
  const [copiedRoutine, setCopiedRoutine] = useState(false);
  const [copiedInsights, setCopiedInsights] = useState(false);

  // References
  const terminalScrollRef = useRef<HTMLDivElement>(null);

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

  // Presets load
  const loadPreset = (type: "professional" | "developer") => {
    if (type === "professional") {
      setBrainDump(
        "need to call plumbing company at 2pm about leak, email my team about rescheduling the meeting to friday at 10, buy almond milk and apples, what can i make tonight with chicken and spinach? also tell sarah i can't make it to her dinner party because i have a late call."
      );
    } else {
      setBrainDump(
        "fix the typescript type error in Header.tsx component, email the client that the landing page mockup is ready but we need feedback on color scheme, remember to pay the internet bill by tonight, search for a quick workout routine for back pain, also review index.css rules."
      );
    }
  };

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

  // Inner scroll log container only
  useEffect(() => {
    if (isStreaming && terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [consoleOutput, isStreaming]);

  // Helper to extract tag contents
  const extractTagContent = (text: string, tag: string) => {
    const startTag = `[${tag}]`;
    const endTag = `[/${tag}]`;
    const startIndex = text.indexOf(startTag);
    const endIndex = text.indexOf(endTag);
    if (startIndex === -1 || endIndex === -1) return "";
    return text.substring(startIndex + startTag.length, endIndex).trim();
  };

  // Parse output once completed
  const parseOutputs = (rawText: string) => {
    // 1. Parse tasks
    const tasksRaw = extractTagContent(rawText, "TASKS");
    const tasksParsed = tasksRaw
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.startsWith("- [ ]") || line.startsWith("- [x]") || line.startsWith("*") || line.startsWith("-"))
      .map((line, idx) => {
        // Clean line markers
        const cleanText = line
          .replace(/^-\s*\[\s*[x ]\s*\]/, "")
          .replace(/^-\s*/, "")
          .replace(/^\*\s*/, "")
          .trim();
        return {
          id: `task-${idx}`,
          text: cleanText,
          done: line.includes("[x]")
        };
      });
    setTasksList(tasksParsed.length > 0 ? tasksParsed : []);

    // 2. Parse drafts
    const draftsParsed = extractTagContent(rawText, "DRAFTS");
    setDraftsContent(draftsParsed);

    // 3. Parse routine
    const routineParsed = extractTagContent(rawText, "ROUTINE");
    setRoutineContent(routineParsed);

    // 4. Parse insights
    const insightsParsed = extractTagContent(rawText, "INSIGHTS");
    setInsightsContent(insightsParsed);
  };

  // Toggle tasks completion locally
  const toggleTask = (taskId: string) => {
    setTasksList(prev => 
      prev.map(t => t.id === taskId ? { ...t, done: !t.done } : t)
    );
  };

  // System Prompt instructing model to output structured blocks
  const systemPrompt = `You are ZenNote AI, a daily cognitive assistant. 
Analyze the user's messy daily brain dump (unstructured thoughts, quick notes, draft requests, and questions).
Organize them into structured sections using exactly the following block tags:

[TASKS]
Provide a clean bulleted checklist of tasks. Write each as:
- [ ] Task description
[/TASKS]

[DRAFTS]
Write out fully drafted emails, chat responses, or texts requested. Format with headings, e.g., '### Draft 1: Email to Team'. If no drafts requested, write: 'No drafts needed.'
[/DRAFTS]

[ROUTINE]
Generate a logical, chronological daily routine or time-blocked schedule incorporating the tasks. Use bullet points.
[/ROUTINE]

[INSIGHTS]
Give quick answers to any questions (e.g. recipes, tips, code analysis). Provide helpful details.
[/INSIGHTS]

Before the tag blocks, you may output a short <thought>...</thought> section detailing your reasoning analysis. 
Do not omit the tags under any circumstances. Ensure all content fits inside these blocks.`;

  // Simulated Streaming for Demo Mode
  const runDemoMode = (type: "professional" | "developer") => {
    setIsStreaming(true);
    setConsoleOutput("");
    setErrorMessage("");
    setStatusText("THINKING");
    setActiveTab("console");

    let demoText = "";

    if (type === "professional") {
      demoText = `<thought>
Analyzing brain-dump...
- Identified tasks: Call plumbing company (2:00 PM), buy almond milk/apples.
- Identified emails/messages: Reschedule meeting email to team, dinner cancellation message to Sarah.
- Identified question: Recipe ideas using chicken and spinach.
- Synthesizing schedule...
- Compiling cooking tips...
</thought>

[TASKS]
- [ ] Call plumbing company about water leak (Scheduled for 2:00 PM)
- [ ] Send meeting reschedule email to team (Friday at 10:00 AM)
- [ ] Stop at store for almond milk and fresh apples
- [ ] Send dinner cancellation text message to Sarah
[/TASKS]

[DRAFTS]
### Draft 1: Email to Team (Reschedule Meeting)
**Subject:** Rescheduling team sync to Friday at 10:00 AM
**Body:**
Hi Team,

I'd like to reschedule our upcoming meeting to Friday, June 12th, at 10:00 AM due to a schedule conflict. Please let me know if this slot works for everyone.

Best regards,
[Your Name]

### Draft 2: SMS to Sarah (Dinner Party)
**Body:**
Hi Sarah! I'm so sorry, but I won't be able to make it to dinner tonight. I have a late call scheduled that I can't push back. Let's catch up and reschedule next week!
[/DRAFTS]

[ROUTINE]
* **09:00 AM** - Review agenda and start work
* **10:00 AM** - Send meeting reschedule email to team
* **02:00 PM** - Call plumbing company to schedule leak inspection
* **05:30 PM** - Stop by grocery store for almond milk and apples
* **06:00 PM** - Text Sarah dinner cancellation
* **07:00 PM** - Prepare dinner (Chicken & Spinach Stir-Fry)
[/ROUTINE]

[INSIGHTS]
### Quick Recipe: Garlic Chicken & Spinach Stir-Fry
Here is a fast, healthy dinner recipe using chicken and spinach:

* **Ingredients:** Chicken breast (cubed), Fresh spinach leaves, 2 cloves Garlic (minced), Soy sauce, Olive oil, Pepper.
* **Directions:**
  1. Heat olive oil in a skillet over medium-high heat. Add minced garlic and sauté for 1 minute.
  2. Add cubed chicken breast, season with pepper, and cook until golden brown (6-8 minutes).
  3. Toss in the fresh spinach leaves and a splash of soy sauce.
  4. Stir constantly for 2 minutes until the spinach wilts. Serve over rice or eat as is!
[/INSIGHTS]`;
    } else {
      demoText = `<thought>
Analyzing developer brain-dump...
- Identified code tasks: Fix typescript error in Header.tsx, review index.css rules.
- Identified client email: Project mockup ready, ask for color scheme feedback.
- Identified chore: Pay internet bill.
- Identified health search: Workout routine for back pain.
- Generating developer timeline...
- Compiling back exercises...
</thought>

[TASKS]
- [ ] Debug Typescript type error in Header.tsx component
- [ ] Send project mockup update email to client
- [ ] Pay the internet bill (Due tonight!)
- [ ] Perform quick back stretches for lumbar pain relief
- [ ] Review styling layout rules in index.css
[/TASKS]

[DRAFTS]
### Draft 1: Email to Client (Landing Page Feedback)
**Subject:** Landing Page Mockup Ready - StartupAI Project
**Body:**
Hi [Client Name],

I'm excited to share that the landing page mockup is ready for your review! You can view it live in the preview branch. 

Could you take a look and share your thoughts? In particular, we would love your feedback on the color scheme and typography choice.

Best,
[Your Name]
[/DRAFTS]

[ROUTINE]
* **09:00 AM** - Begin coding sprint: Open Header.tsx and fix TypeScript imports/types
* **11:00 AM** - Send mockup email to client
* **02:00 PM** - Review CSS rules in index.css for spacing optimization
* **04:30 PM** - Perform quick 10-minute back stretches
* **06:00 PM** - Log in and pay the internet bill
[/ROUTINE]

[INSIGHTS]
### Lumbar Stretch Routine for Back Pain (10 Mins)
Perfect for developers sitting at desks all day:

1. **Child's Pose:** Kneel on floor, sit on heels, reach hands forward on the floor. Hold for 45s.
2. **Cat-Cow Stretch:** On hands and knees, alternate arching your back toward the ceiling and dipping it toward the floor. 10 reps.
3. **Knee-to-Chest:** Lie on back, pull one knee up to your chest, hold for 30s. Switch sides.

### TypeScript Tip: Header Icon Import
If you get type errors on Lucide icons, make sure you import them collectively or check element props:
\`\`\`typescript
import { LucideIcon } from 'lucide-react';
interface NavItem {
  icon: LucideIcon;
  label: string;
}
\`\`\`
[/INSIGHTS]`;
    }

    let index = 0;
    setStatusText("GENERATING");
    
    const interval = setInterval(() => {
      if (index < demoText.length) {
        index += Math.min(8, demoText.length - index); // stream block chunks
        setConsoleOutput(demoText.substring(0, index));
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        setStatusText("COMPLETED");
        parseOutputs(demoText);
        setActiveTab("tasks"); // automatically swap to parsed outputs
      }
    }, 15);
  };

  // Real OpenRouter Stream Fetch
  const runOpenRouterRequest = async () => {
    setIsStreaming(true);
    setConsoleOutput("");
    setErrorMessage("");
    setStatusText("CONNECTING");
    setActiveTab("console");

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://www.aitoolspro.tech", // Custom referer for OpenRouter analytics
          "X-Title": "StartupAI Tools",
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Here is my brain dump: ${brainDump}` }
          ],
          temperature: temperature,
          max_tokens: maxTokens,
          stream: true
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `API Error: ${response.status} - ${response.statusText}`);
      }

      setStatusText("GENERATING");
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (!reader) {
        throw new Error("ReadableStream is not supported by your browser.");
      }

      let done = false;
      let accumulatedContent = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
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
              // Ignore boundary errors
            }
          }
        }
      }

      setStatusText("COMPLETED");
      parseOutputs(accumulatedContent);
      setActiveTab("tasks"); // Swap automatically to parsed checklist tab
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to contact OpenRouter API.");
      setStatusText("FAILED");
    } finally {
      setIsStreaming(false);
    }
  };

  const handleRunAgent = () => {
    if (isStreaming || !brainDump.trim()) return;

    if (!apiKey) {
      // Choose demo mode depending on text contents
      const isDev = brainDump.toLowerCase().includes("typescript") || brainDump.toLowerCase().includes("code") || brainDump.toLowerCase().includes("css");
      runDemoMode(isDev ? "developer" : "professional");
    } else {
      runOpenRouterRequest();
    }
  };

  // Helper copy handlers
  const copyToClipboard = (text: string, setCopyState: (s: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopyState(true);
    setTimeout(() => setCopyState(false), 2000);
  };

  return (
    <div className="container" style={{ padding: "3rem 1.25rem", maxWidth: "1250px" }}>
      {/* Breadcrumb back */}
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
        <ArrowLeft size={16} /> Back to Directory
      </Link>

      {/* Header Info Banner */}
      <div style={{
        background: "linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, rgba(147, 51, 234, 0.04) 100%)",
        border: "1px solid var(--border-light)",
        borderRadius: "16px",
        padding: "2.5rem 2rem",
        marginBottom: "2.5rem",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          background: "rgba(37, 99, 235, 0.08)",
          color: "var(--primary)",
          padding: "0.3rem 0.75rem",
          borderRadius: "50px",
          fontSize: "0.75rem",
          fontWeight: 700,
          marginBottom: "1rem"
        }}>
          <Sparkles size={12} /> Flagship AI Organizer
        </div>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
          ZenNote AI <span style={{ color: "var(--primary)" }}>Organizer</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", maxWidth: "750px", lineHeight: "1.5", margin: 0 }}>
          Dump your messy mind, raw tasks, and text drafts into one box. Our intelligent agent parses, organizes, and drafts your daily work instantly.
        </p>
      </div>

      {/* Grid Dashboard */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "2rem",
      }}>
        
        {/* Row 1: Configurations & Main Input (Split on large screens) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
        }} className="grid-2">
          
          {/* Settings Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Input Card */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FileText size={18} color="var(--primary)" /> 1. Paste Daily Brain Dump
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Preset Loaders */}
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <button
                    onClick={() => loadPreset("professional")}
                    className="btn btn-outline"
                    style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem", borderRadius: "6px" }}
                  >
                    Load Personal Preset
                  </button>
                  <button
                    onClick={() => loadPreset("developer")}
                    className="btn btn-outline"
                    style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem", borderRadius: "6px" }}
                  >
                    Load Coding Preset
                  </button>
                </div>

                <textarea
                  className="input-field"
                  style={{ 
                    minHeight: "180px", 
                    fontFamily: "sans-serif", 
                    lineHeight: "1.5", 
                    padding: "0.85rem",
                    fontSize: "16px" // Crucial: At least 16px to prevent iOS auto-zoom
                  }}
                  placeholder="Write whatever is in your head... e.g., 'remind me to pay bills, email boss about the update, also need a recipe for spinach...'"
                  value={brainDump}
                  onChange={(e) => setBrainDump(e.target.value)}
                />

                <button
                  className="btn btn-primary"
                  onClick={handleRunAgent}
                  disabled={isStreaming || !brainDump.trim()}
                  style={{
                    padding: "0.85rem 1.5rem",
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: "0 4px 10px rgba(37, 99, 235, 0.15)",
                    minHeight: "48px" // Touch target
                  }}
                >
                  {isStreaming ? (
                    <>
                      <RotateCw size={18} className="animate-spin" /> Stream Organizing...
                    </>
                  ) : (
                    <>
                      <Play size={16} /> Organize My Thoughts
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Optional Credentials Panel */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Key size={16} color="var(--primary)" /> API Key Setup
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)" }}>
                  OpenRouter API Key (Optional)
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showApiKey ? "text" : "password"}
                    className="input-field"
                    style={{ 
                      paddingRight: "2.5rem", 
                      fontFamily: "monospace", 
                      fontSize: "16px", // prevent iOS zoom
                      borderColor: apiKey ? "#16a34a" : "var(--border-strong)"
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
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {!apiKey ? (
                  <span style={{ fontSize: "0.75rem", color: "#d97706", lineHeight: "1.4" }}>
                    No key provided. Running inside **Demo Sandbox Mode** with immediate simulated analysis.
                  </span>
                ) : (
                  <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 500 }}>
                    API Connected. Requests will load live from OpenRouter.
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Model Engine Configuration Panel */}
          <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Cpu size={18} color="var(--primary)" /> 2. Model Settings
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)" }}>
                Model Selection
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
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Info Details */}
            <div style={{ 
              background: "var(--bg-main)", 
              padding: "0.85rem", 
              borderRadius: "8px", 
              border: "1px solid var(--border-light)",
              fontSize: "0.75rem",
              lineHeight: "1.4"
            }}>
              <div style={{ fontWeight: 700, marginBottom: "0.25rem", display: "flex", justifyContent: "space-between" }}>
                <span>Context Limit: {models.find(m => m.id === selectedModel)?.context}</span>
                <span style={{ color: "var(--primary)" }}>{models.find(m => m.id === selectedModel)?.provider}</span>
              </div>
              <p style={{ color: "var(--text-muted)", margin: 0 }}>
                {models.find(m => m.id === selectedModel)?.description}
              </p>
            </div>

            {/* Temperature Sliders */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.25rem", fontWeight: 600 }}>
                  <span>Temperature (Creativity)</span>
                  <span>{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.5"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  style={{ width: "100%", height: "6px" }}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.25rem", fontWeight: 600 }}>
                  <span>Max Tokens</span>
                  <span>{maxTokens}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="4000"
                  step="250"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  style={{ width: "100%", height: "6px" }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Row 2: Console / Tabbed Output Dashboard */}
        <div style={{
          background: "#0f172a", // Sleek dark editor styling
          borderRadius: "16px",
          border: "1px solid #1e293b",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
          overflow: "hidden"
        }}>
          {/* Header Dashboard Info / Tabs */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            borderBottom: "1px solid #1e293b",
            background: "#121b2e"
          }}>
            {/* Title / Status */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "0.85rem 1.25rem",
              borderBottom: "1px solid #1e293b/50"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Terminal size={14} color="#94a3b8" />
                <span style={{ color: "#e2e8f0", fontSize: "0.8rem", fontFamily: "monospace" }}>
                  zennote_analysis_output.json
                </span>
              </div>
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

            {/* Navigation Tabs Bar */}
            <div style={{
              display: "flex",
              overflowX: "auto",
              whiteSpace: "nowrap",
              scrollbarWidth: "none"
            }} className="console-tabs-bar">
              <button
                onClick={() => setActiveTab("console")}
                style={{
                  padding: "0.85rem 1.25rem",
                  background: activeTab === "console" ? "#0f172a" : "transparent",
                  color: activeTab === "console" ? "#3b82f6" : "#64748b",
                  border: "none",
                  borderBottom: activeTab === "console" ? "2px solid #3b82f6" : "none",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <Terminal size={14} /> Live Stream
              </button>

              <button
                onClick={() => setActiveTab("tasks")}
                disabled={!isStreaming && tasksList.length === 0}
                style={{
                  padding: "0.85rem 1.25rem",
                  background: activeTab === "tasks" ? "#0f172a" : "transparent",
                  color: activeTab === "tasks" ? "#3b82f6" : "#64748b",
                  border: "none",
                  borderBottom: activeTab === "tasks" ? "2px solid #3b82f6" : "none",
                  cursor: (tasksList.length > 0) ? "pointer" : "not-allowed",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  opacity: (tasksList.length > 0) ? 1 : 0.5,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <ClipboardList size={14} /> Checklist ({tasksList.length})
              </button>

              <button
                onClick={() => setActiveTab("drafts")}
                disabled={!isStreaming && !draftsContent}
                style={{
                  padding: "0.85rem 1.25rem",
                  background: activeTab === "drafts" ? "#0f172a" : "transparent",
                  color: activeTab === "drafts" ? "#3b82f6" : "#64748b",
                  border: "none",
                  borderBottom: activeTab === "drafts" ? "2px solid #3b82f6" : "none",
                  cursor: draftsContent ? "pointer" : "not-allowed",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  opacity: draftsContent ? 1 : 0.5,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <MessageSquare size={14} /> Message Drafts
              </button>

              <button
                onClick={() => setActiveTab("routine")}
                disabled={!isStreaming && !routineContent}
                style={{
                  padding: "0.85rem 1.25rem",
                  background: activeTab === "routine" ? "#0f172a" : "transparent",
                  color: activeTab === "routine" ? "#3b82f6" : "#64748b",
                  border: "none",
                  borderBottom: activeTab === "routine" ? "2px solid #3b82f6" : "none",
                  cursor: routineContent ? "pointer" : "not-allowed",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  opacity: routineContent ? 1 : 0.5,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <Calendar size={14} /> Daily Schedule
              </button>

              <button
                onClick={() => setActiveTab("insights")}
                disabled={!isStreaming && !insightsContent}
                style={{
                  padding: "0.85rem 1.25rem",
                  background: activeTab === "insights" ? "#0f172a" : "transparent",
                  color: activeTab === "insights" ? "#3b82f6" : "#64748b",
                  border: "none",
                  borderBottom: activeTab === "insights" ? "2px solid #3b82f6" : "none",
                  cursor: insightsContent ? "pointer" : "not-allowed",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  opacity: insightsContent ? 1 : 0.5,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <Lightbulb size={14} /> AI Recommendations
              </button>
            </div>
          </div>

          {/* Console Error Banner */}
          {errorMessage && (
            <div style={{
              background: "rgba(239, 68, 68, 0.15)",
              color: "#f87171",
              padding: "1rem",
              fontSize: "0.85rem",
              fontFamily: "monospace",
              borderBottom: "1px solid rgba(239, 68, 68, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <AlertCircle size={16} />
              <div>{errorMessage}</div>
            </div>
          )}

          {/* Scrollable Viewport Container (Local Scroll Only!) */}
          <div 
            ref={terminalScrollRef}
            style={{
              padding: "1.5rem",
              minHeight: "360px",
              maxHeight: "550px",
              overflowY: "auto",
              background: "#0f172a",
              color: "#e2e8f0",
              lineHeight: "1.6"
            }}
          >
            
            {/* console raw log stream tab */}
            {activeTab === "console" && (
              <div style={{ fontFamily: "monospace", fontSize: "0.85rem", whiteSpace: "pre-wrap" }}>
                {consoleOutput ? (
                  consoleOutput
                ) : (
                  <span style={{ color: "#475569", fontStyle: "italic" }}>
                    Console terminal ready. Enter notes above and click &quot;Organize My Thoughts&quot; to start...
                  </span>
                )}
              </div>
            )}

            {/* Checklist Tab */}
            {activeTab === "tasks" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h4 style={{ color: "#ffffff", fontSize: "1.1rem", borderBottom: "1px solid #1e293b", paddingBottom: "0.5rem" }}>
                  Daily Checklist
                </h4>
                {tasksList.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {tasksList.map(task => (
                      <label 
                        key={task.id}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          background: "#1e293b/40",
                          padding: "0.75rem 1rem",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "background-color 0.2s",
                          color: task.done ? "#64748b" : "#e2e8f0",
                          textDecoration: task.done ? "line-through" : "none",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => toggleTask(task.id)}
                          style={{
                            marginTop: "0.25rem",
                            width: "16px",
                            height: "16px",
                            cursor: "pointer"
                          }}
                        />
                        <span style={{ fontSize: "0.95rem" }}>{task.text}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <span style={{ color: "#64748b" }}>No tasks parsed yet. Try running the generator.</span>
                )}
              </div>
            )}

            {/* Message Drafts Tab */}
            {activeTab === "drafts" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "0.5rem" }}>
                  <h4 style={{ color: "#ffffff", fontSize: "1.1rem", margin: 0 }}>
                    Extracted Drafts
                  </h4>
                  {draftsContent && (
                    <button
                      onClick={() => copyToClipboard(draftsContent, setCopiedDrafts)}
                      style={{
                        background: "rgba(59, 130, 246, 0.1)",
                        color: "#3b82f6",
                        border: "1px solid rgba(59, 130, 246, 0.3)",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem"
                      }}
                    >
                      {copiedDrafts ? <Check size={12} color="#22c55e" /> : <Copy size={12} />}
                      <span>{copiedDrafts ? "Copied!" : "Copy All Drafts"}</span>
                    </button>
                  )}
                </div>
                {draftsContent ? (
                  <div style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem", color: "#cbd5e1" }}>
                    {draftsContent}
                  </div>
                ) : (
                  <span style={{ color: "#64748b" }}>No messages extracted.</span>
                )}
              </div>
            )}

            {/* Daily Schedule Tab */}
            {activeTab === "routine" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "0.5rem" }}>
                  <h4 style={{ color: "#ffffff", fontSize: "1.1rem", margin: 0 }}>
                    Chronological Routine
                  </h4>
                  {routineContent && (
                    <button
                      onClick={() => copyToClipboard(routineContent, setCopiedRoutine)}
                      style={{
                        background: "rgba(59, 130, 246, 0.1)",
                        color: "#3b82f6",
                        border: "1px solid rgba(59, 130, 246, 0.3)",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem"
                      }}
                    >
                      {copiedRoutine ? <Check size={12} color="#22c55e" /> : <Copy size={12} />}
                      <span>{copiedRoutine ? "Copied!" : "Copy Schedule"}</span>
                    </button>
                  )}
                </div>
                {routineContent ? (
                  <div style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem", color: "#cbd5e1" }}>
                    {routineContent}
                  </div>
                ) : (
                  <span style={{ color: "#64748b" }}>No daily schedule generated.</span>
                )}
              </div>
            )}

            {/* Recommendations Tab */}
            {activeTab === "insights" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "0.5rem" }}>
                  <h4 style={{ color: "#ffffff", fontSize: "1.1rem", margin: 0 }}>
                    AI Recommendations
                  </h4>
                  {insightsContent && (
                    <button
                      onClick={() => copyToClipboard(insightsContent, setCopiedInsights)}
                      style={{
                        background: "rgba(59, 130, 246, 0.1)",
                        color: "#3b82f6",
                        border: "1px solid rgba(59, 130, 246, 0.3)",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem"
                      }}
                    >
                      {copiedInsights ? <Check size={12} color="#22c55e" /> : <Copy size={12} />}
                      <span>{copiedInsights ? "Copied!" : "Copy Recommendations"}</span>
                    </button>
                  )}
                </div>
                {insightsContent ? (
                  <div style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem", color: "#cbd5e1" }}>
                    {insightsContent}
                  </div>
                ) : (
                  <span style={{ color: "#64748b" }}>No recommendations extracted.</span>
                )}
              </div>
            )}

          </div>

          {/* Console Footer */}
          <div style={{
            padding: "0.6rem 1.25rem",
            background: "#0a0f1d",
            borderTop: "1px solid #1e293b",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ color: "#475569", fontSize: "0.7rem", fontFamily: "monospace" }}>
              sandbox_runtime: v1.0.4
            </span>
          </div>

        </div>

      </div>

      {/* Guide Section */}
      <section className="section" style={{ borderTop: "1px solid var(--border-light)", marginTop: "4rem" }}>
        <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>How ZenNote AI Works</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
          <p>
            ZenNote AI uses a single prompt input to perform multiple cognitive tasks in parallel. Behind the scenes, the model runs entity extraction, prioritizes calendar tasks, drafts communications in natural business tones, and searches contextual data.
          </p>
          <div style={{ 
            background: "#f8fafc", 
            border: "1px solid var(--border-light)", 
            borderRadius: "12px", 
            padding: "1.5rem"
          }}>
            <h4 style={{ color: "var(--text-main)", fontWeight: 700, marginBottom: "0.5rem" }}>Safe & Local Execution</h4>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>
              All settings, templates, and API keys are stored solely inside your browser's local sandbox memory. No user logs or credentials are ever sent to or processed by our servers.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
