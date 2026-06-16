"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Home, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { ProjectImage } from "@/components/ui/project-image";
import { Tooltip } from "@/components/ui/tooltip";
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

const iconBtn = cn(
  "flex h-9 w-9 items-center justify-center rounded-full",
  "border border-white/20 bg-white/10 text-white",
  "transition-all duration-150 hover:border-white/40 hover:bg-white/15 active:scale-90",
);

const pillBtn = cn(
  "flex items-center gap-2 rounded-full px-4 py-2",
  "border border-white/20 bg-white/10 text-sm font-medium text-white",
  "transition-all duration-150 hover:border-white/40 hover:bg-white/15 active:scale-95",
);

export function ProjectDetailClient({ project }: { project: Project }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 overflow-y-auto bg-black px-4 py-8"
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0 }}
          className="flex items-center gap-2"
        >
          <Tooltip label="Go back">
            <button
              onClick={() => router.back()}
              aria-label="Go back"
              className={iconBtn}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Tooltip>
          <Tooltip label="Home">
            <Link href="/" aria-label="Go home" className={iconBtn}>
              <Home className="h-4 w-4" />
            </Link>
          </Tooltip>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.05 }}
          className="flex items-center justify-between gap-4"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>
          <div className="flex shrink-0 items-center gap-2">
            {project.liveUrl && (
              <Tooltip label="Open live site">
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pillBtn}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live
                </Link>
              </Tooltip>
            )}
            {project.githubUrl && (
              <Tooltip label="View on GitHub">
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pillBtn}
                >
                  <FaGithub className="h-3.5 w-3.5" />
                  GitHub
                </Link>
              </Tooltip>
            )}
          </div>
        </motion.div>

        {project.tags && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1 text-sm text-white"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-base leading-relaxed text-white/70"
        >
          {project.longDescription}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          className="relative w-full overflow-hidden rounded-2xl border border-white/10"
          style={{ aspectRatio: "16/9" }}
        >
          <ProjectImage
            src={project.image}
            alt={project.title}
            slug={project.slug}
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="absolute inset-0 h-full w-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
