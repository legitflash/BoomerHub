
'use server';

import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import type { User as FirebaseUser } from 'firebase/auth';
import type { User } from '@/lib/types';

/**
 * Creates a user profile document in Firestore.
 * This is typically called right after a user registers.
 * @param user The Firebase user object.
 * @param additionalData Any additional data to store in the profile.
 */
export async function createUserProfile(user: FirebaseUser, additionalData: { [key: string]: any } = {}) {
  const userRef = doc(db, 'users', user.uid);
  
  const { uid, email } = user;
  const { firstName = '', lastName = '', displayName = '' } = additionalData;
  
  const profileData = {
    uid,
    email,
    firstName,
    lastName,
    displayName: displayName || `${firstName} ${lastName}`.trim(),
    createdAt: new Date(),
    isAdmin: false, // Default role
    ...additionalData,
  };

  try {
    // Directly set the document. Firestore's setDoc is idempotent.
    await setDoc(userRef, profileData, { merge: true });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw new Error("Could not create user profile.");
  }
}

/**
 * Retrieves a user's profile from Firestore.
 * @param uid The user's unique ID.
 * @returns The user profile object, or null if not found.
 */
export async function getUserProfile(uid: string): Promise<User | null> {
  const userRef = doc(db, 'users', uid);
  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data() as User;
    } else {
      console.warn(`No user profile found for UID: ${uid}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Could not fetch user profile.");
  }
}
