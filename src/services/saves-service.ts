
'use server';

import type { Post } from '@/lib/types';
import { getPostBySlug } from './post-service';

// This is an in-memory store, it will reset on server restart.
let savedPostsStore: { [key: string]: string[] } = {}; // userId -> postId[]

export async function getSavesForPost(slug: string, userId?: string): Promise<{ count: number; isSaved: boolean }> {
  let count = 0;
  for (const user in savedPostsStore) {
    if (savedPostsStore[user].includes(slug)) {
      count++;
    }
  }
  const isSaved = userId ? savedPostsStore[userId]?.includes(slug) || false : false;
  return { count, isSaved };
}

export async function toggleSavePost(postId: string, userId: string): Promise<{ isSaved: boolean }> {
  if (!savedPostsStore[userId]) {
    savedPostsStore[userId] = [];
  }

  const userSaves = savedPostsStore[userId];
  const saveIndex = userSaves.indexOf(postId);

  if (saveIndex === -1) {
    userSaves.push(postId);
    return { isSaved: true };
  } else {
    userSaves.splice(saveIndex, 1);
    return { isSaved: false };
  }
}

export async function getSavedPostsForUser(userId: string): Promise<Post[]> {
  const postIds = savedPostsStore[userId] || [];
  if (postIds.length === 0) {
    return [];
  }
  
  const postPromises = postIds.map(slug => getPostBySlug(slug));
  const posts = (await Promise.all(postPromises)).filter((p): p is Post => p !== null);
  
  return posts;
}

export async function unsaveAllPostsForUser(userId: string): Promise<void> {
    if (savedPostsStore[userId]) {
        savedPostsStore[userId] = [];
    }
}
