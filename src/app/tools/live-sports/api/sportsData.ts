export interface Team {
  id: string;
  name: string;
  shortDisplayName: string;
  logo: string;
  score: string;
  winner?: boolean;
}

export interface Match {
  id: string;
  name: string;
  shortName: string;
  date: string;
  status: {
    state: 'pre' | 'in' | 'post';
    detail: string;
    clock?: number;
    period?: number;
  };
  homeTeam: Team;
  awayTeam: Team;
  league: string;
  commentary?: string;
  sportPath: string;
}

// ESPN API Endpoints
const ENDPOINTS = {
  football_soccer: [
    'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard',
    'https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard',
    'https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard',
  ],
  cricket: [
    'https://site.api.espn.com/apis/site/v2/sports/cricket/8039/scoreboard', // fallback test
  ],
  basketball: [
    'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
  ],
  american_football: [
    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard',
  ]
};

/**
 * Normalizes ESPN API response to our unified Match interface
 */
function normalizeESPNMatch(event: any, leagueName: string, sportPath: string): Match | null {
  try {
    const competition = event.competitions[0];
    const competitors = competition.competitors;
    
    const home = competitors.find((c: any) => c.homeAway === 'home');
    const away = competitors.find((c: any) => c.homeAway === 'away');

    return {
      id: event.id,
      name: event.name,
      shortName: event.shortName,
      date: event.date,
      status: {
        state: event.status.type.state,
        detail: event.status.type.detail,
      },
      league: leagueName,
      commentary: event.competitions?.[0]?.headlines?.[0]?.description || event.competitions?.[0]?.notes?.[0]?.headline || event.status?.type?.detail || "",
      homeTeam: {
        id: home.id,
        name: home.team.name,
        shortDisplayName: home.team.shortDisplayName || home.team.abbreviation,
        logo: home.team.logo,
        score: home.score || '0',
        winner: home.winner
      },
      awayTeam: {
        id: away.id,
        name: away.team.name,
        shortDisplayName: away.team.shortDisplayName || away.team.abbreviation,
        logo: away.team.logo,
        score: away.score || '0',
        winner: away.winner
      },
      sportPath
    };
  } catch (error) {
    console.error("Error normalizing event:", error);
    return null;
  }
}

export async function fetchSportsData(category: 'all' | 'football_soccer' | 'cricket' | 'basketball' | 'american_football'): Promise<Match[]> {
  let urlsToFetch: string[] = [];
  
  if (category === 'all') {
    urlsToFetch = [
      ...ENDPOINTS.football_soccer,
      ...ENDPOINTS.basketball,
      ...ENDPOINTS.american_football
    ];
  } else {
    // @ts-ignore
    urlsToFetch = ENDPOINTS[category] || [];
  }

  try {
    const fetchPromises = urlsToFetch.map(url => fetch(url, { next: { revalidate: 30 } }).then(async res => {
      if (!res.ok) return null;
      const data = await res.json();
      return { data, url };
    }).catch(() => null));

    const results = await Promise.all(fetchPromises);
    const matches: Match[] = [];

    results.forEach(result => {
      if (result && result.data && result.data.events) {
        const leagueName = result.data.leagues?.[0]?.name || 'Unknown League';
        const sportPath = result.url.split('/sports/')[1]?.split('/scoreboard')[0] || '';
        result.data.events.forEach((event: any) => {
          const match = normalizeESPNMatch(event, leagueName, sportPath);
          if (match) matches.push(match);
        });
      }
    });

    // Sort: Live (in) first, then Scheduled (pre), then Finished (post)
    return matches.sort((a, b) => {
      const stateOrder: Record<string, number> = { 'in': 1, 'pre': 2, 'post': 3 };
      return (stateOrder[a.status.state] || 4) - (stateOrder[b.status.state] || 4);
    });

  } catch (error) {
    console.error("Error fetching sports data:", error);
    return [];
  }
}

export async function fetchMatchDetails(sportPath: string, id: string) {
  try {
    const url = `https://site.api.espn.com/apis/site/v2/sports/${sportPath}/summary?event=${id}`;
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Error fetching match details:", err);
    return null;
  }
}
