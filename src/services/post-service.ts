
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, doc, getDoc, where, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Post } from '@/lib/types';
import { getAllTeamMembers } from './team-service';

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

type UpdatePostData = CreatePostData;

// Function to create a new post in Firestore
export async function createPost(postData: CreatePostData): Promise<string> {
  try {
    console.log("New generated articles are available at src/lib/generated-articles/. To create the post, go to the admin panel, click 'Create New Post', and copy the content from the relevant file into the 'Main Content' field.");
    const postsCollection = collection(db, 'posts');
    const teamMembers = await getAllTeamMembers();
    const authorData = teamMembers.find(member => member.name === postData.author);
    
    const authorImage = authorData ? authorData.image : `https://i.pravatar.cc/40?u=${postData.author}`;

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
        content: data.content,
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

// Function to fetch a single post by its ID
export async function getPostById(id: string): Promise<Post | null> {
  try {
    const postDocRef = doc(db, 'posts', id);
    const docSnap = await getDoc(postDocRef);

    if (!docSnap.exists()) {
      console.log("No such document!");
      return null;
    }

    const data = docSnap.data();
    return {
        id: docSnap.id,
        slug: data.slug,
        title: data.title,
        category: data.category,
        description: data.description,
        content: data.content,
        image: data.image,
        dataAiHint: data.dataAiHint,
        author: data.author,
        authorImage: data.authorImage,
        date: data.createdAt?.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) || new Date().toLocaleDateString(),
    };
  } catch (error) {
    console.error("Error getting post by ID:", error);
    throw new Error('Could not retrieve post from database.');
  }
}


// Function to fetch a single post by its slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      slug: data.slug,
      title: data.title,
      category: data.category,
      description: data.description,
      content: data.content,
      image: data.image,
      dataAiHint: data.dataAiHint,
      author: data.author,
      authorImage: data.authorImage,
      date: data.createdAt?.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) || new Date().toLocaleDateString(),
    };
  } catch (error) {
    console.error("Error getting document by slug: ", error);
    return null;
  }
}

// Function to update a post in Firestore
export async function updatePost(id: string, postData: UpdatePostData): Promise<void> {
  try {
    const postDocRef = doc(db, 'posts', id);
    const teamMembers = await getAllTeamMembers();
    const authorData = teamMembers.find(member => member.name === postData.author);

    const newSlug = postData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    await updateDoc(postDocRef, {
      ...postData,
      authorImage: authorData ? authorData.image : `https://i.pravatar.cc/40?u=${postData.author}`,
      slug: newSlug,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating post: ", error);
    throw new Error('Could not update post in database.');
  }
}

// Function to delete a post from Firestore
export async function deletePost(id: string): Promise<void> {
  try {
    const postDocRef = doc(db, 'posts', id);
    await deleteDoc(postDocRef);
  } catch (error) {
    console.error("Error deleting post: ", error);
    throw new Error('Could not delete post from database.');
  }
}
