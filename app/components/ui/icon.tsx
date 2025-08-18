import { cn } from "~/lib/utils";

export function Icon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="icon"
      className={cn("relative pointer-events-none", className)}
      {...props}
    ></span>
  );
}
