
'use server';

// In-memory store for rate limiting.
// NOTE: This is a simple in-memory solution. In a distributed environment (like Vercel serverless functions),
// each function instance will have its own memory. For more robust, distributed rate limiting,
// an external store like Redis (Upstash) or a database would be required.
// However, for many use cases, this provides a good-enough baseline for preventing basic abuse.

interface RateLimitInfo {
  count: number;
  // The timestamp (in milliseconds) when the 24-hour window for this user resets.
  resetsAt: number;
}

const ipRequestMap = new Map<string, RateLimitInfo>();
const DAILY_LIMIT = 10;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

// Periodically clean up stale entries to prevent memory leaks over time.
// This runs once on server startup.
setInterval(() => {
  const now = Date.now();
  for (const [ip, info] of ipRequestMap.entries()) {
    if (info.resetsAt < now) {
      ipRequestMap.delete(ip);
    }
  }
}, WINDOW_MS);


/**
 * Checks if a user has exceeded their daily rate limit and increments their count.
 * Throws an error if the limit is exceeded.
 * @param ip The user's IP address.
 */
export async function checkAndIncrementRateLimit(ip: string | null) {
  if (!ip) {
    // Fail open if IP is not available, though it should be.
    return;
  }

  const now = Date.now();
  let userInfo = ipRequestMap.get(ip);

  // If user info exists but the reset time has passed, clear it.
  if (userInfo && userInfo.resetsAt < now) {
    ipRequestMap.delete(ip);
    userInfo = undefined;
  }

  if (!userInfo) {
    // First request in a new window for this user.
    ipRequestMap.set(ip, {
      count: 1,
      resetsAt: now + WINDOW_MS,
    });
  } else {
    // Subsequent request.
    if (userInfo.count >= DAILY_LIMIT) {
      const timeLeft = Math.ceil((userInfo.resetsAt - now) / (1000 * 60)); // Time left in minutes
      throw new Error(`Rate limit exceeded. Please try again in ${timeLeft} minutes.`);
    }
    userInfo.count++;
  }
}
