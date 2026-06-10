"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiDocker,
  SiGooglecloud,
  SiPython,
  SiFastapi,
  SiSocketdotio,
} from "react-icons/si";

interface TechItem {
  name: string;
  icon: React.ElementType;
  color: string;
}

const techStack: TechItem[] = [
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Express", icon: SiExpress, color: "#ffffff" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Redis", icon: SiRedis, color: "#FF4438" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
];

const toolsUsed: TechItem[] = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  { name: "Socket.IO", icon: SiSocketdotio, color: "#ffffff" },
  { name: "Prisma", icon: SiPrisma, color: "#5a67d8" },
  { name: "Gemini SDK", icon: SiGooglecloud, color: "#4285F4" },
  { name: "Vercel AI SDK", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
];

function SkillChip({
  name,
  Icon,
  color,
}: {
  name: string;
  Icon: React.ElementType;
  color: string;
}) {
  return (
    <div
      className="
        group
        flex items-center gap-2
        rounded-xl
        border border-white/10
        bg-white/3
        px-3 py-2
        text-sm
        transition-all duration-200
        hover:border-white/20
        hover:bg-white/6
        hover:-translate-y-0.5
        hover:scale-105
        active:scale-95
        active:translate-y-0
      "
      style={{ "--brand-color": color } as React.CSSProperties}
    >
      <Icon
        className="
          h-4 w-4
          text-foreground/80
          transition-colors duration-200
          group-hover:text-[var(--brand-color)]
        "
      />
      <span>{name}</span>
    </div>
  );
}

export function TechStack() {
  const [view, setView] = useState<"stack" | "tools">("stack");

  const items = view === "stack" ? techStack : toolsUsed;

  return (
    <div className="h-full">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">Tech Stack</h2>
          <p className="text-sm text-muted-foreground">
            {view === "stack"
              ? "Technologies I use to build and ship products."
              : "More tools I've worked with across projects."}
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setView(view === "stack" ? "tools" : "stack")}
          className="
            flex h-9 w-9 items-center justify-center
            rounded-lg
            border border-white/10
            bg-white/3
            transition-all duration-200
            hover:border-white/20
            hover:bg-white/6
          "
        >
          <ArrowRight
            className={`
              h-4 w-4 transition-transform duration-300
              ${view === "tools" ? "rotate-180" : ""}
            `}
          />
        </motion.button>
      </div>

      <div className="relative min-h-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            className="absolute inset-0 flex flex-wrap content-start gap-2"
            initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {items.map((item) => (
              <SkillChip
                key={item.name}
                name={item.name}
                Icon={item.icon}
                color={item.color}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
