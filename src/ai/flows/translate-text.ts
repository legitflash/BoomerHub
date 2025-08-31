
'use server';
/**
 * @fileOverview An AI flow to translate text to a specified language.
 *
 * - translateText - A function that handles the text translation.
 * - TranslateTextInput - The input type for the translateText function.
 * - TranslateTextOutput - The return type for the translateText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { checkUsage, recordUsage } from '@/services/usage-service';

const TranslateTextInputSchema = z.object({
  text: z.string().describe('The text content to be translated.'),
  targetLanguage: z.string().describe('The target language to translate the text into (e.g., "Spanish", "French").'),
  userId: z.string().describe('The user ID or guest ID making the request.'),
  isGuest: z.boolean().describe('Whether the user is a guest.'),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

const TranslateTextOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;

export async function translateText(input: TranslateTextInput): Promise<TranslateTextOutput> {
  const { userId, isGuest, ...translationInput } = input;

  const usage = await checkUsage(userId, isGuest);
  if (!usage.hasRemaining) {
      throw new Error(`Usage limit exceeded. You have ${usage.remainingCount} requests remaining.`);
  }

  const result = await translateTextFlow(translationInput);

  await recordUsage(userId, isGuest);

  return result;
}

const promptInputSchema = TranslateTextInputSchema.pick({ text: true, targetLanguage: true });

const prompt = ai.definePrompt({
  name: 'translateTextPrompt',
  input: {schema: promptInputSchema},
  output: {schema: TranslateTextOutputSchema},
  prompt: `You are an expert translator. Translate the following text into {{{targetLanguage}}}.
  
  Do not add any commentary or preamble, just return the translated text. Maintain the original formatting (like paragraphs and lists) as much as possible.

  Text to translate:
  ---
  {{{text}}}
  ---
  `,
});

const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: promptInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
