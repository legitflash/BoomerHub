
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';
import type { Post } from '@/lib/types';

// This is a simplified version of what a Post object might look like for creation.
// In a real app, you'd likely have a more robust validation schema (e.g., using Zod).
type CreatePostData = {
    title: string;
    description: string;
    category: string;
    image: string;
    content: string;
    author: string;
};

// Function to create a new post in Firestore
export async function createPost(postData: CreatePostData): Promise<string> {
  try {
    const postsCollection = collection(db, 'posts');
    
    const authorImage = `https://i.pravatar.cc/40?u=${postData.author}`;

    const docRef = await addDoc(postsCollection, {
      ...postData,
      authorImage: authorImage,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
       // A simple slug generation. A more robust solution might handle special characters better.
      slug: postData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      dataAiHint: 'article content', // Placeholder AI hint
    });

    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error('Could not create post in database.');
  }
}

// Function to fetch all posts from Firestore
export async function getAllPosts(): Promise<Post[]> {
  try {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, orderBy('createdAt', 'desc')); // Order by most recent
    const querySnapshot = await getDocs(q);

    const posts: Post[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        slug: data.slug,
        title: data.title,
        category: data.category,
        description: data.description,
        image: data.image,
        dataAiHint: data.dataAiHint,
        author: data.author,
        authorImage: data.authorImage,
        // Convert Firestore Timestamp to a simple date string if necessary
        date: data.createdAt?.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) || new Date().toLocaleDateString(),
      };
    });

    return posts;
  } catch (error) {
    console.error("Error getting documents: ", error);
    // Return an empty array in case of an error to prevent the app from crashing.
    return [];
  }
}
