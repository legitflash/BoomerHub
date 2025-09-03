
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Shield, Users } from 'lucide-react';
import type { GenerateMatchAnalysisOutput } from '@/ai/flows/generate-match-analysis';
import { generateMatchAnalysis } from '@/ai/flows/generate-match-analysis';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import AdsterraBanner from '@/components/ads/adsterra-banner';
import { handleCheckUsage } from '@/app/actions';
import { GUEST_LIMIT, USER_LIMIT } from '@/lib/data';


const formSchema = z.object({
  country: z.string().min(1, { message: "Please select a country." }),
  league: z.string().min(1, { message: "Please select a league." }),
  homeTeam: z.string().min(2, { message: "Please enter the home team."}),
  awayTeam: z.string().min(2, { message: "Please enter the away team."}),
  matchDate: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// In a real app, this would come from an API
const countries: Record<string, string[]> = {
    'Argentina': ['Argentine Primera División', 'Primera Nacional'],
    'Australia': ['A-League'],
    'Austria': ['Austrian Bundesliga', '2. Liga'],
    'Belgium': ['Belgian Pro League'],
    'Brazil': ['Brasileirão Série A', 'Brasileirão Série B'],
    'Canada': ['Canadian Premier League'],
    'Chile': ['Chilean Primera División'],
    'China': ['Chinese Super League'],
    'Colombia': ['Categoría Primera A'],
    'Croatia': ['HNL'],
    'Czech Republic': ['Czech First League'],
    'Denmark': ['Danish Superliga'],
    'Ecuador': ['Ecuadorian Serie A'],
    'Egypt': ['Egyptian Premier League'],
    'England': ['English Premier League', 'English League Championship', 'English League One', 'English League Two', 'National League'],
    'Finland': ['Veikkausliiga'],
    'France': ['French Ligue 1', 'French Ligue 2'],
    'Germany': ['German Bundesliga', 'German 2. Bundesliga', '3. Liga'],
    'Greece': ['Super League Greece'],
    'India': ['Indian Super League'],
    'Ireland': ['League of Ireland Premier Division'],
    'Israel': ['Israeli Premier League'],
    'Italy': ['Italian Serie A', 'Italian Serie B'],
    'Japan': ['J1 League', 'J2 League'],
    'Mexico': ['Liga MX'],
    'Morocco': ['Botola Pro'],
    'Netherlands': ['Eredivisie', 'Eerste Divisie'],
    'Nigeria': ['Nigeria Professional Football League'],
    'Norway': ['Eliteserien'],
    'Paraguay': ['Paraguayan Primera División'],
    'Peru': ['Peruvian Primera División'],
    'Poland': ['Ekstraklasa'],
    'Portugal': ['Primeira Liga', 'Liga Portugal 2'],
    'Qatar': ['Qatar Stars League'],
    'Romania': ['Liga I'],
    'Russia': ['Russian Premier League'],
    'Saudi Arabia': ['Saudi Pro League'],
    'Scotland': ['Scottish Premiership', 'Scottish Championship'],
    'Serbia': ['Serbian SuperLiga'],
    'South Africa': ['South African Premier Division'],
    'South Korea': ['K League 1'],
    'Spain': ['Spanish La Liga', 'Spanish Segunda Division'],
    'Sweden': ['Allsvenskan'],
    'Switzerland': ['Swiss Super League'],
    'Turkey': ['Süper Lig', 'TFF 1. Lig'],
    'Ukraine': ['Ukrainian Premier League'],
    'United Arab Emirates': ['UAE Pro League'],
    'Uruguay': ['Uruguayan Primera División'],
    'USA': ['Major League Soccer (MLS)'],
    'Wales': ['Cymru Premier'],
};


export default function MatchPredictionPage() {
  const [leagues, setLeagues] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<GenerateMatchAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);
  const [usage, setUsage] = useState<{ hasRemaining: boolean, remainingCount: number} | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: '',
      league: '',
      homeTeam: '',
      awayTeam: '',
    },
  });

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


  const handleCountryChange = (country: string) => {
    form.setValue('country', country);
    form.setValue('league', ''); // Reset league when country changes
    setLeagues(countries[country as keyof typeof countries] || []);
  }

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const id = user ? user.uid : guestId;
    if (!id) {
        setError("Could not identify user. Please refresh the page.");
        setIsLoading(false);
        return;
    }

    try {
      const result = await generateMatchAnalysis({ 
        homeTeam: values.homeTeam, 
        awayTeam: values.awayTeam,
        league: values.league,
        matchDate: values.matchDate ? format(values.matchDate, 'yyyy-MM-dd') : undefined,
        userId: id,
        isGuest: !user,
      });
      setAnalysis(result);
      updateUsage();
    } catch (e: any) {
      console.error(e);
      toast({
        title: "Prediction Failed",
        description: e.message || 'An error occurred while generating the analysis. Please try again.',
        variant: "destructive",
      });
      setError(e.message || 'An error occurred while generating the analysis. Please try again.');
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


  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Match Prediction</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Get advanced, data-driven predictions for upcoming football matches.
        </p>
      </header>

      <div className="max-w-2xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Enter Match Details</CardTitle>
            <CardDescription>
              Select the country, league, teams, and date to generate a prediction.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                     <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select onValueChange={handleCountryChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.keys(countries).sort().map(country => (
                                <SelectItem key={country} value={country}>{country}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                          <Select onValueChange={field.onChange} value={field.value} disabled={!leagues.length}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a league" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {leagues.map(league => (
                                <SelectItem key={league} value={league}>{league}</SelectItem>
                              ))}
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
                      name="homeTeam"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Home Team</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Manchester United" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="awayTeam"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Away Team</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Liverpool" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                   <FormField
                      control={form.control}
                      name="matchDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Match Date (Optional)</FormLabel>
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
                                disabled={(date) =>
                                  date < new Date(new Date().setDate(new Date().getDate() - 1))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  <Button type="submit" className="w-full" disabled={isLoading || (usage && !usage.hasRemaining)}>
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Generate Prediction'}
                  </Button>
                  {renderUsageInfo()}
                </form>
             </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="text-center p-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Our AI is analyzing the match... this may take a moment.</p>
          </div>
        )}
        
        {analysis && (
          <Card className="animate-in fade-in">
            <CardHeader className="text-center bg-muted/50">
              <CardTitle className="text-2xl text-primary">{analysis.prediction}</CardTitle>
              <CardDescription>
                Correct Score: {analysis.correctScore} | Confidence: {analysis.confidence}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><Users className="text-primary"/> Head-to-Head</h3>
                        <p className="text-sm text-muted-foreground">{analysis.headToHead}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><Shield className="text-primary"/> Form Analysis</h3>
                        <p className="text-sm text-muted-foreground">{analysis.formAnalysis}</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold">Expert Opinion & Rationale</h3>
                    <p className="text-sm text-muted-foreground mt-2">{analysis.expertOpinion}</p>
                </div>
                 <div className="text-center text-xs text-muted-foreground pt-4 border-t">
                    Disclaimer: This analysis is AI-generated and for informational purposes only. Please gamble responsibly.
                </div>
            </CardContent>
          </Card>
        )}
      </div>
      <AdsterraBanner />
    </div>
  );
}
