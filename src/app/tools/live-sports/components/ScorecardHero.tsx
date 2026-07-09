import Image from "next/image";

export default function ScorecardHero({ header }: { header: any }) {
  if (!header || !header.competitions || !header.competitions[0]) return null;
  const competition = header.competitions[0];
  const competitors = competition.competitors;
  
  const home = competitors.find((c: any) => c.homeAway === 'home');
  const away = competitors.find((c: any) => c.homeAway === 'away');

  const status = competition.status?.type?.detail || header.season?.name || "Match";
  const commentary = competition.headlines?.[0]?.description || competition.notes?.[0]?.headline || "";

  return (
    <div style={{
      background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      borderRadius: "24px",
      padding: "3rem 2rem",
      color: "white",
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.3)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background decoration */}
      <div style={{
        position: "absolute",
        top: "-50%",
        right: "-20%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{ textAlign: "center", marginBottom: "2rem", position: "relative", zIndex: 1 }}>
        <span style={{ 
          background: "rgba(255,255,255,0.1)", 
          padding: "8px 16px", 
          borderRadius: "99px", 
          fontSize: "0.9rem", 
          fontWeight: 600, 
          letterSpacing: "1px",
          textTransform: "uppercase" 
        }}>
          {status}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1, flexWrap: "wrap", gap: "2rem" }}>
        {/* Home Team */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
          {home.team.logo && (
            <div style={{ background: "white", padding: "1rem", borderRadius: "50%", marginBottom: "1rem" }}>
              <Image src={home.team.logo} alt={home.team.name} width={100} height={100} style={{ objectFit: "contain" }} />
            </div>
          )}
          <h2 style={{ fontSize: "2rem", fontWeight: 800, textAlign: "center", margin: 0 }}>{home.team.displayName}</h2>
          <p style={{ fontSize: "1.1rem", opacity: 0.7, margin: "4px 0 0 0" }}>{home.record?.[0]?.summary || ""}</p>
        </div>

        {/* Score */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "5rem", fontWeight: 900, display: "flex", gap: "24px", fontFamily: "monospace" }}>
            <span style={{ color: home.winner ? "#38bdf8" : "white" }}>{home.score || "0"}</span>
            <span style={{ opacity: 0.5 }}>-</span>
            <span style={{ color: away.winner ? "#38bdf8" : "white" }}>{away.score || "0"}</span>
          </div>
        </div>

        {/* Away Team */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
          {away.team.logo && (
            <div style={{ background: "white", padding: "1rem", borderRadius: "50%", marginBottom: "1rem" }}>
              <Image src={away.team.logo} alt={away.team.name} width={100} height={100} style={{ objectFit: "contain" }} />
            </div>
          )}
          <h2 style={{ fontSize: "2rem", fontWeight: 800, textAlign: "center", margin: 0 }}>{away.team.displayName}</h2>
          <p style={{ fontSize: "1.1rem", opacity: 0.7, margin: "4px 0 0 0" }}>{away.record?.[0]?.summary || ""}</p>
        </div>
      </div>

      {commentary && (
        <div style={{ textAlign: "center", marginTop: "3rem", position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "1.2rem", fontWeight: 500, color: "#cbd5e1", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            "{commentary}"
          </p>
        </div>
      )}
    </div>
  );
}
