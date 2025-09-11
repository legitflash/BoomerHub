
'use server';

import type { Post } from '@/lib/types';
import { getAllTeamMembers } from './team-service';

let posts: Post[] = [];
let teamMembers: any[] = [];
let initialized = false;

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

async function initializeData() {
    if (initialized) return;

    teamMembers = await getAllTeamMembers();
    
    const author1 = teamMembers.find(m => m.name === 'John Makola') || teamMembers[0];
    const author2 = teamMembers.find(m => m.name === 'Jane Smith') || teamMembers[1];

    posts = [
        {
          id: '1',
          slug: 'how-i-made-my-first-100-online-in-a-month',
          title: 'How I Made My First $100 Online In a Month',
          category: 'GetPaidTo',
          description: 'A step-by-step case study on earning your first $100 online using Get-Paid-To apps, with a detailed breakdown of the strategy and results.',
          content: 'Article content has been removed.',
          image: 'https://picsum.photos/seed/online-earnings/600/400',
          dataAiHint: 'man working laptop',
          author: author1.name,
          authorSlug: author1.slug,
          authorImage: author1.image,
          date: '2024-07-20',
          keywords: 'get paid to, make money online, side hustle, swagbucks, prolific, freecash'
        },
        {
          id: '2',
          slug: '5-apps-that-let-you-earn-passive-income-from-your-phone',
          title: '5 Apps That Let You Earn Passive Income From Your Phone',
          category: 'App/Web Reviews',
          description: 'Discover the best mobile apps that allow you to earn rewards and passive income with minimal effort, perfect for monetizing your downtime.',
          content: 'Article content has been removed.',
          image: 'https://picsum.photos/seed/passive-income-apps/600/400',
          dataAiHint: 'woman using phone',
          author: author2.name,
          authorSlug: author2.slug,
          authorImage: author2.image,
          date: '2024-07-18',
          keywords: 'passive income, mobile apps, earn money, swagbucks, mistplay, google opinion rewards'
        },
        {
          id: '3',
          slug: 'forex-trading-for-beginners-a-5-step-guide',
          title: 'Forex Trading for Beginners: A 5-Step Guide',
          category: 'Finance',
          description: 'A simple, actionable 5-step guide to help beginners start their Forex trading journey, from education and choosing a broker to practicing with a demo account.',
          content: 'Article content has been removed.',
          image: 'https://picsum.photos/seed/forex-trading/600/400',
          dataAiHint: 'forex chart',
          author: author1.name,
          authorSlug: author1.slug,
          authorImage: author1.image,
          date: '2024-07-15',
          keywords: 'forex, trading, beginners guide, investing, finance'
        },
        {
            id: '4',
            slug: 'best-countries-to-visit-in-2025',
            title: 'Best Countries to Visit in 2025',
            category: 'Travel',
            description: 'Explore the top travel destinations for 2025, from the vibrant culture of Cameroon to the eco-friendly landscapes of Lithuania, as recommended by top travel experts.',
            content: 'Article content has been removed.',
            image: 'https://picsum.photos/seed/travel-destinations/600/400',
            dataAiHint: 'beautiful landscape',
            author: author2.name,
            authorSlug: author2.slug,
            authorImage: author2.image,
            date: '2024-07-12',
            keywords: 'travel, 2025 destinations, Cameroon, Lithuania, Fiji, Laos'
        },
        {
            id: '5',
            slug: 'top-10-richest-men-in-nigeria-and-their-travel-lifestyle',
            title: 'Top 10 Richest Men in Nigeria & Their Travel Lifestyle',
            category: 'Top 10s',
            description: 'A look into the luxurious travel habits of Nigeria\'s wealthiest individuals, from private jets and superyachts to exclusive vacations in the Mediterranean and beyond.',
            content: 'Article content has been removed.',
            image: 'https://picsum.photos/seed/luxury-lifestyle/600/400',
            dataAiHint: 'private jet',
            author: author1.name,
            authorSlug: author1.slug,
            authorImage: author1.image,
            date: '2024-07-10',
            keywords: 'richest men, Nigeria, luxury travel, Aliko Dangote, Mike Adenuga, Femi Otedola'
        }
    ];

    initialized = true;
}

export async function createPost(postData: Partial<Post>): Promise<string> {
    await initializeData();
    const newPost: Post = {
        id: String(posts.length + 1),
        slug: postData.slug || slugify(postData.title || ''),
        title: postData.title || '',
        category: postData.category || '',
        description: postData.description || '',
        content: postData.content || '',
        image: postData.image || '',
        dataAiHint: postData.dataAiHint || 'article content',
        author: postData.author || '',
        authorSlug: postData.authorSlug || slugify(postData.author || ''),
        authorImage: postData.authorImage || '',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        keywords: postData.keywords || '',
    };
    posts.unshift(newPost);
    return newPost.id!;
}

export async function getAllPosts(): Promise<Post[]> {
    await initializeData();
    return posts;
}

export async function getPostById(id: string): Promise<Post | null> {
    await initializeData();
    return posts.find(p => p.id === id) || null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    await initializeData();
    return posts.find(p => p.slug === slug) || null;
}

export async function getPostsByAuthorSlug(authorSlug: string): Promise<Post[]> {
    await initializeData();
    return posts.filter(p => p.authorSlug === authorSlug);
}

export async function updatePost(id: string, postData: Partial<Post>): Promise<void> {
    await initializeData();
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
        posts[index] = { ...posts[index], ...postData };
    }
}

export async function deletePost(id: string): Promise<void> {
    await initializeData();
    posts = posts.filter(p => p.id !== id);
}
