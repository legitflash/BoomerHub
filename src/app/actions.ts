
'use server';

import { intelligentSearch, type IntelligentSearchInput, type IntelligentSearchOutput } from '@/ai/flows/intelligent-search-with-slugs';
import type { Submission } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { createSubmission } from '@/services/submission-service';
import { checkUsage } from '@/services/usage-service';
import { headers } from 'next/headers';

export async function handleIntelligentSearch(input: IntelligentSearchInput): Promise<IntelligentSearchOutput> {
  try {
    const result = await intelligentSearch(input);
    return result;
  } catch (error) {
    console.error('Error in intelligentSearch flow:', error);
    // In a real app, you might want to throw a more specific error
    // or return a structured error response.
    throw new Error('Failed to perform intelligent search.');
  }
}

export async function handleCreateSubmission(submissionData: Omit<Submission, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string }> {
    try {
        await createSubmission(submissionData);
        return { success: true, message: 'Submission received!' };
    } catch (error) {
        console.error('Error creating submission:', error);
        return { success: false, message: 'Failed to create submission.' };
    }
}

// --- AI Usage Action ---
export async function handleCheckUsage(userId: string, isGuest: boolean) {
    let id = userId;
    if(isGuest) {
      const headerList = headers();
      const ip = (headerList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
      id = ip;
    }
    return checkUsage(id, isGuest);
}
