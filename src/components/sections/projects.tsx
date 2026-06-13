"use client";

import Link from "next/link";
import Image from "next/image";
import { FiLink2 } from "react-icons/fi";
import { FaGithub } from "react-icons/fa6";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BentoCard } from "@/components/shared/bento-card";
import { cn } from "@/lib/utils";
import { projects, type Project } from "@/config/projects";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col gap-3">
      {/* ── Image container ── */}
      {/*
       * Outer wrapper: fixed height, overflow-hidden, padded on sides + top.
       * No bottom padding — image bleeds to the bottom edge.
       * This creates the "stage" that clips the image.
       */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl",
          "bg-[oklch(0.17_0.012_264)]", // slightly lighter than card bg
          "border border-white/6",
          "px-4 pt-4", // padding: sides + top only
          "h-47", // fixed height — image will be clipped at bottom
        )}
      >
        {/*
         * Image wrapper: starts at natural size, on hover scales up slightly
         * and translates up — revealing more of the image from the bottom.
         * translateY trick: image starts "sunk" a bit, lifts on hover.
         */}
        <motion.div
          className="relative w-full h-full"
          style={{ translateY: "12%" }} // initially shows ~top 75% of image
          whileHover={{ translateY: "0%", scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className={cn(
              "relative w-full h-full rounded-lg overflow-hidden",
              "border border-white/10",
              "shadow-[0_-8px_32px_oklch(0_0_0/0.5)]", // top shadow for depth
            )}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </motion.div>
      </div>

      {/* ── Project info ── */}
      <div className="flex items-start justify-between gap-2 px-0.5">
        <div className="flex flex-col gap-0.5 min-w-0">
          <h3 className="text-base font-semibold leading-tight truncate">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-snug">
            {project.description}
          </p>
        </div>

        {/* Link + GitHub icons */}
        <div className="flex items-center gap-2 shrink-0 mt-0.5">
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
  );
}

export function ProjectsSection() {
  // Show only first 2 projects in the bento (homepage preview)
  const preview = projects.slice(0, 2);

  return (
    <BentoCard className="h-full flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects</h2>
        <Link
          href="/projects"
          className={cn(
            "flex items-center gap-1.5 text-sm text-muted-foreground",
            "transition-all duration-150",
            "hover:text-foreground hover:gap-2",
          )}
        >
          See more
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Project cards */}
      <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:flex lg:flex-col lg:gap-5">
        {preview.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </BentoCard>
  );
}
