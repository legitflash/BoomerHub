
'use server';

/**
 * @fileOverview Implements an intelligent search that returns slugs for routing.
 *
 * - intelligentSearch - A function that takes a query and returns relevant blog posts with slugs.
 * - IntelligentSearchInput - The input type for the intelligentSearch function.
 * - IntelligentSearchOutput - The return type for the intelligentSearch function.
 */

import { ai } from '@/ai/genkit';
import { getAllPosts } from '@/services/post-service';
import { z } from 'genkit';

const BlogPostSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  slug: z.string().describe('The URL slug for the blog post.'),
});

const IntelligentSearchInputSchema = z.object({
  query: z.string().describe('The user search query.'),
});
export type IntelligentSearchInput = z.infer<typeof IntelligentSearchInputSchema>;

const IntelligentSearchOutputSchema = z.object({
  blogPosts: z.array(BlogPostSchema).describe('An array of relevant blog posts, including their titles and slugs.'),
});
export type IntelligentSearchOutput = z.infer<typeof IntelligentSearchOutputSchema>;

// This tool allows the AI to get a list of all available blog posts.
const blogPostSearchTool = ai.defineTool(
  {
    name: 'blogPostSearch',
    description: 'Gets a list of all available blog posts to search through.',
    inputSchema: z.object({}), // No input needed
    outputSchema: z.array(
      z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        category: z.string(),
        keywords: z.string().optional(),
        date: z.string(), // Add the date field to the schema
      })
    ),
  },
  async () => {
    // Return all posts with relevant fields for the AI to analyze.
    const allPosts = await getAllPosts();
    return allPosts.map(({ title, slug, description, category, keywords, date }) => ({
      title,
      slug,
      description,
      category,
      keywords,
      date, // Ensure the date is returned by the tool
    }));
  }
);

// Define the prompt that will use the tool.
const intelligentSearchPrompt = ai.definePrompt({
  name: 'intelligentSearchWithSlugsPrompt',
  input: { schema: IntelligentSearchInputSchema },
  output: { schema: IntelligentSearchOutputSchema },
  tools: [blogPostSearchTool],
  prompt: `
    You are an expert search assistant for a blog. A user has provided a search query.
    Your task is to use the 'blogPostSearch' tool to get a list of all blog posts.
    
    From that list, analyze the titles, descriptions, categories, and keywords to find the top 5 most relevant blog posts that best answer the user's query.
    
    Return the results in the requested JSON format, including both the title and the slug for each post.
    If no relevant posts are found, return an empty array.
    
    User Query: {{{query}}}
  `,
});

// Define the main flow.
const intelligentSearchFlow = ai.defineFlow(
  {
    name: 'intelligentSearchWithSlugsFlow',
    inputSchema: IntelligentSearchInputSchema,
    outputSchema: IntelligentSearchOutputSchema,
  },
  async (input) => {
    const llmResponse = await intelligentSearchPrompt(input);
    const output = llmResponse.output;

    // Ensure the output is always in the correct format, even if the LLM fails.
    return output || { blogPosts: [] };
  }
);

// Export a wrapper function for use in the application.
export async function intelligentSearch(input: IntelligentSearchInput): Promise<IntelligentSearchOutput> {
  return intelligentSearchFlow(input);
}
