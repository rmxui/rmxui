import { cn } from "~/lib/utils";

export function Elevation({ className }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="elevation"
      className={cn(
        "absolute inset-0 rounded-[inherit] pointer-events-none",
        "before:absolute before:inset-0 before:rounded-[inherit] before:content-['']",
        "after:absolute after:inset-0 after:rounded-[inherit] after:content-['']",
        className,
      )}
    ></span>
  );
}
