
'use server';

import { translateText } from '@/ai/flows/translate-text';
import type { TranslateTextInput, TranslateTextOutput } from '@/ai/flows/translate-text';
import { Result } from '@/lib/types';
import { checkAndIncrementRateLimit } from '@/services/rate-limit-service';
import { headers } from 'next/headers';

export async function getTranslation(input: TranslateTextInput): Promise<Result<TranslateTextOutput>> {
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
    
    const result = await translateText(input, ip);
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Translation error:', error);
    return {
      success: false,
      code: 'INTERNAL_ERROR',
      message: 'Failed to translate text. Please try again.'
    };
  }
}
