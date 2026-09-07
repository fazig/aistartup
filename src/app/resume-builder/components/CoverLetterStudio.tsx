import React, { useState, useEffect } from "react";
import {
  Mail,
  Sparkles,
  Printer,
  Copy,
  Plus,
  Trash2,
  FileText,
  RotateCcw,
  Check,
  Building,
  User,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { ResumeDocument, CoverLetterData } from "../types";
import { getAllCoverLetters, getActiveCoverLetter, saveCoverLetter } from "../storageEngine";
import { generateCoverLetterText } from "../aiAssistantEngine";

interface CoverLetterStudioProps {
  activeResume: ResumeDocument;
}

export default function CoverLetterStudio({ activeResume }: CoverLetterStudioProps) {
  const [letter, setLetter] = useState<CoverLetterData>(() => getActiveCoverLetter());
  const [zoom, setZoom] = useState(85);
  const [copied, setCopied] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  // Sync when active resume changes
  useEffect(() => {
    const current = getActiveCoverLetter();
    setLetter(current);
  }, [activeResume.id]);

  const updateLetter = (updater: (prev: CoverLetterData) => CoverLetterData) => {
    setLetter(prev => {
      const next = updater(prev);
      saveCoverLetter(next);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2000);
      return next;
    });
  };

  const handleGenerateAI = () => {
    const aiText = generateCoverLetterText(
      activeResume.data,
      letter.recipientTitle || activeResume.targetRole,
      letter.companyName || activeResume.targetCompany || "Innovate AI"
    );

    updateLetter(prev => ({
      ...prev,
      opening: aiText.opening,
      bodyParagraphs: [aiText.body1, aiText.body2],
      closing: aiText.closing,
      signatureName: activeResume.data.personal.fullName || prev.signatureName
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const fullText = [
      letter.letterDate,
      "",
      letter.recipientName,
      letter.recipientTitle,
      letter.companyName,
      letter.companyAddress,
      "",
      letter.salutation,
      "",
      letter.opening,
      "",
      ...letter.bodyParagraphs.map(p => p + "\n"),
      letter.closing,
      "",
      "Sincerely,",
      letter.signatureName
    ].join("\n");

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="saas-cover-container">
      {/* Studio Header Bar */}
      <div className="saas-studio-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div className="saas-logo-badge" style={{ background: "rgba(168, 85, 247, 0.15)", color: "#c084fc" }}>
            <Mail size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>
              Matched Cover Letter Studio
            </h2>
            <div style={{ fontSize: "0.72rem", color: "var(--saas-text-muted)" }}>
              Synchronized styling with {activeResume.title}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {savedNotice && (
            <span style={{ fontSize: "0.75rem", color: "#34d399", display: "flex", alignItems: "center", gap: 3 }}>
              <Check size={12} /> Auto-Saved
            </span>
          )}

          <button
            onClick={handleGenerateAI}
            className="saas-btn saas-btn-primary"
            style={{ padding: "0.4rem 0.85rem", fontSize: "0.78rem" }}
          >
            <Sparkles size={14} /> AI Generate Letter
          </button>

          <button
            onClick={handleCopyText}
            className="saas-btn saas-btn-secondary"
            style={{ padding: "0.4rem 0.8rem", fontSize: "0.78rem" }}
          >
            <Copy size={13} /> {copied ? "Copied!" : "Copy Text"}
          </button>

          <button
            onClick={handlePrint}
            className="saas-btn saas-btn-primary"
            style={{ padding: "0.4rem 1rem", fontSize: "0.78rem" }}
          >
            <Printer size={14} /> Vector PDF
          </button>
        </div>
      </div>

      {/* Dual Pane Desk */}
      <div className="saas-split-desk">
        {/* LEFT COLUMN: Letter Editor */}
        <aside className="saas-editor-side" style={{ width: 480 }}>
          <div className="saas-editor-body">
            {/* Recipient Details */}
            <div className="saas-card" style={{ padding: "1rem" }}>
              <h4 style={{ margin: "0 0 0.75rem 0", fontSize: "0.85rem", fontWeight: 700, color: "#ffffff", display: "flex", alignItems: "center", gap: 6 }}>
                <Building size={14} style={{ color: "var(--saas-primary)" }} /> Recipient & Company Information
              </h4>

              <div className="saas-row">
                <div className="saas-field">
                  <label className="saas-label">Recipient Name</label>
                  <input
                    type="text"
                    value={letter.recipientName}
                    onChange={e => updateLetter(p => ({ ...p, recipientName: e.target.value }))}
                    className="saas-input"
                    placeholder="Jane Doe or Hiring Team"
                  />
                </div>
                <div className="saas-field">
                  <label className="saas-label">Recipient Title</label>
                  <input
                    type="text"
                    value={letter.recipientTitle}
                    onChange={e => updateLetter(p => ({ ...p, recipientTitle: e.target.value }))}
                    className="saas-input"
                    placeholder="Head of Talent Acquisition"
                  />
                </div>
              </div>

              <div className="saas-row">
                <div className="saas-field">
                  <label className="saas-label">Company Name</label>
                  <input
                    type="text"
                    value={letter.companyName}
                    onChange={e => updateLetter(p => ({ ...p, companyName: e.target.value }))}
                    className="saas-input"
                    placeholder="Innovate AI Corp"
                  />
                </div>
                <div className="saas-field">
                  <label className="saas-label">Letter Date</label>
                  <input
                    type="text"
                    value={letter.letterDate}
                    onChange={e => updateLetter(p => ({ ...p, letterDate: e.target.value }))}
                    className="saas-input"
                  />
                </div>
              </div>

              <div className="saas-field">
                <label className="saas-label">Company Address / Location</label>
                <input
                  type="text"
                  value={letter.companyAddress}
                  onChange={e => updateLetter(p => ({ ...p, companyAddress: e.target.value }))}
                  className="saas-input"
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>

            {/* Letter Content */}
            <div className="saas-card" style={{ padding: "1rem" }}>
              <h4 style={{ margin: "0 0 0.75rem 0", fontSize: "0.85rem", fontWeight: 700, color: "#ffffff", display: "flex", alignItems: "center", gap: 6 }}>
                <FileText size={14} style={{ color: "var(--saas-primary)" }} /> Letter Content & Narrative
              </h4>

              <div className="saas-field">
                <label className="saas-label">Salutation</label>
                <input
                  type="text"
                  value={letter.salutation}
                  onChange={e => updateLetter(p => ({ ...p, salutation: e.target.value }))}
                  className="saas-input"
                  placeholder="Dear Hiring Manager,"
                />
              </div>

              <div className="saas-field">
                <label className="saas-label">Opening Hook Paragraph</label>
                <textarea
                  value={letter.opening}
                  onChange={e => updateLetter(p => ({ ...p, opening: e.target.value }))}
                  className="saas-textarea"
                  rows={4}
                  placeholder="Why you are writing and your immediate value proposition..."
                />
              </div>

              {/* Body Paragraphs */}
              {letter.bodyParagraphs.map((para, idx) => (
                <div key={idx} className="saas-field" style={{ position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                    <label className="saas-label" style={{ margin: 0 }}>
                      Body Paragraph {idx + 1} (Impact & Metrics)
                    </label>
                    {letter.bodyParagraphs.length > 1 && (
                      <button
                        onClick={() => updateLetter(p => ({
                          ...p,
                          bodyParagraphs: p.bodyParagraphs.filter((_, i) => i !== idx)
                        }))}
                        className="saas-icon-btn"
                        title="Remove paragraph"
                        style={{ width: 20, height: 20, color: "#ef4444" }}
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                  <textarea
                    value={para}
                    onChange={e => {
                      const val = e.target.value;
                      updateLetter(p => {
                        const copy = [...p.bodyParagraphs];
                        copy[idx] = val;
                        return { ...p, bodyParagraphs: copy };
                      });
                    }}
                    className="saas-textarea"
                    rows={4}
                  />
                </div>
              ))}

              <button
                onClick={() => updateLetter(p => ({
                  ...p,
                  bodyParagraphs: [...p.bodyParagraphs, ""]
                }))}
                className="saas-btn saas-btn-secondary"
                style={{ width: "100%", justifyContent: "center", fontSize: "0.76rem", marginTop: "0.4rem" }}
              >
                <Plus size={13} /> Add Another Paragraph
              </button>

              <div className="saas-field" style={{ marginTop: "1rem" }}>
                <label className="saas-label">Closing Call to Action</label>
                <textarea
                  value={letter.closing}
                  onChange={e => updateLetter(p => ({ ...p, closing: e.target.value }))}
                  className="saas-textarea"
                  rows={3}
                />
              </div>

              <div className="saas-field">
                <label className="saas-label">Signature Full Name</label>
                <input
                  type="text"
                  value={letter.signatureName}
                  onChange={e => updateLetter(p => ({ ...p, signatureName: e.target.value }))}
                  className="saas-input"
                  placeholder="Alex Rivera"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: Live Cover Letter WYSIWYG Sheet */}
        <main className="saas-canvas-side">
          {/* Zoom Toolbar */}
          <div className="saas-canvas-bar">
            <span style={{ fontSize: "0.75rem", color: "var(--saas-text-muted)", fontFamily: "monospace" }}>Zoom:</span>
            <button
              onClick={() => setZoom(prev => Math.max(prev - 10, 40))}
              style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}
            >
              <ZoomOut size={14} />
            </button>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff", fontFamily: "monospace", minWidth: 38, textAlign: "center" }}>
              {zoom}%
            </span>
            <button
              onClick={() => setZoom(prev => Math.min(prev + 10, 150))}
              style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}
            >
              <ZoomIn size={14} />
            </button>
            <div style={{ width: 1, height: 14, background: "var(--saas-border)" }} />
            <button onClick={() => setZoom(85)} style={{ background: "transparent", border: "none", color: "var(--saas-text-muted)", fontSize: "0.75rem", cursor: "pointer" }}>
              Fit
            </button>
            <button onClick={() => setZoom(100)} style={{ background: "transparent", border: "none", color: "var(--saas-text-muted)", fontSize: "0.75rem", cursor: "pointer" }}>
              100%
            </button>
          </div>

          {/* Printable Sheet */}
          <div
            className="saas-canvas-scale"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <div
              id="resume-preview-sheet"
              className="saas-paper-sheet saas-cover-letter-sheet"
              style={{ width: "794px", minHeight: "1123px", padding: "60px 70px" }}
            >
              {/* Header */}
              <div style={{ borderBottom: `2px solid ${activeResume.theme?.primaryColor || "#10b981"}`, paddingBottom: 24, marginBottom: 32 }}>
                <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>
                  {letter.signatureName || activeResume.data.personal.fullName}
                </h1>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: activeResume.theme?.primaryColor || "#10b981", marginBottom: 12 }}>
                  {activeResume.data.personal.jobTitle}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.82rem", color: "#64748b" }}>
                  {activeResume.data.personal.email && <span>{activeResume.data.personal.email}</span>}
                  {activeResume.data.personal.phone && <span>• {activeResume.data.personal.phone}</span>}
                  {activeResume.data.personal.location && <span>• {activeResume.data.personal.location}</span>}
                  {activeResume.data.personal.linkedin && <span>• {activeResume.data.personal.linkedin}</span>}
                </div>
              </div>

              {/* Date & Recipient Address */}
              <div style={{ marginBottom: 28, fontSize: "0.88rem", color: "#334155", lineHeight: 1.5 }}>
                <div style={{ marginBottom: 14, fontWeight: 500 }}>{letter.letterDate}</div>
                {letter.recipientName && <div style={{ fontWeight: 700, color: "#0f172a" }}>{letter.recipientName}</div>}
                {letter.recipientTitle && <div>{letter.recipientTitle}</div>}
                {letter.companyName && <div style={{ fontWeight: 600 }}>{letter.companyName}</div>}
                {letter.companyAddress && <div>{letter.companyAddress}</div>}
              </div>

              {/* Salutation */}
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a", marginBottom: 18 }}>
                {letter.salutation}
              </div>

              {/* Body Text */}
              <div style={{ fontSize: "0.9rem", color: "#1e293b", lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ margin: 0 }}>{letter.opening}</p>
                {letter.bodyParagraphs.map((para, i) => (
                  <p key={i} style={{ margin: 0 }}>{para}</p>
                ))}
                <p style={{ margin: 0 }}>{letter.closing}</p>
              </div>

              {/* Sign-off */}
              <div style={{ marginTop: 36, fontSize: "0.9rem", color: "#0f172a" }}>
                <div>Sincerely,</div>
                <div style={{ marginTop: 24, fontSize: "1.1rem", fontWeight: 800, color: activeResume.theme?.primaryColor || "#10b981", fontFamily: "serif" }}>
                  {letter.signatureName}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
