import { cva, type VariantProps } from "class-variance-authority";
import { Elevation } from "~/components/ui/elevation";
import { FocusRing } from "~/components/ui/focus-ring";
import { Icon } from "~/components/ui/icon";
import { Label } from "~/components/ui/label";
import { Ripple } from "~/components/ui/ripple";
import { cn } from "~/lib/utils";

export const fabVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "outline-none border-none",
    "focus-visible:*:data-[slot=focus-ring]:outline-solid",
    "elevation-3/4",
  ],
  {
    variants: {
      size: {
        sm: ["size-[56px] *:data-[slot=icon]:*:size-[24px] rounded-[16px]"],
        md: ["size-[80px] *:data-[slot=icon]:*:size-[28px] rounded-[20px]"],
        lg: ["size-[96px] *:data-[slot=icon]:*:size-[36px] rounded-[28px]"],
      },
      color: {
        primary: null,
        secondary: null,
        tertiary: null,
      },
      container: {
        false: null,
        true: null,
      },
      extended: {
        false: null,
        true: null,
      },
    },
    compoundVariants: [
      {
        size: "sm",
        extended: true,
        class: ["gap-[8px] px-[16px] w-[initial]"],
      },
      {
        size: "md",
        extended: true,
        class: ["gap-[12px] px-[26px] w-[initial]"],
      },
      {
        size: "lg",
        extended: true,
        class: ["gap-[16px] px-[28px] w-[initial]"],
      },
      {
        color: "primary",
        container: true,
        class: [
          "bg-primary-container text-on-primary-container ripple-on-primary-container",
        ],
      },
      {
        color: "primary",
        container: false,
        class: ["bg-primary text-on-primary ripple-on-primary"],
      },
      {
        color: "secondary",
        container: true,
        class: [
          "bg-secondary-container text-on-secondary-container ripple-on-secondary-container",
        ],
      },
      {
        color: "secondary",
        container: false,
        class: ["bg-secondary text-on-secondary ripple-on-secondary"],
      },
      {
        color: "tertiary",
        container: true,
        class: [
          "bg-tertiary-container text-on-tertiary-container ripple-on-tertiary-container",
        ],
      },
      {
        color: "tertiary",
        container: false,
        class: ["bg-tertiary text-on-tertiary ripple-on-tertiary"],
      },
    ],
    defaultVariants: {
      size: "sm",
      color: "primary",
      container: true,
    },
  },
);

export type FabProps = React.ComponentProps<"button"> &
  VariantProps<typeof fabVariants> & {
    icon?: React.ReactNode;
    label: React.ReactNode;
  };

export function Fab({
  children,
  className,
  size = "sm",
  color = "primary",
  container = true,
  extended = false,
  icon,
  label,
  ...props
}: FabProps) {
  return (
    <button
      data-slot="fab"
      className={cn(
        fabVariants({ size, color, container, extended, className }),
      )}
      {...props}
    >
      <Elevation></Elevation>
      <FocusRing></FocusRing>
      <Ripple></Ripple>
      {icon && <Icon>{icon}</Icon>}
      <Label className={cn(!extended && "sr-only")}>{label}</Label>
    </button>
  );
}
