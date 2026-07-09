"use client";

import { useEffect, useState } from "react";
import { fetchSportsData, Match } from "./api/sportsData";
import MatchCard from "./components/MatchCard";
import { Activity, RefreshCw } from "lucide-react";

type SportCategory = 'all' | 'football_soccer' | 'cricket' | 'basketball' | 'american_football';

export default function LiveSportsPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<SportCategory>('all');
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async (category: SportCategory, isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    setRefreshing(isRefresh);
    try {
      const data = await fetchSportsData(category);
      setMatches(data);
    } catch (error) {
      console.error("Failed to load sports data", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData(activeTab);
    
    // Auto refresh every 60 seconds
    const interval = setInterval(() => {
      loadData(activeTab, true);
    }, 60000);
    
    return () => clearInterval(interval);
  }, [activeTab]);

  const tabs: { id: SportCategory, label: string }[] = [
    { id: 'all', label: 'All Sports' },
    { id: 'football_soccer', label: 'Football (Soccer)' },
    { id: 'american_football', label: 'American Football' },
    { id: 'basketball', label: 'Basketball' },
    { id: 'cricket', label: 'Cricket' },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "4rem 2rem", background: "#fdfdfd" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(0, 112, 243, 0.1)", color: "var(--primary)", padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 700, marginBottom: "1rem" }}>
              <Activity size={16} /> Live Data Feed
            </div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.5px", margin: 0 }}>
              Live Sports Stats
            </h1>
            <p style={{ color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "1.1rem" }}>
              Real-time scores, stats, and match updates across the globe.
            </p>
          </div>

          <button 
            onClick={() => loadData(activeTab, true)}
            disabled={refreshing}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.75rem 1.25rem",
              background: "#ffffff",
              border: "1px solid var(--border-light)",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: 600,
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
              color: "var(--text-main)",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-light)"}
          >
            <RefreshCw size={16} className={refreshing ? "spin-animation" : ""} />
            {refreshing ? "Updating..." : "Refresh Scores"}
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{ 
          display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "1rem", marginBottom: "2rem",
          scrollbarWidth: "none"
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "0.6rem 1.2rem",
                borderRadius: "20px",
                whiteSpace: "nowrap",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                border: activeTab === tab.id ? "1px solid var(--primary)" : "1px solid var(--border-light)",
                background: activeTab === tab.id ? "var(--primary)" : "#ffffff",
                color: activeTab === tab.id ? "#ffffff" : "var(--text-muted)",
                transition: "all 0.2s"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
            <div className="spin-animation" style={{ color: "var(--primary)" }}>
              <RefreshCw size={32} />
            </div>
          </div>
        ) : matches.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0", background: "#ffffff", borderRadius: "16px", border: "1px dashed var(--border-light)" }}>
            <Activity size={48} color="var(--border-light)" style={{ marginBottom: "1rem" }} />
            <h3 style={{ color: "var(--text-main)", marginBottom: "0.5rem" }}>No matches found</h3>
            <p style={{ color: "var(--text-muted)" }}>There are no scheduled or live matches for this category right now.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem"
          }}>
            {matches.map((match, idx) => (
              <MatchCard key={`${match.id}-${idx}`} match={match} />
            ))}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(255, 59, 48, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 59, 48, 0); }
        }
        .pulse-dot {
          animation: pulse 2s infinite;
        }
      `}} />
    </div>
  );
}
