
'use server';
/**
 * @fileOverview An AI flow to generate football match analysis.
 *
 * - generateMatchAnalysis - A function that handles the match analysis generation.
 * - GenerateMatchAnalysisInput - The input type for the generateMatchAnalysis function.
 * - GenerateMatchAnalysisOutput - The return type for the generateMatchAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getMatchData } from '@/services/match-api-service';

const getMatchDataTool = ai.defineTool(
  {
    name: 'getMatchData',
    description: 'Get live and historical data for an upcoming football match in a specific league.',
    inputSchema: z.object({
      league: z.string().describe("The league the match is in. E.g., 'English Premier League'"),
      homeTeam: z.string().describe('The name of the home team.'),
      awayTeam: z.string().describe('The name of the away team.'),
    }),
    outputSchema: z.object({
        homeTeam: z.object({
            form: z.string().describe("The last 5 matches results (e.g., 'WWLDW')."),
            last5Results: z.array(z.string()).describe('The scores of the last 5 matches.'),
            keyPlayers: z.array(z.string()).describe('List of key players.'),
            injuries: z.array(z.string()).describe('List of injured players.'),
        }),
        awayTeam: z.object({
            form: z.string().describe("The last 5 matches results (e.g., 'WWLDW')."),
            last5Results: z.array(z.string()).describe('The scores of the last 5 matches.'),
            keyPlayers: z.array(z.string()).describe('List of key players.'),
            injuries: z
            .array(z.string())
            .describe('List of injured or suspended players.'),
        }),
        headToHead: z.array(z.string()).describe('The results of the last 3 head-to-head matches.'),
    }),
  },
  async (input) => {
    return getMatchData(input.league, input.homeTeam, input.awayTeam);
  }
);


const GenerateMatchAnalysisInputSchema = z.object({
  league: z.string().describe("The league the match is in. E.g., 'English Premier League'"),
  homeTeam: z.string().describe('The name of the home team.'),
  awayTeam: z.string().describe('The name of the away team.'),
});
export type GenerateMatchAnalysisInput = z.infer<typeof GenerateMatchAnalysisInputSchema>;

const GenerateMatchAnalysisOutputSchema = z.object({
  prediction: z.string().describe("The final prediction for the match (e.g., 'Home Team to Win', 'Over 2.5 Goals')."),
  confidence: z.enum(['High', 'Medium', 'Low']).describe('The confidence level for the prediction.'),
  headToHead: z.string().describe("A summary of the teams' head-to-head record."),
  formAnalysis: z.string().describe('An analysis of both teams recent form.'),
  expertOpinion: z.string().describe("A detailed expert opinion and rationale for the prediction."),
});
export type GenerateMatchAnalysisOutput = z.infer<typeof GenerateMatchAnalysisOutputSchema>;

export async function generateMatchAnalysis(input: GenerateMatchAnalysisInput): Promise<GenerateMatchAnalysisOutput> {
  return generateMatchAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMatchAnalysisPrompt',
  input: {schema: GenerateMatchAnalysisInputSchema},
  output: {schema: GenerateMatchAnalysisOutputSchema},
  tools: [getMatchDataTool],
  prompt: `You are a world-class sports analyst specializing in football (soccer). Your task is to provide a detailed, insightful, and unbiased analysis for an upcoming match between two teams: {{{homeTeam}}} (Home) and {{{awayTeam}}} (Away) in the {{{league}}}.

  First, use the getMatchData tool to fetch the latest, most relevant data for the two teams within their league. This includes their recent form, head-to-head records, and player availability (injuries/suspensions).

  Then, based *only* on the data returned by the tool, generate a comprehensive analysis. Your analysis must be plausible and sound like it comes from a true expert.

  Please provide the following:
  1.  **Head-to-Head Summary**: Briefly summarize the historical dynamic between the two teams based on the provided data.
  2.  **Form Analysis**: Comment on the current form of both teams using the form and recent results from the tool.
  3.  **Expert Opinion & Rationale**: This is the most important part. Provide a detailed rationale for your prediction. Discuss key players, injuries, and tactical advantages based on the data.
  4.  **Prediction**: State a clear, final prediction. This can be a match winner, a score-related bet (like 'Over 2.5 Goals'), or another common betting market.
  5.  **Confidence Level**: Assign a confidence level of High, Medium, or Low to your prediction.

  Your response must be in the requested JSON format. Do not use any information outside of what the getMatchData tool provides.`,
});

const generateMatchAnalysisFlow = ai.defineFlow(
  {
    name: 'generateMatchAnalysisFlow',
    inputSchema: GenerateMatchAnalysisInputSchema,
    outputSchema: GenerateMatchAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
