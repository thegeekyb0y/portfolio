"use client";

import { BentoCard } from "@/components/shared/bento-card";
import { GitHubCalendar } from "react-github-calendar";

export function GithubContributions() {
  return (
    <BentoCard className="col-span-full overflow-hidden">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">GitHub Contributions</h2>
        <p className="text-sm text-muted-foreground">
          My coding activity over the last year.
        </p>
      </div>

      <div className="overflow-x-auto">
        <GitHubCalendar username="thegeekyb0y" fontSize={14} />
      </div>
    </BentoCard>
  );
}
