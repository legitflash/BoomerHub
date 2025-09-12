'use server';
/**
 * @fileOverview An AI flow to generate SEO keywords for a blog post.
 *
 * - generateKeywords - A function that handles keyword generation.
 * - GenerateKeywordsInput - The input type for the generateKeywords function.
 * - GenerateKeywordsOutput - The return type for the generateKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateKeywordsInputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  description: z.string().describe('A brief description or summary of the blog post.'),
});
export type GenerateKeywordsInput = z.infer<typeof GenerateKeywordsInputSchema>;

const GenerateKeywordsOutputSchema = z.object({
  keywords: z.array(z.string()).describe('A list of 5-10 relevant SEO keywords for the blog post.'),
});
export type GenerateKeywordsOutput = z.infer<typeof GenerateKeywordsOutputSchema>;

export async function generateKeywords(input: GenerateKeywordsInput): Promise<GenerateKeywordsOutput> {
  return generateKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateKeywordsPrompt',
  input: {schema: GenerateKeywordsInputSchema},
  output: {schema: GenerateKeywordsOutputSchema},
  prompt: `You are an SEO expert. Your task is to generate a list of 5-10 relevant keywords for a blog post based on its title and description. The keywords should be a mix of short-tail and long-tail keywords.

  Blog Post Title:
  {{{title}}}

  Blog Post Description:
  {{{description}}}

  Return the keywords in the requested JSON format.
  `,
});

const generateKeywordsFlow = ai.defineFlow(
  {
    name: 'generateKeywordsFlow',
    inputSchema: GenerateKeywordsInputSchema,
    outputSchema: GenerateKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
