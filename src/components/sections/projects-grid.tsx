"use client";

import Link from "next/link";
import { FiLink2 } from "react-icons/fi";
import { FaGithub } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BentoCard } from "@/components/shared/bento-card";
import { ProjectImage } from "@/components/ui/project-image";
import { cn } from "@/lib/utils";
import { projects } from "@/config/projects";

export function ProjectsGrid() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <BentoCard
          key={project.slug}
          className="flex flex-col gap-4 cursor-pointer"
          onClick={() => router.push(`/projects/${project.slug}`)}
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-xl",
              "bg-[#13131c] border border-white/[0.06]",
              "px-4 pt-4 h-[200px]",
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

          <div
            className="flex items-start justify-between gap-2 px-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-0.5 min-w-0">
              <h3 className="text-base font-semibold leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
              {project.tags && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0 mt-0.5">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live`}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    "border border-white/10 bg-white/5 text-muted-foreground",
                    "transition-all duration-150",
                    "hover:-translate-y-0.5 hover:border-white/20 hover:text-foreground",
                    "active:scale-90",
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
                    "active:scale-90",
                  )}
                >
                  <FaGithub className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </BentoCard>
      ))}
    </div>
  );
}
