"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  const inputClass = cn(
    "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm",
    "outline-none placeholder:text-muted-foreground transition-colors duration-150 focus:border-white/20",
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        required
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className={inputClass}
      />
      <input
        required
        type="email"
        placeholder="Your email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className={inputClass}
      />
      <textarea
        required
        rows={3}
        placeholder="What's this about?"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className={cn(inputClass, "resize-none")}
      />

      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium",
          "border border-white/10 bg-white/5 transition-all duration-150",
          "hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "loading" ? (
            <motion.span
              key="loading"
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="h-4 w-4 animate-spin" /> Sending
            </motion.span>
          ) : status === "success" ? (
            <motion.span
              key="success"
              className="flex items-center gap-2 text-emerald-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Check className="h-4 w-4" /> Sent!
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Send className="h-3.5 w-3.5" /> Send message
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {status === "error" && (
        <p className="text-xs text-destructive">
          Something went wrong — try again.
        </p>
      )}
    </form>
  );
}
