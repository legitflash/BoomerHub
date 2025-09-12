
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
import { headers } from 'next/headers';

const TranslateTextInputSchema = z.object({
  text: z.string().describe('The text content to be translated.'),
  targetLanguage: z.string().describe('The target language to translate the text into (e.g., "Spanish", "French").'),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

const TranslateTextOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;

export async function translateText(input: TranslateTextInput): Promise<TranslateTextOutput> {
  const headerList = headers();
  const ip = (headerList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  const userId = ip;

  const usage = await checkUsage(userId);
  if (!usage.hasRemaining) {
      throw new Error(`Usage limit exceeded. You have ${usage.remainingCount} requests remaining.`);
  }

  const result = await translateTextFlow(input);

  await recordUsage(userId);

  return result;
}

const prompt = ai.definePrompt({
  name: 'translateTextPrompt',
  input: {schema: TranslateTextInputSchema},
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
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
