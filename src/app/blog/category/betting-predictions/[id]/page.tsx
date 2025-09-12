
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, TrendingUp, Users, Shield, X, Flame } from 'lucide-react';
import Image from 'next/image';
import { getPredictionById } from '@/services/prediction-service';
import { PortableText } from 'next-sanity';
import AdsterraBanner from '@/components/ads/adsterra-banner';

export default async function MatchAnalysisPage({ params: { id } }: { params: { id: string } }) {
  const prediction = await getPredictionById(id);

  if (!prediction) {
    notFound();
  }
  
  const { homeTeam, awayTeam } = prediction;

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
                <Image src={prediction.homeTeamLogo} alt={`${homeTeam} logo`} width={64} height={64} className="rounded-full bg-white p-1 object-contain" />
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter font-headline text-center sm:text-left">{homeTeam} vs {awayTeam}</h1>
                <Image src={prediction.awayTeamLogo} alt={`${awayTeam} logo`} width={64} height={64} className="rounded-full bg-white p-1 object-contain" />
              </div>
              <Badge variant="outline">{prediction.league}</Badge>
            </div>
          </div>
          <CardContent className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Prediction</p>
              <p className="text-xl font-bold text-primary">{prediction.prediction}</p>
            </div>
             {prediction.correctScore && (
                <div>
                    <p className="text-sm text-muted-foreground">Correct Score</p>
                    <p className="text-xl font-bold text-primary">{prediction.correctScore}</p>
                </div>
             )}
            <div>
              <p className="text-sm text-muted-foreground">Confidence</p>
              <p className="text-xl font-bold">{prediction.confidence}</p>
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
      
      <AdsterraBanner />
      
      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mt-8">
        {prediction.analysis && prediction.analysis.length > 0 && (
            <>
                <h2>Expert Analysis</h2>
                <PortableText value={prediction.analysis} />
            </>
        )}

        {(prediction.homeTeamForm.length > 0 || prediction.awayTeamForm.length > 0) && (
            <>
                <h2>Team Form (Last 5 Games)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
                {prediction.homeTeamForm.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-lg mb-2">{homeTeam}</h3>
                        <div className="flex gap-2">
                        {prediction.homeTeamForm.map((res, i) => (
                            <span key={`home-${i}`} className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${res === 'W' ? 'bg-green-500 text-white' : res === 'D' ? 'bg-gray-500 text-white' : 'bg-red-500 text-white'}`}>
                            {res}
                            </span>
                        ))}
                        </div>
                    </div>
                )}
                {prediction.awayTeamForm.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-lg mb-2">{awayTeam}</h3>
                        <div className="flex gap-2">
                        {prediction.awayTeamForm.map((res, i) => (
                            <span key={`away-${i}`} className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${res === 'W' ? 'bg-green-500 text-white' : res === 'D' ? 'bg-gray-500 text-white' : 'bg-red-500 text-white'}`}>
                            {res}
                            </span>
                        ))}
                        </div>
                    </div>
                )}
                </div>
            </>
        )}
        
        <div className="mt-12 text-center p-4 bg-muted/50 rounded-lg not-prose">
            <p className="text-sm text-muted-foreground">Disclaimer: This analysis is for informational purposes only and does not constitute financial advice. Please gamble responsibly and only bet what you can afford to lose.</p>
        </div>
      </div>
    </div>
  );
}
