
'use server';

import { intelligentSearch, type IntelligentSearchInput, type IntelligentSearchOutput } from '@/ai/flows/intelligent-search';
import { deleteTeamMember, updateTeamMember } from '@/services/team-service';
import { deletePost, updatePost } from '@/services/post-service';
import { deleteCategory, updateCategory } from '@/services/category-service';
import type { TeamMember, Post, BlogCategory } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { deletePrediction } from '@/services/prediction-service';

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


export async function handleDeletePost(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) {
        throw new Error('Post ID is required');
    }
    try {
        await deletePost(id);
        revalidatePath('/admin'); 
    } catch (error) {
        console.error('Error deleting post:', error);
        throw new Error('Failed to delete post.');
    }
}

export async function handleUpdatePost(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) {
        throw new Error('Post ID is required for update');
    }
    
    const postData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        image: formData.get('image') as string,
        content: formData.get('content') as string,
        author: formData.get('author') as string,
    };

    try {
        await updatePost(id, postData);
        revalidatePath('/admin');
        revalidatePath(`/blog/${formData.get('slug')}`);
    } catch (error) {
        console.error('Error updating post:', error);
        throw new Error('Failed to update post.');
    }
}

export async function handleDeleteCategory(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) {
        throw new Error('Category ID is required');
    }
    try {
        await deleteCategory(id);
        revalidatePath('/admin');
    } catch (error) {
        console.error('Error deleting category:', error);
        throw new Error('Failed to delete category.');
    }
}

export async function handleUpdateCategory(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) {
        throw new Error('Category ID is required for update');
    }
    
    const categoryData = {
        name: formData.get('name') as string,
        iconName: formData.get('iconName') as string,
    };

    try {
        await updateCategory(id, categoryData);
        revalidatePath('/admin');
    } catch (error) {
        console.error('Error updating category:', error);
        throw new Error('Failed to update category.');
    }
}

export async function handleDeletePrediction(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) {
        throw new Error('Prediction ID is required');
    }
    try {
        await deletePrediction(id);
        revalidatePath('/admin');
    } catch (error) {
        console.error('Error deleting prediction:', error);
        throw new Error('Failed to delete prediction.');
    }
}
