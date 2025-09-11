
'use server';

import type { Page } from '@/lib/types';

let pages: Page[] = [];

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

export async function createPage(pageData: Omit<Page, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const newPage: Page = {
        id: String(pages.length + 1),
        slug: slugify(pageData.title),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...pageData,
    };
    pages.push(newPage);
    return newPage.id;
}

export async function getAllPages(): Promise<Page[]> {
  return pages.map(page => ({
      ...page,
      createdAt: page.createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      updatedAt: page.updatedAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  }));
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
    const excludedSlugs = ['about', 'contact', 'admin', 'blog', 'privacy-policy', 'terms-of-use', 'advertise-with-us', 'write-for-us', 'login', 'signup', 'profile'];
    if (excludedSlugs.includes(slug) || slug.startsWith('ai/') || slug.startsWith('admin/')) {
        return null;
    }
    const page = pages.find(p => p.slug === slug);
    if (!page) return null;
    return {
        ...page,
        createdAt: page.createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        updatedAt: page.updatedAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
}

export async function deletePage(id: string): Promise<void> {
    pages = pages.filter(p => p.id !== id);
}
