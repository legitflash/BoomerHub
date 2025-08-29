
'use server';

import { intelligentSearch, type IntelligentSearchInput, type IntelligentSearchOutput } from '@/ai/flows/intelligent-search';
import { deleteTeamMember } from '@/services/team-service';
import { revalidatePath } from 'next/cache';

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

export async function handleDeleteTeamMember(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) {
        throw new Error('Member ID is required');
    }
    try {
        await deleteTeamMember(id);
        revalidatePath('/admin'); // Re-renders the admin page to show the updated list
    } catch (error) {
        console.error('Error deleting team member:', error);
        throw new Error('Failed to delete team member.');
    }
}
