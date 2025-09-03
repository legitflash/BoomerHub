
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, doc, getDoc, where, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Post } from '@/lib/types';
import { getAllTeamMembers } from './team-service';
import { createNotificationForFollowers } from './notification-service';

// This is a simplified version of what a Post object might look like for creation.
// In a real app, you'd likely have a more robust validation schema (e.g., using Zod).
type CreatePostData = {
    title: string;
    description: string;
    category: string;
    image: string;
    content: string;
    author: string;
    keywords?: string;
};

type UpdatePostData = Partial<CreatePostData>;

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w-]+/g, '')    // Remove all non-word chars
    .replace(/--+/g, '-')       // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}


// Function to create a new post in Firestore
export async function createPost(postData: CreatePostData): Promise<string> {
  try {
    const postsCollection = collection(db, 'posts');
    const teamMembers = await getAllTeamMembers();
    const authorData = teamMembers.find(member => member.name === postData.author);
    
    const authorImage = authorData ? authorData.image : `https://i.pravatar.cc/40?u=${postData.author}`;
    const authorSlug = authorData ? authorData.slug : slugify(postData.author);
    const postSlug = slugify(postData.title);

    const docRef = await addDoc(postsCollection, {
      ...postData,
      authorImage: authorImage,
      authorSlug: authorSlug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      slug: postSlug,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      dataAiHint: 'article content', // Placeholder AI hint
    });

    console.log("Document written with ID: ", docRef.id);

    // After post is created, create notifications for followers of the category
    const categorySlug = slugify(postData.category);
    await createNotificationForFollowers(categorySlug, docRef.id, postData.title);


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
        authorSlug: data.authorSlug || slugify(data.author),
        authorImage: data.authorImage,
        keywords: data.keywords,
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
        authorSlug: data.authorSlug || slugify(data.author),
        authorImage: data.authorImage,
        keywords: data.keywords,
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
      authorSlug: data.authorSlug || slugify(data.author),
      authorImage: data.authorImage,
      keywords: data.keywords,
      date: data.createdAt?.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) || new Date().toLocaleDateString(),
    };
  } catch (error) {
    console.error("Error getting document by slug: ", error);
    return null;
  }
}

export async function getPostsByAuthorSlug(authorSlug: string): Promise<Post[]> {
  try {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, where('authorSlug', '==', authorSlug), orderBy('createdAt', 'desc'));
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
        authorSlug: data.authorSlug,
        authorImage: data.authorImage,
        keywords: data.keywords,
        date: data.createdAt?.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) || new Date().toLocaleDateString(),
      };
    });

    return posts;
  } catch (error) {
    console.error("Error getting posts by author: ", error);
    return [];
  }
}

// Function to update a post in Firestore
export async function updatePost(id: string, postData: UpdatePostData): Promise<void> {
  try {
    const postDocRef = doc(db, 'posts', id);
    const teamMembers = await getAllTeamMembers();
    const authorData = teamMembers.find(member => member.name === postData.author);

    const newSlug = postData.title ? slugify(postData.title) : undefined;
    
    const dataToUpdate: any = {
      ...postData,
      updatedAt: serverTimestamp(),
    };

    if (authorData) {
      dataToUpdate.authorImage = authorData.image;
      dataToUpdate.authorSlug = authorData.slug;
    }
    
    if (newSlug) {
      dataToUpdate.slug = newSlug;
    }
    
    await updateDoc(postDocRef, dataToUpdate);
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
