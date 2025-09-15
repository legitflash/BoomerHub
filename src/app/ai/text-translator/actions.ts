
'use server';

import { translateText } from '@/ai/flows/translate-text';
import type { TranslateTextInput, TranslateTextOutput } from '@/ai/flows/translate-text';
import { headers } from 'next/headers';

export async function getTranslation(input: TranslateTextInput): Promise<TranslateTextOutput> {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip');
    return await translateText(input, ip);
  } catch (error: any) {
    // Re-throw the error so it can be caught by client-side error handling
    throw new Error(error.message || 'Failed to translate text');
  }
}
