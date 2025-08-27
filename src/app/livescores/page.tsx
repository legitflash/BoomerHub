
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Tv } from 'lucide-react';
import type { Livescore } from '@/lib/types';

const API_KEY = process.env.NEXT_PUBLIC_THESPORTSDB_API_KEY || '1';
const BASE_URL = `https://www.thesportsdb.com/api/v2/json/${API_KEY}`;

async function fetchLivescores(): Promise<Livescore[]> {
    try {
        // Using a v2 endpoint for livescores
        const response = await fetch(`${BASE_URL}/livescore/all`);
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.events || [];
    } catch (error) {
        console.error('Failed to fetch livescores:', error);
        return [];
    }
}


export default function LivescoresPage() {
    const [scores, setScores] = useState<Livescore[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getScores = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const livescores = await fetchLivescores();
                setScores(livescores);
            } catch (e: any) {
                setError('Failed to load live scores. Please try again later.');
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        getScores();
        // Optional: Set up an interval to refresh scores every 30 seconds
        const intervalId = setInterval(getScores, 30000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const getStatusBadge = (status: string) => {
        if (status.toLowerCase().includes('live') || status.toLowerCase().includes('progress')) {
            return <Badge variant="destructive" className="animate-pulse">Live</Badge>;
        }
        if (status.toLowerCase().includes('finished')) {
            return <Badge variant="secondary">Finished</Badge>;
        }
        if (status.toLowerCase().includes('not started')) {
             return <Badge variant="outline">Not Started</Badge>;
        }
        return <Badge>{status}</Badge>;
    }

    return (
        <div className="container py-12 md:py-16">
            <header className="text-center mb-12">
                 <div className="inline-block bg-primary/10 p-4 rounded-lg mb-4">
                    <Tv className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Live Scores</h1>
                <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
                    Follow the action with real-time updates from matches happening right now.
                </p>
            </header>

            {isLoading && (
                <div className="flex justify-center items-center py-16">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            )}

            {error && <p className="text-destructive text-center">{error}</p>}

            {!isLoading && !error && scores.length === 0 && (
                <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
                    <h2 className="text-2xl font-semibold mb-2">No Live Matches</h2>
                    <p className="text-muted-foreground">There are no matches currently in progress. Please check back later.</p>
                </div>
            )}
            
            {!isLoading && !error && scores.length > 0 && (
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {scores.map((score) => (
                        <Card key={score.idEvent}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">{score.strHomeTeam} vs {score.strAwayTeam}</CardTitle>
                                        <CardDescription>{score.strLeague}</CardDescription>
                                    </div>
                                    {getStatusBadge(score.strStatus)}
                                </div>
                            </CardHeader>
                            <CardContent className="text-center">
                                <div className="text-4xl font-bold tracking-tighter">
                                    {score.intHomeScore} - {score.intAwayScore}
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">{score.strProgress ? `${score.strProgress}'` : ' '}</p>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            )}
        </div>
    );
}
