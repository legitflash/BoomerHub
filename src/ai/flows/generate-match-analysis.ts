
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

const GenerateMatchAnalysisInputSchema = z.object({
  homeTeam: z.string().describe('The name of the home team.'),
  awayTeam: z.string().describe('The name of the away team.'),
  league: z.string().describe('The league the match is being played in.'),
  matchDate: z.string().optional().describe('The date of the match (e.g., YYYY-MM-DD).'),
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
  prompt: `You are a world-class sports analyst specializing in football (soccer). Your task is to provide a detailed, insightful, and unbiased analysis for an upcoming match.

  Match Details:
  - Home Team: {{{homeTeam}}}
  - Away Team: {{{awayTeam}}}
  - League: {{{league}}}
  {{#if matchDate}}- Match Date: {{{matchDate}}}{{/if}}

  Based on your general knowledge of football, generate a comprehensive and plausible-sounding analysis.

  Please provide the following:
  1.  **Head-to-Head Summary**: Briefly summarize the historical dynamic between the two teams.
  2.  **Form Analysis**: Comment on the likely current form of both teams. Consider the match date if provided.
  3.  **Expert Opinion & Rationale**: Provide a detailed rationale for your prediction. Discuss key players, and tactical advantages.
  4.  **Prediction**: State a clear, final prediction. This can be a match winner, a score-related bet (like 'Over 2.5 Goals'), or another common betting market.
  5.  **Confidence Level**: Assign a confidence level of High, Medium, or Low to your prediction.

  Your response must be in the requested JSON format.`,
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
