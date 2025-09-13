
'use server';

import { generateFinancialAdvice } from '@/ai/flows/generate-financial-advice';
import type { GenerateFinancialAdviceInput, GenerateFinancialAdviceOutput } from '@/ai/flows/generate-financial-advice';
import { headers } from 'next/headers';

export async function getFinancialAdvice(input: GenerateFinancialAdviceInput): Promise<GenerateFinancialAdviceOutput> {
  const ip = headers().get('x-forwarded-for') || headers().get('x-real-ip');
  return generateFinancialAdvice(input, ip);
}
