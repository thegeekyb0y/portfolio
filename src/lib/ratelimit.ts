import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
import { RATE_LIMIT, REDIS_KEYS } from "@/config/constants";

export const chatRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    RATE_LIMIT.chat.requests,
    RATE_LIMIT.chat.window,
  ),
  prefix: REDIS_KEYS.chatRateLimit,
});

export const contactRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    RATE_LIMIT.contact.requests,
    RATE_LIMIT.contact.window,
  ),
  prefix: REDIS_KEYS.contactRateLimit,
});
