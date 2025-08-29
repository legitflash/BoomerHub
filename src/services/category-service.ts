
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, doc, getDoc, addDoc, serverTimestamp, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import type { BlogCategory } from '@/lib/types';
import { blogCategories as staticCategories } from '@/lib/data';

type CreateCategoryData = Omit<BlogCategory, 'id' | 'slug'>;
type UpdateCategoryData = Partial<CreateCategoryData>;

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

async function seedCategories(): Promise<void> {
  const categoriesCollection = collection(db, 'categories');
  const snapshot = await getDocs(query(categoriesCollection));

  if (!snapshot.empty) {
    return;
  }

  console.log("Seeding initial categories...");
  const batch = writeBatch(db);
  staticCategories.forEach((category) => {
    const docRef = doc(collection(db, 'categories'));
    batch.set(docRef, { ...category, createdAt: serverTimestamp() });
  });

  try {
    await batch.commit();
    console.log("Successfully seeded categories.");
  } catch (error) {
    console.error("Error seeding categories: ", error);
  }
}

seedCategories();

export async function createCategory(categoryData: CreateCategoryData): Promise<string> {
  try {
    const categoriesCollection = collection(db, 'categories');
    const slug = slugify(categoryData.name);
    const docRef = await addDoc(categoriesCollection, {
      ...categoryData,
      slug,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding category: ", error);
    throw new Error('Could not create category in database.');
  }
}

export async function getAllCategories(): Promise<BlogCategory[]> {
  try {
    const categoriesCollection = collection(db, 'categories');
    const q = query(categoriesCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const categories: BlogCategory[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        slug: data.slug,
        iconName: data.iconName,
      };
    });

    return categories;
  } catch (error) {
    console.error("Error getting categories: ", error);
    return [];
  }
}

export async function getCategoryById(id: string): Promise<BlogCategory | null> {
  try {
    const categoryDocRef = doc(db, 'categories', id);
    const docSnap = await getDoc(categoryDocRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
        id: docSnap.id,
        ...data
    } as BlogCategory;
  } catch (error) {
    console.error("Error getting category by ID:", error);
    throw new Error('Could not retrieve category from database.');
  }
}

export async function updateCategory(id: string, categoryData: UpdateCategoryData): Promise<void> {
  try {
    const categoryDocRef = doc(db, 'categories', id);
    const slug = categoryData.name ? slugify(categoryData.name) : undefined;
    
    const dataToUpdate: any = { ...categoryData, updatedAt: serverTimestamp() };
    if (slug) {
      dataToUpdate.slug = slug;
    }
    
    await updateDoc(categoryDocRef, dataToUpdate);
  } catch (error) {
    console.error("Error updating category: ", error);
    throw new Error('Could not update category in database.');
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    const categoryDocRef = doc(db, 'categories', id);
    await deleteDoc(categoryDocRef);
  } catch (error) {
    console.error("Error deleting category: ", error);
    throw new Error('Could not delete category from database.');
  }
}
