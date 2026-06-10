"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { NAV_ITEMS } from "@/config/navigation";
import { NavItem } from "./nav-item";
import NavbarStatus from "./navbar-status";

export default function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.nav
      aria-label="Main Navigation"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0 }}
      className="my-6 rounded-2xl border border-white/10 bg-black px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <Image
            src="/profile.png"
            alt="Aditya Tiwari"
            width={30}
            height={30}
            className="rounded-full border border-white"
            priority
          />

          <span className="text-xl font-semibold text-white">
            Aditya Tiwari
          </span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.title}
              title={item.title}
              href={item.href}
              icon={item.icon}
              hovered={hovered}
              setHovered={setHovered}
              active={pathname === item.href}
            />
          ))}
        </div>

        {/* Right */}
        <NavbarStatus />
      </div>
    </motion.nav>
  );
}
