import { kv } from "@vercel/kv";
import { Review } from "./types/review";

/**
 * Data Storage Architecture for Govind & Nikita Advocates Review System
 * Primary: Vercel KV (Upstash Redis) - REST-based KV store with no user account overhead.
 * 
 * Alternative Fallback Note (per requirements):
 * If the client prefers to avoid third-party storage services, reviews can alternatively
 * be stored in a JSON file (`data/reviews.json`) committed via GitHub REST API on each write,
 * or saved to a simple local file / database.
 */

// In-memory fallback for local dev when KV environment variables are not set
const memoryReviews = new Map<string, Review>();

function isKvConfigured(): boolean {
  return (
    !!(process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
    !!(process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)
  );
}

export async function saveReview(review: Review): Promise<void> {
  if (isKvConfigured()) {
    await kv.set(`review:${review.id}`, JSON.stringify(review));
    await kv.sadd("reviews:all", review.id);
    if (review.status === "pending") {
      await kv.sadd("reviews:pending", review.id);
    } else if (review.status === "approved") {
      await kv.sadd("reviews:approved", review.id);
    }
  } else {
    // Local dev fallback
    memoryReviews.set(review.id, review);
  }
}

export async function getReview(id: string): Promise<Review | null> {
  if (isKvConfigured()) {
    const data = await kv.get<string | Review>(`review:${id}`);
    if (!data) return null;
    if (typeof data === "string") {
      return JSON.parse(data) as Review;
    }
    return data as Review;
  } else {
    return memoryReviews.get(id) || null;
  }
}

export async function getAllReviews(): Promise<Review[]> {
  if (isKvConfigured()) {
    const ids = await kv.smembers("reviews:all");
    if (!ids || ids.length === 0) return [];
    
    const reviews: Review[] = [];
    for (const id of ids) {
      const rev = await getReview(id as string);
      if (rev) reviews.push(rev);
    }
    return reviews;
  } else {
    return Array.from(memoryReviews.values());
  }
}

export async function updateReviewStatus(
  id: string,
  newStatus: "approved" | "rejected" | "pending"
): Promise<Review | null> {
  const review = await getReview(id);
  if (!review) return null;

  const oldStatus = review.status;
  review.status = newStatus;

  if (isKvConfigured()) {
    await kv.set(`review:${id}`, JSON.stringify(review));

    // Update state tracking sets
    if (oldStatus === "pending") await kv.srem("reviews:pending", id);
    if (oldStatus === "approved") await kv.srem("reviews:approved", id);

    if (newStatus === "pending") await kv.sadd("reviews:pending", id);
    if (newStatus === "approved") await kv.sadd("reviews:approved", id);
  } else {
    memoryReviews.set(id, review);
  }

  return review;
}

export async function incrementReportCount(id: string): Promise<Review | null> {
  const review = await getReview(id);
  if (!review) return null;

  review.reportCount = (review.reportCount || 0) + 1;

  // Auto-flip status to pending if report threshold (3) is reached and it's currently approved
  let shouldAutoFlag = false;
  if (review.reportCount >= 3 && review.status === "approved") {
    review.status = "pending";
    shouldAutoFlag = true;
  }

  if (isKvConfigured()) {
    await kv.set(`review:${id}`, JSON.stringify(review));
    if (shouldAutoFlag) {
      await kv.srem("reviews:approved", id);
      await kv.sadd("reviews:pending", id);
    }
  } else {
    memoryReviews.set(id, review);
  }

  return review;
}
