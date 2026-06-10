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

const techStack = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "JavaScript", icon: SiJavascript },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Express", icon: SiExpress },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Redis", icon: SiRedis },
  { name: "Docker", icon: SiDocker },
];

const toolsUsed = [
  { name: "Python", icon: SiPython },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Socket.IO", icon: SiSocketdotio },
  { name: "Prisma", icon: SiPrisma },
  { name: "Gemini SDK", icon: SiGooglecloud },
  { name: "Vercel AI SDK", icon: SiNextdotjs },
  { name: "Google Cloud", icon: SiGooglecloud },
];

function SkillChip({ name, Icon }: { name: string; Icon: React.ElementType }) {
  return (
    <div
      className="
        flex items-center gap-2
        rounded-xl
        border border-white/10
        bg-white/3
        px-3 py-2
        text-sm
        transition-all duration-200
        hover:border-white/20
        hover:bg-white/6
      "
    >
      <Icon className="h-4 w-4 text-foreground/80" />
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
          <h2 className="text-lg font-semibold">
            {view === "stack" ? "Tech Stack" : "Tech Stack"}
          </h2>

          <p className="text-sm text-muted-foreground">
            {view === "stack"
              ? "Technologies I use to build and ship products."
              : "More Tools I've worked with across projects."}
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
            initial={{
              opacity: 0,
              scale: 0.98,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              filter: "blur(4px)",
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
          >
            {items.map((item) => (
              <SkillChip key={item.name} name={item.name} Icon={item.icon} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
