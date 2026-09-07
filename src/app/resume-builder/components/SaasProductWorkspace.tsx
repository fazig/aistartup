'use client';

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ResumeDocument, SaasActiveTab } from "../types";
import {
  getAllDocuments,
  getActiveDocumentId,
  setActiveDocumentId,
  saveDocument,
  createNewDocument,
  duplicateDocument,
  deleteDocument
} from "../storageEngine";
import { calculateATSScore } from "../atsScoreEngine";
import SaasAppHeader from "./SaasAppHeader";
import ResumesDashboard from "./ResumesDashboard";
import JobMatcherStudio from "./JobMatcherStudio";
import CoverLetterStudio from "./CoverLetterStudio";
import SettingsBackupModal from "./SettingsBackupModal";
import ResumeStudioApp from "../ResumeStudioApp";

interface SaasProductWorkspaceProps {
  initialTab?: SaasActiveTab;
}

export default function SaasProductWorkspace({ initialTab = "studio" }: SaasProductWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<SaasActiveTab>(initialTab);
  const [documents, setDocuments] = useState<ResumeDocument[]>([]);
  const [activeDocId, setActiveDocIdState] = useState<string>("");
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [savedNotification, setSavedNotification] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Initial load
  const reloadFromStorage = useCallback(() => {
    const docs = getAllDocuments();
    const currentActiveId = getActiveDocumentId();
    setDocuments(docs);
    setActiveDocIdState(currentActiveId || docs[0]?.id || "");
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    reloadFromStorage();
  }, [reloadFromStorage]);

  // Current active doc
  const activeDoc = useMemo(() => {
    return documents.find(d => d.id === activeDocId) || documents[0] || null;
  }, [documents, activeDocId]);

  // ATS score calculation
  const atsScore = useMemo(() => {
    if (!activeDoc) return 0;
    return calculateATSScore(activeDoc.data).score;
  }, [activeDoc]);

  // Handlers
  const handleSelectDoc = (id: string) => {
    setActiveDocIdState(id);
    setActiveDocumentId(id);
  };

  const handleCreateNewDoc = (title?: string, presetKey?: string) => {
    const created = createNewDocument(title, presetKey);
    reloadFromStorage();
    setActiveTab("studio");
  };

  const handleDuplicateDoc = (id: string) => {
    duplicateDocument(id);
    reloadFromStorage();
  };

  const handleDeleteDoc = (id: string) => {
    deleteDocument(id);
    reloadFromStorage();
  };

  const handleRenameDoc = (id: string, newTitle: string) => {
    const target = documents.find(d => d.id === id);
    if (target) {
      const updated = { ...target, title: newTitle, updatedAt: new Date().toISOString() };
      saveDocument(updated);
      reloadFromStorage();
    }
  };

  const handleUpdateDoc = (updated: ResumeDocument) => {
    saveDocument(updated);
    setDocuments(prev => prev.map(d => (d.id === updated.id ? updated : d)));
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 1400);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isLoaded || !activeDoc) {
    return (
      <div className="saas-workspace-loading">
        <div className="saas-loading-spinner" />
        <span>Initializing ResumeCraft AI SaaS Workspace...</span>
      </div>
    );
  }

  return (
    <div className="saas-app-shell">
      {/* 1. Global SaaS App Top Bar */}
      <SaasAppHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        documents={documents}
        activeDoc={activeDoc}
        onSelectDoc={handleSelectDoc}
        onCreateNewDoc={() => handleCreateNewDoc()}
        atsScore={atsScore}
        onPrint={handlePrint}
        onOpenSettings={() => setIsSettingsOpen(true)}
        savedNotification={savedNotification}
      />

      {/* 2. Active Tab View Render */}
      <main className="saas-tab-view-container">
        {activeTab === "studio" && (
          <ResumeStudioApp
            activeDoc={activeDoc}
            onUpdateDoc={handleUpdateDoc}
            onOpenDashboard={() => setActiveTab("dashboard")}
          />
        )}

        {activeTab === "dashboard" && (
          <ResumesDashboard
            documents={documents}
            activeDocId={activeDocId}
            onSelectDoc={handleSelectDoc}
            onCreateNewDoc={handleCreateNewDoc}
            onDuplicateDoc={handleDuplicateDoc}
            onDeleteDoc={handleDeleteDoc}
            onRenameDoc={handleRenameDoc}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "job-matcher" && (
          <JobMatcherStudio
            activeDoc={activeDoc}
            onUpdateDoc={handleUpdateDoc}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "cover-letter" && (
          <CoverLetterStudio
            activeResume={activeDoc}
          />
        )}
      </main>

      {/* 3. Settings & Backups Modal */}
      <SettingsBackupModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onDataReload={reloadFromStorage}
      />
    </div>
  );
}
