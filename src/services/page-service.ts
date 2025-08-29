
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, doc, getDoc, where } from 'firebase/firestore';
import type { Page } from '@/lib/types';

type CreatePageData = {
    title: string;
    content: string;
};

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

export async function createPage(pageData: CreatePageData): Promise<string> {
  try {
    const pagesCollection = collection(db, 'pages');
    
    const docRef = await addDoc(pagesCollection, {
      ...pageData,
      slug: slugify(pageData.title),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("Page created with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating page: ", error);
    throw new Error('Could not create page in database.');
  }
}

export async function getAllPages(): Promise<Page[]> {
  try {
    const pagesCollection = collection(db, 'pages');
    const q = query(pagesCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const pages: Page[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'N/A';
      return {
        id: doc.id,
        ...data,
        createdAt,
      } as Page;
    });

    return pages;
  } catch (error) {
    console.error("Error getting pages: ", error);
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    // Exclude known routes that have their own dedicated pages
    const excludedSlugs = ['about', 'contact', 'admin', 'blog'];
    if (excludedSlugs.includes(slug) || slug.startsWith('ai/') || slug.startsWith('admin/')) {
        return null;
    }

    const pagesCollection = collection(db, 'pages');
    const q = query(pagesCollection, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      ...data
    } as Page;
  } catch (error) {
    console.error("Error getting page by slug: ", error);
    return null;
  }
}
