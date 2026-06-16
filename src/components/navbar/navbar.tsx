"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/config/navigation";
import { NavItem } from "./nav-item";
import NavbarStatus from "./navbar-status";

export default function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (/^\/projects\/.+/.test(pathname)) return null;

  return (
    <motion.nav
      aria-label="Main Navigation"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="my-4 rounded-xl border border-white/10 bg-black px-4 py-3 md:my-6 md:px-6 md:py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/profile.png"
            alt="Aditya Tiwari"
            width={30}
            height={30}
            className="rounded-full border border-white"
            priority
          />
          <span className="text-lg font-semibold text-white md:text-xl">
            Aditya Tiwari
          </span>
        </div>

        <div className="hidden items-center gap-2 md:flex">
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

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <NavbarStatus />
          </div>
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white transition-colors duration-200 hover:border-white/20 hover:bg-white/5 md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 pt-3 border-t border-white/10 mt-3">
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
              <div className="pt-2">
                <NavbarStatus />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
