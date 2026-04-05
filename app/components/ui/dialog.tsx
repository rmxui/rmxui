"use client"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { Elevation } from "~/components/ui/elevation"
import { cn } from "~/lib/utils"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

Dialog.createHandle = DialogPrimitive.createHandle

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

type DialogViewportProps = DialogPrimitive.Viewport.Props

function DialogViewport({ ...props }: DialogViewportProps) {
  return <DialogPrimitive.Viewport data-slot="dialog-viewport" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogBackdrop({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        "fixed inset-0 isolate z-50 bg-scrim/32",
        "data-open:ease-spatial data-closed:ease-spatial-fast data-ending-style:opacity-0",
        "data-open:animate-in data-open:duration-(--spatial) data-open:fade-in",
        "data-closed:animate-out data-closed:duration-(--spatial-fast) data-closed:fade-out",
        className
      )}
      {...props}
    />
  )
}

type DialogContentProps = DialogPrimitive.Popup.Props & {
  full?: boolean
}

function DialogContent({
  className,
  children,
  full,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogViewport>
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          data-full={full ?? undefined}
          className={cn(
            "group/content fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "flex max-w-[560px] min-w-[280px] flex-col gap-[24px] rounded-[28px] bg-surface-container-high py-[24px] elevation-3",
            "data-open:ease-spatial data-closed:ease-spatial-fast",
            "data-open:animate-in data-open:duration-(--spatial) data-open:fade-in",
            "data-closed:animate-out data-closed:duration-(--spatial-fast) data-closed:fade-out",
            "data-open:*:ease-effects data-closed:*:ease-spatial-fast data-ending-style:*:opacity-0",
            "data-open:*:animate-in data-open:*:duration-(--effects) data-open:*:fade-in",
            "data-closed:*:animate-out data-closed:*:duration-(--spatial-fast) data-closed:*:fade-out",
            full && "min-h-svh min-w-svw rounded-[initial]",
            className
          )}
          {...props}
        >
          <Elevation />
          {children}
        </DialogPrimitive.Popup>
      </DialogViewport>
    </DialogPortal>
  )
}

type DialogHeaderProps = React.ComponentProps<"div"> & {
  orientation?: "vertical" | "horizontal"
}
function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex group-not-data-full/content:flex-col",
        "group-data-full/content:items-center group-data-full/content:gap-[8px] group-data-full/content:px-[8px]",
        "group-data-full/content:*:data-[slot=dialog-close]:first:not-last:state-layer-on-surface group-data-full/content:*:data-[slot=dialog-close]:first:not-last:text-on-surface group-data-full/content:*:[button]:last:not-first:ms-auto",
        className
      )}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex justify-end px-[24px]", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "peer/title tracking-0 px-[24px] text-[24px]/[32px] font-[400] text-on-surface group-data-full/content:px-0 peer-data-[slot=dialog-description]/desc:pt-[16px]",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "peer/desc px-[24px] text-[14px]/[20px] font-[400] tracking-[0.25px] text-on-surface-variant peer-data-[slot=dialog-title]/title:pt-[16px]",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
}
