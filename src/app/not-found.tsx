import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container section" style={{ maxWidth: '600px', padding: '6rem 1.5rem', textAlign: 'center' }}>
      <div style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 80, height: 80, borderRadius: "50%", background: "#fef2f2",
        color: "#ef4444", marginBottom: "2rem"
      }}>
        <AlertCircle size={40} />
      </div>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
        404 - Page Not Found
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
        Oops! The page you are looking for doesn't exist, has been moved, or is temporarily unavailable. Check the URL or browse our list of free utility tools instead.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link href="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem' }}>
          <ArrowLeft size={16} /> Return Home
        </Link>
        <Link href="/tools" className="btn btn-outline" style={{ padding: '0.75rem 1.5rem' }}>
          Explore Tools
        </Link>
      </div>
    </div>
  );
}
