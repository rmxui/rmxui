import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogActions,
  DialogButton,
  DialogHeadline,
  DialogPopup,
  DialogSupportingText,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function DialogDemo() {
  return (
    <div>
      <div className="flex gap-[16px]">
        <div>
          <Dialog>
            <DialogTrigger render={<Button></Button>}>
              Open dialog
            </DialogTrigger>
            <DialogPopup>
              <DialogHeadline>Basic dialog title</DialogHeadline>
              <DialogSupportingText>
                A dialog is a type of modal window that appears in front of app
                content to provide critical information, or prompt for a
                decision to be made.
              </DialogSupportingText>
              <DialogActions>
                <DialogButton>Action 2</DialogButton>
                <DialogButton>Action 1</DialogButton>
              </DialogActions>
            </DialogPopup>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
