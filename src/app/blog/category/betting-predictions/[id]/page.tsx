import { notFound } from 'next/navigation';
import Link from 'next/link';
import { predictions } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, TrendingUp, Users, Shield, BarChart2, X, Flame } from 'lucide-react';
import Image from 'next/image';

export default function MatchAnalysisPage({ params }: { params: { id: string } }) {
  const prediction = predictions.find((p) => p.id.toString() === params.id);

  if (!prediction) {
    notFound();
  }

  const { teams } = prediction;
  const homeTeam = teams.home;
  const awayTeam = teams.away;

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Won':
        return { icon: <Check className="h-6 w-6 text-green-500" />, color: 'text-green-500' };
      case 'Lost':
        return { icon: <X className="h-6 w-6 text-red-500" />, color: 'text-red-500' };
      default:
        return { icon: <TrendingUp className="h-6 w-6 text-yellow-500" />, color: 'text-yellow-500' };
    }
  };

  const { icon: statusIcon, color: statusColor } = getStatusInfo(prediction.status);

  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/blog/category/betting-predictions">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Predictions
          </Link>
        </Button>
      </div>

      <header className="mb-8">
        <Card className="overflow-hidden">
          <div className="bg-muted/30 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <Image src="/placeholder.svg" alt={homeTeam.name} width={64} height={64} className="rounded-full bg-white p-1" />
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter font-headline text-center sm:text-left">{homeTeam.name} vs {awayTeam.name}</h1>
                <Image src="/placeholder.svg" alt={awayTeam.name} width={64} height={64} className="rounded-full bg-white p-1" />
              </div>
              <Badge variant="outline">{prediction.league}</Badge>
            </div>
          </div>
          <CardContent className="p-6 grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Prediction</p>
              <p className="text-xl font-bold text-primary">{prediction.prediction}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Odds</p>
              <p className="text-xl font-bold">{prediction.odds}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <div className={`flex items-center gap-2 font-bold ${statusColor}`}>
                {statusIcon}
                <span>{prediction.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users className="text-primary"/> Head-to-Head</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Historically, matches between these two have been tightly contested. In their last 5 meetings, {homeTeam.name} has won 2, {awayTeam.name} has won 2, and 1 match ended in a draw. This suggests a balanced encounter is likely.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Shield className="text-primary"/> Defensive Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{homeTeam.name} has kept 3 clean sheets in their last 5 games, showing strong defensive form. However, {awayTeam.name} has scored in 8 of their last 10 away games, indicating they can break down tough defenses. </p>
                </CardContent>
            </Card>
        </div>

        <h2>Expert Opinion & Rationale</h2>
        <p>
            Our prediction for "{prediction.prediction}" at odds of {prediction.odds} is based on a combination of recent form and tactical analysis. {homeTeam.name} has been dominant at home, winning their last 4 matches on their own turf. Their attacking trio is in scintillating form, and they average over 2.5 goals per game at home.
        </p>
        <p>
            While {awayTeam.name} is a strong side, their away form has been inconsistent. They have struggled defensively against top-tier opponents, which is why we lean towards a {homeTeam.name} victory. The odds of {prediction.odds} present good value given the circumstances. We have assigned this a <span className="font-bold">{prediction.confidence} confidence</span> rating.
        </p>

        <h2>Team Form (Last 5 Games)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-2">{homeTeam.name}</h3>
            <div className="flex gap-2">
              {homeTeam.form.map((res, i) => (
                <span key={i} className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${res === 'W' ? 'bg-green-500 text-white' : res === 'D' ? 'bg-gray-500 text-white' : 'bg-red-500 text-white'}`}>
                  {res}
                </span>
              ))}
            </div>
          </div>
           <div>
            <h3 className="font-semibold text-lg mb-2">{awayTeam.name}</h3>
             <div className="flex gap-2">
              {awayTeam.form.map((res, i) => (
                <span key={i} className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${res === 'W' ? 'bg-green-500 text-white' : res === 'D' ? 'bg-gray-500 text-white' : 'bg-red-500 text-white'}`}>
                  {res}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Disclaimer: This analysis is for informational purposes only and does not constitute financial advice. Please gamble responsibly and only bet what you can afford to lose.</p>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return predictions.map((p) => ({
    id: p.id.toString(),
  }));
}
