"use client";

import { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { BentoCard } from "@/components/shared/bento-card";
import { profile } from "@/config/profile";

export function GithubContributions() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <BentoCard className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Open Source Activity</h2>
          <p className="text-sm text-muted-foreground">
            Contributions over the last year.
          </p>
        </div>
        <Link
          href="https://github.com/thegeekyb0y"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2
            rounded-lg border border-white/10 bg-white/5
            px-3 py-1.5
            text-sm font-medium text-muted-foreground
            transition-all duration-150
            hover:-translate-y-0.5 hover:border-white/20 hover:text-foreground
            active:scale-95 active:translate-y-0
          "
        >
          <FaGithub className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">@thegeekyb0y</span>
        </Link>
      </div>

      <div className="flex justify-center overflow-hidden">
        {mounted ? (
          <GitHubCalendar
            username="thegeekyb0y"
            blockSize={11.5}
            blockMargin={3}
            fontSize={12}
            theme={{
              dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
            }}
          />
        ) : (
          <div className="h-30 w-full animate-pulse rounded-lg bg-white/5" />
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-4 overflow-x-auto scrollbar-none">
        <span className="text-xs text-muted-foreground/60 shrink-0">
          Currently exploring
        </span>
        <span className="text-xs text-muted-foreground/40 shrink-0">→</span>
        {["LangGraph", "RAG Pipelines", "System Design"].map((tag) => (
          <span
            key={tag}
            className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground transition-colors duration-150 hover:border-white/20 hover:text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}
