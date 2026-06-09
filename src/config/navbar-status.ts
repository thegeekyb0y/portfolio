import { BriefcaseBusiness, FileText } from "lucide-react";

export const STATUS_ITEMS = [
  {
    id: "work",
    label: "Available for work",
    icon: BriefcaseBusiness,
    href: null,
  },
  {
    id: "resume",
    label: "View Resume",
    icon: FileText,
    href: "/resume.pdf",
  },
] as const;
