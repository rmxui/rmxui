import { Popover } from "@base-ui-components/react/popover";
import { Tooltip as TooltipBase } from "@base-ui-components/react/tooltip";
import { createContext, useContext } from "react";
import { Button } from "~/components/ui/button";
import { Elevation } from "~/components/ui/elevation";
import { cn } from "~/lib/utils";

export const TooltipProvider = TooltipBase.Provider;

export type TooltipContextProps = {
  rich?: boolean;
};

export const TooltipContext = createContext<TooltipContextProps>({
  rich: false,
});

export function useTooltipContext() {
  return useContext(TooltipContext);
}

export type TooltipProps = (Popover.Root.Props | TooltipBase.Root.Props) &
  TooltipContextProps;

export function Tooltip({ rich = false, ...props }: TooltipProps) {
  if (rich) {
    const rootProps = props as Popover.Root.Props;
    return (
      <TooltipContext value={{ rich }}>
        <Popover.Root {...rootProps}></Popover.Root>
      </TooltipContext>
    );
  }

  const rootProps = props as TooltipBase.Root.Props;
  return <TooltipBase.Root {...rootProps}></TooltipBase.Root>;
}

export type TooltipTriggerProps =
  | Popover.Trigger.Props
  | TooltipBase.Trigger.Props;

export function TooltipTrigger({ ...props }: TooltipTriggerProps) {
  const { rich } = useTooltipContext();
  if (rich) {
    return <Popover.Trigger {...props}></Popover.Trigger>;
  }

  const triggerProps = props as TooltipBase.Trigger.Props;
  return <TooltipBase.Trigger {...triggerProps}></TooltipBase.Trigger>;
}

export type TooltipPositionerProps =
  | Popover.Positioner.Props
  | TooltipBase.Positioner.Props;

export type TooltipContentProps = (
  | Popover.Popup.Props
  | TooltipBase.Popup.Props
) & {
  positioner?: TooltipPositionerProps;
  title?: string;
  description: string;
  actions?: React.ReactNode;
};

export function TooltipContent({
  positioner,
  title,
  description,
  actions,
  ...props
}: TooltipContentProps) {
  const { rich } = useTooltipContext();
  if (rich) {
    const positionerProps = {
      side: "bottom",
      sideOffset: 8,
      ...positioner,
    } as Popover.Positioner.Props;
    const popupProps = props as Popover.Popup.Props;

    return (
      <Popover.Portal>
        <Popover.Backdrop></Popover.Backdrop>
        <Popover.Positioner {...positionerProps}>
          <Popover.Popup
            render={(props, state) => (
              <div
                {...props}
                data-slot="tooltip-content"
                className={cn(
                  "flex flex-col max-w-[312px]",
                  "bg-surface-container elevation-2 rounded-[12px]",
                  "has-[>[data-slot=tooltip-title]]:*:data-[slot=tooltip-description]:pt-[4px]",
                  "pt-[12px] pb-[8px] px-[16px]",
                  state.open
                    ? "animate-in fade-in ease-effects-slow duration-(--effects-slow)"
                    : "animate-out fade-out ease-effects-slow duration-(--effects-slow)",
                  props.className,
                )}
              >
                <Elevation></Elevation>
                {title && <TooltipTitle>{title}</TooltipTitle>}
                <TooltipDescription>{description}</TooltipDescription>
                {actions && <TooltipActions>{actions}</TooltipActions>}
              </div>
            )}
            {...popupProps}
          ></Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    );
  }

  const positionerProps = {
    side: "top",
    sideOffset: 4,
    ...positioner,
  } as TooltipBase.Positioner.Props;
  const popupProps = props as TooltipBase.Popup.Props;

  return (
    <TooltipBase.Portal>
      <TooltipBase.Positioner {...positionerProps}>
        <TooltipBase.Popup
          render={(props, state) => (
            <div
              {...props}
              data-slot="tooltip-content"
              className={cn(
                "flex items-center max-w-[213px]",
                "bg-inverse-surface rounded-[4px]",
                "px-[8px] py-[4px] min-h-[24px]",
                state.open
                  ? "animate-in fade-in ease-effects-slow duration-(--effects-slow)"
                  : "animate-out fade-out ease-effects-slow duration-(--effects-slow)",
                props.className,
              )}
            >
              <TooltipDescription>{description}</TooltipDescription>
            </div>
          )}
          {...popupProps}
        ></TooltipBase.Popup>
      </TooltipBase.Positioner>
    </TooltipBase.Portal>
  );
}

export type TooltipTitleProps = Popover.Title.Props;

export function TooltipTitle({ className, ...props }: TooltipTitleProps) {
  const { rich } = useTooltipContext();
  if (!rich) {
    throw new Error(
      "RMX UI: <TooltipTitle> must be placed within a rich tooltip: <Tooltip rich>.",
    );
  }

  return (
    <Popover.Title
      data-slot="tooltip-title"
      className={cn(
        "font-[500] text-[14px]/[20px] tracking-[0.1px] text-on-surface-variant",
        className,
      )}
      {...props}
    ></Popover.Title>
  );
}

export type TooltipDescriptionProps =
  | Popover.Description.Props
  | React.ComponentProps<"p">;

export function TooltipDescription({
  className,
  ...props
}: TooltipDescriptionProps) {
  const { rich } = useContext(TooltipContext);
  if (rich) {
    return (
      <Popover.Description
        data-slot="tooltip-description"
        className={cn(
          "font-[400] text-[14px]/[20px] tracking-[0.25px] text-on-surface-variant",
          className,
        )}
        {...props}
      ></Popover.Description>
    );
  }

  const descriptionProps = props as React.ComponentProps<"p">;
  return (
    <p
      data-slot="tooltip-description"
      className={cn(
        "font-[400] text-[12px]/[16px] tracking-[0.4px] text-inverse-on-surface",
        className,
      )}
      {...descriptionProps}
    ></p>
  );
}

export type TooltipActionsProps = React.ComponentProps<"div">;

export function TooltipActions({ className, ...props }: TooltipActionsProps) {
  const { rich } = useTooltipContext();
  if (!rich) {
    throw new Error(
      "RMX UI: <TooltipActions> must be placed within a rich tooltip: <Tooltip rich>.",
    );
  }

  return (
    <div
      data-slot="tooltip-actions"
      className={cn("flex items-center mx-[-12px] pt-[8px]", className)}
      {...props}
    ></div>
  );
}

export type TooltipActionProps = Popover.Close.Props;

export function TooltipAction(props: TooltipActionProps) {
  const { rich } = useTooltipContext();
  if (!rich) {
    throw new Error(
      "RMX UI: <TooltipAction> must be placed within a rich tooltip: <Tooltip rich>.",
    );
  }

  return (
    <Popover.Close
      data-slot="tooltip-action"
      render={<Button color="text"></Button>}
      {...props}
    ></Popover.Close>
  );
}
