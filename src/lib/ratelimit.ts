import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

// 10 messages per 10 minutes per IP (was 20)
// Followup spam is blocked client-side at 3, so 10 is plenty for real users
export const chatRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 m"),
  prefix: "ratelimit:chat",
});

export const contactRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  prefix: "ratelimit:contact",
});
