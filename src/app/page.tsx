import { Hero } from "@/components/sections/hero";
import { BentoCard } from "@/components/shared/bento-card";

export default function HomePage() {
  return (
    <main className="grid grid-cols-1 gap-3 pb-6 md:grid-cols-2 lg:grid-cols-3">
      <Hero />

      <BentoCard className="min-h-70" />

      <BentoCard
        className="
          min-h-70
          md:col-start-2 md:row-start-1 md:row-span-2
          lg:col-start-3
        "
      />

      <BentoCard
        className="
          min-h-45
          md:col-start-1 md:row-start-2
          lg:col-span-2
        "
      />
    </main>
  );
}
