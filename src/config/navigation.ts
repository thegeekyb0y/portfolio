import { Home, FolderGit2 } from "lucide-react";
import { GeminiIcon } from "@/components/icons/gemini-icon";

export type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
};

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderGit2,
  },
  {
    title: "Let's Chat",
    href: "/contact",
    icon: GeminiIcon,
  },
];
