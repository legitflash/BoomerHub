
'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import type { Usage } from '@/lib/types';
import { isSameDay } from 'date-fns';

const GUEST_LIMIT = 5;
const USER_LIMIT = 10;

/**
 * Records a usage instance for a user or guest.
 * @param userId - The UID of the logged-in user, or a unique ID for a guest (e.g., IP address).
 * @param isGuest - True if the user is a guest.
 */
export async function recordUsage(userId: string, isGuest: boolean): Promise<void> {
  const collectionName = isGuest ? 'usage_guests' : 'usage_users';
  const usageDocRef = doc(db, collectionName, userId);
  const usageDoc = await getDoc(usageDocRef);

  if (usageDoc.exists()) {
    // Document exists, check if it's a new day to reset
    const usageData = usageDoc.data() as Usage;
    const now = new Date();
    const lastResetDate = usageData.lastReset.toDate();
    if (!isSameDay(now, lastResetDate)) {
       // It's a new day, reset the count to 1
       await updateDoc(usageDocRef, {
         count: 1,
         lastReset: serverTimestamp()
       });
    } else {
      // It's the same day, increment count
      await updateDoc(usageDocRef, {
        count: increment(1)
      });
    }
  } else {
    // No document, create it with count 1
    await setDoc(usageDocRef, {
      count: 1,
      lastReset: serverTimestamp()
    });
  }
}

/**
 * Checks if a user or guest has remaining AI tool requests.
 * Resets the daily count if it's a new day.
 * @param userId - The UID of the logged-in user, or a unique ID for a guest (e.g., IP address).
 * @param isGuest - True if the user is a guest.
 * @returns An object with `hasRemaining` (boolean) and `remainingCount` (number).
 */
export async function checkUsage(userId: string, isGuest: boolean): Promise<{ hasRemaining: boolean, remainingCount: number }> {
  const collectionName = isGuest ? 'usage_guests' : 'usage_users';
  const usageDocRef = doc(db, collectionName, userId);
  const usageDoc = await getDoc(usageDocRef);
  const limit = isGuest ? GUEST_LIMIT : USER_LIMIT;

  if (!usageDoc.exists()) {
    // First time user/guest, they have usage remaining.
    return { hasRemaining: true, remainingCount: limit };
  }

  const usageData = usageDoc.data() as Usage;
  const now = new Date();
  
  if (usageData.lastReset) {
    const lastResetDate = usageData.lastReset.toDate();
    if (!isSameDay(now, lastResetDate)) {
      // It's a new day, count should be considered 0 before this request.
      return { hasRemaining: true, remainingCount: limit };
    }
  }
  
  const currentCount = usageData.count || 0;
  const remainingCount = Math.max(0, limit - currentCount);

  return {
    hasRemaining: currentCount < limit,
    remainingCount: remainingCount
  };
}
