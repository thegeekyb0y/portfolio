"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main
      className="
        fixed inset-0 flex flex-col items-center justify-center
        bg-[oklch(0.12_0.018_260)]
        overflow-hidden select-none
      "
    >
      {/* ── ghost "404" — fades up from behind the card ── */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: -30 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="
          pointer-events-none absolute
          text-[clamp(180px,40vw,380px)] font-bold leading-none tracking-tighter
          text-white/3
        "
      >
        404
      </motion.span>

      {/* ── violet glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, oklch(0.558 0.243 293 / 0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── card ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="
          relative z-10 flex flex-col items-center gap-6
          rounded-xl border border-white/10 bg-black
          px-10 py-9
          text-center
          shadow-[0_0_80px_oklch(0.558_0.243_293_/_0.06)]
        "
        style={{ minWidth: "min(360px, 90vw)" }}
      >
        {/* dot + label */}
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500 opacity-80" />
          <span className="text-xs font-medium tracking-widest text-white/30 uppercase">
            Page not found
          </span>
        </div>

        {/* main line */}
        <p className="text-[15px] leading-relaxed text-white/60 max-w-60">
          This page doesn&apos;t exist, or was moved somewhere else.
        </p>

        {/* home link */}
        <Link
          href="/"
          className="
            flex items-center gap-2
            rounded-lg border border-white/10 bg-white/5
            px-5 py-2 text-sm font-medium text-white/80
            transition-all duration-150
            hover:border-white/20 hover:bg-white/8 hover:text-white
            active:scale-95
          "
        >
          ← Back to home
        </Link>
      </motion.div>
    </main>
  );
}
