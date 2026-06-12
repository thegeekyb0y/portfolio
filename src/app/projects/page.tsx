import { ProjectsGrid } from "@/components/sections/projects-grid";
import { FadeUp } from "@/components/shared/fade-up";

export const metadata = {
  title: "Projects | Aditya Tiwari",
  description: "All projects built by Aditya Tiwari.",
};

export default function ProjectsPage() {
  return (
    <main className="pb-10">
      <FadeUp delay={0.5}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-1 text-muted-foreground">
            Things I&apos;ve built — from side projects to production apps.
          </p>
        </div>
      </FadeUp>

      <FadeUp delay={0.15}>
        <ProjectsGrid />
      </FadeUp>
    </main>
  );
}
