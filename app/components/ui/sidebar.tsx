"use client"
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

import { Collapsible } from "@base-ui/react/collapsible"
import { Dialog } from "@base-ui/react/dialog"
import { Menu } from "@base-ui/react/menu"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { Button, type ButtonProps } from "~/components/ui/button"
import { StateLayer } from "~/components/ui/state-layer"
import { Text } from "~/components/ui/text"
import { cn } from "~/lib/utils"
import { Elevation } from "./elevation"

type SidebarContextState = {
  modal?: boolean
  open?: boolean
  setOpen?: (open: boolean) => void
}

const SidebarContext = createContext<SidebarContextState | null>(null)

function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a Sidebar.")
  }
  return context
}

type SidebarProps = (Collapsible.Root.Props | Dialog.Root.Props) & {
  children?: React.ReactNode
  variant?: "standard" | "modal"
}

function Sidebar({
  children,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  variant = "standard",
  ...props
}: SidebarProps) {
  const [_open, _setOpen] = useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean), eventDetails?: any) => {
      const openState = typeof value === "function" ? value(open) : value
      if (onOpenChange) {
        onOpenChange(openState, eventDetails)
      } else {
        _setOpen(openState)
      }
    },
    [open, onOpenChange]
  )

  const modal = variant === "modal"

  const contextValue = useMemo(
    () => ({ open, setOpen, modal }),
    [open, setOpen, modal]
  )

  const defaultProps = {
    "data-slot": "sidebar",
    "data-modal": modal ? "" : null,
  }

  const element = modal ? (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(open) => {
        if (open) document.documentElement.removeAttribute("style")
      }}
      {...mergeProps({}, props)}
    >
      <div {...defaultProps}>{children}</div>
    </Dialog.Root>
  ) : (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      {...mergeProps(defaultProps, props)}
    >
      {children}
    </Collapsible.Root>
  )

  return <SidebarContext value={contextValue}>{element}</SidebarContext>
}

type SidebarTriggerProps = (Collapsible.Trigger.Props | Dialog.Trigger.Props) &
  Pick<Dialog.Trigger.Props, "handle">

function SidebarTrigger({ handle, ...props }: SidebarTriggerProps) {
  const { modal } = useSidebar()

  const defaultProps = {
    "data-slot": "sidebar-trigger",
    "data-sidebar": "trigger",
    "data-modal": modal ? "" : null,
  }

  if (modal) {
    return (
      <Dialog.Trigger handle={handle} {...mergeProps(defaultProps, props)} />
    )
  }

  return <Collapsible.Trigger {...mergeProps(defaultProps, props)} />
}
const sidebarPanel = cva(
  "h-screen max-w-[96px] min-w-[96px] data-ending-style:w-[96px] data-starting-style:w-[96px]",
  {
    variants: {
      modal: {
        false: [
          "flex flex-col justify-end overflow-hidden [&[hidden]:not([hidden='until-found'])]:hidden",
          "ease-spatial-fast transition-all duration-(--spatial-fast)",
          "w-fit data-open:max-w-[360px] data-open:min-w-[220px]",
        ],
        true: null,
      },
    },
    defaultVariants: {
      modal: false,
    },
  }
)

type SidebarPanelProps = (Collapsible.Panel.Props | Dialog.Portal.Props) & {}

function SidebarPanel({ className, ...props }: SidebarPanelProps) {
  const { modal } = useSidebar()

  const defaultProps = {
    "data-slot": "sidebar-panel",
    "data-sidebar": "panel",
    "data-modal": modal ? "" : null,
    className: cn(sidebarPanel({ modal }), className),
  }

  if (modal) {
    return <Dialog.Portal {...mergeProps(defaultProps, props)} />
  }

  return (
    <Collapsible.Panel
      hidden={false}
      keepMounted
      {...mergeProps(defaultProps, props)}
    />
  )
}

const panelStateAttributesMapping = {
  open: (open?: boolean) => (open ? { "data-panel-open": "" } : null),
  closed: (closed?: boolean) => (closed ? { "data-panel-closed": "" } : null),
}

const sidebarContent = cva("flex grow flex-col gap-[40px]", {
  variants: {
    modal: {
      false: "bg-surface",
      true: [
        "h-screen w-fit max-w-[360px] min-w-[220px] rounded-[16px] bg-surface-container py-[4px] elevation-2",
        "ease-spatial transition-all duration-(--spatial)",
      ],
    },
    side: {
      left: null,
      right: null,
    },
  },
  compoundVariants: [
    {
      modal: true,
      side: "left",
      class: [
        "fixed top-0 left-0 z-50",
        "data-panel-open:animate-in data-panel-open:slide-in-from-left",
        "data-panel-closed:animate-out data-panel-closed:slide-out-to-left",
      ],
    },
  ],
  defaultVariants: {
    modal: false,
    side: "left",
  },
})

type SidebarContentProps = (
  | useRender.ComponentProps<"div">
  | Dialog.Popup.Props
) &
  Pick<VariantProps<typeof sidebarContent>, "side"> & {}

function SidebarContent({
  children,
  className,
  render,
  side = "left",
  ...props
}: SidebarContentProps) {
  const { modal, open } = useSidebar()

  if (modal) {
    return (
      <>
        <Dialog.Backdrop
          data-slot="sidebar-backdrop"
          className={cn(
            "fixed inset-0 isolate z-50 bg-scrim/32",
            "data-open:ease-spatial data-closed:ease-spatial-fast data-ending-style:opacity-0",
            "data-open:animate-in data-open:duration-(--spatial) data-open:fade-in",
            "data-closed:animate-out data-closed:duration-(--spatial) data-closed:fade-out",
            className
          )}
        />
        <Dialog.Viewport data-slot="sidebar-viewport">
          <Dialog.Popup
            data-slot="sidebar-content"
            data-sidebar="content"
            data-modal={modal ? "" : null}
            data-panel-open={open ? "" : null}
            data-panel-closed={!open ? "" : null}
            render={render}
            {...mergeProps(
              { className: cn(sidebarContent({ modal, side }), className) },
              props
            )}
          >
            <Elevation />
            {children}
          </Dialog.Popup>
        </Dialog.Viewport>
      </>
    )
  }

  return useRender({
    defaultTagName: "div",
    render: render as useRender.RenderProp,
    props: mergeProps(
      { className: cn(sidebarContent({ modal }), className), children },
      props
    ),
    state: {
      slot: "sidebar-content",
      sidebar: "content",
      modal,
      open,
      closed: !open,
    },
    stateAttributesMapping: panelStateAttributesMapping,
  })
}

type SidebarHeaderProps = useRender.ComponentProps<"div">

function SidebarHeader({ className, render, ...props }: SidebarHeaderProps) {
  const { open } = useSidebar()

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: cn("mx-[20px] flex flex-col gap-[4px]", className),
      },
      props
    ),
    state: {
      slot: "sidebar-header",
      sidebar: "header",
      open,
      closed: !open,
    },
    stateAttributesMapping: panelStateAttributesMapping,
  })
}

type SidebarHeaderTriggerProps = SidebarTriggerProps | Dialog.Close.Props

function SidebarHeaderTrigger({ ...props }: SidebarHeaderTriggerProps) {
  const { modal, open } = useSidebar()

  const defaultProps = {
    "data-slot": "sidebar-header-trigger",
    "data-sidebar": "header-trigger",
    className: "mx-[8px] w-fit",
    render: <Button variant="standard" size="icon-sm" />,
  }

  if (modal) {
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

type SidebarHeaderActionProps = ButtonProps & {
  icon: React.ElementType
  label: string
}
function SidebarHeaderAction({
  icon: LeadingIcon,
  label,
  ...props
}: SidebarHeaderActionProps) {
  const { modal, open } = useSidebar()

  return (
    <Button
      data-panel-open={open ? "" : null}
      data-panel-closed={!open ? "" : null}
      shape="square"
      size="md"
      className={cn(
        "w-full max-w-fit justify-start px-[16px]",
        "ease-spatial-fast transition-all duration-(--spatial-fast)"
      )}
      {...props}
    >
      <LeadingIcon className={cn("shrink-0")} />
      <span
        className={cn(
          !modal && [
            open
              ? "ms-[4px] opacity-100 transition-[opacity,margin] duration-[350ms,350ms]"
              : "ms-0 opacity-0 transition-[opacity,margin] delay-[0ms,350ms] duration-[350ms,0ms]",
          ]
        )}
      >
        {label}
      </span>
    </Button>
  )
}

type SidebarGroupProps = useRender.ComponentProps<"div">

function SidebarGroup({ className, render, ...props }: SidebarGroupProps) {
  const { open } = useSidebar()

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps({ className: cn(className) }, props),
    state: {
      slot: "sidebar-group",
      sidebar: "group",
      open,
      closed: !open,
    },
  })
}

type SidebarGroupLabelProps = useRender.ComponentProps<"div">

function SidebarGroupLabel({
  className,
  render,
  ...props
}: SidebarGroupLabelProps) {
  const { open } = useSidebar()

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: cn(
          "mx-[36px] mt-[12px] mb-[8px] text-[14px]/[20px] font-[500] tracking-[0.1px] text-nowrap text-on-surface-variant",
          "data-closed:hidden",
          className
        ),
      },
      props
    ),
    state: {
      slot: "sidebar-group-label",
      sidebar: "group-label",
      open,
      closed: !open,
    },
  })
}

type SidebarMenuProps = useRender.ComponentProps<"div">

function SidebarMenu({ className, render, ...props }: SidebarMenuProps) {
  const { open } = useSidebar()

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps({ className: cn("flex flex-col", className) }, props),
    state: {
      slot: "sidebar-menu",
      sidebar: "menu",
      open,
      closed: !open,
    },
    stateAttributesMapping: panelStateAttributesMapping,
  })
}

type SidebarMenuItemProps = useRender.ComponentProps<"div"> &
  Menu.Item.Props & {
    icon: React.ElementType
    isActive?: boolean
    label: string
  }

function SidebarMenuItem({
  children,
  className,
  icon: LeadingIcon,
  isActive,
  label,
  render,
  ...props
}: SidebarMenuItemProps) {
  const { modal, open } = useSidebar()

  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: cn(
          "relative flex flex-col items-start justify-center state-layer-on-secondary-container px-[20px] [a]:cursor-pointer",
          "ease-spatial-fast transition-all duration-(--spatial-fast)",
          modal || open ? "h-[56px]" : "h-[64px]",
          className
        ),
        children: (
          <>
            <SidebarMenuItemIndicator data-active={isActive ? "" : null}>
              <LeadingIcon />
              <Text
                className={cn(
                  "text-[14px]/[20px] font-[500] tracking-[0.1px]",
                  "ease-spatial-fast transition-all",
                  modal || open
                    ? "ml-[4px] opacity-100 transition-[opacity,margin-left] duration-[350ms,350ms]"
                    : "-ml-[4px] opacity-0 transition-[opacity,margin-left] delay-[0ms,350ms] duration-[350ms,0ms]"
                )}
              >
                {label}
              </Text>
              {children}
            </SidebarMenuItemIndicator>
            {!modal && (
              <div
                className={cn(
                  "overflow-hidden *:text-on-surface-variant data-active:*:text-secondary",
                  "ease-spatial-fast",
                  open
                    ? "h-0 opacity-0 transition-[opacity,height] duration-[350ms,350ms]"
                    : "h-[20px] opacity-100 transition-[opacity,height] delay-[300ms,0ms] duration-[50ms,350ms]"
                )}
              >
                <div className="h-[4px]"></div>
                <Text
                  className={cn(
                    "flex text-[12px]/[16px] font-[500] tracking-[0.5px]",
                    "ps-[12px]",
                    open ? "opacity-0" : "opacity-100"
                  )}
                >
                  {label}
                </Text>
              </div>
            )}
          </>
        ),
      },
      props
    ),
    state: {
      slot: "sidebar-menu-item",
      sidebar: "menu-item",
      open,
      closed: !open,
      active: isActive,
    },
    stateAttributesMapping: panelStateAttributesMapping,
  })

  return (
    <>
      {!modal && (
        <div
          className={cn(
            "ease-spatial-fast transition-[height,width] duration-(--spatial-fast)",
            "not-first:h-[4px]",
            open && "not-first:h-0"
          )}
        ></div>
      )}
      {element}
    </>
  )
}

type SidebarMenuItemIndicatorProps = useRender.ComponentProps<"span"> & {}

function SidebarMenuItemIndicator({
  children,
  className,
  render,
  ...props
}: SidebarMenuItemIndicatorProps) {
  const { modal, open } = useSidebar()

  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps(
      {
        className: cn(
          "relative flex w-full max-w-fit items-center overflow-hidden rounded-full px-[16px] data-active:bg-secondary-container",
          "*:text-on-surface-variant data-active:*:text-secondary",
          "*:[svg]:shrink-0 *:[svg]:text-on-surface-variant data-active:*:[svg]:text-on-secondary-container",
          "gap-[8px]",
          "ease-spatial-fast",
          modal || open
            ? "h-[56px] transition-[all,height] duration-(--spatial-fast)"
            : "h-[32px] transition-[all,height] delay-[0ms,100ms] duration-[350ms,250ms]",
          className
        ),
        children: (
          <>
            <StateLayer />
            {children}
          </>
        ),
      },
      props
    ),
    state: {
      slot: "sidebar-menu-item-indicator",
      sidebar: "menu-item-indicator",
      open,
      closed: !open,
    },
    stateAttributesMapping: panelStateAttributesMapping,
  })
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
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarHeaderAction,
  SidebarHeaderTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuItemIndicator,
  SidebarPanel,
  SidebarTrigger,
}
