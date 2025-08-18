import { cn } from "~/lib/utils";

export function Outline({ className }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="outline"
      className={cn(
        "absolute inset-0 rounded-[inherit] pointer-events-none",
        "border border-outline border-none",
        className,
      )}
    ></span>
  );
}
