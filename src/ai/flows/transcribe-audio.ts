
'use server';
/**
 * @fileOverview An AI flow to transcribe audio files into text.
 *
 * - transcribeAudio - A function that handles the audio transcription.
 * - TranscribeAudioInput - The input type for the transcribeAudio function.
 * - TranscribeAudioOutput - The return type for the transcribeAudio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { checkUsage, recordUsage } from '@/services/usage-service';

const TranscribeAudioInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "An audio file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userId: z.string().describe('The user ID or guest ID making the request.'),
  isGuest: z.boolean().describe('Whether the user is a guest.'),
});
export type TranscribeAudioInput = z.infer<typeof TranscribeAudioInputSchema>;

const TranscribeAudioOutputSchema = z.object({
  transcription: z.string().describe('The full text transcription of the audio. If it is a song, include song structure labels like [Chorus] and [Verse].'),
});
export type TranscribeAudioOutput = z.infer<typeof TranscribeAudioOutputSchema>;

export async function transcribeAudio(input: TranscribeAudioInput): Promise<TranscribeAudioOutput> {
  const { userId, isGuest, audioDataUri } = input;

  const usage = await checkUsage(userId, isGuest);
  if (!usage.hasRemaining) {
      throw new Error(`Usage limit exceeded. You have ${usage.remainingCount} requests remaining.`);
  }

  const result = await transcribeAudioFlow({ audioDataUri });

  await recordUsage(userId, isGuest);
  
  return result;
}

const promptInputSchema = TranscribeAudioInputSchema.pick({ audioDataUri: true });

const prompt = ai.definePrompt({
  name: 'transcribeAudioPrompt',
  input: {schema: promptInputSchema},
  output: {schema: TranscribeAudioOutputSchema},
  prompt: `You are an expert audio transcriptionist. Your task is to listen to the following audio file and transcribe the content with exceptional accuracy.

  - If the audio is a song, identify and label the different sections, such as [Intro], [Verse], [Chorus], [Bridge], [Outro], etc.
  - If the audio is spoken word (like a meeting or voice note), provide a clean and accurate transcription of what is said.
  
  Your response must be in the requested JSON format containing only the transcription.

  Audio: {{media url=audioDataUri}}`,
  model: 'googleai/gemini-1.5-pro-latest',
});

const transcribeAudioFlow = ai.defineFlow(
  {
    name: 'transcribeAudioFlow',
    inputSchema: promptInputSchema,
    outputSchema: TranscribeAudioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
