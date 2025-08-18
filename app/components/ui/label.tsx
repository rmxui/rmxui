import { cn } from "~/lib/utils";

export function Label({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="label"
      className={cn("relative pointer-events-none", className)}
      {...props}
    ></span>
  );
}
