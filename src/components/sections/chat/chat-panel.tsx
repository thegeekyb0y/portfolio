"use client";

import { useEffect, useRef, useState, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, AlertCircle, ExternalLink, RefreshCw } from "lucide-react";
import { BentoCard } from "@/components/shared/bento-card";
import { GeminiIcon } from "@/components/icons/gemini-icon";
import { cn } from "@/lib/utils";
import { MAX_FOLLOWUP_TURNS, SESSION_KEY } from "@/config/constants";

interface Action {
  label: string;
  url: string;
}

interface AssistantPayload {
  reply: string;
  followups: [string, string];
  action?: Action;
}

type Message =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; payload: AssistantPayload };

type ErrorKind = "rate_limit" | "network" | "unknown";

interface ChatError {
  kind: ErrorKind;
  message: string;
}

const STARTER_PROMPTS = [
  "What's Aditya's tech stack?",
  "Tell me about Kraked",
  "Is Aditya open to internships?",
  "What is he currently building?",
] as const;

// Hide followup chips after this many assistant replies to save tokens

function getOrCreateSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function ChatPanel() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formId = useId();

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const assistantTurnCount = messages.filter(
    (m) => m.role === "assistant",
  ).length;
  const followupsExhausted = assistantTurnCount >= MAX_FOLLOWUP_TURNS;

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading || !sessionId) return;

      setError(null);

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        text: trimmed,
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

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

        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as {
            error?: string;
          };

          const kind: ErrorKind =
            res.status === 429
              ? "rate_limit"
              : res.status >= 500
                ? "network"
                : "unknown";

          setError({
            kind,
            message:
              body.error ??
              (kind === "rate_limit"
                ? "Too many messages — try again in a few minutes."
                : "Something went wrong — please try again."),
          });

          setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
          return;
        }

        const payload = (await res.json()) as AssistantPayload;

        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "assistant", payload },
        ]);
      } catch {
        setError({
          kind: "network",
          message: "Connection error — check your internet and try again.",
        });
        setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [loading, sessionId, messages],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input);
      }
    },
    [input, sendMessage],
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
            Trained on Aditya&apos;s projects &amp; background
          </p>
        </div>
      </div>

      {/* Message list */}
      <div
        ref={scrollRef}
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        className="flex-1 overflow-y-auto px-5 py-5"
      >
        {messages.length === 0 ? (
          <EmptyState onPick={sendMessage} />
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {messages.map((m) => {
                if (m.role === "user")
                  return <UserBubble key={m.id} text={m.text} />;

                const isLatest = m === messages[messages.length - 1];
                const showFollowups = isLatest && !followupsExhausted;

                return (
                  <AssistantBubble
                    key={m.id}
                    payload={m.payload}
                    onFollowup={sendMessage}
                    isLatest={isLatest}
                    showFollowups={showFollowups}
                  />
                );
              })}
            </AnimatePresence>

            {loading && <TypingIndicator />}

            {followupsExhausted && !loading && (
              <p className="text-center text-xs text-muted-foreground/50 mt-1"></p>
            )}
          </div>
        )}
      </div>

      {/* Error banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            key="error-banner"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            role="alert"
            className={cn(
              "mx-3 mb-1 flex items-start gap-2 rounded-lg border px-3 py-2.5 text-xs",
              error.kind === "rate_limit"
                ? "border-orange-500/20 bg-orange-500/10 text-orange-300"
                : "border-red-500/20 bg-red-500/10 text-red-300",
            )}
          >
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span className="flex-1">{error.message}</span>
            {error.kind !== "rate_limit" && (
              <button
                onClick={() => setError(null)}
                aria-label="Dismiss error"
                className="ml-auto shrink-0 opacity-60 transition-opacity hover:opacity-100"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area */}
      <div
        role="form"
        aria-label="Send a message"
        id={formId}
        className="flex items-end gap-2 border-t border-white/10 p-3"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask anything about Aditya…"
          aria-label="Message input"
          disabled={loading}
          className={cn(
            "max-h-32 flex-1 resize-none rounded-lg border border-white/10 bg-white/5",
            "px-3 py-2 text-sm outline-none placeholder:text-muted-foreground",
            "transition-colors duration-150 focus:border-white/20",
            "disabled:opacity-50",
          )}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          aria-label="Send message"
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            "bg-primary text-primary-foreground",
            "transition-all duration-150 hover:bg-primary/80",
            "disabled:opacity-40 active:scale-90",
          )}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
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
        {STARTER_PROMPTS.map((prompt, i) => (
          <motion.button
            key={prompt}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            onClick={() => onPick(prompt)}
            className={cn(
              "rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-muted-foreground",
              "transition-all duration-150 hover:-translate-y-0.5 hover:border-white/20 hover:text-foreground",
              "active:scale-95",
            )}
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
  showFollowups,
}: {
  payload: AssistantPayload;
  onFollowup: (text: string) => void;
  isLatest: boolean;
  showFollowups: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start gap-2"
    >
      <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm leading-relaxed text-foreground">
        {payload.reply}
      </div>

      {showFollowups && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.25 }}
          className="flex flex-wrap gap-2"
        >
          {payload.action != null && (
            <a
              href={payload.action.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8",
                "px-3 py-1.5 text-xs font-medium text-foreground",
                "transition-all duration-150 hover:-translate-y-0.5 hover:border-white/25",
                "active:scale-95",
              )}
            >
              <ExternalLink className="h-3 w-3 shrink-0" />
              {payload.action.label}
            </a>
          )}

          {payload.followups.map((q) => (
            <button
              key={q}
              onClick={() => onFollowup(q)}
              className={cn(
                "rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground",
                "transition-all duration-150 hover:-translate-y-0.5 hover:border-white/20 hover:text-foreground",
                "active:scale-95",
              )}
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
    <div className="flex justify-start" aria-label="Assistant is typing">
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
