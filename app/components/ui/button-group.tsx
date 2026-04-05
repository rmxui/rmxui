"use client"
import { createContext, useContext } from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { Separator } from "~/components/ui/separator"
import { cn } from "~/lib/utils"

type ButtonGroupContextState = VariantProps<typeof buttonGroup>

const ButtonGroupContext = createContext<ButtonGroupContextState | undefined>(
  undefined
)

function useButtonGroup() {
  const context = useContext(ButtonGroupContext)
  return context
}

const buttonGroup = cva("group/button-group peer/button-group inline-flex", {
  variants: {
    size: {
      default: "gap-[12px]",
      xs: "gap-[18px]",
      sm: "gap-[12px]",
      md: "gap-[8px]",
      lg: "gap-[8px]",
      xl: "gap-[8px]",
    },
    variant: {
      standard: null,
      split: "gap-[2px]",
    },
  },
  compoundVariants: [
    {
      size: "xs",
      variant: "split",
      class: [
        "h-[32px]",
        "*:data-[slot=button]:rounded-[4px]",
        "*:data-[slot=button]:first:rounded-s-[16px] *:data-[slot=button]:first:ps-[12px] *:data-[slot=button]:first:pe-[10px]",
        "*:data-[slot=button]:last:rounded-e-[16px] *:data-[slot=button]:last:ps-[10px] *:data-[slot=button]:last:pe-[12px]",
        "*:data-[slot=button]:active:rounded-[8px] *:data-[slot=button]:active:first:rounded-s-[16px] *:data-[slot=button]:active:last:rounded-e-[16px]",
        "*:data-[slot=button]:data-[size^=icon]:first:ps-[14px] *:data-[slot=button]:data-[size^=icon]:first:pe-[12px]",
        "*:data-[slot=button]:data-[size^=icon]:last:ps-[12px] *:data-[slot=button]:data-[size^=icon]:last:pe-[14px]",
        "*:data-[slot=button]:data-[size^=icon]:data-pressed:rounded-full *:data-[slot=button]:data-[size^=icon]:data-pressed:ps-[13px] *:data-[slot=button]:data-[size^=icon]:data-pressed:pe-[13px]",
        "*:data-[slot=button]:data-[size^=icon]:*:[svg]:size-[22px]",
      ],
    },
    {
      size: "sm",
      variant: "split",
      class: [
        "h-[40px]",
        "*:data-[slot=button]:rounded-[4px]",
        "*:data-[slot=button]:first:rounded-s-[20px] *:data-[slot=button]:first:ps-[16px] *:data-[slot=button]:first:pe-[12px]",
        "*:data-[slot=button]:last:rounded-e-[20px] *:data-[slot=button]:last:ps-[12px] *:data-[slot=button]:last:pe-[16px]",
        "*:data-[slot=button]:active:rounded-[12px] *:data-[slot=button]:active:first:rounded-s-[20px] *:data-[slot=button]:active:last:rounded-e-[20px]",
        "*:data-[slot=button]:data-[size^=icon]:first:ps-[14px] *:data-[slot=button]:data-[size^=icon]:first:pe-[12px]",
        "*:data-[slot=button]:data-[size^=icon]:last:ps-[12px] *:data-[slot=button]:data-[size^=icon]:last:pe-[14px]",
        "*:data-[slot=button]:data-[size^=icon]:data-pressed:rounded-full *:data-[slot=button]:data-[size^=icon]:data-pressed:ps-[13px] *:data-[slot=button]:data-[size^=icon]:data-pressed:pe-[13px]",
        "*:data-[slot=button]:data-[size^=icon]:*:[svg]:size-[22px]",
      ],
    },
    {
      size: "md",
      variant: "split",
      class: [
        "h-[56px]",
        "*:data-[slot=button]:rounded-[4px] *:data-[slot=button]:first:rounded-s-[28px] *:data-[slot=button]:last:rounded-e-[28px]",
        "*:data-[slot=button]:active:rounded-[12px] *:data-[slot=button]:active:first:rounded-s-[28px] *:data-[slot=button]:active:last:rounded-e-[28px]",
        "*:data-[slot=button]:data-[size^=icon]:first:ps-[17px] *:data-[slot=button]:data-[size^=icon]:first:pe-[13px]",
        "*:data-[slot=button]:data-[size^=icon]:last:ps-[13px] *:data-[slot=button]:data-[size^=icon]:last:pe-[17px]",
        "*:data-[slot=button]:data-[size^=icon]:data-pressed:rounded-full *:data-[slot=button]:data-[size^=icon]:data-pressed:ps-[15px] *:data-[slot=button]:data-[size^=icon]:data-pressed:pe-[15px]",
        "*:data-[slot=button]:data-[size^=icon]:*:[svg]:size-[26px]",
      ],
    },
    {
      size: "lg",
      variant: "split",
      class: [
        "h-[96px]",
        "*:data-[slot=button]:rounded-[8px] *:data-[slot=button]:first:rounded-s-[48px] *:data-[slot=button]:last:rounded-e-[48px]",
        "*:data-[slot=button]:active:rounded-[20px] *:data-[slot=button]:active:first:rounded-s-[48px] *:data-[slot=button]:active:last:rounded-e-[48px]",
        "*:data-[slot=button]:data-[size^=icon]:first:ps-[32px] *:data-[slot=button]:data-[size^=icon]:first:pe-[26px]",
        "*:data-[slot=button]:data-[size^=icon]:last:ps-[26px] *:data-[slot=button]:data-[size^=icon]:last:pe-[32px]",
        "*:data-[slot=button]:data-[size^=icon]:data-pressed:rounded-full *:data-[slot=button]:data-[size^=icon]:data-pressed:ps-[29px] *:data-[slot=button]:data-[size^=icon]:data-pressed:pe-[29px]",
        "*:data-[slot=button]:data-[size^=icon]:*:[svg]:size-[38px]",
      ],
    },
    {
      size: "xl",
      variant: "split",
      class: [
        "h-[136px]",
        "*:data-[slot=button]:rounded-[12px] *:data-[slot=button]:first:rounded-s-[68px] *:data-[slot=button]:last:rounded-e-[68px]",
        "*:data-[slot=button]:active:rounded-[20px] *:data-[slot=button]:active:first:rounded-s-[68px] *:data-[slot=button]:active:last:rounded-e-[68px]",
        "*:data-[slot=button]:data-[size^=icon]:first:ps-[49px] *:data-[slot=button]:data-[size^=icon]:first:pe-[37px]",
        "*:data-[slot=button]:data-[size^=icon]:last:ps-[37px] *:data-[slot=button]:data-[size^=icon]:last:pe-[49px]",
        "*:data-[slot=button]:data-[size^=icon]:data-pressed:rounded-full *:data-[slot=button]:data-[size^=icon]:data-pressed:ps-[43px] *:data-[slot=button]:data-[size^=icon]:data-pressed:pe-[43px]",
        "*:data-[slot=button]:data-[size^=icon]:*:[svg]:size-[50px]",
      ],
    },
  ],
  defaultVariants: {
    size: "sm",
  },
})

type ButtonGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof buttonGroup>

function ButtonGroup({
  className,
  size = "sm",
  variant = "standard",
  ...props
}: ButtonGroupProps) {
  return (
    <ButtonGroupContext value={{ size, variant }}>
      <div
        role="group"
        data-slot="button-group"
        data-size={size}
        data-variant={variant}
        className={cn(buttonGroup({ size, variant }), className)}
        {...props}
      />
    </ButtonGroupContext>
  )
}

function ButtonGroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex items-center gap-2 rounded-md border bg-muted px-2.5 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "button-group-text",
    },
  })
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  buttonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  useButtonGroup,
  type ButtonGroupProps,
}
