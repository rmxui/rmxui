"use client"
import { cn } from "~/lib/utils"

export function Elevation({ className }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="elevation"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        "before:absolute before:inset-0 before:rounded-[inherit] before:content-['']",
        "after:absolute after:inset-0 after:rounded-[inherit] after:content-['']",
        className
      )}
    />
  )
}
