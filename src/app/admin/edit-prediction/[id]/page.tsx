
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Trophy } from 'lucide-react';
import { getPredictionById } from '@/services/prediction-service';
import type { Prediction } from '@/lib/types';
import { Switch } from '@/components/ui/switch';
import { handleUpdatePrediction } from '@/app/actions';


const formSchema = z.object({
  league: z.string().min(3, "League is required."),
  match: z.string().min(5, "Match is required (e.g., Team A vs Team B)."),
  prediction: z.string().min(3, "Prediction is required."),
  correctScore: z.string().min(3, "Correct score is required (e.g. 2-1)"),
  odds: z.string().min(3, "Odds are required."),
  confidence: z.enum(['high', 'medium', 'low']),
  status: z.enum(['Won', 'Lost', 'Pending']),
  isHot: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditPredictionPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [prediction, setPrediction] = useState<Prediction | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const id = params.id as string;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (id) {
            const fetchPrediction = async () => {
                setIsLoading(true);
                try {
                    const fetchedPrediction = await getPredictionById(id);
                    if (fetchedPrediction) {
                        setPrediction(fetchedPrediction);
                        form.reset({
                          ...fetchedPrediction,
                          confidence: fetchedPrediction.confidence.toLowerCase(),
                        });
                    } else {
                        toast({ title: "Prediction not found", variant: "destructive" });
                        router.push('/admin');
                    }
                } catch (error) {
                    toast({ title: "Failed to fetch prediction", variant: "destructive" });
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchPrediction();
        }
    }, [id, form, router, toast]);

    async function onSubmit(values: FormValues) {
        if (!prediction) return;
        
        try {
            const formData = new FormData();
            formData.append('id', id);
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value.toString());
            });

            await handleUpdatePrediction(formData);

            toast({
                title: "Prediction Updated!",
                description: "The prediction has been successfully updated.",
                variant: "success",
            });
            router.push('/admin');
        } catch (error) {
             toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem updating the prediction.",
                variant: "destructive",
            });
            console.error("Failed to update prediction:", error);
        }
    }
    
    if (isLoading) {
        return (
            <div className="container py-12 md:py-16">
                 <div className="max-w-2xl mx-auto">
                    <Skeleton className="h-10 w-48 mb-8" />
                    <Card>
                        <CardHeader>
                           <Skeleton className="h-8 w-1/2" />
                           <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-12 md:py-16">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Button variant="outline" asChild>
                    <Link href="/admin">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Admin Panel
                    </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Trophy/> Edit Prediction
                        </CardTitle>
                        <CardDescription>
                           Update the details for the match: "{prediction?.match}".
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                               <div className="grid sm:grid-cols-2 gap-4">
                                     <FormField
                                        control={form.control}
                                        name="match"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Match</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g., Man Utd vs Arsenal" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="league"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>League</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g., Premier League" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                               </div>
                               <div className="grid sm:grid-cols-2 gap-4">
                                   <FormField
                                        control={form.control}
                                        name="prediction"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Prediction</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g., Over 2.5 Goals" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="correctScore"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Correct Score</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g., 2-1" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                               </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="odds"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Odds</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g., 1.85" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Pending">Pending</SelectItem>
                                                        <SelectItem value="Won">Won</SelectItem>
                                                        <SelectItem value="Lost">Lost</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                     <FormField
                                        control={form.control}
                                        name="confidence"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confidence</FormLabel>
                                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select confidence level" />
                                                    </Trigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="high">High</SelectItem>
                                                        <SelectItem value="medium">Medium</SelectItem>
                                                        <SelectItem value="low">Low</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="isHot"
                                        render={({ field }) => (
                                          <FormItem className="flex flex-col justify-center rounded-lg border p-3 shadow-sm">
                                            <FormLabel>Hot Tip?</FormLabel>
                                             <div className="flex items-center space-x-2 pt-2">
                                                <FormControl>
                                                    <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                   Mark this as a high-priority tip.
                                                </FormDescription>
                                            </div>
                                          </FormItem>
                                        )}
                                      />
                                </div>


                                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

