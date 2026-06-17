import Image from "next/image";
import Link from "next/link";
import { profile, socials } from "@/config/profile";
import { BentoCard } from "@/components/shared/bento-card";
import { ContactForm } from "./contact-form";

export function ContactSidebar() {
  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-6">
      <BentoCard className="flex flex-col items-center gap-4 text-center">
        <Image
          src={profile.avatar}
          alt={profile.fullName}
          width={88}
          height={88}
          className="rounded-xl border border-white/10 object-cover"
        />
        <div>
          <h1 className="text-lg font-semibold">I&apos;m {profile.name} 👋</h1>
          <p className="mt-1 text-sm text-muted-foreground">{profile.role}</p>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {profile.bio}
        </p>
        <div className="flex items-center gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-all duration-150 hover:-translate-y-0.5 hover:border-white/20 hover:text-foreground active:scale-90"
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </BentoCard>

      <BentoCard className="flex flex-col gap-4">
        <div>
          <h2 className="text-sm font-semibold">Prefer email?</h2>
          <p className="text-xs text-muted-foreground">
            I&apos;ll get back within a day.
          </p>
        </div>
        <ContactForm />
      </BentoCard>
    </div>
  );
}
