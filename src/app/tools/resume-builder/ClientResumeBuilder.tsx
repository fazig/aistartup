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

const LOCAL_STORAGE_DATA_KEY = "startupai_resume_data_v2";
const LOCAL_STORAGE_THEME_KEY = "startupai_resume_theme_v2";

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

  // Load from local storage on mount
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

  // Save to local storage on change
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

  // Reset to default sample
  const handleResetSample = () => {
    if (window.confirm("Load full sample data? Any unsaved edits will be replaced.")) {
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
        alert("Invalid resume JSON file.");
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

  // Experience Handlers
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
        "Led core technical initiatives resulting in 30% performance improvements.",
        "Collaborated across product and engineering to ship high-impact features."
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

  // Education Handlers
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

  // Skills Handlers
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

  // Projects Handlers
  const addProject = () => {
    const newItem: Project = {
      id: "proj-" + Date.now(),
      title: "Project Name",
      role: "Lead Developer",
      techStack: "React, TypeScript, Tailwind",
      link: "https://github.com/...",
      description: "Built an open-source productivity app with 5,000+ stars."
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

  // Certifications Handlers
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

  // Languages Handlers
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportJSON}
        accept="application/json"
        className="hidden"
      />
      <input
        type="file"
        ref={photoInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/tools"
              className="text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              ← All Tools
            </Link>
            <div className="h-4 w-px bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
                <FileText size={18} />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                  Canva-Style Resume Studio
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Vector PDF
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {savedNotification && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono mr-1">
                <Check size={12} /> Saved
              </span>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import saved JSON resume"
              className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
            >
              <Upload size={13} />
              <span className="hidden md:inline">Import</span>
            </button>

            <button
              onClick={handleExportJSON}
              title="Backup resume to JSON"
              className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
            >
              <FileDown size={13} />
              <span className="hidden md:inline">Save JSON</span>
            </button>

            <button
              onClick={handleResetSample}
              title="Load full sample profile"
              className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/20 transition flex items-center gap-1.5"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Sample Data</span>
            </button>

            {/* Print / Download Button */}
            <button
              onClick={handlePrint}
              className="text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition flex items-center gap-2 active:scale-95"
            >
              <Printer size={15} />
              <span>Download PDF</span>
            </button>

            {/* Mobile Preview Toggle */}
            <button
              onClick={() => setShowMobilePreview(!showMobilePreview)}
              className="lg:hidden text-xs px-3 py-1.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5"
            >
              {showMobilePreview ? <Sliders size={14} /> : <Eye size={14} />}
              <span>{showMobilePreview ? "Editor" : "Preview"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* LEFT PANEL: Editor & Style Controls */}
        <aside
          className={`w-full lg:w-[480px] xl:w-[520px] lg:shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col h-[calc(100vh-61px)] overflow-y-auto ${
            showMobilePreview ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Top Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/60 sticky top-0 z-20">
            <button
              onClick={() => setActiveTab("content")}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition ${
                activeTab === "content"
                  ? "border-emerald-400 text-emerald-400 bg-slate-900/80"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText size={15} /> Content & Info
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition ${
                activeTab === "templates"
                  ? "border-emerald-400 text-emerald-400 bg-slate-900/80"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <LayoutTemplate size={15} /> Templates (10)
            </button>
            <button
              onClick={() => setActiveTab("theme")}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition ${
                activeTab === "theme"
                  ? "border-emerald-400 text-emerald-400 bg-slate-900/80"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Palette size={15} /> Styling & Colors
            </button>
          </div>

          {/* TAB 1: TEMPLATES SELECTION */}
          {activeTab === "templates" && (
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Select a Designer Archetype</h3>
                <p className="text-xs text-slate-400">
                  Choose from 10 ATS-optimized, recruiter-approved visual structures.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TEMPLATE_INFO.map(t => {
                  const isSelected = theme.templateId === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setTheme(prev => ({ ...prev, templateId: t.id as TemplateId }))}
                      className={`p-3.5 rounded-xl border cursor-pointer transition text-left flex flex-col justify-between ${
                        isSelected
                          ? "border-emerald-400 bg-emerald-950/20 ring-1 ring-emerald-400"
                          : "border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-950"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-white">{t.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400">
                            {t.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
                          {t.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-mono">
                          {isSelected ? "Active Template" : "Click to apply"}
                        </span>
                        {isSelected && <CheckCircle2 size={14} className="text-emerald-400" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: STYLING & PALETTE */}
          {activeTab === "theme" && (
            <div className="p-4 space-y-6">
              {/* Color Presets */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-2">
                  Accent Color Palette
                </label>
                <div className="grid grid-cols-5 gap-2 mb-3">
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
                      className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition ${
                        theme.primaryColor === preset.primary
                          ? "border-emerald-400 bg-slate-800 shadow"
                          : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full shadow-inner"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span className="text-[9px] text-slate-300 font-medium truncate w-full text-center">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Custom Hex Input */}
                <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div
                    className="w-7 h-7 rounded-md border border-slate-700 shrink-0"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400 block">Custom Hex Code</label>
                    <input
                      type="text"
                      value={theme.primaryColor}
                      onChange={e => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="bg-transparent text-xs font-mono text-white focus:outline-none w-full"
                      placeholder="#0ea5e9"
                    />
                  </div>
                  <input
                    type="color"
                    value={theme.primaryColor.startsWith("#") && theme.primaryColor.length === 7 ? theme.primaryColor : "#0ea5e9"}
                    onChange={e => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                  />
                </div>
              </div>

              {/* Typography */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-2">
                  Font Family Pairing
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "sans", name: "Modern Sans (Inter / System)" },
                    { id: "serif", name: "Executive Serif (Georgia)" },
                    { id: "mono", name: "Clean Tech (Monospace)" },
                    { id: "geometric", name: "Editorial Prestige (Trebuchet)" }
                  ].map(font => (
                    <button
                      key={font.id}
                      onClick={() => setTheme(prev => ({ ...prev, fontFamily: font.id as any }))}
                      className={`p-3 rounded-xl border text-left transition ${
                        theme.fontFamily === font.id
                          ? "border-emerald-400 bg-emerald-950/20 text-emerald-300"
                          : "border-slate-800 bg-slate-950/50 hover:border-slate-700 text-slate-300"
                      }`}
                    >
                      <div className="text-xs font-semibold">{font.name}</div>
                      <div className="text-[10px] text-slate-500 mt-1">The quick brown fox</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Spacing Density */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-2">
                  Content Spacing (Density)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "compact", name: "Compact", desc: "Fits 1 Page" },
                    { id: "normal", name: "Comfortable", desc: "Balanced" },
                    { id: "spacious", name: "Spacious", desc: "Executive" }
                  ].map(d => (
                    <button
                      key={d.id}
                      onClick={() => setTheme(prev => ({ ...prev, density: d.id as any }))}
                      className={`p-2.5 rounded-lg border text-center transition ${
                        theme.density === d.id
                          ? "border-emerald-400 bg-emerald-950/20 text-emerald-300"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="text-xs font-bold">{d.name}</div>
                      <div className="text-[9px] text-slate-500 mt-0.5">{d.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Paper Format */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-2">
                  Print Standard Paper Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTheme(prev => ({ ...prev, paperSize: "a4" }))}
                    className={`p-2.5 rounded-lg border text-center transition ${
                      theme.paperSize === "a4"
                        ? "border-emerald-400 bg-emerald-950/20 text-emerald-300"
                        : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold">A4 International</div>
                    <div className="text-[9px] text-slate-500">210 × 297 mm (Global)</div>
                  </button>
                  <button
                    onClick={() => setTheme(prev => ({ ...prev, paperSize: "letter" }))}
                    className={`p-2.5 rounded-lg border text-center transition ${
                      theme.paperSize === "letter"
                        ? "border-emerald-400 bg-emerald-950/20 text-emerald-300"
                        : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold">US Letter</div>
                    <div className="text-[9px] text-slate-500">8.5 × 11 in (US & Canada)</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTENT EDITING */}
          {activeTab === "content" && (
            <div className="p-4 space-y-4">
              {/* Horizontal Section Selector */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 border-b border-slate-800/80 scrollbar-none">
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
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition ${
                      activeSection === s.id
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                    {s.count !== undefined && (
                      <span className="text-[10px] px-1 rounded-full bg-slate-800 text-slate-300">
                        {s.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* 1. PERSONAL DETAILS */}
              {activeSection === "personal" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Personal & Contact Details
                    </h4>
                  </div>

                  {/* Photo Upload Card */}
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-4">
                    {data.personal.photoUrl ? (
                      <div className="relative group">
                        <img
                          src={data.personal.photoUrl}
                          alt="Avatar"
                          className="w-14 h-14 rounded-full object-cover border border-slate-700"
                        />
                        <button
                          onClick={() => setData(p => ({ ...p, personal: { ...p.personal, photoUrl: "" } }))}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 text-xs shadow hover:bg-red-600"
                          title="Remove photo"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-slate-800 border border-dashed border-slate-700 flex items-center justify-center text-slate-500">
                        <Camera size={22} />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="text-xs font-medium text-slate-200 mb-0.5">
                        Profile Photo (Optional)
                      </div>
                      <div className="text-[10px] text-slate-500 mb-2">
                        Displays in Nordic, Creative, and Executive templates.
                      </div>
                      <button
                        onClick={() => photoInputRef.current?.click()}
                        className="text-[11px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
                      >
                        <Upload size={12} /> Upload Photo
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={data.personal.fullName}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, fullName: e.target.value } }))}
                        placeholder="Alex Morgan"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Professional Job Title</label>
                      <input
                        type="text"
                        value={data.personal.jobTitle}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, jobTitle: e.target.value } }))}
                        placeholder="Lead AI & Cloud Engineer"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={data.personal.email}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, email: e.target.value } }))}
                        placeholder="alex@example.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={data.personal.phone}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, phone: e.target.value } }))}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Location</label>
                      <input
                        type="text"
                        value={data.personal.location}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, location: e.target.value } }))}
                        placeholder="San Francisco, CA (or Remote)"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Personal Website</label>
                      <input
                        type="text"
                        value={data.personal.website}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, website: e.target.value } }))}
                        placeholder="https://alexmorgan.dev"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">LinkedIn</label>
                      <input
                        type="text"
                        value={data.personal.linkedin}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, linkedin: e.target.value } }))}
                        placeholder="linkedin.com/in/alexmorgan"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">GitHub</label>
                      <input
                        type="text"
                        value={data.personal.github}
                        onChange={e => setData(p => ({ ...p, personal: { ...p.personal, github: e.target.value } }))}
                        placeholder="github.com/alexmorgan"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. SUMMARY */}
              {activeSection === "summary" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Professional Executive Summary
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {data.summary.length} characters
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    value={data.summary}
                    onChange={e => setData(p => ({ ...p, summary: e.target.value }))}
                    placeholder="Results-driven engineering lead with 7+ years of experience in distributed systems..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none leading-relaxed"
                  />
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                    <strong className="text-slate-200 block">💡 ATS Optimization Tip:</strong>
                    Recruiters spend an average of 6 seconds reviewing this section. Mention your exact title, core tech specialties, and one standout quantitative achievement.
                  </div>
                </div>
              )}

              {/* 3. EXPERIENCE */}
              {activeSection === "experience" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Work Experience ({data.experience.length})
                    </h4>
                    <button
                      onClick={addExperience}
                      className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition flex items-center gap-1"
                    >
                      <Plus size={12} /> Add Role
                    </button>
                  </div>

                  {data.experience.map((exp, expIdx) => (
                    <div
                      key={exp.id || expIdx}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                        <span className="text-xs font-bold text-emerald-400">
                          #{expIdx + 1}: {exp.role || "Untitled Role"}
                        </span>
                        <button
                          onClick={() => removeExperience(expIdx)}
                          className="text-slate-500 hover:text-red-400 transition"
                          title="Delete position"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={e => updateExperience(expIdx, "company", e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Job Title / Role"
                          value={exp.role}
                          onChange={e => updateExperience(expIdx, "role", e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Location (e.g. New York, NY)"
                          value={exp.location}
                          onChange={e => updateExperience(expIdx, "location", e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Start Date (e.g. 2022-01)"
                            value={exp.startDate}
                            onChange={e => updateExperience(expIdx, "startDate", e.target.value)}
                            className="w-1/2 bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                          />
                          <input
                            type="text"
                            placeholder="End Date (or Present)"
                            value={exp.endDate}
                            onChange={e => updateExperience(expIdx, "endDate", e.target.value)}
                            className="w-1/2 bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* Bullet Highlights */}
                      <div className="pt-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-[11px] text-slate-400 font-medium">
                            Key Bullet Achievements ({exp.highlights.length})
                          </label>
                          <button
                            onClick={() => addHighlight(expIdx)}
                            className="text-[10px] text-emerald-400 hover:underline flex items-center gap-0.5"
                          >
                            <Plus size={10} /> Add Bullet
                          </button>
                        </div>

                        <div className="space-y-1.5">
                          {exp.highlights.map((hl, hlIdx) => (
                            <div key={hlIdx} className="flex items-start gap-1.5">
                              <span className="text-slate-500 text-xs mt-1.5">•</span>
                              <textarea
                                rows={2}
                                value={hl}
                                onChange={e => updateHighlight(expIdx, hlIdx, e.target.value)}
                                className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                              />
                              <button
                                onClick={() => removeHighlight(expIdx, hlIdx)}
                                className="text-slate-500 hover:text-red-400 p-1 mt-1"
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Education ({data.education.length})
                    </h4>
                    <button
                      onClick={addEducation}
                      className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition flex items-center gap-1"
                    >
                      <Plus size={12} /> Add Degree
                    </button>
                  </div>

                  {data.education.map((edu, eduIdx) => (
                    <div
                      key={edu.id || eduIdx}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5"
                    >
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
                        <span className="text-xs font-bold text-white">
                          #{eduIdx + 1}: {edu.school || "University"}
                        </span>
                        <button
                          onClick={() => removeEducation(eduIdx)}
                          className="text-slate-500 hover:text-red-400 transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="School / University"
                          value={edu.school}
                          onChange={e => updateEducation(eduIdx, "school", e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Degree (e.g. B.S. in Computer Science)"
                          value={edu.degree}
                          onChange={e => updateEducation(eduIdx, "degree", e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Location (e.g. Stanford, CA)"
                          value={edu.location}
                          onChange={e => updateEducation(eduIdx, "location", e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Start"
                            value={edu.startDate}
                            onChange={e => updateEducation(eduIdx, "startDate", e.target.value)}
                            className="w-1/2 bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                          />
                          <input
                            type="text"
                            placeholder="Graduation Date"
                            value={edu.endDate}
                            onChange={e => updateEducation(eduIdx, "endDate", e.target.value)}
                            className="w-1/2 bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 5. SKILLS */}
              {activeSection === "skills" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Skills & Technical Groups ({data.skills.length})
                    </h4>
                    <button
                      onClick={addSkillCategory}
                      className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition flex items-center gap-1"
                    >
                      <Plus size={12} /> Add Category
                    </button>
                  </div>

                  {data.skills.map((cat, cIdx) => (
                    <div
                      key={cat.id || cIdx}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          placeholder="Category (e.g. Languages & Frameworks)"
                          value={cat.name}
                          onChange={e => updateSkillName(cIdx, e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs font-bold text-emerald-400 w-2/3"
                        />
                        <button
                          onClick={() => removeSkillCategory(cIdx)}
                          className="text-slate-500 hover:text-red-400 transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">
                          Skills (Comma-separated)
                        </label>
                        <input
                          type="text"
                          value={cat.skills.join(", ")}
                          onChange={e => updateSkillItems(cIdx, e.target.value)}
                          placeholder="TypeScript, React, Python, Docker..."
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200"
                        />
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {cat.skills.map((item, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Notable Projects ({data.projects.length})
                    </h4>
                    <button
                      onClick={addProject}
                      className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition flex items-center gap-1"
                    >
                      <Plus size={12} /> Add Project
                    </button>
                  </div>

                  {data.projects.map((proj, pIdx) => (
                    <div
                      key={proj.id || pIdx}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={proj.title}
                          onChange={e => updateProject(pIdx, "title", e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs font-bold text-white w-2/3"
                        />
                        <button
                          onClick={() => removeProject(pIdx)}
                          className="text-slate-500 hover:text-red-400 transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Tech Stack (e.g. Next.js, PyTorch)"
                          value={proj.techStack}
                          onChange={e => updateProject(pIdx, "techStack", e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="URL / Repository"
                          value={proj.link}
                          onChange={e => updateProject(pIdx, "link", e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Impact description and quantitative outcomes..."
                        value={proj.description}
                        onChange={e => updateProject(pIdx, "description", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* 7. CERTIFICATIONS */}
              {activeSection === "certifications" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Certifications ({data.certifications.length})
                    </h4>
                    <button
                      onClick={addCertification}
                      className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition flex items-center gap-1"
                    >
                      <Plus size={12} /> Add Certification
                    </button>
                  </div>

                  {data.certifications.map((cert, cIdx) => (
                    <div
                      key={cert.id || cIdx}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          placeholder="Certification Name"
                          value={cert.title}
                          onChange={e => updateCertification(cIdx, "title", e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs font-bold text-white w-2/3"
                        />
                        <button
                          onClick={() => removeCertification(cIdx)}
                          className="text-slate-500 hover:text-red-400 transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Issuer (e.g. AWS, Google)"
                          value={cert.issuer}
                          onChange={e => updateCertification(cIdx, "issuer", e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Year / Date (e.g. 2024)"
                          value={cert.date}
                          onChange={e => updateCertification(cIdx, "date", e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 8. LANGUAGES */}
              {activeSection === "languages" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Languages ({data.languages.length})
                    </h4>
                    <button
                      onClick={addLanguage}
                      className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition flex items-center gap-1"
                    >
                      <Plus size={12} /> Add Language
                    </button>
                  </div>

                  {data.languages.map((lang, lIdx) => (
                    <div
                      key={lang.id || lIdx}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2"
                    >
                      <input
                        type="text"
                        placeholder="Language (e.g. English)"
                        value={lang.language}
                        onChange={e => updateLanguage(lIdx, "language", e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white flex-1"
                      />
                      <input
                        type="text"
                        placeholder="Proficiency (Native, Fluent)"
                        value={lang.proficiency}
                        onChange={e => updateLanguage(lIdx, "proficiency", e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white w-36"
                      />
                      <button
                        onClick={() => removeLanguage(lIdx)}
                        className="text-slate-500 hover:text-red-400 p-1"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Clear / Reset Toolbar */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={handleClearAll}
                  className="text-xs text-red-400 hover:text-red-300 transition flex items-center gap-1"
                >
                  <Trash2 size={12} /> Clear all fields
                </button>
                <button
                  onClick={handleResetSample}
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw size={12} /> Reset Sample Data
                </button>
              </div>
            </div>
          )}
        </aside>

        {/* RIGHT PANEL: Live WYSIWYG Sheet Canvas */}
        <main
          className={`flex-1 bg-slate-950 flex flex-col items-center justify-start overflow-y-auto overflow-x-auto p-4 sm:p-8 h-[calc(100vh-61px)] ${
            showMobilePreview ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Canvas Floating Toolbar */}
          <div className="sticky top-0 z-10 mb-6 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-full px-4 py-1.5 flex items-center gap-3 shadow-xl">
            <span className="text-[11px] text-slate-400 font-mono">Zoom:</span>
            <button
              onClick={() => setZoom(prev => Math.max(prev - 10, 40))}
              className="p-1 rounded hover:bg-slate-800 text-slate-300"
              title="Zoom out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="text-xs font-mono font-bold text-white w-10 text-center">
              {zoom}%
            </span>
            <button
              onClick={() => setZoom(prev => Math.min(prev + 10, 150))}
              className="p-1 rounded hover:bg-slate-800 text-slate-300"
              title="Zoom in"
            >
              <ZoomIn size={14} />
            </button>
            <div className="h-3 w-px bg-slate-800" />
            <button
              onClick={() => setZoom(85)}
              className="text-[11px] text-slate-400 hover:text-emerald-400"
            >
              Fit
            </button>
            <button
              onClick={() => setZoom(100)}
              className="text-[11px] text-slate-400 hover:text-emerald-400 font-mono"
            >
              100%
            </button>
            <div className="h-3 w-px bg-slate-800" />
            <button
              onClick={handlePrint}
              className="text-[11px] font-semibold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <Printer size={13} /> Print
            </button>
          </div>

          {/* Printable Sheet View */}
          <div
            className="transition-transform origin-top flex justify-center pb-24"
            style={{
              transform: `scale(${zoom / 100})`
            }}
          >
            <div
              id="resume-preview-sheet"
              style={{
                width: `${paperWidth}px`,
                minHeight: `${paperHeight}px`
              }}
              className="bg-white text-slate-900 shadow-2xl rounded-sm transition-all relative overflow-hidden"
            >
              <ResumeRenderer data={data} theme={theme} />
            </div>
          </div>
        </main>
      </div>

      {/* Global CSS for Zero-Fuss Native Vector PDF Printing */}
      <style jsx global>{`
        @media print {
          header,
          aside,
          nav,
          footer,
          .home-hero,
          .sticky,
          button {
            display: none !important;
          }

          body,
          html {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
          }

          #resume-preview-sheet {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            min-height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            transform: none !important;
            z-index: 999999 !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          @page {
            margin: 0;
            size: auto;
          }
        }
      `}</style>
    </div>
  );
}
