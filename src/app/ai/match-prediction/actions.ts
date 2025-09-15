
'use server';

import { generateMatchAnalysis } from '@/ai/flows/generate-match-analysis';
import type { GenerateMatchAnalysisInput, GenerateMatchAnalysisOutput } from '@/ai/flows/generate-match-analysis';
import { headers } from 'next/headers';

export async function getMatchAnalysis(input: GenerateMatchAnalysisInput): Promise<GenerateMatchAnalysisOutput> {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip');
    return await generateMatchAnalysis(input, ip);
  } catch (error: any) {
    // Re-throw the error so it can be caught by client-side error handling
    throw new Error(error.message || 'Failed to generate match analysis');
  }
}
