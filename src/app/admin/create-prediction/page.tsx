
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Trophy } from 'lucide-react';
import { createPrediction } from '@/services/prediction-service';
import type { Prediction } from '@/lib/types';


const formSchema = z.object({
  match: z.string().min(5, { message: "Match name must be at least 5 characters." }),
  league: z.string().min(3, { message: "League name must be at least 3 characters." }),
  prediction: z.string().min(3, { message: "Prediction must be at least 3 characters." }),
  correctScore: z.string().regex(/^\d-\d$/, { message: "Score must be in 'X-Y' format." }),
  odds: z.string().min(1, { message: "Odds are required." }),
  confidence: z.enum(['high', 'medium', 'low']),
  status: z.enum(['Pending', 'Won', 'Lost']),
  isHot: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

// Dummy data for teams as it's complex to create on the fly.
// In a real advanced app, you might fetch team data from an API.
const getDummyTeamData = (matchName: string) => {
    const teams = matchName.split(' vs ');
    const homeTeam = teams[0] || 'Home Team';
    const awayTeam = teams[1] || 'Away Team';
    return {
        home: { name: homeTeam, logo: "/placeholder.svg", form: ["W", "D", "L", "W", "W"] },
        away: { name: awayTeam, logo: "/placeholder.svg", form: ["L", "D", "W", "L", "D"] }
    }
}


export default function CreatePredictionPage() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            match: '',
            league: '',
            prediction: '',
            correctScore: '1-0',
            odds: '1.5',
            confidence: 'medium',
            status: 'Pending',
            isHot: false,
        }
    });

    async function onSubmit(values: FormValues) {
        try {
            const predictionData: Omit<Prediction, 'id'> = {
                ...values,
                teams: getDummyTeamData(values.match)
            };

            await createPrediction(predictionData);

            toast({
                title: "Prediction Added!",
                description: "The new prediction has been successfully created.",
                variant: "success",
            });
            router.push('/admin');
        } catch (error) {
             toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem creating the prediction. Please try again.",
                variant: "destructive",
            });
            console.error("Failed to create prediction:", error);
        }
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
                           <Trophy/> Add New Prediction
                        </CardTitle>
                        <CardDescription>
                            Fill in the details below to add a new sports prediction.
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
                                    {form.formState.isSubmitting ? 'Adding...' : 'Add Prediction'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

    