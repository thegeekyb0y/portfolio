import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { contactRatelimit } from "@/lib/ratelimit";

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
});

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const { success } = await contactRatelimit.limit(ip);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parsed = ContactSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { name, email, message } = parsed.data;
  await prisma.contactMessage.create({ data: { name, email, message } });

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // switch to a verified domain later
      to: process.env.CONTACT_EMAIL_TO!,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
  } catch (err) {
    console.error("Resend email failed:", err);
    // message is already in Postgres — don't fail the request over email delivery
  }

  return NextResponse.json({ ok: true });
}
