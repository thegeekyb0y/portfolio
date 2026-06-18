import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chatRatelimit } from "@/lib/ratelimit";
import { SYSTEM_PROMPT } from "@/config/assistant-knowledge";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

export const maxDuration = 30;

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

// Soft cap: leaves enough headroom for the JSON envelope + 2 followups + action
const MAX_TOKENS = 1024;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Role = "user" | "assistant";

interface ChatMessage {
  role: Role;
  content: string;
}

interface AssistantAction {
  label: string;
  url: string;
}

interface AssistantPayload {
  reply: string;
  followups: [string, string];
  action?: AssistantAction;
}

interface RequestBody {
  id: string;
  messages: ChatMessage[];
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function isValidRole(role: unknown): role is Role {
  return role === "user" || role === "assistant";
}

function isValidMessages(messages: unknown): messages is ChatMessage[] {
  return (
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.every(
      (m) =>
        typeof m === "object" &&
        m !== null &&
        isValidRole((m as Record<string, unknown>).role) &&
        typeof (m as Record<string, unknown>).content === "string",
    )
  );
}

function parsePayload(raw: string): AssistantPayload {
  // Strip any accidental markdown fences (safety net even with json_object mode)
  const clean = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  const parsed = JSON.parse(clean) as Partial<AssistantPayload>;

  // Validate required fields — surface schema errors early
  if (typeof parsed.reply !== "string" || !parsed.reply.trim()) {
    throw new Error("Missing or empty 'reply' field");
  }

  if (
    !Array.isArray(parsed.followups) ||
    parsed.followups.length !== 2 ||
    parsed.followups.some((q) => typeof q !== "string")
  ) {
    throw new Error("'followups' must be an array of exactly 2 strings");
  }

  if (
    parsed.action !== undefined &&
    (typeof parsed.action.label !== "string" ||
      typeof parsed.action.url !== "string")
  ) {
    // Action is malformed — drop it rather than hard-failing
    delete parsed.action;
  }

  return parsed as AssistantPayload;
}

// Canonical fallback — safe, always valid
function fallbackPayload(): AssistantPayload {
  return {
    reply:
      "I don't have details on that — feel free to reach out to Aditya directly.",
    followups: ["What projects has he built?", "Is he open to internships?"],
  };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: Request): Promise<NextResponse> {
  // ── Rate limiting ──────────────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";

  const { success, reset } = await chatRatelimit.limit(ip);

  if (!success) {
    const minutesLeft = Math.max(1, Math.ceil((reset - Date.now()) / 60_000));
    return NextResponse.json(
      {
        error: `Too many messages — limit resets in ~${minutesLeft} minute${minutesLeft === 1 ? "" : "s"}.`,
      },
      { status: 429 },
    );
  }

  // ── Parse + validate request body ─────────────────────────────────────────
  let body: RequestBody;

  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { id, messages } = body;

  if (typeof id !== "string" || !id.trim()) {
    return NextResponse.json(
      { error: "Missing or invalid session id." },
      { status: 400 },
    );
  }

  if (!isValidMessages(messages)) {
    return NextResponse.json(
      { error: "Invalid messages array." },
      { status: 400 },
    );
  }

  // ── Call Groq ──────────────────────────────────────────────────────────────
  let payload: AssistantPayload;

  try {
    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.3,
        max_tokens: MAX_TOKENS,
        // Forces the model to emit valid JSON — eliminates parse failures
        response_format: { type: "json_object" },
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("[chat/route] Groq error:", groqRes.status, errText);

      // Distinguish quota / server errors for observability
      const status = groqRes.status === 429 ? 503 : 502;
      return NextResponse.json(
        { error: "AI service unavailable — please try again." },
        { status },
      );
    }

    const groqData = (await groqRes.json()) as {
      choices?: { message?: { content?: string } }[];
    };

    const rawText = groqData.choices?.[0]?.message?.content ?? "";

    if (!rawText.trim()) {
      console.error("[chat/route] Empty content from Groq");
      payload = fallbackPayload();
    } else {
      try {
        payload = parsePayload(rawText);
      } catch (parseErr) {
        // Log the raw text for debugging without exposing it to the client
        console.error(
          "[chat/route] JSON parse/validation failed:",
          parseErr,
          "\nRaw text:",
          rawText.slice(0, 500),
        );
        payload = fallbackPayload();
      }
    }
  } catch (networkErr) {
    console.error("[chat/route] Network error calling Groq:", networkErr);
    return NextResponse.json(
      { error: "AI service unavailable — please try again." },
      { status: 503 },
    );
  }

  // ── Persist conversation ───────────────────────────────────────────────────
  // Fire-and-forget — never let DB errors block the response
  persistConversation(id, messages, payload.reply).catch((err) =>
    console.error("[chat/route] Persistence failed:", err),
  );

  return NextResponse.json(payload);
}

// ---------------------------------------------------------------------------
// Persistence (fire-and-forget)
// ---------------------------------------------------------------------------

async function persistConversation(
  sessionId: string,
  messages: ChatMessage[],
  assistantReply: string,
): Promise<void> {
  await prisma.chatSession.upsert({
    where: { id: sessionId },
    create: { id: sessionId },
    update: {},
  });

  // Replace all messages for the session atomically
  await prisma.$transaction([
    prisma.chatMessage.deleteMany({ where: { sessionId } }),
    prisma.chatMessage.createMany({
      data: [
        ...messages.map((m) => ({
          sessionId,
          role: m.role,
          content: m.content,
        })),
        {
          sessionId,
          role: "assistant" as const,
          content: assistantReply,
        },
      ],
    }),
  ]);
}
