"use client"
import { useCallback } from "react"

import { Input } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { Button, type ButtonProps } from "~/components/ui/button"
import { Outline } from "~/components/ui/outline"
import { cn } from "~/lib/utils"

const inputGroup = cva(
  "group/input-group relative flex h-[56px] w-full max-w-fit min-w-0 items-center rounded-[4px] border-none outline-none",
  {
    variants: {
      variant: {
        outlined: null,
        filled: "rounded-none rounded-t-[4px] bg-surface-container-highest",
      },
    },
    defaultVariants: {
      variant: "outlined",
    },
  }
)

const inputContainer = cva(
  "border-solid group-focus-within/input-group:border-primary not-group-focus-within/input-group:group-hover/input-group:border-on-surface",
  {
    variants: {
      variant: {
        outlined:
          "border-solid border-outline group-focus-within/input-group:border-3",
        filled:
          "border-x-0 border-t-0 border-on-surface-variant group-focus-within/input-group:border-b-3",
      },
    },
    defaultVariants: {
      variant: "outlined",
    },
  }
)

type InputGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof inputGroup>

function InputGroup({
  children,
  className,
  variant = "outlined",
  ...props
}: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      data-variant={variant}
      className={cn(inputGroup({ variant }), className)}
      {...props}
    >
      <Outline className={cn(inputContainer({ variant }))} />
      {children}
    </div>
  )
}

const input = cva([
  "resize-none rounded-[inherit] border-none bg-[initial] text-[16px]/[24px] font-[400] tracking-[0.5px] text-on-surface caret-primary outline-none placeholder:text-on-surface-variant",
  "group-not-has-data-[align=inline-end]/input-group:pe-[16px] group-not-has-data-[align=inline-start]/input-group:ps-[16px]",
])

type InputGroupInputProps = Input.Props

function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <Input
      className={cn(input(), "h-[inherit] w-full min-w-0 flex-1", className)}
      {...props}
    />
  )
}

const inputGroupAddon = cva(
  "flex h-[inherit] cursor-text items-center justify-center text-on-surface-variant",
  {
    variants: {
      align: {
        "inline-start":
          "order-first ps-[12px] pe-[16px] has-data-[slot=input-group-text]:pe-px has-[>button]:px-[4px] has-[>button]:pe-[8px]",
        "inline-end":
          "order-last ps-[16px] pe-[12px] has-data-[slot=input-group-text]:ps-px has-[>button]:ps-[8px] has-[>button]:pe-[4px]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)
type InputGroupAddonProps = React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupAddon>

function InputGroupAddon({
  align = "inline-start",
  className,
  ...props
}: InputGroupAddonProps) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return
    e.currentTarget.parentElement?.querySelector("input")?.focus()
  }, [])

  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddon({ align }), className)}
      onClick={handleClick}
      {...props}
    />
  )
}

type InputGroupButtonProps = ButtonProps

function InputGroupButton({
  className,
  size = "icon-sm",
  variant = "standard",
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      data-slot="input-group-button"
      data-size={size}
      size={size}
      variant={variant}
      className={cn(
        (variant === "standard" || variant === "ghost") &&
          "state-layer-on-surface-variant! *:[svg]:text-on-surface-variant",
        className
      )}
      {...props}
    />
  )
}

type InputGroupTextProps = React.ComponentProps<"div">

function InputGroupText({ ...props }: InputGroupTextProps) {
  return <div data-slot="input-group-text" {...props} />
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
}
