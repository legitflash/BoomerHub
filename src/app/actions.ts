
'use server';

import { intelligentSearch, type IntelligentSearchInput, type IntelligentSearchOutput } from '@/ai/flows/intelligent-search';
import { deleteTeamMember, updateTeamMember } from '@/services/team-service';
import { deletePost, updatePost } from '@/services/post-service';
import { deleteCategory, updateCategory } from '@/services/category-service';
import { deletePage, getPageBySlug } from '@/services/page-service';
import type { TeamMember, Post, BlogCategory, Submission } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { deletePrediction } from '@/services/prediction-service';
import { getSavesForPost, toggleSavePost, getSavedPostsForUser } from '@/services/saves-service';
import { createSubmission } from '@/services/submission-service';

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
    const description = formData.get('description') as string;

    if (!id) {
        throw new Error('Member ID is required for update');
    }

    const memberData = { name, role, image, description };

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

export async function handleDeletePage(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) {
        throw new Error('Page ID is required');
    }
    try {
        await deletePage(id);
        revalidatePath('/admin');
    } catch (error) {
        console.error('Error deleting page:', error);
        throw new Error('Failed to delete page.');
    }
}

// New action for handling saved posts
export async function handleToggleSavePost(postId: string, userId: string): Promise<{ isSaved: boolean }> {
  if (!userId) {
    throw new Error('User must be logged in to save posts.');
  }
  try {
    const result = await toggleSavePost(postId, userId);
    revalidatePath(`/blog/${postId}`); // Revalidate the post page to update save count/status
    revalidatePath('/profile'); // Revalidate profile page
    return result;
  } catch (error) {
    console.error('Error toggling save post:', error);
    throw new Error('Failed to update save status.');
  }
}

// New action to get saved posts for a user
export async function handleGetSavedPosts(userId: string): Promise<Post[]> {
  if (!userId) {
    console.log("No user ID provided, returning empty array.");
    return [];
  }
  try {
    const savedPosts = await getSavedPostsForUser(userId);
    return savedPosts;
  } catch (error) {
    console.error('Error getting saved posts:', error);
    return [];
  }
}
