import { mergeProps } from "@base-ui/react/merge-props";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { useRender } from "@base-ui/react/use-render";
import { FocusRing } from "~/components/ui/focus-ring";
import { Ripple } from "~/components/ui/ripple";
import { cn } from "~/lib/utils";

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn(className)}
      {...props}
    />
  );
}

function Radio({
  children,
  className,
  render,
  ...props
}: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio"
      className={cn(
        "relative flex size-[40px] items-center justify-center rounded-full border-none outline-none focus-visible:*:data-[slot=focus-ring]:outline-solid data-checked:ripple-primary data-unchecked:ripple-on-surface data-disabled:pointer-events-none",
        className
      )}
      render={(rootProps, rootState) =>
        useRender({
          defaultTagName: "span",
          render,
          props: mergeProps(
            {
              children: (
                <>
                  <FocusRing />
                  <Ripple />
                  <RadioIndicator />
                </>
              ),
            },
            rootProps,
            { tabIndex: rootState.disabled ? -1 : rootProps.tabIndex }
          ),
          state: { ...rootState },
        })
      }
      {...props}
    />
  );
}

function RadioIndicator({
  className,
  ...props
}: RadioPrimitive.Indicator.Props) {
  return (
    <RadioPrimitive.Indicator
      data-slot="radio-indicator"
      keepMounted
      className="data-checked:text-primary data-unchecked:text-on-surface-variant data-disabled:text-on-surface/38"
      render={(p, s) => (
        <span {...p}>{s.checked ? <CheckedIcon /> : <UncheckedIcon />}</span>
      )}
      {...props}
    />
  );
}

function CheckedIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M621.5-338.5Q680-397 680-480t-58.5-141.5Q563-680 480-680t-141.5 58.5Q280-563 280-480t58.5 141.5Q397-280 480-280t141.5-58.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
    </svg>
  );
}

function UncheckedIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
    </svg>
  );
}

export { Radio, RadioIndicator, RadioGroup };
