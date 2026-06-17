"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, AlertCircle, ExternalLink } from "lucide-react";
import { BentoCard } from "@/components/shared/bento-card";
import { GeminiIcon } from "@/components/icons/gemini-icon";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

type Action = { label: string; url: string };

type AssistantPayload = {
  reply: string;
  followups: [string, string];
  action?: Action;
};

type Message =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; payload: AssistantPayload };

// ── Constants ─────────────────────────────────────────────────────────────────

const STARTER_PROMPTS = [
  "What's Aditya's tech stack?",
  "Tell me about Kraked",
  "Is Aditya open to internships?",
  "What is he currently building?",
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

// ── Main component ─────────────────────────────────────────────────────────────

export function ChatPanel() {
  const [sessionId, setSessionId] = useState<string>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => setSessionId(getOrCreateSessionId()), []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading || !sessionId) return;
      setError(null);

      const userMsg: Message = { id: crypto.randomUUID(), role: "user", text };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      // Build history for the API (user/assistant turns)
      const history = [...messages, userMsg].map((m) =>
        m.role === "user"
          ? { role: "user" as const, content: m.text }
          : { role: "assistant" as const, content: m.payload.reply },
      );

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: sessionId, messages: history }),
        });

        if (res.status === 429) {
          const body = await res.json();
          setError(
            body.error ?? "Too many messages — try again in a few minutes.",
          );
          // remove the optimistic user message
          setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
          return;
        }

        if (!res.ok) throw new Error("API error");

        const payload: AssistantPayload = await res.json();
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "assistant", payload },
        ]);
      } catch {
        setError("Something went wrong — please try again.");
        setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [loading, sessionId, messages],
  );

  return (
    <BentoCard className="flex h-[75vh] flex-col gap-0 p-0 lg:h-[calc(100vh-176px)]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <GeminiIcon />
        <div>
          <h2 className="text-sm font-semibold leading-tight">
            Ask my AI assistant
          </h2>
          <p className="text-xs text-muted-foreground">
            Trained on Aditya&apos;s projects & background
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
        {messages.length === 0 ? (
          <EmptyState onPick={sendMessage} />
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {messages.map((m) =>
                m.role === "user" ? (
                  <UserBubble key={m.id} text={m.text} />
                ) : (
                  <AssistantBubble
                    key={m.id}
                    payload={m.payload}
                    onFollowup={sendMessage}
                    isLatest={m === messages[messages.length - 1]}
                  />
                ),
              )}
            </AnimatePresence>
            {loading && <TypingIndicator />}
          </div>
        )}
      </div>

      {/* Rate limit / error banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="mx-3 mb-1 flex items-start gap-2 rounded-lg border border-orange-500/20 bg-orange-500/10 px-3 py-2.5 text-xs text-orange-300"
          >
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="flex items-end gap-2 border-t border-white/10 p-3">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
          rows={1}
          placeholder="Ask anything about Aditya..."
          className="max-h-32 flex-1 resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-white/20"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          aria-label="Send message"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-150 hover:bg-primary/80 disabled:opacity-40 active:scale-90"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </BentoCard>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

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
        {STARTER_PROMPTS.map((prompt, i) => (
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

function UserBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="flex justify-end"
    >
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground">
        {text}
      </div>
    </motion.div>
  );
}

function AssistantBubble({
  payload,
  onFollowup,
  isLatest,
}: {
  payload: AssistantPayload;
  onFollowup: (text: string) => void;
  isLatest: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start gap-2"
    >
      {/* Reply bubble */}
      <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm leading-relaxed text-foreground">
        {payload.reply}
      </div>

      {/* Action button + followups — only on the latest assistant message */}
      {isLatest && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.25 }}
          className="flex flex-wrap gap-2"
        >
          {/* External link action */}
          {payload.action && (
            <a
              href={payload.action.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-150 hover:-translate-y-0.5 hover:border-white/25 active:scale-95"
            >
              <ExternalLink className="h-3 w-3 shrink-0" />
              {payload.action.label}
            </a>
          )}

          {/* Followup question chips */}
          {payload.followups.map((q) => (
            <button
              key={q}
              onClick={() => onFollowup(q)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground transition-all duration-150 hover:-translate-y-0.5 hover:border-white/20 hover:text-foreground active:scale-95"
            >
              {q}
            </button>
          ))}
        </motion.div>
      )}
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
