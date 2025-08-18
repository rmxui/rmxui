import { Toggle } from "@base-ui-components/react";
import { cva, type VariantProps } from "class-variance-authority";
import { Elevation } from "~/components/ui/elevation";
import { FocusRing } from "~/components/ui/focus-ring";
import { Icon } from "~/components/ui/icon";
import { Label } from "~/components/ui/label";
import { Outline } from "~/components/ui/outline";
import { Ripple } from "~/components/ui/ripple";
import { cn } from "~/lib/utils";

export const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "outline-none border-none",
    "focus-visible:*:data-[slot=focus-ring]:outline-solid",
  ],
  {
    variants: {
      size: {
        xs: [
          "h-[32px]",
          "font-[500] text-[14px]/[20px] tracking-[0.1px]",
          "*:data-[slot=icon]:*:size-[20px]",
          "px-[12px] gap-[8px]",
          "active:rounded-[8px] data-pressed:rounded-[8px]",
        ],
        sm: [
          "h-[40px]",
          "font-[500] text-[14px]/[20px] tracking-[0.1px]",
          "*:data-[slot=icon]:*:size-[20px]",
          "px-[16px] gap-[8px]",
          "active:rounded-[8px] data-pressed:rounded-[8px]",
        ],
        md: [
          "h-[56px]",
          "font-[500] text-[16px]/[24px] tracking-[0.15px]",
          "*:data-[slot=icon]:*:size-[24px]",
          "px-[24px] gap-[8px]",
          "active:rounded-[12px] data-pressed:rounded-[12px]",
        ],
        lg: [
          "h-[96px]",
          "font-[400] text-[24px]/[32px] tracking-[0px]",
          "*:data-[slot=icon]:*:size-[32px]",
          "px-[48px] gap-[12px]",
          "active:rounded-[16px] data-pressed:rounded-[16px]",
        ],
        xl: [
          "h-[136px]",
          "font-[400] text-[32px]/[40px] tracking-[0px]",
          "*:data-[slot=icon]:*:size-[40px]",
          "px-[64px] gap-[16px]",
          "active:rounded-[16px] data-pressed:rounded-[16px]",
        ],
      },
      shape: {
        round: ["rounded-full"],
        square: null,
      },
      color: {
        elevated: ["bg-surface-container-low text-primary", "ripple-primary"],
        filled: ["bg-primary text-on-primary", "ripple-on-primary"],
        tonal: [
          "bg-secondary-container text-on-secondary-container",
          "ripple-on-secondary-container",
        ],
        outlined: [
          "bg-[initial] text-on-surface-variant",
          "ripple-on-surface-variant",
          "*:data-[slot=outline]:border-solid *:data-[slot=outline]:border-outline-variant",
        ],
        text: ["bg-[initial] text-primary", "ripple-primary"],
      },
      toggle: {
        true: null,
        false: null,
      },
      disabled: {
        false: null,
        true: [
          "pointer-events-none",
          "bg-on-surface/[0.12] text-on-surface/[0.38]",
        ],
      },
    },
    compoundVariants: [
      { size: "xs", shape: "square", class: "rounded-[12px]" },
      { size: "sm", shape: "square", class: "rounded-[12px]" },
      { size: "md", shape: "square", class: "rounded-[16px]" },
      { size: "lg", shape: "square", class: "rounded-[28px]" },
      { size: "xl", shape: "square", class: "rounded-[28px]" },
      {
        size: "xs",
        color: "outlined",
        class: "*:data-[slot=outline]:border-[1px]",
      },
      {
        size: "sm",
        color: "outlined",
        class: "*:data-[slot=outline]:border-[1px]",
      },
      {
        size: "md",
        color: "outlined",
        class: "*:data-[slot=outline]:border-[1px]",
      },
      {
        size: "lg",
        color: "outlined",
        class: "*:data-[slot=outline]:border-[2px]",
      },
      {
        size: "xl",
        color: "outlined",
        class: "*:data-[slot=outline]:border-[3px]",
      },
      {
        color: "elevated",
        toggle: true,
        class:
          "data-pressed:bg-primary data-pressed:text-on-primary data-pressed:ripple-on-primary",
      },
      {
        color: "filled",
        toggle: true,
        class: [
          "bg-surface-container text-on-surface-variant ripple-on-surface-variant",
          "data-pressed:bg-primary data-pressed:text-on-primary data-pressed:ripple-on-primary",
        ],
      },
      {
        color: "tonal",
        toggle: true,
        class:
          "data-pressed:bg-secondary data-pressed:text-on-secondary data-pressed:ripple-on-secondary",
      },
      {
        color: "outlined",
        toggle: true,
        class: [
          "text-on-surface-variant ripple-on-surface-variant",
          "data-pressed:bg-inverse-surface data-pressed:text-inverse-on-surface data-pressed:ripple-inverse-on-surface",
          "data-pressed:*:data-[slot=outline]:border-none",
        ],
      },
      {
        color: "elevated",
        disabled: false,
        class: "elevation-1",
      },
      {
        color: "elevated",
        disabled: true,
        class: "elevation-0",
      },
      {
        disabled: true,
        toggle: true,
        class: [
          "bg-on-surface/[0.12] text-on-surface/[0.38]",
          "data-pressed:bg-on-surface/[0.12] data-pressed:text-on-surface/[0.38]",
        ],
      },
    ],
    defaultVariants: {
      size: "sm",
      shape: "round",
      color: "filled",
      toggle: false,
      disabled: false,
    },
  },
);

export type ButtonProps = React.ComponentProps<typeof Toggle> &
  VariantProps<typeof buttonVariants> & {
    icon?: React.ReactNode;
    trailingIcon?: boolean;
    toggle?: boolean;
  };

export function Button({
  children,
  className,
  size = "sm",
  shape = "round",
  color = "filled",
  icon,
  trailingIcon = false,
  toggle = false,
  disabled = false,
  ...props
}: ButtonProps) {
  const Comp = toggle && color !== "text" ? Toggle : "button";

  return (
    <Comp
      data-slot="button"
      disabled={disabled}
      className={cn(
        buttonVariants({ size, shape, color, toggle, disabled, className }),
      )}
      {...props}
    >
      {color === "elevated" && <Elevation></Elevation>}
      {color === "outlined" && <Outline></Outline>}
      <FocusRing></FocusRing>
      <Ripple></Ripple>
      {icon && !trailingIcon && <Icon data-icon="leading">{icon}</Icon>}
      <Label>{children}</Label>
      {icon && trailingIcon && <Icon data-icon="trailing">{icon}</Icon>}
    </Comp>
  );
}
