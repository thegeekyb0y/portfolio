import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chatRatelimit } from "@/lib/ratelimit";
import { SYSTEM_PROMPT } from "@/config/assistant-knowledge";

export const maxDuration = 30;

type ChatMessage = { role: "user" | "assistant"; content: string };

type ParsedResponse = {
  reply: string;
  followups: [string, string];
  action?: { label: string; url: string };
};

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";

  const { success, reset } = await chatRatelimit.limit(ip);
  if (!success) {
    const minutesLeft = Math.ceil((reset - Date.now()) / 60_000);
    return NextResponse.json(
      {
        error: `Too many messages — limit resets in ~${minutesLeft} minute${minutesLeft === 1 ? "" : "s"}.`,
      },
      { status: 429 },
    );
  }

  const { id, messages }: { id: string; messages: ChatMessage[] } =
    await req.json();

  const groqRes = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.3,
        max_tokens: 600, // bumped from 300 — JSON envelope needs ~200 tokens overhead
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    },
  );

  if (!groqRes.ok) {
    const err = await groqRes.text();
    console.error("Groq error:", err);
    return NextResponse.json(
      { error: "AI error — try again." },
      { status: 500 },
    );
  }

  const groqData = await groqRes.json();
  const text: string = groqData.choices?.[0]?.message?.content ?? "";

  let parsed: ParsedResponse;
  try {
    const clean = text.replace(/```json|```/g, "").trim();
    parsed = JSON.parse(clean);
  } catch {
    // JSON truncated — salvage the reply field via regex before falling back
    const replyMatch = text.match(/"reply"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    const salvaged = replyMatch
      ? replyMatch[1].replace(/\\n/g, " ").replace(/\\"/g, '"')
      : null;
    parsed = {
      reply: salvaged ?? "Something went wrong — please try again.",
      followups: ["What projects has he built?", "Is he open to internships?"],
    };
  }

  // Persist
  try {
    await prisma.chatSession.upsert({
      where: { id },
      create: { id },
      update: {},
    });
    await prisma.chatMessage.deleteMany({ where: { sessionId: id } });
    await prisma.chatMessage.createMany({
      data: [
        ...messages.map((m) => ({
          sessionId: id,
          role: m.role,
          content: m.content,
        })),
        { sessionId: id, role: "assistant" as const, content: parsed.reply },
      ],
    });
  } catch (err) {
    console.error("Failed to persist chat:", err);
  }

  return NextResponse.json(parsed);
}
