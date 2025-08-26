
// This file uses server-side code.
'use server';

/**
 * @fileOverview Implements the intelligent search functionality using Genkit.
 *
 * - intelligentSearch - A function that takes a search query and returns relevant blog posts.
 * - IntelligentSearchInput - The input type for the intelligentSearch function.
 * - IntelligentSearchOutput - The return type for the intelligentSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentSearchInputSchema = z.object({
  query: z.string().describe('The user search query.'),
});
export type IntelligentSearchInput = z.infer<typeof IntelligentSearchInputSchema>;

const IntelligentSearchOutputSchema = z.object({
  blogPosts: z.array(z.string()).describe('Relevant blog post titles.'),
});
export type IntelligentSearchOutput = z.infer<typeof IntelligentSearchOutputSchema>;

export async function intelligentSearch(input: IntelligentSearchInput): Promise<IntelligentSearchOutput> {
  return intelligentSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentSearchPrompt',
  input: {schema: IntelligentSearchInputSchema},
  output: {schema: IntelligentSearchOutputSchema},
  prompt: `You are an AI assistant designed to provide relevant blog posts based on a user's search query.

  Given the following search query:
  {{query}}

  Suggest relevant blog posts from the following categories:

  Blog Post Categories:
  - Money & Finance
  - Social Media Monetization
  - Tech & Tools
  - Freelancing & Online Jobs
  - Lifestyle & Productivity

  Return the results as a JSON object with a 'blogPosts' array.
  The blogPosts array should contain the titles of relevant items.
  If no relevant blog posts are found, return an empty array.
`,
});

const intelligentSearchFlow = ai.defineFlow(
  {
    name: 'intelligentSearchFlow',
    inputSchema: IntelligentSearchInputSchema,
    outputSchema: IntelligentSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Ensure the output is always in the correct format, even if the LLM fails.
    return output || { blogPosts: [] };
  }
);
