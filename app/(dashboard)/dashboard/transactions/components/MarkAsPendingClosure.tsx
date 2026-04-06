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
  onMarkAsPendingClosure: () => void;
}

export default function MarkAsPendingClosure({
  open,
  setOpen,
  onMarkAsPendingClosure,
}: IMarkAsPendingClosureProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm bg-white">
        <DialogHeader>
          <DialogTitle>Prepare Ticket for closure</DialogTitle>
          <DialogDescription>
            Start the approve Ticket process for the other party. Once you
            approve the process, the status change to PENDING_CLOSURE. the Other
            party is informed to accept or reject.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={onMarkAsPendingClosure}
            type="submit"
            className="bg-green-400 text-white cursor-pointer"
          >
            Approve(Start/Initialize)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
