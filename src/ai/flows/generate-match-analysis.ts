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
  prompt: `You are a world-class sports analyst specializing in football (soccer). Your task is to provide a detailed, insightful, and unbiased analysis for an upcoming match between two teams: {{{homeTeam}}} (Home) and {{{awayTeam}}} (Away).

  Based on general knowledge of football teams, their historical performance, and common tactical matchups, generate a comprehensive analysis. Do not use any real-time data or external APIs. Your analysis should be plausible and sound like it comes from a true expert.

  Please provide the following:
  1.  **Head-to-Head Summary**: Briefly describe the historical dynamic between the two teams. Are they rivals? Is one team usually dominant?
  2.  **Form Analysis**: Comment on the likely current form of both teams. Even without real data, you can create a narrative (e.g., "The home team has been on a strong run, looking unbeatable at their home stadium," or "The away team is struggling with consistency, especially in their away matches.").
  3.  **Expert Opinion & Rationale**: This is the most important part. Provide a detailed rationale for your prediction. Discuss potential key matchups, tactical advantages, and why you believe a certain outcome is likely. Make it compelling and logical.
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
