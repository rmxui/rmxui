"use client"
import { Children } from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { Elevation } from "~/components/ui/elevation"
import { Outline } from "~/components/ui/outline"
import { Ripple } from "~/components/ui/ripple"
import { cn } from "~/lib/utils"

const badgeVariants = cva(
  "group/badge relative flex shrink-0 flex-col items-center justify-center rounded-full border-none text-[10px]/[16px] font-[500] tracking-[0.5px] outline-none",
  {
    variants: {
      variant: {
        // original
        default: "bg-error text-on-error [a]:ripple-on-error",
        primary: "bg-primary text-on-primary [a]:ripple-on-primary",
        secondary:
          "bg-secondary-container text-on-secondary-container [a]:ripple-on-secondary-container",
        outline:
          "bg-[initial] text-on-surface-variant *:data-[slot=outline]:border-solid [a]:ripple-on-surface-variant",
        ghost: "ripple-primary bg-[initial] text-primary",
        destructive:
          "bg-error-container text-on-error-container [a]:ripple-on-error-container",
        link: "text-primary underline-offset-4 hover:underline",
        // material
        elevated:
          "bg-surface-container-low text-primary elevation-1 data-disabled:elevation-0 [a]:ripple-primary",
        filled: "bg-primary text-on-primary [a]:ripple-on-primary",
        tonal:
          "bg-secondary-container text-on-secondary-container [a]:ripple-on-secondary-container",
        outlined:
          "bg-[initial] text-on-surface-variant *:data-[slot=outline]:border-solid [a]:ripple-on-surface-variant",
      },
      size: {
        sm: "size-[6px]",
        lg: "h-[16px] w-fit min-w-[16px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  }
)

type BadgeProps = useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    value?: string
  }

function Badge({
  children,
  className,
  value,
  variant = "default",
  size = "lg",
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
        children: (
          <>
            {variant === "elevated" && <Elevation />}
            {(variant === "outlined" || variant === "outline") && <Outline />}
            <Ripple />
            {children}
          </>
        ),
      },
      props
    ),
    state: { slot: "badge", variant },
  })
}

type BadgeTextProps = useRender.ComponentProps<"span">

function BadgeText({ children, className, render, ...props }: BadgeTextProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps(
      {
        className: cn(
          "px-[4px] text-center",
          { "pe-[3.25px]": isSingleDigit(children) },
          className
        ),
        children,
      },
      props
    ),
    state: { slot: "badge-text" },
  })
}

function isSingleDigit(children: React.ReactNode) {
  return (
    Children.count(children) === 1 &&
    typeof children === "string" &&
    children.length === 1
  )
}

export { Badge, BadgeText, badgeVariants, type BadgeProps }
