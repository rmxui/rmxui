import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";

export default function DialogRoute() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4"></div>
        <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger render={<Button />}>Basic</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Basic dialog title</DialogTitle>
                <DialogDescription>
                  A dialog is a modal window that appears in front of app
                  content to provide critical information or prompt for a
                  decision to be made.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="standard" />}>
                  Action 2
                </DialogClose>
                <DialogClose render={<Button variant="standard" />}>
                  Action 1
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger render={<Button />}>No Title</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  A dialog is a modal window that appears in front of app
                  content to provide critical information or prompt for a
                  decision to be made.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="standard" />}>
                  Action 2
                </DialogClose>
                <DialogClose render={<Button variant="standard" />}>
                  Action 1
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger render={<Button />}>Scrollable</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Basic dialog title</DialogTitle>
              </DialogHeader>
              <div>
                <Separator />
                <DialogDescription className="h-[400px] overflow-auto py-[16px]">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  Quisque faucibus ex sapien vitae pellentesque sem placerat. In
                  id cursus mi pretium tellus duis convallis. Tempus leo eu
                  aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus
                  nec metus bibendum egestas. Iaculis massa nisl malesuada
                  lacinia integer nunc posuere. Ut hendrerit semper vel class
                  aptent taciti sociosqu. Ad litora torquent per conubia nostra
                  inceptos himenaeos. Lorem ipsum dolor sit amet consectetur
                  adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                  sem placerat. In id cursus mi pretium tellus duis convallis.
                  Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
                  fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
                  malesuada lacinia integer nunc posuere. Ut hendrerit semper
                  vel class aptent taciti sociosqu. Ad litora torquent per
                  conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet
                  consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                  pellentesque sem placerat. In id cursus mi pretium tellus duis
                  convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar
                  vivamus fringilla lacus nec metus bibendum egestas. Iaculis
                  massa nisl malesuada lacinia integer nunc posuere. Ut
                  hendrerit semper vel class aptent taciti sociosqu. Ad litora
                  torquent per conubia nostra inceptos himenaeos. Lorem ipsum
                  dolor sit amet consectetur adipiscing elit. Quisque faucibus
                  ex sapien vitae pellentesque sem placerat. In id cursus mi
                  pretium tellus duis convallis. Tempus leo eu aenean sed diam
                  urna tempor. Pulvinar vivamus fringilla lacus nec metus
                  bibendum egestas. Iaculis massa nisl malesuada lacinia integer
                  nunc posuere. Ut hendrerit semper vel class aptent taciti
                  sociosqu. Ad litora torquent per conubia nostra inceptos
                  himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing
                  elit. Quisque faucibus ex sapien vitae pellentesque sem
                  placerat. In id cursus mi pretium tellus duis convallis.
                  Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
                  fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
                  malesuada lacinia integer nunc posuere. Ut hendrerit semper
                  vel class aptent taciti sociosqu. Ad litora torquent per
                  conubia nostra inceptos himenaeos.
                </DialogDescription>
                <Separator />
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="standard" />}>
                  Action 2
                </DialogClose>
                <DialogClose render={<Button variant="standard" />}>
                  Action 1
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger render={<Button />}>Full Screen</DialogTrigger>
            <DialogContent full>
              <DialogHeader>
                <DialogClose
                  render={<Button variant="standard" size="icon-sm" />}
                >
                  <CloseIcon />
                </DialogClose>

                <DialogTitle>Basic dialog title</DialogTitle>
                <Button variant="standard">Action 1</Button>
              </DialogHeader>
              <div className="grow">
                <DialogDescription className="overflow-auto py-[16px]">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  Quisque faucibus ex sapien vitae pellentesque sem placerat. In
                  id cursus mi pretium tellus duis convallis. Tempus leo eu
                  aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus
                  nec metus bibendum egestas. Iaculis massa nisl malesuada
                  lacinia integer nunc posuere. Ut hendrerit semper vel class
                  aptent taciti sociosqu. Ad litora torquent per conubia nostra
                  inceptos himenaeos. Lorem ipsum dolor sit amet consectetur
                  adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                  sem placerat. In id cursus mi pretium tellus duis convallis.
                  Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
                  fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
                  malesuada lacinia integer nunc posuere. Ut hendrerit semper
                  vel class aptent taciti sociosqu. Ad litora torquent per
                  conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet
                  consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                  pellentesque sem placerat. In id cursus mi pretium tellus duis
                  convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar
                  vivamus fringilla lacus nec metus bibendum egestas. Iaculis
                  massa nisl malesuada lacinia integer nunc posuere. Ut
                  hendrerit semper vel class aptent taciti sociosqu. Ad litora
                  torquent per conubia nostra inceptos himenaeos. Lorem ipsum
                  dolor sit amet consectetur adipiscing elit. Quisque faucibus
                  ex sapien vitae pellentesque sem placerat. In id cursus mi
                  pretium tellus duis convallis. Tempus leo eu aenean sed diam
                  urna tempor. Pulvinar vivamus fringilla lacus nec metus
                  bibendum egestas. Iaculis massa nisl malesuada lacinia integer
                  nunc posuere. Ut hendrerit semper vel class aptent taciti
                  sociosqu. Ad litora torquent per conubia nostra inceptos
                  himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing
                  elit. Quisque faucibus ex sapien vitae pellentesque sem
                  placerat. In id cursus mi pretium tellus duis convallis.
                  Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
                  fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
                  malesuada lacinia integer nunc posuere. Ut hendrerit semper
                  vel class aptent taciti sociosqu. Ad litora torquent per
                  conubia nostra inceptos himenaeos.
                </DialogDescription>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}

function CloseIcon({ ...props }: React.ComponentProps<"svg">) {
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
