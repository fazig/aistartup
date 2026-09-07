import { ResumeData, ResumeTheme } from './types';

export const DEFAULT_RESUME_DATA: ResumeData = {
  personal: {
    fullName: "Alex Rivera",
    jobTitle: "Senior Full-Stack & AI Systems Engineer",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 382-9104",
    location: "San Francisco, CA (Open to Remote)",
    website: "https://alexrivera.dev",
    linkedin: "linkedin.com/in/alexrivera-tech",
    github: "github.com/alexrivera",
    photoUrl: ""
  },
  summary: "Results-driven Software Engineer with 7+ years of experience designing high-throughput distributed architectures, microservices, and client-side web utilities. Proven track record scaling Next.js and Python microservices from zero to 2M+ monthly active users while reducing latency by 45%. Passionate about clean code, developer experience, and Generative AI workflows.",
  experience: [
    {
      id: "exp1",
      role: "Lead Full-Stack Engineer",
      company: "Nexus Cloud Systems",
      location: "San Francisco, CA",
      startDate: "2023-01",
      endDate: "Present",
      current: true,
      highlights: [
        "Spearheaded architectural transition to Next.js 15 & React 19, reducing Largest Contentful Paint (LCP) by 58% across 14 enterprise web products.",
        "Architected an autonomous browser-based processing pipeline, eliminating server GPU bottlenecks and saving over $140,000 annually in AWS compute costs.",
        "Mentored a team of 8 junior and mid-level engineers, establishing CI/CD automation and code review standards."
      ]
    },
    {
      id: "exp2",
      role: "Senior Software Engineer",
      company: "Apex Digital Labs",
      location: "Austin, TX",
      startDate: "2020-03",
      endDate: "2022-12",
      current: false,
      highlights: [
        "Engineered real-time data sync using WebSockets and Redis, handling 45,000 concurrent active connections with sub-50ms message latency.",
        "Built modular design system and TypeScript component library adopted across 6 internal engineering squads, cutting UI development cycles by 30%.",
        "Optimized Postgres database indexing and query plans, decreasing p99 database response times from 420ms to 45ms."
      ]
    },
    {
      id: "exp3",
      role: "Software Developer",
      company: "Vanguard Interactive",
      location: "Seattle, WA",
      startDate: "2018-06",
      endDate: "2020-02",
      current: false,
      highlights: [
        "Developed responsive front-end user interfaces using React, Redux, and Tailwind CSS for high-volume e-commerce client stores.",
        "Integrated secure Stripe and PayPal payment gateways with webhook idempotency handling, processing over $4M in annual transaction volume."
      ]
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2014-09",
      endDate: "2018-05",
      gpa: "3.85 / 4.0 (Cum Laude)"
    }
  ],
  skills: [
    {
      id: "sk1",
      name: "Frontend & Web",
      skills: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "HTML5 Canvas", "WebGL", "Vite"]
    },
    {
      id: "sk2",
      name: "Backend & Cloud",
      skills: ["Node.js", "Python / FastAPI", "PostgreSQL", "Redis", "Docker", "AWS (ECS, S3, CloudFront)", "GraphQL"]
    },
    {
      id: "sk3",
      name: "Engineering Practices",
      skills: ["CI/CD Pipelines", "System Architecture", "Performance Profiling", "ATS Optimization", "Unit / E2E Testing (Playwright)"]
    }
  ],
  projects: [
    {
      id: "proj1",
      title: "HyperCanvas AI Studio",
      role: "Creator & Lead Maintainer",
      link: "https://github.com/alexrivera/hypercanvas",
      techStack: "TypeScript, Next.js, WebGL, WebAssembly",
      description: "An open-source in-browser image optimization engine featuring client-side super-resolution with zero cloud telemetry. Starred by 3,400+ developers on GitHub."
    },
    {
      id: "proj2",
      title: "FlowState Task Runner",
      role: "Sole Developer",
      link: "https://flowstate.dev",
      techStack: "React, Tailwind, IndexedDB, Web Workers",
      description: "Lightweight offline-first productivity tool with keyboard-driven command bar and local end-to-end encryption."
    }
  ],
  certifications: [
    {
      id: "cert1",
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "2024-04"
    },
    {
      id: "cert2",
      title: "Meta Frontend Developer Professional Certificate",
      issuer: "Meta / Coursera",
      date: "2022-11"
    }
  ],
  languages: [
    { id: "lang1", language: "English", proficiency: "Native / Bilingual" },
    { id: "lang2", language: "Spanish", proficiency: "Professional Working" }
  ]
};

export const DEFAULT_RESUME_THEME: ResumeTheme = {
  templateId: 'modern',
  primaryColor: '#2563eb',
  accentColor: '#1e293b',
  textColor: '#0f172a',
  fontFamily: 'sans',
  density: 'normal',
  paperSize: 'a4',
  showPhoto: false,
  showIcons: true
};

export const COLOR_PRESETS = [
  { name: 'Classic Navy', primary: '#1e3a8a', accent: '#3b82f6' },
  { name: 'Modern Slate', primary: '#2563eb', accent: '#1e293b' },
  { name: 'Emerald Forest', primary: '#047857', accent: '#10b981' },
  { name: 'Charcoal Minimal', primary: '#18181b', accent: '#52525b' },
  { name: 'Royal Burgundy', primary: '#881337', accent: '#f43f5e' },
  { name: 'Nordic Teal', primary: '#0f766e', accent: '#14b8a6' },
  { name: 'Warm Amber', primary: '#b45309', accent: '#d97706' },
  { name: 'Deep Violet', primary: '#581c87', accent: '#8b5cf6' },
  { name: 'Crimson Bold', primary: '#991b1b', accent: '#ef4444' },
  { name: 'Clean Indigo', primary: '#4338ca', accent: '#6366f1' },
];

export const TEMPLATE_INFO = [
  { id: 'modern', name: 'Modern Pillar', badge: 'Universal', desc: 'Sleek single-column layout with bold colored headings and pill badges. Universal favorite.', description: 'Sleek single-column layout with bold colored headings and pill badges. Universal favorite.' },
  { id: 'executive', name: 'Executive Split', badge: 'Corporate', desc: 'Corporate 2-column format with dark sidebar for skills, contact, and education.', description: 'Corporate 2-column format with dark sidebar for skills, contact, and education.' },
  { id: 'minimalist', name: 'Minimalist ATS', badge: 'ATS 100%', desc: 'Clean, black & white, high-contrast typography designed for 100% ATS parser readability.', description: 'Clean, black & white, high-contrast typography designed for 100% ATS parser readability.' },
  { id: 'tech', name: 'Developer Grid', badge: 'Tech / Dev', desc: 'Tech-focused layout highlighting GitHub, project links, and granular tech stacks.', description: 'Tech-focused layout highlighting GitHub, project links, and granular tech stacks.' },
  { id: 'creative', name: 'Creative Accent', badge: 'Designer', desc: 'Vibrant top header banner with refined typography and highlighted project cards.', description: 'Vibrant top header banner with refined typography and highlighted project cards.' },
  { id: 'academic', name: 'Harvard Classic', badge: 'Academic', desc: 'Traditional serif academic format with clean horizontal rules and centered header.', description: 'Traditional serif academic format with clean horizontal rules and centered header.' },
  { id: 'nordic', name: 'Nordic Clean', badge: 'Nordic', desc: 'Scandinavian aesthetic with airy margins, delicate divider lines, and refined dates.', description: 'Scandinavian aesthetic with airy margins, delicate divider lines, and refined dates.' },
  { id: 'split', name: 'Sidebar Studio', badge: 'Multi-Role', desc: 'Balanced 35/65 column split with colored accents, ideal for multi-disciplinary roles.', description: 'Balanced 35/65 column split with colored accents, ideal for multi-disciplinary roles.' },
  { id: 'compact', name: 'Compact One-Page', badge: '1-Page Fit', desc: 'High-density formatting engineered to fit 10+ years of experience onto a single page.', description: 'High-density formatting engineered to fit 10+ years of experience onto a single page.' },
  { id: 'timeline', name: 'Career Timeline', badge: 'Milestones', desc: 'Visual chronological milestones with connecting vertical lines along experience.', description: 'Visual chronological milestones with connecting vertical lines along experience.' }
];

