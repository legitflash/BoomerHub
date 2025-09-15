
'use server';

import { generateMatchAnalysis } from '@/ai/flows/generate-match-analysis';
import type { GenerateMatchAnalysisInput, GenerateMatchAnalysisOutput } from '@/ai/flows/generate-match-analysis';
import { Result } from '@/lib/types';
import { checkAndIncrementRateLimit } from '@/services/rate-limit-service';
import { headers } from 'next/headers';

export async function getMatchAnalysis(input: GenerateMatchAnalysisInput): Promise<Result<GenerateMatchAnalysisOutput>> {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : headersList.get('x-real-ip');
    
    const rateLimitResult = await checkAndIncrementRateLimit(ip);
    if (rateLimitResult.exceeded) {
      return {
        success: false,
        code: 'RATE_LIMIT_EXCEEDED',
        message: rateLimitResult.message || 'Rate limit exceeded'
      };
    }
    
    const result = await generateMatchAnalysis(input, ip);
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Match analysis generation error:', error);
    return {
      success: false,
      code: 'INTERNAL_ERROR',
      message: 'Failed to generate match analysis. Please try again.'
    };
  }
}
