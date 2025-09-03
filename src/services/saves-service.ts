
'use server';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, deleteDoc, setDoc, writeBatch } from 'firebase/firestore';
import type { Post } from '@/lib/types';
import { getPostBySlug } from './post-service';

export async function getSavesForPost(slug: string, userId?: string): Promise<{ count: number; isSaved: boolean }> {
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

export async function toggleSavePost(postId: string, userId: string): Promise<{ isSaved: boolean }> {
  const savesCollection = collection(db, 'saves');
  const saveDocRef = doc(db, 'saves', `${userId}_${postId}`);
  const saveQuery = query(savesCollection, where('postId', '==', postId), where('userId', '==', userId));
  const snapshot = await getDocs(saveQuery);

  if (snapshot.empty) {
    // Post is not saved, so save it
    await setDoc(saveDocRef, { userId, postId });
    return { isSaved: true };
  } else {
    // Post is saved, so unsave it
    await deleteDoc(snapshot.docs[0].ref);
    return { isSaved: false };
  }
}


export async function getSavedPostsForUser(userId: string): Promise<Post[]> {
  if (!userId) {
    return [];
  }
  try {
    const savesCollection = collection(db, 'saves');
    const q = query(savesCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const postIds = querySnapshot.docs.map(doc => doc.data().postId as string);

    if (postIds.length === 0) {
      return [];
    }

    const savedPostsPromises = postIds.map(slug => getPostBySlug(slug));
    const savedPosts = (await Promise.all(savedPostsPromises)).filter((post): post is Post => post !== null);
    
    return savedPosts;
  } catch (error) {
    console.error('Error fetching saved posts:', error);
    return [];
  }
}


export async function unsaveAllPostsForUser(userId: string): Promise<void> {
    try {
        const savesCollection = collection(db, 'saves');
        const q = query(savesCollection, where('userId', '==', userId));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return;
        }

        const batch = writeBatch(db);
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        console.log(`Unsaved ${snapshot.size} posts for user ${userId}.`);
    } catch (error) {
        console.error("Error unsaving all posts:", error);
        throw new Error("Could not unsave all posts.");
    }
}
