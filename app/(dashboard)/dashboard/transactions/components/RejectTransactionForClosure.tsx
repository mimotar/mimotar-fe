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
  onReject: () => void;
}

export default function RejectTransactionForClosure({
  open,
  setOpen,
  onReject,
}: IMarkAsPendingClosureProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm bg-white">
        <DialogHeader>
          <DialogTitle>Reject Transaction for closure</DialogTitle>
          <DialogDescription>
            Reject the Transaction for completion. Once Rejected, it means both
            party disagree for the Transaction to be closed.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={onReject}
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
