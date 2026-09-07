import React, { useState, useEffect } from "react";
import {
  Target,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  RefreshCw,
  FileText,
  Briefcase,
  HelpCircle
} from "lucide-react";
import { ResumeDocument, JobMatchResult, SaasActiveTab } from "../types";
import { analyzeJobDescription } from "../jobMatcherEngine";
import { saveDocument } from "../storageEngine";

interface JobMatcherStudioProps {
  activeDoc: ResumeDocument;
  onUpdateDoc: (updated: ResumeDocument) => void;
  setActiveTab: (tab: SaasActiveTab) => void;
}

const SAMPLE_JOB_AI = `Senior AI & Full-Stack Engineer (LLMs & Platform)
Innovate AI • San Francisco, CA (Hybrid)

About the Role:
We are seeking a Senior AI & Full-Stack Engineer to lead the architecture of our core intelligence platform. You will build high-throughput microservices, optimize low-latency LLM inference pipelines, and craft responsive user experiences.

Key Responsibilities:
- Architect and scale distributed backend microservices handling 20M+ daily events.
- Deploy and optimize PyTorch models, vector databases (Pinecone / Weaviate), and LangChain orchestration workflows.
- Build high-performance web frontends utilizing Next.js, React, and TypeScript.
- Implement automated CI/CD pipelines with Docker and Kubernetes on AWS cloud infrastructure.
- Lead system design reviews, mentor junior engineers, and drive cross-functional alignment.

Requirements:
- 5+ years of experience with TypeScript, Python, and Node.js.
- Strong proficiency with PostgreSQL, Redis, and GraphQL.
- Hands-on expertise with Machine Learning, LLMs, and Vector Databases.
- Proven track record with Kubernetes, Docker, and AWS.
- Bachelor's Degree in Computer Science or equivalent practical experience.`;

const SAMPLE_JOB_PM = `Lead Technical Product Manager (Growth & Platform)
NextScale Corp • New York, NY

About the Role:
NextScale is hiring a Lead Technical Product Manager to own our user acquisition and self-serve onboarding engine. You will translate customer feedback and analytical telemetry into high-converting product roadmaps.

Key Responsibilities:
- Formulate and execute data-driven product roadmap aligned with quarterly ARR milestones.
- Run continuous A/B testing and experimentation across signup and billing funnels.
- Partner with engineering leads on system design, REST APIs, and database migrations.
- Conduct in-depth user research and customer discovery interviews.
- Drive cross-functional leadership across marketing, design, and executive teams.

Qualifications:
- 5+ years experience in technical product management or product growth.
- Expert knowledge of SQL, data analytics tools (Mixpanel, Amplitude, Google Analytics).
- Deep experience with Agile, Scrum, and sprint cadences.
- Bachelor's Degree in Business, Engineering, or relevant discipline.`;

export default function JobMatcherStudio({
  activeDoc,
  onUpdateDoc,
  setActiveTab
}: JobMatcherStudioProps) {
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [addedKeywords, setAddedKeywords] = useState<string[]>([]);

  // Auto-analyze when jobText or activeDoc changes
  useEffect(() => {
    if (jobText.trim().length > 20) {
      const res = analyzeJobDescription(jobText, activeDoc.data);
      setResult(res);
    } else {
      setResult(null);
    }
  }, [jobText, activeDoc]);

  // 1-Click add missing keyword to resume skills
  const handleAddKeywordToSkills = (keyword: string) => {
    const cloned = JSON.parse(JSON.stringify(activeDoc)) as ResumeDocument;

    // Check if skills categories exist
    if (!cloned.data.skills || cloned.data.skills.length === 0) {
      cloned.data.skills = [{ id: "cat_tech", name: "Technical Skills", skills: [keyword] }];
    } else {
      // Look for a tech or tools category, otherwise add to first
      let targetCat = cloned.data.skills.find(c => 
        c.name.toLowerCase().includes("tech") || 
        c.name.toLowerCase().includes("tool") || 
        c.name.toLowerCase().includes("skill")
      );
      if (!targetCat) targetCat = cloned.data.skills[0];

      if (!targetCat.skills.some(s => s.toLowerCase() === keyword.toLowerCase())) {
        targetCat.skills.push(keyword);
      }
    }

    onUpdateDoc(cloned);
    saveDocument(cloned);
    setAddedKeywords(prev => [...prev, keyword]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#fbbf24";
    return "#ef4444";
  };

  return (
    <div className="saas-matcher-container">
      {/* Header Banner */}
      <div className="saas-matcher-header">
        <div>
          <div className="saas-dashboard-badge" style={{ background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}>
            <Target size={14} /> ATS Keyword Scanner & Job Description Matcher
          </div>
          <h1 className="saas-dashboard-title">
            Tailor Resume to Any Target Job
          </h1>
          <p className="saas-dashboard-desc">
            Paste a target job posting from LinkedIn, Indeed, or Workday. Our AI scanner detects missing hard skills, calculates keyword density, and guides you to a 90%+ ATS match score.
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--saas-text-muted)", marginBottom: 4 }}>
            Active Resume:
          </div>
          <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#ffffff", display: "flex", alignItems: "center", gap: "0.4rem", justifyContent: "flex-end" }}>
            <FileText size={15} style={{ color: "var(--saas-primary)" }} /> {activeDoc.title}
          </div>
        </div>
      </div>

      {/* Main Dual-Column Scanner Layout */}
      <div className="saas-matcher-split">
        {/* LEFT COLUMN: Job Description Input */}
        <div className="saas-matcher-input-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <label className="saas-label" style={{ fontSize: "0.88rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>
              Target Job Posting
            </label>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <button
                onClick={() => setJobText(SAMPLE_JOB_AI)}
                className="saas-btn saas-btn-ghost"
                style={{ fontSize: "0.72rem", padding: "0.25rem 0.5rem" }}
              >
                Sample AI SWE
              </button>
              <button
                onClick={() => setJobText(SAMPLE_JOB_PM)}
                className="saas-btn saas-btn-ghost"
                style={{ fontSize: "0.72rem", padding: "0.25rem 0.5rem" }}
              >
                Sample PM
              </button>
              {jobText && (
                <button
                  onClick={() => setJobText("")}
                  className="saas-btn saas-btn-ghost"
                  style={{ fontSize: "0.72rem", padding: "0.25rem 0.5rem", color: "#ef4444" }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <textarea
            value={jobText}
            onChange={e => setJobText(e.target.value)}
            placeholder="Paste the full job description text here (e.g. from LinkedIn, Indeed, Greenhouse, or Lever)..."
            className="saas-textarea saas-matcher-textarea"
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem", fontSize: "0.76rem", color: "var(--saas-text-muted)" }}>
            <span>{jobText.trim().split(/\s+/).filter(Boolean).length} words parsed</span>
            <span>Client-Side Privacy: Job text is analyzed in-memory</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Match Analysis */}
        <div className="saas-matcher-results-panel">
          {result ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {/* Top Score Banner */}
              <div className="saas-card" style={{ padding: "1.25rem", background: "linear-gradient(135deg, rgba(18, 26, 48, 0.8), rgba(12, 18, 34, 0.95))" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--saas-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>
                      Target Position Match
                    </div>
                    <h3 style={{ margin: "0.2rem 0", fontSize: "1.1rem", fontWeight: 800, color: "#ffffff" }}>
                      {result.jobTitleDetected}
                    </h3>
                    <div style={{ fontSize: "0.8rem", color: "var(--saas-text-subtle)" }}>
                      Found {result.matchedCount} of {result.totalKeywords} critical ATS keywords
                    </div>
                  </div>

                  {/* Circular Score Gauge */}
                  <div
                    style={{
                      width: 84,
                      height: 84,
                      borderRadius: "50%",
                      border: `4px solid ${getScoreColor(result.score)}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0, 0, 0, 0.3)",
                      boxShadow: `0 0 20px ${getScoreColor(result.score)}33`
                    }}
                  >
                    <span style={{ fontSize: "1.35rem", fontWeight: 900, color: "#ffffff", fontFamily: "monospace" }}>
                      {result.score}%
                    </span>
                    <span style={{ fontSize: "0.62rem", color: getScoreColor(result.score), fontWeight: 700 }}>
                      {result.score >= 80 ? "STRONG" : (result.score >= 60 ? "MODERATE" : "LOW")}
                    </span>
                  </div>
                </div>

                {/* Recommendations */}
                <div style={{ marginTop: "1rem", paddingTop: "0.85rem", borderTop: "1px solid var(--saas-border)" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: 6 }}>
                    <Sparkles size={14} style={{ color: "var(--saas-primary)" }} /> ATS Recommendations
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.78rem", color: "var(--saas-text-muted)", lineHeight: 1.6 }}>
                    {result.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Missing Keywords Box with 1-Click Add */}
              <div className="saas-card" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <h4 style={{ margin: 0, fontSize: "0.88rem", fontWeight: 700, color: "#f87171", display: "flex", alignItems: "center", gap: 6 }}>
                    <AlertCircle size={15} /> Missing Keywords in Your Resume ({result.missingKeywords.length})
                  </h4>
                  <span style={{ fontSize: "0.72rem", color: "var(--saas-text-subtle)" }}>
                    Click "+ Add" to inject directly into skills
                  </span>
                </div>

                {result.missingKeywords.length === 0 ? (
                  <p style={{ fontSize: "0.82rem", color: "#34d399", margin: 0 }}>
                    🎉 No major missing keywords detected! Your resume covers all key job posting terms.
                  </p>
                ) : (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                    {result.missingKeywords.map(k => {
                      const wasAdded = addedKeywords.includes(k.keyword);
                      return (
                        <div
                          key={k.keyword}
                          className="saas-missing-keyword-pill"
                        >
                          <span>{k.keyword}</span>
                          <span className="saas-kw-count">({k.countInJob}x in job)</span>
                          <button
                            onClick={() => handleAddKeywordToSkills(k.keyword)}
                            disabled={wasAdded}
                            className="saas-kw-add-btn"
                            title="Add to Skills section"
                          >
                            {wasAdded ? <CheckCircle2 size={12} /> : <Plus size={12} />}
                            <span>{wasAdded ? "Added" : "Add"}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Matched Keywords Box */}
              <div className="saas-card" style={{ padding: "1.25rem" }}>
                <h4 style={{ margin: "0 0 0.75rem 0", fontSize: "0.88rem", fontWeight: 700, color: "#34d399", display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={15} /> Matched Keywords ({result.matchedKeywords.length})
                </h4>
                {result.matchedKeywords.length === 0 ? (
                  <p style={{ fontSize: "0.82rem", color: "var(--saas-text-muted)", margin: 0 }}>
                    No direct skill matches found yet. Add relevant terms to your resume.
                  </p>
                ) : (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                    {result.matchedKeywords.map(k => (
                      <span key={k.keyword} className="saas-matched-keyword-pill">
                        {k.keyword}
                        <span style={{ fontSize: "0.65rem", opacity: 0.8, marginLeft: 4 }}>
                          ({k.countInResume}x in CV)
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Return to Studio CTA */}
              <button
                onClick={() => setActiveTab("studio")}
                className="saas-btn saas-btn-primary"
                style={{ padding: "0.75rem", fontSize: "0.9rem", justifyContent: "center" }}
              >
                <Sparkles size={16} /> Apply Changes & Open in Studio Editor →
              </button>
            </div>
          ) : (
            <div className="saas-matcher-placeholder">
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(59, 130, 246, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#60a5fa", margin: "0 auto 1rem auto" }}>
                <Target size={30} />
              </div>
              <h3 style={{ margin: "0 0 0.4rem 0", fontSize: "1.1rem", fontWeight: 700, color: "#ffffff" }}>
                Ready to Scan Job Description
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--saas-text-muted)", maxWidth: 360, margin: "0 auto 1.2rem auto", lineHeight: 1.5 }}>
                Paste the requirements or description from any job listing to see how well your active resume matches and uncover high-impact missing keywords.
              </p>
              <button
                onClick={() => setJobText(SAMPLE_JOB_AI)}
                className="saas-btn saas-btn-secondary"
                style={{ fontSize: "0.82rem" }}
              >
                Load Sample Senior AI SWE Job Posting
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
