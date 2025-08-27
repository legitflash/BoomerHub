
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, AudioLines, FileMusic, Languages } from "lucide-react";
import { transcribeAudio } from '@/ai/flows/transcribe-audio';
import type { TranscribeAudioOutput } from '@/ai/flows/transcribe-audio';
import { Badge } from '@/components/ui/badge';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_AUDIO_TYPES = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp3"];

const formSchema = z.object({
  audioFile: z
    .any()
    .refine((files) => files?.length == 1, "Audio file is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_AUDIO_TYPES.includes(files?.[0]?.type),
      ".mp3, .wav, and .ogg files are accepted."
    ),
});

type FormValues = z.infer<typeof formSchema>;

export default function AudioTranscriberPage() {
  const [transcription, setTranscription] = useState<TranscribeAudioOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("audioFile");

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setTranscription(null);

    try {
      const file = values.audioFile[0];
      const audioDataUri = await toBase64(file);
      
      const result = await transcribeAudio({ audioDataUri });
      setTranscription(result);
    } catch (e: any) {
      console.error(e);
      setError('An error occurred during transcription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
         <div className="inline-block bg-primary/10 p-4 rounded-lg mb-4">
            <AudioLines className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Audio Transcriber</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Upload an audio file to get a highly accurate transcription, complete with musical structure and language detection.
        </p>
      </header>

      <div className="max-w-2xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Audio</CardTitle>
            <CardDescription>Select an audio file (mp3, wav, ogg) to transcribe. Max size: 5MB.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="audioFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Audio File</FormLabel>
                      <FormControl>
                        <div className="relative">
                           <FileMusic className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                           <Input type="file" className="pl-10" {...fileRef} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Transcribe Audio'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="text-center p-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Our AI is processing your audio... this may take a moment.</p>
          </div>
        )}

        {error && <p className="text-destructive text-center">{error}</p>}
        
        {transcription && (
          <Card className="animate-in fade-in">
            <CardHeader>
              <CardTitle>Transcription Result</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                <Languages className="h-5 w-5" />
                <span>Detected Language:</span>
                <Badge variant="outline">{transcription.detectedLanguage}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {transcription.transcription}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
