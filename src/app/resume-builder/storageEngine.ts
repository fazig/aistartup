import { ResumeDocument, CoverLetterData, ResumeData, ResumeTheme } from "./types";
import { DEFAULT_RESUME_DATA, DEFAULT_RESUME_THEME } from "../tools/resume-builder/defaultData";
import { ROLE_PRESETS } from "./rolePresets";

const DOCS_KEY = "resumecraft_saas_documents_v2";
const ACTIVE_DOC_ID_KEY = "resumecraft_saas_active_doc_id_v2";
const COVER_LETTERS_KEY = "resumecraft_saas_cover_letters_v2";
const ACTIVE_COVER_ID_KEY = "resumecraft_saas_active_cover_id_v2";

// Helper to generate IDs
export function generateId(): string {
  return "rc_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36);
}

// Initial default document
function createDefaultDocument(): ResumeDocument {
  return {
    id: "default_resume",
    title: "Senior AI & Full-Stack Engineer",
    targetRole: "Senior AI Engineer",
    targetCompany: "Google / OpenAI / Anthropic",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    data: DEFAULT_RESUME_DATA,
    theme: DEFAULT_RESUME_THEME,
    sectionOrder: ["summary", "experience", "skills", "projects", "education", "certifications", "languages"]
  };
}

// 1. Get all documents
export function getAllDocuments(): ResumeDocument[] {
  if (typeof window === "undefined") return [createDefaultDocument()];
  try {
    const raw = localStorage.getItem(DOCS_KEY);
    if (!raw) {
      const initial = [createDefaultDocument()];
      localStorage.setItem(DOCS_KEY, JSON.stringify(initial));
      localStorage.setItem(ACTIVE_DOC_ID_KEY, initial[0].id);
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    const initial = [createDefaultDocument()];
    localStorage.setItem(DOCS_KEY, JSON.stringify(initial));
    return initial;
  } catch (err) {
    console.error("Failed to load documents from storage", err);
    return [createDefaultDocument()];
  }
}

// 2. Get active document ID
export function getActiveDocumentId(): string {
  if (typeof window === "undefined") return "default_resume";
  const id = localStorage.getItem(ACTIVE_DOC_ID_KEY);
  if (id) return id;
  const docs = getAllDocuments();
  return docs[0]?.id || "default_resume";
}

// 3. Set active document ID
export function setActiveDocumentId(id: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_DOC_ID_KEY, id);
}

// 4. Get active document
export function getActiveDocument(): ResumeDocument {
  const docs = getAllDocuments();
  const activeId = getActiveDocumentId();
  const match = docs.find(d => d.id === activeId);
  return match || docs[0] || createDefaultDocument();
}

// 5. Save or update document
export function saveDocument(doc: ResumeDocument): void {
  if (typeof window === "undefined") return;
  try {
    const docs = getAllDocuments();
    const index = docs.findIndex(d => d.id === doc.id);
    const updatedDoc: ResumeDocument = {
      ...doc,
      updatedAt: new Date().toISOString()
    };
    if (index >= 0) {
      docs[index] = updatedDoc;
    } else {
      docs.unshift(updatedDoc);
    }
    localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
    localStorage.setItem(ACTIVE_DOC_ID_KEY, updatedDoc.id);
  } catch (err) {
    console.error("Failed to save document to storage", err);
  }
}

// 6. Create new document
export function createNewDocument(title?: string, rolePresetKey?: string): ResumeDocument {
  let docData = DEFAULT_RESUME_DATA;
  let docTitle = title || "Untitled Resume";
  let targetRole = "Full-Stack Engineer";

  if (rolePresetKey) {
    const foundPreset = ROLE_PRESETS.find(p => p.id === rolePresetKey);
    if (foundPreset) {
      docData = foundPreset.data;
      docTitle = title || foundPreset.name;
      targetRole = foundPreset.name;
    }
  }

  const newDoc: ResumeDocument = {
    id: generateId(),
    title: docTitle,
    targetRole: targetRole,
    targetCompany: "Top Tech",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    data: JSON.parse(JSON.stringify(docData)),
    theme: { ...DEFAULT_RESUME_THEME },
    sectionOrder: ["summary", "experience", "skills", "projects", "education", "certifications", "languages"]
  };

  const docs = getAllDocuments();
  docs.unshift(newDoc);
  if (typeof window !== "undefined") {
    localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
    localStorage.setItem(ACTIVE_DOC_ID_KEY, newDoc.id);
  }
  return newDoc;
}

// 7. Duplicate document
export function duplicateDocument(id: string): ResumeDocument | null {
  const docs = getAllDocuments();
  const target = docs.find(d => d.id === id);
  if (!target) return null;

  const copy: ResumeDocument = {
    ...JSON.parse(JSON.stringify(target)),
    id: generateId(),
    title: `${target.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  docs.unshift(copy);
  if (typeof window !== "undefined") {
    localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
    localStorage.setItem(ACTIVE_DOC_ID_KEY, copy.id);
  }
  return copy;
}

// 8. Delete document
export function deleteDocument(id: string): ResumeDocument[] {
  let docs = getAllDocuments();
  if (docs.length <= 1) {
    // Keep at least one document
    const fresh = createDefaultDocument();
    docs = [fresh];
    if (typeof window !== "undefined") {
      localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
      localStorage.setItem(ACTIVE_DOC_ID_KEY, fresh.id);
    }
    return docs;
  }

  docs = docs.filter(d => d.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
    const activeId = getActiveDocumentId();
    if (activeId === id) {
      localStorage.setItem(ACTIVE_DOC_ID_KEY, docs[0].id);
    }
  }
  return docs;
}

// ============================================================================
// COVER LETTERS STORAGE
// ============================================================================

function createDefaultCoverLetter(resume?: ResumeDocument): CoverLetterData {
  const fullName = resume?.data?.personal?.fullName || "Alex Rivera";
  const jobTitle = resume?.data?.personal?.jobTitle || "Senior AI & Full-Stack Engineer";
  const email = resume?.data?.personal?.email || "alex.rivera@example.com";
  const phone = resume?.data?.personal?.phone || "+1 (555) 389-2041";

  return {
    id: "default_cover_letter",
    title: `${jobTitle} Cover Letter`,
    resumeId: resume?.id || "default_resume",
    recipientName: "Hiring Team",
    recipientTitle: "Head of Talent Acquisition",
    companyName: "Innovate AI Corp",
    companyAddress: "100 Innovation Way, San Francisco, CA 94105",
    letterDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    salutation: "Dear Hiring Team,",
    opening: `I am writing to express my enthusiastic interest in the ${jobTitle} role at Innovate AI Corp. With over 7 years of hands-on experience designing distributed intelligence systems, scalable cloud infrastructure, and low-latency APIs, I have admired your team's rapid breakthroughs and would welcome the opportunity to accelerate your mission.`,
    bodyParagraphs: [
      `In my most recent role, I spearheaded the core real-time inference pipeline, reducing end-to-end response latency by 42% while scaling throughput to handle 10M+ daily active requests. By transitioning our processing architectures to modern edge topologies, our cross-functional team unlocked \$1.2M in annual cloud efficiency gains.`,
      `Beyond technical architecture, I thrive in high-velocity, product-oriented engineering cultures. I have mentored 6 junior and mid-level engineers, established company-wide automated CI/CD benchmarks, and partnered directly with product leadership to bridge complex algorithmic capabilities into intuitive user experiences.`
    ],
    closing: "Thank you for your time and consideration. I would welcome the opportunity to discuss how my engineering leadership and background in scalable AI platforms can contribute to the continued expansion of your team.",
    signatureName: fullName,
    theme: {
      primaryColor: "#10b981",
      fontFamily: "sans",
      paperSize: "a4"
    }
  };
}

export function getAllCoverLetters(): CoverLetterData[] {
  if (typeof window === "undefined") return [createDefaultCoverLetter()];
  try {
    const raw = localStorage.getItem(COVER_LETTERS_KEY);
    if (!raw) {
      const initial = [createDefaultCoverLetter()];
      localStorage.setItem(COVER_LETTERS_KEY, JSON.stringify(initial));
      localStorage.setItem(ACTIVE_COVER_ID_KEY, initial[0].id);
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    const initial = [createDefaultCoverLetter()];
    localStorage.setItem(COVER_LETTERS_KEY, JSON.stringify(initial));
    return initial;
  } catch (err) {
    return [createDefaultCoverLetter()];
  }
}

export function getActiveCoverLetterId(): string {
  if (typeof window === "undefined") return "default_cover_letter";
  const id = localStorage.getItem(ACTIVE_COVER_ID_KEY);
  if (id) return id;
  const letters = getAllCoverLetters();
  return letters[0]?.id || "default_cover_letter";
}

export function setActiveCoverLetterId(id: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_COVER_ID_KEY, id);
}

export function getActiveCoverLetter(): CoverLetterData {
  const letters = getAllCoverLetters();
  const activeId = getActiveCoverLetterId();
  const match = letters.find(l => l.id === activeId);
  return match || letters[0] || createDefaultCoverLetter();
}

export function saveCoverLetter(letter: CoverLetterData): void {
  if (typeof window === "undefined") return;
  try {
    const letters = getAllCoverLetters();
    const index = letters.findIndex(l => l.id === letter.id);
    if (index >= 0) {
      letters[index] = letter;
    } else {
      letters.unshift(letter);
    }
    localStorage.setItem(COVER_LETTERS_KEY, JSON.stringify(letters));
    localStorage.setItem(ACTIVE_COVER_ID_KEY, letter.id);
  } catch (err) {
    console.error("Failed to save cover letter", err);
  }
}

export function createNewCoverLetter(resume?: ResumeDocument): CoverLetterData {
  const newLetter: CoverLetterData = {
    ...createDefaultCoverLetter(resume),
    id: generateId(),
    title: `${resume?.targetRole || "Professional"} Cover Letter`,
    letterDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  };
  const letters = getAllCoverLetters();
  letters.unshift(newLetter);
  if (typeof window !== "undefined") {
    localStorage.setItem(COVER_LETTERS_KEY, JSON.stringify(letters));
    localStorage.setItem(ACTIVE_COVER_ID_KEY, newLetter.id);
  }
  return newLetter;
}

export function deleteCoverLetter(id: string): CoverLetterData[] {
  let letters = getAllCoverLetters();
  if (letters.length <= 1) {
    const fresh = createDefaultCoverLetter();
    letters = [fresh];
    if (typeof window !== "undefined") {
      localStorage.setItem(COVER_LETTERS_KEY, JSON.stringify(letters));
      localStorage.setItem(ACTIVE_COVER_ID_KEY, fresh.id);
    }
    return letters;
  }
  letters = letters.filter(l => l.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(COVER_LETTERS_KEY, JSON.stringify(letters));
    const activeId = getActiveCoverLetterId();
    if (activeId === id) {
      localStorage.setItem(ACTIVE_COVER_ID_KEY, letters[0].id);
    }
  }
  return letters;
}

// ============================================================================
// BACKUP & RESTORE BUNDLE
// ============================================================================

export function exportSaaSBackupBundle(): string {
  const bundle = {
    version: "2.0",
    exportedAt: new Date().toISOString(),
    documents: getAllDocuments(),
    coverLetters: getAllCoverLetters()
  };
  return JSON.stringify(bundle, null, 2);
}

export function importSaaSBackupBundle(jsonStr: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const parsed = JSON.parse(jsonStr);
    if (parsed.documents && Array.isArray(parsed.documents)) {
      localStorage.setItem(DOCS_KEY, JSON.stringify(parsed.documents));
      if (parsed.documents[0]?.id) {
        localStorage.setItem(ACTIVE_DOC_ID_KEY, parsed.documents[0].id);
      }
    }
    if (parsed.coverLetters && Array.isArray(parsed.coverLetters)) {
      localStorage.setItem(COVER_LETTERS_KEY, JSON.stringify(parsed.coverLetters));
      if (parsed.coverLetters[0]?.id) {
        localStorage.setItem(ACTIVE_COVER_ID_KEY, parsed.coverLetters[0].id);
      }
    }
    return true;
  } catch (err) {
    console.error("Invalid backup file", err);
    return false;
  }
}
