
'use server';

import type { Post } from '@/lib/types';
import { client, urlFor } from '@/lib/sanity-client';
import { format } from 'date-fns';

const postFields = `
  _id,
  title,
  "slug": slug.current,
  "category": category->name,
  "categorySlug": category->slug.current,
  description,
  content,
  "image": mainImage,
  "dataAiHint": mainImage.aiHint,
  "author": author->name,
  "authorSlug": author->slug.current,
  "authorImage": author->image,
  "date": publishedAt,
  keywords
`;

function formatPost(post: any): Post {
    return {
        id: post._id,
        title: post.title,
        slug: post.slug,
        category: post.category,
        categorySlug: post.categorySlug,
        description: post.description,
        content: post.content,
        image: urlFor(post.image).width(600).height(400).url(),
        dataAiHint: post.dataAiHint || 'article image',
        author: post.author,
        authorSlug: post.authorSlug,
        authorImage: post.authorImage ? urlFor(post.authorImage).width(40).height(40).url() : undefined,
        date: format(new Date(post.date), 'PPP'),
        rawDate: post.date, // Pass the raw date string
        keywords: post.keywords?.join(', ') || '',
    };
}

export async function getAllPosts(): Promise<Post[]> {
    const query = `*[_type == "post"] | order(publishedAt desc) {
        ${postFields}
    }`;
    const results = await client.fetch(query);
    return results.map(formatPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const query = `*[_type == "post" && slug.current == $slug][0] {
        ${postFields}
    }`;
    const result = await client.fetch(query, { slug });
    return result ? formatPost(result) : null;
}

export async function getPostsByAuthorSlug(authorSlug: string): Promise<Post[]> {
    const query = `*[_type == "post" && author->slug.current == $authorSlug] | order(publishedAt desc) {
        ${postFields}
    }`;
    const results = await client.fetch(query, { authorSlug });
    return results.map(formatPost);
}

// These functions below are no longer used for fetching but might be adapted for mutations if needed.
// For now, they will do nothing as content is managed in Sanity Studio.

export async function createPost(postData: Partial<Post>): Promise<string> {
    console.warn("createPost is deprecated. Please use Sanity Studio.");
    return '';
}

export async function updatePost(id: string, postData: Partial<Post>): Promise<void> {
    console.warn("updatePost is deprecated. Please use Sanity Studio.");
}

export async function deletePost(id: string): Promise<void> {
    console.warn("deletePost is deprecated. Please use Sanity Studio.");
}

export async function getPostById(id: string): Promise<Post | null> {
    const query = `*[_type == "post" && _id == $id][0] {
        ${postFields}
    }`;
    const result = await client.fetch(query, { id });
    return result ? formatPost(result) : null;
}
