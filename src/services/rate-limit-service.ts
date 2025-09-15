
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
 * Returns an object indicating if the rate limit was exceeded.
 * @param ip The user's IP address.
 */
export async function checkAndIncrementRateLimit(ip: string | null): Promise<{ exceeded: boolean; message?: string }> {
  if (!ip) {
    // Fail open if IP is not available, though it should be.
    return { exceeded: false };
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
    return { exceeded: false };
  } else {
    // Subsequent request.
    if (userInfo.count >= DAILY_LIMIT) {
      const timeLeftMs = userInfo.resetsAt - now;
      const hoursLeft = Math.floor(timeLeftMs / (1000 * 60 * 60));
      const minutesLeft = Math.ceil((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
      
      let timeMessage;
      if (hoursLeft > 0) {
        timeMessage = `${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}${minutesLeft > 0 ? ` and ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}` : ''}`;
      } else {
        timeMessage = `${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}`;
      }
      
      return { 
        exceeded: true, 
        message: `You have used all ${DAILY_LIMIT} daily requests. Please try again in ${timeMessage}.`
      };
    }
    userInfo.count++;
    return { exceeded: false };
  }
}
