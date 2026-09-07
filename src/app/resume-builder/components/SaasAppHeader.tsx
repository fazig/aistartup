import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  LayoutDashboard,
  Target,
  Mail,
  ChevronDown,
  Plus,
  Copy,
  Printer,
  Settings,
  Check,
  ArrowLeft,
  ExternalLink
} from "lucide-react";
import { ResumeDocument, SaasActiveTab } from "../types";

interface SaasAppHeaderProps {
  activeTab: SaasActiveTab;
  setActiveTab: (tab: SaasActiveTab) => void;
  documents: ResumeDocument[];
  activeDoc: ResumeDocument;
  onSelectDoc: (id: string) => void;
  onCreateNewDoc: () => void;
  atsScore: number;
  onPrint: () => void;
  onOpenSettings: () => void;
  savedNotification: boolean;
}

export default function SaasAppHeader({
  activeTab,
  setActiveTab,
  documents,
  activeDoc,
  onSelectDoc,
  onCreateNewDoc,
  atsScore,
  onPrint,
  onOpenSettings,
  savedNotification
}: SaasAppHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#fbbf24";
    return "#ef4444";
  };

  return (
    <header className="saas-app-topbar">
      <div className="saas-app-topbar-inner">
        {/* Left: Brand + Document Switcher */}
        <div className="saas-topbar-left">
          <Link href="/resume-builder" className="saas-topbar-brand" title="ResumeCraft AI Home">
            <div className="saas-brand-icon">
              <FileText size={18} />
            </div>
            <div className="saas-brand-text">
              <span className="saas-brand-name">ResumeCraft</span>
              <span className="saas-brand-badge">SaaS</span>
            </div>
          </Link>

          <div className="saas-brand-divider" />

          {/* Document Switcher Dropdown */}
          <div className="saas-doc-switcher" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="saas-doc-switcher-btn"
              title="Switch Active Resume"
            >
              <FileText size={14} style={{ color: "var(--saas-primary)" }} />
              <span className="saas-doc-title-truncate">
                {activeDoc.title || "Untitled Resume"}
              </span>
              <span className="saas-doc-count-pill">{documents.length}</span>
              <ChevronDown size={14} style={{ transform: dropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
            </button>

            {dropdownOpen && (
              <div className="saas-doc-dropdown-menu">
                <div className="saas-doc-dropdown-header">
                  <span>My Resumes ({documents.length})</span>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onCreateNewDoc();
                    }}
                    className="saas-btn saas-btn-primary"
                    style={{ padding: "0.2rem 0.55rem", fontSize: "0.72rem" }}
                  >
                    <Plus size={12} /> New Resume
                  </button>
                </div>

                <div className="saas-doc-dropdown-list">
                  {documents.map(doc => {
                    const isActive = doc.id === activeDoc.id;
                    return (
                      <button
                        key={doc.id}
                        onClick={() => {
                          onSelectDoc(doc.id);
                          setDropdownOpen(false);
                        }}
                        className={`saas-doc-dropdown-item ${isActive ? "is-selected" : ""}`}
                      >
                        <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                          <div style={{ fontWeight: isActive ? 700 : 500, color: isActive ? "var(--saas-primary)" : "#ffffff", fontSize: "0.82rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {doc.title}
                          </div>
                          <div style={{ fontSize: "0.68rem", color: "var(--saas-text-muted)", marginTop: 2 }}>
                            {doc.targetRole || "General"} • Updated {new Date(doc.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                        {isActive && <Check size={14} style={{ color: "var(--saas-primary)", flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>

                <div className="saas-doc-dropdown-footer">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setActiveTab("dashboard");
                    }}
                    className="saas-dropdown-manage-link"
                  >
                    <LayoutDashboard size={13} /> Manage All Resumes in Dashboard →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Main SaaS View Tabs */}
        <nav className="saas-topbar-tabs">
          <button
            onClick={() => setActiveTab("studio")}
            className={`saas-view-tab ${activeTab === "studio" ? "is-active" : ""}`}
          >
            <Sparkles size={15} />
            <span>Studio Editor</span>
          </button>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`saas-view-tab ${activeTab === "dashboard" ? "is-active" : ""}`}
          >
            <LayoutDashboard size={15} />
            <span>My Resumes ({documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("job-matcher")}
            className={`saas-view-tab ${activeTab === "job-matcher" ? "is-active" : ""}`}
          >
            <Target size={15} />
            <span>ATS Job Matcher</span>
          </button>

          <button
            onClick={() => setActiveTab("cover-letter")}
            className={`saas-view-tab ${activeTab === "cover-letter" ? "is-active" : ""}`}
          >
            <Mail size={15} />
            <span>Cover Letter</span>
          </button>
        </nav>

        {/* Right: ATS Score Pill, Print CTA & Settings */}
        <div className="saas-topbar-right">
          {savedNotification && (
            <span className="saas-saved-pill">
              <Check size={12} /> Saved
            </span>
          )}

          {/* ATS Score Indicator */}
          <button
            onClick={() => setActiveTab("studio")}
            className="saas-score-pill"
            title="Current ATS Readiness Score"
          >
            <span style={{ fontSize: "0.72rem", color: "var(--saas-text-muted)", fontWeight: 600 }}>ATS:</span>
            <span
              style={{
                fontFamily: "monospace",
                fontWeight: 800,
                fontSize: "0.84rem",
                color: getScoreColor(atsScore)
              }}
            >
              {atsScore}/100
            </span>
          </button>

          {/* Quick PDF Print Button */}
          <button
            onClick={onPrint}
            className="saas-btn saas-btn-primary"
            style={{ padding: "0.45rem 0.95rem", fontSize: "0.82rem" }}
            title="Download Vector PDF"
          >
            <Printer size={14} />
            <span className="saas-hide-mobile">Vector PDF</span>
          </button>

          {/* Settings & Backups */}
          <button
            onClick={onOpenSettings}
            className="saas-icon-btn"
            title="Data Backups & Settings"
          >
            <Settings size={16} />
          </button>

          {/* Return to Main Site */}
          <Link
            href="/tools"
            className="saas-exit-link"
            title="Back to StartupAI Tools"
          >
            <ArrowLeft size={14} />
            <span className="saas-hide-mobile">StartupAI</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
