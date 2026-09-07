import React, { useState } from "react";
import {
  Plus,
  FileText,
  Sparkles,
  Copy,
  Trash2,
  Edit3,
  Download,
  Target,
  Clock,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Layers,
  Wand2
} from "lucide-react";
import { ResumeDocument, SaasActiveTab } from "../types";
import { ROLE_PRESETS } from "../rolePresets";
import { calculateATSScore } from "../atsScoreEngine";

interface ResumesDashboardProps {
  documents: ResumeDocument[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
  onCreateNewDoc: (title?: string, presetKey?: string) => void;
  onDuplicateDoc: (id: string) => void;
  onDeleteDoc: (id: string) => void;
  onRenameDoc: (id: string, newTitle: string) => void;
  setActiveTab: (tab: SaasActiveTab) => void;
}

export default function ResumesDashboard({
  documents,
  activeDocId,
  onSelectDoc,
  onCreateNewDoc,
  onDuplicateDoc,
  onDeleteDoc,
  onRenameDoc,
  setActiveTab
}: ResumesDashboardProps) {
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [showPresetModal, setShowPresetModal] = useState(false);

  const startRename = (doc: ResumeDocument) => {
    setEditingDocId(doc.id);
    setEditingTitle(doc.title);
  };

  const saveRename = (id: string) => {
    if (editingTitle.trim()) {
      onRenameDoc(id, editingTitle.trim());
    }
    setEditingDocId(null);
  };

  const handleExportSingleJSON = (doc: ResumeDocument) => {
    const blob = new Blob([JSON.stringify(doc.data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(doc.title || "resume").toLowerCase().replace(/[^a-z0-9]/g, "_")}_backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="saas-dashboard-container">
      {/* Dashboard Top Hero */}
      <div className="saas-dashboard-header">
        <div>
          <div className="saas-dashboard-badge">
            <Layers size={14} /> Multi-Resume Workspace
          </div>
          <h1 className="saas-dashboard-title">
            My Professional Resumes
          </h1>
          <p className="saas-dashboard-desc">
            Manage tailored resumes for different target roles, test each against ATS algorithms, and export vector-ready PDFs.
          </p>
        </div>

        <div className="saas-dashboard-cta-group">
          <button
            onClick={() => setShowPresetModal(true)}
            className="saas-btn saas-btn-secondary"
          >
            <Wand2 size={15} /> Start from Role Preset
          </button>
          <button
            onClick={() => onCreateNewDoc()}
            className="saas-btn saas-btn-primary"
          >
            <Plus size={16} /> Create Blank Resume
          </button>
        </div>
      </div>

      {/* Preset Picker Modal */}
      {showPresetModal && (
        <div className="saas-modal-backdrop" onClick={() => setShowPresetModal(false)}>
          <div className="saas-modal-card" onClick={e => e.stopPropagation()}>
            <div className="saas-modal-header">
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#ffffff" }}>
                Choose a Recruiter Role Preset
              </h3>
              <button onClick={() => setShowPresetModal(false)} className="saas-modal-close">✕</button>
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--saas-text-muted)", marginBottom: "1.2rem" }}>
              Instant production-ready career history with Google XYZ bullets, categorized skills, and verified ATS keywords.
            </p>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {ROLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    onCreateNewDoc(preset.name, preset.id);
                    setShowPresetModal(false);
                    setActiveTab("studio");
                  }}
                  className="saas-preset-card-btn"
                >
                  <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "0.95rem" }}>
                    {preset.name}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--saas-text-muted)", marginTop: "0.25rem" }}>
                    {preset.data.experience.length} roles • {preset.data.skills.length} skill groups • {preset.data.projects.length} featured projects
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Resumes Grid */}
      <div className="saas-docs-grid">
        {documents.map(doc => {
          const isActive = doc.id === activeDocId;
          const ats = calculateATSScore(doc.data);

          return (
            <div key={doc.id} className={`saas-doc-card ${isActive ? "is-active-card" : ""}`}>
              {/* Card Header */}
              <div className="saas-doc-card-header">
                <div style={{ flex: 1, minWidth: 0 }}>
                  {editingDocId === doc.id ? (
                    <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={e => setEditingTitle(e.target.value)}
                        className="saas-input"
                        style={{ padding: "0.3rem 0.6rem", fontSize: "0.85rem" }}
                        autoFocus
                        onKeyDown={e => {
                          if (e.key === "Enter") saveRename(doc.id);
                          if (e.key === "Escape") setEditingDocId(null);
                        }}
                      />
                      <button
                        onClick={() => saveRename(doc.id)}
                        className="saas-btn saas-btn-primary"
                        style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <h3 className="saas-doc-card-title">
                        {doc.title}
                      </h3>
                      <button
                        onClick={() => startRename(doc)}
                        className="saas-icon-btn"
                        title="Rename resume"
                        style={{ width: 22, height: 22 }}
                      >
                        <Edit3 size={11} />
                      </button>
                    </div>
                  )}

                  <div className="saas-doc-card-subtitle">
                    <Briefcase size={12} /> {doc.targetRole || "General"}
                    {doc.targetCompany && <span> • @{doc.targetCompany}</span>}
                  </div>
                </div>

                {/* ATS Score Tag */}
                <div
                  className="saas-doc-ats-badge"
                  style={{
                    borderColor: ats.score >= 80 ? "rgba(16, 185, 129, 0.4)" : "rgba(251, 191, 36, 0.4)",
                    color: ats.score >= 80 ? "#34d399" : "#fbbf24"
                  }}
                  title="ATS Readiness Score"
                >
                  <Target size={12} />
                  <span>{ats.score}/100</span>
                </div>
              </div>

              {/* Card Meta Stats */}
              <div className="saas-doc-card-stats">
                <div className="saas-doc-stat-pill">
                  <span>Template:</span>
                  <strong>{doc.theme?.templateId?.toUpperCase() || "MODERN"}</strong>
                </div>
                <div className="saas-doc-stat-pill">
                  <span>Experience:</span>
                  <strong>{doc.data?.experience?.length || 0} jobs</strong>
                </div>
                <div className="saas-doc-stat-pill">
                  <span>Skills:</span>
                  <strong>{doc.data?.skills?.flatMap(s => s.skills)?.length || 0} items</strong>
                </div>
              </div>

              {/* Updated Timestamp */}
              <div className="saas-doc-card-time">
                <Clock size={12} /> Updated {new Date(doc.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>

              {/* Card Action Footer */}
              <div className="saas-doc-card-actions">
                <button
                  onClick={() => {
                    onSelectDoc(doc.id);
                    setActiveTab("studio");
                  }}
                  className="saas-btn saas-btn-primary"
                  style={{ flex: 1, padding: "0.5rem 0.8rem", fontSize: "0.82rem" }}
                >
                  <Edit3 size={14} /> Edit in Studio
                </button>

                <button
                  onClick={() => {
                    onSelectDoc(doc.id);
                    setActiveTab("job-matcher");
                  }}
                  className="saas-btn saas-btn-secondary"
                  title="Match against a Job Posting"
                  style={{ padding: "0.5rem 0.75rem" }}
                >
                  <Target size={14} /> Match Job
                </button>

                <button
                  onClick={() => onDuplicateDoc(doc.id)}
                  className="saas-icon-btn"
                  title="Duplicate this resume"
                >
                  <Copy size={14} />
                </button>

                <button
                  onClick={() => handleExportSingleJSON(doc)}
                  className="saas-icon-btn"
                  title="Export JSON backup"
                >
                  <Download size={14} />
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${doc.title}"?`)) {
                      onDeleteDoc(doc.id);
                    }
                  }}
                  className="saas-icon-btn saas-btn-danger-hover"
                  title="Delete resume"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
