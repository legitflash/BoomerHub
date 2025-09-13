
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
    if (!page) return null as any;
    return {
        id: page._id,
        title: page.title,
        slug: page.slug,
        content: page.content,
        createdAt: format(new Date(page._createdAt), 'PPP'),
        updatedAt: page._updatedAt, // Pass raw date for sitemap
    };
}


export async function getPageBySlug(slug: string): Promise<Page | null> {
    // These slugs are handled by dedicated pages in the app directory, not the generic page renderer.
    // This prevents a page created in Sanity from overriding a core application route.
    const excludedSlugs = [
        'about', 'contact', 'admin', 'blog', 'search',
        'advertise-with-us', 'write-for-us',
        'privacy-policy', 'terms-of-use'
    ];
    
    if (excludedSlugs.includes(slug) || slug.startsWith('ai/') || slug.startsWith('admin/') || slug.startsWith('blog/')) {
        return null;
    }
    
    const query = `*[_type == "page" && slug.current == $slug][0] {
        ${pageFields}
    }`;
    
    const page = await client.fetch(query, { slug });

    if (!page) return null;
    
    return formatPage(page);
}

export async function getAllPages(): Promise<Page[]> {
    const query = `*[_type == "page"] { ${pageFields} }`;
    const results = await client.fetch(query);
    return results.map(formatPage).filter(Boolean);
}

// Deprecated functions
export async function createPage(pageData: Omit<Page, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<string> {
    console.warn("createPage is deprecated. Please use Sanity Studio.");
    return '';
}

export async function deletePage(id: string): Promise<void> {
    console.warn("deletePage is deprecated. Please use Sanity Studio.");
}
