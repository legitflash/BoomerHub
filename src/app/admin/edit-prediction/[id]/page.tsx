
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { format } from "date-fns"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Trophy, Calendar as CalendarIcon } from 'lucide-react';
import { getPredictionById } from '@/services/prediction-service';
import type { Prediction } from '@/lib/types';
import { handleUpdatePrediction } from '@/app/actions';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  match: z.string().min(5, { message: "Match name must be at least 5 characters." }),
  league: z.string().min(3, { message: "League name must be at least 3 characters." }),
  prediction: z.string().min(3, { message: "Prediction must be at least 3 characters." }),
  correctScore: z.string().regex(/^\d-\d$/, { message: "Score must be in 'X-Y' format." }),
  odds: z.string().min(1, { message: "Odds are required." }),
  confidence: z.enum(['high', 'medium', 'low']),
  status: z.enum(['Pending', 'Won', 'Lost']),
  isHot: z.boolean().default(false),
  analysis: z.string().optional(),
  matchDate: z.date().optional(),
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
                            analysis: fetchedPrediction.analysis || '',
                            matchDate: fetchedPrediction.matchDate ? new Date(fetchedPrediction.matchDate) : undefined,
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

            const updatedValues: any = {
                ...values,
                matchDate: values.matchDate ? format(values.matchDate, 'yyyy-MM-dd') : '',
            };

            Object.entries(updatedValues).forEach(([key, value]) => {
                if (typeof value === 'boolean') {
                    formData.append(key, value ? 'on' : 'off');
                } else if(value !== undefined && value !== null) {
                    formData.append(key, value as string);
                }
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
                description: "There was a problem updating the prediction. Please try again.",
                variant: "destructive",
            });
            console.error("Failed to update prediction:", error);
        }
    }
    
    if (isLoading) {
        return (
            <div className="container py-12 md:py-16">
                 <div className="max-w-xl mx-auto">
                    <Skeleton className="h-10 w-48 mb-8" />
                    <Card>
                        <CardHeader>
                           <Skeleton className="h-8 w-1/2" />
                           <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <Skeleton className="h-10 w-full" />
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
            <div className="max-w-xl mx-auto">
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
                           Update the details for "{prediction?.match}".
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="match"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Match</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Real Madrid vs Barcelona" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="matchDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                        <FormLabel>Match Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                            </PopoverContent>
                                        </Popover>
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
                                                <Input placeholder="e.g., La Liga" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                                <div className="grid sm:grid-cols-2 gap-4">
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
                                     <FormField
                                        control={form.control}
                                        name="odds"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Odds</FormLabel>
                                                <FormControl>
                                                    <Input type="number" step="0.01" placeholder="e.g., 1.85" {...field} />
                                                </FormControl>
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
                                                <FormLabel>Confidence Level</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select confidence level" />
                                                    </SelectTrigger>
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
                                <FormField
                                    control={form.control}
                                    name="analysis"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Match Analysis (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea 
                                                  placeholder="Provide some expert analysis on the match..." 
                                                  className="min-h-[150px]"
                                                  {...field} 
                                                />
                                            </FormControl>
                                             <FormDescription>
                                                You can use HTML tags for formatting (e.g., &lt;b&gt;bold&lt;/b&gt;, &lt;p&gt;paragraph&lt;/p&gt;).
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isHot"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Hot Tip?</FormLabel>
                                                <FormDescription>
                                                   Mark this prediction as a featured hot tip.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
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
