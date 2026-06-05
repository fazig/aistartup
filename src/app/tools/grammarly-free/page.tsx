"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { 
  ArrowLeft, 
  Sparkles, 
  Trash2, 
  Copy, 
  Check, 
  AlertTriangle, 
  BookOpen, 
  CheckCircle2, 
  RefreshCw, 
  ChevronRight,
  Info,
  Languages,
  Book,
  Search
} from "lucide-react";

interface LTReplacement {
  value: string;
}

interface LTMatch {
  message: string;
  shortMessage?: string;
  offset: number;
  length: number;
  replacements: LTReplacement[];
  rule: {
    id: string;
    description: string;
    issueType: string;
    category: {
      id: string;
      name: string;
    };
  };
}

export default function GrammarlyFree() {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<LTMatch[]>([]);
  const [checking, setChecking] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"edit" | "review" | "translate">("edit");
  const [activeErrorIdx, setActiveErrorIdx] = useState<number | null>(null);
  const [hoveredErrorIdx, setHoveredErrorIdx] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [rateLimited, setRateLimited] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  // Sidebar tab state
  const [sidebarTab, setSidebarTab] = useState<"suggestions" | "dictionary">("suggestions");

  // Dictionary states
  const [dictQuery, setDictQuery] = useState("");
  const [dictResults, setDictResults] = useState<any>(null);
  const [dictLoading, setDictLoading] = useState(false);
  const [dictError, setDictError] = useState("");
  const [selectedWordCoords, setSelectedWordCoords] = useState<{ start: number; end: number; word: string } | null>(null);

  // Translation states
  const [translatedText, setTranslatedText] = useState("");
  const [translateTargetLang, setTranslateTargetLang] = useState("es");
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState("");

  // Local stats
  const charCount = text.length;
  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

  // Group errors by category
  const spellingErrors = errors.filter(e => e.rule?.category?.id === "TYPOS");
  const grammarErrors = errors.filter(e => e.rule?.category?.id === "GRAMMAR" || e.rule?.category?.id === "MISC");
  const styleErrors = errors.filter(e => e.rule?.category?.id === "STYLE" || e.rule?.category?.id === "REDUNDANCY");
  const otherErrors = errors.filter(e => {
    const cid = e.rule?.category?.id;
    return cid !== "TYPOS" && cid !== "GRAMMAR" && cid !== "MISC" && cid !== "STYLE" && cid !== "REDUNDANCY";
  });

  // Calculate overall score (0 - 100)
  const calculateScore = () => {
    if (!hasChecked || text.trim().length === 0) return 100;
    const spellingPenalty = spellingErrors.length * 2;
    const grammarPenalty = grammarErrors.length * 4;
    const stylePenalty = styleErrors.length * 1;
    const otherPenalty = otherErrors.length * 2;
    const totalPenalty = spellingPenalty + grammarPenalty + stylePenalty + otherPenalty;
    return Math.max(15, 100 - totalPenalty);
  };

  const score = calculateScore();

  // Function to copy text
  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to clear text
  const handleClear = () => {
    setText("");
    setErrors([]);
    setHasChecked(false);
    setMode("edit");
    setActiveErrorIdx(null);
    setHoveredErrorIdx(null);
    setErrorMsg("");
    setRateLimited(false);
    setDictQuery("");
    setDictResults(null);
    setDictError("");
    setSelectedWordCoords(null);
    setTranslatedText("");
    setTranslateError("");
  };

  // Dictionary word lookup
  const handleLookupWord = async (word: string) => {
    const cleanWord = word.trim().replace(/[^a-zA-Z-]/g, "");
    if (!cleanWord) return;
    setDictQuery(cleanWord);
    setDictLoading(true);
    setDictError("");
    setSidebarTab("dictionary");

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`);
      if (response.status === 404) {
        throw new Error(`Word "${cleanWord}" not found in dictionary.`);
      }
      if (!response.ok) {
        throw new Error("Failed to search dictionary API.");
      }
      const data = await response.json();
      setDictResults(data[0]); // store the first entry
    } catch (err: any) {
      setDictResults(null);
      setDictError(err.message || "An error occurred during lookup.");
    } finally {
      setDictLoading(false);
    }
  };

  // Textarea double click to define word
  const handleTextareaDoubleClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end).trim();
    if (selectedText && !selectedText.includes(" ") && /^[a-zA-Z-]+$/.test(selectedText)) {
      setSelectedWordCoords({ start, end, word: selectedText });
      handleLookupWord(selectedText);
    }
  };

  // Review panel double click to define word
  const handleReviewDoubleClick = () => {
    const selection = window.getSelection()?.toString().trim();
    if (selection && !selection.includes(" ") && /^[a-zA-Z-]+$/.test(selection)) {
      const index = text.indexOf(selection);
      if (index !== -1) {
        setSelectedWordCoords({ start: index, end: index + selection.length, word: selection });
      }
      handleLookupWord(selection);
    }
  };

  // Replace selected word with a synonym
  const handleReplaceWithSynonym = (syn: string) => {
    if (!selectedWordCoords) {
      if (dictResults?.word) {
        const target = dictResults.word;
        const index = text.toLowerCase().indexOf(target.toLowerCase());
        if (index !== -1) {
          const newText = text.substring(0, index) + syn + text.substring(index + target.length);
          setText(newText);
          setHasChecked(false); // invalidate check
        }
      }
      return;
    }
    
    const { start, end } = selectedWordCoords;
    const newText = text.substring(0, start) + syn + text.substring(end);
    setText(newText);
    setSelectedWordCoords(null);
    setHasChecked(false); // invalidate check
  };

  // Translate text using MyMemory API
  const handleTranslate = async () => {
    if (!text.trim()) return;
    setTranslating(true);
    setTranslateError("");
    setTranslatedText("");

    try {
      const queryText = text.substring(0, 3000); // safety cap
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(queryText)}&langpair=en|${translateTargetLang}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch translation from MyMemory API.");
      }

      const data = await response.json();
      if (data.responseData && data.responseData.translatedText) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        throw new Error("Translation failed. Invalid response data.");
      }
    } catch (err: any) {
      setTranslateError(err.message || "An error occurred during translation.");
    } finally {
      setTranslating(false);
    }
  };

  // Chunking and querying LanguageTool API
  const handleCheckGrammar = async () => {
    if (!text.trim()) return;
    if (wordCount > 10000) {
      setErrorMsg("Text exceeds the 10,000 words limit. Please shorten your text and try again.");
      return;
    }

    setChecking(true);
    setErrorMsg("");
    setRateLimited(false);
    setActiveErrorIdx(null);

    const chunkSize = 15000; // Keep safely below 20,000 char LT limit
    const chunks: { text: string; offset: number }[] = [];

    let currentIndex = 0;
    while (currentIndex < text.length) {
      let nextIndex = currentIndex + chunkSize;
      if (nextIndex >= text.length) {
        chunks.push({
          text: text.substring(currentIndex),
          offset: currentIndex
        });
        break;
      } else {
        // Find the last space or newline in the chunk to avoid breaking words
        let splitIndex = text.lastIndexOf(" ", nextIndex);
        if (splitIndex <= currentIndex) {
          splitIndex = text.lastIndexOf("\n", nextIndex);
        }
        if (splitIndex <= currentIndex) {
          splitIndex = nextIndex;
        }
        chunks.push({
          text: text.substring(currentIndex, splitIndex),
          offset: currentIndex
        });
        currentIndex = splitIndex;
      }
    }

    let allMatches: LTMatch[] = [];

    try {
      for (const chunk of chunks) {
        const response = await fetch("https://api.languagetool.org/v2/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            text: chunk.text,
            language: selectedLanguage
          })
        });

        if (response.status === 429) {
          setRateLimited(true);
          throw new Error("LanguageTool API rate limit reached. Please wait a minute before checking again.");
        }

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to communicate with grammar analyzer service.`);
        }

        const data = await response.json();
        if (data.matches) {
          // Adjust offsets for chunk position
          const shiftedMatches = data.matches.map((match: LTMatch) => ({
            ...match,
            offset: match.offset + chunk.offset
          }));
          allMatches = [...allMatches, ...shiftedMatches];
        }
      }

      setErrors(allMatches);
      setHasChecked(true);
      setMode("review");
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred while analyzing your text.");
    } finally {
      setChecking(false);
    }
  };

  // Replace error text with suggestion correction
  const applyCorrection = (errorOffset: number, errorLength: number, replacement: string, indexToRemove: number) => {
    // 1. Swap the string segment
    const newText = text.substring(0, errorOffset) + replacement + text.substring(errorOffset + errorLength);
    setText(newText);

    // 2. Recalculate subsequent error offsets
    const offsetDiff = replacement.length - errorLength;
    const updatedErrors = errors
      .map((err, idx) => {
        if (idx === indexToRemove) return null; // remove the fixed error
        if (err.offset > errorOffset) {
          return {
            ...err,
            offset: err.offset + offsetDiff
          };
        }
        return err;
      })
      .filter((err): err is LTMatch => err !== null);

    setErrors(updatedErrors);
    
    // Clear active error focus
    if (activeErrorIdx === indexToRemove) {
      setActiveErrorIdx(null);
    } else if (activeErrorIdx !== null && activeErrorIdx > indexToRemove) {
      setActiveErrorIdx(activeErrorIdx - 1);
    }
  };

  // Ignore/dismiss error
  const ignoreError = (indexToRemove: number) => {
    const updatedErrors = errors.filter((_, idx) => idx !== indexToRemove);
    setErrors(updatedErrors);
    
    if (activeErrorIdx === indexToRemove) {
      setActiveErrorIdx(null);
    } else if (activeErrorIdx !== null && activeErrorIdx > indexToRemove) {
      setActiveErrorIdx(activeErrorIdx - 1);
    }
  };

  // Render text inside Review mode with underlined error spans
  const renderHighlightedReview = () => {
    if (errors.length === 0) {
      return <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.75", fontSize: "1.05rem" }}>{text}</div>;
    }

    // Sort errors by offset
    const sortedErrorsWithOriginalIndex = errors
      .map((err, idx) => ({ err, idx }))
      .sort((a, b) => a.err.offset - b.err.offset);

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    for (let i = 0; i < sortedErrorsWithOriginalIndex.length; i++) {
      const { err, idx } = sortedErrorsWithOriginalIndex[i];
      const { offset, length, rule } = err;

      // Skip overlapping errors
      if (offset < lastIndex) continue;

      // Add normal text preceding this error
      if (offset > lastIndex) {
        elements.push(
          <span key={`text-${lastIndex}`}>{text.substring(lastIndex, offset)}</span>
        );
      }

      // Categorize underline color
      let underlineColor = "#ef4444"; // red: typos
      let categoryLabel = "Spelling";
      let bgColor = "rgba(239, 68, 68, 0.08)";
      const categoryId = rule?.category?.id;
      if (categoryId === "GRAMMAR" || categoryId === "MISC") {
        underlineColor = "#3b82f6"; // blue: grammar
        categoryLabel = "Grammar";
        bgColor = "rgba(59, 130, 246, 0.08)";
      } else if (categoryId === "STYLE" || categoryId === "REDUNDANCY") {
        underlineColor = "#8b5cf6"; // purple: style
        categoryLabel = "Style";
        bgColor = "rgba(139, 92, 246, 0.08)";
      }

      const isActive = activeErrorIdx === idx;
      const isHovered = hoveredErrorIdx === idx;
      const showTooltip = isHovered || isActive;
      const errorText = text.substring(offset, offset + length);

      elements.push(
        <span
          key={`error-${idx}-${offset}`}
          onMouseEnter={() => setHoveredErrorIdx(idx)}
          onMouseLeave={() => setHoveredErrorIdx(null)}
          onClick={(e) => {
            e.stopPropagation();
            setActiveErrorIdx(idx);
          }}
          style={{
            borderBottom: `2.5px ${isActive ? "solid" : "dashed"} ${underlineColor}`,
            backgroundColor: isActive ? bgColor.replace("0.08", "0.2") : bgColor,
            cursor: "pointer",
            position: "relative",
            display: "inline",
            padding: "1px 0",
            fontWeight: isActive ? 600 : "normal",
            transition: "all 0.2s"
          }}
        >
          {errorText}

          {/* Floating Tooltip */}
          {showTooltip && (
            <span
              onClick={(e) => e.stopPropagation()} // prevent triggering outer click
              style={{
                position: "absolute",
                bottom: "100%",
                left: "50%",
                transform: "translate(-50%, -8px)",
                background: "#ffffff",
                border: "1px solid var(--border-light)",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                width: "260px",
                zIndex: 100,
                display: "block",
                cursor: "default",
                fontWeight: "normal",
                fontSize: "0.825rem",
                lineHeight: "1.4",
                color: "var(--text-main)",
                whiteSpace: "normal"
              }}
            >
              {/* Tooltip Arrow */}
              <span style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid #ffffff",
                display: "block"
              }} />
              <span style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: "7px solid var(--border-light)",
                zIndex: -1,
                display: "block"
              }} />

              {/* Message */}
              <div style={{ fontWeight: 700, color: underlineColor, marginBottom: "0.25rem", fontSize: "0.85rem" }}>
                {categoryLabel} suggestion
              </div>
              <div style={{ marginBottom: "0.5rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                {err.message}
              </div>

              {/* Corrections Buttons */}
              {err.replacements && err.replacements.length > 0 ? (
                <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                  {err.replacements.slice(0, 3).map((rep, rIdx) => (
                    <button
                      key={rIdx}
                      onClick={(e) => {
                        e.stopPropagation();
                        applyCorrection(offset, length, rep.value, idx);
                      }}
                      className="btn btn-secondary"
                      style={{
                        padding: "0.25rem 0.5rem",
                        fontSize: "0.75rem",
                        borderRadius: "6px",
                        border: "1px solid #bfdbfe",
                        background: "#eff6ff",
                        color: "#1d4ed8",
                        cursor: "pointer",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem"
                      }}
                    >
                      {rep.value}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                  No corrections available
                </div>
              )}

              {/* Ignore link */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    ignoreError(idx);
                  }}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "var(--text-muted)",
                    fontSize: "0.7rem",
                    cursor: "pointer",
                    textDecoration: "underline"
                  }}
                >
                  Ignore
                </button>
              </div>
            </span>
          )}
        </span>
      );

      lastIndex = offset + length;
    }

    if (lastIndex < text.length) {
      elements.push(
        <span key={`text-${lastIndex}`}>{text.substring(lastIndex)}</span>
      );
    }

    return (
      <div 
        onDoubleClick={handleReviewDoubleClick}
        style={{ 
          whiteSpace: "pre-wrap", 
          lineHeight: "1.8", 
          fontSize: "1.05rem",
          color: "var(--text-main)",
          minHeight: "350px",
          padding: "0.5rem"
        }}
      >
        {elements}
      </div>
    );
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      {/* Breadcrumbs */}
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

      {/* Hero Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", fontSize: "2.25rem" }}>
          <Sparkles color="var(--primary)" size={28} /> Grammarly Free
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
          Analyze your texts, correct spelling mistakes, optimize syntax structure, and improve readability with our professional grammar analyzer.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grammarly-grid">
        {/* Left Column - Editor Card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="card" style={{ padding: "1.5rem", position: "relative" }}>
            {/* Editor Top Bar */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "1.25rem",
              borderBottom: "1px solid var(--border-light)",
              paddingBottom: "1rem",
              flexWrap: "wrap",
              gap: "1rem"
            }}>
              {/* Mode Selector Tabs */}
              <div style={{ display: "flex", gap: "0.25rem", background: "#f1f5f9", padding: "0.25rem", borderRadius: "8px" }}>
                <button 
                  onClick={() => setMode("edit")}
                  style={{
                    padding: "0.4rem 1rem",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    border: "none",
                    cursor: "pointer",
                    background: mode === "edit" ? "#ffffff" : "transparent",
                    color: mode === "edit" ? "var(--text-main)" : "var(--text-muted)",
                    fontWeight: mode === "edit" ? 700 : 500,
                    boxShadow: mode === "edit" ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
                    transition: "all 0.15s"
                  }}
                >
                  Edit Mode
                </button>
                <button 
                  onClick={() => {
                    if (hasChecked) setMode("review");
                  }}
                  disabled={!hasChecked}
                  style={{
                    padding: "0.4rem 1rem",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    border: "none",
                    cursor: hasChecked ? "pointer" : "not-allowed",
                    background: mode === "review" ? "#ffffff" : "transparent",
                    color: mode === "review" ? "var(--text-main)" : "var(--text-muted)",
                    fontWeight: mode === "review" ? 700 : 500,
                    opacity: hasChecked ? 1 : 0.5,
                    boxShadow: mode === "review" ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
                    transition: "all 0.15s"
                  }}
                >
                  Review Mode ({errors.length})
                </button>
                <button 
                  onClick={() => setMode("translate")}
                  style={{
                    padding: "0.4rem 1rem",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    border: "none",
                    cursor: "pointer",
                    background: mode === "translate" ? "#ffffff" : "transparent",
                    color: mode === "translate" ? "var(--text-main)" : "var(--text-muted)",
                    fontWeight: mode === "translate" ? 700 : 500,
                    boxShadow: mode === "translate" ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
                    transition: "all 0.15s"
                  }}
                >
                  Translate
                </button>
              </div>

              {/* Toolbar Controls */}
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  style={{
                    padding: "0.4rem 0.75rem",
                    borderRadius: "8px",
                    border: "1px solid var(--border-light)",
                    fontSize: "0.825rem",
                    background: "#ffffff",
                    cursor: "pointer",
                    color: "var(--text-main)"
                  }}
                >
                  <option value="en-US">English (US)</option>
                  <option value="en-GB">English (UK)</option>
                  <option value="en-CA">English (Canada)</option>
                  <option value="en-AU">English (Australia)</option>
                  <option value="de">German</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>

                <button 
                  className="btn btn-secondary" 
                  style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }} 
                  onClick={handleCopy} 
                  disabled={!text}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy"}
                </button>
                
                <button 
                  className="btn btn-outline" 
                  style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }} 
                  onClick={handleClear} 
                  disabled={!text}
                >
                  <Trash2 size={14} /> Clear
                </button>
              </div>
            </div>

            {/* Error Message Box */}
            {errorMsg && (
              <div style={{ 
                background: "#fef2f2", 
                border: "1px solid #fee2e2", 
                padding: "1rem", 
                borderRadius: "10px", 
                color: "#991b1b",
                fontSize: "0.9rem",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <AlertTriangle size={18} />
                <div>{errorMsg}</div>
              </div>
            )}

            {/* Rate limit warn */}
            {rateLimited && (
              <div style={{ 
                background: "#fffbeb", 
                border: "1px solid #fef3c7", 
                padding: "1rem", 
                borderRadius: "10px", 
                color: "#92400e",
                fontSize: "0.9rem",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <Info size={18} />
                <div>LanguageTool API limits reached. Try checking small segments (under 2,000 words) to avoid IP limits.</div>
              </div>
            )}

            {/* Editor Workspace */}
            <div style={{ 
              borderRadius: "12px", 
              border: "1px solid var(--border-light)", 
              minHeight: "380px", 
              padding: "1rem",
              background: (mode === "edit" || mode === "translate") ? "#ffffff" : "#fafafa",
              position: "relative"
            }}>
              {mode === "edit" ? (
                <textarea
                  style={{
                    width: "100%",
                    minHeight: "360px",
                    border: "none",
                    outline: "none",
                    resize: "vertical",
                    fontSize: "1.05rem",
                    lineHeight: "1.7",
                    background: "transparent",
                    color: "var(--text-main)",
                    fontFamily: "inherit"
                  }}
                  placeholder="Start typing your sentences, or paste a document here to check for grammar, spelling, and punctuation issues (supports up to 10,000 words)..."
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    if (hasChecked) setHasChecked(false); // invalidate check if they type
                  }}
                  onDoubleClick={handleTextareaDoubleClick}
                />
              ) : mode === "review" ? (
                renderHighlightedReview()
              ) : (
                /* Translate Workspace - Split screen */
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="translate-split">
                  {/* Left Column: Source Text */}
                  <div style={{ borderRight: "1px solid var(--border-light)", paddingRight: "1rem" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                      Source Text (English)
                    </div>
                    <div style={{ 
                      fontSize: "1rem", 
                      lineHeight: "1.6", 
                      color: text ? "var(--text-main)" : "var(--text-muted)",
                      maxHeight: "300px",
                      overflowY: "auto",
                      whiteSpace: "pre-wrap",
                      padding: "0.5rem",
                      background: "#f8fafc",
                      borderRadius: "8px",
                      minHeight: "150px"
                    }}>
                      {text || "No text entered yet. Go back to Edit Mode and write something."}
                    </div>
                  </div>

                  {/* Right Column: Translator Controls & Output */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                      <select
                        value={translateTargetLang}
                        onChange={(e) => setTranslateTargetLang(e.target.value)}
                        style={{
                          padding: "0.5rem 0.75rem",
                          borderRadius: "8px",
                          border: "1px solid var(--border-light)",
                          fontSize: "0.875rem",
                          background: "#ffffff",
                          cursor: "pointer",
                          color: "var(--text-main)",
                          flex: 1
                        }}
                      >
                        <option value="es">Spanish (Español)</option>
                        <option value="fr">French (Français)</option>
                        <option value="de">German (Deutsch)</option>
                        <option value="it">Italian (Italiano)</option>
                        <option value="pt">Portuguese (Português)</option>
                        <option value="ru">Russian (Русский)</option>
                        <option value="zh">Chinese (中文)</option>
                        <option value="ja">Japanese (日本語)</option>
                        <option value="ar">Arabic (العربية)</option>
                      </select>

                      <button
                        onClick={handleTranslate}
                        disabled={translating || !text.trim()}
                        className="btn btn-primary"
                        style={{
                          padding: "0.5rem 1.25rem",
                          fontSize: "0.875rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem"
                        }}
                      >
                        {translating ? (
                          <>
                            <RefreshCw size={14} className="spin-animation" />
                            Translating...
                          </>
                        ) : (
                          <>
                            <Languages size={14} />
                            Translate
                          </>
                        )}
                      </button>
                    </div>

                    {translateError && (
                      <div style={{ color: "#ef4444", fontSize: "0.85rem", background: "#fef2f2", padding: "0.75rem", borderRadius: "8px" }}>
                        {translateError}
                      </div>
                    )}

                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                        Translation Result
                      </div>
                      <textarea
                        readOnly
                        style={{
                          width: "100%",
                          minHeight: "180px",
                          border: "1px solid var(--border-light)",
                          borderRadius: "8px",
                          padding: "0.75rem",
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          background: "#f8fafc",
                          color: "var(--text-main)",
                          outline: "none",
                          resize: "none"
                        }}
                        placeholder="Click Translate to generate output..."
                        value={translatedText}
                      />
                      
                      {translatedText && (
                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(translatedText);
                            }}
                            className="btn btn-secondary"
                            style={{
                              padding: "0.4rem 0.85rem",
                              fontSize: "0.8rem",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.35rem"
                            }}
                          >
                            <Copy size={12} /> Copy Translation
                          </button>
                          
                          <button
                            onClick={() => {
                              setText(translatedText);
                              setMode("edit");
                              setHasChecked(false);
                            }}
                            className="btn btn-outline"
                            style={{
                              padding: "0.4rem 0.85rem",
                              fontSize: "0.8rem",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.35rem"
                            }}
                          >
                            <RefreshCw size={12} /> Replace Editor Text
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Editor Footer Controls */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginTop: "1.25rem",
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              flexWrap: "wrap",
              gap: "1rem"
            }}>
              <div>
                <span style={{ marginRight: "1rem" }}><strong>{wordCount}</strong> words</span>
                <span><strong>{charCount}</strong> characters</span>
              </div>

              <button
                onClick={handleCheckGrammar}
                disabled={checking || text.trim().length === 0}
                className="btn btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 1.5rem",
                  fontSize: "0.9rem",
                  boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.2)"
                }}
              >
                {checking ? (
                  <>
                    <RefreshCw size={16} className="spin-animation" />
                    Analyzing Text...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Check Grammar & Spelling
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Side Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Scoring Card */}
          <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem", width: "100%", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.75rem" }}>
              Writing Quality Score
            </h3>

            {/* Circular Progress Gauge */}
            <div style={{ position: "relative", width: "120px", height: "120px", marginBottom: "1.5rem" }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50" 
                  fill="none" 
                  stroke="#e2e8f0" 
                  strokeWidth="8" 
                />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50" 
                  fill="none" 
                  stroke={score > 80 ? "var(--success)" : score > 50 ? "#f59e0b" : "#ef4444"} 
                  strokeWidth="8" 
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - score / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                  style={{ transition: "stroke-dashoffset 0.3s ease" }}
                />
              </svg>
              <div style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                width: "100%", 
                height: "100%", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center" 
              }}>
                <span style={{ fontSize: "2rem", fontWeight: 900, color: "var(--text-main)" }}>{score}</span>
                <span style={{ fontSize: "0.675rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Grade</span>
              </div>
            </div>

            {/* Issue Counts Grid */}
            <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <div style={{ padding: "0.5rem", background: "#fef2f2", borderRadius: "8px", border: "1px solid #fee2e2" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ef4444" }}>{spellingErrors.length}</div>
                <div style={{ fontSize: "0.7rem", color: "#991b1b", fontWeight: 600 }}>Typos</div>
              </div>
              <div style={{ padding: "0.5rem", background: "#eff6ff", borderRadius: "8px", border: "1px solid #dbeafe" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#3b82f6" }}>{grammarErrors.length}</div>
                <div style={{ fontSize: "0.7rem", color: "#1e3a8a", fontWeight: 600 }}>Grammar</div>
              </div>
              <div style={{ padding: "0.5rem", background: "#f5f3ff", borderRadius: "8px", border: "1px solid #ede9fe" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#8b5cf6" }}>{styleErrors.length}</div>
                <div style={{ fontSize: "0.7rem", color: "#5b21b6", fontWeight: 600 }}>Style</div>
              </div>
            </div>
          </div>

          {/* Suggestions & Dictionary Card */}
          <div className="card" style={{ padding: "1.5rem", flex: 1, minHeight: "300px", display: "flex", flexDirection: "column" }}>
            {/* Tabs Header */}
            <div style={{ 
              display: "flex", 
              borderBottom: "1px solid var(--border-light)", 
              marginBottom: "1rem",
              paddingBottom: "0.5rem",
              gap: "1rem"
            }}>
              <button
                onClick={() => setSidebarTab("suggestions")}
                style={{
                  border: "none",
                  background: "transparent",
                  color: sidebarTab === "suggestions" ? "var(--primary)" : "var(--text-muted)",
                  fontSize: "1rem",
                  fontWeight: sidebarTab === "suggestions" ? 700 : 500,
                  cursor: "pointer",
                  paddingBottom: "0.25rem",
                  borderBottom: sidebarTab === "suggestions" ? "2px solid var(--primary)" : "2px solid transparent",
                  transition: "all 0.2s"
                }}
              >
                Suggestions ({errors.length})
              </button>
              
              <button
                onClick={() => setSidebarTab("dictionary")}
                style={{
                  border: "none",
                  background: "transparent",
                  color: sidebarTab === "dictionary" ? "var(--primary)" : "var(--text-muted)",
                  fontSize: "1rem",
                  fontWeight: sidebarTab === "dictionary" ? 700 : 500,
                  cursor: "pointer",
                  paddingBottom: "0.25rem",
                  borderBottom: sidebarTab === "dictionary" ? "2px solid var(--primary)" : "2px solid transparent",
                  transition: "all 0.2s"
                }}
              >
                Dictionary & Vocabulary
              </button>
            </div>

            {sidebarTab === "suggestions" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto", maxHeight: "450px", flex: 1 }}>
                {!hasChecked ? (
                  <div style={{ 
                    textAlign: "center", 
                    color: "var(--text-muted)", 
                    margin: "auto 0", 
                    padding: "2rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.75rem"
                  }}>
                    <BookOpen size={40} style={{ opacity: 0.3 }} />
                    <p style={{ fontSize: "0.95rem" }}>Enter your article and click <strong>Check Grammar</strong> to get real-time corrections.</p>
                  </div>
                ) : errors.length === 0 ? (
                  <div style={{ 
                    textAlign: "center", 
                    color: "var(--success)", 
                    margin: "auto 0", 
                    padding: "2rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.75rem"
                  }}>
                    <CheckCircle2 size={44} />
                    <div>
                      <h4 style={{ fontWeight: 800, marginBottom: "0.25rem" }}>Flawless Writing!</h4>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>We scanned your text and found absolutely zero spelling or grammar errors. Good job!</p>
                    </div>
                  </div>
                ) : (
                  errors.map((err, idx) => {
                    const categoryId = err.rule?.category?.id;
                    let borderLeftColor = "#ef4444"; // Typos
                    let categoryLabel = "Spelling";
                    let categoryBg = "#fee2e2";
                    let categoryColor = "#991b1b";

                    if (categoryId === "GRAMMAR" || categoryId === "MISC") {
                      borderLeftColor = "#3b82f6";
                      categoryLabel = "Grammar";
                      categoryBg = "#dbeafe";
                      categoryColor = "#1e3a8a";
                    } else if (categoryId === "STYLE" || categoryId === "REDUNDANCY") {
                      borderLeftColor = "#8b5cf6";
                      categoryLabel = "Style / Vocabulary";
                      categoryBg = "#ede9fe";
                      categoryColor = "#5b21b6";
                    }

                    const isActive = activeErrorIdx === idx;
                    const wordContext = text.substring(err.offset, err.offset + err.length);

                    return (
                      <div 
                        key={idx}
                        onClick={() => {
                          setActiveErrorIdx(idx);
                          setMode("review"); // switch to review mode to highlight the word
                        }}
                        style={{
                          padding: "1rem",
                          borderRadius: "10px",
                          border: `1px solid ${isActive ? borderLeftColor : "var(--border-light)"}`,
                          borderLeft: `5px solid ${borderLeftColor}`,
                          background: isActive ? "var(--bg-card)" : "#fdfdfd",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          boxShadow: isActive ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none"
                        }}
                      >
                        {/* Card Header Category */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                          <span style={{ 
                            fontSize: "0.7rem", 
                            fontWeight: 700, 
                            background: categoryBg, 
                            color: categoryColor, 
                            padding: "0.15rem 0.5rem", 
                            borderRadius: "4px",
                            textTransform: "uppercase"
                          }}>
                            {categoryLabel}
                          </span>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              ignoreError(idx);
                            }}
                            style={{
                              border: "none",
                              background: "transparent",
                              color: "var(--text-muted)",
                              fontSize: "0.75rem",
                              cursor: "pointer"
                            }}
                          >
                            Ignore
                          </button>
                        </div>

                        {/* Error Sentence Context */}
                        <p style={{ fontSize: "0.95rem", color: "var(--text-main)", marginBottom: "0.75rem" }}>
                          {err.message}
                        </p>

                        {/* Incorrect word highlight */}
                        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                          Original: <span style={{ textDecoration: "line-through", color: "#ef4444", fontWeight: 600 }}>{wordContext}</span>
                        </div>

                        {/* Suggestions list buttons */}
                        {err.replacements && err.replacements.length > 0 ? (
                          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                            {err.replacements.slice(0, 3).map((rep, rIdx) => (
                              <button
                                key={rIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  applyCorrection(err.offset, err.length, rep.value, idx);
                                }}
                                className="btn btn-secondary"
                                style={{
                                  padding: "0.25rem 0.65rem",
                                  fontSize: "0.775rem",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "0.25rem",
                                  background: "#eff6ff",
                                  border: "1px solid #bfdbfe",
                                  color: "#1d4ed8",
                                  fontWeight: 700
                                }}
                              >
                                {rep.value} <ChevronRight size={12} />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span style={{ fontSize: "0.775rem", color: "var(--text-muted)", fontStyle: "italic" }}>No corrections available</span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
                {/* Dictionary Lookup Search Input */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (dictQuery.trim()) {
                      handleLookupWord(dictQuery);
                    }
                  }}
                  style={{ display: "flex", gap: "0.5rem" }}
                >
                  <div style={{ position: "relative", flex: 1 }}>
                    <input 
                      type="text"
                      value={dictQuery}
                      onChange={(e) => setDictQuery(e.target.value)}
                      placeholder="Double-click a word or type here..."
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem 0.5rem 2rem",
                        borderRadius: "8px",
                        border: "1px solid var(--border-light)",
                        fontSize: "0.875rem",
                        outline: "none",
                        color: "var(--text-main)"
                      }}
                    />
                    <Search 
                      size={14} 
                      color="var(--text-muted)" 
                      style={{
                        position: "absolute",
                        left: "0.65rem",
                        top: "50%",
                        transform: "translateY(-50%)"
                      }} 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-secondary"
                    style={{ padding: "0.5rem 0.85rem", fontSize: "0.825rem" }}
                    disabled={dictLoading || !dictQuery.trim()}
                  >
                    Lookup
                  </button>
                </form>

                {/* Dictionary Results Body */}
                <div style={{ overflowY: "auto", maxHeight: "420px", flex: 1, paddingRight: "0.25rem" }}>
                  {dictLoading && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
                      <RefreshCw size={24} className="spin-animation" style={{ color: "var(--primary)" }} />
                    </div>
                  )}

                  {dictError && (
                    <div style={{ color: "#ef4444", fontSize: "0.85rem", background: "#fef2f2", padding: "1rem", borderRadius: "10px", textAlign: "center" }}>
                      {dictError}
                    </div>
                  )}

                  {!dictLoading && !dictError && !dictResults && (
                    <div style={{ 
                      textAlign: "center", 
                      color: "var(--text-muted)", 
                      padding: "2rem 1rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.75rem"
                    }}>
                      <Book size={40} style={{ opacity: 0.3 }} />
                      <p style={{ fontSize: "0.9rem" }}>
                        Double-click any word in the editor or search above to view definitions, phonetic spellings, and synonyms.
                      </p>
                    </div>
                  )}

                  {!dictLoading && !dictError && dictResults && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {/* Word & Phonetic */}
                      <div>
                        <h4 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-main)", textTransform: "capitalize", margin: 0 }}>
                          {dictResults.word}
                        </h4>
                        {dictResults.phonetics?.[0]?.text && (
                          <span style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 600 }}>
                            {dictResults.phonetics[0].text}
                          </span>
                        )}
                      </div>

                      {/* Meanings */}
                      {dictResults.meanings && dictResults.meanings.slice(0, 3).map((meaning: any, mIdx: number) => {
                        const synonyms: string[] = meaning.synonyms || [];
                        return (
                          <div key={mIdx} style={{ borderBottom: mIdx < dictResults.meanings.length - 1 ? "1px solid #f1f5f9" : "none", paddingBottom: "0.75rem" }}>
                            <span style={{ 
                              fontSize: "0.725rem", 
                              fontWeight: 700, 
                              color: "var(--primary)", 
                              background: "#eef2ff", 
                              padding: "0.15rem 0.5rem", 
                              borderRadius: "4px",
                              textTransform: "uppercase",
                              display: "inline-block",
                              marginBottom: "0.25rem"
                            }}>
                              {meaning.partOfSpeech}
                            </span>
                            <ul style={{ paddingLeft: "1.15rem", margin: "0.5rem 0", fontSize: "0.875rem", color: "var(--text-main)" }}>
                              {meaning.definitions.slice(0, 2).map((def: any, dIdx: number) => (
                                <li key={dIdx} style={{ marginBottom: "0.35rem" }}>
                                  {def.definition}
                                  {def.example && (
                                    <div style={{ fontStyle: "italic", fontSize: "0.775rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                                      &ldquo;{def.example}&rdquo;
                                    </div>
                                  )}
                                </li>
                              ))}
                            </ul>

                            {/* Synonyms badge list inside this meaning category */}
                            {synonyms.length > 0 && (
                              <div style={{ marginTop: "0.5rem" }}>
                                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.25rem" }}>
                                  Synonyms (click to replace):
                                </div>
                                <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                                  {synonyms.slice(0, 5).map((syn: string, sIdx: number) => (
                                    <button
                                      key={sIdx}
                                      onClick={() => handleReplaceWithSynonym(syn)}
                                      style={{
                                        border: "1px solid #bfdbfe",
                                        background: "#eff6ff",
                                        color: "#1d4ed8",
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        padding: "0.2rem 0.5rem",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        transition: "all 0.15s"
                                      }}
                                    >
                                      {syn}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS style rule overrides for spinner */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        .grammarly-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 1024px) {
          .grammarly-grid {
            grid-template-columns: 2.25fr 1fr;
          }
        }
        .translate-split {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .translate-split {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      {/* SEO Editorial Content */}
      <div className="prose" style={{ marginTop: "4rem" }}>
        <h2>What makes Grammarly Free different?</h2>
        <p>
          Grammarly Free is a comprehensive, client-side prose linter and grammar checker built specifically for digital creators, writers, and developers. By combining the powerful LanguageTool open-source NLP grammar check engines with lightweight layouts, it isolates your text, identifies orthographic mistakes, casing inconsistencies, grammar rules violations, and stylistic recommendations instantly.
        </p>
        <p>
          Unlike legacy cloud word processors, **your writing privacy is absolute**. All inputs are evaluated over localized secure protocols and temporary memory pools. No database histories are recorded and your essays, code documentation, or emails are never saved or harvested.
        </p>

        <h2>Understanding Grammar Check Categories</h2>
        <p>
          To help refine your writing, Grammarly Free groups error flags into three main diagnostic areas:
        </p>
        <ul>
          <li><strong>Spelling & Typos:</strong> Highlighted in red. Detects misspellings, character transpositions, or simple typographical mistakes, and cross-references standard dictionaries to offer correct alternates.</li>
          <li><strong>Grammar & Agreements:</strong> Highlighted in blue. Evaluates complex syntactic clauses such as subject-verb agreement errors, incorrect verb conjugations, pronoun shifts, or tense inconsistency errors.</li>
          <li><strong>Style & Punctuation:</strong> Highlighted in purple. Inspects sentence structure to identify wordy phrases, passive voice structures, missing punctuation marks, or repetitive adverbs that reduce readability.</li>
        </ul>

        <h2>Tips for Optimizing High-Volume Text Checks</h2>
        <p>
          If you are checking massive bodies of copy (up to 10,000 words), here are the recommended best practices to ensure fast response times:
        </p>
        <ol>
          <li><strong>Check Section-by-Section:</strong> If your document exceeds 5,000 words, copy and paste it section-by-section (e.g. chapter by chapter). This ensures that the suggestion cards sidebar is easier to navigate and limits network wait times.</li>
          <li><strong>Apply Corrections in Order:</strong> When resolving typos in review mode, apply corrections sequentially. This ensures that character offset shifts are recalculated accurately across subsequent lines.</li>
          <li><strong>Ignore Unwanted Suggestions:</strong> If you are writing fictional dialogue or technical code segments, use the <strong>Ignore</strong> option on suggestion cards to clear rule violations that don't match your writing intent.</li>
        </ol>
      </div>
    </div>
  );
}
