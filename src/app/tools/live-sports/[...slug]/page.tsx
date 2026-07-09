import { notFound } from "next/navigation";
import { fetchMatchDetails } from "../api/sportsData";
import ScorecardHero from "../components/ScorecardHero";
import TeamStatsBox from "../components/TeamStatsBox";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function MatchDetailsPage(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const slug = params.slug;

  if (!slug || slug.length < 2) return notFound();

  const id = slug[slug.length - 1];
  const sportPath = slug.slice(0, -1).join('/');

  const matchData = await fetchMatchDetails(sportPath, id);

  if (!matchData || !matchData.boxscore) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <Link href="/tools/live-sports" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", fontWeight: 600 }}>
          <ChevronLeft size={20} /> Back to Dashboard
        </Link>
        <div style={{ padding: "3rem", textAlign: "center", background: "white", borderRadius: "16px", border: "1px solid var(--border-light)" }}>
          <h2 style={{ color: "var(--text-main)" }}>Detailed Stats Unavailable</h2>
          <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>ESPN has not published detailed boxscore data for this specific match yet.</p>
        </div>
      </div>
    );
  }

  const { boxscore, header } = matchData;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      <Link href="/tools/live-sports" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", fontWeight: 600 }}>
        <ChevronLeft size={20} /> Back to Dashboard
      </Link>
      
      <ScorecardHero header={header} />
      
      <div style={{ marginTop: "2rem" }}>
        <TeamStatsBox boxscore={boxscore} />
      </div>
    </div>
  );
}
