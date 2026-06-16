"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export function Tooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <TooltipPrimitive.Provider delayDuration={0} skipDelayDuration={0}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side="bottom"
            sideOffset={6}
            className="z-50 rounded-md border border-white/10 bg-black/90 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 select-none"
          >
            {label}
            <TooltipPrimitive.Arrow className="fill-white/10" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
