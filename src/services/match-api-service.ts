
/**
 * @fileOverview A mock service to simulate fetching data from a live match API.
 * 
 * In a real application, the functions in this file would make network requests
 * to a third-party sports data provider (e.g., Opta, Sportradar, etc.).
 * For this example, it returns static, hard-coded data to simulate the API response.
 */

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

// A simple hashing function to generate somewhat consistent "random" data based on team names.
function simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

// Generate a plausible team form string like "WDLWW"
function generateForm(seed: number): string {
    const outcomes = ['W', 'D', 'L'];
    let form = '';
    for (let i = 0; i < 5; i++) {
        form += outcomes[(seed + i * 3) % outcomes.length];
    }
    return form;
}

// Generate plausible match results
function generateResults(teamName: string, seed: number): string[] {
    const results: string[] = [];
    for (let i = 0; i < 5; i++) {
        const ownGoals = (seed + i) % 4;
        const oppGoals = (seed + i * 2) % 3;
        const isHome = (seed + i) % 2 === 0;
        const opponent = `Opponent ${i + 1}`;
        if (isHome) {
            results.push(`${teamName} ${ownGoals} - ${oppGoals} ${opponent}`);
        } else {
            results.push(`${opponent} ${oppGoals} - ${ownGoals} ${teamName}`);
        }
    }
    return results;
}

const allPlayers = ["Kane", "Salah", "De Bruyne", "Fernandes", "Son", "Haaland", "Rashford", "Saka", "Odegaard", "Rice", "Alisson", "van Dijk", "Messi", "Ronaldo", "Mbappe", "Neymar", "Lewandowski", "Benzema", "Modric", "Kroos"];
const commonInjuries = ["Hamstring", "Knee", "Ankle", "Groin", "Calf"];

// Generate plausible player lists and injuries
function generatePlayerData(seed: number, count: number): string[] {
    const players: string[] = [];
    for (let i = 0; i < count; i++) {
        players.push(allPlayers[(seed + i * 5) % allPlayers.length]);
    }
    return players;
}

function generateInjuries(seed: number, count: number): string[] {
    const injuries: string[] = [];
    for (let i = 0; i < count; i++) {
        const player = allPlayers[(seed + i * 7) % allPlayers.length];
        const injury = commonInjuries[(seed + i * 3) % commonInjuries.length];
        injuries.push(`${player} (${injury})`);
    }
    return injuries;
}


/**
 * Fetches mock match data for two given teams.
 * @param homeTeam The name of the home team.
 * @param awayTeam The name of the away team.
 * @returns A promise that resolves with the mock match data.
 */
export async function getMatchData(homeTeam: string, awayTeam: string): Promise<HeadToHeadData> {
    // Use hashes of team names to create semi-random, but consistent, data.
    const homeSeed = simpleHash(homeTeam);
    const awaySeed = simpleHash(awayTeam);

    const data: HeadToHeadData = {
        homeTeam: {
            form: generateForm(homeSeed),
            last5Results: generateResults(homeTeam, homeSeed),
            keyPlayers: generatePlayerData(homeSeed, 3),
            injuries: generateInjuries(homeSeed, homeSeed % 3), // 0 to 2 injuries
        },
        awayTeam: {
            form: generateForm(awaySeed),
            last5Results: generateResults(awayTeam, awaySeed),
            keyPlayers: generatePlayerData(awaySeed, 3),
            injuries: generateInjuries(awaySeed, awaySeed % 2), // 0 to 1 injury
        },
        headToHead: [
            `${homeTeam} 2 - 1 ${awayTeam}`,
            `${awayTeam} 0 - 0 ${homeTeam}`,
            `${homeTeam} 3 - 2 ${awayTeam}`,
        ]
    };
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return data;
}
