export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photoUrl: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  role?: string;
  location?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  highlights: string[];
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  role: string;
  link: string;
  techStack: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: string;
}

export type TemplateId = 
  | 'modern' 
  | 'executive' 
  | 'minimalist' 
  | 'tech' 
  | 'creative' 
  | 'academic' 
  | 'nordic' 
  | 'split' 
  | 'compact' 
  | 'timeline';

export interface ResumeTheme {
  templateId: TemplateId;
  primaryColor: string;
  accentColor: string;
  textColor: string;
  fontFamily: 'sans' | 'serif' | 'mono' | 'geometric';
  density: 'compact' | 'normal' | 'spacious';
  paperSize: 'a4' | 'letter';
  showPhoto: boolean;
  showIcons: boolean;
}

export interface ResumeData {
  personal: PersonalDetails;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
}
