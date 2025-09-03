
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, FileMusic, AudioLines, ArrowRight } from "lucide-react";
import { transcribeAudio } from '@/ai/flows/transcribe-audio';
import type { TranscribeAudioOutput } from '@/ai/flows/transcribe-audio';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import AdsterraBanner from '@/components/ads/adsterra-banner';
import { handleCheckUsage } from '@/app/actions';
import { GUEST_LIMIT, USER_LIMIT } from '@/lib/data';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_AUDIO_TYPES = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp3", "audio/flac", "audio/x-m4a"];

const adLinks = [
  "https://otieu.com/4/9697212", // Monetag
  "https://chickenadjacent.com/ebjb0w2rm?key=7bf3c280c5f98c617913935e30c2fb3c" // Adsterra Smart Link
];

const formSchema = z.object({
  audioFile: z
    .any()
    .refine((files) => files?.length == 1, "Audio file is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 50MB.`)
    .refine(
      (files) => ACCEPTED_AUDIO_TYPES.includes(files?.[0]?.type),
      ".mp3, .wav, .ogg and other audio files are accepted."
    ),
});

type FormValues = z.infer<typeof formSchema>;

export default function AudioTranscriberPage() {
  const [transcription, setTranscription] = useState<TranscribeAudioOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);
  const [usage, setUsage] = useState<{ hasRemaining: boolean, remainingCount: number} | null>(null);
  const [adUrl, setAdUrl] = useState('');

  const { user } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    // This runs only on the client, after hydration, to prevent mismatch
    const randomLink = adLinks[Math.floor(Math.random() * adLinks.length)];
    setAdUrl(randomLink);
  }, []);
  
  const fileRef = form.register("audioFile");
  
  const updateUsage = async () => {
    const id = user ? user.uid : guestId;
    if (id) {
        const usageInfo = await handleCheckUsage(id, !user);
        setUsage(usageInfo);
    }
  };

  useEffect(() => {
    if (!user) {
        let storedId = localStorage.getItem('boomerhub_guest_id');
        if (!storedId) {
            storedId = uuidv4();
            localStorage.setItem('boomerhub_guest_id', storedId);
        }
        setGuestId(storedId);
    }
  }, [user]);

  useEffect(() => {
    updateUsage();
  }, [user, guestId]);


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

    const id = user ? user.uid : guestId;
    if (!id) {
        setError("Could not identify user. Please refresh the page.");
        setIsLoading(false);
        return;
    }

    try {
      const file = values.audioFile[0];
      const audioDataUri = await toBase64(file);
      
      const result = await transcribeAudio({ 
        audioDataUri,
        userId: id,
        isGuest: !user 
      });
      setTranscription(result);
      await updateUsage();
    } catch (e: any) {
      console.error(e);
      const errorMessage = e.message || 'An error occurred during transcription. Please try again.';
      if (errorMessage.includes('429')) {
           toast({
            title: "Rate Limit Exceeded",
            description: "You've made too many requests. Please wait a moment and try again.",
            variant: "destructive",
          });
          setError("You've made too many requests. Please wait a moment and try again.");
      } else {
          toast({
            title: "Request Failed",
            description: errorMessage,
            variant: "destructive",
          });
          setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }
  
  const renderUsageInfo = () => {
    if (!usage) return null;
    const limit = user ? USER_LIMIT : GUEST_LIMIT;
    
    if (user) {
        return <p className="text-sm text-muted-foreground text-center mt-2">You have {usage.remainingCount} of {limit} daily requests remaining.</p>
    }
    
    return (
      <p className="text-sm text-muted-foreground text-center mt-2">
        You have {usage.remainingCount} of {limit} free requests. <Link href="/signup" className="underline text-primary">Sign up</Link> for {USER_LIMIT} daily requests.
      </p>
    )
  }

  const hasUsage = usage ? usage.hasRemaining : true;

  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
         <div className="inline-block bg-primary/10 p-4 rounded-lg mb-4">
            <AudioLines className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Audio Transcriber</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Upload any audio file—a song, a meeting, or a voice note—to get an accurate text transcription.
        </p>
      </header>

      <div className="max-w-2xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Audio</CardTitle>
            <CardDescription>Convert both songs and audio files to text. For music, the AI will try to identify lyrics and structure like [Chorus] or [Verse].</CardDescription>
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
                 {hasUsage ? (
                  <Button type="submit" className="w-full" disabled={isLoading || !hasUsage}>
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Transcribe Audio'}
                  </Button>
                ) : (
                  <Button asChild className="w-full" variant="secondary">
                    <Link href={adUrl} target="_blank" rel="noopener noreferrer">
                      Usage Limit Reached. Click to continue.
                      <ArrowRight />
                    </Link>
                  </Button>
                )}
                {renderUsageInfo()}
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="text-center p-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Our AI is listening... this may take a moment.</p>
          </div>
        )}
        
        {transcription && (
          <Card className="animate-in fade-in">
            <CardHeader>
              <CardTitle>Transcription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {transcription.transcription}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <AdsterraBanner />
    </div>
  );
}
