import { Radio as RadioBase } from "@base-ui-components/react/radio";
import { RadioGroup as RadioGroupBase } from "@base-ui-components/react/radio-group";
import { Ripple } from "~/components/ui/ripple";
import { FocusRing } from "~/components/ui/focus-ring";
import { Outline } from "~/components/ui/outline";
import { cn } from "~/lib/utils";

export type RadioProps = React.ComponentProps<typeof RadioBase.Root>;

export function Radio({ className, disabled, ...props }: RadioProps) {
  return (
    <RadioBase.Root
      data-slot="radio"
      disabled={disabled}
      className={cn(
        "group/radio",
        "relative inline-flex items-center justify-center",
        "size-[40px] rounded-full",
        "outline-none border-none",
        "focus-visible:*:data-[slot=focus-ring]:outline-solid",
        "not-data-disabled:ripple-on-surface not-data-disabled:data-checked:ripple-primary",
        "data-disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      <Ripple />
      <FocusRing />
      <RadioBase.Indicator
        data-slot="indicator"
        keepMounted
        className={cn(
          "relative inline-flex items-center justify-center",
          "size-[20px] rounded-full",
          "*:data-[slot=outline]:border-solid *:data-[slot=outline]:border-[2px]",
          "*:data-[slot=outline]:border-on-surface-variant",
          "data-checked:*:data-[slot=outline]:border-primary",
          "group-hover/radio:*:data-[slot=outline]:border-on-surface",
          "data-unchecked:*:[svg]:hidden",
          "data-checked:*:[svg]:text-primary",
          "data-disabled:*:data-[slot=outline]:border-on-surface/[0.38]",
          "data-disabled:*:[svg]:text-on-surface/[0.38]",
        )}
      >
        <Outline />
        <svg height="20px" width="20px" fill="currentcolor">
          <circle r="5px" cx="10px" cy="10px" />
        </svg>
      </RadioBase.Indicator>
    </RadioBase.Root>
  );
}

export function RadioGroup(props: React.ComponentProps<typeof RadioGroupBase>) {
  return <RadioGroupBase data-slot="radio-group" {...props}></RadioGroupBase>;
}
