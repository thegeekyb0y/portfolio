"use client";

import { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { BentoCard } from "@/components/shared/bento-card";

export function GithubContributions() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <BentoCard className="h-full">
      <div className="mb-3 sm:mb-4">
        <h2 className="text-base font-semibold sm:text-lg">
          Open Source Activity
        </h2>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Contributions over the last year.
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        {mounted ? (
          <div className="min-w-0">
            <GitHubCalendar
              username="thegeekyb0y"
              blockSize={11}
              blockMargin={3}
              fontSize={12}
              theme={{
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
            />
          </div>
        ) : (
          <div className="h-28 w-full animate-pulse rounded-lg bg-white/5" />
        )}
      </div>
    </BentoCard>
  );
}
