
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, doc, getDoc, addDoc, serverTimestamp, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import type { Prediction } from '@/lib/types';
import { format, toDate } from 'date-fns';

type CreatePredictionData = Omit<Prediction, 'id'>;
type UpdatePredictionData = Partial<CreatePredictionData>;

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

export async function getAllPredictions(): Promise<Prediction[]> {
  try {
    const predictionsCollection = collection(db, 'predictions');
    const q = query(predictionsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const predictions: Prediction[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const matchDate = data.matchDate ? toDate(new Date(data.matchDate)) : null;

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
        analysis: data.analysis,
        matchDate: matchDate ? format(matchDate, 'PPP') : undefined,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      };
    });

    return predictions;
  } catch (error) {
    console.error("Error getting predictions: ", error);
    return [];
  }
}

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
        league: data.league,
        match: data.match,
        prediction: data.prediction,
        correctScore: data.correctScore,
        odds: data.odds,
        confidence: data.confidence,
        status: data.status,
        isHot: data.isHot,
        teams: data.teams,
        analysis: data.analysis,
        matchDate: data.matchDate,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
    } as Prediction;
  } catch (error) {
    console.error("Error getting prediction by ID:", error);
    throw new Error('Could not retrieve prediction from database.');
  }
}

export async function updatePrediction(id: string, predictionData: UpdatePredictionData): Promise<void> {
  try {
    const predictionDocRef = doc(db, 'predictions', id);
    await updateDoc(predictionDocRef, { ...predictionData, updatedAt: serverTimestamp() });
  } catch (error) {
    console.error("Error updating prediction: ", error);
    throw new Error('Could not update prediction in database.');
  }
}

export async function deletePrediction(id: string): Promise<void> {
  try {
    const predictionDocRef = doc(db, 'predictions', id);
    await deleteDoc(predictionDocRef);
  } catch (error) {
    console.error("Error deleting prediction: ", error);
    throw new Error('Could not delete prediction from database.');
  }
}
