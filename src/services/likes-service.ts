
'use server';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, writeBatch, doc, deleteDoc, getDoc } from 'firebase/firestore';

export async function getLikesForPost(slug: string, userId?: string | null): Promise<{ count: number; isLiked: boolean }> {
  try {
    const likesCollection = collection(db, 'likes');
    const q = query(likesCollection, where('postId', '==', slug));
    const querySnapshot = await getDocs(q);
    const count = querySnapshot.size;
    let isLiked = false;

    if (userId) {
       const userLikeQuery = query(likesCollection, where('postId', '==', slug), where('userId', '==', userId));
       const userLikeSnapshot = await getDocs(userLikeQuery);
       isLiked = !userLikeSnapshot.empty;
    }

    return { count, isLiked };
  } catch (error) {
    console.error('Error getting likes:', error);
    return { count: 0, isLiked: false };
  }
}

export async function toggleLike(slug: string, userId: string): Promise<{ count: number; isLiked: boolean }> {
  const likesCollection = collection(db, 'likes');
  const userLikeQuery = query(likesCollection, where('postId', '==', slug), where('userId', '==', userId));

  try {
    const userLikeSnapshot = await getDocs(userLikeQuery);

    if (userLikeSnapshot.empty) {
      // User hasn't liked it yet, so add a like
      const newLikeRef = doc(likesCollection);
      await writeBatch(db).set(newLikeRef, { postId: slug, userId }).commit();
    } else {
      // User has liked it, so remove the like
      const likeDoc = userLikeSnapshot.docs[0];
      await deleteDoc(likeDoc.ref);
    }
    
    // Return the new count and status
    return getLikesForPost(slug, userId);

  } catch (error) {
    console.error('Error toggling like:', error);
    // In case of an error, return the current state without changes
    return getLikesForPost(slug, userId);
  }
}
