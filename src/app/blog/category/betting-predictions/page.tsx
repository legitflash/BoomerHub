
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Flame, Send, TrendingUp, X } from "lucide-react";
import Link from "next/link";
import { getAllPredictions } from "@/services/prediction-service";
import type { Prediction } from "@/lib/types";


export default async function BettingPredictionsPage() {
  const predictions: Prediction[] = await getAllPredictions();
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Won":
        return <Check className="h-5 w-5 text-green-500" />;
      case "Lost":
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <TrendingUp className="h-5 w-5 text-yellow-500" />;
    }
  };
  
  const getConfidenceBadge = (confidence: string) => {
      switch (confidence) {
          case "high":
              return <Badge variant="destructive">High Confidence</Badge>;
          case "medium":
              return <Badge variant="secondary">Medium Confidence</Badge>;
          default:
              return <Badge variant="outline">Low Confidence</Badge>;
      }
  }


  return (
    <div className="container py-12 md:py-16">
       <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Betting Predictions</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Expert analysis and predictions for upcoming matches. Please bet responsibly.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {predictions.map((p) => (
          <Card key={p.id} className={`flex flex-col ${p.isHot ? 'border-primary border-2' : ''}`}>
             {p.isHot && (
                 <div className="bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center p-2 rounded-t-lg">
                    <Flame className="mr-2 h-5 w-5"/>
                    Hot Tip
                 </div>
            )}
            <CardHeader>
              <CardTitle>{p.match}</CardTitle>
              <CardDescription>{p.league}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Prediction</p>
                <p className="text-lg font-bold">{p.prediction}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Correct Score</p>
                <p className="text-lg font-bold">{p.correctScore}</p>
              </div>
              <div className="flex justify-between items-center">
                 <div>
                    <p className="text-sm font-semibold text-muted-foreground">Odds</p>
                    <p className="text-lg font-bold">{p.odds}</p>
                </div>
                {getConfidenceBadge(p.confidence)}
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold">
                    {getStatusIcon(p.status)}
                    <span>{p.status}</span>
                </div>
                <Button variant="secondary" size="sm" asChild>
                  <Link href={`/blog/category/betting-predictions/${p.id}`}>Details</Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
       <div className="text-center mt-16 p-8 bg-secondary/50 rounded-lg">
            <h2 className="text-2xl font-bold font-headline mb-2">Join Our Community</h2>
            <p className="text-muted-foreground mb-4">Get more tips, live updates, and engage with other members on our Telegram channel.</p>
            <Button asChild size="lg">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                    <Send className="mr-2 h-5 w-5" /> Join Telegram for More Tips
                </Link>
            </Button>
        </div>

       <div className="text-center mt-8">
            <p className="text-muted-foreground text-xs">Disclaimer: These predictions are for informational purposes only. We are not responsible for any losses incurred.</p>
        </div>
    </div>
  );
}
