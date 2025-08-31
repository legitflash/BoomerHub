
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

// This tool allows the AI to search through the actual blog posts in the database.
const blogPostSearchTool = ai.defineTool(
  {
    name: 'blogPostSearch',
    description: 'Search for blog posts based on a query.',
    inputSchema: z.object({
      query: z.string(),
    }),
    outputSchema: z.array(
      z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
      })
    ),
  },
  async (input) => {
    // In a real application, this would be a more sophisticated search,
    // perhaps using a vector database or full-text search.
    // For this example, we'll filter based on title and description.
    const allPosts = await getAllPosts();
    const query = input.query.toLowerCase();
    return allPosts
      .filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query)
      )
      .map(({ title, slug, description }) => ({ title, slug, description }))
      .slice(0, 10); // Limit to 10 results to keep the context small
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
    Your task is to use the 'blogPostSearch' tool to find the most relevant blog posts.
    
    Analyze the search results and return a list of the top 5 most relevant blog posts that best answer the user's query.
    Return the results in the requested JSON format, including both the title and the slug for each post.
    
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
