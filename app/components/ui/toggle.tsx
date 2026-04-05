"use client"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { Button, button, type ButtonProps } from "~/components/ui/button"
import { cn } from "~/lib/utils"

const toggle = cva(
  [
    "group/toggle peer/toggle",
    "not-data-pressed:data-disabled:pointer-events-none not-data-pressed:data-disabled:bg-on-surface/10 not-data-pressed:data-disabled:text-on-surface/38",
    "data-pressed:data-disabled:pointer-events-none data-pressed:data-disabled:bg-on-surface/10 data-pressed:data-disabled:text-on-surface/38",
  ],
  {
    variants: {
      variant: {
        // original
        default: [
          "not-data-pressed:ripple-on-surface-variant not-data-pressed:bg-surface-container not-data-pressed:text-on-surface-variant",
          "data-pressed:ripple-on-primary data-pressed:bg-primary data-pressed:text-on-primary",
        ],
        secondary:
          "data-pressed:ripple-on-secondary data-pressed:bg-secondary data-pressed:text-on-secondary",
        outline:
          "data-pressed:ripple-inverse-on-surface data-pressed:bg-inverse-surface data-pressed:text-inverse-on-surface data-pressed:*:data-[slot=outline]:border-none",
        ghost: [
          "not-data-pressed:ripple-on-surface-variant not-data-pressed:bg-[initial] not-data-pressed:text-on-surface-variant",
          "data-pressed:ripple-primary data-pressed:bg-[initial] data-pressed:text-primary",
        ],
        destructive:
          "data-pressed:ripple-on-error data-pressed:bg-error data-pressed:text-on-error",
        link: "text-primary underline-offset-4 hover:underline",
        // material
        elevated:
          "data-pressed:ripple-on-primary data-pressed:bg-primary data-pressed:text-on-primary",
        filled: [
          "not-data-pressed:ripple-on-surface-variant not-data-pressed:bg-surface-container not-data-pressed:text-on-surface-variant",
          "data-pressed:ripple-on-primary data-pressed:bg-primary data-pressed:text-on-primary",
        ],
        tonal:
          "data-pressed:ripple-on-secondary data-pressed:bg-secondary data-pressed:text-on-secondary",
        outlined:
          "data-pressed:ripple-inverse-on-surface data-pressed:bg-inverse-surface data-pressed:text-inverse-on-surface data-pressed:*:data-[slot=outline]:border-none",
        standard: [
          "not-data-pressed:ripple-on-surface-variant not-data-pressed:bg-[initial] not-data-pressed:text-on-surface-variant",
          "data-pressed:ripple-primary data-pressed:bg-[initial] data-pressed:text-primary",
        ],
      },
      size: {
        // original
        default: null,
        icon: null,
        // material
        xs: null,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        "icon-xs": null,
        "icon-sm": null,
        "icon-md": null,
        "icon-lg": null,
        "icon-xl": null,
      },
      shape: {
        round: null,
        square: "data-pressed:not-active:rounded-full",
      },
    },
    compoundVariants: [
      {
        size: "default",
        shape: "round",
        class: "data-pressed:not-active:rounded-[12px]",
      },
      {
        size: "xs",
        shape: "round",
        class: "data-pressed:not-active:rounded-[12px]",
      },
      {
        size: "sm",
        shape: "round",
        class: "data-pressed:not-active:rounded-[12px]",
      },
      {
        size: "md",
        shape: "round",
        class: "data-pressed:not-active:rounded-[16px]",
      },
      {
        size: "lg",
        shape: "round",
        class: "data-pressed:not-active:rounded-[28px]",
      },
      {
        size: "xl",
        shape: "round",
        class: "data-pressed:not-active:rounded-[28px]",
      },
      {
        size: "icon",
        shape: "round",
        class: "data-pressed:not-active:rounded-[12px]",
      },
      {
        size: "icon-xs",
        shape: "round",
        class: "data-pressed:not-active:rounded-[12px]",
      },
      {
        size: "icon-sm",
        shape: "round",
        class: "data-pressed:not-active:rounded-[12px]",
      },
      {
        size: "icon-md",
        shape: "round",
        class: "data-pressed:not-active:rounded-[16px]",
      },
      {
        size: "icon-lg",
        shape: "round",
        class: "data-pressed:not-active:rounded-[28px]",
      },
      {
        size: "icon-xl",
        shape: "round",
        class: "data-pressed:not-active:rounded-[28px]",
      },
    ],
    defaultVariants: {
      variant: "filled",
      shape: "round",
    },
  }
)

type ToggleProps = TogglePrimitive.Props &
  VariantProps<typeof button> &
  VariantProps<typeof toggle>

function Toggle({
  variant = "filled",
  size = "sm",
  shape = "round",
  width = "default",
  className,
  nativeButton,
  render,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      nativeButton={nativeButton}
      className={cn(toggle({ variant, size, shape }), className)}
      render={
        <Button
          variant={variant}
          size={size}
          shape={shape}
          width={width}
          nativeButton={nativeButton}
          render={render as ButtonProps["render"]}
        />
      }
      {...props}
    />
  )
}

export { Toggle, toggle, type ToggleProps }
