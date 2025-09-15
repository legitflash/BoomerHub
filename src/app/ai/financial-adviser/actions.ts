
'use server';

import { generateFinancialAdvice } from '@/ai/flows/generate-financial-advice';
import type { GenerateFinancialAdviceInput, GenerateFinancialAdviceOutput } from '@/ai/flows/generate-financial-advice';
import { headers } from 'next/headers';

export async function getFinancialAdvice(input: GenerateFinancialAdviceInput): Promise<GenerateFinancialAdviceOutput> {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip');
    return await generateFinancialAdvice(input, ip);
  } catch (error: any) {
    // Re-throw the error so it can be caught by client-side error handling
    throw new Error(error.message || 'Failed to generate financial advice');
  }
}
