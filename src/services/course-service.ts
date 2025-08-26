import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, setDoc, writeBatch } from 'firebase/firestore';
import type { Course } from '@/lib/types';
import { courses as staticCourses } from '@/lib/data'; // To seed data

const COURSES_COLLECTION = 'courses';

// Function to seed the database one time with static data
async function seedCourses() {
    const coursesRef = collection(db, COURSES_COLLECTION);
    const snapshot = await getDocs(coursesRef);

    if (snapshot.empty) {
        console.log('Courses collection is empty. Seeding data...');
        const batch = writeBatch(db);
        staticCourses.forEach((course) => {
            const docRef = doc(db, COURSES_COLLECTION, course.slug);
            batch.set(docRef, course);
        });
        await batch.commit();
        console.log('Courses data seeded successfully.');
    } else {
        console.log('Courses collection already has data. Skipping seed.');
    }
}

// Seed the data when the app starts
seedCourses().catch(console.error);


export async function getCourses(): Promise<Course[]> {
  const coursesCollection = collection(db, COURSES_COLLECTION);
  const snapshot = await getDocs(coursesCollection);
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
    try {
        const courseDocRef = doc(db, COURSES_COLLECTION, slug);
        const docSnap = await getDoc(courseDocRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Course;
        } else {
            console.log("No such course found!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching course by slug:", error);
        return null;
    }
}
