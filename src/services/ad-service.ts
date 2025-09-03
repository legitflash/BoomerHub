
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, where, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import type { Advertisement } from '@/lib/types';

type CreateAdvertisementData = Omit<Advertisement, 'id'>;
type UpdateAdvertisementData = Partial<CreateAdvertisementData>;

export async function createAdvertisement(adData: CreateAdvertisementData): Promise<string> {
  try {
    const adsCollection = collection(db, 'advertisements');
    const docRef = await addDoc(adsCollection, {
      ...adData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating advertisement: ", error);
    throw new Error('Could not create advertisement in database.');
  }
}

export async function getAllAdvertisements(): Promise<Advertisement[]> {
  try {
    const adsCollection = collection(db, 'advertisements');
    const q = query(adsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const ads: Advertisement[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        placement: data.placement,
        isActive: data.isActive,
        createdAt: data.createdAt?.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) || 'N/A',
      };
    });

    return ads;
  } catch (error) {
    console.error("Error getting advertisements: ", error);
    return [];
  }
}

export async function getActiveAdvertisementsByPlacement(placement: Advertisement['placement']): Promise<Advertisement[]> {
    try {
        const adsCollection = collection(db, 'advertisements');
        const q = query(adsCollection, where('placement', '==', placement), where('isActive', '==', true), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const ads: Advertisement[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                content: data.content,
                placement: data.placement,
                isActive: data.isActive,
            };
        });
        return ads;
    } catch (error) {
        console.error(`Error getting active ads for placement ${placement}:`, error);
        return [];
    }
}


export async function getAdvertisementById(id: string): Promise<Advertisement | null> {
  try {
    const adDocRef = doc(db, 'advertisements', id);
    const docSnap = await getDoc(adDocRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
        id: docSnap.id,
        title: data.title,
        content: data.content,
        placement: data.placement,
        isActive: data.isActive,
        createdAt: data.createdAt?.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) || 'N/A',
    } as Advertisement;
  } catch (error) {
    console.error("Error getting advertisement by ID:", error);
    throw new Error('Could not retrieve advertisement from database.');
  }
}

export async function updateAdvertisement(id: string, adData: UpdateAdvertisementData): Promise<void> {
  try {
    const adDocRef = doc(db, 'advertisements', id);
    const dataToUpdate: any = { ...adData, updatedAt: serverTimestamp() };
    await updateDoc(adDocRef, dataToUpdate);
  } catch (error) {
    console.error("Error updating advertisement: ", error);
    throw new Error('Could not update advertisement in database.');
  }
}

export async function deleteAdvertisement(id: string): Promise<void> {
  try {
    const adDocRef = doc(db, 'advertisements', id);
    await deleteDoc(adDocRef);
  } catch (error) {
    console.error("Error deleting advertisement: ", error);
    throw new Error('Could not delete advertisement from database.');
  }
}
