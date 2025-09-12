
'use server';

import type { Usage } from '@/lib/types';
import { isSameDay } from 'date-fns';

const GUEST_LIMIT = 5;

// In-memory store
let usageData: { [key: string]: Usage } = {};

export async function recordUsage(userId: string): Promise<void> {
  const now = new Date();
  const userUsage = usageData[userId];

  if (userUsage && isSameDay(now, userUsage.lastReset)) {
    userUsage.count++;
  } else {
    usageData[userId] = {
      count: 1,
      lastReset: now,
    };
  }
}

export async function checkUsage(userId: string): Promise<{ hasRemaining: boolean, remainingCount: number }> {
  const limit = GUEST_LIMIT;
  const userUsage = usageData[userId];
  const now = new Date();

  if (!userUsage || !isSameDay(now, userUsage.lastReset)) {
    return { hasRemaining: true, remainingCount: limit };
  }
  
  const currentCount = userUsage.count || 0;
  const remainingCount = Math.max(0, limit - currentCount);

  return {
    hasRemaining: currentCount < limit,
    remainingCount: remainingCount
  };
}
