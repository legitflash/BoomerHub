
'use server';

import { translateText } from '@/ai/flows/translate-text';
import type { TranslateTextInput, TranslateTextOutput } from '@/ai/flows/translate-text';
import { headers } from 'next/headers';

export async function getTranslation(input: TranslateTextInput): Promise<TranslateTextOutput> {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip');
  return translateText(input, ip);
}
