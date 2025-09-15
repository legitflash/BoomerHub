
'use server';

import { generateFinancialAdvice } from '@/ai/flows/generate-financial-advice';
import type { GenerateFinancialAdviceInput, GenerateFinancialAdviceOutput } from '@/ai/flows/generate-financial-advice';
import { headers } from 'next/headers';

export async function getFinancialAdvice(input: GenerateFinancialAdviceInput): Promise<GenerateFinancialAdviceOutput> {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip');
  return generateFinancialAdvice(input, ip);
}
