// This file uses server-side code.
'use server';

/**
 * @fileOverview Implements the intelligent search functionality using Genkit.
 *
 * - intelligentSearch - A function that takes a search query and returns relevant blog posts and courses.
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
  courses: z.array(z.string()).describe('Relevant course titles.'),
});
export type IntelligentSearchOutput = z.infer<typeof IntelligentSearchOutputSchema>;

export async function intelligentSearch(input: IntelligentSearchInput): Promise<IntelligentSearchOutput> {
  return intelligentSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentSearchPrompt',
  input: {schema: IntelligentSearchInputSchema},
  output: {schema: IntelligentSearchOutputSchema},
  prompt: `You are an AI assistant designed to provide relevant blog posts and courses based on a user's search query.

  Given the following search query:
  {{query}}

  Suggest relevant blog posts and courses from the following categories:

  Blog Post Categories:
  - Money & Finance
  - Social Media Monetization
  - Tech & Tools
  - Freelancing & Online Jobs
  - Lifestyle & Productivity

  Course Categories:
  - Money Skills
  - AI & Tech Skills
  - Social Media Growth & Monetization

  Return the results as a JSON object with 'blogPosts' and 'courses' arrays.
  The blogPosts and courses arrays should contain the titles of relevant items.
  If no relevant blog posts or courses are found, return an empty array for that category.
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
    return output!;
  }
);
