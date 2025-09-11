
'use server';

import type { CategoryFollow, Notification } from '@/lib/types';
import { getPostById } from './post-service';

// In-memory stores, will reset on server restart
let categoryFollows: CategoryFollow[] = [];
let notifications: Notification[] = [];
let notificationIdCounter = 0;

export async function getFollowedCategories(userId: string): Promise<string[]> {
    return categoryFollows.filter(f => f.userId === userId).map(f => f.categorySlug);
}

export async function isFollowingCategory(userId: string, categorySlug: string): Promise<boolean> {
    return categoryFollows.some(f => f.userId === userId && f.categorySlug === categorySlug);
}

export async function toggleFollowCategory(userId: string, categorySlug: string): Promise<{ isFollowing: boolean }> {
    const followIndex = categoryFollows.findIndex(f => f.userId === userId && f.categorySlug === categorySlug);
    if (followIndex > -1) {
        categoryFollows.splice(followIndex, 1);
        return { isFollowing: false };
    } else {
        categoryFollows.push({ userId, categorySlug });
        return { isFollowing: true };
    }
}

export async function createNotificationForFollowers(categorySlug: string, postId: string, postTitle: string) {
    const followerIds = categoryFollows.filter(f => f.categorySlug === categorySlug).map(f => f.userId);
    const post = await getPostById(postId);
    if (!post) return;

    followerIds.forEach(userId => {
        notificationIdCounter++;
        notifications.unshift({
            id: String(notificationIdCounter),
            userId,
            postId,
            postTitle,
            postSlug: post.slug,
            categorySlug,
            createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            isRead: false,
        });
    });
}

export async function getNotificationsForUser(userId: string): Promise<Notification[]> {
    return notifications.filter(n => n.userId === userId);
}

export async function clearAllNotificationsForUser(userId: string): Promise<void> {
    notifications = notifications.filter(n => n.userId !== userId);
}
