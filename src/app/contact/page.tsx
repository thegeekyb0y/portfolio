import type { Metadata } from "next";
import { ChatPanel } from "@/components/sections/chat/chat-panel";
import { ContactSidebar } from "@/components/sections/chat/contact-sidebar";
import { FadeUp } from "@/components/shared/fade-up";

export const metadata: Metadata = {
  title: "Let's Chat | Aditya Tiwari",
  description:
    "Ask my AI assistant about my work, or send me a direct message.",
};

export default function ContactPage() {
  return (
    <main className="grid grid-cols-1 gap-6 pb-10 lg:grid-cols-3 lg:items-start">
      <FadeUp delay={0.05} className="lg:col-span-2">
        <ChatPanel />
      </FadeUp>
      <FadeUp delay={0.15} className="lg:col-span-1">
        <ContactSidebar />
      </FadeUp>
    </main>
  );
}
