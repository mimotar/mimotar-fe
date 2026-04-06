import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IMarkAsPendingClosureProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onAccept: () => void;
}

export default function AcceptTransactionForClosure({
  open,
  setOpen,
  onAccept,
}: IMarkAsPendingClosureProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm bg-white">
        <DialogHeader>
          <DialogTitle>Accept/Agree Transaction for closure</DialogTitle>
          <DialogDescription>
            Accept the Transaction for completion. Once Accepted, it means both
            party agree for the Transaction to be closed.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={onAccept}
            type="submit"
            className="bg-green-400 text-white cursor-pointer"
          >
            Agree/Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
