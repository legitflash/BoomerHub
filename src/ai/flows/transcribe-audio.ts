
'use server';
/**
 * @fileOverview An AI flow to transcribe song lyrics from audio files.
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
  transcription: z.string().describe('The full text transcription of the song lyrics, including song structure labels like [Chorus] and [Verse].'),
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
  prompt: `You are an expert audio transcriptionist specializing in music. Your task is to listen to the following audio file and transcribe the lyrics with exceptional accuracy.

  Identify and label the different sections of the song, such as [Intro], [Verse], [Chorus], [Bridge], [Outro], etc.
  
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
