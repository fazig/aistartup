"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Delay showing the banner slightly to prioritize main content paint
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      left: "20px",
      right: "20px",
      maxWidth: "1000px",
      margin: "0 auto",
      backgroundColor: "#0f172a",
      color: "#e2e8f0",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      zIndex: 9999,
      border: "1px solid #334155"
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "white" }}>We Value Your Privacy</h3>
        <p style={{ fontSize: "0.875rem", margin: 0, lineHeight: 1.5, color: "#94a3b8" }}>
          We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link href="/cookie-policy" style={{ color: "var(--primary)", textDecoration: "none" }}>Cookie Policy</Link> for more information.
        </p>
      </div>
      <div style={{ display: "flex", gap: "1rem", alignSelf: "flex-end" }}>
        <button 
          onClick={() => setShowConsent(false)}
          style={{
            background: "transparent",
            border: "1px solid #334155",
            color: "#e2e8f0",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.875rem",
            transition: "all 0.2s"
          }}
        >
          Decline
        </button>
        <button 
          onClick={acceptCookies}
          style={{
            background: "var(--primary)",
            border: "none",
            color: "white",
            padding: "0.5rem 1.5rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.875rem",
            transition: "all 0.2s"
          }}
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
