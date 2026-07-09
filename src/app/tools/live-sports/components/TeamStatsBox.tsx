import Image from "next/image";

export default function TeamStatsBox({ boxscore }: { boxscore: any }) {
  if (!boxscore || !boxscore.teams || boxscore.teams.length < 2) {
    return null;
  }

  const t1 = boxscore.teams[0];
  const t2 = boxscore.teams[1];

  // Extract shared statistic labels
  const statsKeys = t1.statistics?.map((s: any) => s.label || s.name) || [];

  return (
    <div style={{
      background: "white",
      borderRadius: "16px",
      padding: "2rem",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      border: "1px solid var(--border-light)",
    }}>
      <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "2rem", color: "var(--text-main)", textAlign: "center" }}>Team Statistics</h3>
      
      {statsKeys.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", fontWeight: 700, color: "var(--text-muted)", paddingBottom: "1rem", borderBottom: "2px solid var(--border-light)" }}>
            <div style={{ flex: 1, textAlign: "center" }}>{t1.team?.shortDisplayName || t1.team?.name}</div>
            <div style={{ flex: 1, textAlign: "center", textTransform: "uppercase" }}>Stat</div>
            <div style={{ flex: 1, textAlign: "center" }}>{t2.team?.shortDisplayName || t2.team?.name}</div>
          </div>

          {statsKeys.map((key: string, idx: number) => {
            const stat1 = t1.statistics[idx]?.displayValue;
            const stat2 = t2.statistics[idx]?.displayValue;
            
            // Simple visual bar calculation
            const val1 = parseFloat(stat1) || 0;
            const val2 = parseFloat(stat2) || 0;
            const total = val1 + val2;
            const pct1 = total > 0 ? (val1 / total) * 100 : 50;
            const pct2 = total > 0 ? (val2 / total) * 100 : 50;

            return (
              <div key={idx} style={{ display: "flex", alignItems: "center", padding: "0.5rem 0" }}>
                {/* Team 1 value */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                  <span style={{ fontWeight: 700, color: "var(--text-main)", fontSize: "1.1rem" }}>{stat1}</span>
                  <div style={{ width: "100%", height: "6px", background: "var(--border-light)", borderRadius: "4px", overflow: "hidden", display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ width: `${pct1}%`, background: val1 >= val2 ? "var(--primary)" : "#cbd5e1", height: "100%" }} />
                  </div>
                </div>

                {/* Stat Label */}
                <div style={{ flex: 1, textAlign: "center", fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", padding: "0 1rem" }}>
                  {key}
                </div>

                {/* Team 2 value */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ fontWeight: 700, color: "var(--text-main)", fontSize: "1.1rem" }}>{stat2}</span>
                  <div style={{ width: "100%", height: "6px", background: "var(--border-light)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${pct2}%`, background: val2 >= val1 ? "var(--primary)" : "#cbd5e1", height: "100%" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Team statistics are not currently available for this match.</p>
      )}

      {/* Roster / Player Boxscore if available */}
      {boxscore.players && boxscore.players.length > 0 && (
         <div style={{ marginTop: "4rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "2rem", color: "var(--text-main)", textAlign: "center" }}>Player Statistics</h3>
            <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Player data loaded from ESPN. Detailed tables coming soon!</p>
         </div>
      )}
    </div>
  );
}
