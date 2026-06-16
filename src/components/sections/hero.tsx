import Image from "next/image";
import Link from "next/link";
import { LuDownload } from "react-icons/lu";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { BentoCard } from "@/components/shared/bento-card";
import { cn } from "@/lib/utils";
import { profile, socials } from "@/config/profile";

// Direct GIF URL from Tenor
const HOVER_GIF = "https://media1.tenor.com/m/LYget1dhLygAAAAC/google-it.gif";

export function Hero() {
  return (
    <BentoCard className="h-full flex flex-col justify-between gap-5">
      <div className="group flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h1
            className={cn(
              "text-xl font-bold leading-tight sm:text-2xl",
              "transition-opacity duration-300 group-hover:opacity-50",
            )}
          >
            I&apos;m {profile.name} 👋
          </h1>

          <p
            className={cn(
              "text-sm font-medium",
              "transition-opacity duration-300 group-hover:opacity-50",
            )}
          >
            {profile.role}
          </p>

          <p
            className={cn(
              "mt-1 text-sm leading-relaxed text-muted-foreground",
              "transition-all duration-300",
              "group-hover:text-foreground group-hover:opacity-100",
            )}
          >
            {profile.bio}
          </p>
        </div>

        <div className="group/img relative shrink-0">
          <Image
            src={profile.avatar}
            alt={profile.fullName}
            width={96}
            height={96}
            priority
            className={cn(
              "size-24 rounded-xl border border-white/10 object-cover",
              "sm:size-24 lg:size-28",
              "transition-opacity duration-500 ease-in-out",
              "opacity-100 group-hover/img:opacity-0",
            )}
          />
          <img
            src={HOVER_GIF}
            alt="Google it"
            className={cn(
              "absolute inset-0 size-24 rounded-xl border border-white/10 object-cover",
              "sm:size-24 lg:size-28",
              "transition-opacity duration-500 ease-in-out",
              "opacity-0 group-hover/img:opacity-100",
            )}
          />
        </div>
      </div>

      <div className="h-px w-full bg-white/5" />

      <div className="flex items-center justify-between gap-3">
        <TooltipPrimitive.Provider delayDuration={0} skipDelayDuration={0}>
          <div className="flex flex-wrap items-center gap-1.5">
            {socials.map(({ label, href, icon: Icon }) => (
              <TooltipPrimitive.Root key={label}>
                <TooltipPrimitive.Trigger asChild>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      "border border-white/10 bg-white/5 text-muted-foreground",
                      "transition-all duration-150",
                      "hover:-translate-y-0.5 hover:border-white/20 hover:text-foreground",
                      "active:scale-90 active:translate-y-0 active:opacity-70",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                </TooltipPrimitive.Trigger>

                <TooltipPrimitive.Portal>
                  <TooltipPrimitive.Content
                    side="top"
                    sideOffset={8}
                    className={cn(
                      "z-50 rounded-md px-2.5 py-1",
                      "border border-white/10 bg-black/90 backdrop-blur-sm",
                      "text-xs font-medium text-foreground select-none",
                      "animate-in fade-in-0 zoom-in-95 duration-100",
                      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
                      "data-[state=closed]:zoom-out-95 data-[state=closed]:duration-75",
                    )}
                  >
                    {label}
                    <TooltipPrimitive.Arrow className="fill-white/10" />
                  </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
              </TooltipPrimitive.Root>
            ))}
          </div>
        </TooltipPrimitive.Provider>

        <Link
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2",
            "border border-white/10 bg-white/5",
            "text-sm font-medium transition-all duration-200",
            "hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8",
            "active:scale-95 active:translate-y-0 active:opacity-75",
          )}
        >
          <LuDownload className="h-3.5 w-3.5" />
          Resume
        </Link>
      </div>
    </BentoCard>
  );
}
