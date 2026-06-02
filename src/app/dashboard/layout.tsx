import Link from "next/link";
import { FileText, LayoutDashboard, MessageSquare, Zap, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.05em', marginBottom: '3rem', paddingLeft: '0.75rem' }}>
          Startup<span style={{ color: 'var(--text-secondary)' }}>AI</span>
        </div>
        
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', paddingLeft: '0.75rem' }}>
          Modules
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <Link href="/dashboard/documind" className="sidebar-link">
            <FileText size={18} /> DocuMind
          </Link>
          <Link href="/dashboard/marketscale" className="sidebar-link">
            <Zap size={18} /> MarketScale
          </Link>
          <Link href="/dashboard/sentiment" className="sidebar-link">
            <MessageSquare size={18} /> Sentiment Engine
          </Link>
        </nav>
        
        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <Link href="/" className="sidebar-link text-muted">
            <LogOut size={18} /> Exit to Website
          </Link>
        </div>
      </aside>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
