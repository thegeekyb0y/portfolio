import { Hero } from "@/components/sections/hero";
import { BentoCard } from "@/components/shared/bento-card";
import { ContactForm } from "./contact-form";

export function ContactSidebar() {
  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-6">
      <Hero />

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
