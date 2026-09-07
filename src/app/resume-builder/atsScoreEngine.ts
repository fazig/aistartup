import { ResumeData } from "../tools/resume-builder/types";

export interface ATSCheckItem {
  id: string;
  category: "contact" | "summary" | "experience" | "skills" | "formatting";
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
  weight: number;
}

export interface ATSAnalysisResult {
  score: number;
  grade: "Needs Work" | "Good" | "Recruiter Ready" | "Exceptional";
  color: string;
  items: ATSCheckItem[];
  stats: {
    wordCount: number;
    metricsCount: number;
    actionVerbsCount: number;
    skillsCount: number;
  };
}

const ACTION_VERBS_LIST = [
  "spearheaded", "architected", "developed", "engineered", "designed", "led", "managed",
  "orchestrated", "built", "implemented", "reduced", "increased", "optimized", "scaled",
  "automated", "created", "shipped", "collaborated", "mentored", "streamlined", "generated",
  "accelerated", "maximized", "negotiated", "boosted", "deployed", "transformed"
];

export function analyzeResumeATS(data: ResumeData): ATSAnalysisResult {
  const items: ATSCheckItem[] = [];
  let score = 0;

  // 1. Contact Info (20 points max)
  const hasName = Boolean(data.personal.fullName && data.personal.fullName.trim().length > 2);
  const hasEmail = Boolean(data.personal.email && data.personal.email.includes("@"));
  const hasPhone = Boolean(data.personal.phone && data.personal.phone.trim().length > 6);
  const hasLocation = Boolean(data.personal.location && data.personal.location.trim().length > 2);
  const hasOnlinePresence = Boolean(data.personal.linkedin || data.personal.github || data.personal.website);

  if (hasName && hasEmail && hasPhone && hasLocation) {
    items.push({
      id: "contact_complete",
      category: "contact",
      label: "Complete Contact Information",
      status: "pass",
      detail: "All essential contact coordinates (Name, Email, Phone, Location) are present.",
      weight: 15
    });
    score += 15;
  } else {
    items.push({
      id: "contact_incomplete",
      category: "contact",
      label: "Incomplete Contact Coordinates",
      status: "fail",
      detail: "Ensure your Full Name, valid Email, Phone number, and Location are filled.",
      weight: 15
    });
  }

  if (hasOnlinePresence) {
    items.push({
      id: "online_links",
      category: "contact",
      label: "Professional Online Profiles",
      status: "pass",
      detail: "LinkedIn, GitHub, or Portfolio link provided for recruiter verification.",
      weight: 5
    });
    score += 5;
  } else {
    items.push({
      id: "online_links_missing",
      category: "contact",
      label: "Missing Portfolio or LinkedIn",
      status: "warn",
      detail: "Adding a LinkedIn or GitHub link boosts candidate credibility by 40%.",
      weight: 5
    });
  }

  // 2. Executive Summary (15 points max)
  const summaryLength = (data.summary || "").trim().length;
  if (summaryLength >= 120 && summaryLength <= 600) {
    items.push({
      id: "summary_optimal",
      category: "summary",
      label: "Optimal Executive Summary Length",
      status: "pass",
      detail: `Your summary (${summaryLength} chars) is concise, focused, and scanner-friendly.`,
      weight: 15
    });
    score += 15;
  } else if (summaryLength > 0 && summaryLength < 120) {
    items.push({
      id: "summary_short",
      category: "summary",
      label: "Summary is Too Brief",
      status: "warn",
      detail: "Expand your summary to 2-4 sentences highlighting years of experience and core specialty.",
      weight: 8
    });
    score += 8;
  } else {
    items.push({
      id: "summary_missing",
      category: "summary",
      label: "Missing Professional Summary",
      status: "fail",
      detail: "Recruiters and ATS algorithms heavily rely on a summary to categorize your career tier.",
      weight: 15
    });
  }

  // 3. Work Experience & Quantified Metrics (35 points max)
  const expCount = data.experience.length;
  let totalBullets = 0;
  let metricBullets = 0;
  let actionVerbBullets = 0;

  data.experience.forEach(exp => {
    exp.highlights.forEach(h => {
      totalBullets++;
      const lower = h.toLowerCase();
      // Check for numbers or percentages or dollar amounts
      if (/\d+%|\$\d+|\d+x|\b\d{2,}\b/.test(h)) {
        metricBullets++;
      }
      // Check for power action verbs
      if (ACTION_VERBS_LIST.some(verb => lower.includes(verb))) {
        actionVerbBullets++;
      }
    });
  });

  if (expCount >= 2 && totalBullets >= 4) {
    items.push({
      id: "exp_depth",
      category: "experience",
      label: "Detailed Work History",
      status: "pass",
      detail: `You have ${expCount} positions detailed with ${totalBullets} accomplishment bullets.`,
      weight: 15
    });
    score += 15;
  } else if (expCount >= 1) {
    items.push({
      id: "exp_depth_minimal",
      category: "experience",
      label: "Limited Work Experience",
      status: "warn",
      detail: "Add at least 2 relevant positions or internships with 3-4 bullet points each.",
      weight: 8
    });
    score += 8;
  } else {
    items.push({
      id: "exp_missing",
      category: "experience",
      label: "No Work Experience Listed",
      status: "fail",
      detail: "List your relevant professional roles, internships, or freelance engagements.",
      weight: 15
    });
  }

  // Quantified metrics check (Google XYZ formula)
  if (metricBullets >= 3) {
    items.push({
      id: "metrics_strong",
      category: "experience",
      label: "Strong Quantified Impact ($ / % / #)",
      status: "pass",
      detail: `Found ${metricBullets} bullets with measurable metrics. ATS algorithms prioritize quantified achievements.`,
      weight: 12
    });
    score += 12;
  } else if (metricBullets >= 1) {
    items.push({
      id: "metrics_moderate",
      category: "experience",
      label: "Add More Measurable Metrics",
      status: "warn",
      detail: `Found ${metricBullets} metric bullet. Aim for 3+ bullets featuring %, $, or numerical growth stats.`,
      weight: 6
    });
    score += 6;
  } else {
    items.push({
      id: "metrics_none",
      category: "experience",
      label: "Zero Quantified Metrics Detected",
      status: "fail",
      detail: "Use the Google formula: 'Accomplished [X] by doing [Y] as measured by [Z] (e.g. 35% faster)'.",
      weight: 12
    });
  }

  // Action verbs check
  if (actionVerbBullets >= 3) {
    items.push({
      id: "verbs_strong",
      category: "experience",
      label: "Powerful Action Verbs",
      status: "pass",
      detail: `Found high-impact verbs (e.g. Spearheaded, Engineered, Scaled) across ${actionVerbBullets} bullets.`,
      weight: 8
    });
    score += 8;
  } else {
    items.push({
      id: "verbs_weak",
      category: "experience",
      label: "Strengthen Opening Verbs",
      status: "warn",
      detail: "Begin bullets with decisive verbs like 'Architected', 'Spearheaded', or 'Orchestrated'.",
      weight: 4
    });
    score += 4;
  }

  // 4. Skills & Specialization (20 points max)
  let totalSkills = 0;
  data.skills.forEach(s => {
    totalSkills += s.skills.length;
  });

  if (totalSkills >= 8 && data.skills.length >= 2) {
    items.push({
      id: "skills_comprehensive",
      category: "skills",
      label: "Well-Categorized Skill Stack",
      status: "pass",
      detail: `${totalSkills} skills organized into ${data.skills.length} distinct categories for easy parsing.`,
      weight: 20
    });
    score += 20;
  } else if (totalSkills >= 4) {
    items.push({
      id: "skills_moderate",
      category: "skills",
      label: "Moderate Skill Coverage",
      status: "warn",
      detail: `You have ${totalSkills} skills. Expanding to 8-12 skills matches more ATS keyword searches.`,
      weight: 12
    });
    score += 12;
  } else {
    items.push({
      id: "skills_sparse",
      category: "skills",
      label: "Skills Section is Sparse",
      status: "fail",
      detail: "Add at least 2 skill categories with 4+ relevant technical and soft skills each.",
      weight: 20
    });
  }

  // 5. Education & Credentials (10 points max)
  if (data.education.length > 0 && data.education[0].school && data.education[0].degree) {
    items.push({
      id: "education_present",
      category: "formatting",
      label: "Accredited Academic Credentials",
      status: "pass",
      detail: `${data.education[0].degree} from ${data.education[0].school}.`,
      weight: 10
    });
    score += 10;
  } else {
    items.push({
      id: "education_missing",
      category: "formatting",
      label: "Education Record Missing",
      status: "fail",
      detail: "Enter your university degree, bootcamp, or academic certification.",
      weight: 10
    });
  }

  // Cap score to 100 max
  score = Math.min(Math.max(score, 10), 100);

  let grade: ATSAnalysisResult["grade"] = "Needs Work";
  let color = "#ef4444";
  if (score >= 90) {
    grade = "Exceptional";
    color = "#10b981";
  } else if (score >= 75) {
    grade = "Recruiter Ready";
    color = "#3b82f6";
  } else if (score >= 50) {
    grade = "Good";
    color = "#f59e0b";
  }

  // Calculate total word count
  const allText = [
    data.personal.fullName,
    data.personal.jobTitle,
    data.summary,
    ...data.experience.map(e => `${e.role} ${e.company} ${e.highlights.join(" ")}`),
    ...data.education.map(ed => `${ed.degree} ${ed.school}`),
    ...data.skills.map(s => `${s.name} ${s.skills.join(" ")}`)
  ].join(" ");
  const wordCount = allText.split(/\s+/).filter(Boolean).length;

  return {
    score,
    grade,
    color,
    items,
    stats: {
      wordCount,
      metricsCount: metricBullets,
      actionVerbsCount: actionVerbBullets,
      skillsCount: totalSkills
    }
  };
}

export const calculateATSScore = analyzeResumeATS;
