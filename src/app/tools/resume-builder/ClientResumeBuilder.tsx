"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
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
  Camera
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
} from "./types";

import {
  DEFAULT_RESUME_DATA,
  DEFAULT_RESUME_THEME,
  COLOR_PRESETS,
  TEMPLATE_INFO
} from "./defaultData";

import ResumeRenderer from "./templates/ResumeRenderer";
import "./resume-builder.css";

const LOCAL_STORAGE_DATA_KEY = "startupai_resume_data_v3";
const LOCAL_STORAGE_THEME_KEY = "startupai_resume_theme_v3";

export default function ClientResumeBuilder() {
  const [data, setData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
  const [theme, setTheme] = useState<ResumeTheme>(DEFAULT_RESUME_THEME);
  const [activeTab, setActiveTab] = useState<"templates" | "content" | "theme">("content");
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [zoom, setZoom] = useState<number>(85);
  const [showMobilePreview, setShowMobilePreview] = useState<boolean>(false);
  const [savedNotification, setSavedNotification] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
      const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
      if (savedData) setData(JSON.parse(savedData));
      if (savedTheme) setTheme(JSON.parse(savedTheme));
    } catch (e) {
      console.warn("Could not load saved resume", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(data));
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, JSON.stringify(theme));
      setSavedNotification(true);
      const timer = setTimeout(() => setSavedNotification(false), 1500);
      return () => clearTimeout(timer);
    } catch (e) {
      console.warn("Could not save resume", e);
    }
  }, [data, theme, isLoaded]);

  // Handle PDF Print
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Reset to default sample data
  const handleResetSample = () => {
    if (window.confirm("Load complete sample profile? Any unsaved edits will be replaced.")) {
      setData(DEFAULT_RESUME_DATA);
      setTheme(DEFAULT_RESUME_THEME);
    }
  };

  // Clear all fields
  const handleClearAll = () => {
    if (window.confirm("Clear all resume fields? You will start with a fresh blank document.")) {
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
    }
  };

  // Export JSON backup
  const handleExportJSON = () => {
    const exportData = { data, theme, timestamp: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(data.personal.fullName || "resume").toLowerCase().replace(/\s+/g, "_")}_resume.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
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
        alert("Invalid resume JSON format.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Please upload an image smaller than 2MB for fast vector PDF rendering.");
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

  const addHighlight = (expIdx: number) => {
    setData(prev => {
      const copy = [...prev.experience];
      copy[expIdx].highlights = [...copy[expIdx].highlights, "New quantitative achievement or impact metric..."];
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
    <div className="rb-studio">
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

      {/* Top Header Bar */}
      <header className="rb-header">
        <div className="rb-header-inner">
          <div className="rb-brand-group">
            <Link href="/tools" className="rb-back-link">
              ← All Tools
            </Link>
            <div className="rb-brand-divider" />
            <div className="rb-logo-badge">
              <FileText size={18} />
            </div>
            <div>
              <h1 className="rb-title">
                Canva-Style Resume Studio
                <span className="rb-badge-pill">Vector PDF</span>
              </h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="rb-actions-group">
            {savedNotification && (
              <span className="rb-saved-indicator">
                <Check size={13} /> Auto-Saved
              </span>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import JSON resume"
              className="rb-btn rb-btn-secondary"
            >
              <Upload size={13} />
              <span>Import</span>
            </button>

            <button
              onClick={handleExportJSON}
              title="Save JSON backup"
              className="rb-btn rb-btn-secondary"
            >
              <FileDown size={13} />
              <span>Save JSON</span>
            </button>

            <button
              onClick={handleResetSample}
              title="Load complete sample profile"
              className="rb-btn rb-btn-amber"
            >
              <RotateCcw size={13} />
              <span>Sample Data</span>
            </button>

            {/* Print / Download Button */}
            <button
              onClick={handlePrint}
              className="rb-btn rb-btn-primary"
            >
              <Printer size={15} />
              <span>Download PDF</span>
            </button>

            {/* Mobile View Toggle */}
            <button
              onClick={() => setShowMobilePreview(!showMobilePreview)}
              className="rb-btn rb-btn-secondary rb-mobile-toggle"
            >
              {showMobilePreview ? <Sliders size={14} /> : <Eye size={14} />}
              <span>{showMobilePreview ? "Editor" : "Preview"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <div className="rb-workspace">
        {/* LEFT PANEL: Editor & Style Controls */}
        <aside className={`rb-sidebar ${showMobilePreview ? "mobile-hide" : ""}`}>
          {/* Top Tabs */}
          <div className="rb-tabs">
            <button
              onClick={() => setActiveTab("content")}
              className={`rb-tab-btn ${activeTab === "content" ? "is-active" : ""}`}
            >
              <FileText size={15} /> Content & Info
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`rb-tab-btn ${activeTab === "templates" ? "is-active" : ""}`}
            >
              <LayoutTemplate size={15} /> Templates (10)
            </button>
            <button
              onClick={() => setActiveTab("theme")}
              className={`rb-tab-btn ${activeTab === "theme" ? "is-active" : ""}`}
            >
              <Palette size={15} /> Styling & Colors
            </button>
          </div>

          {/* TAB 1: TEMPLATES */}
          {activeTab === "templates" && (
            <div className="rb-sidebar-content">
              <div>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, margin: "0 0 0.25rem 0" }}>
                  Select a Designer Archetype
                </h3>
                <p style={{ fontSize: "0.75rem", color: "var(--rb-text-muted)", margin: 0 }}>
                  Choose from 10 ATS-optimized, recruiter-approved visual layouts.
                </p>
              </div>

              <div className="rb-templates-grid">
                {TEMPLATE_INFO.map(t => {
                  const isSelected = theme.templateId === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setTheme(prev => ({ ...prev, templateId: t.id as TemplateId }))}
                      className={`rb-template-card ${isSelected ? "is-active" : ""}`}
                    >
                      <div>
                        <div className="rb-template-top">
                          <span className="rb-template-name">{t.name}</span>
                          <span className="rb-badge-pill">{t.badge}</span>
                        </div>
                        <p className="rb-template-desc">{t.desc}</p>
                      </div>
                      <div className="rb-template-foot">
                        <span>{isSelected ? "Active Template" : "Click to apply"}</span>
                        {isSelected && <CheckCircle2 size={14} color="var(--rb-primary)" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: STYLING & PALETTE */}
          {activeTab === "theme" && (
            <div className="rb-sidebar-content">
              {/* Color Palette */}
              <div>
                <label className="rb-label" style={{ display: "block", marginBottom: "0.5rem" }}>
                  Accent Color Palette
                </label>
                <div className="rb-palette-grid">
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
                      className={`rb-palette-btn ${theme.primaryColor === preset.primary ? "is-active" : ""}`}
                    >
                      <div className="rb-palette-dot" style={{ backgroundColor: preset.primary }} />
                      <span className="rb-palette-name">{preset.name}</span>
                    </button>
                  ))}
                </div>

                <div className="rb-hex-row" style={{ marginTop: "0.75rem" }}>
                  <div className="rb-hex-swatch" style={{ backgroundColor: theme.primaryColor }} />
                  <div style={{ flex: 1 }}>
                    <label className="rb-label" style={{ fontSize: "0.68rem", display: "block" }}>Custom Hex Code</label>
                    <input
                      type="text"
                      value={theme.primaryColor}
                      onChange={e => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="rb-input"
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

              {/* Typography */}
              <div>
                <label className="rb-label" style={{ display: "block", marginBottom: "0.5rem" }}>
                  Font Family Pairing
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {[
                    { id: "sans", name: "Modern Sans (System / Inter)" },
                    { id: "serif", name: "Executive Serif (Georgia)" },
                    { id: "mono", name: "Clean Tech (Monospace)" },
                    { id: "geometric", name: "Editorial Prestige (Trebuchet)" }
                  ].map(font => (
                    <button
                      key={font.id}
                      onClick={() => setTheme(prev => ({ ...prev, fontFamily: font.id as any }))}
                      className={`rb-card ${theme.fontFamily === font.id ? "rb-template-card is-active" : ""}`}
                      style={{ padding: "0.75rem", textAlign: "left", cursor: "pointer" }}
                    >
                      <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#ffffff" }}>{font.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--rb-text-muted)", marginTop: "0.25rem" }}>
                        The quick brown fox
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Spacing Density */}
              <div>
                <label className="rb-label" style={{ display: "block", marginBottom: "0.5rem" }}>
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
                      className={`rb-card ${theme.density === d.id ? "rb-template-card is-active" : ""}`}
                      style={{ padding: "0.6rem 0.3rem", textAlign: "center", cursor: "pointer" }}
                    >
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: theme.density === d.id ? "var(--rb-primary)" : "#ffffff" }}>
                        {d.name}
                      </div>
                      <div style={{ fontSize: "0.68rem", color: "var(--rb-text-subtle)", marginTop: "0.2rem" }}>
                        {d.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Paper Format */}
              <div>
                <label className="rb-label" style={{ display: "block", marginBottom: "0.5rem" }}>
                  Print Paper Standard
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  <button
                    onClick={() => setTheme(prev => ({ ...prev, paperSize: "a4" }))}
                    className={`rb-card ${theme.paperSize === "a4" ? "rb-template-card is-active" : ""}`}
                    style={{ padding: "0.75rem", textAlign: "center", cursor: "pointer" }}
                  >
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: theme.paperSize === "a4" ? "var(--rb-primary)" : "#ffffff" }}>
                      A4 International
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "var(--rb-text-subtle)", marginTop: "0.2rem" }}>
                      210 × 297 mm
                    </div>
                  </button>
                  <button
                    onClick={() => setTheme(prev => ({ ...prev, paperSize: "letter" }))}
                    className={`rb-card ${theme.paperSize === "letter" ? "rb-template-card is-active" : ""}`}
                    style={{ padding: "0.75rem", textAlign: "center", cursor: "pointer" }}
                  >
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: theme.paperSize === "letter" ? "var(--rb-primary)" : "#ffffff" }}>
                      US Letter
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "var(--rb-text-subtle)", marginTop: "0.2rem" }}>
                      8.5 × 11 in
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTENT EDITING */}
          {activeTab === "content" && (
            <div className="rb-sidebar-content">
              {/* Section Selector Pills */}
              <div className="rb-pills-row">
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
                    className={`rb-pill ${activeSection === s.id ? "is-active" : ""}`}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                    {s.count !== undefined && <span className="rb-pill-count">{s.count}</span>}
                  </button>
                ))}
              </div>

              {/* 1. PERSONAL DETAILS */}
              {activeSection === "personal" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#ffffff", margin: 0 }}>
                    Personal & Contact Details
                  </h4>

                  {/* Photo Upload Card */}
                  <div className="rb-card" style={{ flexDirection: "row", alignItems: "center", gap: "1rem" }}>
                    {data.personal.photoUrl ? (
                      <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
                        <img
                          src={data.personal.photoUrl}
                          alt="Profile"
                          style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--rb-border-light)" }}
                        />
                        <button
                          onClick={() => setData(p => ({ ...p, personal: { ...p.personal, photoUrl: "" } }))}
                          title="Remove photo"
                          style={{
                            position: "absolute",
                            top: -4,
                            right: -4,
                            background: "var(--rb-danger)",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "50%",
                            width: 20,
                            height: 20,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          background: "var(--rb-bg-input)",
                          border: "2px dashed var(--rb-border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--rb-text-subtle)",
                          flexShrink: 0
                        }}
                      >
                        <Camera size={22} />
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#ffffff", marginBottom: "0.2rem" }}>
                        Profile Photo (Optional)
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "var(--rb-text-muted)", marginBottom: "0.5rem" }}>
                        Shows in Nordic, Creative, & Executive templates.
                      </div>
                      <button
                        onClick={() => photoInputRef.current?.click()}
                        className="rb-btn rb-btn-secondary"
                        style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem" }}
                      >
                        <Upload size={12} /> Upload Photo
                      </button>
                    </div>
                  </div>

                  <div className="rb-form-row">
                    <div className="rb-form-group">
                      <label className="rb-label">Full Name</label>
                      <input
                        type="text"
                        value={data.personal.fullName}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, fullName: e.target.value } }))}
                        placeholder="Alex Rivera"
                        className="rb-input"
                      />
                    </div>
                    <div className="rb-form-group">
                      <label className="rb-label">Job Title</label>
                      <input
                        type="text"
                        value={data.personal.jobTitle}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, jobTitle: e.target.value } }))}
                        placeholder="Principal AI Engineer"
                        className="rb-input"
                      />
                    </div>
                    <div className="rb-form-group">
                      <label className="rb-label">Email Address</label>
                      <input
                        type="email"
                        value={data.personal.email}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, email: e.target.value } }))}
                        placeholder="alex@example.com"
                        className="rb-input"
                      />
                    </div>
                    <div className="rb-form-group">
                      <label className="rb-label">Phone Number</label>
                      <input
                        type="text"
                        value={data.personal.phone}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, phone: e.target.value } }))}
                        placeholder="+1 (555) 019-2834"
                        className="rb-input"
                      />
                    </div>
                    <div className="rb-form-group">
                      <label className="rb-label">Location</label>
                      <input
                        type="text"
                        value={data.personal.location}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, location: e.target.value } }))}
                        placeholder="San Francisco, CA (or Remote)"
                        className="rb-input"
                      />
                    </div>
                    <div className="rb-form-group">
                      <label className="rb-label">Personal Website</label>
                      <input
                        type="text"
                        value={data.personal.website}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, website: e.target.value } }))}
                        placeholder="https://alexrivera.dev"
                        className="rb-input"
                      />
                    </div>
                    <div className="rb-form-group">
                      <label className="rb-label">LinkedIn</label>
                      <input
                        type="text"
                        value={data.personal.linkedin}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, linkedin: e.target.value } }))}
                        placeholder="linkedin.com/in/alexrivera"
                        className="rb-input"
                      />
                    </div>
                    <div className="rb-form-group">
                      <label className="rb-label">GitHub</label>
                      <input
                        type="text"
                        value={data.personal.github}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, github: e.target.value } }))}
                        placeholder="github.com/alexrivera"
                        className="rb-input"
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
                    <span style={{ fontSize: "0.7rem", color: "var(--rb-text-muted)", fontFamily: "monospace" }}>
                      {data.summary.length} characters
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    value={data.summary}
                    onChange={e => setData(p => ({ ...p, summary: e.target.value }))}
                    placeholder="Results-driven software engineer with 7+ years of experience..."
                    className="rb-textarea"
                  />
                  <div className="rb-card" style={{ background: "rgba(16, 185, 129, 0.05)", borderColor: "rgba(16, 185, 129, 0.2)" }}>
                    <div style={{ fontSize: "0.75rem", color: "#34d399", fontWeight: 700, marginBottom: "0.2rem" }}>
                      💡 ATS Matching Recommendation:
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--rb-text-muted)", lineHeight: 1.5 }}>
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
                      className="rb-btn rb-btn-secondary"
                      style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", color: "var(--rb-primary)" }}
                    >
                      <Plus size={12} /> Add Position
                    </button>
                  </div>

                  {data.experience.map((exp, expIdx) => (
                    <div key={exp.id || expIdx} className="rb-card">
                      <div className="rb-card-header">
                        <span className="rb-card-title">
                          #{expIdx + 1}: {exp.role || "Untitled Role"}
                        </span>
                        <button
                          onClick={() => removeExperience(expIdx)}
                          title="Delete position"
                          style={{ background: "transparent", border: "none", color: "var(--rb-text-subtle)", cursor: "pointer" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="rb-form-row">
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={e => updateExperience(expIdx, "company", e.target.value)}
                          className="rb-input"
                        />
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={exp.role}
                          onChange={e => updateExperience(expIdx, "role", e.target.value)}
                          className="rb-input"
                        />
                        <input
                          type="text"
                          placeholder="Location (e.g. San Francisco, CA)"
                          value={exp.location}
                          onChange={e => updateExperience(expIdx, "location", e.target.value)}
                          className="rb-input"
                        />
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          <input
                            type="text"
                            placeholder="Start (2022)"
                            value={exp.startDate}
                            onChange={e => updateExperience(expIdx, "startDate", e.target.value)}
                            className="rb-input"
                          />
                          <input
                            type="text"
                            placeholder="End (Present)"
                            value={exp.endDate}
                            onChange={e => updateExperience(expIdx, "endDate", e.target.value)}
                            className="rb-input"
                          />
                        </div>
                      </div>

                      {/* Bullet Highlights */}
                      <div style={{ marginTop: "0.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                          <label className="rb-label">
                            Key Bullet Points ({exp.highlights.length})
                          </label>
                          <button
                            onClick={() => addHighlight(expIdx)}
                            style={{ background: "transparent", border: "none", color: "var(--rb-primary)", fontSize: "0.7rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 2 }}
                          >
                            <Plus size={11} /> Add Bullet
                          </button>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          {exp.highlights.map((hl, hlIdx) => (
                            <div key={hlIdx} style={{ display: "flex", gap: "0.4rem", alignItems: "flex-start" }}>
                              <span style={{ color: "var(--rb-text-subtle)", fontSize: "0.8rem", marginTop: 4 }}>•</span>
                              <textarea
                                rows={2}
                                value={hl}
                                onChange={e => updateHighlight(expIdx, hlIdx, e.target.value)}
                                className="rb-textarea"
                                style={{ padding: "0.35rem 0.5rem", fontSize: "0.75rem" }}
                              />
                              <button
                                onClick={() => removeHighlight(expIdx, hlIdx)}
                                style={{ background: "transparent", border: "none", color: "var(--rb-text-subtle)", cursor: "pointer", padding: 4, marginTop: 2 }}
                              >
                                <Trash2 size={12} />
                              </button>
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
                      Education ({data.education.length})
                    </h4>
                    <button
                      onClick={addEducation}
                      className="rb-btn rb-btn-secondary"
                      style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", color: "var(--rb-primary)" }}
                    >
                      <Plus size={12} /> Add Degree
                    </button>
                  </div>

                  {data.education.map((edu, eduIdx) => (
                    <div key={edu.id || eduIdx} className="rb-card">
                      <div className="rb-card-header">
                        <span className="rb-card-title">
                          #{eduIdx + 1}: {edu.school || "University"}
                        </span>
                        <button
                          onClick={() => removeEducation(eduIdx)}
                          style={{ background: "transparent", border: "none", color: "var(--rb-text-subtle)", cursor: "pointer" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="rb-form-row">
                        <input
                          type="text"
                          placeholder="School / University"
                          value={edu.school}
                          onChange={e => updateEducation(eduIdx, "school", e.target.value)}
                          className="rb-input"
                        />
                        <input
                          type="text"
                          placeholder="Degree (e.g. B.S. in Computer Science)"
                          value={edu.degree}
                          onChange={e => updateEducation(eduIdx, "degree", e.target.value)}
                          className="rb-input"
                        />
                        <input
                          type="text"
                          placeholder="Location (e.g. Stanford, CA)"
                          value={edu.location}
                          onChange={e => updateEducation(eduIdx, "location", e.target.value)}
                          className="rb-input"
                        />
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          <input
                            type="text"
                            placeholder="Start (2018)"
                            value={edu.startDate}
                            onChange={e => updateEducation(eduIdx, "startDate", e.target.value)}
                            className="rb-input"
                          />
                          <input
                            type="text"
                            placeholder="Graduation (2022)"
                            value={edu.endDate}
                            onChange={e => updateEducation(eduIdx, "endDate", e.target.value)}
                            className="rb-input"
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
                      Skills & Technical Groups ({data.skills.length})
                    </h4>
                    <button
                      onClick={addSkillCategory}
                      className="rb-btn rb-btn-secondary"
                      style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", color: "var(--rb-primary)" }}
                    >
                      <Plus size={12} /> Add Category
                    </button>
                  </div>

                  {data.skills.map((cat, cIdx) => (
                    <div key={cat.id || cIdx} className="rb-card">
                      <div className="rb-card-header">
                        <input
                          type="text"
                          value={cat.name}
                          onChange={e => updateSkillName(cIdx, e.target.value)}
                          placeholder="Category Name (e.g. Languages)"
                          className="rb-input"
                          style={{ width: "70%", fontWeight: 700, color: "var(--rb-primary)" }}
                        />
                        <button
                          onClick={() => removeSkillCategory(cIdx)}
                          style={{ background: "transparent", border: "none", color: "var(--rb-text-subtle)", cursor: "pointer" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                        <label className="rb-label">Skills (Comma-separated)</label>
                        <input
                          type="text"
                          value={cat.skills.join(", ")}
                          onChange={e => updateSkillItems(cIdx, e.target.value)}
                          placeholder="TypeScript, React, Node.js, Next.js..."
                          className="rb-input"
                        />
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.25rem" }}>
                        {cat.skills.map((item, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: "0.7rem",
                              background: "var(--rb-bg-input)",
                              border: "1px solid var(--rb-border)",
                              padding: "0.2rem 0.5rem",
                              borderRadius: 4,
                              color: "var(--rb-text-muted)"
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
                      Notable Projects ({data.projects.length})
                    </h4>
                    <button
                      onClick={addProject}
                      className="rb-btn rb-btn-secondary"
                      style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", color: "var(--rb-primary)" }}
                    >
                      <Plus size={12} /> Add Project
                    </button>
                  </div>

                  {data.projects.map((proj, pIdx) => (
                    <div key={proj.id || pIdx} className="rb-card">
                      <div className="rb-card-header">
                        <input
                          type="text"
                          value={proj.title}
                          onChange={e => updateProject(pIdx, "title", e.target.value)}
                          placeholder="Project Title"
                          className="rb-input"
                          style={{ width: "70%", fontWeight: 700 }}
                        />
                        <button
                          onClick={() => removeProject(pIdx)}
                          style={{ background: "transparent", border: "none", color: "var(--rb-text-subtle)", cursor: "pointer" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="rb-form-row">
                        <input
                          type="text"
                          placeholder="Tech Stack (e.g. Next.js, PyTorch)"
                          value={proj.techStack}
                          onChange={e => updateProject(pIdx, "techStack", e.target.value)}
                          className="rb-input"
                        />
                        <input
                          type="text"
                          placeholder="URL / Repository"
                          value={proj.link}
                          onChange={e => updateProject(pIdx, "link", e.target.value)}
                          className="rb-input"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={e => updateProject(pIdx, "description", e.target.value)}
                        placeholder="Impact description and quantitative outcomes..."
                        className="rb-textarea"
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
                      className="rb-btn rb-btn-secondary"
                      style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", color: "var(--rb-primary)" }}
                    >
                      <Plus size={12} /> Add Certification
                    </button>
                  </div>

                  {data.certifications.map((cert, cIdx) => (
                    <div key={cert.id || cIdx} className="rb-card">
                      <div className="rb-card-header">
                        <input
                          type="text"
                          value={cert.title}
                          onChange={e => updateCertification(cIdx, "title", e.target.value)}
                          placeholder="Certification Name"
                          className="rb-input"
                          style={{ width: "70%", fontWeight: 700 }}
                        />
                        <button
                          onClick={() => removeCertification(cIdx)}
                          style={{ background: "transparent", border: "none", color: "var(--rb-text-subtle)", cursor: "pointer" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="rb-form-row">
                        <input
                          type="text"
                          placeholder="Issuer (e.g. AWS, Google)"
                          value={cert.issuer}
                          onChange={e => updateCertification(cIdx, "issuer", e.target.value)}
                          className="rb-input"
                        />
                        <input
                          type="text"
                          placeholder="Year / Date (2024)"
                          value={cert.date}
                          onChange={e => updateCertification(cIdx, "date", e.target.value)}
                          className="rb-input"
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
                      className="rb-btn rb-btn-secondary"
                      style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", color: "var(--rb-primary)" }}
                    >
                      <Plus size={12} /> Add Language
                    </button>
                  </div>

                  {data.languages.map((lang, lIdx) => (
                    <div key={lang.id || lIdx} className="rb-card" style={{ flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
                      <input
                        type="text"
                        placeholder="Language (e.g. English)"
                        value={lang.language}
                        onChange={e => updateLanguage(lIdx, "language", e.target.value)}
                        className="rb-input"
                        style={{ flex: 1 }}
                      />
                      <input
                        type="text"
                        placeholder="Proficiency (Fluent)"
                        value={lang.proficiency}
                        onChange={e => updateLanguage(lIdx, "proficiency", e.target.value)}
                        className="rb-input"
                        style={{ width: 140 }}
                      />
                      <button
                        onClick={() => removeLanguage(lIdx)}
                        style={{ background: "transparent", border: "none", color: "var(--rb-text-subtle)", cursor: "pointer", padding: 4 }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Reset / Clear Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid var(--rb-border)" }}>
                <button
                  onClick={handleClearAll}
                  className="rb-btn rb-btn-danger"
                  style={{ fontSize: "0.75rem" }}
                >
                  <Trash2 size={13} /> Clear all fields
                </button>
                <button
                  onClick={handleResetSample}
                  style={{ background: "transparent", border: "none", color: "var(--rb-primary)", fontSize: "0.75rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
                >
                  <RotateCcw size={13} /> Reset Sample Data
                </button>
              </div>
            </div>
          )}
        </aside>

        {/* RIGHT PANEL: Live WYSIWYG Sheet Canvas */}
        <main className={`rb-canvas ${!showMobilePreview ? "mobile-hide" : ""}`}>
          {/* Floating Zoom Toolbar */}
          <div className="rb-toolbar">
            <span className="rb-toolbar-text">Zoom:</span>
            <button
              onClick={() => setZoom(prev => Math.max(prev - 10, 40))}
              className="rb-toolbar-iconbtn"
              title="Zoom out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="rb-toolbar-val">{zoom}%</span>
            <button
              onClick={() => setZoom(prev => Math.min(prev + 10, 150))}
              className="rb-toolbar-iconbtn"
              title="Zoom in"
            >
              <ZoomIn size={14} />
            </button>
            <div className="rb-toolbar-divider" />
            <button onClick={() => setZoom(85)} className="rb-toolbar-link">
              Fit
            </button>
            <button onClick={() => setZoom(100)} className="rb-toolbar-link">
              100%
            </button>
            <div className="rb-toolbar-divider" />
            <button
              onClick={handlePrint}
              style={{ background: "transparent", border: "none", color: "var(--rb-primary)", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
            >
              <Printer size={13} /> Print
            </button>
          </div>

          {/* Printable Sheet View */}
          <div
            className="rb-sheet-scaler"
            style={{
              transform: `scale(${zoom / 100})`
            }}
          >
            <div
              id="resume-preview-sheet"
              className="rb-sheet"
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
