"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface NavItemProps {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hovered: string | null;
  setHovered: (value: string | null) => void;
  active?: boolean;
}

export function NavItem({
  title,
  href,
  icon: Icon,
  hovered,
  setHovered,
  active,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className="relative"
      onMouseEnter={() => setHovered(title)}
      onMouseLeave={() => setHovered(null)}
    >
      {(hovered === title || active) && (
        <motion.div
          layoutId="navbar-hover"
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 35,
            mass: 0.8,
          }}
          className="absolute inset-0 rounded-xl bg-slate-900"
        />
      )}

      <div className="relative z-10 flex items-center gap-2 px-4 py-2.5 text-white md:px-5 md:py-3">
        <Icon className="h-4 w-4 shrink-0 md:h-5 md:w-5" />
        <span className="text-sm md:text-base">{title}</span>
      </div>
    </Link>
  );
}
