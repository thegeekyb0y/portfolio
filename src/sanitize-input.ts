export const MAX_USER_MESSAGE_LENGTH = 500;

const INJECTION_PATTERNS: RegExp[] = [
  // "ignore (all / previous / above / prior) instructions"
  /ignore\s+(all\s+)?(?:previous|prior|above|earlier|old|existing)\s+instructions?/gi,

  // "disregard (your / the / all) instructions"
  /disregard\s+(?:your\s+|the\s+|all\s+)?instructions?/gi,

  // "forget (everything / all / your) instructions"
  /forget\s+(?:everything|all|your)?\s*instructions?/gi,

  // "override (the / your) (system prompt / instructions / context)"
  /override\s+(?:the\s+|your\s+)?(?:system\s+prompt|instructions?|context)/gi,

  // "you are now [DAN / …]" — common persona-swap opener
  /you\s+are\s+now\s+(?:dan|jailbreak|admin|root|unrestricted|evil|free)/gi,

  // "act as [a / an] …" followed by clear adversarial nouns
  /act\s+as\s+(?:a\s+|an\s+)?(?:jailbreak|hacker|evil|unrestricted|dan)/gi,

  // "new instructions:" / "updated instructions:" — explicit override attempts
  /(?:new|updated|real|actual|hidden|secret)\s+instructions?\s*:/gi,

  // "pretend (you have no / there are no) restrictions"
  /pretend\s+(?:you\s+have\s+no|there\s+are\s+no)\s+restrictions?/gi,

  // "do not follow" / "stop following" your instructions/guidelines
  /(?:do\s+not|don'?t|stop)\s+follow(?:ing)?\s+(?:your\s+)?(?:instructions?|guidelines?|rules?)/gi,

  // "system prompt:" — explicit attempt to inject a new system message
  /system\s+prompt\s*:/gi,
];

function stripInjectionPatterns(text: string): string {
  let sanitized = text;
  for (const pattern of INJECTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, "[removed]");
  }
  return sanitized;
}

function normalizeWhitespace(text: string): string {
  return text
    .replace(/\r\n/g, "\n") // CRLF → LF
    .replace(/\r/g, "\n") // stray CR → LF
    .replace(/\n{3,}/g, "\n\n") // 3+ newlines → 2
    .trim();
}

export function sanitizeUserMessage(raw: string): string {
  // 1. Hard length ceiling — truncate before any regex work.
  const truncated =
    raw.length > MAX_USER_MESSAGE_LENGTH
      ? raw.slice(0, MAX_USER_MESSAGE_LENGTH)
      : raw;

  // 2. Strip known injection patterns.
  const stripped = stripInjectionPatterns(truncated);

  // 3. Normalize whitespace.
  return normalizeWhitespace(stripped);
}
