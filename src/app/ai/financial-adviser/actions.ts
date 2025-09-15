
'use server';

import { generateFinancialAdvice } from '@/ai/flows/generate-financial-advice';
import type { GenerateFinancialAdviceInput, GenerateFinancialAdviceOutput } from '@/ai/flows/generate-financial-advice';
import { Result } from '@/lib/types';
import { checkAndIncrementRateLimit } from '@/services/rate-limit-service';
import { headers } from 'next/headers';

export async function getFinancialAdvice(input: GenerateFinancialAdviceInput): Promise<Result<GenerateFinancialAdviceOutput>> {
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
    
    const result = await generateFinancialAdvice(input, ip);
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Financial advice generation error:', error);
    return {
      success: false,
      code: 'INTERNAL_ERROR',
      message: 'Failed to generate financial advice. Please try again.'
    };
  }
}
