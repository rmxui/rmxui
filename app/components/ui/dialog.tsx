import { Dialog as DialogBase } from "@base-ui-components/react/dialog";
import { cn } from "~/lib/utils";
import { Elevation } from "./elevation";
import { Button } from "./button";

export type DialogProps = React.ComponentProps<typeof DialogBase.Root>;

export function Dialog(props: DialogProps) {
  return <DialogBase.Root {...props}></DialogBase.Root>;
}

export type DialogTriggerProps = React.ComponentProps<
  typeof DialogBase.Trigger
>;

export function DialogTrigger({ ...props }: DialogTriggerProps) {
  return <DialogBase.Trigger {...props}></DialogBase.Trigger>;
}

export type DialogPopupProps = React.ComponentProps<typeof DialogBase.Popup>;

export function DialogPopup({ children, ...componentProps }: DialogPopupProps) {
  return (
    <DialogBase.Portal>
      <DialogBase.Backdrop
        render={(props, state) => (
          <div
            {...props}
            data-slot="dialog-scrim"
            className={cn(
              "fixed top-0 left-0 min-w-screen min-h-screen bg-on-surface-variant opacity-40",
              state.open
                ? "animate-in fade-in ease-effects-slow duration-(--effects-slow)"
                : "animate-out fade-out ease-effects-slow duration-(--effects-slow)",
              props.className,
            )}
          ></div>
        )}
      ></DialogBase.Backdrop>
      <DialogBase.Popup
        render={(props, state) => (
          <div
            {...props}
            data-slot="dialog-popup"
            className={cn(
              "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "bg-surface-container-high elevation-3 rounded-[28px]",
              "min-w-[280px] max-w-[560px] p-[24px]",
              state.open
                ? "animate-in fade-in ease-effects-slow duration-(--effects-slow)"
                : "animate-out fade-out ease-effects-slow duration-(--effects-slow)",
              props.className,
            )}
          ></div>
        )}
        {...componentProps}
      >
        <Elevation></Elevation>
        {children}
      </DialogBase.Popup>
    </DialogBase.Portal>
  );
}

export type DialogHeadlineProps = React.ComponentProps<typeof DialogBase.Title>;

export function DialogHeadline({ className, ...props }: DialogHeadlineProps) {
  return (
    <DialogBase.Title
      data-slot="dialog-headline"
      className={cn(
        "[[data-slot=dialog-icon]+&]:pt-[16px]",
        "font-[400] text-[24px]/[32px] tracking-[0]",
        "text-on-surface",
        className,
      )}
      {...props}
    ></DialogBase.Title>
  );
}

export type DialogSupportingTextProps = React.ComponentProps<
  typeof DialogBase.Description
>;

export function DialogSupportingText({
  className,
  ...props
}: DialogSupportingTextProps) {
  return (
    <DialogBase.Description
      data-slot="dialog-supporting-text"
      className={cn(
        "[[data-slot=dialog-icon]+&]:pt-[16px]",
        "[[data-slot=dialog-headline]+&]:pt-[16px]",
        "font-[400] text-[14px]/[20px] tracking-[0.25px]",
        "text-on-surface-variant",
        className,
      )}
      {...props}
    ></DialogBase.Description>
  );
}

export function DialogActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-actions"
      className={cn(
        "flex items-center justify-end gap-[8px] pt-[24px]",
        className,
      )}
      {...props}
    ></div>
  );
}

export type DialogButtonProps = React.ComponentProps<typeof DialogBase.Close>;

export function DialogButton({ render, ...props }: DialogButtonProps) {
  return (
    <DialogBase.Close
      data-slot="dialog-button"
      render={render ?? <Button color="text"></Button>}
      {...props}
    ></DialogBase.Close>
  );
}
