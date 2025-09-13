
'use server';

import { translateText } from '@/ai/flows/translate-text';
import type { TranslateTextInput, TranslateTextOutput } from '@/ai/flows/translate-text';
import { headers } from 'next/headers';

export async function getTranslation(input: TranslateTextInput): Promise<TranslateTextOutput> {
  const ip = headers().get('x-forwarded-for') || headers().get('x-real-ip');
  return translateText(input, ip);
}
