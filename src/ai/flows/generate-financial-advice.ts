
'use server';
/**
 * @fileOverview An AI flow to generate personalized advice.
 *
 * - generateFinancialAdvice - A function that handles advice generation.
 * - GenerateFinancialAdviceInput - The input type for the generateFinancialAdvice function.
 * - GenerateFinancialAdviceOutput - The return type for the generateFinancialAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { checkUsage, recordUsage } from '@/services/usage-service';

const GenerateFinancialAdviceInputSchema = z.object({
  query: z.string().describe('The user\'s question or description of their situation.'),
  userId: z.string().describe('The user ID or guest ID making the request.'),
  isGuest: z.boolean().describe('Whether the user is a guest.'),
});
export type GenerateFinancialAdviceInput = z.infer<typeof GenerateFinancialAdviceInputSchema>;

const GenerateFinancialAdviceOutputSchema = z.object({
  summary: z.string().describe("A brief summary of the AI's recommendation."),
  actionableSteps: z.array(z.string()).describe('A list of clear, actionable steps the user should take.'),
  disclaimer: z.string().optional().describe('A disclaimer, especially for financial or legal advice.'),
});
export type GenerateFinancialAdviceOutput = z.infer<typeof GenerateFinancialAdviceOutputSchema>;

export async function generateFinancialAdvice(input: GenerateFinancialAdviceInput): Promise<GenerateFinancialAdviceOutput> {
  const { userId, isGuest } = input;

  const usage = await checkUsage(userId, isGuest);
  if (!usage.hasRemaining) {
      throw new Error(`Usage limit exceeded. You have ${usage.remainingCount} requests remaining.`);
  }

  const result = await generateFinancialAdviceFlow({ query: input.query });

  await recordUsage(userId, isGuest);
  
  return result;
}

const promptInputSchema = GenerateFinancialAdviceInputSchema.pick({ query: true });

const prompt = ai.definePrompt({
  name: 'generateFinancialAdvicePrompt',
  input: {schema: promptInputSchema},
  output: {schema: GenerateFinancialAdviceOutputSchema},
  prompt: `You are a helpful and wise AI assistant providing personalized advice. The user's query could be about anything from finance to social etiquette. Your goal is to provide safe, practical, and empathetic advice.

  User's query:
  {{{query}}}

  Based on the user's query, provide the following:
  1.  **Summary**: Briefly summarize your core advice.
  2.  **Actionable Steps**: Provide a list of 3-5 clear, concrete steps the user can take.
  3.  **Disclaimer**: If the topic is sensitive (e.g., finance, legal issues), provide a disclaimer that you are an AI and not a certified professional, and that the user should consult with a qualified expert. If the topic is not sensitive, you can omit this.

  Your response must be in the requested JSON format.
  `,
});

const generateFinancialAdviceFlow = ai.defineFlow(
  {
    name: 'generateFinancialAdviceFlow',
    inputSchema: promptInputSchema,
    outputSchema: GenerateFinancialAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
