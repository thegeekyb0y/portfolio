// ── AI ──────────────────────────────────────────────
export const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
export const GROQ_MODEL = "openai/gpt-oss-120b";
export const GROQ_TIMEOUT_MS = 8_000;
export const MAX_TOKENS = 300;

// ── Input ────────────────────────────────────────────
export const MAX_USER_MESSAGE_LENGTH = 500;

// ── Chat UI ──────────────────────────────────────────
export const MAX_FOLLOWUP_TURNS = 3;
export const SESSION_KEY = "chat-session-id";

// ── Rate limits ──────────────────────────────────────
export const RATE_LIMIT = {
  chat: { requests: 10, window: "10 m" as const },
  contact: { requests: 5, window: "10 m" as const },
} as const;

// ── Redis key prefixes ───────────────────────────────
export const REDIS_KEYS = {
  chatRateLimit: "ratelimit:chat",
  contactRateLimit: "ratelimit:contact",
} as const;
