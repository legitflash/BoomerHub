
'use server';

import { generateMatchAnalysis } from '@/ai/flows/generate-match-analysis';
import type { GenerateMatchAnalysisInput, GenerateMatchAnalysisOutput } from '@/ai/flows/generate-match-analysis';
import { headers } from 'next/headers';

export async function getMatchAnalysis(input: GenerateMatchAnalysisInput): Promise<GenerateMatchAnalysisOutput> {
  const ip = headers().get('x-forwarded-for') || headers().get('x-real-ip');
  return generateMatchAnalysis(input, ip);
}
