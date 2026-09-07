import { ResumeData } from "../tools/resume-builder/types";

export interface RolePreset {
  id: string;
  name: string;
  category: string;
  data: ResumeData;
}

export const ROLE_PRESETS: RolePreset[] = [
  {
    id: "swe",
    name: "Senior AI & Full-Stack Engineer",
    category: "Engineering",
    data: {
      personal: {
        fullName: "Alex Rivera",
        jobTitle: "Senior Full-Stack & Distributed AI Engineer",
        email: "alex.rivera@example.com",
        phone: "+1 (555) 382-9104",
        location: "San Francisco, CA (Open to Remote)",
        website: "https://alexrivera.dev",
        linkedin: "linkedin.com/in/alexrivera-tech",
        github: "github.com/alexrivera",
        photoUrl: ""
      },
      summary: "Results-driven Software Engineer with 7+ years of experience designing high-throughput distributed systems, Next.js micro-frontends, and client-side web utilities. Scaled production systems from zero to 2.4M monthly active users while decreasing p99 server response latency by 48%. Passionate about vector algorithms, developer tooling, and autonomous agent workflows.",
      experience: [
        {
          id: "exp1",
          role: "Lead Full-Stack Systems Engineer",
          company: "Nexus Cloud Systems",
          location: "San Francisco, CA",
          startDate: "2023-01",
          endDate: "Present",
          current: true,
          highlights: [
            "Spearheaded architectural transition to Next.js 16 and React 19, reducing Largest Contentful Paint (LCP) by 58% across 14 enterprise web products.",
            "Architected an autonomous browser-based processing pipeline, eliminating server GPU bottlenecks and saving over $140,000 annually in cloud compute costs.",
            "Mentored an engineering squad of 8 engineers, establishing CI/CD automation, TypeScript strict mode, and 94% test coverage."
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
            "Optimized Postgres database indexing and query execution plans, decreasing p99 database response times from 420ms to 45ms."
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
          school: "University of California, Berkeley",
          degree: "B.S. in Computer Science & Engineering",
          location: "Berkeley, CA",
          startDate: "2014-08",
          endDate: "2018-05",
          gpa: "3.84 / 4.00"
        }
      ],
      skills: [
        {
          id: "sk1",
          name: "Core Languages",
          skills: ["TypeScript", "JavaScript", "Python", "Go", "SQL", "HTML5/CSS3"]
        },
        {
          id: "sk2",
          name: "Frameworks & Frontend",
          skills: ["React 19", "Next.js 16", "Node.js", "Express", "Tailwind CSS", "Redux Toolkit"]
        },
        {
          id: "sk3",
          name: "Cloud & Infrastructure",
          skills: ["AWS (ECS, Lambda, S3)", "Docker", "Kubernetes", "PostgreSQL", "Redis", "CI/CD Pipelines"]
        }
      ],
      projects: [
        {
          id: "proj1",
          title: "HyperVector Web Engine",
          role: "Creator & Maintainer",
          techStack: "TypeScript, WebAssembly, Canvas API",
          link: "https://github.com/alexrivera/hypervector",
          description: "High-performance client-side vector renderer downloaded over 250,000 times on npm with 4.2k GitHub stars."
        }
      ],
      certifications: [
        {
          id: "cert1",
          title: "AWS Certified Solutions Architect – Professional",
          issuer: "Amazon Web Services",
          date: "2024-03"
        }
      ],
      languages: [
        { id: "lang1", language: "English", proficiency: "Native / Bilingual" },
        { id: "lang2", language: "Spanish", proficiency: "Professional Working" }
      ]
    }
  },
  {
    id: "pm",
    name: "Senior Technical Product Manager",
    category: "Product",
    data: {
      personal: {
        fullName: "Elena Rostova",
        jobTitle: "Senior Technical Product Manager (B2B SaaS)",
        email: "elena.rostova@example.com",
        phone: "+1 (555) 492-1823",
        location: "New York, NY (Hybrid)",
        website: "https://elenarostova.co",
        linkedin: "linkedin.com/in/elenarostova-pm",
        github: "",
        photoUrl: ""
      },
      summary: "Customer-obsessed Senior Product Manager with 6+ years of experience leading cross-functional squads to launch B2B SaaS platforms. Spearheaded 0-to-1 product strategy that generated $8.4M in new Annual Recurring Revenue (ARR) within 18 months. Master of qualitative user discovery, quantitative experimentation, and data-driven product roadmaps.",
      experience: [
        {
          id: "exp1",
          role: "Lead Product Manager, Growth & Onboarding",
          company: "SaaSify Technologies",
          location: "New York, NY",
          startDate: "2022-04",
          endDate: "Present",
          current: true,
          highlights: [
            "Led product lifecycle for self-serve onboarding, improving free-to-paid conversion rate by 24% and generating $3.2M incremental ARR in year one.",
            "Conducted 80+ customer discovery interviews with enterprise CTOs to inform the quarterly product roadmap and reduce customer churn by 18%.",
            "Defined North Star metrics and implemented Mixpanel analytics across 12 product surface areas, enabling automated behavioral cohorts."
          ]
        },
        {
          id: "exp2",
          role: "Product Manager, Enterprise Integrations",
          company: "DataFlow Systems",
          location: "Boston, MA",
          startDate: "2019-08",
          endDate: "2022-03",
          current: false,
          highlights: [
            "Shipped 15+ third-party integrations with Salesforce, HubSpot, and Slack, unlocking $5.2M in enterprise pipeline deals.",
            "Managed dual-track agile sprints with a dedicated squad of 10 engineers and 2 UX designers with a 96% on-time release velocity."
          ]
        }
      ],
      education: [
        {
          id: "edu1",
          school: "Columbia University",
          degree: "B.A. in Economics & Information Science",
          location: "New York, NY",
          startDate: "2015-09",
          endDate: "2019-05",
          gpa: "3.91 / 4.00"
        }
      ],
      skills: [
        {
          id: "sk1",
          name: "Product Strategy",
          skills: ["Roadmapping", "0-to-1 Product Discovery", "User Journey Mapping", "Competitive Analysis", "A/B Testing"]
        },
        {
          id: "sk2",
          name: "Data & Tooling",
          skills: ["Mixpanel", "Amplitude", "SQL", "Jira / Linear", "Figma", "Google Analytics 4"]
        }
      ],
      projects: [
        {
          id: "proj1",
          title: "SaaS Onboarding Flow Redesign",
          role: "Lead PM",
          techStack: "Product Led Growth, Amplitude, Figma",
          link: "https://elenarostova.co/case-studies/onboarding",
          description: "Full revamp of self-serve activation funnel that cut time-to-first-value from 14 days down to 4 minutes."
        }
      ],
      certifications: [
        {
          id: "cert1",
          title: "Pragmatic Institute Certified (PMC-III)",
          issuer: "Pragmatic Institute",
          date: "2023-05"
        }
      ],
      languages: [
        { id: "lang1", language: "English", proficiency: "Native" },
        { id: "lang2", language: "French", proficiency: "Fluent" }
      ]
    }
  },
  {
    id: "marketing",
    name: "Head of Growth & Performance Marketing",
    category: "Marketing",
    data: {
      personal: {
        fullName: "Marcus Vance",
        jobTitle: "VP of Growth & Performance Marketing",
        email: "marcus.vance@example.com",
        phone: "+1 (555) 728-4091",
        location: "Austin, TX (Remote)",
        website: "https://marcusvance.com",
        linkedin: "linkedin.com/in/marcusvance-growth",
        github: "",
        photoUrl: ""
      },
      summary: "Data-driven Growth Marketing Executive with 8+ years scaling high-velocity consumer apps and enterprise SaaS pipelines. Managed $12M+ annual paid media budget across Google, Meta, and LinkedIn with a sustained 3.8x Blended ROAS. Proven mastery in Generative Engine Optimization (GEO), technical SEO, and conversion rate optimization (CRO).",
      experience: [
        {
          id: "exp1",
          role: "VP of Performance & Lifecycle Growth",
          company: "HyperScale Media",
          location: "Austin, TX",
          startDate: "2021-06",
          endDate: "Present",
          current: true,
          highlights: [
            "Scaled annual ARR from $6M to $28M through multi-touch paid acquisition, programmatic SEO, and email lifecycle nurture series.",
            "Restructured Google Ads & Meta Paid Social campaigns, lowering Customer Acquisition Cost (CAC) by 32% while doubling qualified demo volume.",
            "Formulated an algorithmic SEO strategy generating 1.8M monthly organic search visits across high-intent commercial keywords."
          ]
        }
      ],
      education: [
        {
          id: "edu1",
          school: "University of Texas at Austin",
          degree: "B.B.A. in Marketing & Data Analytics",
          location: "Austin, TX",
          startDate: "2013-09",
          endDate: "2017-05",
          gpa: "3.78 / 4.00"
        }
      ],
      skills: [
        {
          id: "sk1",
          name: "Growth & Channels",
          skills: ["Programmatic SEO", "Google Search Ads", "Meta Ads", "LinkedIn B2B", "Klaviyo", "HubSpot"]
        },
        {
          id: "sk2",
          name: "Analytics & Attribution",
          skills: ["Google Analytics 4", "Looker Studio", "Triple Whale", "Attribution Modeling", "Conversion Rate Optimization"]
        }
      ],
      projects: [
        {
          id: "proj1",
          title: "Global GEO & Organic Growth Campaign",
          role: "Strategy Lead",
          techStack: "Ahrefs, Semrush, Looker, Next.js",
          link: "https://marcusvance.com/case-studies/growth",
          description: "Ranked 85+ priority SaaS landing pages on position #1 across US & European search engines."
        }
      ],
      certifications: [
        {
          id: "cert1",
          title: "Reforge Growth Series Graduate",
          issuer: "Reforge",
          date: "2022-10"
        }
      ],
      languages: [
        { id: "lang1", language: "English", proficiency: "Native" }
      ]
    }
  }
];

export const POWER_VERBS = {
  leadership: [
    "Spearheaded", "Architected", "Directed", "Orchestrated", "Steered", "Championed", "Mentored", "Cultivated", "Overhauled", "Mobilized"
  ],
  technical: [
    "Engineered", "Implemented", "Refactored", "Automated", "Deployed", "Configured", "Benchmarked", "Integrated", "Programmed", "Decoupled"
  ],
  growth: [
    "Accelerated", "Maximized", "Generated", "Boosted", "Expanded", "Amplified", "Outperformed", "Surpassed", "Captured", "Tripled"
  ],
  efficiency: [
    "Streamlined", "Eliminated", "Consolidated", "Reduced", "Mitigated", "Optimized", "Economized", "Truncated", "Standardized", "Upgraded"
  ]
};
