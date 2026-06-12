import { Hero } from "@/components/sections/hero";
import { TechStack } from "@/components/sections/tech-stack";
import { BentoCard } from "@/components/shared/bento-card";
import { FadeUp } from "@/components/shared/fade-up";
import { GithubContributions } from "@/components/sections/github-calendar";
import { ProjectsSection } from "@/components/sections/projects";

export default function HomePage() {
  return (
    <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <FadeUp delay={0.05} className="h-full">
        <Hero />
      </FadeUp>

      <FadeUp delay={0.15} className="h-full">
        <BentoCard className="h-full">
          <TechStack />
        </BentoCard>
      </FadeUp>

      <FadeUp
        delay={0.25}
        className="sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1"
      >
        <ProjectsSection />
      </FadeUp>

      {/* GitHub Calendar */}
      <FadeUp delay={0.35} className="sm:col-span-2 lg:col-span-2">
        <GithubContributions />
      </FadeUp>
    </main>
  );
}
