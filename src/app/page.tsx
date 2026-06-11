import { Hero } from "@/components/sections/hero";
import { TechStack } from "@/components/sections/tech-stack";
import { BentoCard } from "@/components/shared/bento-card";
import { FadeUp } from "@/components/shared/fade-up";
import { GithubContributions } from "@/components/sections/github-calendar";

export default function HomePage() {
  return (
    <main className="grid grid-cols-1 gap-3 pb-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Hero — col 1 always */}
      <FadeUp delay={0.05}>
        <Hero />
      </FadeUp>

      {/*
       * Tech Stack — col 2 on sm/tablet, col 2 on desktop.
       * No min-height: let chips determine the card height naturally.
       */}
      <FadeUp delay={0.15}>
        <BentoCard className="h-full">
          <TechStack />
        </BentoCard>
      </FadeUp>

      {/*
       * Third bento — spans both cols on tablet so it doesn't look like
       * a half-empty strip. On desktop it goes to col 3, row 1–2.
       */}
      <FadeUp
        delay={0.25}
        className="sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1"
      >
        <BentoCard className="h-full min-h-64" />
      </FadeUp>

      {/* GitHub Calendar — full width on mobile/tablet, 2 cols on desktop */}
      <FadeUp delay={0.35} className="sm:col-span-2 lg:col-span-2">
        <GithubContributions />
      </FadeUp>
    </main>
  );
}
