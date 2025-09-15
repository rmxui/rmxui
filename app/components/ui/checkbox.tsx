import { Checkbox as CheckboxBase } from "@base-ui-components/react/checkbox";
import { FocusRing } from "~/components/ui/focus-ring";
import { Outline } from "~/components/ui/outline";
import { Ripple } from "~/components/ui/ripple";
import { cn } from "~/lib/utils";

export type CheckboxProps = React.ComponentProps<typeof CheckboxBase.Root>;

export function Checkbox({
  children,
  className,
  indeterminate,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxBase.Root
      indeterminate={indeterminate}
      className={cn(
        "relative inline-flex items-center justify-center ",
        "size-[40px] rounded-full",
        "outline-none border-none",
        "focus-visible:*:data-[slot=focus-ring]:outline-solid",
        "ripple-on-surface not-data-unchecked:ripple-primary",
        className,
      )}
      {...props}
    >
      <Ripple />
      <FocusRing />
      <CheckboxBase.Indicator
        data-slot="indicator"
        keepMounted
        className={cn(
          "relative inline-flex items-center justify-center",
          "size-[18px] rounded-[2px]",
          "*:data-[slot=outline]:border-solid",
          "*:data-[slot=outline]:border-outline-variant *:data-[slot=outline]:border-[2px]",
          "not-data-unchecked:*:data-[slot=outline]:border-0",
          "not-data-unchecked:bg-primary not-data-unchecked:text-on-primary",
          "data-unchecked:*:[svg]:hidden",
        )}
      >
        <Outline />
        {indeterminate ? (
          <IndeterminateIcon className="size-[18px]" />
        ) : (
          <CheckIcon className="size-[18px]" />
        )}
      </CheckboxBase.Indicator>
    </CheckboxBase.Root>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  );
}

function IndeterminateIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M200-440v-80h560v80H200Z" />
    </svg>
  );
}
