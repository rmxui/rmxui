"use client"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { Elevation } from "~/components/ui/elevation"
import { FocusRing } from "~/components/ui/focus-ring"
import { Outline } from "~/components/ui/outline"
import { StateLayer } from "~/components/ui/state-layer"
import { cn } from "~/lib/utils"

const card = cva(
  "group/card relative inline-flex w-full rounded-[12px] focus-visible:*:data-[slot=focus-ring]:outline-solid *:[svg]:size-[24px] *:[svg]:text-primary",
  {
    variants: {
      variant: {
        elevated:
          "bg-surface-container-low data-disabled:bg-on-surface/10 data-disabled:**:text-on-surface/38",
        filled:
          "bg-surface-container-highest data-disabled:bg-on-surface/10 data-disabled:**:text-on-surface/38",
        outlined:
          "*:data-[slot=outline]:border-solid data-disabled:bg-on-surface/10 data-disabled:**:text-on-surface/38",
      },
      actionable: {
        false: null,
        true: null,
      },
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row",
      },
    },
    compoundVariants: [
      { actionable: false, variant: "elevated", class: "elevation-1" },
      {
        actionable: true,
        variant: "elevated",
        class: "state-layer-on-surface elevation-1/2",
      },
      { actionable: false, variant: "filled", class: "elevation-0" },
      {
        actionable: true,
        variant: "filled",
        class: "state-layer-on-surface elevation-0/1",
      },
      { actionable: false, variant: "outlined", class: "elevation-0" },
      {
        actionable: true,
        variant: "outlined",
        class: "state-layer-on-surface elevation-0/1",
      },
    ],
    defaultVariants: {
      variant: "elevated",
      actionable: false,
      orientation: "vertical",
    },
  }
)

type CardProps = useRender.ComponentProps<"div"> &
  VariantProps<typeof card> & {
    disabled?: boolean
  }

function Card({
  actionable,
  children,
  className,
  disabled: disabledProp,
  orientation = "vertical",
  render,
  tabIndex = 0,
  variant = "elevated",
  ...props
}: CardProps) {
  const disabled = actionable && disabledProp
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        inert: disabled,
        tabIndex: disabled || !actionable ? undefined : tabIndex,
        className: cn(card({ variant, actionable, orientation }), className),
        children: (
          <>
            <FocusRing />
            {(!actionable || !disabled) && <Elevation />}
            {variant === "outlined" && <Outline />}
            {!disabled && <StateLayer />}
            {children}
          </>
        ),
      },
      props
    ),
    state: {
      slot: "card",
      actionable,
      disabled,
      orientation,
      variant,
    },
  })
}

// header includes: image
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        "p-[16px]",
        className
      )}
      {...props}
    />
  )
}

// headline
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-[16px]/[24px] font-[500] tracking-[0.15px] text-on-surface",
        className
      )}
      {...props}
    />
  )
}

// subhead
function CardSubtitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-subtitle"
      className={cn(
        "text-[14px]/[20px] font-[400] tracking-[0.25px] text-on-surface",
        className
      )}
      {...props}
    />
  )
}

// supporting text
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-[14px]/[20px] font-[400] tracking-[0.25px] text-on-surface-variant",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        "has-data-[size=icon]:-me-[12px] has-data-[size=icon]:-mt-[8px] has-data-[size=icon-sm]:-me-[12px] has-data-[size=icon-sm]:-mt-[8px] has-data-[size=icon-xs]:-me-[8px] has-data-[size=icon-xs]:-mt-[4px]",
        "has-data-[size=default]:-me-[12px] has-data-[size=default]:-mt-[8px] has-data-[size=sm]:-me-[12px] has-data-[size=sm]:-mt-[8px] has-data-[size=xs]:-me-[8px] has-data-[size=xs]:-mt-[4px]",
        className
      )}
      {...props}
    />
  )
}

// content includes: title, subtitle, description
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "flex flex-col gap-[16px] p-[16px] text-[14px]/[20px] font-[400] tracking-[0.25px] text-on-surface-variant group-has-data-[slot=card-footer]/card:pb-0 group-has-data-[slot=card-header]/card:pt-0",
        className
      )}
      {...props}
    />
  )
}

type CardFooterProps = React.ComponentProps<"div"> & {
  align?: "start" | "center" | "end"
}
// actions
function CardFooter({ align = "end", className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      data-align={align ?? undefined}
      className={cn(
        "inline-flex gap-[8px] p-[16px] data-[align=center]:justify-center data-[align=end]:justify-end data-[align=start]:justify-start",
        className
      )}
      {...props}
    />
  )
}

type CardMediaProps = React.ComponentProps<"div"> & {
  variant?: "video" | "square"
}

function CardMedia({ className, variant, ...props }: CardMediaProps) {
  return (
    <div
      data-slot="card-media"
      data-variant={variant ?? undefined}
      className={cn(
        "rounded-[inherit] data-[variant=square]:aspect-square data-[variant=video]:aspect-video",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardSubtitle,
  CardTitle,
}
