
'use server';
/**
 * @fileOverview An AI flow to transcribe audio files.
 *
 * - transcribeAudio - A function that handles the audio transcription.
 * - TranscribeAudioInput - The input type for the transcribeAudio function.
 * - TranscribeAudioOutput - The return type for the transcribeAudio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranscribeAudioInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "An audio file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type TranscribeAudioInput = z.infer<typeof TranscribeAudioInputSchema>;

const TranscribeAudioOutputSchema = z.object({
  detectedLanguage: z.string().describe('The language detected in the audio file (e.g., "English", "Spanish").'),
  transcription: z.string().describe('The full text transcription of the audio. If it is a song, include musical structure like [Chorus] and [Verse].'),
});
export type TranscribeAudioOutput = z.infer<typeof TranscribeAudioOutputSchema>;

export async function transcribeAudio(input: TranscribeAudioInput): Promise<TranscribeAudioOutput> {
  return transcribeAudioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'transcribeAudioPrompt',
  input: {schema: TranscribeAudioInputSchema},
  output: {schema: TranscribeAudioOutputSchema},
  prompt: `You are an expert audio transcriptionist. You are highly accurate and can recognize song structures and detect languages.
  
  First, detect the primary language spoken or sung in the audio. Then, provide a full, highly accurate transcription of the following audio file. If it is a song, identify and label the different sections like [Intro], [Verse], [Chorus], [Bridge], [Outro], etc.
  
  Your response must include both the detected language and the full transcription.

  Audio: {{media url=audioDataUri}}`,
  model: 'googleai/gemini-1.5-flash-latest',
});

const transcribeAudioFlow = ai.defineFlow(
  {
    name: 'transcribeAudioFlow',
    inputSchema: TranscribeAudioInputSchema,
    outputSchema: TranscribeAudioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
