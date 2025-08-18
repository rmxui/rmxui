import { cn } from "~/lib/utils";

export function FocusRing({ className }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="focus-ring"
      className={cn(
        "absolute z-1 inset-0 rounded-[inherit] pointer-events-none",
        "outline-3 outline-secondary outline-none outline-offset-2",
        className,
      )}
    ></span>
  );
}
