"use client";

import Image from "next/image";
import { Match, Team } from "../api/sportsData";
import { Calendar, Clock } from "lucide-react";

export default function MatchCard({ match }: { match: Match }) {
  const isLive = match.status.state === "in";
  const isFinished = match.status.state === "post";

  // Status Badge Rendering
  const getStatusBadge = () => {
    if (isLive) {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span className="pulse-dot" style={{ 
            width: "8px", height: "8px", backgroundColor: "#ff3b30", borderRadius: "50%", 
            boxShadow: "0 0 8px #ff3b30" 
          }}></span>
          <span style={{ color: "#ff3b30", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.5px" }}>LIVE</span>
        </div>
      );
    }
    if (isFinished) {
      return <span style={{ color: "var(--text-muted)", fontWeight: 600, fontSize: "0.85rem" }}>FT</span>;
    }
    return <span style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.85rem" }}>UPCOMING</span>;
  };

  const TeamLogo = ({ team }: { team: Team }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", flex: 1 }}>
      <div style={{ 
        width: "60px", height: "60px", position: "relative", 
        backgroundColor: "#f9fafb", borderRadius: "50%", padding: "8px",
        border: team.winner ? "2px solid #34c759" : "2px solid transparent",
        display: "flex", justifyContent: "center", alignItems: "center"
      }}>
        {team.logo ? (
          <Image 
            src={team.logo} 
            alt={team.name} 
            width={40} 
            height={40} 
            style={{ objectFit: "contain" }}
          />
        ) : (
          <div style={{ width: 40, height: 40, backgroundColor: "#e5e7eb", borderRadius: "50%" }}></div>
        )}
      </div>
      <span style={{ fontWeight: 600, fontSize: "0.95rem", textAlign: "center", color: "var(--text-main)" }}>
        {team.shortDisplayName}
      </span>
    </div>
  );

  return (
    <div style={{
      background: "#ffffff",
      border: "1px solid var(--border-light)",
      borderRadius: "16px",
      padding: "1.5rem",
      boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
      transition: "transform 0.2s, box-shadow 0.2s",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      cursor: "pointer"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.03)";
    }}
    >
      {/* Header: League & Status */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
          {match.league}
        </span>
        {getStatusBadge()}
      </div>

      {/* Main Score Area */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
        <TeamLogo team={match.homeTeam} />
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "0 1rem" }}>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main)", display: "flex", gap: "12px" }}>
            <span style={{ color: match.homeTeam.winner ? "var(--text-main)" : "var(--text-muted)" }}>{match.homeTeam.score}</span>
            <span>-</span>
            <span style={{ color: match.awayTeam.winner ? "var(--text-main)" : "var(--text-muted)" }}>{match.awayTeam.score}</span>
          </div>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500, textAlign: "center" }}>
            {match.status.detail}
          </span>
        </div>

        <TeamLogo team={match.awayTeam} />
      </div>

      {/* Footer Details */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "0.5rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-light)" }}>
        {!isLive && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <Calendar size={14} />
            <span>{new Date(match.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          <Clock size={14} />
          <span>{new Date(match.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
}
