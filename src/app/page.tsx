import { Hero } from "@/components/sections/hero";
import { TechStack } from "@/components/sections/tech-stack";
import { BentoCard } from "@/components/shared/bento-card";
import { FadeUp } from "@/components/shared/fade-up";
import { GithubContributions } from "@/components/sections/github-calendar";

export default function HomePage() {
  return (
    <main className="grid grid-cols-1 gap-3 pb-6 md:grid-cols-2 lg:grid-cols-3">
      <FadeUp delay={0.05}>
        <Hero />
      </FadeUp>

      <FadeUp delay={0.15} className="min-h-70">
        <BentoCard className="h-full min-h-70">
          <TechStack />
        </BentoCard>
      </FadeUp>

      <FadeUp
        delay={0.25}
        className="min-h-70 md:col-span-2 md:row-auto lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1"
      >
        <BentoCard className="h-full min-h-70" />
      </FadeUp>

      <FadeUp delay={0.35} className="md:col-span-2 lg:col-span-2">
        <GithubContributions />
      </FadeUp>
    </main>
  );
}
