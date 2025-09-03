
'use server';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, writeBatch, orderBy, deleteDoc } from 'firebase/firestore';
import type { CategoryFollow, Notification } from '@/lib/types';
import { getPostById } from './post-service';

export async function getFollowedCategories(userId: string): Promise<string[]> {
    try {
        const followsCollection = collection(db, 'categoryFollows');
        const q = query(followsCollection, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data().categorySlug as string);
    } catch (error) {
        console.error('Error getting followed categories:', error);
        return [];
    }
}

export async function isFollowingCategory(userId: string, categorySlug: string): Promise<boolean> {
    try {
        const followsCollection = collection(db, 'categoryFollows');
        const q = query(followsCollection, where('userId', '==', userId), where('categorySlug', '==', categorySlug));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error('Error checking follow status:', error);
        return false;
    }
}

export async function toggleFollowCategory(userId: string, categorySlug: string): Promise<{ isFollowing: boolean }> {
    const followsCollection = collection(db, 'categoryFollows');
    const q = query(followsCollection, where('userId', '==', userId), where('categorySlug', '==', categorySlug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        // User is not following, so follow
        await addDoc(followsCollection, { userId, categorySlug });
        return { isFollowing: true };
    } else {
        // User is following, so unfollow
        const batch = writeBatch(db);
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        return { isFollowing: false };
    }
}

export async function createNotificationForFollowers(categorySlug: string, postId: string, postTitle: string) {
    try {
        // 1. Find all users who follow this category
        const followsCollection = collection(db, 'categoryFollows');
        const q = query(followsCollection, where('categorySlug', '==', categorySlug));
        const followersSnapshot = await getDocs(q);

        if (followersSnapshot.empty) {
            console.log("No one is following this category. No notifications created.");
            return;
        }

        const followerIds = followersSnapshot.docs.map(doc => doc.data().userId as string);

        // 2. Create a notification for each follower
        const notificationsCollection = collection(db, 'notifications');
        const batch = writeBatch(db);
        const post = await getPostById(postId);

        if (!post) {
            console.error(`Post with ID ${postId} not found. Cannot create notifications.`);
            return;
        }

        followerIds.forEach(userId => {
            const newNotifRef = addDoc(notificationsCollection, {}).ref; // Create a ref with a new ID
            batch.set(newNotifRef, {
                userId,
                postId,
                postTitle,
                postSlug: post.slug,
                categorySlug,
                createdAt: serverTimestamp(),
                isRead: false,
            });
        });

        await batch.commit();
        console.log(`Created ${followerIds.length} notifications for post ${postId}.`);
    } catch (error) {
        console.error("Error creating notifications:", error);
    }
}


export async function getNotificationsForUser(userId: string): Promise<Notification[]> {
    try {
        const notificationsCollection = collection(db, 'notifications');
        const q = query(notificationsCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const notifications: Notification[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                userId: data.userId,
                postId: data.postId,
                postTitle: data.postTitle,
                categorySlug: data.categorySlug,
                isRead: data.isRead,
                createdAt: data.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) || 'N/A',
                postSlug: data.postSlug
            } as Notification;
        });
        
        return notifications;
    } catch (error) {
        console.error("Error getting notifications for user:", error);
        return [];
    }
}


export async function clearAllNotificationsForUser(userId: string): Promise<void> {
    try {
        const notificationsCollection = collection(db, 'notifications');
        const q = query(notificationsCollection, where('userId', '==', userId));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return;
        }

        const batch = writeBatch(db);
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        console.log(`Cleared ${snapshot.size} notifications for user ${userId}.`);
    } catch (error) {
        console.error("Error clearing notifications:", error);
        throw new Error("Could not clear notifications.");
    }
}
