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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuroraBackground /> {/* ← fixed, full screen */}
        <div className="max-w-7xl mx-auto w-full flex flex-col px-4">
          <Navbar />

          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
