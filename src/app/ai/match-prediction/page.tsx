
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function MatchPredictionPage() {
  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
        <div className="inline-block bg-primary/10 p-4 rounded-lg mb-4">
            <Search className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Match Prediction</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Get advanced, data-driven predictions for upcoming football matches.
        </p>
      </header>

      <div className="max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
                <CardDescription>
                    This advanced AI tool is under development. Soon, you'll be able to select a country, league, and teams to get highly accurate match predictions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Stay tuned!</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
