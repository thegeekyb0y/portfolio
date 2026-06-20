import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { AuroraBackground } from "@/components/ui/aurora-bg";
import { Analytics } from "@vercel/analytics/next";

const bricolage = Bricolage_Grotesque({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thegeekyb0y.vercel.app"),
  title: "Aditya Tiwari : Full Stack Engineer",
  description:
    "Full-stack engineer building production-grade software with TypeScript, Next.js, and modern web tooling.",
  keywords: [
    "Aditya Tiwari",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Software Engineer",
  ],
  authors: [{ name: "Aditya Tiwari" }],
  openGraph: {
    title: "Aditya Tiwari : Full Stack Engineer",
    description:
      "Full-stack engineer building production-grade software with TypeScript, Next.js, and modern web tooling.",
    siteName: "Aditya Tiwari",
    url: "https://thegeekyb0y.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Tiwari : Full Stack Engineer",
    description:
      "Full-stack engineer building production-grade software with TypeScript, Next.js, and modern web tooling.",
  },
};
