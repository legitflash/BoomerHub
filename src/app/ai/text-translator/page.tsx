
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Languages } from "lucide-react";
import type { TranslateTextOutput } from '@/ai/flows/translate-text';
import { useToast } from '@/hooks/use-toast';
import AdsterraBanner from '@/components/ads/adsterra-banner';
import { getTranslation } from './actions';


const languages = [
  "Arabic", "Bengali", "Chinese (Simplified)", "Dutch", "French", "German", "Greek", "Hausa", "Hebrew", "Hindi", "Igbo", "Indonesian", "Italian", "Japanese", "Korean", "Polish", "Portuguese", "Russian", "Spanish", "Swahili", "Swedish", "Thai", "Turkish", "Vietnamese", "Yoruba"
];

const formSchema = z.object({
  text: z.string().min(1, { message: "Please enter some text to translate." }),
  targetLanguage: z.string().min(1, { message: "Please select a target language." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function TextTranslatorPage() {
  const [translation, setTranslation] = useState<TranslateTextOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      targetLanguage: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setTranslation(null);

    try {
      const result = await getTranslation(values);
      setTranslation(result);
    } catch (e: any) {
      console.error(e);
      const errorMessage = e.message || 'An error occurred during translation. Please try again.';
      setError(errorMessage);
       if (errorMessage.includes('Rate limit exceeded')) {
           toast({
            title: "Daily Limit Reached",
            description: "You have exceeded your daily request limit. Please try again tomorrow.",
            variant: "destructive",
          });
      } else {
          toast({
            title: "Request Failed",
            description: errorMessage,
            variant: "destructive",
          });
      }
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
         <div className="inline-block bg-primary/10 p-4 rounded-lg mb-4">
            <Languages className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Text Translator</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Translate text into various languages with high accuracy.
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
            <CardHeader>
                <CardTitle>Enter Text</CardTitle>
                <CardDescription>Enter the text you want to translate and select the target language.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Text to Translate</FormLabel>
                        <FormControl>
                            <Textarea 
                            placeholder="e.g., 'Hello, how are you?'"
                            className="min-h-[150px]"
                            {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="targetLanguage"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Translate To</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {languages.map((lang) => (
                                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Translate'}
                    </Button>
                </form>
                </Form>
            </CardContent>
            </Card>

            <Card className="flex flex-col">
                <CardHeader>
                <CardTitle>Translation Result</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                    {isLoading && (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}
                    {error && !isLoading && <p className="text-destructive text-center">{error}</p>}
                    {translation && !isLoading && !error && (
                        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                            <p>{translation.translatedText}</p>
                        </div>
                    )}
                    {!isLoading && !translation && !error && (
                        <div className="text-muted-foreground text-center">
                            <p>Your translation will appear here.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

        {error && !isLoading && (
             <Card className="border-destructive mt-8">
                <CardHeader>
                    <CardTitle className="text-destructive">Request Failed</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-destructive">{error}</p>
                </CardContent>
            </Card>
        )}

      </div>
      <AdsterraBanner />
    </div>
  );
}
