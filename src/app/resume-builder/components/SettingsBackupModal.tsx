import React, { useRef, useState } from "react";
import {
  Settings,
  Download,
  Upload,
  ShieldCheck,
  Trash2,
  Check,
  AlertTriangle,
  FileCode,
  Sparkles
} from "lucide-react";
import { exportSaaSBackupBundle, importSaaSBackupBundle } from "../storageEngine";

interface SettingsBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataReload: () => void;
}

export default function SettingsBackupModal({
  isOpen,
  onClose,
  onDataReload
}: SettingsBackupModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadBackup = () => {
    const jsonStr = exportSaaSBackupBundle();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resumecraft_saas_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      const success = importSaaSBackupBundle(content);
      if (success) {
        setImportStatus("Backup successfully restored! Reloading...");
        setTimeout(() => {
          onDataReload();
          onClose();
        }, 1200);
      } else {
        setImportStatus("Invalid backup file. Please check the JSON structure.");
      }
    };
    reader.readAsText(file);
  };

  const handleWipeData = () => {
    if (confirm("Are you sure you want to reset all resumes and data? This will restore the factory default profile.")) {
      localStorage.clear();
      onDataReload();
      onClose();
    }
  };

  return (
    <div className="saas-modal-backdrop" onClick={onClose}>
      <div className="saas-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
        {/* Header */}
        <div className="saas-modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div className="saas-brand-icon" style={{ width: 28, height: 28 }}>
              <Settings size={16} />
            </div>
            <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "#ffffff" }}>
              SaaS Storage & Data Backups
            </h3>
          </div>
          <button onClick={onClose} className="saas-modal-close">✕</button>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="application/json"
          style={{ display: "none" }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
          {/* Privacy Guarantee Card */}
          <div className="saas-card" style={{ padding: "0.9rem 1rem", background: "rgba(16, 185, 129, 0.08)", borderColor: "rgba(16, 185, 129, 0.3)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#34d399", fontWeight: 700, fontSize: "0.82rem", marginBottom: 4 }}>
              <ShieldCheck size={16} /> 100% Client-Side Private Storage
            </div>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--saas-text-muted)", lineHeight: 1.5 }}>
              Your resumes, career history, and contact details are stored strictly in your browser's local sandbox (LocalStorage). Nothing is sent to an external server or cloud database.
            </p>
          </div>

          {/* Backup Download / Restore */}
          <div className="saas-card" style={{ padding: "1rem" }}>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.85rem", fontWeight: 700, color: "#ffffff" }}>
              Backup & Cloud Migration
            </h4>
            <p style={{ margin: "0 0 0.85rem 0", fontSize: "0.75rem", color: "var(--saas-text-muted)", lineHeight: 1.4 }}>
              Save all your resumes, cover letters, and settings into an encrypted JSON bundle so you can restore them on any computer.
            </p>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={handleDownloadBackup}
                className="saas-btn saas-btn-primary"
                style={{ flex: 1, padding: "0.45rem", fontSize: "0.78rem", justifyContent: "center" }}
              >
                <Download size={14} /> Download Backup (.json)
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="saas-btn saas-btn-secondary"
                style={{ flex: 1, padding: "0.45rem", fontSize: "0.78rem", justifyContent: "center" }}
              >
                <Upload size={14} /> Restore from File
              </button>
            </div>

            {importStatus && (
              <div style={{ marginTop: "0.75rem", fontSize: "0.78rem", color: importStatus.includes("success") ? "#34d399" : "#ef4444" }}>
                {importStatus}
              </div>
            )}
          </div>

          {/* Reset / Factory Wipe */}
          <div className="saas-card" style={{ padding: "1rem", borderColor: "rgba(239, 68, 68, 0.2)" }}>
            <h4 style={{ margin: "0 0 0.4rem 0", fontSize: "0.85rem", fontWeight: 700, color: "#f87171", display: "flex", alignItems: "center", gap: 6 }}>
              <AlertTriangle size={14} /> Factory Reset
            </h4>
            <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.74rem", color: "var(--saas-text-muted)" }}>
              Clear all saved resumes and cover letters in this browser, reverting back to the initial sample profile.
            </p>
            <button
              onClick={handleWipeData}
              className="saas-btn saas-btn-ghost"
              style={{ color: "#ef4444", fontSize: "0.75rem", padding: "0.35rem 0.75rem", border: "1px solid rgba(239, 68, 68, 0.3)" }}
            >
              <Trash2 size={13} /> Reset All Data & Reload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
