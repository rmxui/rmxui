"use client"
import { createContext, useContext } from "react"

import { Checkbox } from "@base-ui/react/checkbox"
import { mergeProps } from "@base-ui/react/merge-props"
import { Radio } from "@base-ui/react/radio"
import { RadioGroup } from "@base-ui/react/radio-group"
import { Separator } from "@base-ui/react/separator"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { CheckboxIndicator } from "~/components/ui/checkbox"
import { FocusRing } from "~/components/ui/focus-ring"
import { RadioIndicator } from "~/components/ui/radio-group"
import { StateLayer } from "~/components/ui/state-layer"
import { cn } from "~/lib/utils"

type ItemGroupContextState = {
  align?: "middle" | "top"
  disabled?: boolean
}

const ItemGroupContext = createContext<ItemGroupContextState | null>(null)

function useItemGroup() {
  const context = useContext(ItemGroupContext)
  return context
}

const itemGroup = cva(
  "group/item-group flex flex-col overflow-hidden rounded-[16px] border-none outline-none data-segmented:gap-[2px] data-disabled:pointer-events-none"
)

type GroupProps = ItemGroupContextState &
  VariantProps<typeof itemGroup> & {
    segmented?: boolean
  }

type ItemGroupProps = useRender.ComponentProps<"div"> & GroupProps

function ItemGroup({
  align,
  disabled,
  render,
  segmented,
  className,
  children,
  ...props
}: ItemGroupProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        disabled,
        className: cn(itemGroup(), className),
        children: (
          <ItemGroupContext value={{ align, disabled }}>
            {children}
          </ItemGroupContext>
        ),
      },
      props
    ),
    state: {
      slot: "item-group",
      align,
      disabled,
      segmented,
    },
  })
}

type ItemRadioGroupProps = RadioGroup.Props & GroupProps

function ItemRadioGroup({
  align,
  disabled,
  render,
  segmented,
  className,
  children,
  ...props
}: ItemRadioGroupProps) {
  return (
    <ItemGroupContext value={{ align, disabled }}>
      <RadioGroup
        data-slot="item-radio-group"
        data-align={align}
        data-segmented={segmented ? "" : undefined}
        disabled={disabled}
        className={cn(itemGroup(), className)}
        {...props}
      >
        {children}
      </RadioGroup>
    </ItemGroupContext>
  )
}

type ItemGroupLabelProps = useRender.ComponentProps<"div">

function ItemGroupLabel({
  children,
  className,
  render,
  ...props
}: ItemGroupLabelProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: cn(className),
        children: <>{children}</>,
      },
      props
    ),
    state: { slot: "item-group-label" },
  })
}

const item = cva([
  "group/item state-layer-on-surface relative flex items-center gap-[12px] rounded-[4px] border-none bg-surface px-[16px] py-[10px] outline-none",
  "group-data-[align=top]/item-group:items-start hover:rounded-[12px] focus-visible:rounded-[16px] active:rounded-[16px]",
  "focus-visible:*:data-[slot=focus-ring]:-outline-offset-3 focus-visible:*:data-[slot=focus-ring]:outline-solid",
  "data-checked:rounded-[16px] data-checked:bg-secondary-container data-checked:text-on-surface-variant",
  "data-checked:hover:rounded-[16px] data-checked:focus-visible:rounded-[16px] data-checked:active:rounded-[16px] data-disabled:pointer-events-none",
  "data-disabled:rounded-[4px] data-disabled:bg-on-surface/10 data-checked:data-disabled:rounded-[16px] data-checked:data-disabled:bg-on-surface/38",
])

type BaseProps = ItemGroupContextState & VariantProps<typeof item>

function Base() {
  return (
    <>
      <FocusRing />
      <StateLayer />
    </>
  )
}

type ItemProps = useRender.ComponentProps<"span"> & BaseProps

function Item({
  align: alignProp,
  disabled: disabledProp,
  render,
  className,
  children,
  ...props
}: ItemProps) {
  const group = useItemGroup()
  const align = alignProp ?? group?.align
  const disabled = disabledProp ?? group?.disabled
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps(
      {
        disabled,
        className: cn(item(), "pointer-events-none", className),
        children,
      },
      props
    ),
    state: { slot: "item", align, disabled },
  })
}

const itemMedia = cva(
  "flex items-center justify-center group-data-[align=top]/item:data-[variant=icon]:mt-[2px]",
  {
    variants: {
      variant: {
        avatar: [
          "size-[40px] rounded-full group-data-disabled/item:**:text-on-surface/38",
          "group-data-disabled/item:not-has-data-[slot=avatar-fallback]:bg-on-surface/10",
          "group-data-disabled/item:not-has-data-[slot=avatar-fallback]:text-on-surface/38",
          "group-data-disabled/item:has-data-[slot=avatar-fallback]:**:data-[slot=avatar-fallback]:bg-on-surface/10",
          "group-data-disabled/item:has-data-[slot=avatar-fallback]:**:data-[slot=avatar-fallback]:text-on-surface/38",
        ],
        icon: "*:[svg]:size-[20px] *:[svg]:text-on-surface-variant group-hover/item:group-data-checked/item:*:[svg]:text-on-surface group-data-disabled/item:*:[svg]:text-on-surface/38",
        image:
          "aspect-square h-[56px] w-[56px] rounded-[8px] group-data-disabled/item:bg-on-surface/10 group-data-disabled/item:text-on-surface/38",
        video:
          "aspect-video h-[56px] w-[100px] rounded-[8px] group-data-disabled/item:bg-on-surface/10 group-data-disabled/item:text-on-surface/38",
        checkbox: null,
        radio: null,
        switch: null,
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  }
)

type ItemMediaProps = useRender.ComponentProps<"span"> &
  VariantProps<typeof itemMedia>

function ItemMedia({ className, render, variant, ...props }: ItemMediaProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps(
      {
        className: cn(itemMedia({ variant }), className),
      },
      props
    ),
    state: { slot: "item-media", variant },
  })
}

type ItemContentProps = useRender.ComponentProps<"span">

function ItemContent({ className, render, ...props }: ItemContentProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps(
      {
        className: cn(
          "flex max-h-[88px] grow flex-col justify-center",
          className
        ),
      },
      props
    ),
    state: { slot: "item-content" },
  })
}

type ItemOverlineProps = useRender.ComponentProps<"span">

function ItemOverline({ className, render, ...props }: ItemOverlineProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: cn(
          "text-[11px]/[16px] font-[500] tracking-[0.5px] text-on-surface-variant group-data-checked/item:text-on-secondary-container group-data-disabled/item:text-on-surface/38",
          className
        ),
      },
      props
    ),
    state: { slot: "item-overline" },
  })
}

type ItemTitleProps = useRender.ComponentProps<"span">

function ItemTitle({ className, render, ...props }: ItemTitleProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps(
      {
        className: cn(
          "text-[16px]/[24px] font-[400] tracking-[0.5px] text-on-surface group-data-checked/item:text-on-secondary-container group-data-disabled/item:text-on-surface/38",
          className
        ),
      },
      props
    ),
    state: { slot: "item-title" },
  })
}

type ItemDescriptionProps = useRender.ComponentProps<"span">

function ItemDescription({
  className,
  render,
  ...props
}: ItemDescriptionProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps(
      {
        className: cn(
          "text-[14px]/[20px] font-[400] tracking-[0.25px] text-on-surface-variant group-data-checked/item:text-on-secondary-container group-data-disabled/item:text-on-surface/38",
          className
        ),
      },
      props
    ),
    state: { slot: "item-description" },
  })
}

type ItemActionsProps = useRender.ComponentProps<"span">

function ItemActions({ className, render, ...props }: ItemActionsProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps(
      {
        className: cn(
          "flex items-center justify-center text-[11px]/[16px] font-[500] tracking-[0.5px] text-on-surface-variant group-data-checked/item:text-on-secondary-container group-data-disabled/item:text-on-surface/38 *:[svg]:size-[20px] *:[svg]:text-on-surface-variant group-hover/item:group-data-checked/item:*:[svg]:text-on-surface group-data-disabled/item:*:[svg]:text-on-surface/38",
          className
        ),
      },
      props
    ),
    state: { slot: "item-actions" },
  })
}

type ItemLinkProps = useRender.ComponentProps<"a"> & BaseProps

function ItemLink({
  align: alignProp,
  disabled: disabledProp,
  render,
  tabIndex = 0,
  className,
  children,
  ...props
}: ItemLinkProps) {
  const group = useItemGroup()
  const align = alignProp ?? group?.align
  const disabled = disabledProp ?? group?.disabled

  return useRender({
    defaultTagName: "a",
    render,
    props: mergeProps(
      {
        disabled,
        tabIndex: disabled ? -1 : tabIndex,
        className: cn(item(), className),
        children: (
          <>
            <Base />
            {children}
          </>
        ),
      },
      props
    ),
    state: { slot: "item", align, disabled },
  })
}

type ItemRadioProps = Radio.Root.Props & BaseProps

function ItemRadio({
  align: alignProp,
  children,
  className,
  ...props
}: ItemRadioProps) {
  const group = useItemGroup()
  const align = alignProp ?? group?.align

  return (
    <Radio.Root
      data-slot="item-radio"
      data-align={align}
      className={cn(item(), className)}
      {...props}
    >
      <Base />
      {children}
    </Radio.Root>
  )
}

type ItemRadioIndicatorProps = Radio.Indicator.Props

function ItemRadioIndicator({ ...props }: ItemRadioIndicatorProps) {
  return <RadioIndicator data-slot="item-radio-indicator" {...props} />
}

type ItemCheckboxProps = Checkbox.Root.Props & BaseProps

function ItemCheckbox({
  align: alignProp,
  disabled: disabledProp,
  className,
  children,
  ...props
}: ItemCheckboxProps) {
  const group = useItemGroup()
  const align = alignProp ?? group?.align
  const disabled = disabledProp ?? group?.disabled
  return (
    <Checkbox.Root
      data-slot="item-checkbox"
      data-align={align}
      disabled={disabled}
      className={cn(item(), className)}
      {...props}
    >
      <Base />
      {children}
    </Checkbox.Root>
  )
}

type ItemCheckboxIndicatorProps = Checkbox.Indicator.Props

function ItemCheckboxIndicator({ ...props }: ItemCheckboxIndicatorProps) {
  return <CheckboxIndicator data-slot="item-radio-indicator" {...props} />
}

type ItemSeparatorProps = Separator.Props

function ItemSeparator({ className, ...props }: ItemSeparatorProps) {
  return (
    <Separator
      className={cn("h-px bg-outline-variant px-[16px]", className)}
      {...props}
    />
  )
}

export {
  Item,
  ItemActions,
  ItemCheckbox,
  ItemCheckboxIndicator,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemGroupLabel,
  ItemLink,
  ItemMedia,
  ItemOverline,
  ItemRadio,
  ItemRadioGroup,
  ItemRadioIndicator,
  ItemTitle,
}
