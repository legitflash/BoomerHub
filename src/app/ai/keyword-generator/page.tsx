
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, KeyRound, Copy, Check } from "lucide-react";
import { generateKeywords } from '@/ai/flows/generate-keywords';
import type { GenerateKeywordsOutput } from '@/ai/flows/generate-keywords';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import AdsterraBanner from '@/components/ads/adsterra-banner';

const formSchema = z.object({
  title: z.string().min(10, { message: "Please enter a title of at least 10 characters." }),
  description: z.string().min(20, { message: "Please enter a description of at least 20 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function KeywordGeneratorPage() {
  const [keywords, setKeywords] = useState<GenerateKeywordsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setKeywords(null);

    try {
      const result = await generateKeywords(values);
      setKeywords(result);
    } catch (e: any) {
      console.error(e);
      const errorMessage = e.message || 'An error occurred while generating keywords. Please try again.';
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

  const handleCopy = () => {
    if (!keywords) return;
    const keywordsString = keywords.keywords.join(', ');
    navigator.clipboard.writeText(keywordsString);
    setHasCopied(true);
    toast({
      title: "Keywords Copied",
      description: "The keywords have been copied to your clipboard.",
    });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
        <div className="inline-block bg-primary/10 p-4 rounded-lg mb-4">
            <KeyRound className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI SEO Keyword Generator</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Enter your blog post's title and description to generate relevant SEO keywords.
        </p>
      </header>

      <div className="max-w-2xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>
              Provide the title and a short description of your article.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 'The Ultimate Guide to AI in 2024'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="e.g., 'An in-depth look at the latest trends in artificial intelligence, including large language models and their impact on the industry...'" 
                          className="min-h-[120px]"
                          {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Generate Keywords'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="text-center p-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Our AI is analyzing your content...</p>
          </div>
        )}
        
        {keywords && (
          <Card className="animate-in fade-in">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Generated Keywords</CardTitle>
                    <CardDescription>Click to copy and paste into your Sanity post.</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleCopy}>
                    {hasCopied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                    <span className="sr-only">Copy keywords</span>
                  </Button>
              </div>
            </CardHeader>
            <CardContent>
               <div className="flex flex-wrap gap-2">
                 {keywords.keywords.map((keyword, index) => (
                   <Badge key={index} variant="secondary" className="text-base">
                     {keyword}
                   </Badge>
                 ))}
               </div>
            </CardContent>
          </Card>
        )}
      </div>
      <AdsterraBanner />
    </div>
  );
}
