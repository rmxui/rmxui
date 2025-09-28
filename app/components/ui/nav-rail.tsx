import { Collapsible } from "@base-ui-components/react/collapsible";
import { Dialog } from "@base-ui-components/react/dialog";
import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { cn } from "~/lib/utils";
import { Fab, type FabProps } from "~/components/ui/fab";
import { Icon } from "~/components/ui/icon";
import { IconButton } from "~/components/ui/icon-button";
import { Label } from "~/components/ui/label";
import { Ripple } from "~/components/ui/ripple";

export type NavRailContextValue = {
  modal?: boolean;
  open?: boolean;
  setOpen: Function;
};

const NavRailContext = createContext<NavRailContextValue>({
  modal: false,
  open: false,
  setOpen: () => {},
});

export type NavRailProps = React.ComponentProps<
  typeof Collapsible.Root | typeof Dialog.Root
> & {
  modal?: boolean;
};

export function NavRail({ modal, ...componentProps }: NavRailProps) {
  const [open, setOpenState] = useState(false);
  const setOpen = useCallback((value: boolean) => setOpenState(value), [open]);

  if (modal) {
    const dialogProps = componentProps as React.ComponentProps<
      typeof Dialog.Root
    >;

    return (
      <NavRailContext value={{ modal, open, setOpen }}>
        <Dialog.Root {...dialogProps}></Dialog.Root>
      </NavRailContext>
    );
  }

  const collapsibleProps = componentProps as React.ComponentProps<
    typeof Collapsible.Root
  >;

  return (
    <Collapsible.Root
      data-slot="nav-rail"
      render={(props, state) => (
        <NavRailContext value={{ ...state, modal, setOpen }}>
          <div {...props}></div>
        </NavRailContext>
      )}
      {...collapsibleProps}
    ></Collapsible.Root>
  );
}

export type NavRailTriggerProps = React.ComponentProps<
  typeof Collapsible.Trigger | typeof Dialog.Trigger
>;

export function NavRailTrigger({ ...props }: NavRailTriggerProps) {
  const { modal } = useContext(NavRailContext);
  const Comp = modal ? Dialog.Trigger : Collapsible.Trigger;
  const compProps = modal
    ? (props as React.ComponentProps<typeof Dialog.Trigger>)
    : (props as React.ComponentProps<typeof Collapsible.Trigger>);
  return <Comp data-slot="nav-rail-trigger" {...compProps}></Comp>;
}

export type NavRailPanelProps = React.ComponentProps<
  typeof Collapsible.Panel | typeof Dialog.Popup
>;

export function NavRailPanel({ className, ...props }: NavRailPanelProps) {
  const { modal, open, setOpen } = useContext(NavRailContext);

  if (modal) {
    const dialogProps = props as React.ComponentProps<typeof Dialog.Popup>;
    return (
      <Dialog.Portal keepMounted>
        <Dialog.Backdrop
          data-slot="nav-rail-scrim"
          className={cn(
            "fixed top-0 left-0 w-full min-h-screen bg-on-surface-variant",
            "transition-[opacity] ease-x-effects-slow duration-x-effects-slow",
            open ? "opacity-40" : "opacity-0",
          )}
        ></Dialog.Backdrop>
        <Dialog.Popup
          data-slot="nav-rail-panel"
          className={cn(
            "inline-flex flex-col rounded-e-[16px] pt-[44px] min-h-screen",
            "fixed top-0 left-0 bg-surface-container",
            "transition-[min-width] ease-x-spatial duration-x-spatial",
            open ? "min-w-[220px] max-w-[360px]" : "min-w-0 w-0",
          )}
          render={(props, state) => {
            useEffect(() => setOpen?.(state.open), [state.open]);
            return <div {...props}></div>;
          }}
          {...dialogProps}
        ></Dialog.Popup>
      </Dialog.Portal>
    );
  }

  const collapsibleProps = props as React.ComponentProps<
    typeof Collapsible.Panel
  >;
  return (
    <Collapsible.Panel
      data-slot="nav-rail-panel"
      keepMounted
      className={cn(
        "inline-flex flex-col pt-[44px] min-h-[calc(100vh-44px)]",
        "bg-surface",
        "transition-[min-width] ease-x-spatial duration-x-spatial",
        open ? "min-w-[220px] max-w-[360px]" : "min-w-[96px] max-w-[96px]",
        className,
      )}
      {...collapsibleProps}
      hidden={undefined}
    ></Collapsible.Panel>
  );
}

export function NavRailMenu({
  className,
  ...componentProps
}: NavRailTriggerProps) {
  const { modal } = useContext(NavRailContext);

  return (
    <div>
      <NavRailTrigger
        className={cn("ms-[28px]", className)}
        render={(props, state) => (
          <IconButton
            {...props}
            color="standard"
            icon={modal || state.open ? <MenuOpenIcon /> : <MenuIcon />}
            label={modal || state.open ? "menu-open" : "menu"}
          ></IconButton>
        )}
        {...componentProps}
      ></NavRailTrigger>
    </div>
  );
}

export function NavRailFab({ className, ...props }: FabProps) {
  const { modal, open } = useContext(NavRailContext);

  return (
    <div
      className={cn(
        modal && "transition-[opacity] ease-x-effects duration-x-effects",
        modal && !open && "opacity-0",
        modal && open && "opacity-100",
      )}
    >
      <Fab
        className={cn("mt-[16px] ms-[20px] elevation-0!", className)}
        extended={modal || open}
        {...props}
      ></Fab>
    </div>
  );
}

export function NavRailList({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  const { modal, open } = useContext(NavRailContext);

  return (
    <ul
      data-slot="nav-rail-list"
      className={cn(
        "relative inline-flex flex-col items-start pt-[40px] px-[20px]",
        modal || open ? "" : "gap-[6px]",
        modal && "transition-[opacity] ease-x-effects duration-x-effects",
        modal && !open && "opacity-0",
        modal && open && "opacity-100",
        className,
      )}
      {...props}
    ></ul>
  );
}

export function NavRailItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="nav-rail-item"
      className={cn("relative flex", className)}
      {...props}
    ></li>
  );
}

export type NavRailLinkProps = useRender.ComponentProps<"a"> & {
  icon: React.ReactNode;
};
export function NavRailLink({
  icon,
  render,
  ...componentProps
}: NavRailLinkProps) {
  const defaultProps: useRender.ElementProps<"a"> = { href: "" };
  const props = mergeProps<"a">(defaultProps, componentProps);

  const { modal, open } = useContext(NavRailContext);

  const element = useRender({
    render: render ?? <a />,
    props: {
      ...props,
      className: cn(
        "relative flex flex-col w-full",
        "outline-none border-none",
        "[.active]:*:data-[slot=indicator]:bg-secondary-container",
        "[.active]:*:data-[slot=indicator]:*:data-[slot=label]:text-secondary",
        "[.active]:*:data-[slot=label]:text-secondary",
        "*:data-[slot=label]:text-on-surface-variant",
        "[.active]:*:data-[slot=indicator]:*:data-[slot=icon]:text-on-secondary-container",
        "*:data-[slot=indicator]:*:data-[slot=icon]:text-on-surface-variant",
        "ripple-on-secondary-container",
        modal || open ? "items-start" : "items-center gap-[4px] pb-[4px]",
        props.className,
      ),
      children: (
        <>
          <span
            data-slot="indicator"
            className={cn(
              "relative flex items-center justify-center",
              "rounded-full px-[16px] gap-[8px]",
              modal || open ? "h-[56px]" : "h-[32px] w-[56px]",
            )}
          >
            <Ripple />
            <Icon className="size-[24px]">{icon}</Icon>
            {(modal || open) && (
              <Label
                className={cn(
                  "flex items-center",
                  "font-[500] text-[14px]/[20px] tracking-[0.1px]",
                )}
              >
                {props.children}
              </Label>
            )}
          </span>
          {!modal && !open && (
            <Label className="flex items-center font-[500] text-[12px]/[16px] tracking-[0.5px]">
              {props.children}
            </Label>
          )}
        </>
      ),
    },
  });

  return element;
}

export function MenuIcon(props: React.ComponentProps<"svg">) {
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
  );
}

export function MenuOpenIcon(props: React.ComponentProps<"svg">) {
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
  );
}
