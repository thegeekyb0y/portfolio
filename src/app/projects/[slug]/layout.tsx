import { AuroraBackground } from "@/components/ui/aurora-bg";
import { Bricolage_Grotesque } from "next/font/google";
import "../../globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function ProjectSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${bricolage.variable} dark min-h-screen antialiased`}>
      <AuroraBackground />
      <div className="max-w-7xl mx-auto w-full flex flex-col px-4 py-8">
        {children}
      </div>
    </div>
  );
}
