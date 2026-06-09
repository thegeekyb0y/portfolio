"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseBusiness, FileText } from "lucide-react";
import { useState } from "react";

export default function NavbarStatus() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/resume.pdf"
      target="_blank"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="
        relative
        flex
        h-12
        w-52
        items-center
        justify-center
        overflow-hidden
        rounded-xl
        border
        border-white/10
        bg-slate-900
        text-white
      "
    >
      <AnimatePresence mode="wait">
        {!hovered ? (
          <motion.div
            key="work"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="absolute flex items-center gap-3"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute h-3 w-3 animate-ping rounded-full bg-emerald-500/40" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>

            <span className="font-medium">Available for work</span>
          </motion.div>
        ) : (
          <motion.div
            key="resume"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="absolute flex items-center gap-3"
          >
            <FileText size={18} />

            <span className="font-medium">View Resume</span>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}
