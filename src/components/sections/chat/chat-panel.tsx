"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { BentoCard } from "@/components/shared/bento-card";
import { GeminiIcon } from "@/components/icons/gemini-icon";
import { cn } from "@/lib/utils";

const SUGGESTED_PROMPTS = [
  "What's Aditya's tech stack?",
  "Tell me about Kraked",
  "Is Aditya open to internships?",
  "How can I get in touch?",
];

function getOrCreateSessionId() {
  const KEY = "chat-session-id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

export function ChatPanel() {
  const [sessionId, setSessionId] = useState<string>();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => setSessionId(getOrCreateSessionId()), []);

  const { messages, sendMessage, status } = useChat({
    id: sessionId,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  const isBusy = status === "submitted" || status === "streaming";

  function handleSend(text: string) {
    if (!text.trim() || isBusy || !sessionId) return;
    sendMessage({ text });
    setInput("");
  }

  return (
    <BentoCard className="flex h-[75vh] flex-col gap-0 p-0 lg:h-[calc(100vh-176px)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <GeminiIcon />
        <div>
          <h2 className="text-sm font-semibold leading-tight">
            Ask my AI assistant
          </h2>
          <p className="text-xs text-muted-foreground">
            Trained on Aditya&apos;s projects, stack & background
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
        {messages.length === 0 ? (
          <EmptyState onPick={handleSend} />
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <MessageBubble key={m.id} role={m.role} parts={m.parts} />
              ))}
            </AnimatePresence>
            {status === "submitted" && <TypingIndicator />}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex items-end gap-2 border-t border-white/10 p-3"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend(input);
            }
          }}
          rows={1}
          placeholder="Ask anything about Aditya..."
          className="max-h-32 flex-1 resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-white/20"
        />
        <button
          type="submit"
          disabled={isBusy || !input.trim()}
          aria-label="Send message"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-150 hover:bg-primary/80 disabled:opacity-40 active:scale-90"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </form>
    </BentoCard>
  );
}

function EmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
      <GeminiIcon />
      <div>
        <p className="text-sm font-medium">
          Hey, I&apos;m Aditya&apos;s AI assistant 👋
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Ask about his stack, projects, or availability.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTED_PROMPTS.map((prompt, i) => (
          <motion.button
            key={prompt}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            onClick={() => onPick(prompt)}
            className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-muted-foreground transition-all duration-150 hover:-translate-y-0.5 hover:border-white/20 hover:text-foreground active:scale-95"
          >
            {prompt}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({
  role,
  parts,
}: {
  role: string;
  parts: UIMessage["parts"];
}) {
  const isUser = role === "user";
  const text = parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md border border-white/10 bg-white/5 text-foreground",
        )}
      >
        {text}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
