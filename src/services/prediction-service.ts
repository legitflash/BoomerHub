
'use server';

import type { Prediction } from '@/lib/types';
import { format, toDate } from 'date-fns';

let predictions: Prediction[] = [];
let initialized = false;

function initializeData() {
    if (initialized) return;

    predictions = [
        {
            id: '1',
            league: 'English Premier League',
            match: 'Manchester United vs. Arsenal',
            prediction: 'Over 2.5 Goals',
            correctScore: '2-1',
            odds: '1.85',
            confidence: 'high',
            status: 'Won',
            isHot: true,
            analysis: '<p>Both teams have been in fine goalscoring form, and their head-to-head fixtures often produce goals. Expect an open, attacking game.</p>',
            matchDate: '2024-08-10',
            createdAt: '2024-07-21T10:00:00Z',
            teams: {
                home: { name: 'Manchester United', logo: 'https://logo.clearbit.com/manutd.com', form: ['W', 'W', 'D', 'L', 'W'] },
                away: { name: 'Arsenal', logo: 'https://logo.clearbit.com/arsenal.com', form: ['W', 'L', 'W', 'W', 'D'] }
            }
        },
        {
            id: '2',
            league: 'Spanish La Liga',
            match: 'Real Madrid vs. Barcelona',
            prediction: 'Real Madrid to Win',
            correctScore: '3-1',
            odds: '2.10',
            confidence: 'medium',
            status: 'Pending',
            isHot: false,
            analysis: '<p>El Clásico is always unpredictable, but Real Madrid\'s home form gives them a slight edge over a Barcelona side in transition.</p>',
            matchDate: '2024-08-12',
            createdAt: '2024-07-20T12:00:00Z',
            teams: {
                home: { name: 'Real Madrid', logo: 'https://logo.clearbit.com/realmadrid.com', form: ['W', 'D', 'W', 'W', 'W'] },
                away: { name: 'Barcelona', logo: 'https://logo.clearbit.com/fcbarcelona.com', form: ['L', 'W', 'D', 'W', 'L'] }
            }
        }
    ];

    initialized = true;
}

initializeData();

export async function createPrediction(predictionData: Omit<Prediction, 'id' | 'createdAt'>): Promise<string> {
  const newPrediction: Prediction = {
    id: String(predictions.length + 1),
    createdAt: new Date().toISOString(),
    ...predictionData,
  };
  predictions.unshift(newPrediction);
  return newPrediction.id;
}

export async function getAllPredictions(): Promise<Prediction[]> {
  return predictions.map(p => ({
      ...p,
      matchDate: p.matchDate ? format(toDate(new Date(p.matchDate)), 'PPP') : undefined,
  }));
}

export async function getPredictionById(id:string): Promise<Prediction | null> {
    return predictions.find(p => p.id === id) || null;
}

export async function updatePrediction(id: string, predictionData: Partial<Omit<Prediction, 'id' | 'createdAt'>>): Promise<void> {
    const index = predictions.findIndex(p => p.id === id);
    if (index !== -1) {
        predictions[index] = { ...predictions[index], ...predictionData } as Prediction;
    }
}

export async function deletePrediction(id: string): Promise<void> {
    predictions = predictions.filter(p => p.id !== id);
}
