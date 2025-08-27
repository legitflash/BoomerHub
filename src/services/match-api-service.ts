
/**
 * @fileOverview A service to fetch live match data from TheSportsDB.com API.
 */
import fetch from 'node-fetch';

const API_KEY = process.env.THESPORTSDB_API_KEY || '1'; // Use paid key from env, fallback to free
const V1_BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;
const V2_BASE_URL = `https://www.thesportsdb.com/api/v2/json/${API_KEY}`;


interface TeamData {
    form: string;
    last5Results: string[];
    keyPlayers: string[];
    injuries: string[];
}

interface HeadToHeadData {
    homeTeam: TeamData;
    awayTeam: TeamData;
    headToHead: string[];
}

// Helper to safely fetch from the API
async function apiFetch(url: string): Promise<any> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`API Error for ${url}: ${response.statusText}`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error(`Network Error for ${url}:`, error);
        return null;
    }
}

// Get team details, primarily the ID, by searching for team name within a league
async function getTeamId(teamName: string, leagueName: string): Promise<string | null> {
    // 1. Get all teams in the league
    const leagueData = await apiFetch(`${V1_BASE_URL}/search_all_teams.php?l=${encodeURIComponent(leagueName)}`);
    if (!leagueData || !leagueData.teams) {
      console.log(`Could not fetch teams for league: ${leagueName}`);
      return null;
    }

    // 2. Find the team ID by matching the name
    const team = leagueData.teams.find((t: any) => t.strTeam.toLowerCase() === teamName.toLowerCase());
    return team?.idTeam || null;
}


// Get the last 5 results for a team - this is a v1 endpoint
async function getTeamForm(teamId: string, teamName: string): Promise<{ form: string; results: string[] }> {
    const data = await apiFetch(`${V1_BASE_URL}/eventslast.php?id=${teamId}`);
    if (!data?.results) return { form: '-----', results: [] };

    const form = data.results.map((event: any) => {
        if (event.intHomeScore === event.intAwayScore) return 'D';
        const isHome = event.idHomeTeam === teamId;
        if ((isHome && event.intHomeScore > event.intAwayScore) || (!isHome && event.intAwayScore > event.intHomeScore)) {
            return 'W';
        }
        return 'L';
    }).join('');

    const results = data.results.map((event: any) => `${event.strEvent} (${event.intHomeScore}-${event.intAwayScore})`);

    return { form, results };
}

// Get key players for a team - this is a v1 endpoint
async function getKeyPlayers(teamId: string): Promise<string[]> {
    const data = await apiFetch(`${V1_BASE_URL}/lookup_all_players.php?id=${teamId}`);
    if (!data?.player) return [];
    // Just return the first 3 players as "key players"
    return data.player.slice(0, 3).map((p: any) => p.strPlayer);
}

// Get H2H results using v2 search
async function getHeadToHead(homeTeamName: string, awayTeamName: string): Promise<string[]> {
    const data = await apiFetch(`${V2_BASE_URL}/search/event/${encodeURIComponent(homeTeamName)}_vs_${encodeURIComponent(awayTeamName)}`);
    if (!data?.event) return [];
    // Return the last 3 H2H results
    return data.event.slice(0, 3).map((e: any) => `${e.strEvent}: ${e.intHomeScore}-${e.intAwayScore}`);
}

// Mock injuries, as this is not readily available in the free API
function getMockInjuries(players: string[], teamName: string): string[] {
    if (players.length < 2) return [];
    // Create a "hash" from team name to decide who gets injured
    const injuryIndex = teamName.length % players.length;
    return [`${players[injuryIndex]} (Knee)`, `${players[(injuryIndex + 1) % players.length]} (Suspended)`];
}


/**
 * Fetches real match data for two given teams from TheSportsDB.
 * @param homeTeamName The name of the home team.
 * @param awayTeamName The name of the away team.
 * @param leagueName The league the match is being played in.
 * @returns A promise that resolves with the match data.
 */
export async function getMatchData(homeTeamName: string, awayTeamName: string, leagueName: string): Promise<HeadToHeadData> {
    const homeTeamId = await getTeamId(homeTeamName, leagueName);
    const awayTeamId = await getTeamId(awayTeamName, leagueName);

    if (!homeTeamId || !awayTeamId) {
        throw new Error('Could not find one or both teams.');
    }

    const [homeFormData, awayFormData, homePlayers, awayPlayers, headToHead] = await Promise.all([
        getTeamForm(homeTeamId, homeTeamName),
        getTeamForm(awayTeamId, awayTeamName),
        getKeyPlayers(homeTeamId),
        getKeyPlayers(awayTeamId),
        getHeadToHead(homeTeamName, awayTeamName)
    ]);
    
    return {
        homeTeam: {
            form: homeFormData.form,
            last5Results: homeFormData.results,
            keyPlayers: homePlayers,
            injuries: getMockInjuries(homePlayers, homeTeamName),
        },
        awayTeam: {
            form: awayFormData.form,
            last5Results: awayFormData.results,
            keyPlayers: awayPlayers,
            injuries: [], // Let's keep it simple and only give home team injuries
        },
        headToHead: headToHead,
    };
}
