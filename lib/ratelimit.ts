import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import crypto from "crypto";

// Fallback memory rate limiter if KV is not configured
const memoryRateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isKvConfigured(): boolean {
  return (
    !!(process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
    !!(process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)
  );
}

// 3 submissions per 24 hours
const submissionRatelimit = isKvConfigured()
  ? new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(3, "24 h"),
      analytics: true,
      prefix: "ratelimit:review_submit",
    })
  : null;

// 5 reports per 24 hours
const reportRatelimit = isKvConfigured()
  ? new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(5, "24 h"),
      analytics: true,
      prefix: "ratelimit:review_report",
    })
  : null;

export function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip + (process.env.ADMIN_PASSWORD || "govind_law_salt")).digest("hex");
}

export async function checkSubmissionRateLimit(ip: string): Promise<{ success: boolean }> {
  const hashedIp = hashIp(ip);

  if (submissionRatelimit) {
    const res = await submissionRatelimit.limit(hashedIp);
    return { success: res.success };
  }

  // Memory fallback rate limiter (3 req / 24h)
  const now = Date.now();
  const key = `submit:${hashedIp}`;
  const entry = memoryRateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    memoryRateLimitMap.set(key, { count: 1, resetAt: now + 24 * 60 * 60 * 1000 });
    return { success: true };
  }

  if (entry.count >= 3) {
    return { success: false };
  }

  entry.count += 1;
  return { success: true };
}

export async function checkReportRateLimit(ip: string): Promise<{ success: boolean }> {
  const hashedIp = hashIp(ip);

  if (reportRatelimit) {
    const res = await reportRatelimit.limit(hashedIp);
    return { success: res.success };
  }

  // Memory fallback rate limiter (5 req / 24h)
  const now = Date.now();
  const key = `report:${hashedIp}`;
  const entry = memoryRateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    memoryRateLimitMap.set(key, { count: 1, resetAt: now + 24 * 60 * 60 * 1000 });
    return { success: true };
  }

  if (entry.count >= 5) {
    return { success: false };
  }

  entry.count += 1;
  return { success: true };
}
