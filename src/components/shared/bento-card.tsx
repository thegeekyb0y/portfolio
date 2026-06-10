import { cn } from "@/lib/utils";

export function BentoCard({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-white/10 bg-black p-5",
        "transition-colors duration-300 hover:border-white/15",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
