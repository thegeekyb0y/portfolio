import { Hero } from "@/components/sections/hero";
import { TechStack } from "@/components/sections/tech-stack";
import { BentoCard } from "@/components/shared/bento-card";
import { FadeUp } from "@/components/shared/fade-up";
import { GithubContributions } from "@/components/sections/github-calendar";

export default function HomePage() {
  return (
    <main className="grid grid-cols-1 gap-3 pb-6 sm:grid-cols-2 lg:grid-cols-3">
      {/*
       * h-full on FadeUp → the motion.div fills the CSS Grid cell height.
       * Hero's BentoCard (also h-full) then fills that → both row-1 cards
       * are pixel-identical in height, bottom edges flush with each other.
       */}
      <FadeUp delay={0.05} className="h-full">
        <Hero />
      </FadeUp>

      <FadeUp delay={0.15} className="h-full">
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
