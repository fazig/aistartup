"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Printer,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  Sparkles,
  Palette,
  LayoutTemplate,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Award,
  Languages as LangIcon,
  Plus,
  Trash2,
  Upload,
  Check,
  FileDown,
  Sliders,
  FolderGit2,
  CheckCircle2,
  Camera,
  AlertCircle,
  Copy,
  Zap,
  Target
} from "lucide-react";

import {
  ResumeData,
  ResumeTheme,
  TemplateId,
  WorkExperience,
  Education,
  SkillCategory,
  Project,
  Certification,
  Language
} from "../tools/resume-builder/types";

import {
  DEFAULT_RESUME_DATA,
  DEFAULT_RESUME_THEME,
  COLOR_PRESETS,
  TEMPLATE_INFO
} from "../tools/resume-builder/defaultData";

import { ROLE_PRESETS, POWER_VERBS } from "./rolePresets";
import { ResumeDocument } from "./types";
import {
  improveBulletPoint,
  transformToXYZFormula,
  generateBulletsForRole,
  generateSummaryForProfile
} from "./aiAssistantEngine";
import { analyzeResumeATS } from "./atsScoreEngine";
import ResumeRenderer from "../tools/resume-builder/templates/ResumeRenderer";
import "./resume-saas.css";

const STORAGE_DATA_KEY = "resumecraft_saas_data_v1";
const STORAGE_THEME_KEY = "resumecraft_saas_theme_v1";

interface ResumeStudioAppProps {
  activeDoc?: ResumeDocument;
  onUpdateDoc?: (doc: ResumeDocument) => void;
  onOpenDashboard?: () => void;
}

export default function ResumeStudioApp({
  activeDoc,
  onUpdateDoc,
  onOpenDashboard
}: ResumeStudioAppProps = {}) {
  const [data, setData] = useState<ResumeData>(() => (activeDoc ? activeDoc.data : DEFAULT_RESUME_DATA));
  const [theme, setTheme] = useState<ResumeTheme>(() => (activeDoc ? activeDoc.theme : DEFAULT_RESUME_THEME));
  const [activeTab, setActiveTab] = useState<"content" | "templates" | "theme" | "ats">("content");
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [activeRolePreset, setActiveRolePreset] = useState<string>("swe");
  const [zoom, setZoom] = useState<number>(85);
  const [showMobilePreview, setShowMobilePreview] = useState<boolean>(false);
  const [savedNotif, setSavedNotif] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Mount & load storage
  useEffect(() => {
    if (activeDoc) {
      setData(activeDoc.data);
      setTheme(activeDoc.theme);
    } else {
      try {
        const savedD = localStorage.getItem(STORAGE_DATA_KEY);
        const savedT = localStorage.getItem(STORAGE_THEME_KEY);
        if (savedD) setData(JSON.parse(savedD));
        if (savedT) setTheme(JSON.parse(savedT));
      } catch (e) {
        console.warn(e);
      }
    }
    setIsMounted(true);
  }, [activeDoc?.id]);

  // Save changes
  useEffect(() => {
    if (!isMounted) return;
    if (activeDoc && onUpdateDoc) {
      onUpdateDoc({
        ...activeDoc,
        data,
        theme,
        updatedAt: new Date().toISOString()
      });
    } else {
      try {
        localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data));
        localStorage.setItem(STORAGE_THEME_KEY, JSON.stringify(theme));
      } catch (e) {
        console.warn(e);
      }
    }
    setSavedNotif(true);
    const timer = setTimeout(() => setSavedNotif(false), 1400);
    return () => clearTimeout(timer);
  }, [data, theme, isMounted]);

  // Live ATS Analysis
  const atsAnalysis = useMemo(() => {
    return analyzeResumeATS(data);
  }, [data]);

  // Print PDF
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Load Preset
  const handleLoadRolePreset = (presetId: string) => {
    const found = ROLE_PRESETS.find(p => p.id === presetId);
    if (found) {
      if (window.confirm(`Load ${found.name} preset? Current unsaved edits will be replaced.`)) {
        setData(found.data);
        setActiveRolePreset(presetId);
      }
    }
  };

  // Blank Slate
  const handleClearAll = () => {
    if (window.confirm("Clear all resume fields? You will start with an empty canvas.")) {
      setData({
        personal: {
          fullName: "",
          jobTitle: "",
          email: "",
          phone: "",
          location: "",
          website: "",
          linkedin: "",
          github: "",
          photoUrl: ""
        },
        summary: "",
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: []
      });
      setActiveRolePreset("");
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const payload = { data, theme, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(data.personal.fullName || "resume").toLowerCase().replace(/\s+/g, "_")}_resume.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.data && parsed.theme) {
          setData(parsed.data);
          setTheme(parsed.theme);
        } else if (parsed.personal) {
          setData(parsed);
        }
        alert("Resume imported successfully!");
      } catch (err) {
        alert("Invalid resume JSON file.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Copy Plain Text for ATS job applications
  const handleCopyPlainText = () => {
    const lines = [
      data.personal.fullName,
      data.personal.jobTitle,
      `Email: ${data.personal.email} | Phone: ${data.personal.phone} | Location: ${data.personal.location}`,
      data.personal.linkedin ? `LinkedIn: ${data.personal.linkedin}` : "",
      data.personal.github ? `GitHub: ${data.personal.github}` : "",
      "\n--- PROFESSIONAL SUMMARY ---\n",
      data.summary,
      "\n--- EXPERIENCE ---\n",
      ...data.experience.map(e => `${e.role} at ${e.company} (${e.startDate} - ${e.endDate})\n` + e.highlights.map(h => `  • ${h}`).join("\n")),
      "\n--- EDUCATION ---\n",
      ...data.education.map(ed => `${ed.degree} - ${ed.school} (${ed.startDate} - ${ed.endDate})`),
      "\n--- SKILLS ---\n",
      ...data.skills.map(s => `${s.name}: ${s.skills.join(", ")}`)
    ].filter(Boolean).join("\n");

    navigator.clipboard.writeText(lines);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Please select an image smaller than 2MB for fast vector PDF rendering.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setData(prev => ({
        ...prev,
        personal: { ...prev.personal, photoUrl: base64 }
      }));
    };
    reader.readAsDataURL(file);
  };

  // Updaters for Experience
  const addExperience = () => {
    const newItem: WorkExperience = {
      id: "exp-" + Date.now(),
      company: "Company Name",
      role: "Job Title",
      location: "City, State",
      startDate: "2023",
      endDate: "Present",
      current: true,
      highlights: [
        "Architected core technical initiatives driving 35% improvements in system reliability.",
        "Collaborated cross-functionally across product, design, and engineering to ship features."
      ]
    };
    setData(prev => ({ ...prev, experience: [newItem, ...prev.experience] }));
  };

  const updateExperience = (index: number, field: keyof WorkExperience, value: any) => {
    setData(prev => {
      const copy = [...prev.experience];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, experience: copy };
    });
  };

  const removeExperience = (index: number) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addHighlight = (expIdx: number, defaultText?: string) => {
    setData(prev => {
      const copy = [...prev.experience];
      copy[expIdx].highlights = [...copy[expIdx].highlights, defaultText || "New quantitative achievement or impact metric..."];
      return { ...prev, experience: copy };
    });
  };

  const updateHighlight = (expIdx: number, hlIdx: number, text: string) => {
    setData(prev => {
      const copy = [...prev.experience];
      copy[expIdx].highlights[hlIdx] = text;
      return { ...prev, experience: copy };
    });
  };

  const removeHighlight = (expIdx: number, hlIdx: number) => {
    setData(prev => {
      const copy = [...prev.experience];
      copy[expIdx].highlights = copy[expIdx].highlights.filter((_, i) => i !== hlIdx);
      return { ...prev, experience: copy };
    });
  };

  // Updaters for Education
  const addEducation = () => {
    const newItem: Education = {
      id: "edu-" + Date.now(),
      school: "University or Institute",
      degree: "Bachelor of Science",
      location: "City, State",
      startDate: "2018",
      endDate: "2022",
      gpa: "3.8 / 4.0"
    };
    setData(prev => ({ ...prev, education: [newItem, ...prev.education] }));
  };

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    setData(prev => {
      const copy = [...prev.education];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, education: copy };
    });
  };

  const removeEducation = (index: number) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  // Updaters for Skills
  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      id: "skill-" + Date.now(),
      name: "New Skill Category",
      skills: ["Skill 1", "Skill 2", "Skill 3"]
    };
    setData(prev => ({ ...prev, skills: [...prev.skills, newCat] }));
  };

  const updateSkillName = (index: number, name: string) => {
    setData(prev => {
      const copy = [...prev.skills];
      copy[index].name = name;
      return { ...prev, skills: copy };
    });
  };

  const updateSkillItems = (index: number, raw: string) => {
    const items = raw.split(",").map(s => s.trim()).filter(Boolean);
    setData(prev => {
      const copy = [...prev.skills];
      copy[index].skills = items;
      return { ...prev, skills: copy };
    });
  };

  const removeSkillCategory = (index: number) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Updaters for Projects
  const addProject = () => {
    const newItem: Project = {
      id: "proj-" + Date.now(),
      title: "Project Name",
      role: "Lead Developer",
      techStack: "React, TypeScript, Tailwind",
      link: "https://github.com/...",
      description: "Built high-performance web utility serving thousands of daily active users."
    };
    setData(prev => ({ ...prev, projects: [...prev.projects, newItem] }));
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    setData(prev => {
      const copy = [...prev.projects];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, projects: copy };
    });
  };

  const removeProject = (index: number) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  // Updaters for Certifications
  const addCertification = () => {
    const newItem: Certification = {
      id: "cert-" + Date.now(),
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2024"
    };
    setData(prev => ({ ...prev, certifications: [...prev.certifications, newItem] }));
  };

  const updateCertification = (index: number, field: keyof Certification, value: any) => {
    setData(prev => {
      const copy = [...prev.certifications];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, certifications: copy };
    });
  };

  const removeCertification = (index: number) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  // Updaters for Languages
  const addLanguage = () => {
    const newItem: Language = {
      id: "lang-" + Date.now(),
      language: "Language Name",
      proficiency: "Fluent"
    };
    setData(prev => ({ ...prev, languages: [...prev.languages, newItem] }));
  };

  const updateLanguage = (index: number, field: keyof Language, value: any) => {
    setData(prev => {
      const copy = [...prev.languages];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, languages: copy };
    });
  };

  const removeLanguage = (index: number) => {
    setData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const isLetter = theme.paperSize === "letter";
  const paperWidth = isLetter ? 816 : 794;
  const paperHeight = isLetter ? 1056 : 1123;

  return (
    <div id="studio" className="saas-studio-wrapper">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportJSON}
        accept="application/json"
        style={{ display: "none" }}
      />
      <input
        type="file"
        ref={photoInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Top Studio Control Bar */}
      <div className="saas-studio-bar">
        {/* Preset Career Profiles */}
        <div className="saas-preset-group">
          <span className="saas-preset-lbl">1-Click Role Presets:</span>
          {ROLE_PRESETS.map(preset => (
            <button
              key={preset.id}
              onClick={() => handleLoadRolePreset(preset.id)}
              className={`saas-preset-pill ${activeRolePreset === preset.id ? "is-active" : ""}`}
            >
              {preset.name}
            </button>
          ))}
          <button
            onClick={handleClearAll}
            className="saas-preset-pill"
            style={{ color: "var(--saas-danger)", borderColor: "rgba(239, 68, 68, 0.3)" }}
          >
            Clear Slate
          </button>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {savedNotif && (
            <span style={{ fontSize: "0.75rem", color: "var(--saas-primary)", display: "flex", alignItems: "center", gap: 3, fontFamily: "monospace" }}>
              <Check size={13} /> Auto-Saved
            </span>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import JSON resume"
            className="saas-btn saas-btn-secondary"
            style={{ padding: "0.4rem 0.8rem", fontSize: "0.78rem" }}
          >
            <Upload size={13} /> Import
          </button>

          <button
            onClick={handleExportJSON}
            title="Save JSON backup"
            className="saas-btn saas-btn-secondary"
            style={{ padding: "0.4rem 0.8rem", fontSize: "0.78rem" }}
          >
            <FileDown size={13} /> Save JSON
          </button>

          <button
            onClick={handleCopyPlainText}
            title="Copy formatted text for ATS forms"
            className="saas-btn saas-btn-secondary"
            style={{ padding: "0.4rem 0.8rem", fontSize: "0.78rem" }}
          >
            <Copy size={13} /> {copiedText ? "Copied!" : "Copy Text"}
          </button>

          {/* Primary PDF Download Button */}
          <button
            onClick={handlePrint}
            className="saas-btn saas-btn-primary"
            style={{ padding: "0.45rem 1.15rem", fontSize: "0.82rem" }}
          >
            <Printer size={15} /> Download Vector PDF
          </button>

          {/* Mobile Preview Toggle */}
          <button
            onClick={() => setShowMobilePreview(!showMobilePreview)}
            className="saas-btn saas-btn-secondary saas-mobile-toggle"
            title="Toggle between Editor and Live Preview"
          >
            {showMobilePreview ? <Sliders size={14} /> : <Eye size={14} />}
            <span>{showMobilePreview ? "Editor" : "Preview"}</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Pane Studio Desk */}
      <div className="saas-split-desk">
        {/* LEFT PANEL: Editor, Templates, Style & ATS Score */}
        <aside className={`saas-editor-side ${showMobilePreview ? "saas-mobile-hide" : ""}`}>
          {/* Tabs */}
          <div className="saas-side-tabs">
            <button
              onClick={() => setActiveTab("content")}
              className={`saas-stab ${activeTab === "content" ? "is-active" : ""}`}
            >
              <FileText size={15} /> Content
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`saas-stab ${activeTab === "templates" ? "is-active" : ""}`}
            >
              <LayoutTemplate size={15} /> Templates (10)
            </button>
            <button
              onClick={() => setActiveTab("theme")}
              className={`saas-stab ${activeTab === "theme" ? "is-active" : ""}`}
            >
              <Palette size={15} /> Design
            </button>
            <button
              onClick={() => setActiveTab("ats")}
              className={`saas-stab ${activeTab === "ats" ? "is-active" : ""}`}
              style={{ color: atsAnalysis.score >= 80 ? "#34d399" : "#fbbf24" }}
            >
              <Target size={15} /> ATS Score
              <span
                style={{
                  fontSize: "0.65rem",
                  fontFamily: "monospace",
                  padding: "0.1rem 0.35rem",
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.1)"
                }}
              >
                {atsAnalysis.score}
              </span>
            </button>
          </div>

          {/* TAB 1: TEMPLATES */}
          {activeTab === "templates" && (
            <div className="saas-editor-scroll">
              <div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, margin: "0 0 0.25rem 0", color: "#ffffff" }}>
                  Select a Recruiter-Approved Layout
                </h3>
                <p style={{ fontSize: "0.78rem", color: "var(--saas-text-muted)", margin: 0 }}>
                  10 structural templates tested against major enterprise ATS scanners.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {TEMPLATE_INFO.map(t => {
                  const isSelected = theme.templateId === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setTheme(prev => ({ ...prev, templateId: t.id as TemplateId }))}
                      className="saas-card"
                      style={{
                        cursor: "pointer",
                        borderColor: isSelected ? "var(--saas-primary)" : "var(--saas-border)",
                        background: isSelected ? "rgba(16, 185, 129, 0.08)" : "var(--saas-surface-card)",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#ffffff" }}>{t.name}</span>
                          <span className="saas-nav-badge">{t.badge}</span>
                        </div>
                        <p style={{ fontSize: "0.72rem", color: "var(--saas-text-muted)", margin: 0, lineHeight: 1.4 }}>
                          {t.desc}
                        </p>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.4rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)", fontSize: "0.7rem", color: "var(--saas-text-subtle)" }}>
                        <span>{isSelected ? "Active Template" : "Click to apply"}</span>
                        {isSelected && <CheckCircle2 size={14} color="var(--saas-primary)" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: STYLING & DESIGN */}
          {activeTab === "theme" && (
            <div className="saas-editor-scroll">
              {/* Accent Color Palette */}
              <div>
                <label className="saas-label" style={{ display: "block", marginBottom: "0.5rem" }}>
                  Accent Color Palette (10 Presets)
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.5rem" }}>
                  {COLOR_PRESETS.map(preset => (
                    <button
                      key={preset.name}
                      onClick={() =>
                        setTheme(prev => ({
                          ...prev,
                          primaryColor: preset.primary,
                          accentColor: preset.accent
                        }))
                      }
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.3rem",
                        background: "var(--saas-surface-card)",
                        border: theme.primaryColor === preset.primary ? "1px solid var(--saas-primary)" : "1px solid var(--saas-border)",
                        borderRadius: 8,
                        padding: "0.6rem 0.2rem",
                        cursor: "pointer"
                      }}
                    >
                      <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: preset.primary }} />
                      <span style={{ fontSize: "0.65rem", color: "var(--saas-text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%", textAlign: "center" }}>
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Custom Hex Row */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "var(--saas-surface-input)", border: "1px solid var(--saas-border)", borderRadius: 8, padding: "0.5rem 0.75rem", marginTop: "0.75rem" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: theme.primaryColor, border: "1px solid var(--saas-border-light)" }} />
                  <div style={{ flex: 1 }}>
                    <label className="saas-label" style={{ fontSize: "0.68rem", display: "block" }}>Custom Brand Hex</label>
                    <input
                      type="text"
                      value={theme.primaryColor}
                      onChange={e => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="saas-input"
                      style={{ padding: "0.25rem 0.5rem", fontFamily: "monospace" }}
                      placeholder="#10b981"
                    />
                  </div>
                  <input
                    type="color"
                    value={theme.primaryColor.startsWith("#") && theme.primaryColor.length === 7 ? theme.primaryColor : "#10b981"}
                    onChange={e => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                    style={{ width: 28, height: 28, border: "none", background: "transparent", cursor: "pointer" }}
                  />
                </div>
              </div>

              {/* Typography Pairings */}
              <div>
                <label className="saas-label" style={{ display: "block", marginBottom: "0.5rem" }}>
                  Typography Pairings
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {[
                    { id: "sans", name: "Modern Sans (Inter / System)" },
                    { id: "serif", name: "Executive Serif (Georgia)" },
                    { id: "mono", name: "Clean Tech (Monospace)" },
                    { id: "geometric", name: "Editorial Prestige (Trebuchet)" }
                  ].map(font => (
                    <button
                      key={font.id}
                      onClick={() => setTheme(prev => ({ ...prev, fontFamily: font.id as any }))}
                      className="saas-card"
                      style={{
                        padding: "0.75rem",
                        textAlign: "left",
                        cursor: "pointer",
                        borderColor: theme.fontFamily === font.id ? "var(--saas-primary)" : "var(--saas-border)"
                      }}
                    >
                      <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#ffffff" }}>{font.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--saas-text-muted)", marginTop: 3 }}>
                        The quick brown fox
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Density */}
              <div>
                <label className="saas-label" style={{ display: "block", marginBottom: "0.5rem" }}>
                  Content Spacing (Density)
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                  {[
                    { id: "compact", name: "Compact", desc: "Fits 1 Page" },
                    { id: "normal", name: "Comfortable", desc: "Balanced" },
                    { id: "spacious", name: "Spacious", desc: "Executive" }
                  ].map(d => (
                    <button
                      key={d.id}
                      onClick={() => setTheme(prev => ({ ...prev, density: d.id as any }))}
                      className="saas-card"
                      style={{
                        padding: "0.6rem 0.3rem",
                        textAlign: "center",
                        cursor: "pointer",
                        borderColor: theme.density === d.id ? "var(--saas-primary)" : "var(--saas-border)"
                      }}
                    >
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: theme.density === d.id ? "var(--saas-primary)" : "#ffffff" }}>
                        {d.name}
                      </div>
                      <div style={{ fontSize: "0.68rem", color: "var(--saas-text-subtle)", marginTop: 2 }}>
                        {d.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Paper Format */}
              <div>
                <label className="saas-label" style={{ display: "block", marginBottom: "0.5rem" }}>
                  Print Paper Standard
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  <button
                    onClick={() => setTheme(prev => ({ ...prev, paperSize: "a4" }))}
                    className="saas-card"
                    style={{
                      padding: "0.75rem",
                      textAlign: "center",
                      cursor: "pointer",
                      borderColor: theme.paperSize === "a4" ? "var(--saas-primary)" : "var(--saas-border)"
                    }}
                  >
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: theme.paperSize === "a4" ? "var(--saas-primary)" : "#ffffff" }}>
                      A4 International
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "var(--saas-text-subtle)", marginTop: 2 }}>210 × 297 mm</div>
                  </button>
                  <button
                    onClick={() => setTheme(prev => ({ ...prev, paperSize: "letter" }))}
                    className="saas-card"
                    style={{
                      padding: "0.75rem",
                      textAlign: "center",
                      cursor: "pointer",
                      borderColor: theme.paperSize === "letter" ? "var(--saas-primary)" : "var(--saas-border)"
                    }}
                  >
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: theme.paperSize === "letter" ? "var(--saas-primary)" : "#ffffff" }}>
                      US Letter
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "var(--saas-text-subtle)", marginTop: 2 }}>8.5 × 11 in</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTENT EDITING */}
          {activeTab === "content" && (
            <div className="saas-editor-scroll">
              {/* Horizontal Section Pills */}
              <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.5rem", borderBottom: "1px solid var(--saas-border)" }}>
                {[
                  { id: "personal", label: "Contact", icon: <User size={12} /> },
                  { id: "summary", label: "Summary", icon: <Sparkles size={12} /> },
                  { id: "experience", label: "Work", count: data.experience.length, icon: <Briefcase size={12} /> },
                  { id: "education", label: "Education", count: data.education.length, icon: <GraduationCap size={12} /> },
                  { id: "skills", label: "Skills", count: data.skills.length, icon: <Wrench size={12} /> },
                  { id: "projects", label: "Projects", count: data.projects.length, icon: <FolderGit2 size={12} /> },
                  { id: "certifications", label: "Certs", count: data.certifications.length, icon: <Award size={12} /> },
                  { id: "languages", label: "Langs", count: data.languages.length, icon: <LangIcon size={12} /> }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`saas-preset-pill ${activeSection === s.id ? "is-active" : ""}`}
                    style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                    {s.count !== undefined && (
                      <span style={{ fontSize: "0.65rem", background: "#1e293b", color: "#fff", borderRadius: 10, padding: "0.1rem 0.35rem" }}>
                        {s.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* 1. PERSONAL DETAILS */}
              {activeSection === "personal" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#ffffff", margin: 0 }}>
                    Personal Coordinates & Online Links
                  </h4>

                  {/* Photo Upload Card */}
                  <div className="saas-card" style={{ flexDirection: "row", alignItems: "center", gap: "1rem" }}>
                    {data.personal.photoUrl ? (
                      <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
                        <img
                          src={data.personal.photoUrl}
                          alt="Avatar"
                          style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--saas-border-light)" }}
                        />
                        <button
                          onClick={() => setData(p => ({ ...p, personal: { ...p.personal, photoUrl: "" } }))}
                          title="Remove avatar"
                          style={{ position: "absolute", top: -4, right: -4, background: "var(--saas-danger)", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer" }}
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    ) : (
                      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--saas-surface-input)", border: "2px dashed var(--saas-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--saas-text-subtle)", flexShrink: 0 }}>
                        <Camera size={22} />
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#ffffff", marginBottom: 2 }}>
                        Profile Photo (Optional)
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "var(--saas-text-muted)", marginBottom: 6 }}>
                        Supported in Nordic, Creative, & Executive templates.
                      </div>
                      <button
                        onClick={() => photoInputRef.current?.click()}
                        className="saas-btn saas-btn-secondary"
                        style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem" }}
                      >
                        <Upload size={12} /> Upload Image
                      </button>
                    </div>
                  </div>

                  <div className="saas-row">
                    <div className="saas-field">
                      <label className="saas-label">Full Name</label>
                      <input
                        type="text"
                        value={data.personal.fullName}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, fullName: e.target.value } }))}
                        placeholder="Alex Rivera"
                        className="saas-input"
                      />
                    </div>
                    <div className="saas-field">
                      <label className="saas-label">Job Title</label>
                      <input
                        type="text"
                        value={data.personal.jobTitle}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, jobTitle: e.target.value } }))}
                        placeholder="Principal AI Engineer"
                        className="saas-input"
                      />
                    </div>
                    <div className="saas-field">
                      <label className="saas-label">Email Address</label>
                      <input
                        type="email"
                        value={data.personal.email}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, email: e.target.value } }))}
                        placeholder="alex@example.com"
                        className="saas-input"
                      />
                    </div>
                    <div className="saas-field">
                      <label className="saas-label">Phone Number</label>
                      <input
                        type="text"
                        value={data.personal.phone}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, phone: e.target.value } }))}
                        placeholder="+1 (555) 019-2834"
                        className="saas-input"
                      />
                    </div>
                    <div className="saas-field">
                      <label className="saas-label">Location</label>
                      <input
                        type="text"
                        value={data.personal.location}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, location: e.target.value } }))}
                        placeholder="San Francisco, CA (or Remote)"
                        className="saas-input"
                      />
                    </div>
                    <div className="saas-field">
                      <label className="saas-label">Personal Website</label>
                      <input
                        type="text"
                        value={data.personal.website}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, website: e.target.value } }))}
                        placeholder="https://alexrivera.dev"
                        className="saas-input"
                      />
                    </div>
                    <div className="saas-field">
                      <label className="saas-label">LinkedIn</label>
                      <input
                        type="text"
                        value={data.personal.linkedin}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, linkedin: e.target.value } }))}
                        placeholder="linkedin.com/in/alexrivera"
                        className="saas-input"
                      />
                    </div>
                    <div className="saas-field">
                      <label className="saas-label">GitHub</label>
                      <input
                        type="text"
                        value={data.personal.github}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, github: e.target.value } }))}
                        placeholder="github.com/alexrivera"
                        className="saas-input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. SUMMARY */}
              {activeSection === "summary" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#ffffff", margin: 0 }}>
                      Executive Summary
                    </h4>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <button
                        onClick={() => {
                          const newSummary = generateSummaryForProfile(data);
                          setData(p => ({ ...p, summary: newSummary }));
                        }}
                        className="saas-btn saas-btn-primary"
                        style={{ padding: "0.2rem 0.55rem", fontSize: "0.7rem" }}
                        title="Draft a high-impact summary from your filled profile"
                      >
                        <Sparkles size={11} /> AI Generate
                      </button>
                      <span style={{ fontSize: "0.7rem", color: "var(--saas-text-muted)", fontFamily: "monospace" }}>
                        {data.summary.length} chars
                      </span>
                    </div>
                  </div>
                  <textarea
                    rows={6}
                    value={data.summary}
                    onChange={e => setData(p => ({ ...p, summary: e.target.value }))}
                    placeholder="Results-driven engineering lead with 7+ years of experience..."
                    className="saas-textarea"
                  />
                  <div className="saas-card" style={{ background: "rgba(16, 185, 129, 0.05)", borderColor: "rgba(16, 185, 129, 0.25)" }}>
                    <div style={{ fontSize: "0.75rem", color: "#34d399", fontWeight: 700, marginBottom: 2 }}>
                      💡 ATS Matching Recommendation:
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--saas-text-muted)", lineHeight: 1.5 }}>
                      Summarize your core specializations and include at least one concrete metric (e.g. &apos;scaled to 2M+ MAU&apos; or &apos;reduced latency by 45%&apos;).
                    </div>
                  </div>
                </div>
              )}

              {/* 3. EXPERIENCE */}
              {activeSection === "experience" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#ffffff", margin: 0 }}>
                      Work Experience ({data.experience.length})
                    </h4>
                    <button
                      onClick={addExperience}
                      className="saas-btn saas-btn-secondary"
                      style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", color: "var(--saas-primary)" }}
                    >
                      <Plus size={12} /> Add Position
                    </button>
                  </div>

                  {data.experience.map((exp, expIdx) => (
                    <div key={exp.id || expIdx} className="saas-card">
                      <div className="saas-card-head">
                        <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--saas-primary)" }}>
                          #{expIdx + 1}: {exp.role || "Untitled Role"}
                        </span>
                        <button
                          onClick={() => removeExperience(expIdx)}
                          title="Delete role"
                          style={{ background: "transparent", border: "none", color: "var(--saas-text-subtle)", cursor: "pointer" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="saas-row">
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={e => updateExperience(expIdx, "company", e.target.value)}
                          className="saas-input"
                        />
                        <input
                          type="text"
                          placeholder="Job Title / Role"
                          value={exp.role}
                          onChange={e => updateExperience(expIdx, "role", e.target.value)}
                          className="saas-input"
                        />
                        <input
                          type="text"
                          placeholder="Location (e.g. San Francisco, CA)"
                          value={exp.location}
                          onChange={e => updateExperience(expIdx, "location", e.target.value)}
                          className="saas-input"
                        />
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          <input
                            type="text"
                            placeholder="Start (2022)"
                            value={exp.startDate}
                            onChange={e => updateExperience(expIdx, "startDate", e.target.value)}
                            className="saas-input"
                          />
                          <input
                            type="text"
                            placeholder="End (Present)"
                            value={exp.endDate}
                            onChange={e => updateExperience(expIdx, "endDate", e.target.value)}
                            className="saas-input"
                          />
                        </div>
                      </div>

                      {/* Bullet Highlights */}
                      <div style={{ marginTop: "0.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                          <label className="saas-label">
                            Key Bullet Points ({exp.highlights.length})
                          </label>
                          <div style={{ display: "flex", gap: "0.4rem" }}>
                            <button
                              onClick={() => {
                                const newBullets = generateBulletsForRole(exp.role);
                                const updatedExp = [...data.experience];
                                updatedExp[expIdx].highlights = [...updatedExp[expIdx].highlights, ...newBullets];
                                setData(p => ({ ...p, experience: updatedExp }));
                              }}
                              style={{ background: "transparent", border: "none", color: "#38bdf8", fontSize: "0.7rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}
                              title="Generate 3 tailored bullets for this job title"
                            >
                              <Sparkles size={11} /> AI 3 Bullets
                            </button>
                            <button
                              onClick={() => addHighlight(expIdx)}
                              style={{ background: "transparent", border: "none", color: "var(--saas-primary)", fontSize: "0.7rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 2 }}
                            >
                              <Plus size={11} /> Add Bullet
                            </button>
                          </div>
                        </div>

                        {/* Power Verbs Quick Helper */}
                        <div style={{ marginBottom: "0.5rem" }}>
                          <div style={{ fontSize: "0.68rem", color: "var(--saas-text-muted)", display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                            <Zap size={11} color="#38bdf8" /> Click power verb to append:
                          </div>
                          <div className="saas-power-verbs">
                            {POWER_VERBS.leadership.slice(0, 3).map(v => (
                              <span key={v} onClick={() => addHighlight(expIdx, `${v} key technical initiatives resulting in 25% measured growth.`)} className="saas-verb-pill">
                                + {v}
                              </span>
                            ))}
                            {POWER_VERBS.technical.slice(0, 3).map(v => (
                              <span key={v} onClick={() => addHighlight(expIdx, `${v} production architecture decreasing system latency by 40%.`)} className="saas-verb-pill">
                                + {v}
                              </span>
                            ))}
                            {POWER_VERBS.growth.slice(0, 2).map(v => (
                              <span key={v} onClick={() => addHighlight(expIdx, `${v} enterprise revenue pipeline by $2.5M within 12 months.`)} className="saas-verb-pill">
                                + {v}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          {exp.highlights.map((hl, hlIdx) => (
                            <div key={hlIdx} style={{ display: "flex", gap: "0.4rem", alignItems: "flex-start" }}>
                              <span style={{ color: "var(--saas-text-subtle)", fontSize: "0.8rem", marginTop: 4 }}>•</span>
                              <textarea
                                rows={2}
                                value={hl}
                                onChange={e => updateHighlight(expIdx, hlIdx, e.target.value)}
                                className="saas-textarea"
                                style={{ padding: "0.35rem 0.5rem", fontSize: "0.75rem" }}
                              />
                              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <button
                                  onClick={() => {
                                    const improved = improveBulletPoint(hl, exp.role);
                                    updateHighlight(expIdx, hlIdx, improved);
                                  }}
                                  className="saas-icon-btn"
                                  title="✨ Improve with AI (power verbs & metrics)"
                                  style={{ width: 22, height: 22, color: "#34d399" }}
                                >
                                  <Sparkles size={11} />
                                </button>
                                <button
                                  onClick={() => {
                                    const xyz = transformToXYZFormula(hl);
                                    updateHighlight(expIdx, hlIdx, xyz);
                                  }}
                                  className="saas-icon-btn"
                                  title="📈 Apply Google XYZ Formula"
                                  style={{ width: 22, height: 22, color: "#60a5fa" }}
                                >
                                  <Zap size={11} />
                                </button>
                                <button
                                  onClick={() => removeHighlight(expIdx, hlIdx)}
                                  style={{ background: "transparent", border: "none", color: "var(--saas-text-subtle)", cursor: "pointer", padding: 4 }}
                                  title="Delete bullet"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 4. EDUCATION */}
              {activeSection === "education" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#ffffff", margin: 0 }}>
                      Education & Degrees ({data.education.length})
                    </h4>
                    <button
                      onClick={addEducation}
                      className="saas-btn saas-btn-secondary"
                      style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", color: "var(--saas-primary)" }}
                    >
                      <Plus size={12} /> Add Degree
                    </button>
                  </div>

                  {data.education.map((edu, eduIdx) => (
                    <div key={edu.id || eduIdx} className="saas-card">
                      <div className="saas-card-head">
                        <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#ffffff" }}>
                          #{eduIdx + 1}: {edu.school || "University"}
                        </span>
                        <button
                          onClick={() => removeEducation(eduIdx)}
                          style={{ background: "transparent", border: "none", color: "var(--saas-text-subtle)", cursor: "pointer" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="saas-row">
                        <input
                          type="text"
                          placeholder="University Name"
                          value={edu.school}
                          onChange={e => updateEducation(eduIdx, "school", e.target.value)}
                          className="saas-input"
                        />
                        <input
                          type="text"
                          placeholder="Degree (e.g. B.S. in Computer Science)"
                          value={edu.degree}
                          onChange={e => updateEducation(eduIdx, "degree", e.target.value)}
                          className="saas-input"
                        />
                        <input
                          type="text"
                          placeholder="Location (e.g. Stanford, CA)"
                          value={edu.location}
                          onChange={e => updateEducation(eduIdx, "location", e.target.value)}
                          className="saas-input"
                        />
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          <input
                            type="text"
                            placeholder="Start (2018)"
                            value={edu.startDate}
                            onChange={e => updateEducation(eduIdx, "startDate", e.target.value)}
                            className="saas-input"
                          />
                          <input
                            type="text"
                            placeholder="Graduation (2022)"
                            value={edu.endDate}
                            onChange={e => updateEducation(eduIdx, "endDate", e.target.value)}
                            className="saas-input"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 5. SKILLS */}
              {activeSection === "skills" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#ffffff", margin: 0 }}>
                      Skills & Categorized Stacks ({data.skills.length})
                    </h4>
                    <button
                      onClick={addSkillCategory}
                      className="saas-btn saas-btn-secondary"
                      style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", color: "var(--saas-primary)" }}
                    >
                      <Plus size={12} /> Add Category
                    </button>
                  </div>

                  {data.skills.map((cat, cIdx) => (
                    <div key={cat.id || cIdx} className="saas-card">
                      <div className="saas-card-head">
                        <input
                          type="text"
                          value={cat.name}
                          onChange={e => updateSkillName(cIdx, e.target.value)}
                          placeholder="Category (e.g. Languages)"
                          className="saas-input"
                          style={{ width: "70%", fontWeight: 700, color: "var(--saas-primary)" }}
                        />
                        <button
                          onClick={() => removeSkillCategory(cIdx)}
                          style={{ background: "transparent", border: "none", color: "var(--saas-text-subtle)", cursor: "pointer" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <label className="saas-label">Skills (Comma-separated)</label>
                        <input
                          type="text"
                          value={cat.skills.join(", ")}
                          onChange={e => updateSkillItems(cIdx, e.target.value)}
                          placeholder="TypeScript, React, Node.js, Next.js..."
                          className="saas-input"
                        />
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                        {cat.skills.map((item, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: "0.7rem",
                              background: "var(--saas-surface-input)",
                              border: "1px solid var(--saas-border)",
                              padding: "0.2rem 0.5rem",
                              borderRadius: 4,
                              color: "var(--saas-text-muted)"
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 6. PROJECTS */}
              {activeSection === "projects" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#ffffff", margin: 0 }}>
                      Projects ({data.projects.length})
                    </h4>
                    <button
                      onClick={addProject}
                      className="saas-btn saas-btn-secondary"
                      style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", color: "var(--saas-primary)" }}
                    >
                      <Plus size={12} /> Add Project
                    </button>
                  </div>

                  {data.projects.map((proj, pIdx) => (
                    <div key={proj.id || pIdx} className="saas-card">
                      <div className="saas-card-head">
                        <input
                          type="text"
                          value={proj.title}
                          onChange={e => updateProject(pIdx, "title", e.target.value)}
                          placeholder="Project Title"
                          className="saas-input"
                          style={{ width: "70%", fontWeight: 700 }}
                        />
                        <button
                          onClick={() => removeProject(pIdx)}
                          style={{ background: "transparent", border: "none", color: "var(--saas-text-subtle)", cursor: "pointer" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="saas-row">
                        <input
                          type="text"
                          placeholder="Tech Stack (Next.js, Canvas)"
                          value={proj.techStack}
                          onChange={e => updateProject(pIdx, "techStack", e.target.value)}
                          className="saas-input"
                        />
                        <input
                          type="text"
                          placeholder="URL / Repository"
                          value={proj.link}
                          onChange={e => updateProject(pIdx, "link", e.target.value)}
                          className="saas-input"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={e => updateProject(pIdx, "description", e.target.value)}
                        placeholder="Impact description and metrics..."
                        className="saas-textarea"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* 7. CERTIFICATIONS */}
              {activeSection === "certifications" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#ffffff", margin: 0 }}>
                      Certifications ({data.certifications.length})
                    </h4>
                    <button
                      onClick={addCertification}
                      className="saas-btn saas-btn-secondary"
                      style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", color: "var(--saas-primary)" }}
                    >
                      <Plus size={12} /> Add Cert
                    </button>
                  </div>

                  {data.certifications.map((cert, cIdx) => (
                    <div key={cert.id || cIdx} className="saas-card">
                      <div className="saas-card-head">
                        <input
                          type="text"
                          value={cert.title}
                          onChange={e => updateCertification(cIdx, "title", e.target.value)}
                          placeholder="Certification Name"
                          className="saas-input"
                          style={{ width: "70%", fontWeight: 700 }}
                        />
                        <button
                          onClick={() => removeCertification(cIdx)}
                          style={{ background: "transparent", border: "none", color: "var(--saas-text-subtle)", cursor: "pointer" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="saas-row">
                        <input
                          type="text"
                          placeholder="Issuer (e.g. AWS, Google)"
                          value={cert.issuer}
                          onChange={e => updateCertification(cIdx, "issuer", e.target.value)}
                          className="saas-input"
                        />
                        <input
                          type="text"
                          placeholder="Year / Date (2024)"
                          value={cert.date}
                          onChange={e => updateCertification(cIdx, "date", e.target.value)}
                          className="saas-input"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 8. LANGUAGES */}
              {activeSection === "languages" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#ffffff", margin: 0 }}>
                      Languages ({data.languages.length})
                    </h4>
                    <button
                      onClick={addLanguage}
                      className="saas-btn saas-btn-secondary"
                      style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", color: "var(--saas-primary)" }}
                    >
                      <Plus size={12} /> Add Language
                    </button>
                  </div>

                  {data.languages.map((lang, lIdx) => (
                    <div key={lang.id || lIdx} className="saas-card" style={{ flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
                      <input
                        type="text"
                        placeholder="Language (e.g. English)"
                        value={lang.language}
                        onChange={e => updateLanguage(lIdx, "language", e.target.value)}
                        className="saas-input"
                        style={{ flex: 1 }}
                      />
                      <input
                        type="text"
                        placeholder="Proficiency (Fluent)"
                        value={lang.proficiency}
                        onChange={e => updateLanguage(lIdx, "proficiency", e.target.value)}
                        className="saas-input"
                        style={{ width: 140 }}
                      />
                      <button
                        onClick={() => removeLanguage(lIdx)}
                        style={{ background: "transparent", border: "none", color: "var(--saas-text-subtle)", cursor: "pointer", padding: 4 }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ATS LIVE SCORE ANALYZER */}
          {activeTab === "ats" && (
            <div className="saas-editor-scroll">
              <div className="saas-score-box">
                <div className="saas-score-header">
                  <div>
                    <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--saas-text-muted)" }}>
                      Real-Time ATS Readiness
                    </div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: atsAnalysis.color }}>
                      {atsAnalysis.grade}
                    </div>
                  </div>
                  <div className="saas-score-num" style={{ color: atsAnalysis.color }}>
                    {atsAnalysis.score}
                    <span style={{ fontSize: "1rem", color: "var(--saas-text-subtle)", fontWeight: 600 }}>/100</span>
                  </div>
                </div>

                {/* Score Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.4rem", background: "var(--saas-surface-input)", padding: "0.6rem", borderRadius: 8, textAlign: "center" }}>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff", fontFamily: "monospace" }}>{atsAnalysis.stats.wordCount}</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--saas-text-subtle)" }}>Words</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#34d399", fontFamily: "monospace" }}>{atsAnalysis.stats.metricsCount}</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--saas-text-subtle)" }}>Metrics</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#38bdf8", fontFamily: "monospace" }}>{atsAnalysis.stats.actionVerbsCount}</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--saas-text-subtle)" }}>Verbs</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fbbf24", fontFamily: "monospace" }}>{atsAnalysis.stats.skillsCount}</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--saas-text-subtle)" }}>Skills</div>
                  </div>
                </div>
              </div>

              {/* Actionable Checklist */}
              <div>
                <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.75rem" }}>
                  Optimization Checklist & Recommendations
                </h4>
                <div className="saas-checklist">
                  {atsAnalysis.items.map(item => (
                    <div key={item.id} className="saas-check-item">
                      {item.status === "pass" && <CheckCircle2 size={16} className="saas-check-pass" style={{ flexShrink: 0, marginTop: 2 }} />}
                      {item.status === "warn" && <AlertCircle size={16} className="saas-check-warn" style={{ flexShrink: 0, marginTop: 2 }} />}
                      {item.status === "fail" && <AlertCircle size={16} className="saas-check-fail" style={{ flexShrink: 0, marginTop: 2 }} />}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, color: item.status === "pass" ? "#fff" : (item.status === "warn" ? "#fbbf24" : "#f87171") }}>
                          {item.label}
                        </div>
                        <div style={{ color: "var(--saas-text-muted)", fontSize: "0.72rem", marginTop: 2 }}>
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* RIGHT PANEL: Live WYSIWYG Sheet Canvas */}
        <main className={`saas-canvas-side ${!showMobilePreview ? "saas-mobile-hide" : ""}`}>
          {/* Floating Zoom Toolbar */}
          <div className="saas-canvas-bar">
            <span style={{ fontSize: "0.75rem", color: "var(--saas-text-muted)", fontFamily: "monospace" }}>Zoom:</span>
            <button
              onClick={() => setZoom(prev => Math.max(prev - 10, 40))}
              style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}
              title="Zoom out"
            >
              <ZoomOut size={14} />
            </button>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff", fontFamily: "monospace", minWidth: 38, textAlign: "center" }}>
              {zoom}%
            </span>
            <button
              onClick={() => setZoom(prev => Math.min(prev + 10, 150))}
              style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}
              title="Zoom in"
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
            <div style={{ width: 1, height: 14, background: "var(--saas-border)" }} />
            <button
              onClick={handlePrint}
              style={{ background: "transparent", border: "none", color: "var(--saas-primary)", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
            >
              <Printer size={13} /> Print
            </button>
          </div>

          {/* Printable Sheet Canvas */}
          <div
            className="saas-canvas-scale"
            style={{
              transform: `scale(${zoom / 100})`
            }}
          >
            <div
              id="resume-preview-sheet"
              className="saas-paper-sheet"
              style={{
                width: `${paperWidth}px`,
                minHeight: `${paperHeight}px`
              }}
            >
              <ResumeRenderer data={data} theme={theme} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
