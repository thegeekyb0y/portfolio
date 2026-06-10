import Image from "next/image";
import Link from "next/link";
import { LuDownload } from "react-icons/lu";

import { BentoCard } from "@/components/shared/bento-card";

import { cn } from "@/lib/utils";
import { profile, socials } from "@/config/profile";

export function Hero() {
  return (
    <BentoCard className="flex min-h-70 flex-col justify-between gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-bold leading-tight">
            I&apos;m {profile.name} 👋
          </h1>
          <p className="text-sm font-medium">{profile.role}</p>
          <p className="max-w-60 text-sm leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>
        </div>

        <Image
          src={profile.avatar}
          alt={profile.fullName}
          width={120}
          height={120}
          priority
          className="shrink-0 rounded-xl border border-white/10 object-cover"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {socials.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                "border border-white/10 bg-white/5 text-muted-foreground",
                "transition-all duration-200",
                "hover:border-white/20 hover:text-foreground",
                "active:opacity-75",
              )}
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>

        <Link
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-2 rounded-lg px-3.5 py-2",
            "border border-white/10 bg-white/5",
            "text-sm font-medium transition-all duration-200",
            "hover:border-white/20 hover:bg-white/8",
            "active:opacity-75",
          )}
        >
          <LuDownload className="h-3.5 w-3.5" />
          Resume
        </Link>
      </div>
    </BentoCard>
  );
}
