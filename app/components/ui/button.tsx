import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { useMemo } from "react";
import { Elevation } from "~/components/ui/elevation";
import { FocusRing } from "~/components/ui/focus-ring";
import { Outline } from "~/components/ui/outline";
import { Ripple } from "~/components/ui/ripple";
import { cn } from "~/lib/utils";

const CSS = {
  FILLED: "ripple-on-primary bg-primary text-on-primary",
  TONAL:
    "ripple-on-secondary-container bg-secondary-container text-on-secondary-container",
  OUTLINED:
    "ripple-on-surface-variant bg-[initial] text-on-surface-variant *:data-[slot=outline]:border-solid",
  STANDARD: "ripple-primary bg-[initial] text-primary",
};

const button = cva(
  [
    "group/button relative inline-flex items-center justify-center outline-none",
    "focus-visible:*:data-[slot=focus-ring]:outline-solid *:[svg]:pointer-events-none *:[svg]:shrink-0",
    "data-disabled:pointer-events-none data-disabled:bg-on-surface/10 data-disabled:text-on-surface/38",
  ],
  {
    variants: {
      variant: {
        // original
        default: CSS.FILLED,
        secondary: CSS.TONAL,
        outline: CSS.OUTLINED,
        ghost: CSS.STANDARD,
        destructive:
          "ripple-on-error-container bg-error-container text-on-error-container",
        link: "text-primary underline-offset-4 hover:underline",
        // material
        elevated:
          "ripple-primary bg-surface-container-low text-primary elevation-1 data-disabled:elevation-0",
        filled: CSS.FILLED,
        tonal: CSS.TONAL,
        outlined: CSS.OUTLINED,
        standard: CSS.STANDARD,
      },
      size: {
        // original
        default: [
          "h-[40px] gap-[8px] px-[16px] text-[14px]/[20px] font-[500] tracking-[0.1px] active:rounded-[8px]",
          "*:[svg]:size-[20px]",
        ],
        icon: "h-[40px] active:rounded-[8px] *:[svg]:size-[24px]",
        // material
        xs: [
          "h-[32px] gap-[8px] px-[12px] text-[14px]/[20px] font-[500] tracking-[0.1px] active:rounded-[8px]",
          "*:[svg]:size-[20px]",
        ],
        sm: [
          "h-[40px] gap-[8px] px-[16px] text-[14px]/[20px] font-[500] tracking-[0.1px] active:rounded-[8px]",
          "*:[svg]:size-[20px]",
        ],
        md: [
          "h-[56px] gap-[8px] px-[24px] text-[16px]/[24px] font-[500] tracking-[0.1px] active:rounded-[12px]",
          "*:[svg]:size-[24px]",
        ],
        lg: [
          "h-[96px] gap-[12px] px-[48px] text-[24px]/[32px] font-[400] tracking-[0px] active:rounded-[16px]",
          "*:[svg]:size-[32px]",
        ],
        xl: [
          "h-[136px] gap-[16px] px-[64px] text-[32px]/[40px] font-[400] tracking-[0px] active:rounded-[16px]",
          "*:[svg]:size-[40px]",
        ],
        "icon-xs": "h-[32px] active:rounded-[8px] *:[svg]:size-[20px]",
        "icon-sm": "h-[40px] active:rounded-[8px] *:[svg]:size-[24px]",
        "icon-md": "h-[56px] active:rounded-[12px] *:[svg]:size-[24px]",
        "icon-lg": "h-[96px] active:rounded-[16px] *:[svg]:size-[32px]",
        "icon-xl": "h-[136px] active:rounded-[16px] *:[svg]:size-[40px]",
      },
      shape: {
        round: "rounded-full",
        square: "",
      },
      width: {
        narrow: "",
        default: "",
        wide: "",
      },
    },
    // prettier-ignore
    compoundVariants: [
      { size: "xs", variant: "outlined", class: "*:data-[slot=outline]:border-1" },
      { size: "xs", variant: "outline", class: "*:data-[slot=outline]:border-1" },
      { size: "xs", shape: "square", class: "not-active:rounded-[12px]" },
      { size: "sm", variant: "outlined", class: "*:data-[slot=outline]:border-1" },
      { size: "sm", variant: "outline", class: "*:data-[slot=outline]:border-1" },
      { size: "sm", shape: "square", class: "not-active:rounded-[12px]" },
      { size: "default", variant: "outlined", class: "*:data-[slot=outline]:border-1" },
      { size: "default", variant: "outline", class: "*:data-[slot=outline]:border-1" },
      { size: "default", shape: "square", class: "not-active:rounded-[12px]" },
      { size: "md", variant: "outlined", class: "*:data-[slot=outline]:border-1" },
      { size: "md", variant: "outline", class: "*:data-[slot=outline]:border-1" },
      { size: "md", shape: "square", class: "not-active:rounded-[16px]" },
      { size: "lg", variant: "outlined", class: "*:data-[slot=outline]:border-2" },
      { size: "lg", variant: "outline", class: "*:data-[slot=outline]:border-2" },
      { size: "lg", shape: "square", class: "not-active:rounded-[28px]" },
      { size: "xl", variant: "outlined", class: "*:data-[slot=outline]:border-3" },
      { size: "xl", variant: "outline", class: "*:data-[slot=outline]:border-3" },
      { size: "xl", shape: "square", class: "not-active:rounded-[28px]" },
      { size: "icon-xs", variant: "outlined", class: "*:data-[slot=outline]:border-1" },
      { size: "icon-xs", variant: "outline", class: "*:data-[slot=outline]:border-1" },
      { size: "icon-xs", width: "narrow", class: "px-[4px]" },
      { size: "icon-xs", width: "default", class: "px-[6px]" },
      { size: "icon-xs", width: "wide", class: "px-[10px]" },
      { size: "icon-xs", shape: "square", class: "not-active:rounded-[12px]" },
      { size: "icon-sm", variant: "outlined", class: "*:data-[slot=outline]:border-1" },
      { size: "icon-sm", variant: "outline", class: "*:data-[slot=outline]:border-1" },
      { size: "icon-sm", width: "narrow", class: "px-[4px]" },
      { size: "icon-sm", width: "default", class: "px-[8px]" },
      { size: "icon-sm", width: "wide", class: "px-[14px]" },
      { size: "icon-sm", shape: "square", class: "not-active:rounded-[12px]" },
      { size: "icon", variant: "outlined", class: "*:data-[slot=outline]:border-1" },
      { size: "icon", variant: "outline", class: "*:data-[slot=outline]:border-1" },
      { size: "icon", width: "narrow", class: "px-[4px]" },
      { size: "icon", width: "default", class: "px-[8px]" },
      { size: "icon", width: "wide", class: "px-[14px]" },
      { size: "icon", shape: "square", class: "not-active:rounded-[12px]" },
      { size: "icon-md", variant: "outlined", class: "*:data-[slot=outline]:border-1" },
      { size: "icon-md", variant: "outline", class: "*:data-[slot=outline]:border-1" },
      { size: "icon-md", width: "narrow", class: "px-[12px]" },
      { size: "icon-md", width: "default", class: "px-[16px]" },
      { size: "icon-md", width: "wide", class: "px-[24px]" },
      { size: "icon-md", shape: "square", class: "not-active:rounded-[16px]" },
      { size: "icon-lg", variant: "outlined", class: "*:data-[slot=outline]:border-2" },
      { size: "icon-lg", variant: "outline", class: "*:data-[slot=outline]:border-2" },
      { size: "icon-lg", width: "narrow", class: "px-[16px]" },
      { size: "icon-lg", width: "default", class: "px-[32px]" },
      { size: "icon-lg", width: "wide", class: "px-[48px]" },
      { size: "icon-lg", shape: "square", class: "not-active:rounded-[28px]" },
      { size: "icon-xl", variant: "outlined", class: "*:data-[slot=outline]:border-3" },
      { size: "icon-xl", variant: "outline", class: "*:data-[slot=outline]:border-3" },
      { size: "icon-xl", width: "narrow", class: "px-[32px]" },
      { size: "icon-xl", width: "default", class: "px-[48px]" },
      { size: "icon-xl", width: "wide", class: "px-[72px]" },
      { size: "icon-xl", shape: "square", class: "not-active:rounded-[28px]" },
    ],
    defaultVariants: {
      variant: "filled",
      size: "sm",
      shape: "round",
      width: "default",
    },
  }
);

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof button>;

function Button({
  variant = "filled",
  size = "sm",
  shape = "round",
  width,
  className,
  children,
  ...props
}: ButtonProps) {
  const outlined = useMemo(
    () => variant === "outline" || variant === "outlined",
    [variant]
  );
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(button({ variant, size, shape, width, className }))}
      {...props}
    >
      <FocusRing />
      {variant === "elevated" && <Elevation />}
      {outlined && <Outline />}
      <Ripple />
      {children}
    </ButtonPrimitive>
  );
}

export { Button, button, type ButtonProps };
