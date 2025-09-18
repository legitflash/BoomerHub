
'use server';

import type { Prediction } from '@/lib/types';
import { client, urlFor } from '@/lib/sanity-client';
import { format } from 'date-fns';

const predictionFields = `
  _id,
  league,
  homeTeam,
  awayTeam,
  'homeTeamLogo': homeTeamLogo,
  'awayTeamLogo': awayTeamLogo,
  'homeTeamForm': homeTeamForm,
  'awayTeamForm': awayTeamForm,
  prediction,
  correctScore,
  odds,
  confidence,
  status,
  isHot,
  analysis,
  matchDate,
  _createdAt
`;

function formatPrediction(prediction: any): Prediction {
    const homeTeamName = prediction.homeTeam || 'home';
    const awayTeamName = prediction.awayTeam || 'away';

    return {
        id: prediction._id,
        league: prediction.league,
        match: `${homeTeamName} vs. ${awayTeamName}`,
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeTeamLogo: prediction.homeTeamLogo 
          ? urlFor(prediction.homeTeamLogo).width(64).height(64).url() 
          : '/images/team-placeholder.png', // Use local fallback instead of external API
        awayTeamLogo: prediction.awayTeamLogo 
          ? urlFor(prediction.awayTeamLogo).width(64).height(64).url() 
          : '/images/team-placeholder.png', // Use local fallback instead of external API
        homeTeamForm: prediction.homeTeamForm || [],
        awayTeamForm: prediction.awayTeamForm || [],
        prediction: prediction.prediction,
        correctScore: prediction.correctScore,
        odds: prediction.odds,
        confidence: prediction.confidence || 'medium',
        status: prediction.status || 'Pending',
        isHot: prediction.isHot || false,
        analysis: prediction.analysis,
        matchDate: prediction.matchDate ? format(new Date(prediction.matchDate), 'PPP') : undefined,
        createdAt: prediction._createdAt ? format(new Date(prediction._createdAt), 'PPP') : undefined,
    };
}


export async function getAllPredictions(): Promise<Prediction[]> {
  const query = `*[_type == "prediction"] | order(matchDate desc, _createdAt desc) {
    ${predictionFields}
  }`;
  const results = await client.fetch(query);
  return results.map(formatPrediction);
}

export async function getPredictionById(id:string): Promise<Prediction | null> {
    const query = `*[_type == "prediction" && _id == $id][0] {
        ${predictionFields}
    }`;
    const result = await client.fetch(query, { id });
    return result ? formatPrediction(result) : null;
}
