
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, PiggyBank } from "lucide-react";
import { generateFinancialAdvice } from '@/ai/flows/generate-financial-advice';
import type { GenerateFinancialAdviceOutput } from '@/ai/flows/generate-financial-advice';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  query: z.string().min(20, { message: "Please describe your situation in at least 20 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function FinancialAdviserPage() {
  const [advice, setAdvice] = useState<GenerateFinancialAdviceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);

  const { user } = useAuth();
  const { toast } = useToast();

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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setAdvice(null);

    const id = user ? user.uid : guestId;
    if (!id) {
        setError("Could not identify user. Please refresh the page.");
        setIsLoading(false);
        return;
    }

    try {
      const result = await generateFinancialAdvice({ 
        query: values.query,
        userId: id,
        isGuest: !user 
      });
      setAdvice(result);
    } catch (e: any) {
      console.error(e);
      toast({
        title: "Request Failed",
        description: e.message || 'An error occurred while generating the advice. Please try again.',
        variant: "destructive",
      });
      setError(e.message || 'An error occurred while generating advice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
        <div className="inline-block bg-primary/10 p-4 rounded-lg mb-4">
            <PiggyBank className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Financial Adviser</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Receive personalized advice on various topics, from financial planning to social etiquette, designed for your needs.
        </p>
      </header>

      <div className="max-w-2xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Describe Your Needs</CardTitle>
            <CardDescription>
              Explain your current situation, goals, or the advice you're seeking. The more detail you provide, the better the advice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Query</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="e.g., 'I am 25 years old with $5,000 in savings. What's the best way to start investing for retirement?' or 'How should I handle a situation where a friend owes me money?'" 
                          className="min-h-[150px]"
                          {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Get Advice'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="text-center p-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Our AI is crafting your personalized advice...</p>
          </div>
        )}
        
        {advice && (
          <Card className="animate-in fade-in">
            <CardHeader>
              <CardTitle>Your Personalized Advice</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="prose prose-sm dark:prose-invert max-w-none">
                 <h4>Summary</h4>
                 <p>{advice.summary}</p>
                 <h4>Actionable Steps</h4>
                 <ul>
                    {advice.actionableSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                 </ul>
                 {advice.disclaimer && (
                    <p className="text-xs text-muted-foreground border-t pt-4 mt-4">{advice.disclaimer}</p>
                 )}
               </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
