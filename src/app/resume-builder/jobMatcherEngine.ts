import { ResumeData, JobMatchResult, JobKeywordMatch } from "./types";

// Comprehensive catalog of common high-demand market skills
const SKILL_CATALOG: { name: string; category: JobKeywordMatch["category"]; aliases?: string[] }[] = [
  // Programming & Web
  { name: "TypeScript", category: "hard_skill", aliases: ["ts"] },
  { name: "JavaScript", category: "hard_skill", aliases: ["js", "es6"] },
  { name: "Python", category: "hard_skill" },
  { name: "React", category: "hard_skill", aliases: ["react.js", "reactjs"] },
  { name: "Next.js", category: "hard_skill", aliases: ["nextjs"] },
  { name: "Node.js", category: "hard_skill", aliases: ["nodejs", "node"] },
  { name: "Go", category: "hard_skill", aliases: ["golang"] },
  { name: "Java", category: "hard_skill" },
  { name: "C++", category: "hard_skill", aliases: ["cpp"] },
  { name: "Rust", category: "hard_skill" },
  { name: "HTML5", category: "hard_skill", aliases: ["html"] },
  { name: "CSS3", category: "hard_skill", aliases: ["css", "tailwind", "sass"] },
  { name: "SQL", category: "hard_skill" },
  { name: "PostgreSQL", category: "tool", aliases: ["postgres"] },
  { name: "MySQL", category: "tool" },
  { name: "MongoDB", category: "tool", aliases: ["mongo"] },
  { name: "Redis", category: "tool" },
  { name: "GraphQL", category: "hard_skill" },
  { name: "REST APIs", category: "hard_skill", aliases: ["rest", "restful"] },
  { name: "Microservices", category: "domain" },
  { name: "System Design", category: "domain", aliases: ["architecture", "distributed systems"] },

  // AI, ML & Data
  { name: "Machine Learning", category: "domain", aliases: ["ml", "deep learning"] },
  { name: "Artificial Intelligence", category: "domain", aliases: ["ai", "genai", "llms", "large language models"] },
  { name: "PyTorch", category: "tool" },
  { name: "TensorFlow", category: "tool" },
  { name: "LangChain", category: "tool" },
  { name: "Vector Databases", category: "tool", aliases: ["pinecone", "weaviate", "qdrant", "chroma"] },
  { name: "NLP", category: "domain", aliases: ["natural language processing"] },
  { name: "Computer Vision", category: "domain" },

  // DevOps & Cloud
  { name: "AWS", category: "tool", aliases: ["amazon web services", "ec2", "s3", "lambda"] },
  { name: "GCP", category: "tool", aliases: ["google cloud"] },
  { name: "Azure", category: "tool", aliases: ["microsoft azure"] },
  { name: "Docker", category: "tool", aliases: ["containerization"] },
  { name: "Kubernetes", category: "tool", aliases: ["k8s"] },
  { name: "CI/CD", category: "hard_skill", aliases: ["continuous integration", "github actions", "gitlab"] },
  { name: "Terraform", category: "tool" },
  { name: "Linux", category: "tool" },

  // Product, Agile & Management
  { name: "Agile", category: "soft_skill", aliases: ["scrum", "kanban", "sprints"] },
  { name: "Product Roadmap", category: "domain", aliases: ["roadmapping", "feature prioritization"] },
  { name: "Cross-Functional Leadership", category: "soft_skill", aliases: ["leadership", "stakeholder management"] },
  { name: "Mentorship", category: "soft_skill", aliases: ["mentoring", "coaching engineers"] },
  { name: "A/B Testing", category: "hard_skill", aliases: ["experimentation", "hypothesis testing"] },
  { name: "User Research", category: "domain", aliases: ["ux research", "customer discovery"] },
  { name: "Data Analytics", category: "hard_skill", aliases: ["google analytics", "mixpanel", "amplitude", "tableau"] },
  { name: "SEO", category: "domain", aliases: ["search engine optimization", "organic traffic"] },
  { name: "Performance Optimization", category: "hard_skill", aliases: ["latency reduction", "scalability", "load testing"] },
  { name: "Code Review", category: "soft_skill", aliases: ["pr reviews", "peer review"] },

  // Qualifications
  { name: "Bachelor's Degree", category: "qualification", aliases: ["bachelor", "b.s.", "bs in computer science", "degree"] },
  { name: "Master's Degree", category: "qualification", aliases: ["master", "m.s.", "ms", "phd"] },
  { name: "Problem Solving", category: "soft_skill" },
  { name: "Communication Skills", category: "soft_skill", aliases: ["written communication", "verbal communication"] }
];

// Helper to extract full resume plain text
function extractResumeText(data: ResumeData): string {
  const parts: string[] = [
    data.personal.fullName,
    data.personal.jobTitle,
    data.summary
  ];

  data.experience.forEach(exp => {
    parts.push(exp.role, exp.company, exp.location);
    if (Array.isArray(exp.highlights)) {
      parts.push(...exp.highlights);
    }
  });

  data.education.forEach(edu => {
    parts.push(edu.degree, edu.school, edu.location);
  });

  data.skills.forEach(cat => {
    parts.push(cat.name);
    if (Array.isArray(cat.skills)) {
      parts.push(...cat.skills);
    }
  });

  data.projects.forEach(proj => {
    parts.push(proj.title, proj.role, proj.techStack, proj.description);
  });

  data.certifications.forEach(cert => {
    parts.push(cert.title, cert.issuer);
  });

  return parts.join(" ").toLowerCase();
}

// Extract detected job title from the first lines of the job post
function detectJobTitle(jobText: string): string {
  const lines = jobText.split("\n").map(l => l.trim()).filter(Boolean);
  for (const line of lines.slice(0, 5)) {
    if (line.length > 5 && line.length < 60 && !line.toLowerCase().startsWith("about") && !line.toLowerCase().startsWith("http")) {
      return line.replace(/^[#\*\-•]+\s*/, "");
    }
  }
  return "Target Position";
}

// Count occurrences of a term and its aliases in target text
function countOccurrences(text: string, term: string, aliases: string[] = []): number {
  let count = 0;
  const targets = [term, ...aliases];
  for (const t of targets) {
    const escaped = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "gi");
    const matches = text.match(regex);
    if (matches) {
      count += matches.length;
    }
  }
  return count;
}

// Main Analyzer Function
export function analyzeJobDescription(jobDescription: string, resumeData: ResumeData): JobMatchResult {
  if (!jobDescription || jobDescription.trim().length < 20) {
    return {
      score: 0,
      jobTitleDetected: "Paste a job description to scan",
      matchedCount: 0,
      totalKeywords: 0,
      matchedKeywords: [],
      missingKeywords: [],
      recommendations: ["Paste the full text of a job posting above to run the ATS comparison."]
    };
  }

  const jobLower = jobDescription.toLowerCase();
  const resumeLower = extractResumeText(resumeData);
  const detectedTitle = detectJobTitle(jobDescription);

  const matchedKeywords: JobKeywordMatch[] = [];
  const missingKeywords: JobKeywordMatch[] = [];

  // 1. Check against catalog
  for (const item of SKILL_CATALOG) {
    const jobCount = countOccurrences(jobLower, item.name, item.aliases);
    if (jobCount > 0) {
      const resumeCount = countOccurrences(resumeLower, item.name, item.aliases);
      const matchObj: JobKeywordMatch = {
        keyword: item.name,
        category: item.category,
        countInJob: jobCount,
        countInResume: resumeCount
      };

      if (resumeCount > 0) {
        matchedKeywords.push(matchObj);
      } else {
        missingKeywords.push(matchObj);
      }
    }
  }

  // 2. Extract potential capitalized nouns / custom tech not in catalog
  const tokenRegex = /\b[A-Z][a-zA-Z0-9#\+\.]{2,}\b/g;
  const capitalizedTokens = jobDescription.match(tokenRegex) || [];
  const freqMap: Record<string, number> = {};

  const commonStopwords = new Set([
    "The", "And", "You", "Our", "We", "Will", "With", "Are", "For", "Have", "This", "Your",
    "What", "About", "Join", "Team", "Work", "Role", "Company", "Must", "Good", "Great",
    "Candidate", "Equal", "Opportunity", "Employer", "Benefits", "Salary", "Apply", "Status"
  ]);

  for (const token of capitalizedTokens) {
    if (token.length > 2 && !commonStopwords.has(token)) {
      freqMap[token] = (freqMap[token] || 0) + 1;
    }
  }

  // Add high frequency custom terms (frequency >= 2)
  for (const [word, freq] of Object.entries(freqMap)) {
    const alreadyTracked = matchedKeywords.some(m => m.keyword.toLowerCase() === word.toLowerCase()) ||
                           missingKeywords.some(m => m.keyword.toLowerCase() === word.toLowerCase());
    if (!alreadyTracked && freq >= 2) {
      const resumeCount = countOccurrences(resumeLower, word);
      const matchObj: JobKeywordMatch = {
        keyword: word,
        category: "tool",
        countInJob: freq,
        countInResume: resumeCount
      };
      if (resumeCount > 0) {
        matchedKeywords.push(matchObj);
      } else {
        missingKeywords.push(matchObj);
      }
    }
  }

  // Calculate score
  const totalKeywords = matchedKeywords.length + missingKeywords.length;
  let score = 0;
  if (totalKeywords > 0) {
    // Weighted scoring: matched count / total count with minimum baseline
    const ratio = matchedKeywords.length / totalKeywords;
    score = Math.round(ratio * 100);
  }

  // Generate recommendations
  const recommendations: string[] = [];
  if (score < 60) {
    recommendations.push(`Your keyword match is currently ${score}%. ATS algorithms typically filter out candidates under 70%.`);
  } else if (score < 80) {
    recommendations.push(`Solid ${score}% match rate! Adding 2-3 high-frequency missing keywords will push you into the top 10% applicant tier.`);
  } else {
    recommendations.push(`Outstanding ${score}% match rate! Your resume aligns cleanly with this role's core requirements.`);
  }

  if (missingKeywords.length > 0) {
    const topMissing = missingKeywords
      .sort((a, b) => b.countInJob - a.countInJob)
      .slice(0, 3)
      .map(m => `"${m.keyword}" (${m.countInJob}x in job)`)
      .join(", ");
    recommendations.push(`Top missing keywords to integrate: ${topMissing}.`);
  }

  const hardSkillsMissing = missingKeywords.filter(k => k.category === "hard_skill" || k.category === "tool");
  if (hardSkillsMissing.length > 0) {
    recommendations.push(`Consider adding ${hardSkillsMissing[0].keyword} to your Technical Skills section.`);
  }

  return {
    score,
    jobTitleDetected: detectedTitle,
    matchedCount: matchedKeywords.length,
    totalKeywords,
    matchedKeywords: matchedKeywords.sort((a, b) => b.countInJob - a.countInJob),
    missingKeywords: missingKeywords.sort((a, b) => b.countInJob - a.countInJob),
    recommendations
  };
}
