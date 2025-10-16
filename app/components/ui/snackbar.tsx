import { Toast } from "@base-ui-components/react/toast";
import { IconButton } from "~/components/ui/icon-button";
import { Elevation } from "~/components/ui/elevation";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export type SnackbarManagerReturnValue = Toast.useToastManager.ReturnValue;
export const useSnackbarManager = Toast.useToastManager;

export type SnackbarProviderProps = React.ComponentProps<typeof Toast.Provider>;

export function SnackbarProvider(props: SnackbarProviderProps) {
  return <Toast.Provider {...props}></Toast.Provider>;
}

export type SnackbarTriggerProps = React.ComponentProps<typeof Button> & {
  snackbar: Toast.useToastManager.AddOptions<object>;
};

export function SnackbarTrigger({ snackbar, ...props }: SnackbarTriggerProps) {
  const snackbarManager = useSnackbarManager();

  function createSnack() {
    const id = snackbarManager.add({
      ...snackbar,
      actionProps: snackbar.actionProps
        ? {
            ...snackbar.actionProps,
            onClick: function (
              e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            ) {
              snackbarManager.close(id);
              if (snackbar.actionProps?.onClick) {
                snackbar.actionProps.onClick(e);
              }
            },
          }
        : undefined,
    });
  }

  return <Button onClick={createSnack} {...props}></Button>;
}

export function SnackbarList() {
  const { toasts } = useSnackbarManager();
  return toasts.map((toast) => (
    <Snackbar toast={toast} key={toast.id}>
      <SnackbarContent>
        <SnackbarDescription></SnackbarDescription>
        <div className="flex items-center justify-end ms-auto">
          <SnackbarAction></SnackbarAction>
          {toast.type === "closeable" && <SnackbarClose></SnackbarClose>}
        </div>{" "}
      </SnackbarContent>
    </Snackbar>
  ));
}

export type SnackbarPortalProps = React.ComponentProps<typeof Toast.Portal>;

export function SnackbarPortal(props: SnackbarPortalProps) {
  return <Toast.Portal {...props}></Toast.Portal>;
}

export type SnackbarViewportProps = React.ComponentProps<typeof Toast.Viewport>;

export function SnackbarViewport({
  className,
  ...props
}: SnackbarViewportProps) {
  return (
    <Toast.Viewport
      data-slot="snackbar-viewport"
      className={cn(
        "fixed z-10 top-auto right-[1rem] bottom-[1rem] left-[1rem]",
        "mx-auto flex w-full sm:max-w-[344px] max-w-[calc(100svw-2rem)]",
        className,
      )}
      {...props}
    ></Toast.Viewport>
  );
}

export type SnackbarProps = React.ComponentProps<typeof Toast.Root>;

export function Snackbar({ children, className, ...props }: SnackbarProps) {
  return (
    <Toast.Root
      data-slot="snackbar"
      className={cn(
        "bg-inverse-surface elevation-3 rounded-[4px]",
        "[--gap:0.75rem]",
        "[--peek:0.75rem]",
        "[--scale:calc(max(0,1-(var(--toast-index)*0.1)))]",
        "[--shrink:calc(1-var(--scale))]",
        "[--height:var(--toast-frontmost-height,var(--toast-height))]",
        "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
        "absolute right-0 bottom-0 left-auto",
        "z-[calc(1000-var(--toast-index))]",
        "mr-0 w-full origin-bottom",
        "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
        "bg-clip-padding",
        "select-none",
        "after:absolute after:top-full after:left-0",
        "after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        "data-[ending-style]:opacity-0",
        "data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]",
        "data-[limited]:opacity-0",
        "data-[starting-style]:[transform:translateY(150%)]",
        "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
        "data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-[expanded]:data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-[expanded]:data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-[expanded]:data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "data-[expanded]:data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "h-[var(--height)]",
        "data-[expanded]:h-[var(--toast-height)]",
        "[transition:transform_var(--ease-spatial)_var(--spatial),opacity_var(--ease-effects-slow)_var(--effects-slow),height_var(--ease-spatial)_var(--spatial)]",
        className,
      )}
      {...props}
    >
      <Elevation></Elevation>
      {children}
    </Toast.Root>
  );
}

export type SnackbarContentProps = React.ComponentProps<typeof Toast.Content>;

export function SnackbarContent({ className, ...props }: SnackbarContentProps) {
  return (
    <Toast.Content
      data-slot="snackbar-content"
      className={cn(
        "flex items-center flex-wrap gap-[4px] p-[4px] ps-[12px] min-h-[48px]",
        "overflow-hidden",
        "transition-[opacity] ease-effects-slow duration-(--effects-slow)",
        "data-[behind]:pointer-events-none data-[behind]:opacity-0",
        "data-[expanded]:pointer-events-auto data-[expanded]:opacity-100",
        className,
      )}
      {...props}
    ></Toast.Content>
  );
}

export type SnackbarDescriptionProps = React.ComponentProps<
  typeof Toast.Description
>;

export function SnackbarDescription({
  className,
  ...props
}: SnackbarDescriptionProps) {
  return (
    <Toast.Description
      className={cn(
        "font-[400] text-[14px]/[20px] tracking-[0.25px]",
        "text-inverse-on-surface",
        className,
      )}
      {...props}
    ></Toast.Description>
  );
}

export type SnackbarActionProps = React.ComponentProps<typeof Toast.Action>;

export function SnackbarAction(props: SnackbarActionProps) {
  return (
    <Toast.Action
      render={
        <Button
          color="text"
          className="text-inverse-primary ripple-inverse-primary!"
        />
      }
      {...props}
    ></Toast.Action>
  );
}

export type SnackbarCloseProps = React.ComponentProps<typeof Toast.Close>;

export function SnackbarClose(props: SnackbarCloseProps) {
  return (
    <Toast.Close
      render={
        <IconButton
          color="standard"
          icon={<XIcon />}
          label="Close snackbar"
          className="text-inverse-on-surface ripple-inverse-on-surface!"
        ></IconButton>
      }
      {...props}
    ></Toast.Close>
  );
}

export function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
}
