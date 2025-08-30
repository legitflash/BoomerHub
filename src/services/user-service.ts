
'use server';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';

// This is a simplified representation of a user in your 'users' collection
interface UserRoleInfo {
    uid: string;
    email: string;
    role: 'admin' | 'editor' | 'member';
}

/**
 * Finds a user's UID by their email address by querying the 'users' collection.
 * IMPORTANT: This assumes you have a 'users' collection where each document ID is the user's UID,
 * and each document contains an 'email' field.
 * This is NOT querying Firebase Auth directly.
 * @param email The email of the user to find.
 * @returns The user's information including UID, or null if not found.
 */
export async function findUserByEmail(email: string): Promise<{ uid: string, email: string } | null> {
    try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const userDoc = querySnapshot.docs[0];
        return {
            uid: userDoc.id,
            email: userDoc.data().email,
        };
    } catch (error) {
        console.error("Error finding user by email:", error);
        throw new Error('Could not search for user in the database.');
    }
}

/**
 * Updates a user's role in the 'users' collection in Firestore.
 * @param uid The UID of the user to update.
 * @param role The new role to assign ('admin', 'editor', or 'member').
 */
export async function updateUserRole(uid: string, role: 'admin' | 'editor' | 'member'): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', uid);
    // Use setDoc with merge: true to create the document if it doesn't exist,
    // or update it if it does.
    await setDoc(userDocRef, { role: role }, { merge: true });
    console.log(`Successfully updated role for user ${uid} to ${role}`);
  } catch (error) {
    console.error("Error updating user role: ", error);
    throw new Error('Could not update user role in the database.');
  }
}
