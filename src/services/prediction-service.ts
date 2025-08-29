
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, doc, getDoc, addDoc, serverTimestamp, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import type { Prediction } from '@/lib/types';
import { predictions as staticPredictions } from '@/lib/data'; // For one-time seeding

type CreatePredictionData = Omit<Prediction, 'id'>;
type UpdatePredictionData = Partial<CreatePredictionData>;


// Function to seed initial data from static file to Firestore.
// This should only be run once.
export async function seedPredictions(): Promise<void> {
  const predictionsCollection = collection(db, 'predictions');
  const snapshot = await getDocs(query(predictionsCollection));

  // Only seed if the collection is empty
  if (!snapshot.empty) {
    // console.log("Predictions collection already exists. Skipping seed.");
    return;
  }

  console.log("Seeding initial predictions...");
  const batch = writeBatch(db);
  staticPredictions.forEach((prediction) => {
    const { id, ...predictionData } = prediction; // Exclude the old static ID
    const docRef = doc(collection(db, 'predictions'));
    batch.set(docRef, { ...predictionData, createdAt: serverTimestamp() });
  });

  try {
    await batch.commit();
    console.log("Successfully seeded predictions.");
  } catch (error) {
    console.error("Error seeding predictions: ", error);
  }
}

// Ensure seeding is attempted when the service is loaded
// In a real app, you might run this as a separate deployment script.
seedPredictions();


// Function to create a new prediction in Firestore
export async function createPrediction(predictionData: CreatePredictionData): Promise<string> {
  try {
    const predictionsCollection = collection(db, 'predictions');
    const docRef = await addDoc(predictionsCollection, {
      ...predictionData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding prediction: ", error);
    throw new Error('Could not create prediction in database.');
  }
}

// Function to fetch all predictions from Firestore
export async function getAllPredictions(): Promise<Prediction[]> {
  try {
    const predictionsCollection = collection(db, 'predictions');
    const q = query(predictionsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const predictions: Prediction[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        league: data.league,
        match: data.match,
        prediction: data.prediction,
        correctScore: data.correctScore,
        odds: data.odds,
        confidence: data.confidence,
        status: data.status,
        isHot: data.isHot,
        teams: data.teams,
      };
    });

    return predictions;
  } catch (error) {
    console.error("Error getting predictions: ", error);
    return [];
  }
}

// Function to fetch a single prediction by its ID
export async function getPredictionById(id: string): Promise<Prediction | null> {
  try {
    const predictionDocRef = doc(db, 'predictions', id);
    const docSnap = await getDoc(predictionDocRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
        id: docSnap.id,
        ...data
    } as Prediction;
  } catch (error) {
    console.error("Error getting prediction by ID:", error);
    throw new Error('Could not retrieve prediction from database.');
  }
}


// Function to update a prediction in Firestore
export async function updatePrediction(id: string, predictionData: UpdatePredictionData): Promise<void> {
  try {
    const predictionDocRef = doc(db, 'predictions', id);
    await updateDoc(predictionDocRef, {
      ...predictionData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating prediction: ", error);
    throw new Error('Could not update prediction in database.');
  }
}

// Function to delete a prediction from Firestore
export async function deletePrediction(id: string): Promise<void> {
  try {
    const predictionDocRef = doc(db, 'predictions', id);
    await deleteDoc(predictionDocRef);
  } catch (error) {
    console.error("Error deleting prediction: ", error);
    throw new Error('Could not delete prediction from database.');
  }
}
