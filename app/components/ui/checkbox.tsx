"use client"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group"

import { FocusRing } from "~/components/ui/focus-ring"
import { Ripple } from "~/components/ui/ripple"
import { cn } from "~/lib/utils"

type CheckboxProps = CheckboxPrimitive.Root.Props

function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "group/root relative flex size-[40px] items-center justify-center rounded-full border-none outline-none",
        "not-data-unchecked:ripple-primary focus-visible:*:data-[slot=focus-ring]:outline-solid data-unchecked:ripple-on-surface data-disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      <FocusRing />
      <Ripple />
      <CheckboxIndicator />
    </CheckboxPrimitive.Root>
  )
}

type CheckboxIndicatorProps = CheckboxPrimitive.Indicator.Props

function CheckboxIndicator({ className, ...props }: CheckboxIndicatorProps) {
  return (
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      keepMounted
      className="flex items-center justify-center not-data-unchecked:text-primary data-unchecked:text-on-surface-variant data-disabled:text-on-surface/38"
      render={(p, s) => (
        <span {...p}>
          {s.indeterminate && <IndeterminateIcon />}
          {!s.indeterminate && s.checked && <CheckedIcon />}
          {!s.indeterminate && !s.checked && <UncheckedIcon />}
        </span>
      )}
      {...props}
    />
  )
}

type CheckboxGroupProps = CheckboxGroupPrimitive.Props

function CheckboxGroup({ ...props }: CheckboxGroupProps) {
  return <CheckboxGroupPrimitive data-slot="checkbox-group" {...props} />
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
      <path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z" />
    </svg>
  )
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
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" />
    </svg>
  )
}

function IndeterminateIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M280-440h400v-80H280v80Zm-80 320q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z" />
    </svg>
  )
}

export {
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  type CheckboxGroupProps,
  type CheckboxIndicatorProps,
  type CheckboxProps,
}
