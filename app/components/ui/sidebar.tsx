"use client"
import { createContext, useContext, useMemo, useRef, useState } from "react"

import { Collapsible } from "@base-ui/react/collapsible"
import { Dialog } from "@base-ui/react/dialog"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { createSelector, ReactStore } from "@base-ui/utils/store"
import { useOnFirstRender } from "@base-ui/utils/useOnFirstRender"
import { useOnMount } from "@base-ui/utils/useOnMount"
import { useRefWithInit } from "@base-ui/utils/useRefWithInit"
import { cva } from "class-variance-authority"

import { Button, type ButtonProps } from "~/components/ui/button"
import { Elevation } from "~/components/ui/elevation"
import { ScrollArea } from "~/components/ui/scroll-area"
import { StateLayer } from "~/components/ui/state-layer"
import { cn } from "~/lib/utils"
import { Separator } from "./separator"

type State = {
  collapsible: "default" | "icon" | "offcanvas"
  open: boolean
  openProp: boolean | undefined
}

function createInitialState(): State {
  return {
    collapsible: "default",
    open: false,
    openProp: undefined,
  }
}

type Context = {
  onOpenChange: ((open: boolean, eventDetails?: any) => void) | undefined
}

const selectors = {
  collapsible: createSelector((state: State) => state.collapsible),
  open: createSelector((state: State) => state.openProp ?? state.open),
}

type SidebarStore = ReactStore<State, Context, typeof selectors>
type SidebarHandle = { store: SidebarStore }
type SidebarContext = {
  store: SidebarStore
}

const SidebarContext = createContext<SidebarContext | undefined>(undefined)

function useSidebar(optional?: false): SidebarContext
function useSidebar(optional: true): SidebarContext | undefined
function useSidebar(optional?: boolean) {
  const context = useContext(SidebarContext)
  if (optional === false && context === undefined) {
    throw new Error(
      "RMXUI: SidebarContext is missing. Sidebar parts must be placed within <Sidebar>."
    )
  }

  return context
}

type SidebarProps = Omit<Dialog.Root.Props, "handle"> &
  Collapsible.Root.Props & { handle?: SidebarHandle } & Pick<
    Partial<State>,
    "collapsible"
  >

function Sidebar(props: SidebarProps) {
  const {
    collapsible: collapsibleProp = "default",
    defaultOpen = false,
    open: openProp,
    onOpenChange,
    handle,
    ...elementProps
  } = props

  const store = useRefWithInit(() => {
    return (
      handle?.store ??
      new ReactStore(
        {
          collapsible: collapsibleProp,
          open: defaultOpen,
          openProp,
        },
        { onOpenChange },
        selectors
      )
    )
  }).current

  useOnFirstRender(() => {
    if (
      store.state.open === false &&
      (openProp === true || defaultOpen === true)
    ) {
      store.update({ open: true })
    }
  })

  store.useControlledProp("openProp", openProp)
  store.useSyncedValues({ collapsible: collapsibleProp })

  const collapsible = store.useState("collapsible")
  const open = store.useState("open")
  const setOpen = store.useStateSetter("open")

  store.useContextCallback(
    "onOpenChange",
    (value: boolean | ((value: boolean) => boolean), eventDetails?: any) => {
      const openState = typeof value === "function" ? value(open) : value
      if (onOpenChange) {
        onOpenChange(openState, eventDetails)
      } else {
        setOpen(openState)
      }
    }
  )

  const contextValue = useMemo(() => ({ store }), [store])

  return (
    <SidebarContext value={contextValue}>
      {collapsible === "offcanvas" ? (
        <Dialog.Root
          open={open}
          onOpenChange={store.context.onOpenChange}
          {...elementProps}
        />
      ) : (
        <Collapsible.Root
          open={open}
          onOpenChange={store.context.onOpenChange}
          render={<Dialog.Root />}
          {...elementProps}
        />
      )}
    </SidebarContext>
  )
}

Sidebar.createHandle = () => {
  const handle = {
    store: new ReactStore(
      { ...createInitialState() },
      { onOpenChange: () => {} },
      selectors
    ),
  }
  return handle
}

type SidebarTriggerProps = useRender.ComponentProps<"button"> & {
  handle?: SidebarHandle
}

function SidebarTrigger(props: SidebarTriggerProps) {
  const { handle, render, ...elementProps } = props
  const sidebarContext = useSidebar(true)
  const store = handle?.store ?? sidebarContext?.store
  if (!store) {
    throw new Error(
      "RMXUI: <SidebarTrigger> must be used within <Sidebar> or provided with a handle."
    )
  }

  const open = store.useState("open")

  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps(
      {
        onClick: () => {
          store.context.onOpenChange?.(!open)
        },
      },
      elementProps
    ),
    state: { slot: "sidebar-trigger", sidebar: "trigger" },
  })
}

type SidebarContainerProps = useRender.ComponentProps<"div">

function SidebarContainer(props: SidebarContainerProps) {
  const { className, render, ...elementProps } = props
  const { store } = useSidebar()
  const collapsible = store.useState("collapsible")

  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: cn(
          "flex h-screen flex-1 flex-col rounded-[inherit]",
          className
        ),
      },
      elementProps
    ),
    state: { slot: "sidebar-container", sidebar: "container" },
  })

  if (collapsible === "offcanvas") {
    return (
      <Dialog.Portal data-slot="sidebar-portal">
        <Dialog.Backdrop
          data-slot="sidebar-backdrop"
          className={cn(
            "fixed inset-0 isolate z-50 bg-scrim/32",
            "data-ending-style:opacity-0 data-starting-style:opacity-0",
            "data-open:animate-in data-open:fade-in",
            "data-closed:animate-out data-closed:fade-out",
            "ease-spatial transition-all duration-(--spatial)"
          )}
        />
        <Dialog.Viewport data-slot="sidebar-viewport">
          <Dialog.Popup
            data-slot="sidebar"
            data-offcanvas=""
            className={cn(
              "group/sidebar",
              "fixed top-0 left-0 z-50 max-w-[360px] min-w-[220px] rounded-[16px] bg-surface-container elevation-2",
              "data-open:animate-in data-closed:animate-out",
              "data-open:slide-in-from-left data-closed:slide-out-to-left",
              "ease-spatial transition-all duration-(--spatial)"
            )}
          >
            <Elevation />
            {element}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    )
  }

  return (
    <Collapsible.Panel
      data-slot="sidebar"
      data-icon={collapsible === "icon" ? "" : null}
      className={cn(
        "group/sidebar",
        "flex w-(--collapsible-panel-width) flex-col justify-end bg-background data-ending-style:w-[96px] data-starting-style:w-[96px] [&[hidden]:not([hidden='until-found'])]:hidden",
        "data-open:max-w-[360px] data-open:min-w-[220px] data-closed:max-w-[96px] data-closed:min-w-[96px]",
        "ease-spatial transition-all duration-(--spatial)"
      )}
      hidden={false}
      keepMounted
    >
      {element}
    </Collapsible.Panel>
  )
}

type SidebarHeaderProps = useRender.ComponentProps<"div">

function SidebarHeader(props: SidebarHeaderProps) {
  const { className, render, ...elementProps } = props
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: cn(
          "group/sidebar-header peer/sidebar-header mx-[20px] mt-[16px] flex flex-col gap-[4px]",
          className
        ),
      },
      elementProps
    ),
    state: { slot: "sidebar-header", sidebar: "header" },
  })
}

type SidebarHeaderTriggerProps = SidebarTriggerProps | Dialog.Close.Props

function SidebarHeaderTrigger(props: SidebarHeaderTriggerProps) {
  const { store } = useSidebar()
  const collapsible = store.useState("collapsible")
  const open = store.useState("open")

  const defaultProps = {
    "data-slot": "sidebar-header-trigger",
    "data-sidebar": "header-trigger",
    className: "mx-[8px] w-fit",
    render: <Button variant="standard" size="icon-sm" />,
  }

  if (collapsible === "offcanvas") {
    return (
      <Dialog.Close {...mergeProps(defaultProps, props)}>
        <MenuOpenIcon />
      </Dialog.Close>
    )
  }

  return (
    <SidebarTrigger {...mergeProps(defaultProps, props)}>
      {open ? <MenuOpenIcon /> : <MenuIcon />}
    </SidebarTrigger>
  )
}

type SidebarHeaderActionProps = useRender.ComponentProps<"button"> &
  ButtonProps & {
    icon: React.ElementType
    label: string
  }

function SidebarHeaderAction(props: SidebarHeaderActionProps) {
  const { icon: LeadingIcon, label, render, ...elementProps } = props
  return (
    <Button
      data-slot="sidebar-header-action"
      data-sidebar="header-action"
      shape="square"
      size="md"
      variant="tonal"
      className={cn("w-full max-w-fit justify-start px-[16px]")}
      {...elementProps}
    >
      <LeadingIcon className={cn("shrink-0")} />
      <span
        className={cn(
          "opacity-0 group-data-offcanvas/sidebar:opacity-100 group-data-open/sidebar:opacity-100",
          "ease-effects transition-opacity duration-(--effects)"
        )}
      >
        {label}
      </span>
    </Button>
  )
}

type SidebarContentProps = useRender.ComponentProps<"div">

function SidebarContent(props: SidebarContentProps) {
  const { children, className, render, ...elementProps } = props
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: cn(
          "my-[16px] flex w-full flex-1 flex-col overflow-hidden peer-data-slot/sidebar-header:mt-[16px]",
          className
        ),
        children: <ScrollArea className="h-full">{children}</ScrollArea>,
      },
      elementProps
    ),
    state: { slot: "sidebar-content", sidebar: "content" },
  })
}

type SidebarGroupProps = useRender.ComponentProps<"div">

function SidebarGroup(props: SidebarGroupProps) {
  const { render, ...elementProps } = props
  return useRender({
    defaultTagName: "div",
    render,
    props: elementProps,
    state: { slot: "sidebar-group", sidebar: "group" },
  })
}

type SidebarGroupLabelProps = useRender.ComponentProps<"div">

function SidebarGroupLabel(props: SidebarGroupLabelProps) {
  const { className, render, ...elementProps } = props
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: cn(
          "mx-[36px] flex h-0 items-center overflow-hidden text-[14px]/[20px] font-[500] tracking-[0.1px] text-nowrap text-on-surface-variant opacity-0",
          "group-data-offcanvas/sidebar:h-[40px] group-data-open/sidebar:h-[40px]",
          "group-data-offcanvas/sidebar:opacity-100 group-data-open/sidebar:opacity-100",
          "transition-[height,opacity] duration-[var(--spatial),var(--effects)] ease-[var(--ease-spatial),var(--ease-effects)]",
          "group-data-open/sidebar:delay-[0ms,calc(var(--spatial)-var(--effects))]",
          className
        ),
      },
      elementProps
    ),
    state: { slot: "sidebar-group-label", sidebar: "group-label" },
  })
}

type SidebarMenuProps = useRender.ComponentProps<"div">

function SidebarMenu(props: SidebarMenuProps) {
  const { className, render, ...elementProps } = props
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: cn("group/sidebar-menu flex flex-col", className),
      },
      elementProps
    ),
    state: { slot: "sidebar-menu", sidebar: "menu" },
  })
}

type SidebarMenuItemProps = useRender.ComponentProps<"div">

function SidebarMenuItem(props: SidebarMenuItemProps) {
  const { children, className, render, ...elementProps } = props
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: cn("relative flex flex-col", className),
        children: <>{children}</>,
      },
      elementProps
    ),
    state: { slot: "sidebar-menu-item", sidebar: "menu-item" },
  })
}

type SidebarMenuButtonProps = useRender.ComponentProps<"button"> & {
  action?: React.ReactNode
  active?: boolean
  icon?: React.ElementType
  label?: string
}

function SidebarMenuButton(props: SidebarMenuButtonProps) {
  const {
    children,
    className,
    action,
    active,
    icon: Icon,
    label,
    render,
    ...elementProps
  } = props

  const { store } = useSidebar()
  const collapsible = store.useState("collapsible")

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: cn(
          "group/sidebar-menu-button relative mt-[4px] flex flex-col border-none state-layer-on-surface px-[20px] py-[6px] outline-none first:mt-0",
          "group-data-icon/sidebar:mt-0 group-data-icon/sidebar:py-0 group-data-offcanvas/sidebar:mt-0 group-data-offcanvas/sidebar:py-0 group-data-open/sidebar:mt-0 group-data-open/sidebar:py-0",
          "ease-spatial transition-[padding,margin] duration-(--spatial)",
          className
        ),
        children: (
          <>
            <SidebarMenuIndicator>
              {Icon && (
                <Icon
                  className={cn(
                    "shrink-0 text-on-surface-variant group-data-active/sidebar-menu-button:text-on-secondary-container"
                  )}
                />
              )}
              <SidebarMenuText>{label}</SidebarMenuText>
              {action && <SidebarMenuAction>{action}</SidebarMenuAction>}
              {children}
            </SidebarMenuIndicator>
            {collapsible === "default" && (
              <SidebarMenuText variant="vertical">{label}</SidebarMenuText>
            )}
          </>
        ),
      },
      elementProps
    ),
    state: { slot: "sidebar-menu-button", sidebar: "menu-item", active },
  })
}

type SidebarMenuIndicatorProps = useRender.ComponentProps<"span">

function SidebarMenuIndicator(props: SidebarMenuIndicatorProps) {
  const { children, className, render, ...elementProps } = props
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps(
      {
        className: cn(
          "relative flex grow items-center gap-[8px] overflow-hidden rounded-full px-[16px] py-[4px]",
          "group-data-icon/sidebar:py-[16px] group-data-offcanvas/sidebar:py-[16px] group-data-open/sidebar:py-[16px] group-data-active/sidebar-menu-button:bg-secondary-container",
          "ease-spatial transition-[padding] duration-(--spatial)",
          className
        ),
        children: (
          <>
            <StateLayer />
            {children}
          </>
        ),
      },
      elementProps
    ),
    state: { slot: "sidebar-menu-indicator", sidebar: "menu-indicator" },
  })
}

const sidebarMenuText = cva(
  "ease-effects font-[500] text-on-surface-variant transition-opacity duration-(--effects)",
  {
    variants: {
      variant: {
        horizontal:
          "grow text-[14px]/[20px] tracking-[0.1px] text-nowrap group-data-closed/sidebar:opacity-0 group-data-active/sidebar-menu-button:text-on-secondary-container",
        vertical: [
          "min-h-fit w-[56px] text-center text-[12px]/[16px] tracking-[0.5px]",
          "group-data-open/sidebar:opacity-0 group-data-closed/sidebar:delay-[calc(var(--spatial)-var(--effects))]",
          "group-data-active/sidebar-menu-button:text-secondary",
        ],
      },
    },
    defaultVariants: {
      variant: "horizontal",
    },
  }
)

type SidebarMenuTextProps = useRender.ComponentProps<"span"> & {
  variant?: "horizontal" | "vertical"
}

function SidebarMenuText(props: SidebarMenuTextProps) {
  const {
    children,
    className,
    render,
    variant = "horizontal",
    ...elementProps
  } = props

  const ref = useRef<HTMLSpanElement>(null)
  const [height, setHeight] = useState<number>()
  useOnMount(() => {
    if (variant === "vertical" && ref.current) {
      setHeight(ref.current?.clientHeight)
    }
  })

  const element = useRender({
    defaultTagName: "span",
    render,
    props: mergeProps(
      {
        className: cn(sidebarMenuText({ variant }), className),
        children,
        ref,
      },
      elementProps
    ),
    state: { slot: "sidebar-menu-text", sidebar: "menu-text", variant },
  })

  return variant === "vertical" ? (
    <span
      data-slot="sidebar-menu-text-vertical"
      data-sidebar="menu-text-vertical"
      className={cn(
        "flex",
        "mt-[4px] group-data-offcanvas/sidebar:mt-0 group-data-open/sidebar:mt-0",
        "h-(--vertical-text-height) group-data-offcanvas/sidebar:h-0 group-data-open/sidebar:h-0",
        "ease-spatial transition-[margin,height] duration-(--spatial)"
      )}
      style={
        {
          "--vertical-text-height": height ? `${height}px` : null,
        } as React.CSSProperties
      }
    >
      {element}
      <span className="flex"></span>
    </span>
  ) : (
    element
  )
}

type SidebarMenuActionProps = useRender.ComponentProps<"div">

function SidebarMenuAction(props: SidebarMenuActionProps) {
  const { className, render, ...elementProps } = props
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: cn(
          "shrink-0 text-on-surface-variant group-data-active/sidebar-menu-button:text-on-secondary-container",
          "ease-effects transition-opacity duration-(--effects)",
          "opacity-0 group-data-open/sidebar:opacity-100 group-data-open/sidebar:delay-[calc(_var(--spatial)-var(--effects)_)]",
          className
        ),
      },
      elementProps
    ),
    state: { slot: "sidebar-menu-action", sidebar: "menu-action" },
  })
}

type SidebarSubmenuProps = SidebarMenuProps

function SidebarSubmenu(props: SidebarSubmenuProps) {
  const { className, ...elementProps } = props
  return (
    <SidebarMenu
      data-slot="sidebar-submenu"
      data-sidebar="submenu"
      className={cn("group/sidebar-submenu ms-[20px]", className)}
      {...elementProps}
    />
  )
}

type SidebarSubmenuItemProps = SidebarMenuItemProps

function SidebarSubmenuItem(props: SidebarSubmenuItemProps) {
  const { children, ...elementProps } = props
  return (
    <SidebarMenuItem
      data-slot="sidebar-submenu-item"
      data-sidebar="submenu-item"
      {...elementProps}
    >
      <Separator
        orientation="vertical"
        className="absolute left-[16px] h-full"
      />
      {children}
    </SidebarMenuItem>
  )
}

function MenuIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>
  )
}

function MenuOpenIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z" />
    </svg>
  )
}

export {
  MenuIcon,
  MenuOpenIcon,
  Sidebar,
  SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarHeaderAction,
  SidebarHeaderTrigger,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuIndicator,
  SidebarMenuItem,
  SidebarMenuText,
  SidebarSubmenu,
  SidebarSubmenuItem,
  SidebarTrigger,
}
