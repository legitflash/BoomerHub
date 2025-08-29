
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';
import type { Submission } from '@/lib/types';

type CreateSubmissionData = Omit<Submission, 'id' | 'createdAt'>;

export async function createSubmission(submissionData: CreateSubmissionData): Promise<string> {
  try {
    const submissionsCollection = collection(db, 'submissions');
    const docRef = await addDoc(submissionsCollection, {
      ...submissionData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating submission: ", error);
    throw new Error('Could not create submission in database.');
  }
}

export async function getAllSubmissions(): Promise<Submission[]> {
  try {
    const submissionsCollection = collection(db, 'submissions');
    const q = query(submissionsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const submissions: Submission[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        type: data.type,
        companyName: data.companyName,
        portfolioLink: data.portfolioLink,
        socialProfileLink: data.socialProfileLink,
        createdAt: data.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || 'N/A',
      };
    });

    return submissions;
  } catch (error) {
    console.error("Error getting submissions: ", error);
    return [];
  }
}
