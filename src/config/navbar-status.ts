import { BriefcaseBusiness, FileText } from "lucide-react";

export const STATUS_ITEMS: {
  id: string;
  label: string;
  icon: typeof BriefcaseBusiness;
  href: string | null;
}[] = [
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
    href: "https://drive.google.com/file/d/1Iv49tbMmenmPZ3h8NnZvbLbx_Hefzah7/view?usp=sharing",
  },
];
