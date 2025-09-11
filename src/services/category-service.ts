
'use server';

import type { BlogCategory } from '@/lib/types';
import { blogCategories as staticCategories } from '@/lib/data';

let categories: BlogCategory[] = staticCategories.map((c, i) => ({
    id: String(i + 1),
    ...c
}));

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export async function createCategory(categoryData: Omit<BlogCategory, 'id' | 'slug'>): Promise<string> {
    const newCategory: BlogCategory = {
        id: String(categories.length + 1),
        slug: slugify(categoryData.name),
        ...categoryData,
    };
    categories.push(newCategory);
    return newCategory.id;
}

export async function getAllCategories(): Promise<BlogCategory[]> {
    return categories;
}

export async function getCategoryById(id: string): Promise<BlogCategory | null> {
    return categories.find(c => c.id === id) || null;
}

export async function updateCategory(id: string, categoryData: Partial<Omit<BlogCategory, 'id' | 'slug'>>): Promise<void> {
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
        categories[index] = { ...categories[index], ...categoryData };
        if (categoryData.name) {
            categories[index].slug = slugify(categoryData.name);
        }
    }
}

export async function deleteCategory(id: string): Promise<void> {
    categories = categories.filter(c => c.id !== id);
}
