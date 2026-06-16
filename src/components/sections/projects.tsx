"use client";

import Link from "next/link";
import { FiLink2 } from "react-icons/fi";
import { FaGithub } from "react-icons/fa6";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BentoCard } from "@/components/shared/bento-card";
import { ProjectImage } from "@/components/ui/project-image";
import { cn } from "@/lib/utils";
import { projects, type Project } from "@/config/projects";

function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  return (
    <div className="group flex flex-col gap-3">
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/projects/${project.slug}`)}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-xl",
            "bg-[#13131c] border border-white/[0.06]",
            "px-4 pt-4 h-[188px]",
            "transition-colors duration-200 hover:border-white/20",
          )}
        >
          <motion.div
            className="relative w-full h-full"
            style={{ translateY: "12%" }}
            whileHover={{ translateY: "0%", scale: 1.02 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectImage
              src={project.image}
              alt={project.title}
              slug={project.slug}
              className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </div>

        <div className="flex items-start justify-between gap-2 px-0.5 mt-3">
          <div className="flex flex-col gap-0.5 min-w-0">
            <h3 className="text-base font-semibold leading-tight truncate transition-colors duration-150 group-hover:text-white/80">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-snug">
              {project.description}
            </p>
          </div>

          <div
            className="flex items-center gap-2 shrink-0 mt-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live link`}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  "border border-white/10 bg-white/5 text-muted-foreground",
                  "transition-all duration-150",
                  "hover:-translate-y-0.5 hover:border-white/20 hover:text-foreground",
                  "active:scale-90 active:translate-y-0",
                )}
              >
                <FiLink2 className="h-4 w-4" />
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub`}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  "border border-white/10 bg-white/5 text-muted-foreground",
                  "transition-all duration-150",
                  "hover:-translate-y-0.5 hover:border-white/20 hover:text-foreground",
                  "active:scale-90 active:translate-y-0",
                )}
              >
                <FaGithub className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const preview = projects.slice(0, 2);

  return (
    <BentoCard className="h-full flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects</h2>
        <Link
          href="/projects"
          className={cn(
            "flex items-center gap-1.5 text-sm text-muted-foreground",
            "transition-all duration-150 hover:text-foreground hover:gap-2",
          )}
        >
          See more
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:flex lg:flex-col lg:gap-5">
        {preview.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </BentoCard>
  );
}
