import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ORIGINS: ReadonlySet<string> = (() => {
  const raw = process.env.ALLOWED_ORIGINS ?? "";
  if (!raw.trim()) return new Set<string>(); // empty → dev fallback
  return new Set(
    raw
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean),
  );
})();

const ALLOWED_METHODS = "POST, OPTIONS";
const ALLOWED_HEADERS = "Content-Type";
const MAX_AGE = "86400";

function resolveOriginHeader(requestOrigin: string | null): string | null {
  if (!requestOrigin) return null;

  // No explicit allowlist → dev mode, permit localhost only.
  if (ALLOWED_ORIGINS.size === 0) {
    const url = URL.canParse(requestOrigin) ? new URL(requestOrigin) : null;
    if (url && (url.hostname === "localhost" || url.hostname === "127.0.0.1")) {
      return requestOrigin;
    }
    return null;
  }

  return ALLOWED_ORIGINS.has(requestOrigin) ? requestOrigin : null;
}

function applyCorsHeaders(
  response: NextResponse,
  allowedOrigin: string | null,
): NextResponse {
  if (allowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
    response.headers.set("Vary", "Origin");
  }
  response.headers.set("Access-Control-Allow-Methods", ALLOWED_METHODS);
  response.headers.set("Access-Control-Allow-Headers", ALLOWED_HEADERS);
  return response;
}

export function middleware(req: NextRequest): NextResponse {
  const origin = req.headers.get("origin");
  const allowedOrigin = resolveOriginHeader(origin);

  if (req.method === "OPTIONS") {
    const preflight = new NextResponse(null, { status: 204 });
    applyCorsHeaders(preflight, allowedOrigin);
    preflight.headers.set("Access-Control-Max-Age", MAX_AGE);
    return preflight;
  }

  const response = NextResponse.next();
  applyCorsHeaders(response, allowedOrigin);
  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
