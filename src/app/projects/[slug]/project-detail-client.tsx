"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Home, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { ProjectImage } from "@/components/ui/project-image";
import { cn } from "@/lib/utils";
import type { Project } from "@/config/projects";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ProjectDetailClient({ project }: { project: Project }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto pb-16"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl",
              "border border-white/10 bg-white/5 text-muted-foreground",
              "transition-all duration-150 hover:border-white/20 hover:text-foreground",
              "active:scale-90",
            )}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <Link
            href="/"
            aria-label="Go home"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl",
              "border border-white/10 bg-white/5 text-muted-foreground",
              "transition-all duration-150 hover:border-white/20 hover:text-foreground",
              "active:scale-90",
            )}
          >
            <Home className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2",
                "border border-white/10 bg-white/5 text-sm text-muted-foreground",
                "transition-all duration-150 hover:border-white/20 hover:text-foreground",
                "active:scale-95",
              )}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2",
                "border border-white/10 bg-white/5 text-sm text-muted-foreground",
                "transition-all duration-150 hover:border-white/20 hover:text-foreground",
                "active:scale-95",
              )}
            >
              <FaGithub className="h-3.5 w-3.5" />
              GitHub
            </Link>
          )}
        </div>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.05 }}
        className="text-3xl font-bold tracking-tight sm:text-4xl mb-3"
      >
        {project.title}
      </motion.h1>

      {project.tags && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      )}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.15 }}
        className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 mb-8"
      >
        <ProjectImage
          src={project.image}
          alt={project.title}
          slug={project.slug}
          priority
          className="absolute inset-0 w-full h-full"
        />
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="text-base leading-relaxed text-muted-foreground"
      >
        {project.longDescription}
      </motion.p>
    </motion.div>
  );
}
