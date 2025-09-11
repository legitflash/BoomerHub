
'use server';

import type { Page } from '@/lib/types';
import { client } from '@/lib/sanity-client';
import { format } from 'date-fns';

const pageFields = `
  _id,
  title,
  "slug": slug.current,
  content,
  _createdAt,
  _updatedAt
`;

function formatPage(page: any): Page {
    return {
        id: page._id,
        title: page.title,
        slug: page.slug,
        content: page.content,
        createdAt: format(new Date(page._createdAt), 'PPP'),
        updatedAt: format(new Date(page._updatedAt), 'PPP'),
    };
}


export async function getPageBySlug(slug: string): Promise<Page | null> {
    const excludedSlugs = ['about', 'contact', 'admin', 'blog', 'privacy-policy', 'terms-of-use', 'advertise-with-us', 'write-for-us', 'login', 'signup', 'profile'];
    if (excludedSlugs.includes(slug) || slug.startsWith('ai/') || slug.startsWith('admin/')) {
        return null;
    }
    
    const query = `*[_type == "page" && slug.current == $slug][0] {
        ${pageFields}
    }`;
    
    const page = await client.fetch(query, { slug });

    if (!page) return null;
    
    return formatPage(page);
}

// Deprecated functions
export async function createPage(pageData: Omit<Page, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<string> {
    console.warn("createPage is deprecated. Please use Sanity Studio.");
    return '';
}

export async function getAllPages(): Promise<Page[]> {
    const query = `*[_type == "page"] { ${pageFields} }`;
    const results = await client.fetch(query);
    return results.map(formatPage);
}

export async function deletePage(id: string): Promise<void> {
    console.warn("deletePage is deprecated. Please use Sanity Studio.");
}
