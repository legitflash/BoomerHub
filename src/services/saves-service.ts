
'use server';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, writeBatch, doc, deleteDoc } from 'firebase/firestore';
import { blogPosts } from '@/lib/data';
import type { Post } from '@/lib/types';


export async function getSavesForPost(slug: string, userId?: string | null): Promise<{ count: number; isSaved: boolean }> {
  try {
    const savesCollection = collection(db, 'saves');
    const q = query(savesCollection, where('postId', '==', slug));
    const querySnapshot = await getDocs(q);
    const count = querySnapshot.size;
    let isSaved = false;

    if (userId) {
       const userSaveQuery = query(savesCollection, where('postId', '==', slug), where('userId', '==', userId));
       const userSaveSnapshot = await getDocs(userSaveQuery);
       isSaved = !userSaveSnapshot.empty;
    }

    return { count, isSaved };
  } catch (error) {
    console.error('Error getting saves:', error);
    return { count: 0, isSaved: false };
  }
}

export async function toggleSave(slug: string, userId: string): Promise<{ count: number; isSaved: boolean }> {
  const savesCollection = collection(db, 'saves');
  const userSaveQuery = query(savesCollection, where('postId', '==', slug), where('userId', '==', userId));

  try {
    const userSaveSnapshot = await getDocs(userSaveQuery);

    if (userSaveSnapshot.empty) {
      // User hasn't saved it yet, so add a save
      const newSaveRef = doc(savesCollection);
      await writeBatch(db).set(newSaveRef, { postId: slug, userId, savedAt: new Date() }).commit();
    } else {
      // User has saved it, so remove the save
      const saveDoc = userSaveSnapshot.docs[0];
      await deleteDoc(saveDoc.ref);
    }
    
    // Return the new count and status
    return getSavesForPost(slug, userId);

  } catch (error) {
    console.error('Error toggling save:', error);
    // In case of an error, return the current state without changes
    return getSavesForPost(slug, userId);
  }
}

export async function getSavedPostsForUser(userId: string): Promise<Post[]> {
  try {
    const savesCollection = collection(db, 'saves');
    const q = query(savesCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const savedPostSlugs = new Set(querySnapshot.docs.map(doc => doc.data().postId));
    
    // Filter the main blogPosts array to find the full post objects
    const userSavedPosts = blogPosts.filter(post => savedPostSlugs.has(post.slug));
    
    return userSavedPosts;
  } catch (error) {
    console.error('Error getting saved posts for user:', error);
    return [];
  }
}
