import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import type { CourseProgress } from '@/lib/types';

const USERS_COLLECTION = 'users';

export async function getProgressForUser(userId: string): Promise<CourseProgress | null> {
    try {
        const progressDocRef = doc(db, USERS_COLLECTION, userId);
        const docSnap = await getDoc(progressDocRef);

        if (docSnap.exists()) {
            return docSnap.data().courses as CourseProgress;
        } else {
            // No progress document exists yet for this user
            return null;
        }
    } catch (error) {
        console.error("Error fetching user progress:", error);
        return null;
    }
}

export async function updateProgress(userId: string, courseId: string, progress: number, completedLessons: string[]) {
    try {
        const progressDocRef = doc(db, USERS_COLLECTION, userId);
        const docSnap = await getDoc(progressDocRef);

        const newProgressData = {
            [courseId]: {
                progress,
                completedLessons
            }
        };

        if (docSnap.exists()) {
            // Document exists, update it by merging
            await updateDoc(progressDocRef, {
                courses: { ...docSnap.data().courses, ...newProgressData }
            });
        } else {
            // Document does not exist, create it
            await setDoc(progressDocRef, {
                courses: newProgressData
            });
        }
    } catch (error) {
        console.error("Error updating progress:", error);
    }
}
