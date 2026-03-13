import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import { toggle } from "~/components/ui/toggle";
import { cn } from "~/lib/utils";
import { Button, type ButtonProps } from "./button";

type ToggleGroupState = {
  orientation?: "horizontal" | "vertical";
  spacing?: number;
};

type ToggleGroupContextState = VariantProps<typeof toggleGroup> &
  ToggleGroupState;

const ToggleGroupContext = createContext<ToggleGroupContextState>({
  orientation: "horizontal",
  size: "default",
  spacing: 0,
});

function useToggleGroup() {
  const context = useContext(ToggleGroupContext);
  if (!context) {
    throw new Error("useToggleGroup must be used within a ToggleGroup.");
  }
  return context;
}

const toggleGroup = cva("relative inline-flex gap-[2px] rounded-full", {
  variants: {
    size: {
      default: null,
      xs: [
        "h-[32px]",
        "*:data-[slot=toggle]:not-active:rounded-[8px] *:data-[slot=toggle]:active:rounded-[4px]",
        "*:data-[slot=toggle]:first:not-active:rounded-s-[16px] *:data-[slot=toggle]:first:active:rounded-s-[16px]",
        "*:data-[slot=toggle]:last:not-active:rounded-e-[16px] *:data-[slot=toggle]:last:active:rounded-e-[16px]",
        "*:data-[slot=toggle]:not-active:data-pressed:rounded-[16px]",
      ],
      sm: [
        "h-[40px]",
        "*:data-[slot=toggle]:not-active:rounded-[8px] *:data-[slot=toggle]:active:rounded-[4px]",
        "*:data-[slot=toggle]:first:not-active:rounded-s-[20px] *:data-[slot=toggle]:first:active:rounded-s-[20px]",
        "*:data-[slot=toggle]:last:not-active:rounded-e-[20px] *:data-[slot=toggle]:last:active:rounded-e-[20px]",
        "*:data-[slot=toggle]:not-active:data-pressed:rounded-[20px]",
      ],
      md: [
        "h-[56px]",
        "*:data-[slot=toggle]:not-active:rounded-[8px] *:data-[slot=toggle]:active:rounded-[4px]",
        "*:data-[slot=toggle]:first:not-active:rounded-s-[28px] *:data-[slot=toggle]:first:active:rounded-s-[28px]",
        "*:data-[slot=toggle]:last:not-active:rounded-e-[28px] *:data-[slot=toggle]:last:active:rounded-e-[28px]",
        "*:data-[slot=toggle]:not-active:data-pressed:rounded-[28px]",
      ],
      lg: [
        "h-[96px]",
        "*:data-[slot=toggle]:not-active:rounded-[16px] *:data-[slot=toggle]:active:rounded-[8px]",
        "*:data-[slot=toggle]:first:not-active:rounded-s-[48px] *:data-[slot=toggle]:first:active:rounded-s-[48px]",
        "*:data-[slot=toggle]:last:not-active:rounded-e-[48px] *:data-[slot=toggle]:last:active:rounded-e-[48px]",
        "*:data-[slot=toggle]:not-active:data-pressed:rounded-[48px]",
      ],
      xl: [
        "h-[136px]",
        "*:data-[slot=toggle]:not-active:rounded-[20px] *:data-[slot=toggle]:active:rounded-[16px]",
        "*:data-[slot=toggle]:first:not-active:rounded-s-[68px] *:data-[slot=toggle]:first:active:rounded-s-[68px]",
        "*:data-[slot=toggle]:last:not-active:rounded-e-[68px] *:data-[slot=toggle]:last:active:rounded-e-[68px]",
        "*:data-[slot=toggle]:not-active:data-pressed:rounded-[68px]",
      ],
    },
  },
});

type ToggleGroupProps = ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleGroup> &
  ToggleGroupState;

function ToggleGroup({
  children,
  className,
  orientation = "horizontal",
  size,
  spacing = 0,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupContext value={{ size, spacing, orientation }}>
      <ToggleGroupPrimitive
        data-slot="toggle-group"
        data-size={size}
        className={cn(toggleGroup({ size }), className)}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive>
    </ToggleGroupContext>
  );
}

type ToggleGroupItemProps = TogglePrimitive.Props & VariantProps<typeof toggle>;

function ToggleGroupItem({
  variant = "filled",
  size = "sm",
  shape = "round",
  className,
  nativeButton,
  render,
  ...props
}: ToggleGroupItemProps) {
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
          nativeButton={nativeButton}
          render={render as ButtonProps["render"]}
        />
      }
      {...props}
    />
  );
}

export {
  ToggleGroup,
  ToggleGroupItem,
  useToggleGroup,
  type ToggleGroupItemProps,
  type ToggleGroupProps,
};
