
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
