"use client"
import { cn } from "~/lib/utils"

export function Outline({ className }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="outline"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        "border border-none border-outline-variant",
        className
      )}
    />
  )
}
