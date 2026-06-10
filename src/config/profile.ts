import {
  FaXTwitter,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

export type Social = {
  label: string;
  href: string;
  icon: IconType;
};

export const profile = {
  name: "Aditya",
  fullName: "Aditya Tiwari",
  role: "Engineer & Full Stack Developer",
  bio: "I build and ship software from the ground up, combining full-stack development with AI to create useful, user-focused products.",
  avatar: "/profile.jpg",
  resume: "/resume.pdf",
  openToWork: true,
} as const;

export const socials: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/thegeekyb0y",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/adityacodes",
    icon: FaLinkedinIn,
  },
  {
    label: "X",
    href: "https://x.com/thegeekyb0y",
    icon: FaXTwitter,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/thegeekyb0y",
    icon: FaInstagram,
  },
];
