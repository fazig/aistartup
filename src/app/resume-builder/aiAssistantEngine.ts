import { ResumeData } from "./types";

// Strong verb replacements for weak phrasing
const WEAK_PHRASE_REPLACEMENTS: { pattern: RegExp; replacement: string }[] = [
  { pattern: /\b(worked on|worked with)\b/gi, replacement: "engineered" },
  { pattern: /\b(responsible for managing|responsible for)\b/gi, replacement: "orchestrated" },
  { pattern: /\b(helped to build|helped build|helped with)\b/gi, replacement: "co-architected" },
  { pattern: /\b(assisted in|assisted with)\b/gi, replacement: "facilitated" },
  { pattern: /\b(handled)\b/gi, replacement: "managed end-to-end execution of" },
  { pattern: /\b(did maintenance on|maintained)\b/gi, replacement: "optimized and maintained" },
  { pattern: /\b(made changes to|changed)\b/gi, replacement: "refactored and modernized" },
  { pattern: /\b(looked after|supervised)\b/gi, replacement: "directed and oversaw" }
];

// Contextual metrics templates to append if missing
const METRIC_ENRICHMENTS = [
  "reducing average latency by 34% across high-traffic production endpoints",
  "improving team throughput by 28% while decreasing critical bug occurrences by 40%",
  "yielding a $450K+ reduction in annual infrastructure overhead",
  "driving a 3.4x increase in weekly active user engagement",
  "scaling concurrent capacity from 10K to 150K+ peak users with 99.99% SLA",
  "accelerating release velocity by 65% through automated CI/CD benchmarking"
];

// 1. Improve Bullet Point with AI
export function improveBulletPoint(bullet: string, role?: string): string {
  if (!bullet || bullet.trim().length < 5) {
    return role 
      ? `Spearheaded architecture of core ${role} initiatives, driving a 35% improvement in operational throughput.`
      : "Engineered high-impact solutions, resulting in a 30% increase in system efficiency and user satisfaction.";
  }

  let text = bullet.trim();

  // Strip leading bullet characters
  text = text.replace(/^[•\-\*\>]\s*/, "");

  // Capitalize first letter
  text = text.charAt(0).toUpperCase() + text.slice(1);

  // Replace weak phrasing
  for (const { pattern, replacement } of WEAK_PHRASE_REPLACEMENTS) {
    if (pattern.test(text)) {
      text = text.replace(pattern, replacement);
    }
  }

  // Check if bullet contains metrics
  const hasMetric = /[\$%\d\+]/.test(text);
  if (!hasMetric && text.length > 25 && !text.endsWith(".")) {
    const randomMetric = METRIC_ENRICHMENTS[Math.floor(Math.random() * METRIC_ENRICHMENTS.length)];
    text = `${text}, ${randomMetric}`;
  }

  // Ensure trailing period
  if (!text.endsWith(".")) {
    text += ".";
  }

  return text;
}

// 2. Transform to Google XYZ Formula
export function transformToXYZFormula(bullet: string): string {
  if (!bullet || bullet.trim().length < 8) {
    return "Accomplished 40% performance gain as measured by Lighthouse & Web Vitals, by implementing server-side streaming architectures.";
  }

  let clean = bullet.trim().replace(/^[•\-\*\>]\s*/, "").replace(/\.+$/, "");
  return `Accomplished 35% efficiency gain as measured by end-to-end telemetry benchmarks, by leading ${clean.toLowerCase()}.`;
}

// 3. Dynamic Bullet Generator for Roles
export function generateBulletsForRole(roleTitle: string): string[] {
  const title = (roleTitle || "").toLowerCase();

  if (title.includes("engineer") || title.includes("developer") || title.includes("frontend") || title.includes("backend") || title.includes("full")) {
    return [
      "Architected and deployed microservices handling 25M+ daily requests, improving P99 API response times from 420ms to 95ms.",
      "Engineered full-stack responsive web applications using Next.js and TypeScript, increasing Core Web Vitals score to 98/100.",
      "Spearheaded cloud migration to Kubernetes & Terraform, unlocking $320K in annual compute cost optimizations."
    ];
  }

  if (title.includes("product") || title.includes("pm")) {
    return [
      "Directed end-to-end product roadmap from discovery to launch, driving a 42% lift in user activation and $1.8M new ARR.",
      "Formulated data-driven experimentation roadmap with 45+ A/B tests, boosting free-to-paid conversion rates by 26%.",
      "Aligned cross-functional teams across engineering, design, and executive leadership to ship 3 flagship features on schedule."
    ];
  }

  if (title.includes("marketing") || title.includes("growth") || title.includes("seo")) {
    return [
      "Orchestrated full-funnel organic acquisition engine, growing monthly recurring organic visitors from 80K to 650K+ in 12 months.",
      "Managed $1.4M annual multi-channel paid ad budget across Google & Meta, achieving an optimal 4.2x ROAS and reducing CAC by 31%.",
      "Designed comprehensive lifecycle retention sequences, improving 90-day user cohort retention by 22%."
    ];
  }

  if (title.includes("data") || title.includes("ai") || title.includes("machine learning")) {
    return [
      "Trained and fine-tuned transformer and diffusion models on distributed GPU clusters, improving inference accuracy by 18.5%.",
      "Designed automated data ingestion pipeline processing 4TB+ daily telemetry events with zero data loss.",
      "Collaborated with clinical and domain experts to validate production ML models, outperforming state-of-the-art benchmarks."
    ];
  }

  if (title.includes("design") || title.includes("ui") || title.includes("ux")) {
    return [
      "Established comprehensive Figma design system adopted across 8 cross-functional squads, accelerating design-to-code velocity by 40%.",
      "Conducted 50+ generative user interviews and usability tests to redesign the core checkout flow, decreasing drop-off by 19%.",
      "Partnered closely with frontend engineering to ensure pixel-perfect accessibility standards adhering to WCAG 2.1 AA."
    ];
  }

  // Fallback Universal Bullets
  return [
    `Spearheaded core strategic initiatives as ${roleTitle || "Senior Specialist"}, increasing team delivery velocity by 35%.`,
    "Collaborated with cross-functional leadership to standardize operational workflows, reducing turnaround time by 48 hours.",
    "Engineered scalable internal tooling and documentation, directly saving 20+ cumulative hours per week across the department."
  ];
}

// 4. Generate Executive Summary from Resume Profile
export function generateSummaryForProfile(data: ResumeData): string {
  const name = data.personal.fullName || "Professional";
  const title = data.personal.jobTitle || "Experienced Specialist";
  const allSkills = data.skills.flatMap(s => s.skills).slice(0, 4).join(", ");
  const companyCount = data.experience.length;

  let experienceYears = "5+";
  if (companyCount >= 4) experienceYears = "8+";
  else if (companyCount <= 1) experienceYears = "3+";

  const skillsClause = allSkills ? ` specializing in ${allSkills}` : "";

  return `Results-driven ${title} with ${experienceYears} years of progressive experience delivering high-impact solutions in high-velocity environments${skillsClause}. Demonstrated track record of architecting scalable systems, leading cross-functional teams, and executing strategic initiatives that drive measurable revenue and efficiency gains. Adept at bridging technical complexity with business objectives to deliver exceptional user outcomes.`;
}

// 5. Generate Matched Cover Letter Text
export function generateCoverLetterText(resume: ResumeData, targetJob: string, targetCompany: string) {
  const candidateName = resume.personal.fullName || "Candidate";
  const currentTitle = resume.personal.jobTitle || "Professional";
  const roleName = targetJob || currentTitle;
  const companyName = targetCompany || "your team";
  const primarySkills = resume.skills.flatMap(s => s.skills).slice(0, 3).join(", ");

  const opening = `I am writing to express my strong enthusiasm for the ${roleName} position at ${companyName}. With my proven background in ${primarySkills || "delivering scalable business impact"} and a track record of driving measurable performance improvements, I am confident in my ability to make an immediate contribution to your high-performing team.`;

  const body1 = `Throughout my career as a ${currentTitle}, I have focused on solving complex challenges at scale. Most recently, I led strategic initiatives that optimized operational workflows, reduced system friction by over 35%, and consistently exceeded core business KPIs. Whether architecting new solutions from the ground up or optimizing existing architectures, I bring a methodical, data-driven approach to every project.`;

  const body2 = `What particularly excites me about ${companyName} is your commitment to innovative, customer-centric execution. My collaborative approach—mentoring engineers, partnering with cross-functional product stakeholders, and maintaining rigorous quality standards—aligns seamlessly with your cultural values. I thrive in collaborative environments where velocity and excellence go hand-in-hand.`;

  const closing = `Thank you for reviewing my application. I would welcome the opportunity to speak with you directly to discuss how my technical expertise and passion for high-impact execution can support ${companyName}'s long-term objectives.`;

  return {
    opening,
    body1,
    body2,
    closing
  };
}
