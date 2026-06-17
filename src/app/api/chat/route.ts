import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chatRatelimit } from "@/lib/ratelimit";
import { SYSTEM_PROMPT } from "@/config/assistant-knowledge";

export const maxDuration = 30;

function extractText(message: UIMessage) {
  return message.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const { success } = await chatRatelimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many messages — try again in a few minutes." },
      { status: 429 },
    );
  }

  const { id, messages }: { id: string; messages: UIMessage[] } =
    await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    // verify availability on your key in Google AI Studio; fall back to "gemini-2.5-flash" if needed
    model: google("gemini-2.5-flash"),
    system: SYSTEM_PROMPT,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: async ({ messages: finalMessages }) => {
      try {
        await prisma.chatSession.upsert({
          where: { id },
          create: { id },
          update: {},
        });
        await prisma.chatMessage.deleteMany({ where: { sessionId: id } });
        await prisma.chatMessage.createMany({
          data: finalMessages.map((m) => ({
            sessionId: id,
            role: m.role,
            content: extractText(m),
          })),
        });
      } catch (err) {
        console.error("Failed to persist chat:", err);
      }
    },
  });
}
