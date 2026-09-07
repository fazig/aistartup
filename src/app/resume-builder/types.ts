import { ResumeData, ResumeTheme, WorkExperience, Education, SkillCategory, Project, Certification, Language, TemplateId } from "../tools/resume-builder/types";

export type {
  ResumeData,
  ResumeTheme,
  WorkExperience,
  Education,
  SkillCategory,
  Project,
  Certification,
  Language,
  TemplateId
};

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export type SectionKey =
  | "summary"
  | "experience"
  | "skills"
  | "education"
  | "projects"
  | "certifications"
  | "languages"
  | "custom";

export interface ResumeDocument {
  id: string;
  title: string;
  targetRole: string;
  targetCompany?: string;
  createdAt: string;
  updatedAt: string;
  data: ResumeData;
  theme: ResumeTheme;
  sectionOrder?: SectionKey[];
  customSections?: CustomSection[];
}

export interface CoverLetterData {
  id: string;
  title: string;
  resumeId?: string;
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;
  letterDate: string;
  salutation: string;
  opening: string;
  bodyParagraphs: string[];
  closing: string;
  signatureName: string;
  theme: {
    primaryColor: string;
    fontFamily: 'sans' | 'serif' | 'mono' | 'geometric';
    paperSize: 'a4' | 'letter';
  };
}

export interface JobKeywordMatch {
  keyword: string;
  category: 'hard_skill' | 'soft_skill' | 'tool' | 'qualification' | 'domain';
  countInJob: number;
  countInResume: number;
}

export interface JobMatchResult {
  score: number;
  jobTitleDetected: string;
  matchedCount: number;
  totalKeywords: number;
  matchedKeywords: JobKeywordMatch[];
  missingKeywords: JobKeywordMatch[];
  recommendations: string[];
}

export type SaasActiveTab = "studio" | "dashboard" | "job-matcher" | "cover-letter" | "settings";
