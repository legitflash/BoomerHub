
'use server';

import { intelligentSearch, type IntelligentSearchInput, type IntelligentSearchOutput } from '@/ai/flows/intelligent-search';
import { deleteTeamMember, updateTeamMember } from '@/services/team-service';
import type { TeamMember } from '@/lib/types';
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

export async function handleUpdateTeamMember(formData: FormData) {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const image = formData.get('image') as string;

    if (!id) {
        throw new Error('Member ID is required for update');
    }

    const memberData: Omit<TeamMember, 'id'> = { name, role, image };

    try {
        await updateTeamMember(id, memberData);
        revalidatePath('/admin');
    } catch (error) {
        console.error('Error updating team member:', error);
        throw new Error('Failed to update team member.');
    }
}
