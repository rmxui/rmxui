import { Toggle } from "@base-ui-components/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { Elevation } from "~/components/ui/elevation";
import { FocusRing } from "~/components/ui/focus-ring";
import { Icon } from "~/components/ui/icon";
import { Label } from "~/components/ui/label";
import { Outline } from "~/components/ui/outline";
import { Ripple } from "~/components/ui/ripple";
import { cn } from "~/lib/utils";

export const iconButtonVariants = cva(
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
          "*:data-[slot=icon]:*:size-[20px]",
          "active:rounded-[8px]",
        ],
        sm: [
          "h-[40px]",
          "*:data-[slot=icon]:*:size-[24px]",
          "active:rounded-[8px]",
        ],
        md: [
          "h-[56px]",
          "*:data-[slot=icon]:*:size-[24px]",
          "active:rounded-[12px]",
        ],
        lg: [
          "h-[96px]",
          "*:data-[slot=icon]:*:size-[32px]",
          "active:rounded-[16px]",
        ],
        xl: [
          "h-[136px]",
          "*:data-[slot=icon]:*:size-[40px]",
          "active:rounded-[16px]",
        ],
      },
      shape: {
        round: ["rounded-full"],
        square: ["data-pressed:rounded-full"],
      },
      color: {
        filled: ["bg-primary text-on-primary ripple-on-primary"],
        tonal: [
          "bg-secondary-container text-on-secondary-container ripple-on-secondary-container",
        ],
        outlined: [
          "bg-[initial] text-on-surface-variant ripple-on-surface-variant",
          "*:data-[slot=outline]:border-solid *:data-[slot=outline]:border-outline-variant",
        ],
        standard: [
          "bg-[initial] text-on-surface-variant ripple-on-surface-variant",
        ],
      },
      width: {
        narrow: null,
        default: null,
        wide: null,
      },
      toggle: {
        true: [
          "data-pressed:*:data-[icon=off]:hidden not-data-pressed:*:data-[icon=on]:hidden",
        ],
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
      { size: "xs", width: "narrow", class: "px-[4px] w-[28px]" },
      { size: "xs", width: "default", class: "px-[6px] w-[32px]" },
      { size: "xs", width: "wide", class: "px-[10px] w-[40px]" },
      { size: "xs", shape: "round", class: "data-pressed:rounded-[12px]" },
      { size: "xs", shape: "square", class: "rounded-[12px]" },
      { size: "sm", width: "narrow", class: "px-[4px]" },
      { size: "sm", width: "default", class: "px-[8px]" },
      { size: "sm", width: "wide", class: "px-[14px]" },
      { size: "sm", shape: "round", class: "data-pressed:rounded-[12px]" },
      { size: "sm", shape: "square", class: "rounded-[12px]" },
      { size: "md", width: "narrow", class: "px-[12px]" },
      { size: "md", width: "default", class: "px-[16px]" },
      { size: "md", width: "wide", class: "px-[24px]" },
      { size: "md", shape: "round", class: "data-pressed:rounded-[16px]" },
      { size: "md", shape: "square", class: "rounded-[16px]" },
      { size: "lg", width: "narrow", class: "px-[16px]" },
      { size: "lg", width: "default", class: "px-[32px]" },
      { size: "lg", width: "wide", class: "px-[48px]" },
      { size: "lg", shape: "round", class: "data-pressed:rounded-[28px]" },
      { size: "lg", shape: "square", class: "rounded-[28px]" },
      { size: "xl", width: "narrow", class: "px-[32px]" },
      { size: "xl", width: "default", class: "px-[48px]" },
      { size: "xl", width: "wide", class: "px-[72px]" },
      { size: "xl", shape: "round", class: "data-pressed:rounded-[28px]" },
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
        color: "standard",
        toggle: true,
        class: ["data-pressed:text-primary ripple-primary"],
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
      width: "default",
      toggle: false,
      disabled: false,
    },
  },
);

export type ToggleIcon = { off: React.ReactNode; on: React.ReactNode };
export type IconButtonProps = React.ComponentProps<typeof Toggle> &
  VariantProps<typeof iconButtonVariants> & {
    icon?: React.ReactNode | ToggleIcon;
    label: string;
    toggle?: boolean;
  };

export function IconButton({
  children,
  className,
  size = "sm",
  shape = "round",
  color = "filled",
  width = "default",
  icon,
  label,
  toggle = false,
  disabled = false,
  ...props
}: IconButtonProps) {
  const Comp = toggle ? Toggle : "button";

  function getIcon() {
    if (!icon) return null;
    if (!toggle) return <Icon>{icon as React.ReactNode}</Icon>;
    return (
      <>
        <Icon data-icon="on">{(icon as ToggleIcon).on}</Icon>
        <Icon data-icon="off">{(icon as ToggleIcon).off}</Icon>
      </>
    );
  }

  return (
    <Comp
      data-slot="icon-button"
      disabled={disabled}
      className={cn(
        iconButtonVariants({
          size,
          shape,
          width,
          color,
          toggle,
          disabled,
          className,
        }),
      )}
      {...props}
    >
      {color === "outlined" && <Outline></Outline>}
      <FocusRing></FocusRing>
      <Ripple></Ripple>
      <Label className="sr-only">{label}</Label>
      {getIcon()}
    </Comp>
  );
}
