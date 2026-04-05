"use client"
import { createContext, useContext } from "react"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { cva, type VariantProps } from "class-variance-authority"

import { Elevation } from "~/components/ui/elevation"
import { FocusRing } from "~/components/ui/focus-ring"
import { StateLayer } from "~/components/ui/state-layer"
import { cn } from "~/lib/utils"

type DropdownMenuContextState = {
  variant?: "default" | "vibrant" | null
}
const DropdownMenuContext = createContext<DropdownMenuContextState>({
  variant: "default",
})

function useDropdownMenu() {
  const context = useContext(DropdownMenuContext)
  return context
}

type DropdownMenuProps = MenuPrimitive.Root.Props & DropdownMenuContextState

function DropdownMenu({ variant = "default", ...props }: DropdownMenuProps) {
  return (
    <DropdownMenuContext value={{ variant }}>
      <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
    </DropdownMenuContext>
  )
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuViewport({ ...props }: MenuPrimitive.Viewport.Props) {
  return (
    <MenuPrimitive.Viewport data-slot="dropdown-menu-viewport" {...props} />
  )
}

type DropdownMenuContentProps = MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  children,
  className,
  ...props
}: DropdownMenuContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "group/content z-50 max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) border-none outline-none",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          <MenuPrimitive.Viewport className="*:flex *:flex-col *:gap-[2px]">
            {children}
          </MenuPrimitive.Viewport>
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

const dropdownMenuGroup = cva(
  "group/group relative z-50 min-w-[208px] rounded-[8px] border-none p-[4px] elevation-3 outline-none first:rounded-t-[16px] last:rounded-b-[16px]",
  {
    variants: {
      variant: {
        default: "bg-surface-container-low",
        vibrant: "bg-tertiary-container",
      },
    },
    defaultVariants: {
      variant: "vibrant",
    },
  }
)

type DropdownMenuGroupProps = MenuPrimitive.Group.Props

function DropdownMenuGroup({
  children,
  className,
  ...props
}: DropdownMenuGroupProps) {
  const { variant } = useDropdownMenu()
  return (
    <MenuPrimitive.Group
      data-slot="dropdown-menu-group"
      className={cn(dropdownMenuGroup({ variant }), className)}
      {...props}
    >
      <Elevation />
      <div className="flex flex-col gap-[4px]">{children}</div>
    </MenuPrimitive.Group>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  const { variant } = useDropdownMenu()
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "flex items-center px-[14px] pt-[8px] pb-[2px] text-[14px]/[20px] font-[500] tracking-[0.1px]",
        variant === "default" && "text-on-surface-variant",
        variant === "vibrant" && "text-on-tertiary-container",
        className
      )}
      {...props}
    />
  )
}

const dropdownMenuItem = cva(
  [
    "group/item relative flex h-[44px] items-center gap-[8px] rounded-[4px] border-none px-[12px] text-[14px]/[20px] font-[500] tracking-[0.1px] outline-none",
    "group-first/group:first:rounded-t-[12px] group-last/group:last:rounded-b-[12px] focus-visible:*:data-[slot=focus-ring]:outline-solid data-checked:rounded-[12px]",
    "*:[svg]:size-[20px] data-checked:*:[svg]:first-of-type:hidden",
  ],
  {
    variants: {
      variant: {
        default: [
          "state-layer-on-surface data-checked:state-layer-on-tertiary-container text-on-surface data-checked:bg-tertiary-container data-checked:text-on-tertiary-container",
          "*:[svg]:text-on-surface-variant data-checked:*:[svg]:text-on-tertiary-container data-checked:hover:*:data-[slot$=indicator]:*:[svg]:text-on-tertiary-container",
        ],
        vibrant: [
          "state-layer-on-tertiary-container data-checked:state-layer-on-tertiary text-on-tertiary-container data-checked:bg-tertiary data-checked:text-on-tertiary",
          "*:[svg]:text-on-tertiary-container data-checked:*:[svg]:text-on-tertiary data-checked:hover:*:data-[slot$=indicator]:*:[svg]:text-on-tertiary",
        ],
        destructive:
          "state-layer-on-error-container text-on-error-container hover:*:[svg]:text-error",
      },
    },
    defaultVariants: {
      variant: "vibrant",
    },
  }
)

function DropdownMenuItem({
  children,
  className,
  inset,
  variant: variantProp,
  ...props
}: MenuPrimitive.Item.Props &
  VariantProps<typeof dropdownMenuItem> & {
    inset?: boolean
  }) {
  const menu = useDropdownMenu()
  const variant = variantProp ?? menu.variant
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(dropdownMenuItem({ variant }), className)}
      {...props}
    >
      <FocusRing />
      <StateLayer />
      {children}
    </MenuPrimitive.Item>
  )
}

function DropdownMenuLinkItem({
  children,
  className,
  inset,
  variant: variantProp,
  ...props
}: MenuPrimitive.LinkItem.Props &
  VariantProps<typeof dropdownMenuItem> & {
    inset?: boolean
  }) {
  const menu = useDropdownMenu()
  const variant = variantProp ?? menu.variant
  return (
    <MenuPrimitive.LinkItem
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(dropdownMenuItem({ variant }), className)}
      {...props}
    >
      <FocusRing />
      <StateLayer />
      {children}
    </MenuPrimitive.LinkItem>
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  const { variant } = useDropdownMenu()
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        dropdownMenuItem({ variant }),
        // "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-8 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <FocusRing />
      <StateLayer />
      {children}
      <ArrowRightIcon className="ms-auto size-[20px]" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "group/sub-content z-50 border-none outline-none",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  const { variant } = useDropdownMenu()
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(dropdownMenuItem({ variant }), className)}
      checked={checked}
      {...props}
    >
      <FocusRing />
      <StateLayer />
      <MenuPrimitive.CheckboxItemIndicator data-slot="dropdown-menu-checkbox-item-indicator">
        <CheckIcon className="size-[20px]" />
      </MenuPrimitive.CheckboxItemIndicator>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      className="flex flex-col gap-[2px]"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  const { variant } = useDropdownMenu()
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(dropdownMenuItem({ variant }), className)}
      {...props}
    >
      <FocusRing />
      <StateLayer />
      <MenuPrimitive.RadioItemIndicator data-slot="dropdown-menu-radio-item-indicator">
        <CheckIcon className="size-[20px]" />
      </MenuPrimitive.RadioItemIndicator>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  const { variant } = useDropdownMenu()
  return (
    <div className="px-[8px]">
      <MenuPrimitive.Separator
        data-slot="dropdown-menu-separator"
        className={cn(
          "h-px shrink-0",
          variant === "default" && "bg-outline-variant",
          variant === "vibrant" && "bg-outline-variant",
          className
        )}
        {...props}
      />
    </div>
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { variant } = useDropdownMenu()
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ms-auto text-[14px]/[20px] font-[500] tracking-[0.1px] *:[svg]:size-[20px]",
        variant === "default" &&
          "text-on-surface-variant group-data-checked/item:text-on-tertiary-container",
        variant === "vibrant" &&
          "text-on-tertiary-container group-data-checked/item:text-on-tertiary",
        className
      )}
      {...props}
    />
  )
}

function ArrowRightIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M400-280v-400l200 200-200 200Z" />
    </svg>
  )
}
function CheckIcon({ ...props }: React.ComponentProps<"svg">) {
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
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuViewport,
}
