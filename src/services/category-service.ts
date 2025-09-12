
'use server';

import type { BlogCategory } from '@/lib/types';
import { client } from '@/lib/sanity-client';

const categoryFields = `
  _id,
  name,
  "slug": slug.current,
  iconName
`;

function formatCategory(category: any): BlogCategory {
    return {
        id: category._id,
        name: category.name,
        slug: category.slug,
        iconName: category.iconName || 'DollarSign', // Default icon
    };
}

export async function getAllCategories(): Promise<BlogCategory[]> {
    const query = `*[_type == "category"] | order(name asc) {
        ${categoryFields}
    }`;
    const results = await client.fetch(query);
    return results.map(formatCategory);
}

export async function getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    const query = `*[_type == "category" && slug.current == $slug][0] {
        ${categoryFields}
    }`;
    const result = await client.fetch(query, { slug });
    return result ? formatCategory(result) : null;
}


// Deprecated functions
export async function createCategory(categoryData: Omit<BlogCategory, 'id' | 'slug'>): Promise<string> {
    console.warn("createCategory is deprecated. Please use Sanity Studio.");
    return '';
}

export async function updateCategory(id: string, categoryData: Partial<Omit<BlogCategory, 'id' | 'slug'>>): Promise<void> {
    console.warn("updateCategory is deprecated. Please use Sanity Studio.");
}

export async function deleteCategory(id: string): Promise<void> {
    console.warn("deleteCategory is deprecated. Please use Sanity Studio.");
}
