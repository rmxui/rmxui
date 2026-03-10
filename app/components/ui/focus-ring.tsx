import { cn } from "~/lib/utils";

export function FocusRing({ className }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="focus-ring"
      className={cn(
        "pointer-events-none absolute inset-0 z-1 rounded-[inherit]",
        "outline-3 outline-offset-2 outline-secondary outline-none",
        className
      )}
    />
  );
}
