import {
  SnackbarList,
  SnackbarPortal,
  SnackbarProvider,
  SnackbarTrigger,
  SnackbarViewport,
} from "~/components/ui/snackbar";

export default function SnackbarDemo() {
  return (
    <div>
      <div className="flex flex-col gap-[16px]">
        <SnackbarProvider>
          <SnackbarTrigger snackbar={{ description: "Single-line snackbar" }}>
            Open single-line snackbar
          </SnackbarTrigger>
          <SnackbarTrigger
            snackbar={{
              description: "Single-line snackbar with close icon",
              type: "closeable",
            }}
          >
            Open single-line snackbar with close icon
          </SnackbarTrigger>
          <SnackbarTrigger
            snackbar={{
              description: "Single-line snackbar with action",
              actionProps: { children: "Action" },
            }}
          >
            Open single-line snackbar with action
          </SnackbarTrigger>
          <SnackbarTrigger
            snackbar={{
              description:
                "Single-line snackbar with action and close icon plus 1.",
              actionProps: { children: "Action" },
              type: "closeable",
            }}
          >
            Open single-line snackbar with action and close icon
          </SnackbarTrigger>
          <SnackbarPortal>
            <SnackbarViewport>
              <SnackbarList />
            </SnackbarViewport>
          </SnackbarPortal>
        </SnackbarProvider>
      </div>
    </div>
  );
}
