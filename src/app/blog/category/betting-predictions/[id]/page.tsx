
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, TrendingUp, Users, Shield, X, Flame, Calendar } from 'lucide-react';
import Image from 'next/image';
import { getPredictionById, getAllPredictions } from '@/services/prediction-service';
import { PortableText } from 'next-sanity';
import AdsterraBanner from '@/components/ads/adsterra-banner';
import type { Prediction } from '@/lib/types';


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

export default async function MatchAnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prediction = await getPredictionById(id);

  if (!prediction) {
    notFound();
  }
  
  const allPredictions = await getAllPredictions();
  const relatedPredictions = allPredictions.filter(p => p.id !== id).slice(0, 3);
  
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
    <>
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
    
    {relatedPredictions.length > 0 && (
        <aside className="container max-w-4xl py-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center font-headline">More Predictions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPredictions.map((p: Prediction) => (
                    <Card key={p.id} className={`flex flex-col ${p.isHot ? 'border-primary border-2' : ''}`}>
                         {p.isHot && (
                            <div className="bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center p-2 rounded-t-lg">
                                <Flame className="mr-2 h-5 w-5"/>
                                Hot Tip
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-lg">{p.match}</CardTitle>
                            <CardDescription>{p.league}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Prediction</p>
                                <p className="text-md font-bold">{p.prediction}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/50 p-4 flex justify-between items-center">
                            <div className="flex items-center gap-2 font-bold">
                                {getStatusIcon(p.status)}
                                <span>{p.status}</span>
                            </div>
                            {p.analysis && p.analysis.length > 0 && (
                                <Button variant="secondary" size="sm" asChild>
                                    <Link href={`/blog/category/betting-predictions/${p.id}`}>Details</Link>
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </aside>
    )}
    </>
  );
}
